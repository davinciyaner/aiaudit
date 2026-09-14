import { Schema, model } from 'mongoose'

// Ein Lead = eine Konversion auf der Website EINES SCANORA-KUNDEN (Kontaktformular, Anmeldung o.ae.),
// gemeldet ueber das Tracking-Snippet auf dessen eigener Domain — nicht auf scanora.ai selbst.
// siteId verknuepft den Lead mit der GeoTrackedSite des Kunden. Zugriff auf die Auswertung laeuft
// ausschliesslich ueber GeoTrackedSite.userId (siehe getSiteLeads in controllers/leads.js), niemals
// ueber ein Feld auf diesem Dokument direkt — so sieht jeder Nutzer nur Leads seiner eigenen Sites.
const leadSchema = new Schema({
    siteId:      { type: Schema.Types.ObjectId, ref: 'GeoTrackedSite', required: true, index: true },
    email:       { type: String, required: true },
    aiSource:    { type: String, enum: ['chatgpt', 'perplexity', 'claude', 'gemini', null], default: null },
    referrerRaw: { type: String, default: null },
    landingPage: { type: String, default: null },
}, { timestamps: true })

leadSchema.index({ siteId: 1, createdAt: -1 })

export default model('Lead', leadSchema)
