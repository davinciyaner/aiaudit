import { Schema, model } from 'mongoose'

// Warteliste fuer noch nicht gebaute Produkte (aktuell: SEO-Agent). Dient zur Validierung, ob
// Interesse besteht — die Launch-Mail ist spaeter Werbung, deshalb Double-Opt-In wie bei
// sample_report_lead.js: Mails ueber die Bestaetigung hinaus NUR an confirmed:true UND
// unsubscribed:false.
const waitlistSignupSchema = new Schema({
    product: { type: String, enum: ['seo-agent'], required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    language: { type: String, enum: ['de', 'en'], default: 'de' },
    website: { type: String, default: null, trim: true, maxlength: 200 },
    // Welche geplanten Funktionen den Nutzer interessieren — das eigentliche Validierungssignal.
    interests: { type: [String], default: [] },
    confirmToken: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
    confirmedAt: { type: Date, default: null },
    unsubscribed: { type: Boolean, default: false },
    unsubscribedAt: { type: Date, default: null },
    // Nachweis der Einwilligung (Beweislast beim Versender): IP + Zeitstempel beider Schritte.
    signupIp: { type: String, default: null },
    confirmIp: { type: String, default: null },
}, { timestamps: true })

waitlistSignupSchema.index({ product: 1, email: 1 }, { unique: true })
waitlistSignupSchema.index({ confirmToken: 1 })

export default model('WaitlistSignup', waitlistSignupSchema)
