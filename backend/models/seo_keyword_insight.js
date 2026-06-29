import { Schema, model } from 'mongoose'

const seoKeywordInsightSchema = new Schema({
    siteId:       { type: Schema.Types.ObjectId, ref: 'SeoTrackedSite', required: true },
    userId:       { type: Schema.Types.ObjectId, ref: 'User',           required: true },
    keyword:      { type: String, required: true },
    content:      { type: Schema.Types.Mixed, default: null },
    backlinks:    { type: Schema.Types.Mixed, default: null },
    status:       { type: String, enum: ['pending', 'done', 'error'], default: 'pending' },
    generatedAt:  { type: Date, default: null },
}, { timestamps: true })

seoKeywordInsightSchema.index({ siteId: 1, keyword: 1 }, { unique: true })

export default model('SeoKeywordInsight', seoKeywordInsightSchema)