'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowLeft, TrendingUp, TrendingDown, Minus, Plus, Trash2,
    Loader2, RefreshCw, Globe, X, Lightbulb, Users, Link2,
    ExternalLink, ChevronUp, ChevronDown, GitCompare, Check, Lock, Download, Bell, Settings,
    FileText, Copy, Search, Award, AlertTriangle,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import Navbar from '../../../components/Navbar'

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Tiers pair color with a shape/icon signal (not color alone) so top-3 vs. the rest stays
// distinguishable for color-blind users — same tokens as the DE dashboard's globals.css.
function PositionCell({ position }) {
    if (position == null) return <span className="text-[var(--text-faint)] text-sm tabular-nums">—</span>
    const tier =
        position <= 10 ? { chip: 'bg-[var(--success-soft)] border-[var(--success-border)]', text: 'text-[var(--success)]', icon: position <= 3 ? Award : null } :
        position <= 30 ? { chip: 'bg-[var(--warning-soft)] border-[var(--warning-border)]',  text: 'text-[var(--warning)]', icon: null } :
                         { chip: 'bg-[var(--surface-08)] border-[var(--border-subtle)]',      text: 'text-[var(--text-muted)]',        icon: null }
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-sm font-bold tabular-nums ${tier.chip} ${tier.text}`}>
            {tier.icon && <tier.icon className="w-3 h-3" strokeWidth={2.5} />}
            #{position}
        </span>
    )
}

function ChangeCell({ change }) {
    if (change == null) return <span className="flex items-center justify-end text-[var(--text-faint)] text-xs">—</span>
    if (change > 0) return <span className="flex items-center justify-end gap-0.5 text-[var(--success)] text-xs font-semibold tabular-nums"><ChevronUp className="w-3 h-3 shrink-0" />+{change}</span>
    if (change < 0) return <span className="flex items-center justify-end gap-0.5 text-[var(--danger)] text-xs font-semibold tabular-nums"><ChevronDown className="w-3 h-3 shrink-0" />{change}</span>
    return <span className="flex items-center justify-end gap-0.5 text-[var(--text-faint)] text-xs tabular-nums"><Minus className="w-3 h-3 shrink-0" />0</span>
}

// Compact variant of VolumeBar (further below) — same "value as bar plus number" visual language,
// scaled to the CTR value range (max 28%, see CTR_RATES).
function CTRCell({ position }) {
    if (!position) return <span className="text-xs text-[var(--text-faint)]">—</span>
    const pct = getCTR(position)
    const barPct = Math.min((pct / CTR_RATES[0]) * 100, 100)
    return (
        <div className="flex items-center justify-end gap-2">
            <span className="text-xs font-semibold text-[var(--text-body)] tabular-nums">~{pct}%</span>
            <div className="w-10 h-1.5 bg-[var(--surface-08)] rounded-full overflow-hidden shrink-0">
                <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: `${barPct}%` }} />
            </div>
        </div>
    )
}

function VolumeBar({ value, max }) {
    if (!value || !max) return <span className="text-[var(--text-faint)] text-xs">—</span>
    const pct = Math.min((value / max) * 100, 100)
    return (
        <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-[var(--surface-08)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs text-[var(--text-muted)]">{value >= 1000 ? `${(value/1000).toFixed(1)}k` : value}</span>
        </div>
    )
}

function LoadingTab() {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-6 h-6 text-[var(--accent)] animate-spin" />
            <span className="text-sm text-[var(--text-faint)]">Loading data…</span>
        </div>
    )
}

function EmptyTab({ icon: Icon, text, onRetry, retrying = false, retryLabel = 'Reload' }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Icon className="w-8 h-8 text-[var(--text-faint)]" />
            <span className="text-sm text-[var(--text-faint)] text-center max-w-sm">{text}</span>
            {onRetry && (
                <button onClick={onRetry} disabled={retrying}
                    className="mt-1 flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-[var(--surface-08)] hover:bg-[var(--surface-10)] text-[var(--text-body)] border border-[var(--border-subtle)] transition-all disabled:opacity-50">
                    <RefreshCw className={`w-3.5 h-3.5 ${retrying ? 'animate-spin' : ''}`} />
                    {retrying ? 'Loading…' : retryLabel}
                </button>
            )}
        </div>
    )
}

// DataForSEO returns first_seen as "YYYY-MM-DD HH:MM:SS +00:00" (space instead of "T") — Chrome/V8
// parses that fine, but Safari's stricter Date parser returns "Invalid Date". Normalize to ISO 8601
// so it works cross-browser; falls back to "—" instead of showing Invalid Date.
function formatFirstSeen(value) {
    if (!value) return '—'
    const raw = typeof value === 'object' ? (value.date || value.value) : value
    const isoLike = typeof raw === 'string' ? raw.replace(' ', 'T') : raw
    const date = new Date(isoLike)
    return isNaN(date.getTime()) ? '—' : date.toLocaleDateString('en-US')
}

// Mirrors the known table shape instead of a bare spinner while rankings load.
function TableSkeleton({ rows = 6 }) {
    return (
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
            <div className="animate-pulse divide-y divide-[var(--border-subtle)]">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                        <div className="w-3.5 h-3.5 rounded bg-[var(--surface-08)] shrink-0" />
                        <div className="h-3 w-32 rounded bg-[var(--surface-08)]" />
                        <div className="h-3 w-10 rounded bg-[var(--surface-08)] ml-auto" />
                        <div className="h-3 w-14 rounded bg-[var(--surface-08)] hidden sm:block" />
                        <div className="h-3 w-24 rounded bg-[var(--surface-08)] hidden sm:block" />
                        <div className="h-3 w-16 rounded bg-[var(--surface-08)] hidden md:block" />
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── Sparkline Chart ──────────────────────────────────────────────────────────

function SparklineChart({ history }) {
    const valid = history.filter(h => h.position != null)
    if (valid.length < 2) return (
        <p className="text-xs text-[var(--text-faint)] py-2">Not enough data yet for a history. At least 2 checks required.</p>
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
                    fill="none" stroke="var(--accent)" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
            ))}

            {/* Dots + labels + dates */}
            {history.map((h, i) => {
                const x    = xOf(i)
                const y    = h.position != null ? yOf(h.position) : padT + chartH + 6
                const col  = colorOf(h.position)
                const date = new Date(h.checkedAt).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' })
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
    { id: 'alle',      label: 'All' },
    { id: 'top3',      label: 'Top 3' },
    { id: 'top10',     label: 'Top 10' },
    { id: 'gestiegen', label: '↑ Up' },
    { id: 'gefallen',  label: '↓ Down' },
]

const DIFFICULTY_COLORS = {
    low:    { text: 'text-[var(--success)]', bg: 'bg-[var(--success-soft)] border-[var(--success-border)]', label: 'Low' },
    medium: { text: 'text-[var(--warning)]', bg: 'bg-[var(--warning-soft)] border-[var(--warning-border)]', label: 'Medium' },
    high:   { text: 'text-[var(--danger)]',  bg: 'bg-[var(--danger-soft)] border-[var(--danger-border)]',   label: 'High' },
}

function DifficultyBadge({ difficulty }) {
    const key = (difficulty || '').toLowerCase()
    const cfg = DIFFICULTY_COLORS[key] || { text: 'text-[var(--text-muted)]', bg: '', label: difficulty || '—' }
    return <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(() => {})
}

// ─── Inline Insight Panel ─────────────────────────────────────────────────────

function InsightPanel({ insight, keyword, siteId, onRefreshed }) {
    const [copied,      setCopied]      = useState(null)
    const [refreshing,  setRefreshing]  = useState(false)

    const copy = (text, key) => {
        copyToClipboard(text)
        setCopied(key)
        setTimeout(() => setCopied(null), 1500)
    }

    const handleRefresh = async () => {
        setRefreshing(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/insights/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ keyword }),
            })
            const data = await res.json()
            if (res.status === 429 && data.error === 'monthly_limit_reached') {
                toast.error(`Monthly limit reached (${data.limit} refreshes). Upgrade for more.`)
                return
            }
            if (!res.ok) { toast.error(data.error || 'Error'); return }
            onRefreshed()
        } catch { toast.error('Error regenerating') }
        finally { setRefreshing(false) }
    }

    const isPending = !insight || insight.status === 'pending'
    const isError   = insight?.status === 'error'

    const refreshBtn = (
        <button onClick={handleRefresh} disabled={refreshing}
            className="flex items-center gap-1 text-xs text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors disabled:opacity-40">
            <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Running…' : 'Regenerate'}
        </button>
    )

    if (isPending) return (
        <div className="flex items-center gap-2 py-2 text-sm text-[var(--text-faint)]">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--accent)]" />
            Content plan is being generated in the background…
        </div>
    )

    if (isError) return (
        <div className="flex items-center gap-3 py-2">
            <span className="text-sm text-[var(--text-faint)]">Generation failed.</span>
            {refreshBtn}
        </div>
    )

    const { content, backlinks } = insight

    return (
        <div className="space-y-5">
            {/* Content Plan */}
            {content && (
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider flex items-center gap-1.5">
                            <FileText className="w-3 h-3" />Content Plan
                        </span>
                        {refreshBtn}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                        {/* Title */}
                        <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl p-3">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-semibold text-[var(--text-faint)] uppercase tracking-wider">H1 Title</span>
                                <button onClick={() => copy(content.title, 'title')} className="flex items-center gap-1 text-[10px] text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors">
                                    {copied === 'title' ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                                    {copied === 'title' ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                            <p className="text-sm text-[var(--text-white)] font-medium leading-snug">{content.title}</p>
                        </div>

                        {/* Meta */}
                        <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl p-3">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-semibold text-[var(--text-faint)] uppercase tracking-wider">Meta Description</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-[var(--text-faint)]">{content.metaDescription?.length || 0}/155</span>
                                    <button onClick={() => copy(content.metaDescription, 'meta')} className="flex items-center gap-1 text-[10px] text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors">
                                        {copied === 'meta' ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                                        {copied === 'meta' ? 'Copied' : 'Copy'}
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs text-[var(--text-muted)] leading-relaxed">{content.metaDescription}</p>
                        </div>

                        {/* Slug */}
                        <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl p-3">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-semibold text-[var(--text-faint)] uppercase tracking-wider">URL Slug</span>
                                <button onClick={() => copy(content.slug, 'slug')} className="flex items-center gap-1 text-[10px] text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors">
                                    {copied === 'slug' ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                                    {copied === 'slug' ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                            <p className="text-xs text-[var(--accent)] font-mono">/{content.slug}</p>
                        </div>

                        {/* Intro */}
                        {content.intro && (
                            <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl p-3">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[10px] font-semibold text-[var(--text-faint)] uppercase tracking-wider">Intro</span>
                                    <button onClick={() => copy(content.intro, 'intro')} className="flex items-center gap-1 text-[10px] text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors">
                                        {copied === 'intro' ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                                        {copied === 'intro' ? 'Copied' : 'Copy'}
                                    </button>
                                </div>
                                <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3">{content.intro}</p>
                            </div>
                        )}
                    </div>

                    {/* Outline */}
                    {content.outline?.length > 0 && (
                        <div className="mt-2.5 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl p-3">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-semibold text-[var(--text-faint)] uppercase tracking-wider">Article Outline</span>
                                <button onClick={() => copy(content.outline.map((o, i) => `${i+1}. ${o.h2}\n   ${o.description}`).join('\n'), 'outline')}
                                    className="flex items-center gap-1 text-[10px] text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors">
                                    {copied === 'outline' ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                                    {copied === 'outline' ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                            <div className="space-y-1.5">
                                {content.outline.map((item, i) => (
                                    <div key={i} className="flex gap-2">
                                        <span className="text-[10px] font-bold text-[var(--accent)] shrink-0 mt-0.5">H2</span>
                                        <div>
                                            <p className="text-xs font-semibold text-[var(--text-body)]">{item.h2}</p>
                                            <p className="text-[11px] text-[var(--text-faint)]">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Key Points */}
                    {content.keyPoints?.length > 0 && (
                        <div className="mt-2.5 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl p-3">
                            <span className="text-[10px] font-semibold text-[var(--text-faint)] uppercase tracking-wider block mb-2">Key Points</span>
                            <div className="grid sm:grid-cols-2 gap-1">
                                {content.keyPoints.map((p, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <Check className="w-3 h-3 text-[var(--accent)] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span className="text-xs text-[var(--text-muted)]">{p}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Backlinks */}
            {backlinks && (
                <div>
                    <span className="text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider flex items-center gap-1.5 mb-3">
                        <Link2 className="w-3 h-3" />Backlink Strategy
                    </span>

                    {backlinks.strategies?.length > 0 && (
                        <div className="space-y-1.5 mb-3">
                            {backlinks.strategies.map((s, i) => (
                                <div key={i} className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 flex gap-3 items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-xs font-semibold text-[var(--text-white)]">{s.type}</span>
                                            <DifficultyBadge difficulty={s.difficulty} />
                                        </div>
                                        <p className="text-[11px] text-[var(--text-faint)]">{s.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {backlinks.targetSites?.length > 0 && (
                        <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl overflow-hidden mb-2.5">
                            <div className="px-3 py-2 border-b border-[var(--border-subtle)]">
                                <span className="text-[10px] font-semibold text-[var(--text-faint)] uppercase tracking-wider">Target Websites</span>
                            </div>
                            {backlinks.targetSites.map((ts, i) => (
                                <div key={i} className={`px-3 py-2.5 ${i < backlinks.targetSites.length - 1 ? 'border-b border-[var(--border-subtle)]' : ''}`}>
                                    <span className="text-xs font-semibold text-[var(--text-body)]">{ts.type}</span>
                                    {ts.example && <span className="text-[11px] text-[var(--text-faint)] ml-2">{ts.example}</span>}
                                    <p className="text-[11px] text-[var(--text-faint)] mt-0.5">{ts.why}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {backlinks.linkbaitIdeas?.length > 0 && (
                        <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl p-3">
                            <span className="text-[10px] font-semibold text-[var(--text-faint)] uppercase tracking-wider block mb-2">Linkbait Ideas</span>
                            <div className="space-y-1.5">
                                {backlinks.linkbaitIdeas.map((idea, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <span className="text-[10px] font-bold text-[var(--accent)] shrink-0 w-4 mt-0.5">{i + 1}.</span>
                                        <span className="text-xs text-[var(--text-muted)]">{idea}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}


function RankingHistoryChart({ siteId, refreshKey }) {
    const [history, setHistory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [hover, setHover]     = useState(null)

    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem('token')
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/history`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(d => setHistory(d.history || []))
            .catch(() => setHistory([]))
            .finally(() => setLoading(false))
    }, [siteId, refreshKey])

    if (loading || !history?.length) return null

    const W = 640, H = 180, padL = 34, padR = 12, padT = 12, padB = 24
    const plotW = W - padL - padR, plotH = H - padT - padB
    const n = history.length
    const gradientId = `pos-history-fill-${siteId}`

    const positions = history.map(h => h.avgPosition)
    const rawMin = Math.min(...positions)
    const rawMax = Math.max(...positions)
    const span   = Math.max(rawMax - rawMin, 10)
    const minPos = Math.max(1, Math.floor(rawMin - span * 0.15))
    const maxPos = Math.ceil(rawMax + span * 0.15)
    const range  = maxPos - minPos

    const xAt = (i) => n <= 1 ? padL : padL + (plotW * i) / (n - 1)
    // Lower position = better -> higher up in the chart
    const yAt = (pos) => padT + plotH * (pos - minPos) / range

    const points = history.map((h, i) => `${xAt(i)},${yAt(h.avgPosition)}`).join(' ')
    const areaPoints = `${xAt(0)},${padT + plotH} ${points} ${xAt(n - 1)},${padT + plotH}`
    const formatDate = (iso) => new Date(iso).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' })
    const yTicks = [minPos, Math.round((minPos + maxPos) / 2), maxPos]

    // Positive = improved (lower position) — same convention as ChangeCell/change in the
    // keyword table (previous - current), applied here across the full history span.
    const trendDelta = n > 1 ? Math.round((positions[0] - positions[n - 1]) * 10) / 10 : null

    return (
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                    <h3 className="text-sm font-semibold text-[var(--text-white)]">Avg. Position History</h3>
                    {trendDelta != null && trendDelta !== 0 && (
                        <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-xs font-semibold tabular-nums ${
                            trendDelta > 0 ? 'bg-[var(--success-soft)] text-[var(--success)]' : 'bg-[var(--danger-soft)] text-[var(--danger)]'
                        }`}>
                            {trendDelta > 0 ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            {Math.abs(trendDelta)}
                        </span>
                    )}
                </div>
                <span className="text-xs text-[var(--text-faint)]">{n} check{n !== 1 ? 's' : ''} recorded</span>
            </div>

            <div className="relative">
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {yTicks.map(v => (
                        <g key={v}>
                            <line x1={padL} x2={W - padR} y1={yAt(v)} y2={yAt(v)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                            <text x={padL - 8} y={yAt(v) + 3} textAnchor="end" fontSize="9" fill="var(--text-faint)">#{v}</text>
                        </g>
                    ))}

                    {history.map((h, i) => {
                        if (n > 1 && i !== 0 && i !== n - 1 && i % Math.ceil(n / 6) !== 0) return null
                        return (
                            <text key={i} x={xAt(i)} y={H - 6} textAnchor="middle" fontSize="9" fill="var(--text-faint)">
                                {formatDate(h.date)}
                            </text>
                        )
                    })}

                    {n > 1 && <polygon points={areaPoints} fill={`url(#${gradientId})`} stroke="none" />}

                    {hover != null && (
                        <line x1={xAt(hover)} x2={xAt(hover)} y1={padT} y2={padT + plotH}
                            stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 3" />
                    )}

                    {n > 1 && (
                        <polyline points={points} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    )}
                    {history.map((h, i) => {
                        const isLast = i === n - 1
                        const isHovered = hover === i
                        return (
                            <g key={i}>
                                {/* Visible point — the latest check is emphasized by default, not just on hover */}
                                <circle cx={xAt(i)} cy={yAt(h.avgPosition)} r={isHovered ? 6 : isLast ? 5 : 3.5}
                                    fill="var(--accent)" stroke="var(--bg-surface)" strokeWidth="2" />
                                {/* Invisible larger hit target — a 3.5px radius is hard to hit with a
                                    mouse and nearly impossible on touch */}
                                <circle cx={xAt(i)} cy={yAt(h.avgPosition)} r="14" fill="transparent"
                                    style={{ cursor: 'pointer' }}
                                    onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                                    onTouchStart={() => setHover(i)} />
                            </g>
                        )
                    })}
                </svg>

                {hover != null && (
                    <div className="absolute px-2.5 py-1.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-xs pointer-events-none shadow-lg whitespace-nowrap z-10"
                        style={{
                            left: `${Math.min(Math.max((xAt(hover) / W) * 100, 12), 88)}%`,
                            top: `${(yAt(history[hover].avgPosition) / H) * 100}%`,
                            transform: 'translate(-50%, -130%)',
                        }}>
                        <div className="text-[var(--text-faint)]">{formatDate(history[hover].date)}</div>
                        <div className="text-[var(--text-white)] font-semibold tabular-nums">Avg. #{history[hover].avgPosition} &middot; {history[hover].keywordsRanked} keywords</div>
                    </div>
                )}
            </div>
        </div>
    )
}

function RankingsTab({ siteId, site, onSiteUpdated, onStatsChange }) {
    const [rankings, setRankings]       = useState([])
    const [insights, setInsights]       = useState({})
    const [loading, setLoading]         = useState(true)
    const [checking, setChecking]       = useState(false)
    const [showAdd, setShowAdd]         = useState(false)
    const [newKeywords, setNewKeywords] = useState('')
    const [addingKws, setAddingKws]     = useState(false)
    const [selected, setSelected]       = useState(new Set())
    const [expandedKw, setExpandedKw]   = useState(null)
    const [filter, setFilter]           = useState('alle')
    const [chartKey, setChartKey]       = useState(0)
    const [manualChecksUsed, setManualChecksUsed]   = useState(null)
    const [manualChecksLimit, setManualChecksLimit] = useState(null)

    const fetchInsights = useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/insights`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json()
            if (res.ok) setInsights(data.insightsMap || {})
        } catch { /* silent */ }
    }, [siteId])

    const fetchRankings = useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/rankings`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            setRankings(data.rankings || [])
            setManualChecksUsed(data.manualChecksUsed ?? null)
            setManualChecksLimit(data.manualChecksLimit ?? null)
            onStatsChange?.({
                rankings: data.rankings || [],
                manualChecksUsed: data.manualChecksUsed ?? null,
                manualChecksLimit: data.manualChecksLimit ?? null,
            })
        } catch { toast.error('Rankings could not be loaded — please reload the page.') }
        finally { setLoading(false) }
    }, [siteId, onStatsChange])

    useEffect(() => {
        fetchRankings()
        fetchInsights()
    }, [fetchRankings, fetchInsights])

    // Poll for pending insights
    useEffect(() => {
        const hasPending = Object.values(insights).some(i => i.status === 'pending')
        if (!hasPending) return
        const timer = setInterval(fetchInsights, 8000)
        return () => clearInterval(timer)
    }, [insights, fetchInsights])

    const handleCheck = async () => {
        setChecking(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/check`, {
                method: 'POST', headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            toast.success('Check complete')
            await fetchRankings()
            setChartKey(k => k + 1)
        } catch (err) { toast.error(err.message || 'Check could not be started — please try again.') }
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
            toast.success(`${data.added} keyword${data.added !== 1 ? 's' : ''} added — insights are being generated`)
            setNewKeywords(''); setShowAdd(false)
            onSiteUpdated()
            await fetchRankings()
            setChartKey(k => k + 1)
            setTimeout(fetchInsights, 3000)
        } catch (err) { toast.error(err.message || 'Error') }
        finally { setAddingKws(false) }
    }

    // No native confirm() — remove optimistically right away and only fire the DELETE request
    // after the undo window, so "Undo" doesn't lose any keyword history.
    const handleRemoveSelected = () => {
        if (!selected.size) return
        const toRemove = [...selected]
        const removedRankings = rankings.filter(r => toRemove.includes(r.keyword))

        setRankings(prev => prev.filter(r => !toRemove.includes(r.keyword)))
        setSelected(new Set())

        let undone = false
        const timer = setTimeout(async () => {
            if (undone) return
            try {
                const token = localStorage.getItem('token')
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/keywords`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                    body: JSON.stringify({ keywords: toRemove }),
                })
                if (!res.ok) throw new Error()
                onSiteUpdated()
                setChartKey(k => k + 1)
            } catch {
                toast.error('Removing failed')
                setRankings(prev => [...prev, ...removedRankings])
            }
        }, 5000)

        toast((t) => (
            <div className="flex items-center gap-3">
                <span>{toRemove.length} keyword{toRemove.length > 1 ? 's' : ''} removed</span>
                <button
                    onClick={() => {
                        undone = true
                        clearTimeout(timer)
                        setRankings(prev => [...prev, ...removedRankings])
                        toast.dismiss(t.id)
                    }}
                    className="font-semibold text-[var(--accent)] hover:underline underline-offset-2 whitespace-nowrap"
                >
                    Undo
                </button>
            </div>
        ), { duration: 5000 })
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

    const allVisibleSelected  = filteredRankings.length > 0 && filteredRankings.every(r => selected.has(r.keyword))
    const someVisibleSelected = !allVisibleSelected && filteredRankings.some(r => selected.has(r.keyword))
    const toggleSelectAll = () => setSelected(allVisibleSelected ? new Set() : new Set(filteredRankings.map(r => r.keyword)))

    const exportCSV = () => {
        const headers = ['Keyword', 'Position', 'Change', 'CTR (est. %)', 'URL', 'Date']
        const rows = rankings.map(({ keyword, current, change }) => [
            keyword,
            current?.position ?? '',
            change ?? '',
            current?.position ? getCTR(current.position) + '%' : '',
            current?.url ?? '',
            current?.checkedAt ? new Date(current.checkedAt).toLocaleDateString('en-US') : '',
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
            <RankingHistoryChart siteId={siteId} refreshKey={chartKey} />

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <div className="text-sm text-[var(--text-faint)]">
                    {site?.lastChecked
                        ? `Last checked: ${new Date(site.lastChecked).toLocaleString('en-US', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}`
                        : 'Not checked yet'}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    {selected.size > 0 && (
                        <button onClick={handleRemoveSelected}
                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all">
                            <Trash2 className="w-3.5 h-3.5" />Remove {selected.size}
                        </button>
                    )}
                    {rankings.length > 0 && (
                        <button onClick={exportCSV}
                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-[var(--surface-08)] hover:bg-[var(--surface-10)] text-[var(--text-body)] border border-[var(--border-subtle)] transition-all">
                            <Download className="w-3.5 h-3.5" />CSV
                        </button>
                    )}
                    <button onClick={() => setShowAdd(v => !v)}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-[var(--surface-08)] hover:bg-[var(--surface-10)] text-[var(--text-body)] border border-[var(--border-subtle)] transition-all">
                        <Plus className="w-3.5 h-3.5" />Keywords
                    </button>
                    <button onClick={handleCheck} disabled={checking}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] transition-all disabled:opacity-50">
                        {checking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                        {checking ? 'Checking…' : 'Check now'}
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
                                    ? 'bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)]'
                                    : 'bg-[var(--surface-06)] border border-[var(--border-subtle)] text-[var(--text-faint)] hover:text-[var(--text-body)] hover:bg-[var(--surface-10)]'
                            }`}>
                            {f.label}
                        </button>
                    ))}
                    <span className="text-xs text-[var(--text-faint)] ml-1">{filteredRankings.length} keywords</span>
                </div>
            )}

            {/* Add Keywords */}
            <AnimatePresence>
                {showAdd && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        className="bg-[var(--bg-surface)] border border-[var(--accent-border)] rounded-2xl p-5 mb-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-[var(--text-white)]">Add keywords</span>
                            <button onClick={() => setShowAdd(false)} className="text-[var(--text-faint)] hover:text-[var(--text-white)] transition-colors"><X className="w-4 h-4" /></button>
                        </div>
                        <form onSubmit={handleAddKeywords} className="flex gap-3">
                            <textarea value={newKeywords} onChange={e => setNewKeywords(e.target.value)}
                                placeholder={"keyword one\nkeyword two"} rows={3}
                                className="flex-1 bg-[var(--surface-06)] border border-[var(--border-subtle)] focus:border-[var(--accent-border)] rounded-xl px-4 py-3 text-[var(--text-white)] placeholder:text-[var(--text-faint)] outline-none text-sm resize-none font-mono" />
                            <button type="submit" disabled={addingKws}
                                className="self-end flex items-center gap-2 px-4 py-2 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all disabled:opacity-50">
                                {addingKws ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                                Add
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Table */}
            {loading ? <TableSkeleton /> : rankings.length === 0 ? (
                <EmptyTab icon={TrendingUp} text="No keywords yet. Add keywords and start a check." />
            ) : filteredRankings.length === 0 ? (
                <EmptyTab icon={TrendingUp} text={`No keywords for filter "${FILTERS.find(f => f.id === filter)?.label}".`} />
            ) : (
                <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[var(--border-subtle)]">
                                    <th className="w-8 px-5 py-3">
                                        <input type="checkbox" checked={allVisibleSelected}
                                            ref={el => { if (el) el.indeterminate = someVisibleSelected }}
                                            onChange={toggleSelectAll}
                                            aria-label="Select all visible keywords"
                                            className="w-3.5 h-3.5 rounded border-[var(--border-strong)] accent-red-500 cursor-pointer" />
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Keyword</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Position</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Change</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden sm:table-cell">CTR (est.)</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden sm:table-cell">URL</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden md:table-cell">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRankings.map(({ keyword, current, change, history }) => {
                                    const isExpanded  = expandedKw === keyword
                                    const isSelected  = selected.has(keyword)
                                    const hasHistory  = history?.length >= 2
                                    const insight     = insights[keyword]
                                    const insightDone = insight?.status === 'done'
                                    const insightPending = insight?.status === 'pending' || (!insight && Object.keys(insights).length > 0)
                                    return (
                                        <React.Fragment key={keyword}>
                                            <tr onClick={() => toggleExpand(keyword)}
                                                className={`border-b border-[var(--border-subtle)] cursor-pointer transition-colors ${isSelected ? 'bg-red-500/5' : isExpanded ? 'bg-[var(--surface-06)]' : 'hover:bg-[var(--surface-08)]'} ${!isExpanded ? 'last:border-0' : ''}`}>
                                                <td className="px-5 py-3.5" onClick={e => e.stopPropagation()}>
                                                    <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(keyword)}
                                                        aria-label={`Select ${keyword}`}
                                                        className="w-3.5 h-3.5 rounded border-[var(--border-strong)] accent-red-500 cursor-pointer" />
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-[var(--text-body)]">{keyword}</span>
                                                        {insightDone && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 shrink-0" role="img" aria-label="Content plan available" title="Content plan available" />}
                                                        {insightPending && <Loader2 className="w-2.5 h-2.5 text-[var(--text-faint)] animate-spin shrink-0" aria-label="Content plan generating" />}
                                                        <button type="button" onClick={e => { e.stopPropagation(); toggleExpand(keyword) }}
                                                            aria-expanded={isExpanded} aria-controls={`kw-detail-${keyword}`}
                                                            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                                                            className={`transition-colors ${isExpanded ? 'text-[var(--accent)]' : 'text-[var(--text-faint)] hover:text-[var(--text-body)]'}`}>
                                                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3.5 text-right"><PositionCell position={current?.position} /></td>
                                                <td className="px-5 py-3.5 text-right"><ChangeCell change={change} /></td>
                                                <td className="px-5 py-3.5 hidden sm:table-cell text-right">
                                                    <CTRCell position={current?.position} />
                                                </td>
                                                <td className="px-5 py-3.5 hidden sm:table-cell">
                                                    {current?.url && /^https?:\/\//.test(current.url) ? (
                                                        <a href={current.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                                                            className="text-xs text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors truncate max-w-[180px] block">
                                                            {current.url.replace(/^https?:\/\//, '')}
                                                        </a>
                                                    ) : <span className="text-xs text-[var(--text-faint)]">—</span>}
                                                </td>
                                                <td className="px-5 py-3.5 hidden md:table-cell text-right">
                                                    {current?.checkedAt
                                                        ? <span className="text-xs text-[var(--text-faint)] tabular-nums">{new Date(current.checkedAt).toLocaleDateString('en-US')}</span>
                                                        : <span className="text-xs text-[var(--text-faint)]">—</span>}
                                                </td>
                                            </tr>
                                            {isExpanded && (
                                                <tr className="border-b border-[var(--border-subtle)] last:border-0">
                                                    <td id={`kw-detail-${keyword}`} colSpan={7} className="px-5 py-5 bg-[var(--surface-06)]">
                                                        {hasHistory && (
                                                            <div className="mb-5">
                                                                <p className="text-xs text-[var(--text-faint)] mb-3 uppercase tracking-wider font-semibold">History — {keyword}</p>
                                                                <SparklineChart history={history} />
                                                            </div>
                                                        )}
                                                        <InsightPanel
                                                            insight={insight}
                                                            keyword={keyword}
                                                            siteId={siteId}
                                                            onRefreshed={() => {
                                                                setInsights(prev => ({ ...prev, [keyword]: { status: 'pending' } }))
                                                                setTimeout(fetchInsights, 3000)
                                                            }}
                                                        />
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

// ─── Keyword Ideas Tab ────────────────────────────────────────────────────────

const DIFF_FILTERS = [
    { id: 'ALL',    label: 'All' },
    { id: 'LOW',    label: 'Low' },
    { id: 'MEDIUM', label: 'Medium' },
    { id: 'HIGH',   label: 'High' },
]

function KeywordIdeasTab({ siteId, plan }) {
    const [data, setData]             = useState(null)
    const [loading, setLoading]       = useState(false)
    const [loaded, setLoaded]         = useState(false)
    const [adding, setAdding]         = useState(new Set())
    const [added, setAdded]           = useState(new Set())
    const [diffFilter, setDiffFilter] = useState('ALL')
    const [limitReached, setLimitReached] = useState(null) // { used, limit }

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
            toast.success(`"${keyword}" is now being tracked`)
        } catch (err) { toast.error(err.message || 'Error') }
        finally { setAdding(prev => { const n = new Set(prev); n.delete(keyword); return n }) }
    }

    const fetch_ = async () => {
        setLoading(true)
        setLimitReached(null)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/keyword-ideas`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const d = await res.json()
            if (res.status === 429 && d.error === 'monthly_limit_reached') { setLimitReached({ used: d.used, limit: d.limit }); setLoaded(true); return }
            if (!res.ok) throw new Error(d.error)
            setData(d); setLoaded(true)
        } catch (err) { toast.error(err.message || 'Error') }
        finally { setLoading(false) }
    }

    const maxVolume = data ? Math.max(
        ...[...( data.volumes || []), ...(data.ideas || [])].map(i => i.searchVolume || 0)
    ) : 0

    const filterByDiff = (items) => diffFilter === 'ALL' ? items : (items || []).filter(i => (i.competition || '').toUpperCase() === diffFilter)
    const filteredVolumes = filterByDiff(data?.volumes)
    const filteredIdeas   = filterByDiff(data?.ideas)

    if (limitReached) return (
        <div className="flex flex-col items-center justify-center py-12 gap-4 bg-[var(--bg-surface)] border border-amber-500/15 rounded-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-center">
                <p className="text-sm font-semibold text-[var(--text-white)] mb-1">Monthly limit reached</p>
                <p className="text-xs text-[var(--text-faint)]">
                    You've used {limitReached.limit} of {limitReached.limit} keyword idea lookups this month.<br />
                    {plan === 'einsteiger' || plan === 'pro'
                        ? 'Upgrade for more lookups per month.'
                        : 'The limit resets on the 1st of next month.'}
                </p>
            </div>
            {(plan === 'einsteiger' || plan === 'pro') && (
                <Link href="/en/seo/pricing"
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all">
                    Upgrade plan →
                </Link>
            )}
        </div>
    )

    if (!loaded) return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Lightbulb className="w-10 h-10 text-[var(--accent)]" />
            <p className="text-[var(--text-faint)] text-sm text-center">Load search volume for your keywords + 20 new keyword ideas</p>
            <button onClick={fetch_} disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
                {loading ? 'Loading…' : 'Load keyword ideas'}
            </button>
        </div>
    )

    return (
        <div className="space-y-6">
            {/* Difficulty filter */}
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-[var(--text-faint)] font-medium">Competition:</span>
                {DIFF_FILTERS.map(f => (
                    <button key={f.id} onClick={() => setDiffFilter(f.id)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
                            diffFilter === f.id
                                ? f.id === 'LOW'    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                                : f.id === 'MEDIUM' ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                                : f.id === 'HIGH'   ? 'bg-red-500/15 border-red-500/30 text-red-400'
                                : 'bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--accent)]'
                                : 'bg-[var(--surface-06)] border-[var(--border-subtle)] text-[var(--text-faint)] hover:text-[var(--text-body)] hover:bg-[var(--surface-10)]'
                        }`}>
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Existing keywords with volumes */}
            {data.volumes?.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                        Your Keywords — Search Volume
                        {diffFilter !== 'ALL' && filteredVolumes?.length !== data.volumes.length && (
                            <span className="ml-2 text-[var(--text-faint)] font-normal normal-case">{filteredVolumes?.length} of {data.volumes.length}</span>
                        )}
                    </h3>
                    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[var(--border-subtle)]">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Keyword</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Volume/Month</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden sm:table-cell">Competition</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden sm:table-cell">CPC</th>
                                    <th className="px-5 py-3" />
                                </tr>
                            </thead>
                            <tbody>
                                {(filteredVolumes || []).length === 0 ? (
                                    <tr><td colSpan={5} className="px-5 py-8 text-center text-sm text-[var(--text-faint)]">No keywords with this competition level.</td></tr>
                                ) : (filteredVolumes || []).map(item => (
                                    <tr key={item.keyword} className="border-b border-[var(--border-subtle)] last:border-0">
                                        <td className="px-5 py-3"><span className="text-sm text-[var(--text-body)]">{item.keyword}</span></td>
                                        <td className="px-5 py-3"><VolumeBar value={item.searchVolume} max={maxVolume} /></td>
                                        <td className="px-5 py-3 hidden sm:table-cell">
                                            <DifficultyBadge difficulty={(item.competition || 'low').toLowerCase()} />
                                        </td>
                                        <td className="px-5 py-3 hidden sm:table-cell">
                                            <span className="text-xs text-[var(--text-faint)]">{item.cpc ? `€${item.cpc.toFixed(2)}` : '—'}</span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <button onClick={() => handleAddKeyword(item.keyword)} disabled={adding.has(item.keyword) || added.has(item.keyword)}
                                                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                                                    added.has(item.keyword)
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default'
                                                        : 'bg-[var(--surface-08)] hover:bg-[var(--accent-soft)] text-[var(--text-muted)] hover:text-[var(--accent)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)]'
                                                }`}>
                                                {adding.has(item.keyword) ? <Loader2 className="w-3 h-3 animate-spin" /> : added.has(item.keyword) ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                                {added.has(item.keyword) ? 'Tracked' : 'Track'}
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
                    <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                        New Keyword Ideas
                        {diffFilter !== 'ALL' && filteredIdeas?.length !== data.ideas.length && (
                            <span className="ml-2 text-[var(--text-faint)] font-normal normal-case">{filteredIdeas?.length} of {data.ideas.length}</span>
                        )}
                    </h3>
                    <div className="bg-[var(--bg-surface)] border border-[var(--accent-border)] rounded-2xl overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[var(--border-subtle)]">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Keyword</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Volume/Month</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden sm:table-cell">Competition</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden sm:table-cell">CPC</th>
                                    <th className="px-5 py-3" />
                                </tr>
                            </thead>
                            <tbody>
                                {(filteredIdeas || []).length === 0 ? (
                                    <tr><td colSpan={5} className="px-5 py-8 text-center text-sm text-[var(--text-faint)]">No ideas with this competition level.</td></tr>
                                ) : (filteredIdeas || []).map(item => (
                                    <tr key={item.keyword} className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--accent-soft)] transition-colors">
                                        <td className="px-5 py-3">
                                            <span className="text-sm text-[var(--accent)] font-medium">{item.keyword}</span>
                                        </td>
                                        <td className="px-5 py-3"><VolumeBar value={item.searchVolume} max={maxVolume} /></td>
                                        <td className="px-5 py-3 hidden sm:table-cell">
                                            <DifficultyBadge difficulty={(item.competition || 'low').toLowerCase()} />
                                        </td>
                                        <td className="px-5 py-3 hidden sm:table-cell">
                                            <span className="text-xs text-[var(--text-faint)]">{item.cpc ? `€${item.cpc.toFixed(2)}` : '—'}</span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <button onClick={() => handleAddKeyword(item.keyword)} disabled={adding.has(item.keyword) || added.has(item.keyword)}
                                                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                                                    added.has(item.keyword)
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default'
                                                        : 'bg-[var(--accent-soft)] hover:bg-[var(--accent-soft-strong)] text-[var(--accent)] border border-[var(--accent-border)]'
                                                }`}>
                                                {adding.has(item.keyword) ? <Loader2 className="w-3 h-3 animate-spin" /> : added.has(item.keyword) ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                                {added.has(item.keyword) ? 'Tracked' : 'Track'}
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
                className="flex items-center gap-2 text-xs text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors">
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                Reload
            </button>
        </div>
    )
}

// ─── Competitors Tab ─────────────────────────────────────────────────────────

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
        } catch (err) { toast.error(err.message || 'Error') }
        finally { setLoading(false) }
    }

    if (!loaded) return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Users className="w-10 h-10 text-[var(--accent)]" />
            <p className="text-[var(--text-faint)] text-sm text-center">Find your domain's 10 biggest competitors<br/>based on shared keywords</p>
            <button onClick={fetch_} disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Users className="w-4 h-4" />}
                {loading ? 'Loading…' : 'Analyze competitors'}
            </button>
        </div>
    )

    if (!competitors.length) return <EmptyTab icon={Users} text="No competitors found." />

    return (
        <div>
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[var(--border-subtle)]">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">#</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Domain</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Shared KW</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden sm:table-cell">Top 10</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden sm:table-cell">Top 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            {competitors.map((c, i) => (
                                <tr key={c.domain} className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--surface-08)] transition-colors">
                                    <td className="px-5 py-3.5">
                                        <span className="text-sm text-[var(--text-faint)]">{i + 1}</span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <a href={`https://${c.domain}`} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-sm text-[var(--text-body)] hover:text-[var(--accent)] transition-colors">
                                            {c.domain}
                                            <ExternalLink className="w-3 h-3 text-[var(--text-faint)]" />
                                        </a>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className="text-sm font-bold text-[var(--text-white)]">{c.intersections ?? '—'}</span>
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
                className="mt-4 flex items-center gap-2 text-xs text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors">
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                Reload
            </button>
        </div>
    )
}

// ─── Backlinks Tab ────────────────────────────────────────────────────────────

function DonutChart({ segments, size = 128, strokeWidth = 20 }) {
    const total = segments.reduce((sum, s) => sum + s.value, 0)
    if (!total) return null

    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius

    let cumulative = 0
    const arcs = segments.map(s => {
        const dash = (s.value / total) * circumference
        const arc = { ...s, dash, offset: cumulative }
        cumulative += dash
        return arc
    })

    return (
        <div className="flex items-center gap-5 flex-wrap">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 shrink-0">
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--surface-08)" strokeWidth={strokeWidth} />
                {arcs.map((a, i) => (
                    <motion.circle key={a.label}
                        cx={size / 2} cy={size / 2} r={radius} fill="none"
                        stroke={a.color} strokeWidth={strokeWidth}
                        strokeDasharray={`${a.dash} ${circumference - a.dash}`}
                        strokeDashoffset={-a.offset}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                        style={{ transformOrigin: '50% 50%' }}
                    />
                ))}
            </svg>
            <div className="space-y-2 min-w-[140px]">
                {arcs.map(a => (
                    <div key={a.label} className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: a.color }} />
                        <span className="text-xs text-[var(--text-muted)] truncate">{a.label}</span>
                        <span className="text-xs text-[var(--text-white)] font-semibold tabular-nums ml-auto pl-3">{a.value} · {Math.round((a.value / total) * 100)}%</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function BacklinksTab({ siteId, plan }) {
    const [summary, setSummary]     = useState(null)
    const [checkedAt, setCheckedAt] = useState(null)
    const [loading, setLoading]     = useState(false)
    const [loaded, setLoaded]       = useState(false)

    const [refDomains, setRefDomains]           = useState(null)
    const [refCheckedAt, setRefCheckedAt]       = useState(null)
    const [refLoading, setRefLoading]           = useState(false)
    const [refLoaded, setRefLoaded]             = useState(false)

    const [gap, setGap]                         = useState(null)
    const [gapLoading, setGapLoading]           = useState(false)
    const [gapLoaded, setGapLoaded]             = useState(false)
    const [gapLimitReached, setGapLimitReached] = useState(null) // { used, limit }
    const [competitorsInput, setCompetitorsInput] = useState('')

    const fetch_ = async (force = false) => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const url = `${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/backlinks${force ? '?force=true' : ''}`
            const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
            const d = await res.json()
            if (!res.ok) throw new Error(d.error)
            setSummary(d.summary); setCheckedAt(d.checkedAt); setLoaded(true)
            if (d.staleError) toast.error('Update failed — showing last known state.')
            else if (force) toast.success('Loaded current backlink data')
        } catch (err) {
            toast.error(err.message || 'Error')
            setLoaded(true) // otherwise the view stays stuck on the loading spinner if the first check fails
        }
        finally { setLoading(false) }
    }

    const fetchReferringDomains = async (force = false) => {
        setRefLoading(true)
        try {
            const token = localStorage.getItem('token')
            const url = `${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/referring-domains${force ? '?force=true' : ''}`
            const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
            const d = await res.json()
            if (!res.ok) throw new Error(d.error)
            setRefDomains(d.domains); setRefCheckedAt(d.checkedAt); setRefLoaded(true)
            if (force) toast.success('Loaded current referring domains')
        } catch (err) { toast.error(err.message || 'Error') }
        finally { setRefLoading(false) }
    }

    const fetchGap = async (force = false, competitorsOverride = '') => {
        setGapLoading(true)
        setGapLimitReached(null)
        try {
            const token = localStorage.getItem('token')
            const params = new URLSearchParams()
            if (force) params.set('force', 'true')
            if (competitorsOverride) params.set('competitors', competitorsOverride)
            const qs = params.toString()
            const url = `${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/backlink-gap${qs ? `?${qs}` : ''}`
            const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
            const d = await res.json()
            if (res.status === 429 && d.error === 'monthly_limit_reached') { setGapLimitReached({ used: d.used, limit: d.limit }); setGapLoaded(true); return }
            if (!res.ok) throw new Error(d.error)
            setGap(d); setGapLoaded(true)
            if (d.manual && d.competitors?.length) setCompetitorsInput(d.competitors.join(', '))
            if (force) toast.success('Link gap analysis updated')
        } catch (err) { toast.error(err.message || 'Error running the link gap analysis') }
        finally { setGapLoading(false) }
    }

    const handleGapSubmit = (e) => {
        e.preventDefault()
        fetchGap(true, competitorsInput.trim())
    }

    useEffect(() => {
        fetch_()
        fetchReferringDomains()
        if (plan && plan !== 'einsteiger') fetchGap()
    }, [siteId, plan])

    if (!loaded) return <LoadingTab />

    // Summary is a separate, aggregated DataForSEO metric set that's often still empty for
    // small/new domains, even though the raw lists (referring domains, link gap) below already
    // have hits. An empty summary must not hide the sections below it.
    const stats = summary ? [
        { label: 'Total Backlinks', value: summary.backlinks?.toLocaleString('en-US') ?? '—' },
        { label: 'Referring Domains', value: summary.referringDomains?.toLocaleString('en-US') ?? '—' },
        { label: 'Referring IPs', value: summary.referringIPs?.toLocaleString('en-US') ?? '—' },
        { label: 'Dofollow', value: summary.dofollow?.toLocaleString('en-US') ?? '—' },
        { label: 'Nofollow', value: summary.nofollow?.toLocaleString('en-US') ?? '—' },
        { label: 'Spam Score', value: summary.spamScore != null ? `${summary.spamScore}%` : '—', risky: summary.spamScore > 30 },
    ] : []

    // Domains linking to several competitors at once come first — highest link-building value
    const sortedGap = gap?.gap?.length
        ? [...gap.gap].sort((a, b) => (b.linksToCount - a.linksToCount) || ((b.rank || 0) - (a.rank || 0)))
        : []
    const maxRank = sortedGap.length ? Math.max(...sortedGap.map(g => g.rank || 0)) : 0

    const competitorCounts = (gap?.competitors || [])
        .map(c => ({ domain: c, count: sortedGap.filter(g => g.linksTo.some(l => l.competitor === c)).length }))
        .sort((a, b) => b.count - a.count)
    const maxCompetitorCount = competitorCounts.length ? Math.max(...competitorCounts.map(c => c.count)) : 0

    // Overlap degree: how many domains link to 1, 2, 3, 4+ competitors at once. Deliberately
    // spread-out Tailwind color families (400 shade, bold on dark ground) instead of adjacent
    // tones like emerald/teal, which look too similar to each other.
    const OVERLAP_COLORS = [
        'var(--accent)',              // Blue (brand)
        'oklch(70.4% 0.191 22)',      // Red
        'oklch(82.8% 0.189 84)',      // Amber
        'oklch(76.5% 0.177 163)',     // Emerald
        'oklch(74% 0.238 322)',       // Fuchsia
    ]
    const overlapCounts = {}
    sortedGap.forEach(g => { overlapCounts[g.linksToCount] = (overlapCounts[g.linksToCount] || 0) + 1 })
    const overlapSegments = Object.keys(overlapCounts)
        .map(Number)
        .sort((a, b) => b - a)
        .map((n, i) => ({ label: `${n}× competitors`, value: overlapCounts[n], color: OVERLAP_COLORS[i] ?? '#475569' }))

    // Rank distribution: rough authority breakdown of the gap domains
    const RANK_BUCKETS = [
        { label: 'Low (< 100)', test: r => r < 100 },
        { label: 'Medium (100–199)', test: r => r >= 100 && r < 200 },
        { label: 'High (200+)', test: r => r >= 200 },
    ]
    const rankBuckets = RANK_BUCKETS.map(b => ({ label: b.label, count: sortedGap.filter(g => b.test(g.rank || 0)).length }))
    const maxRankBucket = Math.max(...rankBuckets.map(b => b.count), 1)

    return (
        <div>
            {summary ? (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                        {stats.map(s => (
                            <div key={s.label} className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-4">
                                <div className="text-xs text-[var(--text-faint)] mb-1.5">{s.label}</div>
                                <div className={`flex items-center gap-1.5 text-xl font-bold ${s.risky ? 'text-[var(--danger)]' : 'text-[var(--text-white)]'}`}>
                                    {s.risky && <AlertTriangle className="w-4 h-4 shrink-0" strokeWidth={2.5} />}
                                    {s.value}
                                </div>
                            </div>
                        ))}
                    </div>
                    {summary.firstSeen && (
                        <div className="text-xs text-[var(--text-faint)]">
                            First backlink since: {new Date(summary.firstSeen).toLocaleDateString('en-US')}
                        </div>
                    )}
                </>
            ) : (
                <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl py-10 mb-6">
                    <EmptyTab icon={Link2} text="No backlink summary available yet — this often takes longer for new/small domains at DataForSEO. The raw data below may still show hits." onRetry={() => fetch_(true)} retrying={loading} />
                </div>
            )}
            {checkedAt && (
                <div className="text-xs text-[var(--text-faint)] mt-1">
                    Last checked: {new Date(checkedAt).toLocaleDateString('en-US')} {new Date(checkedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </div>
            )}

            {summary && (
                <button onClick={() => fetch_(true)} disabled={loading}
                    className="mt-4 flex items-center gap-2 text-xs text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors">
                    <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                    Reload
                </button>
            )}

            {/* Referring Domains: who links to me */}
            <div className="mt-10 pt-8 border-t border-[var(--border-subtle)]">
                <h3 className="text-base font-bold text-[var(--text-white)] flex items-center gap-2 mb-1">
                    <Globe className="w-4 h-4 text-[var(--accent)]" />
                    Who links to me
                </h3>
                <p className="text-xs text-[var(--text-faint)] mb-4">
                    Domains that actually link to you — sorted by domain rank (authority).
                </p>

                {!refLoaded ? (
                    <div className="flex items-center justify-center py-14">
                        <Loader2 className="w-5 h-5 text-[var(--text-faint)] animate-spin" />
                    </div>
                ) : !refDomains?.length ? (
                    <EmptyTab icon={Globe} text="No referring domains found." onRetry={() => fetchReferringDomains(true)} retrying={refLoading} />
                ) : (
                    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[var(--border-subtle)]">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Domain</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Rank</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden sm:table-cell">Backlinks</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden sm:table-cell">Since</th>
                                        <th className="px-5 py-3 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {refDomains.map((d, i) => (
                                        <tr key={d.domain} className={i < refDomains.length - 1 ? 'border-b border-[var(--border-subtle)]' : ''}>
                                            <td className="px-5 py-3.5">
                                                <span className="text-sm text-[var(--text-white)] truncate">{d.domain}</span>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className="text-sm text-[var(--text-muted)] tabular-nums">{d.rank ?? '—'}</span>
                                            </td>
                                            <td className="px-5 py-3.5 hidden sm:table-cell">
                                                <span className="text-sm text-[var(--text-muted)] tabular-nums">{d.backlinks?.toLocaleString('en-US') ?? '—'}</span>
                                            </td>
                                            <td className="px-5 py-3.5 hidden sm:table-cell">
                                                <span className="text-xs text-[var(--text-faint)]">{formatFirstSeen(d.firstSeen)}</span>
                                            </td>
                                            <td className="px-5 py-3.5 text-right">
                                                <a href={`https://${d.domain}`} target="_blank" rel="noopener noreferrer"
                                                    className="inline-flex items-center text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors">
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {refCheckedAt && (
                    <div className="text-xs text-[var(--text-faint)] mt-3">
                        Last checked: {new Date(refCheckedAt).toLocaleDateString('en-US')} {new Date(refCheckedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                )}
                <button onClick={() => fetchReferringDomains(true)} disabled={refLoading}
                    className="mt-2 flex items-center gap-2 text-xs text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors">
                    <RefreshCw className={`w-3 h-3 ${refLoading ? 'animate-spin' : ''}`} />
                    Reload
                </button>
            </div>

            {/* Link gap vs. competitors */}
            <div className="mt-10 pt-8 border-t border-[var(--border-subtle)]">
                <h3 className="text-base font-bold text-[var(--text-white)] flex items-center gap-2 mb-1">
                    <GitCompare className="w-4 h-4 text-[var(--accent)]" />
                    Link gap vs. competitors
                </h3>
                <p className="text-xs text-[var(--text-faint)] mb-4">
                    Domains that link to your competitors — but not (yet) to you. Concrete outreach targets for link building.
                </p>

                {plan !== 'einsteiger' && (
                    <form onSubmit={handleGapSubmit} className="flex flex-col sm:flex-row gap-3 mb-5">
                        <input
                            value={competitorsInput}
                            onChange={e => setCompetitorsInput(e.target.value)}
                            placeholder="peec.ai, otterly.ai, rankscale.ai — leave empty for automatic detection"
                            className="flex-1 bg-[var(--surface-06)] border border-[var(--border-subtle)] focus:border-[var(--accent-border)] rounded-xl px-4 py-2.5 text-[var(--text-white)] placeholder:text-[var(--text-faint)] outline-none text-sm"
                        />
                        <button type="submit" disabled={gapLoading}
                            className="flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all disabled:opacity-50 whitespace-nowrap">
                            {gapLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <GitCompare className="w-4 h-4" />}
                            {gapLoading ? 'Analyzing…' : competitorsInput.trim() ? 'Analyze' : 'Re-analyze'}
                        </button>
                    </form>
                )}

                {plan === 'einsteiger' ? (
                    <div className="flex flex-col items-center justify-center py-14 gap-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center">
                            <Lock className="w-5 h-5 text-[var(--accent)]" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-[var(--text-white)] mb-1">Available from Pro</p>
                            <p className="text-xs text-[var(--text-faint)] max-w-sm">
                                Find domains that link to your competitors but not to you — from <strong className="text-[var(--text-white)]">Pro (€79/month)</strong>.
                            </p>
                        </div>
                        <Link href="/en/seo/pricing"
                            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all">
                            Upgrade to Pro →
                        </Link>
                    </div>
                ) : gapLimitReached ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-3 bg-[var(--bg-surface)] border border-amber-500/15 rounded-2xl">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-amber-400" />
                        </div>
                        <p className="text-sm font-semibold text-[var(--text-white)]">Monthly limit reached</p>
                        <p className="text-xs text-[var(--text-faint)] text-center">
                            {gapLimitReached.used}/{gapLimitReached.limit} analyses used this month.<br />
                            {plan === 'pro' ? 'Upgrade to Expert for more analyses/month.' : 'The limit resets on the 1st of next month.'}
                        </p>
                        {plan === 'pro' && (
                            <Link href="/en/seo/pricing"
                                className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all">
                                Upgrade to Expert →
                            </Link>
                        )}
                    </div>
                ) : !gapLoaded ? (
                    <div className="flex items-center justify-center py-14">
                        <Loader2 className="w-5 h-5 text-[var(--text-faint)] animate-spin" />
                    </div>
                ) : sortedGap.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-14 gap-3">
                        <GitCompare className="w-8 h-8 text-[var(--text-faint)]" />
                        <span className="text-sm text-[var(--text-faint)] text-center max-w-sm">
                            {gap?.competitors?.length
                                ? 'No link gap found — a great sign, your competitors have no detectable link-building advantage.'
                                : 'No competitors found — the gap analysis needs at least one detected competitor (tab "Competitors").'}
                        </span>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-wrap items-center gap-1.5 mb-5">
                            <span className="text-xs text-[var(--text-faint)]">Compared against ({gap.manual ? 'manually entered' : 'automatically detected'}):</span>
                            {gap.competitors.map(c => (
                                <span key={c} className="text-xs px-2 py-1 rounded-md bg-[var(--surface-08)] text-[var(--text-muted)]">{c}</span>
                            ))}
                        </div>

                        {/* Charts: overlap degree (donut) + rank distribution */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-5">
                            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                <h4 className="text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider mb-4">Overlap degree</h4>
                                <DonutChart segments={overlapSegments} />
                            </div>
                            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                <h4 className="text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider mb-4">Rank distribution</h4>
                                <div className="space-y-3">
                                    {rankBuckets.map((b, i) => (
                                        <div key={b.label}>
                                            <div className="flex items-center justify-between gap-3 mb-1">
                                                <span className="text-sm text-[var(--text-body)]">{b.label}</span>
                                                <span className="text-xs text-[var(--accent)] font-semibold tabular-nums shrink-0">{b.count}</span>
                                            </div>
                                            <div className="relative h-2 rounded-full bg-[var(--surface-08)] overflow-hidden">
                                                <motion.div
                                                    className="absolute inset-y-0 left-0 rounded-full bg-[var(--accent)]"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(b.count / maxRankBucket) * 100}%` }}
                                                    transition={{ duration: 0.6, delay: i * 0.06, ease: 'easeOut' }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Chart: gap domains per competitor */}
                        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5 mb-5">
                            <h4 className="text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider mb-4">Gap domains per competitor</h4>
                            <div className="space-y-3">
                                {competitorCounts.map((c, i) => (
                                    <div key={c.domain}>
                                        <div className="flex items-center justify-between gap-3 mb-1">
                                            <span className="text-sm text-[var(--text-body)] truncate">{c.domain}</span>
                                            <span className="text-xs text-[var(--accent)] font-semibold tabular-nums shrink-0">{c.count} domains</span>
                                        </div>
                                        <div className="relative h-2 rounded-full bg-[var(--surface-08)] overflow-hidden">
                                            <motion.div
                                                className="absolute inset-y-0 left-0 rounded-full bg-[var(--accent)]"
                                                initial={{ width: 0 }}
                                                animate={{ width: maxCompetitorCount ? `${(c.count / maxCompetitorCount) * 100}%` : '0%' }}
                                                transition={{ duration: 0.6, delay: i * 0.06, ease: 'easeOut' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Table: concrete link-building targets */}
                        <div className="bg-[var(--bg-surface)] border border-[var(--accent-border)] rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-[var(--border-subtle)]">
                                            <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Domain</th>
                                            <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Rank</th>
                                            <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden sm:table-cell">Links to</th>
                                            <th className="px-5 py-3 w-10"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedGap.map((g, i) => (
                                            <tr key={g.domain} className={i < sortedGap.length - 1 ? 'border-b border-[var(--border-subtle)]' : ''}>
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-[var(--text-white)] truncate">{g.domain}</span>
                                                        {g.linksToCount > 1 && (
                                                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] font-semibold shrink-0">
                                                                {g.linksToCount}×
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <VolumeBar value={g.rank} max={maxRank} />
                                                </td>
                                                <td className="px-5 py-3.5 hidden sm:table-cell">
                                                    <div className="flex flex-wrap gap-1">
                                                        {g.linksTo.map(l => (
                                                            <span key={l.competitor} className="text-[11px] px-1.5 py-0.5 rounded-md bg-[var(--surface-08)] text-[var(--text-muted)]">
                                                                {l.competitor}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3.5 text-right">
                                                    <a href={`https://${g.domain}`} target="_blank" rel="noopener noreferrer"
                                                        className="inline-flex items-center text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors">
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {gap.checkedAt && (
                            <div className="text-xs text-[var(--text-faint)] mt-3">
                                Last analyzed: {new Date(gap.checkedAt).toLocaleDateString('en-US')} {new Date(gap.checkedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        )}
                    </>
                )}
            </div>
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
            if (res.status === 429) throw new Error(d.error || 'Too many requests — please wait a minute.')
            if (!res.ok) throw new Error(d.error)
            setResult(d)
        } catch (err) { toast.error(err.message || 'Error analyzing') }
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
            toast.success(`"${keyword}" is now being tracked`)
        } catch (err) { toast.error(err.message || 'Error') }
        finally { setAdding(prev => { const n = new Set(prev); n.delete(keyword); return n }) }
    }

    if (plan === 'einsteiger') return (
        <div className="flex flex-col items-center justify-center py-20 gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center">
                <Lock className="w-6 h-6 text-[var(--accent)]" />
            </div>
            <div className="text-center">
                <h3 className="text-lg font-bold text-[var(--text-white)] mb-2">Content Gap Analysis</h3>
                <p className="text-sm text-[var(--text-faint)] max-w-sm">
                    Find keywords your competitor ranks for — but you don't.<br />
                    Available from <strong className="text-[var(--text-white)]">Pro (€79/month)</strong> · 100 analyses/month.
                </p>
            </div>
            <Link href="/en/seo/pricing"
                className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all">
                Upgrade to Pro →
            </Link>
        </div>
    )

    const monthlyLimit = plan === 'expert' ? 300 : 100

    return (
        <div className="space-y-6">
            {/* Input + usage counter */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-[var(--text-muted)]">
                        Enter a competitor domain — we'll show you keywords your competitor ranks for that you're not tracking yet.
                    </p>
                    {result && (
                        <span className="text-xs text-[var(--text-faint)] whitespace-nowrap ml-4">
                            {result.used}/{result.limit} this month
                        </span>
                    )}
                </div>
                <form onSubmit={handleAnalyse} className="flex gap-3">
                    <input
                        value={competitor}
                        onChange={e => setCompetitor(e.target.value)}
                        placeholder="competitor.com"
                        className="flex-1 bg-[var(--surface-06)] border border-[var(--border-subtle)] focus:border-[var(--accent-border)] rounded-xl px-4 py-2.5 text-[var(--text-white)] placeholder:text-[var(--text-faint)] outline-none text-sm"
                    />
                    <button type="submit" disabled={loading || !competitor.trim()}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all disabled:opacity-50 whitespace-nowrap">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <GitCompare className="w-4 h-4" />}
                        {loading ? 'Analyzing…' : 'Analyze gap'}
                    </button>
                </form>
            </div>

            {/* Limit reached */}
            {limitReached && (
                <div className="flex flex-col items-center justify-center py-12 gap-4 bg-[var(--bg-surface)] border border-amber-500/15 rounded-2xl">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-semibold text-[var(--text-white)] mb-1">Monthly limit reached</p>
                        <p className="text-xs text-[var(--text-faint)]">
                            You've used {limitReached.limit} of {limitReached.limit} content gap analyses this month.<br />
                            {plan === 'pro'
                                ? 'Upgrade to Expert for 300 analyses/month.'
                                : 'The limit resets on the 1st of next month.'}
                        </p>
                    </div>
                    {plan === 'pro' && (
                        <Link href="/en/seo/pricing"
                            className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all">
                            Upgrade to Expert →
                        </Link>
                    )}
                </div>
            )}

            {/* Results */}
            {result && (
                <div>
                    {result.gap.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 gap-3">
                            <GitCompare className="w-8 h-8 text-[var(--text-faint)]" />
                            <span className="text-sm text-[var(--text-faint)]">No gap found — you're already tracking all top keywords of {result.competitor}.</span>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                                    {result.gap.length} keywords — {result.competitor} ranks for these, you don't
                                </h3>
                                <span className="text-xs text-[var(--text-faint)]">Sorted by search volume</span>
                            </div>
                            <div className="bg-[var(--bg-surface)] border border-[var(--accent-border)] rounded-2xl overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-[var(--border-subtle)]">
                                                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Keyword</th>
                                                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Volume/Mo</th>
                                                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden sm:table-cell">Competitor</th>
                                                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden sm:table-cell">Competition</th>
                                                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden md:table-cell">CPC</th>
                                                <th className="px-5 py-3" />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.gap.map(item => {
                                                const isAdded  = added.has(item.keyword)
                                                const isAdding = adding.has(item.keyword)
                                                return (
                                                    <tr key={item.keyword} className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--surface-08)] transition-colors">
                                                        <td className="px-5 py-3.5"><span className="text-sm text-[var(--text-body)] font-medium">{item.keyword}</span></td>
                                                        <td className="px-5 py-3.5"><VolumeBar value={item.searchVolume} max={maxVolume} /></td>
                                                        <td className="px-5 py-3.5 hidden sm:table-cell"><PositionCell position={item.competitorPosition} /></td>
                                                        <td className="px-5 py-3.5 hidden sm:table-cell">
                                                            <span className={`text-xs font-medium ${item.competition === 'HIGH' ? 'text-red-400' : item.competition === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'}`}>
                                                                {item.competition || '—'}
                                                            </span>
                                                        </td>
                                                        <td className="px-5 py-3.5 hidden md:table-cell">
                                                            <span className="text-xs text-[var(--text-faint)]">{item.cpc ? `€${item.cpc.toFixed(2)}` : '—'}</span>
                                                        </td>
                                                        <td className="px-5 py-3.5 text-right">
                                                            {isAdded ? (
                                                                <span className="flex items-center justify-end gap-1 text-xs text-emerald-400 font-semibold">
                                                                    <Check className="w-3.5 h-3.5" />Tracked
                                                                </span>
                                                            ) : (
                                                                <button onClick={() => handleAddKeyword(item.keyword)} disabled={isAdding}
                                                                    className="flex items-center gap-1 ml-auto px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-[var(--accent-soft)] hover:bg-[var(--accent-soft-strong)] text-[var(--accent)] border border-[var(--accent-border)] transition-all disabled:opacity-50 whitespace-nowrap">
                                                                    {isAdding ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                                                                    Track
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
                                className="mt-4 flex items-center gap-2 text-xs text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors">
                                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                                Reload
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

// ─── Discover Rankings Tab ───────────────────────────────────────────────────

function RankedKeywordsTab({ siteId }) {
    const [loading, setLoading]           = useState(true)
    const [keywords, setKeywords]         = useState(null)
    const [checkedAt, setCheckedAt]       = useState(null)
    const [used, setUsed]                 = useState(0)
    const [limit, setLimit]               = useState(0)
    const [limitReached, setLimitReached] = useState(null) // { used, limit }
    const [adding, setAdding]             = useState(new Set())
    const [added, setAdded]               = useState(new Set())

    const maxVolume = keywords?.length ? Math.max(...keywords.map(k => k.searchVolume || 0)) : 0

    const fetch_ = async (force = false) => {
        setLoading(true)
        setLimitReached(null)
        try {
            const token = localStorage.getItem('token')
            const url = `${process.env.NEXT_PUBLIC_API_URL}/seo/sites/${siteId}/ranked-keywords${force ? '?force=true' : ''}`
            const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
            const d = await res.json()
            if (res.status === 429 && d.error === 'monthly_limit_reached') { setLimitReached({ used: d.used, limit: d.limit }); return }
            if (!res.ok) throw new Error(d.error)
            setKeywords(d.keywords); setCheckedAt(d.checkedAt); setUsed(d.used); setLimit(d.limit)
            setAdded(new Set())
        } catch (err) { toast.error(err.message || 'Error') }
        finally { setLoading(false) }
    }

    useEffect(() => { fetch_() }, [siteId])

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
            toast.success(`"${keyword}" is now being tracked`)
        } catch (err) { toast.error(err.message || 'Error') }
        finally { setAdding(prev => { const n = new Set(prev); n.delete(keyword); return n }) }
    }

    if (loading && !keywords) return <LoadingTab />

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5">
                <p className="text-sm text-[var(--text-muted)] max-w-lg">
                    Keywords your website currently has a confirmed position for on Google — including real search volume. The starting point for deciding what's worth tracking.
                </p>
                {limit > 0 && (
                    <span className="text-xs text-[var(--text-faint)] whitespace-nowrap ml-4">{used}/{limit} this month</span>
                )}
            </div>

            {limitReached && (
                <div className="flex flex-col items-center justify-center py-12 gap-4 bg-[var(--bg-surface)] border border-amber-500/15 rounded-2xl">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-semibold text-[var(--text-white)] mb-1">Monthly limit reached</p>
                        <p className="text-xs text-[var(--text-faint)]">
                            You've used {limitReached.limit} of {limitReached.limit} ranking lookups this month.<br />
                            The limit resets on the 1st of next month.
                        </p>
                    </div>
                </div>
            )}

            {limitReached ? null : !keywords?.length ? (
                <EmptyTab icon={Search} text="No confirmed rankings found." onRetry={() => fetch_(true)} retrying={loading} />
            ) : (
                <>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                            {keywords.length} keywords you currently rank for
                        </h3>
                        <span className="text-xs text-[var(--text-faint)]">Sorted by position</span>
                    </div>
                    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[var(--border-subtle)]">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Keyword</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Position</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden sm:table-cell">Volume/mo</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden sm:table-cell">Competition</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider hidden md:table-cell">CPC</th>
                                        <th className="px-5 py-3" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {keywords.map(item => {
                                        const isAdded  = added.has(item.keyword)
                                        const isAdding = adding.has(item.keyword)
                                        return (
                                            <tr key={item.keyword} className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--surface-08)] transition-colors">
                                                <td className="px-5 py-3.5"><span className="text-sm text-[var(--text-body)] font-medium">{item.keyword}</span></td>
                                                <td className="px-5 py-3.5"><PositionCell position={item.position} /></td>
                                                <td className="px-5 py-3.5 hidden sm:table-cell"><VolumeBar value={item.searchVolume} max={maxVolume} /></td>
                                                <td className="px-5 py-3.5 hidden sm:table-cell">
                                                    <span className={`text-xs font-medium ${item.competition === 'HIGH' ? 'text-red-400' : item.competition === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'}`}>
                                                        {item.competition || '—'}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3.5 hidden md:table-cell">
                                                    <span className="text-xs text-[var(--text-faint)]">{item.cpc ? `€${item.cpc.toFixed(2)}` : '—'}</span>
                                                </td>
                                                <td className="px-5 py-3.5 text-right">
                                                    {isAdded ? (
                                                        <span className="flex items-center justify-end gap-1 text-xs text-emerald-400 font-semibold">
                                                            <Check className="w-3.5 h-3.5" />Tracked
                                                        </span>
                                                    ) : (
                                                        <button onClick={() => handleAddKeyword(item.keyword)} disabled={isAdding}
                                                            className="flex items-center gap-1 ml-auto px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-[var(--accent-soft)] hover:bg-[var(--accent-soft-strong)] text-[var(--accent)] border border-[var(--accent-border)] transition-all disabled:opacity-50 whitespace-nowrap">
                                                            {isAdding ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                                                            Track
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
                    {checkedAt && (
                        <div className="text-xs text-[var(--text-faint)] mt-3">
                            Last checked: {new Date(checkedAt).toLocaleDateString('en-US')} {new Date(checkedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    )}
                    <button onClick={() => fetch_(true)} disabled={loading}
                        className="mt-2 flex items-center gap-2 text-xs text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors">
                        <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                        Reload
                    </button>
                </>
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
            <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center">
                        <Bell className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-[var(--text-white)]">Email Alerts</h3>
                        <p className="text-xs text-[var(--text-faint)] mt-0.5">Get notified when rankings change</p>
                    </div>
                </div>

                <div className="space-y-3 mb-5">
                    <div className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-[var(--accent)]" strokeWidth={3} />
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">Automatic weekly check (Mondays)</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-[var(--accent)]" strokeWidth={3} />
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">Alert on significant drops <span className="text-[var(--text-faint)]">(Starter: ±10, Pro: ±5, Expert: ±3 positions)</span></p>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-[var(--accent)]" strokeWidth={3} />
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">Alert on improvements — newly in Top 10 or +5 positions</p>
                    </div>
                </div>

                <button
                    onClick={toggleAlerts}
                    disabled={saving}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border transition-all ${
                        alertsEnabled
                            ? 'bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/15'
                            : 'bg-[var(--surface-06)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <Bell className={`w-4 h-4 ${alertsEnabled ? 'text-emerald-400' : 'text-[var(--text-faint)]'}`} />
                        <span className={`text-sm font-medium ${alertsEnabled ? 'text-emerald-300' : 'text-[var(--text-faint)]'}`}>
                            Ranking alerts by email
                        </span>
                    </div>
                    <div className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${alertsEnabled ? 'bg-emerald-500' : 'bg-[var(--surface-10)]'}`}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-[var(--text-white)] shadow transition-transform ${alertsEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </div>
                </button>

                <p className="text-xs text-[var(--text-faint)] mt-3">
                    {alertsEnabled
                        ? 'You\'ll receive emails as soon as a manual or weekly check detects relevant changes.'
                        : 'Alerts are disabled — you won\'t receive emails on ranking changes.'}
                </p>
            </div>
        </div>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const TABS = [
    { id: 'rankings',    label: 'Rankings' },
    { id: 'ranked',      label: 'Discover Rankings' },
    { id: 'ideas',       label: 'Keyword Ideas' },
    { id: 'gap',         label: 'Content Gap' },
    { id: 'competitors', label: 'Competitors' },
    { id: 'backlinks',   label: 'Backlinks' },
    { id: 'settings',    label: 'Settings' },
]

// Surfaces the key numbers immediately, independent of the active tab — mirrors OverviewStats
// on the DE dashboard instead of hiding them inside the Rankings tab.
function OverviewStats({ site, overview }) {
    const positions = (overview.rankings || []).map(r => r.current?.position).filter(p => p != null)
    const avgPosition = positions.length ? (positions.reduce((a, b) => a + b, 0) / positions.length).toFixed(1) : null
    const top10Count  = positions.filter(p => p <= 10).length

    const stats = [
        { label: 'Avg. Position', value: avgPosition ?? '—', icon: TrendingUp },
        { label: 'Top 10', value: positions.length ? `${top10Count} of ${positions.length}` : '—', icon: Check },
        {
            label: 'Last checked',
            value: site?.lastChecked
                ? new Date(site.lastChecked).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' })
                : 'Never',
            icon: RefreshCw,
        },
        {
            label: 'Checks this month',
            value: overview.manualChecksLimit != null ? `${overview.manualChecksUsed ?? 0}/${overview.manualChecksLimit}` : '—',
            icon: Lock,
        },
    ]

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {stats.map(s => (
                <div key={s.label} className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-4">
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-faint)] mb-1.5 whitespace-nowrap">
                        <s.icon className="w-3.5 h-3.5 shrink-0" />
                        {s.label}
                    </div>
                    <div className="text-2xl font-bold text-[var(--text-white)] tracking-tight">{s.value}</div>
                </div>
            ))}
        </div>
    )
}

export default function SeoSitePageEn() {
    const router     = useRouter()
    const { siteId } = useParams()
    const [site, setSite]       = useState(null)
    const [plan, setPlan]       = useState(null)
    const [loading, setLoading] = useState(true)
    const [tab, setTab]         = useState('rankings')
    const [overview, setOverview] = useState({ rankings: [], manualChecksUsed: null, manualChecksLimit: null })

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
        } catch { toast.error('Website not found') }
        finally { setLoading(false) }
    }, [siteId])

    useEffect(() => {
        if (!localStorage.getItem('user')) { router.push('/en/login'); return }
        fetchSite()
    }, [fetchSite, router])

    if (loading) return (
        <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" />
        </div>
    )

    return (
        <div className="min-h-screen bg-[var(--bg-base)]">
            <Navbar locale="en" />

            <div className="max-w-[1600px] mx-auto px-5 sm:px-8 pt-28 pb-16">

                {/* Back + Header */}
                <div className="mb-8">
                    <Link href="/en/seo/dashboard" className="inline-flex items-center gap-2 text-sm text-[var(--text-faint)] hover:text-[var(--text-body)] transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" />Back to dashboard
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center">
                            <Globe className="w-5 h-5 text-[var(--accent)]" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-white)] tracking-tight">{site?.displayName || site?.domain}</h1>
                            <div className="text-sm text-[var(--text-faint)]">{site?.domain}</div>
                        </div>
                    </div>
                </div>

                {/* Overview — the key numbers, always visible regardless of the active tab */}
                <OverviewStats site={site} overview={overview} />

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Tabs — a left nav column instead of a row, so all 6 entries stay reachable
                        without clipping or wrapping. */}
                    <nav className="flex flex-col gap-3 md:w-52 shrink-0">
                        {TABS.map(t => (
                            <button key={t.id} onClick={() => setTab(t.id)}
                                className={`text-left px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                                    tab === t.id
                                        ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                                        : 'text-[var(--text-faint)] hover:text-[var(--text-body)] hover:bg-[var(--surface-08)]'
                                }`}>
                                {t.label}
                            </button>
                        ))}
                    </nav>

                    {/* Tab Content */}
                    <div className="flex-1 min-w-0">
                        {tab === 'rankings'    && <RankingsTab siteId={siteId} site={site} onSiteUpdated={fetchSite} onStatsChange={setOverview} />}
                        {tab === 'ranked'      && <RankedKeywordsTab siteId={siteId} />}
                        {tab === 'ideas'       && <KeywordIdeasTab siteId={siteId} plan={plan} />}
                        {tab === 'gap'         && <ContentGapTab siteId={siteId} plan={plan} />}
                        {tab === 'competitors' && <CompetitorsTab siteId={siteId} />}
                        {tab === 'backlinks'   && <BacklinksTab siteId={siteId} plan={plan} />}
                        {tab === 'settings'    && <SettingsTab siteId={siteId} />}
                    </div>
                </div>
            </div>
        </div>
    )
}
