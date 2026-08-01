import { Router } from 'express'
import jwt from 'jsonwebtoken'
import Feedback from '../models/feedback.js'
import { t } from '../utils/i18n/errors.js'

const router = Router()

function optionalAuth(req, res, next) {
    const header = req.headers.authorization
    if (!header) return next()
    try {
        const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET)
        req.userId = decoded.id
    } catch { /* ignore invalid token */ }
    next()
}

router.post('/', optionalAuth, async (req, res) => {
    const { url, reportId, vote, reason } = req.body
    if (!vote || !['yes', 'no'].includes(vote)) {
        return res.status(400).json({ error: t('VOTE_MUST_BE_YES_OR_NO', req.language) })
    }
    try {
        await Feedback.create({
            url:      url || null,
            reportId: reportId || null,
            userId:   req.userId || null,
            vote,
            reason:   reason || null,
        })
        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router