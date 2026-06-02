import mongoose from 'mongoose'

const landingFeedbackSchema = new mongoose.Schema({
    rating:         { type: Number, min: 1, max: 5 },
    auditBarrier:   { type: String, default: null },   // Warum kein Audit gestartet
    missingFeature: { type: String, default: null },   // Was fehlt auf der Seite
    userAgent:      { type: String, default: null },
    source:         { type: String, default: 'landing' },
}, { timestamps: true })

export default mongoose.model('LandingFeedback', landingFeedbackSchema)