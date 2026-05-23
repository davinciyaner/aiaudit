import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false // später ändern auf true
    },
    url: String,
    auditData: Object,
    aiReport: String,
    pdfPath: String
}, { timestamps: true });

export default mongoose.model("Report", reportSchema);