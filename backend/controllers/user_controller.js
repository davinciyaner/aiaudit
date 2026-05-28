import User from '../models/auth_model.js'
import Subscription from '../models/subscription.js'
import Report from '../models/report_model.js'

const PLAN_LIMITS = { free: 1, pro: 10, agency: null }

export async function getAuditHistory(req, res) {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1)
        const limit = 10
        const skip = (page - 1) * limit

        const [rawReports, total] = await Promise.all([
            Report.find({ userId: req.userId })
                .select('url auditData pdfPath createdAt')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Report.countDocuments({ userId: req.userId }),
        ])

        const reports = rawReports.map(r => ({
            _id: r._id,
            url: r.url,
            createdAt: r.createdAt,
            pdfPath: r.pdfPath,
            scores: {
                overall: r.auditData?.overallScore ?? 0,
                seo: r.auditData?.seo?.score ?? 0,
                performance: r.auditData?.performance?.score ?? 0,
                security: r.auditData?.security?.score ?? 0,
                geo: r.auditData?.geo?.score ?? 0,
            },
        }))

        res.json({ reports, total, page, pages: Math.ceil(total / limit) })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

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