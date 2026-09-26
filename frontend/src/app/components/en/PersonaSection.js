'use client'
import { motion } from 'framer-motion'
import { Layers, Radar, Users2 } from 'lucide-react'

const PERSONAS = [
    {
        icon: Layers,
        title: 'In-house SEOs & content teams',
        pain: 'Rankings, content calendar, and now AI visibility too — across three separate tools.',
        solves: 'Scanora bundles SEO and GEO monitoring into one dashboard.',
    },
    {
        icon: Radar,
        title: 'SaaS growth teams',
        pain: 'You know how you rank on Google — but do you show up in ChatGPT answers too?',
        solves: 'Scanora shows both side by side, not separately.',
    },
    {
        icon: Users2,
        title: 'Agencies with multiple clients',
        pain: 'Billing one tool per client individually is a nightmare to manage.',
        solves: 'Modular per-client billing instead of one flat license.',
    },
]

export default function PersonaSection() {
    return (
        <section className="relative py-16 sm:py-24 bg-[var(--bg-base)] overflow-hidden">
            <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-10 sm:mb-14">
                    <span className="inline-block text-xs font-semibold text-[var(--accent)] uppercase tracking-wide mb-3">
                        Who is Scanora for?
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight text-balance">
                        Built for teams who don't want to track AI visibility and SEO separately
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {PERSONAS.map((p, i) => (
                        <motion.div key={p.title}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                            className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-card hover-lift hover:shadow-card-hover hover:-translate-y-2 transition-all duration-200">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[var(--accent-soft)] border border-[var(--accent-border)] mb-4">
                                <p.icon className="w-5 h-5 text-[var(--accent)]" strokeWidth={1.8} />
                            </div>
                            <h3 className="text-sm font-bold text-[var(--text-white)] mb-2">{p.title}</h3>
                            <p className="text-xs text-[var(--text-faint)] leading-relaxed mb-2">{p.pain}</p>
                            <p className="text-xs text-[var(--text-body)] font-medium leading-relaxed">{p.solves}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
