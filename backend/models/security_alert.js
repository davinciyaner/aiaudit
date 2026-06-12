import mongoose from 'mongoose'
const { Schema } = mongoose

const securityAlertSchema = new Schema({
    siteId:           { type: Schema.Types.ObjectId, ref: 'MonitoredSite', required: true },
    userId:           { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type:             { type: String, enum: ['downtime', 'ssl_expiry', 'security_regression', 'open_ports'], required: true },
    severity:         { type: String, enum: ['critical', 'high', 'medium', 'low'], required: true },
    message:          { type: String, required: true },
    detectedAt:       { type: Date, required: true },
    resolvedAt:       { type: Date, default: null },
    notificationSent: { type: Boolean, default: false },
}, { timestamps: false })

securityAlertSchema.index({ userId: 1, resolvedAt: 1 })
securityAlertSchema.index({ siteId: 1, detectedAt: -1 })

export default mongoose.model('SecurityAlert', securityAlertSchema)