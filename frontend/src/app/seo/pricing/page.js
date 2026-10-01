'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, LogIn, Loader2, Lock } from 'lucide-react'
import Link from 'next/link'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import { withPlanData } from '@/lib/plans'

const FAQS = [
    {
        q: 'Was kostet SEO Automatisierung?',
        a: 'SEO Automatisierung bei Scanora startet ab 29,99 €/Monat für 3 Websites und 50 Keywords mit wöchentlichem Ranking-Update. Der Pro-Plan (89,99 €/Monat) erweitert auf 10 Websites und 200 Keywords inkl. Content-Gap-Analyse, der Expert-Plan (179,99 €/Monat) deckt bis zu 20 Websites und 500 Keywords ab. Alle Pläne bieten 14 Tage kostenlose Testphase.',
    },
    {
        q: 'Was ist der Unterschied zwischen einem einmaligen SEO-Audit und SEO Automatisierung?',
        a: 'Ein einmaliger SEO-Audit (Teil des kostenlosen Scanora Website-Audits) zeigt deinen SEO-Score zu einem Zeitpunkt. SEO Automatisierung trackt wöchentlich automatisch deine Google-Rankings, Keyword-Ideen, Konkurrenzanalyse und Backlink-Übersicht - als laufenden Verlauf statt Einzelmessung.',
    },
    {
        q: 'Gibt es eine kostenlose Testphase für SEO Automatisierung?',
        a: 'Ja, alle SEO-Automatisierung-Pläne bieten 14 Tage kostenlos testen, danach automatische Verlängerung über PayPal, jederzeit kündbar.',
    },
]

const PLANS = withPlanData('de', 'seo', [
    {
        id: 'einsteiger',
        name: 'Einsteiger',
        price: '29,99',
        period: 'pro Monat',
        desc: 'Für Einzelpersonen und kleine Projekte',
        features: [
            '3 Websites tracken',
            '50 Keywords gesamt',
            'Wöchentliches Ranking-Update',
            '2 manuelle Checks pro Monat',
            'Ranking-Verlauf (8 Wochen)',
            'Keyword-Ideen & Suchvolumen (6 Aufrufe/Monat)',
            'Automatische Keyword-Erkennung aus neuen Seiten & Inhalten (bis zu 10 pro Lauf)',
            'E-Mail Alerts bei großen Einbrüchen',
            'Konkurrenten-Analyse (automatisch, wöchentlich)',
            'Backlink-Übersicht (automatisch, monatlich)',
        ],
        locked: [
            'Content Gap Analyse (ab Pro)',
        ],
        cta: 'Einsteiger starten',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_SEO_EINSTEIGER',
    },
    {
        id: 'pro',
        name: 'Pro',
        price: '89,99',
        period: 'pro Monat',
        desc: 'Für Freelancer und wachsende Unternehmen',
        highlight: true,
        features: [
            '10 Websites tracken',
            '200 Keywords gesamt',
            'Wöchentliches Ranking-Update',
            '4 manuelle Checks pro Monat',
            'Ranking-Verlauf (6 Monate)',
            'Keyword-Ideen & Suchvolumen (20 Aufrufe/Monat)',
            'Automatische Keyword-Erkennung aus neuen Seiten & Inhalten (bis zu 30 pro Lauf)',
            'E-Mail Alerts ab 5 Positionen',
            'Konkurrenten-Analyse (automatisch, wöchentlich)',
            'Backlink-Übersicht (automatisch, monatlich)',
            'Content Gap Analyse - wöchentlich automatisch je Website, insgesamt bis zu 100 Abrufe/Monat',
        ],
        cta: 'Pro starten',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_SEO_PRO',
    },
    {
        id: 'expert',
        name: 'Expert',
        price: '179,99',
        period: 'pro Monat',
        desc: 'Für Agenturen mit vielen Kunden',
        features: [
            '20 Websites tracken',
            '500 Keywords gesamt',
            'Wöchentliches Ranking-Update',
            '6 manuelle Checks pro Monat',
            'Ranking-Verlauf unbegrenzt',
            'Keyword-Ideen & Suchvolumen (40 Aufrufe/Monat)',
            'Automatische Keyword-Erkennung aus neuen Seiten & Inhalten (bis zu 50 pro Lauf)',
            'E-Mail Alerts ab 3 Positionen',
            'Konkurrenten-Analyse (automatisch, wöchentlich)',
            'Backlink-Übersicht (automatisch, monatlich)',
            'Content Gap Analyse - wöchentlich automatisch je Website, insgesamt bis zu 300 Abrufe/Monat',
            'Priorisierter Support',
        ],
        cta: 'Expert starten',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_SEO_EXPERT',
    },
])

const PLAN_IDS = {
    einsteiger: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_SEO_EINSTEIGER,
    pro:        process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_SEO_PRO,
    expert:     process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_SEO_EXPERT,
}

function PlanCard({ plan, user, currentPlan, loading, onSuccess }) {
    const router = useRouter()

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: PLANS.indexOf(plan) * 0.1 }}
            className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-300 ${
                plan.highlight
                    ? 'shadow-card bg-(--card) border-(--accent) '
                    : 'bg-(--card) border-(--line)'
            }`}
        >

            {currentPlan === plan.id && (
                <div className="absolute -top-3 right-6 px-3 py-1 bg-(--accent-soft-strong) border border-(--accent-border) rounded-full text-xs font-semibold text-(--accent-ink)">
                    Aktuell
                </div>
            )}

            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold text-(--text-muted) ">{plan.name}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-5xl font-bold text-(--text-white)">{plan.price}</span>
                    <span className="text-(--text-muted) text-lg">€</span>
                </div>
                <div className="text-sm text-(--text-faint) mb-3">{plan.period}</div>
                <p className="text-sm text-(--text-muted)">{plan.desc}</p>
            </div>

            <div className="space-y-3 mb-8 flex-1">
                {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-(--accent-soft-strong)' : 'bg-(--surface-08)'}`}>
                            <Check className={`w-2.5 h-2.5 ${plan.highlight ? 'text-(--accent-ink)' : 'text-(--text-muted)'}`} strokeWidth={3} />
                        </div>
                        <span className="text-(--text-body)">{f}</span>
                    </div>
                ))}
                {plan.locked?.map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm opacity-40">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-(--surface-08)">
                            <Lock className="w-2.5 h-2.5 text-(--text-faint)" strokeWidth={3} />
                        </div>
                        <span className="text-(--text-faint) line-through">{f}</span>
                    </div>
                ))}
            </div>

            <div>
                {loading ? (
                    <div className="flex items-center justify-center w-full py-3 rounded-xl border border-(--border-subtle)">
                        <Loader2 className="w-4 h-4 text-(--text-faint) animate-spin" />
                    </div>
                ) : currentPlan === plan.id ? (
                    <div className="block w-full py-3 text-center text-sm font-semibold rounded-xl border border-(--accent-border) text-(--accent-ink) bg-(--accent-soft)">
                        Aktives Abo
                    </div>
                ) : !user ? (
                    <Link
                        href="/login?redirect=/seo/pricing"
                        className={`flex items-center justify-center gap-2 w-full py-3 text-center text-sm font-semibold rounded-xl transition-all duration-200 ${
                            plan.highlight
                                ? 'bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) active:scale-[0.97] active:duration-75 '
                                : 'border border-(--border-subtle) text-(--text-body) hover:text-(--text-white) hover:border-(--border-strong) hover:bg-(--surface-06)'
                        }`}
                    >
                        <LogIn className="w-4 h-4" /> Anmelden zum Abonnieren
                    </Link>
                ) : (
                    <div className="rounded-xl overflow-hidden">
                        <PayPalButtons
                            style={{
                                layout: 'vertical',
                                color: plan.highlight ? 'gold' : 'blue',
                                shape: 'rect',
                                label: 'subscribe',
                                height: 45,
                            }}
                            createSubscription={(data, actions) =>
                                actions.subscription.create({ plan_id: PLAN_IDS[plan.id] })
                            }
                            onApprove={(data) => onSuccess(data.subscriptionID, plan.id)}
                            onError={() => toast.error('PayPal Fehler. Bitte erneut versuchen.')}
                        />
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default function SeoPricingPage() {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [currentPlan, setCurrentPlan] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem('user')
        if (stored) {
            setUser(JSON.parse(stored))
            fetchStatus()
        } else {
            setLoading(false)
        }
    }, [])

    const fetchStatus = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/plan`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json()
            setCurrentPlan(data.plan || null)
        } catch {
        } finally {
            setLoading(false)
        }
    }

    const handleSuccess = async (subscriptionId, plan) => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ subscriptionId, plan }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            setCurrentPlan(plan)
            toast.success(`${plan.charAt(0).toUpperCase() + plan.slice(1)}-Plan aktiviert!`)
            setTimeout(() => router.push('/seo/dashboard'), 1500)
        } catch (err) {
            toast.error(err.message || 'Fehler beim Aktivieren des Abos')
        }
    }

    const plansGrid = (
        <div className="grid md:grid-cols-3 gap-6 items-start">
            {PLANS.map(plan => (
                <PlanCard
                    key={plan.id}
                    plan={plan}
                    user={user}
                    currentPlan={currentPlan}
                    loading={loading}
                    onSuccess={handleSuccess}
                />
            ))}
        </div>
    )

    return (
        <>
            <div className="min-h-screen bg-(--bg-base)">
                <Navbar />

                <div className="relative pt-28 md:pt-34 pb-18 md:pb-28 px-4 sm:px-8">

                    <div className="relative max-w-300 mx-auto">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-14 max-w-190">
                            <h1 className="text-[clamp(34px,4.4vw,54px)] leading-[1.05] tracking-[-0.038em] font-bold text-(--text-white) mb-5">
                                Deine Rankings. Immer im Blick.
                            </h1>
                            <p className="text-lg text-(--text-body) max-w-[62ch] mb-6">
                                Verfolge wöchentlich deine Google-Positionen. Sieh sofort, wenn du aufsteigst oder fällst.
                            </p>
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-(--accent-border) bg-(--accent-soft) text-sm">
                                <span className="text-(--accent-ink) font-semibold">14 Tage kostenlos testen</span>
                            </div>
                        </motion.div>

                        <h2 className="text-xl sm:text-2xl font-bold text-(--text-white) text-center mb-8">
                            SEO Automatisierung Preise im Überblick
                        </h2>

                        {user ? (
                            <PayPalScriptProvider options={{
                                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test',
                                vault: true,
                                intent: 'subscription',
                                currency: 'EUR',
                            }}>
                                {plansGrid}
                            </PayPalScriptProvider>
                        ) : plansGrid}

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                            className="text-center text-sm text-(--text-faint) mt-10">
                            14 Tage kostenlos testen nach dem Testzeitraum automatische Abbuchung jederzeit kündbar Bezahlung über PayPal
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="mt-20 max-w-2xl mx-auto">
                            <h2 className="text-xl sm:text-2xl font-bold text-(--text-white) text-center mb-8">
                                Häufige Fragen zu SEO Automatisierung Preisen
                            </h2>
                            <div className="space-y-4">
                                {FAQS.map((faq, i) => (
                                    <div key={i} className="bg-(--card) border border-(--line) rounded-2xl p-5">
                                        <h3 className="font-semibold text-(--text-white) mb-2 text-sm">{faq.q}</h3>
                                        <p className="text-sm text-(--text-muted) leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    )
}