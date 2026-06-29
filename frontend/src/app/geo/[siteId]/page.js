'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowLeft, Globe, Loader2, RefreshCw, Plus, Trash2, X,
    Sparkles, Check, ChevronDown, ChevronUp,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../../components/Navbar'

const PLATFORM_META = {
    claude:  { label: 'Claude',  color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    chatgpt: { label: 'ChatGPT', color: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/20'  },
}

// Cost per check in USD (200 input + 400 output tokens)
const COST_PER_CHECK = { claude: 0.0066, chatgpt: 0.0045 }

function MentionBadge({ mentioned }) {
    if (mentioned == null) return <span className="text-xs text-slate-600">—</span>
    return mentioned
        ? <span className="inline-flex items-center gap-1 text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-md"><Check className="w-3 h-3" />Ja</span>
        : <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md"><X className="w-3 h-3 opacity-50" />Nein</span>
}

function HistoryDots({ history }) {
    if (!history?.length) return null
    return (
        <div className="flex items-center gap-1 mt-1">
            {history.slice(-8).map((h, i) => (
                <div key={i} title={new Date(h.checkedAt).toLocaleDateString('de-DE')}
                    className={`w-2 h-2 rounded-full ${h.mentioned ? 'bg-violet-500' : 'bg-white/10'}`} />
            ))}
        </div>
    )
}


function ResultsTab({ siteId, site, onSiteUpdated }) {
    const [data, setData]           = useState(null)
    const [loading, setLoading]     = useState(true)
    const [checking, setChecking]   = useState(false)
    const [showAdd, setShowAdd]     = useState(false)
    const [newKws, setNewKws]       = useState('')
    const [addingKws, setAddingKws] = useState(false)
    const [selected, setSelected]   = useState(new Set())
    const [expanded, setExpanded]   = useState(null)
    const [filter, setFilter]       = useState('alle')

    const platforms = site?.platforms?.length ? site.platforms : ['claude']

    const fetchResults = useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/sites/${siteId}/results`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const d = await res.json()
            if (!res.ok) throw new Error(d.error)
            setData(d)
        } catch { toast.error('Fehler beim Laden') }
        finally { setLoading(false) }
    }, [siteId])

    useEffect(() => { fetchResults() }, [fetchResults])

    const handleCheck = async () => {
        setChecking(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/sites/${siteId}/check`, {
                method: 'POST', headers: { Authorization: `Bearer ${token}` },
            })
            const d = await res.json()
            if (!res.ok) throw new Error(d.error)
            toast.success('Check abgeschlossen')
            await fetchResults()
            onSiteUpdated()
        } catch (err) { toast.error(err.message || 'Fehler') }
        finally { setChecking(false) }
    }

    const handleAddKeywords = async (e) => {
        e.preventDefault()
        const keywords = newKws.split('\n').map(k => k.trim()).filter(Boolean)
        if (!keywords.length) return
        setAddingKws(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/sites/${siteId}/keywords`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ keywords }),
            })
            const d = await res.json()
            if (!res.ok) throw new Error(d.error)
            toast.success(`${d.added} Keyword${d.added !== 1 ? 's' : ''} hinzugefügt`)
            setNewKws(''); setShowAdd(false)
            onSiteUpdated()
            await fetchResults()
        } catch (err) { toast.error(err.message || 'Fehler') }
        finally { setAddingKws(false) }
    }

    const handleRemoveSelected = async () => {
        if (!selected.size || !confirm(`${selected.size} Keyword${selected.size > 1 ? 's' : ''} entfernen?`)) return
        try {
            const token = localStorage.getItem('token')
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/sites/${siteId}/keywords`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ keywords: [...selected] }),
            })
            toast.success('Keywords entfernt')
            setSelected(new Set())
            onSiteUpdated()
            await fetchResults()
        } catch { toast.error('Fehler beim Entfernen') }
    }

    const toggleSelect = (kw) => setSelected(prev => {
        const n = new Set(prev); n.has(kw) ? n.delete(kw) : n.add(kw); return n
    })

    const results = data?.results || []

    const filtered = results.filter(r => {
        if (filter === 'erwaehnt') return platforms.some(p => r.checks?.[p]?.mentioned === true)
        if (filter === 'nicht')    return platforms.every(p => r.checks?.[p]?.mentioned === false)
        if (filter === 'ungetestet') return platforms.every(p => r.checks?.[p] == null)
        return true
    })

    const totalChecks = platforms.length * (site?.keywords?.length || 0)
    const checkLabel  = checking
        ? `Prüfe ${totalChecks} Checks (${platforms.length} Plattform${platforms.length > 1 ? 'en' : ''}…)`
        : 'Jetzt prüfen'

    return (
        <div>
            {/* Stats */}
            {data && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                        { label: 'Erwähnungen',  value: data.mentionedCount ?? '—', color: 'text-violet-400' },
                        { label: 'Mention-Rate', value: data.mentionRate != null ? `${data.mentionRate}%` : '—', color: data.mentionRate >= 50 ? 'text-violet-400' : 'text-slate-400' },
                        { label: 'Geprüfte KW',  value: data.checkedCount ?? '—',   color: 'text-white' },
                    ].map(s => (
                        <div key={s.label} className="bg-[#0d1117] border border-white/[0.06] rounded-xl p-4">
                            <div className="text-xs text-slate-500 mb-1">{s.label}</div>
                            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Plattform-Badges */}
            <div className="flex items-center gap-2 mb-5 flex-wrap">
                {platforms.map(p => {
                    const m = PLATFORM_META[p]
                    return (
                        <span key={p} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${m.color} ${m.bg} border ${m.border}`}>
                            {m.label}
                        </span>
                    )
                })}
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <div className="text-sm text-slate-500">
                    {site?.lastChecked
                        ? `Zuletzt: ${new Date(site.lastChecked).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}`
                        : 'Noch nicht geprüft'}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    {selected.size > 0 && (
                        <button onClick={handleRemoveSelected}
                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all">
                            <Trash2 className="w-3.5 h-3.5" />{selected.size} entfernen
                        </button>
                    )}
                    <button onClick={() => setShowAdd(v => !v)}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all">
                        <Plus className="w-3.5 h-3.5" />Keywords
                    </button>
                    <button onClick={handleCheck} disabled={checking}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white transition-all disabled:opacity-50">
                        {checking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                        {checking ? checkLabel : 'Jetzt prüfen'}
                    </button>
                </div>
            </div>

            {/* Filter */}
            {results.length > 0 && (
                <div className="flex items-center gap-1.5 mb-5 flex-wrap">
                    {[
                        { id: 'alle',        label: 'Alle' },
                        { id: 'erwaehnt',    label: '✓ Erwähnt' },
                        { id: 'nicht',       label: '✗ Nirgends erwähnt' },
                        { id: 'ungetestet',  label: 'Ungetestet' },
                    ].map(f => (
                        <button key={f.id} onClick={() => setFilter(f.id)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                                filter === f.id
                                    ? 'bg-violet-500/15 border border-violet-500/30 text-violet-400'
                                    : 'bg-white/4 border border-white/8 text-slate-500 hover:text-slate-300 hover:bg-white/8'
                            }`}>
                            {f.label}
                        </button>
                    ))}
                    <span className="text-xs text-slate-600 ml-1">{filtered.length} Keywords</span>
                </div>
            )}

            {/* Add Keywords */}
            <AnimatePresence>
                {showAdd && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        className="bg-[#0d1117] border border-violet-500/20 rounded-2xl p-5 mb-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-white">Keywords hinzufügen</span>
                            <button onClick={() => setShowAdd(false)} className="text-slate-500 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
                        </div>
                        <form onSubmit={handleAddKeywords} className="flex gap-3">
                            <textarea value={newKws} onChange={e => setNewKws(e.target.value)}
                                placeholder={"seo tool\nwebsite audit"} rows={3}
                                className="flex-1 bg-white/3 border border-white/10 focus:border-violet-500/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none text-sm resize-none font-mono" />
                            <button type="submit" disabled={addingKws}
                                className="self-end flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-50">
                                {addingKws ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                                Hinzufügen
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results table */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
                    <span className="text-sm text-slate-500">Daten werden geladen…</span>
                </div>
            ) : results.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Sparkles className="w-8 h-8 text-slate-700" />
                    <span className="text-sm text-slate-500">Noch keine Keywords. Füge Keywords hinzu und starte einen Check.</span>
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <Sparkles className="w-8 h-8 text-slate-700" />
                    <span className="text-sm text-slate-500">Keine Keywords für diesen Filter.</span>
                </div>
            ) : (
                <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/[0.05]">
                                    <th className="w-8 px-5 py-3" />
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Keyword</th>
                                    {platforms.map(p => (
                                        <th key={p} className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${PLATFORM_META[p]?.color || 'text-slate-500'}`}>
                                            {PLATFORM_META[p]?.label || p}
                                        </th>
                                    ))}
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Verlauf</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Datum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(({ keyword, checks, history }) => {
                                    const isSelected = selected.has(keyword)
                                    const isExpanded = expanded === keyword
                                    const hasContext = platforms.some(p => checks?.[p]?.context)
                                    const latestDate = platforms
                                        .map(p => checks?.[p]?.checkedAt)
                                        .filter(Boolean)
                                        .sort()
                                        .pop()

                                    return (
                                        <React.Fragment key={keyword}>
                                            <tr className={`border-b border-white/[0.04] last:border-0 transition-colors ${isSelected ? 'bg-red-500/5' : isExpanded ? 'bg-white/[0.02]' : 'hover:bg-white/[0.02]'}`}>
                                                <td className="px-5 py-3.5 cursor-pointer" onClick={() => toggleSelect(keyword)}>
                                                    <div className={`w-3.5 h-3.5 rounded border transition-all ${isSelected ? 'bg-red-500/40 border-red-500/60' : 'border-white/15'}`} />
                                                </td>
                                                <td className="px-5 py-3.5 cursor-pointer" onClick={() => hasContext && setExpanded(prev => prev === keyword ? null : keyword)}>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-slate-200">{keyword}</span>
                                                        {hasContext && (
                                                            <span className={`transition-colors ${isExpanded ? 'text-violet-400' : 'text-slate-700'}`}>
                                                                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                {platforms.map(p => (
                                                    <td key={p} className="px-4 py-3.5">
                                                        <MentionBadge mentioned={checks?.[p]?.mentioned} />
                                                    </td>
                                                ))}
                                                <td className="px-5 py-3.5 hidden sm:table-cell">
                                                    <HistoryDots history={history} />
                                                </td>
                                                <td className="px-5 py-3.5 hidden md:table-cell">
                                                    {latestDate
                                                        ? <span className="text-xs text-slate-600">{new Date(latestDate).toLocaleDateString('de-DE')}</span>
                                                        : <span className="text-xs text-slate-700">—</span>}
                                                </td>
                                            </tr>
                                            {isExpanded && (
                                                <tr className="border-b border-white/[0.04] last:border-0">
                                                    <td colSpan={3 + platforms.length} className="px-5 py-4 bg-white/[0.01]">
                                                        <div className="space-y-3">
                                                            {platforms.filter(p => checks?.[p]?.context).map(p => {
                                                                const m = PLATFORM_META[p]
                                                                return (
                                                                    <div key={p}>
                                                                        <p className={`text-xs uppercase tracking-wider font-semibold mb-1 ${m.color}`}>{m.label}</p>
                                                                        <p className="text-sm text-slate-300 italic leading-relaxed">&ldquo;{checks[p].context}&rdquo;</p>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function GeoSitePage() {
    const router     = useRouter()
    const { siteId } = useParams()
    const [site, setSite]       = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchSite = useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/sites/${siteId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const d = await res.json()
            if (!res.ok) throw new Error(d.error)
            setSite(d.site)
        } catch { toast.error('Website nicht gefunden') }
        finally { setLoading(false) }
    }, [siteId])

    useEffect(() => {
        if (!localStorage.getItem('user')) { router.push('/login'); return }
        fetchSite()
    }, [fetchSite, router])

    if (loading) return (
        <div className="min-h-screen bg-[#05080f] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
        </div>
    )

    return (
        <div className="min-h-screen bg-[#05080f]">
            <Toaster position="top-right" toastOptions={{
                style: { background: '#0d1117', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' },
            }} />
            <Navbar />

            <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-28 pb-16">

                {/* Back + Header */}
                <div className="mb-8">
                    <Link href="/geo/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" />Zurück zum Dashboard
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/15 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-violet-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">{site?.displayName || site?.domain}</h1>
                            <div className="text-sm text-slate-500">{site?.domain}</div>
                        </div>
                    </div>
                </div>

                <ResultsTab siteId={siteId} site={site} onSiteUpdated={fetchSite} />
            </div>
        </div>
    )
}