'use client'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const CHECKS = [
    { label: 'Title-Tag', detail: '30–60 Zeichen, Keyword-Relevanz' },
    { label: 'Meta-Description', detail: '120–160 Zeichen, unique pro Seite' },
    { label: 'H1-Tag', detail: 'Genau 1 pro Seite, keyword-reich' },
    { label: 'H2-Tags', detail: 'Mindestens 1 Unterüberschrift' },
    { label: 'Bild-Alt-Texte', detail: 'Alle Bilder mit beschreibendem Alt-Text' },
    { label: 'Canonical Tag', detail: 'Duplicate-Content-Schutz' },
    { label: 'Open Graph Tags', detail: 'og:title, og:description, og:image' },
    { label: 'Twitter Card', detail: 'Vorschau für X / Twitter' },
    { label: 'Structured Data (JSON-LD)', detail: 'Schema.org Markup vorhanden' },
    { label: 'Robots Meta Tag', detail: 'Kein versehentliches noindex' },
    { label: 'Viewport Meta Tag', detail: 'Mobile-Optimierung' },
    { label: 'HTML lang-Attribut', detail: 'Sprachkennung für Crawler' },
    { label: 'Interne Links', detail: 'Linkstruktur & Crawlbarkeit' },
    { label: 'Wortanzahl', detail: 'Mindestens 300 Wörter pro Seite' },
]

const MOCK_RESULTS = [
    { label: 'Title-Tag', ok: true,  note: '52 Zeichen ✓' },
    { label: 'Meta-Description', ok: false, note: 'Fehlt auf 3 Seiten' },
    { label: 'H1-Tag', ok: true,  note: 'Vorhanden & keyword-reich ✓' },
    { label: 'Bild-Alt-Texte', ok: false, note: '8 Bilder ohne Alt-Text' },
    { label: 'Canonical Tag', ok: true,  note: 'Korrekt gesetzt ✓' },
    { label: 'Open Graph', ok: false, note: 'og:image fehlt' },
    { label: 'Robots Meta', ok: true,  note: 'Kein noindex ✓' },
    { label: 'Wortanzahl', ok: false, note: '180 Wörter (min. 300)' },
]

export default function SeoSection() {
    return (
        <section id="seo" className="relative py-20 sm:py-28 bg-[#05080f]">
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <div className="absolute top-0 left-0 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)' }} />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-tight">
                            Jeder Fehler kostet{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                                Rankings.
                            </span>
                        </h2>
                        <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
                            AuditAI crawlt deine gesamte Website bis zu 25 Seiten tief und prüft jeden On-Page-Faktor - nicht nur die Startseite.
                        </p>
                        <ul className="space-y-2.5 mb-8">
                            {CHECKS.map((c, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-[7px] shrink-0" />
                                    <span className="text-sm text-slate-300">
                                        <span className="font-medium text-white">{c.label}</span>
                                        <span className="text-slate-500"> - {c.detail}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link href="/dashboard"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20">
                                SEO jetzt prüfen
                            </Link>
                            <Link href="/seo/pricing"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-sm font-semibold rounded-xl transition-all duration-200">
                                <TrendingUp className="w-4 h-4 text-emerald-400" />
                                Wöchentlich automatisch tracken
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                            <span className="text-sm font-semibold text-white">SEO-Analyse</span>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-violet-500/15 text-violet-300 font-semibold">Score: 64/100</span>
                        </div>
                        <div className="p-5 space-y-2.5">
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
                        <div className="px-5 pb-4 pt-1">
                            <div className="text-[11px] text-slate-600">14 Checks - 12 Seiten analysiert - AuditAI</div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}