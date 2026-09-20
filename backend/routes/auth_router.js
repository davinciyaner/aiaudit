import {Router} from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/auth_model.js";
import Subscription from "../models/subscription.js";
import ProductSubscription from "../models/product_subscription.js";
import bcrypt from "bcrypt";
import {sendAdminNewUser, sendPasswordReset, sendWelcome} from "../utils/mailer.js";
import { t } from "../utils/i18n/errors.js";

const REACTIVATION_INACTIVE_DAYS = 35;

const router = Router();


router.post("/register", async (req, res) => {
    const { name, email, password, language, marketingConsent } = req.body;
    const userLanguage = language === "en" ? "en" : "de";

    if (!name || typeof email !== "string" || !email || !password) {
        return res.status(400).json({
            error: t("NAME_EMAIL_PASSWORD_REQUIRED", req.language)
        });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: t("USER_EXISTS", req.language)
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const consent = !!marketingConsent;

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            language: userLanguage,
            marketingConsent: consent,
            marketingConsentUpdatedAt: consent ? new Date() : undefined,
            lastLoginAt: new Date(), // Basislinie fuer die 35-Tage-Inaktivitaets-Erkennung beim naechsten echten Login
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        sendAdminNewUser({ name: user.name, email: user.email }).catch(() => {});
        sendWelcome({ name: user.name, email: user.email, language: user.language }).catch(() => {});

        res.json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (typeof email !== "string" || !email || !password) {
        return res.status(400).json({
            error: t("EMAIL_PASSWORD_REQUIRED", req.language)
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                error: t("INVALID_CREDENTIALS", req.language)
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                error: t("INVALID_CREDENTIALS", req.language)
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Inaktivitaet anhand des vorherigen Logins bestimmen, BEVOR lastLoginAt ueberschrieben
        // wird — sonst waere der Nutzer durch das gerade stattfindende Login selbst nie mehr
        // "inaktiv". Kein vorheriger Login (z.B. direkt nach Registrierung noch nie erneut
        // eingeloggt) zaehlt bewusst nicht als Reaktivierung, dafuer fehlt der Vergleichspunkt.
        const previousLoginAt = user.lastLoginAt;
        const daysSincePreviousLogin = previousLoginAt
            ? (Date.now() - previousLoginAt.getTime()) / (1000 * 60 * 60 * 24)
            : null;
        const wasInactive = daysSincePreviousLogin !== null && daysSincePreviousLogin >= REACTIVATION_INACTIVE_DAYS;

        let showReactivationBanner = false
        if (wasInactive) {
            const [sub, productSub] = await Promise.all([
                Subscription.exists({ userId: user._id, status: 'ACTIVE' }),
                ProductSubscription.exists({ userId: user._id, status: 'ACTIVE' }),
            ]);
            // Zahlende Nutzer bekommen keinen "starte jetzt Tracking"-Banner — der Hinweis passt
            // nur fuer Free-Nutzer, die noch keinen naechsten Schritt gegangen sind.
            showReactivationBanner = !sub && !productSub;
        }

        user.lastLoginAt = new Date();
        await user.save();

        res.json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email },
            showReactivationBanner,
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    if (typeof email !== "string" || !email) return res.status(400).json({ error: t("EMAIL_REQUIRED", req.language) });

    try {
        const user = await User.findOne({ email });
        // Always respond the same to prevent email enumeration
        if (!user) return res.json({ success: true });

        const rawToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = crypto.createHash("sha256").update(rawToken).digest("hex");
        user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await user.save();

        await sendPasswordReset({ name: user.name, email: user.email, token: rawToken, language: user.language });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post("/reset-password", async (req, res) => {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ error: t("TOKEN_PASSWORD_REQUIRED", req.language) });
    if (password.length < 6) return res.status(400).json({ error: t("PASSWORD_TOO_SHORT", req.language) });

    try {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await User.findOne({
            resetToken: hashedToken,
            resetTokenExpiry: { $gt: new Date() },
        });

        if (!user) return res.status(400).json({ error: t("LINK_INVALID_OR_EXPIRED", req.language) });

        await User.updateOne(
            { _id: user._id },
            { $set: { password: await bcrypt.hash(password, 10) }, $unset: { resetToken: 1, resetTokenExpiry: 1 } }
        );

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/me", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: t("NO_TOKEN", req.language) });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        res.json(user);

    } catch (err) {
        res.status(401).json({ error: t("INVALID_TOKEN", req.language) });
    }
});


export default router;