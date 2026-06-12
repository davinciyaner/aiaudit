'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Plus, Trash2, ExternalLink, AlertTriangle, CheckCircle, XCircle, Clock, Loader2, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import toast, { Toaster } from 'react-hot-toast'

const API = process.env.NEXT_PUBLIC_API_URL

function StatusDot({ status }) {
    const colors = { up: 'bg-emerald-400', down: 'bg-red-500', degraded: 'bg-yellow-400' }
    const labels = { up: 'Online', down: 'Offline', degraded: 'Beeinträchtigt' }
    const textColors = { up: 'text-emerald-400', down: 'text-red-400', degraded: 'text-yellow-400' }
    if (!status) return <span className="text-slate-500 text-xs">Noch nicht geprüft</span>
    return (
        <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${colors[status]} ${status === 'up' ? 'animate-pulse' : ''}`} />
            <span className={`text-xs font-medium ${textColors[status]}`}>{labels[status]}</span>
        </div>
    )
}

function AlertBadge({ count }) {
    if (!count) return null
    return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded-full text-xs text-red-400 font-medium">
            <AlertTriangle className="w-3 h-3" />
            {count} Alert{count !== 1 ? 's' : ''}
        </span>
    )
}

function SiteCard({ site, onDelete, onCheck }) {
    const [checking, setChecking] = useState(false)

    const handleCheck = async (e) => {
        e.preventDefault()
        setChecking(true)
        try {
            await onCheck(site._id)
            toast.success('Check abgeschlossen')
        } catch {
            toast.error('Check fehlgeschlagen')
        } finally {
            setChecking(false)
        }
    }

    const lastStatus = site.lastCheck?.status
    const responseTime = site.lastCheck?.responseTime
    const securityScore = site.lastScan?.score
    const sslDays = site.lastScan?.sslDaysLeft
    const issueCount = site.lastScan?.issues?.length ?? null

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white/2 border border-white/6 rounded-2xl p-6 hover:border-white/12 transition-all duration-200 group"
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold">{site.displayName || site.domain}</span>
                        {site.displayName && site.displayName !== site.domain && (
                            <span className="text-slate-500 text-xs">{site.domain}</span>
                        )}
                    </div>
                    <StatusDot status={lastStatus} />
                </div>
                <div className="flex items-center gap-2">
                    <AlertBadge count={site.openAlerts} />
                    <button
                        onClick={handleCheck}
                        disabled={checking}
                        className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors"
                        title="Manueller Check"
                    >
                        {checking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Clock className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={() => onDelete(site._id)}
                        className="p-1.5 text-slate-600 hover:text-red-400 transition-colors"
                        title="Entfernen"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="bg-white/3 rounded-xl p-3">
                    <p className="text-xs text-slate-500 mb-1">Antwortzeit</p>
                    <p className="text-sm font-semibold text-white">
                        {responseTime != null ? `${responseTime} ms` : '—'}
                    </p>
                </div>
                <div className="bg-white/3 rounded-xl p-3">
                    <p className="text-xs text-slate-500 mb-1">Security</p>
                    <p className={`text-sm font-semibold ${
                        securityScore == null ? 'text-slate-500'
                        : securityScore >= 80 ? 'text-emerald-400'
                        : securityScore >= 60 ? 'text-yellow-400'
                        : 'text-red-400'
                    }`}>
                        {securityScore != null ? `${securityScore}/100` : '—'}
                    </p>
                </div>
                <div className="bg-white/3 rounded-xl p-3">
                    <p className="text-xs text-slate-500 mb-1">SSL</p>
                    <p className={`text-sm font-semibold ${
                        sslDays == null ? 'text-slate-500'
                        : sslDays > 30 ? 'text-emerald-400'
                        : sslDays > 7 ? 'text-yellow-400'
                        : 'text-red-400'
                    }`}>
                        {sslDays != null ? `${sslDays}d` : '—'}
                    </p>
                </div>
                <div className="bg-white/3 rounded-xl p-3">
                    <p className="text-xs text-slate-500 mb-1">Fehler</p>
                    <p className={`text-sm font-semibold ${
                        issueCount == null ? 'text-slate-500'
                        : issueCount === 0 ? 'text-emerald-400'
                        : issueCount <= 3 ? 'text-yellow-400'
                        : 'text-red-400'
                    }`}>
                        {issueCount != null ? issueCount : '—'}
                    </p>
                </div>
            </div>

            <Link
                href={`/monitoring/security/${site._id}`}
                className="flex items-center justify-between w-full px-4 py-2.5 bg-white/3 hover:bg-white/6 border border-white/6 rounded-xl text-sm text-slate-400 hover:text-white transition-all duration-200"
            >
                <span>Details & History</span>
                <ChevronRight className="w-4 h-4" />
            </Link>
        </motion.div>
    )
}

function AddSiteForm({ onAdd, onClose }) {
    const [domain, setDomain] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [consent, setConsent] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!domain.trim() || !consent) return
        setLoading(true)
        try {
            await onAdd(domain.trim(), displayName.trim())
            onClose()
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-white/3 border border-white/10 rounded-2xl p-6 mb-6"
        >
            <h3 className="text-white font-semibold mb-4">Website hinzufügen</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    placeholder="example.com"
                    value={domain}
                    onChange={e => setDomain(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                    autoFocus
                />
                <input
                    type="text"
                    placeholder="Name (optional)"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                />

                <label className="flex items-start gap-3 cursor-pointer group">
                    <div
                        onClick={() => setConsent(v => !v)}
                        className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all ${
                            consent
                                ? 'bg-violet-600 border-violet-600'
                                : 'border-white/20 bg-white/5 group-hover:border-white/40'
                        }`}
                    >
                        {consent && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8" stroke="currentColor" strokeWidth={2.5}>
                                <path d="M1 4l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </div>
                    <span className="text-xs text-slate-400 leading-relaxed">
                        Ich bestätige, dass ich Eigentümer dieser Website bin oder eine ausdrückliche Genehmigung
                        zur Überwachung besitze, und stimme den{' '}
                        <a href="/agb" target="_blank" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">AGB</a>,
                        dem{' '}
                        <a href="/avv" target="_blank" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">AVV</a>{' '}
                        und der{' '}
                        <a href="/datenschutz" target="_blank" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Datenschutzerklärung</a>{' '}
                        zu.
                    </span>
                </label>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading || !domain.trim() || !consent}
                        className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-sm font-semibold text-white transition-all duration-200"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Hinzufügen'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-3 border border-white/10 rounded-xl text-sm text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200"
                    >
                        Abbrechen
                    </button>
                </div>
            </form>
        </motion.div>
    )
}

export default function SecurityMonitoringPage() {
    const router = useRouter()
    const [sites, setSites] = useState([])
    const [alerts, setAlerts] = useState([])
    const [plan, setPlan] = useState(null)
    const [maxSites, setMaxSites] = useState(5)
    const [loading, setLoading] = useState(true)
    const [showAddForm, setShowAddForm] = useState(false)

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    const fetchData = useCallback(async () => {
        try {
            const [sitesRes, alertsRes] = await Promise.all([
                fetch(`${API}/security-monitoring/sites`, { headers: { Authorization: `Bearer ${token}` } }),
                fetch(`${API}/security-monitoring/alerts`, { headers: { Authorization: `Bearer ${token}` } }),
            ])
            if (sitesRes.status === 401) { router.push('/login'); return }
            if (sitesRes.status === 403) { setPlan(null); setLoading(false); return }

            const sitesData = await sitesRes.json()
            const alertsData = await alertsRes.json()
            setSites(sitesData.sites || [])
            setPlan(sitesData.plan)
            setMaxSites(sitesData.maxSites || 5)
            setAlerts(alertsData.alerts || [])
        } catch {
            toast.error('Fehler beim Laden')
        } finally {
            setLoading(false)
        }
    }, [token, router])

    useEffect(() => { fetchData() }, [fetchData])

    const handleAddSite = async (domain, displayName) => {
        const res = await fetch(`${API}/security-monitoring/sites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ domain, displayName }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        toast.success(`${domain} wird jetzt überwacht`)
        await fetchData()
    }

    const handleDelete = async (id) => {
        if (!confirm('Website aus dem Monitoring entfernen?')) return
        const res = await fetch(`${API}/security-monitoring/sites/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) { toast.error('Fehler beim Entfernen'); return }
        toast.success('Website entfernt')
        setSites(prev => prev.filter(s => s._id !== id))
        setAlerts(prev => prev.filter(a => {
            const sid = a.siteId?._id ?? a.siteId
            return sid !== id
        }))
    }

    const handleResolveAlert = async (alertId) => {
        const res = await fetch(`${API}/security-monitoring/alerts/${alertId}/resolve`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) { toast.error('Fehler beim Schließen'); return }
        setAlerts(prev => prev.filter(a => a._id !== alertId))
    }

    const handleCheck = async (id) => {
        const res = await fetch(`${API}/security-monitoring/sites/${id}/check`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error('Check fehlgeschlagen')
        await fetchData()
    }

    if (loading) return (
        <div className="min-h-screen bg-[#05080f] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
        </div>
    )

    return (
        <div className="min-h-screen bg-[#05080f]">
            <Toaster position="top-right" toastOptions={{ style: { background: '#0d1117', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' } }} />
            <Navbar />

            <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-28 pb-20">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-red-400" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">Security Monitoring</h1>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Uptime, SSL und Sicherheit deiner Websites im Blick
                        </p>
                    </div>
                    {plan && sites.length < maxSites && (
                        <button
                            onClick={() => setShowAddForm(v => !v)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                        >
                            <Plus className="w-4 h-4" />
                            Website hinzufügen
                        </button>
                    )}
                </div>

                {/* Kein Abo */}
                {!plan && (
                    <div className="text-center py-20">
                        <Shield className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-white mb-2">Security Monitoring aktivieren</h2>
                        <p className="text-slate-400 mb-6">Überwache deine Websites auf Uptime, SSL und Sicherheitsprobleme.</p>
                        <Link href="/monitoring/pricing" className="inline-block px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl text-sm font-semibold text-white">
                            Plan anzeigen
                        </Link>
                    </div>
                )}

                {plan && (
                    <>
                        {/* Offene Alerts */}
                        {alerts.length > 0 && (
                            <div className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-2xl">
                                <div className="flex items-center gap-2 mb-3">
                                    <AlertTriangle className="w-4 h-4 text-red-400" />
                                    <span className="text-red-400 font-semibold text-sm">{alerts.length} offene Alert{alerts.length !== 1 ? 's' : ''}</span>
                                </div>
                                <div className="space-y-2">
                                    {alerts.map(alert => (
                                        <div key={alert._id} className="flex items-center justify-between gap-3 text-sm">
                                            <span className="text-slate-300 flex-1 min-w-0 truncate">{alert.message}</span>
                                            <div className="flex items-center gap-3 shrink-0">
                                                <span className="text-slate-500 text-xs">
                                                    {new Date(alert.detectedAt).toLocaleString('de-DE', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                <button
                                                    onClick={() => handleResolveAlert(alert._id)}
                                                    className="text-slate-600 hover:text-slate-300 transition-colors text-xs px-2 py-0.5 rounded hover:bg-white/5"
                                                    title="Alert schließen"
                                                >
                                                    Schließen
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Plan-Info */}
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-xs text-slate-500 capitalize">{plan}-Plan · {sites.length}/{maxSites} Websites</span>
                            {sites.length >= maxSites && (
                                <Link href="/monitoring/pricing" className="text-xs text-violet-400 hover:text-violet-300">
                                    Upgrade für mehr Websites →
                                </Link>
                            )}
                        </div>

                        {/* Add-Form */}
                        <AnimatePresence>
                            {showAddForm && (
                                <AddSiteForm onAdd={handleAddSite} onClose={() => setShowAddForm(false)} />
                            )}
                        </AnimatePresence>

                        {/* Sites Grid */}
                        {sites.length === 0 ? (
                            <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
                                <Shield className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                                <p className="text-slate-400 mb-4">Noch keine Websites überwacht</p>
                                <button
                                    onClick={() => setShowAddForm(true)}
                                    className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1 mx-auto"
                                >
                                    <Plus className="w-4 h-4" /> Erste Website hinzufügen
                                </button>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 gap-4">
                                {sites.map(site => (
                                    <SiteCard
                                        key={site._id}
                                        site={site}
                                        onDelete={handleDelete}
                                        onCheck={handleCheck}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}