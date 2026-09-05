import SeoTrackedSite from '../models/seo_tracked_site.js'
import SeoKeywordRanking from '../models/seo_keyword_ranking.js'
import SeoKeywordInsight from '../models/seo_keyword_insight.js'
import ProductSubscription from '../models/product_subscription.js'
import User from '../models/auth_model.js'
import { checkSiteRankings, getKeywordIdeas, getCompetitors, getBacklinkSummary, getReferringDomains, getBacklinkGapAnalysis, getContentGap, getRankedKeywords, generateKeywordContent, generateBacklinkIdeas, generateInsightsForKeywords } from '../services/seoService.js'
import SeoUsage from '../models/seo_usage.js'
import { sendSeoRankingAlert } from '../utils/mailer.js'
import { detectRankingChanges, ALERT_DROP_THRESHOLD } from '../jobs/seoTrackingJob.js'
import { t } from '../utils/i18n/errors.js'

const PLAN_LIMITS = {
    einsteiger: { maxSites: 3,  maxKeywords: 50,  historyWeeks: 8,   contentGapPerMonth: 0,   backlinkGapPerMonth: 0,  manualChecksPerMonth: 2, keywordIdeasPerMonth: 6,  rankedKeywordsPerMonth: 6  },
    pro:        { maxSites: 10, maxKeywords: 200, historyWeeks: 26,  contentGapPerMonth: 100, backlinkGapPerMonth: 20, manualChecksPerMonth: 4, keywordIdeasPerMonth: 20, rankedKeywordsPerMonth: 20 },
    expert:     { maxSites: 20, maxKeywords: 500, historyWeeks: 999, contentGapPerMonth: 300, backlinkGapPerMonth: 60, manualChecksPerMonth: 6, keywordIdeasPerMonth: 40, rankedKeywordsPerMonth: 40 },
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

export async function subscribePlan(req, res) {
    try {
        const { subscriptionId, plan } = req.body
        if (!subscriptionId || !plan) return res.status(400).json({ error: t('SUBSCRIPTION_ID_PLAN_REQUIRED', req.language) })

        const safePlan = { einsteiger: 'einsteiger', pro: 'pro', expert: 'expert' }[plan]
        if (!safePlan) return res.status(400).json({ error: t('INVALID_PLAN', req.language) })

        const idMatch = /^I-[A-Z0-9]{12,20}$/.exec(subscriptionId)
        if (!idMatch) return res.status(400).json({ error: t('SUBSCRIPTION_ID_PLAN_REQUIRED', req.language) })
        const safeSubscriptionId = idMatch[0]

        await ProductSubscription.findOneAndUpdate(
            { userId: req.userId, product: 'seo' },
            { userId: req.userId, product: 'seo', plan: safePlan, paypalSubscriptionId: safeSubscriptionId, status: 'ACTIVE' },
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
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_SEO_SUB', req.language) })

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
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })
        res.json({ site })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// POST /api/seo/sites
export async function addSite(req, res) {
    try {
        const { domain, displayName, keywords = [], location = 'Germany', language = 'de' } = req.body
        if (!domain) return res.status(400).json({ error: t('DOMAIN_REQUIRED', req.language) })

        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_SEO_SUB', req.language) })

        const limits = PLAN_LIMITS[plan]

        const siteCount = await SeoTrackedSite.countDocuments({ userId: req.userId, isActive: true })
        if (siteCount >= limits.maxSites) {
            return res.status(403).json({ error: req.language === 'en'
                ? `Maximum websites reached (${limits.maxSites} for the ${plan} plan)`
                : `Maximale Websites erreicht (${limits.maxSites} für ${plan}-Plan)` })
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
                return res.status(400).json({ error: t('DOMAIN_ONLY', req.language) })
            }
            normalizedDomain = parsed.hostname.toLowerCase()
        } catch {
            return res.status(400).json({ error: t('INVALID_DOMAIN', req.language) })
        }

        const site = await SeoTrackedSite.create({
            userId: req.userId,
            domain: normalizedDomain,
            displayName: displayName || normalizedDomain,
            keywords: uniqueKeywords,
            location,
            language,
        })

        if (uniqueKeywords.length) {
            generateInsightsForKeywords(site, uniqueKeywords).catch(err =>
                console.error('[seo] Hintergrund-Insight-Generierung fehlgeschlagen:', err.message)
            )
        }

        res.status(201).json({ site })
    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ error: t('SITE_ALREADY_TRACKED', req.language) })
        res.status(500).json({ error: err.message })
    }
}

// DELETE /api/seo/sites/:id
export async function deleteSite(req, res) {
    try {
        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

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
        if (!Array.isArray(keywords) || !keywords.length) return res.status(400).json({ error: t('KEYWORDS_ARRAY_REQUIRED', req.language) })

        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_SEO_SUB', req.language) })

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const limits = PLAN_LIMITS[plan]
        const totalKeywords = await countTotalKeywords(req.userId)
        const slotsLeft = limits.maxKeywords - totalKeywords

        if (slotsLeft <= 0) {
            return res.status(403).json({ error: req.language === 'en'
                ? `Keyword limit reached (${limits.maxKeywords} for the ${plan} plan)`
                : `Keyword-Limit erreicht (${limits.maxKeywords} für ${plan}-Plan)` })
        }

        const newKws = keywords
            .slice(0, slotsLeft)
            .map(k => k.trim().toLowerCase())
            .filter(k => k && !site.keywords.includes(k))

        site.keywords.push(...newKws)
        await site.save()

        if (newKws.length) {
            generateInsightsForKeywords(site, newKws).catch(err =>
                console.error('[seo] Hintergrund-Insight-Generierung fehlgeschlagen:', err.message)
            )
        }

        res.json({ site, added: newKws.length })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// DELETE /api/seo/sites/:id/keywords
export async function removeKeywords(req, res) {
    try {
        const { keywords } = req.body
        if (!Array.isArray(keywords)) return res.status(400).json({ error: t('KEYWORDS_ARRAY_REQUIRED', req.language) })

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const removed = site.keywords.filter(k => keywords.includes(k))
        site.keywords = site.keywords.filter(k => !keywords.includes(k))
        await site.save()

        if (removed.length) {
            await SeoKeywordInsight.deleteMany({ siteId: site._id, keyword: { $in: removed } })
        }

        res.json({ site })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/seo/sites/:id/rankings
export async function getRankings(req, res) {
    try {
        const plan = await getSeoPlan(req.userId)
        const historyLimit = PLAN_LIMITS[plan]?.historyWeeks ?? 8

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const rankings = await Promise.all(site.keywords.map(async (keyword) => {
            const history = await SeoKeywordRanking.find({ siteId: site._id, keyword })
                .sort({ checkedAt: -1 }).limit(historyLimit).lean()

            const current  = history[0] || null
            const previous = history[1] || null
            const change = (current?.position != null && previous?.position != null)
                ? previous.position - current.position  // positiv = verbessert
                : null

            return { keyword, current, previous, change, history: history.reverse() }
        }))

        const month = new Date().toISOString().slice(0, 7)
        const usage = await SeoUsage.findOne({ userId: req.userId, feature: 'manual_check', month }).lean()
        const manualChecksUsed = usage?.count ?? 0
        const manualChecksLimit = PLAN_LIMITS[plan]?.manualChecksPerMonth ?? null

        res.json({ site, rankings, manualChecksUsed, manualChecksLimit })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// POST /api/seo/sites/:id/check — manueller Check
export async function triggerCheck(req, res) {
    try {
        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId })
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })
        if (!site.keywords.length) return res.status(400).json({ error: t('NO_KEYWORDS_STORED', req.language) })

        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_SEO_SUB', req.language) })

        const manualLimit = PLAN_LIMITS[plan].manualChecksPerMonth
        const month = new Date().toISOString().slice(0, 7)
        const usage = await SeoUsage.findOne({ userId: req.userId, feature: 'manual_check', month }).lean()
        const used = usage?.count ?? 0
        if (used >= manualLimit) {
            return res.status(429).json({ error: 'monthly_limit_reached', limit: manualLimit, used })
        }
        await SeoUsage.findOneAndUpdate(
            { userId: req.userId, feature: 'manual_check', month },
            { $inc: { count: 1 } },
            { upsert: true }
        )

        // Load previous rankings before the new check
        const previousMap = {}
        for (const kw of site.keywords) {
            const prev = await SeoKeywordRanking.findOne({ siteId: site._id, keyword: kw })
                .sort({ checkedAt: -1 }).lean()
            if (prev) previousMap[kw] = prev.position
        }

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

        // Send alert if meaningful changes detected
        if (Object.keys(previousMap).length > 0) {
            const dropThreshold = ALERT_DROP_THRESHOLD[plan] ?? 5
            const { gains, losses } = detectRankingChanges(results, previousMap, dropThreshold)
            if (gains.length || losses.length) {
                try {
                    const user = await User.findById(req.userId).lean()
                    if (user?.email && user.seoEmailAlerts !== false) {
                        await sendSeoRankingAlert({ email: user.email, domain: site.domain, gains, losses, language: user.language })
                    }
                } catch (alertErr) {
                    console.error('SEO alert fehlgeschlagen:', alertErr.message)
                }
            }
        }

        res.json({ results, checkedAt: new Date(), manualChecksUsed: used + 1, manualChecksLimit: manualLimit })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/seo/sites/:id/keyword-ideas
export async function getKeywordIdeasForSite(req, res) {
    try {
        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_SEO_SUB', req.language) })

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })
        if (!site.keywords.length) return res.status(400).json({ error: t('NO_KEYWORDS_STORED', req.language) })

        const monthlyLimit = PLAN_LIMITS[plan]?.keywordIdeasPerMonth ?? 6
        const month = new Date().toISOString().slice(0, 7)
        const usage = await SeoUsage.findOne({ userId: req.userId, feature: 'keyword_ideas', month }).lean()
        const used = usage?.count ?? 0
        if (used >= monthlyLimit) {
            return res.status(429).json({ error: 'monthly_limit_reached', limit: monthlyLimit, used })
        }
        await SeoUsage.findOneAndUpdate(
            { userId: req.userId, feature: 'keyword_ideas', month },
            { $inc: { count: 1 } },
            { upsert: true }
        )

        const data = await getKeywordIdeas(site.keywords, site.location, site.language)
        res.json({ ...data, used: used + 1, limit: monthlyLimit })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const COMPETITORS_CACHE_MAX_AGE_MS = 6 * 24 * 60 * 60 * 1000 // 6 Tage (Job läuft wöchentlich)

// GET /api/seo/sites/:id/competitors
export async function getCompetitorsForSite(req, res) {
    try {
        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_SEO_SUB', req.language) })

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const cache = site.competitorsCache
        if (cache?.checkedAt && Date.now() - new Date(cache.checkedAt).getTime() < COMPETITORS_CACHE_MAX_AGE_MS) {
            return res.json({ competitors: cache.data, checkedAt: cache.checkedAt, cached: true })
        }

        const competitors = await getCompetitors(site.domain, site.location, site.language)
        const checkedAt = new Date()
        await SeoTrackedSite.updateOne({ _id: site._id }, { competitorsCache: { data: competitors, checkedAt } })
        res.json({ competitors, checkedAt, cached: false })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const CONTENT_GAP_CACHE_MAX_AGE_MS = 6 * 24 * 60 * 60 * 1000 // 6 Tage (Job läuft wöchentlich)

// GET /api/seo/sites/:id/content-gap?competitor=example.com
export async function getContentGapForSite(req, res) {
    try {
        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_SEO_SUB', req.language) })
        if (plan === 'einsteiger') return res.status(403).json({ error: 'content_gap_locked', requiredPlan: 'pro' })

        const { competitor } = req.query
        if (!competitor) return res.status(400).json({ error: t('COMPETITOR_PARAM_REQUIRED', req.language) })

        let competitorDomain
        try {
            const parsed = new URL(competitor.startsWith('http') ? competitor : `https://${competitor}`)
            competitorDomain = parsed.hostname.toLowerCase().replace(/^www\./, '')
        } catch {
            return res.status(400).json({ error: t('INVALID_COMPETITOR_DOMAIN', req.language) })
        }

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const monthlyLimit = PLAN_LIMITS[plan]?.contentGapPerMonth ?? 0
        const month = new Date().toISOString().slice(0, 7)
        const existing = await SeoUsage.findOne({ userId: req.userId, feature: 'content_gap', month }).lean()
        const used = existing?.count ?? 0

        // Aus dem wöchentlichen Job gecachtes Ergebnis für denselben Konkurrenten wiederverwenden — kostenlos, kein Limit-Verbrauch
        const cache = site.contentGapCache
        if (
            cache?.competitorDomain === competitorDomain &&
            cache.checkedAt && Date.now() - new Date(cache.checkedAt).getTime() < CONTENT_GAP_CACHE_MAX_AGE_MS
        ) {
            return res.json({ competitor: competitorDomain, gap: cache.data, used, limit: monthlyLimit, cached: true })
        }

        if (used >= monthlyLimit) {
            return res.status(429).json({ error: 'monthly_limit_reached', limit: monthlyLimit, used })
        }

        // Increment usage before the (expensive) API call
        await SeoUsage.findOneAndUpdate(
            { userId: req.userId, feature: 'content_gap', month },
            { $inc: { count: 1 } },
            { upsert: true }
        )

        const gap = await getContentGap(competitorDomain, site.keywords || [], site.location, site.language)
        await SeoTrackedSite.updateOne(
            { _id: site._id },
            { contentGapCache: { competitorDomain, data: gap, checkedAt: new Date() } }
        )
        res.json({ competitor: competitorDomain, gap, used: used + 1, limit: monthlyLimit, cached: false })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/seo/sites/:id/ranked-keywords — "Wofür ranke ich schon?": Keywords, für die die eigene
// Domain aktuell bei Google eine SERP-Position hat, inkl. echtem Suchvolumen. Beantwortet die
// Ausgangsfrage vor jedem Tracking: welche Keywords lohnt es sich überhaupt zu tracken.
// Bewusst KEIN zeitbasierter Cache-Ablauf — ein passiver Tab-Aufruf soll nie von selbst einen
// bezahlten Call ausloesen, nur weil Zeit vergangen ist. Der Cache bleibt bestehen, bis der Nutzer
// explizit "Neu laden" (force=true) klickt; das kostet dann einen von den monatlichen Kontingent-
// Slots, wodurch die Kosten unabhaengig davon, wie lange eine Site offen bleibt, planbar bleiben.
export async function getRankedKeywordsForSite(req, res) {
    try {
        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_SEO_SUB', req.language) })

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const monthlyLimit = PLAN_LIMITS[plan]?.rankedKeywordsPerMonth ?? 0
        const month = new Date().toISOString().slice(0, 7)
        const existing = await SeoUsage.findOne({ userId: req.userId, feature: 'ranked_keywords', month }).lean()
        const used = existing?.count ?? 0

        const force = req.query.force === 'true'
        const cache = site.rankedKeywordsCache
        if (!force && cache?.checkedAt) {
            return res.json({ keywords: cache.data, checkedAt: cache.checkedAt, used, limit: monthlyLimit, cached: true })
        }

        if (used >= monthlyLimit) {
            return res.status(429).json({ error: 'monthly_limit_reached', limit: monthlyLimit, used })
        }

        await SeoUsage.findOneAndUpdate(
            { userId: req.userId, feature: 'ranked_keywords', month },
            { $inc: { count: 1 } },
            { upsert: true }
        )

        const keywords = await getRankedKeywords(site.domain, site.location, site.language)
        const checkedAt = new Date()
        await SeoTrackedSite.updateOne(
            { _id: site._id },
            { rankedKeywordsCache: { data: keywords, checkedAt } }
        )
        res.json({ keywords, checkedAt, used: used + 1, limit: monthlyLimit, cached: false })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const BACKLINKS_CACHE_MAX_AGE_MS = 28 * 24 * 60 * 60 * 1000 // 28 Tage (Job läuft monatlich)

// GET /api/seo/sites/:id/backlinks
export async function getBacklinksForSite(req, res) {
    try {
        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_SEO_SUB', req.language) })

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const force = req.query.force === 'true'
        const cache = site.backlinksCache
        if (!force && cache?.checkedAt && Date.now() - new Date(cache.checkedAt).getTime() < BACKLINKS_CACHE_MAX_AGE_MS) {
            return res.json({ summary: cache.data, checkedAt: cache.checkedAt, cached: true })
        }

        const summary = await getBacklinkSummary(site.domain)
        const checkedAt = new Date()
        await SeoTrackedSite.updateOne({ _id: site._id }, { backlinksCache: { data: summary, checkedAt } })
        res.json({ summary, checkedAt, cached: false })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const REFERRING_DOMAINS_CACHE_MAX_AGE_MS = 28 * 24 * 60 * 60 * 1000 // 28 Tage (Job läuft monatlich)

// GET /api/seo/sites/:id/referring-domains
// Liste der Domains, die tatsächlich auf die eigene Site verlinken (im Unterschied zur
// Backlink-Gap-Analyse, die Domains zeigt, die auf Konkurrenten verlinken, aber noch nicht auf uns).
export async function getReferringDomainsForSite(req, res) {
    try {
        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_SEO_SUB', req.language) })

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const force = req.query.force === 'true'
        const cache = site.referringDomainsCache
        if (!force && cache?.checkedAt && Date.now() - new Date(cache.checkedAt).getTime() < REFERRING_DOMAINS_CACHE_MAX_AGE_MS) {
            return res.json({ domains: cache.data, checkedAt: cache.checkedAt, cached: true })
        }

        const domains = await getReferringDomains(site.domain)
        const checkedAt = new Date()
        await SeoTrackedSite.updateOne({ _id: site._id }, { referringDomainsCache: { data: domains, checkedAt } })
        res.json({ domains, checkedAt, cached: false })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const BACKLINK_GAP_CACHE_MAX_AGE_MS = 28 * 24 * 60 * 60 * 1000 // 28 Tage

// Generische Mega-Portale, die bei keyword-overlap-basierter Konkurrenzermittlung (getCompetitors)
// fälschlich als "Konkurrent" auftauchen — z.B. weil google.com bei sehr vielen Keywords irgendwo
// im SERP erscheint. Als domain_intersection-Target sind sie zudem so backlink-massiv, dass die
// DataForSEO-Abfrage in einen Timeout/Internal-Error läuft, statt brauchbare Ergebnisse zu liefern.
const MEGA_PORTAL_DOMAINS = new Set([
    'google.com', 'youtube.com', 'wikipedia.org', 'facebook.com', 'instagram.com',
    'twitter.com', 'x.com', 'linkedin.com', 'amazon.com', 'apple.com', 'microsoft.com',
    'reddit.com', 'pinterest.com', 'tiktok.com', 'yelp.com', 'maps.google.com',
])

// GET /api/seo/sites/:id/backlink-gap?competitors=domain1.com,domain2.com
// Ohne "competitors"-Param: ermittelt automatisch Top-Konkurrenten der Site (via getCompetitors).
// Mit "competitors"-Param: nutzt die übergebenen Domains direkt (z.B. echte Produkt-Konkurrenten
// statt generischer Keyword-Overlap-Treffer wie google.com oder branchenfremde Agenturen).
export async function getBacklinkGapForSite(req, res) {
    try {
        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_SEO_SUB', req.language) })
        if (plan === 'einsteiger') return res.status(403).json({ error: 'backlink_gap_locked', requiredPlan: 'pro' })

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const ownDomain = site.domain.toLowerCase().replace(/^www\./, '')
        const force = req.query.force === 'true'
        const manualCompetitors = typeof req.query.competitors === 'string'
            ? req.query.competitors.split(',').map(d => d.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]).filter(Boolean)
            : null

        // Beim passiven Tab-Öffnen (kein force) immer das zuletzt berechnete Ergebnis zeigen,
        // egal ob es aus der Auto-Erkennung oder einer manuellen Konkurrenten-Auswahl stammt —
        // sonst würde jeder Tab-Öffnen eine frische manuelle Analyse wieder überschreiben und
        // unnötig Kontingent verbrauchen. Eine neue Berechnung gibt es nur über "force=true"
        // (Button "Neu analysieren"/"Analysieren").
        const cache = site.backlinkGapCache
        if (!force && cache?.checkedAt && Date.now() - new Date(cache.checkedAt).getTime() < BACKLINK_GAP_CACHE_MAX_AGE_MS) {
            return res.json({ competitors: cache.competitorDomains, manual: !!cache.manual, gap: cache.data, checkedAt: cache.checkedAt, cached: true })
        }

        const monthlyLimit = PLAN_LIMITS[plan]?.backlinkGapPerMonth ?? 0
        const month = new Date().toISOString().slice(0, 7)
        const existing = await SeoUsage.findOne({ userId: req.userId, feature: 'backlink_gap', month }).lean()
        const used = existing?.count ?? 0
        if (used >= monthlyLimit) {
            return res.status(429).json({ error: 'monthly_limit_reached', limit: monthlyLimit, used })
        }

        let competitorDomains
        if (manualCompetitors) {
            competitorDomains = manualCompetitors.filter(d => d !== ownDomain && !MEGA_PORTAL_DOMAINS.has(d)).slice(0, 5)
        } else {
            const competitors = await getCompetitors(site.domain, site.location, site.language)
            competitorDomains = competitors
                .map(c => (c.domain || '').toLowerCase().replace(/^www\./, ''))
                .filter(d => d && d !== ownDomain && !MEGA_PORTAL_DOMAINS.has(d))
                .slice(0, 5)
        }
        if (!competitorDomains.length) {
            return res.json({ competitors: [], gap: [], checkedAt: new Date(), used, limit: monthlyLimit, cached: false })
        }

        // Usage vor dem (kostenpflichtigen) API-Call erhöhen
        await SeoUsage.findOneAndUpdate(
            { userId: req.userId, feature: 'backlink_gap', month },
            { $inc: { count: 1 } },
            { upsert: true }
        )

        const gap = await getBacklinkGapAnalysis(site.domain, competitorDomains)
        const checkedAt = new Date()
        await SeoTrackedSite.updateOne(
            { _id: site._id },
            { backlinkGapCache: { competitorDomains, manual: !!manualCompetitors, data: gap, checkedAt } }
        )
        res.json({ competitors: competitorDomains, manual: !!manualCompetitors, gap, checkedAt, used: used + 1, limit: monthlyLimit, cached: false })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/seo/alert-settings
export async function getAlertSettings(req, res) {
    try {
        const user = await User.findById(req.userId).lean()
        if (!user) return res.status(404).json({ error: t('USER_NOT_FOUND', req.language) })
        res.json({ seoEmailAlerts: user.seoEmailAlerts !== false })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/seo/sites/:id/insights
export async function getInsights(req, res) {
    try {
        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const insights = await SeoKeywordInsight.find({ siteId: site._id }).lean()
        const insightsMap = {}
        for (const i of insights) insightsMap[i.keyword] = i

        res.json({ insightsMap })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// expert war bis 2026-09 Infinity — ohne Monats-Deckel, nur durch das 2/Minute-Rate-Limit gebremst.
// 300 ist so gewählt, dass es zusammen mit dem neuen keywordIdeasPerMonth weiterhin max. 1/4 der
// ursprünglichen Marge kostet (siehe Kostenrechnung-Artifact).
const INSIGHT_REFRESH_LIMITS = {
    einsteiger: 10,
    pro:        100,
    expert:     300,
}

// POST /api/seo/sites/:id/insights/refresh
export async function refreshInsight(req, res) {
    try {
        const { keyword } = req.body
        if (typeof keyword !== 'string' || !keyword) return res.status(400).json({ error: t('KEYWORD_REQUIRED', req.language) })

        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_SEO_SUB', req.language) })

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        if (!site.keywords.includes(keyword)) return res.status(400).json({ error: t('KEYWORD_NOT_IN_SITE', req.language) })

        const monthlyLimit = INSIGHT_REFRESH_LIMITS[plan] ?? 10
        const month = new Date().toISOString().slice(0, 7)
        const usage = await SeoUsage.findOne({ userId: req.userId, feature: 'insight_refresh', month }).lean()
        const used = usage?.count ?? 0
        if (used >= monthlyLimit) {
            return res.status(429).json({ error: 'monthly_limit_reached', limit: monthlyLimit, used })
        }
        await SeoUsage.findOneAndUpdate(
            { userId: req.userId, feature: 'insight_refresh', month },
            { $inc: { count: 1 } },
            { upsert: true }
        )

        await SeoKeywordInsight.findOneAndUpdate(
            { siteId: site._id, keyword },
            { status: 'pending', generatedAt: null },
            { upsert: true }
        )

        generateInsightsForKeywords(site, [keyword]).catch(err =>
            console.error('[seo] Refresh-Insight fehlgeschlagen:', err.message)
        )

        res.json({ success: true, status: 'pending' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// POST /api/seo/sites/:id/keyword-content
export async function generateContent(req, res) {
    try {
        const { keyword } = req.body
        if (!keyword) return res.status(400).json({ error: t('KEYWORD_REQUIRED', req.language) })

        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_SEO_SUB', req.language) })

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const content = await generateKeywordContent(keyword, site.domain, site.language)
        res.json({ content })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// POST /api/seo/sites/:id/backlink-ideas
export async function generateBacklinkIdeasForKeyword(req, res) {
    try {
        const { keyword } = req.body
        if (!keyword) return res.status(400).json({ error: t('KEYWORD_REQUIRED', req.language) })

        const plan = await getSeoPlan(req.userId)
        if (!plan) return res.status(403).json({ error: t('NO_ACTIVE_SEO_SUB', req.language) })

        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const ideas = await generateBacklinkIdeas(keyword, site.domain, site.language)
        res.json({ ideas })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/seo/sites/:id/history — Durchschnittsposition pro Tag über alle Keywords hinweg,
// als Zeitreihe für die Verlaufs-Visualisierung im Dashboard.
export async function getRankingHistory(req, res) {
    try {
        const site = await SeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const byDay = await SeoKeywordRanking.aggregate([
            { $match: { siteId: site._id, position: { $ne: null } } },
            { $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$checkedAt' } },
                avgPosition: { $avg: '$position' },
                keywordsRanked: { $sum: 1 },
            } },
            { $sort: { _id: 1 } },
        ])

        const history = byDay.map(d => ({
            date: d._id,
            avgPosition: Math.round(d.avgPosition * 10) / 10,
            keywordsRanked: d.keywordsRanked,
        }))

        res.json({ history })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// PATCH /api/seo/alert-settings
export async function updateAlertSettings(req, res) {
    try {
        const { seoEmailAlerts } = req.body
        if (typeof seoEmailAlerts !== 'boolean') return res.status(400).json({ error: t('SEO_EMAIL_ALERTS_MUST_BE_BOOLEAN', req.language) })
        await User.findByIdAndUpdate(req.userId, { seoEmailAlerts })
        res.json({ success: true, seoEmailAlerts })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}