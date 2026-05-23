import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    plan: { type: String, enum: ['pro', 'agency'], required: true },
    paypalSubscriptionId: { type: String, required: true, unique: true },
    status: { type: String, default: 'ACTIVE' },
}, { timestamps: true })

export default mongoose.model('Subscription', subscriptionSchema)