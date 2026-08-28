'use client'
import { motion } from 'framer-motion'
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
                        Your AI Visibility,<br className="hidden sm:block" /> measured, not guessed.
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        AuditAI tracks your AI Visibility on ChatGPT, Claude, Perplexity and Google AI Overview just as
                        precisely as your Google rankings — with clear trends instead of guesswork.
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
                    Example data illustrating AuditAI's tracking — not a results guarantee for any specific website.
                </p>
            </div>
        </section>
    )
}
