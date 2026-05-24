import { Router } from 'express';
import Waitlist from '../models/waitlist.js';
import { sendWaitlistConfirmation } from '../utils/mailer.js';

const router = Router();

router.post('/', async (req, res) => {
    const { email, source } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Ungültige E-Mail-Adresse' });
    }
    try {
        await Waitlist.create({ email, source: source || 'extension' });
        sendWaitlistConfirmation(email).catch(err =>
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