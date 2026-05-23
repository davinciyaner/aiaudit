import jwt from "jsonwebtoken";


export function auth(req, res, next) {
    const header = req.headers.authorization
    if (!header) return res.status(401).json({error: "Unauthorized"})

    const token = header.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // evtl userId setzen
        req.userId = decoded.id
        next()
    } catch (err) {
        res.status(401).json({error: "Token undefined"})
    }
}