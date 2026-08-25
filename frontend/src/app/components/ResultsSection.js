'use client'
import { motion } from 'framer-motion'
import VisibilityTrendChart from './charts/VisibilityTrendChart'
import RankingBars from './charts/RankingBars'
import ScoreGauges from './charts/ScoreGauges'

export default function ResultsSection() {
    return (
        <section className="relative py-16 sm:py-24 bg-[var(--bg-base)] overflow-hidden">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)' }} />

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-10 sm:mb-14">
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
                        Deine <span className="text-gradient-accent">KI-Sichtbarkeit (AI Visibility)</span>,<br className="hidden sm:block" /> messbar statt geraten.
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        AuditAI trackt deine AI Visibility bei ChatGPT, Claude, Perplexity und Google AI Overview genauso
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

                <p className="text-center text-xs text-slate-400 mt-6">
                    Beispieldaten zur Veranschaulichung des AuditAI-Trackings — kein Ergebnisversprechen für eine bestimmte Website.
                </p>
            </div>
        </section>
    )
}
