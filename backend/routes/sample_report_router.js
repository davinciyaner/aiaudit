import { Router } from 'express'
import crypto from 'crypto'
import path from 'path'
import rateLimit from 'express-rate-limit'
import SampleReportLead from '../models/sample_report_lead.js'
import { sendSampleReportOptIn } from '../utils/mailer.js'
import { t } from '../utils/i18n/errors.js'

const router = Router()

const FILENAME_BY_LANGUAGE = { de: 'scanora-beispiel-report-de.pdf', en: 'scanora-beispiel-report-en.pdf' }
const DOWNLOAD_NAME_BY_LANGUAGE = { de: 'scanora-beispiel-report.pdf', en: 'scanora-example-report.pdf' }

// Bewusst ohne Backtracking-anfaellige Regex (kein "^[^\s@]+@[^\s@]+\.[^\s@]+$") — bei so einem
// Muster ueberlappen sich die beiden [^\s@]+-Gruppen mit dem Trennzeichen, wodurch der Regex-Engine
// bei Eingaben ohne Punkt (oder mit vielen Punkten) quadratisch viele Split-Positionen durchprobiert
// (CodeQL: "Polynomial regular expression used on uncontrolled data"). Stattdessen einfache,
// lineare String-Operationen ohne jede Backtracking-Moeglichkeit.
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

// Public, unauthenticated lead-magnet form (no login) — bounded so it can't be used to spam
// the DB or as an email-validity oracle.
const sampleReportLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 8,
    standardHeaders: true,
    legacyHeaders: false,
})

// Grosszuegigerer Limiter fuer reine Lese-/Token-Routen (Zaehler beim Seitenaufruf, Bestaetigungs-
// und Abmeldelinks aus E-Mails) — verhindert unbegrenzten DB-/Dateizugriff, ohne normale
// Seitenbesucher durch das enge 8-Anfragen-Limit der Formular-Route zu blockieren.
const sampleReportReadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 60,
    standardHeaders: true,
    legacyHeaders: false,
})

// Oeffentlicher Zaehler fuer Social Proof auf der Landingpage ("X Reports heruntergeladen") —
// jede Anfrage in SampleReportLead entspricht genau einem ausgeloesten Download (siehe POST '/'
// unten), also reicht die reine Dokumentenzahl ohne separates Tracking.
router.get('/count', sampleReportReadLimiter, async (req, res) => {
    const count = await SampleReportLead.countDocuments()
    res.json({ count })
})

router.post('/', sampleReportLimiter, async (req, res) => {
    const email = String(req.body?.email || '').trim().toLowerCase()
    const language = req.body?.language === 'en' ? 'en' : 'de'

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: t('INVALID_EMAIL', req.language) })
    }

    const confirmToken = crypto.randomBytes(24).toString('hex')

    try {
        await SampleReportLead.create({ email, language, confirmToken, signupIp: req.ip })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }

    // Der Download selbst ist transaktional und wartet nicht auf die Bestaetigung — nur die
    // spaetere Marketing-Nutzung dieser Adresse haengt am Opt-In-Klick (siehe confirmed-Flag).
    sendSampleReportOptIn({ email, language, confirmToken }).catch(err => {
        console.error('Opt-In-Mail fehlgeschlagen:', err.message)
    })

    res.json({ success: true, filename: FILENAME_BY_LANGUAGE[language] })
})

// res.download() setzt automatisch Content-Disposition: attachment — im Unterschied zur
// statischen /reports-Route (inline, oeffnet nur im Browser-Viewer) erzwingt das einen
// echten Datei-Download unabhaengig vom Browser.
router.get('/download/:language', sampleReportReadLimiter, (req, res) => {
    const language = req.params.language === 'en' ? 'en' : 'de'
    const filePath = path.join(process.cwd(), 'reports', FILENAME_BY_LANGUAGE[language])
    res.download(filePath, DOWNLOAD_NAME_BY_LANGUAGE[language], err => {
        if (err && !res.headersSent) res.status(404).json({ error: 'not_found' })
    })
})

// Von der Bestaetigungs-Mail aus aufgerufen (ueber eine Frontend-Seite, die diesen Endpoint
// per fetch anspricht) — markiert die Adresse als fuer Marketing nutzbar.
router.get('/confirm/:token', sampleReportReadLimiter, async (req, res) => {
    const lead = await SampleReportLead.findOne({ confirmToken: req.params.token })
    if (!lead) return res.status(404).json({ error: 'invalid_token' })

    if (!lead.confirmed) {
        lead.confirmed = true
        lead.confirmedAt = new Date()
        lead.confirmIp = req.ip
        await lead.save()
    }
    res.json({ success: true, language: lead.language })
})

router.get('/unsubscribe/:token', sampleReportReadLimiter, async (req, res) => {
    const lead = await SampleReportLead.findOne({ confirmToken: req.params.token })
    if (!lead) return res.status(404).json({ error: 'invalid_token' })

    if (!lead.unsubscribed) {
        lead.unsubscribed = true
        lead.unsubscribedAt = new Date()
        await lead.save()
    }
    res.json({ success: true, language: lead.language })
})

export default router
