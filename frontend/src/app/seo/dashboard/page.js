'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    TrendingUp, TrendingDown, Plus, Trash2, Globe, Loader2,
    ArrowRight, X, ChevronUp, ChevronDown, Minus
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../../components/Navbar'

function PositionBadge({ position }) {
    if (position == null) return <span className="text-xs text-slate-600">—</span>
    if (position <= 3)  return <span className="text-sm font-bold text-emerald-400">#{position}</span>
    if (position <= 10) return <span className="text-sm font-bold text-teal-400">#{position}</span>
    if (position <= 30) return <span className="text-sm font-bold text-amber-400">#{position}</span>
    return <span className="text-sm font-bold text-slate-400">#{position}</span>
}

function SiteCard({ site, onDelete }) {
    const [deleting, setDeleting] = useState(false)

    const handleDelete = async (e) => {
        e.preventDefault()
        if (!confirm(`"${site.domain}" und alle Rankings löschen?`)) return
        setDeleting(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${site._id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            })
            if (!res.ok) throw new Error()
            onDelete(site._id)
            toast.success('Website entfernt')
        } catch {
            toast.error('Fehler beim Löschen')
            setDeleting(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-[#0d1117] border border-white/[0.06] rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-200"
        >
            <button
                onClick={handleDelete}
                disabled={deleting}
                className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 bg-white/5 hover:bg-red-500/15 text-slate-500 hover:text-red-400 transition-all"
            >
                {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            </button>

            <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{site.displayName || site.domain}</div>
                    <div className="text-xs text-slate-500 truncate">{site.domain}</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-white/[0.03] rounded-xl p-3">
                    <div className="text-xs text-slate-500 mb-1">Ø Position</div>
                    <PositionBadge position={site.avgPosition} />
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3">
                    <div className="text-xs text-slate-500 mb-1">Keywords</div>
                    <span className="text-sm font-bold text-white">{site.trackedCount || 0}</span>
                </div>
            </div>

            {site.lastChecked ? (
                <div className="text-[11px] text-slate-600 mb-4">
                    Zuletzt: {new Date(site.lastChecked).toLocaleDateString('de-DE')}
                </div>
            ) : (
                <div className="text-[11px] text-slate-600 mb-4">Noch nicht geprüft</div>
            )}

            <Link
                href={`/seo/${site._id}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/15 hover:border-emerald-500/30 transition-all"
            >
                Rankings ansehen
                <ArrowRight className="w-3.5 h-3.5" />
            </Link>
        </motion.div>
    )
}

function AddSiteModal({ maxKeywords, usedKeywords, onClose, onAdded }) {
    const [domain, setDomain] = useState('')
    const [keywordsText, setKeywordsText] = useState('')
    const [loading, setLoading] = useState(false)

    const slotsLeft = maxKeywords - usedKeywords

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!domain.trim()) return

        const keywords = keywordsText
            .split('\n')
            .map(k => k.trim())
            .filter(Boolean)
            .slice(0, slotsLeft)

        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ domain: domain.trim(), keywords }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            onAdded(data.site)
            toast.success('Website hinzugefügt')
        } catch (err) {
            toast.error(err.message || 'Fehler beim Hinzufügen')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-[#0d1117] border border-white/10 rounded-2xl p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white">Website hinzufügen</h3>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-slate-300 font-medium block mb-1.5">Domain</label>
                        <input
                            type="text"
                            value={domain}
                            onChange={e => setDomain(e.target.value)}
                            placeholder="example.com"
                            required
                            className="w-full bg-white/3 border border-white/10 hover:border-white/20 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-all text-sm"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-slate-300 font-medium block mb-1.5">
                            Keywords <span className="text-slate-500">(eines pro Zeile, max. {slotsLeft} verbleibend)</span>
                        </label>
                        <textarea
                            value={keywordsText}
                            onChange={e => setKeywordsText(e.target.value)}
                            placeholder={"keyword eins\nkeyword zwei\nkeyword drei"}
                            rows={6}
                            className="w-full bg-white/3 border border-white/10 hover:border-white/20 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-all text-sm resize-none font-mono"
                        />
                        <div className="text-xs text-slate-600 mt-1">
                            {keywordsText.split('\n').filter(k => k.trim()).length} Keywords eingegeben
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold transition-all disabled:opacity-50 text-sm"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        {loading ? 'Wird hinzugefügt...' : 'Website hinzufügen'}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

export default function SeoDashboardPage() {
    const router = useRouter()
    const [loading, setLoading]   = useState(true)
    const [sites, setSites]       = useState([])
    const [plan, setPlan]         = useState(null)
    const [limits, setLimits]     = useState({ maxSites: 0, maxKeywords: 0, usedSites: 0, usedKeywords: 0 })
    const [showAdd, setShowAdd]   = useState(false)

    const fetchSites = useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites`, {
                headers: { Authorization: `Bearer ${token}` },
            })

            if (res.status === 403) {
                router.push('/seo/pricing')
                return
            }

            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            setSites(data.sites || [])
            setPlan(data.plan)
            setLimits({
                maxSites:     data.maxSites,
                maxKeywords:  data.maxKeywords,
                usedSites:    data.usedSites,
                usedKeywords: data.usedKeywords,
            })
        } catch (err) {
            toast.error('Fehler beim Laden')
        } finally {
            setLoading(false)
        }
    }, [router])

    useEffect(() => {
        const stored = localStorage.getItem('user')
        if (!stored) { router.push('/login?redirect=/seo/dashboard'); return }
        fetchSites()
    }, [fetchSites, router])

    const handleAdded = (site) => {
        setSites(prev => [...prev, { ...site, avgPosition: null, trackedCount: site.keywords?.length || 0 }])
        setLimits(prev => ({
            ...prev,
            usedSites:    prev.usedSites + 1,
            usedKeywords: prev.usedKeywords + (site.keywords?.length || 0),
        }))
        setShowAdd(false)
    }

    const handleDeleted = (siteId) => {
        const site = sites.find(s => s._id === siteId)
        setSites(prev => prev.filter(s => s._id !== siteId))
        setLimits(prev => ({
            ...prev,
            usedSites:    prev.usedSites - 1,
            usedKeywords: prev.usedKeywords - (site?.keywords?.length || 0),
        }))
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#05080f] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#05080f]">
            <Toaster position="top-right" toastOptions={{
                style: { background: '#0d1117', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' },
            }} />
            <Navbar />

            <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-16">

                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium mb-3">
                            <TrendingUp className="w-3 h-3" />
                            SEO Automatisierung · {plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : ''}-Plan
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">Keyword Rankings</h1>
                    </div>

                    {limits.usedSites < limits.maxSites && (
                        <button
                            onClick={() => setShowAdd(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                        >
                            <Plus className="w-4 h-4" />
                            Website hinzufügen
                        </button>
                    )}
                </div>

                {/* Usage bar */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-400">Websites</span>
                            <span className="text-sm font-semibold text-white">{limits.usedSites} / {limits.maxSites}</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                                style={{ width: `${limits.maxSites > 0 ? (limits.usedSites / limits.maxSites) * 100 : 0}%` }}
                            />
                        </div>
                    </div>
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-400">Keywords</span>
                            <span className="text-sm font-semibold text-white">{limits.usedKeywords} / {limits.maxKeywords}</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                                style={{ width: `${limits.maxKeywords > 0 ? (limits.usedKeywords / limits.maxKeywords) * 100 : 0}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Sites grid */}
                {sites.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center mx-auto mb-4">
                            <TrendingUp className="w-7 h-7 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Noch keine Website hinzugefügt</h3>
                        <p className="text-slate-500 text-sm mb-6">Füge deine erste Website mit Keywords hinzu und tracke deine Rankings.</p>
                        <button
                            onClick={() => setShowAdd(true)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold rounded-xl transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            Erste Website hinzufügen
                        </button>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {sites.map(site => (
                            <SiteCard key={site._id} site={site} onDelete={handleDeleted} />
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {showAdd && (
                    <AddSiteModal
                        maxKeywords={limits.maxKeywords}
                        usedKeywords={limits.usedKeywords}
                        onClose={() => setShowAdd(false)}
                        onAdded={handleAdded}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}