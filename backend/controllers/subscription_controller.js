import Subscription from '../models/subscription.js'
import User from '../models/auth_model.js'
import { generateInvoiceHTML, renderToPDF } from '../utils/invoice.js'
import { sendAdminNewSubscription, sendSubscriptionConfirmation, sendRecurringInvoice } from '../utils/mailer.js'
import { parsePaypalSubscriptionId } from '../utils/paypalValidation.js'
import { verifyPaypalWebhookSignature } from '../utils/paypalWebhook.js'

const MIN_INVOICE_INTERVAL_DAYS = 20

async function getPayPalToken() {
    const clientId = process.env.PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENTID
    const creds = Buffer.from(`${clientId}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')
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

        const safeSubscriptionId = parsePaypalSubscriptionId(subscriptionId)
        if (!safeSubscriptionId) {
            return res.status(400).json({ error: req.language === 'en' ? 'Invalid PayPal subscription ID' : 'Ungültige PayPal Subscription-ID' })
        }

        const token = await getPayPalToken()
        const ppRes = await fetch(`${process.env.PAYPAL_BASE_URL}/v1/billing/subscriptions/${encodeURIComponent(safeSubscriptionId)}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
        const sub = await ppRes.json()

        if (!['ACTIVE', 'APPROVAL_PENDING'].includes(sub.status)) {
            return res.status(400).json({ error: req.language === 'en' ? `PayPal subscription not active (status: ${sub.status})` : `PayPal Subscription nicht aktiv (Status: ${sub.status})` })
        }

        await Subscription.findOneAndUpdate(
            { userId },
            { $set: { plan, paypalSubscriptionId: safeSubscriptionId, status: 'ACTIVE' }, $setOnInsert: { userId } },
            { upsert: true }
        )

        const user = await User.findById(userId).select('name email language').lean()
        if (user) {
            sendAdminNewSubscription({ name: user.name, email: user.email, plan }).catch(() => {})

            // Built from what we already have rather than looking up the PayPal transaction list —
            // that endpoint can still be empty right after capture (propagation lag), and the
            // invoice must go out regardless. generateInvoiceHTML falls back to PLAN_PRICES for the
            // amount, so a minimal { id, time } stand-in is enough for a correct first invoice.
            (async () => {
                try {
                    const invoiceTx = { id: safeSubscriptionId, time: new Date().toISOString() }
                    const html = generateInvoiceHTML(invoiceTx, user, plan, user.language)
                    const pdf = await renderToPDF(html)
                    await sendSubscriptionConfirmation({
                        name: user.name, email: user.email, plan, language: user.language,
                        invoicePdf: pdf, invoiceFilename: `${user.language === 'en' ? 'invoice' : 'rechnung'}-${safeSubscriptionId}.pdf`,
                    })
                    await Subscription.findOneAndUpdate({ userId }, { lastInvoicedAt: new Date() })
                } catch (err) {
                    console.error('Rechnungs-Versand fehlgeschlagen:', err.message)
                    // Never block the subscription on invoice/email failure — send the plain
                    // confirmation so the customer isn't left without any email at all.
                    sendSubscriptionConfirmation({ name: user.name, email: user.email, plan, language: user.language }).catch(() => {})
                }
            })()
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
        if (!sub) return res.status(404).json({ error: req.language === 'en' ? 'No active subscription found' : 'Kein aktives Abo gefunden' })

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
            User.findById(req.userId).select('name email language'),
        ])
        if (!sub) return res.status(404).json({ error: req.language === 'en' ? 'No subscription found' : 'Kein Abo gefunden' })

        const token = await getPayPalToken()
        const endTime = new Date().toISOString()
        const startTime = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()

        const ppRes = await fetch(
            `${process.env.PAYPAL_BASE_URL}/v1/billing/subscriptions/${sub.paypalSubscriptionId}/transactions?start_time=${startTime}&end_time=${endTime}`,
            { headers: { Authorization: `Bearer ${token}` } }
        )
        const data = await ppRes.json()
        const transaction = data.transactions?.find(t => t.id === transactionId)
        if (!transaction) return res.status(404).json({ error: req.language === 'en' ? 'Transaction not found' : 'Transaktion nicht gefunden' })

        const html = generateInvoiceHTML(transaction, user, sub.plan, user.language)
        const pdf = await renderToPDF(html)

        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', `attachment; filename=rechnung-${transactionId}.pdf`)
        res.send(pdf)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// PayPal calls this on every billing event. We only act on PAYMENT.SALE.COMPLETED for a
// subscription (billing_agreement_id present) — that fires for the first payment too, so
// lastInvoicedAt (set right after the capture-flow invoice) guards against sending a second
// invoice for the same period, and against duplicate delivery on PayPal's own webhook retries.
export async function handlePaypalWebhook(req, res) {
    try {
        const verified = await verifyPaypalWebhookSignature(req.headers, req.body)
        if (!verified) return res.status(400).json({ error: 'Invalid webhook signature' })

        const event = req.body
        if (event.event_type !== 'PAYMENT.SALE.COMPLETED') return res.json({ received: true })

        const resource = event.resource || {}
        const paypalSubscriptionId = resource.billing_agreement_id
        if (!paypalSubscriptionId) return res.json({ received: true })

        const sub = await Subscription.findOne({ paypalSubscriptionId, status: 'ACTIVE' })
        if (!sub) return res.json({ received: true })

        if (sub.lastInvoicedAt && Date.now() - new Date(sub.lastInvoicedAt).getTime() < MIN_INVOICE_INTERVAL_DAYS * 24 * 60 * 60 * 1000) {
            return res.json({ received: true })
        }

        const user = await User.findById(sub.userId).select('name email language').lean()
        if (!user) return res.json({ received: true })

        const invoiceTx = {
            id: resource.id,
            time: resource.create_time || new Date().toISOString(),
            amount_with_breakdown: resource.amount ? { gross_amount: { value: resource.amount.total, currency_code: resource.amount.currency } } : undefined,
        }
        const html = generateInvoiceHTML(invoiceTx, user, sub.plan, user.language)
        const pdf = await renderToPDF(html)

        await sendRecurringInvoice({
            name: user.name, email: user.email, plan: sub.plan, language: user.language,
            invoicePdf: pdf, invoiceFilename: `${user.language === 'en' ? 'invoice' : 'rechnung'}-${resource.id}.pdf`,
        })
        await Subscription.findByIdAndUpdate(sub._id, { lastInvoicedAt: new Date() })

        res.json({ received: true })
    } catch (err) {
        console.error('PayPal-Webhook fehlgeschlagen:', err.message)
        res.status(500).json({ error: err.message })
    }
}