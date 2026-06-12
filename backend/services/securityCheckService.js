import UptimeCheck from '../models/uptime_check.js'
import SecurityScan from '../models/security_scan.js'
import SecurityAlert from '../models/security_alert.js'
import MonitoredSite from '../models/monitored_site.js'
import User from '../models/auth_model.js'
import { checkUptime } from './uptimeChecker.js'
import { checkSSL } from './sslChecker.js'
import { analyzeSecurity } from '../controllers/security.js'
import { sendSecurityAlert, sendSiteOnlineNotification } from '../utils/mailer.js'

function shouldNotify(alertSettings, severity) {
    const s = alertSettings || {}
    if (severity === 'critical') return s.critical !== false
    if (severity === 'high' || severity === 'medium') return !!s.medium
    if (severity === 'low') return !!s.low
    return false
}

async function createAlertAndNotify(alertData, site) {
    const alert = await SecurityAlert.create(alertData)
    if (shouldNotify(site.alertSettings, alert.severity)) {
        const user = await User.findById(site.userId).select('email name').lean()
        if (user) {
            sendSecurityAlert({ user, site, alert }).catch(() => {})
            await SecurityAlert.findByIdAndUpdate(alert._id, { notificationSent: true })
        }
    }
    return alert
}

async function checkHttpRedirect(domain) {
    try {
        const res = await fetch(`http://${domain}`, {
            redirect: 'follow',
            signal: AbortSignal.timeout(8000),
        })
        return res.url.startsWith('https://')
    } catch {
        return false
    }
}

export async function runUptimeCheck(site) {
    const result = await checkUptime(site.domain)

    await UptimeCheck.create({
        siteId: site._id,
        userId: site.userId,
        checkedAt: new Date(),
        ...result,
    })

    if (result.status === 'down') {
        const existing = await SecurityAlert.findOne({
            siteId: site._id, type: 'downtime', resolvedAt: null,
        })
        if (!existing) {
            await createAlertAndNotify({
                siteId: site._id,
                userId: site.userId,
                type: 'downtime',
                severity: 'critical',
                message: `${site.domain} ist nicht erreichbar`,
                detectedAt: new Date(),
            }, site)
        }
    } else {
        // Prüfe ob vorher ein Downtime-Alert offen war → "wieder online" Mail
        const wasDown = await SecurityAlert.findOne({
            siteId: site._id, type: 'downtime', resolvedAt: null,
        })
        if (wasDown) {
            await SecurityAlert.updateMany(
                { siteId: site._id, type: 'downtime', resolvedAt: null },
                { $set: { resolvedAt: new Date() } }
            )
            if (site.alertSettings?.critical !== false) {
                const user = await User.findById(site.userId).select('email name').lean()
                if (user) sendSiteOnlineNotification({ user, site }).catch(() => {})
            }
        }
    }

    return result
}

export async function runSecurityScan(site) {
    const url = `https://${site.domain}`

    const [sslResult, httpRedirect] = await Promise.all([
        checkSSL(site.domain),
        checkHttpRedirect(site.domain),
    ])

    let scanResult = null
    try {
        const pageRes = await fetch(url, { signal: AbortSignal.timeout(12000) })
        const html = await pageRes.text()
        const headers = Object.fromEntries(pageRes.headers.entries())
        scanResult = await analyzeSecurity(url, headers, html)
    } catch {}

    const extraIssues = []
    if (!httpRedirect) {
        extraIssues.push({ message: 'HTTP leitet nicht auf HTTPS um', severity: 'medium', suggestion: null })
    }

    const scanIssues = [
        ...(scanResult?.issues || []).map((msg, i) => ({
            message: msg,
            severity: 'low',
            suggestion: scanResult.suggestions?.[i] || null,
        })),
        ...extraIssues,
    ]

    const scan = await SecurityScan.create({
        siteId: site._id,
        userId: site.userId,
        scannedAt: new Date(),
        score: scanResult?.score ?? null,
        sslValid: sslResult.valid,
        sslExpiry: sslResult.expiry,
        sslDaysLeft: sslResult.daysLeft,
        securityHeaders: scanResult?.headers ?? null,
        httpRedirect,
        checks: scanResult?.checks ?? null,
        issues: scanIssues,
    })

    // Security Issues Alert (unkritische Header-Probleme)
    const lowIssueCount = scanResult?.issues?.length || 0
    if (lowIssueCount > 0 || !httpRedirect) {
        const existing = await SecurityAlert.findOne({
            siteId: site._id, type: 'security_regression', resolvedAt: null,
        })
        if (!existing) {
            const allLow = [
                ...(scanResult?.issues || []),
                ...(!httpRedirect ? ['HTTP leitet nicht auf HTTPS um'] : []),
            ]
            const preview = allLow.slice(0, 2).join(', ') + (allLow.length > 2 ? ` (+${allLow.length - 2} weitere)` : '')
            await createAlertAndNotify({
                siteId: site._id,
                userId: site.userId,
                type: 'security_regression',
                severity: 'low',
                message: `${allLow.length} Sicherheitsproblem${allLow.length > 1 ? 'e' : ''} gefunden: ${preview}`,
                detectedAt: new Date(),
            }, site)
        }
    } else {
        await SecurityAlert.updateMany(
            { siteId: site._id, type: 'security_regression', resolvedAt: null },
            { $set: { resolvedAt: new Date() } }
        )
    }

    // SSL-Ablauf Alert
    if (sslResult.valid && sslResult.daysLeft !== null && sslResult.daysLeft <= 30) {
        const existing = await SecurityAlert.findOne({
            siteId: site._id, type: 'ssl_expiry', resolvedAt: null,
        })
        if (!existing) {
            const severity = sslResult.daysLeft <= 7 ? 'critical' : 'high'
            await createAlertAndNotify({
                siteId: site._id,
                userId: site.userId,
                type: 'ssl_expiry',
                severity,
                message: `SSL-Zertifikat läuft in ${sslResult.daysLeft} Tagen ab (${site.domain})`,
                detectedAt: new Date(),
            }, site)
        }
    }

    await MonitoredSite.findByIdAndUpdate(site._id, { lastChecked: new Date() })

    return { uptime: null, ssl: sslResult, httpRedirect, security: scanResult, scan }
}