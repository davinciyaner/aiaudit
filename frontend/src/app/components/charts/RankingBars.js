'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const ROWS = [
    { keyword: 'ki sichtbarkeit tool', before: 68, after: 7 },
    { keyword: 'ai visibility tracker', before: 77, after: 12 },
    { keyword: 'geo optimierung', before: 41, after: 4 },
    { keyword: 'seo audit software', before: 54, after: 9 },
    { keyword: 'core web vitals test', before: 62, after: 6 },
].map(r => ({ ...r, score: Math.max(0, 100 - r.after), delta: r.before - r.after }))
    .sort((a, b) => b.delta - a.delta)

export default function RankingBars() {
    const reduceMotion = useReducedMotion()

    return (
        <div className="bg-[var(--bg-surface)] border border-white/10 rounded-2xl p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-white">Ranking-Verbesserung</h3>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.06] text-slate-500 font-medium">Beispiel</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Google-Position vor und nach umgesetzten AuditAI-Fixes</p>
                </div>
            </div>

            <div className="space-y-4">
                {ROWS.map((r, i) => (
                    <div key={r.keyword}>
                        <div className="flex items-center justify-between gap-3 mb-1.5">
                            <span className="text-sm text-slate-300 truncate">{r.keyword}</span>
                            <div className="flex items-center gap-2 shrink-0">
                                <span className="text-xs text-slate-500 tabular-nums">Platz {r.before} → Platz {r.after}</span>
                                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-semibold tabular-nums">
                                    <ArrowUp className="w-2.5 h-2.5" />{r.delta}
                                </span>
                            </div>
                        </div>
                        <div className="relative h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 rounded-full bg-gradient-accent"
                                initial={reduceMotion ? false : { width: 0 }}
                                whileInView={{ width: `${r.score}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <table className="sr-only">
                <caption>Ranking-Verbesserung pro Keyword</caption>
                <thead><tr><th>Keyword</th><th>Position vorher</th><th>Position nachher</th></tr></thead>
                <tbody>
                    {ROWS.map(r => <tr key={r.keyword}><td>{r.keyword}</td><td>{r.before}</td><td>{r.after}</td></tr>)}
                </tbody>
            </table>
        </div>
    )
}
