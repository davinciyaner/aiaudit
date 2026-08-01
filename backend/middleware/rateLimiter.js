import rateLimit from "express-rate-limit";
import { t } from "../utils/i18n/errors.js";

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: (req) => ({ error: t("AUTH_TOO_MANY_ATTEMPTS", req.language) }),
});

export const anonymousAuditLimiter = rateLimit({
    windowMs: 24 * 24 * 60 * 60 * 1000, // 24 Tage (max 32-bit int)
    max: 1,
    standardHeaders: true,
    legacyHeaders: false,
    message: (req) => ({ error: t("FREE_QUOTA_USED", req.language) }),
});
