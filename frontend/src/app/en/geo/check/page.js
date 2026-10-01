'use client'
import { useState, useEffect, useRef, useMemo, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, X, Check, AlertCircle, ArrowRight, Lock, Loader2, Sparkles, MousePointerClick, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import Navbar from '../../../components/Navbar'
import { PLATFORM_META, ALL_PLATFORMS, PlatformIcon, SentimentBadge } from '@/app/geo/components/PlatformBadges'

const HOW_IT_WORKS = [
    { icon: Globe, label: 'Enter domain & keyword' },
    { icon: MousePointerClick, label: 'Pick a platform' },
    { icon: Sparkles, label: 'Result in seconds' },
]

const FAQS = [
    {
        q: 'How can I check if my website is cited by ChatGPT or Claude?',
        a: 'Use the free GEO Check from Scanora: enter your domain and a keyword, pick a platform (ChatGPT, Claude, Perplexity, or Google AI Overview), and within seconds you\'ll see whether and how your website is mentioned there - no registration required.',
    },
    {
        q: 'Is the GEO Check really free?',
        a: 'Yes, every account or IP address can use the GEO Check once, completely free. For recurring checks across multiple platforms at once, GEO Automation starts at €4.99/month.',
    },
    {
        q: 'Which AI models are checked?',
        a: 'ChatGPT, Claude, Perplexity, and Google AI Overview - the four most-used AI systems people ask for product recommendations today.',
    },
    {
        q: 'What is the difference between a GEO Check and GEO Automation?',
        a: 'A GEO Check is a one-time check: it shows, at a single point in time, whether one platform mentions your website. GEO Automation is the ongoing version of that - it automatically checks up to five AI systems (Claude, ChatGPT, Gemini, Perplexity, and Google AI Overview) every week, calculates your mention rate over time, and alerts you by email on changes, instead of you having to re-check manually.',
    },
]

const GEO_TIPS = [
    { title: 'Clear product definition', desc: '"X is Y for Z" in the first 100 words of your homepage - no marketing fluff.' },
    { title: 'Allow AI crawlers', desc: 'GPTBot, ClaudeBot, and PerplexityBot must not be blocked in robots.txt.' },
    { title: 'Schema.org + FAQ schema', desc: 'Structured data combined with real, visible FAQ text on the page.' },
    { title: 'Citable facts & numbers', desc: 'Concrete statistics and data that AI models like to quote directly.' },
    { title: 'E-E-A-T signals', desc: 'Author, contact info, imprint, and an about page build trust with AI models.' },
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
            return 'Please enter only the domain (e.g. example.com) - no paths, parameters, or tokens.'
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

export default function GeoCheckPageEn() {
    return (
        <Suspense fallback={null}>
            <GeoCheckPageEnInner />
        </Suspense>
    )
}

function GeoCheckPageEnInner() {
    const searchParams = useSearchParams()
    const platformParam = searchParams.get('platform')
    const initialPlatform = ALL_PLATFORMS.includes(platformParam) ? platformParam : null

    const [domain, setDomain] = useState('')
    const [keyword, setKeyword] = useState('')
    const [platform, setPlatform] = useState(initialPlatform)
    const [platformLocked, setPlatformLocked] = useState(!!initialPlatform)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [phase, setPhase] = useState('form') // form | polling | results | quotaExceeded
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
            } catch {
                // ignore network hiccup on a poll tick, next tick retries
            }
        }, POLL_INTERVAL_MS)

        return () => clearInterval(pollTimer.current)
    }, [phase, checkId])

    useEffect(() => {
        if (phase === 'results' && statusData?.status === 'done') {
            sessionStorage.setItem('pendingGeoCheck', JSON.stringify({
                domain: extractDomain(normalizedDomain),
                keyword: keyword.trim(),
                platform: statusData.platform,
                label: statusData.label,
                mentioned: statusData.mentioned,
            }))
        }
    }, [phase, statusData])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!trimmedDomain) return setFormError('Please enter a domain')
        if (domainError) return setFormError(domainError)
        if (!keyword.trim()) return setFormError('Please enter a keyword')
        if (!platform) return setFormError('Please select a platform')

        const finalDomain = extractDomain(normalizedDomain)
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        const headers = { 'Content-Type': 'application/json' }
        if (token) headers['Authorization'] = `Bearer ${token}`

        setSubmitting(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo-check`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ domain: finalDomain, keyword: keyword.trim(), platform, language: 'en' }),
            })

            if (res.status === 429) {
                setPhase('quotaExceeded')
                return
            }
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}))
                setFormError(errData.error || 'Error starting the check')
                return
            }

            const data = await res.json()
            setCheckId(data.id)
            setStatusData({ status: 'querying', platform: data.platform, label: data.label })
            setPhase('polling')
        } catch (err) {
            toast.error('Error starting the check')
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
        { key: 'query', label: `Asking ${statusData.label}…`, done: statusData.status !== 'querying' },
        { key: 'analyze', label: 'Response analyzed', done: statusData.status !== 'querying' },
        {
            key: 'sentiment',
            label: statusData.status === 'done' && statusData.mentioned === false
                ? 'Sentiment - skipped (not mentioned)'
                : 'Sentiment analyzed',
            done: statusData.status === 'done',
        },
    ] : []

    return (
        <div className="min-h-screen bg-(--bg-base)">
            <Navbar locale="en" />

            <main className="max-w-2xl mx-auto px-5 sm:px-8 pt-28 sm:pt-32 pb-24">
                <div className="text-center mb-8">
                    <h1 className="text-[clamp(34px,4.4vw,54px)] leading-[1.05] tracking-[-0.038em] font-bold text-(--text-white) mb-5">
                        {platformLocked && platform ? `GEO Check: Are You Cited by ${PLATFORM_META[platform].label}?` : 'GEO Check: Are You Cited by ChatGPT & Co.?'}
                    </h1>
                    <p className="text-(--text-muted) leading-relaxed max-w-lg mx-auto">
                        A GEO Check is a one-time or recurring check of whether a website is cited by AI systems like ChatGPT, Claude, Gemini, Perplexity, or Google AI Overview. Scanora's GEO Check is a free tool for website owners: enter your domain and a keyword, pick a platform (ChatGPT, Claude, Perplexity, or Google AI Overview), and see within seconds whether your domain is mentioned - no registration required.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-(--text-faint)">
                        <Link href="/about" className="flex items-center gap-2 hover:text-(--text-body) transition-colors">
                            <div className="w-5 h-5 rounded-full bg-(--accent) flex items-center justify-center text-(--on-accent) text-[9px] font-bold">F</div>
                            <span>Finn Paustian</span>
                        </Link>
                        <span>&middot;</span>
                        <span>Founder, Scanora</span>
                    </div>
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
                                        placeholder="yourwebsite.com"
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
                                <label htmlFor="geo-check-keyword" className="block text-xs font-semibold text-(--text-muted) mb-2">What do you want to be found for?</label>
                                <input
                                    id="geo-check-keyword"
                                    type="text"
                                    value={keyword}
                                    onChange={e => setKeyword(e.target.value)}
                                    placeholder="e.g. CRM software"
                                    className="w-full px-3.5 py-3 bg-(--surface-08) border border-(--border-subtle) focus:border-(--accent) focus:shadow-[0_0_0_4px_var(--accent-ring)] rounded-xl text-(--text-white) placeholder-(--text-faint) text-sm outline-none transition-colors"
                                    autoComplete="off"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-(--text-muted) mb-2">Platform</label>
                                {platformLocked && platform ? (
                                    <div className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl border ${PLATFORM_META[platform].bg} ${PLATFORM_META[platform].border}`}>
                                        <PlatformIcon platform={platform} size="sm" />
                                        <span className="text-sm font-medium text-(--text-white) flex-1">{PLATFORM_META[platform].label}</span>
                                        <button
                                            type="button"
                                            onClick={() => setPlatformLocked(false)}
                                            className="text-xs font-medium text-(--text-body) hover:text-(--text-white) underline underline-offset-2 shrink-0"
                                        >
                                            change
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
                                <p className="text-[11px] text-(--text-faint) mt-2.5">
                                    1 platform is free to pick. Want all 5 at once? <Link href="/en/geo/pricing" className="text-(--accent-ink) hover:text-(--accent-ink)">GEO Automation</Link>
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
                                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />Starting…</> : <>Check for free<ArrowRight className="w-4 h-4" /></>}
                            </button>
                        </motion.form>
                    )}

                    {phase === 'polling' && statusData && (
                        <motion.div key="polling" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="bg-(--card) border border-(--line) rounded-2xl p-6 sm:p-8"
                        >
                            <div className="flex flex-col items-center text-center mb-6">
                                <PlatformIcon platform={statusData.platform} size="lg" />
                                <p className="text-sm text-(--text-muted) mt-3">Asking <span className="text-(--text-white) font-semibold">{statusData.label}</span>…</p>
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
                                    <p className="text-xs font-semibold text-(--text-faint) mb-1.5">Question being asked (1 prompt)</p>
                                    <p className="text-xs text-(--text-muted) italic leading-relaxed">&ldquo;{statusData.prompt}&rdquo;</p>
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
                                    <p className="text-xs text-(--text-faint) mt-3">Result from {statusData.label}</p>
                                    {statusData.mentioned ? (
                                        <div className="flex items-center gap-2 mt-2 text-2xl font-bold text-(--success)">
                                            <CheckCircle2 className="w-7 h-7" /> You're cited!
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 mt-2 text-2xl font-bold text-(--text-body)">
                                            <XCircle className="w-7 h-7 text-(--text-faint)" /> Not cited yet
                                        </div>
                                    )}
                                </div>

                                {statusData.mentioned ? (
                                    <div className="mt-5 text-left bg-black/20 rounded-xl p-4">
                                        {statusData.context && <p className="text-sm text-(--text-body) italic mb-3">&ldquo;{statusData.context}&rdquo;</p>}
                                        <SentimentBadge sentiment={statusData.sentiment} labels={{ positive: 'Positive', neutral: 'Neutral', negative: 'Negative' }} />
                                    </div>
                                ) : (
                                    <p className="text-sm text-(--text-muted) mt-4">{extractDomain(normalizedDomain)} was not mentioned for "{keyword}".</p>
                                )}

                                {statusData.prompt && (
                                    <div className="mt-5 pt-5 border-t border-(--line) text-left">
                                        <p className="text-xs font-semibold text-(--text-faint) mb-1.5">Question asked</p>
                                        <p className="text-xs text-(--text-muted) italic leading-relaxed">&ldquo;{statusData.prompt}&rdquo;</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-center gap-1.5 text-xs text-(--text-faint)">
                                <Sparkles className="w-3.5 h-3.5" />
                                1 prompt used &middot; your one-time free check is now used up
                            </div>

                            <div className="rounded-2xl border border-(--line) bg-(--tint) p-5 sm:p-6 text-center">
                                <h3 className="text-base font-bold text-(--text-white) mb-1.5">
                                    {statusData.mentioned ? "Stay cited, don't lose it again" : 'Improve your visibility across all 5 platforms'}
                                </h3>
                                <p className="text-(--text-muted) text-sm mb-4 max-w-sm mx-auto">
                                    We'll check {extractDomain(normalizedDomain)} automatically every week on ChatGPT, Claude, Perplexity, and Google AI Overview and alert you on any change.
                                </p>
                                <Link
                                    href={isLoggedIn ? '/en/geo/pricing' : '/en/register?ref=geo-check'}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) text-sm font-semibold rounded-[10px] transition-all active:scale-[0.97] active:duration-75"
                                >
                                    {isLoggedIn ? 'Track all 5 platforms now' : 'Save this result & start tracking'} <ArrowRight className="w-4 h-4" />
                                </Link>
                                <p className="text-[11px] text-(--text-faint) mt-3">14-day free trial &middot; cancel anytime</p>
                            </div>

                            <div className="bg-(--card) border border-(--line) rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-(--text-white) mb-1">
                                    {statusData.mentioned ? 'What helps you get cited on the other platforms too' : 'What matters for AI citations'}
                                </h3>
                                <p className="text-xs text-(--text-faint) mb-4">The most important GEO signals AI models like ChatGPT and Claude weigh when picking sources:</p>
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
                                <Link href="/en/blog/what-is-geo" className="inline-flex items-center gap-1 text-xs text-(--accent-ink) hover:text-(--accent-ink) mt-4">
                                    See the full GEO checklist <ArrowRight className="w-3 h-3" />
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
                                <h3 className="text-base font-bold text-(--text-white) mb-2">Also check {otherPlatforms.map(p => PLATFORM_META[p].label).join(', ')}?</h3>
                                <p className="text-(--text-muted) text-sm mb-5 max-w-sm mx-auto">GEO Automation tracks up to 5 platforms including Gemini automatically every week, from €4.99/month (all 5 from Pro).</p>
                                <Link href={isLoggedIn ? '/en/geo/pricing' : '/en/register?ref=geo-check'}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-(--accent) hover:bg-(--accent) hover:text-(--on-accent) text-sm font-semibold rounded-xl transition-all shadow-lg shadow-(--accent-border)"
                                >
                                    See GEO Automation <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <button onClick={reset} className="w-full text-center text-xs text-(--text-faint) hover:text-(--text-muted) transition-colors py-2">
                                Back to start
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
                                <h2 className="text-2xl font-bold text-(--text-white) mb-2">Free check already used</h2>
                                <p className="text-(--text-muted) max-w-md">
                                    You've already used your one free check. For more platforms or all 5 at once, upgrade to{' '}
                                    <span className="text-(--text-white) font-semibold">GEO Automation</span>.
                                </p>
                            </div>
                            <Link href={isLoggedIn ? '/en/geo/pricing' : '/en/register?ref=geo-check'}
                                className="flex items-center gap-2 px-6 py-3 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) font-semibold rounded-[10px] transition-all active:scale-[0.97] active:duration-75"
                            >
                                See GEO Automation <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="mt-16">
                    <h2 className="text-lg font-bold text-(--text-white) mb-5 text-center">Frequently asked questions</h2>
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
