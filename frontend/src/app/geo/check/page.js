'use client'
import { useState, useEffect, useRef, useMemo, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, X, Check, AlertCircle, ArrowRight, Lock, Loader2, Sparkles, MousePointerClick, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import Navbar from '../../components/Navbar'
import { PLATFORM_META, ALL_PLATFORMS, PlatformIcon, SentimentBadge } from '../components/PlatformBadges'

const HOW_IT_WORKS = [
    { icon: Globe, label: 'Domain & Keyword eingeben' },
    { icon: MousePointerClick, label: 'Plattform auswählen' },
    { icon: Sparkles, label: 'Ergebnis in Sekunden' },
]

const FAQS = [
    {
        q: 'Wie kann ich prüfen, ob meine Website von ChatGPT oder Claude zitiert wird?',
        a: 'Mit dem kostenlosen GEO Check von Scanora: Domain und Keyword eingeben, eine Plattform (ChatGPT, Claude, Perplexity oder Google AI Overview) auswählen und in wenigen Sekunden siehst du, ob und wie deine Website dort erwähnt wird - ganz ohne Registrierung.',
    },
    {
        q: 'Ist der GEO Check wirklich kostenlos?',
        a: 'Ja, jeder Account bzw. jede IP-Adresse kann den GEO Check einmal komplett kostenlos nutzen. Für wiederkehrende Prüfungen und mehrere Plattformen gleichzeitig gibt es GEO Automatisierung ab 4,99 €/Monat.',
    },
    {
        q: 'Welche KI-Modelle werden geprüft?',
        a: 'ChatGPT, Claude, Perplexity und Google AI Overview - die vier meistgenutzten KI-Systeme, die Nutzer heute für Produktempfehlungen befragen.',
    },
    {
        q: 'Was ist der Unterschied zwischen GEO Check und GEO Automatisierung?',
        a: 'Der GEO Check ist eine einmalige Prüfung: Er zeigt zu einem Zeitpunkt, ob eine Plattform deine Website nennt. GEO Automatisierung ist die laufende Version davon - sie prüft wöchentlich automatisch bis zu fünf KI-Systeme (Claude, ChatGPT, Gemini, Perplexity und Google AI Overview), berechnet deine Mention-Rate über Zeit und meldet Änderungen per E-Mail, statt dass du manuell neu prüfen musst.',
    },
]

const GEO_TIPS = [
    { title: 'Klare Produktdefinition', desc: '"X ist Y für Z" in den ersten 100 Wörtern der Startseite - ohne Marketingfloskeln.' },
    { title: 'KI-Crawler erlauben', desc: 'GPTBot, ClaudeBot und PerplexityBot dürfen nicht in robots.txt blockiert sein.' },
    { title: 'Schema.org + FAQ-Schema', desc: 'Strukturierte Daten, kombiniert mit echtem, sichtbarem FAQ-Text auf der Seite.' },
    { title: 'Zitierbare Fakten & Zahlen', desc: 'Konkrete Statistiken und Daten, die KI-Modelle gerne wörtlich übernehmen.' },
    { title: 'E-E-A-T-Signale', desc: 'Autor, Kontakt, Impressum und eine About-Seite erhöhen das Vertrauen der KI-Modelle.' },
]

function normalizeUrl(input) {
    const trimmed = input.trim()
    if (!trimmed) return ''
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
    return 'https://' + trimmed
}

function validateDomainOnly(input) {
    if (!input.trim()) return null
    try {
        const parsed = new URL(input.startsWith('http') ? input : `https://${input}`)
        if ((parsed.pathname && parsed.pathname !== '/') || parsed.search || parsed.hash) {
            return 'Bitte nur die Domain eingeben (z.B. example.com) - keine Pfade, Parameter oder Tokens.'
        }
        return null
    } catch {
        return null
    }
}

function extractDomain(url) {
    try {
        return new URL(url).hostname.replace(/^www\./i, '').toLowerCase()
    } catch {
        return null
    }
}

function isLikelyValidDomain(normalizedUrl) {
    const host = extractDomain(normalizedUrl)
    return !!host && host.includes('.') && !host.endsWith('.')
}

const POLL_INTERVAL_MS = 800
const MAX_CUSTOM_PROMPT_LENGTH = 300

// Statischer Content (H1, Definition, "So funktioniert's", FAQ) hängt an keinerlei
// searchParams-abhängigem State und steht deshalb außerhalb des Suspense-Boundary - er ist damit
// immer Teil des Server-HTML, auch bevor das Client-JS hydriert. Nur das eigentliche Formular
// braucht `useSearchParams()` (fürs Vorausfüllen der Plattform per Deep-Link) und bleibt deshalb
// in Suspense gekapselt; vorher hatte `fallback={null}` zur Folge, dass Crawler ohne
// JS-Ausführung (curl, viele Bots) auf der gesamten Seite null Wörter Text zu sehen bekamen.
export default function GeoCheckPage() {
    return (
        <div className="min-h-screen bg-(--bg-base)">
            <Navbar />

            <main className="max-w-2xl mx-auto px-5 sm:px-8 pt-28 sm:pt-32 pb-24">
                <div className="text-center mb-8">
                    <h1 className="text-[clamp(34px,4.4vw,54px)] leading-[1.05] tracking-[-0.038em] font-bold text-(--text-white) mb-5">
                        GEO Check: Wirst du von ChatGPT &amp; Co. zitiert?
                    </h1>
                    <p className="text-(--text-muted) leading-relaxed max-w-lg mx-auto">
                        Ein GEO Check ist eine einmalige oder wiederkehrende Prüfung, ob eine Website von KI-Systemen wie ChatGPT, Claude, Gemini, Perplexity oder der Google AI Overview als Quelle zitiert wird. Der GEO Check von Scanora ist ein kostenloses Tool für Websitebetreiber: Domain und Keyword eingeben, eine Plattform (ChatGPT, Claude, Perplexity oder Google AI Overview) wählen und in Sekunden sehen, ob die eigene Domain genannt wird - ganz ohne Registrierung.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6">
                    {HOW_IT_WORKS.map((step, i) => (
                        <div key={i} className="flex flex-col items-center text-center gap-2 py-4 px-2 rounded-xl bg-(--card) border border-(--line)">
                            <div className="w-8 h-8 rounded-full bg-(--accent-soft) border border-(--accent-border) flex items-center justify-center">
                                <step.icon className="w-4 h-4 text-(--accent-ink)" />
                            </div>
                            <span className="text-[11px] sm:text-xs text-(--text-white) leading-tight">{step.label}</span>
                        </div>
                    ))}
                </div>

                <Suspense fallback={<div className="h-105 rounded-2xl bg-(--card) border border-(--line) animate-pulse" />}>
                    <GeoCheckForm />
                </Suspense>

                <section className="mt-16">
                    <h2 className="text-lg font-bold text-(--text-white) mb-5 text-center">Häufige Fragen</h2>
                    <div className="space-y-3">
                        {FAQS.map((faq, i) => (
                            <div key={i} className="bg-(--card) border border-(--line) rounded-2xl p-5">
                                <h3 className="font-semibold text-(--text-white) mb-2 text-sm">{faq.q}</h3>
                                <p className="text-sm text-(--text-muted) leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

function GeoCheckForm() {
    const searchParams = useSearchParams()
    const platformParam = searchParams.get('platform')
    const initialPlatform = ALL_PLATFORMS.includes(platformParam) ? platformParam : null

    const [domain, setDomain] = useState('')
    const [keyword, setKeyword] = useState('')
    const [promptMode, setPromptMode] = useState('keyword') // 'keyword' | 'custom'
    const [customPrompt, setCustomPrompt] = useState('')
    const [platform, setPlatform] = useState(initialPlatform)
    const [platformLocked, setPlatformLocked] = useState(!!initialPlatform)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [phase, setPhase] = useState('form')
    const [checkId, setCheckId] = useState(null)
    const [statusData, setStatusData] = useState(null)
    const [formError, setFormError] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const pollTimer = useRef(null)

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'))
    }, [])

    useEffect(() => () => clearInterval(pollTimer.current), [])

    const trimmedDomain = domain.trim()
    const normalizedDomain = normalizeUrl(domain)
    const domainError = useMemo(() => validateDomainOnly(domain), [domain])
    const queryLabel = promptMode === 'custom' ? customPrompt.trim() : keyword.trim()

    useEffect(() => {
        if (phase !== 'polling' || !checkId) return
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        const headers = token ? { Authorization: `Bearer ${token}` } : {}

        pollTimer.current = setInterval(async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo-check/${checkId}`, { headers })
                if (!res.ok) return
                const data = await res.json()
                setStatusData(data)
                if (data.status === 'done') {
                    clearInterval(pollTimer.current)
                    setPhase('results')
                }
            } catch {}
        }, POLL_INTERVAL_MS)

        return () => clearInterval(pollTimer.current)
    }, [phase, checkId])

    useEffect(() => {
        if (phase === 'results' && statusData?.status === 'done') {
            sessionStorage.setItem('pendingGeoCheck', JSON.stringify({
                domain: extractDomain(normalizedDomain),
                keyword: queryLabel,
                platform: statusData.platform,
                label: statusData.label,
                mentioned: statusData.mentioned,
            }))
        }
    }, [phase, statusData])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!trimmedDomain) return setFormError('Bitte eine Domain eingeben')
        if (domainError) return setFormError(domainError)
        if (promptMode === 'custom') {
            if (!customPrompt.trim()) return setFormError('Bitte einen Prompt eingeben')
            if (customPrompt.trim().length > MAX_CUSTOM_PROMPT_LENGTH) return setFormError(`Prompt zu lang (max. ${MAX_CUSTOM_PROMPT_LENGTH} Zeichen)`)
        } else if (!keyword.trim()) {
            return setFormError('Bitte ein Keyword eingeben')
        }
        if (!platform) return setFormError('Bitte eine Plattform auswählen')

        const finalDomain = extractDomain(normalizedDomain)
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        const headers = { 'Content-Type': 'application/json' }
        if (token) headers['Authorization'] = `Bearer ${token}`

        setSubmitting(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo-check`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    domain: finalDomain, platform, language: 'de',
                    ...(promptMode === 'custom' ? { customPrompt: customPrompt.trim() } : { keyword: keyword.trim() }),
                }),
            })

            if (res.status === 429) {
                setPhase('quotaExceeded')
                return
            }
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}))
                setFormError(errData.error || 'Fehler beim Starten der Prüfung')
                return
            }

            const data = await res.json()
            setCheckId(data.id)
            setStatusData({ status: 'querying', platform: data.platform, label: data.label })
            setPhase('polling')
        } catch (err) {
            toast.error('Fehler beim Starten der Prüfung')
        } finally {
            setSubmitting(false)
        }
    }

    const reset = () => {
        setPhase('form')
        setCheckId(null)
        setStatusData(null)
        setFormError(null)
    }

    const otherPlatforms = ALL_PLATFORMS.filter(p => p !== platform)

    const steps = statusData ? [
        { key: 'query', label: `Frage ${statusData.label}…`, done: statusData.status !== 'querying' },
        { key: 'analyze', label: 'Antwort ausgewertet', done: statusData.status !== 'querying' },
        {
            key: 'sentiment',
            label: statusData.status === 'done' && statusData.mentioned === false
                ? 'Sentiment - übersprungen (nicht erwähnt)'
                : 'Sentiment analysiert',
            done: statusData.status === 'done',
        },
    ] : []

    return (
        <>
            {platformLocked && platform && (
                <p className="text-center text-xs text-(--text-faint) -mt-4 mb-4">
                    Ausgewählt: {PLATFORM_META[platform].label}
                </p>
            )}
            <AnimatePresence mode="wait">
                {phase === 'form' && (
                        <motion.form key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            className="bg-(--card) border border-(--line) rounded-2xl p-5 sm:p-8 space-y-5"
                        >
                            <div>
                                <label htmlFor="geo-check-domain" className="block text-xs font-semibold text-(--text-muted) mb-2">Website</label>
                                <div className={`flex items-center gap-2 px-3.5 py-3 bg-(--surface-08) border rounded-xl transition-colors ${
                                    domainError && trimmedDomain ? 'border-(--danger-border)' : 'border-(--border-subtle) focus-within:border-(--accent-border)'
                                }`}>
                                    <Globe className="w-4 h-4 text-(--text-faint) shrink-0" />
                                    <input
                                        id="geo-check-domain"
                                        type="text"
                                        value={domain}
                                        onChange={e => setDomain(e.target.value)}
                                        placeholder="deinewebsite.de"
                                        className="flex-1 min-w-0 bg-transparent text-(--text-white) placeholder-(--text-faint) text-sm outline-none"
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        spellCheck={false}
                                    />
                                    {trimmedDomain && (
                                        <button type="button" onClick={() => setDomain('')} className="shrink-0 p-1 rounded-lg text-(--text-faint) hover:text-(--text-white) transition-colors">
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="geo-check-keyword" className="block text-xs font-semibold text-(--text-muted) ">
                                        {promptMode === 'custom' ? 'Dein eigener Prompt' : 'Wofür willst du gefunden werden?'}
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setPromptMode(m => m === 'keyword' ? 'custom' : 'keyword')}
                                        className="text-[11px] font-medium text-(--accent-ink) hover:text-(--accent-ink) underline underline-offset-2"
                                    >
                                        {promptMode === 'custom' ? 'Stattdessen Keyword verwenden' : 'Stattdessen eigenen Prompt eingeben'}
                                    </button>
                                </div>
                                {promptMode === 'custom' ? (
                                    <>
                                        <textarea
                                            id="geo-check-keyword"
                                            value={customPrompt}
                                            onChange={e => setCustomPrompt(e.target.value)}
                                            placeholder="z.B. Ich brauche eine Agentur für ein neues Webdesign in Lübeck"
                                            rows={3}
                                            maxLength={MAX_CUSTOM_PROMPT_LENGTH}
                                            className="w-full px-3.5 py-3 bg-(--surface-08) border border-(--border-subtle) focus:border-(--accent) focus:shadow-[0_0_0_4px_var(--accent-ring)] rounded-xl text-(--text-white) placeholder-(--text-faint) text-sm outline-none transition-colors resize-none"
                                            autoComplete="off"
                                        />
                                        <p className="text-[11px] text-(--text-faint) mt-1.5 text-right">{customPrompt.length}/{MAX_CUSTOM_PROMPT_LENGTH}</p>
                                    </>
                                ) : (
                                    <input
                                        id="geo-check-keyword"
                                        type="text"
                                        value={keyword}
                                        onChange={e => setKeyword(e.target.value)}
                                        placeholder="z.B. CRM Software"
                                        className="w-full px-3.5 py-3 bg-(--surface-08) border border-(--border-subtle) focus:border-(--accent) focus:shadow-[0_0_0_4px_var(--accent-ring)] rounded-xl text-(--text-white) placeholder-(--text-faint) text-sm outline-none transition-colors"
                                        autoComplete="off"
                                    />
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-(--text-muted) mb-2">Plattform</label>
                                {platformLocked && platform ? (
                                    <div className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl border ${PLATFORM_META[platform].bg} ${PLATFORM_META[platform].border}`}>
                                        <PlatformIcon platform={platform} size="sm" />
                                        <span className="text-sm font-medium text-(--text-white) flex-1">{PLATFORM_META[platform].label}</span>
                                        <button
                                            type="button"
                                            onClick={() => setPlatformLocked(false)}
                                            className="text-xs font-medium text-(--text-body) hover:text-(--text-white) underline underline-offset-2 shrink-0"
                                        >
                                            ändern
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2.5">
                                        {ALL_PLATFORMS.map(p => {
                                            const meta = PLATFORM_META[p]
                                            const active = platform === p
                                            return (
                                                <button
                                                    type="button"
                                                    key={p}
                                                    onClick={() => setPlatform(p)}
                                                    className={`relative flex items-center gap-2.5 px-3.5 py-3 rounded-xl border text-sm font-medium transition-all ${
                                                        active
                                                            ? `${meta.bg} ${meta.border} text-(--text-white) ring-1 ring-inset ${meta.border}`
                                                            : 'bg-(--surface-08) border-(--border-subtle) text-(--text-muted) hover:border-(--border-strong)'
                                                    }`}
                                                >
                                                    <PlatformIcon platform={p} size="sm" />
                                                    <span className="truncate">{meta.label}</span>
                                                    {active && <Check className="w-3.5 h-3.5 ml-auto shrink-0 text-(--text-white)" strokeWidth={3} />}
                                                </button>
                                            )
                                        })}
                                    </div>
                                )}
                                <p className="text-[11px] text-(--text-muted) mt-2.5">
                                    1 Plattform ist kostenlos wählbar. Alle 4 gleichzeitig? <Link href="/geo/pricing" className="text-(--accent-ink) hover:text-(--accent-ink)">GEO Automatisierung</Link>
                                </p>
                            </div>

                            <AnimatePresence>
                                {formError && (
                                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                        className="text-(--danger) text-xs flex items-center gap-1.5 overflow-hidden"
                                    >
                                        <AlertCircle className="w-3 h-3 shrink-0" />{formError}
                                    </motion.p>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-(--accent) hover:bg-(--accent-hover) disabled:opacity-50 text-(--on-accent) text-sm font-semibold rounded-[10px] transition-all active:scale-[0.97] active:duration-75"
                            >
                                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />Wird gestartet…</> : <>Kostenlos prüfen<ArrowRight className="w-4 h-4" /></>}
                            </button>
                        </motion.form>
                    )}

                    {phase === 'polling' && statusData && (
                        <motion.div key="polling" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="bg-(--card) border border-(--line) rounded-2xl p-6 sm:p-8"
                        >
                            <div className="flex flex-col items-center text-center mb-6">
                                <PlatformIcon platform={statusData.platform} size="lg" />
                                <p className="text-sm text-(--text-muted) mt-3">Wir fragen gerade <span className="text-(--text-white) font-semibold">{statusData.label}</span>…</p>
                            </div>
                            <div className="space-y-4">
                                {steps.map(step => (
                                    <div key={step.key} className="flex items-center gap-3">
                                        {step.done
                                            ? <div className="w-5 h-5 rounded-full bg-(--accent-soft) border border-(--accent-border) flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-(--accent-ink)" strokeWidth={3} /></div>
                                            : <Loader2 className="w-5 h-5 text-(--text-faint) animate-spin shrink-0" />}
                                        <span className={`text-sm ${step.done ? 'text-(--text-white)' : 'text-(--text-muted)'}`}>{step.label}</span>
                                    </div>
                                ))}
                            </div>
                            {statusData?.prompt && (
                                <div className="pt-4 mt-4 border-t border-(--border-subtle)">
                                    <p className="text-xs font-semibold text-(--text-faint) mb-1.5">Gestellte Frage (1 Prompt)</p>
                                    <p className="text-xs text-(--text-muted) italic leading-relaxed">&bdquo;{statusData.prompt}&ldquo;</p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {phase === 'results' && statusData && (
                        <motion.div key="results" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                            <div className={`rounded-2xl border p-6 sm:p-8 text-center ${
                                statusData.mentioned ? 'bg-(--success)/6 border-(--success-border)' : 'bg-(--card) border-(--line)'
                            }`}>
                                <div className="flex flex-col items-center">
                                    <PlatformIcon platform={statusData.platform} size="lg" />
                                    <p className="text-xs text-(--text-faint) mt-3">Ergebnis von {statusData.label}</p>
                                    {statusData.mentioned ? (
                                        <div className="flex items-center gap-2 mt-2 text-2xl font-bold text-(--success)">
                                            <CheckCircle2 className="w-7 h-7" /> Du wirst zitiert!
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 mt-2 text-2xl font-bold text-(--text-body)">
                                            <XCircle className="w-7 h-7 text-(--text-faint)" /> Noch nicht zitiert
                                        </div>
                                    )}
                                </div>

                                {statusData.mentioned ? (
                                    <div className="mt-5 text-left bg-black/20 rounded-xl p-4">
                                        {statusData.context && <p className="text-sm text-(--text-body) italic mb-3">&bdquo;{statusData.context}&ldquo;</p>}
                                        <SentimentBadge sentiment={statusData.sentiment} />
                                    </div>
                                ) : (
                                    <p className="text-sm text-(--text-muted) mt-4">{extractDomain(normalizedDomain)} wurde bei "{queryLabel}" nicht erwähnt.</p>
                                )}

                                {statusData.citations?.length > 0 && (
                                    <div className="mt-5 pt-5 border-t border-(--line) text-left">
                                        <p className="text-xs font-semibold text-(--text-faint) mb-2.5">
                                            {statusData.mentioned ? 'Weitere in der Antwort genannte Quellen' : 'Stattdessen genannte Quellen'}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {statusData.citations.map((c, i) => (
                                                <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-(--tint) border border-(--line) text-(--text-body)">
                                                    {c.domain}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {statusData.prompt && (
                                    <div className="mt-5 pt-5 border-t border-(--line) text-left">
                                        <p className="text-xs font-semibold text-(--text-faint) mb-1.5">Gestellte Frage</p>
                                        <p className="text-xs text-(--text-muted) italic leading-relaxed">&bdquo;{statusData.prompt}&ldquo;</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-center gap-1.5 text-xs text-(--text-faint)">
                                <Sparkles className="w-3.5 h-3.5" />
                                1 Prompt genutzt &middot; dein einmaliger Gratis-Check ist jetzt verbraucht
                            </div>

                            <div className="rounded-2xl border border-(--line) bg-(--tint) p-5 sm:p-6 text-center">
                                <h3 className="text-base font-bold text-(--text-white) mb-1.5">
                                    {statusData.mentioned ? 'Bleib zitiert, statt es wieder zu verlieren' : 'Verbessere deine Sichtbarkeit auf allen 5 Plattformen'}
                                </h3>
                                <p className="text-(--text-muted) text-sm mb-4 max-w-sm mx-auto">
                                    Wir prüfen {extractDomain(normalizedDomain)} wöchentlich automatisch auf ChatGPT, Claude, Perplexity und Google AI Overview und melden dir jede Änderung.
                                </p>
                                <Link
                                    href={isLoggedIn ? '/geo/pricing' : '/register?ref=geo-check'}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) text-sm font-semibold rounded-[10px] transition-all active:scale-[0.97] active:duration-75"
                                >
                                    {isLoggedIn ? 'Jetzt alle 5 Plattformen tracken' : 'Ergebnis retten & Tracking starten'} <ArrowRight className="w-4 h-4" />
                                </Link>
                                <p className="text-[11px] text-(--text-faint) mt-3">14 Tage kostenlos testen &middot; jederzeit kündbar</p>
                            </div>

                            <div className="bg-(--card) border border-(--line) rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-(--text-white) mb-1">
                                    {statusData.mentioned ? 'Das hilft, damit du auch bei den anderen Plattformen zitiert wirst' : 'Worauf es für KI-Zitate ankommt'}
                                </h3>
                                <p className="text-xs text-(--text-faint) mb-4">Die wichtigsten GEO-Signale, die KI-Modelle wie ChatGPT und Claude bei der Quellenauswahl beachten:</p>
                                <div className="space-y-3">
                                    {GEO_TIPS.map(tip => (
                                        <div key={tip.title} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-(--accent) shrink-0 mt-1.5" />
                                            <div>
                                                <span className="text-sm font-medium text-(--text-white)">{tip.title}</span>
                                                <span className="text-sm text-(--text-faint)"> - {tip.desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/blog/geo-optimierung-2026" className="inline-flex items-center gap-1 text-xs text-(--accent-ink) hover:text-(--accent-ink) mt-4">
                                    Vollständige GEO-Checkliste ansehen <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {otherPlatforms.map(p => {
                                    const meta = PLATFORM_META[p]
                                    return (
                                        <div key={p} className="flex flex-col items-center gap-2 py-4 px-1 rounded-xl bg-(--card) border border-(--line) opacity-70">
                                            <PlatformIcon platform={p} size="sm" locked />
                                            <span className="text-[11px] text-(--text-faint) text-center leading-tight">{meta.label}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="bg-(--tint) border border-(--line) rounded-2xl p-6 text-center">
                                <h3 className="text-base font-bold text-(--text-white) mb-2">Auch bei {otherPlatforms.map(p => PLATFORM_META[p].label).join(', ')} prüfen?</h3>
                                <p className="text-(--text-muted) text-sm mb-5 max-w-sm mx-auto">Mit GEO Automatisierung trackst du bis zu 5 Plattformen inklusive Gemini wöchentlich automatisch, ab 4,99&nbsp;€/Monat (alle 5 ab Pro).</p>
                                <Link href={isLoggedIn ? '/geo/pricing' : '/register?ref=geo-check'}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-(--accent) hover:bg-(--accent) hover:text-(--on-accent) text-sm font-semibold rounded-xl transition-all shadow-lg shadow-(--accent-border)"
                                >
                                    GEO Automatisierung ansehen <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <button onClick={reset} className="w-full text-center text-xs text-(--text-faint) hover:text-(--text-muted) transition-colors py-2">
                                Zurück zur Startseite
                            </button>
                        </motion.div>
                    )}

                    {phase === 'quotaExceeded' && (
                        <motion.div key="quota" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center text-center gap-6 py-10"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-(--warning-soft) border border-(--warning-border) flex items-center justify-center">
                                <Lock className="w-7 h-7 text-(--warning)" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-(--text-white) mb-2">Kostenlosen Check bereits genutzt</h2>
                                <p className="text-(--text-muted) max-w-md">
                                    Du hast deinen einmaligen kostenlosen Check bereits verbraucht. Für weitere Plattformen oder alle 5 auf einmal wechsle auf{' '}
                                    <span className="text-(--text-white) font-semibold">GEO Automatisierung</span>.
                                </p>
                            </div>
                            <Link href={isLoggedIn ? '/geo/pricing' : '/register?ref=geo-check'}
                                className="flex items-center gap-2 px-6 py-3 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) font-semibold rounded-[10px] transition-all active:scale-[0.97] active:duration-75"
                            >
                                GEO Automatisierung ansehen <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    )}
            </AnimatePresence>
        </>
    )
}
