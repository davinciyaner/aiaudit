import UserModel from "../models/auth_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
    const { name, email, password } = req.body

    const existing = await UserModel.findOne({ email })
    if (existing) {
        return res.status(400).json({ error: "Email already exists" })
    }
    const hash = await bcrypt.hash(password, 10)
    const user = await UserModel.create({ name, email, password: hash })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
    res.json({ token, user: { name: user.name, email: user.email } })
}

export async function login(req, res) {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })
    if (!user) {
        return res.status(400).json({ error: "User nicht gefunden" })
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
        return res.status(400).json({ error: "Falsches Passwort" })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
    res.json({ token, user: { name: user.name, email: user.email } })
}