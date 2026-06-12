import express from 'express'
import rateLimit from 'express-rate-limit'
import { auth } from '../middleware/auth.js'
import {
    getSite, getSites, addSite, deleteSite,
    getUptimeHistory, getSecurityScans,
    getAlerts, triggerCheck, updateAlertSettings, resolveAlert,
    getPlan, subscribePlan,
} from '../controllers/security_monitoring.js'

// Max 1 manueller Check pro Site pro Minute
const checkRateLimit = rateLimit({
    windowMs: 60 * 1000,
    limit: 1,
    keyGenerator: (req) => `${req.userId}:${req.params.id}`,
    handler: (req, res) => res.status(429).json({ error: 'Bitte warte eine Minute zwischen manuellen Checks.' }),
    standardHeaders: false,
    legacyHeaders: false,
})

// Max 20 Requests pro Minute für alle anderen Endpunkte (pro User)
const apiRateLimit = rateLimit({
    windowMs: 60 * 1000,
    limit: 20,
    keyGenerator: (req) => req.userId,
    handler: (req, res) => res.status(429).json({ error: 'Zu viele Anfragen. Bitte warte einen Moment.' }),
    standardHeaders: false,
    legacyHeaders: false,
})

const router = express.Router()
router.use(auth)
router.use(apiRateLimit)

router.get('/sites', getSites)
router.post('/sites', addSite)
router.get('/sites/:id', getSite)
router.delete('/sites/:id', deleteSite)

router.get('/sites/:id/uptime', getUptimeHistory)
router.get('/sites/:id/scans', getSecurityScans)
router.post('/sites/:id/check', checkRateLimit, triggerCheck)
router.patch('/sites/:id/alert-settings', updateAlertSettings)

router.get('/plan', getPlan)
router.post('/subscribe', subscribePlan)

router.get('/alerts', getAlerts)
router.patch('/alerts/:alertId/resolve', resolveAlert)

export default router