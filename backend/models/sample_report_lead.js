import { Schema, model } from 'mongoose'

// Der Sofort-Download (E-Mail -> PDF) ist rein transaktional und braucht kein Double-Opt-In.
// Fuer jede spaetere Marketing-Nutzung dieser Adressen (Newsletter, Produkt-Updates) verlangt
// deutsches Recht (SS7 UWG) aber nachweisbare Einwilligung — deshalb confirmed/confirmToken hier.
// Marketing-Mails duerfen NUR an confirmed:true UND unsubscribed:false Adressen gehen.
const sampleReportLeadSchema = new Schema({
    email: { type: String, required: true, lowercase: true, trim: true },
    language: { type: String, enum: ['de', 'en'], default: 'de' },
    confirmToken: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
    confirmedAt: { type: Date, default: null },
    unsubscribed: { type: Boolean, default: false },
    unsubscribedAt: { type: Date, default: null },
    // Nachweis-Logging: bei einer Beschwerde liegt in Deutschland die Beweislast fuer eine
    // wirksam erteilte Einwilligung beim Versender — IP + Zeitstempel fuer beide Schritte
    // (Anmeldung UND Bestaetigungsklick) sind der dafuer uebliche Nachweis.
    signupIp: { type: String, default: null },
    confirmIp: { type: String, default: null },
    // Setzt der Nurture-Job atomar zusammen mit dem confirmed:true/unsubscribed:false-Filter
    // (siehe jobs/sampleReportNurtureJob.js) — verhindert Doppelversand bei ueberlappenden
    // Cron-Laeufen und ist der Beleg, dass diese Adresse bereits genau eine Nurture-Mail bekam.
    nurtureSentAt: { type: Date, default: null },
    nurtureVariant: { type: String, enum: ['no_audit', 'has_audit', null], default: null },
}, { timestamps: { createdAt: true, updatedAt: false } })

sampleReportLeadSchema.index({ email: 1 })
sampleReportLeadSchema.index({ confirmToken: 1 })

export default model('SampleReportLead', sampleReportLeadSchema)
