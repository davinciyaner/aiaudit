import { Router } from "express";
import jwt from "jsonwebtoken";
import Report from "../models/report_model.js";
import Subscription from "../models/subscription.js";
import FreeDomainAudit from "../models/free_domain_audit.js";
import { runAudit } from "../controllers/runner.js";
import { generateAIReport } from "../controllers/ai-report.js";
import { generateHTMLReport, saveReportAsPDF } from "../controllers/report.js";
import { anonymousAuditLimiter } from "../middleware/rateLimiter.js";

const router = Router();

const PLAN_LIMITS = { free: 1, pro: 10, agency: null };

function extractDomain(url) {
    try {
        return new URL(url).hostname.replace(/^www\./i, '').toLowerCase();
    } catch {
        return null;
    }
}

// Extrahiert userId aus Token wenn vorhanden — lehnt aber nicht ab wenn kein Token da ist
function optionalAuth(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return next();
    try {
        const decoded = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
        req.userId = decoded.id;
    } catch {
        // Ungültiger Token — trotzdem weitermachen als anonymer Nutzer
    }
    next();
}

// Blockiert private/lokale URLs (SSRF-Schutz)
function validateURL(url) {
    let parsed;
    try {
        parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
        throw new Error("Ungültige URL");
    }
    if (!["http:", "https:"].includes(parsed.protocol)) {
        throw new Error("Nur HTTP und HTTPS erlaubt");
    }
    const host = parsed.hostname.toLowerCase();
    const blocked = [
        /^localhost$/,
        /^127\./,
        /^10\./,
        /^192\.168\./,
        /^172\.(1[6-9]|2\d|3[01])\./,
        /^::1$/,
        /^0\.0\.0\.0$/,
        /^169\.254\./,  // link-local
    ];
    if (blocked.some(r => r.test(host))) {
        throw new Error("Private oder lokale URLs sind nicht erlaubt");
    }
    return parsed.href;
}

// Prüft ob eingeloggter Nutzer sein monatliches Audit-Limit erreicht hat
async function checkPlanLimit(userId) {
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
        const err = new Error(`Audit-Limit erreicht (${limit}/${limit} in diesem Monat). Bitte upgraden.`);
        err.status = 429;
        throw err;
    }
}

router.post("/", optionalAuth, async (req, res, next) => {
    // Anonyme Nutzer → Rate-Limiter anwenden
    if (!req.userId) {
        return anonymousAuditLimiter(req, res, async () => {
            await handleAudit(req, res, next);
        });
    }
    await handleAudit(req, res, next);
});

const GLOBAL_DAILY_CAP = parseInt(process.env.GLOBAL_DAILY_AUDIT_CAP || '100', 10);

async function handleAudit(req, res, next) {
    const { url } = req.body;

    if (!url) return res.status(400).json({ error: "URL fehlt" });

    try {
        const cleanUrl = validateURL(url);

        // Globale Notbremse: verhindert Kostenschäden bei Abuse
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const todayCount = await Report.countDocuments({ createdAt: { $gte: since } });
        if (todayCount >= GLOBAL_DAILY_CAP) {
            return res.status(503).json({ error: "Tageslimit erreicht. Bitte später erneut versuchen." });
        }
        await checkPlanLimit(req.userId);

        // Anonymous users: block if domain was already audited for free
        if (!req.userId) {
            const domain = extractDomain(cleanUrl);
            if (domain) {
                const existing = await FreeDomainAudit.findOne({ domain });
                if (existing) {
                    return res.status(403).json({
                        error: "Diese Domain wurde bereits kostenlos auditiert.",
                        domainLimitReached: true,
                    });
                }
            }
        }

        const auditData = await runAudit(cleanUrl);
        const aiReport = await generateAIReport(auditData);
        const html = generateHTMLReport(auditData, aiReport);
        const pdfFile = await saveReportAsPDF(html, cleanUrl);

        const report = await Report.create({
            userId: req.userId || null,
            url: cleanUrl,
            auditData,
            aiReport,
            pdfPath: pdfFile,
        });

        // Track domain so anonymous users can't re-audit for free
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

        res.json({ success: true, auditData, aiReport, reportFile: pdfFile, report });
    } catch (err) {
        next(err);
    }
}

export default router;
