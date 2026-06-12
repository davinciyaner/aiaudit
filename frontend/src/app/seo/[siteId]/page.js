'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowLeft, TrendingUp, TrendingDown, Minus, Plus, Trash2,
    Loader2, RefreshCw, Globe, X, Lightbulb, Users, Link2,
    ExternalLink, ChevronUp, ChevronDown,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../../components/Navbar'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function PositionCell({ position }) {
    if (position == null) return <span className="text-slate-600 text-sm">—</span>
    const color = position <= 3 ? 'text-emerald-400' : position <= 10 ? 'text-teal-400' : position <= 30 ? 'text-amber-400' : 'text-slate-400'
    return <span className={`text-sm font-bold ${color}`}>#{position}</span>
}

function ChangeCell({ change }) {
    if (change == null) return <span className="text-slate-600 text-xs">—</span>
    if (change > 0) return <span className="flex items-center gap-0.5 text-emerald-400 text-xs font-semibold"><ChevronUp className="w-3 h-3" />+{change}</span>
    if (change < 0) return <span className="flex items-center gap-0.5 text-red-400 text-xs font-semibold"><ChevronDown className="w-3 h-3" />{change}</span>
    return <span className="flex items-center gap-0.5 text-slate-500 text-xs"><Minus className="w-3 h-3" />0</span>
}

function VolumeBar({ value, max }) {
    if (!value || !max) return <span className="text-slate-600 text-xs">—</span>
    const pct = Math.min((value / max) * 100, 100)
    return (
        <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500/60 rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs text-slate-400">{value >= 1000 ? `${(value/1000).toFixed(1)}k` : value}</span>
        </div>
    )
}

function LoadingTab() {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
            <span className="text-sm text-slate-500">Daten werden geladen…</span>
        </div>
    )
}

function EmptyTab({ icon: Icon, text }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Icon className="w-8 h-8 text-slate-700" />
            <span className="text-sm text-slate-500">{text}</span>
        </div>
    )
}

// ─── Rankings Tab ─────────────────────────────────────────────────────────────

function RankingsTab({ siteId, site, onSiteUpdated }) {
    const [rankings, setRankings]     = useState([])
    const [loading, setLoading]       = useState(true)
    const [checking, setChecking]     = useState(false)
    const [showAdd, setShowAdd]       = useState(false)
    const [newKeywords, setNewKeywords] = useState('')
    const [addingKws, setAddingKws]   = useState(false)
    const [selected, setSelected]     = useState(new Set())

    const fetchRankings = useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/rankings`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            setRankings(data.rankings || [])
        } catch { toast.error('Fehler beim Laden der Rankings') }
        finally { setLoading(false) }
    }, [siteId])

    useEffect(() => { fetchRankings() }, [fetchRankings])

    const handleCheck = async () => {
        setChecking(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/check`, {
                method: 'POST', headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            toast.success('Check abgeschlossen')
            await fetchRankings()
        } catch (err) { toast.error(err.message || 'Fehler') }
        finally { setChecking(false) }
    }

    const handleAddKeywords = async (e) => {
        e.preventDefault()
        const keywords = newKeywords.split('\n').map(k => k.trim()).filter(Boolean)
        if (!keywords.length) return
        setAddingKws(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/keywords`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ keywords }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            toast.success(`${data.added} Keyword${data.added !== 1 ? 's' : ''} hinzugefügt`)
            setNewKeywords(''); setShowAdd(false)
            onSiteUpdated()
            await fetchRankings()
        } catch (err) { toast.error(err.message || 'Fehler') }
        finally { setAddingKws(false) }
    }

    const handleRemoveSelected = async () => {
        if (!selected.size || !confirm(`${selected.size} Keyword${selected.size > 1 ? 's' : ''} entfernen?`)) return
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/keywords`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ keywords: [...selected] }),
            })
            if (!res.ok) throw new Error()
            toast.success('Keywords entfernt')
            setSelected(new Set())
            onSiteUpdated()
            await fetchRankings()
        } catch { toast.error('Fehler beim Entfernen') }
    }

    const toggleSelect = (kw) => setSelected(prev => {
        const next = new Set(prev); next.has(kw) ? next.delete(kw) : next.add(kw); return next
    })

    return (
        <div>
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
                <div className="text-sm text-slate-500">
                    {site?.lastChecked
                        ? `Zuletzt: ${new Date(site.lastChecked).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}`
                        : 'Noch nicht geprüft'}
                </div>
                <div className="flex items-center gap-2">
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
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white transition-all disabled:opacity-50">
                        {checking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                        {checking ? 'Prüfe…' : 'Jetzt prüfen'}
                    </button>
                </div>
            </div>

            {/* Add Keywords */}
            <AnimatePresence>
                {showAdd && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        className="bg-[#0d1117] border border-emerald-500/20 rounded-2xl p-5 mb-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-white">Keywords hinzufügen</span>
                            <button onClick={() => setShowAdd(false)} className="text-slate-500 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
                        </div>
                        <form onSubmit={handleAddKeywords} className="flex gap-3">
                            <textarea value={newKeywords} onChange={e => setNewKeywords(e.target.value)}
                                placeholder={"keyword eins\nkeyword zwei"} rows={3}
                                className="flex-1 bg-white/3 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none text-sm resize-none font-mono" />
                            <button type="submit" disabled={addingKws}
                                className="self-end flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-50">
                                {addingKws ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                                Hinzufügen
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Table */}
            {loading ? <LoadingTab /> : rankings.length === 0 ? (
                <EmptyTab icon={TrendingUp} text="Noch keine Keywords. Füge Keywords hinzu und starte einen Check." />
            ) : (
                <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/[0.05]">
                                    <th className="w-8 px-5 py-3" />
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Keyword</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Position</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Änderung</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">URL</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Datum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rankings.map(({ keyword, current, change }) => (
                                    <tr key={keyword} onClick={() => toggleSelect(keyword)}
                                        className={`border-b border-white/[0.04] last:border-0 cursor-pointer transition-colors ${selected.has(keyword) ? 'bg-red-500/5' : 'hover:bg-white/[0.02]'}`}>
                                        <td className="px-5 py-3.5">
                                            <div className={`w-3.5 h-3.5 rounded border transition-all ${selected.has(keyword) ? 'bg-red-500/40 border-red-500/60' : 'border-white/15'}`} />
                                        </td>
                                        <td className="px-5 py-3.5"><span className="text-sm text-slate-200">{keyword}</span></td>
                                        <td className="px-5 py-3.5"><PositionCell position={current?.position} /></td>
                                        <td className="px-5 py-3.5"><ChangeCell change={change} /></td>
                                        <td className="px-5 py-3.5 hidden sm:table-cell">
                                            {current?.url ? (
                                                <a href={current.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                                                    className="text-xs text-slate-500 hover:text-emerald-400 transition-colors truncate max-w-[180px] block">
                                                    {current.url.replace(/^https?:\/\//, '')}
                                                </a>
                                            ) : <span className="text-xs text-slate-700">—</span>}
                                        </td>
                                        <td className="px-5 py-3.5 hidden md:table-cell">
                                            {current?.checkedAt
                                                ? <span className="text-xs text-slate-600">{new Date(current.checkedAt).toLocaleDateString('de-DE')}</span>
                                                : <span className="text-xs text-slate-700">—</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

// ─── Keyword-Ideen Tab ────────────────────────────────────────────────────────

function KeywordIdeasTab({ siteId }) {
    const [data, setData]       = useState(null)
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded]   = useState(false)

    const fetch_ = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/keyword-ideas`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const d = await res.json()
            if (!res.ok) throw new Error(d.error)
            setData(d); setLoaded(true)
        } catch (err) { toast.error(err.message || 'Fehler') }
        finally { setLoading(false) }
    }

    const maxVolume = data ? Math.max(
        ...[...( data.volumes || []), ...(data.ideas || [])].map(i => i.searchVolume || 0)
    ) : 0

    if (!loaded) return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Lightbulb className="w-10 h-10 text-emerald-500/30" />
            <p className="text-slate-500 text-sm text-center">Suchvolumen deiner Keywords + 20 neue Keyword-Ideen<br/>laden (DataForSEO Credits werden verbraucht)</p>
            <button onClick={fetch_} disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
                {loading ? 'Wird geladen…' : 'Keyword-Ideen laden'}
            </button>
        </div>
    )

    return (
        <div className="space-y-6">
            {/* Existing keywords with volumes */}
            {data.volumes?.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Deine Keywords — Suchvolumen</h3>
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/[0.05]">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Keyword</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Volumen/Monat</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Wettbewerb</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">CPC</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.volumes.map(item => (
                                    <tr key={item.keyword} className="border-b border-white/[0.04] last:border-0">
                                        <td className="px-5 py-3"><span className="text-sm text-slate-200">{item.keyword}</span></td>
                                        <td className="px-5 py-3"><VolumeBar value={item.searchVolume} max={maxVolume} /></td>
                                        <td className="px-5 py-3 hidden sm:table-cell">
                                            <span className={`text-xs font-medium ${
                                                item.competition === 'HIGH' ? 'text-red-400' :
                                                item.competition === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'
                                            }`}>{item.competition || '—'}</span>
                                        </td>
                                        <td className="px-5 py-3 hidden sm:table-cell">
                                            <span className="text-xs text-slate-500">{item.cpc ? `€${item.cpc.toFixed(2)}` : '—'}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Keyword ideas */}
            {data.ideas?.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Neue Keyword-Ideen</h3>
                    <div className="bg-[#0d1117] border border-emerald-500/10 rounded-2xl overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/[0.05]">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Keyword</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Volumen/Monat</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Wettbewerb</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">CPC</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.ideas.map(item => (
                                    <tr key={item.keyword} className="border-b border-white/[0.04] last:border-0 hover:bg-emerald-500/[0.03] transition-colors">
                                        <td className="px-5 py-3">
                                            <span className="text-sm text-emerald-300 font-medium">{item.keyword}</span>
                                        </td>
                                        <td className="px-5 py-3"><VolumeBar value={item.searchVolume} max={maxVolume} /></td>
                                        <td className="px-5 py-3 hidden sm:table-cell">
                                            <span className={`text-xs font-medium ${
                                                item.competition === 'HIGH' ? 'text-red-400' :
                                                item.competition === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'
                                            }`}>{item.competition || '—'}</span>
                                        </td>
                                        <td className="px-5 py-3 hidden sm:table-cell">
                                            <span className="text-xs text-slate-500">{item.cpc ? `€${item.cpc.toFixed(2)}` : '—'}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <button onClick={fetch_} disabled={loading}
                className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-400 transition-colors">
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                Neu laden
            </button>
        </div>
    )
}

// ─── Konkurrenten Tab ─────────────────────────────────────────────────────────

function CompetitorsTab({ siteId }) {
    const [competitors, setCompetitors] = useState([])
    const [loading, setLoading]         = useState(false)
    const [loaded, setLoaded]           = useState(false)

    const fetch_ = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/competitors`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const d = await res.json()
            if (!res.ok) throw new Error(d.error)
            setCompetitors(d.competitors || []); setLoaded(true)
        } catch (err) { toast.error(err.message || 'Fehler') }
        finally { setLoading(false) }
    }

    if (!loaded) return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Users className="w-10 h-10 text-emerald-500/30" />
            <p className="text-slate-500 text-sm text-center">Finde die 10 größten Konkurrenten deiner Domain<br/>basierend auf gemeinsamen Keywords</p>
            <button onClick={fetch_} disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Users className="w-4 h-4" />}
                {loading ? 'Wird geladen…' : 'Konkurrenten analysieren'}
            </button>
        </div>
    )

    if (!competitors.length) return <EmptyTab icon={Users} text="Keine Konkurrenten gefunden." />

    return (
        <div>
            <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/[0.05]">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Domain</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Gemeinsame KW</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Top 10</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Top 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            {competitors.map((c, i) => (
                                <tr key={c.domain} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                                    <td className="px-5 py-3.5">
                                        <span className="text-sm text-slate-500">{i + 1}</span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <a href={`https://${c.domain}`} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-sm text-slate-200 hover:text-emerald-400 transition-colors">
                                            {c.domain}
                                            <ExternalLink className="w-3 h-3 text-slate-600" />
                                        </a>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className="text-sm font-bold text-white">{c.intersections ?? '—'}</span>
                                    </td>
                                    <td className="px-5 py-3.5 hidden sm:table-cell">
                                        <span className="text-sm text-teal-400">{c.competitorMetrics?.organicPos1_10 ?? '—'}</span>
                                    </td>
                                    <td className="px-5 py-3.5 hidden sm:table-cell">
                                        <span className="text-sm text-emerald-400">{c.competitorMetrics?.organicPos1_3 ?? '—'}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <button onClick={fetch_} disabled={loading}
                className="mt-4 flex items-center gap-2 text-xs text-slate-600 hover:text-slate-400 transition-colors">
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                Neu laden
            </button>
        </div>
    )
}

// ─── Backlinks Tab ────────────────────────────────────────────────────────────

function BacklinksTab({ siteId }) {
    const [summary, setSummary] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded]   = useState(false)

    const fetch_ = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/backlinks`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const d = await res.json()
            if (!res.ok) throw new Error(d.error)
            setSummary(d.summary); setLoaded(true)
        } catch (err) { toast.error(err.message || 'Fehler') }
        finally { setLoading(false) }
    }

    if (!loaded) return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Link2 className="w-10 h-10 text-emerald-500/30" />
            <p className="text-slate-500 text-sm text-center">Backlink-Zusammenfassung deiner Domain laden</p>
            <button onClick={fetch_} disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link2 className="w-4 h-4" />}
                {loading ? 'Wird geladen…' : 'Backlinks laden'}
            </button>
        </div>
    )

    if (!summary) return <EmptyTab icon={Link2} text="Keine Backlink-Daten gefunden." />

    const stats = [
        { label: 'Backlinks gesamt',     value: summary.backlinks?.toLocaleString('de-DE') ?? '—', color: 'text-white' },
        { label: 'Referring Domains',    value: summary.referringDomains?.toLocaleString('de-DE') ?? '—', color: 'text-emerald-400' },
        { label: 'Referring IPs',        value: summary.referringIPs?.toLocaleString('de-DE') ?? '—', color: 'text-teal-400' },
        { label: 'Dofollow',             value: summary.dofollow?.toLocaleString('de-DE') ?? '—', color: 'text-emerald-400' },
        { label: 'Nofollow',             value: summary.nofollow?.toLocaleString('de-DE') ?? '—', color: 'text-slate-400' },
        { label: 'Spam Score',           value: summary.spamScore != null ? `${summary.spamScore}%` : '—', color: summary.spamScore > 30 ? 'text-red-400' : 'text-emerald-400' },
    ]

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {stats.map(s => (
                    <div key={s.label} className="bg-[#0d1117] border border-white/[0.06] rounded-xl p-4">
                        <div className="text-xs text-slate-500 mb-1.5">{s.label}</div>
                        <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                    </div>
                ))}
            </div>

            {summary.firstSeen && (
                <div className="text-xs text-slate-600">
                    Erster Backlink seit: {new Date(summary.firstSeen).toLocaleDateString('de-DE')}
                </div>
            )}

            <button onClick={fetch_} disabled={loading}
                className="mt-4 flex items-center gap-2 text-xs text-slate-600 hover:text-slate-400 transition-colors">
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                Neu laden
            </button>
        </div>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const TABS = [
    { id: 'rankings',  label: 'Rankings',       icon: TrendingUp },
    { id: 'ideas',     label: 'Keyword-Ideen',  icon: Lightbulb },
    { id: 'competitors', label: 'Konkurrenten', icon: Users },
    { id: 'backlinks', label: 'Backlinks',       icon: Link2 },
]

export default function SeoSitePage() {
    const router     = useRouter()
    const { siteId } = useParams()
    const [site, setSite]       = useState(null)
    const [loading, setLoading] = useState(true)
    const [tab, setTab]         = useState('rankings')

    const fetchSite = useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            setSite(data.site)
        } catch { toast.error('Website nicht gefunden') }
        finally { setLoading(false) }
    }, [siteId])

    useEffect(() => {
        if (!localStorage.getItem('user')) { router.push('/login'); return }
        fetchSite()
    }, [fetchSite, router])

    if (loading) return (
        <div className="min-h-screen bg-[#05080f] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
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
                    <Link href="/seo/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" />Zurück zum Dashboard
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">{site?.displayName || site?.domain}</h1>
                            <div className="text-sm text-slate-500">{site?.domain}</div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 mb-6 border-b border-white/[0.06] overflow-x-auto">
                    {TABS.map(t => (
                        <button key={t.id} onClick={() => setTab(t.id)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all -mb-px ${
                                tab === t.id
                                    ? 'text-emerald-400 border-emerald-400'
                                    : 'text-slate-500 hover:text-slate-300 border-transparent'
                            }`}>
                            <t.icon className="w-3.5 h-3.5" />
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {tab === 'rankings'     && <RankingsTab siteId={siteId} site={site} onSiteUpdated={fetchSite} />}
                {tab === 'ideas'        && <KeywordIdeasTab siteId={siteId} />}
                {tab === 'competitors'  && <CompetitorsTab siteId={siteId} />}
                {tab === 'backlinks'    && <BacklinksTab siteId={siteId} />}
            </div>
        </div>
    )
}