import cron from 'node-cron'
import GeoTrackedSite from '../models/geo_tracked_site.js'
import GeoMentionCheck from '../models/geo_mention_check.js'
import ProductSubscription from '../models/product_subscription.js'
import { checkSiteMentions } from '../services/geoService.js'

async function runWeeklyGeoChecks() {
    try {
        const activeSubs = await ProductSubscription.find({ product: 'geo', status: 'ACTIVE' }).lean()
        if (!activeSubs.length) return

        const activeUserIds = activeSubs.map(s => s.userId)
        const sites = await GeoTrackedSite.find({
            userId: { $in: activeUserIds },
            isActive: true,
            'keywords.0': { $exists: true },
        }).lean()

        console.log(`GEO wöchentlicher Check: ${sites.length} Sites`)

        for (const site of sites) {
            try {
                const results = await checkSiteMentions(site)

                await GeoMentionCheck.insertMany(results.map(r => ({
                    siteId:    site._id,
                    userId:    site.userId,
                    keyword:   r.keyword,
                    platform:  r.platform,
                    mentioned: r.mentioned,
                    context:   r.context,
                    checkedAt: new Date(),
                })))

                await GeoTrackedSite.updateOne({ _id: site._id }, { lastChecked: new Date() })
                const mentioned = results.filter(r => r.mentioned).length
                console.log(`GEO check abgeschlossen: ${site.domain} (${results.length} Checks, ${mentioned} erwähnt)`)
            } catch (err) {
                console.error(`GEO check fehlgeschlagen für ${site.domain}:`, err.message)
            }

            await new Promise(r => setTimeout(r, 1000))
        }

        console.log(`GEO wöchentlicher Check abgeschlossen (${sites.length} Sites)`)
    } catch (err) {
        console.error('runWeeklyGeoChecks Fehler:', err.message)
    }
}

export function startGeoTrackingJob() {
    cron.schedule('0 5 * * 1', runWeeklyGeoChecks)
    console.log('GEO tracking job gestartet')
}