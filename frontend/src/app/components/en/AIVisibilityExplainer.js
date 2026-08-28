'use client'
import { motion } from 'framer-motion'
import { Eye, Quote, Trophy, FileJson, Bot, FileText, ShieldCheck, Settings2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import PlatformBreakdown from './charts/PlatformBreakdown'

const STATS = [
    {
        value: '900M+',
        label: 'weekly ChatGPT users',
        sub: "More and more people aren't asking Google anymore — they're asking an AI.",
        source: { label: 'TechCrunch, February 2026 (per OpenAI)', url: 'https://techcrunch.com/2026/02/27/chatgpt-reaches-900m-weekly-active-users' },
    },
    {
        value: '~48%',
        label: 'of Google searches now show an AI Overview',
        sub: "The classic list of blue links is increasingly not the first thing users see.",
        source: { label: 'Semrush Sensor data, July 2026', url: 'https://www.semrush.com/blog/semrush-ai-overviews-study/' },
    },
]

const CONCEPTS = [
    {
        icon: Eye,
        title: 'Visibility (Mention Rate)',
        desc: 'Does your domain get mentioned at all when someone asks ChatGPT, Claude, Perplexity or Google AI Overview for a recommendation? The mention rate shows you that in percent — per keyword and platform.',
    },
    {
        icon: Quote,
        title: 'Citation & Context',
        desc: "It's not just whether you're named that counts, but how. AuditAI shows you the exact sentence where the AI mentions you — and which other sources it cites alongside you.",
    },
    {
        icon: Trophy,
        title: 'Share of Voice',
        desc: 'Who else gets mentioned? The competitor view shows you where you stand compared to other domains — domain by domain, platform by platform.',
    },
]

const CHECK_GROUPS = [
    {
        icon: FileJson,
        title: 'Structured Data',
        checks: ['JSON-LD present (Schema.org)', 'Organization Schema', 'FAQ Schema for direct AI citations', 'WebSite / SoftwareApplication type'],
    },
    {
        icon: Bot,
        title: 'AI Indexability',
        checks: ['llms.txt & llms-full.txt', 'AI crawlers allowed in robots.txt', 'GPTBot, ClaudeBot, PerplexityBot etc.', 'Complete sitemap.xml'],
    },
    {
        icon: FileText,
        title: 'Content Quality',
        checks: ['Clear product definition', 'Concrete numbers & statistics', 'At least 800 words', 'External source links'],
    },
    {
        icon: ShieldCheck,
        title: 'Trust / E-E-A-T',
        checks: ['Author / About information', 'Contact information', 'Privacy policy & imprint'],
    },
    {
        icon: Settings2,
        title: 'Technical',
        checks: ['HTTPS', 'Unambiguous canonical tag', 'HTML lang attribute'],
    },
]

export default function AIVisibilityExplainer() {
    return (
        <section className="relative py-16 md:py-28 bg-[var(--bg-base)] overflow-hidden">
            <div className="absolute top-1/4 right-0 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)' }} />

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8">

                {/* Intro */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="max-w-3xl mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-5 leading-tight">
                        Google isn't the only search engine anymore.
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                        Classic SEO optimizes for Google rankings: keywords, backlinks, technical signals. AI models like
                        ChatGPT, Claude, Perplexity and Google AI Overview look for something different — structured,
                        citable content and clear trust signals. A page can rank #1 on Google and still be invisible
                        to AI models.
                    </p>
                </motion.div>

                {/* Stats */}
                <div className="grid sm:grid-cols-2 gap-4 mb-14 sm:mb-20">
                    {STATS.map((s, i) => (
                        <motion.div key={s.value}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8">
                            <div className="text-4xl sm:text-5xl font-black text-white mb-2">{s.value}</div>
                            <div className="text-sm font-semibold text-white mb-2 leading-snug">{s.label}</div>
                            <div className="text-xs text-slate-500 leading-relaxed">{s.sub}</div>
                            <a href={s.source.url} target="_blank" rel="noopener noreferrer"
                                className="block text-[10px] text-slate-400 hover:text-slate-300 underline underline-offset-2 mt-3 transition-colors">
                                Source: {s.source.label} ↗
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Chart + concepts */}
                <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start mb-16 sm:mb-24">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="lg:col-span-2">
                        <PlatformBreakdown />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="lg:col-span-3">
                        <h3 className="text-xl font-bold text-white mb-5">What AuditAI measures</h3>
                        <div className="space-y-4">
                            {CONCEPTS.map(c => (
                                <div key={c.title} className="flex gap-4">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-[var(--accent-soft)] border border-[var(--accent-border)]">
                                        <c.icon className="w-4 h-4 text-[var(--accent)]" strokeWidth={1.8} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-white mb-1">{c.title}</div>
                                        <div className="text-sm text-slate-400 leading-relaxed">{c.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Signal checklist */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-3 tracking-tight">
                        19 signals AuditAI checks
                    </h3>
                    <p className="text-slate-400 text-center text-sm mb-8 sm:mb-10 max-w-lg mx-auto leading-relaxed">
                        Everything that determines whether AI models recognize your website as a source and cite it.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {CHECK_GROUPS.map(g => (
                            <div key={g.title} className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 bg-[var(--accent-soft)] border border-[var(--accent-border)]">
                                    <g.icon className="w-4 h-4 text-[var(--accent)]" strokeWidth={1.8} />
                                </div>
                                <div className="text-sm font-semibold text-white mb-3">{g.title}</div>
                                <ul className="space-y-1.5">
                                    {g.checks.map(c => (
                                        <li key={c} className="text-xs text-slate-500 leading-relaxed flex items-start gap-1.5">
                                            <span className="w-1 h-1 rounded-full bg-slate-500 mt-1.5 shrink-0" />
                                            {c}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                    <Link href="/en/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[var(--accent-border)]">
                        Check AI Visibility now <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </motion.div>

            </div>
        </section>
    )
}
