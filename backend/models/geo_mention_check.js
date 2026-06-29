import { Schema, model } from 'mongoose'

const geoMentionCheckSchema = new Schema({
    siteId:    { type: Schema.Types.ObjectId, ref: 'GeoTrackedSite', required: true },
    userId:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
    keyword:   { type: String, required: true },
    platform:  { type: String, default: 'claude' },
    mentioned: { type: Boolean, required: true },
    context:   { type: String, default: null },
    checkedAt: { type: Date, default: Date.now },
})

geoMentionCheckSchema.index({ siteId: 1, keyword: 1, platform: 1, checkedAt: -1 })

export default model('GeoMentionCheck', geoMentionCheckSchema)