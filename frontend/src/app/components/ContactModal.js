'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, ArrowRight, CheckCircle } from 'lucide-react'

const FIXED_SUBJECT = {
    de: 'Kontaktanfrage über die Website',
    en: 'Contact request from the website',
}

export default function ContactModal({ open, onClose, locale = 'de' }) {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
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
                body: JSON.stringify({ ...form, subject: FIXED_SUBJECT[locale] || FIXED_SUBJECT.de, language: locale }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || (locale === 'en' ? 'Error sending your message.' : 'Fehler beim Senden deiner Nachricht.'))
            setSent(true)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    function handleClose() {
        onClose()
        setTimeout(() => {
            setForm({ name: '', email: '', message: '' })
            setSent(false)
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
                        <div className="w-full max-w-lg bg-(--bg-surface) border border-(--border-subtle) rounded-2xl shadow-card-hover pointer-events-auto">
                            <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-(--border-subtle)">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-(--accent-soft) border border-(--accent-border) flex items-center justify-center">
                                        <Send className="w-4 h-4 text-(--accent-ink)" />
                                    </div>
                                    <span className="font-semibold text-(--text-white)">{locale === 'en' ? 'Get in touch' : 'Kontakt aufnehmen'}</span>
                                </div>
                                <button
                                    onClick={handleClose}
                                    aria-label={locale === 'en' ? 'Close' : 'Schließen'}
                                    className="p-3 -mr-2 text-(--text-faint) hover:text-(--text-white) transition-colors rounded-lg hover:bg-(--surface-06)"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="px-4 sm:px-6 py-5 sm:py-6">
                                {sent ? (
                                    <div className="text-center py-4">
                                        <div className="w-14 h-14 rounded-2xl bg-(--success-soft) border border-(--success-border) flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="w-7 h-7 text-(--success)" />
                                        </div>
                                        <h3 className="text-lg font-bold text-(--text-white) mb-2">{locale === 'en' ? 'Message sent!' : 'Nachricht gesendet!'}</h3>
                                        <p className="text-(--text-muted) text-sm mb-6">
                                            {locale === 'en' ? 'We\'ll get back to you as soon as possible.' : 'Wir melden uns so schnell wie möglich bei dir.'}
                                        </p>
                                        <button
                                            onClick={handleClose}
                                            className="px-5 py-2.5 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) text-sm font-semibold rounded-[10px] transition-all"
                                        >
                                            {locale === 'en' ? 'Close' : 'Schließen'}
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Field label={locale === 'en' ? 'Name' : 'Name'} value={form.name} onChange={set('name')} placeholder={locale === 'en' ? 'Jane Doe' : 'Max Mustermann'} required />
                                            <Field label={locale === 'en' ? 'Email' : 'E-Mail'} type="email" value={form.email} onChange={set('email')} placeholder={locale === 'en' ? 'jane@example.com' : 'max@beispiel.de'} required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-(--text-muted) mb-1.5">{locale === 'en' ? 'Message' : 'Nachricht'}</label>
                                            <textarea
                                                value={form.message}
                                                onChange={set('message')}
                                                placeholder={locale === 'en' ? 'What can we help you with?' : 'Wobei können wir dir helfen?'}
                                                rows={5}
                                                required
                                                className="w-full bg-(--card) border border-(--line) rounded-xl px-4 py-3 text-sm text-(--text-white) placeholder-(--text-faint) outline-none focus:border-(--accent) focus:shadow-[0_0_0_4px_var(--accent-ring)] resize-none transition-colors"
                                            />
                                        </div>
                                        {error && (
                                            <p className="text-sm text-(--danger) bg-(--danger-soft) border border-(--danger-border) rounded-xl px-4 py-3">{error}</p>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-(--accent) hover:bg-(--accent-hover) disabled:opacity-50 disabled:cursor-not-allowed text-(--on-accent) text-sm font-semibold rounded-[10px] transition-all"
                                        >
                                            {loading ? (
                                                <><div className="w-4 h-4 border-2 border-(--bg-base)/30 border-t-(--bg-base) rounded-full animate-spin" />{locale === 'en' ? 'Sending...' : 'Wird gesendet...'}</>
                                            ) : (
                                                <>{locale === 'en' ? 'Send message' : 'Nachricht senden'}<ArrowRight className="w-4 h-4" /></>
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
            <label className="block text-xs font-medium text-(--text-muted) mb-1.5">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full bg-(--card) border border-(--line) rounded-xl px-4 py-2.5 text-sm text-(--text-white) placeholder-(--text-faint) outline-none focus:border-(--accent) focus:shadow-[0_0_0_4px_var(--accent-ring)] transition-colors"
            />
        </div>
    )
}
