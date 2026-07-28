import dns from 'dns'
import net from 'net'
import GeoTrackedSite from '../models/geo_tracked_site.js'
import GeoMentionCheck from '../models/geo_mention_check.js'
import GeoUsage from '../models/geo_usage.js'
import ProductSubscription from '../models/product_subscription.js'
import { checkSiteMentions, PLATFORM_COSTS, PROMPT_INTENTS } from '../services/geoService.js'
import { analyzeGEO } from './geo.js'

const VALID_PLATFORMS = ['claude', 'chatgpt', 'perplexity', 'google_aio']

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

// SSRF-Schutz: die URL kommt vom Nutzer (Zitat aus einer KI-Antwort) — ohne IP-Prüfung könnte der Server
// als Proxy missbraucht werden, um interne Adressen abzufragen (localhost, private Netze, Cloud-Metadata
// wie 169.254.169.254). Prüft alle DNS-Antworten, nicht nur die erste (verhindert DNS-Rebinding-Tricks).
function isPrivateOrReservedIp(ip) {
    if (net.isIP(ip) === 4) {
        const [a, b] = ip.split('.').map(Number)
        if (a === 10) return true                      // 10.0.0.0/8
        if (a === 127) return true                      // Loopback
        if (a === 0) return true                         // 0.0.0.0/8
        if (a === 169 && b === 254) return true          // Link-local, inkl. Cloud-Metadata
        if (a === 172 && b >= 16 && b <= 31) return true  // 172.16.0.0/12
        if (a === 192 && b === 168) return true           // 192.168.0.0/16
        if (a === 100 && b >= 64 && b <= 127) return true // 100.64.0.0/10 (CGNAT)
        if (a >= 224) return true                          // Multicast/reserviert
        return false
    }
    if (net.isIP(ip) === 6) {
        const lower = ip.toLowerCase()
        if (lower === '::1' || lower === '::') return true
        if (lower.startsWith('fe8') || lower.startsWith('fe9') || lower.startsWith('fea') || lower.startsWith('feb')) return true // fe80::/10
        if (lower.startsWith('fc') || lower.startsWith('fd')) return true // fc00::/7 (Unique Local)
        const v4Mapped = lower.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)
        if (v4Mapped) return isPrivateOrReservedIp(v4Mapped[1])
        return false
    }
    return true // unbekanntes Format -> sicherheitshalber blocken
}

async function assertPublicUrl(url) {
    const parsed = new URL(url)
    if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Nur http/https erlaubt')
    if (parsed.hostname === 'localhost') throw new Error('Interne Adressen sind nicht erlaubt')

    const addresses = await dns.promises.lookup(parsed.hostname, { all: true })
    if (!addresses.length) throw new Error('Domain konnte nicht aufgelöst werden')
    if (addresses.some(a => isPrivateOrReservedIp(a.address))) {
        throw new Error('Interne/private Adressen sind nicht erlaubt')
    }
    return parsed
}

// Redirects manuell folgen statt fetch()s eingebautem Verhalten zu vertrauen — sonst könnte eine anfangs
// öffentliche URL auf eine interne Adresse weiterleiten und die Prüfung oben umgehen.
async function fetchPublicUrl(url, options, maxRedirects = 3) {
    let currentUrl = url
    for (let i = 0; i <= maxRedirects; i++) {
        await assertPublicUrl(currentUrl)
        const res = await fetch(currentUrl, { ...options, redirect: 'manual' })
        if ([301, 302, 303, 307, 308].includes(res.status)) {
            const location = res.headers.get('location')
            if (!location) throw new Error('Weiterleitung ohne Ziel-URL')
            currentUrl = new URL(location, currentUrl).toString()
            continue
        }
        return res
    }
    throw new Error('Zu viele Weiterleitungen')
}

// POST /api/geo/analyze-citation  { url }
export async function analyzeCitation(req, res) {
    try {
        const plan = await getGeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives GEO-Automatisierung Abo' })

        const { url } = req.body
        if (!url) return res.status(400).json({ error: 'url erforderlich' })

        try {
            await assertPublicUrl(url)
        } catch (err) {
            return res.status(400).json({ error: err.message || 'Ungültige URL' })
        }

        const cached = CITATION_ANALYSIS_CACHE.get(url)
        if (cached && cached.expiresAt > Date.now()) {
            return res.json({ analysis: cached.data, cached: true })
        }

        let pageRes
        try {
            pageRes = await fetchPublicUrl(url, {
                signal: AbortSignal.timeout(10000),
                headers: { 'User-Agent': 'AuditAI-GEO-Bot/1.0' },
            })
        } catch (err) {
            return res.status(400).json({ error: err.message || 'Seite konnte nicht abgerufen werden' })
        }
        if (!pageRes.ok) return res.status(502).json({ error: `Seite antwortete mit Status ${pageRes.status}` })

        const html = await pageRes.text()
        const analysis = await analyzeGEO(url, html)

        CITATION_ANALYSIS_CACHE.set(url, { data: analysis, expiresAt: Date.now() + CITATION_CACHE_TTL_MS })

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