'use client'
import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {Check, Zap, Crown, Building2, LogIn, Loader2} from 'lucide-react'
import Link from 'next/link'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'
import toast, {Toaster} from 'react-hot-toast'
import {useRouter} from 'next/navigation'
import Navbar from '../components/Navbar'

9
const PLANS = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        period: 'für immer',
        desc: 'Zum Ausprobieren von AuditAI',
        icon: Zap,
        features: [
            '1 Audit pro Monat',
            'SEO-Score & Analyse',
            'Performance-Metriken',
            'GEO-Sichtbarkeit',
        ],
        cta: 'Kostenlos starten',
        href: '/dashboard',
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 29,
        period: 'pro Monat',
        desc: 'Für Freelancer und kleine Agenturen',
        icon: Crown,
        badge: 'Beliebteste',
        highlight: true,
        features: [
            '10 Audits pro Monat',
            'Alles aus Free',
            'KI-generierter Bericht',
            'Desktop + Mobile Screenshots',
            'Audit-Verlauf',
        ],
        cta: 'Pro holen',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_PRO',
    },
    {
        id: 'agency',
        name: 'Agency',
        price: 99,
        period: 'pro Monat',
        desc: 'Für Teams mit mehreren Kunden',
        icon: Building2,
        features: [
            'Unbegrenzte Audits',
            'Alles aus Pro',
            'Priorität-Support',
        ],
        cta: 'Agency holen',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_AGENCY',
    },
]

const PLAN_IDS = {
    pro: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_PRO,
    agency: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_AGENCY,
}

function PlanCard({plan, user, currentPlan, onSuccess}) {
    const router = useRouter()
    const isPaid = plan.id !== 'free'
    const isCurrentPlan = currentPlan === plan.id

    return (
        <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: PLANS.indexOf(plan) * 0.1}}
            className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-300 ${
                plan.highlight
                    ? 'bg-linear-to-b from-violet-600/10 to-transparent border-violet-500/30 shadow-2xl shadow-violet-500/10'
                    : 'bg-white/2 border-white/6'
            }`}
        >
            {plan.badge && (
                <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-linear-to-r from-violet-600 to-cyan-600 rounded-full text-xs font-semibold text-white shadow-lg whitespace-nowrap">
                    {plan.badge}
                </div>
            )}

            {isCurrentPlan && (
                <div
                    className="absolute -top-3 right-6 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-400">
                    Aktuell
                </div>
            )}

            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${plan.highlight ? 'bg-violet-500/20' : 'bg-white/5'}`}>
                        <plan.icon className={`w-4 h-4 ${plan.highlight ? 'text-violet-400' : 'text-slate-400'}`}
                                   strokeWidth={1.8}/>
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
                        <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-violet-500/20' : 'bg-white/5'}`}>
                            <Check className={`w-2.5 h-2.5 ${plan.highlight ? 'text-violet-400' : 'text-slate-400'}`}
                                   strokeWidth={3}/>
                        </div>
                        <span className="text-slate-300">{f}</span>
                    </div>
                ))}
            </div>

            <div>
                {!isPaid ? (
                    <Link href={plan.href}
                          className="block w-full py-3 text-center text-sm font-semibold rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200">
                        {plan.cta}
                    </Link>
                ) : isCurrentPlan ? (
                    <div
                        className="block w-full py-3 text-center text-sm font-semibold rounded-xl border border-emerald-500/20 text-emerald-400 bg-emerald-500/5">
                        Aktives Abo
                    </div>
                ) : !user ? (
                    <Link href={`/login?redirect=/pricing`}
                          className={`flex items-center justify-center gap-2 w-full py-3 text-center text-sm font-semibold rounded-xl transition-all duration-200 ${
                              plan.highlight
                                  ? 'bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white shadow-lg shadow-violet-500/20 hover:-translate-y-0.5'
                                  : 'border border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/5'
                          }`}>
                        <LogIn className="w-4 h-4"/> Anmelden zum Abonnieren
                    </Link>
                ) : (
                    <div className="rounded-xl overflow-hidden">
                        <PayPalButtons
                            style={{
                                layout: 'vertical',
                                color: plan.highlight ? 'gold' : 'blue',
                                shape: 'rect',
                                label: 'subscribe',
                                height: 45
                            }}
                            createSubscription={(data, actions) =>
                                actions.subscription.create({plan_id: PLAN_IDS[plan.id]})
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

export default function PricingPage() {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [currentPlan, setCurrentPlan] = useState('free')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem('user')
        if (stored) {
            const u = JSON.parse(stored)
            setUser(u)
            fetchStatus()
        } else {
            setLoading(false)
        }
    }, [])

    const fetchStatus = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/status`, {
                headers: {Authorization: `Bearer ${token}`},
            })
            const data = await res.json()
            setCurrentPlan(data.plan || 'free')
        } catch {
        } finally {
            setLoading(false)
        }
    }

    const handleSuccess = async (subscriptionId, plan) => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/capture`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
                body: JSON.stringify({subscriptionId, plan}),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'conversion', {
                    send_to: 'AW-691789119/O8rOCO60vrUcEL-678kC',
                    value: plan === 'agency' ? 99.0 : 29.0,
                    currency: 'EUR',
                    transaction_id: subscriptionId,
                })
            }

            setCurrentPlan(plan)
            toast.success(`${plan === 'pro' ? 'Pro' : 'Agency'} Abo aktiv!`)
            setTimeout(() => router.push('/dashboard'), 1500)
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
                    style: {
                        background: '#0d1117',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.08)',
                        maxWidth: 'calc(100vw - 2rem)',
                    }
                }}/>
                <Navbar/>

                <div className="relative pt-32 pb-24 px-5 sm:px-8">
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 rounded-full blur-3xl pointer-events-none"
                        style={{background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)'}}/>

                    <div className="relative z-10 max-w-6xl mx-auto">
                        <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}}
                                    className="text-center mb-16">
                            <div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-medium mb-6">
                                Einfache Preise
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
                                Kostenlos starten.<br/>
                                <span
                                    className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">Wachsen wenn nötig.</span>
                            </h1>
                            <p className="text-lg text-slate-400 max-w-xl mx-auto">
                                Keine versteckten Gebühren. Monatliches Abo. Jederzeit kündbar.
                            </p>
                        </motion.div>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="w-8 h-8 text-violet-400 animate-spin"/>
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

                        <motion.p initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.5}}
                                  className="text-center text-sm text-slate-600 mt-10">
                            Bezahlung sicher über PayPal · Jederzeit kündbar · Keine Mindestlaufzeit
                        </motion.p>
                    </div>
                </div>
            </div>
        </PayPalScriptProvider>
    )
}