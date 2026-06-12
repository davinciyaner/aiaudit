import mongoose from 'mongoose'
const { Schema } = mongoose

const seoKeywordRankingSchema = new Schema({
    siteId:    { type: Schema.Types.ObjectId, ref: 'SeoTrackedSite', required: true },
    userId:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
    keyword:   { type: String, required: true },
    position:  { type: Number, default: null }, // null = nicht in Top 100
    url:       { type: String, default: null },
    checkedAt: { type: Date, default: Date.now },
}, { timestamps: false })

seoKeywordRankingSchema.index({ siteId: 1, keyword: 1, checkedAt: -1 })
seoKeywordRankingSchema.index({ siteId: 1, checkedAt: -1 })

export default mongoose.model('SeoKeywordRanking', seoKeywordRankingSchema)