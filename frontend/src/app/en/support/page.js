'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Mail, Hash, ArrowRight, Clock, Wrench, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const STATUS_CONFIG = {
    open:        { label: 'Waiting for support', icon: Clock,         color: 'text-(--warning)',   bg: 'bg-(--warning-soft)',   border: 'border-(--warning-border)' },
    in_progress: { label: 'In progress',         icon: Wrench,        color: 'text-(--accent-ink)',    bg: 'bg-(--accent-soft)',    border: 'border-(--accent-border)' },
    closed:      { label: 'Closed',              icon: CheckCircle,   color: 'text-(--success)', bg: 'bg-(--success-soft)', border: 'border-(--success-border)' },
}

export default function SupportPageEn() {
    const [tab, setTab] = useState('email')
    const [email, setEmail] = useState('')
    const [ticketId, setTicketId] = useState('')
    const [tickets, setTickets] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function searchByEmail(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/support/by-email?email=${encodeURIComponent(email)}`)
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            setTickets(data)
        } catch (err) {
            setError(err.message || 'Error searching.')
        } finally {
            setLoading(false)
        }
    }

    function goToTicket(e) {
        e.preventDefault()
        const id = ticketId.trim().toUpperCase()
        if (!/^[A-Z0-9-]{1,20}$/.test(id)) {
            setError('Invalid ticket number.')
            return
        }
        window.location.href = `/en/support/${id}`
    }

    return (
        <div className="min-h-screen bg-(--bg-base)">
            <nav className="border-b border-(--line) bg-(--bg-base)/90 backdrop-blur-xl">
                <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center">
                    <Link href="/en" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-(--accent) flex items-center justify-center">
                            <svg className="w-4 h-4 text-(--text-white)" viewBox="0 0 192 192" fill="none"><circle cx="96" cy="96" r="50" stroke="currentColor" strokeWidth="14" /><circle cx="110" cy="82" r="13" fill="currentColor" /></svg>
                        </div>
                        <span className="font-bold text-(--text-white)">Scanora</span>
                    </Link>
                </div>
            </nav>

            <div className="max-w-lg mx-auto px-5 py-16">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-2xl font-bold text-(--text-white) mb-1 text-center">Support Tickets</h1>
                    <p className="text-(--text-muted) text-sm text-center mb-8">
                        Find your ticket by email or ticket number.
                    </p>

                    {/* Tabs */}
                    <div className="flex gap-1 bg-(--card) border border-(--line) rounded-xl p-1 mb-6">
                        <button
                            onClick={() => { setTab('email'); setTickets(null); setError('') }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                                tab === 'email' ? 'bg-(--tint) text-(--text-white)' : 'text-(--text-faint) hover:text-(--text-body)'
                            }`}
                        >
                            <Mail className="w-3.5 h-3.5" /> Search by email
                        </button>
                        <button
                            onClick={() => { setTab('number'); setTickets(null); setError('') }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                                tab === 'number' ? 'bg-(--tint) text-(--text-white)' : 'text-(--text-faint) hover:text-(--text-body)'
                            }`}
                        >
                            <Hash className="w-3.5 h-3.5" /> Enter ticket number
                        </button>
                    </div>

                    {/* Email search */}
                    {tab === 'email' && (
                        <form onSubmit={searchByEmail} className="space-y-3">
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="flex-1 bg-(--card) border border-(--line) rounded-xl px-4 py-2.5 text-sm text-(--text-white) placeholder-(--text-faint) outline-none focus:border-(--accent) focus:shadow-[0_0_0_4px_var(--accent-ring)] transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-(--accent) hover:bg-(--accent-hover) disabled:opacity-50 text-(--on-accent) text-sm font-semibold rounded-xl transition-all"
                                >
                                    {loading ? <div className="w-4 h-4 border-2 border-(--border-strong) border-t-white rounded-full animate-spin" /> : <Search className="w-4 h-4" />}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Ticket number */}
                    {tab === 'number' && (
                        <form onSubmit={goToTicket} className="flex gap-2">
                            <input
                                type="text"
                                value={ticketId}
                                onChange={e => setTicketId(e.target.value)}
                                placeholder="TK-XXXXXXXX"
                                className="flex-1 bg-(--card) border border-(--line) rounded-xl px-4 py-2.5 text-sm text-(--text-white) placeholder-(--text-faint) font-mono outline-none focus:border-(--accent) focus:shadow-[0_0_0_4px_var(--accent-ring)] transition-colors uppercase"
                            />
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-5 py-2.5 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) text-sm font-semibold rounded-xl transition-all"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    )}

                    {error && (
                        <p className="text-sm text-(--danger) bg-(--danger-soft) border border-(--danger-border) rounded-xl px-4 py-3 mt-4">{error}</p>
                    )}

                    {/* Results */}
                    <AnimatePresence>
                        {tickets !== null && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 space-y-3"
                            >
                                {tickets.length === 0 ? (
                                    <p className="text-center text-(--text-faint) text-sm py-8">
                                        No tickets found for this email address.
                                    </p>
                                ) : (
                                    <>
                                        <p className="text-xs text-(--text-faint) mb-3">{tickets.length} ticket{tickets.length !== 1 ? 's' : ''} found</p>
                                        {tickets.map(ticket => {
                                            const cfg = STATUS_CONFIG[ticket.status] || STATUS_CONFIG.open
                                            const Icon = cfg.icon
                                            return (
                                                <Link
                                                    key={ticket.ticketNumber}
                                                    href={`/en/support/${ticket.ticketNumber}`}
                                                    className="flex items-center justify-between gap-4 bg-(--card) hover:bg-(--tint) border border-(--line) rounded-xl px-5 py-4 transition-all group"
                                                >
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <span className="font-mono text-xs font-bold text-(--accent-ink)">{ticket.ticketNumber}</span>
                                                            <span className={`text-xs px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.color} flex items-center gap-1`}>
                                                                <Icon className="w-3 h-3" />
                                                                {cfg.label}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-(--text-body) truncate">{ticket.subject}</p>
                                                        <p className="text-xs text-(--text-faint) mt-0.5">
                                                            {new Date(ticket.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                        </p>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-(--text-faint) group-hover:text-(--text-muted) shrink-0 transition-colors" />
                                                </Link>
                                            )
                                        })}
                                    </>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    )
}
