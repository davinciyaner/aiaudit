import mongoose from 'mongoose'
const { Schema } = mongoose

const seoTrackedSiteSchema = new Schema({
    userId:      { type: Schema.Types.ObjectId, ref: 'User', required: true },
    domain:      { type: String, required: true },
    displayName: { type: String },
    location:    { type: String, default: 'Germany' },
    language:    { type: String, default: 'de' },
    keywords:    [{ type: String }],
    isActive:    { type: Boolean, default: true },
    lastChecked: { type: Date },
    competitorsCache: {
        data:      [{ type: Schema.Types.Mixed }],
        checkedAt: Date,
    },
    contentGapCache: {
        competitorDomain: String,
        data:             [{ type: Schema.Types.Mixed }],
        checkedAt:        Date,
    },
    backlinksCache: {
        data:      Schema.Types.Mixed,
        checkedAt: Date,
    },
    sitemapKnownUrls:    [{ type: String }],
    sitemapLastChecked:  { type: Date },
}, { timestamps: true })

seoTrackedSiteSchema.index({ userId: 1, domain: 1 }, { unique: true })

export default mongoose.model('SeoTrackedSite', seoTrackedSiteSchema)