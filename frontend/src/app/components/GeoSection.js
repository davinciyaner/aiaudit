'use client'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

const CHECK_GROUPS = [
    {
        title: 'Structured Data',
        checks: [
            { label: 'JSON-LD vorhanden', detail: 'Schema.org Markup' },
            { label: 'Organization Schema', detail: 'Name, URL, Logo, Social-Links' },
            { label: 'FAQ Schema', detail: 'Direkte KI-Zitate ermöglichen' },
            { label: 'WebSite / SoftwareApplication', detail: 'Produkttyp für KI erkennbar' },
        ],
    },
    {
        title: 'KI-Indexierbarkeit',
        checks: [
            { label: 'llms.txt', detail: 'Wichtigste GEO-Datei überhaupt' },
            { label: 'llms-full.txt', detail: 'Erweiterter llms.txt-Standard' },
            { label: 'KI-Crawler in robots.txt', detail: 'GPTBot, ClaudeBot, PerplexityBot, anthropic-ai, YouBot u.a.' },
            { label: 'sitemap.xml', detail: 'Vollständige Indexierung durch KI' },
        ],
    },
    {
        title: 'Content-Qualität',
        checks: [
            { label: 'Klare Produktdefinition', detail: '"X is a tool that does Y"' },
            { label: 'Konkrete Zahlen & Statistiken', detail: 'KI zitiert Fakten, nicht Phrasen' },
            { label: 'Wortanzahl', detail: 'Mindestens 800 Wörter' },
            { label: 'Abschnittsstruktur', detail: 'Mindestens 3 H2-Überschriften' },
            { label: 'Externe Quellenverweise', detail: 'Links zu autoritären Quellen' },
        ],
    },
    {
        title: 'Vertrauen / E-E-A-T',
        checks: [
            { label: 'Autor / About-Informationen', detail: 'Expertise-Signale für KI' },
            { label: 'Kontaktinformationen', detail: 'Seriösität & Vertrauenswürdigkeit' },
            { label: 'Datenschutz & Impressum', detail: 'Grundlegende Trust-Signale' },
        ],
    },
    {
        title: 'Technisch',
        checks: [
            { label: 'HTTPS', detail: 'Grundvoraussetzung für KI-Empfehlungen' },
            { label: 'Canonical Tag', detail: 'Kanonische URL für KI-Crawler eindeutig' },
            { label: 'HTML lang-Attribut', detail: 'Sprachzuordnung für KI-Modelle' },
        ],
    },
]

const MOCK_RESULTS = [
    { label: 'llms.txt', ok: false, note: 'Nicht gefunden' },
    { label: 'Organization Schema', ok: true,  note: 'Vorhanden ✓' },
    { label: 'FAQ Schema', ok: false, note: 'Fehlt' },
    { label: 'GPTBot', ok: true,  note: 'Erlaubt ✓' },
    { label: 'ClaudeBot', ok: false, note: 'In robots.txt blockiert' },
    { label: 'sitemap.xml', ok: true,  note: 'Gefunden ✓' },
    { label: 'Produktdefinition', ok: false, note: 'Nicht klar erkennbar' },
    { label: 'Statistiken', ok: true,  note: 'Konkrete Zahlen ✓' },
]

export default function GeoSection() {
    return (
        <section id="geo" className="relative py-20 sm:py-28 bg-[#080b14] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)' }} />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1"
                    >
                        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                            <span className="text-sm font-semibold text-white">GEO / KI-Sichtbarkeit</span>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 font-semibold">Score: 41/100</span>
                        </div>
                        <div className="px-5 pt-3 pb-1">
                            <div className="flex gap-1.5 flex-wrap mb-3">
                                {['ChatGPT', 'Perplexity', 'Claude', 'Gemini', 'YouChat'].map(t => (
                                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-lg bg-white/[0.04] border border-white/8 text-slate-400">{t}</span>
                                ))}
                            </div>
                        </div>
                        <div className="px-5 pb-5 space-y-2.5">
                            {MOCK_RESULTS.map((r, i) => (
                                <div key={i} className="flex items-center justify-between gap-3 py-1.5 border-b border-white/[0.04] last:border-0">
                                    <div className="flex items-center gap-2.5">
                                        {r.ok
                                            ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                                            : <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                                        }
                                        <span className="text-sm text-slate-300">{r.label}</span>
                                    </div>
                                    <span className={`text-xs ${r.ok ? 'text-emerald-400' : 'text-red-400'}`}>{r.note}</span>
                                </div>
                            ))}
                        </div>
                        <div className="px-5 pb-4">
                            <div className="text-[11px] text-slate-600">19 Checks - AuditAI</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-1 lg:order-2"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-tight">
                            Wirst du von{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                                KI zitiert?
                            </span>
                        </h2>
                        <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
                            ChatGPT, Perplexity und Claude entscheiden täglich welche Websites sie empfehlen. AuditAI prüft alle 19 Signale die darüber bestimmen ob du in KI-Antworten auftauchst.
                        </p>
                        <div className="space-y-5 mb-8">
                            {CHECK_GROUPS.map((group, gi) => (
                                <div key={gi}>
                                    <div className="text-[11px] uppercase tracking-widest font-semibold text-cyan-500/70 mb-2">{group.title}</div>
                                    <ul className="space-y-1.5">
                                        {group.checks.map((c, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-[7px] shrink-0" />
                                                <span className="text-sm text-slate-300">
                                                    <span className="font-medium text-white">{c.label}</span>
                                                    <span className="text-slate-500"> - {c.detail}</span>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <Link href="/dashboard"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20">
                            GEO jetzt prüfen
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}