function sanitizeValue(value) {
    if (Array.isArray(value)) {
        return value.map(sanitizeValue)
    }
    if (value && typeof value === 'object') {
        const clean = {}
        for (const [key, val] of Object.entries(value)) {
            if (key.startsWith('$') || key.includes('.')) continue
            clean[key] = sanitizeValue(val)
        }
        return clean
    }
    return value
}

export function sanitizeBody(req, res, next) {
    if (req.body && typeof req.body === 'object') {
        req.body = sanitizeValue(req.body)
    }
    next()
}
