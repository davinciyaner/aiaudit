'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Globe, Loader2, ArrowRight, X, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../../components/Navbar'

function MentionRateBadge({ rate, mentioned, checked }) {
    if (rate == null) return <span className="text-xs text-slate-600">Noch kein Check</span>
    const color = rate >= 70 ? 'text-violet-400' : rate >= 40 ? 'text-amber-400' : 'text-slate-400'
    return (
        <div>
            <span className={`text-xl font-bold ${color}`}>{rate}%</span>
            <span className="text-xs text-slate-600 ml-1.5">{mentioned}/{checked} Keywords</span>
        </div>
    )
}

function SiteCard({ site, onDelete }) {
    const [deleting, setDeleting] = useState(false)

    const handleDelete = async (e) => {
        e.preventDefault()
        if (!confirm(`"${site.domain}" und alle GEO-Daten löschen?`)) return
        setDeleting(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/sites/${site._id}`, {
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
            className="group relative bg-[#0d1117] border border-white/[0.06] rounded-2xl p-6 hover:border-violet-500/20 transition-all duration-200"
        >
            <button
                onClick={handleDelete}
                disabled={deleting}
                className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 bg-white/5 hover:bg-red-500/15 text-slate-500 hover:text-red-400 transition-all"
            >
                {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            </button>

            <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/15 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-violet-400" />
                </div>
                <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{site.displayName || site.domain}</div>
                    <div className="text-xs text-slate-500 truncate">{site.domain}</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/[0.03] rounded-xl p-3">
                    <div className="text-xs text-slate-500 mb-1">KI erwähnt</div>
                    <MentionRateBadge rate={site.mentionRate} mentioned={site.mentionedCount} checked={site.checkedCount} />
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3">
                    <div className="text-xs text-slate-500 mb-1">Keywords</div>
                    <span className="text-xl font-bold text-white">{site.keywords?.length || 0}</span>
                </div>
            </div>

            <div className="text-[11px] text-slate-600 mb-4">
                {site.lastChecked
                    ? `Zuletzt: ${new Date(site.lastChecked).toLocaleDateString('de-DE')}`
                    : 'Noch nicht geprüft'}
            </div>

            <Link
                href={`/geo/${site._id}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-xl bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 hover:text-violet-300 border border-violet-500/15 hover:border-violet-500/30 transition-all"
            >
                Ergebnisse ansehen
                <ArrowRight className="w-3.5 h-3.5" />
            </Link>
        </motion.div>
    )
}

const PLATFORMS = [
    { id: 'claude',  label: 'Claude',  sub: 'claude.ai',       color: 'violet' },
    { id: 'chatgpt', label: 'ChatGPT', sub: 'chat.openai.com', color: 'green'  },
]

const COST_PER_CHECK = { claude: 0.0066, chatgpt: 0.0045 }

function calcCost(keywords, platforms) {
    const checks = keywords * platforms.length * 4
    const avg = platforms.reduce((s, p) => s + (COST_PER_CHECK[p] || 0), 0) / (platforms.length || 1)
    return (checks * avg).toFixed(2)
}

function AddSiteModal({ slotsLeft, onClose, onAdded }) {
    const [domain, setDomain]             = useState('')
    const [keywordsText, setKeywordsText] = useState('')
    const [selectedPlatforms, setSelectedPlatforms] = useState(['claude', 'chatgpt', 'perplexity'])
    const [loading, setLoading]           = useState(false)

    const togglePlatform = (id) => {
        setSelectedPlatforms(prev =>
            prev.includes(id)
                ? prev.length > 1 ? prev.filter(p => p !== id) : prev
                : [...prev, id]
        )
    }

    const kwCount = keywordsText.split('\n').filter(k => k.trim()).length
    const estimatedCost = calcCost(kwCount, selectedPlatforms)

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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/sites`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ domain: domain.trim(), keywords, platforms: selectedPlatforms }),
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
                            className="w-full bg-white/3 border border-white/10 focus:border-violet-500/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-all text-sm"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-slate-300 font-medium block mb-1.5">AI-Plattformen tracken</label>
                        <div className="space-y-2">
                            {PLATFORMS.map(p => {
                                const active = selectedPlatforms.includes(p.id)
                                return (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => togglePlatform(p.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                                            active
                                                ? 'bg-violet-500/10 border-violet-500/30 text-white'
                                                : 'bg-white/3 border-white/8 text-slate-500 hover:border-white/15'
                                        }`}
                                    >
                                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                                            active ? 'bg-violet-500 border-violet-500' : 'border-white/20'
                                        }`}>
                                            {active && <span className="text-white text-[10px] font-bold">✓</span>}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-sm font-semibold">{p.label}</div>
                                            <div className="text-xs text-slate-600">{p.sub}</div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-slate-300 font-medium block mb-1.5">
                            Keywords <span className="text-slate-500">(eines pro Zeile, max. {slotsLeft} verbleibend)</span>
                        </label>
                        <textarea
                            value={keywordsText}
                            onChange={e => setKeywordsText(e.target.value)}
                            placeholder={"seo tool\nwebsite audit\nkeyword tracking"}
                            rows={4}
                            className="w-full bg-white/3 border border-white/10 focus:border-violet-500/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-all text-sm resize-none font-mono"
                        />
                        <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-slate-600">{kwCount} Keywords eingegeben</p>
                            {kwCount > 0 && (
                                <p className="text-xs text-slate-500">
                                    ~<span className="text-slate-300 font-medium">${estimatedCost}</span>/Monat API-Kosten
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !domain.trim() || !selectedPlatforms.length}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold transition-all disabled:opacity-50 text-sm"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        {loading ? 'Wird hinzugefügt…' : 'Website hinzufügen'}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

export default function GeoDashboardPage() {
    const router = useRouter()
    const [loading, setLoading]   = useState(true)
    const [plan, setPlan]         = useState(null)
    const [sites, setSites]       = useState([])
    const [limits, setLimits]     = useState({ usedSites: 0, maxSites: 0, usedKeywords: 0, maxKeywords: 0 })
    const [showAdd, setShowAdd]   = useState(false)

    const fetchSites = useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/sites`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json()
            if (res.status === 403) { setPlan(null); setLoading(false); return }
            if (!res.ok) throw new Error(data.error)
            setSites(data.sites || [])
            setPlan(data.plan)
            setLimits({
                usedSites:    data.usedSites,
                maxSites:     data.maxSites,
                usedKeywords: data.usedKeywords,
                maxKeywords:  data.maxKeywords,
            })
        } catch (err) {
            toast.error('Fehler beim Laden')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!localStorage.getItem('user')) { router.push('/login'); return }
        fetchSites()
    }, [fetchSites, router])

    const handleAdded = (site) => {
        setSites(prev => [...prev, { ...site, mentionRate: null, mentionedCount: 0, checkedCount: 0 }])
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

    if (loading) return (
        <div className="min-h-screen bg-[#05080f] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
        </div>
    )

    if (!plan) return (
        <div className="min-h-screen bg-[#05080f]">
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-5 text-center">
                <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/15 flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-violet-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">GEO Automatisierung</h2>
                    <p className="text-slate-500 text-sm max-w-sm">
                        Tracke ob Claude und ChatGPT deine Domain empfehlen — wöchentlich automatisch.
                        Wähle einen Plan um zu starten.
                    </p>
                </div>
                <Link
                    href="/geo/pricing"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/20"
                >
                    Pläne ansehen →
                </Link>
            </div>
        </div>
    )

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
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-medium mb-3">
                            <Sparkles className="w-3 h-3" />
                            GEO Tracking · Claude · ChatGPT
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">GEO Automatisierung</h1>
                        <p className="text-slate-500 text-sm mt-1">Wird deine Domain von KI-Systemen erwähnt?</p>
                    </div>

                    {limits.usedSites < limits.maxSites && (
                        <button
                            onClick={() => setShowAdd(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/20"
                        >
                            <Plus className="w-4 h-4" />
                            Website hinzufügen
                        </button>
                    )}
                </div>

                {/* Usage bars */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {[
                        { label: 'Websites', used: limits.usedSites, max: limits.maxSites },
                        { label: 'Keywords', used: limits.usedKeywords, max: limits.maxKeywords },
                    ].map(({ label, used, max }) => (
                        <div key={label} className="bg-[#0d1117] border border-white/[0.06] rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-slate-400">{label}</span>
                                <span className="text-sm font-semibold text-white">{used} / {max}</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all"
                                    style={{ width: `${max > 0 ? (used / max) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info banner */}
                <div className="bg-violet-500/5 border border-violet-500/15 rounded-2xl p-4 mb-8 flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-400 leading-relaxed">
                        GEO Tracking prüft, ob Claude und ChatGPT deine Domain bei relevanten Suchanfragen erwähnen.
                        Je mehr Keywords KI-Systeme mit deiner Seite assoziieren, desto besser ist deine GEO-Sichtbarkeit.
                        Checks laufen wöchentlich automatisch oder manuell auf Abruf.
                    </p>
                </div>

                {/* Sites grid */}
                {sites.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/15 flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-7 h-7 text-violet-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Noch keine Website hinzugefügt</h3>
                        <p className="text-slate-500 text-sm mb-6">Füge deine Website mit Keywords hinzu und prüfe ob Claude AI dich erwähnt.</p>
                        <button
                            onClick={() => setShowAdd(true)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl transition-all"
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
                        slotsLeft={limits.maxKeywords - limits.usedKeywords}
                        onClose={() => setShowAdd(false)}
                        onAdded={handleAdded}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}