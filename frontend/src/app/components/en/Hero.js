'use client'
import { useState } from 'react'
import { ArrowRight, Globe, Search, CheckCircle2, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
        ? 'border-(--danger) focus-within:border-(--danger) focus-within:ring-(--danger-soft)'
        : showSuccess
            ? 'border-(--success-border) focus-within:border-(--success) focus-within:ring-(--success-soft)'
            : 'border-(--border-subtle) focus-within:border-(--accent-border) focus-within:ring-(--accent-soft-strong) focus-within:bg-(--surface-08)'

    return (
        <form onSubmit={handleSubmit} className="w-full" noValidate>
            <label htmlFor="hero-audit-url-en" className="block text-xs font-semibold text-(--text-faint) text-center mb-2">
                Website URL
            </label>
            <div className={`relative flex items-center gap-3 p-2 bg-(--surface-06) border rounded-2xl focus-within:ring-2 transition-all duration-200 shadow-card ${barStateClass}`}>
                <div className="flex items-center gap-3 flex-1 px-3">
                    {showError ? (
                        <AlertCircle className="w-4 h-4 text-(--danger) shrink-0" />
                    ) : showSuccess ? (
                        <CheckCircle2 className="w-4 h-4 text-(--success) shrink-0" />
                    ) : (
                        <Globe className="w-4 h-4 text-(--text-faint) shrink-0" />
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
                        className="flex-1 bg-transparent text-(--text-white) placeholder-(--text-faint) text-sm outline-none py-2 disabled:opacity-60"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        inputMode="url"
                        spellCheck={false}
                    />
                    {url.trim() && !url.startsWith('http') && (
                        <span className="text-xs text-(--text-faint) shrink-0 hidden sm:block">→ {normalized}</span>
                    )}
                </div>
                <button type="submit" disabled={submitting} aria-busy={submitting}
                    className="flex items-center gap-2 px-6 py-3 bg-(--accent) hover:bg-(--accent-hover) disabled:opacity-80 text-(--on-accent) text-sm font-semibold rounded-[10px] transition-all duration-200 active:scale-[0.97] active:duration-75 shrink-0">
                    {submitting
                        ? <span className="w-4 h-4 rounded-full border-2 border-(--bg-base)/30 border-t-(--bg-base) animate-spin" aria-hidden="true" />
                        : <Search className="w-4 h-4" />}
                    <span>{submitting ? 'Checking…' : 'Check for free now'}</span>
                    {!submitting && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
            </div>
            <p id="hero-audit-url-en-hint" role={showError ? 'alert' : undefined}
                className={`text-xs text-center mt-3 ${showError ? 'text-(--danger)' : 'text-(--text-muted)'}`}>
                {showError
                    ? 'Please enter a URL'
                    : 'Free · No sign-up to start · Register free for the full report · Results in ~60 seconds'}
            </p>
        </form>
    )
}

export default function Hero() {
    return (
        <section id="hero" className="relative flex items-center pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">

            <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 w-full">
                <div className="flex flex-col items-center text-center">

                    <div className="order-6 w-full max-w-2xl mt-10 mb-4 p-5 rounded-2xl bg-(--card) border border-(--line) text-left">
                        <h2 className="text-xs font-semibold text-(--accent-ink) ">In short</h2>
                        <p className="mt-2 text-sm text-(--text-body) leading-relaxed">
                            Scanora is an SEO &amp; GEO monitoring platform built in Germany. For SEO tracking, you get
                            weekly automated Google ranking updates per keyword, competitor analysis with content and
                            backlink gaps, and keyword ideas with real search volume. For GEO monitoring, you see your
                            mention rate across ChatGPT, Claude, Gemini, Perplexity, and Google AI Overview, citations
                            with source context, and your share of voice against competitors - including a side-by-side
                            of where you rank on Google vs. where AI systems mention you.
                        </p>
                        <p className="mt-2 text-sm text-(--text-body) leading-relaxed">
                            If your rankings drop or you lose AI mentions, you get an automatic email with likely
                            causes. Start free with a 60-second audit, then get ongoing automated monitoring from
                            €29/month (Pro, 10 audits) or €99/month (Agency, unlimited).
                        </p>
                        <p className="mt-3 pt-3 border-t border-(--border-subtle) text-xs text-(--text-faint)">
                            Updated: September 12, 2026 · By Finn Paustian, Founder of Scanora
                        </p>
                    </div>

                    <h1 className="order-1 text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-5">
                        AI Visibility &amp; SEO<br />
                        Google knows you - Does AI?
                    </h1>

                    <p className="order-2 text-sm font-semibold text-(--accent-ink) mb-4">
                        Scanora - AI Visibility & SEO Tool
                    </p>

                    <p className="order-3 text-base sm:text-lg text-(--text-muted) mb-10 max-w-2xl leading-relaxed">
                        For marketing teams and agencies: Scanora checks whether ChatGPT, Claude, Gemini, Perplexity
                        and Google AI Overview know your site - and how you rank on Google. Free score instantly,
                        concrete AI fixes from Pro.
                    </p>

                    <div className="order-4 w-full max-w-2xl mb-6">
                        <HeroAuditInput />
                    </div>

                </div>
            </div>
        </section>
    )
}
