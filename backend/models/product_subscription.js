import mongoose from 'mongoose'
const { Schema } = mongoose

const productSubscriptionSchema = new Schema({
    userId:               { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product:              { type: String, enum: ['security', 'seo', 'geo', 'aeo'], required: true },
    plan:                 { type: String, enum: ['einsteiger', 'pro', 'expert'], required: true },
    paypalSubscriptionId: { type: String, required: true, unique: true },
    status:               { type: String, default: 'ACTIVE' },
}, { timestamps: true })

// Ein Abo pro Produkt pro User
productSubscriptionSchema.index({ userId: 1, product: 1 }, { unique: true })

export default mongoose.model('ProductSubscription', productSubscriptionSchema)