import { Router } from 'express';
import Waitlist from '../models/waitlist.js';
import { sendWaitlistConfirmation } from '../utils/mailer.js';

const router = Router();

// Plain string operations instead of a backtracking-prone regex — the previous
// pattern (/^[^\s@]+@[^\s@]+\.[^\s@]+$/) had two overlapping [^\s@]+ groups that
// can both match ".", creating ambiguous split points and polynomial worst-case
// backtracking on crafted input (ReDoS).
function isValidEmail(email) {
    if (typeof email !== 'string' || email.length < 3 || email.length > 254) return false
    const atIndex = email.indexOf('@')
    if (atIndex < 1 || atIndex !== email.lastIndexOf('@')) return false
    const local = email.slice(0, atIndex)
    const domain = email.slice(atIndex + 1)
    if (/\s/.test(local) || /\s/.test(domain)) return false
    return !(!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.'));

}

router.post('/', async (req, res) => {
    const { email, source } = req.body;
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: req.language === 'en' ? 'Invalid email address' : 'Ungültige E-Mail-Adresse' });
    }
    try {
        await Waitlist.create({ email, source: source || 'extension' });
        sendWaitlistConfirmation(email, req.language).catch(err =>
            console.error('Waitlist-Mail fehlgeschlagen:', err.message)
        );
        res.json({ ok: true });
    } catch (err) {
        if (err.code === 11000) {
            return res.json({ ok: true }); // bereits eingetragen, kein Fehler zeigen
        }
        throw err;
    }
});

router.get('/count', async (_req, res) => {
    const count = await Waitlist.countDocuments();
    res.json({ count });
});

export default router;