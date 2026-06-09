'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Globe, Search, Bot } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ScoreRegisterModal from './ScoreRegisterModal'

const REVIEWS = [
    { name: 'Niklas',   text: 'Durch die Übersicht meiner Audits auf meinem Profil, habe ich einen viel besseren Überblick bekommen.' },
    { name: 'Thorsten', text: 'Ich bin durch den KI-Report direkt auf Seite 1 bei Google gerankt.' },
    { name: 'Daniel',   text: 'Ich habe sofort alle meine SEO-Fehler gefunden.' },
    { name: 'Max R.',   text: 'Habe sofort 3 Security-Lücken entdeckt, die ich nicht kannte.' },
]

const STATS = [
    { value: '300+', label: 'Registrierte Benutzer' },
    { value: 'max. 60s', label: 'bis zum fertigen Bericht' },
    { value: 'Gratis', label: 'kostenlos starten' },
]

// --- Audit Demo ---
const DEMO_URL = 'meine-website.de'

const BEFORE_SCORES = [
    { label: 'Overall', score: 34, color: '#ef4444' },
    { label: 'SEO', score: 52, color: '#ef4444' },
    { label: 'Perf', score: 28, color: '#ef4444' },
    { label: 'Sec', score: 19, color: '#ef4444' },
    { label: 'GEO', score: 11, color: '#ef4444' },
]
const AFTER_SCORES = [
    { label: 'Overall', score: 91, color: '#22c55e' },
    { label: 'SEO', score: 94, color: '#22c55e' },
    { label: 'Perf', score: 88, color: '#22c55e' },
    { label: 'Sec', score: 96, color: '#22c55e' },
    { label: 'GEO', score: 78, color: '#22c55e' },
]
const BEFORE_ISSUES = [
    { type: 'error', text: 'H1-Tag fehlt auf der Startseite' },
    { type: 'error', text: 'Security Headers nicht gesetzt' },
    { type: 'warn', text: 'Ladezeit: 4.8s — Richtwert: 2.5s' },
    { type: 'warn', text: 'Meta-Description auf 4 Seiten leer' },
]
const AFTER_ISSUES = [
    { type: 'success', text: 'H1-Tag optimiert und keyword-reich' },
    { type: 'success', text: 'CSP, HSTS & X-Frame-Options gesetzt' },
    { type: 'success', text: 'Ladezeit auf 1.8s reduziert' },
    { type: 'success', text: 'Meta-Descriptions vollständig' },
]
const SCAN_MODULES = [
    { label: 'SEO-Analyse', color: '#10b981' },
    { label: 'Security-Scan', color: '#ef4444' },
    { label: 'Performance', color: '#f59e0b' },
    { label: 'KI-Bericht', color: '#7c3aed' },
]
const FOUND_ISSUES = [
    { severity: 'Critical', text: '3 Security-Lücken gefunden', color: '#ef4444' },
    { severity: 'Warning', text: '5 SEO-Probleme erkannt', color: '#f59e0b' },
    { severity: 'Info', text: 'Performance unter Richtwert', color: '#6366f1' },
]
const DEMO_STEPS = [
    { id: 'before', label: 'Ausgangslage', duration: 3000 },
    { id: 'input',  label: 'URL eingeben',  duration: 2800 },
    { id: 'scan',   label: 'KI analysiert', duration: 3800 },
    { id: 'after',  label: 'Optimiert',     duration: 3200 },
]

function ScoreRow({ scores }) {
    return (
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-4">
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
    const [typedChars, setTypedChars] = useState(0)
    const [scanProgress, setScanProgress] = useState([0, 0, 0, 0])

    const step = DEMO_STEPS[stepIdx]

    useEffect(() => {
        const t = setTimeout(() => setStepIdx(i => (i + 1) % DEMO_STEPS.length), step.duration)
        return () => clearTimeout(t)
    }, [stepIdx, step.duration])

    useEffect(() => {
        if (stepIdx === 0) {
            setTypedChars(0)
            setScanProgress([0, 0, 0, 0])
        }
    }, [stepIdx])

    useEffect(() => {
        if (step.id !== 'input') return
        setTypedChars(0)
        let i = 0
        const iv = setInterval(() => {
            i++
            setTypedChars(i)
            if (i >= DEMO_URL.length) clearInterval(iv)
        }, 90)
        return () => clearInterval(iv)
    }, [stepIdx])

    useEffect(() => {
        if (step.id !== 'scan') {
            setScanProgress([0, 0, 0, 0])
            return
        }
        const targets = [92, 78, 85, 100]
        const timers = targets.map((target, i) =>
            setTimeout(() => setScanProgress(prev => prev.map((v, idx) => idx === i ? target : v)), 200 + i * 380)
        )
        return () => timers.forEach(clearTimeout)
    }, [stepIdx])

    const urlDisplay = DEMO_URL.slice(0, typedChars)
    const urlReady = typedChars >= DEMO_URL.length

    return (
        <div className="bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-1.5 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 bg-white/5 rounded px-3 py-1 text-[10px] text-slate-500">auditai.io</div>
                <div className="flex items-center gap-1.5 shrink-0">
                    {DEMO_STEPS.map((_, i) => (
                        <div key={i} className="h-1.5 rounded-full transition-all duration-500"
                            style={{
                                width: i === stepIdx ? '20px' : '6px',
                                background: i === stepIdx ? '#7c3aed' : i < stepIdx ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.07)'
                            }} />
                    ))}
                </div>
            </div>

            {/* Step label */}
            <div className="px-5 pt-3">
                <div className="text-[10px] uppercase tracking-widest font-semibold text-slate-600">{step.label}</div>
            </div>

            {/* Animated content */}
            <div className="p-5 pt-2 min-h-[268px] sm:min-h-[290px]">
                <AnimatePresence mode="wait">

                    {step.id === 'before' && (
                        <motion.div key="before"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[11px] text-slate-500">meine-website.de - Aktueller Stand</span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400">VORHER</span>
                            </div>
                            <ScoreRow scores={BEFORE_SCORES} />
                            <div className="space-y-1.5">
                                {BEFORE_ISSUES.map((issue, i) => <IssueItem key={i} {...issue} />)}
                            </div>
                        </motion.div>
                    )}

                    {step.id === 'input' && (
                        <motion.div key="input"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col justify-center h-[268px] sm:h-[290px]">
                            <p className="text-xs text-slate-500 mb-5 text-center">URL eingeben und Audit starten</p>
                            <div className="flex items-center gap-2 px-3 py-3 mb-3 bg-white/[0.04] border border-violet-500/30 rounded-xl">
                                <Globe className="w-4 h-4 text-slate-500 shrink-0" />
                                <span className="flex-1 text-sm text-white">
                                    {urlDisplay}
                                    <span className="inline-block w-0.5 h-4 bg-violet-400 ml-0.5 animate-pulse align-middle" />
                                </span>
                            </div>
                            <motion.div
                                className="w-full py-3 rounded-xl text-sm font-semibold text-center transition-all duration-500"
                                animate={urlReady
                                    ? { background: 'linear-gradient(to right, #7c3aed, #0891b2)', color: '#fff', boxShadow: '0 4px 20px rgba(124,58,237,0.3)' }
                                    : { background: 'rgba(255,255,255,0.04)', color: 'rgba(100,116,139,0.7)', boxShadow: 'none' }
                                }>
                                {urlReady ? 'Website prüfen →' : 'Website prüfen'}
                            </motion.div>
                            <p className="text-[10px] text-slate-600 text-center mt-3">Kostenlos · Registrierung erforderlich</p>
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
                                <span className="text-xs text-slate-300 font-medium">KI analysiert meine-website.de</span>
                            </div>
                            <div className="space-y-3 mb-4">
                                {SCAN_MODULES.map((mod, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-[11px] text-slate-400">{mod.label}</span>
                                            <span className="text-[11px] font-mono tabular-nums" style={{ color: mod.color }}>
                                                {scanProgress[i]}%
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full rounded-full transition-all duration-[1100ms] ease-out"
                                                style={{ width: `${scanProgress[i]}%`, background: mod.color }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-white/5 pt-3 space-y-2">
                                <div className="text-[10px] text-slate-600 mb-1.5">Erste Funde:</div>
                                {FOUND_ISSUES.map((issue, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.9 + i * 0.35 }}
                                        className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded shrink-0"
                                            style={{ background: issue.color + '20', color: issue.color }}>
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
                                <span className="text-[11px] text-slate-500">meine-website.de - Nach Optimierung</span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">NACHHER</span>
                            </div>
                            <ScoreRow scores={AFTER_SCORES} />
                            <div className="space-y-1.5">
                                {AFTER_ISSUES.map((issue, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.12 }}>
                                        <IssueItem {...issue} />
                                    </motion.div>
                                ))}
                            </div>
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
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showRegModal, setShowRegModal] = useState(false)
    const [pendingModalUrl, setPendingModalUrl] = useState('')
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
        setIsLoggedIn(!!localStorage.getItem('token'))
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (!formRef.current) return
            const rect = formRef.current.getBoundingClientRect()
            if (rect.bottom < 80) {
                setShowStickyBar(true)
            } else if (rect.top > 300) {
                setShowStickyBar(false)
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const submitWithRef = (e, ref) => {
        e.preventDefault()
        if (!heroUrl.trim()) {
            setShowError(true)
            ref?.current?.focus()
            return
        }
        setShowError(false)
        const normalized = heroUrl.trim().startsWith('http') ? heroUrl.trim() : 'https://' + heroUrl.trim()
        sessionStorage.setItem('pendingAuditUrl', normalized)
        if (!isLoggedIn) {
            setPendingModalUrl(normalized)
            setShowRegModal(true)
            return
        }
        router.push('/dashboard')
    }

    return (
        <>
        <ScoreRegisterModal
            open={showRegModal}
            onClose={() => setShowRegModal(false)}
            auditUrl={pendingModalUrl}
            mode="start"
        />
        <AnimatePresence>
            {showStickyBar && (
                <>
                    {/* Mobile: bar am unteren Bildschirmrand */}
                    <motion.div
                        key="sticky-bottom"
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 80, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed bottom-0 left-0 right-0 z-40 sm:hidden"
                        style={{ boxShadow: '0 -4px 24px rgba(0,0,0,0.5), 0 -1px 0 rgba(124,58,237,0.15)' }}
                    >
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
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        inputMode="url"
                                        spellCheck={false}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 active:from-violet-500 active:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-150 shrink-0 shadow-lg shadow-violet-500/25"
                                >
                                    <Search className="w-4 h-4" />
                                    <span>Prüfen</span>
                                </button>
                            </form>
                        </div>
                    </motion.div>
                    {/* Desktop: bar unter der Navbar */}
                    <motion.div
                        key="sticky-top"
                        initial={{ y: -64, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -64, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden sm:block fixed top-16 left-0 right-0 z-40 bg-[#05080f]/95 backdrop-blur-xl border-b border-white/8 py-2.5 px-8"
                    >
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
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        inputMode="url"
                                        spellCheck={false}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-4 sm:px-5 py-2 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md shadow-violet-500/20 shrink-0"
                                >
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
                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                                className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] sm:leading-none tracking-tight mb-6">
                                SEO-Test &amp;<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400">Website-Audit.</span><br />
                                Kostenlos in 60s.
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-base sm:text-lg text-slate-200 leading-relaxed mb-10 max-w-lg">
                                Die meisten Websites verlieren täglich Besucher durch Fehler, die man nicht sieht. Finde in 60 Sekunden heraus was auf deiner Website falsch läuft - mit konkreten Fixes.
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-10">
                                {/* flex-col-reverse on mobile: form first, reviews below */}
                                <div className="flex flex-col-reverse sm:flex-col">
                                    {/* Reviews grid */}
                                    <div className="grid grid-cols-2 gap-2 mt-4 sm:mt-0 sm:mb-6">
                                        {REVIEWS.map((r, i) => (
                                            <div key={i} className="bg-white/[0.03] border border-white/8 rounded-xl p-3">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="text-yellow-400 text-xs tracking-tight leading-none">★★★★★</span>
                                                    <span className="text-[10px] text-slate-500 leading-none">{r.name}</span>
                                                </div>
                                                <p className="text-[11px] text-slate-300 leading-relaxed">{r.text}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Form */}
                                    <div>
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
                                                    autoComplete="off"
                                                    autoCapitalize="off"
                                                    autoCorrect="off"
                                                    inputMode="url"
                                                    spellCheck={false}
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
                                                    className="text-xs text-red-400 mb-3 flex items-center gap-1.5">
                                                    Gib hier zuerst deine Website-Adresse ein, z.B. ihre-firma.de
                                                </motion.p>
                                            ) : (
                                                <motion.div key="info"
                                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="flex items-center gap-4 mb-3">
                                                    <span className="text-xs text-slate-600">Kostenlos · Registrierung erforderlich · ~60 Sekunden</span>
                                                    <Link href="#testautomation" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors ml-auto">
                                                        <Bot className="w-3.5 h-3.5 text-violet-400" />
                                                        Testautomatisierung
                                                    </Link>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
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