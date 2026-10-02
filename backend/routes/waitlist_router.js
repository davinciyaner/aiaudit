import { Router } from 'express'
import crypto from 'crypto'
import rateLimit from 'express-rate-limit'
import WaitlistSignup from '../models/waitlist_signup.js'
import { sendWaitlistOptIn, sendAdminWaitlistSignup, sendAdminWaitlistConfirmed, sendAdminWaitlistUnsubscribed } from '../utils/mailer.js'
import { t } from '../utils/i18n/errors.js'

const router = Router()

const PRODUCTS = ['seo-agent']
const INTERESTS = ['keyword-cleanup', 'keyword-discovery', 'content-compare', 'email-reports']

// Lineare Pruefung ohne Backtracking-Regex, siehe sample_report_router.js.
function isValidEmail(email) {
    if (typeof email !== 'string' || email.length === 0 || email.length > 254) return false
    const at = email.indexOf('@')
    if (at <= 0 || at !== email.lastIndexOf('@')) return false
    const local = email.slice(0, at)
    const domain = email.slice(at + 1)
    if (/\s/.test(local) || /\s/.test(domain)) return false
    if (domain.length === 0 || domain.startsWith('.') || domain.endsWith('.')) return false
    return domain.includes('.')
}

async function totals(product) {
    const [all, confirmed] = await Promise.all([
        WaitlistSignup.countDocuments({ product, unsubscribed: false }),
        WaitlistSignup.countDocuments({ product, unsubscribed: false, confirmed: true }),
    ])
    return { all, confirmed }
}

const signupLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: true, legacyHeaders: false })
const tokenLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 60, standardHeaders: true, legacyHeaders: false })

router.post('/', signupLimiter, async (req, res) => {
    const email = String(req.body?.email || '').trim().toLowerCase()
    const language = req.body?.language === 'en' ? 'en' : 'de'
    const product = PRODUCTS.includes(req.body?.product) ? req.body.product : 'seo-agent'
    const website = String(req.body?.website || '').trim().slice(0, 200) || null
    const interests = Array.isArray(req.body?.interests)
        ? [...new Set(req.body.interests.filter(i => INTERESTS.includes(i)))]
        : []

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: t('INVALID_EMAIL', req.language) })
    }

    try {
        let signup = await WaitlistSignup.findOne({ product, email })
        let isNew = false

        if (!signup) {
            signup = await WaitlistSignup.create({
                product, email, language, website, interests,
                confirmToken: crypto.randomBytes(24).toString('hex'),
                signupIp: req.ip,
            })
            isNew = true
        } else if (!signup.confirmed || signup.unsubscribed) {
            // Erneute Anmeldung: Angaben aktualisieren und Opt-In-Mail erneut senden. Nach einer
            // Abmeldung braucht es eine frische Einwilligung, daher neuer Token und confirmed:false.
            if (signup.unsubscribed) {
                signup.confirmToken = crypto.randomBytes(24).toString('hex')
                signup.confirmed = false
                signup.confirmedAt = null
                signup.unsubscribed = false
                signup.unsubscribedAt = null
                isNew = true
            }
            Object.assign(signup, { language, website: website ?? signup.website, signupIp: req.ip })
            if (interests.length) signup.interests = interests
            await signup.save()
        }

        if (!signup.confirmed) {
            sendWaitlistOptIn({ email, language, confirmToken: signup.confirmToken }).catch(err => {
                console.error('Warteliste Opt-In-Mail fehlgeschlagen:', err.message)
            })
        }
        if (isNew) {
            totals(product).then(counts => sendAdminWaitlistSignup({ product, email, language, website, interests, totals: counts })).catch(err => {
                console.error('Admin-Benachrichtigung (Warteliste) fehlgeschlagen:', err.message)
            })
        }
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }

    // Immer dieselbe Antwort, damit das Formular nicht verraet, ob eine Adresse schon eingetragen ist.
    res.json({ success: true })
})

router.get('/confirm/:token', tokenLimiter, async (req, res) => {
    const signup = await WaitlistSignup.findOne({ confirmToken: req.params.token })
    if (!signup || signup.unsubscribed) return res.status(404).json({ error: 'invalid_token' })

    if (!signup.confirmed) {
        signup.confirmed = true
        signup.confirmedAt = new Date()
        signup.confirmIp = req.ip
        await signup.save()
        totals(signup.product).then(counts => sendAdminWaitlistConfirmed({ product: signup.product, email: signup.email, language: signup.language, totals: counts })).catch(err => {
            console.error('Admin-Benachrichtigung (Warteliste bestaetigt) fehlgeschlagen:', err.message)
        })
    }
    res.json({ success: true, language: signup.language })
})

router.get('/unsubscribe/:token', tokenLimiter, async (req, res) => {
    const signup = await WaitlistSignup.findOne({ confirmToken: req.params.token })
    if (!signup) return res.status(404).json({ error: 'invalid_token' })

    if (!signup.unsubscribed) {
        signup.unsubscribed = true
        signup.unsubscribedAt = new Date()
        await signup.save()
        sendAdminWaitlistUnsubscribed({ product: signup.product, email: signup.email, language: signup.language }).catch(err => {
            console.error('Admin-Benachrichtigung (Warteliste abgemeldet) fehlgeschlagen:', err.message)
        })
    }
    res.json({ success: true, language: signup.language })
})

export default router
