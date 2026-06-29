import { Schema, model } from 'mongoose'

const geoUsageSchema = new Schema({
    userId:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
    feature: { type: String, required: true },
    month:   { type: String, required: true },
    count:   { type: Number, default: 0 },
})

geoUsageSchema.index({ userId: 1, feature: 1, month: 1 }, { unique: true })

export default model('GeoUsage', geoUsageSchema)