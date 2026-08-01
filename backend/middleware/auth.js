import jwt from "jsonwebtoken";
import { t } from "../utils/i18n/errors.js";


export function auth(req, res, next) {
    const header = req.headers.authorization
    if (!header) return res.status(401).json({error: t("NO_TOKEN", req.language)})

    const token = header.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // evtl userId setzen
        req.userId = decoded.id
        next()
    } catch (err) {
        res.status(401).json({error: t("INVALID_TOKEN", req.language)})
    }
}