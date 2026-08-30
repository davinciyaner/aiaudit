import { Schema, model } from 'mongoose';

const geoOneoffCheckSchema = new Schema({
    identifier: { type: String, required: true, unique: true }, // `user:<userId>` | `ip:<ip>`
    domain: { type: String, required: true },
    keyword: { type: String, required: true },
    platform: { type: String, required: true, enum: ['claude', 'chatgpt', 'perplexity', 'google_aio'] },
    language: { type: String, default: 'de' },
    prompt: { type: String, required: true }, // die exakte Frage, die an die KI-Plattform gesendet wurde
    status: { type: String, enum: ['querying', 'sentiment', 'done'], default: 'querying' },
    result: {
        mentioned: { type: Boolean, default: null },
        context: { type: String, default: null },
        sentiment: { type: String, enum: ['positive', 'neutral', 'negative'], default: null },
        citations: [{
            _id: false,
            url: String,
            domain: String,
            title: String,
            snippet: String,
        }],
    },
}, { timestamps: true });

export default model('GeoOneoffCheck', geoOneoffCheckSchema);
