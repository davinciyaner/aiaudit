import Subscription from '../models/subscription.js'
import User from '../models/auth_model.js'
import { generateInvoiceHTML, renderToPDF } from '../utils/invoice.js'
import { sendAdminNewSubscription, sendSubscriptionConfirmation } from '../utils/mailer.js'

async function getPayPalToken() {
    const creds = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')
    const res = await fetch(`${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${creds}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    })
    const data = await res.json()
    return data.access_token
}

export async function captureSubscription(req, res) {
    try {
        const { subscriptionId, plan } = req.body
        const userId = req.userId

        const token = await getPayPalToken()
        const ppRes = await fetch(`${process.env.PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
        const sub = await ppRes.json()

        if (!['ACTIVE', 'APPROVAL_PENDING'].includes(sub.status)) {
            return res.status(400).json({ error: `PayPal Subscription nicht aktiv (Status: ${sub.status})` })
        }

        await Subscription.findOneAndUpdate(
            { userId },
            { $set: { plan, paypalSubscriptionId: subscriptionId, status: 'ACTIVE' }, $setOnInsert: { userId } },
            { upsert: true }
        )

        const user = await User.findById(userId).select('name email').lean()
        if (user) {
            sendAdminNewSubscription({ name: user.name, email: user.email, plan }).catch(() => {})
            sendSubscriptionConfirmation({ name: user.name, email: user.email, plan }).catch(() => {})
        }

        res.json({ success: true, plan })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function getStatus(req, res) {
    try {
        const sub = await Subscription.findOne({ userId: req.userId })
        const plan = sub?.status === 'ACTIVE' ? sub.plan : 'free'
        res.json({ plan, status: sub?.status || null })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function cancelSubscription(req, res) {
    try {
        const sub = await Subscription.findOne({ userId: req.userId })
        if (!sub) return res.status(404).json({ error: 'Kein aktives Abo gefunden' })

        const token = await getPayPalToken()
        await fetch(`${process.env.PAYPAL_BASE_URL}/v1/billing/subscriptions/${sub.paypalSubscriptionId}/cancel`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reason: 'User cancelled' }),
        })

        await Subscription.findOneAndUpdate({ userId: req.userId }, { status: 'CANCELLED' })
        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function getBilling(req, res) {
    try {
        const sub = await Subscription.findOne({ userId: req.userId })
        if (!sub || sub.status !== 'ACTIVE') return res.json({ transactions: [] })

        const token = await getPayPalToken()
        const endTime = new Date().toISOString()
        const startTime = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()

        const ppRes = await fetch(
            `${process.env.PAYPAL_BASE_URL}/v1/billing/subscriptions/${sub.paypalSubscriptionId}/transactions?start_time=${startTime}&end_time=${endTime}`,
            { headers: { Authorization: `Bearer ${token}` } }
        )
        const data = await ppRes.json()
        res.json({ transactions: data.transactions || [] })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function downloadInvoice(req, res) {
    try {
        const { transactionId } = req.params
        const [sub, user] = await Promise.all([
            Subscription.findOne({ userId: req.userId }),
            User.findById(req.userId).select('name email'),
        ])
        if (!sub) return res.status(404).json({ error: 'Kein Abo gefunden' })

        const token = await getPayPalToken()
        const endTime = new Date().toISOString()
        const startTime = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()

        const ppRes = await fetch(
            `${process.env.PAYPAL_BASE_URL}/v1/billing/subscriptions/${sub.paypalSubscriptionId}/transactions?start_time=${startTime}&end_time=${endTime}`,
            { headers: { Authorization: `Bearer ${token}` } }
        )
        const data = await ppRes.json()
        const transaction = data.transactions?.find(t => t.id === transactionId)
        if (!transaction) return res.status(404).json({ error: 'Transaktion nicht gefunden' })

        const html = generateInvoiceHTML(transaction, user, sub.plan)
        const pdf = await renderToPDF(html)

        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', `attachment; filename=rechnung-${transactionId}.pdf`)
        res.send(pdf)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}