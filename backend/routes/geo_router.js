import express from 'express'
import rateLimit from 'express-rate-limit'
import { auth } from '../middleware/auth.js'
import {
    getPlan, subscribePlan,
    getSites, getSite, addSite, deleteSite,
    addKeywords, removeKeywords,
    getResults, triggerCheck, updatePlatforms,
} from '../controllers/geo_tracking.js'

const checkRateLimit = rateLimit({
    windowMs: 60 * 1000,
    limit: 2,
    keyGenerator: (req) => `geo:${req.userId}:${req.params.id}`,
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

router.get('/plan',      getPlan)
router.post('/subscribe', subscribePlan)

router.get('/sites',         getSites)
router.post('/sites',        addSite)
router.get('/sites/:id',     getSite)
router.delete('/sites/:id',  deleteSite)

router.post('/sites/:id/keywords',   addKeywords)
router.delete('/sites/:id/keywords', removeKeywords)
router.patch('/sites/:id/platforms', updatePlatforms)

router.get('/sites/:id/results',         getResults)
router.post('/sites/:id/check', checkRateLimit, triggerCheck)

export default router