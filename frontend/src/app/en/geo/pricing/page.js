'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles, Zap, Star, Building2, LogIn, Loader2, Lock } from 'lucide-react'
import Link from 'next/link'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Navbar from '../../../components/Navbar'

const FAQS = [
    {
        q: 'What does a GEO audit or GEO automation cost?',
        a: 'GEO automation at AuditAI starts at €4.99/month for 1 website and 10 keywords with weekly Claude tracking. The Pro plan (€9.99/month) adds ChatGPT, Perplexity, and Google AI Overview tracking for 3 websites plus 2 prompt variants per keyword, the Expert plan (€19.99/month) covers up to 10 websites. All plans include a 14-day free trial.',
    },
    {
        q: 'What\'s the difference between a one-time GEO audit and GEO automation?',
        a: 'A one-time GEO audit (part of the free AuditAI website audit) shows your GEO score at a single point in time. GEO automation automatically checks every week whether ChatGPT, Claude, Perplexity, and Google AI Overview mention your website, and shows the trend over time instead of a single snapshot.',
    },
    {
        q: 'What are prompt variants and why do I need several?',
        a: 'Real users ask AI systems in very different ways — sometimes recommendation-oriented ("What tool do you know for X?"), sometimes comparative ("What\'s the best tool for X compared to others?"). From the Pro plan, AuditAI checks both variants separately per keyword, so you see which type of query mentions you and which doesn\'t.',
    },
    {
        q: 'Is there a free trial for GEO automation?',
        a: 'Yes, all GEO automation plans offer a 14-day free trial, after which billing renews automatically via PayPal, cancel anytime.',
    },
]

const PLANS = [
    {
        id: 'einsteiger',
        name: 'Starter',
        price: '4.99',
        period: 'per month',
        desc: 'For individuals and first steps',
        icon: Zap,
        features: [
            'Track 1 website',
            '10 keywords',
            'Claude AI tracking',
            'Weekly auto-check',
            '2 manual checks per month',
            'Mention history',
        ],
        locked: [
            'ChatGPT tracking (from Pro)',
            'Perplexity tracking (from Pro)',
            'Google AI Overview tracking (from Pro)',
            '2 prompt variants per keyword (from Pro)',
        ],
        cta: 'Start Starter',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_GEO_EINSTEIGER',
    },
    {
        id: 'pro',
        name: 'Pro',
        price: '9.99',
        period: 'per month',
        desc: 'For freelancers and small agencies',
        icon: Star,
        badge: 'Most popular',
        highlight: true,
        features: [
            'Track 3 websites',
            '30 keywords',
            'Claude + ChatGPT + Perplexity + Google AI Overview tracking',
            '2 prompt variants per keyword (recommendation + comparison)',
            'Weekly auto-check',
            '8 manual checks per month',
            'Mention history',
        ],
        cta: 'Start Pro',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_GEO_PRO',
    },
    {
        id: 'expert',
        name: 'Expert',
        price: '19.99',
        period: 'per month',
        desc: 'For agencies with many clients',
        icon: Building2,
        features: [
            'Track 10 websites',
            '100 keywords',
            'Claude + ChatGPT + Perplexity + Google AI Overview tracking',
            '2 prompt variants per keyword (recommendation + comparison)',
            'Weekly auto-check',
            '20 manual checks per month',
            'Mention history',
            'Priority support',
        ],
        cta: 'Start Expert',
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
                    ? 'bg-gradient-to-b from-violet-600/10 to-transparent border-violet-500/30 shadow-2xl shadow-violet-500/10'
                    : 'bg-white/[0.02] border-white/[0.06]'
            }`}
        >
            {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full text-xs font-semibold text-white shadow-lg whitespace-nowrap">
                    {plan.badge}
                </div>
            )}

            {currentPlan === plan.id && (
                <div className="absolute -top-3 right-6 px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-xs font-semibold text-violet-400">
                    Current
                </div>
            )}

            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${plan.highlight ? 'bg-violet-500/20' : 'bg-white/5'}`}>
                        <plan.icon className={`w-4 h-4 ${plan.highlight ? 'text-violet-400' : 'text-slate-400'}`} strokeWidth={1.8} />
                    </div>
                    <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{plan.name}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400 text-lg">€</span>
                </div>
                <div className="text-sm text-slate-500 mb-3">{plan.period}, VAT incl.</div>
                <p className="text-sm text-slate-400">{plan.desc}</p>
            </div>

            <div className="space-y-3 mb-8 flex-1">
                {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-violet-500/20' : 'bg-white/5'}`}>
                            <Check className={`w-2.5 h-2.5 ${plan.highlight ? 'text-violet-400' : 'text-slate-400'}`} strokeWidth={3} />
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
                {loading ? (
                    <div className="flex items-center justify-center w-full py-3 rounded-xl border border-white/10">
                        <Loader2 className="w-4 h-4 text-slate-500 animate-spin" />
                    </div>
                ) : currentPlan === plan.id ? (
                    <div className="block w-full py-3 text-center text-sm font-semibold rounded-xl border border-violet-500/20 text-violet-400 bg-violet-500/5">
                        Active subscription
                    </div>
                ) : !user ? (
                    <Link
                        href="/en/login?redirect=/en/geo/pricing"
                        className={`flex items-center justify-center gap-2 w-full py-3 text-center text-sm font-semibold rounded-xl transition-all duration-200 ${
                            plan.highlight
                                ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-lg shadow-violet-500/20 hover:-translate-y-0.5'
                                : 'border border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/5'
                        }`}
                    >
                        <LogIn className="w-4 h-4" /> Log in to subscribe
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
                            onError={() => toast.error('PayPal error. Please try again.')}
                        />
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default function GeoPricingPageEn() {
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
            toast.success(`${plan.charAt(0).toUpperCase() + plan.slice(1)} plan activated!`)
            setTimeout(() => router.push('/geo/dashboard'), 1500)
        } catch (err) {
            toast.error(err.message || 'Error activating subscription')
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
            <div className="min-h-screen bg-[#05080f]">
                <Toaster position="top-right" toastOptions={{
                    style: { background: '#0d1117', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' },
                }} />
                <Navbar locale="en" />

                <div className="relative pt-32 pb-24 px-5 sm:px-8">
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)' }}
                    />

                    <div className="relative z-10 max-w-6xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-medium mb-6">
                                <Sparkles className="w-3.5 h-3.5" />
                                GEO Automation
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
                                Are you<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">recommended by AI?</span>
                            </h1>
                            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-6">
                                Track whether Claude, ChatGPT, Perplexity, and Google AI Overview mention your domain — automatically, every week.
                            </p>
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-violet-500/20 bg-violet-500/5 text-sm">
                                <span className="text-violet-300 font-semibold">Try free for 14 days</span>
                                <span className="text-slate-600">·</span>
                                <span className="text-slate-400">renews automatically after · cancel anytime</span>
                            </div>
                        </motion.div>

                        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8">
                            GEO Automation Pricing Overview
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
                            14 days free trial · billed automatically after the trial · cancel anytime · payment via PayPal
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="mt-20 max-w-2xl mx-auto">
                            <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8">
                                Frequently Asked Questions About GEO Automation Pricing
                            </h2>
                            <div className="space-y-4">
                                {FAQS.map((faq, i) => (
                                    <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
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
