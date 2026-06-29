import GeoTrackedSite from '../models/geo_tracked_site.js'
import GeoMentionCheck from '../models/geo_mention_check.js'
import GeoUsage from '../models/geo_usage.js'
import ProductSubscription from '../models/product_subscription.js'
import { checkSiteMentions, PLATFORM_COSTS } from '../services/geoService.js'

const VALID_PLATFORMS = ['claude', 'chatgpt']

const PLAN_LIMITS = {
    einsteiger: { maxSites: 1,  maxKeywords: 10,  platforms: ['claude'],            manualChecksPerMonth: 2  },
    pro:        { maxSites: 3,  maxKeywords: 30,  platforms: ['claude', 'chatgpt'], manualChecksPerMonth: 8  },
    expert:     { maxSites: 10, maxKeywords: 100, platforms: ['claude', 'chatgpt'], manualChecksPerMonth: 20 },
}

async function getGeoPlan(userId) {
    const sub = await ProductSubscription.findOne({ userId, product: 'geo', status: 'ACTIVE' })
    return sub ? sub.plan : null
}

async function countTotalKeywords(userId) {
    const sites = await GeoTrackedSite.find({ userId, isActive: true }, 'keywords').lean()
    return sites.reduce((sum, s) => sum + (s.keywords?.length || 0), 0)
}

function calcMonthlyCost(keywords, platforms) {
    const checksPerMonth = keywords * platforms.length * 4
    const costPerCheck = platforms.reduce((sum, p) => sum + (PLATFORM_COSTS[p] || 0), 0) / platforms.length
    return Math.round(checksPerMonth * costPerCheck * 100) / 100
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

            let totalChecked = 0, totalMentioned = 0
            await Promise.all(site.keywords.map(async (keyword) => {
                await Promise.all(platforms.map(async (platform) => {
                    const latest = await GeoMentionCheck.findOne({ siteId: site._id, keyword, platform })
                        .sort({ checkedAt: -1 }).lean()
                    if (latest) {
                        totalChecked++
                        if (latest.mentioned) totalMentioned++
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

        const monthlyCost = calcMonthlyCost(site.keywords.length, allowedPlatforms)
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

        const results = await Promise.all(site.keywords.map(async (keyword) => {
            const checks = {}
            await Promise.all(platforms.map(async (platform) => {
                checks[platform] = await GeoMentionCheck.findOne({ siteId: site._id, keyword, platform })
                    .sort({ checkedAt: -1 }).lean()
            }))
            const history = await GeoMentionCheck.find({ siteId: site._id, keyword })
                .sort({ checkedAt: -1 }).limit(24).lean()
            return { keyword, checks, history: history.reverse() }
        }))

        let totalChecked = 0, totalMentioned = 0
        results.forEach(r => {
            platforms.forEach(p => {
                if (r.checks[p] != null) {
                    totalChecked++
                    if (r.checks[p].mentioned) totalMentioned++
                }
            })
        })
        const mentionRate = totalChecked > 0 ? Math.round((totalMentioned / totalChecked) * 100) : null
        const monthlyCost = calcMonthlyCost(site.keywords.length, platforms)

        const month = new Date().toISOString().slice(0, 7)
        const usage = await GeoUsage.findOne({ userId: req.userId, feature: 'manual_check', month }).lean()
        const manualChecksUsed = usage?.count ?? 0
        const manualChecksLimit = PLAN_LIMITS[plan].manualChecksPerMonth

        res.json({ site, results, mentionRate, mentionedCount: totalMentioned, checkedCount: totalChecked, monthlyCost, manualChecksUsed, manualChecksLimit })
    } catch (err) {
        res.status(500).json({ error: err.message })
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

        const results = await checkSiteMentions(site)

        await GeoMentionCheck.insertMany(results.map(r => ({
            siteId:    site._id,
            userId:    req.userId,
            keyword:   r.keyword,
            platform:  r.platform,
            mentioned: r.mentioned,
            context:   r.context,
            checkedAt: new Date(),
        })))

        await GeoTrackedSite.updateOne({ _id: site._id }, { lastChecked: new Date() })

        res.json({ results, checkedAt: new Date() })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}