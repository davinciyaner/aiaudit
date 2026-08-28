'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { Search, Globe } from 'lucide-react'

const GAUGES = [
    { key: 'geo', label: 'GEO — KI-Sichtbarkeit', icon: Globe, score: 95 },
    { key: 'seo', label: 'SEO', icon: Search, score: 92 },
]

const R = 30
const CIRC = 2 * Math.PI * R

function Gauge({ label, icon: Icon, score, delay, reduceMotion }) {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r={R} fill="none" stroke="var(--surface-06)" strokeWidth="6" />
                    <motion.circle
                        cx="40" cy="40" r={R} fill="none" stroke="var(--accent)"
                        strokeWidth="6" strokeLinecap="round"
                        strokeDasharray={CIRC}
                        initial={reduceMotion ? false : { strokeDashoffset: CIRC }}
                        whileInView={{ strokeDashoffset: CIRC * (1 - score / 100) }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay, ease: 'easeOut' }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-white tabular-nums">{score}</span>
                </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
                <Icon className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.8} />
                <span className="text-xs font-medium text-slate-300">{label}</span>
            </div>
        </div>
    )
}

export default function ScoreGauges() {
    const reduceMotion = useReducedMotion()

    return (
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5 sm:p-6 h-full">
            <div className="flex items-center gap-2 mb-6">
                <h3 className="text-sm font-semibold text-white">Audit-Scores</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--surface-08)] text-slate-500 font-medium">Beispiel</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {GAUGES.map((g, i) => (
                    <Gauge key={g.key} label={g.label} icon={g.icon} score={g.score} delay={i * 0.12} reduceMotion={reduceMotion} />
                ))}
            </div>
            <p className="text-xs text-slate-500 text-center mt-6 leading-relaxed">
                So sehen deine Scores aus, sobald die priorisierten Fixes umgesetzt sind.
            </p>
        </div>
    )
}
