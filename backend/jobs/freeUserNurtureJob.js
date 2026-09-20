import cron from 'node-cron'
import User from '../models/auth_model.js'
import Report from '../models/report_model.js'
import Subscription from '../models/subscription.js'
import ProductSubscription from '../models/product_subscription.js'
import { sendFreeNurtureStep1, sendFreeNurtureStep2, sendFreeNurtureStep3 } from '../utils/mailer.js'
import { marketingUnsubscribeUrl } from '../routes/marketing_router.js'

// Tage seit Registrierung (Step 1) bzw. seit dem letzten Schritt (Step 2, 3), ab denen der
// jeweils naechste Nurture-Schritt verschickt werden darf.
const STEP_DELAY_DAYS = { 1: 2, 2: 3, 3: 5 } // Step 2 kommt 3 Tage nach Step 1 (Tag 5 gesamt), Step 3 5 Tage nach Step 2 (Tag 10 gesamt)

function daysAgo(days) {
    const d = new Date()
    d.setDate(d.getDate() - days)
    return d
}

// Top-Finding fuer die Personalisierung in Step 1 — bewusst defensiv gegen fehlende/abweichende
// auditData-Struktur (siehe controllers/ai-report.js fuer das erwartete Format), damit ein
// unvollstaendiger Report den Versand nicht crasht.
function extractTopFinding(auditData) {
    if (!auditData) return null
    const issue = auditData?.seo?.issues?.[0]
    if (typeof issue === 'string' && issue.trim()) return issue.trim()
    return null
}

async function hasActiveSubscription(userId) {
    const [sub, productSub] = await Promise.all([
        Subscription.exists({ userId, status: 'ACTIVE' }),
        ProductSubscription.exists({ userId, status: 'ACTIVE' }),
    ])
    return !!(sub || productSub)
}

export async function runFreeUserNurture() {
    // Nur Nutzer mit dokumentierter Einwilligung (siehe auth_router.js /register) — das ist die
    // gesamte Rechtsgrundlage fuer diesen Job, bewusst kein Fallback/keine Ausnahme.
    const candidates = await User.find({
        marketingConsent: true,
        freeNurtureStep: { $lt: 3 },
    }, '_id name email language freeNurtureStep freeNurtureLastSentAt createdAt')

    let sent = 0
    for (const user of candidates) {
        try {
            if (await hasActiveSubscription(user._id)) continue // schon konvertiert, kein Pitch mehr noetig

            const nextStep = (user.freeNurtureStep || 0) + 1
            const delayDays = STEP_DELAY_DAYS[nextStep]
            const since = nextStep === 1 ? user.createdAt : user.freeNurtureLastSentAt
            if (!since || since > daysAgo(delayDays)) continue // noch zu frueh fuer diesen Schritt

            if (nextStep === 1) {
                const report = await Report.findOne({ userId: user._id }).sort({ createdAt: -1 })
                if (!report) continue // noch kein Audit durchgefuehrt, Step 1 macht ohne Report-Bezug keinen Sinn
                await sendFreeNurtureStep1({
                    email: user.email,
                    name: user.name,
                    language: user.language,
                    topFinding: extractTopFinding(report.auditData),
                    unsubscribeUrl: marketingUnsubscribeUrl(user._id, user.language),
                })
            } else if (nextStep === 2) {
                await sendFreeNurtureStep2({
                    email: user.email,
                    name: user.name,
                    language: user.language,
                    unsubscribeUrl: marketingUnsubscribeUrl(user._id, user.language),
                })
            } else if (nextStep === 3) {
                await sendFreeNurtureStep3({
                    email: user.email,
                    name: user.name,
                    language: user.language,
                    unsubscribeUrl: marketingUnsubscribeUrl(user._id, user.language),
                })
            }

            await User.updateOne({ _id: user._id }, { $set: { freeNurtureStep: nextStep, freeNurtureLastSentAt: new Date() } })
            sent++
        } catch (err) {
            console.error('[free-user-nurture] Versand fehlgeschlagen fuer', user.email, ':', err.message)
        }
    }

    if (sent > 0) {
        console.log(`[free-user-nurture] ${sent} Nurture-Mail(s) versendet`)
    }
    return sent
}

export function startFreeUserNurtureJob() {
    cron.schedule('30 9 * * *', () => {
        runFreeUserNurture().catch(err => console.error('[free-user-nurture] Job fehlgeschlagen:', err.message))
    })
}
