import GeoTrackedSite from '../models/geo_tracked_site.js'
import GeoMentionCheck from '../models/geo_mention_check.js'
import GeoUsage from '../models/geo_usage.js'
import ProductSubscription from '../models/product_subscription.js'
import SeoTrackedSite from '../models/seo_tracked_site.js'
import SeoKeywordRanking from '../models/seo_keyword_ranking.js'
import {
    checkSiteMentions, PROMPT_INTENTS, classifyGeoSuitableKeywords, getAiKeywordVolume,
    getTopMentionedDomains, getKeywordMentionHistory,
} from '../services/geoService.js'
import { getBacklinkSummary } from '../services/seoService.js'
import { analyzeGEO } from './geo.js'
import { assertPublicHttpsUrl, fetchSafely } from '../utils/safeFetch.js'
import { t } from '../utils/i18n/errors.js'

const VALID_PLATFORMS = ['claude', 'chatgpt', 'gemini', 'perplexity', 'google_aio']

// keywordSuggestionsPerMonth: getKeywordSuggestions (Cross-Sell-Feature, nur aktiv wenn derselbe
// Nutzer für dieselbe Domain zusätzlich ein SEO-Automatisierung-Abo hat) war nur über einen
// 24h-Cache pro Site gedeckelt, kein echtes Monats-Kontingent — bei mehreren Sites theoretisch näher
// an "täglich pro Site" als an einem echten Limit. Werte proportional zu maxSites.
const PLAN_LIMITS = {
    einsteiger: { maxSites: 1,  maxKeywords: 10, platforms: ['claude', 'gemini'],                                      manualChecksPerMonth: 2, promptVariants: 1, competitorAnalyticsEnabled: false, historicalTrendsEnabled: false, keywordSuggestionsPerMonth: 5,  citabilityDiagnosisEnabled: false },
    pro:        { maxSites: 3,  maxKeywords: 20, platforms: ['claude', 'chatgpt', 'gemini', 'perplexity', 'google_aio'], manualChecksPerMonth: 2, promptVariants: 2, competitorAnalyticsEnabled: true,  historicalTrendsEnabled: false, keywordSuggestionsPerMonth: 15, citabilityDiagnosisEnabled: true  },
    expert:     { maxSites: 10, maxKeywords: 60, platforms: ['claude', 'chatgpt', 'gemini', 'perplexity', 'google_aio'], manualChecksPerMonth: 3, promptVariants: 2, competitorAnalyticsEnabled: true,  historicalTrendsEnabled: true,  keywordSuggestionsPerMonth: 30, citabilityDiagnosisEnabled: true  },
}

async function getGeoPlan(userId) {
    const sub = await ProductSubscription.findOne({ userId, product: 'geo', status: 'ACTIVE' })
    return sub ? sub.plan : null
}

async function getLimits(userId, plan) {
    const base = PLAN_LIMITS[plan]
    if (!base) return base
    const sub = await ProductSubscription.findOne({ userId, product: 'geo', status: 'ACTIVE' }, 'unlimited').lean()
    if (!sub?.unlimited) return base
    return Object.fromEntries(Object.entries(base).map(([k, v]) => {
        if (typeof v === 'number') return [k, Infinity]
        if (typeof v === 'boolean') return [k, true]
        if (Array.isArray(v)) return [k, VALID_PLATFORMS]
        return [k, v]
    }))
}

async function countTotalKeywords(userId) {
    const sites = await GeoTrackedSite.find({ userId, isActive: true }, 'keywords customPrompts').lean()
    return sites.reduce((sum, s) => sum + (s.keywords?.length || 0) + (s.customPrompts?.length || 0), 0)
}

function activeIntents(promptVariants = 1) {
    return PROMPT_INTENTS.slice(0, Math.max(1, Math.min(promptVariants, PROMPT_INTENTS.length)))
}

function intentQuery(promptIntent) {
    return promptIntent === 'empfehlung' ? { $in: ['empfehlung', null] } : promptIntent
}

export async function getPlan(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        res.json({ plan })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function subscribePlan(req, res) {
    try {
        const { subscriptionId, plan } = req.body
        if (!subscriptionId || !plan) return res.status(400).json({ error: t('SUBSCRIPTION_ID_PLAN_REQUIRED', req.language) })

        // Inline allowlist lookup (not .includes()) and inline regex-match extraction —
        // CodeQL's NoSQL-injection sanitizer recognition doesn't follow taint through any
        // function call, even a local one, so both must happen directly in this function.
        const safePlan = { einsteiger: 'einsteiger', pro: 'pro', expert: 'expert' }[plan]
        if (!safePlan) return res.status(400).json({ error: t('INVALID_PLAN', req.language) })

        const idMatch = /^I-[A-Z0-9]{12,20}$/.exec(subscriptionId)
        if (!idMatch) return res.status(400).json({ error: t('SUBSCRIPTION_ID_PLAN_REQUIRED', req.language) })
        const safeSubscriptionId = idMatch[0]

        await ProductSubscription.findOneAndUpdate(
            { userId: req.userId, product: 'geo' },
            { userId: req.userId, product: 'geo', plan: safePlan, paypalSubscriptionId: safeSubscriptionId, status: 'ACTIVE' },
            { upsert: true, new: true }
        )
        res.json({ success: true, plan })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function getSites(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_GEO_SUB', req.language) })

        const sites = await GeoTrackedSite.find({ userId: req.userId, isActive: true }).lean()
        const limits = await getLimits(req.userId, plan)

        const enriched = await Promise.all(sites.map(async (site) => {
            const customPrompts = site.customPrompts || []
            if (!site.keywords?.length && !customPrompts.length) return { ...site, mentionRate: null, mentionedCount: 0, checkedCount: 0 }
            const platforms = site.platforms?.length ? site.platforms : ['claude']
            const intents = activeIntents(site.promptVariants)

            let totalChecked = 0, totalMentioned = 0
            await Promise.all(site.keywords.map(async (keyword) => {
                await Promise.all(platforms.map(async (platform) => {
                    const docs = await Promise.all(intents.map(promptIntent =>
                        GeoMentionCheck.findOne({ siteId: site._id, keyword, platform, promptIntent: intentQuery(promptIntent) }).sort({ checkedAt: -1 }).lean()
                    ))
                    const found = docs.filter(Boolean)
                    if (found.length) {
                        totalChecked++
                        if (found.some(d => d.mentioned)) totalMentioned++
                    }
                }))
            }))
            await Promise.all(customPrompts.map(async ({ prompt }) => {
                await Promise.all(platforms.map(async (platform) => {
                    const doc = await GeoMentionCheck.findOne({ siteId: site._id, keyword: prompt, platform, promptIntent: 'custom' }).sort({ checkedAt: -1 }).lean()
                    if (doc) {
                        totalChecked++
                        if (doc.mentioned) totalMentioned++
                    }
                }))
            }))

            const mentionRate = totalChecked > 0 ? Math.round((totalMentioned / totalChecked) * 100) : null
            return { ...site, mentionRate, mentionedCount: totalMentioned, checkedCount: totalChecked }
        }))

        const totalKeywords = sites.reduce((s, site) => s + (site.keywords?.length || 0) + (site.customPrompts?.length || 0), 0)

        res.json({
            sites: enriched,
            plan,
            usedSites:    sites.length,
            maxSites:     limits.maxSites,
            usedKeywords: totalKeywords,
            maxKeywords:  limits.maxKeywords,
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function getSite(req, res) {
    try {
        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })
        res.json({ site })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function addSite(req, res) {
    try {
        const { domain, displayName, keywords = [], language = 'de', platforms = ['claude'] } = req.body
        if (!domain) return res.status(400).json({ error: t('DOMAIN_REQUIRED', req.language) })

        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_GEO_SUB', req.language) })

        const limits = await getLimits(req.userId, plan)

        const siteCount = await GeoTrackedSite.countDocuments({ userId: req.userId, isActive: true })
        if (siteCount >= limits.maxSites) {
            return res.status(403).json({ error: req.language === 'en'
                ? `Maximum of ${limits.maxSites} website${limits.maxSites > 1 ? 's' : ''} for the ${plan} plan`
                : `Maximal ${limits.maxSites} Website${limits.maxSites > 1 ? 's' : ''} für ${plan}-Plan` })
        }

        const totalKeywords = await countTotalKeywords(req.userId)
        const slotsLeft = limits.maxKeywords - totalKeywords

        const allowedPlatforms = platforms.filter(p => VALID_PLATFORMS.includes(p) && limits.platforms.includes(p))
        if (!allowedPlatforms.length) return res.status(400).json({ error: t('AT_LEAST_ONE_PLATFORM_REQUIRED', req.language) })

        let normalizedDomain
        try {
            const parsed = new URL(domain.startsWith('http') ? domain : `https://${domain}`)
            normalizedDomain = parsed.hostname.toLowerCase().replace(/^www\./, '')
        } catch {
            return res.status(400).json({ error: t('INVALID_DOMAIN', req.language) })
        }

        try {
            await assertPublicHttpsUrl(`https://${normalizedDomain}`)
        } catch (err) {
            return res.status(400).json({ error: err.message || t('DOMAIN_NOT_ALLOWED', req.language) })
        }

        const uniqueKeywords = [...new Set(
            keywords.slice(0, slotsLeft).map(k => k.trim().toLowerCase()).filter(Boolean)
        )]

        const site = await GeoTrackedSite.create({
            userId: req.userId,
            domain: normalizedDomain,
            displayName: displayName || normalizedDomain,
            keywords: uniqueKeywords,
            language,
            platforms: allowedPlatforms,
            promptVariants: limits.promptVariants,
        })

        res.status(201).json({ site })
    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ error: t('SITE_ALREADY_TRACKED', req.language) })
        res.status(500).json({ error: err.message })
    }
}

export async function deleteSite(req, res) {
    try {
        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        await Promise.all([
            GeoMentionCheck.deleteMany({ siteId: site._id }),
            site.deleteOne(),
        ])

        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function addKeywords(req, res) {
    try {
        const { keywords } = req.body
        if (!Array.isArray(keywords) || !keywords.length) return res.status(400).json({ error: t('KEYWORDS_ARRAY_REQUIRED', req.language) })

        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_GEO_SUB', req.language) })

        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const limits = await getLimits(req.userId, plan)
        const totalKeywords = await countTotalKeywords(req.userId)
        const slotsLeft = limits.maxKeywords - totalKeywords
        if (slotsLeft <= 0) return res.status(403).json({ error: req.language === 'en'
            ? `Keyword limit reached (${limits.maxKeywords} for the ${plan} plan)`
            : `Keyword-Limit erreicht (${limits.maxKeywords} für ${plan}-Plan)` })

        const newKws = keywords
            .slice(0, slotsLeft)
            .map(k => k.trim().toLowerCase())
            .filter(k => k && !site.keywords.includes(k))

        site.keywords.push(...newKws)
        await site.save()

        res.json({ site, added: newKws.length })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// DELETE /api/geo/sites/:id/keywords
export async function removeKeywords(req, res) {
    try {
        const { keywords } = req.body
        if (!Array.isArray(keywords)) return res.status(400).json({ error: t('KEYWORDS_ARRAY_REQUIRED', req.language) })

        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const removed = site.keywords.filter(k => keywords.includes(k))
        site.keywords = site.keywords.filter(k => !keywords.includes(k))
        await site.save()

        if (removed.length) {
            await GeoMentionCheck.deleteMany({ siteId: site._id, keyword: { $in: removed } })
        }

        res.json({ site })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const MAX_CUSTOM_PROMPT_LENGTH = 300

// POST /api/geo/sites/:id/custom-prompts — eigener, frei formulierter Prompt statt Keyword+Template.
// Zaehlt gegen dasselbe maxKeywords-Kontingent wie normale Keywords (siehe countTotalKeywords).
export async function addCustomPrompt(req, res) {
    try {
        const prompt = (req.body?.prompt || '').trim()
        if (!prompt) return res.status(400).json({ error: req.language === 'en' ? 'prompt is required' : 'prompt erforderlich' })
        if (prompt.length > MAX_CUSTOM_PROMPT_LENGTH) {
            return res.status(400).json({ error: req.language === 'en'
                ? `Prompt too long (max ${MAX_CUSTOM_PROMPT_LENGTH} characters)`
                : `Prompt zu lang (max. ${MAX_CUSTOM_PROMPT_LENGTH} Zeichen)` })
        }

        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_GEO_SUB', req.language) })

        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const limits = await getLimits(req.userId, plan)
        const totalKeywords = await countTotalKeywords(req.userId)
        if (totalKeywords >= limits.maxKeywords) {
            return res.status(403).json({ error: req.language === 'en'
                ? `Keyword limit reached (${limits.maxKeywords} for the ${plan} plan)`
                : `Keyword-Limit erreicht (${limits.maxKeywords} für ${plan}-Plan)` })
        }

        if (site.customPrompts.some(cp => cp.prompt === prompt)) {
            return res.status(409).json({ error: req.language === 'en' ? 'Prompt already added' : 'Prompt bereits hinzugefügt' })
        }

        site.customPrompts.push({ prompt })
        await site.save()

        res.json({ site })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// DELETE /api/geo/sites/:id/custom-prompts
export async function removeCustomPrompt(req, res) {
    try {
        const { prompt } = req.body
        if (!prompt) return res.status(400).json({ error: req.language === 'en' ? 'prompt is required' : 'prompt erforderlich' })

        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        site.customPrompts = site.customPrompts.filter(cp => cp.prompt !== prompt)
        await site.save()

        await GeoMentionCheck.deleteMany({ siteId: site._id, keyword: prompt, promptIntent: 'custom' })

        res.json({ site })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// PATCH /api/geo/sites/:id/platforms
export async function updatePlatforms(req, res) {
    try {
        const { platforms } = req.body
        if (!Array.isArray(platforms) || !platforms.length) return res.status(400).json({ error: t('PLATFORMS_ARRAY_REQUIRED', req.language) })

        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_GEO_SUB', req.language) })

        const limits = await getLimits(req.userId, plan)
        const allowedPlatforms = platforms.filter(p => VALID_PLATFORMS.includes(p) && limits.platforms.includes(p))
        if (!allowedPlatforms.length) return res.status(400).json({ error: t('NO_ALLOWED_PLATFORMS_FOR_PLAN', req.language) })

        const site = await GeoTrackedSite.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { platforms: allowedPlatforms },
            { new: true }
        )
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        res.json({ site })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/geo/sites/:id/results
export async function getResults(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_GEO_SUB', req.language) })

        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const platforms = site.platforms?.length ? site.platforms : ['claude']
        const intents = activeIntents(site.promptVariants)

        const keywordResults = await Promise.all(site.keywords.map(async (keyword) => {
            const checks = {}
            await Promise.all(platforms.map(async (platform) => {
                checks[platform] = {}
                await Promise.all(intents.map(async (promptIntent) => {
                    checks[platform][promptIntent] = await GeoMentionCheck.findOne({ siteId: site._id, keyword, platform, promptIntent: intentQuery(promptIntent) })
                        .sort({ checkedAt: -1 }).lean()
                }))
            }))
            const history = await GeoMentionCheck.find({ siteId: site._id, keyword })
                .sort({ checkedAt: -1 }).limit(24 * intents.length).lean()
            return { keyword, checks, history: history.reverse(), isCustomPrompt: false }
        }))

        // Eigene Prompts laufen nur unter promptIntent 'custom' (keine Vergleich-Variante) —
        // eigenes, kuerzeres Mapping statt intents.map, damit checks[platform] dieselbe Form behaelt.
        const customPromptResults = await Promise.all((site.customPrompts || []).map(async ({ prompt }) => {
            const checks = {}
            await Promise.all(platforms.map(async (platform) => {
                checks[platform] = { custom: await GeoMentionCheck.findOne({ siteId: site._id, keyword: prompt, platform, promptIntent: 'custom' })
                    .sort({ checkedAt: -1 }).lean() }
            }))
            const history = await GeoMentionCheck.find({ siteId: site._id, keyword: prompt, promptIntent: 'custom' })
                .sort({ checkedAt: -1 }).limit(24).lean()
            return { keyword: prompt, checks, history: history.reverse(), isCustomPrompt: true }
        }))

        const results = [...keywordResults, ...customPromptResults]

        // "erwähnt" pro Keyword×Plattform gilt, wenn mindestens eine Prompt-Variante einen Treffer hat
        let totalChecked = 0, totalMentioned = 0
        results.forEach(r => {
            platforms.forEach(p => {
                const docs = r.isCustomPrompt ? [r.checks[p]?.custom].filter(Boolean) : intents.map(i => r.checks[p][i]).filter(Boolean)
                if (docs.length) {
                    totalChecked++
                    if (docs.some(d => d.mentioned)) totalMentioned++
                }
            })
        })
        const mentionRate = totalChecked > 0 ? Math.round((totalMentioned / totalChecked) * 100) : null

        const month = new Date().toISOString().slice(0, 7)
        const usage = await GeoUsage.findOne({ userId: req.userId, feature: 'manual_check', month }).lean()
        const manualChecksUsed = usage?.count ?? 0
        const manualChecksLimit = (await getLimits(req.userId, plan)).manualChecksPerMonth

        res.json({ site, results, intents, mentionRate, mentionedCount: totalMentioned, checkedCount: totalChecked, manualChecksUsed, manualChecksLimit })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const STALE_CHECK_MS = 20 * 60 * 1000

async function runCheckInBackground(site, userId, keywords, customPrompts) {
    try {
        const results = await checkSiteMentions(site, site.promptVariants, keywords, customPrompts)

        await GeoMentionCheck.insertMany(results.map(r => ({
            siteId:       site._id,
            userId,
            keyword:      r.keyword,
            platform:     r.platform,
            promptIntent: r.promptIntent,
            mentioned:    r.mentioned,
            context:      r.context,
            citations:    r.citations || [],
            sentiment:    r.sentiment || null,
            ownPosition:      r.ownPosition ?? null,
            ownPositionTotal: r.ownPositionTotal ?? null,
            checkedAt:    new Date(),
        })))

        // checkStartedAt als Guard: verhindert, dass ein verspätet fertiger (z.B. per Stale-Timeout
        // bereits neu gestarteter) Check den Status eines inzwischen neueren Checks überschreibt.
        await GeoTrackedSite.updateOne(
            { _id: site._id, checkStartedAt: site.checkStartedAt },
            { lastChecked: new Date(), checkStatus: 'idle' }
        )
    } catch (err) {
        console.error(`[geo] Hintergrund-Check fehlgeschlagen für ${site.domain}:`, err.message)
        await GeoTrackedSite.updateOne(
            { _id: site._id, checkStartedAt: site.checkStartedAt },
            { checkStatus: 'failed' }
        )
    }
}

// POST /api/geo/sites/:id/check
export async function triggerCheck(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_GEO_SUB', req.language) })

        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })
        if (!site.keywords.length && !site.customPrompts?.length) return res.status(400).json({ error: t('NO_KEYWORDS_STORED', req.language) })

        // Optionale Keyword-/Prompt-Auswahl: ein manueller Check muss nicht zwingend die ganze Site
        // neu prüfen (das ist der teuerste Fall — deshalb im Frontend über die vorhandene Checkbox-
        // Auswahl ansteuerbar). Ohne Auswahl bleibt das Verhalten wie bisher: alle Keywords + Prompts.
        const siteKeywordSet = new Set(site.keywords)
        const requestedKeywords = Array.isArray(req.body?.keywords)
            ? [...new Set(req.body.keywords)].filter(k => siteKeywordSet.has(k))
            : []
        const keywordsToCheck = requestedKeywords.length ? requestedKeywords : undefined // undefined = alle (siehe checkSiteMentions)

        const sitePromptSet = new Set((site.customPrompts || []).map(cp => cp.prompt))
        const requestedPrompts = Array.isArray(req.body?.customPrompts)
            ? [...new Set(req.body.customPrompts)].filter(p => sitePromptSet.has(p))
            : []
        const promptsToCheck = requestedPrompts.length ? requestedPrompts : undefined

        const isStale = site.checkStatus === 'running' && site.checkStartedAt
            && (Date.now() - site.checkStartedAt.getTime() > STALE_CHECK_MS)
        if (site.checkStatus === 'running' && !isStale) {
            return res.status(409).json({ error: 'check_already_running', startedAt: site.checkStartedAt })
        }

        const month = new Date().toISOString().slice(0, 7)
        const manualLimit = (await getLimits(req.userId, plan)).manualChecksPerMonth
        const usage = await GeoUsage.findOne({ userId: req.userId, feature: 'manual_check', month }).lean()
        const used = usage?.count ?? 0
        if (used >= manualLimit) {
            return res.status(429).json({ error: 'monthly_limit_reached', limit: manualLimit, used })
        }

        await GeoUsage.findOneAndUpdate(
            { userId: req.userId, feature: 'manual_check', month },
            { $inc: { count: 1 } },
            { upsert: true }
        )

        site.checkStatus = 'running'
        site.checkStartedAt = new Date()
        await site.save()

        runCheckInBackground(site, req.userId, keywordsToCheck, promptsToCheck) // bewusst nicht awaited

        res.status(202).json({
            status: 'running',
            startedAt: site.checkStartedAt,
            checkedKeywords: keywordsToCheck ?? site.keywords,
            checkedCustomPrompts: promptsToCheck ?? (site.customPrompts || []).map(cp => cp.prompt),
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// On-demand statt automatisch bei jedem Check — verhindert, dass sich die Kosten mit der Zitat-Anzahl multiplizieren.
// Wird sowohl von analyzeCitation (Klick auf eine fremde Quelle) als auch von diagnoseCitability
// (eigene Domain + die auf Platz 1 zitierte Konkurrenz-URL) verwendet — ein Cache für "wie zitierbar
// ist diese URL", unabhängig davon, wessen URL es ist.
const CITATION_ANALYSIS_CACHE = new Map() // "lang:url" -> { data, expiresAt }
const CITATION_CACHE_TTL_MS = 24 * 60 * 60 * 1000

async function analyzeUrlCached(url, language) {
    // Cache-Key muss die Sprache einschliessen — analyzeGEO()'s issues/recommendations/generatedLlmsTxt
    // sind jetzt sprachabhaengig, ein reiner url-Key wuerde sonst z.B. eine deutsch generierte Analyse
    // an eine englische Anfrage fuer dieselbe URL ausliefern.
    const cacheKey = `${language === 'en' ? 'en' : 'de'}:${url}`
    const cached = CITATION_ANALYSIS_CACHE.get(cacheKey)
    if (cached && cached.expiresAt > Date.now()) return { analysis: cached.data, cached: true }

    let pageRes
    try {
        pageRes = await fetchSafely(url, { headers: { 'User-Agent': 'Scanora-GEO-Bot/1.0' }, timeoutMs: 10000 })
    } catch (err) {
        const e = new Error(err.message || t('PAGE_FETCH_FAILED', language))
        e.status = 400
        throw e
    }
    if (!pageRes.ok) {
        const e = new Error(language === 'en' ? `Page responded with status ${pageRes.status}` : `Seite antwortete mit Status ${pageRes.status}`)
        e.status = 502
        throw e
    }

    const html = await pageRes.text()
    const analysis = await analyzeGEO(url, html, language)
    CITATION_ANALYSIS_CACHE.set(cacheKey, { data: analysis, expiresAt: Date.now() + CITATION_CACHE_TTL_MS })
    return { analysis, cached: false }
}

// POST /api/geo/analyze-citation  { url }
export async function analyzeCitation(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_GEO_SUB', req.language) })

        const { url } = req.body
        if (!url) return res.status(400).json({ error: t('URL_REQUIRED', req.language) })

        let parsedUrl
        try {
            parsedUrl = await assertPublicHttpsUrl(url)
        } catch (err) {
            return res.status(400).json({ error: err.message || t('INVALID_URL', req.language) })
        }

        const { analysis, cached } = await analyzeUrlCached(parsedUrl.toString(), req.language)
        res.json({ analysis, cached })
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}

// Backlink-Profile ändern sich langsam — wöchentlicher Cache statt bei jeder Diagnose neu abfragen,
// haelt die DataForSEO-Kosten fuer die Zitierbarkeits-Diagnose auf einen Bruchteil eines Cents pro Domain/Woche.
const BACKLINK_CACHE = new Map() // domain -> { data, expiresAt }
const BACKLINK_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000

async function getBacklinkSummaryCached(domain) {
    const cached = BACKLINK_CACHE.get(domain)
    if (cached && cached.expiresAt > Date.now()) return cached.data

    const data = await getBacklinkSummary(domain)
    BACKLINK_CACHE.set(domain, { data, expiresAt: Date.now() + BACKLINK_CACHE_TTL_MS })
    return data
}

function normalizeDomain(domain) {
    return (domain || '').replace(/^www\./, '').toLowerCase()
}

// Spiegelt die Gewichtung aus analyzeGEO() in geo.js — bei Aenderungen dort beide Stellen abgleichen.
const CITABILITY_FACTORS = [
    { key: 'hasLlmsTxt',          weight: 10, label: 'llms.txt vorhanden',                   labelEn: 'llms.txt present' },
    { key: 'hasFAQ',              weight: 8,  label: 'FAQ-Schema',                           labelEn: 'FAQ schema' },
    { key: 'robotsAllowsAI',      weight: 8,  label: 'KI-Bots erlaubt (robots.txt)',         labelEn: 'AI bots allowed (robots.txt)' },
    { key: 'hasDirectDefinition', weight: 8,  label: 'Direkte Produktdefinition im Content', labelEn: 'Direct product definition in content' },
    { key: 'hasOrganization',     weight: 6,  label: 'Organization-Schema',                  labelEn: 'Organization schema' },
    { key: 'hasStatistics',       weight: 6,  label: 'Konkrete Zahlen/Statistiken',          labelEn: 'Concrete numbers/statistics' },
    { key: 'hasSitemap',          weight: 5,  label: 'sitemap.xml',                          labelEn: 'sitemap.xml' },
    { key: 'hasAuthorInfo',       weight: 5,  label: 'Autor/About-Informationen',            labelEn: 'Author/about info' },
]

// Vergleicht die eigene analyzeGEO-Checkliste mit der einer zitierten Konkurrenz-URL plus der
// externen Autoritaet (Backlinks) — nur die Faktoren, in denen sie sich unterscheiden, sind fuer
// eine Empfehlung nuetzlich, deshalb keine reine 1:1-Auflistung aller ~20 analyzeGEO-Checks.
function buildCitabilityDiff(ownChecks, competitorChecks, ownBacklinks, competitorBacklinks, language) {
    const en = language === 'en'
    const rows = CITABILITY_FACTORS.map(({ key, weight, label, labelEn }) => ({
        factor: en ? labelEn : label,
        key,
        weight,
        own: !!ownChecks[key],
        competitor: !!competitorChecks[key],
    }))

    rows.push({
        factor: en ? 'Content length (words)' : 'Content-Umfang (Woerter)',
        key: 'wordCount',
        weight: 5,
        own: ownChecks.wordCount ?? 0,
        competitor: competitorChecks.wordCount ?? 0,
        numeric: true,
    })

    if (ownBacklinks && competitorBacklinks) {
        rows.push({
            factor: en ? 'Referring domains' : 'Verweisende Domains',
            key: 'referringDomains',
            weight: 12,
            own: ownBacklinks.referringDomains ?? 0,
            competitor: competitorBacklinks.referringDomains ?? 0,
            numeric: true,
        })
    }

    return rows
}

// Groesster Hebel = hoechstgewichteter Faktor, den die zitierte Konkurrenz hat und die eigene
// Domain (noch) nicht — bewusst nur EIN Vorschlag statt einer langen To-do-Liste, siehe Diagnose-Vorschau.
function pickCitabilityLever(diff, language) {
    const en = language === 'en'
    const candidates = diff
        .map(row => {
            if (row.numeric) {
                const own = row.own ?? 0, competitor = row.competitor ?? 0
                const meaningfulGap = competitor > 0 && (own === 0 ? competitor >= 5 : competitor / own >= 1.5)
                return meaningfulGap ? { ...row, score: row.weight } : null
            }
            return (!row.own && row.competitor) ? { ...row, score: row.weight } : null
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)

    if (!candidates.length) return null
    const top = candidates[0]

    if (top.key === 'referringDomains') {
        const ratio = top.own > 0 ? Math.round(top.competitor / top.own) : null
        const strong = ratio && ratio >= 2
        return { factor: top.factor, text: en
            ? (strong
                ? `External authority is the biggest lever: the cited source has ${ratio}x more referring domains on this topic — hard to close with on-page changes alone.`
                : `External authority is the biggest lever: the cited source has ${top.competitor} referring domains instead of ${top.own}.`)
            : (strong
                ? `Externe Autoritaet ist der groesste Hebel: die zitierte Quelle hat ${ratio}x mehr verweisende Domains zum Thema — ueber On-Page-Anpassungen allein kaum aufzuholen.`
                : `Externe Autoritaet ist der groesste Hebel: die zitierte Quelle hat ${top.competitor} statt ${top.own} verweisende Domains.`) }
    }
    if (top.key === 'wordCount') {
        return { factor: top.factor, text: en
            ? `The cited source has significantly more content on this topic (${top.competitor} vs. ${top.own} words) — answer more sub-questions on the same page.`
            : `Die zitierte Quelle hat deutlich mehr Content zum Thema (${top.competitor} statt ${top.own} Woerter) — mehr Unterfragen auf derselben Seite beantworten.` }
    }
    return { factor: top.factor, text: en
        ? `Biggest lever: ${top.factor}. The cited source has it, your own page doesn't (yet).`
        : `Groesster Hebel: ${top.factor}. Die zitierte Quelle hat das, die eigene Seite (noch) nicht.` }
}

function hasBooleanGap(diff) {
    return diff.some(row => !row.numeric && !row.own && row.competitor)
}

// Baut die Liste an Daten-Luecken/Erklaerungen fuer alles, was die Diagnose NICHT zeigen konnte oder
// wo die Checkliste keinen Unterschied findet — bewusst explizit statt eine Zeile stillschweigend
// wegzulassen. Ohne das sah "keine Backlink-Daten" genauso aus wie "Backlinks sind kein Thema hier",
// und "Checkliste zu 100% erfuellt, trotzdem nicht zitiert" wirkte wie ein Fehler in der Diagnose statt
// wie ein ehrlicher Hinweis, dass die Ursache ausserhalb der Checkliste liegt.
function buildCitabilityCaveats({ language, topCompetitor, competitorAnalysis, ownBacklinks, competitorBacklinks, diff, lever }) {
    const caveats = []
    const en = language === 'en'

    if (!topCompetitor) {
        caveats.push(en
            ? 'No cited source was captured for this check — no comparison possible.'
            : 'Fuer diesen Check wurde keine zitierte Quelle erfasst — kein Vergleich moeglich.')
        return caveats
    }

    if (!competitorAnalysis) {
        caveats.push(en
            ? `The cited page (${topCompetitor.domain}) could not be analyzed — no on-page comparison possible.`
            : `Die zitierte Seite (${topCompetitor.domain}) konnte nicht analysiert werden — kein On-Page-Vergleich moeglich.`)
    }

    if (!ownBacklinks) {
        caveats.push(en
            ? 'No backlink data found for your own domain — likely too new or too few links yet to appear in the authority index. On its own, that is already a plausible explanation.'
            : 'Keine Backlink-Daten fuer die eigene Domain gefunden — vermutlich noch zu neu oder zu wenig verlinkt, um im Autoritaets-Index zu erscheinen. Das allein ist schon eine plausible Erklaerung.')
    } else if (!competitorBacklinks) {
        caveats.push(en
            ? `No backlink data found for ${topCompetitor.domain}.`
            : `Keine Backlink-Daten fuer ${topCompetitor.domain} gefunden.`)
    }

    if (diff && !hasBooleanGap(diff) && lever?.key !== 'referringDomains') {
        caveats.push(en
            ? 'No clear technical gap found in this checklist — the real reason likely lies outside it (brand recognition, how long the competitor has existed online, mentions elsewhere, or the AI model’s training cutoff).'
            : 'Laut Checkliste gibt es keinen klaren technischen Unterschied — die eigentliche Ursache liegt wahrscheinlich ausserhalb davon (Markenbekanntheit, wie lange die Konkurrenz schon online ist, Erwaehnungen auf anderen Seiten, oder der Wissensstand des KI-Modells).')
    }

    return caveats
}

// POST /api/geo/sites/:id/diagnose-citability  { keyword, platform, promptIntent }
// Fall A (nicht zitiert): eigene analyzeGEO-Checkliste + Luecke zur zitierten Quelle.
// Fall B (zitiert, Platz 1): nur die eigene Checkliste als wahrscheinlicher Grund, kein Vergleich noetig.
// Fall C (zitiert, aber nicht zuerst): Luecke zur auf Platz 1 zitierten Quelle.
export async function diagnoseCitability(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_GEO_SUB', req.language) })
        if (!(await getLimits(req.userId, plan)).citabilityDiagnosisEnabled) {
            return res.status(403).json({ error: req.language === 'en'
                ? 'Citability diagnosis requires the Pro or Expert plan'
                : 'Zitierbarkeits-Diagnose erfordert den Pro- oder Expert-Plan' })
        }

        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        // Coerce to strings before they ever reach a Mongo query — req.body values are
        // otherwise user-controlled and an object here (e.g. { "$ne": null }) would inject
        // a query operator instead of matching a literal value.
        const keyword = String(req.body?.keyword || '').trim()
        const platform = String(req.body?.platform || '').trim()
        const promptIntent = String(req.body?.promptIntent || '').trim()
        if (!keyword || !platform || !promptIntent) {
            return res.status(400).json({ error: req.language === 'en'
                ? 'keyword, platform and promptIntent are required'
                : 'keyword, platform und promptIntent sind erforderlich' })
        }
        const trackedQueries = [...site.keywords, ...(site.customPrompts || []).map(cp => cp.prompt)]
        if (!trackedQueries.includes(keyword) || !VALID_PLATFORMS.includes(platform) || !PROMPT_INTENTS.includes(promptIntent)) {
            return res.status(400).json({ error: req.language === 'en'
                ? 'Unknown keyword, platform, or promptIntent for this site'
                : 'Unbekanntes Keyword, Plattform oder promptIntent fuer diese Seite' })
        }

        const check = await GeoMentionCheck.findOne({
            siteId: site._id, keyword, platform, promptIntent: intentQuery(promptIntent),
        }).sort({ checkedAt: -1 }).lean()
        if (!check) return res.status(404).json({ error: req.language === 'en'
            ? 'No check found for this keyword/platform combination'
            : 'Kein Check fuer diese Keyword/Plattform-Kombination gefunden' })

        const ownDomain = normalizeDomain(site.domain)
        let own
        try {
            own = (await analyzeUrlCached(`https://${site.domain}`, req.language)).analysis
        } catch (err) {
            return res.status(err.status || 502).json({ error: err.message })
        }

        const status = !check.mentioned ? 'not_cited' : (check.ownPosition === 1 ? 'cited_first' : 'cited_gap')

        if (status === 'cited_first') {
            return res.json({ status, own, ownBacklinks: null, competitor: null, diff: null, lever: null, caveats: [] })
        }

        const topCompetitor = (check.citations || []).find(c => c.domain && normalizeDomain(c.domain) !== ownDomain)
        if (!topCompetitor) {
            const caveats = buildCitabilityCaveats({ language: req.language, topCompetitor: null })
            return res.json({ status, own, ownBacklinks: null, competitor: null, diff: null, lever: null, caveats })
        }

        let competitorAnalysis = null
        try {
            competitorAnalysis = (await analyzeUrlCached(topCompetitor.url || `https://${topCompetitor.domain}`, req.language)).analysis
        } catch {
            // Konkurrenz-Seite nicht erreichbar/analysierbar — Diagnose faellt auf die eigene Checkliste zurueck.
        }

        const [ownBacklinks, competitorBacklinks] = await Promise.all([
            getBacklinkSummaryCached(ownDomain),
            getBacklinkSummaryCached(normalizeDomain(topCompetitor.domain)),
        ])

        const diff = competitorAnalysis ? buildCitabilityDiff(own.checks, competitorAnalysis.checks, ownBacklinks, competitorBacklinks, req.language) : null
        const lever = diff ? pickCitabilityLever(diff, req.language) : null
        const caveats = buildCitabilityCaveats({ language: req.language, topCompetitor, competitorAnalysis, ownBacklinks, competitorBacklinks, diff, lever })

        res.json({
            status,
            own,
            ownBacklinks,
            competitor: {
                domain: topCompetitor.domain,
                url: topCompetitor.url || null,
                analysis: competitorAnalysis,
                backlinks: competitorBacklinks,
            },
            diff,
            lever,
            caveats,
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Drei $unwind-Aggregationen über die komplette Check-Historie sind bei vielen Checks spürbar
// langsam — cachen, bis ein neuer Check abgeschlossen ist (lastChecked ändert sich), statt bei
// jedem Seitenaufruf/Tab-Wechsel neu zu berechnen.
const COMPETITORS_CACHE = new Map() // geoSiteId -> { data, totalCitations, lastChecked }

// GET /api/geo/sites/:id/competitors — Share of Voice: welche Domains werden über alle Checks
// hinweg am häufigsten mitgenannt (nicht nur ob die eigene Domain erwähnt wird).
export async function getCompetitors(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_GEO_SUB', req.language) })

        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const cacheKey = String(site._id)
        const lastCheckedKey = site.lastChecked ? new Date(site.lastChecked).getTime() : null
        const cached = COMPETITORS_CACHE.get(cacheKey)
        if (cached && cached.lastChecked === lastCheckedKey) {
            return res.json({ competitors: cached.data, totalCitations: cached.totalCitations, cached: true })
        }

        const normalizedOwnDomain = site.domain.replace(/^www\./, '').toLowerCase()

        const [byDomain, byDomainKeyword, totalAgg] = await Promise.all([
            GeoMentionCheck.aggregate([
                { $match: { siteId: site._id } },
                // includeArrayIndex erfasst, an welcher Stelle die Domain im Antworttext zuerst
                // genannt wurde (extractDomainMentions bewahrt diese Reihenfolge) — Basis für avgPosition.
                { $unwind: { path: '$citations', includeArrayIndex: 'citationIndex' } },
                { $match: {
                    'citations.domain': { $ne: null, $nin: [normalizedOwnDomain] },
                } },
                { $group: {
                    _id: '$citations.domain',
                    count: { $sum: 1 },
                    avgPosition: { $avg: '$citationIndex' },
                    platforms: { $addToSet: '$platform' },
                    lastSeen: { $max: '$checkedAt' },
                    sampleTitle: { $first: '$citations.title' },
                } },
                { $sort: { count: -1 } },
                { $limit: 20 },
            ]),
            // Welches Keyword hat die Erwähnung ausgelöst? Pro Domain getrennt aggregiert,
            // damit "wofür wird die Domain genannt" ohne eine weitere Anfrage im Frontend sichtbar ist.
            GeoMentionCheck.aggregate([
                { $match: { siteId: site._id } },
                { $unwind: '$citations' },
                { $match: {
                    'citations.domain': { $ne: null, $nin: [normalizedOwnDomain] },
                } },
                { $group: {
                    _id: { domain: '$citations.domain', keyword: '$keyword' },
                    count: { $sum: 1 },
                } },
                { $sort: { count: -1 } },
            ]),
            GeoMentionCheck.aggregate([
                { $match: { siteId: site._id } },
                { $unwind: '$citations' },
                { $count: 'total' },
            ]),
        ])

        const keywordsByDomain = {}
        for (const row of byDomainKeyword) {
            const list = keywordsByDomain[row._id.domain] || (keywordsByDomain[row._id.domain] = [])
            list.push({ keyword: row._id.keyword, count: row.count })
        }

        const total = totalAgg[0]?.total || 0
        const competitors = byDomain.map(c => ({
            domain: c._id,
            count: c.count,
            share: total > 0 ? Math.round((c.count / total) * 1000) / 10 : 0,
            // citationIndex ist 0-basiert (0 = zuerst genannt) — +1 für die "Platz 1, 2, 3..."-Anzeige.
            avgPosition: c.avgPosition != null ? Math.round((c.avgPosition + 1) * 10) / 10 : null,
            platforms: c.platforms,
            lastSeen: c.lastSeen,
            title: c.sampleTitle,
            keywords: (keywordsByDomain[c._id] || []).slice(0, 5).map(k => k.keyword),
        }))

        COMPETITORS_CACHE.set(cacheKey, { data: competitors, totalCitations: total, lastChecked: lastCheckedKey })
        res.json({ competitors, totalCitations: total })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const MARKET_ANALYTICS_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000 // wöchentlich, wie der Auto-Check
// Ein leeres Ergebnis (0 Domains) nur kurz cachen — sonst bleibt ein "gerade noch keine Daten
// gefunden"-Zustand tagelang hängen, obwohl ein erneuter Versuch in ein paar Minuten schon
// Treffer liefern könnte (z.B. wenn DataForSEO die Daten für ein Keyword erst nachträglich indiziert).
const MARKET_ANALYTICS_EMPTY_TTL_MS = 5 * 60 * 1000
const MARKET_ANALYTICS_CACHE = new Map() // geoSiteId -> { data, expiresAt }

// GET /api/geo/sites/:id/market-analytics — Pro/Expert: welche Domains werden über DataForSEOs
// eigenen (breiteren) Datensatz zu den getrackten Keywords hinweg am häufigsten von KI-Systemen
// genannt. Ergänzt getCompetitors() (das nur aus den eigenen Check-Ergebnissen aggregiert) um
// eine Marktsicht, die nicht von den eigenen Checks abhängt.
export async function getMarketAnalytics(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_GEO_SUB', req.language) })
        if (!(await getLimits(req.userId, plan)).competitorAnalyticsEnabled) {
            return res.status(403).json({ error: req.language === 'en'
                ? 'Competitor analytics requires the Pro or Expert plan'
                : 'Wettbewerbs-Analytics erfordert den Pro- oder Expert-Plan' })
        }

        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })
        if (!site.keywords?.length) return res.json({ domains: [] })

        const cacheKey = String(site._id)
        const cached = MARKET_ANALYTICS_CACHE.get(cacheKey)
        if (cached && cached.expiresAt > Date.now()) {
            return res.json({ domains: cached.data, cached: true })
        }

        const domains = await getTopMentionedDomains(site.keywords, site.language)
        const ttl = domains.length ? MARKET_ANALYTICS_CACHE_TTL_MS : MARKET_ANALYTICS_EMPTY_TTL_MS
        MARKET_ANALYTICS_CACHE.set(cacheKey, { data: domains, expiresAt: Date.now() + ttl })

        res.json({ domains, cached: false })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


export async function getMentionHistory(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_GEO_SUB', req.language) })

        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const byDay = await GeoMentionCheck.aggregate([
            { $match: { siteId: site._id } },
            { $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$checkedAt' } },
                checked: { $sum: 1 },
                mentioned: { $sum: { $cond: ['$mentioned', 1, 0] } },
            } },
            { $sort: { _id: 1 } },
        ])

        const history = byDay.map(d => ({
            date: d._id,
            checked: d.checked,
            mentioned: d.mentioned,
            rate: d.checked > 0 ? Math.round((d.mentioned / d.checked) * 1000) / 10 : 0,
        }))

        res.json({ history })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// keyword -> lastFetchedMonth: verhindert, dass bei jedem Aufruf die komplette Historie seit
// 2025-08 neu abgefragt wird — nur der aktuelle Monat wird pro Kalendermonat einmal nachgeladen,
// alte Monate ändern sich ohnehin nicht. Bewusst nicht zeitbasiert (TTL), sondern an den
// Kalendermonat gekoppelt, weil ein neuer Monat sofort neue Daten haben kann.
const HISTORICAL_TREND_CACHE = new Map() // `${siteId}:${keyword}` -> { history, lastFetchedMonth }

// GET /api/geo/sites/:id/keywords/:keyword/trend — Expert only, pro Keyword abgerufen (nicht
// bulk für alle Keywords einer Site), damit die Kosten proportional zur tatsächlichen Nutzung
// bleiben statt bei jedem Refresh für alle 100 Keywords auf einmal anzufallen.
export async function getHistoricalTrend(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_GEO_SUB', req.language) })
        if (!(await getLimits(req.userId, plan)).historicalTrendsEnabled) {
            return res.status(403).json({ error: req.language === 'en'
                ? 'Historical trends require the Expert plan'
                : 'Historien-Trends erfordern den Expert-Plan' })
        }

        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const keyword = (req.params.keyword || '').trim().toLowerCase()
        if (!keyword || !site.keywords.includes(keyword)) {
            return res.status(404).json({ error: req.language === 'en'
                ? 'Keyword not tracked on this site'
                : 'Keyword wird bei dieser Website nicht getrackt' })
        }

        const cacheKey = `${site._id}:${keyword}`
        const currentMonth = new Date().toISOString().slice(0, 7)
        const cached = HISTORICAL_TREND_CACHE.get(cacheKey)

        if (cached && cached.lastFetchedMonth === currentMonth) {
            return res.json({ history: cached.history, cached: true })
        }

        const newEntries = await getKeywordMentionHistory(keyword, site.language, cached?.lastFetchedMonth)
        const merged = cached
            ? [...cached.history.filter(h => !newEntries.some(n => n.month === h.month && n.platform === h.platform)), ...newEntries]
                .sort((a, b) => a.month.localeCompare(b.month))
            : newEntries

        HISTORICAL_TREND_CACHE.set(cacheKey, { history: merged, lastFetchedMonth: currentMonth })
        res.json({ history: merged, cached: false })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Ab dieser Position gilt ein Keyword als "sichtbar" bei Google (oberhalb: Seite 1-2).
const SEO_VISIBLE_THRESHOLD = 20

// SeoTrackedSite normalisiert die Domain nicht um www — beim Vergleich beide Seiten angleichen.
// Geteilt zwischen getCorrelation und getKeywordSuggestions, damit die Zuordnungslogik nur einmal existiert.
async function findLinkedSeoSite(userId, geoDomain) {
    const normalizedDomain = geoDomain.replace(/^www\./, '').toLowerCase()
    const seoSites = await SeoTrackedSite.find({ userId, isActive: true }).lean()
    return seoSites.find(s => s.domain.replace(/^www\./, '').toLowerCase() === normalizedDomain) || null
}

// GET /api/geo/sites/:id/correlation — der strukturelle Vorteil gegenüber reinen GEO-Trackern:
// SEO-Ranking und GEO-Erwähnung stammen aus demselben System und lassen sich pro Keyword
// gegenüberstellen ("rankt bei Google, wird aber nie von ChatGPT genannt" — oder umgekehrt).
// Setzt voraus, dass für dieselbe Domain desselben Nutzers auch ein SEO-Automatisierung-Abo läuft.
export async function getCorrelation(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_GEO_SUB', req.language) })

        const geoSite = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!geoSite) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const seoSite = await findLinkedSeoSite(req.userId, geoSite.domain)

        if (!seoSite) {
            return res.json({ linked: false, matched: [], seoOnlyKeywords: [], geoOnlyKeywords: [] })
        }

        const geoKeywordSet = new Set(geoSite.keywords)
        const seoKeywordSet = new Set(seoSite.keywords)
        const overlap = geoSite.keywords.filter(kw => seoKeywordSet.has(kw))

        const geoPlatforms = geoSite.platforms?.length ? geoSite.platforms : ['claude']
        const intents = activeIntents(geoSite.promptVariants)

        const matched = await Promise.all(overlap.map(async (keyword) => {
            // Die letzten beiden Rank-Checks statt nur des aktuellen — der zweite dient als
            // Vergleichspunkt für den Positions-Trend (verbessert/verschlechtert), ohne dass
            // dafür eine eigene History-Tabelle gepflegt werden muss.
            const seoRankDocs = await SeoKeywordRanking.find({ siteId: seoSite._id, keyword })
                .sort({ checkedAt: -1 }).limit(2).lean()
            const seoRank     = seoRankDocs[0] || null
            const seoRankPrev = seoRankDocs[1] || null

            const geoDocs = await Promise.all(geoPlatforms.flatMap(platform =>
                intents.map(promptIntent =>
                    GeoMentionCheck.findOne({ siteId: geoSite._id, keyword, platform, promptIntent: intentQuery(promptIntent) })
                        .sort({ checkedAt: -1 }).lean()
                )
            ))
            const geoMentioned = geoDocs.some(d => d?.mentioned)
            const geoChecked = geoDocs.some(Boolean)

            const seoVisible = seoRank?.position != null && seoRank.position <= SEO_VISIBLE_THRESHOLD

            let verdict = 'neither'
            if (seoVisible && geoMentioned) verdict = 'both'
            else if (seoVisible && !geoMentioned) verdict = 'seo_only'
            else if (!seoVisible && geoMentioned) verdict = 'geo_only'

            return {
                keyword,
                seoPosition: seoRank?.position ?? null,
                seoPositionPrevious: seoRankPrev?.position ?? null,
                seoCheckedAt: seoRank?.checkedAt ?? null,
                geoMentioned,
                geoChecked,
                verdict,
            }
        }))

        // Durchschnittliche Platzierung + Trend — nur über Keywords mit tatsächlicher Position
        // gemittelt, und der Trend nur über Keywords, die sowohl einen aktuellen als auch einen
        // vorherigen Wert haben (fairer Vergleich derselben Keyword-Menge).
        const withPosition = matched.filter(m => m.seoPosition != null)
        const avgPosition = withPosition.length
            ? Math.round((withPosition.reduce((s, m) => s + m.seoPosition, 0) / withPosition.length) * 10) / 10
            : null

        const withBothPositions = matched.filter(m => m.seoPosition != null && m.seoPositionPrevious != null)
        const avgPositionDelta = withBothPositions.length
            ? Math.round((
                (withBothPositions.reduce((s, m) => s + m.seoPosition, 0) / withBothPositions.length)
                - (withBothPositions.reduce((s, m) => s + m.seoPositionPrevious, 0) / withBothPositions.length)
            ) * 10) / 10
            : null

        res.json({
            linked: true,
            seoSiteId: seoSite._id,
            matched,
            seoOnlyKeywords: seoSite.keywords.filter(kw => !geoKeywordSet.has(kw)),
            geoOnlyKeywords: geoSite.keywords.filter(kw => !seoKeywordSet.has(kw)),
            avgPosition,
            avgPositionDelta,
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Ein Call pro Site pro Tag reicht — die SEO-Keyword-Liste ändert sich selten, und die Klassifizierung
// ist bewusst kein Live-Signal, das bei jedem Seitenaufruf neu berechnet werden muss.
const KEYWORD_SUGGESTIONS_CACHE = new Map() // geoSiteId -> { data, expiresAt }
const SUGGESTIONS_CACHE_TTL_MS = 24 * 60 * 60 * 1000

// GET /api/geo/sites/:id/keyword-suggestions — schlägt SEO-Keywords vor, die noch nicht im
// GEO-Tracking sind, gefiltert auf empfehlungsfähige Begriffe (kein 1:1-Import der ganzen Liste,
// da viele SEO-Keywords enge Rechercheanfragen sind, die niemand einer KI stellen würde).
export async function getKeywordSuggestions(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_GEO_SUB', req.language) })

        const geoSite = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!geoSite) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const seoSite = await findLinkedSeoSite(req.userId, geoSite.domain)
        if (!seoSite) {
            return res.json({ linked: false, suggestions: [] })
        }

        const geoKeywordSet = new Set(geoSite.keywords)
        const seoOnlyKeywords = seoSite.keywords.filter(kw => !geoKeywordSet.has(kw))
        if (!seoOnlyKeywords.length) {
            return res.json({ linked: true, suggestions: [] })
        }

        const cacheKey = String(geoSite._id)
        const cached = KEYWORD_SUGGESTIONS_CACHE.get(cacheKey)
        if (cached && cached.expiresAt > Date.now() && cached.sourceCount === seoOnlyKeywords.length) {
            return res.json({ linked: true, suggestions: cached.data, cached: true })
        }

        const monthlyLimit = (await getLimits(req.userId, plan))?.keywordSuggestionsPerMonth ?? 5
        const month = new Date().toISOString().slice(0, 7)
        const usage = await GeoUsage.findOne({ userId: req.userId, feature: 'keyword_suggestions', month }).lean()
        const used = usage?.count ?? 0
        if (used >= monthlyLimit) {
            return res.status(429).json({ error: 'monthly_limit_reached', limit: monthlyLimit, used })
        }
        await GeoUsage.findOneAndUpdate(
            { userId: req.userId, feature: 'keyword_suggestions', month },
            { $inc: { count: 1 } },
            { upsert: true }
        )

        const suitable = await classifyGeoSuitableKeywords(seoOnlyKeywords, geoSite.language)

        // Reale AI-Suchvolumen ergänzen statt nur auf die LLM-Einschätzung zu vertrauen, welches
        // Keyword "wie eine KI-Frage klingt" — und danach absteigend sortieren, damit die Vorschläge
        // mit dem größten echten Nutzen zuerst stehen.
        const location = geoSite.language === 'en' ? 'United States' : 'Germany'
        const volumes = await getAiKeywordVolume(suitable, location, geoSite.language).catch(() => [])
        const volumeByKeyword = Object.fromEntries(volumes.map(v => [v.keyword.toLowerCase(), v.aiSearchVolume]))

        const suggestions = suitable
            .map(keyword => ({ keyword, aiSearchVolume: volumeByKeyword[keyword.toLowerCase()] ?? null }))
            .sort((a, b) => (b.aiSearchVolume ?? -1) - (a.aiSearchVolume ?? -1))

        KEYWORD_SUGGESTIONS_CACHE.set(cacheKey, { data: suggestions, expiresAt: Date.now() + SUGGESTIONS_CACHE_TTL_MS, sourceCount: seoOnlyKeywords.length })

        res.json({ linked: true, suggestions, cached: false })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}