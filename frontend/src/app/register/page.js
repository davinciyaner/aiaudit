'use client'
import {useState} from 'react'
import Link from 'next/link'
import {motion} from 'framer-motion'
import {Zap, Mail, Lock, User, ArrowRight, Check, Search, Globe} from 'lucide-react'
import toast, {Toaster} from 'react-hot-toast'
import {useRouter} from 'next/navigation'

const BENEFITS = [
    {icon: Check, text: '1 Audit pro Monat - vollständig & kostenlos'},
    {icon: Check, text: 'SEO: Title, Meta, H1, Alt-Texte & alle Fehler'},
    {icon: Check, text: 'GEO: llms.txt, Schema, KI-Crawler & alle Checks'},
    {icon: Check, text: 'Performance: Core Web Vitals & Ladezeiten'},
]

const PLAN_FEATURES = [
    {icon: Search, label: 'SEO', value: '14 Checks', color: '#7c3aed'},
    {icon: Globe, label: 'GEO', value: '19 Checks', color: '#06b6d4'},
    {icon: Zap, label: 'Speed', value: '60s', color: '#f59e0b'},
]

export default function RegisterPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({name: '', email: '', password: ''})
    const [consent, setConsent] = useState(false)

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error || 'Registrierung fehlgeschlagen')
            toast.success('Account erstellt! Willkommen 🎉')
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            if (typeof window.gtag === 'function' && localStorage.getItem('cookie_consent') === 'granted') {
                window.gtag('event', 'conversion', {send_to: 'AW-691789119/o2S4CPr_1bUcEL-678kC'})
            }
            setTimeout(() => router.push('/dashboard'), 1000)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    const passwordStrength = formData.password.length === 0 ? 0 : formData.password.length < 6 ? 1 : formData.password.length < 10 ? 2 : 3
    const strengthColor = ['', '#ef4444', '#f59e0b', '#22c55e'][passwordStrength]
    const strengthLabel = ['', 'Zu kurz', 'Mittel', 'Stark'][passwordStrength]

    return (
        <div className="min-h-screen bg-[#05080f] flex">
            <Toaster position="top-right" toastOptions={{
                style: {
                    background: '#0d1117',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.08)',
                    maxWidth: 'calc(100vw - 2rem)',
                }
            }}/>

            {/* Left — Form */}
            <div className="flex-1 flex items-center justify-center px-5 py-12 order-2 lg:order-1">
                <div className="absolute inset-0 lg:hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-100 rounded-full blur-3xl"
                         style={{background: 'radial-gradient(ellipse, rgba(124,58,237,0.12), transparent 70%)'}}/>
                </div>

                <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}
                            className="relative z-10 w-full max-w-md">

                    {/* Mobile Logo */}
                    <div className="flex justify-center mb-8 lg:hidden">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div
                                className="w-9 h-9 rounded-xl bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                                <Zap className="w-4 h-4 text-white" strokeWidth={2.5}/>
                            </div>
                            <span className="text-xl font-bold text-white">Audit<span
                                className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">AI</span></span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Account erstellen</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm text-slate-300 mb-2 block font-medium">Benutzername</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"/>
                                <input type="text" name="name" value={formData.name} onChange={handleChange}
                                       placeholder="Benutzername" required
                                       className="w-full bg-white/3 border border-white/10 hover:border-white/15 focus:border-violet-500/60 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all text-sm"/>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-slate-300 mb-2 block font-medium">E-Mail</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"/>
                                <input type="email" name="email" value={formData.email} onChange={handleChange}
                                       placeholder="du@beispiel.de" required
                                       className="w-full bg-white/3 border border-white/10 hover:border-white/15 focus:border-cyan-500/60 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all text-sm"/>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-slate-300 mb-2 block font-medium">Passwort</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"/>
                                <input type="password" name="password" value={formData.password} onChange={handleChange}
                                       placeholder="Mindestens 6 Zeichen" required minLength={6}
                                       className="w-full bg-white/3 border border-white/10 hover:border-white/15 focus:border-violet-500/60 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all text-sm"/>
                            </div>
                            {/* Password strength */}
                            {formData.password.length > 0 && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                                                 style={{background: i <= passwordStrength ? strengthColor : 'rgba(255,255,255,0.06)'}}/>
                                        ))}
                                    </div>
                                    <p className="text-xs" style={{color: strengthColor}}>{strengthLabel}</p>
                                </div>
                            )}
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div
                                onClick={() => setConsent(v => !v)}
                                className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all ${
                                    consent ? 'bg-violet-600 border-violet-600' : 'border-white/20 bg-white/5 group-hover:border-white/40'
                                }`}
                            >
                                {consent && (
                                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8" stroke="currentColor" strokeWidth={2.5}>
                                        <path d="M1 4l3 3 5-6" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </div>
                            <span className="text-xs text-slate-400 leading-relaxed">
                                Ich habe die{' '}
                                <Link href="/nutzungsbedingungen" target="_blank" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Nutzungsbedingungen</Link>{' '}
                                und die{' '}
                                <Link href="/datenschutz" target="_blank" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Datenschutzerklärung</Link>{' '}
                                gelesen und stimme diesen zu.
                            </span>
                        </label>

                        <motion.button type="submit" disabled={loading || !consent} whileTap={{scale: 0.98}}
                                       className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-2">
                            {loading ? (
                                <>
                                    <div
                                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                                    Account wird erstellt...</>
                            ) : (
                                <>Account erstellen</>
                            )}
                        </motion.button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-white/5"/>
                        <span className="text-xs text-slate-600 uppercase tracking-wider">oder</span>
                        <div className="flex-1 h-px bg-white/5"/>
                    </div>

                    <div className="text-center text-sm text-slate-500">
                        Bereits ein Account?{' '}
                        <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                            Einloggen
                        </Link>
                    </div>

                </motion.div>
            </div>

            {/* Right — Branding */}
            <div
                className="hidden lg:flex flex-col justify-between w-120 shrink-0 relative overflow-hidden border-l border-white/5 p-12 order-1 lg:order-2">
                <div className="absolute inset-0 bg-linear-to-bl from-cyan-950/30 via-[#05080f] to-violet-950/20"/>
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl"
                     style={{background: 'radial-gradient(circle, rgba(6,182,212,0.15), transparent 70%)'}}/>
                <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full blur-3xl"
                     style={{background: 'radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)'}}/>
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}/>

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div
                            className="w-9 h-9 rounded-xl bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                            <Zap className="w-4 h-4 text-white" strokeWidth={2.5}/>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">
              Audit<span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">AI</span>
            </span>
                    </Link>
                </div>

                <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-white leading-tight mb-4">
                        Alles in einem.<br/>
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">Sofort einsatzbereit.</span>
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                        Keine Registrierung nötig — sofort alle Scores, Checks und Probleme deiner Website sehen — für SEO, GEO und Performance.
                    </p>

                    {/* Benefits */}
                    <div className="space-y-3 mb-8">
                        {BENEFITS.map((b, i) => (
                            <motion.div key={i} initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}}
                                        transition={{delay: 0.2 + i * 0.08}}
                                        className="flex items-center gap-3">
                                <div
                                    className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-emerald-400" strokeWidth={3}/>
                                </div>
                                <span className="text-sm text-slate-400">{b.text}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Feature pills */}
                    <div className="grid grid-cols-2 gap-3">
                        {PLAN_FEATURES.map((f, i) => (
                            <div key={i}
                                 className="flex items-center gap-2.5 bg-white/3 border border-white/6 rounded-xl px-3 py-2.5">
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                     style={{background: f.color + '15', border: `1px solid ${f.color}25`}}>
                                    <f.icon className="w-3.5 h-3.5" style={{color: f.color}} strokeWidth={1.8}/>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-white">{f.value}</div>
                                    <div className="text-[10px] text-slate-600">{f.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}