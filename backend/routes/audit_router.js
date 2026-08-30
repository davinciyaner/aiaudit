import { Router } from "express";
import Report from "../models/report_model.js";
import Subscription from "../models/subscription.js";
import FreeDomainAudit from "../models/free_domain_audit.js";
import User from "../models/auth_model.js";
import { runAudit } from "../controllers/runner.js";
import { generateAIReport } from "../controllers/ai-report.js";
import { generateHTMLReport, saveReportAsPDF } from "../controllers/report.js";
import { auditFloorLimiter, anonymousAuditLimiter, authedAuditLimiter } from "../middleware/rateLimiter.js";
import { sendAdminNewAudit } from "../utils/mailer.js";
import { t } from "../utils/i18n/errors.js";
import { optionalAuth } from "../middleware/optionalAuth.js";

const router = Router();

const PLAN_LIMITS = { free: 1, pro: 10, agency: null };

function extractDomain(url) {
    try {
        return new URL(url).hostname.replace(/^www\./i, '').toLowerCase();
    } catch {
        return null;
    }
}

const TRACKING_PARAM_RE = /^(utm_|fbclid|gclid|msclkid|dclid|gbraid|wbraid|mc_eid|mc_cid|_ga)/;

const NON_AUDITABLE_DOMAINS = new Set(['paypal.com', 'stripe.com', 'pay.google.com', 'klarna.com', 'adyen.com']);

const NON_AUDITABLE_PATH_RE = /^\/(login|signin|sign-in|signup|sign-up|register|checkout|cart|account|password|auth|session)(\/|$)/i;

function validateURL(url, lang = "de") {
    let parsed;
    try {
        parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
        throw new Error(t("INVALID_URL", lang));
    }
    if (!["http:", "https:"].includes(parsed.protocol)) {
        throw new Error(t("ONLY_HTTP_HTTPS", lang));
    }
    const host = parsed.hostname.toLowerCase();
    const blocked = [
        /^localhost$/i,
        /^127\./,
        /^10\./,
        /^192\.168\./,
        /^172\.(1[6-9]|2\d|3[01])\./,
        /^::1$/,
        /^0\.0\.0\.0$/,
        /^169\.254\./,
        /^fd[0-9a-f]{2}:/i,
        /^fe80:/i,
        /^::ffff:/i,
    ];
    const metadataHosts = new Set([
        'metadata.google.internal',
        'metadata.goog',
        'instance-data',
        'instance-data.ec2.internal',
    ]);
    if (blocked.some(r => r.test(host)) || metadataHosts.has(host)) {
        throw new Error(t("PRIVATE_URL_NOT_ALLOWED", lang));
    }

    const domain = host.replace(/^www\./, '');
    if (NON_AUDITABLE_DOMAINS.has(domain) || [...NON_AUDITABLE_DOMAINS].some(d => domain.endsWith(`.${d}`))) {
        const err = new Error(t("PAYMENT_DOMAIN_NOT_AUDITABLE", lang));
        err.status = 400;
        throw err;
    }

    const hasPath = parsed.pathname !== '' && parsed.pathname !== '/';
    const hasQuery = parsed.search !== '';
    const hasFragment = parsed.hash !== '';
    if (hasPath || hasQuery || hasFragment) {
        const err = new Error(t("DOMAIN_ONLY", lang));
        err.status = 400;
        throw err;
    }

    if (NON_AUDITABLE_PATH_RE.test(parsed.pathname)) {
        const err = new Error(t("LOGIN_CHECKOUT_NOT_AUDITABLE", lang));
        err.status = 400;
        throw err;
    }

    return parsed.href;
}

async function checkPlanLimit(userId, lang = "de") {
    if (!userId) return; // Anonyme Nutzer werden per Rate-Limiter kontrolliert

    const sub = await Subscription.findOne({ userId, status: "ACTIVE" });
    const plan = sub?.plan || "free";
    const limit = PLAN_LIMITS[plan];
    if (limit === null) return; // Agency: unbegrenzt

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const count = await Report.countDocuments({ userId, createdAt: { $gte: startOfMonth } });
    if (count >= limit) {
        const message = lang === "en"
            ? `Audit limit reached (${limit}/${limit} this month). Please upgrade.`
            : `Audit-Limit erreicht (${limit}/${limit} in diesem Monat). Bitte upgraden.`;
        const err = new Error(message);
        err.status = 429;
        throw err;
    }
}

router.post("/", auditFloorLimiter, optionalAuth, anonymousAuditLimiter, authedAuditLimiter, handleAudit);

const GLOBAL_DAILY_CAP = parseInt(process.env.GLOBAL_DAILY_AUDIT_CAP || '100', 10);

async function handleAudit(req, res, next) {
    const { url } = req.body;
    const language = req.body.language === 'en' ? 'en' : req.language;

    if (!url) return res.status(400).json({ error: t("URL_MISSING", language) });

    try {
        const cleanUrl = validateURL(url, language);

        const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const todayCount = await Report.countDocuments({ createdAt: { $gte: since } });
        if (todayCount >= GLOBAL_DAILY_CAP) {
            return res.status(503).json({ error: t("DAILY_LIMIT_REACHED", language) });
        }
        await checkPlanLimit(req.userId, language);

        if (!req.userId) {
            const domain = extractDomain(cleanUrl);
            if (domain) {
                const existing = await FreeDomainAudit.findOne({ domain });
                if (existing) {
                    return res.status(403).json({
                        error: t("DOMAIN_ALREADY_AUDITED", language),
                        domainLimitReached: true,
                    });
                }
            }
        }

        let plan = 'free';
        if (req.userId) {
            const sub = await Subscription.findOne({ userId: req.userId, status: 'ACTIVE' });
            plan = sub?.plan || 'free';
        }
        const isPro = ['pro', 'agency'].includes(plan);

        const auditData = await runAudit(cleanUrl);

        let aiReport = null;
        let pdfFile = null;

        if (isPro) {
            aiReport = await generateAIReport(auditData, plan, language);
            const html = generateHTMLReport(auditData, aiReport, language);
            pdfFile = await saveReportAsPDF(html, cleanUrl);
        }

        const report = await Report.create({
            userId: req.userId || null,
            url: cleanUrl,
            auditData,
            aiReport: aiReport || '',
            pdfPath: pdfFile || '',
        });

        if (!req.userId) {
            const domain = extractDomain(cleanUrl);
            if (domain) {
                await FreeDomainAudit.findOneAndUpdate(
                    { domain },
                    { domain },
                    { upsert: true, setDefaultsOnInsert: true }
                ).catch(() => {});
            }
        }

        const userEmail = req.userId
            ? (await User.findById(req.userId).select('email').lean())?.email
            : null;
        sendAdminNewAudit({ url: cleanUrl, plan, userEmail }).catch(() => {});

        res.json({ success: true, auditData, aiReport, reportFile: pdfFile, report });
    } catch (err) {
        next(err);
    }
}

export default router;
