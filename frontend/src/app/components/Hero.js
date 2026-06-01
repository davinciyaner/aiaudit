'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Zap, AlertTriangle, ArrowRight, Check, Shield, Globe, Search } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const MOCK_SCORES_BEFORE = [
    { label: 'Overall', score: 34, color: '#ef4444' },
    { label: 'SEO', score: 52, color: '#ef4444' },
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
    { type: 'error', text: 'H1-Tag fehlt — Suchmaschinen finden keinen Seiteninhalt' },
    { type: 'error', text: 'Meta-Description auf 7 Seiten leer — kein Snippet in Google' },
    { type: 'error', text: '14 Bilder ohne Alt-Text — unsichtbar für Crawler' },
    { type: 'warn', text: 'Title-Tag zu lang: 76 Zeichen (optimal: 30–60)' },
    { type: 'warn', text: 'Kein Canonical-Tag gesetzt — Duplicate-Content-Risiko' },
    { type: 'success', text: 'HTTPS aktiv mit gültigem SSL-Zertifikat' },
]
const MOCK_ISSUES_AFTER = [
    { type: 'success', text: 'H1-Tag gesetzt und keyword-optimiert' },
    { type: 'success', text: 'Alle Meta-Descriptions vorhanden — max. 155 Zeichen' },
    { type: 'success', text: '14 Bilder mit beschreibendem Alt-Text versehen' },
    { type: 'success', text: 'Title-Tag optimiert: 48 Zeichen — perfekter Bereich' },
    { type: 'success', text: 'Canonical-Tags auf allen Seiten gesetzt' },
    { type: 'success', text: 'FAQ-Schema erkannt — Rich Snippets in Google möglich' },
]
const STATS = [
    { value: 'SEO-Score', label: 'plus Security & Performance' },
    { value: '< 60s', label: 'vollständiger SEO-Bericht' },
    { value: 'PDF', label: 'Report zum Download' },
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
                    {scores.map(({ label: l, score, color }) => {
                        const isSeo = l === 'SEO'
                        return (
                            <div key={l}
                                className="bg-white/[0.03] rounded-xl p-2.5 text-center transition-all duration-300"
                                style={isSeo ? {
                                    border: `1px solid ${color}`,
                                    boxShadow: `0 0 0 2px ${color}35, 0 0 14px ${color}25`,
                                } : { border: '1px solid rgba(255,255,255,0.05)' }}
                            >
                                <div className="text-xl font-bold" style={{ color }}>{score}</div>
                                <div className="text-[9px] text-slate-600 mt-0.5">{l}</div>
                            </div>
                        )
                    })}
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
    const [heroUrl, setHeroUrl] = useState('')
    const [showStickyBar, setShowStickyBar] = useState(false)
    const heroRef = useRef(null)
    const formRef = useRef(null)
    const router = useRouter()
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    useEffect(() => {
        const handleScroll = () => {
            if (!formRef.current) return
            const rect = formRef.current.getBoundingClientRect()
            // Zeigen: Form-Unterkante scrollt über Navbar (80px)
            if (rect.bottom < 80) {
                setShowStickyBar(true)
            // Verstecken: Form-Oberkante hat genug Platz — User ist klar oben
            } else if (rect.top > 300) {
                setShowStickyBar(false)
            }
            // Hysterese-Zone dazwischen: Status bleibt erhalten
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleHeroSubmit = (e) => {
        e.preventDefault()
        if (!heroUrl.trim()) return
        const normalized = heroUrl.trim().startsWith('http') ? heroUrl.trim() : 'https://' + heroUrl.trim()
        sessionStorage.setItem('pendingAuditUrl', normalized)
        router.push('/dashboard')
    }

    return (
        <>
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
                        <div className="bg-[#080b14] border-t border-white/10 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
                            <form onSubmit={handleHeroSubmit} className="flex items-center gap-2">
                                <div className="flex items-center gap-2 flex-1 px-3 py-3 bg-white/[0.06] border border-white/10 rounded-xl focus-within:border-violet-500/60 focus-within:bg-white/[0.08] transition-all duration-200">
                                    <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                                    <input
                                        type="text"
                                        value={heroUrl}
                                        onChange={e => setHeroUrl(e.target.value)}
                                        placeholder="yourwebsite.com"
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
                        <form onSubmit={handleHeroSubmit} className="max-w-2xl mx-auto flex items-center gap-2 p-1.5 bg-white/[0.04] border border-white/10 rounded-xl focus-within:border-violet-500/50 transition-all duration-200 shadow-lg shadow-black/20">
                            <div className="flex items-center gap-2 flex-1 px-2">
                                <Globe className="w-4 h-4 text-slate-500 shrink-0" />
                                <input
                                    type="text"
                                    value={heroUrl}
                                    onChange={e => setHeroUrl(e.target.value)}
                                    placeholder="yourwebsite.com"
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
                    </motion.div>
                </>
            )}
        </AnimatePresence>
        <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-3xl" style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.04) 50%, transparent 70%)' }} />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)' }} />
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-20">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                        <div>

                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                                       className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] sm:leading-[1.0] tracking-tight mb-6">
                                SEO-Test &amp;<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400">Website-Audit.</span><br />
                                Kostenlos in 60s.
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                                      className="text-base sm:text-lg text-slate-200 leading-relaxed mb-10 max-w-lg">
                                Prüfe kostenlos Title-Tags, Meta-Descriptions, H1-Tags, Core Web Vitals, Security-Headers und KI-Sichtbarkeit - vollständiger SEO-Test in unter 60 Sekunden, mit konkreten Fixes.
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                                        className="mb-10">
                                <form ref={formRef} onSubmit={handleHeroSubmit} className="relative flex items-center gap-2 p-2 bg-white/[0.03] border border-white/10 rounded-2xl focus-within:border-violet-500/50 focus-within:bg-white/[0.05] transition-all duration-200 shadow-xl shadow-black/20 mb-3">
                                    <div className="flex items-center gap-3 flex-1 px-3">
                                        <Globe className="w-4 h-4 text-slate-500 shrink-0" />
                                        <input
                                            type="text"
                                            value={heroUrl}
                                            onChange={e => setHeroUrl(e.target.value)}
                                            placeholder="yourwebsite.com"
                                            className="flex-1 bg-transparent text-white placeholder-slate-600 text-sm outline-none py-2"
                                            autoComplete="off"
                                            autoCapitalize="off"
                                            autoCorrect="off"
                                            inputMode="url"
                                            spellCheck={false}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-5 sm:px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20 shrink-0"
                                    >
                                        <Search className="w-4 h-4" />
                                        <span className="hidden sm:inline">Website prüfen</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </form>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-slate-600">Kostenlos · Kein Account nötig · ~60 Sekunden</span>
                                    <Link href="#security" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors ml-auto">
                                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                                        Sicherheitsrisiken ansehen
                                    </Link>
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
                            <div className="flex items-center gap-3 mb-4 justify-center sm:justify-end">
                                <span className="text-xs text-slate-200">Vorher</span>
                                <button onClick={() => setShowAfter(!showAfter)}
                                        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${showAfter ? 'bg-gradient-to-r from-violet-600 to-cyan-600' : 'bg-white/10'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${showAfter ? 'left-7' : 'left-1'}`} />
                                </button>
                                <span className="text-xs text-slate-200">Nachher</span>
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
        </>
    )
}