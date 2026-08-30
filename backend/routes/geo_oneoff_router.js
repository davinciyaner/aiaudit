import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { startCheck, getCheckStatus } from '../controllers/geo_oneoff.js'
import { optionalAuth } from '../middleware/optionalAuth.js'

const floorLimiter = rateLimit({ windowMs: 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false })
const pollLimiter = rateLimit({ windowMs: 60 * 1000, max: 60, standardHeaders: true, legacyHeaders: false })

const router = Router()
router.post('/', optionalAuth, floorLimiter, startCheck)
router.get('/:id', optionalAuth, pollLimiter, getCheckStatus)

export default router
