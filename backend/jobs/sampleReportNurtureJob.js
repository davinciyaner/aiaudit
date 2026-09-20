import cron from 'node-cron'
import SampleReportLead from '../models/sample_report_lead.js'
import User from '../models/auth_model.js'
import Report from '../models/report_model.js'
import { sendSampleReportNurtureNoAudit, sendSampleReportNurtureHasAudit } from '../utils/mailer.js'

const NURTURE_DELAY_DAYS = 3

// Ob die Lead-Adresse bereits ein Audit durchgefuehrt hat, laesst sich nur ueber ein registriertes
// Nutzerkonto pruefen — anonyme Audits ohne Login sind an keine E-Mail gebunden. Ein Lead ohne
// Konto zaehlt deshalb bewusst als "noch kein Audit", auch wenn er theoretisch anonym eins gemacht
// haben koennte; das ist inhaltlich korrekt, da genau dieser Fall zur Registrierung anregen soll.
async function hasRunAudit(email) {
    const user = await User.findOne({ email }, '_id')
    if (!user) return false
    const report = await Report.exists({ userId: user._id })
    return !!report
}

export async function runSampleReportNurture() {
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - NURTURE_DELAY_DAYS)

    const candidates = await SampleReportLead.find({
        confirmed: true,
        unsubscribed: false,
        nurtureSentAt: null,
        createdAt: { $lte: cutoff },
    }, '_id email language')

    let sent = 0
    for (const candidate of candidates) {
        // Frisch nachpruefen direkt vor dem Versand — falls sich jemand zwischen dem Laden der
        // Liste oben und diesem Punkt abgemeldet hat, ist er hier bereits raus. Das ist die
        // eigentliche Kernregel: eine abgemeldete Adresse bekommt garantiert keine Mail mehr.
        const lead = await SampleReportLead.findOne({ _id: candidate._id, confirmed: true, unsubscribed: false, nurtureSentAt: null })
        if (!lead) continue

        const variant = (await hasRunAudit(lead.email)) ? 'has_audit' : 'no_audit'

        try {
            if (variant === 'has_audit') {
                await sendSampleReportNurtureHasAudit({ email: lead.email, language: lead.language, confirmToken: lead.confirmToken })
            } else {
                await sendSampleReportNurtureNoAudit({ email: lead.email, language: lead.language, confirmToken: lead.confirmToken })
            }
            // Erst NACH erfolgreichem Versand als erledigt markieren — schlaegt der SMTP-Versand
            // fehl (Timeout, Provider down, ...), bleibt nurtureSentAt null und der naechste
            // taegliche Lauf versucht es erneut, statt den Lead stillschweigend fuer immer zu uebergehen.
            await SampleReportLead.updateOne({ _id: lead._id }, { $set: { nurtureSentAt: new Date(), nurtureVariant: variant } })
            sent++
        } catch (err) {
            console.error('[sample-report-nurture] Versand fehlgeschlagen fuer', lead.email, ':', err.message)
        }
    }

    if (sent > 0) {
        console.log(`[sample-report-nurture] ${sent} Nurture-Mail(s) versendet`)
    }
    return sent
}

export function startSampleReportNurtureJob() {
    cron.schedule('0 9 * * *', () => {
        runSampleReportNurture().catch(err => console.error('[sample-report-nurture] Job fehlgeschlagen:', err.message))
    })
}
