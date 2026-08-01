'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ScoreRegisterModal from '../ScoreRegisterModal'

const plans = [
    {
        id: 'free', name: 'Free', price: '0', period: 'forever',
        desc: 'To try out AuditAI',
        features: ['1 audit per month', 'SEO score & analysis', 'GEO visibility', 'Performance metrics', 'Audit history'],
        cta: 'Start for free', highlight: false,
    },
    {
        id: 'pro', name: 'Pro', price: '29', period: 'per month',
        desc: 'For freelancers and small agencies',
        features: ['10 audits per month', 'Everything in Free', 'AI deep analysis', 'SEO, performance, keywords & GEO', 'Concrete fixes & prioritized action plan', 'Desktop + mobile screenshots', 'PDF export'],
        cta: 'Get Pro', highlight: true, badge: 'Most popular',
    },
    {
        id: 'agency', name: 'Agency', price: '99', period: 'per month',
        desc: 'For teams with multiple clients',
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
        if (isLoggedIn) router.push('/dashboard')
        else setModalOpen(true)
    }

    return (
        <>
        <ScoreRegisterModal open={modalOpen} onClose={() => setModalOpen(false)} locale="en" />
        <section id="pricing" className="relative py-16 md:py-28 bg-[#05080f] overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)' }} />
            <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mb-10 flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
                            <TrendingUp className="w-4 h-4 text-emerald-400" strokeWidth={1.8} />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-white">Track Google rankings automatically</div>
                            <div className="text-xs text-slate-500 mt-0.5">Weekly ranking updates, keyword ideas & competitor analysis - from €19/month</div>
                        </div>
                    </div>
                    <Link href="/seo/pricing"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/25 text-emerald-400 text-xs font-semibold transition-all duration-200 shrink-0 whitespace-nowrap">
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="mb-10 flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border border-violet-500/30 bg-violet-500/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
                            <TrendingUp className="w-4 h-4 text-emerald-400" strokeWidth={1.8} />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-white">Track AI visibility automatically</div>
                            <div className="text-xs text-slate-500 mt-0.5">Weekly updates, Claude + ChatGPT + Perplexity + Google AI Overview tracking, 2 prompt variants & mention history - from €4.99/month</div>
                        </div>
                    </div>
                    <Link href="/geo/pricing"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/25 text-emerald-400 text-xs font-semibold transition-all duration-200 shrink-0 whitespace-nowrap">
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-5">
                        Start for free.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Grow when you need to.</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-xl mx-auto">No hidden fees. Monthly subscription. Cancel anytime.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-start">
                    {plans.map((plan, i) => (
                        <motion.div key={plan.id}
                                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    className={`relative rounded-2xl p-5 sm:p-8 border transition-all duration-300 ${plan.highlight ? 'bg-gradient-to-b from-violet-600/10 to-transparent border-violet-500/30 shadow-2xl shadow-violet-500/10' : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10'}`}>
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full text-xs font-semibold text-white shadow-lg">
                                    {plan.badge}
                                </div>
                            )}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    {plan.highlight && <Zap className="w-4 h-4 text-violet-400" />}
                                    <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{plan.name}</span>
                                </div>
                                <div className="flex items-baseline gap-1 mb-1">
                                    <span className="text-4xl sm:text-5xl font-bold text-white">{plan.price}</span>
                                    <span className="text-slate-400 text-lg">€</span>
                                </div>
                                <div className="text-sm text-slate-500 mb-3">{plan.period}</div>
                                <p className="text-sm text-slate-400">{plan.desc}</p>
                            </div>
                            <div className="space-y-3 mb-8">
                                {plan.features.map(f => (
                                    <div key={f} className="flex items-center gap-3 text-sm">
                                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? 'bg-violet-500/20 text-violet-400' : 'bg-white/5 text-slate-400'}`}>
                                            <Check className="w-2.5 h-2.5" strokeWidth={3} />
                                        </div>
                                        <span className="text-slate-300">{f}</span>
                                    </div>
                                ))}
                            </div>
                            {plan.id === 'free' ? (
                                <button onClick={handleFreeCta}
                                    className="block w-full py-4 text-center text-sm font-semibold rounded-xl transition-all duration-200 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/5">
                                    {plan.cta}
                                </button>
                            ) : (
                                <Link href={plan.href || '/en/pricing'}
                                    className={`block w-full py-4 text-center text-sm font-semibold rounded-xl transition-all duration-200 ${plan.highlight ? 'bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white shadow-lg shadow-violet-500/20' : 'border border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/5'}`}>
                                    {plan.cta}
                                </Link>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
        </>
    )
}
