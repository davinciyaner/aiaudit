import { Router } from 'express'
import LandingFeedback from '../models/landing_feedback.js'

const router = Router()

router.post('/', async (req, res) => {
    const { rating, auditBarrier, missingFeature } = req.body

    if (rating !== undefined && (typeof rating !== 'number' || rating < 1 || rating > 5)) {
        return res.status(400).json({ error: 'rating muss zwischen 1 und 5 liegen' })
    }

    try {
        await LandingFeedback.create({
            rating:         rating ?? null,
            auditBarrier:   auditBarrier?.trim() || null,
            missingFeature: missingFeature?.trim() || null,
            userAgent:      req.headers['user-agent'] || null,
            source:         'landing',
        })
        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router