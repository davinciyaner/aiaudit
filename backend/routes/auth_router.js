import {Router} from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/auth_model.js";
import bcrypt from "bcrypt";
import {sendAdminNewUser, sendPasswordReset, sendWelcome} from "../utils/mailer.js";

const router = Router();


router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            error: "Name, Email und Passwort sind erforderlich"
        });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: "User existiert bereits"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        sendAdminNewUser({ name: user.name, email: user.email }).catch(() => {});
        sendWelcome({ name: user.name, email: user.email }).catch(() => {});

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

    if (!email || !password) {
        return res.status(400).json({
            error: "Email und Passwort sind erforderlich"
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                error: "User nicht gefunden"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                error: "Falsches Passwort"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "E-Mail ist erforderlich" });

    try {
        const user = await User.findOne({ email });
        // Always respond the same to prevent email enumeration
        if (!user) return res.json({ success: true });

        const rawToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = crypto.createHash("sha256").update(rawToken).digest("hex");
        user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await user.save();

        await sendPasswordReset({ name: user.name, email: user.email, token: rawToken });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post("/reset-password", async (req, res) => {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ error: "Token und Passwort sind erforderlich" });
    if (password.length < 6) return res.status(400).json({ error: "Passwort muss mindestens 6 Zeichen haben" });

    try {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await User.findOne({
            resetToken: hashedToken,
            resetTokenExpiry: { $gt: new Date() },
        });

        if (!user) return res.status(400).json({ error: "Link ungültig oder abgelaufen" });

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
            return res.status(401).json({ error: "Kein Token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        res.json(user);

    } catch (err) {
        res.status(401).json({ error: "Ungültiger Token" });
    }
});


export default router;