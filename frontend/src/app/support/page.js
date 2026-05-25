'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Search, Mail, Hash, ArrowRight, Clock, Wrench, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const STATUS_CONFIG = {
    open:        { label: 'Warten auf Support', icon: Clock,         color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
    in_progress: { label: 'Wird bearbeitet',    icon: Wrench,        color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20' },
    closed:      { label: 'Geschlossen',         icon: CheckCircle,   color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
}

export default function SupportPage() {
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
            setError(err.message || 'Fehler bei der Suche.')
        } finally {
            setLoading(false)
        }
    }

    function goToTicket(e) {
        e.preventDefault()
        const id = ticketId.trim().toUpperCase()
        if (!id) return
        window.location.href = `/support/${id}`
    }

    return (
        <div className="min-h-screen bg-[#080b14]">
            <nav className="border-b border-white/5 bg-[#080b14]/90 backdrop-blur-xl">
                <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-white">Audit<span className="text-cyan-400">AI</span></span>
                    </Link>
                </div>
            </nav>

            <div className="max-w-lg mx-auto px-5 py-16">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-2xl font-bold text-white mb-1 text-center">Support-Tickets</h1>
                    <p className="text-slate-400 text-sm text-center mb-8">
                        Finde dein Ticket per E-Mail oder Ticketnummer.
                    </p>

                    {/* Tabs */}
                    <div className="flex gap-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 mb-6">
                        <button
                            onClick={() => { setTab('email'); setTickets(null); setError('') }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                                tab === 'email' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            <Mail className="w-3.5 h-3.5" /> Per E-Mail suchen
                        </button>
                        <button
                            onClick={() => { setTab('number'); setTickets(null); setError('') }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                                tab === 'number' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            <Hash className="w-3.5 h-3.5" /> Ticketnummer eingeben
                        </button>
                    </div>

                    {/* E-Mail Suche */}
                    {tab === 'email' && (
                        <form onSubmit={searchByEmail} className="space-y-3">
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="deine@email.de"
                                    required
                                    className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500/50 transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-all"
                                >
                                    {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-4 h-4" />}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Ticketnummer */}
                    {tab === 'number' && (
                        <form onSubmit={goToTicket} className="flex gap-2">
                            <input
                                type="text"
                                value={ticketId}
                                onChange={e => setTicketId(e.target.value)}
                                placeholder="TK-XXXXXXXX"
                                className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 font-mono outline-none focus:border-violet-500/50 transition-colors uppercase"
                            />
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    )}

                    {error && (
                        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mt-4">{error}</p>
                    )}

                    {/* Ergebnisse */}
                    <AnimatePresence>
                        {tickets !== null && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 space-y-3"
                            >
                                {tickets.length === 0 ? (
                                    <p className="text-center text-slate-500 text-sm py-8">
                                        Keine Tickets für diese E-Mail-Adresse gefunden.
                                    </p>
                                ) : (
                                    <>
                                        <p className="text-xs text-slate-500 mb-3">{tickets.length} Ticket{tickets.length !== 1 ? 's' : ''} gefunden</p>
                                        {tickets.map(ticket => {
                                            const cfg = STATUS_CONFIG[ticket.status] || STATUS_CONFIG.open
                                            const Icon = cfg.icon
                                            return (
                                                <Link
                                                    key={ticket.ticketNumber}
                                                    href={`/support/${ticket.ticketNumber}`}
                                                    className="flex items-center justify-between gap-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] rounded-xl px-5 py-4 transition-all group"
                                                >
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <span className="font-mono text-xs font-bold text-violet-300">{ticket.ticketNumber}</span>
                                                            <span className={`text-xs px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.color} flex items-center gap-1`}>
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
