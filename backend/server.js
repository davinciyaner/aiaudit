import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./config/db.js";
import { authLimiter } from "./middleware/rateLimiter.js";
import { language } from "./middleware/language.js";
import { sanitizeBody } from "./middleware/sanitizeBody.js";
import auditRouter from "./routes/audit_router.js";
import reportRouter from "./routes/report_router.js";
import authRouter from "./routes/auth_router.js";
import subscriptionRouter from "./routes/subscription.js";
import userRouter from "./routes/user_router.js";
import testsRouter from "./routes/tests_router.js";
import supportRouter from "./routes/support_router.js"
import feedbackRouter from "./routes/feedback_router.js";
import landingFeedbackRouter from "./routes/landing_feedback_router.js";
import seoTrackingRouter from "./routes/seo_tracking_router.js";
import geoRouter from "./routes/geo_router.js";
import geoOneoffRouter from "./routes/geo_oneoff_router.js";
import leadsRouter from "./routes/leads_router.js";
import sampleReportRouter from "./routes/sample_report_router.js";
import marketingRouter from "./routes/marketing_router.js";
import { startSeoTrackingJob, runWeeklySeoChecks } from "./jobs/seoTrackingJob.js";
import { startGeoTrackingJob } from "./jobs/geoTrackingJob.js";
import { startLeadsRetentionJob } from "./jobs/leadsRetentionJob.js";
import { startSampleReportNurtureJob } from "./jobs/sampleReportNurtureJob.js";
import { startFreeUserNurtureJob } from "./jobs/freeUserNurtureJob.js";

const app = express();

// Muss VOR der globalen CORS-Restriktion unten stehen: das Leads-Tracking-Snippet läuft auf der
// Website eines Scanora-Kunden (fremde Domain), nicht auf scanora.ai — die globale Origin-Prüfung
// würde jeden Request von dort sonst schon vor dem eigenen (permissiven) CORS in leads_router.js abweisen.
app.use("/api/leads", leadsRouter);

// CORS — nur eigene Domain erlauben
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:3000";
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (origin === allowedOrigin) return callback(null, true);
        if (origin.startsWith("chrome-extension://")) return callback(null, true);
        callback(new Error("CORS: Origin nicht erlaubt"));
    },
    credentials: true,
}));

app.set("trust proxy", 1);
app.use(express.json({ limit: "1mb" }));
app.use(sanitizeBody);
app.use(language);

connectDB();

app.use("/api/auth", authLimiter, authRouter);
app.use("/api/audit", auditRouter);
app.use("/api/reports", reportRouter);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/users", userRouter);
app.use("/api/tests", testsRouter);
app.use("/api/support", supportRouter)
app.use("/api/feedback", feedbackRouter);
app.use("/api/landing-feedback", landingFeedbackRouter);
app.use("/api/seo", seoTrackingRouter);
app.use("/api/geo", geoRouter);
app.use("/api/geo-check", geoOneoffRouter);
app.use("/api/sample-report", sampleReportRouter);
app.use("/api/marketing", marketingRouter);
app.use("/reports", express.static("reports"));

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

if (process.env.NODE_ENV !== "production") {
    app.post("/dev/run-seo-check", async (req, res) => {
        console.log("[dev] SEO Check manuell gestartet")
        runWeeklySeoChecks().catch(err => console.error("[dev] SEO Check Fehler:", err.message))
        res.json({ message: "SEO Check gestartet — siehe Logs" })
    })
}

// Globaler Fehler-Handler — keine Stack Traces in Produktion
app.use((err, req, res, _next) => {
    console.error(err.stack || err.message);
    const status = (err && typeof err.status === "number") ? err.status : 500;
    const message = process.env.NODE_ENV === "production" && status === 500
        ? "Interner Serverfehler"
        : err.message;
    res.status(status).json({ error: message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
    startSeoTrackingJob()
    startGeoTrackingJob()
    startLeadsRetentionJob()
    startSampleReportNurtureJob()
    startFreeUserNurtureJob()
});
