'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { Search, Globe } from 'lucide-react'

const GAUGES = [
    { key: 'geo', label: 'GEO — AI Visibility', icon: Globe, score: 95 },
    { key: 'seo', label: 'SEO', icon: Search, score: 92 },
]

const R = 30
const CIRC = 2 * Math.PI * R

function Gauge({ label, icon: Icon, score, delay, reduceMotion }) {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                    <motion.circle
                        cx="40" cy="40" r={R} fill="none" stroke="url(#gaugeGradientEn)"
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
        <div className="bg-[var(--bg-surface)] border border-white/10 rounded-2xl p-5 sm:p-6 h-full">
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="gaugeGradientEn" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="flex items-center gap-2 mb-6">
                <h3 className="text-sm font-semibold text-white">Audit Scores</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.06] text-slate-500 font-medium">Example</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {GAUGES.map((g, i) => (
                    <Gauge key={g.key} label={g.label} icon={g.icon} score={g.score} delay={i * 0.12} reduceMotion={reduceMotion} />
                ))}
            </div>
            <p className="text-xs text-slate-500 text-center mt-6 leading-relaxed">
                This is what your scores look like once the prioritized fixes are in place.
            </p>
        </div>
    )
}
