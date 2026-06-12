import cron from 'node-cron'
import SeoTrackedSite from '../models/seo_tracked_site.js'
import SeoKeywordRanking from '../models/seo_keyword_ranking.js'
import ProductSubscription from '../models/product_subscription.js'
import { checkSiteRankings } from '../services/seoService.js'

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