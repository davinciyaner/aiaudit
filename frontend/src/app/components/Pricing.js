'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, TrendingUp, ArrowRight, Globe } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ScoreRegisterModal from './ScoreRegisterModal'

const plans = [
    {
        id: 'free', name: 'Free', price: '0', period: 'forever',
        desc: 'Zum Ausprobieren von AuditAI',
        features: ['1 Audit pro Monat', 'GEO-Sichtbarkeit (AI Visibility)', 'SEO-Score & Analyse', 'Performance-Metriken', 'Audit-Verlauf'],
        cta: 'Kostenlos starten', highlight: false,
    },
    {
        id: 'pro', name: 'Pro', price: '29', period: 'pro Monat',
        desc: 'Für Freelancer und kleine Agenturen',
        features: ['10 Audits pro Monat', 'Alles aus Free', 'KI-Tiefenanalyse', 'GEO, SEO, Performance & Keywords', 'Konkrete Fixes & priorisierter Action Plan', 'Desktop + Mobile Screenshots', 'PDF-Export'],
        cta: 'Pro holen', highlight: true, badge: 'Beliebteste',
    },
    {
        id: 'agency', name: 'Agency', price: '99', period: 'pro Monat',
        desc: 'Für Teams mit mehreren Kunden',
        features: ['Unbegrenzte Audits', 'Alles aus Pro', 'KI-Tiefenanalyse', 'Priorität-Support'],
        cta: 'Agency holen', highlight: false,
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
        <ScoreRegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
        <section id="pricing" className="relative py-16 md:py-28 bg-[var(--bg-base)] overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)' }} />
            <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mb-10 grid sm:grid-cols-2 gap-3">
                    <div className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-06)]">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center shrink-0">
                                <Globe className="w-4 h-4 text-[var(--accent)]" strokeWidth={1.8} />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-white">KI-Sichtbarkeit (AI Visibility) tracken</div>
                                <div className="text-xs text-slate-500 mt-0.5">ChatGPT, Claude, Gemini, Perplexity &amp; Google AI Overview — ab 4,99€/Monat</div>
                            </div>
                        </div>
                        <Link href="/geo/pricing"
                            className="flex items-center gap-1 text-slate-300 hover:text-[var(--accent)] text-xs font-semibold transition-colors shrink-0 whitespace-nowrap">
                            Mehr <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-06)]">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center shrink-0">
                                <TrendingUp className="w-4 h-4 text-[var(--accent)]" strokeWidth={1.8} />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-white">SEO-Rankings tracken</div>
                                <div className="text-xs text-slate-500 mt-0.5">Wöchentliche Updates &amp; Konkurrenzanalyse — ab 19€/Monat</div>
                            </div>
                        </div>
                        <Link href="/seo/pricing"
                            className="flex items-center gap-1 text-slate-300 hover:text-[var(--accent)] text-xs font-semibold transition-colors shrink-0 whitespace-nowrap">
                            Mehr <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-5">
                        Kostenlos starten.<br />Wachsen wenn nötig.
                    </h2>
                    <p className="text-lg text-slate-400 max-w-xl mx-auto">Keine versteckten Gebühren. Monatliches Abo. Jederzeit kündbar.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-start">
                    {plans.map((plan, i) => (
                        <motion.div key={plan.id}
                                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    className={`relative rounded-2xl p-5 sm:p-8 border transition-all duration-300 ${plan.highlight ? 'bg-[var(--accent-soft)] border-[var(--accent-border)] shadow-2xl shadow-[var(--accent-border)]' : 'bg-[var(--surface-06)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]'}`}>
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--accent)] rounded-full text-xs font-semibold text-[var(--bg-base)] shadow-lg">
                                    {plan.badge}
                                </div>
                            )}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    {plan.highlight && <Zap className="w-4 h-4 text-[var(--accent)]" />}
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
                                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? 'bg-[var(--accent-soft-strong)] text-[var(--accent)]' : 'bg-[var(--surface-06)] text-slate-400'}`}>
                                            <Check className="w-2.5 h-2.5" strokeWidth={3} />
                                        </div>
                                        <span className="text-slate-300">{f}</span>
                                    </div>
                                ))}
                            </div>
                            {plan.id === 'free' ? (
                                <button onClick={handleFreeCta}
                                    className="block w-full py-4 text-center text-sm font-semibold rounded-xl transition-all duration-200 border border-[var(--border-strong)] text-slate-300 hover:text-white hover:border-[var(--border-strong)] hover:bg-[var(--surface-06)]">
                                    {plan.cta}
                                </button>
                            ) : (
                                <Link href={plan.href || '/pricing'}
                                    className={`block w-full py-4 text-center text-sm font-semibold rounded-xl transition-all duration-200 ${plan.highlight ? 'bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] shadow-lg shadow-[var(--accent-border)]' : 'border border-[var(--border-strong)] text-slate-300 hover:text-white hover:bg-[var(--surface-06)]'}`}>
                                    {plan.cta}
                                </Link>
                            )}
                        </motion.div>
                    ))}
                </div>

                <p className="text-center text-sm text-slate-500 mt-8">
                    Vergleichst du gerade Tools?{' '}
                    <Link href="/vergleich/otterly-alternative" className="text-slate-300 hover:text-[var(--accent)] underline underline-offset-2">
                        AuditAI vs. Otterly.ai
                    </Link>
                </p>
            </div>
        </section>
        </>
    )
}