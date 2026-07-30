import GeoTrackedSite from '../models/geo_tracked_site.js'
import GeoMentionCheck from '../models/geo_mention_check.js'
import GeoUsage from '../models/geo_usage.js'
import ProductSubscription from '../models/product_subscription.js'
import SeoTrackedSite from '../models/seo_tracked_site.js'
import SeoKeywordRanking from '../models/seo_keyword_ranking.js'
import { checkSiteMentions, PLATFORM_COSTS, PROMPT_INTENTS } from '../services/geoService.js'
import { analyzeGEO } from './geo.js'
import { assertPublicHttpsUrl, fetchSafely } from '../utils/safeFetch.js'

const VALID_PLATFORMS = ['claude', 'chatgpt', 'perplexity', 'google_aio']
const ALLOWED_CITATION_HOSTS = ['example.com']

function isAllowedCitationHost(hostname) {
    const lowerHost = hostname.toLowerCase()
    return ALLOWED_CITATION_HOSTS.some(allowed => lowerHost === allowed || lowerHost.endsWith(`.${allowed}`))
}

const PLAN_LIMITS = {
    einsteiger: { maxSites: 1,  maxKeywords: 10,  platforms: ['claude'],                                      manualChecksPerMonth: 2,  promptVariants: 1 },
    pro:        { maxSites: 3,  maxKeywords: 30,  platforms: ['claude', 'chatgpt', 'perplexity', 'google_aio'], manualChecksPerMonth: 8,  promptVariants: 2 },
    expert:     { maxSites: 10, maxKeywords: 100, platforms: ['claude', 'chatgpt', 'perplexity', 'google_aio'], manualChecksPerMonth: 20, promptVariants: 2 },
}

async function getGeoPlan(userId) {
    const sub = await ProductSubscription.findOne({ userId, product: 'geo', status: 'ACTIVE' })
    return sub ? sub.plan : null
}

async function countTotalKeywords(userId) {
    const sites = await GeoTrackedSite.find({ userId, isActive: true }, 'keywords').lean()
    return sites.reduce((sum, s) => sum + (s.keywords?.length || 0), 0)
}

function calcMonthlyCost(keywords, platforms, variantCount = 1) {
    const checksPerMonth = keywords * platforms.length * variantCount * 4
    const costPerCheck = platforms.reduce((sum, p) => sum + (PLATFORM_COSTS[p] || 0), 0) / platforms.length
    return Math.round(checksPerMonth * costPerCheck * 100) / 100
}

function activeIntents(promptVariants = 1) {
    return PROMPT_INTENTS.slice(0, Math.max(1, Math.min(promptVariants, PROMPT_INTENTS.length)))
}

// Checks von vor der Prompt-Varianten-Einführung haben kein promptIntent-Feld gesetzt (weder 'empfehlung'
// noch der Schema-Default, da der nur bei neu erstellten Dokumenten greift). Damit alte Check-Historie nicht
// unsichtbar wird, zählt "kein Feld gesetzt" für die 'empfehlung'-Variante als Treffer — MongoDB behandelt
// eine Query nach null ohnehin als "Feld ist null ODER fehlt".
function intentQuery(promptIntent) {
    return promptIntent === 'empfehlung' ? { $in: ['empfehlung', null] } : promptIntent
}

// GET /api/geo/plan
export async function getPlan(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        res.json({ plan })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// POST /api/geo/subscribe
export async function subscribePlan(req, res) {
    try {
        const { subscriptionId, plan } = req.body
        if (!subscriptionId || !plan) return res.status(400).json({ error: 'subscriptionId und plan erforderlich' })
        if (!['einsteiger', 'pro', 'expert'].includes(plan)) return res.status(400).json({ error: 'Ungültiger Plan' })

        await ProductSubscription.findOneAndUpdate(
            { userId: req.userId, product: 'geo' },
            { userId: req.userId, product: 'geo', plan, paypalSubscriptionId: subscriptionId, status: 'ACTIVE' },
            { upsert: true, new: true }
        )
        res.json({ success: true, plan })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/geo/sites
export async function getSites(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives GEO-Automatisierung Abo' })

        const sites = await GeoTrackedSite.find({ userId: req.userId, isActive: true }).lean()
        const limits = PLAN_LIMITS[plan]

        const enriched = await Promise.all(sites.map(async (site) => {
            if (!site.keywords?.length) return { ...site, mentionRate: null, mentionedCount: 0, checkedCount: 0 }
            const platforms = site.platforms?.length ? site.platforms : ['claude']
            const intents = activeIntents(site.promptVariants)

            // "gecheckt"/"erwähnt" pro Keyword×Plattform gilt, wenn mindestens eine Prompt-Variante einen Treffer hat
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

            const mentionRate = totalChecked > 0 ? Math.round((totalMentioned / totalChecked) * 100) : null
            return { ...site, mentionRate, mentionedCount: totalMentioned, checkedCount: totalChecked }
        }))

        const totalKeywords = sites.reduce((s, site) => s + (site.keywords?.length || 0), 0)

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

// GET /api/geo/sites/:id
export async function getSite(req, res) {
    try {
        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })
        res.json({ site })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// POST /api/geo/sites
export async function addSite(req, res) {
    try {
        const { domain, displayName, keywords = [], language = 'de', platforms = ['claude'] } = req.body
        if (!domain) return res.status(400).json({ error: 'Domain erforderlich' })

        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives GEO-Automatisierung Abo' })

        const limits = PLAN_LIMITS[plan]

        const siteCount = await GeoTrackedSite.countDocuments({ userId: req.userId, isActive: true })
        if (siteCount >= limits.maxSites) {
            return res.status(403).json({ error: `Maximal ${limits.maxSites} Website${limits.maxSites > 1 ? 's' : ''} für ${plan}-Plan` })
        }

        const totalKeywords = await countTotalKeywords(req.userId)
        const slotsLeft = limits.maxKeywords - totalKeywords

        const allowedPlatforms = platforms.filter(p => VALID_PLATFORMS.includes(p) && limits.platforms.includes(p))
        if (!allowedPlatforms.length) return res.status(400).json({ error: 'Mindestens eine Plattform erforderlich' })

        let normalizedDomain
        try {
            const parsed = new URL(domain.startsWith('http') ? domain : `https://${domain}`)
            normalizedDomain = parsed.hostname.toLowerCase().replace(/^www\./, '')
        } catch {
            return res.status(400).json({ error: 'Ungültige Domain' })
        }

        // SSRF-Härtung: verhindert, dass überhaupt erst eine interne/private Domain gespeichert wird
        // (die später vom wöchentlichen Audit-Re-Check automatisch abgerufen würde).
        try {
            await assertPublicHttpsUrl(`https://${normalizedDomain}`)
        } catch (err) {
            return res.status(400).json({ error: err.message || 'Domain nicht erlaubt' })
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
        if (err.code === 11000) return res.status(409).json({ error: 'Website wird bereits getrackt' })
        res.status(500).json({ error: err.message })
    }
}

// DELETE /api/geo/sites/:id
export async function deleteSite(req, res) {
    try {
        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })

        await Promise.all([
            GeoMentionCheck.deleteMany({ siteId: site._id }),
            site.deleteOne(),
        ])

        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// POST /api/geo/sites/:id/keywords
export async function addKeywords(req, res) {
    try {
        const { keywords } = req.body
        if (!Array.isArray(keywords) || !keywords.length) return res.status(400).json({ error: 'keywords[] erforderlich' })

        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives GEO-Automatisierung Abo' })

        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })

        const limits = PLAN_LIMITS[plan]
        const totalKeywords = await countTotalKeywords(req.userId)
        const slotsLeft = limits.maxKeywords - totalKeywords
        if (slotsLeft <= 0) return res.status(403).json({ error: `Keyword-Limit erreicht (${limits.maxKeywords} für ${plan}-Plan)` })

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
        if (!Array.isArray(keywords)) return res.status(400).json({ error: 'keywords[] erforderlich' })

        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })

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

// PATCH /api/geo/sites/:id/platforms
export async function updatePlatforms(req, res) {
    try {
        const { platforms } = req.body
        if (!Array.isArray(platforms) || !platforms.length) return res.status(400).json({ error: 'platforms[] erforderlich' })

        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives GEO-Automatisierung Abo' })

        const limits = PLAN_LIMITS[plan]
        const allowedPlatforms = platforms.filter(p => VALID_PLATFORMS.includes(p) && limits.platforms.includes(p))
        if (!allowedPlatforms.length) return res.status(400).json({ error: 'Keine erlaubten Plattformen für deinen Plan' })

        const site = await GeoTrackedSite.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { platforms: allowedPlatforms },
            { new: true }
        )
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })

        const monthlyCost = calcMonthlyCost(site.keywords.length, allowedPlatforms, site.promptVariants)
        res.json({ site, monthlyCost })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/geo/sites/:id/results
export async function getResults(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives GEO-Automatisierung Abo' })

        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })

        const platforms = site.platforms?.length ? site.platforms : ['claude']
        const intents = activeIntents(site.promptVariants)

        const results = await Promise.all(site.keywords.map(async (keyword) => {
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
            return { keyword, checks, history: history.reverse() }
        }))

        // "erwähnt" pro Keyword×Plattform gilt, wenn mindestens eine Prompt-Variante einen Treffer hat
        let totalChecked = 0, totalMentioned = 0
        results.forEach(r => {
            platforms.forEach(p => {
                const docs = intents.map(i => r.checks[p][i]).filter(Boolean)
                if (docs.length) {
                    totalChecked++
                    if (docs.some(d => d.mentioned)) totalMentioned++
                }
            })
        })
        const mentionRate = totalChecked > 0 ? Math.round((totalMentioned / totalChecked) * 100) : null
        const monthlyCost = calcMonthlyCost(site.keywords.length, platforms, site.promptVariants)

        const month = new Date().toISOString().slice(0, 7)
        const usage = await GeoUsage.findOne({ userId: req.userId, feature: 'manual_check', month }).lean()
        const manualChecksUsed = usage?.count ?? 0
        const manualChecksLimit = PLAN_LIMITS[plan].manualChecksPerMonth

        res.json({ site, results, intents, mentionRate, mentionedCount: totalMentioned, checkedCount: totalChecked, monthlyCost, manualChecksUsed, manualChecksLimit })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Deutlich über der erwarteten Maximaldauer (siehe Live-Messung: ~6,4s/Check) — falls ein Server-Neustart
// mitten im Check passiert, würde checkStatus sonst für immer auf 'running' hängen bleiben.
const STALE_CHECK_MS = 20 * 60 * 1000

// Läuft nach dem Response weiter im Hintergrund — kein HTTP-Timeout-Risiko mehr bei vielen Keywords/Plattformen/Varianten.
async function runCheckInBackground(site, userId) {
    try {
        const results = await checkSiteMentions(site, site.promptVariants)

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

        await GeoTrackedSite.updateOne({ _id: site._id }, { lastChecked: new Date(), checkStatus: 'idle' })
    } catch (err) {
        console.error(`[geo] Hintergrund-Check fehlgeschlagen für ${site.domain}:`, err.message)
        await GeoTrackedSite.updateOne({ _id: site._id }, { checkStatus: 'failed' })
    }
}

// POST /api/geo/sites/:id/check
export async function triggerCheck(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives GEO-Automatisierung Abo' })

        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })
        if (!site.keywords.length) return res.status(400).json({ error: 'Keine Keywords hinterlegt' })

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

        runCheckInBackground(site, req.userId) // bewusst nicht awaited

        res.status(202).json({ status: 'running', startedAt: site.checkStartedAt })
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
        if (!plan) return res.status(403).json({ error: 'Kein aktives GEO-Automatisierung Abo' })

        const { url } = req.body
        if (!url) return res.status(400).json({ error: 'url erforderlich' })

        let parsedUrl
        try {
            parsedUrl = await assertPublicHttpsUrl(url)
        } catch (err) {
            return res.status(400).json({ error: err.message || 'Ungültige URL' })
        }

        if (!isAllowedCitationHost(parsedUrl.hostname)) {
            return res.status(400).json({ error: 'Ziel-Domain ist nicht erlaubt' })
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
            return res.status(400).json({ error: err.message || 'Seite konnte nicht abgerufen werden' })
        }
        if (!pageRes.ok) return res.status(502).json({ error: `Seite antwortete mit Status ${pageRes.status}` })

        const html = await pageRes.text()
        const analysis = await analyzeGEO(normalizedUrl, html)

        CITATION_ANALYSIS_CACHE.set(normalizedUrl, { data: analysis, expiresAt: Date.now() + CITATION_CACHE_TTL_MS })

        res.json({ analysis, cached: false })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/geo/sites/:id/competitors — Share of Voice: welche Domains werden über alle Checks
// hinweg am häufigsten mitgenannt (nicht nur ob die eigene Domain erwähnt wird).
export async function getCompetitors(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives GEO-Automatisierung Abo' })

        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })

        const normalizedOwnDomain = site.domain.replace(/^www\./, '').toLowerCase()

        const [byDomain, totalAgg] = await Promise.all([
            GeoMentionCheck.aggregate([
                { $match: { siteId: site._id } },
                { $unwind: '$citations' },
                { $match: {
                    'citations.domain': { $ne: null, $nin: [normalizedOwnDomain] },
                } },
                { $group: {
                    _id: '$citations.domain',
                    count: { $sum: 1 },
                    platforms: { $addToSet: '$platform' },
                    lastSeen: { $max: '$checkedAt' },
                    sampleTitle: { $first: '$citations.title' },
                } },
                { $sort: { count: -1 } },
                { $limit: 20 },
            ]),
            GeoMentionCheck.aggregate([
                { $match: { siteId: site._id } },
                { $unwind: '$citations' },
                { $count: 'total' },
            ]),
        ])

        const total = totalAgg[0]?.total || 0
        const competitors = byDomain.map(c => ({
            domain: c._id,
            count: c.count,
            share: total > 0 ? Math.round((c.count / total) * 1000) / 10 : 0,
            platforms: c.platforms,
            lastSeen: c.lastSeen,
            title: c.sampleTitle,
        }))

        res.json({ competitors, totalCitations: total })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


export async function getMentionHistory(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives GEO-Automatisierung Abo' })

        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })

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

// Ab dieser Position gilt ein Keyword als "sichtbar" bei Google (oberhalb: Seite 1-2).
const SEO_VISIBLE_THRESHOLD = 20

// GET /api/geo/sites/:id/correlation — der strukturelle Vorteil gegenüber reinen GEO-Trackern:
// SEO-Ranking und GEO-Erwähnung stammen aus demselben System und lassen sich pro Keyword
// gegenüberstellen ("rankt bei Google, wird aber nie von ChatGPT genannt" — oder umgekehrt).
// Setzt voraus, dass für dieselbe Domain desselben Nutzers auch ein SEO-Automatisierung-Abo läuft.
export async function getCorrelation(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives GEO-Automatisierung Abo' })

        const geoSite = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!geoSite) return res.status(404).json({ error: 'Website nicht gefunden' })

        // SeoTrackedSite normalisiert die Domain nicht um www — beim Vergleich beide Seiten angleichen.
        const normalizedDomain = geoSite.domain.replace(/^www\./, '').toLowerCase()
        const seoSites = await SeoTrackedSite.find({ userId: req.userId, isActive: true }).lean()
        const seoSite = seoSites.find(s => s.domain.replace(/^www\./, '').toLowerCase() === normalizedDomain)

        if (!seoSite) {
            return res.json({ linked: false, matched: [], seoOnlyKeywords: [], geoOnlyKeywords: [] })
        }

        const geoKeywordSet = new Set(geoSite.keywords)
        const seoKeywordSet = new Set(seoSite.keywords)
        const overlap = geoSite.keywords.filter(kw => seoKeywordSet.has(kw))

        const geoPlatforms = geoSite.platforms?.length ? geoSite.platforms : ['claude']
        const intents = activeIntents(geoSite.promptVariants)

        const matched = await Promise.all(overlap.map(async (keyword) => {
            const seoRank = await SeoKeywordRanking.findOne({ siteId: seoSite._id, keyword })
                .sort({ checkedAt: -1 }).lean()

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
                seoCheckedAt: seoRank?.checkedAt ?? null,
                geoMentioned,
                geoChecked,
                verdict,
            }
        }))

        res.json({
            linked: true,
            seoSiteId: seoSite._id,
            matched,
            seoOnlyKeywords: seoSite.keywords.filter(kw => !geoKeywordSet.has(kw)),
            geoOnlyKeywords: geoSite.keywords.filter(kw => !seoKeywordSet.has(kw)),
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}