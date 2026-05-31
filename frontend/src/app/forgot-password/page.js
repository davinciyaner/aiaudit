'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

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
        <div className="min-h-screen bg-[#05080f] flex items-center justify-center px-5 py-12">
            <Toaster position="top-right" toastOptions={{ style: { background: '#0d1117', color: '#fff', border: '1px solid rgba(255,255,255,0.08)', maxWidth: 'calc(100vw - 2rem)' } }} />

            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-100 rounded-full blur-3xl pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.12), transparent 70%)' }} />
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md">

                <div className="flex justify-center mb-8">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-bold text-white">Audit<span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">AI</span></span>
                    </Link>
                </div>

                {sent ? (
                    <div className="bg-white/3 border border-white/8 rounded-2xl p-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                                <CheckCircle className="w-7 h-7 text-emerald-400" strokeWidth={1.5} />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-3">E-Mail gesendet</h1>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Falls ein Account mit <strong className="text-slate-300">{email}</strong> existiert, haben wir einen Reset-Link gesendet. Bitte prüfe auch deinen Spam-Ordner.
                        </p>
                        <p className="text-xs text-slate-600 mb-6">Der Link ist 1 Stunde gültig.</p>
                        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium">
                            <ArrowLeft className="w-4 h-4" /> Zurück zum Login
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Passwort vergessen?</h1>
                            <p className="text-slate-400 text-sm">Gib deine E-Mail ein – wir schicken dir einen Reset-Link.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-sm text-slate-300 mb-2 block font-medium">E-Mail</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="du@beispiel.de"
                                        required
                                        className="w-full bg-white/3 border border-white/10 hover:border-white/15 focus:border-violet-500/60 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                                {loading ? (
                                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Wird gesendet...</>
                                ) : (
                                    <>Reset-Link senden <ArrowRight className="w-4 h-4" /></>
                                )}
                            </motion.button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-400 transition-colors">
                                <ArrowLeft className="w-3.5 h-3.5" /> Zurück zum Login
                            </Link>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    )
}