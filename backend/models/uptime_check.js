import mongoose from 'mongoose'
const { Schema } = mongoose

const uptimeCheckSchema = new Schema({
    siteId:       { type: Schema.Types.ObjectId, ref: 'MonitoredSite', required: true },
    userId:       { type: Schema.Types.ObjectId, ref: 'User', required: true },
    checkedAt:    { type: Date, required: true },
    status:       { type: String, enum: ['up', 'down', 'degraded'], required: true },
    responseTime: { type: Number },
    httpCode:     { type: Number },
    error:        { type: String },
}, { timestamps: false })

// 90 Tage TTL
uptimeCheckSchema.index({ checkedAt: 1 }, { expireAfterSeconds: 90 * 24 * 3600 })
uptimeCheckSchema.index({ siteId: 1, checkedAt: -1 })

export default mongoose.model('UptimeCheck', uptimeCheckSchema)