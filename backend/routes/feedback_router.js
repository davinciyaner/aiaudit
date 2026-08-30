import { Router } from 'express'
import Feedback from '../models/feedback.js'
import { t } from '../utils/i18n/errors.js'
import { optionalAuth } from '../middleware/optionalAuth.js'

const router = Router()

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