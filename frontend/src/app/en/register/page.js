'use client'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import {motion} from 'framer-motion'
import {Zap, Mail, Lock, User, ArrowRight, Check, Search, Globe} from 'lucide-react'
import toast, {Toaster} from 'react-hot-toast'
import {useRouter} from 'next/navigation'

const BENEFITS = [
    {icon: Check, text: '1 audit per month - full & free'},
    {icon: Check, text: 'SEO: title, meta, H1, alt text & all issues'},
    {icon: Check, text: 'GEO: llms.txt, schema, AI crawlers & all checks'},
    {icon: Check, text: 'Performance: Core Web Vitals & load times'},
]

const PLAN_FEATURES = [
    {icon: Search, label: 'SEO', value: '14 checks'},
    {icon: Globe, label: 'GEO', value: '19 checks'},
    {icon: Zap, label: 'Speed', value: '60s'},
]

export default function RegisterPageEn() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({name: '', email: '', password: ''})
    const [consent, setConsent] = useState(false)
    const [marketingConsent, setMarketingConsent] = useState(false)
    const [hasPendingAudit, setHasPendingAudit] = useState(false)

    useEffect(() => {
        setHasPendingAudit(!!sessionStorage.getItem('pendingAuditUrl'))
    }, [])

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...formData, marketingConsent, language: 'en'})
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error || 'Registration failed')
            toast.success('Account created! Welcome 🎉')
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
    const strengthLabel = ['', 'Too short', 'Medium', 'Strong'][passwordStrength]

    return (
        <div className="min-h-screen bg-[var(--bg-base)] flex">
            <Toaster position="top-right" toastOptions={{
                style: {
                    background: 'var(--bg-surface)',
                    color: '#fff',
                    border: '1px solid var(--border-subtle)',
                    maxWidth: 'calc(100vw - 2rem)',
                }
            }}/>

            {/* Left — Form */}
            <div className="flex-1 flex items-center justify-center px-5 py-12 order-2 lg:order-1">
                <div className="absolute inset-0 lg:hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-100 rounded-full blur-3xl"
                         style={{background: 'radial-gradient(ellipse, var(--accent-glow), transparent 70%)'}}/>
                </div>

                <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}
                            className="relative z-10 w-full max-w-md">

                    {/* Mobile Logo */}
                    <div className="flex justify-center mb-8 lg:hidden">
                        <Link href="/en" className="flex items-center gap-2.5">
                            <div
                                className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center shadow-lg shadow-[var(--accent-border)]">
                                <Zap className="w-4 h-4 text-[var(--bg-base)]" strokeWidth={2.5}/>
                            </div>
                            <span className="text-xl font-bold text-white">AuditAI</span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Create account</h1>
                        {hasPendingAudit && (
                            <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-[var(--accent-soft)] border border-[var(--accent-border)] rounded-xl">
                                <p className="text-xs text-[var(--accent)]">Your audit is waiting — you'll see the results right after signing up.</p>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm text-slate-300 mb-2 block font-medium">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"/>
                                <input type="text" name="name" value={formData.name} onChange={handleChange}
                                       placeholder="Username" required
                                       className="w-full bg-[var(--surface-06)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] focus:border-[var(--accent-border)] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all text-sm"/>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-slate-300 mb-2 block font-medium">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"/>
                                <input type="email" name="email" value={formData.email} onChange={handleChange}
                                       placeholder="you@example.com" required
                                       className="w-full bg-[var(--surface-06)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] focus:border-[var(--accent-border)] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all text-sm"/>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-slate-300 mb-2 block font-medium">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"/>
                                <input type="password" name="password" value={formData.password} onChange={handleChange}
                                       placeholder="At least 6 characters" required minLength={6}
                                       className="w-full bg-[var(--surface-06)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] focus:border-[var(--accent-border)] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all text-sm"/>
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
                                    consent ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-[var(--border-strong)] bg-[var(--surface-08)] group-hover:border-[var(--border-strong)]'
                                }`}
                            >
                                {consent && (
                                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8" stroke="currentColor" strokeWidth={2.5}>
                                        <path d="M1 4l3 3 5-6" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </div>
                            <span className="text-xs text-slate-400 leading-relaxed">
                                I have read the{' '}
                                <Link href="/nutzungsbedingungen" target="_blank" className="text-slate-300 hover:text-[var(--accent)] underline underline-offset-2">Terms of Service</Link>{' '}
                                and the{' '}
                                <Link href="/datenschutz" target="_blank" className="text-slate-300 hover:text-[var(--accent)] underline underline-offset-2">Privacy Policy</Link>{' '}
                                and agree to them.
                            </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div
                                onClick={() => setMarketingConsent(v => !v)}
                                className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all ${
                                    marketingConsent ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-[var(--border-strong)] bg-[var(--surface-08)] group-hover:border-[var(--border-strong)]'
                                }`}
                            >
                                {marketingConsent && (
                                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8" stroke="currentColor" strokeWidth={2.5}>
                                        <path d="M1 4l3 3 5-6" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </div>
                            <span className="text-xs text-slate-400 leading-relaxed">
                                I'd like to receive emails about new features and offers.
                            </span>
                        </label>

                        <motion.button type="submit" disabled={loading || !consent} whileTap={{scale: 0.98}}
                                       className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] font-semibold transition-all duration-200 shadow-lg shadow-[var(--accent-border)] disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-2">
                            {loading ? (
                                <>
                                    <div
                                        className="w-4 h-4 border-2 border-[var(--bg-base)]/30 border-t-[var(--bg-base)] rounded-full animate-spin"/>
                                    Creating account...</>
                            ) : (
                                <>Create account</>
                            )}
                        </motion.button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-[var(--border-subtle)]"/>
                        <span className="text-xs text-slate-600 uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-[var(--border-subtle)]"/>
                    </div>

                    <div className="text-center text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link href="/en/login" className="text-white hover:text-[var(--accent)] font-medium transition-colors">
                            Log in
                        </Link>
                    </div>

                </motion.div>
            </div>

            {/* Right — Branding */}
            <div
                className="hidden lg:flex flex-col justify-between w-120 shrink-0 relative overflow-hidden border-l border-[var(--border-subtle)] p-12 order-1 lg:order-2">
                <div className="absolute inset-0 bg-[var(--bg-base)]"/>
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl"
                     style={{background: 'radial-gradient(circle, var(--accent-glow), transparent 70%)'}}/>
                <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full blur-3xl"
                     style={{background: 'radial-gradient(circle, var(--accent-glow), transparent 70%)'}}/>
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}/>

                <div className="relative z-10">
                    <Link href="/en" className="flex items-center gap-2.5">
                        <div
                            className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center shadow-lg shadow-[var(--accent-border)]">
                            <Zap className="w-4 h-4 text-[var(--bg-base)]" strokeWidth={2.5}/>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">
              AuditAI
            </span>
                    </Link>
                </div>

                <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-white leading-tight mb-4">
                        Sign up once.<br/>
                        Stay on top of it always.
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                        Save your audit results, re-check the same domain, and track your progress — all in one place.
                    </p>

                    {/* Benefits */}
                    <div className="space-y-3 mb-8">
                        {BENEFITS.map((b, i) => (
                            <motion.div key={i} initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}}
                                        transition={{delay: 0.2 + i * 0.08}}
                                        className="flex items-center gap-3">
                                <div
                                    className="w-5 h-5 rounded-full bg-[var(--accent-soft-strong)] border border-[var(--accent-border)] flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-[var(--accent)]" strokeWidth={3}/>
                                </div>
                                <span className="text-sm text-slate-400">{b.text}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Feature pills */}
                    <div className="grid grid-cols-2 gap-3">
                        {PLAN_FEATURES.map((f, i) => (
                            <div key={i}
                                 className="flex items-center gap-2.5 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5">
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-[var(--accent-soft)] border border-[var(--accent-border)]">
                                    <f.icon className="w-3.5 h-3.5 text-[var(--accent)]" strokeWidth={1.8}/>
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
