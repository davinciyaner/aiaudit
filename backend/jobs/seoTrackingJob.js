import cron from 'node-cron'
import SeoTrackedSite from '../models/seo_tracked_site.js'
import SeoKeywordRanking from '../models/seo_keyword_ranking.js'
import ProductSubscription from '../models/product_subscription.js'
import User from '../models/auth_model.js'
import { checkSiteRankings } from '../services/seoService.js'
import { sendSeoRankingAlert } from '../utils/mailer.js'

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

                // Send alert if meaningful changes detected
                if (Object.keys(previousMap).length > 0) {
                    const sub = activeSubs.find(s => s.userId.toString() === site.userId.toString())
                    const dropThreshold = ALERT_DROP_THRESHOLD[sub?.plan] ?? 5
                    const { gains, losses } = detectRankingChanges(results, previousMap, dropThreshold)
                    if (gains.length || losses.length) {
                        try {
                            const user = await User.findById(site.userId).lean()
                            if (user?.email) {
                                await sendSeoRankingAlert({
                                    email: user.email,
                                    domain: site.domain,
                                    gains,
                                    losses,
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
    } catch (err) {
        console.error('runWeeklySeoChecks Fehler:', err.message)
    }
}

export function startSeoTrackingJob() {
    // Jeden Montag um 04:00 Uhr
    cron.schedule('0 4 * * 1', runWeeklySeoChecks)
    console.log('SEO tracking job gestartet')
}