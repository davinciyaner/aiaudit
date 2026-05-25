import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import SupportTicket from '../models/support_ticket.js'
import { sendTicketCreatedUser, sendTicketCreatedAdmin, sendTicketStatusChanged } from '../utils/mailer.js'

const router = Router()

const submitLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: { error: 'Zu viele Anfragen. Bitte in einer Stunde erneut versuchen.' },
})

const lookupLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: { error: 'Zu viele Anfragen.' },
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

// POST /api/support — Ticket erstellen
router.post('/', submitLimiter, async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body
        if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
            return res.status(400).json({ error: 'Alle Felder sind erforderlich.' })
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
        })

        sendTicketCreatedUser(ticket).catch(console.error)
        sendTicketCreatedAdmin(ticket).catch(console.error)

        res.status(201).json({ ticketNumber: ticket.ticketNumber })
    } catch (err) {
        next(err)
    }
})

// GET /api/support — Admin: alle Tickets
router.get('/', async (req, res, next) => {
    try {
        if (!isAdminAuthorized(req)) return res.status(403).json({ error: 'Nicht autorisiert.' })
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
        if (!email?.trim()) return res.status(400).json({ error: 'E-Mail fehlt.' })
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
router.get('/:ticketNumber', async (req, res, next) => {
    try {
        const ticket = await SupportTicket.findOne(
            { ticketNumber: req.params.ticketNumber.toUpperCase() },
            'ticketNumber subject status createdAt updatedAt'
        )
        if (!ticket) return res.status(404).json({ error: 'Ticket nicht gefunden.' })
        res.json(ticket)
    } catch (err) {
        next(err)
    }
})

// PATCH /api/support/:ticketNumber/status — Admin: Status aktualisieren
router.patch('/:ticketNumber/status', async (req, res, next) => {
    try {
        if (!isAdminAuthorized(req)) return res.status(403).json({ error: 'Nicht autorisiert.' })

        const { status } = req.body
        if (!['open', 'in_progress', 'closed'].includes(status)) {
            return res.status(400).json({ error: 'Ungültiger Status.' })
        }

        const ticket = await SupportTicket.findOneAndUpdate(
            { ticketNumber: req.params.ticketNumber.toUpperCase() },
            { status },
            { returnDocument: 'after', select: 'ticketNumber name email subject status' }
        )
        if (!ticket) return res.status(404).json({ error: 'Ticket nicht gefunden.' })

        if (status === 'in_progress' || status === 'closed') {
            sendTicketStatusChanged(ticket, status).catch(console.error)
        }

        res.json({ ticketNumber: ticket.ticketNumber, status: ticket.status })
    } catch (err) {
        next(err)
    }
})

export default router