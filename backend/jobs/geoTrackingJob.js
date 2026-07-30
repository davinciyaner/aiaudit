import cron from 'node-cron'
import GeoTrackedSite from '../models/geo_tracked_site.js'
import GeoMentionCheck from '../models/geo_mention_check.js'
import ProductSubscription from '../models/product_subscription.js'
import User from '../models/auth_model.js'
import { checkSiteMentions } from '../services/geoService.js'
import { sendGeoRankingAlert } from '../utils/mailer.js'
import { fetchSafely } from '../utils/safeFetch.js'
import { analyzeGEO } from '../controllers/geo.js'

const PRIORITY_WEIGHT = { critical: 0, high: 1, medium: 2 }

// Läuft nur bei tatsächlichen Erwähnungsverlusten, nicht bei jedem Check — bewusst kein Beleg für
// Kausalität ("das war die Ursache"), sondern eine zeitgleiche Momentaufnahme der aktuellen technischen
// GEO-Schwachstellen der Domain ("das sind mögliche Gründe, die dazu beitragen könnten").
async function getPossibleCauses(domain) {
    try {
        const url = `https://${domain}`
        const pageRes = await fetchSafely(url, { headers: { 'User-Agent': 'AuditAI-GEO-Bot/1.0' }, timeoutMs: 10000 })
        if (!pageRes.ok) return null

        const html = await pageRes.text()
        const analysis = await analyzeGEO(url, html)

        const topFindings = [...(analysis.recommendations || [])]
            .sort((a, b) => (PRIORITY_WEIGHT[a.priority] ?? 9) - (PRIORITY_WEIGHT[b.priority] ?? 9))
            .slice(0, 3)

        return { score: analysis.score, findings: topFindings }
    } catch (err) {
        console.error(`[geo] Audit-Re-Check fehlgeschlagen für ${domain}:`, err.message)
        return null
    }
}

const mentionKey = (r) => `${r.keyword} ${r.platform} ${r.promptIntent}`

export function detectMentionChanges(newResults, previousMap) {
    const gains  = []
    const losses = []
    for (const r of newResults) {
        const prevMentioned = previousMap[mentionKey(r)]
        if (prevMentioned == null) continue
        if (prevMentioned === r.mentioned) continue

        if (r.mentioned) gains.push({ keyword: r.keyword, platform: r.platform, promptIntent: r.promptIntent })
        else losses.push({ keyword: r.keyword, platform: r.platform, promptIntent: r.promptIntent })
    }
    return { gains, losses }
}

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
                const platforms = site.platforms?.length ? site.platforms : ['claude']
                const previousMap = {}
                for (const kw of site.keywords) {
                    for (const platform of platforms) {
                        const prev = await GeoMentionCheck.findOne({ siteId: site._id, keyword: kw, platform })
                            .sort({ checkedAt: -1 }).lean()
                        if (prev) previousMap[`${kw} ${platform} ${prev.promptIntent}`] = prev.mentioned
                    }
                }

                const results = await checkSiteMentions(site, site.promptVariants)

                await GeoMentionCheck.insertMany(results.map(r => ({
                    siteId:       site._id,
                    userId:       site.userId,
                    keyword:      r.keyword,
                    platform:     r.platform,
                    promptIntent: r.promptIntent,
                    mentioned:    r.mentioned,
                    context:      r.context,
                    citations:    r.citations || [],
                    sentiment:    r.sentiment || null,
                    checkedAt:    new Date(),
                })))

                await GeoTrackedSite.updateOne({ _id: site._id }, { lastChecked: new Date() })
                const mentioned = results.filter(r => r.mentioned).length
                console.log(`GEO check abgeschlossen: ${site.domain} (${results.length} Checks, ${mentioned} erwähnt)`)

                if (Object.keys(previousMap).length > 0) {
                    const { gains, losses } = detectMentionChanges(results, previousMap)

                    if (gains.length || losses.length) {
                        try {
                            const user = await User.findById(site.userId).lean()
                            if (user?.email && user.geoEmailAlerts !== false) {
                                const possibleCauses = losses.length ? await getPossibleCauses(site.domain) : null
                                await sendGeoRankingAlert({ email: user.email, domain: site.domain, gains, losses, possibleCauses })
                                console.log(`GEO alert gesendet an ${user.email} für ${site.domain} (${losses.length} Verluste, ${gains.length} Gewinne)`)
                            }
                        } catch (alertErr) {
                            console.error(`GEO alert fehlgeschlagen für ${site.domain}:`, alertErr.message)
                        }
                    }
                }
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

export { runWeeklyGeoChecks }