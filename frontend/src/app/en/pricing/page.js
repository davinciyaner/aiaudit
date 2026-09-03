'use client'
import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {Check, Zap, Crown, Building2, LogIn, Loader2, TrendingUp, Star, ArrowRight, Sparkles, Lock} from 'lucide-react'
import Link from 'next/link'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'
import toast, {Toaster} from 'react-hot-toast'
import {useRouter} from 'next/navigation'
import Navbar from '../../components/Navbar'

const PLANS = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        period: 'forever',
        desc: 'To try out AuditAI',
        features: [
            '1 audit per month',
            'SEO score & analysis',
            'Performance metrics',
            'GEO visibility',
        ],
        cta: 'Start for free',
        href: '/register',
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 29,
        period: 'per month',
        desc: 'For freelancers and small agencies',
        highlight: true,
        features: [
            '10 audits per month',
            'Everything in Free',
            'AI-generated report',
            'Desktop + mobile screenshots',
            'Audit history',
        ],
        cta: 'Get Pro',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_PRO',
    },
    {
        id: 'agency',
        name: 'Agency',
        price: 99,
        period: 'per month',
        desc: 'For teams with multiple clients',
        features: [
            'Unlimited audits',
            'Everything in Pro',
            'Priority support',
        ],
        cta: 'Get Agency',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_AGENCY',
    },
]

const PLAN_IDS = {
    pro: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_PRO,
    agency: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_AGENCY,
}

const SEO_PLANS = [
    {
        id: 'einsteiger',
        name: 'Starter',
        price: 19,
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
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 59,
        highlight: true,
        desc: 'For freelancers and growing agencies',
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
    },
    {
        id: 'expert',
        name: 'Expert',
        price: 149,
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
    },
]

const GEO_PLANS = [
    {
        id: 'einsteiger',
        name: 'Starter',
        price: '4.99',
        desc: 'For individuals and first steps',
        features: [
            'Track 1 website',
            '10 keywords',
            'Claude + Gemini tracking',
            'Weekly auto-check',
            '2 manual checks per month',
        ],
    },
    {
        id: 'pro',
        name: 'Pro',
        price: '19.99',
        badge: 'Most popular',
        highlight: true,
        desc: 'For freelancers and small agencies',
        features: [
            'Track 3 websites',
            '20 keywords',
            'Claude + ChatGPT + Gemini + Perplexity + Google AI Overview tracking',
            '2 prompt variants per keyword',
            'Weekly auto-check',
            '2 manual checks per month',
            'Topic visibility analysis',
        ],
    },
    {
        id: 'expert',
        name: 'Expert',
        price: '59.99',
        desc: 'For agencies with many clients',
        features: [
            'Track 10 websites',
            '60 keywords',
            'Claude + ChatGPT + Gemini + Perplexity + Google AI Overview tracking',
            '2 prompt variants per keyword',
            'Weekly auto-check',
            '3 manual checks per month',
            'Topic visibility analysis',
            'Historical trends per keyword (Google AI Overview)',
        ],
    },
]

function PlanCard({plan, user, currentPlan, loading, onSuccess}) {
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
                    ? 'bg-[var(--accent-soft)] border-[var(--accent-border)] shadow-2xl shadow-[var(--accent-border)]'
                    : 'bg-[var(--surface-06)] border-[var(--border-subtle)]'
            }`}
        >
            {plan.badge && (
                <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--accent)] rounded-full text-xs font-semibold text-[var(--bg-base)] shadow-lg whitespace-nowrap">
                    {plan.badge}
                </div>
            )}

            {isCurrentPlan && (
                <div
                    className="absolute -top-3 right-6 px-3 py-1 bg-[var(--accent-soft-strong)] border border-[var(--accent-border)] rounded-full text-xs font-semibold text-[var(--accent)]">
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
                        <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-[var(--accent-soft-strong)]' : 'bg-[var(--surface-08)]'}`}>
                            <Check className={`w-2.5 h-2.5 ${plan.highlight ? 'text-[var(--accent)]' : 'text-slate-400'}`}
                                   strokeWidth={3}/>
                        </div>
                        <span className="text-slate-300">{f}</span>
                    </div>
                ))}
            </div>

            <div>
                {!isPaid ? (
                    <Link href={plan.href}
                          className="block w-full py-3 text-center text-sm font-semibold rounded-xl border border-[var(--border-subtle)] text-slate-300 hover:text-white hover:border-[var(--border-strong)] hover:bg-[var(--surface-08)] transition-all duration-200">
                        {plan.cta}
                    </Link>
                ) : loading ? (
                    <div className="flex items-center justify-center w-full py-3 rounded-xl border border-[var(--border-subtle)]">
                        <Loader2 className="w-4 h-4 text-slate-500 animate-spin"/>
                    </div>
                ) : isCurrentPlan ? (
                    <div
                        className="block w-full py-3 text-center text-sm font-semibold rounded-xl border border-[var(--accent-border)] text-[var(--accent)] bg-[var(--accent-soft)]">
                        Active subscription
                    </div>
                ) : !user ? (
                    <Link href={`/login?redirect=/en/pricing`}
                          className={`flex items-center justify-center gap-2 w-full py-3 text-center text-sm font-semibold rounded-xl transition-all duration-200 ${
                              plan.highlight
                                  ? 'bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] shadow-lg shadow-[var(--accent-border)] hover:-translate-y-0.5'
                                  : 'border border-[var(--border-subtle)] text-slate-300 hover:text-white hover:border-[var(--border-strong)] hover:bg-[var(--surface-08)]'
                          }`}>
                        <LogIn className="w-4 h-4"/> Log in to subscribe
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
                            onError={() => toast.error('PayPal error. Please try again.')}
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
            toast.success(`${plan === 'pro' ? 'Pro' : 'Agency'} subscription active!`)
            setTimeout(() => router.push('/dashboard'), 1500)
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
                    style: {
                        background: 'var(--bg-surface)',
                        color: '#fff',
                        border: '1px solid var(--border-subtle)',
                        maxWidth: 'calc(100vw - 2rem)',
                    }
                }}/>
                <Navbar locale="en"/>

                <div className="relative pt-32 pb-24 px-5 sm:px-8">
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 rounded-full blur-3xl pointer-events-none"
                        style={{background: 'radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)'}}/>

                    <div className="relative z-10 max-w-6xl mx-auto">
                        <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}}
                                    className="text-center mb-16">
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
                                Start for free.<br/>
                                Grow when you need to.
                            </h1>
                            <p className="text-lg text-slate-400 max-w-xl mx-auto">
                                No hidden fees. Monthly subscription. Cancel anytime.
                            </p>
                        </motion.div>

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

                        <motion.p initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.5}}
                                  className="text-center text-sm text-slate-600 mt-10">
                            Secure payment via PayPal - Cancel anytime - No minimum term
                        </motion.p>

                        {/* SEO Automation section */}
                        <motion.div initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                                    className="mt-24">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="flex-1 h-px bg-[var(--border-subtle)]"/>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-semibold whitespace-nowrap">
                                    SEO Automation
                                </div>
                                <div className="flex-1 h-px bg-[var(--border-subtle)]"/>
                            </div>

                            <div className="text-center mb-10">
                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                                    Track Google rankings automatically
                                </h2>
                                <p className="text-slate-400 text-sm max-w-lg mx-auto mb-4">
                                    Weekly ranking updates, keyword ideas, competitor analysis and backlink profile - available independently of the audit plan.
                                </p>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] text-xs">
                                    <span className="text-[var(--accent)] font-semibold">Try free for 14 days</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 items-start">
                                {SEO_PLANS.map((plan, i) => (
                                    <motion.div key={plan.id}
                                        initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}}
                                        viewport={{once: true}} transition={{delay: i * 0.1}}
                                        className={`relative flex flex-col rounded-2xl p-6 sm:p-8 border transition-all duration-300 ${
                                            plan.highlight
                                                ? 'bg-[var(--accent-soft)] border-[var(--accent-border)] shadow-2xl shadow-[var(--accent-border)]'
                                                : 'bg-[var(--surface-06)] border-[var(--border-subtle)]'
                                        }`}>
                                        {plan.badge && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--accent)] rounded-full text-xs font-semibold text-[var(--bg-base)] shadow-lg whitespace-nowrap">
                                                {plan.badge}
                                            </div>
                                        )}
                                        <div className="mb-5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{plan.name}</span>
                                            </div>
                                            <div className="flex items-baseline gap-1 mb-1">
                                                <span className="text-4xl sm:text-5xl font-bold text-white">{plan.price}</span>
                                                <span className="text-slate-400 text-lg">€</span>
                                            </div>
                                            <div className="text-sm text-slate-500 mb-3">per month</div>
                                            <p className="text-sm text-slate-400">{plan.desc}</p>
                                        </div>
                                        <div className="space-y-3 mb-8 flex-1">
                                            {plan.features.map(f => (
                                                <div key={f} className="flex items-center gap-3 text-sm">
                                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-[var(--accent-soft-strong)]' : 'bg-[var(--surface-08)]'}`}>
                                                        <Check className={`w-2.5 h-2.5 ${plan.highlight ? 'text-[var(--accent)]' : 'text-slate-400'}`} strokeWidth={3}/>
                                                    </div>
                                                    <span className="text-slate-300">{f}</span>
                                                </div>
                                            ))}
                                            {plan.locked?.map(f => (
                                                <div key={f} className="flex items-center gap-3 text-sm opacity-40">
                                                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-[var(--surface-08)]">
                                                        <Lock className="w-2.5 h-2.5 text-slate-500" strokeWidth={3}/>
                                                    </div>
                                                    <span className="text-slate-500 line-through">{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <Link href="/seo/pricing"
                                            className={`flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                                                plan.highlight
                                                    ? 'bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] shadow-lg shadow-[var(--accent-border)]'
                                                    : 'border border-[var(--border-subtle)] text-slate-300 hover:text-white hover:border-[var(--border-strong)] hover:bg-[var(--surface-08)]'
                                            }`}>
                                            Start {plan.name}
                                            <ArrowRight className="w-4 h-4"/>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <p className="text-center text-sm text-slate-600 mt-8">
                                14 days free - then billed automatically - cancel anytime
                            </p>
                        </motion.div>

                        {/* GEO Automation section */}
                        <motion.div initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                                    className="mt-20">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="flex-1 h-px bg-[var(--border-subtle)]"/>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-semibold whitespace-nowrap">
                                    GEO Automation
                                </div>
                                <div className="flex-1 h-px bg-[var(--border-subtle)]"/>
                            </div>

                            <div className="text-center mb-10">
                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                                    Are you recommended by AI?
                                </h2>
                                <p className="text-slate-400 text-sm max-w-lg mx-auto mb-4">
                                    Automatically track whether Claude, ChatGPT, Gemini, Perplexity and Google AI Overview mention your domain for relevant queries - weekly and on demand.
                                </p>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] text-xs">
                                    <span className="text-[var(--accent)] font-semibold">Try free for 14 days</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 items-start">
                                {GEO_PLANS.map((plan, i) => (
                                    <motion.div key={plan.id}
                                        initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}}
                                        viewport={{once: true}} transition={{delay: i * 0.1}}
                                        className={`relative flex flex-col rounded-2xl p-6 sm:p-8 border transition-all duration-300 ${
                                            plan.highlight
                                                ? 'bg-[var(--accent-soft)] border-[var(--accent-border)] shadow-2xl shadow-[var(--accent-border)]'
                                                : 'bg-[var(--surface-06)] border-[var(--border-subtle)]'
                                        }`}>
                                        <div className="mb-5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{plan.name}</span>
                                            </div>
                                            <div className="flex items-baseline gap-1 mb-1">
                                                <span className="text-4xl sm:text-5xl font-bold text-white">{plan.price}</span>
                                                <span className="text-slate-400 text-lg">€</span>
                                            </div>
                                            <div className="text-sm text-slate-500 mb-3">per month, VAT incl.</div>
                                            <p className="text-sm text-slate-400">{plan.desc}</p>
                                        </div>
                                        <div className="space-y-3 mb-8 flex-1">
                                            {plan.features.map(f => (
                                                <div key={f} className="flex items-center gap-3 text-sm">
                                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-[var(--accent-soft-strong)]' : 'bg-[var(--surface-08)]'}`}>
                                                        <Check className={`w-2.5 h-2.5 ${plan.highlight ? 'text-[var(--accent)]' : 'text-slate-400'}`} strokeWidth={3}/>
                                                    </div>
                                                    <span className="text-slate-300">{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <Link href="/geo/pricing"
                                            className={`flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                                                plan.highlight
                                                    ? 'bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] shadow-lg shadow-[var(--accent-border)]'
                                                    : 'border border-[var(--border-subtle)] text-slate-300 hover:text-white hover:border-[var(--border-strong)] hover:bg-[var(--surface-08)]'
                                            }`}>
                                            Start {plan.name}
                                            <ArrowRight className="w-4 h-4"/>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <p className="text-center text-sm text-slate-600 mt-8">
                                14 days free - then billed automatically - cancel anytime
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    )
}
