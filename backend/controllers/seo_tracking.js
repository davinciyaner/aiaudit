import SeoTrackedSite from '../models/seo_tracked_site.js'
import SeoKeywordRanking from '../models/seo_keyword_ranking.js'
import ProductSubscription from '../models/product_subscription.js'
import { checkSiteRankings, getKeywordIdeas, getCompetitors, getBacklinkSummary } from '../services/seoService.js'

const PLAN_LIMITS = {
    einsteiger: { maxSites: 3,  maxKeywords: 50  },
    pro:        { maxSites: 10, maxKeywords: 200 },
    expert:     { maxSites: 20, maxKeywords: 500 },
}

async function getSeoPlan(userId) {
    const sub = await ProductSubscription.findOne({ userId, product: 'seo', status: 'ACTIVE' })
    return sub ? sub.plan : null
}

async function countTotalKeywords(userId) {
    const sites = await SeoTrackedSite.find({ userId, isActive: true }, 'keywords').lean()
    return sites.reduce((sum, s) => sum + (s.keywords?.length || 0), 0)
}

// GET /api/seo/plan
export async function getPlan(req, res) {
    try {
        const plan = await getSeoPlan(req.userId)
        res.json({ plan })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// POST /api/seo/subscribe
export async function subscribePlan(req, res) {
    try {
        const { subscriptionId, plan } = req.body
        if (!subscriptionId || !plan) return res.status(400).json({ error: 'subscriptionId und plan erforderlich' })
        if (!['einsteiger', 'pro', 'expert'].includes(plan)) return res.status(400).json({ error: 'Ungültiger Plan' })

        await ProductSubscription.findOneAndUpdate(
            { userId: req.userId, product: 'seo' },
            { userId: req.userId, product: 'seo', plan, paypalSubscriptionId: subscriptionId, status: 'ACTIVE' },
            { upsert: true, new: true }
        )
        res.json({ success: true, plan })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/seo/sites
export async function getSites(req, res) {
    try {
        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives SEO-Tracking Abo' })

        const sites = await SeoTrackedSite.find({ userId: req.userId, isActive: true }).lean()

        const enriched = await Promise.all(sites.map(async (site) => {
            if (!site.keywords?.length) return { ...site, avgPosition: null, trackedCount: 0 }

            const latestRankings = await Promise.all(
                site.keywords.map(kw =>
                    SeoKeywordRanking.findOne({ siteId: site._id, keyword: kw }).sort({ checkedAt: -1 }).lean()
                )
            )
            const ranked = latestRankings.filter(r => r?.position != null)
            const avgPosition = ranked.length > 0
                ? Math.round(ranked.reduce((s, r) => s + r.position, 0) / ranked.length)
                : null

            return { ...site, avgPosition, trackedCount: site.keywords.length }
        }))

        const totalKeywords = sites.reduce((s, site) => s + (site.keywords?.length || 0), 0)
        const limits = PLAN_LIMITS[plan]

        res.json({
            sites: enriched,
            plan,
            maxSites: limits.maxSites,
            maxKeywords: limits.maxKeywords,
            usedSites: sites.length,
            usedKeywords: totalKeywords,
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/seo/sites/:id
export async function getSite(req, res) {
    try {
        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })
        res.json({ site })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// POST /api/seo/sites
export async function addSite(req, res) {
    try {
        const { domain, displayName, keywords = [], location = 'Germany', language = 'de' } = req.body
        if (!domain) return res.status(400).json({ error: 'Domain erforderlich' })

        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives SEO-Tracking Abo' })

        const limits = PLAN_LIMITS[plan]

        const siteCount = await SeoTrackedSite.countDocuments({ userId: req.userId, isActive: true })
        if (siteCount >= limits.maxSites) {
            return res.status(403).json({ error: `Maximale Websites erreicht (${limits.maxSites} für ${plan}-Plan)` })
        }

        const totalKeywords = await countTotalKeywords(req.userId)
        const slotsLeft = limits.maxKeywords - totalKeywords
        const uniqueKeywords = [...new Set(
            keywords.slice(0, slotsLeft).map(k => k.trim().toLowerCase()).filter(Boolean)
        )]

        let normalizedDomain
        try {
            const parsed = new URL(domain.startsWith('http') ? domain : `https://${domain}`)
            if ((parsed.pathname && parsed.pathname !== '/') || parsed.search || parsed.hash) {
                return res.status(400).json({ error: 'Bitte nur die Domain eingeben (z.B. example.com) – keine Pfade, Parameter oder Tokens.' })
            }
            normalizedDomain = parsed.hostname.toLowerCase()
        } catch {
            return res.status(400).json({ error: 'Ungültige Domain' })
        }

        const site = await SeoTrackedSite.create({
            userId: req.userId,
            domain: normalizedDomain,
            displayName: displayName || normalizedDomain,
            keywords: uniqueKeywords,
            location,
            language,
        })

        res.status(201).json({ site })
    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ error: 'Website wird bereits getrackt' })
        res.status(500).json({ error: err.message })
    }
}

// DELETE /api/seo/sites/:id
export async function deleteSite(req, res) {
    try {
        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })

        await Promise.all([
            SeoKeywordRanking.deleteMany({ siteId: site._id }),
            site.deleteOne(),
        ])

        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// POST /api/seo/sites/:id/keywords
export async function addKeywords(req, res) {
    try {
        const { keywords } = req.body
        if (!Array.isArray(keywords) || !keywords.length) return res.status(400).json({ error: 'keywords[] erforderlich' })

        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives SEO-Tracking Abo' })

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })

        const limits = PLAN_LIMITS[plan]
        const totalKeywords = await countTotalKeywords(req.userId)
        const slotsLeft = limits.maxKeywords - totalKeywords

        if (slotsLeft <= 0) {
            return res.status(403).json({ error: `Keyword-Limit erreicht (${limits.maxKeywords} für ${plan}-Plan)` })
        }

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

// DELETE /api/seo/sites/:id/keywords
export async function removeKeywords(req, res) {
    try {
        const { keywords } = req.body
        if (!Array.isArray(keywords)) return res.status(400).json({ error: 'keywords[] erforderlich' })

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })

        site.keywords = site.keywords.filter(k => !keywords.includes(k))
        await site.save()

        res.json({ site })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/seo/sites/:id/rankings
export async function getRankings(req, res) {
    try {
        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })

        const rankings = await Promise.all(site.keywords.map(async (keyword) => {
            const history = await SeoKeywordRanking.find({ siteId: site._id, keyword })
                .sort({ checkedAt: -1 }).limit(8).lean()

            const current  = history[0] || null
            const previous = history[1] || null
            const change = (current?.position != null && previous?.position != null)
                ? previous.position - current.position  // positiv = verbessert
                : null

            return { keyword, current, previous, change, history: history.reverse() }
        }))

        res.json({ site, rankings })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// POST /api/seo/sites/:id/check — manueller Check
export async function triggerCheck(req, res) {
    try {
        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })
        if (!site.keywords.length) return res.status(400).json({ error: 'Keine Keywords hinterlegt' })

        const results = await checkSiteRankings(site)

        await SeoKeywordRanking.insertMany(results.map(r => ({
            siteId: site._id,
            userId: req.userId,
            keyword: r.keyword,
            position: r.position,
            url: r.url,
            checkedAt: new Date(),
        })))

        await SeoTrackedSite.updateOne({ _id: site._id }, { lastChecked: new Date() })

        res.json({ results, checkedAt: new Date() })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/seo/sites/:id/keyword-ideas
export async function getKeywordIdeasForSite(req, res) {
    try {
        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives SEO-Tracking Abo' })

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })
        if (!site.keywords.length) return res.status(400).json({ error: 'Keine Keywords hinterlegt' })

        const data = await getKeywordIdeas(site.keywords, site.location, site.language)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/seo/sites/:id/competitors
export async function getCompetitorsForSite(req, res) {
    try {
        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives SEO-Tracking Abo' })

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })

        const competitors = await getCompetitors(site.domain, site.location, site.language)
        res.json({ competitors })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/seo/sites/:id/backlinks
export async function getBacklinksForSite(req, res) {
    try {
        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives SEO-Tracking Abo' })

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })

        const summary = await getBacklinkSummary(site.domain)
        res.json({ summary })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}