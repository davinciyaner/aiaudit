import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./config/db.js";
import { authLimiter } from "./middleware/rateLimiter.js";
import auditRouter from "./routes/audit_router.js";
import reportRouter from "./routes/report_router.js";
import authRouter from "./routes/auth_router.js";
import subscriptionRouter from "./routes/subscription.js";
import userRouter from "./routes/user_router.js";

const app = express();

// CORS — nur eigene Domain erlauben
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:3000";
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (origin === allowedOrigin) return callback(null, true);
        callback(new Error("CORS: Origin nicht erlaubt"));
    },
    credentials: true,
}));

app.use(express.json({ limit: "1mb" }));

connectDB();

app.use("/api/auth", authLimiter, authRouter);
app.use("/api/audit", auditRouter);
app.use("/api/reports", reportRouter);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/users", userRouter);
app.use("/reports", express.static("reports"));

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

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
});
