'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const CHECKS = [
    { label: 'Time to First Byte (TTFB)', detail: 'Server-Antwortzeit, Ziel: < 600ms' },
    { label: 'First Contentful Paint (FCP)', detail: 'Erster sichtbarer Inhalt, Ziel: < 1.800ms' },
    { label: 'DOM Load Time', detail: 'HTML vollständig geladen, Ziel: < 3.000ms' },
    { label: 'Full Load Time', detail: 'Alle Ressourcen geladen, Ziel: < 5.000ms' },
    { label: 'Große Ressourcen (> 500 KB)', detail: 'Bilder, JS, CSS — einzeln aufgelistet' },
    { label: 'Gesamtgröße der Seite', detail: 'Ziel: unter 3 MB' },
    { label: 'Anzahl Bilder', detail: 'Lazy Loading bei mehr als 30 Bildern' },
]

const METRICS = [
    { label: 'TTFB',       value: '680ms', status: 'warn', bar: 55, threshold: 'Ziel < 600ms' },
    { label: 'FCP',        value: '2.4s',  status: 'warn', bar: 68, threshold: 'Ziel < 1.8s'  },
    { label: 'DOM Load',   value: '1.1s',  status: 'ok',   bar: 28, threshold: 'Ziel < 3.0s'  },
    { label: 'Full Load',  value: '4.8s',  status: 'bad',  bar: 85, threshold: 'Ziel < 5.0s'  },
    { label: 'Seitengröße',value: '3.2 MB',status: 'bad',  bar: 80, threshold: 'Ziel < 3.0 MB'},
    { label: 'Ressourcen', value: '87',    status: 'warn', bar: 60, threshold: 'Anzahl Requests'},
]

const STATUS_COLORS = {
    ok:   '#22c55e',
    warn: '#f59e0b',
    bad:  '#ef4444',
}

export default function PerformanceSection() {
    return (
        <section id="performance" className="relative py-20 sm:py-28 bg-[#080b14] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)' }} />

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
                            <span className="text-sm font-semibold text-white">Performance-Analyse</span>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 font-semibold">Score: 52/100</span>
                        </div>
                        <div className="p-5 space-y-4">
                            {METRICS.map((m, i) => (
                                <div key={i}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-sm text-slate-300">{m.label}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-slate-600">{m.threshold}</span>
                                            <span className="text-sm font-mono font-semibold tabular-nums" style={{ color: STATUS_COLORS[m.status] }}>{m.value}</span>
                                        </div>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{ background: STATUS_COLORS[m.status] }}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${m.bar}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="px-5 pb-4">
                            <div className="text-[11px] text-slate-600">Echtzeit-Messung - AuditAI</div>
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
                            Über 50 % verlassen deine Seite{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                                nach 3 Sekunden.
                            </span>
                        </h2>
                        <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
                            AuditAI misst alle Ladezeit-Metriken direkt im echten Browser - keine Simulation. Du siehst genau welche Ressourcen deinen Score ruinieren.
                        </p>
                        <ul className="space-y-2.5 mb-8">
                            {CHECKS.map((c, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-[7px] shrink-0" />
                                    <span className="text-sm text-slate-300">
                                        <span className="font-medium text-white">{c.label}</span>
                                        <span className="text-slate-500"> - {c.detail}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className="mb-8 p-4 rounded-xl bg-white/[0.03] border border-white/8">
                            <div className="text-[11px] uppercase tracking-widest font-semibold text-amber-500/70 mb-2">Zusätzlich: Ressourcen-Analyse</div>
                            <ul className="space-y-1.5">
                                {[
                                    'Ressourcen nach Typ (Bilder, JS, CSS, Fonts)',
                                    'Top 5 größte Dateien mit Name & Größe',
                                    'Top 5 langsamste Requests (> 1.000ms)',
                                ].map((t, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                                        <span className="w-1 h-1 rounded-full bg-amber-400/50 mt-2 shrink-0" />
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link href="/dashboard"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/20">
                            Performance jetzt prüfen
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}