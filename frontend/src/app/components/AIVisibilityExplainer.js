'use client'
import { motion } from 'framer-motion'
import { Eye, Quote, Trophy, FileJson, Bot, FileText, ShieldCheck, Settings2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import PlatformBreakdown from './charts/PlatformBreakdown'

const STATS = [
    {
        value: '900 Mio.+',
        label: 'wöchentliche ChatGPT-Nutzer',
        sub: 'Immer mehr Menschen fragen nicht mehr Google — sie fragen eine KI.',
        source: { label: 'TechCrunch, Februar 2026 (OpenAI-Angaben)', url: 'https://techcrunch.com/2026/02/27/chatgpt-reaches-900m-weekly-active-users' },
    },
    {
        value: '~48%',
        label: 'aller Google-Suchanfragen zeigen eine AI Overview',
        sub: 'Die klassische blaue Linkliste ist immer öfter nicht mehr das Erste, was Nutzer sehen.',
        source: { label: 'Semrush Sensor-Daten, Juli 2026', url: 'https://www.semrush.com/blog/semrush-ai-overviews-study/' },
    },
]

const CONCEPTS = [
    {
        icon: Eye,
        title: 'Visibility (Mention-Rate)',
        desc: 'Wird deine Domain überhaupt erwähnt, wenn jemand ChatGPT, Claude, Perplexity oder Google AI Overview nach einer Empfehlung fragt? Die Mention-Rate zeigt dir das in Prozent — pro Keyword und Plattform.',
    },
    {
        icon: Quote,
        title: 'Zitierung & Kontext',
        desc: 'Es zählt nicht nur ob, sondern wie du genannt wirst. AuditAI zeigt dir den genauen Satz, in dem die KI dich erwähnt — und welche anderen Quellen sie daneben zitiert.',
    },
    {
        icon: Trophy,
        title: 'Share of Voice',
        desc: 'Wer wird sonst noch erwähnt? Die Konkurrenzansicht zeigt dir, wo du im Vergleich zu anderen Domains stehst — Domain für Domain, Plattform für Plattform.',
    },
]

const CHECK_GROUPS = [
    {
        icon: FileJson,
        title: 'Structured Data',
        checks: ['JSON-LD vorhanden (Schema.org)', 'Organization Schema', 'FAQ Schema für direkte KI-Zitate', 'WebSite / SoftwareApplication-Typ'],
    },
    {
        icon: Bot,
        title: 'KI-Indexierbarkeit',
        checks: ['llms.txt & llms-full.txt', 'KI-Crawler in robots.txt erlaubt', 'GPTBot, ClaudeBot, PerplexityBot u.a.', 'Vollständige sitemap.xml'],
    },
    {
        icon: FileText,
        title: 'Content-Qualität',
        checks: ['Klare Produktdefinition', 'Konkrete Zahlen & Statistiken', 'Mindestens 800 Wörter', 'Externe Quellenverweise'],
    },
    {
        icon: ShieldCheck,
        title: 'Vertrauen / E-E-A-T',
        checks: ['Autor- / About-Informationen', 'Kontaktinformationen', 'Datenschutz & Impressum'],
    },
    {
        icon: Settings2,
        title: 'Technisch',
        checks: ['HTTPS', 'Eindeutiger Canonical Tag', 'HTML lang-Attribut'],
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
                        Google ist nicht mehr die einzige Suchmaschine.
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                        Klassisches SEO optimiert für Google-Rankings: Keywords, Backlinks, technische Signale. KI-Modelle wie
                        ChatGPT, Claude, Perplexity und Google AI Overview suchen nach etwas anderem — strukturierten,
                        zitierbaren Inhalten und klaren Vertrauenssignalen. Eine Seite kann bei Google auf Platz 1 stehen
                        und für KI-Modelle trotzdem unsichtbar sein.
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
                                Quelle: {s.source.label} ↗
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
                        <h3 className="text-xl font-bold text-white mb-5">Was AuditAI misst</h3>
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
                        19 Signale, die AuditAI prüft
                    </h3>
                    <p className="text-slate-400 text-center text-sm mb-8 sm:mb-10 max-w-lg mx-auto leading-relaxed">
                        Alles, was darüber entscheidet, ob KI-Modelle deine Website als Quelle erkennen und zitieren.
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
                    <Link href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[var(--accent-border)]">
                        KI-Sichtbarkeit jetzt prüfen <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </motion.div>

            </div>
        </section>
    )
}
