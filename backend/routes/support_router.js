import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import SupportTicket from '../models/support_ticket.js'
import { sendTicketCreatedUser, sendTicketCreatedAdmin, sendTicketStatusChanged } from '../utils/mailer.js'
import { t } from '../utils/i18n/errors.js'

const router = Router()

const submitLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: (req) => ({ error: t('TOO_MANY_REQUESTS_HOUR', req.language) }),
})

const lookupLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: (req) => ({ error: t('TOO_MANY_REQUESTS', req.language) }),
})

// Admin routes are gated by ADMIN_TOKEN, but without a rate limit the token itself
// can be brute-forced at unlimited speed — this bounds guess attempts regardless.
const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: (req) => ({ error: t('TOO_MANY_REQUESTS', req.language) }),
})

function generateTicketNumber() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const rand = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    return `TK-${rand}`
}

function isAdminAuthorized(req) {
    const token = process.env.ADMIN_TOKEN
    return token && req.headers.authorization === `Bearer ${token}`
}

// Ticket numbers are always "TK-" + 8 uppercase alphanumeric chars (generateTicketNumber
// above). Validating the :ticketNumber route param against this format before it's used
// in a query — even though Express route params are always strings — gives a value that's
// provably derived from a matched pattern rather than the raw param.
const TICKET_NUMBER_RE = /^TK-[A-Z0-9]{8}$/
function parseTicketNumber(value) {
    const match = TICKET_NUMBER_RE.exec(String(value || '').toUpperCase())
    return match ? match[0] : null
}

// POST /api/support — Ticket erstellen
router.post('/', submitLimiter, async (req, res, next) => {
    try {
        const { name, email, subject, message, language } = req.body
        if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
            return res.status(400).json({ error: t('ALL_FIELDS_REQUIRED', req.language) })
        }

        let ticketNumber
        let exists = true
        while (exists) {
            ticketNumber = generateTicketNumber()
            exists = await SupportTicket.exists({ ticketNumber })
        }

        const ticket = await SupportTicket.create({
            ticketNumber,
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject.trim(),
            message: message.trim(),
            language: language === 'en' ? 'en' : req.language,
        })

        sendTicketCreatedUser(ticket).catch(console.error)
        sendTicketCreatedAdmin(ticket).catch(console.error)

        res.status(201).json({ ticketNumber: ticket.ticketNumber })
    } catch (err) {
        next(err)
    }
})

// GET /api/support — Admin: alle Tickets
router.get('/', adminLimiter, async (req, res, next) => {
    try {
        if (!isAdminAuthorized(req)) return res.status(403).json({ error: t('NOT_AUTHORIZED', req.language) })
        const tickets = await SupportTicket.find()
            .sort({ createdAt: -1 })
            .select('ticketNumber name email subject status createdAt')
        res.json(tickets)
    } catch (err) {
        next(err)
    }
})

// GET /api/support/by-email?email=xxx — Ticket-Suche per E-Mail (muss vor /:ticketNumber stehen)
router.get('/by-email', lookupLimiter, async (req, res, next) => {
    try {
        const { email } = req.query
        if (!email?.trim()) return res.status(400).json({ error: t('EMAIL_MISSING', req.language) })
        const tickets = await SupportTicket.find(
            { email: email.trim().toLowerCase() },
            'ticketNumber subject status createdAt'
        ).sort({ createdAt: -1 }).limit(20)
        res.json(tickets)
    } catch (err) {
        next(err)
    }
})

// GET /api/support/:ticketNumber — öffentlicher Status-Check
router.get('/:ticketNumber', lookupLimiter, async (req, res, next) => {
    try {
        const ticketNumber = parseTicketNumber(req.params.ticketNumber)
        if (!ticketNumber) return res.status(404).json({ error: t('TICKET_NOT_FOUND', req.language) })

        const ticket = await SupportTicket.findOne(
            { ticketNumber },
            'ticketNumber subject status createdAt updatedAt'
        )
        if (!ticket) return res.status(404).json({ error: t('TICKET_NOT_FOUND', req.language) })
        res.json(ticket)
    } catch (err) {
        next(err)
    }
})

// PATCH /api/support/:ticketNumber/status — Admin: Status aktualisieren
router.patch('/:ticketNumber/status', adminLimiter, async (req, res, next) => {
    try {
        if (!isAdminAuthorized(req)) return res.status(403).json({ error: t('NOT_AUTHORIZED', req.language) })

        const { status } = req.body
        if (!['open', 'in_progress', 'closed'].includes(status)) {
            return res.status(400).json({ error: t('INVALID_STATUS', req.language) })
        }

        const ticketNumber = parseTicketNumber(req.params.ticketNumber)
        if (!ticketNumber) return res.status(404).json({ error: t('TICKET_NOT_FOUND', req.language) })

        const ticket = await SupportTicket.findOneAndUpdate(
            { ticketNumber },
            { status },
            { returnDocument: 'after', select: 'ticketNumber name email subject status language' }
        )
        if (!ticket) return res.status(404).json({ error: t('TICKET_NOT_FOUND', req.language) })

        if (status === 'in_progress' || status === 'closed') {
            sendTicketStatusChanged(ticket, status).catch(console.error)
        }

        res.json({ ticketNumber: ticket.ticketNumber, status: ticket.status })
    } catch (err) {
        next(err)
    }
})

export default router