'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowLeft, Globe, Loader2, RefreshCw, Plus, Trash2, X,
    Sparkles, Check, ChevronDown, ChevronUp, Settings2, Lock,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../../components/Navbar'

const PLATFORM_META = {
    claude:     { label: 'Claude',             color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    chatgpt:    { label: 'ChatGPT',            color: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/20'  },
    perplexity: { label: 'Perplexity',         color: 'text-teal-400',   bg: 'bg-teal-500/10',   border: 'border-teal-500/20'   },
    google_aio: { label: 'Google AI Overview', color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20'   },
}

// Cost per check in USD (200 input + 400 output tokens)
const COST_PER_CHECK = { claude: 0.0066, chatgpt: 0.0045, perplexity: 0.0056, google_aio: 0.0026 }

// Mirrors backend PLAN_LIMITS[plan].platforms (geo_tracking.js)
const PLAN_PLATFORMS = {
    einsteiger: ['claude'],
    pro:        ['claude', 'chatgpt', 'perplexity', 'google_aio'],
    expert:     ['claude', 'chatgpt', 'perplexity', 'google_aio'],
}
const ALL_PLATFORMS = ['claude', 'chatgpt', 'perplexity', 'google_aio']

const INTENT_META = {
    empfehlung: { label: 'Empfehlung' },
    vergleich:  { label: 'Vergleich' },
}

function aggregateMention(checks, platform, intents) {
    const docs = intents.map(i => checks?.[platform]?.[i]).filter(Boolean)
    if (!docs.length) return null
    return docs.some(d => d.mentioned)
}

function MentionBadge({ mentioned }) {
    if (mentioned == null) return <span className="text-xs text-slate-600">—</span>
    return mentioned
        ? <span className="inline-flex items-center gap-1 text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-md"><Check className="w-3 h-3" />Ja</span>
        : <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md"><X className="w-3 h-3 opacity-50" />Nein</span>
}

function SentimentBadge({ sentiment }) {
    const meta = {
        positive: { label: 'Positiv', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
        neutral:  { label: 'Neutral', color: 'text-slate-400',   bg: 'bg-white/5',         border: 'border-white/10'    },
        negative: { label: 'Negativ', color: 'text-red-400',     bg: 'bg-red-500/10',      border: 'border-red-500/20'  },
    }[sentiment]
    if (!meta) return null
    return (
        <span className={`inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded ml-1.5 ${meta.color} ${meta.bg} border ${meta.border}`}>
            {meta.label}
        </span>
    )
}

function CompetitorsPanel({ siteId }) {
    const [data, setData]       = useState(null)
    const [loading, setLoading] = useState(true)
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/sites/${siteId}/competitors`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(setData)
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [siteId])

    if (loading || !data?.competitors?.length) return null

    const visible = expanded ? data.competitors : data.competitors.slice(0, 5)

    return (
        <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Wer wird sonst noch genannt (Share of Voice)</h3>
                <span className="text-xs text-slate-600">{data.totalCitations} Zitate insgesamt</span>
            </div>
            <div className="space-y-2.5">
                {visible.map((c, i) => (
                    <div key={c.domain} className="flex items-center gap-3">
                        <span className="text-xs text-slate-600 w-5 text-right shrink-0">{i + 1}.</span>
                        <div className="flex-1 min-w-0">
                            <a href={`https://${c.domain}`} target="_blank" rel="noopener noreferrer"
                                className="text-sm text-slate-200 hover:text-violet-400 truncate block">{c.domain}</a>
                            {c.title && <div className="text-[11px] text-slate-600 truncate">{c.title}</div>}
                        </div>
                        <div className="w-20 shrink-0 hidden sm:block">
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-violet-500 rounded-full" style={{ width: `${Math.min(c.share * 4, 100)}%` }} />
                            </div>
                        </div>
                        <span className="text-xs font-semibold text-violet-400 w-12 text-right shrink-0">{c.share}%</span>
                        <span className="text-xs text-slate-600 w-8 text-right shrink-0">{c.count}×</span>
                    </div>
                ))}
            </div>
            {data.competitors.length > 5 && (
                <button onClick={() => setExpanded(v => !v)}
                    className="mt-3 text-xs text-violet-400 hover:text-violet-300">
                    {expanded ? 'Weniger anzeigen' : `Alle ${data.competitors.length} anzeigen`}
                </button>
            )}
        </div>
    )
}

function CitationAnalysis({ url }) {
    const [loading, setLoading]   = useState(false)
    const [analysis, setAnalysis] = useState(null)
    const [error, setError]       = useState(null)

    const handleAnalyze = async () => {
        setLoading(true)
        setError(null)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/analyze-citation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ url }),
            })
            const d = await res.json()
            if (!res.ok) throw new Error(d.error)
            setAnalysis(d.analysis)
        } catch (err) {
            setError(err.message || 'Analyse fehlgeschlagen')
        } finally {
            setLoading(false)
        }
    }

    if (analysis) {
        const c = analysis.checks
        const rows = [
            [`${c.wordCount} Wörter`, true],
            ['FAQ-Schema', c.hasFAQ],
            ['Structured Data', c.hasStructuredData],
            ['Klare Definition', c.hasDirectDefinition],
            ['Konkrete Zahlen', c.hasStatistics],
            ['Autor-Info', c.hasAuthorInfo],
        ]
        return (
            <div className="mt-1.5 p-2.5 bg-white/[0.03] border border-white/10 rounded-lg">
                <div className="text-xs font-semibold text-white mb-1.5">GEO-Score: {analysis.score}/100</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-400">
                    {rows.map(([label, ok], i) => (
                        <span key={i} className={ok === true && i === 0 ? '' : ok ? 'text-emerald-400' : 'text-slate-500'}>
                            {i === 0 ? label : `${ok ? '✓' : '✗'} ${label}`}
                        </span>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <button onClick={handleAnalyze} disabled={loading}
            className="text-[11px] text-violet-400 hover:text-violet-300 underline underline-offset-2 disabled:opacity-50 disabled:no-underline">
            {loading ? 'Analysiere…' : error ? `Fehler — nochmal versuchen` : 'Warum wird das zitiert?'}
        </button>
    )
}

function CitationList({ citations }) {
    if (!citations?.length) return null
    return (
        <div className="mt-2 space-y-2">
            <p className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">Zitierte Quellen ({citations.length})</p>
            {citations.slice(0, 5).map((cit, idx) => (
                <div key={idx} className="text-xs">
                    <a href={cit.url} target="_blank" rel="noopener noreferrer"
                        className="text-slate-400 hover:text-slate-200 underline underline-offset-2">
                        {cit.domain}
                    </a>
                    {cit.title && <span className="text-slate-600"> — {cit.title}</span>}
                    <div><CitationAnalysis url={cit.url} /></div>
                </div>
            ))}
        </div>
    )
}

function MentionHistoryChart({ siteId }) {
    const [history, setHistory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [hover, setHover]     = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/sites/${siteId}/history`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(d => setHistory(d.history || []))
            .catch(() => setHistory([]))
            .finally(() => setLoading(false))
    }, [siteId])

    if (loading || !history?.length) return null

    const W = 640, H = 180, padL = 34, padR = 12, padT = 12, padB = 24
    const plotW = W - padL - padR, plotH = H - padT - padB
    const n = history.length
    const xAt = (i) => n <= 1 ? padL : padL + (plotW * i) / (n - 1)
    const yAt = (rate) => padT + plotH * (1 - rate / 100)

    const points = history.map((h, i) => `${xAt(i)},${yAt(h.rate)}`).join(' ')
    const formatDate = (iso) => new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })

    return (
        <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Mention-Rate Verlauf</h3>
                <span className="text-xs text-slate-600">{n} Check{n !== 1 ? 's' : ''} aufgezeichnet</span>
            </div>

            <div className="relative">
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
                    {[0, 25, 50, 75, 100].map(v => (
                        <g key={v}>
                            <line x1={padL} x2={W - padR} y1={yAt(v)} y2={yAt(v)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                            <text x={padL - 8} y={yAt(v) + 3} textAnchor="end" fontSize="9" fill="#64748b">{v}%</text>
                        </g>
                    ))}

                    {history.map((h, i) => {
                        if (n > 1 && i !== 0 && i !== n - 1 && i % Math.ceil(n / 6) !== 0) return null
                        return (
                            <text key={i} x={xAt(i)} y={H - 6} textAnchor="middle" fontSize="9" fill="#64748b">
                                {formatDate(h.date)}
                            </text>
                        )
                    })}

                    {n > 1 && (
                        <polyline points={points} fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    )}
                    {history.map((h, i) => (
                        <circle key={i} cx={xAt(i)} cy={yAt(h.rate)} r={hover === i ? 5 : 3.5}
                            fill="#a78bfa" stroke="#0d1117" strokeWidth="2"
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
                    ))}
                </svg>

                {hover != null && (
                    <div className="absolute px-2.5 py-1.5 bg-[#161c2e] border border-white/10 rounded-lg text-xs pointer-events-none shadow-lg"
                        style={{
                            left: `${(xAt(hover) / W) * 100}%`,
                            top: `${(yAt(history[hover].rate) / H) * 100}%`,
                            transform: 'translate(-50%, -130%)',
                        }}>
                        <div className="text-slate-500">{formatDate(history[hover].date)}</div>
                        <div className="text-white font-semibold">{history[hover].rate}% &middot; {history[hover].mentioned}/{history[hover].checked}</div>
                    </div>
                )}
            </div>
        </div>
    )
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


function ResultsTab({ siteId, site, plan, onSiteUpdated }) {
    const [data, setData]           = useState(null)
    const [loading, setLoading]     = useState(true)
    const [checking, setChecking]   = useState(false)
    const [showAdd, setShowAdd]     = useState(false)
    const [newKws, setNewKws]       = useState('')
    const [addingKws, setAddingKws] = useState(false)
    const [selected, setSelected]   = useState(new Set())
    const [expanded, setExpanded]   = useState(null)
    const [filter, setFilter]       = useState('alle')
    const [showPlatformEdit, setShowPlatformEdit] = useState(false)
    const [editPlatforms, setEditPlatforms]       = useState([])
    const [savingPlatforms, setSavingPlatforms]   = useState(false)

    const platforms = site?.platforms?.length ? site.platforms : ['claude']
    const allowedPlatforms = PLAN_PLATFORMS[plan] || ['claude']

    const openPlatformEdit = () => {
        setEditPlatforms(platforms)
        setShowPlatformEdit(true)
    }

    const togglePlatformEdit = (id) => {
        if (!allowedPlatforms.includes(id)) return
        setEditPlatforms(prev =>
            prev.includes(id)
                ? prev.length > 1 ? prev.filter(p => p !== id) : prev
                : [...prev, id]
        )
    }

    const handleSavePlatforms = async () => {
        setSavingPlatforms(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/sites/${siteId}/platforms`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ platforms: editPlatforms }),
            })
            const d = await res.json()
            if (!res.ok) throw new Error(d.error)
            toast.success('Plattformen aktualisiert')
            setShowPlatformEdit(false)
            onSiteUpdated()
            await fetchResults()
        } catch (err) { toast.error(err.message || 'Fehler beim Speichern') }
        finally { setSavingPlatforms(false) }
    }

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

    const CHECK_ERROR_MESSAGES = {
        check_already_running: 'Es läuft bereits ein Check für diese Website — bitte warten.',
        monthly_limit_reached: 'Monatliches Limit an manuellen Checks erreicht.',
    }

    // Check läuft im Hintergrund weiter (siehe triggerCheck-Umbau) — hier nur pollen, bis checkStatus wieder 'idle'/'failed' ist.
    const pollUntilDone = async () => {
        const token = localStorage.getItem('token')
        for (let i = 0; i < 300; i++) { // Sicherheitslimit, deckt auch sehr große Expert-Sites locker ab
            await new Promise(r => setTimeout(r, 4000))
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/sites/${siteId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const d = await res.json()
            if (d.site?.checkStatus !== 'running') return d.site?.checkStatus
        }
        return 'timeout'
    }

    const handleCheck = async () => {
        setChecking(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/sites/${siteId}/check`, {
                method: 'POST', headers: { Authorization: `Bearer ${token}` },
            })
            const d = await res.json()
            if (!res.ok) throw new Error(CHECK_ERROR_MESSAGES[d.error] || d.error)

            const finalStatus = await pollUntilDone()
            if (finalStatus === 'failed') toast.error('Check fehlgeschlagen — bitte später erneut versuchen.')
            else if (finalStatus === 'timeout') toast.error('Check läuft ungewöhnlich lange — Ergebnis später prüfen.')
            else toast.success('Check abgeschlossen')

            await fetchResults()
            onSiteUpdated()
        } catch (err) { toast.error(err.message || 'Fehler') }
        finally { setChecking(false) }
    }

    // Falls beim Laden der Seite schon ein Check läuft (z.B. Reload während "Jetzt prüfen"), Polling fortsetzen.
    useEffect(() => {
        if (site?.checkStatus !== 'running' || checking) return
        setChecking(true)
        pollUntilDone()
            .then(finalStatus => {
                if (finalStatus === 'failed') toast.error('Check fehlgeschlagen — bitte später erneut versuchen.')
                return fetchResults()
            })
            .finally(() => setChecking(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [site?.checkStatus])

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
    const intents = data?.intents?.length ? data.intents : ['empfehlung']

    const filtered = results.filter(r => {
        if (filter === 'erwaehnt') return platforms.some(p => aggregateMention(r.checks, p, intents) === true)
        if (filter === 'nicht')    return platforms.every(p => aggregateMention(r.checks, p, intents) === false)
        if (filter === 'ungetestet') return platforms.every(p => aggregateMention(r.checks, p, intents) == null)
        return true
    })

    const totalChecks = platforms.length * intents.length * (site?.keywords?.length || 0)
    const estSeconds   = totalChecks * 6.4 // Ø-Dauer pro Check, live gemessen
    const estLabel      = estSeconds >= 90 ? `~${Math.round(estSeconds / 60)} Min.` : `~${Math.round(estSeconds)}s`
    const checkLabel  = checking
        ? `Läuft im Hintergrund (${totalChecks} Checks, ${estLabel})…`
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

            <MentionHistoryChart siteId={siteId} />
            <CompetitorsPanel siteId={siteId} />

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
                <button onClick={openPlatformEdit}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-300 bg-white/4 hover:bg-white/8 border border-white/8 transition-all">
                    <Settings2 className="w-3 h-3" />Bearbeiten
                </button>
                {intents.length > 1 && (
                    <span className="text-xs text-slate-600">· {intents.length} Prompt-Varianten pro Keyword ({intents.map(i => INTENT_META[i]?.label || i).join(', ')})</span>
                )}
            </div>

            {/* Plattformen bearbeiten */}
            <AnimatePresence>
                {showPlatformEdit && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        className="bg-[#0d1117] border border-violet-500/20 rounded-2xl p-5 mb-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-white">AI-Plattformen tracken</span>
                            <button onClick={() => setShowPlatformEdit(false)} className="text-slate-500 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="space-y-2 mb-4">
                            {ALL_PLATFORMS.map(id => {
                                const m = PLATFORM_META[id]
                                const active  = editPlatforms.includes(id)
                                const locked  = !allowedPlatforms.includes(id)
                                return (
                                    <button key={id} type="button" disabled={locked}
                                        onClick={() => togglePlatformEdit(id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                                            locked
                                                ? 'bg-white/[0.01] border-white/5 text-slate-600 cursor-not-allowed'
                                                : active
                                                    ? 'bg-violet-500/10 border-violet-500/30 text-white'
                                                    : 'bg-white/3 border-white/8 text-slate-500 hover:border-white/15'
                                        }`}>
                                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                                            active && !locked ? 'bg-violet-500 border-violet-500' : 'border-white/20'
                                        }`}>
                                            {active && !locked && <span className="text-white text-[10px] font-bold">✓</span>}
                                        </div>
                                        <span className="text-sm font-semibold flex-1">{m.label}</span>
                                        {locked && (
                                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                                                <Lock className="w-3 h-3" />Pro/Expert
                                            </span>
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                        <button onClick={handleSavePlatforms} disabled={savingPlatforms}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-sm font-semibold transition-all disabled:opacity-50">
                            {savingPlatforms ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                            Speichern
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

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
                                    const hasDetail = intents.length > 1 || platforms.some(p => intents.some(i => checks?.[p]?.[i]?.context || checks?.[p]?.[i]?.citations?.length))
                                    const latestDate = platforms
                                        .flatMap(p => intents.map(i => checks?.[p]?.[i]?.checkedAt))
                                        .filter(Boolean)
                                        .sort()
                                        .pop()

                                    return (
                                        <React.Fragment key={keyword}>
                                            <tr className={`border-b border-white/[0.04] last:border-0 transition-colors ${isSelected ? 'bg-red-500/5' : isExpanded ? 'bg-white/[0.02]' : 'hover:bg-white/[0.02]'}`}>
                                                <td className="px-5 py-3.5 cursor-pointer" onClick={() => toggleSelect(keyword)}>
                                                    <div className={`w-3.5 h-3.5 rounded border transition-all ${isSelected ? 'bg-red-500/40 border-red-500/60' : 'border-white/15'}`} />
                                                </td>
                                                <td className="px-5 py-3.5 cursor-pointer" onClick={() => hasDetail && setExpanded(prev => prev === keyword ? null : keyword)}>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-slate-200">{keyword}</span>
                                                        {hasDetail && (
                                                            <span className={`transition-colors ${isExpanded ? 'text-violet-400' : 'text-slate-700'}`}>
                                                                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                {platforms.map(p => (
                                                    <td key={p} className="px-4 py-3.5">
                                                        <MentionBadge mentioned={aggregateMention(checks, p, intents)} />
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
                                                        <div className="space-y-4">
                                                            {platforms.filter(p => intents.some(i => checks?.[p]?.[i])).map(p => {
                                                                const m = PLATFORM_META[p]
                                                                return (
                                                                    <div key={p}>
                                                                        <p className={`text-xs uppercase tracking-wider font-semibold mb-2 ${m.color}`}>{m.label}</p>
                                                                        <div className="space-y-2 pl-3 border-l-2 border-white/10">
                                                                            {intents.filter(i => checks?.[p]?.[i]).map(i => {
                                                                                const c = checks[p][i]
                                                                                return (
                                                                                    <div key={i} className="flex items-start gap-3">
                                                                                        {intents.length > 1 && (
                                                                                            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mt-1 w-20 shrink-0">
                                                                                                {INTENT_META[i]?.label || i}
                                                                                            </span>
                                                                                        )}
                                                                                        <div className="flex-1 min-w-0">
                                                                                            <MentionBadge mentioned={c.mentioned} />
                                                                                            <SentimentBadge sentiment={c.sentiment} />
                                                                                            {c.context && (
                                                                                                <p className="text-sm text-slate-300 italic leading-relaxed mt-1">&ldquo;{c.context}&rdquo;</p>
                                                                                            )}
                                                                                            <CitationList citations={c.citations} />
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </div>
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
    const [plan, setPlan]       = useState(null)
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

    const fetchPlan = useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/plan`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const d = await res.json()
            if (res.ok) setPlan(d.plan)
        } catch { /* Plan-Info ist nur für die Bearbeiten-UI relevant, kein harter Fehler */ }
    }, [])

    useEffect(() => {
        if (!localStorage.getItem('user')) { router.push('/login'); return }
        fetchSite()
        fetchPlan()
    }, [fetchSite, fetchPlan, router])

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

                <ResultsTab siteId={siteId} site={site} plan={plan} onSiteUpdated={fetchSite} />
            </div>
        </div>
    )
}