import cron from 'node-cron'
import Lead from '../models/lead.js'

export const LEADS_RETENTION_MONTHS = 12

export async function deleteExpiredLeads() {
    const cutoff = new Date()
    cutoff.setMonth(cutoff.getMonth() - LEADS_RETENTION_MONTHS)
    const result = await Lead.deleteMany({ createdAt: { $lt: cutoff } })
    if (result.deletedCount > 0) {
        console.log(`[leads] Retention: ${result.deletedCount} Lead(s) älter als ${LEADS_RETENTION_MONTHS} Monate gelöscht`)
    }
    return result.deletedCount
}

export function startLeadsRetentionJob() {
    cron.schedule('0 6 * * 1', () => {
        deleteExpiredLeads().catch(err => console.error('[leads] Retention-Job fehlgeschlagen:', err.message))
    })
}
