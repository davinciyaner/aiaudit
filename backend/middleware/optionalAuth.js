import jwt from 'jsonwebtoken'

export function optionalAuth(req, res, next) {
    const header = req.headers.authorization
    if (!header) return next()
    try {
        const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET)
        req.userId = decoded.id
    } catch { /* ignore invalid token */ }
    next()
}
