'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Globe, Search, Bot, Camera, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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

    const goToAutomation = (e, dashboardHref, pricingHref) => {
        if (!localStorage.getItem('user')) {
            e.preventDefault()
            router.push(pricingHref)
        }
    }

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
                                        Bitte zuerst deine Website-Adresse eingeben
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
                                <div className={`flex items-center gap-2 flex-1 px-3 py-3 border rounded-xl duration-200 ${
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
                    <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

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
                                    <span className="text-white font-semibold">100+</span>
                                    <span>Websites bereits analysiert</span>
                                </div>
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                                className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] sm:leading-none tracking-tight mb-3 sm:mb-6">
                                <span className="bg-clip-text bg-gradient-to-r">
                                    SEO, GEO Automatisierung.
                                </span><br />
                                Website-Audit in 60 Sekunden.
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-sm sm:text-base text-slate-400 mb-5 sm:mb-6 max-w-3xl mx-auto">
                                SEO und KI-Sichtbarkeit deiner Website analysiert in 60 Sekunden.
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                                className="mb-5 sm:mb-8 w-full max-w-2xl mx-auto">
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
                                            Kostenlos · Start ohne Anmeldung · 60 Sekunden
                                        </motion.p>
                                    )}
                                </AnimatePresence>

                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                                    className="flex flex-wrap items-center justify-center gap-2">
                                    <span className="text-md text-slate-300">Mehr als ein Einmal-Check:</span>
                                    <Link href="/seo/dashboard"
                                        onClick={e => goToAutomation(e, '/seo/dashboard', '/seo/pricing')}
                                        className="group inline-flex items-center gap-1.5 pl-2.5 pr-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 hover:border-emerald-500/40 hover:scale-[1.03] transition-all duration-200">
                                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                                        <span className="text-xs font-semibold text-emerald-300">SEO Automatisierung</span>
                                        <ArrowRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                    <Link href="/geo/dashboard"
                                        onClick={e => goToAutomation(e, '/geo/dashboard', '/geo/pricing')}
                                        className="group inline-flex items-center gap-1.5 pl-2.5 pr-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/15 hover:border-violet-500/40 hover:scale-[1.03] transition-all duration-200">
                                        <Globe className="w-3 h-3 text-violet-400" />
                                        <span className="text-xs font-semibold text-violet-300">GEO Automatisierung</span>
                                        <ArrowRight className="w-3 h-3 text-violet-400 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                </motion.div>
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
                    </div>
                </div>
            </motion.div>
        </section>
        </>
    )
}