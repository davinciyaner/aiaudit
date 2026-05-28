'use client'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Zap, AlertTriangle, ArrowRight, Check, Shield } from 'lucide-react'
import Link from 'next/link'

const MOCK_SCORES_BEFORE = [
    { label: 'Overall', score: 34, color: '#ef4444' },
    { label: 'SEO', score: 52, color: '#f59e0b' },
    { label: 'Performance', score: 28, color: '#ef4444' },
    { label: 'Security', score: 19, color: '#ef4444' },
    { label: 'GEO', score: 11, color: '#ef4444' },
]
const MOCK_SCORES_AFTER = [
    { label: 'Overall', score: 91, color: '#22c55e' },
    { label: 'SEO', score: 94, color: '#22c55e' },
    { label: 'Performance', score: 88, color: '#22c55e' },
    { label: 'Security', score: 96, color: '#22c55e' },
    { label: 'GEO', score: 78, color: '#22c55e' },
]
const MOCK_ISSUES_BEFORE = [
    { type: 'error', text: 'Missing Content-Security-Policy — XSS attacks possible' },
    { type: 'error', text: 'No HSTS — connection can be downgraded to HTTP' },
    { type: 'error', text: 'Server header exposes: Vercel — infrastructure visible' },
    { type: 'warn', text: 'Title tag too long: 76 chars (ideal: 30–60)' },
    { type: 'warn', text: 'First Contentful Paint: 4.2s — 58% of users will leave' },
    { type: 'success', text: 'HTTPS enabled with valid SSL certificate' },
]
const MOCK_ISSUES_AFTER = [
    { type: 'success', text: 'All 6 security headers configured correctly' },
    { type: 'success', text: 'Title tag optimized: 52 chars — perfect range' },
    { type: 'success', text: 'First Contentful Paint: 0.9s — excellent' },
    { type: 'success', text: 'HTTPS + HSTS enabled, no mixed content' },
    { type: 'success', text: 'llms.txt present — AI models can find you' },
    { type: 'success', text: 'FAQ Schema detected — citation-ready for AI' },
]
const STATS = [
    { value: '94%', label: 'der Vibe-coded Sites haben kritische Security-Lücken' },
    { value: '< 60s', label: 'vollständiger Audit inkl. KI-Bericht' },
    { value: '8', label: 'Analysekategorien in einem Report' },
    { value: '0€', label: 'kostenlos starten' },
]

function MockCard({ scores, issues, label, labelColor }) {
    return (
        <div className="relative bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 bg-white/5 rounded px-3 py-1 text-[10px] text-slate-500">auditai.io/report</div>
                <div className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: labelColor + '20', color: labelColor }}>{label}</div>
            </div>
            <div className="p-5">
                <div className="grid grid-cols-5 gap-2 mb-4">
                    {scores.map(({ label: l, score, color }) => (
                        <div key={l} className="bg-white/[0.03] border border-white/5 rounded-xl p-2.5 text-center">
                            <div className="text-xl font-bold" style={{ color }}>{score}</div>
                            <div className="text-[9px] text-slate-600 mt-0.5">{l}</div>
                        </div>
                    ))}
                </div>
                <div className="space-y-1.5">
                    {issues.map((issue, i) => (
                        <div key={i} className={`flex items-start gap-2 px-3 py-2 rounded-lg text-[11px] ${
                            issue.type === 'error' ? 'bg-red-500/10 text-red-400' :
                                issue.type === 'warn' ? 'bg-amber-500/10 text-amber-400' :
                                    'bg-emerald-500/10 text-emerald-400'
                        }`}>
                            <span className="flex-shrink-0 mt-0.5">{issue.type === 'error' ? '✕' : issue.type === 'warn' ? '⚠' : '✓'}</span>
                            <span className="leading-relaxed">{issue.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function Hero() {
    const [showAfter, setShowAfter] = useState(false)
    const heroRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    return (
        <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-3xl" style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.04) 50%, transparent 70%)' }} />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)' }} />
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        <div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/8 text-violet-300 text-xs font-medium tracking-wide mb-8">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                                Der Audit den deine KI vergisst zu machen
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                                       className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] sm:leading-[1.0] tracking-tight mb-6">
                                Deine Website.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400">Vollständig geprüft.</span><br />
                                In 60 Sekunden.
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                                      className="text-base sm:text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
                                Wie gut ist deine Website wirklich? AuditAI prüft SEO, Security, Performance und KI-Sichtbarkeit – und zeigt dir genau was du verbessern musst. – alles in einem Report.
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                                        className="flex flex-col sm:flex-row gap-3 mb-10">
                                <Link href="/dashboard" className="group flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-2xl transition-all duration-200 shadow-2xl shadow-violet-500/25 hover:-translate-y-0.5 text-sm">
                                    Website jetzt prüfen - kostenlos
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                <Link href="#security" className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white rounded-2xl transition-all text-sm">
                                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                                    Sicherheitsrisiken ansehen
                                </Link>
                            </motion.div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-4 sm:gap-8">
                                {STATS.map((s, i) => (
                                    <div key={i}>
                                        <div className="text-2xl font-bold text-white">{s.value}</div>
                                        <div className="text-xs text-slate-500 mt-0.5 max-w-[140px] leading-relaxed">{s.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
                            <div className="flex items-center gap-3 mb-4 justify-end">
                                <span className="text-xs text-slate-500">Vorher</span>
                                <button onClick={() => setShowAfter(!showAfter)}
                                        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${showAfter ? 'bg-gradient-to-r from-violet-600 to-cyan-600' : 'bg-white/10'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${showAfter ? 'left-7' : 'left-1'}`} />
                                </button>
                                <span className="text-xs text-slate-500">Nachher</span>
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.div key={showAfter ? 'after' : 'before'}
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                    <MockCard
                                        scores={showAfter ? MOCK_SCORES_AFTER : MOCK_SCORES_BEFORE}
                                        issues={showAfter ? MOCK_ISSUES_AFTER : MOCK_ISSUES_BEFORE}
                                        label={showAfter ? 'NACH AUDIT' : 'VOR AUDIT'}
                                        labelColor={showAfter ? '#22c55e' : '#ef4444'}
                                    />
                                </motion.div>
                            </AnimatePresence>
                            <div className={`absolute -inset-4 rounded-3xl blur-2xl transition-all duration-500 -z-10 ${showAfter ? 'bg-emerald-500/8' : 'bg-red-500/8'}`} />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}