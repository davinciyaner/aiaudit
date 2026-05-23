import { Router } from "express";
import { auth } from "../middleware/auth.js";
import Report from "../models/report_model.js";

const router = Router();

router.get("/", auth, async (req, res) => {
    const reports = await Report.find({
        userId: req.userId
    }).sort({ createdAt: -1 });

    res.json(reports);
});

router.get("/:id", auth, async (req, res) => {
    const report = await Report.findOne({
        _id: req.params.id,
        userId: req.userId
    });

    if (!report) {
        return res.status(404).json({ error: "Nicht gefunden" });
    }

    res.json(report);
});

export default router;