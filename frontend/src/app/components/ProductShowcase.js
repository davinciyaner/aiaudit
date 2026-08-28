'use client'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, TrendingUp, Globe, ArrowRight, Link2, Cpu, FileCheck2 } from 'lucide-react'
import Link from 'next/link'

const STEPS = [
    { icon: Link2, title: 'URL eingeben', desc: 'Ohne Anmeldung starten.' },
    { icon: Cpu, title: 'Automatisch analysieren', desc: 'KI-Sichtbarkeit & SEO in ~60 Sekunden.' },
    { icon: FileCheck2, title: 'Fixes umsetzen', desc: 'Priorisierter Report statt roher Zahlen.' },
]

const SEO_RESULTS = [
    { label: 'Title-Tag', ok: true, note: '52 Zeichen ✓' },
    { label: 'Meta-Description', ok: false, note: 'Fehlt auf 3 Seiten' },
    { label: 'H1-Tag', ok: true, note: 'Vorhanden & keyword-reich ✓' },
    { label: 'Bild-Alt-Texte', ok: false, note: '8 Bilder ohne Alt-Text' },
    { label: 'Canonical Tag', ok: true, note: 'Korrekt gesetzt ✓' },
    { label: 'Wortanzahl', ok: false, note: '180 Wörter (min. 300)' },
]

const GEO_RESULTS = [
    { label: 'llms.txt', ok: false, note: 'Nicht gefunden' },
    { label: 'Organization Schema', ok: true, note: 'Vorhanden ✓' },
    { label: 'FAQ Schema', ok: false, note: 'Fehlt' },
    { label: 'GPTBot erlaubt', ok: true, note: 'Erlaubt ✓' },
    { label: 'ClaudeBot erlaubt', ok: false, note: 'In robots.txt blockiert' },
    { label: 'Produktdefinition', ok: false, note: 'Nicht klar erkennbar' },
]

function ResultCard({ title, score, checksLabel, results }) {
    return (
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
            <div className="px-5 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
                <span className="text-sm font-semibold text-white">{title}</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-semibold">{score}</span>
            </div>
            <div className="p-5 space-y-2.5">
                {results.map((r, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 py-1.5 border-b border-[var(--border-subtle)] last:border-0">
                        <div className="flex items-center gap-2.5">
                            {r.ok
                                ? <CheckCircle className="w-4 h-4 text-[var(--accent)] shrink-0" />
                                : <XCircle className="w-4 h-4 text-slate-500 shrink-0" />
                            }
                            <span className="text-sm text-slate-300">{r.label}</span>
                        </div>
                        <span className={`text-xs ${r.ok ? 'text-[var(--accent)]' : 'text-slate-500'}`}>{r.note}</span>
                    </div>
                ))}
            </div>
            <div className="px-5 pb-4 pt-1">
                <div className="text-[11px] text-slate-400">{checksLabel}</div>
            </div>
        </div>
    )
}

export default function ProductShowcase() {
    return (
        <section className="relative py-16 sm:py-28 bg-[var(--bg-surface)] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

                {/* How it works */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="grid sm:grid-cols-3 gap-4 mb-20 sm:mb-28">
                    {STEPS.map((s, i) => (
                        <div key={s.title} className="flex items-start gap-4">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-[var(--surface-08)] border border-[var(--border-subtle)] text-xs font-bold text-slate-400">
                                {i + 1}
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-white mb-0.5">{s.title}</div>
                                <div className="text-xs text-slate-500 leading-relaxed">{s.desc}</div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* GEO / AI Visibility */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 sm:mb-32">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5 leading-tight">
                            Wirst du von KI zitiert?
                        </h2>
                        <p className="text-slate-400 text-base leading-relaxed mb-8">
                            ChatGPT, Perplexity und Claude entscheiden täglich, welche Websites sie empfehlen. AuditAI prüft
                            llms.txt, Schema.org, FAQ-Markup und KI-Crawler-Erlaubnis — die Signale, die darüber entscheiden,
                            ob du in KI-Antworten auftauchst.
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link href="/dashboard"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[var(--accent-border)]">
                                KI-Sichtbarkeit jetzt prüfen <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                            <Link href="/geo/pricing"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--surface-06)] hover:bg-[var(--surface-10)] border border-[var(--border-subtle)] text-slate-300 hover:text-white text-sm font-semibold rounded-xl transition-all duration-200">
                                <Globe className="w-4 h-4 text-slate-400" />
                                Wöchentlich automatisch tracken
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
                        <ResultCard title="GEO / KI-Sichtbarkeit" score="Score: 41/100" checksLabel="19 Checks · AuditAI" results={GEO_RESULTS} />
                    </motion.div>
                </div>

                {/* SEO */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                        className="order-2 lg:order-1">
                        <ResultCard title="SEO-Analyse" score="Score: 64/100" checksLabel="14 Checks · 12 Seiten analysiert · AuditAI" results={SEO_RESULTS} />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        className="order-1 lg:order-2">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5 leading-tight">
                            Jeder Fehler kostet Rankings.
                        </h2>
                        <p className="text-slate-400 text-base leading-relaxed mb-8">
                            AuditAI crawlt deine Website bis zu 25 Seiten tief und prüft Title-Tags, Meta-Descriptions,
                            Überschriften, interne Links und strukturierte Daten — nicht nur die Startseite.
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link href="/dashboard"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[var(--accent-border)]">
                                SEO jetzt prüfen <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                            <Link href="/seo/pricing"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--surface-06)] hover:bg-[var(--surface-10)] border border-[var(--border-subtle)] text-slate-300 hover:text-white text-sm font-semibold rounded-xl transition-all duration-200">
                                <TrendingUp className="w-4 h-4 text-slate-400" />
                                Wöchentlich automatisch tracken
                            </Link>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    )
}
