import express from 'express'
import cors from 'cors'
import rateLimit, { ipKeyGenerator } from 'express-rate-limit'
import { sanitizeBody } from '../middleware/sanitizeBody.js'
import { language } from '../middleware/language.js'
import { trackLead, verifySnippet } from '../controllers/leads.js'

// Oeffentlicher Endpoint, aufgerufen vom Tracking-Snippet auf der Website eines Scanora-Kunden —
// also von einer fremden Domain, nicht von scanora.ai selbst. Braucht deshalb eigenes, permissives
// CORS statt der globalen Origin-Restriktion aus server.js (die nur scanora.ai + die Chrome-Extension
// erlaubt). Wird in server.js deshalb VOR dem globalen cors()-Middleware gemountet — sonst wuerde die
// globale Restriktion jeden Request von einer Kundendomain schon vorher abweisen.
const router = express.Router()

const trackLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 20,
    // req.body.siteKey ist der Normalfall; der IPv6-sichere ipKeyGenerator-Fallback greift nur, wenn
    // ausnahmsweise noch kein Body geparst wurde (siteKey fehlt) — rohe req.ip wuerde express-rate-limit
    // sonst als potenzielle IPv6-Bypass-Luecke werten (mehrere Textformen derselben Adresse).
    keyGenerator: (req) => req.body?.siteKey || ipKeyGenerator(req.ip),
    handler: (req, res) => res.status(429).json({ error: 'Too many requests.' }),
    standardHeaders: false,
    legacyHeaders: false,
})

router.post('/track',
    cors({ origin: true }),
    express.json({ limit: '10kb' }),
    sanitizeBody,
    language,
    trackLimiter,
    trackLead,
)

router.post('/verify',
    cors({ origin: true }),
    express.json({ limit: '10kb' }),
    sanitizeBody,
    language,
    trackLimiter,
    verifySnippet,
)

export default router
