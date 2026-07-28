import { Schema, model } from 'mongoose'

const geoTrackedSiteSchema = new Schema({
    userId:      { type: Schema.Types.ObjectId, ref: 'User', required: true },
    domain:      { type: String, required: true },
    displayName: { type: String },
    keywords:    [{ type: String }],
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