'use client'
import { motion, useReducedMotion } from 'framer-motion'

const ROWS = [
    { platform: 'ChatGPT', share: 42 },
    { platform: 'Google AI Overview', share: 31 },
    { platform: 'Perplexity', share: 18 },
    { platform: 'Claude', share: 9 },
]

export default function PlatformBreakdown() {
    const reduceMotion = useReducedMotion()

    return (
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-white">Where do you get cited?</h3>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--surface-08)] text-slate-500 font-medium">Example</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Share of your mentions per AI platform</p>
                </div>
            </div>

            <div className="space-y-4">
                {ROWS.map((r, i) => (
                    <div key={r.platform}>
                        <div className="flex items-center justify-between gap-3 mb-1.5">
                            <span className="text-sm text-slate-300">{r.platform}</span>
                            <span className="text-xs text-white font-semibold tabular-nums">{r.share}%</span>
                        </div>
                        <div className="relative h-2.5 rounded-full bg-[var(--surface-08)] overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 rounded-full bg-[var(--accent)]"
                                initial={reduceMotion ? false : { width: 0 }}
                                whileInView={{ width: `${r.share}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <table className="sr-only">
                <caption>Mention share per AI platform</caption>
                <thead><tr><th>Platform</th><th>Share</th></tr></thead>
                <tbody>
                    {ROWS.map(r => <tr key={r.platform}><td>{r.platform}</td><td>{r.share}%</td></tr>)}
                </tbody>
            </table>
        </div>
    )
}
