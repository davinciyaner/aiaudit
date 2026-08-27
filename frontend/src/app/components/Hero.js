'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, TrendingUp, Search } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

function normalizeUrl(input) {
    const trimmed = input.trim()
    if (!trimmed) return ''
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
    return 'https://' + trimmed
}

function HeroAuditInput() {
    const router = useRouter()
    const [url, setUrl] = useState('')
    const normalized = normalizeUrl(url)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!url.trim()) return toast.error('Bitte eine URL eingeben')
        sessionStorage.setItem('pendingAuditUrl', normalized)
        router.push('/dashboard')
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="relative flex items-center gap-3 p-2 bg-white/[0.03] border border-white/10 rounded-2xl focus-within:border-violet-500/50 focus-within:ring-2 focus-within:ring-cyan-400/40 focus-within:bg-white/[0.05] transition-all duration-200 shadow-xl shadow-black/20">
                <div className="flex items-center gap-3 flex-1 px-3">
                    <Globe className="w-4 h-4 text-slate-500 shrink-0" />
                    <label htmlFor="hero-audit-url" className="sr-only">Website-URL</label>
                    <input
                        id="hero-audit-url"
                        type="text"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder="deinewebsite.de"
                        className="flex-1 bg-transparent text-white placeholder-slate-600 text-sm outline-none py-2"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        inputMode="url"
                        spellCheck={false}
                    />
                    {url.trim() && !url.startsWith('http') && (
                        <span className="text-xs text-slate-500 shrink-0 hidden sm:block">→ {normalized}</span>
                    )}
                </div>
                <button type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-accent hover:opacity-90 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20 shrink-0">
                    <Search className="w-4 h-4" />Jetzt prüfen<ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
            <p className="text-xs text-slate-400 text-center mt-3">
                Start ohne Anmeldung · Für den vollen Report kostenlos registrieren · Ergebnis in ~60 Sekunden
            </p>
        </form>
    )
}

export default function Hero() {
    const router = useRouter()

    const goToAutomation = (e, dashboardHref, pricingHref) => {
        if (!localStorage.getItem('user')) {
            e.preventDefault()
            router.push(pricingHref)
        }
    }

    return (
        <main className="relative flex items-center pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.14) 0%, rgba(6,182,212,0.06) 45%, transparent 70%)' }} />

            <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 w-full">
                <div className="flex flex-col items-center text-center">

                    <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-5">
                        <span className="text-gradient-accent">Zitiert von ChatGPT.</span><br />
                        Sichtbar bei Google.
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-base sm:text-lg text-slate-400 mb-10 max-w-2xl leading-relaxed">
                        AuditAI trackt deine KI-Sichtbarkeit (AI Visibility) bei ChatGPT, Claude, Perplexity und Google AI Overview —
                        und deine SEO-Rankings bei Google. Ein Audit, konkrete Fixes statt generischen Tipps.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        className="w-full max-w-2xl mb-6">
                        <HeroAuditInput />
                    </motion.div>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <Link href="/geo/dashboard"
                            onClick={e => goToAutomation(e, '/geo/dashboard', '/geo/pricing')}
                            className="group inline-flex items-center gap-1.5 pl-3 pr-2.5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all duration-200">
                            <Globe className="w-3 h-3 text-slate-400 group-hover:text-cyan-300 transition-colors" />
                            <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">KI-Erwähnungen tracken</span>
                            <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 group-hover:text-cyan-300 transition-all" />
                        </Link>
                        <Link href="/seo/dashboard"
                            onClick={e => goToAutomation(e, '/seo/dashboard', '/seo/pricing')}
                            className="group inline-flex items-center gap-1.5 pl-3 pr-2.5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.06] transition-all duration-200">
                            <TrendingUp className="w-3 h-3 text-slate-400 group-hover:text-violet-300 transition-colors" />
                            <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">Rankings automatisch tracken</span>
                            <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 group-hover:text-violet-300 transition-all" />
                        </Link>
                    </div>

                    <div className="mt-5" google-add-preferred-source-btn="" data-theme="dark" data-lang="de" />
                </div>
            </div>
        </main>
    )
}