'use client'
import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, Globe, X, Check, AlertCircle, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

const STORAGE_KEY = 'audited_domains'

function normalizeUrl(input) {
    const trimmed = input.trim()
    if (!trimmed) return ''
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
    return 'https://' + trimmed
}

function validateDomainOnly(input, locale = 'de') {
    if (!input.trim()) return null
    try {
        const parsed = new URL(input.startsWith('http') ? input : `https://${input}`)
        if ((parsed.pathname && parsed.pathname !== '/') || parsed.search || parsed.hash) {
            return locale === 'en'
                ? 'Please enter only the domain (e.g. example.com) – no paths, parameters, or tokens.'
                : 'Bitte nur die Domain eingeben (z.B. example.com) – keine Pfade, Parameter oder Tokens.'
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

function getAuditedDomains() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}

function saveAuditedDomain(domain) {
    const existing = getAuditedDomains()
    if (!existing.includes(domain)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, domain]))
    }
}

function isLikelyValidDomain(normalizedUrl) {
    const host = extractDomain(normalizedUrl)
    return !!host && host.includes('.') && !host.endsWith('.')
}

export default function AuditForm({ onAuditStart, onAuditComplete, defaultUrl = '', onRequiresAuth, locale = 'de' }) {
    const [url, setUrl] = useState(defaultUrl)
    const [loading, setLoading] = useState(false)
    const [recentDomains, setRecentDomains] = useState([])
    const inputRef = useRef(null)

    useEffect(() => {
        setRecentDomains(getAuditedDomains().slice(-5).reverse())
    }, [])

    const trimmed = url.trim()
    const normalized = normalizeUrl(url)
    const domainError = useMemo(() => validateDomainOnly(url, locale), [url, locale])
    const isValid = !!trimmed && !domainError && isLikelyValidDomain(normalized)

    const handleClear = () => {
        setUrl('')
        inputRef.current?.focus()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape' && url) {
            e.preventDefault()
            handleClear()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!url.trim()) return toast.error(locale === 'en' ? 'Please enter a URL' : 'Bitte eine URL eingeben')
        if (domainError) return toast.error(domainError)

        const auditUrl = normalized
        const domain = extractDomain(auditUrl)
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

        setLoading(true)
        onAuditStart?.(auditUrl)

        try {
            const headers = { 'Content-Type': 'application/json' }
            if (token) headers['Authorization'] = `Bearer ${token}`

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/audit`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ url: auditUrl, language: locale })
            })

            if (res.status === 429) {
                onAuditComplete?.({ limitReached: true })
                return
            }

            if (res.status === 403) {
                const errData = await res.json().catch(() => ({}))
                if (errData.domainLimitReached) {
                    onAuditComplete?.({ domainLimitReached: true, domain })
                    return
                }
            }

            if (!res.ok) throw new Error(locale === 'en' ? 'Audit failed' : 'Audit fehlgeschlagen')

            const data = await res.json()

            if (!token && domain) saveAuditedDomain(domain)

            onAuditComplete?.(data)
            toast.success(locale === 'en' ? 'Audit complete!' : 'Audit abgeschlossen!')
        } catch (err) {
            toast.error(err.message || (locale === 'en' ? 'Error running audit' : 'Fehler beim Audit'))
            onAuditComplete?.(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="w-full">
                <div className={`relative flex items-center gap-3 p-2 bg-white/[0.03] border rounded-2xl transition-all duration-200 shadow-xl shadow-black/20 ${
                    domainError && trimmed
                        ? 'border-red-500/40 focus-within:border-red-500/60 focus-within:ring-2 focus-within:ring-red-400/30'
                        : 'border-white/10 focus-within:border-violet-500/50 focus-within:ring-2 focus-within:ring-cyan-400/40 focus-within:bg-white/[0.05]'
                }`}>
                    <div className="flex items-center gap-2 flex-1 px-3 min-w-0">
                        <Globe className="w-4 h-4 text-slate-500 shrink-0" />
                        <label htmlFor="audit-form-url" className="sr-only">{locale === 'en' ? 'Website URL' : 'Website-URL'}</label>
                        <input
                            ref={inputRef}
                            id="audit-form-url"
                            type="text"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="yourwebsite.com"
                            className="flex-1 min-w-0 bg-transparent text-white placeholder-slate-600 text-sm outline-none py-2"
                            disabled={loading}
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            inputMode="url"
                            spellCheck={false}
                            autoFocus={!defaultUrl}
                            aria-invalid={!!(domainError && trimmed)}
                        />
                        {trimmed && !url.startsWith('http') && !domainError && (
                            <span className="text-xs text-slate-500 shrink-0 hidden sm:block">
                                → {normalized}
                            </span>
                        )}

                        <AnimatePresence mode="wait">
                            {trimmed && (domainError || isValid) && (
                                <motion.div
                                    key={domainError ? 'invalid' : 'valid'}
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    className="shrink-0"
                                >
                                    {domainError
                                        ? <AlertCircle className="w-4 h-4 text-red-400" />
                                        : <Check className="w-4 h-4 text-emerald-400" />}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {trimmed && !loading && (
                            <button
                                type="button"
                                onClick={handleClear}
                                aria-label={locale === 'en' ? 'Clear' : 'Leeren'}
                                className="shrink-0 p-1 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                    <motion.button
                        type="submit"
                        disabled={loading || (!!trimmed && !!domainError)}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20 shrink-0"
                    >
                        {loading ? (
                            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{locale === 'en' ? 'Analyzing...' : 'Analysiert...'}</>
                        ) : (
                            <><Search className="w-4 h-4" />{locale === 'en' ? 'Check now' : 'Jetzt prüfen'}<ArrowRight className="w-3.5 h-3.5" /></>
                        )}
                    </motion.button>
                </div>

                <AnimatePresence>
                    {domainError && trimmed && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-red-400 text-xs mt-2 px-1 flex items-center gap-1.5 overflow-hidden"
                        >
                            <AlertCircle className="w-3 h-3 shrink-0" />{domainError}
                        </motion.p>
                    )}
                </AnimatePresence>
            </form>

            {!trimmed && !loading && recentDomains.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="text-xs text-slate-600 flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3" />{locale === 'en' ? 'Recent:' : 'Zuletzt:'}
                    </span>
                    {recentDomains.map(d => (
                        <button
                            key={d}
                            type="button"
                            onClick={() => { setUrl(d); inputRef.current?.focus() }}
                            className="px-2.5 py-1 text-xs text-slate-400 bg-white/[0.03] border border-white/10 rounded-full hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all"
                        >
                            {d}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
