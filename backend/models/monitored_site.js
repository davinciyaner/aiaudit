import mongoose from 'mongoose'
const { Schema } = mongoose

const monitoredSiteSchema = new Schema({
    userId:      { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product:     { type: String, enum: ['security', 'seo', 'geo', 'aeo'], required: true },
    domain:      { type: String, required: true },
    displayName: { type: String },
    isActive:    { type: Boolean, default: true },
    lastChecked: { type: Date },
    alertSettings: {
        critical: { type: Boolean, default: true },
        medium:   { type: Boolean, default: false },
        low:      { type: Boolean, default: false },
    },
}, { timestamps: true })

monitoredSiteSchema.index({ userId: 1, product: 1, domain: 1 }, { unique: true })

export default mongoose.model('MonitoredSite', monitoredSiteSchema)
