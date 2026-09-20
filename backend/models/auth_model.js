import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    marketingConsent: { type: Boolean, default: false },
    marketingConsentUpdatedAt: { type: Date },
    marketingRepermissionSentAt: { type: Date },
    lastLoginAt: { type: Date },
    freeNurtureStep: { type: Number, default: 0 },
    freeNurtureLastSentAt: { type: Date },
    seoEmailAlerts: { type: Boolean, default: true },
    geoEmailAlerts: { type: Boolean, default: true },
    language: { type: String, enum: ['de', 'en'], default: 'de' },
}, { timestamps: true })

export default mongoose.model("User", userSchema)