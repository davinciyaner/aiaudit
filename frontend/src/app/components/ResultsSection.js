'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileDown, ArrowRight } from 'lucide-react'
import VisibilityTrendChart from './charts/VisibilityTrendChart'
import RankingBars from './charts/RankingBars'
import ScoreGauges from './charts/ScoreGauges'

export default function ResultsSection() {
    return (
        <section className="relative py-16 sm:py-24 bg-[var(--bg-base)] overflow-hidden">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)' }} />

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-10 sm:mb-14">
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
                        Deine AI Visibility,<br className="hidden sm:block" /> messbar statt geraten.
                    </h2>
                    <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        Scanora trackt deine AI Visibility bei ChatGPT, Claude, Perplexity und Google AI Overview genauso
                        präzise wie deine Google-Rankings — mit klaren Trends statt Bauchgefühl.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-4 mb-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="lg:col-span-3">
                        <VisibilityTrendChart />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="lg:col-span-2">
                        <ScoreGauges />
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                    <RankingBars />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                    className="mt-8">
                    <Link href="/beispiel-report"
                        onClick={() => { if (typeof window.gtag === 'function') window.gtag('event', 'sample_report_click') }}
                        className="group relative flex flex-col sm:flex-row items-center justify-between gap-5 overflow-hidden rounded-2xl border border-[var(--accent-border)] bg-[var(--surface-08)] px-6 py-6 sm:px-8 sm:py-7 transition-colors duration-200 hover:border-[var(--accent)]">
                        <div className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                            style={{ background: 'radial-gradient(circle at 15% 50%, var(--accent-glow) 0%, transparent 60%)' }} />
                        <div className="relative flex items-center gap-4 text-center sm:text-left">
                            <div className="hidden sm:flex shrink-0 w-11 h-11 rounded-xl bg-[var(--accent)] items-center justify-center">
                                <FileDown className="w-5 h-5 text-[var(--bg-base)]" />
                            </div>
                            <div>
                                <p className="font-semibold text-[var(--text-white)]">Neugierig, wie ein echter Report aussieht?</p>
                                <p className="text-sm text-[var(--text-muted)]">Kostenloser Download – kompletter Scanora-Audit deiner eigenen Website</p>
                            </div>
                        </div>
                        <span className="relative inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--accent)] text-[var(--bg-base)] text-sm font-semibold shadow-lg shadow-[var(--accent-border)] transition-all group-hover:opacity-90 shrink-0">
                            Beispiel-Report ansehen
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                    </Link>
                </motion.div>

                <p className="text-center text-xs text-[var(--text-muted)] mt-4">
                    Beispieldaten zur Veranschaulichung des Scanora-Trackings — kein Ergebnisversprechen für eine bestimmte Website.
                </p>
            </div>
        </section>
    )
}
