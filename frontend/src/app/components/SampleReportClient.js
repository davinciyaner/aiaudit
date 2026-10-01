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
        subtitle: 'Wir haben unsere eigene Website scanora.ai geprüft und zeigen dir den kompletten, unbearbeiteten Report: SEO, Performance, Keywords, GEO und den vollen KI-Bericht.',
        disclaimer: 'Echte Analyse unserer eigenen Seite, transparent gekennzeichnet im PDF, kein Fake-Beispiel.',
        featuresTitle: 'Das steckt im Report',
        features: [
            { icon: Search, label: 'SEO-Analyse', desc: 'Title, Meta, Überschriften, Links, mit konkreten Problemen' },
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
        successEmailNote: 'Wir haben dir außerdem eine Bestätigungs-E-Mail geschickt. Falls sie nicht ankommt, schau bitte auch in deinem Spam- bzw. Werbung-Ordner nach.',
        detailTitle: 'Was die einzelnen Abschnitte zeigen',
        detailLead: 'Der Report ist so aufgebaut, wie du ihn abarbeitest: oben der Gesamtscore, danach jeder Bereich mit Messwerten, gefundenen Problemen und Empfehlungen.',
        detail: [
            { h: 'SEO-Analyse', p: 'Prüft Title-Tag (30 bis 65 Zeichen), Meta Description, H1- und H2-Struktur, interne Links und Bilder ohne Alt-Text. Jeder Fund steht mit Priorität von Kritisch bis Niedrig im Report.' },
            { h: 'Performance-Analyse', p: 'Misst Time to First Byte, First Contentful Paint, Largest Contentful Paint, Cumulative Layout Shift, DOM- und volle Ladezeit sowie Seitengröße und Anzahl der Requests. Langsame und große Ressourcen werden einzeln aufgelistet.' },
            { h: 'Keyword-Analyse', p: 'Zeigt die häufigsten Begriffe deiner Seite mit Dichte, Begriffe, die nur einmal vorkommen, und Long-Tail-Ideen, die aus deinen eigenen Überschriften abgeleitet sind.' },
            { h: 'GEO-Analyse', p: '23 Signale, die beeinflussen, ob ChatGPT, Claude, Gemini oder Perplexity deine Seite verstehen und zitieren: Schema.org-Daten, llms.txt, erlaubte KI-Crawler, direkte Definitionen, Statistiken, Autoren- und Kontaktangaben, Canonical und HTTPS.' },
            { h: 'KI-Bericht', p: 'Ordnet alle Messwerte ein und macht daraus einen Aktionsplan mit konkreten Fixes, sortiert nach Wirkung. Fehlt eine llms.txt, liegt ein fertiger Vorschlag bei.' },
            { h: 'Screenshots', p: 'Der erste Bildschirm deiner Seite auf Desktop und Handy, so wie Besucher und Crawler ihn beim Laden sehen.' },
        ],
        accessTitle: 'Was du in deinem eigenen Audit bekommst',
        access: [
            ['Ohne Anmeldung', 'Gesamtscore und Scores für SEO, Performance und GEO'],
            ['Kostenloses Konto', 'Alle gefundenen Fehler und dein Audit-Verlauf'],
            ['Audit Pro', 'KI-Bericht mit konkreten Fixes, PDF-Report und Screenshots'],
        ],
        ctaTitle: 'Willst du deine eigene Website prüfen?',
        ctaButton: 'Jetzt kostenlos starten',
        downloadsLabel: (n) => `${n.toLocaleString('de-DE')} ${n === 1 ? 'Download' : 'Downloads'}`,
    },
    en: {
        eyebrow: 'Free Download',
        title: 'See what a real Scanora report looks like',
        subtitle: "We audited our own website, scanora.ai, and we're sharing the complete, unedited report: SEO, performance, keywords, GEO, and the full AI report.",
        disclaimer: 'A real analysis of our own site, clearly labeled in the PDF, not a fake mockup.',
        featuresTitle: "What's inside",
        features: [
            { icon: Search, label: 'SEO analysis', desc: 'Title, meta, headings, links, with concrete issues' },
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
        successEmailNote: "We've also sent you a confirmation email. If it doesn't show up, please check your spam or promotions folder.",
        detailTitle: 'What each section shows',
        detailLead: 'The report follows the order you work through it: the overall score first, then each area with measurements, issues found and recommendations.',
        detail: [
            { h: 'SEO analysis', p: 'Checks the title tag (30 to 65 characters), meta description, H1 and H2 structure, internal links and images without alt text. Every finding is listed with a priority from critical to low.' },
            { h: 'Performance analysis', p: 'Measures time to first byte, first contentful paint, largest contentful paint, cumulative layout shift, DOM and full load time, page size and request count. Slow and heavy resources are listed one by one.' },
            { h: 'Keyword analysis', p: 'Shows the most frequent terms on your page with their density, terms that appear only once, and long-tail ideas derived from your own headings.' },
            { h: 'GEO analysis', p: '23 signals that affect whether ChatGPT, Claude, Gemini or Perplexity understand and cite your page: Schema.org data, llms.txt, allowed AI crawlers, direct definitions, statistics, author and contact details, canonical and HTTPS.' },
            { h: 'AI report', p: 'Puts every measurement in context and turns it into an action plan with concrete fixes, sorted by impact. If your site has no llms.txt, a ready-to-use draft is included.' },
            { h: 'Screenshots', p: 'The first screen of your page on desktop and mobile, as visitors and crawlers see it on load.' },
        ],
        accessTitle: 'What you get in your own audit',
        access: [
            ['No sign-up', 'Overall score plus SEO, performance and GEO scores'],
            ['Free account', 'Every issue found and your audit history'],
            ['Audit Pro', 'AI report with concrete fixes, PDF report and screenshots'],
        ],
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
        <div className="min-h-screen bg-(--bg-base)">
            <Navbar />
            <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-28 pb-24">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* Left: pitch + feature list */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <div className="flex items-center flex-wrap gap-3 mb-4">
                            <span className="inline-block text-xs font-semibold text-(--accent-ink) ">{t.eyebrow}</span>
                            {downloadsCount != null && downloadsCount > 0 && (
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--text-muted) bg-(--card) border border-(--line) rounded-full px-3 py-1">
                                    <Download className="w-3 h-3 text-(--accent-ink)" />
                                    {t.downloadsLabel(downloadsCount)}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-5 leading-[1.1]">{t.title}</h1>
                        <p className="text-base sm:text-lg text-(--text-muted) leading-relaxed mb-4">{t.subtitle}</p>
                        <div className="flex items-start gap-2 text-xs text-(--text-faint) bg-(--card) border border-(--line) rounded-xl px-4 py-3 mb-10">
                            <CheckCircle2 className="w-3.5 h-3.5 text-(--success) shrink-0 mt-0.5" />
                            <span>{t.disclaimer}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs font-semibold text-(--accent-ink)">{t.featuresTitle}</span>
                            <div className="flex-1 h-px bg-(--border-subtle)" />
                        </div>
                        <div className="space-y-2">
                            {t.features.map(({ icon: Icon, label, desc }) => (
                                <div key={label} className="flex items-center gap-3 px-4 py-3 bg-(--card) border border-(--line) rounded-xl">
                                    <div className="w-9 h-9 rounded-lg bg-(--accent-soft) border border-(--accent-border) flex items-center justify-center shrink-0">
                                        <Icon className="w-4 h-4 text-(--accent-ink)" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm font-semibold text-(--text-white) leading-tight">{label}</div>
                                        <div className="text-xs text-(--text-faint) leading-tight mt-0.5">{desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: email-gate card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative lg:sticky lg:top-28 bg-(--bg-surface) border border-(--accent-border) rounded-2xl shadow-2xl shadow-(--accent-border) overflow-hidden">
                        <div className="relative z-10 p-6 sm:p-8">
                            {status === 'success' ? (
                                <div className="text-center py-4">
                                    <div className="w-14 h-14 rounded-2xl bg-(--success-soft) border border-(--success-border) flex items-center justify-center mx-auto mb-5">
                                        <CheckCircle2 className="w-6 h-6 text-(--success)" />
                                    </div>
                                    <h3 className="text-xl font-bold text-(--text-white) mb-2">{t.successTitle}</h3>
                                    <p className="text-(--text-muted) text-sm mb-6">{t.successSubtitle}</p>
                                    <a href={downloadUrl} target="_blank" rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) font-semibold rounded-[10px] transition-all active:scale-[0.97] active:duration-75">
                                        <Download className="w-4 h-4" />
                                        {t.successButton}
                                    </a>
                                    <div className="flex items-start gap-2 text-left mt-5 px-1">
                                        <AlertCircle className="w-3.5 h-3.5 text-(--text-faint) shrink-0 mt-0.5" />
                                        <p className="text-xs text-(--text-faint) leading-relaxed">{t.successEmailNote}</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="w-14 h-14 rounded-2xl bg-(--accent-soft) border border-(--accent-border) flex items-center justify-center mb-5">
                                        <Mail className="w-6 h-6 text-(--accent-ink)" />
                                    </div>
                                    <h3 className="text-xl font-bold text-(--text-white) mb-1.5">{t.formTitle}</h3>
                                    <p className="text-(--text-muted) text-sm mb-6">{t.formSubtitle}</p>

                                    <form onSubmit={handleSubmit} noValidate>
                                        <label htmlFor="sample-report-email" className="block text-xs font-semibold text-(--text-faint) mb-2">{t.emailLabel}</label>
                                        <div className={`flex items-center gap-2 px-4 py-3 bg-(--surface-06) border rounded-xl mb-1 transition-all ${
                                            status === 'error' ? 'border-(--danger)' : 'border-(--border-subtle) focus-within:border-(--accent-border)'
                                        }`}>
                                            {status === 'error'
                                                ? <AlertCircle className="w-4 h-4 text-(--danger) shrink-0" />
                                                : <Mail className="w-4 h-4 text-(--text-faint) shrink-0" />}
                                            <input
                                                id="sample-report-email"
                                                type="email"
                                                value={email}
                                                onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle') }}
                                                placeholder={t.emailPlaceholder}
                                                disabled={status === 'loading'}
                                                className="flex-1 bg-transparent text-(--text-white) placeholder-(--text-faint) text-sm outline-none disabled:opacity-60"
                                                autoComplete="email"
                                            />
                                        </div>
                                        {status === 'error' && (
                                            <p className="text-xs text-(--danger) mb-4">{errorMsg}</p>
                                        )}
                                        <button type="submit" disabled={status === 'loading'}
                                            className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) font-semibold rounded-[10px] transition-all active:scale-[0.97] active:duration-75 disabled:opacity-70 ${status !== 'error' ? 'mt-4' : ''}`}>
                                            {status === 'loading'
                                                ? <Loader2 className="w-4 h-4 animate-spin" />
                                                : <Download className="w-4 h-4" />}
                                            {status === 'loading' ? t.submitting : t.submit}
                                        </button>
                                        <p className="text-[11px] text-(--text-faint) text-center mt-4">
                                            {t.privacyNote}{' '}
                                            <a href={privacyHref} className="underline hover:text-(--text-muted)">{t.privacyLink}</a>.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Section-by-section explanation of the report */}
                <section className="mt-20 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
                    <div>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white)">{t.detailTitle}</h2>
                        <p className="mt-4 text-(--text-body) leading-relaxed">{t.detailLead}</p>
                    </div>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                        {t.detail.map(d => (
                            <div key={d.h} className="border-t border-(--line) pt-4">
                                <dt className="font-semibold text-(--text-white)">{d.h}</dt>
                                <dd className="mt-2 text-[15px] text-(--text-body) leading-relaxed">{d.p}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section className="mt-16">
                    <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-5">{t.accessTitle}</h2>
                    <div className="card divide-y divide-(--line-soft)">
                        {t.access.map(([tier, what]) => (
                            <div key={tier} className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 px-5 py-4">
                                <span className="font-semibold text-(--text-white)">{tier}</span>
                                <span className="text-(--text-body)">{what}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Closing CTA back to the real product */}
                <div className="mt-20 pt-10 border-t border-(--border-subtle) text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-(--text-white) mb-5">{t.ctaTitle}</h2>
                    <a href={homeHref}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) text-sm font-semibold rounded-[10px] transition-all duration-200 ">
                        {t.ctaButton}<ArrowRight className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    )
}
