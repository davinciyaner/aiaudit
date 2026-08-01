import { Router } from "express";
import { auth } from "../middleware/auth.js";
import Report from "../models/report_model.js";
import { t } from "../utils/i18n/errors.js";

const router = Router();

router.get("/", auth, async (req, res) => {
    try {
        const reports = await Report.find({
            userId: req.userId
        }).sort({ createdAt: -1 });
        res.json(reports);
    } catch (err) {
        res.status(500).json({ error: t("ERROR_LOADING_REPORTS", req.language) });
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const report = await Report.findOne({
            _id: req.params.id,
            userId: req.userId
        });
        if (!report) {
            return res.status(404).json({ error: t("NOT_FOUND", req.language) });
        }
        res.json(report);
    } catch (err) {
        res.status(400).json({ error: t("INVALID_REPORT_ID", req.language) });
    }
});

export default router;