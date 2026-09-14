import { Schema, model } from 'mongoose'
import crypto from 'crypto'

const geoTrackedSiteSchema = new Schema({
    userId:      { type: Schema.Types.ObjectId, ref: 'User', required: true },
    domain:      { type: String, required: true },
    // Oeffentlicher "Write-Key" fuers Leads-Tracking-Snippet auf der Kundenwebsite (siehe
    // controllers/leads.js) — bewusst kein Secret, steht zwangslaeufig im Client-JS der fremden
    // Domain. Identifiziert nur, ZU WELCHER Site ein Lead gehoert; Lesezugriff läuft ausschliesslich
    // ueber userId (JWT), nie ueber diesen Key.
    siteKey:     { type: String, unique: true, default: () => crypto.randomBytes(16).toString('hex') },
    // Wann das Leads-Snippet zuletzt ein Lebenszeichen (init()-Aufruf) geschickt hat — beantwortet
    // "hat der Kunde das Snippet ueberhaupt eingebunden", unabhaengig davon, ob bereits ein echter
    // Lead reinkam. Siehe controllers/leads.js verifySnippet.
    leadsSnippetLastSeenAt: { type: Date, default: null },
    displayName: { type: String },
    keywords:    [{ type: String }],
    // Eigene, frei formulierte Prompts (statt Keyword+Template) — laufen zusätzlich zu keywords
    // mit, zaehlen aber gemeinsam gegen dasselbe maxKeywords-Kontingent (siehe countTotalKeywords).
    customPrompts: [{
        _id:     false,
        prompt:  { type: String, required: true },
        addedAt: { type: Date, default: Date.now },
    }],
    language:    { type: String, default: 'de' },
    platforms:   { type: [String], default: ['claude'] },
    promptVariants: { type: Number, default: 1 },
    isActive:    { type: Boolean, default: true },
    lastChecked: { type: Date },
    checkStatus:    { type: String, enum: ['idle', 'running', 'failed'], default: 'idle' },
    checkStartedAt: { type: Date },
}, { timestamps: true })

geoTrackedSiteSchema.index({ userId: 1, domain: 1 }, { unique: true })

export default model('GeoTrackedSite', geoTrackedSiteSchema)