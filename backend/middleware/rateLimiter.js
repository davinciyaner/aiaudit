import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Zu viele Versuche. Bitte in 15 Minuten erneut versuchen." },
});

export const anonymousAuditLimiter = rateLimit({
    windowMs: 24 * 24 * 60 * 60 * 1000, // 24 Tage (max 32-bit int)
    max: 1,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Kostenloses Kontingent aufgebraucht. Bitte registrieren um mehr Audits zu erhalten." },
});
