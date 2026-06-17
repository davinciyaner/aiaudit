'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowLeft, TrendingUp, TrendingDown, Minus, Plus, Trash2,
    Loader2, RefreshCw, Globe, X, Lightbulb, Users, Link2,
    ExternalLink, ChevronUp, ChevronDown, GitCompare, Check, Lock, Download, Bell, Settings,
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

// ─── Sparkline Chart ──────────────────────────────────────────────────────────

function SparklineChart({ history }) {
    const valid = history.filter(h => h.position != null)
    if (valid.length < 2) return (
        <p className="text-xs text-slate-600 py-2">Noch nicht genug Daten für einen Verlauf. Mindestens 2 Checks benötigt.</p>
    )

    const W = 600, H = 100
    const padL = 38, padR = 12, padT = 18, padB = 26
    const chartW = W - padL - padR
    const chartH = H - padT - padB

    const positions = valid.map(h => h.position)
    const rawMin = Math.min(...positions)
    const rawMax = Math.max(...positions)
    const span   = Math.max(rawMax - rawMin, 15)
    const minPos = Math.max(1, rawMin - Math.round(span * 0.2))
    const maxPos = rawMax + Math.round(span * 0.2)
    const range  = maxPos - minPos

    const n   = history.length
    const xOf = (i) => padL + (i / (n - 1)) * chartW
    const yOf = (pos) => padT + ((pos - minPos) / range) * chartH

    const colorOf = (pos) => {
        if (pos == null) return '#475569'
        if (pos <= 3)   return '#10b981'
        if (pos <= 10)  return '#14b8a6'
        if (pos <= 30)  return '#f59e0b'
        return '#64748b'
    }

    // Build polyline segments, skipping null gaps
    const segments = []
    let seg = []
    history.forEach((h, i) => {
        if (h.position != null) {
            seg.push([xOf(i), yOf(h.position)])
        } else {
            if (seg.length) { segments.push(seg); seg = [] }
        }
    })
    if (seg.length) segments.push(seg)

    // Y axis labels at top, mid, bottom
    const yTicks = [minPos, Math.round((minPos + maxPos) / 2), maxPos]

    return (
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100" preserveAspectRatio="xMidYMid meet" className="overflow-visible">
            {/* Y-grid + labels */}
            {yTicks.map(tick => {
                const y = yOf(tick)
                return (
                    <g key={tick}>
                        <line x1={padL} y1={y} x2={W - padR} y2={y}
                            stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                        <text x={padL - 5} y={y + 3.5} textAnchor="end"
                            fontSize="8" fill="#334155" fontFamily="system-ui">{tick}</text>
                    </g>
                )
            })}

            {/* Polyline segments */}
            {segments.map((s, si) => s.length > 1 && (
                <polyline key={si}
                    points={s.map(([x, y]) => `${x},${y}`).join(' ')}
                    fill="none" stroke="#10b981" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
            ))}

            {/* Dots + labels + dates */}
            {history.map((h, i) => {
                const x    = xOf(i)
                const y    = h.position != null ? yOf(h.position) : padT + chartH + 6
                const col  = colorOf(h.position)
                const date = new Date(h.checkedAt).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })
                return (
                    <g key={i}>
                        <circle cx={x} cy={y} r="3.5" fill={col} />
                        {h.position != null ? (
                            <text x={x} y={y - 7} textAnchor="middle"
                                fontSize="8.5" fill={col} fontWeight="700" fontFamily="system-ui">
                                #{h.position}
                            </text>
                        ) : (
                            <text x={x} y={y - 3} textAnchor="middle"
                                fontSize="7" fill="#475569" fontFamily="system-ui">—</text>
                        )}
                        <text x={x} y={H - 2} textAnchor="middle"
                            fontSize="7.5" fill="#334155" fontFamily="system-ui">{date}</text>
                    </g>
                )
            })}
        </svg>
    )
}

// ─── CTR Helper ──────────────────────────────────────────────────────────────

const CTR_RATES = [28, 15, 11, 8, 7, 5, 4, 3, 3, 2]
function getCTR(pos) {
    if (!pos) return null
    if (pos <= 10) return CTR_RATES[pos - 1]
    if (pos <= 20) return 1
    return 0.5
}

const FILTERS = [
    { id: 'alle',      label: 'Alle' },
    { id: 'top3',      label: 'Top 3' },
    { id: 'top10',     label: 'Top 10' },
    { id: 'gestiegen', label: '↑ Gestiegen' },
    { id: 'gefallen',  label: '↓ Gefallen' },
]

// ─── Rankings Tab ─────────────────────────────────────────────────────────────

function RankingsTab({ siteId, site, onSiteUpdated }) {
    const [rankings, setRankings]       = useState([])
    const [loading, setLoading]         = useState(true)
    const [checking, setChecking]       = useState(false)
    const [showAdd, setShowAdd]         = useState(false)
    const [newKeywords, setNewKeywords] = useState('')
    const [addingKws, setAddingKws]     = useState(false)
    const [selected, setSelected]       = useState(new Set())
    const [expandedKw, setExpandedKw]   = useState(null)
    const [filter, setFilter]           = useState('alle')

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

    const toggleExpand = (kw) => setExpandedKw(prev => prev === kw ? null : kw)

    const filteredRankings = rankings.filter(r => {
        if (filter === 'top3')      return r.current?.position != null && r.current.position <= 3
        if (filter === 'top10')     return r.current?.position != null && r.current.position <= 10
        if (filter === 'gestiegen') return r.change > 0
        if (filter === 'gefallen')  return r.change < 0
        return true
    })

    const exportCSV = () => {
        const headers = ['Keyword', 'Position', 'Änderung', 'CTR (est. %)', 'URL', 'Datum']
        const rows = rankings.map(({ keyword, current, change }) => [
            keyword,
            current?.position ?? '',
            change ?? '',
            current?.position ? getCTR(current.position) + '%' : '',
            current?.url ?? '',
            current?.checkedAt ? new Date(current.checkedAt).toLocaleDateString('de-DE') : '',
        ])
        const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
        const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `rankings-${site?.domain ?? 'export'}-${new Date().toISOString().slice(0, 10)}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div>
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
                    {rankings.length > 0 && (
                        <button onClick={exportCSV}
                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all">
                            <Download className="w-3.5 h-3.5" />CSV
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

            {/* Quick-Filter */}
            {rankings.length > 0 && (
                <div className="flex items-center gap-1.5 mb-5 flex-wrap">
                    {FILTERS.map(f => (
                        <button key={f.id} onClick={() => setFilter(f.id)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                                filter === f.id
                                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                                    : 'bg-white/4 border border-white/8 text-slate-500 hover:text-slate-300 hover:bg-white/8'
                            }`}>
                            {f.label}
                        </button>
                    ))}
                    <span className="text-xs text-slate-600 ml-1">{filteredRankings.length} Keywords</span>
                </div>
            )}

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
            ) : filteredRankings.length === 0 ? (
                <EmptyTab icon={TrendingUp} text={`Keine Keywords für Filter "${FILTERS.find(f => f.id === filter)?.label}".`} />
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
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">CTR (est.)</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">URL</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Datum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRankings.map(({ keyword, current, change, history }) => {
                                    const isExpanded = expandedKw === keyword
                                    const isSelected = selected.has(keyword)
                                    const hasHistory = history?.length >= 2
                                    return (
                                        <React.Fragment key={keyword}>
                                            <tr
                                                className={`border-b border-white/[0.04] cursor-pointer transition-colors ${isSelected ? 'bg-red-500/5' : isExpanded ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'} ${!isExpanded ? 'last:border-0' : ''}`}>
                                                <td className="px-5 py-3.5" onClick={(e) => { e.stopPropagation(); toggleSelect(keyword) }}>
                                                    <div className={`w-3.5 h-3.5 rounded border transition-all ${isSelected ? 'bg-red-500/40 border-red-500/60' : 'border-white/15'}`} />
                                                </td>
                                                <td className="px-5 py-3.5" onClick={() => hasHistory && toggleExpand(keyword)}>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-slate-200">{keyword}</span>
                                                        {hasHistory && (
                                                            <span className={`transition-colors ${isExpanded ? 'text-emerald-400' : 'text-slate-700 hover:text-slate-500'}`}>
                                                                <TrendingUp className="w-3 h-3" />
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3.5" onClick={() => hasHistory && toggleExpand(keyword)}><PositionCell position={current?.position} /></td>
                                                <td className="px-5 py-3.5" onClick={() => hasHistory && toggleExpand(keyword)}><ChangeCell change={change} /></td>
                                                <td className="px-5 py-3.5 hidden sm:table-cell" onClick={() => hasHistory && toggleExpand(keyword)}>
                                                    {current?.position ? (
                                                        <span className="text-xs font-semibold text-slate-300">
                                                            ~{getCTR(current.position)}%
                                                        </span>
                                                    ) : <span className="text-xs text-slate-700">—</span>}
                                                </td>
                                                <td className="px-5 py-3.5 hidden sm:table-cell" onClick={() => hasHistory && toggleExpand(keyword)}>
                                                    {current?.url ? (
                                                        <a href={current.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                                                            className="text-xs text-slate-500 hover:text-emerald-400 transition-colors truncate max-w-[180px] block">
                                                            {current.url.replace(/^https?:\/\//, '')}
                                                        </a>
                                                    ) : <span className="text-xs text-slate-700">—</span>}
                                                </td>
                                                <td className="px-5 py-3.5 hidden md:table-cell" onClick={() => hasHistory && toggleExpand(keyword)}>
                                                    {current?.checkedAt
                                                        ? <span className="text-xs text-slate-600">{new Date(current.checkedAt).toLocaleDateString('de-DE')}</span>
                                                        : <span className="text-xs text-slate-700">—</span>}
                                                </td>
                                            </tr>
                                            {isExpanded && (
                                                <tr className="border-b border-white/[0.04] last:border-0">
                                                    <td colSpan={7} className="px-5 py-4 bg-white/[0.01]">
                                                        <p className="text-xs text-slate-500 mb-3 uppercase tracking-wider font-semibold">Verlauf — {keyword}</p>
                                                        <SparklineChart history={history} />
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

// ─── Keyword-Ideen Tab ────────────────────────────────────────────────────────

function KeywordIdeasTab({ siteId }) {
    const [data, setData]       = useState(null)
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded]   = useState(false)
    const [adding, setAdding]   = useState(new Set())
    const [added, setAdded]     = useState(new Set())

    const handleAddKeyword = async (keyword) => {
        setAdding(prev => new Set(prev).add(keyword))
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/keywords`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ keywords: [keyword] }),
            })
            const d = await res.json()
            if (!res.ok) throw new Error(d.error)
            setAdded(prev => new Set(prev).add(keyword))
            toast.success(`"${keyword}" wird jetzt getrackt`)
        } catch (err) { toast.error(err.message || 'Fehler') }
        finally { setAdding(prev => { const n = new Set(prev); n.delete(keyword); return n }) }
    }

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
                                    <th className="px-5 py-3" />
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
                                        <td className="px-5 py-3">
                                            <button onClick={() => handleAddKeyword(item.keyword)} disabled={adding.has(item.keyword) || added.has(item.keyword)}
                                                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                                                    added.has(item.keyword)
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default'
                                                        : 'bg-white/5 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/20'
                                                }`}>
                                                {adding.has(item.keyword) ? <Loader2 className="w-3 h-3 animate-spin" /> : added.has(item.keyword) ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                                {added.has(item.keyword) ? 'Getrackt' : 'Tracken'}
                                            </button>
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
                                    <th className="px-5 py-3" />
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
                                        <td className="px-5 py-3">
                                            <button onClick={() => handleAddKeyword(item.keyword)} disabled={adding.has(item.keyword) || added.has(item.keyword)}
                                                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                                                    added.has(item.keyword)
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default'
                                                        : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                                                }`}>
                                                {adding.has(item.keyword) ? <Loader2 className="w-3 h-3 animate-spin" /> : added.has(item.keyword) ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                                {added.has(item.keyword) ? 'Getrackt' : 'Tracken'}
                                            </button>
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

// ─── Content Gap Tab ─────────────────────────────────────────────────────────

function ContentGapTab({ siteId, plan }) {
    const [competitor, setCompetitor]     = useState('')
    const [loading, setLoading]           = useState(false)
    const [result, setResult]             = useState(null)
    const [adding, setAdding]             = useState(new Set())
    const [added, setAdded]               = useState(new Set())
    const [limitReached, setLimitReached] = useState(null) // { used, limit }

    const maxVolume = result?.gap?.length
        ? Math.max(...result.gap.map(g => g.searchVolume || 0))
        : 0

    const handleAnalyse = async (e) => {
        e.preventDefault()
        const domain = competitor.trim().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]
        if (!domain) return
        setLoading(true)
        setResult(null)
        setLimitReached(null)
        setAdded(new Set())
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/content-gap?competitor=${encodeURIComponent(domain)}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            const d = await res.json()
            if (res.status === 429 && d.error === 'monthly_limit_reached') { setLimitReached({ used: d.used, limit: d.limit }); return }
            if (res.status === 429) throw new Error(d.error || 'Zu viele Anfragen — bitte warte eine Minute.')
            if (!res.ok) throw new Error(d.error)
            setResult(d)
        } catch (err) { toast.error(err.message || 'Fehler bei der Analyse') }
        finally { setLoading(false) }
    }

    const handleAddKeyword = async (keyword) => {
        setAdding(prev => new Set(prev).add(keyword))
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/keywords`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ keywords: [keyword] }),
            })
            const d = await res.json()
            if (!res.ok) throw new Error(d.error)
            setAdded(prev => new Set(prev).add(keyword))
            toast.success(`"${keyword}" wird jetzt getrackt`)
        } catch (err) { toast.error(err.message || 'Fehler') }
        finally { setAdding(prev => { const n = new Set(prev); n.delete(keyword); return n }) }
    }

    if (plan === 'einsteiger') return (
        <div className="flex flex-col items-center justify-center py-20 gap-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center">
                <Lock className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-2">Content Gap Analyse</h3>
                <p className="text-sm text-slate-500 max-w-sm">
                    Finde Keywords, für die dein Konkurrent rankt — aber du nicht.<br />
                    Verfügbar ab <strong className="text-white">Pro (€79/Monat)</strong> · 100 Analysen/Monat.
                </p>
            </div>
            <Link href="/seo/pricing"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold rounded-xl transition-all">
                Auf Pro upgraden →
            </Link>
        </div>
    )

    const monthlyLimit = plan === 'expert' ? 300 : 100

    return (
        <div className="space-y-6">
            {/* Input + usage counter */}
            <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-slate-400">
                        Gib eine Konkurrenz-Domain ein — wir zeigen dir Keywords, für die dein Konkurrent rankt, du aber noch nicht trackst.
                    </p>
                    {result && (
                        <span className="text-xs text-slate-600 whitespace-nowrap ml-4">
                            {result.used}/{result.limit} diesen Monat
                        </span>
                    )}
                </div>
                <form onSubmit={handleAnalyse} className="flex gap-3">
                    <input
                        value={competitor}
                        onChange={e => setCompetitor(e.target.value)}
                        placeholder="konkurrent.de"
                        className="flex-1 bg-white/3 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 outline-none text-sm"
                    />
                    <button type="submit" disabled={loading || !competitor.trim()}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-50 whitespace-nowrap">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <GitCompare className="w-4 h-4" />}
                        {loading ? 'Analysiere…' : 'Gap analysieren'}
                    </button>
                </form>
            </div>

            {/* Limit reached */}
            {limitReached && (
                <div className="flex flex-col items-center justify-center py-12 gap-4 bg-[#0d1117] border border-amber-500/15 rounded-2xl">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-semibold text-white mb-1">Monatliches Limit erreicht</p>
                        <p className="text-xs text-slate-500">
                            Du hast {limitReached.limit} von {limitReached.limit} Content Gap Analysen diesen Monat verwendet.<br />
                            {plan === 'pro'
                                ? 'Upgrade auf Expert für 300 Analysen/Monat.'
                                : 'Das Limit wird am 1. des nächsten Monats zurückgesetzt.'}
                        </p>
                    </div>
                    {plan === 'pro' && (
                        <Link href="/seo/pricing"
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold rounded-xl transition-all">
                            Auf Expert upgraden →
                        </Link>
                    )}
                </div>
            )}

            {/* Results */}
            {result && (
                <div>
                    {result.gap.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 gap-3">
                            <GitCompare className="w-8 h-8 text-slate-700" />
                            <span className="text-sm text-slate-500">Kein Gap gefunden — du trackst bereits alle Top-Keywords von {result.competitor}.</span>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                                    {result.gap.length} Keywords — {result.competitor} rankt dafür, du nicht
                                </h3>
                                <span className="text-xs text-slate-600">Sortiert nach Suchvolumen</span>
                            </div>
                            <div className="bg-[#0d1117] border border-emerald-500/10 rounded-2xl overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/[0.05]">
                                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Keyword</th>
                                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Volumen/Mo</th>
                                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Konkurrent</th>
                                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Wettbewerb</th>
                                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">CPC</th>
                                                <th className="px-5 py-3" />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.gap.map(item => {
                                                const isAdded  = added.has(item.keyword)
                                                const isAdding = adding.has(item.keyword)
                                                return (
                                                    <tr key={item.keyword} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                                                        <td className="px-5 py-3.5"><span className="text-sm text-slate-200 font-medium">{item.keyword}</span></td>
                                                        <td className="px-5 py-3.5"><VolumeBar value={item.searchVolume} max={maxVolume} /></td>
                                                        <td className="px-5 py-3.5 hidden sm:table-cell"><PositionCell position={item.competitorPosition} /></td>
                                                        <td className="px-5 py-3.5 hidden sm:table-cell">
                                                            <span className={`text-xs font-medium ${item.competition === 'HIGH' ? 'text-red-400' : item.competition === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'}`}>
                                                                {item.competition || '—'}
                                                            </span>
                                                        </td>
                                                        <td className="px-5 py-3.5 hidden md:table-cell">
                                                            <span className="text-xs text-slate-500">{item.cpc ? `€${item.cpc.toFixed(2)}` : '—'}</span>
                                                        </td>
                                                        <td className="px-5 py-3.5 text-right">
                                                            {isAdded ? (
                                                                <span className="flex items-center justify-end gap-1 text-xs text-emerald-400 font-semibold">
                                                                    <Check className="w-3.5 h-3.5" />Getrackt
                                                                </span>
                                                            ) : (
                                                                <button onClick={() => handleAddKeyword(item.keyword)} disabled={isAdding}
                                                                    className="flex items-center gap-1 ml-auto px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all disabled:opacity-50 whitespace-nowrap">
                                                                    {isAdding ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                                                                    Tracken
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <button onClick={handleAnalyse} disabled={loading}
                                className="mt-4 flex items-center gap-2 text-xs text-slate-600 hover:text-slate-400 transition-colors">
                                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                                Neu laden
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

// ─── Settings Tab ────────────────────────────────────────────────────────────

function SettingsTab({ siteId }) {
    const [alertsEnabled, setAlertsEnabled] = useState(true)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/alert-settings`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(r => r.json())
            .then(d => { if (typeof d.seoEmailAlerts === 'boolean') setAlertsEnabled(d.seoEmailAlerts) })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    async function toggleAlerts() {
        setSaving(true)
        try {
            const token = localStorage.getItem('token')
            const next = !alertsEnabled
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/alert-settings`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ seoEmailAlerts: next }),
            })
            if (res.ok) setAlertsEnabled(next)
        } catch {}
        finally { setSaving(false) }
    }

    if (loading) return <LoadingTab />

    return (
        <div className="max-w-lg space-y-4">
            {/* Email alerts card */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center">
                        <Bell className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white">E-Mail-Alerts</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Werde benachrichtigt, wenn sich Rankings ändern</p>
                    </div>
                </div>

                <div className="space-y-3 mb-5">
                    <div className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-emerald-400" strokeWidth={3} />
                        </div>
                        <p className="text-xs text-slate-400">Automatischer wöchentlicher Check (montags)</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-emerald-400" strokeWidth={3} />
                        </div>
                        <p className="text-xs text-slate-400">Alert bei signifikanten Verlusten <span className="text-slate-600">(Einsteiger: ±10, Pro: ±5, Expert: ±3 Positionen)</span></p>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-emerald-400" strokeWidth={3} />
                        </div>
                        <p className="text-xs text-slate-400">Alert bei Verbesserungen — neu in Top 10 oder +5 Positionen</p>
                    </div>
                </div>

                <button
                    onClick={toggleAlerts}
                    disabled={saving}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border transition-all ${
                        alertsEnabled
                            ? 'bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/15'
                            : 'bg-white/[0.03] border-white/10 hover:border-white/15'
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <Bell className={`w-4 h-4 ${alertsEnabled ? 'text-emerald-400' : 'text-slate-600'}`} />
                        <span className={`text-sm font-medium ${alertsEnabled ? 'text-emerald-300' : 'text-slate-500'}`}>
                            Ranking-Alerts per E-Mail
                        </span>
                    </div>
                    <div className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${alertsEnabled ? 'bg-emerald-500' : 'bg-white/10'}`}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${alertsEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </div>
                </button>

                <p className="text-xs text-slate-600 mt-3">
                    {alertsEnabled
                        ? 'Du erhältst E-Mails sobald ein manueller oder wöchentlicher Check relevante Änderungen erkennt.'
                        : 'Alerts sind deaktiviert — du erhältst keine E-Mails bei Ranking-Änderungen.'}
                </p>
            </div>
        </div>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const TABS = [
    { id: 'rankings',    label: 'Rankings',       icon: TrendingUp },
    { id: 'ideas',       label: 'Keyword-Ideen',  icon: Lightbulb },
    { id: 'gap',         label: 'Content Gap',    icon: GitCompare },
    { id: 'competitors', label: 'Konkurrenten',   icon: Users },
    { id: 'backlinks',   label: 'Backlinks',      icon: Link2 },
    { id: 'settings',    label: 'Einstellungen',  icon: Settings },
]

export default function SeoSitePage() {
    const router     = useRouter()
    const { siteId } = useParams()
    const [site, setSite]       = useState(null)
    const [plan, setPlan]       = useState(null)
    const [loading, setLoading] = useState(true)
    const [tab, setTab]         = useState('rankings')

    const fetchSite = useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            const [siteRes, planRes] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/plan`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ])
            const siteData = await siteRes.json()
            const planData = await planRes.json()
            if (!siteRes.ok) throw new Error(siteData.error)
            setSite(siteData.site)
            setPlan(planData.plan || null)
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
                {tab === 'rankings'    && <RankingsTab siteId={siteId} site={site} onSiteUpdated={fetchSite} />}
                {tab === 'ideas'       && <KeywordIdeasTab siteId={siteId} />}
                {tab === 'gap'         && <ContentGapTab siteId={siteId} plan={plan} />}
                {tab === 'competitors' && <CompetitorsTab siteId={siteId} />}
                {tab === 'backlinks'   && <BacklinksTab siteId={siteId} />}
                {tab === 'settings'    && <SettingsTab siteId={siteId} />}
            </div>
        </div>
    )
}