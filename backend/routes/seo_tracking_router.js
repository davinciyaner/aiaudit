import express from 'express'
import rateLimit from 'express-rate-limit'
import { auth } from '../middleware/auth.js'
import {
    getPlan, subscribePlan,
    getSites, addSite, getSite, deleteSite,
    addKeywords, removeKeywords,
    getRankings, triggerCheck,
    getKeywordIdeasForSite, getCompetitorsForSite, getBacklinksForSite,
} from '../controllers/seo_tracking.js'

const checkRateLimit = rateLimit({
    windowMs: 60 * 1000,
    limit: 2,
    keyGenerator: (req) => `${req.userId}:${req.params.id}`,
    handler: (req, res) => res.status(429).json({ error: 'Bitte warte eine Minute zwischen manuellen Checks.' }),
    standardHeaders: false,
    legacyHeaders: false,
})

const apiRateLimit = rateLimit({
    windowMs: 60 * 1000,
    limit: 30,
    keyGenerator: (req) => req.userId,
    handler: (req, res) => res.status(429).json({ error: 'Zu viele Anfragen. Bitte warte einen Moment.' }),
    standardHeaders: false,
    legacyHeaders: false,
})

const router = express.Router()
router.use(auth)
router.use(apiRateLimit)

router.get('/plan', getPlan)
router.post('/subscribe', subscribePlan)

router.get('/sites', getSites)
router.post('/sites', addSite)
router.get('/sites/:id', getSite)
router.delete('/sites/:id', deleteSite)

router.post('/sites/:id/keywords', addKeywords)
router.delete('/sites/:id/keywords', removeKeywords)

router.get('/sites/:id/rankings', getRankings)
router.post('/sites/:id/check', checkRateLimit, triggerCheck)

router.get('/sites/:id/keyword-ideas', checkRateLimit, getKeywordIdeasForSite)
router.get('/sites/:id/competitors', checkRateLimit, getCompetitorsForSite)
router.get('/sites/:id/backlinks', checkRateLimit, getBacklinksForSite)

export default router