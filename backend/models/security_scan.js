import mongoose from 'mongoose'
const { Schema } = mongoose

const securityScanSchema = new Schema({
    siteId:          { type: Schema.Types.ObjectId, ref: 'MonitoredSite', required: true },
    userId:          { type: Schema.Types.ObjectId, ref: 'User', required: true },
    scannedAt:       { type: Date, required: true },
    score:           { type: Number },
    sslValid:        { type: Boolean },
    sslExpiry:       { type: Date },
    sslDaysLeft:     { type: Number },
    securityHeaders: { type: Object },
    httpRedirect:    { type: Boolean },
    checks:          { type: Object },
    issues:          [{ message: String, severity: String, suggestion: String }],
}, { timestamps: false })

securityScanSchema.index({ siteId: 1, scannedAt: -1 })

export default mongoose.model('SecurityScan', securityScanSchema)