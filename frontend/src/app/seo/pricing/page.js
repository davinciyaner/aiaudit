'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, TrendingUp, Zap, Star, Building2, LogIn, Loader2, Lock } from 'lucide-react'
import Link from 'next/link'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'

const PLANS = [
    {
        id: 'einsteiger',
        name: 'Einsteiger',
        price: 29,
        period: 'pro Monat',
        desc: 'Für Einzelpersonen und kleine Projekte',
        icon: Zap,
        features: [
            '3 Websites tracken',
            '50 Keywords gesamt',
            'Wöchentliches Ranking-Update',
            'Ranking-Verlauf (8 Wochen)',
            'Keyword-Ideen & Suchvolumen',
            'E-Mail Alerts bei großen Einbrüchen',
            'Konkurrenten- & Backlink-Analyse',
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
        price: 79,
        period: 'pro Monat',
        desc: 'Für Freelancer und wachsende Unternehmen',
        icon: Star,
        badge: 'Beliebteste',
        highlight: true,
        features: [
            '10 Websites tracken',
            '200 Keywords gesamt',
            'Wöchentliches Ranking-Update',
            'Ranking-Verlauf (6 Monate)',
            'Keyword-Ideen & Suchvolumen',
            'E-Mail Alerts ab 5 Positionen',
            'Konkurrenten- & Backlink-Analyse',
            'Content Gap Analyse (100×/Monat)',
        ],
        cta: 'Pro starten',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_SEO_PRO',
    },
    {
        id: 'expert',
        name: 'Expert',
        price: 149,
        period: 'pro Monat',
        desc: 'Für Agenturen mit vielen Kunden',
        icon: Building2,
        features: [
            '20 Websites tracken',
            '500 Keywords gesamt',
            'Wöchentliches Ranking-Update',
            'Ranking-Verlauf unbegrenzt',
            'Keyword-Ideen & Suchvolumen',
            'E-Mail Alerts ab 3 Positionen',
            'Konkurrenten- & Backlink-Analyse',
            'Content Gap Analyse (300×/Monat)',
            'Priorisierter Support',
        ],
        cta: 'Expert starten',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_SEO_EXPERT',
    },
]

const PLAN_IDS = {
    einsteiger: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_SEO_EINSTEIGER,
    pro:        process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_SEO_PRO,
    expert:     process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_SEO_EXPERT,
}

function PlanCard({ plan, user, currentPlan, onSuccess }) {
    const router = useRouter()

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: PLANS.indexOf(plan) * 0.1 }}
            className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-300 ${
                plan.highlight
                    ? 'bg-gradient-to-b from-emerald-600/10 to-transparent border-emerald-500/30 shadow-2xl shadow-emerald-500/10'
                    : 'bg-white/[0.02] border-white/[0.06]'
            }`}
        >
            {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full text-xs font-semibold text-white shadow-lg whitespace-nowrap">
                    {plan.badge}
                </div>
            )}

            {currentPlan === plan.id && (
                <div className="absolute -top-3 right-6 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-400">
                    Aktuell
                </div>
            )}

            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${plan.highlight ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                        <plan.icon className={`w-4 h-4 ${plan.highlight ? 'text-emerald-400' : 'text-slate-400'}`} strokeWidth={1.8} />
                    </div>
                    <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{plan.name}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-slate-400 text-lg">€</span>
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                </div>
                <div className="text-sm text-slate-500 mb-3">{plan.period}</div>
                <p className="text-sm text-slate-400">{plan.desc}</p>
            </div>

            <div className="space-y-3 mb-8 flex-1">
                {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                            <Check className={`w-2.5 h-2.5 ${plan.highlight ? 'text-emerald-400' : 'text-slate-400'}`} strokeWidth={3} />
                        </div>
                        <span className="text-slate-300">{f}</span>
                    </div>
                ))}
                {plan.locked?.map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm opacity-40">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-white/5">
                            <Lock className="w-2.5 h-2.5 text-slate-500" strokeWidth={3} />
                        </div>
                        <span className="text-slate-500 line-through">{f}</span>
                    </div>
                ))}
            </div>

            <div>
                {currentPlan === plan.id ? (
                    <div className="block w-full py-3 text-center text-sm font-semibold rounded-xl border border-emerald-500/20 text-emerald-400 bg-emerald-500/5">
                        Aktives Abo
                    </div>
                ) : !user ? (
                    <Link
                        href="/login?redirect=/seo/pricing"
                        className={`flex items-center justify-center gap-2 w-full py-3 text-center text-sm font-semibold rounded-xl transition-all duration-200 ${
                            plan.highlight
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5'
                                : 'border border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/5'
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

    return (
        <PayPalScriptProvider options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test',
            vault: true,
            intent: 'subscription',
            currency: 'EUR',
        }}>
            <div className="min-h-screen bg-[#05080f]">
                <Toaster position="top-right" toastOptions={{
                    style: { background: '#0d1117', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' },
                }} />
                <Navbar />

                <div className="relative pt-32 pb-24 px-5 sm:px-8">
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 70%)' }}
                    />

                    <div className="relative z-10 max-w-6xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium mb-6">
                                <TrendingUp className="w-3.5 h-3.5" />
                                SEO Keyword Tracking
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
                                Deine Rankings.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Immer im Blick.</span>
                            </h1>
                            <p className="text-lg text-slate-400 max-w-xl mx-auto">
                                Verfolge wöchentlich deine Google-Positionen. Sieh sofort, wenn du aufsteigst — oder fällst.
                            </p>
                        </motion.div>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-3 gap-6 items-start">
                                {PLANS.map(plan => (
                                    <PlanCard
                                        key={plan.id}
                                        plan={plan}
                                        user={user}
                                        currentPlan={currentPlan}
                                        onSuccess={handleSuccess}
                                    />
                                ))}
                            </div>
                        )}

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                            className="text-center text-sm text-slate-600 mt-10">
                            Bezahlung sicher über PayPal · Jederzeit kündbar · Keine Mindestlaufzeit
                        </motion.p>
                    </div>
                </div>
            </div>
        </PayPalScriptProvider>
    )
}