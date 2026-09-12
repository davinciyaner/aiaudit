'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, TrendingUp, Search, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PLATFORM_META, ALL_PLATFORMS, PlatformIcon } from '../../geo/components/PlatformBadges'

function normalizeUrl(input) {
    const trimmed = input.trim()
    if (!trimmed) return ''
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
    return 'https://' + trimmed
}

function HeroAuditInput() {
    const router = useRouter()
    const [url, setUrl] = useState('')
    const [touched, setTouched] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const normalized = normalizeUrl(url)
    const isEmpty = !url.trim()
    const showError = touched && isEmpty
    const showSuccess = touched && !isEmpty

    const handleSubmit = (e) => {
        e.preventDefault()
        if (submitting) return
        if (isEmpty) {
            setTouched(true)
            return
        }
        setSubmitting(true)
        sessionStorage.setItem('pendingAuditUrl', normalized)
        router.push('/en/dashboard')
    }

    const barStateClass = showError
        ? 'border-[var(--danger)] focus-within:border-[var(--danger)] focus-within:ring-[var(--danger-soft)]'
        : showSuccess
            ? 'border-[var(--success-border)] focus-within:border-[var(--success)] focus-within:ring-[var(--success-soft)]'
            : 'border-[var(--border-subtle)] focus-within:border-[var(--accent-border)] focus-within:ring-[var(--accent-soft-strong)] focus-within:bg-[var(--surface-08)]'

    return (
        <form onSubmit={handleSubmit} className="w-full" noValidate>
            <label htmlFor="hero-audit-url-en" className="block text-xs font-semibold text-[var(--text-faint)] text-center mb-2">
                Website URL
            </label>
            <div className={`relative flex items-center gap-3 p-2 bg-[var(--surface-06)] border rounded-2xl focus-within:ring-2 transition-all duration-200 shadow-card ${barStateClass}`}>
                <div className="flex items-center gap-3 flex-1 px-3">
                    {showError ? (
                        <AlertCircle className="w-4 h-4 text-[var(--danger)] shrink-0" />
                    ) : showSuccess ? (
                        <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
                    ) : (
                        <Globe className="w-4 h-4 text-[var(--text-faint)] shrink-0" />
                    )}
                    <input
                        id="hero-audit-url-en"
                        type="text"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        onBlur={() => setTouched(true)}
                        disabled={submitting}
                        placeholder="yourwebsite.com"
                        aria-invalid={showError}
                        aria-describedby="hero-audit-url-en-hint"
                        className="flex-1 bg-transparent text-[var(--text-white)] placeholder-[var(--text-faint)] text-sm outline-none py-2 disabled:opacity-60"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        inputMode="url"
                        spellCheck={false}
                    />
                    {url.trim() && !url.startsWith('http') && (
                        <span className="text-xs text-[var(--text-faint)] shrink-0 hidden sm:block">→ {normalized}</span>
                    )}
                </div>
                <button type="submit" disabled={submitting} aria-busy={submitting}
                    className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:opacity-90 disabled:opacity-80 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[var(--accent-border)] active:scale-[0.97] active:duration-75 shrink-0">
                    {submitting
                        ? <span className="w-4 h-4 rounded-full border-2 border-[var(--bg-base)]/30 border-t-[var(--bg-base)] animate-spin" aria-hidden="true" />
                        : <Search className="w-4 h-4" />}
                    {submitting ? 'Checking…' : 'Check now'}
                    {!submitting && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
            </div>
            <p id="hero-audit-url-en-hint" role={showError ? 'alert' : undefined}
                className={`text-xs text-center mt-3 ${showError ? 'text-[var(--danger)]' : 'text-[var(--text-muted)]'}`}>
                {showError
                    ? 'Please enter a URL'
                    : 'Free · No sign-up to start · Register free for the full report · Results in ~60 seconds'}
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
        <main id="hero" className="relative flex items-center pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)' }} />

            <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 w-full">
                <div className="flex flex-col items-center text-center">

                    {/* Source order first (Answer-First for GEO/crawlers) but visually placed after the
                        CTA via `order-6` — decouples HTML text order from render position. */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        className="order-6 w-full max-w-2xl mt-10 mb-4 p-5 rounded-2xl bg-[var(--surface-06)] border border-[var(--border-subtle)] text-left">
                        <h2 className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide">In short</h2>
                        <p className="mt-2 text-sm text-[var(--text-body)] leading-relaxed">
                            Scanora is an SEO &amp; GEO monitoring platform built in Germany. For SEO tracking, you get
                            weekly automated Google ranking updates per keyword, competitor analysis with content and
                            backlink gaps, and keyword ideas with real search volume. For GEO monitoring, you see your
                            mention rate across ChatGPT, Claude, Gemini, Perplexity, and Google AI Overview, citations
                            with source context, and your share of voice against competitors — including a side-by-side
                            of where you rank on Google vs. where AI systems mention you.
                        </p>
                        <p className="mt-2 text-sm text-[var(--text-body)] leading-relaxed">
                            If your rankings drop or you lose AI mentions, you get an automatic email with likely
                            causes. Start free with a 60-second audit, then get ongoing automated monitoring from
                            €29/month (Pro, 10 audits) or €99/month (Agency, unlimited).
                        </p>
                        <p className="mt-3 pt-3 border-t border-[var(--border-subtle)] text-xs text-[var(--text-faint)]">
                            Updated: September 12, 2026 · By Finn Paustian, Founder of Scanora
                        </p>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        className="order-1 text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-5">
                        AI Visibility &amp; SEO<br />
                        Google knows you - Does AI?
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                        className="order-2 text-sm font-semibold text-[var(--accent)] mb-4">
                        Scanora – AI Visibility & SEO Tool
                    </motion.p>

                    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="order-3 text-base sm:text-lg text-[var(--text-muted)] mb-10 max-w-2xl leading-relaxed">
                        For marketing teams and agencies: Scanora checks whether ChatGPT, Claude, Gemini, Perplexity
                        and Google AI Overview know your site — and how you rank on Google. One audit, concrete
                        fixes instead of generic tips.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        className="order-4 w-full max-w-2xl mb-6">
                        <HeroAuditInput />
                    </motion.div>

                    <div className="order-5 flex flex-wrap items-center justify-center gap-2">
                        <Link href="/geo/dashboard"
                            onClick={e => goToAutomation(e, '/geo/dashboard', '/geo/pricing')}
                            className="group inline-flex items-center gap-1.5 pl-3 pr-2.5 py-2.5 rounded-full bg-[var(--surface-08)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] hover:bg-[var(--surface-10)] transition-all duration-200">
                            <Globe className="w-3 h-3 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                            <span className="text-xs font-medium text-[var(--text-body)] group-hover:text-[var(--text-white)] transition-colors">Start GEO Automation</span>
                            <ArrowRight className="w-3 h-3 text-[var(--text-faint)] group-hover:translate-x-0.5 group-hover:text-[var(--accent)] transition-all" />
                        </Link>
                        <Link href="/seo/dashboard"
                            onClick={e => goToAutomation(e, '/seo/dashboard', '/seo/pricing')}
                            className="group inline-flex items-center gap-1.5 pl-3 pr-2.5 py-2.5 rounded-full bg-[var(--surface-08)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] hover:bg-[var(--surface-10)] transition-all duration-200">
                            <TrendingUp className="w-3 h-3 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                            <span className="text-xs font-medium text-[var(--text-body)] group-hover:text-[var(--text-white)] transition-colors">Track rankings automatically</span>
                            <ArrowRight className="w-3 h-3 text-[var(--text-faint)] group-hover:translate-x-0.5 group-hover:text-[var(--accent)] transition-all" />
                        </Link>
                    </div>

                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="order-7 w-full max-w-3xl mt-14 pt-10 border-t border-[var(--border-subtle)]">
                        <h2 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-1.5 text-center">Run a GEO Check per AI tool</h2>
                        <p className="text-sm text-[var(--text-muted)] mb-5 max-w-lg mx-auto text-center">
                            Pick ChatGPT, Claude, Perplexity, or Google AI Overview — results in seconds, no sign-up required.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {ALL_PLATFORMS.map(p => {
                                const meta = PLATFORM_META[p]
                                return (
                                    <Link key={p} href={`/en/geo/check?platform=${p}`}
                                        title={`Check ${meta.label} visibility`}
                                        className={`flex flex-col items-center text-center gap-2 py-4 px-2 rounded-2xl border transition-all duration-200 hover-lift hover:-translate-y-2 ${meta.bg} ${meta.border} hover:border-opacity-60`}>
                                        <PlatformIcon platform={p} size="md" />
                                        <span className="text-sm font-semibold text-[var(--text-white)] leading-tight">{meta.label}</span>
                                        <span className="text-[11px] text-[var(--text-muted)]">Check visibility</span>
                                    </Link>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
