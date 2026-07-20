'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Globe } from 'lucide-react'
import toast from 'react-hot-toast'

const STORAGE_KEY = 'audited_domains'

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
            return 'Bitte nur die Domain eingeben (z.B. example.com) – keine Pfade, Parameter oder Tokens.'
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

export default function AuditForm({ onAuditStart, onAuditComplete, defaultUrl = '', onRequiresAuth }) {
    const [url, setUrl] = useState(defaultUrl)
    const [loading, setLoading] = useState(false)

    const normalized = normalizeUrl(url)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!url.trim()) return toast.error('Bitte eine URL eingeben')

        const domainError = validateDomainOnly(url)
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
                body: JSON.stringify({ url: auditUrl })
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

            if (!res.ok) throw new Error('Audit fehlgeschlagen')

            const data = await res.json()

            if (!token && domain) saveAuditedDomain(domain)

            onAuditComplete?.(data)
            toast.success('Audit abgeschlossen!')
        } catch (err) {
            toast.error(err.message || 'Fehler beim Audit')
            onAuditComplete?.(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="relative flex items-center gap-3 p-2 bg-white/[0.03] border border-white/10 rounded-2xl focus-within:border-violet-500/50 focus-within:bg-white/[0.05] transition-all duration-200 shadow-xl shadow-black/20">
                <div className="flex items-center gap-3 flex-1 px-3">
                    <Globe className="w-4 h-4 text-slate-500 shrink-0" />
                    <input
                        type="text"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder="yourwebsite.com"
                        className="flex-1 bg-transparent text-white placeholder-slate-600 text-sm outline-none py-2"
                        disabled={loading}
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        inputMode="url"
                        spellCheck={false}
                    />
                    {url.trim() && !url.startsWith('http') && (
                        <span className="text-xs text-slate-500 shrink-0 hidden sm:block">
                            → {normalized}
                        </span>
                    )}
                </div>
                <motion.button
                    type="submit"
                    disabled={loading}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20 shrink-0"
                >
                    {loading ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Analysiert...</>
                    ) : (
                        <><Search className="w-4 h-4" />Jetzt prüfen<ArrowRight className="w-3.5 h-3.5" /></>
                    )}
                </motion.button>
            </div>
            <p className="text-xs text-slate-600 text-center mt-3">
                Kostenlos · Start ohne Anmeldung · Ergebnis in ~60 Sekunden
            </p>
        </form>
    )
}
