import { Schema, model } from 'mongoose';

const freeDomainAuditSchema = new Schema({
    domain: { type: String, required: true, unique: true, lowercase: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

export default model('FreeDomainAudit', freeDomainAuditSchema);
