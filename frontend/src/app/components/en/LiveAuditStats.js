'use client'
import { motion } from 'framer-motion'

// Values aggregated manually from the Report collection (see backend/models/report_model.js,
// field auditData.{overallScore,seo.score,performance.score,geo.score}) — no live endpoint,
// since the numbers rarely change meaningfully at this user count. Update the date in the
// footer below whenever these are refreshed.
const GEO_SCORE = 58

const STAT_ROW = [
    { value: '151', label: 'Audits completed', sub: '130 websites checked' },
    { value: '64.8', suffix: '/100', label: 'Avg. SEO score', pct: 64.8, band: 'warning' },
    { value: '93.3', suffix: '/100', label: 'Avg. Performance', pct: 93.3, band: 'success' },
    { value: '67.8', suffix: '/100', label: 'Avg. Overall score', pct: 67.8, band: 'warning' },
]

const BAND_COLOR = {
    success: 'var(--success)',
    warning: 'var(--warning)',
    danger: 'var(--danger)',
}

// r=56, circumference 351.86 — the arc shows GEO_SCORE% of it (standard SVG gauge trick via
// stroke-dasharray/-dashoffset, see e.g. https://css-tricks.com/building-progress-ring-quickly/).
const GAUGE_CIRCUMFERENCE = 351.86
const gaugeOffset = GAUGE_CIRCUMFERENCE * (1 - GEO_SCORE / 100)

export default function LiveAuditStats() {
    return (
        <section className="relative py-16 sm:py-24 bg-[var(--bg-base)] overflow-hidden">
            <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl shadow-card overflow-hidden">

                    <div className="flex items-center gap-2 px-6 sm:px-9 pt-5 sm:pt-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                        <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide">
                            151 audits analyzed
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 sm:gap-10 items-center px-6 sm:px-9 py-6 sm:py-8 border-b border-[var(--border-subtle)]">
                        <div className="flex flex-col items-center gap-1.5 mx-auto sm:mx-0">
                            <div className="relative w-[132px] h-[132px]">
                                <svg viewBox="0 0 132 132" width="132" height="132">
                                    <circle cx="66" cy="66" r="56" fill="none" stroke="var(--border-subtle)" strokeWidth="10" />
                                    <circle cx="66" cy="66" r="56" fill="none" stroke={BAND_COLOR.warning} strokeWidth="10"
                                        strokeLinecap="round" strokeDasharray={GAUGE_CIRCUMFERENCE} strokeDashoffset={gaugeOffset}
                                        transform="rotate(-90 66 66)" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-black text-[var(--text-white)] tracking-tight tabular-nums">{GEO_SCORE}</span>
                                    <span className="text-xs text-[var(--text-faint)]">/ 100</span>
                                </div>
                            </div>
                            <span className="text-[9px] text-[var(--text-faint)] uppercase tracking-wide">Avg. GEO score</span>
                        </div>

                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3 leading-tight text-balance">
                                The average <span style={{ color: BAND_COLOR.warning }}>GEO score is just {GEO_SCORE} out of 100</span> points
                            </h2>
                            <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed">
                                Measured across every website audit run with Scanora so far — most sites are barely
                                visible to ChatGPT, Claude, Perplexity, and Google AI Overview.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[var(--border-subtle)]">
                        {STAT_ROW.map(s => (
                            <div key={s.label} className="px-6 sm:px-9 py-5 sm:py-6">
                                <div className="text-xs text-[var(--text-faint)] uppercase tracking-wide mb-2">{s.label}</div>
                                <div className="text-2xl sm:text-3xl font-black text-[var(--text-white)] tracking-tight tabular-nums">
                                    {s.value}{s.suffix && <span className="text-sm font-semibold text-[var(--text-faint)]">{s.suffix}</span>}
                                </div>
                                {s.pct != null ? (
                                    <div className="h-1.5 bg-[var(--surface-08)] rounded-full overflow-hidden mt-3">
                                        <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: BAND_COLOR[s.band] }} />
                                    </div>
                                ) : (
                                    <div className="text-[11px] text-[var(--text-faint)] mt-1">{s.sub}</div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 px-6 sm:px-9 py-4 text-[11px] text-[var(--text-faint)]">
                        <span>Calculated from all completed Scanora audits.</span>
                        <span>As of: Sep 26, 2026</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
