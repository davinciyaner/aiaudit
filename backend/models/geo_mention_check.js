import { Schema, model } from 'mongoose'

const geoMentionCheckSchema = new Schema({
    siteId:    { type: Schema.Types.ObjectId, ref: 'GeoTrackedSite', required: true },
    userId:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
    keyword:      { type: String, required: true },
    platform:     { type: String, default: 'claude' },
    promptIntent: { type: String, default: 'empfehlung' }, // 'empfehlung' | 'vergleich'
    mentioned:    { type: Boolean, required: true },
    context:      { type: String, default: null },
    // Alle in der Antwort genannten Domains (nicht nur die eigene) — Basis für Zitat-Analyse & Share-of-Voice.
    // Bei Perplexity/Google AI Overview aus echten Quellen-Metadaten, bei Claude/ChatGPT per Regex aus dem
    // Fließtext (keine strukturierten Quellen ohne Web-Search-Tool verfügbar).
    citations: [{
        _id:     false,
        url:     { type: String },
        domain:  { type: String },
        title:   { type: String, default: null },
        snippet: { type: String, default: null },
    }],
    // Nur bei mentioned:true berechnet (siehe geoService.classifySentiment)
    sentiment: { type: String, enum: ['positive', 'neutral', 'negative'], default: null },
    checkedAt:    { type: Date, default: Date.now },
})

geoMentionCheckSchema.index({ siteId: 1, keyword: 1, platform: 1, promptIntent: 1, checkedAt: -1 })

export default model('GeoMentionCheck', geoMentionCheckSchema)