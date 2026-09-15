import mongoose from 'mongoose'

const supportTicketSchema = new mongoose.Schema({
    ticketNumber: { type: String, unique: true, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    status: {
        type: String,
        enum: ['open', 'in_progress', 'closed'],
        default: 'open',
    },
    language: { type: String, enum: ['de', 'en'], default: 'de' },
    messages: [{
        author: { type: String, enum: ['user', 'admin'], required: true },
        body: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    }],
}, { timestamps: true })

export default mongoose.model('SupportTicket', supportTicketSchema)
