'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8']
const SCORES = [22, 31, 38, 47, 55, 64, 76, 88]

const W = 560
const H = 220
const PAD_L = 8
const PAD_R = 44
const TOP = 16
const BASE = 168

function pointsFor(scores) {
    const step = (W - PAD_L - PAD_R) / (scores.length - 1)
    return scores.map((s, i) => ({
        x: PAD_L + i * step,
        y: BASE - (s / 100) * (BASE - TOP),
        v: s,
    }))
}

function smoothPath(pts) {
    if (pts.length < 2) return ''
    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1]
        const p1 = pts[i]
        const mx = (p0.x + p1.x) / 2
        d += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`
    }
    return d
}

export default function VisibilityTrendChart() {
    const reduceMotion = useReducedMotion()
    const pts = pointsFor(SCORES)
    const linePath = smoothPath(pts)
    const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${BASE} L ${pts[0].x} ${BASE} Z`
    const gridValues = [0, 25, 50, 75, 100]
    const last = pts[pts.length - 1]
    const delta = SCORES[SCORES.length - 1] - SCORES[0]

    return (
        <div className="bg-[var(--bg-surface)] border border-white/10 rounded-2xl p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3 mb-1">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-white">AI Visibility Score</h3>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.06] text-slate-500 font-medium">Example</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Mentions on ChatGPT, Claude, Perplexity &amp; Google AI Overview — 8 weeks of tracking</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold shrink-0">
                    <TrendingUp className="w-3 h-3" /> +{delta} points
                </div>
            </div>

            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto mt-2" role="img" aria-label={`AI Visibility Score rose from ${SCORES[0]} to ${SCORES[SCORES.length - 1]} points over 8 weeks`}>
                <defs>
                    <linearGradient id="visLineEn" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                    <linearGradient id="visAreaEn" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {gridValues.map(v => {
                    const y = BASE - (v / 100) * (BASE - TOP)
                    return (
                        <g key={v}>
                            <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                            <text x={W - PAD_R + 8} y={y + 3} fontSize="9" fill="#64748b">{v}</text>
                        </g>
                    )
                })}

                <path d={areaPath} fill="url(#visAreaEn)" />

                <motion.path
                    d={linePath}
                    fill="none"
                    stroke="url(#visLineEn)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduceMotion ? false : { pathLength: 0 }}
                    whileInView={reduceMotion ? undefined : { pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                />

                <circle cx={last.x} cy={last.y} r="5" fill="#22d3ee" stroke="var(--bg-surface)" strokeWidth="2" />
                <text x={last.x - 6} y={last.y - 14} fontSize="13" fontWeight="700" fill="#ffffff" textAnchor="end">{last.v}</text>

                {WEEKS.map((w, i) => (
                    <text key={w} x={pts[i].x} y={BASE + 18} fontSize="9" fill="#475569" textAnchor="middle">{w}</text>
                ))}
            </svg>

            <table className="sr-only">
                <caption>AI Visibility Score per week</caption>
                <thead><tr><th>Week</th><th>Score</th></tr></thead>
                <tbody>
                    {WEEKS.map((w, i) => <tr key={w}><td>{w}</td><td>{SCORES[i]}</td></tr>)}
                </tbody>
            </table>
        </div>
    )
}
