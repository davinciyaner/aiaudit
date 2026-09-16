'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Globe } from 'lucide-react'
import Link from 'next/link'

// Mirrors LEAD_SOURCE_META in geo/[siteId]/page.js — kept in sync by hand since this is
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
    { email: 'm.schneider@brandwerk.de', source: 'ChatGPT', page: '/geo/dashboard', time: 'vor 4 Min.' },
    { email: 'contact@nordicgear.io', source: 'Perplexity', page: '/pricing', time: 'vor 22 Min.' },
    { email: 'j.lee@fintrail.co', source: 'Direkt', page: '/blog/was-ist-geo', time: 'vor 41 Min.' },
    { email: 'hello@studiomoss.com', source: 'ChatGPT', page: '/', time: 'vor 1 Std.' },
    { email: 'team@loopstack.ai', source: 'Claude', page: '/loesungen/seo-geo-tool', time: 'vor 2 Std.' },
    { email: 'info@driftlabs.de', source: 'Google (organisch)', page: '/blog/seo-checkliste-2026', time: 'vor 3 Std.' },
]

function LeadsCard() {
    return (
        <div
            className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-card hover-lift hover:shadow-card-hover hover:-translate-y-2 transition-all duration-200"
            role="img"
            aria-label="Beispiel des Leads-Dashboards: 230 KI-zugeordnete Leads, 17% Anteil an 1.340 Leads insgesamt, häufigste Quelle ChatGPT mit 62%, Aufschlüsselung nach Quelle und eine Lead-Tabelle"
        >
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md px-2.5 py-1 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Snippet aktiv · zuletzt gesehen vor 4 Min.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl p-4">
                    <div className="text-xs text-[var(--text-faint)] mb-1.5">KI-zugeordnete Leads</div>
                    <div className="text-2xl font-bold text-[var(--text-white)] tracking-tight">230</div>
                    <div className="text-[11px] text-[var(--text-faint)] mt-1">
                        <span className="text-emerald-400 font-semibold">+12 %</span> ggü. Vormonat · letzte 30 Tage
                    </div>
                </div>
                <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl p-4">
                    <div className="text-xs text-[var(--text-faint)] mb-1.5">Anteil an allen Leads</div>
                    <div className="text-2xl font-bold text-[var(--text-white)] tracking-tight">17%</div>
                    <div className="text-xs text-[var(--text-faint)] mt-0.5">von 1.340 Leads insgesamt</div>
                </div>
                <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl p-4">
                    <div className="text-xs text-[var(--text-faint)] mb-1.5">Häufigste Quelle</div>
                    <SourceChip source="ChatGPT" />
                    <div className="text-xs text-[var(--text-faint)] mt-1.5">62% aller KI-zugeordneten Leads</div>
                </div>
            </div>

            <div className="border border-[var(--border-subtle)] rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold text-[var(--text-white)] mb-3">Leads nach KI-Quelle · 30 Tage</p>
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
                                <th className="text-left text-[10px] font-semibold text-[var(--text-faint)] uppercase tracking-wider px-3 py-2.5">Quelle</th>
                                <th className="text-left text-[10px] font-semibold text-[var(--text-faint)] uppercase tracking-wider px-3 py-2.5 hidden sm:table-cell">Seite</th>
                                <th className="text-left text-[10px] font-semibold text-[var(--text-faint)] uppercase tracking-wider px-4 py-2.5">Zeit</th>
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
                            Weißt du, welcher Lead über ChatGPT kam?
                        </h2>
                        <p className="text-[var(--text-muted)] text-base leading-relaxed mb-8">
                            Ein kleines Snippet auf deiner eigenen Website erkennt, ob ein Besucher über ChatGPT,
                            Perplexity, Claude oder Gemini zu dir gefunden hat. Füllt er danach dein Formular aus,
                            ordnest du den Lead automatisch der richtigen KI-Quelle zu — statt zu raten, woher deine
                            besten Anfragen wirklich kommen.
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link href="/geo/pricing"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[var(--accent-border)] active:scale-[0.97] active:duration-75">
                                Leads jetzt tracken <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                            <Link href="/geo/dashboard"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--surface-06)] hover:bg-[var(--surface-10)] border border-[var(--border-subtle)] text-[var(--text-body)] hover:text-[var(--text-white)] text-sm font-semibold rounded-xl transition-all duration-200">
                                <Globe className="w-4 h-4 text-[var(--text-muted)]" />
                                Teil der GEO Automatisierung
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
                        <LeadsCard />
                        <p className="text-xs text-[var(--text-faint)] text-center mt-3">
                            Beispieldaten zur Veranschaulichung des Leads-Trackings — keine Angaben zu einer bestimmten Website.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
