'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, LogOut, ChevronDown, Send } from 'lucide-react'
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
    const [expanded, setExpanded] = useState(null)
    const [details, setDetails] = useState({})
    const [replyText, setReplyText] = useState('')
    const [sending, setSending] = useState(false)
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

    async function toggleExpand(ticketNumber) {
        if (expanded === ticketNumber) {
            setExpanded(null)
            return
        }
        setExpanded(ticketNumber)
        setReplyText('')
        if (!details[ticketNumber]) {
            const res = await fetch(`/api/admin-support/${ticketNumber}`)
            if (res.ok) {
                const data = await res.json()
                setDetails(d => ({ ...d, [ticketNumber]: data }))
            }
        }
    }

    async function sendReply(ticketNumber) {
        const text = replyText.trim()
        if (!text || sending) return
        setSending(true)
        try {
            const res = await fetch(`/api/admin-support/${ticketNumber}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ body: text }),
            })
            if (res.ok) {
                const data = await res.json()
                setDetails(d => ({ ...d, [ticketNumber]: { ...d[ticketNumber], messages: data.messages } }))
                setReplyText('')
            }
        } finally {
            setSending(false)
        }
    }

    async function handleLogout() {
        await fetch('/api/admin-auth', { method: 'DELETE' })
        router.push('/support/admin/login')
    }

    return (
        <div className="min-h-screen bg-[var(--bg-base)]">
            <nav className="border-b border-[var(--text-white)]/5 bg-[var(--bg-base)]/90 backdrop-blur-xl">
                <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                                <svg className="w-4 h-4 text-[var(--text-white)]" viewBox="0 0 192 192" fill="none"><circle cx="96" cy="96" r="50" stroke="currentColor" strokeWidth="14" /><circle cx="110" cy="82" r="13" fill="currentColor" /></svg>
                            </div>
                            <span className="font-bold text-[var(--text-white)]">Scanora</span>
                        </Link>
                        <span className="text-xs text-[var(--text-faint)]">/ Support Admin</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchTickets}
                            className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-white)] transition-colors"
                        >
                            <RefreshCw className="w-3.5 h-3.5" /> Aktualisieren
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-xs text-[var(--text-faint)] hover:text-red-400 transition-colors"
                        >
                            <LogOut className="w-3.5 h-3.5" /> Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold text-[var(--text-white)]">Support-Tickets</h1>
                    <span className="text-xs text-[var(--text-faint)]">{tickets.length} Ticket{tickets.length !== 1 ? 's' : ''}</span>
                </div>

                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                {loading && (
                    <div className="flex items-center gap-3 text-[var(--text-muted)] text-sm">
                        <div className="w-4 h-4 border-2 border-[var(--border-strong)] border-t-violet-500 rounded-full animate-spin" />
                        Lade Tickets...
                    </div>
                )}

                {!loading && tickets.length === 0 && !error && (
                    <p className="text-[var(--text-faint)] text-sm">Keine Tickets vorhanden.</p>
                )}

                <div className="space-y-3">
                    {tickets.map(ticket => {
                        const cfg = STATUS_CONFIG[ticket.status] || STATUS_CONFIG.open
                        return (
                            <motion.div
                                key={ticket.ticketNumber}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[var(--text-white)]/[0.02] border border-[var(--text-white)]/[0.06] rounded-2xl p-5"
                            >
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="font-mono text-sm font-bold text-violet-300">{ticket.ticketNumber}</span>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                                                {cfg.label}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold text-[var(--text-white)] truncate">{ticket.subject}</p>
                                        <p className="text-xs text-[var(--text-faint)] mt-0.5">
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
                                        <button
                                            onClick={() => toggleExpand(ticket.ticketNumber)}
                                            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-[var(--text-white)]/10 text-[var(--text-muted)] hover:text-[var(--text-white)] transition-colors"
                                        >
                                            Bearbeiten
                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded === ticket.ticketNumber ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {expanded === ticket.ticketNumber && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-4 pt-4 border-t border-[var(--text-white)]/[0.06] space-y-3">
                                                {!details[ticket.ticketNumber] ? (
                                                    <p className="text-xs text-[var(--text-faint)]">Lade Verlauf...</p>
                                                ) : (
                                                    <>
                                                        <div className="bg-[var(--text-white)]/[0.03] rounded-xl p-4">
                                                            <p className="text-xs text-[var(--text-faint)] mb-1">Ursprüngliche Nachricht</p>
                                                            <p className="text-sm text-[var(--text-body)] whitespace-pre-wrap">{details[ticket.ticketNumber].message}</p>
                                                        </div>
                                                        {(details[ticket.ticketNumber].messages || []).map((m, i) => (
                                                            <div
                                                                key={i}
                                                                className={`rounded-xl p-4 max-w-[85%] ${
                                                                    m.author === 'admin'
                                                                        ? 'bg-violet-500/10 border border-violet-500/20 ml-auto'
                                                                        : 'bg-[var(--text-white)]/[0.03]'
                                                                }`}
                                                            >
                                                                <p className="text-xs text-[var(--text-faint)] mb-1">
                                                                    {m.author === 'admin' ? 'Support-Team' : ticket.name} ·{' '}
                                                                    {new Date(m.createdAt).toLocaleString('de-DE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                                </p>
                                                                <p className="text-sm text-[var(--text-body)] whitespace-pre-wrap">{m.body}</p>
                                                            </div>
                                                        ))}
                                                        <div className="flex gap-2 pt-1">
                                                            <textarea
                                                                value={replyText}
                                                                onChange={e => setReplyText(e.target.value)}
                                                                placeholder="Antwort schreiben..."
                                                                rows={2}
                                                                className="flex-1 bg-[var(--text-white)]/[0.03] border border-[var(--text-white)]/10 rounded-xl px-3 py-2 text-sm text-[var(--text-white)] placeholder:text-[var(--text-faint)] resize-none focus:outline-none focus:border-violet-500/40"
                                                            />
                                                            <button
                                                                onClick={() => sendReply(ticket.ticketNumber)}
                                                                disabled={sending || !replyText.trim()}
                                                                className="flex items-center gap-1.5 px-4 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-300 text-sm font-medium hover:bg-violet-500/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                                            >
                                                                <Send className="w-3.5 h-3.5" /> Senden
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}