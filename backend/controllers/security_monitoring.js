import MonitoredSite from '../models/monitored_site.js'
import UptimeCheck from '../models/uptime_check.js'
import SecurityScan from '../models/security_scan.js'
import SecurityAlert from '../models/security_alert.js'
import ProductSubscription from '../models/product_subscription.js'
import Subscription from '../models/subscription.js'
import { runUptimeCheck, runSecurityScan } from '../services/securityCheckService.js'

// Limits pro Plan
const PLAN_LIMITS = {
    einsteiger: { maxSites: 5 },
    pro:        { maxSites: 10 },
    expert:     { maxSites: 30 },
}

// Bestehende Pro/Agency-Abos auf Security-Plan mappen
const LEGACY_PLAN_MAP = { pro: 'einsteiger', agency: 'pro' }

async function getSecurityPlan(userId) {
    const productSub = await ProductSubscription.findOne({ userId, product: 'security', status: 'ACTIVE' })
    if (productSub) return productSub.plan

    const legacySub = await Subscription.findOne({ userId, status: 'ACTIVE' })
    if (legacySub) return LEGACY_PLAN_MAP[legacySub.plan] || null

    return null
}

// GET /api/security-monitoring/sites/:id
export async function getSite(req, res) {
    try {
        const site = await MonitoredSite.findOne({ _id: req.params.id, userId: req.userId, product: 'security' })
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })
        res.json({ site })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/security-monitoring/sites
export async function getSites(req, res) {
    try {
        const plan = await getSecurityPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives Security-Monitoring Abo' })

        const sites = await MonitoredSite.find({ userId: req.userId, product: 'security', isActive: true }).lean()

        // Letzten Status pro Site hinzufügen
        const enriched = await Promise.all(sites.map(async (site) => {
            const lastCheck = await UptimeCheck.findOne({ siteId: site._id }).sort({ checkedAt: -1 }).lean()
            const openAlerts = await SecurityAlert.countDocuments({ siteId: site._id, resolvedAt: null })
            const lastScan = await SecurityScan.findOne({ siteId: site._id }).sort({ scannedAt: -1 }).lean()
            return { ...site, lastCheck, openAlerts, lastScan }
        }))

        res.json({ sites: enriched, plan, maxSites: PLAN_LIMITS[plan].maxSites })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// POST /api/security-monitoring/sites
export async function addSite(req, res) {
    try {
        const { domain, displayName } = req.body
        if (!domain) return res.status(400).json({ error: 'Domain erforderlich' })

        const plan = await getSecurityPlan(req.userId)
        if (!plan) return res.status(403).json({ error: 'Kein aktives Security-Monitoring Abo' })

        const siteCount = await MonitoredSite.countDocuments({
            userId: req.userId, product: 'security', isActive: true,
        })
        if (siteCount >= PLAN_LIMITS[plan].maxSites) {
            return res.status(403).json({
                error: `Maximale Anzahl an Websites erreicht (${PLAN_LIMITS[plan].maxSites} für ${plan}-Plan)`,
            })
        }

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

        const site = await MonitoredSite.create({
            userId: req.userId,
            product: 'security',
            domain: normalizedDomain,
            displayName: displayName || normalizedDomain,
        })

        res.status(201).json({ site })

        // Ersten Check sofort im Hintergrund starten
        Promise.all([runUptimeCheck(site), runSecurityScan(site)]).catch(() => {})
    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ error: 'Website wird bereits überwacht' })
        res.status(500).json({ error: err.message })
    }
}

// DELETE /api/security-monitoring/sites/:id
export async function deleteSite(req, res) {
    try {
        const site = await MonitoredSite.findOne({ _id: req.params.id, userId: req.userId, product: 'security' })
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })

        await Promise.all([
            UptimeCheck.deleteMany({ siteId: site._id }),
            SecurityScan.deleteMany({ siteId: site._id }),
            SecurityAlert.deleteMany({ siteId: site._id }),
            site.deleteOne(),
        ])

        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/security-monitoring/sites/:id/uptime?hours=24
export async function getUptimeHistory(req, res) {
    try {
        const site = await MonitoredSite.findOne({ _id: req.params.id, userId: req.userId, product: 'security' })
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })

        const hours = Math.min(parseInt(req.query.hours) || 24, 720)
        const since = new Date(Date.now() - hours * 3600 * 1000)
        const checks = await UptimeCheck.find({ siteId: site._id, checkedAt: { $gte: since } })
            .sort({ checkedAt: 1 }).lean()

        const upChecks = checks.filter(c => c.status === 'up')
        const uptimePercent = checks.length > 0
            ? Math.round((upChecks.length / checks.length) * 1000) / 10
            : null
        const avgResponseTime = upChecks.length > 0
            ? Math.round(upChecks.reduce((s, c) => s + (c.responseTime || 0), 0) / upChecks.length)
            : null

        res.json({ checks, uptimePercent, avgResponseTime, total: checks.length })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/security-monitoring/sites/:id/scans
export async function getSecurityScans(req, res) {
    try {
        const site = await MonitoredSite.findOne({ _id: req.params.id, userId: req.userId, product: 'security' })
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })

        const scans = await SecurityScan.find({ siteId: site._id })
            .sort({ scannedAt: -1 }).limit(30).lean()
        res.json({ scans })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/security-monitoring/alerts
export async function getAlerts(req, res) {
    try {
        const alerts = await SecurityAlert.find({ userId: req.userId, resolvedAt: null })
            .populate('siteId', 'domain displayName')
            .sort({ detectedAt: -1 }).lean()
        res.json({ alerts })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// PATCH /api/security-monitoring/alerts/:alertId/resolve
export async function resolveAlert(req, res) {
    try {
        const alert = await SecurityAlert.findOneAndUpdate(
            { _id: req.params.alertId, userId: req.userId, resolvedAt: null },
            { $set: { resolvedAt: new Date() } },
            { new: true }
        )
        if (!alert) return res.status(404).json({ error: 'Alert nicht gefunden' })
        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// PATCH /api/security-monitoring/sites/:id/alert-settings
export async function updateAlertSettings(req, res) {
    try {
        const { critical, medium, low } = req.body
        const site = await MonitoredSite.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId, product: 'security' },
            { $set: { 'alertSettings.critical': !!critical, 'alertSettings.medium': !!medium, 'alertSettings.low': !!low } },
            { new: true }
        )
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })
        res.json({ alertSettings: site.alertSettings })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/security-monitoring/plan
export async function getPlan(req, res) {
    try {
        const plan = await getSecurityPlan(req.userId)
        res.json({ plan })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// POST /api/security-monitoring/subscribe
export async function subscribePlan(req, res) {
    try {
        const { subscriptionId, plan } = req.body
        if (!subscriptionId || !plan) return res.status(400).json({ error: 'subscriptionId und plan erforderlich' })
        if (!['einsteiger', 'pro', 'expert'].includes(plan)) return res.status(400).json({ error: 'Ungültiger Plan' })

        await ProductSubscription.findOneAndUpdate(
            { userId: req.userId, product: 'security' },
            { userId: req.userId, product: 'security', plan, paypalSubscriptionId: subscriptionId, status: 'ACTIVE' },
            { upsert: true, new: true }
        )
        res.json({ success: true, plan })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// POST /api/security-monitoring/sites/:id/check — manueller Check
export async function triggerCheck(req, res) {
    try {
        const site = await MonitoredSite.findOne({ _id: req.params.id, userId: req.userId, product: 'security' })
        if (!site) return res.status(404).json({ error: 'Website nicht gefunden' })

        const [uptimeResult, scanResult] = await Promise.all([
            runUptimeCheck(site),
            runSecurityScan(site),
        ])

        res.json({ uptime: uptimeResult, ...scanResult })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}