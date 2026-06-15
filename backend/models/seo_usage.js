import mongoose from 'mongoose'
const { Schema } = mongoose

const seoUsageSchema = new Schema({
    userId:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
    feature: { type: String, required: true },
    month:   { type: String, required: true }, // 'YYYY-MM'
    count:   { type: Number, default: 0 },
}, { timestamps: false })

seoUsageSchema.index({ userId: 1, feature: 1, month: 1 }, { unique: true })

export default mongoose.model('SeoUsage', seoUsageSchema)