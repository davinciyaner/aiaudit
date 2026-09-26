'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
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
        router.push('/dashboard')
    }

    const barStateClass = showError
        ? 'border-[var(--danger)] focus-within:border-[var(--danger)] focus-within:ring-[var(--danger-soft)]'
        : showSuccess
            ? 'border-[var(--success-border)] focus-within:border-[var(--success)] focus-within:ring-[var(--success-soft)]'
            : 'border-[var(--border-subtle)] focus-within:border-[var(--accent-border)] focus-within:ring-[var(--accent-soft-strong)] focus-within:bg-[var(--surface-08)]'

    return (
        <form onSubmit={handleSubmit} className="w-full" noValidate>
            <label htmlFor="hero-audit-url" className="block text-xs font-semibold text-[var(--text-faint)] text-center mb-2">
                Website-URL
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
                        id="hero-audit-url"
                        type="text"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        onBlur={() => setTouched(true)}
                        disabled={submitting}
                        placeholder="deinewebsite.de"
                        aria-invalid={showError}
                        aria-describedby="hero-audit-url-hint"
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
                    <span>{submitting ? 'Wird geprüft…' : 'Jetzt kostenlos prüfen'}</span>
                    {!submitting && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
            </div>
            <p id="hero-audit-url-hint" role={showError ? 'alert' : undefined}
                className={`text-xs text-center mt-3 ${showError ? 'text-[var(--danger)]' : 'text-[var(--text-muted)]'}`}>
                {showError
                    ? 'Bitte eine URL eingeben'
                    : 'Start ohne Anmeldung · Für den vollen Report kostenlos registrieren · Ergebnis in ~60 Sekunden'}
            </p>
        </form>
    )
}

export default function Hero() {
    return (
        <section id="hero" className="relative flex items-center pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)' }} />

            <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 w-full">
                <div className="flex flex-col items-center text-center">

                    <div className="order-6 w-full max-w-2xl mt-10 mb-4 p-5 rounded-2xl bg-[var(--surface-06)] border border-[var(--border-subtle)] text-left">
                        <h2 className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide">Kurz erklärt</h2>
                        <p className="mt-2 text-sm text-[var(--text-body)] leading-relaxed">
                            Scanora ist eine SEO- &amp; GEO-Monitoring-Plattform aus Deutschland. Fürs SEO-Tracking bekommst du
                            wöchentlich automatisch aktualisierte Google-Rankings pro Keyword, Konkurrenzanalyse mit Content- und
                            Backlink-Gaps sowie Keyword-Ideen inkl. echtem Suchvolumen. Fürs GEO-Monitoring siehst du deine
                            Mention-Rate bei ChatGPT, Claude, Gemini, Perplexity und Google AI Overview, Zitate mit
                            Quellenkontext sowie deinen Share-of-Voice gegenüber Wettbewerbern — inklusive Abgleich, wo du bei
                            Google rankst vs. wo dich KI-Systeme nennen.
                        </p>
                        <p className="mt-2 text-sm text-[var(--text-body)] leading-relaxed">
                            Bei Ranking-Einbrüchen oder verlorenen KI-Erwähnungen bekommst du automatisch eine E-Mail mit
                            möglichen Ursachen. Einstieg kostenlos mit einem 60-Sekunden-Audit, danach laufendes automatisiertes
                            Monitoring ab 29 €/Monat (Pro, 10 Audits) oder 99 €/Monat (Agency, unbegrenzt).
                        </p>
                        <p className="mt-3 pt-3 border-t border-[var(--border-subtle)] text-xs text-[var(--text-faint)]">
                            Zuletzt aktualisiert: 12. September 2026 · Von Finn Paustian, Gründer von Scanora
                        </p>
                    </div>

                    <h1 className="order-1 text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-5">
                        AI Visibility &amp; SEO<br />
                        Google kennt dich - KI auch?
                    </h1>

                    <h2 className="order-2 text-sm font-semibold text-[var(--accent)] mb-4">
                        Scanora – AI Visibility & SEO Tool
                    </h2>

                    <p className="order-3 text-base sm:text-lg text-[var(--text-muted)] mb-8 max-w-2xl leading-relaxed">
                        Für Marketing-Teams und Agenturen: Scanora prüft, ob ChatGPT, Claude, Gemini, Perplexity und
                        Google AI Overview deine Seite kennen — und wie du bei Google rankst. Kostenloser Score
                        sofort, konkrete KI-Fixes ab Pro.
                    </p>

                    <div className="order-4 w-full max-w-2xl mb-8">
                        <HeroAuditInput />
                    </div>

                </div>
            </div>
        </section>
    )
}