import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    marketingConsent: { type: Boolean, default: false },
    seoEmailAlerts: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model("User", userSchema)