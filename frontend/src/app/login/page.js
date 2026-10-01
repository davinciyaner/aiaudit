'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, ArrowRight, Search, Globe } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const FEATURES = [
    { icon: Search, text: 'SEO: Title, Meta, H1, Alt-Texte & alle Fehler' },
    { icon: Globe, text: 'GEO: llms.txt, Schema, KI-Crawler & alle Checks' },
    { icon: Zap, text: 'Ergebnis in unter 60 Sekunden' },
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
            if (data.showReactivationBanner) localStorage.setItem('showReactivationBanner', '1')
            toast.success('Willkommen zurück!')
            setTimeout(() => router.push('/dashboard'), 1000)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-(--bg-base) flex">

            {/* Left - Branding */}
            <div className="hidden lg:flex flex-col justify-between w-120 shrink-0 relative overflow-hidden border-r border-(--border-subtle) p-12">
                {/* Background effects */}
                <div className="absolute inset-0 bg-(--bg-surface)" />

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-(--text-white) flex items-center justify-center">
                            <svg className="w-4.5 h-4.5 text-(--bg-base)" viewBox="0 0 192 192" fill="none"><circle cx="96" cy="96" r="50" stroke="currentColor" strokeWidth="14" /><circle cx="110" cy="82" r="13" fill="currentColor" /></svg>
                        </div>
                        <span className="text-xl font-bold text-(--text-white) tracking-tight">
              Scanora
            </span>
                    </Link>
                </div>

                <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-(--text-white) leading-tight mb-4">
                        Willkommen<br />
                        zurück.
                    </h2>
                    <p className="text-(--text-muted) text-sm leading-relaxed mb-8">
                        Deine Reports und Audits warten auf dich. Alle Analysen an einem Ort.
                    </p>
                    <div className="space-y-3">
                        {FEATURES.map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
                                        className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-(--surface-08) border border-(--border-subtle) flex items-center justify-center shrink-0">
                                    <f.icon className="w-3.5 h-3.5 text-(--accent-ink)" strokeWidth={1.8} />
                                </div>
                                <span className="text-sm text-(--text-muted)">{f.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="relative z-10">
                    <div className="bg-(--card) border border-(--line) rounded-2xl p-4">
                        <div className="text-xs text-(--text-faint) mb-3">Letzter Audit</div>
                        <div className="grid grid-cols-4 gap-2">
                            {[['SEO', 81, 'var(--success)'], ['Perf.', 68, 'var(--warning)'], ['GEO', 42, 'var(--danger)']].map(([l, s, c]) => (
                                <div key={l} className="text-center">
                                    <div className="text-lg font-bold" style={{ color: c }}>{s}</div>
                                    <div className="text-[9px] text-(--text-faint)">{l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right - Form */}
            <div className="flex-1 flex items-center justify-center px-5 py-12">
                <div className="absolute inset-0 lg:hidden">
                </div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 w-full max-w-md">

                    {/* Mobile Logo */}
                    <div className="flex justify-center mb-8 lg:hidden">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-(--text-white) flex items-center justify-center">
                                <svg className="w-4 h-4 text-(--bg-base)" viewBox="0 0 192 192" fill="none"><circle cx="96" cy="96" r="50" stroke="currentColor" strokeWidth="14" /><circle cx="110" cy="82" r="13" fill="currentColor" /></svg>
                            </div>
                            <span className="text-xl font-bold text-(--text-white)">Scanora</span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-(--text-white) mb-2">Anmelden</h1>
                        <p className="text-(--text-muted) text-sm">Zugang zu deinen Reports und Audits</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="text-sm text-(--text-body) mb-2 block font-medium">E-Mail</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-faint)" />
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="du@beispiel.de" required
                                       className="w-full bg-(--card) border border-(--line) hover:border-(--border-strong) focus:border-(--accent) focus:shadow-[0_0_0_4px_var(--accent-ring)] rounded-xl pl-11 pr-4 py-3.5 text-(--text-white) placeholder:text-(--text-faint) outline-none transition-all text-sm" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm text-(--text-body) font-medium">Passwort</label>
                                <Link href="/forgot-password" className="text-xs text-(--text-faint) hover:text-(--accent-ink) transition-colors">Vergessen?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-faint)" />
                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required
                                       className="w-full bg-(--card) border border-(--line) hover:border-(--border-strong) focus:border-(--accent) focus:shadow-[0_0_0_4px_var(--accent-ring)] rounded-xl pl-11 pr-4 py-3.5 text-(--text-white) placeholder:text-(--text-faint) outline-none transition-all text-sm" />
                            </div>
                        </div>

                        <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.98 }}
                                       className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[10px] bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) font-semibold transition-all duration-200 active:scale-[0.97] active:duration-75 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                            {loading ? (
                                <><div className="w-4 h-4 border-2 border-(--bg-base)/30 border-t-(--bg-base) rounded-full animate-spin" />Einloggen...</>
                            ) : (
                                <>Einloggen <ArrowRight className="w-4 h-4" /></>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center text-sm text-(--text-faint)">
                        Noch keinen Account?{' '}
                        <Link href="/register" className="text-(--text-white) hover:text-(--accent-ink) font-medium transition-colors">
                            Jetzt registrieren
                        </Link>
                    </div>

                </motion.div>
            </div>
        </div>
    )
}