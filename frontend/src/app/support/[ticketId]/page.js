'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Clock, Wrench, CheckCircle, XCircle, Send } from 'lucide-react'
import Link from 'next/link'

const STATUSES = [
    {
        key: 'open',
        label: 'Warten auf Support',
        description: 'Dein Ticket ist eingegangen und wartet auf Bearbeitung.',
        icon: Clock,
        color: 'text-(--warning)',
        bg: 'bg-(--warning-soft)',
        border: 'border-(--warning-border)',
        dot: 'bg-(--warning)',
    },
    {
        key: 'in_progress',
        label: 'Wird bearbeitet',
        description: 'Ein Mitarbeiter hat dein Ticket übernommen und arbeitet an einer Lösung.',
        icon: Wrench,
        color: 'text-(--accent-ink)',
        bg: 'bg-(--accent-soft)',
        border: 'border-(--accent-border)',
        dot: 'bg-(--accent)',
    },
    {
        key: 'closed',
        label: 'Ticket geschlossen',
        description: 'Dein Ticket wurde bearbeitet und geschlossen.',
        icon: CheckCircle,
        color: 'text-(--success)',
        bg: 'bg-(--success-soft)',
        border: 'border-(--success-border)',
        dot: 'bg-(--success)',
    },
]

function getStatusIndex(key) {
    return STATUSES.findIndex(s => s.key === key)
}

export default function TicketStatusPage() {
    const { ticketId } = useParams()
    const [ticket, setTicket] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [replyText, setReplyText] = useState('')
    const [sending, setSending] = useState(false)

    useEffect(() => {
        if (!ticketId) return
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/support/${ticketId}`)
            .then(r => {
                if (r.status === 404) { setNotFound(true); return null }
                return r.json()
            })
            .then(data => { if (data) setTicket(data) })
            .finally(() => setLoading(false))
    }, [ticketId])

    async function sendReply() {
        const text = replyText.trim()
        if (!text || sending) return
        setSending(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/support/${ticketId}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ body: text }),
            })
            if (res.ok) {
                const data = await res.json()
                setTicket(t => ({ ...t, status: data.status, messages: data.messages }))
                setReplyText('')
            }
        } finally {
            setSending(false)
        }
    }

    const currentStatus = ticket ? STATUSES.find(s => s.key === ticket.status) : null
    const currentIndex = ticket ? getStatusIndex(ticket.status) : 0

    return (
        <div className="min-h-screen bg-(--bg-base) flex flex-col">
            <nav className="border-b border-(--line) bg-(--bg-base)/90 backdrop-blur-xl">
                <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-(--accent) flex items-center justify-center">
                            <svg className="w-4 h-4 text-(--text-white)" viewBox="0 0 192 192" fill="none"><circle cx="96" cy="96" r="50" stroke="currentColor" strokeWidth="14" /><circle cx="110" cy="82" r="13" fill="currentColor" /></svg>
                        </div>
                        <span className="font-bold text-(--text-white)">Scanora</span>
                    </Link>
                </div>
            </nav>

            <div className="flex-1 flex items-center justify-center px-5 py-16">
                {loading && (
                    <div className="flex items-center gap-3 text-(--text-muted)">
                        <div className="w-5 h-5 border-2 border-(--border-strong) border-t-violet-500 rounded-full animate-spin" />
                        Ticket wird geladen...
                    </div>
                )}

                {notFound && (
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-2xl bg-(--danger-soft) border border-(--danger-border) flex items-center justify-center mx-auto mb-4">
                            <XCircle className="w-7 h-7 text-(--danger)" />
                        </div>
                        <h1 className="text-xl font-bold text-(--text-white) mb-2">Ticket nicht gefunden</h1>
                        <p className="text-(--text-muted) text-sm mb-6">Die Ticketnummer <span className="font-mono text-(--text-body)">{ticketId}</span> existiert nicht.</p>
                        <Link href="/" className="text-(--accent-ink) hover:text-(--accent-ink) text-sm transition-colors">← Zurück zur Startseite</Link>
                    </div>
                )}

                {ticket && currentStatus && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-lg space-y-6"
                    >
                        {/* Header */}
                        <div className="text-center">
                            <p className="text-xs text-(--text-faint) font-semibold mb-1">Support-Ticket</p>
                            <h1 className="text-2xl font-bold text-(--text-white) mb-1 font-mono">{ticket.ticketNumber}</h1>
                            <p className="text-(--text-muted) text-sm">{ticket.subject}</p>
                        </div>

                        {/* Aktueller Status */}
                        <div className={`rounded-2xl border p-5 ${currentStatus.bg} ${currentStatus.border}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-2.5 h-2.5 rounded-full ${currentStatus.dot} animate-pulse`} />
                                <span className={`font-semibold ${currentStatus.color}`}>{currentStatus.label}</span>
                            </div>
                            <p className="text-(--text-muted) text-sm mt-2 ml-5">{currentStatus.description}</p>
                        </div>

                        {/* Fortschritts-Stepper */}
                        <div className="bg-(--card) border border-(--line) rounded-2xl p-6">
                            <p className="text-xs text-(--text-faint) font-semibold mb-5">Verlauf</p>
                            <div className="space-y-0">
                                {STATUSES.map((s, i) => {
                                    const done = i <= currentIndex
                                    const active = i === currentIndex
                                    const Icon = s.icon
                                    return (
                                        <div key={s.key} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                                    active
                                                        ? `${s.bg} ${s.border}`
                                                        : done
                                                            ? 'bg-(--success-soft) border-(--success-border)'
                                                            : 'bg-(--card) border-(--line)'
                                                }`}>
                                                    <Icon className={`w-3.5 h-3.5 ${active ? s.color : done ? 'text-(--success)' : 'text-(--text-faint)'}`} />
                                                </div>
                                                {i < STATUSES.length - 1 && (
                                                    <div className={`w-0.5 h-8 mt-1 ${done && i < currentIndex ? 'bg-(--success)' : 'bg-(--tint)'}`} />
                                                )}
                                            </div>
                                            <div className={`pb-8 ${i === STATUSES.length - 1 ? 'pb-0' : ''}`}>
                                                <p className={`text-sm font-medium mt-1 ${active ? s.color : done ? 'text-(--text-body)' : 'text-(--text-faint)'}`}>
                                                    {s.label}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Meta */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-(--card) border border-(--line) rounded-xl px-4 py-3">
                                <p className="text-xs text-(--text-faint) mb-1">Erstellt am</p>
                                <p className="text-sm text-(--text-body)">
                                    {new Date(ticket.createdAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </p>
                            </div>
                            <div className="bg-(--card) border border-(--line) rounded-xl px-4 py-3">
                                <p className="text-xs text-(--text-faint) mb-1">Zuletzt aktualisiert</p>
                                <p className="text-sm text-(--text-body)">
                                    {new Date(ticket.updatedAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </p>
                            </div>
                        </div>

                        {/* Verlauf & Antworten */}
                        <div className="bg-(--card) border border-(--line) rounded-2xl p-6 space-y-3">
                            <p className="text-xs text-(--text-faint) font-semibold mb-2">Nachrichten</p>

                            <div className="bg-(--card) rounded-xl p-4">
                                <p className="text-xs text-(--text-faint) mb-1">Deine Nachricht</p>
                                <p className="text-sm text-(--text-body) whitespace-pre-wrap">{ticket.message}</p>
                            </div>

                            {(ticket.messages || []).map((m, i) => (
                                <div
                                    key={i}
                                    className={`rounded-xl p-4 ${
                                        m.author === 'admin'
                                            ? 'bg-(--accent-soft) border border-(--accent-border)'
                                            : 'bg-(--card) ml-auto'
                                    }`}
                                >
                                    <p className="text-xs text-(--text-faint) mb-1">
                                        {m.author === 'admin' ? 'Scanora Support' : 'Du'} ·{' '}
                                        {new Date(m.createdAt).toLocaleString('de-DE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                    <p className="text-sm text-(--text-body) whitespace-pre-wrap">{m.body}</p>
                                </div>
                            ))}

                            {ticket.status === 'closed' && (
                                <p className="text-xs text-(--warning)">Dieses Ticket ist geschlossen - eine Antwort öffnet es wieder.</p>
                            )}

                            <div className="flex gap-2 pt-1">
                                <textarea
                                    value={replyText}
                                    onChange={e => setReplyText(e.target.value)}
                                    placeholder="Antwort schreiben..."
                                    rows={2}
                                    className="flex-1 bg-(--card) border border-(--line) rounded-xl px-3 py-2 text-sm text-(--text-white) placeholder:text-(--text-faint) resize-none focus:outline-none focus:border-(--accent) focus:shadow-[0_0_0_4px_var(--accent-ring)]"
                                />
                                <button
                                    onClick={sendReply}
                                    disabled={sending || !replyText.trim()}
                                    className="flex items-center gap-1.5 px-4 rounded-xl bg-(--accent-soft) border border-(--accent-border) text-(--accent-ink) text-sm font-medium hover:bg-(--accent-soft) transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-3.5 h-3.5" /> Senden
                                </button>
                            </div>
                        </div>

                        <p className="text-center text-xs text-(--text-faint)">
                            Diese Seite aktualisiert sich nicht automatisch —{' '}
                            <button onClick={() => window.location.reload()} className="text-(--text-faint) hover:text-(--text-muted) underline underline-offset-2">
                                neu laden
                            </button>
                            {' '}um den aktuellen Status zu sehen.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
