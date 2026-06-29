'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Globe, Search, Bot, Camera } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const PRO_FEATURES = [
    { icon: Bot, label: 'KI-Bericht', desc: 'Vollständige KI-Analyse', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    { icon: Search, label: 'Fehler fixen', desc: 'Schritt-für-Schritt-Fixes', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    { icon: Camera, label: 'Screenshots', desc: 'Desktop & Mobile', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
]

const STATS = [
    { value: 'max. 60s', label: 'bis zum Bericht' },
    { value: 'Gratis',   label: 'kostenlos starten' },
]

const AVATARS = [
    { letter: 'T', color: '#7c3aed' },
    { letter: 'A', color: '#0891b2' },
    { letter: 'F', color: '#059669' },
    { letter: 'S', color: '#d97706' },
]

const BEFORE_SCORES = [
    { label: 'Overall', score: 34, color: '#ef4444' },
    { label: 'SEO',     score: 52, color: '#ef4444' },
    { label: 'Perf',    score: 28, color: '#ef4444' },
    { label: 'GEO',     score: 11, color: '#ef4444' },
]
const AFTER_SCORES = [
    { label: 'Overall', score: 91, color: '#22c55e' },
    { label: 'SEO',     score: 94, color: '#22c55e' },
    { label: 'Perf',    score: 88, color: '#22c55e' },
    { label: 'GEO',     score: 78, color: '#22c55e' },
]
const BEFORE_ISSUES = [
    { type: 'error', text: 'H1-Tag fehlt auf der Startseite' },
    { type: 'warn',  text: 'Ladezeit: 4.8s — Richtwert: 2.5s' },
    { type: 'warn',  text: 'Meta-Description auf 4 Seiten leer' },
    { type: 'error', text: 'llms.txt fehlt — KI ignoriert dich' },
]
const AFTER_ISSUES = [
    { type: 'success', text: 'H1-Tag optimiert und keyword-reich' },
    { type: 'success', text: 'Ladezeit: 4.8s → 1.8s' },
    { type: 'success', text: 'GEO-Score: 11 → 78' },
]
const SCAN_MODULES = [
    { label: 'SEO-Analyse',  color: '#10b981' },
    { label: 'Performance',  color: '#f59e0b' },
    { label: 'GEO-Analyse',  color: '#6366f1' },
    { label: 'KI-Bericht',   color: '#7c3aed' },
]
const KI_FINDINGS = [
    { severity: 'Kritisch',    color: '#ef4444', title: 'H1-Tag fehlt',          fix: 'Füge einen H1 mit Haupt-Keyword ein — genau einmal pro Seite.' },
    { severity: 'Performance', color: '#f59e0b', title: 'Bilder unkomprimiert',  fix: 'hero.jpg (2.1 MB) auf WebP konvertieren → LCP sinkt von 4.2s auf ~1.1s.' },
    { severity: 'GEO',         color: '#6366f1', title: 'llms.txt fehlt',        fix: 'Erstelle /llms.txt damit ChatGPT & Perplexity dich als Quelle zitieren.' },
]
const FIX_STEPS = [
    { step: 1, title: 'index.html öffnen', detail: 'Suche nach dem öffnenden <body>-Tag deiner Startseite.' },
    { step: 2, title: 'H1-Tag einfügen', detail: '<h1>SEO-Agentur Berlin – Firma XY</h1>', code: true },
    { step: 3, title: 'Keyword prüfen', detail: 'Max. 60 Zeichen, enthält dein wichtigstes Keyword genau einmal.' },
    { step: 4, title: 'Neuen Audit starten', detail: 'Score-Anstieg: SEO 52 → ~85 erwartet.' },
]
const DEMO_STEPS = [
    { id: 'before',      label: 'Ausgangslage',   duration: 2800 },
    { id: 'scan',        label: 'KI analysiert',  duration: 3500 },
    { id: 'ki-bericht',  label: 'KI-Bericht',     duration: 4200 },
    { id: 'fixes',       label: 'Fehler fixen',   duration: 4800 },
    { id: 'screenshots', label: 'Screenshots',    duration: 3200 },
    { id: 'after',       label: 'Nach Optimierung',duration: 2500 },
]

function ScoreRow({ scores }) {
    return (
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-4">
            {scores.map(({ label, score, color }) => (
                <div key={label} className="rounded-xl p-2 sm:p-2.5 text-center border border-white/5 bg-white/[0.03]">
                    <div className="text-lg sm:text-xl font-bold" style={{ color }}>{score}</div>
                    <div className="text-[9px] text-slate-600 mt-0.5">{label}</div>
                </div>
            ))}
        </div>
    )
}

function IssueItem({ type, text }) {
    return (
        <div className={`flex items-start gap-2 px-3 py-2 rounded-lg text-[11px] ${
            type === 'error' ? 'bg-red-500/10 text-red-400' :
            type === 'warn'  ? 'bg-amber-500/10 text-amber-400' :
                               'bg-emerald-500/10 text-emerald-400'
        }`}>
            <span className="shrink-0 mt-0.5">{type === 'error' ? '✕' : type === 'warn' ? '⚠' : '✓'}</span>
            <span className="leading-relaxed">{text}</span>
        </div>
    )
}

function AuditDemo() {
    const [stepIdx, setStepIdx] = useState(0)
    const [scanProgress, setScanProgress] = useState([0, 0, 0, 0])

    const step = DEMO_STEPS[stepIdx]

    useEffect(() => {
        const t = setTimeout(() => setStepIdx(i => (i + 1) % DEMO_STEPS.length), step.duration)
        return () => clearTimeout(t)
    }, [stepIdx, step.duration])

    useEffect(() => {
        if (step.id !== 'scan') { setScanProgress([0, 0, 0, 0]); return }
        const targets = [92, 78, 85, 100]
        const timers = targets.map((target, i) =>
            setTimeout(() => setScanProgress(prev => prev.map((v, idx) => idx === i ? target : v)), 200 + i * 380)
        )
        return () => timers.forEach(clearTimeout)
    }, [stepIdx])

    const proLabel = ['ki-bericht', 'fixes', 'screenshots'].includes(step.id)

    return (
        <div className="bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
                <div className="flex gap-1.5 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 bg-white/5 rounded px-3 py-1 text-[10px] text-slate-500">sitecheckai.dev</div>
                <div className="flex items-center gap-2 shrink-0">
                    <AnimatePresence mode="wait">
                        {proLabel && (
                            <motion.div key="pro-badge"
                                initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                                className="px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-[9px] font-bold text-violet-400 tracking-wide">
                                PRO
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="flex items-center gap-1">
                        {DEMO_STEPS.map((_, i) => (
                            <div key={i} className="h-1.5 rounded-full transition-all duration-500"
                                style={{
                                    width: i === stepIdx ? '18px' : '5px',
                                    background: i === stepIdx ? '#7c3aed' : i < stepIdx ? 'rgba(124,58,237,0.35)' : 'rgba(255,255,255,0.07)'
                                }} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="px-5 pt-3 pb-0">
                <div className="text-[10px] uppercase tracking-widest font-semibold text-slate-600">{step.label}</div>
            </div>

            <div className="p-5 pt-2 min-h-[340px]">
                <AnimatePresence mode="wait">
                    {step.id === 'before' && (
                        <motion.div key="before"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[11px] text-slate-500">meine-website.de — aktueller Stand</span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400">VORHER</span>
                            </div>
                            <ScoreRow scores={BEFORE_SCORES} />
                            <div className="space-y-1.5">
                                {BEFORE_ISSUES.map((issue, i) => <IssueItem key={i} {...issue} />)}
                            </div>
                        </motion.div>
                    )}

                    {step.id === 'scan' && (
                        <motion.div key="scan"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
                                </span>
                                <span className="text-xs text-slate-300 font-medium">KI analysiert meine-website.de …</span>
                            </div>
                            <div className="space-y-3 mb-4">
                                {SCAN_MODULES.map((mod, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-[11px] text-slate-400">{mod.label}</span>
                                            <span className="text-[11px] font-mono tabular-nums" style={{ color: mod.color }}>{scanProgress[i]}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full rounded-full transition-all duration-1100 ease-out"
                                                style={{ width: `${scanProgress[i]}%`, background: mod.color }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-white/5 pt-3 space-y-2">
                                <div className="text-[10px] text-slate-600 mb-1.5">Erste Funde:</div>
                                {[
                                    { severity: 'Kritisch', text: 'H1-Tag fehlt', color: '#ef4444' },
                                    { severity: 'Warning',  text: 'Bilder unkomprimiert (2.1 MB)', color: '#f59e0b' },
                                    { severity: 'GEO',      text: 'llms.txt nicht vorhanden', color: '#6366f1' },
                                ].map((issue, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.9 + i * 0.35 }}
                                        className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded shrink-0"
                                            style={{ background: issue.color + '22', color: issue.color }}>
                                            {issue.severity}
                                        </span>
                                        <span className="text-[11px] text-slate-400">{issue.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step.id === 'after' && (
                        <motion.div key="after"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[11px] text-slate-500">meine-website.de — nach Optimierung</span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">NACHHER</span>
                            </div>
                            <ScoreRow scores={AFTER_SCORES} />
                            <div className="space-y-1.5">
                                {AFTER_ISSUES.map((issue, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}>
                                        <IssueItem {...issue} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step.id === 'ki-bericht' && (
                        <motion.div key="ki-bericht"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}>
                            <div className="flex items-center gap-2 mb-3">
                                <Bot className="w-3.5 h-3.5 text-violet-400" />
                                <span className="text-xs font-semibold text-white">KI-Bericht</span>
                                <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400">PRO</span>
                            </div>
                            <div className="space-y-2">
                                {KI_FINDINGS.map((f, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.35 }}
                                        className="rounded-xl p-3 bg-white/[0.03] border border-white/5">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                                                style={{ background: f.color + '22', color: f.color }}>
                                                {f.severity}
                                            </span>
                                            <span className="text-[11px] font-semibold text-slate-200">{f.title}</span>
                                        </div>
                                        <p className="text-[10px] text-slate-500 leading-relaxed">{f.fix}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step.id === 'fixes' && (
                        <motion.div key="fixes"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}>
                            <div className="flex items-center gap-2 mb-1">
                                <Search className="w-3.5 h-3.5 text-cyan-400" />
                                <span className="text-xs font-semibold text-white">Fehler fixen</span>
                                <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400">PRO</span>
                            </div>
                            <p className="text-[10px] text-slate-500 mb-3">Fix-Anleitung: <span className="text-red-400">H1-Tag fehlt</span></p>
                            <div className="space-y-2">
                                {FIX_STEPS.map((s, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.3 }}
                                        className="flex gap-3 items-start">
                                        <div className="w-5 h-5 rounded-full bg-violet-500/15 border border-violet-500/25 flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-[9px] font-bold text-violet-400">{s.step}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[11px] font-semibold text-slate-200 mb-0.5">{s.title}</p>
                                            {s.code
                                                ? <code className="text-[10px] text-emerald-400 bg-emerald-500/8 border border-emerald-500/15 px-2 py-0.5 rounded font-mono block truncate">{s.detail}</code>
                                                : <p className="text-[10px] text-slate-500 leading-relaxed">{s.detail}</p>
                                            }
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step.id === 'screenshots' && (
                        <motion.div key="screenshots"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}>
                            <div className="flex items-center gap-2 mb-3">
                                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-xs font-semibold text-white">Screenshots</span>
                                <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400">PRO</span>
                            </div>
                            <div className="grid grid-cols-5 gap-3 mb-3">
                                <motion.div className="col-span-3" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                                    <div className="text-[9px] text-slate-600 mb-1.5 uppercase tracking-wider">Desktop</div>
                                    <div className="rounded-xl border border-white/10 overflow-hidden bg-[#080b14]">
                                        <div className="h-3.5 bg-white/3 flex items-center px-2 gap-1 border-b border-white/5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                                            <div className="flex-1 ml-1 h-1.5 rounded-full bg-white/5" />
                                        </div>
                                        <div className="p-2 space-y-1.5">
                                            <div className="h-2.5 rounded bg-white/5 w-1/2" />
                                            <div className="h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/10" />
                                            <div className="h-2 rounded bg-white/5 w-3/4" />
                                            <div className="h-2 rounded bg-white/5 w-1/2" />
                                            <div className="grid grid-cols-3 gap-1 pt-1">
                                                <div className="h-8 rounded-lg bg-white/4" />
                                                <div className="h-8 rounded-lg bg-white/4" />
                                                <div className="h-8 rounded-lg bg-white/4" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div className="col-span-2" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                                    <div className="text-[9px] text-slate-600 mb-1.5 uppercase tracking-wider">Mobile</div>
                                    <div className="rounded-xl border border-white/10 overflow-hidden bg-[#080b14]">
                                        <div className="h-3.5 bg-white/3 flex items-center justify-center border-b border-white/5">
                                            <div className="w-5 h-1 rounded-full bg-white/10" />
                                        </div>
                                        <div className="p-1.5 space-y-1">
                                            <div className="h-2 rounded bg-white/5" />
                                            <div className="h-9 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/10" />
                                            <div className="h-2 rounded bg-white/5" />
                                            <div className="h-2 rounded bg-white/5 w-3/4" />
                                            <div className="h-6 rounded-lg bg-white/4" />
                                            <div className="h-6 rounded-lg bg-white/4" />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                                className="flex items-center gap-2 text-[10px] text-slate-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70 inline-block shrink-0" />
                                Automatisch aufgenommen · Desktop &amp; Mobile immer synchron
                            </motion.div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    )
}

export default function Hero() {
    const [heroUrl, setHeroUrl] = useState('')
    const [showStickyBar, setShowStickyBar] = useState(false)
    const [showError, setShowError] = useState(false)
    const heroRef = useRef(null)
    const formRef = useRef(null)
    const inputRef = useRef(null)
    const stickyMobileRef = useRef(null)
    const stickyDesktopRef = useRef(null)
    const router = useRouter()
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    useEffect(() => {
        const handleScroll = () => {
            if (!formRef.current) return
            const rect = formRef.current.getBoundingClientRect()
            if (rect.bottom < 80) setShowStickyBar(true)
            else if (rect.top > 300) setShowStickyBar(false)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const submitWithRef = (e, ref) => {
        e.preventDefault()
        if (!heroUrl.trim()) { setShowError(true); ref?.current?.focus(); return }
        setShowError(false)
        const normalized = heroUrl.trim().startsWith('http') ? heroUrl.trim() : 'https://' + heroUrl.trim()
        sessionStorage.setItem('pendingAuditUrl', normalized)
        router.push('/dashboard')
    }

    return (
        <>
        <AnimatePresence>
            {showStickyBar && (
                <>
                    <motion.div
                        key="sticky-bottom"
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 80, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed bottom-0 left-0 right-0 z-40 sm:hidden"
                        style={{ boxShadow: '0 -4px 24px rgba(0,0,0,0.5), 0 -1px 0 rgba(124,58,237,0.15)' }}>
                        <div className="bg-[#080b14] border-t border-white/10 px-4 pt-2.5 pb-[max(12px,env(safe-area-inset-bottom))]">
                            <AnimatePresence mode="wait">
                                {showError ? (
                                    <motion.p key="err"
                                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                        className="text-xs text-red-400 mb-1.5 flex items-center gap-1">
                                        <span>👆</span> Bitte zuerst deine Website-Adresse eingeben
                                    </motion.p>
                                ) : (
                                    <motion.p key="lbl"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                        className="text-[11px] text-slate-500 mb-1.5 font-medium">
                                        Deine Website-Adresse:
                                    </motion.p>
                                )}
                            </AnimatePresence>
                            <form onSubmit={e => submitWithRef(e, stickyMobileRef)} className="flex items-center gap-2">
                                <div className={`flex items-center gap-2 flex-1 px-3 py-3 border rounded-xl transition-all duration-200 ${
                                    showError ? 'bg-red-500/[0.06] border-red-500/40' : 'bg-white/[0.06] border-white/10 focus-within:border-violet-500/60 focus-within:bg-white/[0.08]'
                                }`}>
                                    <Globe className={`w-4 h-4 shrink-0 ${showError ? 'text-red-400' : 'text-slate-400'}`} />
                                    <input
                                        ref={stickyMobileRef}
                                        type="text"
                                        value={heroUrl}
                                        onChange={e => { setHeroUrl(e.target.value); if (e.target.value) setShowError(false) }}
                                        placeholder="meine-website.de"
                                        className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm outline-none"
                                        autoComplete="off" autoCapitalize="off" autoCorrect="off" inputMode="url" spellCheck={false}
                                    />
                                </div>
                                <button type="submit"
                                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 active:from-violet-500 active:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-150 shrink-0 shadow-lg shadow-violet-500/25">
                                    <Search className="w-4 h-4" />
                                    <span>Prüfen</span>
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    <motion.div
                        key="sticky-top"
                        initial={{ y: -64, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -64, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden sm:block fixed top-16 left-0 right-0 z-40 bg-[#05080f]/95 backdrop-blur-xl border-b border-white/8 py-2.5 px-8">
                        <div className="max-w-2xl mx-auto">
                            {showError && (
                                <p className="text-xs text-red-400 mb-1.5 flex items-center gap-1">
                                    Gib zuerst deine Website-Adresse ein, z.B. ihre-firma.de
                                </p>
                            )}
                            <form onSubmit={e => submitWithRef(e, stickyDesktopRef)} className={`flex items-center gap-2 p-1.5 border rounded-xl transition-all duration-200 shadow-lg shadow-black/20 ${
                                showError ? 'bg-red-500/[0.04] border-red-500/40' : 'bg-white/[0.04] border-white/10 focus-within:border-violet-500/50'
                            }`}>
                                <div className="flex items-center gap-2 flex-1 px-2">
                                    <Globe className={`w-4 h-4 shrink-0 ${showError ? 'text-red-400' : 'text-slate-500'}`} />
                                    <input
                                        ref={stickyDesktopRef}
                                        type="text"
                                        value={heroUrl}
                                        onChange={e => { setHeroUrl(e.target.value); if (e.target.value) setShowError(false) }}
                                        placeholder="meine-website.de"
                                        className="flex-1 bg-transparent text-white placeholder-slate-600 text-sm outline-none py-1.5"
                                        autoComplete="off" autoCapitalize="off" autoCorrect="off" inputMode="url" spellCheck={false}
                                    />
                                </div>
                                <button type="submit"
                                    className="flex items-center gap-2 px-4 sm:px-5 py-2 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md shadow-violet-500/20 shrink-0">
                                    <Search className="w-3.5 h-3.5" />
                                    <span>Website prüfen</span>
                                    <ArrowRight className="w-3 h-3" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>

        <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.04) 50%, transparent 70%)' }} />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)' }} />
                <div className="absolute inset-0"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-20">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                        <div>
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                                className="flex items-center gap-3 mb-6">
                                <div className="flex -space-x-1.5">
                                    {AVATARS.map(({ letter, color }) => (
                                        <div key={letter}
                                            className="w-6 h-6 rounded-full border-2 border-[#05080f] flex items-center justify-center text-[9px] font-bold text-white"
                                            style={{ background: color }}>
                                            {letter}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                    <span className="text-white font-semibold">80+</span>
                                    <span>Websites bereits analysiert</span>
                                </div>
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                                className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] sm:leading-none tracking-tight mb-3 sm:mb-6">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400">
                                    SEO, GEO & Performance.
                                </span><br />
                                Website-Audit in 60 Sekunden.
                            </motion.h1>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                                className="mb-5 sm:mb-8">
                                <label className="block text-sm text-slate-300 font-medium mb-2">
                                    Deine Website-Adresse eingeben:
                                </label>
                                <form ref={formRef} onSubmit={e => submitWithRef(e, inputRef)}
                                    className={`relative flex items-center gap-2 p-2 border rounded-2xl transition-all duration-200 shadow-xl shadow-black/20 mb-2 ${
                                        showError
                                            ? 'bg-red-500/[0.04] border-red-500/50'
                                            : 'bg-white/[0.03] border-white/10 focus-within:border-violet-500/50 focus-within:bg-white/[0.05]'
                                    }`}>
                                    <div className="flex items-center gap-3 flex-1 px-3">
                                        <Globe className={`w-4 h-4 shrink-0 ${showError ? 'text-red-400' : 'text-slate-500'}`} />
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={heroUrl}
                                            onChange={e => { setHeroUrl(e.target.value); if (e.target.value) setShowError(false) }}
                                            placeholder="meine-website.de"
                                            className="flex-1 bg-transparent text-white placeholder-slate-600 text-sm outline-none py-2"
                                            autoComplete="off" autoCapitalize="off" autoCorrect="off" inputMode="url" spellCheck={false}
                                        />
                                    </div>
                                    <button type="submit"
                                        className="flex items-center gap-2 px-5 sm:px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20 shrink-0">
                                        <Search className="w-4 h-4" />
                                        <span className="hidden sm:inline">Website prüfen</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </form>

                                <AnimatePresence mode="wait">
                                    {showError ? (
                                        <motion.p key="error"
                                            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-xs text-red-400 mb-4 flex items-center gap-1.5">
                                            Gib hier zuerst deine Website-Adresse ein, z.B. ihre-firma.de
                                        </motion.p>
                                    ) : (
                                        <motion.p key="info"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className="text-xs text-slate-500 mb-4">
                                            Kostenlos · Keine Registrierung nötig · 60 Sekunden
                                        </motion.p>
                                    )}
                                </AnimatePresence>

                                <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-semibold text-violet-400">Jetzt Pro holen</span>
                                        <div className="ml-auto flex items-baseline gap-1">
                                            <span className="text-xs text-slate-500">ab</span>
                                            <span className="text-sm font-bold text-white">€29</span>
                                            <span className="text-xs text-slate-500">/Monat</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mb-3">
                                        {PRO_FEATURES.map(({ icon: Icon, label, desc, color, bg, border }) => (
                                            <div key={label} className={`flex flex-col items-center text-center gap-1.5 p-2.5 rounded-lg border ${bg} ${border}`}>
                                                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-black/20">
                                                    <Icon className={`w-3.5 h-3.5 ${color}`} />
                                                </div>
                                                <span className="text-[11px] font-semibold text-slate-200 leading-tight">{label}</span>
                                                <span className="text-[10px] text-slate-500 leading-tight">{desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/pricing"
                                        className="flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-semibold bg-gradient-to-r from-violet-600/80 to-cyan-600/80 hover:from-violet-600 hover:to-cyan-600 text-white rounded-lg transition-all duration-200 shadow-md shadow-violet-500/10">
                                        Pro holen
                                        <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                                className="flex items-center gap-6 sm:gap-8">
                                {STATS.map((s, i) => (
                                    <div key={i} className="flex items-center gap-6 sm:gap-8">
                                        <div>
                                            <div className="text-xl sm:text-2xl font-bold text-white">{s.value}</div>
                                            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                                        </div>
                                        {i < STATS.length - 1 && <div className="h-6 w-px bg-white/10" />}
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
                            <AuditDemo />
                            <div className="absolute -inset-4 rounded-3xl blur-2xl -z-10 bg-violet-500/6" />
                        </motion.div>

                    </div>
                </div>
            </motion.div>
        </section>
        </>
    )
}