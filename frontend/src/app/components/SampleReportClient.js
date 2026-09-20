'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Search, Zap, Sparkles, Globe, FileText, Download, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'

const COPY = {
    de: {
        eyebrow: 'Kostenloser Download',
        title: 'So sieht ein echter Scanora-Report aus',
        subtitle: 'Wir haben unsere eigene Website scanora.ai geprüft und zeigen dir den kompletten, unbearbeiteten Report — SEO, Performance, Keywords, GEO und den vollen KI-Bericht.',
        disclaimer: 'Echte Analyse unserer eigenen Seite, transparent gekennzeichnet im PDF — kein Fake-Beispiel.',
        featuresTitle: 'Das steckt im Report',
        features: [
            { icon: Search, label: 'SEO-Analyse', desc: 'Title, Meta, Überschriften, Links — mit konkreten Problemen' },
            { icon: Zap, label: 'Performance-Analyse', desc: 'Ladezeiten, Core Web Vitals, Ressourcen' },
            { icon: FileText, label: 'Keyword Intelligence', desc: 'Top-Begriffe, Long-Tail-Ideen, Dichte' },
            { icon: Globe, label: 'GEO-Analyse', desc: 'Alle 23 KI-Sichtbarkeits-Signale im Detail' },
            { icon: Sparkles, label: 'KI-Bericht', desc: 'Von Claude generierte Einordnung & Aktionsplan' },
        ],
        formTitle: 'Report per E-Mail anfordern',
        formSubtitle: 'Du bekommst den Download sofort. Optional kannst du danach per E-Mail bestätigen, ob wir dir gelegentlich Tipps & Erinnerungen zu deiner KI-Sichtbarkeit schicken dürfen.',
        emailLabel: 'E-Mail-Adresse',
        emailPlaceholder: 'du@firma.de',
        submit: 'Report herunterladen',
        submitting: 'Wird vorbereitet…',
        privacyNote: 'Mit dem Absenden akzeptierst du unsere',
        privacyLink: 'Datenschutzerklärung',
        errorInvalid: 'Bitte eine gültige E-Mail-Adresse eingeben.',
        errorGeneric: 'Etwas ist schiefgelaufen. Bitte versuch es erneut.',
        successTitle: 'Fast geschafft!',
        successSubtitle: 'Der Download startet automatisch. Falls nicht:',
        successButton: 'Report jetzt öffnen',
        successEmailNote: 'Wir haben dir außerdem eine Bestätigungs-E-Mail geschickt — falls sie nicht ankommt, schau bitte auch in deinem Spam- bzw. Werbung-Ordner nach.',
        ctaTitle: 'Willst du deine eigene Website prüfen?',
        ctaButton: 'Jetzt kostenlos starten',
        downloadsLabel: (n) => `${n.toLocaleString('de-DE')} ${n === 1 ? 'Download' : 'Downloads'}`,
    },
    en: {
        eyebrow: 'Free Download',
        title: 'See what a real Scanora report looks like',
        subtitle: "We audited our own website, scanora.ai, and we're sharing the complete, unedited report — SEO, performance, keywords, GEO, and the full AI report.",
        disclaimer: 'A real analysis of our own site, clearly labeled in the PDF — not a fake mockup.',
        featuresTitle: "What's inside",
        features: [
            { icon: Search, label: 'SEO analysis', desc: 'Title, meta, headings, links — with concrete issues' },
            { icon: Zap, label: 'Performance analysis', desc: 'Load times, Core Web Vitals, resources' },
            { icon: FileText, label: 'Keyword intelligence', desc: 'Top terms, long-tail ideas, density' },
            { icon: Globe, label: 'GEO analysis', desc: 'All 23 AI visibility signals in detail' },
            { icon: Sparkles, label: 'AI report', desc: 'Claude-generated assessment & action plan' },
        ],
        formTitle: 'Get the report by email',
        formSubtitle: "You'll get the download right away. Afterwards, you can optionally confirm by email whether we may send you occasional tips & reminders about your AI visibility.",
        emailLabel: 'Email address',
        emailPlaceholder: 'you@company.com',
        submit: 'Download report',
        submitting: 'Preparing…',
        privacyNote: 'By submitting, you accept our',
        privacyLink: 'Privacy Policy',
        errorInvalid: 'Please enter a valid email address.',
        errorGeneric: 'Something went wrong. Please try again.',
        successTitle: 'Almost there!',
        successSubtitle: "Your download should start automatically. If not:",
        successButton: 'Open report now',
        successEmailNote: "We've also sent you a confirmation email — if it doesn't show up, please check your spam or promotions folder.",
        ctaTitle: 'Want to check your own website?',
        ctaButton: 'Start for free',
        downloadsLabel: (n) => `${n.toLocaleString('en-US')} ${n === 1 ? 'download' : 'downloads'}`,
    },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function track(eventName) {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName)
    }
}

export default function SampleReportClient({ locale = 'de' }) {
    const t = COPY[locale] || COPY.de
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('idle') // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('')
    const [downloadUrl, setDownloadUrl] = useState('')
    const [downloadsCount, setDownloadsCount] = useState(null)

    const homeHref = locale === 'en' ? '/en' : '/'
    const privacyHref = '/datenschutz'

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/sample-report/count`)
            .then(res => res.json())
            .then(data => setDownloadsCount(data.count))
            .catch(() => {})
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!EMAIL_RE.test(email.trim())) {
            setStatus('error')
            setErrorMsg(t.errorInvalid)
            return
        }
        setStatus('loading')
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sample-report`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), language: locale }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || t.errorGeneric)

            // /sample-report/download/:language (statt der statischen /reports/-Route) setzt
            // Content-Disposition: attachment und erzwingt so einen echten Download statt nur
            // den Browser-PDF-Viewer zu oeffnen.
            const url = `${process.env.NEXT_PUBLIC_API_URL}/sample-report/download/${locale}`
            setDownloadUrl(url)
            setStatus('success')
            setDownloadsCount(prev => (prev == null ? prev : prev + 1))
            track('sample_report_download')
            window.location.href = url
        } catch (err) {
            setStatus('error')
            setErrorMsg(err.message || t.errorGeneric)
        }
    }

    return (
        <div className="min-h-screen bg-[var(--bg-base)]">
            <Navbar />
            <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-28 pb-24">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* Left: pitch + feature list */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <div className="flex items-center flex-wrap gap-3 mb-4">
                            <span className="inline-block text-xs font-semibold text-[var(--accent)] uppercase tracking-wide">{t.eyebrow}</span>
                            {downloadsCount != null && downloadsCount > 0 && (
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-full px-3 py-1">
                                    <Download className="w-3 h-3 text-[var(--accent)]" />
                                    {t.downloadsLabel(downloadsCount)}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-5 leading-[1.1]">{t.title}</h1>
                        <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed mb-4">{t.subtitle}</p>
                        <div className="flex items-start gap-2 text-xs text-[var(--text-faint)] bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 mb-10">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)] shrink-0 mt-0.5" />
                            <span>{t.disclaimer}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">{t.featuresTitle}</span>
                            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                        </div>
                        <div className="space-y-2">
                            {t.features.map(({ icon: Icon, label, desc }) => (
                                <div key={label} className="flex items-center gap-3 px-4 py-3 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl">
                                    <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center shrink-0">
                                        <Icon className="w-4 h-4 text-[var(--accent)]" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm font-semibold text-[var(--text-white)] leading-tight">{label}</div>
                                        <div className="text-xs text-[var(--text-faint)] leading-tight mt-0.5">{desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: email-gate card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative lg:sticky lg:top-28 bg-[var(--bg-surface)] border border-[var(--accent-border)] rounded-2xl shadow-2xl shadow-[var(--accent-border)] overflow-hidden">
                        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[var(--accent-soft)] blur-3xl" />
                        <div className="relative z-10 p-6 sm:p-8">
                            {status === 'success' ? (
                                <div className="text-center py-4">
                                    <div className="w-14 h-14 rounded-2xl bg-[var(--success-soft)] border border-[var(--success-border)] flex items-center justify-center mx-auto mb-5">
                                        <CheckCircle2 className="w-6 h-6 text-[var(--success)]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--text-white)] mb-2">{t.successTitle}</h3>
                                    <p className="text-[var(--text-muted)] text-sm mb-6">{t.successSubtitle}</p>
                                    <a href={downloadUrl} target="_blank" rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] font-semibold rounded-xl transition-all shadow-lg shadow-[var(--accent-border)] active:scale-[0.97] active:duration-75">
                                        <Download className="w-4 h-4" />
                                        {t.successButton}
                                    </a>
                                    <div className="flex items-start gap-2 text-left mt-5 px-1">
                                        <AlertCircle className="w-3.5 h-3.5 text-[var(--text-faint)] shrink-0 mt-0.5" />
                                        <p className="text-xs text-[var(--text-faint)] leading-relaxed">{t.successEmailNote}</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center mb-5">
                                        <Mail className="w-6 h-6 text-[var(--accent)]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--text-white)] mb-1.5">{t.formTitle}</h3>
                                    <p className="text-[var(--text-muted)] text-sm mb-6">{t.formSubtitle}</p>

                                    <form onSubmit={handleSubmit} noValidate>
                                        <label htmlFor="sample-report-email" className="block text-xs font-semibold text-[var(--text-faint)] mb-2">{t.emailLabel}</label>
                                        <div className={`flex items-center gap-2 px-4 py-3 bg-[var(--surface-06)] border rounded-xl mb-1 transition-all ${
                                            status === 'error' ? 'border-[var(--danger)]' : 'border-[var(--border-subtle)] focus-within:border-[var(--accent-border)]'
                                        }`}>
                                            {status === 'error'
                                                ? <AlertCircle className="w-4 h-4 text-[var(--danger)] shrink-0" />
                                                : <Mail className="w-4 h-4 text-[var(--text-faint)] shrink-0" />}
                                            <input
                                                id="sample-report-email"
                                                type="email"
                                                value={email}
                                                onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle') }}
                                                placeholder={t.emailPlaceholder}
                                                disabled={status === 'loading'}
                                                className="flex-1 bg-transparent text-[var(--text-white)] placeholder-[var(--text-faint)] text-sm outline-none disabled:opacity-60"
                                                autoComplete="email"
                                            />
                                        </div>
                                        {status === 'error' && (
                                            <p className="text-xs text-[var(--danger)] mb-4">{errorMsg}</p>
                                        )}
                                        <button type="submit" disabled={status === 'loading'}
                                            className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] font-semibold rounded-xl transition-all shadow-lg shadow-[var(--accent-border)] active:scale-[0.97] active:duration-75 disabled:opacity-70 ${status !== 'error' ? 'mt-4' : ''}`}>
                                            {status === 'loading'
                                                ? <Loader2 className="w-4 h-4 animate-spin" />
                                                : <Download className="w-4 h-4" />}
                                            {status === 'loading' ? t.submitting : t.submit}
                                        </button>
                                        <p className="text-[11px] text-[var(--text-faint)] text-center mt-4">
                                            {t.privacyNote}{' '}
                                            <a href={privacyHref} className="underline hover:text-[var(--text-muted)]">{t.privacyLink}</a>.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Closing CTA back to the real product */}
                <div className="mt-20 pt-10 border-t border-[var(--border-subtle)] text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-white)] mb-5">{t.ctaTitle}</h2>
                    <a href={homeHref}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[var(--accent-border)]">
                        {t.ctaButton}<ArrowRight className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    )
}
