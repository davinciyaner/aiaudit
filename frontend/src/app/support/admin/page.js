'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Zap, RefreshCw, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const STATUS_CONFIG = {
    open:        { label: 'Warten auf Support', color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
    in_progress: { label: 'Wird bearbeitet',    color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20' },
    closed:      { label: 'Geschlossen',         color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
}

export default function SupportAdminPage() {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const router = useRouter()

    const fetchTickets = useCallback(async () => {
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/admin-support')
            if (res.status === 403 || res.status === 401) {
                router.push('/support/admin/login')
                return
            }
            const data = await res.json()
            setTickets(data)
        } catch {
            setError('Verbindungsfehler.')
        } finally {
            setLoading(false)
        }
    }, [router])

    useEffect(() => { fetchTickets() }, [fetchTickets])

    async function updateStatus(ticketNumber, status) {
        const prev = tickets
        setTickets(ts => ts.map(t => t.ticketNumber === ticketNumber ? { ...t, status } : t))
        const res = await fetch(`/api/admin-support/${ticketNumber}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        })
        if (!res.ok) setTickets(prev)
    }

    async function handleLogout() {
        await fetch('/api/admin-auth', { method: 'DELETE' })
        router.push('/support/admin/login')
    }

    return (
        <div className="min-h-screen bg-[#080b14]">
            <nav className="border-b border-white/5 bg-[#080b14]/90 backdrop-blur-xl">
                <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-white">Audit<span className="text-cyan-400">AI</span></span>
                        </Link>
                        <span className="text-xs text-slate-600">/ Support Admin</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchTickets}
                            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
                        >
                            <RefreshCw className="w-3.5 h-3.5" /> Aktualisieren
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-xs text-slate-500 hover:text-red-400 transition-colors"
                        >
                            <LogOut className="w-3.5 h-3.5" /> Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold text-white">Support-Tickets</h1>
                    <span className="text-xs text-slate-500">{tickets.length} Ticket{tickets.length !== 1 ? 's' : ''}</span>
                </div>

                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                {loading && (
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                        <div className="w-4 h-4 border-2 border-slate-600 border-t-violet-500 rounded-full animate-spin" />
                        Lade Tickets...
                    </div>
                )}

                {!loading && tickets.length === 0 && !error && (
                    <p className="text-slate-500 text-sm">Keine Tickets vorhanden.</p>
                )}

                <div className="space-y-3">
                    {tickets.map(ticket => {
                        const cfg = STATUS_CONFIG[ticket.status] || STATUS_CONFIG.open
                        return (
                            <motion.div
                                key={ticket.ticketNumber}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5"
                            >
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="font-mono text-sm font-bold text-violet-300">{ticket.ticketNumber}</span>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                                                {cfg.label}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold text-white truncate">{ticket.subject}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            {ticket.name} · {ticket.email} ·{' '}
                                            {new Date(ticket.createdAt).toLocaleDateString('de-DE', {
                                                day: '2-digit', month: 'short', year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0 flex-wrap">
                                        {Object.entries(STATUS_CONFIG)
                                            .filter(([key]) => key !== ticket.status)
                                            .map(([key, c]) => (
                                                <button
                                                    key={key}
                                                    onClick={() => updateStatus(ticket.ticketNumber, key)}
                                                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all hover:opacity-80 ${c.bg} ${c.border} ${c.color}`}
                                                >
                                                    → {c.label}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}