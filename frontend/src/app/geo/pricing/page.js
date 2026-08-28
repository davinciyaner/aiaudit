'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles, Zap, Star, Building2, LogIn, Loader2, Lock } from 'lucide-react'
import Link from 'next/link'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'

const FAQS = [
    {
        q: 'Was kostet ein GEO Audit bzw. GEO Automatisierung?',
        a: 'GEO Automatisierung bei AuditAI startet ab 4,99 €/Monat für 1 Website und 10 Keywords mit wöchentlichem Claude-Tracking. Der Pro-Plan (9,99 €/Monat) ergänzt ChatGPT-, Perplexity- und Google-AI-Overview-Tracking für 3 Websites sowie 2 Prompt-Varianten pro Keyword, der Expert-Plan (19,99 €/Monat) deckt bis zu 10 Websites ab. Alle Pläne bieten 14 Tage kostenlose Testphase.',
    },
    {
        q: 'Was ist der Unterschied zwischen einem einmaligen GEO Audit und GEO Automatisierung?',
        a: 'Ein einmaliger GEO Audit (Teil des kostenlosen AuditAI Website-Audits) zeigt deinen GEO-Score zu einem Zeitpunkt. GEO Automatisierung prüft wöchentlich automatisch, ob ChatGPT, Claude, Perplexity und Google AI Overview deine Website erwähnen, und zeigt den Verlauf über Zeit statt einer Einzelmessung.',
    },
    {
        q: 'Was sind Prompt-Varianten und wozu brauche ich mehrere?',
        a: 'Reale Nutzer fragen KI-Systeme auf sehr unterschiedliche Art — mal empfehlungsorientiert ("Welches Tool kennst du für X?"), mal vergleichend ("Was ist das beste Tool für X im Vergleich?"). Ab dem Pro-Plan prüft AuditAI pro Keyword beide Varianten separat, damit du siehst, bei welcher Art von Anfrage du erwähnt wirst und bei welcher nicht.',
    },
    {
        q: 'Gibt es eine kostenlose Testphase für GEO Automatisierung?',
        a: 'Ja, alle GEO-Automatisierung-Pläne bieten 14 Tage kostenlos testen, danach automatische Verlängerung über PayPal, jederzeit kündbar.',
    },
]

const PLANS = [
    {
        id: 'einsteiger',
        name: 'Einsteiger',
        price: '4,99',
        period: 'pro Monat',
        desc: 'Für Einzelpersonen und erste Schritte',
        icon: Zap,
        features: [
            '1 Website tracken',
            '10 Keywords',
            'Claude AI Tracking',
            'Wöchentlicher Auto-Check',
            '2 manuelle Checks pro Monat',
            'Mention-Verlauf',
        ],
        locked: [
            'ChatGPT Tracking (ab Pro)',
            'Perplexity Tracking (ab Pro)',
            'Google AI Overview Tracking (ab Pro)',
            '2 Prompt-Varianten pro Keyword (ab Pro)',
        ],
        cta: 'Einsteiger starten',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_GEO_EINSTEIGER',
    },
    {
        id: 'pro',
        name: 'Pro',
        price: '9,99',
        period: 'pro Monat',
        desc: 'Für Freelancer und kleine Agenturen',
        icon: Star,
        badge: 'Beliebteste',
        highlight: true,
        features: [
            '3 Websites tracken',
            '30 Keywords',
            'Claude + ChatGPT + Perplexity + Google AI Overview Tracking',
            '2 Prompt-Varianten pro Keyword (Empfehlung + Vergleich)',
            'Wöchentlicher Auto-Check',
            '8 manuelle Checks pro Monat',
            'Mention-Verlauf',
        ],
        cta: 'Pro starten',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_GEO_PRO',
    },
    {
        id: 'expert',
        name: 'Expert',
        price: '19,99',
        period: 'pro Monat',
        desc: 'Für Agenturen mit vielen Kunden',
        icon: Building2,
        features: [
            '10 Websites tracken',
            '100 Keywords',
            'Claude + ChatGPT + Perplexity + Google AI Overview Tracking',
            '2 Prompt-Varianten pro Keyword (Empfehlung + Vergleich)',
            'Wöchentlicher Auto-Check',
            '20 manuelle Checks pro Monat',
            'Mention-Verlauf',
            'Priorisierter Support',
        ],
        cta: 'Expert starten',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_GEO_EXPERT',
    },
]

const PLAN_IDS = {
    einsteiger: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_GEO_EINSTEIGER,
    pro:        process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_GEO_PRO,
    expert:     process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_GEO_EXPERT,
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
                    ? 'bg-[var(--accent-soft)] border-[var(--accent-border)] shadow-2xl shadow-[var(--accent-border)]'
                    : 'bg-[var(--surface-06)] border-[var(--border-subtle)]'
            }`}
        >
            {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--accent)] rounded-full text-xs font-semibold text-[var(--bg-base)] shadow-lg whitespace-nowrap">
                    {plan.badge}
                </div>
            )}

            {currentPlan === plan.id && (
                <div className="absolute -top-3 right-6 px-3 py-1 bg-[var(--accent-soft-strong)] border border-[var(--accent-border)] rounded-full text-xs font-semibold text-[var(--accent)]">
                    Aktuell
                </div>
            )}

            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${plan.highlight ? 'bg-[var(--accent-soft-strong)]' : 'bg-[var(--surface-08)]'}`}>
                        <plan.icon className={`w-4 h-4 ${plan.highlight ? 'text-[var(--accent)]' : 'text-slate-400'}`} strokeWidth={1.8} />
                    </div>
                    <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{plan.name}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400 text-lg">€</span>
                </div>
                <div className="text-sm text-slate-500 mb-3">{plan.period} inkl. MwSt.</div>
                <p className="text-sm text-slate-400">{plan.desc}</p>
            </div>

            <div className="space-y-3 mb-8 flex-1">
                {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-[var(--accent-soft-strong)]' : 'bg-[var(--surface-08)]'}`}>
                            <Check className={`w-2.5 h-2.5 ${plan.highlight ? 'text-[var(--accent)]' : 'text-slate-400'}`} strokeWidth={3} />
                        </div>
                        <span className="text-slate-300">{f}</span>
                    </div>
                ))}
                {plan.locked?.map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm opacity-40">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-[var(--surface-08)]">
                            <Lock className="w-2.5 h-2.5 text-slate-500" strokeWidth={3} />
                        </div>
                        <span className="text-slate-500 line-through">{f}</span>
                    </div>
                ))}
            </div>

            <div>
                {loading ? (
                    <div className="flex items-center justify-center w-full py-3 rounded-xl border border-[var(--border-subtle)]">
                        <Loader2 className="w-4 h-4 text-slate-500 animate-spin" />
                    </div>
                ) : currentPlan === plan.id ? (
                    <div className="block w-full py-3 text-center text-sm font-semibold rounded-xl border border-[var(--accent-border)] text-[var(--accent)] bg-[var(--accent-soft)]">
                        Aktives Abo
                    </div>
                ) : !user ? (
                    <Link
                        href="/login?redirect=/geo/pricing"
                        className={`flex items-center justify-center gap-2 w-full py-3 text-center text-sm font-semibold rounded-xl transition-all duration-200 ${
                            plan.highlight
                                ? 'bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] shadow-lg shadow-[var(--accent-border)] hover:-translate-y-0.5'
                                : 'border border-[var(--border-subtle)] text-slate-300 hover:text-white hover:border-[var(--border-strong)] hover:bg-[var(--surface-06)]'
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

export default function GeoPricingPage() {
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/plan`, {
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ subscriptionId, plan }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            setCurrentPlan(plan)
            toast.success(`${plan.charAt(0).toUpperCase() + plan.slice(1)}-Plan aktiviert!`)
            setTimeout(() => router.push('/geo/dashboard'), 1500)
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
            <div className="min-h-screen bg-[var(--bg-base)]">
                <Toaster position="top-right" toastOptions={{
                    style: { background: 'var(--bg-surface)', color: '#fff', border: '1px solid var(--border-subtle)' },
                }} />
                <Navbar />

                <div className="relative pt-32 pb-24 px-5 sm:px-8">
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)' }}
                    />

                    <div className="relative z-10 max-w-6xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-medium mb-6">
                                <Sparkles className="w-3.5 h-3.5" />
                                GEO Automatisierung
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
                                Wirst du von KI<br />
                                empfohlen?
                            </h1>
                            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-6">
                                Tracke ob Claude, ChatGPT, Perplexity und Google AI Overview deine Domain erwähnen — wöchentlich automatisch.
                            </p>
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] text-sm">
                                <span className="text-[var(--accent)] font-semibold">14 Tage kostenlos testen</span>
                                <span className="text-slate-600">·</span>
                                <span className="text-slate-400">danach automatisch verlängerbar · jederzeit kündbar</span>
                            </div>
                        </motion.div>

                        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8">
                            GEO Automatisierung Preise im Überblick
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
                            className="text-center text-sm text-slate-600 mt-10">
                            14 Tage kostenlos testen · nach dem Testzeitraum automatische Abbuchung · jederzeit kündbar · Bezahlung über PayPal
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="mt-20 max-w-2xl mx-auto">
                            <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8">
                                Häufige Fragen zu GEO Automatisierung Preisen
                            </h2>
                            <div className="space-y-4">
                                {FAQS.map((faq, i) => (
                                    <div key={i} className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                        <h3 className="font-semibold text-white mb-2 text-sm">{faq.q}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
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