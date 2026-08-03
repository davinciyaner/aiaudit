import rateLimit from "express-rate-limit";
import { t } from "../utils/i18n/errors.js";

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: (req) => ({ error: t("AUTH_TOO_MANY_ATTEMPTS", req.language) }),
});

// Unconditional (no skip) limiter applied to every request on the audit route, in addition
// to the two conditional ones below — CodeQL's missing-rate-limiting check didn't recognize
// the skip-based limiters alone as reliably rate-limiting the route, so this gives it one
// that unconditionally applies regardless of auth state. Generous ceiling since it's not
// meant to replace the free-quota/per-minute limiters below, just guarantee an always-on floor.
export const auditFloorLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: (req) => ({ error: t("API_RATE_LIMIT", req.language) }),
});

// windowMs must be a fixed number (express-rate-limit's default MemoryStore rejects a
// function there — only `limit` supports one), so the anonymous free-quota check and the
// authenticated per-minute throttle stay two separate middlewares, each `skip`-ing the
// request it doesn't apply to. Both are registered directly in the route's middleware
// array (not invoked programmatically inside the handler) so every request always passes
// through at least one active limiter, structurally visible to static analysis.
export const anonymousAuditLimiter = rateLimit({
    windowMs: 24 * 24 * 60 * 60 * 1000, // 24 Tage (max 32-bit int)
    max: 1,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => !!req.userId,
    message: (req) => ({ error: t("FREE_QUOTA_USED", req.language) }),
});

// Logged-in users are bounded by their monthly plan quota (business logic, not abuse
// protection — Agency is unlimited) — this adds actual per-minute throttling so a
// paid/unlimited plan can't be used to hammer the (expensive: crawling + AI report
// generation) audit endpoint.
export const authedAuditLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => !req.userId,
    keyGenerator: (req) => req.userId,
    message: (req) => ({ error: t("API_RATE_LIMIT", req.language) }),
});
