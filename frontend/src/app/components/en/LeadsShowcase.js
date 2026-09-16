'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Globe } from 'lucide-react'
import Link from 'next/link'

// Mirrors LEAD_SOURCE_META in en/geo/[siteId]/page.js — kept in sync by hand since this is
// static marketing copy, not live data.
const SOURCE_CHIP = {
    ChatGPT:    'text-green-400 bg-green-500/10 border-green-500/20',
    Perplexity: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    Claude:     'text-violet-400 bg-violet-500/10 border-violet-500/20',
    Gemini:     'text-amber-400 bg-amber-500/10 border-amber-500/20',
}
const NEUTRAL_CHIP = 'text-[var(--text-faint)] bg-[var(--surface-08)] border-[var(--border-subtle)]'

function SourceChip({ source }) {
    const cls = SOURCE_CHIP[source] || NEUTRAL_CHIP
    return <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md border ${cls}`}>{source}</span>
}

const BREAKDOWN = [
    { source: 'ChatGPT', count: 142, pct: 62, bar: 'bg-green-500' },
    { source: 'Perplexity', count: 58, pct: 25, bar: 'bg-teal-500' },
    { source: 'Claude', count: 21, pct: 9, bar: 'bg-violet-500' },
    { source: 'Gemini', count: 9, pct: 4, bar: 'bg-amber-500' },
]
const maxCount = Math.max(...BREAKDOWN.map(b => b.count))

const LEADS = [
    { email: 'm.schneider@brandwerk.de', source: 'ChatGPT', page: '/geo/dashboard', time: '4 min ago' },
    { email: 'contact@nordicgear.io', source: 'Perplexity', page: '/pricing', time: '22 min ago' },
    { email: 'j.lee@fintrail.co', source: 'Direct', page: '/blog/what-is-geo', time: '41 min ago' },
    { email: 'hello@studiomoss.com', source: 'ChatGPT', page: '/', time: '1 hr ago' },
    { email: 'team@loopstack.ai', source: 'Claude', page: '/solutions/seo-geo-tool', time: '2 hrs ago' },
    { email: 'info@driftlabs.de', source: 'Google (organic)', page: '/blog/seo-checklist-2026', time: '3 hrs ago' },
]

function LeadsCard() {
    return (
        <div
            className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-card hover-lift hover:shadow-card-hover hover:-translate-y-2 transition-all duration-200"
            role="img"
            aria-label="Example of the leads dashboard: 230 AI-attributed leads, 17% share of 1,340 leads total, top source ChatGPT at 62%, a breakdown by source, and a leads table"
        >
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md px-2.5 py-1 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Snippet active · last seen 4 min ago
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl p-4">
                    <div className="text-xs text-[var(--text-faint)] mb-1.5">AI-attributed leads</div>
                    <div className="text-2xl font-bold text-[var(--text-white)] tracking-tight">230</div>
                    <div className="text-[11px] text-[var(--text-faint)] mt-1">
                        <span className="text-emerald-400 font-semibold">+12%</span> vs. last month · last 30 days
                    </div>
                </div>
                <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl p-4">
                    <div className="text-xs text-[var(--text-faint)] mb-1.5">Share of all leads</div>
                    <div className="text-2xl font-bold text-[var(--text-white)] tracking-tight">17%</div>
                    <div className="text-xs text-[var(--text-faint)] mt-0.5">of 1,340 leads total</div>
                </div>
                <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl p-4">
                    <div className="text-xs text-[var(--text-faint)] mb-1.5">Top source</div>
                    <SourceChip source="ChatGPT" />
                    <div className="text-xs text-[var(--text-faint)] mt-1.5">62% of AI-attributed leads</div>
                </div>
            </div>

            <div className="border border-[var(--border-subtle)] rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold text-[var(--text-white)] mb-3">Leads by AI source · 30 days</p>
                <div className="space-y-2.5">
                    {BREAKDOWN.map(b => (
                        <div key={b.source}>
                            <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-[var(--text-body)]">{b.source}</span>
                                <span className="text-[var(--text-faint)]">{b.count} · {b.pct}%</span>
                            </div>
                            <div className="relative h-2 bg-[var(--surface-08)] rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${b.bar}`} style={{ width: `${Math.max((b.count / maxCount) * 100, 3)}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border border-[var(--border-subtle)] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[460px]">
                        <thead>
                            <tr className="border-b border-[var(--border-subtle)]">
                                <th className="text-left text-[10px] font-semibold text-[var(--text-faint)] uppercase tracking-wider px-4 py-2.5">Lead</th>
                                <th className="text-left text-[10px] font-semibold text-[var(--text-faint)] uppercase tracking-wider px-3 py-2.5">Source</th>
                                <th className="text-left text-[10px] font-semibold text-[var(--text-faint)] uppercase tracking-wider px-3 py-2.5 hidden sm:table-cell">Page</th>
                                <th className="text-left text-[10px] font-semibold text-[var(--text-faint)] uppercase tracking-wider px-4 py-2.5">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {LEADS.map(lead => (
                                <tr key={lead.email} className="border-b border-[var(--border-subtle)] last:border-0">
                                    <td className="px-4 py-2.5 text-sm text-[var(--text-body)] whitespace-nowrap">{lead.email}</td>
                                    <td className="px-3 py-2.5"><SourceChip source={lead.source} /></td>
                                    <td className="px-3 py-2.5 text-xs text-[var(--text-faint)] hidden sm:table-cell">{lead.page}</td>
                                    <td className="px-4 py-2.5 text-xs text-[var(--text-faint)] whitespace-nowrap">{lead.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default function LeadsShowcase() {
    return (
        <section className="relative py-16 sm:py-24 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
                <div className="grid lg:grid-cols-[0.9fr_1.4fr] gap-12 lg:gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5 leading-tight">
                            Do you know which lead came from ChatGPT?
                        </h2>
                        <p className="text-[var(--text-muted)] text-base leading-relaxed mb-8">
                            A small snippet on your own website detects whether a visitor found you via ChatGPT,
                            Perplexity, Claude, or Gemini. If they then submit your form, the lead gets automatically
                            attributed to the right AI source — instead of guessing where your best inquiries
                            actually come from.
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link href="/en/geo/pricing"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[var(--accent-border)] active:scale-[0.97] active:duration-75">
                                Track leads now <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                            <Link href="/en/geo/dashboard"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--surface-06)] hover:bg-[var(--surface-10)] border border-[var(--border-subtle)] text-[var(--text-body)] hover:text-[var(--text-white)] text-sm font-semibold rounded-xl transition-all duration-200">
                                <Globe className="w-4 h-4 text-[var(--text-muted)]" />
                                Part of GEO Automation
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
                        <LeadsCard />
                        <p className="text-xs text-[var(--text-faint)] text-center mt-3">
                            Example data to illustrate lead tracking — not a statement about any specific website.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
