'use client'
import { motion } from 'framer-motion'

export default function ScoreCard({ label, score, delay = 0 }) {
    const color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444'
    const bgColor = score >= 80 ? 'rgba(34,197,94,0.1)' : score >= 60 ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)'
    const borderColor = score >= 80 ? 'rgba(34,197,94,0.2)' : score >= 60 ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)'
    const label2 = score >= 80 ? 'Good' : score >= 60 ? 'Needs Work' : 'Critical'
    const r = 28
    const circ = 2 * Math.PI * r

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay }}
            className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 sm:p-6 text-center"
        >
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-3">{label}</div>
            <div className="relative w-20 h-20 mx-auto mb-3">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                    <motion.circle
                        cx="40" cy="40" r={r} fill="none" stroke={color}
                        strokeWidth="6" strokeLinecap="round"
                        strokeDasharray={circ}
                        initial={{ strokeDashoffset: circ }}
                        animate={{ strokeDashoffset: circ * (1 - score / 100) }}
                        transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{score}</span>
                </div>
            </div>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                 style={{ background: bgColor, borderColor, color }}>
                {label2}
            </div>
        </motion.div>
    )
}