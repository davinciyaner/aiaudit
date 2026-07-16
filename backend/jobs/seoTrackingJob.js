import cron from 'node-cron'
import SeoTrackedSite from '../models/seo_tracked_site.js'
import SeoKeywordRanking from '../models/seo_keyword_ranking.js'
import ProductSubscription from '../models/product_subscription.js'
import SeoUsage from '../models/seo_usage.js'
import User from '../models/auth_model.js'
import { checkSiteRankings, refreshStaleInsights, getCompetitors, getContentGap, getBacklinkSummary, generateInsightsForKeywords, discoverKeywordsFromNewContent } from '../services/seoService.js'
import { sendSeoRankingAlert, sendNewKeywordsAlert } from '../utils/mailer.js'

const CONTENT_GAP_MONTHLY_LIMIT  = { einsteiger: 0,  pro: 100, expert: 300 }
const MAX_NEW_KEYWORDS_PER_PLAN  = { einsteiger: 10, pro: 30,  expert: 50  }

async function refreshCompetitorsAndContentGap(site, plan) {
    try {
        const competitors = await getCompetitors(site.domain, site.location, site.language)
        await SeoTrackedSite.updateOne(
            { _id: site._id },
            { competitorsCache: { data: competitors, checkedAt: new Date() } }
        )

        if (!competitors.length || plan === 'einsteiger') return null

        const topCompetitor = competitors.find(c => c.domain && c.domain !== site.domain)
        if (!topCompetitor) return null

        const monthlyLimit = CONTENT_GAP_MONTHLY_LIMIT[plan] ?? 0
        const month = new Date().toISOString().slice(0, 7)
        const usage = await SeoUsage.findOne({ userId: site.userId, feature: 'content_gap', month }).lean()
        const used = usage?.count ?? 0
        if (used >= monthlyLimit) return null

        const gap = await getContentGap(topCompetitor.domain, site.keywords || [], site.location, site.language)
        await SeoUsage.findOneAndUpdate(
            { userId: site.userId, feature: 'content_gap', month },
            { $inc: { count: 1 } },
            { upsert: true }
        )
        await SeoTrackedSite.updateOne(
            { _id: site._id },
            { contentGapCache: { competitorDomain: topCompetitor.domain, data: gap, checkedAt: new Date() } }
        )
        return { competitorDomain: topCompetitor.domain, gap }
    } catch (err) {
        console.error(`[seo] Konkurrenten/Content-Gap fehlgeschlagen für ${site.domain}:`, err.message)
        return null
    }
}

export const ALERT_DROP_THRESHOLD = {
    einsteiger: 10,
    pro:        5,
    expert:     3,
}

// dropThreshold: how many positions must fall to trigger a loss alert
export function detectRankingChanges(newResults, previousMap, dropThreshold = 5) {
    const gains  = []
    const losses = []
    for (const r of newResults) {
        const prev = previousMap[r.keyword]
        if (prev == null) continue

        if (r.position == null) {
            if (prev <= 20) losses.push({ keyword: r.keyword, from: prev, to: null })
            continue
        }

        const diff = prev - r.position // positive = improved
        if (diff <= -dropThreshold || (r.position > 10 && prev <= 10)) {
            losses.push({ keyword: r.keyword, from: prev, to: r.position })
        } else if (diff >= 5 || (r.position <= 10 && prev > 10)) {
            gains.push({ keyword: r.keyword, from: prev, to: r.position })
        }
    }
    return { gains, losses }
}

async function runWeeklySeoChecks() {
    try {
        const activeSubs = await ProductSubscription.find({ product: 'seo', status: 'ACTIVE' }).lean()
        if (!activeSubs.length) return

        const activeUserIds = activeSubs.map(s => s.userId)
        const sites = await SeoTrackedSite.find({
            userId: { $in: activeUserIds },
            isActive: true,
            'keywords.0': { $exists: true },
        }).lean()

        console.log(`SEO wöchentlicher Check: ${sites.length} Sites`)

        for (const site of sites) {
            try {
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
                    userId: site.userId,
                    keyword: r.keyword,
                    position: r.position,
                    url: r.url,
                    checkedAt: new Date(),
                })))

                await SeoTrackedSite.updateOne({ _id: site._id }, { lastChecked: new Date() })
                console.log(`SEO check abgeschlossen: ${site.domain} (${results.length} Keywords)`)

                const sub = activeSubs.find(s => s.userId.toString() === site.userId.toString())

                // Konkurrenten wöchentlich aktualisieren + Content-Gap zum Top-Konkurrenten nachziehen
                const contentGapResult = await refreshCompetitorsAndContentGap(site, sub?.plan)

                // Send alert if meaningful changes detected
                if (Object.keys(previousMap).length > 0) {
                    const dropThreshold = ALERT_DROP_THRESHOLD[sub?.plan] ?? 5
                    const { gains, losses } = detectRankingChanges(results, previousMap, dropThreshold)

                    // Neue Ranking-Verlierer bekommen sofort frische Insights (Content-Plan + Backlink-Ideen)
                    if (losses.length) {
                        try {
                            await generateInsightsForKeywords(site, losses.map(l => l.keyword))
                        } catch (insightErr) {
                            console.error(`[seo] Auto-Insight für Verlierer fehlgeschlagen (${site.domain}):`, insightErr.message)
                        }
                    }

                    if (gains.length || losses.length) {
                        try {
                            const user = await User.findById(site.userId).lean()
                            if (user?.email && user.seoEmailAlerts !== false) {
                                await sendSeoRankingAlert({
                                    email: user.email,
                                    domain: site.domain,
                                    gains,
                                    losses,
                                    contentGap: contentGapResult,
                                })
                                console.log(`SEO alert gesendet an ${user.email} für ${site.domain} (${losses.length} Verluste, ${gains.length} Gewinne)`)
                            }
                        } catch (alertErr) {
                            console.error(`SEO alert fehlgeschlagen für ${site.domain}:`, alertErr.message)
                        }
                    }
                }
            } catch (err) {
                console.error(`SEO check fehlgeschlagen für ${site.domain}:`, err.message)
            }

            // 1s Pause zwischen Sites
            await new Promise(r => setTimeout(r, 1000))
        }

        console.log(`SEO wöchentlicher Check abgeschlossen (${sites.length} Sites)`)

        // Refresh stale insights after rankings are done (Montag 04:30+)
        for (const site of sites) {
            try {
                await refreshStaleInsights(site)
            } catch (err) {
                console.error(`[seo] Insight-Refresh fehlgeschlagen für ${site.domain}:`, err.message)
            }
            await new Promise(r => setTimeout(r, 500))
        }
    } catch (err) {
        console.error('runWeeklySeoChecks Fehler:', err.message)
    }
}

async function runMonthlyBacklinkChecks() {
    try {
        const activeSubs = await ProductSubscription.find({ product: 'seo', status: 'ACTIVE' }).lean()
        if (!activeSubs.length) return

        const activeUserIds = activeSubs.map(s => s.userId)
        const sites = await SeoTrackedSite.find({ userId: { $in: activeUserIds }, isActive: true }).lean()

        console.log(`SEO monatlicher Backlink-Check: ${sites.length} Sites`)

        for (const site of sites) {
            try {
                const summary = await getBacklinkSummary(site.domain)
                await SeoTrackedSite.updateOne(
                    { _id: site._id },
                    { backlinksCache: { data: summary, checkedAt: new Date() } }
                )
            } catch (err) {
                console.error(`[seo] Backlink-Check fehlgeschlagen für ${site.domain}:`, err.message)
            }
            await new Promise(r => setTimeout(r, 1000))
        }

        console.log(`SEO monatlicher Backlink-Check abgeschlossen (${sites.length} Sites)`)
    } catch (err) {
        console.error('runMonthlyBacklinkChecks Fehler:', err.message)
    }
}

async function runSitemapDiscovery() {
    try {
        const activeSubs = await ProductSubscription.find({ product: 'seo', status: 'ACTIVE' }).lean()
        if (!activeSubs.length) return

        const activeUserIds = activeSubs.map(s => s.userId)
        const sites = await SeoTrackedSite.find({ userId: { $in: activeUserIds }, isActive: true }).lean()

        console.log(`[seo] Sitemap-Discovery: ${sites.length} Sites`)

        for (const site of sites) {
            try {
                const sub           = activeSubs.find(s => s.userId.toString() === site.userId.toString())
                const plan          = sub?.plan ?? 'einsteiger'
                const maxNewKws     = MAX_NEW_KEYWORDS_PER_PLAN[plan] ?? 10

                const { discovered } = await discoverKeywordsFromNewContent(site, maxNewKws)

                if (discovered.length) {
                    const user = await User.findById(site.userId).lean()
                    if (user?.email && user.seoEmailAlerts !== false) {
                        await sendNewKeywordsAlert({ email: user.email, domain: site.domain, keywords: discovered })
                        console.log(`[seo] ${discovered.length} neue Keywords für ${site.domain} — Alert an ${user.email}`)
                    }
                }
            } catch (err) {
                console.error(`[seo] Sitemap-Discovery fehlgeschlagen für ${site.domain}:`, err.message)
            }
            await new Promise(r => setTimeout(r, 2000))
        }

        console.log('[seo] Sitemap-Discovery abgeschlossen')
    } catch (err) {
        console.error('[seo] runSitemapDiscovery Fehler:', err.message)
    }
}

export function startSeoTrackingJob() {
    // Jeden Montag um 04:00 Uhr
    cron.schedule('0 4 * * 1', runWeeklySeoChecks)
    // Am 1. jedes Monats um 05:00 Uhr (teurer/seltener relevant als Rankings)
    cron.schedule('0 5 1 * *', runMonthlyBacklinkChecks)
    // Mittwoch und Sonntag um 03:30 Uhr — neue Blog-Posts / Seiten entdecken
    cron.schedule('30 3 * * 3,0', runSitemapDiscovery)
    console.log('SEO tracking job gestartet')
}

export { runWeeklySeoChecks, runMonthlyBacklinkChecks, refreshCompetitorsAndContentGap }