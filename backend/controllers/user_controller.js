import User from '../models/auth_model.js'
import Subscription from '../models/subscription.js'
import Report from '../models/report_model.js'

const PLAN_LIMITS = { free: 1, pro: 10, agency: null }

export async function getProfile(req, res) {
    try {
        const [user, sub] = await Promise.all([
            User.findById(req.userId).select('-password'),
            Subscription.findOne({ userId: req.userId }),
        ])

        if (!user) return res.status(404).json({ error: 'User nicht gefunden' })

        const plan = sub && sub.status !== 'CANCELLED' ? sub.plan : 'free'

        const startOfMonth = new Date()
        startOfMonth.setDate(1)
        startOfMonth.setHours(0, 0, 0, 0)

        const [auditsThisMonth, auditsTotal] = await Promise.all([
            Report.countDocuments({ userId: req.userId, createdAt: { $gte: startOfMonth } }),
            Report.countDocuments({ userId: req.userId }),
        ])

        res.json({
            user: { name: user.name, email: user.email },
            subscription: {
                plan,
                status: sub?.status || null,
                paypalSubscriptionId: sub?.paypalSubscriptionId || null,
                since: sub?.createdAt || null,
            },
            audits: {
                used: auditsThisMonth,
                limit: PLAN_LIMITS[plan],
                total: auditsTotal,
            },
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}