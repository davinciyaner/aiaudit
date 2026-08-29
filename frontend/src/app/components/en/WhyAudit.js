'use client'
import { motion } from 'framer-motion'
import { TrendingDown, ShieldOff, Clock, BarChart2 } from 'lucide-react'

const STATS = [
    {
        value: '27.6%',
        label: 'of all clicks go to position 1 on Google',
        sub: "Page 2 practically doesn't exist for your customers.",
        source: { label: 'Backlinko analysis of 4M Google search results', url: 'https://backlinko.com/google-ctr-stats' },
    },
    {
        value: '3,200+',
        label: "changes to Google's search systems per year",
        sub: 'What worked yesterday might hurt you today.',
        source: { label: 'Google Search Central', url: 'https://developers.google.com/search/blog/2023/11/q-and-a-on-search-updates' },
    },
    {
        value: '53%',
        label: 'leave pages after 3 seconds',
        sub: "Without an audit, you don't know if you're affected.",
        source: { label: 'Google: "The Need for Mobile Speed"', url: 'https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/' },
    },
]

const DECAY_ITEMS = [
    {
        icon: TrendingDown,
        title: 'Rankings drop without warning',
        desc: 'Google makes thousands of changes to its search systems every year by its own account. Any change can shift your position — you get no notification.',
    },
    {
        icon: ShieldOff,
        title: 'New pages go live with errors',
        desc: 'Every deploy can introduce missing meta descriptions or broken canonicals. It happens faster than you think.',
    },
    {
        icon: Clock,
        title: 'Competitors optimize — you stand still',
        desc: "Your competitors check their pages regularly. Without monitoring, you lose positions even if you didn't do anything wrong yourself.",
    },
    {
        icon: BarChart2,
        title: 'Fixes without tracking are guesswork',
        desc: "You optimize something and hope it helps. Without regular audits, you can't see whether your changes actually work.",
    },
]

export default function WhyAudit() {
    return (
        <section className="relative py-16 md:py-28 bg-[var(--bg-base)] overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight tracking-tight">
                        Your rankings decay. <span className="text-slate-500">Every month.</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
                        Google keeps changing, so does your site — and every change can introduce new problems you can't see.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14 sm:mb-20">
                    {STATS.map((s, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5 sm:p-8">
                            <div className="text-4xl sm:text-5xl font-black shrink-0 text-white">{s.value}</div>
                            <div>
                                <div className="text-sm font-semibold text-white sm:mt-3 sm:mb-2 leading-snug">{s.label}</div>
                                <div className="text-xs text-slate-500 leading-relaxed mt-0.5">{s.sub}</div>
                                <a href={s.source.url} target="_blank" rel="noopener noreferrer"
                                    className="block text-[10px] text-slate-400 hover:text-slate-300 underline underline-offset-2 mt-2 transition-colors">
                                    Source: {s.source.label} ↗
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-3 tracking-tight">
                        What happens if you don't check
                    </h3>
                    <p className="text-slate-400 text-center text-sm mb-8 sm:mb-10 max-w-lg mx-auto leading-relaxed">
                        Your website changes with every deploy, every piece of content, every update — not always for the better.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                        {DECAY_ITEMS.map((item, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                className="flex gap-4 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-4 sm:p-6">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[var(--accent-soft)] border border-[var(--accent-border)]">
                                    <item.icon className="w-5 h-5 text-[var(--accent)]" strokeWidth={1.8} />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white mb-1.5">{item.title}</div>
                                    <div className="text-xs text-slate-500 leading-relaxed">{item.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
