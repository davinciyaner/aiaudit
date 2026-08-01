'use client'
import { motion } from 'framer-motion'
import { TrendingDown, AlertTriangle, RefreshCw, ArrowRight, Clock, BarChart2, ShieldOff } from 'lucide-react'
import Link from 'next/link'

const STATS = [
    {
        value: '27.6%',
        label: 'of all clicks go to position 1 on Google',
        sub: 'Page 2 practically doesn\'t exist for your customers.',
        color: '#ef4444',
        source: { label: 'Backlinko analysis of 4M Google search results', url: 'https://backlinko.com/google-ctr-stats' },
    },
    {
        value: '3,200+',
        label: 'changes to Google\'s search systems per year',
        sub: 'What worked yesterday might hurt you today.',
        color: '#f59e0b',
        source: { label: 'Google Search Central', url: 'https://developers.google.com/search/blog/2023/11/q-and-a-on-search-updates' },
    },
    {
        value: '53%',
        label: 'leave pages after 3 seconds',
        sub: 'Without an audit, you don\'t know if you\'re affected.',
        color: '#ef4444',
        source: { label: 'Google: "The Need for Mobile Speed"', url: 'https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/' },
    },
]

const DECAY_ITEMS = [
    {
        icon: TrendingDown,
        title: 'Rankings drop without warning',
        desc: 'Google makes thousands of changes to its search systems every year by its own account. Any change can shift your position — you get no notification.',
        color: '#ef4444',
    },
    {
        icon: ShieldOff,
        title: 'New pages go live with errors',
        desc: 'Every deploy can introduce missing meta descriptions or broken canonicals. It happens faster than you think.',
        color: '#f59e0b',
    },
    {
        icon: Clock,
        title: 'Competitors optimize — you stand still',
        desc: 'Your competitors check their pages regularly. Without monitoring, you lose positions even if you didn\'t do anything wrong yourself.',
        color: '#f59e0b',
    },
    {
        icon: BarChart2,
        title: 'Fixes without tracking are guesswork',
        desc: 'You optimize something and hope it helps. Without regular audits, you can\'t see whether your changes actually work.',
        color: '#6366f1',
    },
]

export default function WhyAudit() {
    return (
        <section className="relative py-16 md:py-28 bg-[#05080f] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-red-950/8 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight tracking-tight">
                        Your rankings decay.<br />
                        <span className="text-red-400">Every month.</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
                        Google keeps changing, so does your site — and every change can introduce new problems you can't see.
                    </p>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14 sm:mb-20">
                    {STATS.map((s, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-8">
                            <div className="text-4xl sm:text-5xl font-black shrink-0" style={{ color: s.color }}>{s.value}</div>
                            <div>
                                <div className="text-sm font-semibold text-white sm:mt-3 sm:mb-2 leading-snug">{s.label}</div>
                                <div className="text-xs text-slate-500 leading-relaxed mt-0.5">{s.sub}</div>
                                {s.source && (
                                    <a
                                        href={s.source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-[10px] text-slate-600 hover:text-slate-400 underline underline-offset-2 mt-2 transition-colors"
                                    >
                                        Source: {s.source.label} ↗
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* What goes wrong */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 sm:mb-20">
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
                                className="flex gap-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 sm:p-6">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ background: item.color + '15', border: `1px solid ${item.color}25` }}>
                                    <item.icon className="w-5 h-5" style={{ color: item.color }} strokeWidth={1.8} />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white mb-1.5">{item.title}</div>
                                    <div className="text-xs text-slate-500 leading-relaxed">{item.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Pro CTA */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="relative overflow-hidden rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-950/40 to-[#05080f] p-6 sm:p-10">
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
                        <div className="flex-1 text-center lg:text-left">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight">
                                While your competitors sleep,{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">you know exactly where you stand.</span>
                            </h3>
                            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 justify-center lg:justify-start">
                                {['10 audits / month', 'AI report', 'PDF export', 'Screenshots', 'Audit history'].map(f => (
                                    <div key={f} className="flex items-center gap-1.5 text-xs text-slate-400">
                                        <RefreshCw className="w-3 h-3 text-violet-400 shrink-0" /> {f}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-3 shrink-0 w-full lg:w-auto">
                            <div className="text-center">
                                <div className="text-4xl font-black text-white">€29</div>
                                <div className="text-xs text-slate-500 mt-1">per month · cancel anytime</div>
                            </div>
                            <Link href="/en/pricing"
                                className="flex items-center justify-center gap-2 w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/25 text-sm">
                                Get Pro now
                            </Link>
                            <Link href="/dashboard" className="text-xs text-slate-600 hover:text-slate-400 transition-colors py-1">
                                Try it for free first
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
