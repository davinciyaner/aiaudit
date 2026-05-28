'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageSquare, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function SupportModal({ open, onClose, defaultName = '', defaultEmail = '' }) {
    const [form, setForm] = useState({ name: defaultName, email: defaultEmail, subject: '', message: '' })
    const [loading, setLoading] = useState(false)
    const [ticketNumber, setTicketNumber] = useState(null)
    const [error, setError] = useState('')

    function set(field) {
        return (e) => setForm(f => ({ ...f, [field]: e.target.value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/support`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Fehler beim Erstellen des Tickets.')
            setTicketNumber(data.ticketNumber)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    function handleClose() {
        onClose()
        setTimeout(() => {
            setForm({ name: defaultName, email: defaultEmail, subject: '', message: '' })
            setTicketNumber(null)
            setError('')
        }, 300)
    }

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 16 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="w-full max-w-lg bg-[#0d1117] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 pointer-events-auto">
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                                        <MessageSquare className="w-4 h-4 text-violet-400" />
                                    </div>
                                    <span className="font-semibold text-white">Support-Ticket erstellen</span>
                                </div>
                                <button onClick={handleClose} className="text-slate-500 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="px-6 py-6">
                                {ticketNumber ? (
                                    <SuccessView ticketNumber={ticketNumber} onClose={handleClose} />
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Field label="Name" value={form.name} onChange={set('name')} placeholder="Max Mustermann" required />
                                            <Field label="E-Mail" type="email" value={form.email} onChange={set('email')} placeholder="max@beispiel.de" required />
                                        </div>
                                        <Field label="Betreff" value={form.subject} onChange={set('subject')} placeholder="Kurze Beschreibung des Problems" required />
                                        <div>
                                            <label className="block text-xs font-medium text-slate-400 mb-1.5">Nachricht</label>
                                            <textarea
                                                value={form.message}
                                                onChange={set('message')}
                                                placeholder="Beschreibe dein Anliegen so detailliert wie möglich..."
                                                rows={5}
                                                required
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500/50 resize-none transition-colors"
                                            />
                                        </div>
                                        {error && (
                                            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all"
                                        >
                                            {loading ? (
                                                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Wird gesendet...</>
                                            ) : (
                                                <>Ticket erstellen<ArrowRight className="w-4 h-4" /></>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

function Field({ label, type = 'text', value, onChange, placeholder, required }) {
    return (
        <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500/50 transition-colors"
            />
        </div>
    )
}

function SuccessView({ ticketNumber, onClose }) {
    return (
        <div className="text-center py-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Ticket erstellt!</h3>
            <p className="text-slate-400 text-sm mb-4">
                Du erhältst eine Bestätigung per E-Mail. Deine Ticketnummer:
            </p>
            <div className="inline-block bg-violet-500/10 border border-violet-500/20 rounded-xl px-5 py-2 mb-6">
                <span className="text-violet-300 font-mono font-bold tracking-widest text-lg">{ticketNumber}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                    href={`/support/${ticketNumber}`}
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all"
                >
                    Status verfolgen
                    <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Link
                    href="/support"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm rounded-xl transition-all"
                >
                    Alle meine Tickets
                </Link>
            </div>
        </div>
    )
}
