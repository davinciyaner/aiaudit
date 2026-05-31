'use client'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Lock, ArrowRight, CheckCircle, XCircle } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'

function ResetPasswordForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)

    useEffect(() => {
        if (!token) router.replace('/forgot-password')
    }, [token, router])

    const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3
    const strengthColor = ['', '#ef4444', '#f59e0b', '#22c55e'][passwordStrength]
    const strengthLabel = ['', 'Zu kurz', 'Mittel', 'Stark'][passwordStrength]

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirm) return toast.error('Passwörter stimmen nicht überein')
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Fehler beim Zurücksetzen')
            setDone(true)
            setTimeout(() => router.push('/login'), 3000)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (!token) return null

    return (
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

            {done ? (
                <div className="bg-white/3 border border-white/8 rounded-2xl p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                            <CheckCircle className="w-7 h-7 text-emerald-400" strokeWidth={1.5} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-3">Passwort geändert</h1>
                    <p className="text-slate-400 text-sm">Du wirst automatisch zum Login weitergeleitet...</p>
                </div>
            ) : (
                <>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Neues Passwort</h1>
                        <p className="text-slate-400 text-sm">Wähle ein sicheres Passwort für deinen Account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-sm text-slate-300 mb-2 block font-medium">Neues Passwort</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mindestens 6 Zeichen"
                                    required
                                    minLength={6}
                                    className="w-full bg-white/3 border border-white/10 hover:border-white/15 focus:border-violet-500/60 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all text-sm"
                                />
                            </div>
                            {password.length > 0 && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                                                style={{ background: i <= passwordStrength ? strengthColor : 'rgba(255,255,255,0.06)' }} />
                                        ))}
                                    </div>
                                    <p className="text-xs" style={{ color: strengthColor }}>{strengthLabel}</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="text-sm text-slate-300 mb-2 block font-medium">Passwort bestätigen</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="password"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    placeholder="Passwort wiederholen"
                                    required
                                    className="w-full bg-white/3 border border-white/10 hover:border-white/15 focus:border-violet-500/60 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all text-sm"
                                />
                                {confirm.length > 0 && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        {password === confirm
                                            ? <CheckCircle className="w-4 h-4 text-emerald-400" />
                                            : <XCircle className="w-4 h-4 text-red-400" />
                                        }
                                    </div>
                                )}
                            </div>
                        </div>

                        <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                            {loading ? (
                                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Wird gespeichert...</>
                            ) : (
                                <>Passwort speichern <ArrowRight className="w-4 h-4" /></>
                            )}
                        </motion.button>
                    </form>
                </>
            )}
        </motion.div>
    )
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen bg-[#05080f] flex items-center justify-center px-5 py-12">
            <Toaster position="top-right" toastOptions={{ style: { background: '#0d1117', color: '#fff', border: '1px solid rgba(255,255,255,0.08)', maxWidth: 'calc(100vw - 2rem)' } }} />
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-100 rounded-full blur-3xl pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.12), transparent 70%)' }} />
            </div>
            <Suspense>
                <ResetPasswordForm />
            </Suspense>
        </div>
    )
}