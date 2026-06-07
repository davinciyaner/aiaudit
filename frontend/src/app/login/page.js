'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, ArrowRight, Shield, Search, Globe } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const FEATURES = [
    { icon: Shield, text: 'Security Deep-Scan mit 14 Checks' },
    { icon: Search, text: 'Vollständige SEO-Analyse' },
    { icon: Globe, text: 'GEO — KI-Sichtbarkeit prüfen' },
    { icon: Zap, text: 'KI-Bericht in 60s' },
]

export default function LoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ email: '', password: '' })

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error || 'Login fehlgeschlagen')
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            toast.success('Willkommen zurück!')
            setTimeout(() => router.push('/dashboard'), 1000)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#05080f] flex">
            <Toaster position="top-right" toastOptions={{ style: { background: '#0d1117', color: '#fff', border: '1px solid rgba(255,255,255,0.08)', maxWidth: 'calc(100vw - 2rem)' } }} />

            {/* Left — Branding */}
            <div className="hidden lg:flex flex-col justify-between w-120 shrink-0 relative overflow-hidden border-r border-white/5 p-12">
                {/* Background effects */}
                <div className="absolute inset-0 bg-linear-to-br from-violet-950/40 via-[#05080f] to-cyan-950/20" />
                <div className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)' }} />
                <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12), transparent 70%)' }} />
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                            <Zap className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">
              Audit<span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">AI</span>
            </span>
                    </Link>
                </div>

                <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-white leading-tight mb-4">
                        Willkommen<br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">zurück.</span>
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                        Deine Reports und Audits warten auf dich. Alle Analysen an einem Ort.
                    </p>
                    <div className="space-y-3">
                        {FEATURES.map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
                                        className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                                    <f.icon className="w-3.5 h-3.5 text-violet-400" strokeWidth={1.8} />
                                </div>
                                <span className="text-sm text-slate-400">{f.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mock score preview */}
                <div className="relative z-10">
                    <div className="bg-white/3 border border-white/[0.07] rounded-2xl p-4">
                        <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-3">Letzter Audit</div>
                        <div className="grid grid-cols-4 gap-2">
                            {[['SEO', 81, '#22c55e'], ['Perf.', 68, '#f59e0b'], ['Sec.', 59, '#ef4444'], ['GEO', 42, '#ef4444']].map(([l, s, c]) => (
                                <div key={l} className="text-center">
                                    <div className="text-lg font-bold" style={{ color: c }}>{s}</div>
                                    <div className="text-[9px] text-slate-600">{l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right — Form */}
            <div className="flex-1 flex items-center justify-center px-5 py-12">
                <div className="absolute inset-0 lg:hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-100 rounded-full blur-3xl" style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.12), transparent 70%)' }} />
                </div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 w-full max-w-md">

                    {/* Mobile Logo */}
                    <div className="flex justify-center mb-8 lg:hidden">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
                            </div>
                            <span className="text-xl font-bold text-white">Audit<span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">AI</span></span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Anmelden</h1>
                        <p className="text-slate-400 text-sm">Zugang zu deinen Reports und Audits</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="text-sm text-slate-300 mb-2 block font-medium">E-Mail</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="du@beispiel.de" required
                                       className="w-full bg-white/3 border border-white/10 hover:border-white/15 focus:border-violet-500/60 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all text-sm" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm text-slate-300 font-medium">Passwort</label>
                                <Link href="/forgot-password" className="text-xs text-slate-500 hover:text-violet-400 transition-colors">Vergessen?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required
                                       className="w-full bg-white/3 border border-white/10 hover:border-white/15 focus:border-violet-500/60 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all text-sm" />
                            </div>
                        </div>

                        <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.98 }}
                                       className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                            {loading ? (
                                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Einloggen...</>
                            ) : (
                                <>Einloggen <ArrowRight className="w-4 h-4" /></>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500">
                        Noch keinen Account?{' '}
                        <Link href="/register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                            Jetzt registrieren
                        </Link>
                    </div>

                </motion.div>
            </div>
        </div>
    )
}