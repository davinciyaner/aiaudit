import cron from 'node-cron'
import MonitoredSite from '../models/monitored_site.js'
import ProductSubscription from '../models/product_subscription.js'
import Subscription from '../models/subscription.js'
import { runUptimeCheck, runSecurityScan } from '../services/securityCheckService.js'

// Intervall in ms pro Plan
const CHECK_INTERVALS = {
    expert:     60 * 1000,       // 1 Minute
    pro:        60 * 1000,       // 1 Minute
    einsteiger: 5 * 60 * 1000,   // 5 Minuten
}
const LEGACY_PLAN_MAP = { pro: 'einsteiger', agency: 'pro' }

// Letzter Check-Zeitstempel pro Site (in-memory, resettet bei Neustart)
const lastUptimeCheck = new Map()

async function getPlanForUser(userId) {
    const productSub = await ProductSubscription.findOne({ userId, product: 'security', status: 'ACTIVE' })
    if (productSub) return productSub.plan
    const legacySub = await Subscription.findOne({ userId, status: 'ACTIVE' })
    if (legacySub) return LEGACY_PLAN_MAP[legacySub.plan] || null
    return null
}

async function runUptimeChecks() {
    try {
        const sites = await MonitoredSite.find({ product: 'security', isActive: true }).lean()
        if (!sites.length) return

        const userIds = [...new Set(sites.map(s => s.userId.toString()))]
        const plans = {}
        await Promise.all(userIds.map(async (uid) => {
            plans[uid] = await getPlanForUser(uid)
        }))

        const now = Date.now()
        const toCheck = sites.filter(site => {
            const plan = plans[site.userId.toString()]
            if (!plan) return false
            const intervalMs = CHECK_INTERVALS[plan]
            const last = lastUptimeCheck.get(site._id.toString()) || 0
            return now - last >= intervalMs
        })

        await Promise.allSettled(toCheck.map(async (site) => {
            lastUptimeCheck.set(site._id.toString(), now)
            try {
                await runUptimeCheck(site)
            } catch (err) {
                console.error(`Uptime check fehlgeschlagen für ${site.domain}:`, err.message)
            }
        }))
    } catch (err) {
        console.error('runUptimeChecks Fehler:', err.message)
    }
}

async function runDailySecurityScans() {
    try {
        const sites = await MonitoredSite.find({ product: 'security', isActive: true }).lean()
        for (const site of sites) {
            try {
                await runSecurityScan(site)
            } catch (err) {
                console.error(`Security scan fehlgeschlagen für ${site.domain}:`, err.message)
            }
        }
        console.log(`Security scans abgeschlossen (${sites.length} Sites)`)
    } catch (err) {
        console.error('runDailySecurityScans Fehler:', err.message)
    }
}

export function startSecurityMonitoringJob() {
    // Uptime-Checks alle 30 Sekunden — filtert intern nach Plan-Intervall
    cron.schedule('*/30 * * * * *', runUptimeChecks)
    // Tägliche Security-Scans um 03:00 Uhr
    cron.schedule('0 3 * * *', runDailySecurityScans)
    console.log('Security monitoring gestartet')
}