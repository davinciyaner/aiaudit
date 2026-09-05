import GeoTrackedSite from '../models/geo_tracked_site.js'
import GeoMentionCheck from '../models/geo_mention_check.js'
import GeoUsage from '../models/geo_usage.js'
import ProductSubscription from '../models/product_subscription.js'
import SeoTrackedSite from '../models/seo_tracked_site.js'
import SeoKeywordRanking from '../models/seo_keyword_ranking.js'
import {
    checkSiteMentions, PLATFORM_COSTS, PROMPT_INTENTS, classifyGeoSuitableKeywords, getAiKeywordVolume,
    getTopMentionedDomains, getKeywordMentionHistory,
} from '../services/geoService.js'
import { analyzeGEO } from './geo.js'
import { assertPublicHttpsUrl, fetchSafely } from '../utils/safeFetch.js'
import { t } from '../utils/i18n/errors.js'

const VALID_PLATFORMS = ['claude', 'chatgpt', 'gemini', 'perplexity', 'google_aio']

// Preise/Limits per 2026-09: Kostenanalyse ergab, dass die alten Limits (30/100 Keywords,
// 8/20 manuelle Checks — jeder manuelle Check = voller Rerun aller Keywords) bei voller
// Ausschöpfung deutlich mehr an DataForSEO-API-Kosten verursachen als der Plan einbringt.
// Keywords und manuelle Checks wurden gesenkt, Pro/Expert-Preise entsprechend angehoben
// (siehe geo/pricing-Seiten), damit auch der Worst Case (volles Kontingent genutzt) nach
// PayPal-Gebühr und 50% Steuerrücklage noch komfortabel Marge lässt.
// keywordSuggestionsPerMonth per 2026-09: getKeywordSuggestions (Cross-Sell-Feature, nur aktiv wenn
// derselbe Nutzer für dieselbe Domain zusätzlich ein SEO-Automatisierung-Abo hat) war nur über einen
// 24h-Cache pro Site gedeckelt, kein echtes Monats-Kontingent — bei mehreren Sites theoretisch näher
// an "täglich pro Site" als an einem echten Limit. Live getestet (ai_keyword_data + Claude Haiku):
// ca. $0,02-0,035/Aufruf. Werte proportional zu maxSites, bleibt weit innerhalb des 1/4-Marge-Budgets.
const PLAN_LIMITS = {
    einsteiger: { maxSites: 1,  maxKeywords: 10, platforms: ['claude', 'gemini'],                                      manualChecksPerMonth: 2, promptVariants: 1, competitorAnalyticsEnabled: false, historicalTrendsEnabled: false, keywordSuggestionsPerMonth: 5  },
    pro:        { maxSites: 3,  maxKeywords: 20, platforms: ['claude', 'chatgpt', 'gemini', 'perplexity', 'google_aio'], manualChecksPerMonth: 2, promptVariants: 2, competitorAnalyticsEnabled: true,  historicalTrendsEnabled: false, keywordSuggestionsPerMonth: 15 },
    expert:     { maxSites: 10, maxKeywords: 60, platforms: ['claude', 'chatgpt', 'gemini', 'perplexity', 'google_aio'], manualChecksPerMonth: 3, promptVariants: 2, competitorAnalyticsEnabled: true,  historicalTrendsEnabled: true,  keywordSuggestionsPerMonth: 30 },
}

async function getGeoPlan(userId) {
    const sub = await ProductSubscription.findOne({ userId, product: 'geo', status: 'ACTIVE' })
    return sub ? sub.plan : null
}

// Eigene Prompts zaehlen gegen dasselbe Kontingent wie Keywords — ein API-Call kostet gleich viel,
// unabhaengig davon ob die Frage aus einem Keyword-Template oder einem eigenen Prompt stammt.
async function countTotalKeywords(userId) {
    const sites = await GeoTrackedSite.find({ userId, isActive: true }, 'keywords customPrompts').lean()
    return sites.reduce((sum, s) => sum + (s.keywords?.length || 0) + (s.customPrompts?.length || 0), 0)
}

// customPromptCount laeuft nur mit 1 Intent ('custom', keine Vergleich-Variante) statt variantCount —
// der Nutzer gibt die exakte Frage bereits vor, ein zweites Template ergaebe keinen Sinn.
function calcMonthlyCost(keywordCount, platforms, variantCount = 1, customPromptCount = 0) {
    const checksPerMonth = (keywordCount * variantCount + customPromptCount) * platforms.length * 4
    const costPerCheck = platforms.reduce((sum, p) => sum + (PLATFORM_COSTS[p] || 0), 0) / platforms.length
    return Math.round(checksPerMonth * costPerCheck * 100) / 100
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
        const limits = PLAN_LIMITS[plan]

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

        const limits = PLAN_LIMITS[plan]

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

        const limits = PLAN_LIMITS[plan]
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

        const limits = PLAN_LIMITS[plan]
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

        const limits = PLAN_LIMITS[plan]
        const allowedPlatforms = platforms.filter(p => VALID_PLATFORMS.includes(p) && limits.platforms.includes(p))
        if (!allowedPlatforms.length) return res.status(400).json({ error: t('NO_ALLOWED_PLATFORMS_FOR_PLAN', req.language) })

        const site = await GeoTrackedSite.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { platforms: allowedPlatforms },
            { new: true }
        )
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const monthlyCost = calcMonthlyCost(site.keywords.length, allowedPlatforms, site.promptVariants, site.customPrompts?.length || 0)
        res.json({ site, monthlyCost })
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
        const monthlyCost = calcMonthlyCost(site.keywords.length, platforms, site.promptVariants, site.customPrompts?.length || 0)

        const month = new Date().toISOString().slice(0, 7)
        const usage = await GeoUsage.findOne({ userId: req.userId, feature: 'manual_check', month }).lean()
        const manualChecksUsed = usage?.count ?? 0
        const manualChecksLimit = PLAN_LIMITS[plan].manualChecksPerMonth

        res.json({ site, results, intents, mentionRate, mentionedCount: totalMentioned, checkedCount: totalChecked, monthlyCost, manualChecksUsed, manualChecksLimit })
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
        const manualLimit = PLAN_LIMITS[plan].manualChecksPerMonth
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
const CITATION_ANALYSIS_CACHE = new Map() // url -> { data, expiresAt }
const CITATION_CACHE_TTL_MS = 24 * 60 * 60 * 1000

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

        const normalizedUrl = parsedUrl.toString()
        const cached = CITATION_ANALYSIS_CACHE.get(normalizedUrl)
        if (cached && cached.expiresAt > Date.now()) {
            return res.json({ analysis: cached.data, cached: true })
        }

        let pageRes
        try {
            pageRes = await fetchSafely(normalizedUrl, {
                headers: { 'User-Agent': 'AuditAI-GEO-Bot/1.0' },
                timeoutMs: 10000,
            })
        } catch (err) {
            return res.status(400).json({ error: err.message || t('PAGE_FETCH_FAILED', req.language) })
        }
        if (!pageRes.ok) return res.status(502).json({ error: req.language === 'en'
            ? `Page responded with status ${pageRes.status}`
            : `Seite antwortete mit Status ${pageRes.status}` })

        const html = await pageRes.text()
        const analysis = await analyzeGEO(normalizedUrl, html)

        CITATION_ANALYSIS_CACHE.set(normalizedUrl, { data: analysis, expiresAt: Date.now() + CITATION_CACHE_TTL_MS })

        res.json({ analysis, cached: false })
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
        if (!PLAN_LIMITS[plan].competitorAnalyticsEnabled) {
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
        if (!PLAN_LIMITS[plan].historicalTrendsEnabled) {
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

        const monthlyLimit = PLAN_LIMITS[plan]?.keywordSuggestionsPerMonth ?? 5
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