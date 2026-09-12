'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Fehler beim Senden')
            setSent(true)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center px-5 py-12">

            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-100 rounded-full blur-3xl pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse, var(--accent-glow), transparent 70%)' }} />
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md">

                <div className="flex justify-center mb-8">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center shadow-lg shadow-[var(--accent-border)] active:scale-[0.97] active:duration-75">
                            <svg className="w-4 h-4 text-[var(--bg-base)]" viewBox="0 0 192 192" fill="none"><circle cx="96" cy="96" r="50" stroke="currentColor" strokeWidth="14" /><circle cx="110" cy="82" r="13" fill="currentColor" /></svg>
                        </div>
                        <span className="text-xl font-bold text-[var(--text-white)]">Scanora</span>
                    </Link>
                </div>

                {sent ? (
                    <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                                <CheckCircle className="w-7 h-7 text-emerald-400" strokeWidth={1.5} />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-[var(--text-white)] mb-3">E-Mail gesendet</h1>
                        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
                            Falls ein Account mit <strong className="text-[var(--text-body)]">{email}</strong> existiert, haben wir einen Reset-Link gesendet. Bitte prüfe auch deinen Spam-Ordner.
                        </p>
                        <p className="text-xs text-[var(--text-faint)] mb-6">Der Link ist 1 Stunde gültig.</p>
                        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-[var(--text-white)] hover:text-[var(--accent)] transition-colors font-medium">
                            <ArrowLeft className="w-4 h-4" /> Zurück zum Login
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-[var(--text-white)] mb-2">Passwort vergessen?</h1>
                            <p className="text-[var(--text-muted)] text-sm">Gib deine E-Mail ein – wir schicken dir einen Reset-Link.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-sm text-[var(--text-body)] mb-2 block font-medium">E-Mail</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-faint)]" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="du@beispiel.de"
                                        required
                                        className="w-full bg-[var(--surface-06)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] focus:border-[var(--accent-border)] rounded-xl pl-11 pr-4 py-3.5 text-[var(--text-white)] placeholder:text-[var(--text-faint)] outline-none transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] font-semibold transition-all duration-200 shadow-lg shadow-[var(--accent-border)] active:scale-[0.97] active:duration-75 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                                {loading ? (
                                    <><div className="w-4 h-4 border-2 border-[var(--bg-base)]/30 border-t-[var(--bg-base)] rounded-full animate-spin" />Wird gesendet...</>
                                ) : (
                                    <>Reset-Link senden <ArrowRight className="w-4 h-4" /></>
                                )}
                            </motion.button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors">
                                <ArrowLeft className="w-3.5 h-3.5" /> Zurück zum Login
                            </Link>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    )
}