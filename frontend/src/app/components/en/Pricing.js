'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, TrendingUp, ArrowRight, Globe } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ScoreRegisterModal from '../ScoreRegisterModal'

const plans = [
    {
        id: 'free', name: 'Free', price: '0', period: 'forever',
        desc: 'To try out Scanora', persona: 'For beginners',
        features: ['1 audit per month', 'GEO visibility (AI Visibility)', 'SEO score & analysis', 'Performance metrics', 'Audit history'],
        cta: 'Check for free now', highlight: false,
    },
    {
        id: 'pro', name: 'Pro', price: '29', period: 'per month',
        desc: 'For freelancers and small agencies', persona: 'For in-house SEOs',
        features: ['10 audits per month', 'Everything in Free', 'AI deep analysis', 'GEO, SEO, performance & keywords', 'Concrete fixes & prioritized action plan', 'Desktop + mobile screenshots', 'PDF export'],
        cta: 'Get Pro', highlight: true, badge: 'Most popular',
    },
    {
        id: 'agency', name: 'Agency', price: '99', period: 'per month',
        desc: 'For teams with multiple clients', persona: 'For agencies',
        features: ['Unlimited audits', 'Everything in Pro', 'AI deep analysis', 'Priority support'],
        cta: 'Get Agency', highlight: false,
    },
]

export default function Pricing() {
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'))
    }, [])

    const handleFreeCta = () => {
        if (isLoggedIn) router.push('/en/dashboard')
        else setModalOpen(true)
    }

    return (
        <>
        <ScoreRegisterModal open={modalOpen} onClose={() => setModalOpen(false)} locale="en" />
        <section id="pricing" className="relative py-16 md:py-28 bg-(--bg-base) overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <span className="inline-block text-xs font-semibold text-(--accent-ink) mb-3">Website Audit</span>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-5">
                        Start for free.<br />Grow when you need to.
                    </h2>
                    <p className="text-lg text-(--text-muted) max-w-xl mx-auto">No hidden fees. Monthly subscription. Cancel anytime.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-start">
                    {plans.map((plan, i) => (
                        <motion.div key={plan.id}
                                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    className={`relative rounded-2xl p-5 sm:p-8 border transition-all duration-300 ${plan.highlight ? 'shadow-card bg-(--card) border-(--accent) ' : 'bg-(--card) border-(--line) hover:border-(--border-strong)'}`}>
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-(--accent) rounded-full text-xs font-semibold text-(--on-accent) ">
                                    {plan.badge}
                                </div>
                            )}
                            <div className="mb-6">
                                <span className="inline-block text-[11px] font-semibold text-(--accent-ink) bg-(--accent-soft) border border-(--accent-border) rounded-full px-2.5 py-1 mb-3">
                                    {plan.persona}
                                </span>
                                <div className="flex items-center gap-2 mb-2">
                                    {plan.highlight && <Zap className="w-4 h-4 text-(--accent-ink)" />}
                                    <span className="text-sm font-semibold text-(--text-muted) ">{plan.name}</span>
                                </div>
                                <div className="flex items-baseline gap-1 mb-1">
                                    <span className="text-4xl sm:text-5xl font-bold text-(--text-white)">{plan.price}</span>
                                    <span className="text-(--text-muted) text-lg">€</span>
                                </div>
                                <div className="text-sm text-(--text-faint) mb-3">{plan.period}</div>
                                <p className="text-sm text-(--text-muted)">{plan.desc}</p>
                            </div>
                            <div className="space-y-3 mb-8">
                                {plan.features.map(f => (
                                    <div key={f} className="flex items-center gap-3 text-sm">
                                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-(--accent-soft-strong) text-(--accent-ink)' : 'bg-(--surface-06) text-(--text-muted)'}`}>
                                            <Check className="w-2.5 h-2.5" strokeWidth={3} />
                                        </div>
                                        <span className="text-(--text-body)">{f}</span>
                                    </div>
                                ))}
                            </div>
                            {plan.id === 'free' ? (
                                <button onClick={handleFreeCta}
                                    className="block w-full py-4 text-center text-sm font-semibold rounded-xl transition-all duration-200 border border-(--border-strong) text-(--text-body) hover:text-(--text-white) hover:bg-(--surface-06)">
                                    {plan.cta}
                                </button>
                            ) : (
                                <Link href={plan.href || '/en/pricing'}
                                    className={`block w-full py-4 text-center text-sm font-semibold rounded-xl transition-all duration-200 ${plan.highlight ? 'bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) active:scale-[0.97] active:duration-75' : 'border border-(--border-strong) text-(--text-body) hover:text-(--on-accent) hover:bg-(--surface-06)'}`}>
                                    {plan.cta}
                                </Link>
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mt-10 grid sm:grid-cols-2 gap-3">
                    <div className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border border-(--line) bg-(--card)">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-(--accent-soft) border border-(--accent-border) flex items-center justify-center shrink-0">
                                <Globe className="w-4 h-4 text-(--accent-ink)" strokeWidth={1.8} />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-(--text-white)">Track AI Visibility</div>
                                <div className="text-xs text-(--text-faint) mt-0.5">ChatGPT, Claude, Gemini, Perplexity &amp; Google AI Overview - from €4.99/month</div>
                            </div>
                        </div>
                        <Link href="/geo/pricing" aria-label="Learn more about AI visibility tracking pricing"
                            className="flex items-center gap-1 text-(--text-body) hover:text-(--accent-ink) text-xs font-semibold transition-colors shrink-0 whitespace-nowrap">
                            Learn more <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border border-(--line) bg-(--card)">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-(--accent-soft) border border-(--accent-border) flex items-center justify-center shrink-0">
                                <TrendingUp className="w-4 h-4 text-(--accent-ink)" strokeWidth={1.8} />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-(--text-white)">Track SEO rankings</div>
                                <div className="text-xs text-(--text-faint) mt-0.5">Weekly updates &amp; competitor analysis - from €29.99/month</div>
                            </div>
                        </div>
                        <Link href="/seo/pricing" aria-label="Learn more about SEO ranking tracking pricing"
                            className="flex items-center gap-1 text-(--text-body) hover:text-(--accent-ink) text-xs font-semibold transition-colors shrink-0 whitespace-nowrap">
                            Learn more <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </motion.div>

                <p className="text-center text-sm text-(--text-faint) mt-8">
                    Not sure yet?{' '}
                    <Link href="/en/compare" className="text-(--text-body) hover:text-(--accent-ink) underline underline-offset-2">
                        Compare us with other tools
                    </Link>
                </p>
            </div>
        </section>
        </>
    )
}
