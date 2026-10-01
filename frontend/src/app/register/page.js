'use client'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import {motion} from 'framer-motion'
import {Zap, Mail, Lock, User, Check, Search, Globe} from 'lucide-react'
import toast from 'react-hot-toast'
import {useRouter} from 'next/navigation'
import {trackScanoraLead} from '../lib/scanoraLeads'

const BENEFITS = [
    {icon: Check, text: '1 Audit pro Monat - vollständig & kostenlos'},
    {icon: Check, text: 'SEO: Title, Meta, H1, Alt-Texte & alle Fehler'},
    {icon: Check, text: 'GEO: llms.txt, Schema, KI-Crawler & alle Checks'},
    {icon: Check, text: 'Performance: Core Web Vitals & Ladezeiten'},
]

const PLAN_FEATURES = [
    {icon: Search, label: 'SEO', value: '14 Checks'},
    {icon: Globe, label: 'GEO', value: '19 Checks'},
    {icon: Zap, label: 'Speed', value: '60s'},
]

export default function RegisterPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({name: '', email: '', password: ''})
    const [consent, setConsent] = useState(false)
    const [marketingConsent, setMarketingConsent] = useState(false)
    const [hasPendingAudit, setHasPendingAudit] = useState(false)
    const [geoCheckContext, setGeoCheckContext] = useState(null)

    useEffect(() => {
        setHasPendingAudit(!!sessionStorage.getItem('pendingAuditUrl'))
        const stored = sessionStorage.getItem('pendingGeoCheck')
        if (stored) {
            try { setGeoCheckContext(JSON.parse(stored)) } catch {}
        }
    }, [])

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...formData, marketingConsent})
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error || 'Registrierung fehlgeschlagen')
            toast.success('Account erstellt! Willkommen 🎉')
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            if (typeof window.gtag === 'function' && localStorage.getItem('cookie_consent') === 'granted') {
                window.gtag('event', 'conversion', {send_to: 'AW-691789119/o2S4CPr_1bUcEL-678kC'})
            }
            trackScanoraLead(formData.email)
            setTimeout(() => router.push(geoCheckContext ? '/geo/pricing' : '/dashboard'), 1000)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    const passwordStrength = formData.password.length === 0 ? 0 : formData.password.length < 6 ? 1 : formData.password.length < 10 ? 2 : 3
    const strengthColor = ['', 'var(--danger)', 'var(--warning)', 'var(--success)'][passwordStrength]
    const strengthLabel = ['', 'Zu kurz', 'Mittel', 'Stark'][passwordStrength]

    return (
        <div className="min-h-screen bg-(--bg-base) flex">

            {/* Left - Form */}
            <div className="flex-1 flex items-center justify-center px-5 py-12 order-2 lg:order-1">
                <div className="absolute inset-0 lg:hidden">
                </div>

                <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}
                            className="relative z-10 w-full max-w-md">

                    {/* Mobile Logo */}
                    <div className="flex justify-center mb-8 lg:hidden">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div
                                className="w-9 h-9 rounded-xl bg-(--text-white) flex items-center justify-center">
                                <svg className="w-4 h-4 text-(--bg-base)" viewBox="0 0 192 192" fill="none"><circle cx="96" cy="96" r="50" stroke="currentColor" strokeWidth="14" /><circle cx="110" cy="82" r="13" fill="currentColor" /></svg>
                            </div>
                            <span className="text-xl font-bold text-(--text-white)">Scanora</span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-(--text-white) mb-2">Account erstellen</h1>
                        {geoCheckContext ? (
                            <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-(--accent-soft) border border-(--accent-border) rounded-xl">
                                <p className="text-xs text-(--accent-ink)">
                                    {geoCheckContext.mentioned
                                        ? <>Du wirst bei <b>{geoCheckContext.label}</b> zitiert - bleib dran mit wöchentlichem Tracking für <b>{geoCheckContext.domain}</b>.</>
                                        : <>Du wirst bei <b>{geoCheckContext.label}</b> noch nicht zitiert - starte Tracking für <b>{geoCheckContext.domain}</b>, um das zu ändern.</>}
                                </p>
                            </div>
                        ) : hasPendingAudit && (
                            <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-(--accent-soft) border border-(--accent-border) rounded-xl">
                                <p className="text-xs text-(--accent-ink)">Dein Audit wartet - du siehst die Ergebnisse sofort nach der Registrierung.</p>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm text-(--text-body) mb-2 block font-medium">Benutzername</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-faint)"/>
                                <input type="text" name="name" value={formData.name} onChange={handleChange}
                                       placeholder="Benutzername" required
                                       className="w-full bg-(--card) border border-(--line) hover:border-(--border-strong) focus:border-(--accent) focus:shadow-[0_0_0_4px_var(--accent-ring)] rounded-xl pl-11 pr-4 py-3.5 text-(--text-white) placeholder:text-(--text-faint) outline-none transition-all text-sm"/>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-(--text-body) mb-2 block font-medium">E-Mail</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-faint)"/>
                                <input type="email" name="email" value={formData.email} onChange={handleChange}
                                       placeholder="du@beispiel.de" required
                                       className="w-full bg-(--card) border border-(--line) hover:border-(--border-strong) focus:border-(--accent) focus:shadow-[0_0_0_4px_var(--accent-ring)] rounded-xl pl-11 pr-4 py-3.5 text-(--text-white) placeholder:text-(--text-faint) outline-none transition-all text-sm"/>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-(--text-body) mb-2 block font-medium">Passwort</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-faint)"/>
                                <input type="password" name="password" value={formData.password} onChange={handleChange}
                                       placeholder="Mindestens 6 Zeichen" required minLength={6}
                                       className="w-full bg-(--card) border border-(--line) hover:border-(--border-strong) focus:border-(--accent) focus:shadow-[0_0_0_4px_var(--accent-ring)] rounded-xl pl-11 pr-4 py-3.5 text-(--text-white) placeholder:text-(--text-faint) outline-none transition-all text-sm"/>
                            </div>
                            {/* Password strength */}
                            {formData.password.length > 0 && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                                                 style={{background: i <= passwordStrength ? strengthColor : 'var(--surface-10)'}}/>
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
                                    consent ? 'bg-(--accent) border-(--accent)' : 'border-(--border-strong) bg-(--surface-08) group-hover:border-(--border-strong)'
                                }`}
                            >
                                {consent && (
                                    <svg className="w-2.5 h-2.5 text-(--text-white)" fill="none" viewBox="0 0 10 8" stroke="currentColor" strokeWidth={2.5}>
                                        <path d="M1 4l3 3 5-6" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </div>
                            <span className="text-xs text-(--text-muted) leading-relaxed">
                                Ich habe die{' '}
                                <Link href="/nutzungsbedingungen" target="_blank" className="text-(--text-body) hover:text-(--accent) underline underline-offset-2">Nutzungsbedingungen</Link>{' '}
                                und die{' '}
                                <Link href="/datenschutz" target="_blank" className="text-(--text-body) hover:text-(--accent) underline underline-offset-2">Datenschutzerklärung</Link>{' '}
                                gelesen und stimme diesen zu.
                            </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div
                                onClick={() => setMarketingConsent(v => !v)}
                                className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all ${
                                    marketingConsent ? 'bg-(--accent) border-(--accent)' : 'border-(--border-strong) bg-(--surface-08) group-hover:border-(--border-strong)'
                                }`}
                            >
                                {marketingConsent && (
                                    <svg className="w-2.5 h-2.5 text-(--text-white)" fill="none" viewBox="0 0 10 8" stroke="currentColor" strokeWidth={2.5}>
                                        <path d="M1 4l3 3 5-6" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </div>
                            <span className="text-xs text-(--text-muted) leading-relaxed">
                                Ich möchte per E-Mail über neue Features und Angebote informiert werden.
                            </span>
                        </label>

                        <motion.button type="submit" disabled={loading || !consent} whileTap={{scale: 0.98}}
                                       className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[10px] bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) font-semibold transition-all duration-200 active:scale-[0.97] active:duration-75 disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-2">
                            {loading ? (
                                <>
                                    <div
                                        className="w-4 h-4 border-2 border-(--bg-base)/30 border-t-(--bg-base) rounded-full animate-spin"/>
                                    Account wird erstellt...</>
                            ) : (
                                <>Account erstellen</>
                            )}
                        </motion.button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-(--border-subtle)"/>
                        <span className="text-xs text-(--text-faint) ">oder</span>
                        <div className="flex-1 h-px bg-(--border-subtle)"/>
                    </div>

                    <div className="text-center text-sm text-(--text-faint)">
                        Bereits ein Account?{' '}
                        <Link href="/login" className="text-(--text-white) hover:text-(--accent) font-medium transition-colors">
                            Einloggen
                        </Link>
                    </div>

                </motion.div>
            </div>

            {/* Right - Branding */}
            <div
                className="hidden lg:flex flex-col justify-between w-120 shrink-0 relative overflow-hidden border-l border-(--border-subtle) p-12 order-1 lg:order-2">
                <div className="absolute inset-0 bg-(--bg-base)"/>

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div
                            className="w-9 h-9 rounded-xl bg-(--text-white) flex items-center justify-center">
                            <svg className="w-4 h-4 text-(--bg-base)" viewBox="0 0 192 192" fill="none"><circle cx="96" cy="96" r="50" stroke="currentColor" strokeWidth="14" /><circle cx="110" cy="82" r="13" fill="currentColor" /></svg>
                        </div>
                        <span className="text-xl font-bold text-(--text-white) tracking-tight">
              Scanora
            </span>
                    </Link>
                </div>

                <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-(--text-white) leading-tight mb-4">
                        Einmal registrieren.<br/>
                        Immer den Überblick.
                    </h2>
                    <p className="text-(--text-muted) text-sm leading-relaxed mb-8">
                        Speicher deine Audit-Ergebnisse, prüf dieselbe Domain erneut und verfolg deine Fortschritte - alles an einem Ort.
                    </p>

                    {/* Benefits */}
                    <div className="space-y-3 mb-8">
                        {BENEFITS.map((b, i) => (
                            <motion.div key={i} initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}}
                                        transition={{delay: 0.2 + i * 0.08}}
                                        className="flex items-center gap-3">
                                <div
                                    className="w-5 h-5 rounded-full bg-(--accent-soft-strong) border border-(--accent-border) flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-(--accent-ink)" strokeWidth={3}/>
                                </div>
                                <span className="text-sm text-(--text-muted)">{b.text}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Feature pills */}
                    <div className="grid grid-cols-2 gap-3">
                        {PLAN_FEATURES.map((f, i) => (
                            <div key={i}
                                 className="flex items-center gap-2.5 bg-(--card) border border-(--line) rounded-xl px-3 py-2.5">
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-(--accent-soft) border border-(--accent-border)">
                                    <f.icon className="w-3.5 h-3.5 text-(--accent-ink)" strokeWidth={1.8}/>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-(--text-white)">{f.value}</div>
                                    <div className="text-[10px] text-(--text-faint)">{f.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}