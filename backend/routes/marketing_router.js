import { Router } from 'express'
import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'
import User from '../models/auth_model.js'

const router = Router()

// Grosszuegiger Read-Limiter fuer reine Token-Klick-Routen aus E-Mails (kein Formular-Spam-Risiko
// wie bei POST-Endpoints, aber trotzdem begrenzt gegen Token-Bruteforce).
const marketingReadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 60,
    standardHeaders: true,
    legacyHeaders: false,
})

// JWT statt eines persistierten Zufalls-Tokens (wie bei SampleReportLead.confirmToken) — spart ein
// zusaetzliches Feld/Migration auf dem User-Model und ist bei einem einzelnen, stabilen Secret
// (JWT_SECRET) genauso sicher. Bewusst OHNE expiresIn: Ein Abmeldelink aus einer E-Mail muss laut
// UWG jederzeit funktionieren, auch Monate spaeter.
function signMarketingToken(userId, purpose) {
    return jwt.sign({ userId: String(userId), purpose }, process.env.JWT_SECRET)
}

function verifyMarketingToken(token, expectedPurpose) {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        if (payload.purpose !== expectedPurpose) return null
        return payload.userId
    } catch {
        return null
    }
}

export function marketingConfirmUrl(userId, language = 'de') {
    const base = (process.env.APP_URL || 'https://www.scanora.ai').replace(/\/+$/, '')
    const token = signMarketingToken(userId, 'marketing-confirm')
    return language === 'en' ? `${base}/en/marketing-confirm?token=${token}` : `${base}/marketing-bestaetigen?token=${token}`
}

// Ein Link fuer zwei Faelle: "Abmelden" nach zuvor erteilter Zustimmung (Nurture-Mails) und
// "Nein danke" auf die Re-Permission-Anfrage (nie zugestimmt) — beides setzt marketingConsent=false.
export function marketingUnsubscribeUrl(userId, language = 'de') {
    const base = (process.env.APP_URL || 'https://www.scanora.ai').replace(/\/+$/, '')
    const token = signMarketingToken(userId, 'marketing-unsubscribe')
    return language === 'en' ? `${base}/en/marketing-unsubscribe?token=${token}` : `${base}/marketing-abmelden?token=${token}`
}

router.get('/confirm', marketingReadLimiter, async (req, res) => {
    const userId = verifyMarketingToken(String(req.query.token || ''), 'marketing-confirm')
    if (!userId) return res.status(404).json({ error: 'invalid_token' })

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ error: 'invalid_token' })

    if (!user.marketingConsent) {
        user.marketingConsent = true
        user.marketingConsentUpdatedAt = new Date()
        await user.save()
    }
    res.json({ success: true, language: user.language })
})

router.get('/unsubscribe', marketingReadLimiter, async (req, res) => {
    const userId = verifyMarketingToken(String(req.query.token || ''), 'marketing-unsubscribe')
    if (!userId) return res.status(404).json({ error: 'invalid_token' })

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ error: 'invalid_token' })

    if (user.marketingConsent) {
        user.marketingConsent = false
        user.marketingConsentUpdatedAt = new Date()
        await user.save()
    }
    res.json({ success: true, language: user.language })
})

export default router
