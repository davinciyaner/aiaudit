import UserModel from "../models/auth_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { t } from "../utils/i18n/errors.js";

export async function register(req, res) {
    const { name, email, password, marketingConsent } = req.body

    const existing = await UserModel.findOne({ email })
    if (existing) {
        return res.status(400).json({ error: t("USER_EXISTS", req.language) })
    }
    const hash = await bcrypt.hash(password, 10)
    const user = await UserModel.create({ name, email, password: hash, marketingConsent: !!marketingConsent })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
    res.json({ token, user: { name: user.name, email: user.email } })
}

export async function login(req, res) {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })
    if (!user) {
        return res.status(400).json({ error: t("USER_NOT_FOUND", req.language) })
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
        return res.status(400).json({ error: t("WRONG_PASSWORD", req.language) })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
    res.json({ token, user: { name: user.name, email: user.email } })
}