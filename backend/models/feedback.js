import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema({
    url: String,
    reportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Report', required: false },
    userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User',   required: false },
    vote:     { type: String, enum: ['yes', 'no'], required: true },
    reason:   { type: String },
}, { timestamps: true })

export default mongoose.model('Feedback', feedbackSchema)