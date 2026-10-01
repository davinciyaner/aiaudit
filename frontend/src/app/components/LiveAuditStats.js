'use client'
import { motion } from 'framer-motion'

// Werte manuell aus der Report-Collection aggregiert (siehe backend/models/report_model.js,
// Feld auditData.{overallScore,seo.score,performance.score,geo.score}) - kein Live-Endpoint,
// da sich die Zahlen bei dieser Nutzerzahl noch selten sinnvoll ändern. Bei Aktualisierung
// auch das Datum in der Fußzeile unten anpassen.
const GEO_SCORE = 58

const STAT_ROW = [
    { value: '151', label: 'Audits durchgeführt', sub: '130 geprüfte Websites' },
    { value: '64.8', suffix: '/100', label: 'Ø SEO-Score', pct: 64.8, band: 'warning' },
    { value: '93.3', suffix: '/100', label: 'Ø Performance', pct: 93.3, band: 'success' },
    { value: '67.8', suffix: '/100', label: 'Ø Overall-Score', pct: 67.8, band: 'warning' },
]

const BAND_COLOR = {
    success: 'var(--success)',
    warning: 'var(--warning)',
    danger: 'var(--danger)',
}

// r=56, Umfang 351.86 - Kreisbogen zeigt GEO_SCORE% davon an (Standard-SVG-Gauge-Trick über
// stroke-dasharray/-dashoffset, siehe z.B. https://css-tricks.com/building-progress-ring-quickly/).
const GAUGE_CIRCUMFERENCE = 351.86
const gaugeOffset = GAUGE_CIRCUMFERENCE * (1 - GEO_SCORE / 100)

export default function LiveAuditStats() {
    return (
        <section className="relative py-16 sm:py-24 bg-(--bg-base) overflow-hidden">
            <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="bg-(--card) border border-(--line) rounded-2xl shadow-card overflow-hidden">

                    <div className="flex items-center gap-2 px-6 sm:px-9 pt-5 sm:pt-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-(--accent)" />
                        <span className="text-xs font-semibold text-(--accent-ink) ">
                            151 Audits ausgewertet
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 sm:gap-10 items-center px-6 sm:px-9 py-6 sm:py-8 border-b border-(--border-subtle)">
                        <div className="flex flex-col items-center gap-1.5 mx-auto sm:mx-0">
                            <div className="relative w-33 h-33">
                                <svg viewBox="0 0 132 132" width="132" height="132">
                                    <circle cx="66" cy="66" r="56" fill="none" stroke="var(--border-subtle)" strokeWidth="10" />
                                    <circle cx="66" cy="66" r="56" fill="none" stroke={BAND_COLOR.warning} strokeWidth="10"
                                        strokeLinecap="round" strokeDasharray={GAUGE_CIRCUMFERENCE} strokeDashoffset={gaugeOffset}
                                        transform="rotate(-90 66 66)" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-black text-(--text-white) tracking-tight tabular-nums">{GEO_SCORE}</span>
                                    <span className="text-xs text-(--text-faint)">/ 100</span>
                                </div>
                            </div>
                            <span className="text-xs text-(--text-faint) ">Ø GEO-Score</span>
                        </div>

                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3 leading-tight text-balance">
                                Der durchschnittliche <span style={{ color: BAND_COLOR.warning }}>GEO-Score liegt bei nur {GEO_SCORE} von 100</span> Punkten
                            </h2>
                            <p className="text-(--text-muted) text-sm sm:text-base leading-relaxed">
                                Ausgewertet über alle bislang mit Scanora durchgeführten Website-Audits - die meisten
                                Seiten sind für ChatGPT, Claude, Perplexity und Google AI Overview kaum sichtbar.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-(--border-subtle)">
                        {STAT_ROW.map(s => (
                            <div key={s.label} className="px-6 sm:px-9 py-5 sm:py-6">
                                <div className="text-xs text-(--text-faint) mb-2">{s.label}</div>
                                <div className="text-2xl sm:text-3xl font-black text-(--text-white) tracking-tight tabular-nums">
                                    {s.value}{s.suffix && <span className="text-sm font-semibold text-(--text-faint)">{s.suffix}</span>}
                                </div>
                                {s.pct != null ? (
                                    <div className="h-1.5 bg-(--surface-08) rounded-full overflow-hidden mt-3">
                                        <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: BAND_COLOR[s.band] }} />
                                    </div>
                                ) : (
                                    <div className="text-[11px] text-(--text-faint) mt-1">{s.sub}</div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 px-6 sm:px-9 py-4 text-[11px] text-(--text-faint)">
                        <span>Berechnet aus allen abgeschlossenen Scanora-Audits.</span>
                        <span>Stand: 26.09.2026</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
