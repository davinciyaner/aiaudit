'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, TrendingUp, Zap, Star, Building2, LogIn, Loader2, Lock } from 'lucide-react'
import Link from 'next/link'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Navbar from '../../../components/Navbar'

const FAQS = [
    {
        q: 'What does SEO automation cost?',
        a: 'SEO automation at AuditAI starts at €19/month for 3 websites and 50 keywords with weekly ranking updates. The Pro plan (€59/month) expands to 10 websites and 200 keywords including content gap analysis, the Expert plan (€149/month) covers up to 20 websites and 500 keywords. All plans include a 14-day free trial.',
    },
    {
        q: 'What\'s the difference between a one-time SEO audit and SEO automation?',
        a: 'A one-time SEO audit (part of the free AuditAI website audit) shows your SEO score at a single point in time. SEO automation tracks your Google rankings, keyword ideas, competitor analysis, and backlink overview automatically every week — as an ongoing history rather than a single snapshot.',
    },
    {
        q: 'Is there a free trial for SEO automation?',
        a: 'Yes, all SEO automation plans offer a 14-day free trial, after which billing renews automatically via PayPal, cancel anytime.',
    },
]

const PLANS = [
    {
        id: 'einsteiger',
        name: 'Starter',
        price: 19,
        period: 'per month',
        desc: 'For individuals and small projects',
        features: [
            'Track 3 websites',
            '50 keywords total',
            'Weekly ranking update',
            '2 manual checks per month',
            'Ranking history (8 weeks)',
            'Keyword ideas & search volume (6 lookups/month)',
            'Automatic keyword discovery from new pages & content (up to 10 per run)',
            'Email alerts on major drops',
            'Competitor analysis (automatic, weekly)',
            'Backlink overview (automatic, monthly)',
        ],
        locked: [
            'Content gap analysis (from Pro)',
        ],
        cta: 'Start Starter',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_SEO_EINSTEIGER',
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 59,
        period: 'per month',
        desc: 'For freelancers and growing companies',
        highlight: true,
        features: [
            'Track 10 websites',
            '200 keywords total',
            'Weekly ranking update',
            '4 manual checks per month',
            'Ranking history (6 months)',
            'Keyword ideas & search volume (20 lookups/month)',
            'Automatic keyword discovery from new pages & content (up to 30 per run)',
            'Email alerts from 5 positions',
            'Competitor analysis (automatic, weekly)',
            'Backlink overview (automatic, monthly)',
            'Content gap analysis — weekly, automatic per website, up to 100 lookups/month total',
        ],
        cta: 'Start Pro',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_SEO_PRO',
    },
    {
        id: 'expert',
        name: 'Expert',
        price: 149,
        period: 'per month',
        desc: 'For agencies with many clients',
        features: [
            'Track 20 websites',
            '500 keywords total',
            'Weekly ranking update',
            '6 manual checks per month',
            'Unlimited ranking history',
            'Keyword ideas & search volume (40 lookups/month)',
            'Automatic keyword discovery from new pages & content (up to 50 per run)',
            'Email alerts from 3 positions',
            'Competitor analysis (automatic, weekly)',
            'Backlink overview (automatic, monthly)',
            'Content gap analysis — weekly, automatic per website, up to 300 lookups/month total',
            'Priority support',
        ],
        cta: 'Start Expert',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_SEO_EXPERT',
    },
]

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
                    ? 'bg-[var(--accent-soft)] border-[var(--accent-border)] shadow-2xl shadow-[var(--accent-border)]'
                    : 'bg-[var(--surface-06)] border-[var(--border-subtle)]'
            }`}
        >

            {currentPlan === plan.id && (
                <div className="absolute -top-3 right-6 px-3 py-1 bg-[var(--accent-soft-strong)] border border-[var(--accent-border)] rounded-full text-xs font-semibold text-[var(--accent)]">
                    Current
                </div>
            )}

            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{plan.name}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400 text-lg">€</span>
                </div>
                <div className="text-sm text-slate-500 mb-3">{plan.period}</div>
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
                        Active subscription
                    </div>
                ) : !user ? (
                    <Link
                        href="/en/login?redirect=/en/seo/pricing"
                        className={`flex items-center justify-center gap-2 w-full py-3 text-center text-sm font-semibold rounded-xl transition-all duration-200 ${
                            plan.highlight
                                ? 'bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] shadow-lg shadow-[var(--accent-border)] hover:-translate-y-0.5'
                                : 'border border-[var(--border-subtle)] text-slate-300 hover:text-white hover:border-[var(--border-strong)] hover:bg-[var(--surface-06)]'
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

export default function SeoPricingPageEn() {
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
            toast.success(`${plan.charAt(0).toUpperCase() + plan.slice(1)} plan activated!`)
            setTimeout(() => router.push('/seo/dashboard'), 1500)
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
            <div className="min-h-screen bg-[var(--bg-base)]">
                <Toaster position="top-right" toastOptions={{
                    style: { background: 'var(--bg-surface)', color: '#fff', border: '1px solid var(--border-subtle)' },
                }} />
                <Navbar locale="en" />

                <div className="relative pt-32 pb-24 px-5 sm:px-8">
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)' }}
                    />

                    <div className="relative z-10 max-w-6xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
                                Your rankings.<br />
                                Always in view.
                            </h1>
                            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-6">
                                Track your Google positions every week. See instantly when you rise or fall.
                            </p>
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] text-sm">
                                <span className="text-[var(--accent)] font-semibold">Try free for 14 days</span>
                            </div>
                        </motion.div>

                        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8">
                            SEO Automation Pricing Overview
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
                            14 days free trial, then billed automatically, cancel anytime, payment via PayPal
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="mt-20 max-w-2xl mx-auto">
                            <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8">
                                Frequently Asked Questions About SEO Automation Pricing
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
