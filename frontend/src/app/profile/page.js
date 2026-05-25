'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    User, Mail, Crown, Building2, Zap, BarChart2,
    Receipt, Download, AlertTriangle, Loader2, CheckCircle, XCircle,
    MessageSquare, Clock, Wrench, ArrowRight, Plus
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import SupportModal from '../components/SupportModal'

const TICKET_STATUS = {
    open:        { label: 'Warten auf Support', icon: Clock,         color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
    in_progress: { label: 'Wird bearbeitet',    icon: Wrench,        color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20' },
    closed:      { label: 'Geschlossen',         icon: CheckCircle,   color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
}

const PLAN_META = {
    free:   { label: 'Free',   color: '#64748b', icon: Zap,       limit: 1 },
    pro:    { label: 'Pro',    color: '#7c3aed', icon: Crown,     limit: 10 },
    agency: { label: 'Agency', color: '#06b6d4', icon: Building2, limit: null },
}

function StatCard({ label, value, sub, color }) {
    return (
        <div className="bg-white/2 border border-white/6 rounded-2xl p-6">
            <div className="text-sm text-slate-500 mb-1">{label}</div>
            <div className="text-3xl font-bold text-white" style={color ? { color } : {}}>{value}</div>
            {sub && <div className="text-xs text-slate-600 mt-1">{sub}</div>}
        </div>
    )
}

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState(null)
    const [billing, setBilling] = useState([])
    const [loading, setLoading] = useState(true)
    const [cancelling, setCancelling] = useState(false)
    const [showCancelConfirm, setShowCancelConfirm] = useState(false)
    const [downloadingId, setDownloadingId] = useState(null)
    const [tickets, setTickets] = useState([])
    const [ticketsLoading, setTicketsLoading] = useState(false)
    const [supportOpen, setSupportOpen] = useState(false)
    const [ticketsExpanded, setTicketsExpanded] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) { router.push('/login'); return }
        fetchAll(token)
    }, [])

    const fetchAll = async (token) => {
        try {
            const headers = { Authorization: `Bearer ${token}` }
            const [profileRes, billingRes] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, { headers }),
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/billing`, { headers }),
            ])
            const profile = await profileRes.json()
            const billingData = await billingRes.json()
            setData(profile)
            setBilling(billingData.transactions || [])
            if (profile?.user?.email) fetchTickets(profile.user.email)
        } catch {
            toast.error('Profil konnte nicht geladen werden')
        } finally {
            setLoading(false)
        }
    }

    const fetchTickets = async (email) => {
        setTicketsLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/support/by-email?email=${encodeURIComponent(email)}`)
            const data = await res.json()
            if (res.ok) setTickets(data)
        } catch { /* ignore */ } finally {
            setTicketsLoading(false)
        }
    }

    const handleCancel = async () => {
        setCancelling(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/cancel`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            })
            if (!res.ok) throw new Error((await res.json()).error)
            toast.success('Abo erfolgreich gekündigt')
            setShowCancelConfirm(false)
            fetchAll(token)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setCancelling(false)
        }
    }

    const handleDownloadInvoice = async (transactionId) => {
        setDownloadingId(transactionId)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/invoice/${transactionId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (!res.ok) throw new Error('Download fehlgeschlagen')
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `rechnung-${transactionId}.pdf`
            a.click()
            URL.revokeObjectURL(url)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setDownloadingId(null)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#05080f] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
            </div>
        )
    }

    const plan = data?.subscription?.plan || 'free'
    const planMeta = PLAN_META[plan]
    const PlanIcon = planMeta.icon
    const auditsUsed = data?.audits?.used ?? 0
    const auditsLimit = data?.audits?.limit
    const auditsProgress = auditsLimit ? Math.min(100, (auditsUsed / auditsLimit) * 100) : 0
    const initials = data?.user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '??'

    return (
        <div className="min-h-screen bg-[#05080f]">
            <Toaster position="top-right" toastOptions={{ style: { background: '#0d1117', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' } }} />
            <Navbar />

            <div className="relative pt-28 pb-24 px-5 sm:px-8">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-75 rounded-full blur-3xl pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%)' }} />

                <div className="relative z-10 max-w-3xl mx-auto space-y-6">

                    {/* Profile Header */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-white/2 border border-white/6 rounded-2xl p-8 flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-lg shadow-violet-500/20">
                            {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-2xl font-bold text-white">{data?.user?.name}</h1>
                            <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                                <Mail className="w-3.5 h-3.5" />
                                {data?.user?.email}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border"
                            style={{ borderColor: planMeta.color + '40', background: planMeta.color + '10', color: planMeta.color }}>
                            <PlanIcon className="w-4 h-4" />
                            <span className="text-sm font-semibold">{planMeta.label}</span>
                        </div>
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                        className="grid grid-cols-3 gap-4">
                        <StatCard label="Audits diesen Monat" value={auditsUsed} sub={auditsLimit ? `von ${auditsLimit} verfügbar` : 'Unbegrenzt'} />
                        <StatCard label="Audits gesamt" value={data?.audits?.total ?? 0} />
                        <StatCard label="Abo-Status"
                            value={data?.subscription?.status === 'ACTIVE' ? 'Aktiv' : data?.subscription?.status === 'CANCELLED' ? 'Gekündigt' : 'Free'}
                            color={data?.subscription?.status === 'ACTIVE' ? '#22c55e' : data?.subscription?.status === 'CANCELLED' ? '#ef4444' : '#64748b'}
                        />
                    </motion.div>

                    {/* Audit Usage Bar */}
                    {auditsLimit && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="bg-white/2 border border-white/6 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2">
                                    <BarChart2 className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-medium text-slate-300">Audit-Nutzung diesen Monat</span>
                                </div>
                                <span className="text-sm font-bold text-white">{auditsUsed} / {auditsLimit}</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${auditsProgress}%` }}
                                    transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                                    className="h-full rounded-full"
                                    style={{
                                        background: auditsProgress >= 90
                                            ? 'linear-gradient(to right, #ef4444, #f97316)'
                                            : 'linear-gradient(to right, #7c3aed, #06b6d4)'
                                    }}
                                />
                            </div>
                            {auditsProgress >= 90 && (
                                <div className="flex items-center gap-2 mt-3 text-amber-400 text-xs">
                                    <AlertTriangle className="w-3.5 h-3.5" />
                                    Fast aufgebraucht —{' '}
                                    <Link href="/pricing" className="underline underline-offset-2 hover:text-amber-300">Upgrade holen</Link>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Subscription Management */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        className="bg-white/2 border border-white/6 rounded-2xl p-6">
                        <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
                            <Crown className="w-4 h-4 text-violet-400" /> Abonnement
                        </h2>

                        {plan === 'free' ? (
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-slate-300 text-sm">Du nutzt aktuell den Free-Plan</div>
                                    <div className="text-slate-500 text-xs mt-1">1 Audit pro Monat inklusive</div>
                                </div>
                                <Link href="/pricing"
                                    className="px-5 py-2.5 bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20">
                                    Upgrade
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-slate-300 text-sm">
                                            {planMeta.label}-Plan ·{' '}
                                            <span style={{ color: planMeta.color }}>
                                                {data?.subscription?.status === 'ACTIVE' ? 'Aktiv' : 'Gekündigt'}
                                            </span>
                                        </div>
                                        {data?.subscription?.since && (
                                            <div className="text-slate-500 text-xs mt-1">
                                                Seit {new Date(data.subscription.since).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
                                            </div>
                                        )}
                                    </div>
                                    {data?.subscription?.status === 'ACTIVE' && !showCancelConfirm && (
                                        <button onClick={() => setShowCancelConfirm(true)}
                                            className="px-4 py-2 border border-red-500/20 text-red-400 hover:bg-red-500/10 text-sm rounded-xl transition-all">
                                            Kündigen
                                        </button>
                                    )}
                                </div>

                                {showCancelConfirm && (
                                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                                        className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                                        <div className="flex items-start gap-3 mb-4">
                                            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-sm font-semibold text-red-300 mb-1">Abo wirklich kündigen?</div>
                                                <div className="text-xs text-slate-400 leading-relaxed">
                                                    Dein Abo bleibt bis zum Ende des aktuellen Abrechnungszeitraums aktiv.
                                                    Danach wirst du auf den Free-Plan zurückgestuft.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button onClick={handleCancel} disabled={cancelling}
                                                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-50">
                                                {cancelling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                                                Ja, jetzt kündigen
                                            </button>
                                            <button onClick={() => setShowCancelConfirm(false)}
                                                className="px-4 py-2 border border-white/10 text-slate-300 hover:text-white text-sm rounded-xl transition-all">
                                                Abbrechen
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </motion.div>

                    {/* Billing History */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="bg-white/2 border border-white/6 rounded-2xl p-6">
                        <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
                            <Receipt className="w-4 h-4 text-violet-400" /> Abrechnungen
                        </h2>

                        {billing.length === 0 ? (
                            <div className="text-center py-10 text-slate-600 text-sm">
                                Noch keine Abrechnungen vorhanden
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {billing.map((t) => {
                                    const amount = t.amount_with_breakdown?.gross_amount
                                    const date = new Date(t.time).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
                                    return (
                                        <div key={t.id} className="flex items-center justify-between py-3.5 border-b border-white/4 last:border-0">
                                            <div>
                                                <div className="text-sm text-slate-300 font-medium">{date}</div>
                                                <div className="text-xs text-slate-600 mt-0.5">{t.id}</div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1.5">
                                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                                    <span className="text-sm font-semibold text-white">
                                                        {amount?.value} {amount?.currency_code}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => handleDownloadInvoice(t.id)}
                                                    disabled={downloadingId === t.id}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 text-xs rounded-lg transition-all disabled:opacity-50">
                                                    {downloadingId === t.id
                                                        ? <Loader2 className="w-3 h-3 animate-spin" />
                                                        : <Download className="w-3 h-3" />
                                                    }
                                                    PDF
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </motion.div>

                    {/* Support Tickets */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                        className="bg-white/2 border border-white/6 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-base font-semibold text-white flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-violet-400" /> Support-Tickets
                            </h2>
                            <button
                                onClick={() => setSupportOpen(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 text-violet-400 text-xs font-medium rounded-lg transition-all"
                            >
                                <Plus className="w-3.5 h-3.5" /> Neues Ticket
                            </button>
                        </div>

                        {ticketsLoading ? (
                            <div className="flex items-center gap-2 text-slate-500 text-sm py-4">
                                <Loader2 className="w-4 h-4 animate-spin" /> Lade Tickets...
                            </div>
                        ) : (() => {
                            const activeTickets = tickets.filter(t => t.status !== 'closed')
                            if (activeTickets.length === 0) return (
                                <div className="text-center py-8 text-slate-600 text-sm">
                                    Keine offenen Support-Tickets vorhanden
                                </div>
                            )
                            const visible = ticketsExpanded ? activeTickets : activeTickets.slice(0, 1)
                            return (
                                <div>
                                    <div className="divide-y divide-white/4">
                                        {visible.map(ticket => {
                                            const cfg = TICKET_STATUS[ticket.status] || TICKET_STATUS.open
                                            const Icon = cfg.icon
                                            return (
                                                <Link
                                                    key={ticket.ticketNumber}
                                                    href={`/support/${ticket.ticketNumber}`}
                                                    className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0 group"
                                                >
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <span className="font-mono text-xs font-bold text-violet-300">{ticket.ticketNumber}</span>
                                                            <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                                                                <Icon className="w-3 h-3" />
                                                                {cfg.label}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-slate-300 truncate">{ticket.subject}</p>
                                                        <p className="text-xs text-slate-600 mt-0.5">
                                                            {new Date(ticket.createdAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                        </p>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 shrink-0 transition-colors" />
                                                </Link>
                                            )
                                        })}
                                    </div>
                                    {activeTickets.length > 1 && (
                                        <button
                                            onClick={() => setTicketsExpanded(e => !e)}
                                            className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-xs text-slate-500 hover:text-slate-300 border border-white/6 hover:border-white/10 rounded-xl transition-all"
                                        >
                                            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${ticketsExpanded ? '-rotate-90' : 'rotate-90'}`} />
                                            {ticketsExpanded ? 'Weniger anzeigen' : `${activeTickets.length - 1} weitere${activeTickets.length - 1 !== 1 ? '' : 's'} Ticket anzeigen`}
                                        </button>
                                    )}
                                </div>
                            )
                        })()}
                    </motion.div>

                </div>
            </div>

            <SupportModal
                open={supportOpen}
                defaultName={data?.user?.name || ''}
                defaultEmail={data?.user?.email || ''}
                onClose={() => {
                    setSupportOpen(false)
                    if (data?.user?.email) fetchTickets(data.user.email)
                }}
            />
        </div>
    )
}
