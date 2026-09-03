import express from 'express'
import rateLimit from 'express-rate-limit'
import { auth } from '../middleware/auth.js'
import { t } from '../utils/i18n/errors.js'
import {
    getPlan, subscribePlan,
    getSites, addSite, getSite, deleteSite,
    addKeywords, removeKeywords,
    getRankings, getRankingHistory, triggerCheck,
    getKeywordIdeasForSite, getCompetitorsForSite, getBacklinksForSite, getBacklinkGapForSite, getContentGapForSite,
    getAlertSettings, updateAlertSettings,
    generateContent, generateBacklinkIdeasForKeyword,
    getInsights, refreshInsight,
} from '../controllers/seo_tracking.js'

const checkRateLimit = rateLimit({
    windowMs: 60 * 1000,
    limit: 2,
    // Pro Route eigenes Kontingent — sonst teilen sich Check, Keyword-Ideen, Konkurrenten,
    // Backlinks, Content-Gap etc. ein gemeinsames Limit von 2/Minute und blockieren sich
    // gegenseitig beim Wechsel zwischen Tabs, obwohl jede Aktion für sich harmlos ist.
    keyGenerator: (req) => `${req.userId}:${req.params.id}:${req.path}`,
    handler: (req, res) => res.status(429).json({ error: t('CHECK_RATE_LIMIT', req.language) }),
    standardHeaders: false,
    legacyHeaders: false,
})

// Backlinks/Backlink-Gap: Tab öffnen und gecachte Daten abrufen soll nie blockiert werden —
// nur der manuelle "Neu laden/analysieren"-Button (?force=true) zählt gegen das Limit.
const manualRefreshRateLimit = rateLimit({
    windowMs: 45 * 1000,
    limit: 1,
    keyGenerator: (req) => `${req.userId}:${req.params.id}:${req.path}`,
    handler: (req, res) => res.status(429).json({ error: t('MANUAL_REFRESH_RATE_LIMIT', req.language) }),
    standardHeaders: false,
    legacyHeaders: false,
    skip: (req) => req.query.force !== 'true',
})

const apiRateLimit = rateLimit({
    windowMs: 60 * 1000,
    limit: 30,
    keyGenerator: (req) => req.userId,
    handler: (req, res) => res.status(429).json({ error: t('API_RATE_LIMIT', req.language) }),
    standardHeaders: false,
    legacyHeaders: false,
})

const router = express.Router()
router.use(auth)
router.use(apiRateLimit)

router.get('/plan', getPlan)
router.post('/subscribe', subscribePlan)

router.get('/alert-settings', getAlertSettings)
router.patch('/alert-settings', updateAlertSettings)

router.get('/sites', getSites)
router.post('/sites', addSite)
router.get('/sites/:id', getSite)
router.delete('/sites/:id', deleteSite)

router.post('/sites/:id/keywords', addKeywords)
router.delete('/sites/:id/keywords', removeKeywords)

router.get('/sites/:id/rankings', getRankings)
router.get('/sites/:id/history',  getRankingHistory)
router.post('/sites/:id/check', checkRateLimit, triggerCheck)

router.get('/sites/:id/keyword-ideas', checkRateLimit, getKeywordIdeasForSite)
router.get('/sites/:id/competitors', checkRateLimit, getCompetitorsForSite)
router.get('/sites/:id/backlinks', manualRefreshRateLimit, getBacklinksForSite)
router.get('/sites/:id/backlink-gap', manualRefreshRateLimit, getBacklinkGapForSite)
router.get('/sites/:id/content-gap', checkRateLimit, getContentGapForSite)

router.post('/sites/:id/keyword-content', checkRateLimit, generateContent)
router.post('/sites/:id/backlink-ideas', checkRateLimit, generateBacklinkIdeasForKeyword)

router.get('/sites/:id/insights', getInsights)
router.post('/sites/:id/insights/refresh', checkRateLimit, refreshInsight)

export default router