import mongoose from 'mongoose';

const waitlistSchema = new mongoose.Schema({
    email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
    source:    { type: String, default: 'extension' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Waitlist', waitlistSchema);