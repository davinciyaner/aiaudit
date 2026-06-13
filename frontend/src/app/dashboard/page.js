'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Zap,
    Download,
    RefreshCw,
    ExternalLink,
    AlertTriangle,
    CheckCircle,
    XCircle,
    ChevronDown,
    ChevronUp,
    Lock,
    ArrowRight,
    UserPlus,
    User,
    LogOut,
    Bot,
    FileText,
    TrendingUp,
} from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import ScoreCard from '../components/ScoreCard'
import AuditForm from '../components/AuditForm'
import Loading from '../components/Loading'
import ReauditCTA from '../components/ReauditCTA'
import FeedbackWidget from '../components/FeedbackWidget'

function IssueItem({ text, type = 'error' }) {
    const styles = {
        error: 'bg-red-500/10 border-red-500/20 text-red-400',
        warn: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
        success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    }
    const icons = { error: XCircle, warn: AlertTriangle, success: CheckCircle }
    const Icon = icons[type] || AlertTriangle

    return (
        <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-sm ${styles[type]}`}>
            <Icon className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.8} />
            {text}
        </div>
    )
}

function Section({ title, icon, children, defaultOpen = true }) {
    const [open, setOpen] = useState(defaultOpen)

    return (
        <div className="bg-white/2 border border-white/[0.07] rounded-2xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 hover:bg-white/2 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className="text-lg">{icon}</span>
                    <span className="font-semibold text-white">{title}</span>
                </div>
                {open ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-white/5">
                            <div className="pt-4">{children}</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function Dashboard() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [auditUrl, setAuditUrl] = useState('')
    const [result, setResult] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        if (!menuOpen) return
        const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false) }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [menuOpen])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setIsLoggedIn(false)
        setMenuOpen(false)
        router.push('/')
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsLoggedIn(!!token)
        try {
            const stored = localStorage.getItem('user')
            if (stored) setUserName(JSON.parse(stored).name || '')
        } catch { /* ignore */ }

        const pending = sessionStorage.getItem('pendingAuditUrl')
        if (pending) {
            sessionStorage.removeItem('pendingAuditUrl')
            runAudit(pending, token)
        }
    }, [])

    const runAudit = async (url, token) => {
        setLoading(true)
        setAuditUrl(url)
        try {
            const headers = { 'Content-Type': 'application/json' }
            if (token) headers['Authorization'] = `Bearer ${token}`
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/audit`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ url }),
            })

            if (res.status === 429) { handleComplete({ limitReached: true }); return }

            if (res.status === 403) {
                const errData = await res.json().catch(() => ({}))
                if (errData.domainLimitReached) { handleComplete({ domainLimitReached: true }); return }
            }

            if (!res.ok) throw new Error('Audit fehlgeschlagen')

            const data = await res.json()
            handleComplete(data)
            toast.success('Audit abgeschlossen!')
        } catch (err) {
            toast.error(err.message || 'Fehler beim Audit')
            handleComplete(null)
        }
    }

    const handleStart = () => {
        setLoading(true)
        setResult(null)
    }

    const handleComplete = (data) => {
        setLoading(false)
        setResult(data || null)
    }

    const audit = result?.auditData
    const isPro = !!result?.aiReport

    return (
        <div className="min-h-screen bg-[#080b14]">
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#0d1117',
                        color: '#e8e5e0',
                        border: '1px solid rgba(255,255,255,0.08)',
                        maxWidth: 'calc(100vw - 2rem)',
                    },
                }}
            />

            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 bg-[#080b14]/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-white">
                            Audit<span className="text-cyan-400">AI</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-2">
                        {result && !result.limitReached && (
                            <button
                                onClick={() => { setResult(null); setLoading(false) }}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white border border-white/10 rounded-xl"
                            >
                                <RefreshCw className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Neue Prüfung</span>
                            </button>
                        )}

                        {isLoggedIn ? (
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setMenuOpen(o => !o)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
                                >
                                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                                        {userName?.charAt(0)?.toUpperCase() || '?'}
                                    </div>
                                    <span className="text-sm text-slate-300 hidden sm:block max-w-[120px] truncate">{userName}</span>
                                    <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {menuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -6, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -6, scale: 0.97 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 top-full mt-2 w-44 bg-[#0d1117] border border-white/10 rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50"
                                        >
                                            <Link
                                                href="/profile"
                                                onClick={() => setMenuOpen(false)}
                                                className="flex items-center gap-2.5 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                                            >
                                                <User className="w-4 h-4 text-slate-500" />
                                                Mein Profil
                                            </Link>
                                            <div className="h-px bg-white/5 mx-3" />
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Ausloggen
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login" className="px-4 py-2 text-sm text-slate-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all">
                                    Einloggen
                                </Link>
                                <Link href="/register" className="px-4 py-2 text-sm text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 rounded-xl transition-all font-semibold shadow-lg shadow-violet-500/20">
                                    Registrieren
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12">

                {/* HEADER */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                    <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">
                        {result ? 'Audit Fertig' : 'Audit deine Website'}
                    </h1>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto truncate px-4">
                        {result
                            ? `Resultate für ${result?.auditData?.url || auditUrl}`
                            : 'Gib deine URL ein und erhalte einen vollständigen AI Bericht'}
                    </p>
                </motion.div>

                {/* FORM */}
                {!result && !loading && (
                    <AuditForm
                        onAuditStart={(url) => { handleStart(); setAuditUrl(url) }}
                        onAuditComplete={handleComplete}
                    />
                )}

                {/* LOADING */}
                {loading && <Loading url={auditUrl} />}

                {/* IP / PLAN RATE LIMIT */}
                {result?.limitReached && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center gap-6 py-16"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                            <Lock className="w-7 h-7 text-amber-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Kostenlose Prüfung bereits genutzt</h2>
                            <p className="text-slate-400 max-w-md">
                                Du hast deine monatliche Gratis-Prüfung bereits durchgeführt. Upgrade auf{' '}
                                <span className="text-violet-400 font-semibold">Pro</span>, um 10 Prüfungen pro Monat zu erhalten.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/pricing"
                                className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/20"
                            >
                                Auf Pro upgraden <ArrowRight className="w-4 h-4" />
                            </Link>
                            <button onClick={() => setResult(null)}
                                className="px-6 py-3 text-slate-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all text-sm"
                            >
                                Zurück
                            </button>
                        </div>
                        <p className="text-xs text-slate-600">Nächste kostenlose Prüfung: In einem Monat</p>
                    </motion.div>
                )}

                {/* DOMAIN LIMIT REACHED (anonymous, same domain again) */}
                {result?.domainLimitReached && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center gap-6 py-16"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                            <RefreshCw className="w-7 h-7 text-violet-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Hast du die Fehler behoben?</h2>
                            <p className="text-slate-400 max-w-md">
                                Diese Domain wurde bereits kostenlos geprüft. Erstell ein{' '}
                                <span className="text-violet-400 font-semibold">kostenloses Konto</span> um deine Website erneut zu prüfen.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/register"
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/20"
                            >
                                <UserPlus className="w-4 h-4" /> Keine Registrierung nötig
                            </Link>
                            <Link href="/pricing"
                                className="flex items-center gap-2 px-6 py-3 text-slate-300 hover:text-white border border-white/10 hover:border-violet-500/40 font-semibold rounded-xl transition-all text-sm"
                            >
                                Pro für 29€/Monat <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <button onClick={() => setResult(null)} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
                            Andere URL prüfen
                        </button>
                    </motion.div>
                )}

                {/* RESULTS */}
                {result && audit && (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

                        {/* SCORE CARDS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                            <ScoreCard label="Overall" score={audit.overallScore ?? 0} />
                            <ScoreCard label="SEO" score={audit?.seo?.score ?? 0} delay={0.1} />
                            <ScoreCard label="Performance" score={audit?.performance?.score ?? 0} delay={0.2} />
                            <ScoreCard label="GEO" score={audit?.geo?.score ?? 0} delay={0.3} />
                        </div>

                        {/* FULL REPORT */}
                        {true && (
                            <>
                                {/* AI REPORT — nur Pro/Agency */}
                                {result.aiReport ? (
                                    <Section title="AI Analysis & Recommendations" icon="🤖">
                                        <div
                                            className="text-slate-300 text-sm whitespace-pre-wrap break-words"
                                            dangerouslySetInnerHTML={{
                                                __html: (result.aiReport || '')
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                                                    .replace(/\n/g, '<br/>'),
                                            }}
                                        />
                                    </Section>
                                ) : (
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                        className="relative overflow-hidden rounded-2xl border border-violet-500/25 bg-[#0d1117] p-6 sm:p-8 text-center">
                                        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-violet-600/8 blur-3xl" />
                                        <div className="relative z-10">
                                            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                                                <Bot className="w-6 h-6 text-violet-400" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white mb-2">KI-Bericht nur mit Pro</h3>
                                            <p className="text-slate-400 text-sm mb-5 max-w-md mx-auto leading-relaxed">
                                                Der KI-Bericht analysiert deine spezifischen Ergebnisse und liefert konkrete Fixes für deine Website - kein generisches "optimiere deinen Title-Tag".
                                            </p>
                                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                                <Link href="/pricing"
                                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/20 text-sm">
                                                    Jetzt auf Pro upgraden <ArrowRight className="w-4 h-4" />
                                                </Link>
                                                <Link href="/pricing"
                                                    className="flex items-center justify-center gap-2 px-6 py-3 text-slate-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all text-sm">
                                                    Preise ansehen
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* PERFORMANCE */}
                                <Section title="Performance" icon="⚡">
                                    <div className="space-y-2">
                                        {audit?.performance?.issues?.map((issue, i) => (
                                            <IssueItem key={i} text={issue} type="warn" />
                                        ))}
                                    </div>
                                </Section>

                                {/* SEO */}
                                <Section title="SEO Analyse" icon="🔍">
                                    {/* Metriken-Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
                                        {[
                                            {
                                                label: 'Title-Tag',
                                                ok: audit?.seo?.title?.length >= 30 && audit?.seo?.title?.length <= 60,
                                                detail: audit?.seo?.title?.length ? `${audit.seo.title.length} Zeichen` : 'fehlt',
                                            },
                                            {
                                                label: 'Meta Description',
                                                ok: audit?.seo?.description?.length >= 120 && audit?.seo?.description?.length <= 160,
                                                detail: audit?.seo?.description?.length ? `${audit.seo.description.length} Zeichen` : 'fehlt',
                                            },
                                            {
                                                label: 'H1-Tag',
                                                ok: audit?.seo?.headings?.h1?.length === 1,
                                                detail: `${audit?.seo?.headings?.h1?.length ?? 0}× gefunden`,
                                            },
                                            {
                                                label: 'Alt-Texte',
                                                ok: audit?.seo?.images?.withoutAlt === 0,
                                                detail: audit?.seo?.images?.withoutAlt ? `${audit.seo.images.withoutAlt} fehlen` : 'alle vorhanden',
                                            },
                                            {
                                                label: 'Canonical',
                                                ok: !!audit?.seo?.canonical,
                                                detail: audit?.seo?.canonical ? 'gesetzt' : 'fehlt',
                                            },
                                            {
                                                label: 'Structured Data',
                                                ok: !!audit?.seo?.structuredData,
                                                detail: audit?.seo?.structuredData ? 'vorhanden' : 'fehlt',
                                            },
                                        ].map(({ label, ok, detail }) => (
                                            <div key={label} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium ${
                                                ok ? 'bg-emerald-500/8 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                                            }`}>
                                                {ok
                                                    ? <CheckCircle className="w-3 h-3 shrink-0" strokeWidth={2} />
                                                    : <XCircle className="w-3 h-3 shrink-0" strokeWidth={2} />
                                                }
                                                <div className="min-w-0">
                                                    <div className="truncate">{label}</div>
                                                    <div className="text-[10px] opacity-70 truncate">{detail}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Issues + Empfehlungen (nur Pro) */}
                                    {audit?.seo?.issues?.length > 0 ? (
                                        <div className="space-y-3">
                                            {audit.seo.issues.map((issue, i) => (
                                                <div key={i} className="space-y-1.5">
                                                    <IssueItem text={issue} type="error" />
                                                    {isPro && audit.seo.suggestions?.[i] && (
                                                        <div className="ml-6 text-xs text-slate-500 bg-white/[0.02] rounded-lg px-3 py-2 border border-white/[0.05]">
                                                            Empfehlung: {audit.seo.suggestions[i]}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-emerald-400 text-sm">
                                            Alle SEO-Checks bestanden ✓
                                        </div>
                                    )}

                                    {/* Title + Description anzeigen */}
                                    {(audit?.seo?.title?.text || audit?.seo?.description?.text) && (
                                        <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                                            {audit?.seo?.title?.text && (
                                                <div>
                                                    <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-1">Title-Tag</div>
                                                    <div className="text-xs text-slate-400 bg-white/[0.02] rounded-lg px-3 py-2 border border-white/[0.05]">{audit.seo.title.text}</div>
                                                </div>
                                            )}
                                            {audit?.seo?.description?.text && (
                                                <div>
                                                    <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-1">Meta Description</div>
                                                    <div className="text-xs text-slate-400 bg-white/[0.02] rounded-lg px-3 py-2 border border-white/[0.05]">{audit.seo.description.text}</div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Section>

                                {/* GEO */}
                                {audit?.geo && (
                                    <Section title="GEO — KI-Sichtbarkeit" icon="🤖">
                                        {/* Checks Grid */}
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
                                            {[
                                                { label: 'llms.txt', ok: audit.geo.checks?.hasLlmsTxt, detail: audit.geo.checks?.hasLlmsTxt ? 'vorhanden' : 'fehlt' },
                                                { label: 'llms-full.txt', ok: audit.geo.checks?.hasLlmsFullTxt, detail: audit.geo.checks?.hasLlmsFullTxt ? 'vorhanden' : 'fehlt' },
                                                { label: 'FAQ Schema', ok: audit.geo.checks?.hasFAQ, detail: audit.geo.checks?.hasFAQ ? 'vorhanden' : 'fehlt' },
                                                { label: 'Organization', ok: audit.geo.checks?.hasOrganization, detail: audit.geo.checks?.hasOrganization ? 'vorhanden' : 'fehlt' },
                                                { label: 'KI-Crawler', ok: audit.geo.checks?.robotsAllowsAI, detail: audit.geo.checks?.robotsAllowsAI ? 'erlaubt' : `${audit.geo.checks?.blockedCrawlers?.length ?? 0} blockiert` },
                                                { label: 'sitemap.xml', ok: audit.geo.checks?.hasSitemap, detail: audit.geo.checks?.hasSitemap ? 'vorhanden' : 'fehlt' },
                                                { label: 'Produktdefinition', ok: audit.geo.checks?.hasDirectDefinition, detail: audit.geo.checks?.hasDirectDefinition ? 'gefunden' : 'fehlt' },
                                                { label: 'Statistiken', ok: audit.geo.checks?.hasStatistics, detail: audit.geo.checks?.hasStatistics ? 'vorhanden' : 'fehlt' },
                                                { label: 'lang-Attribut', ok: audit.geo.checks?.hasLang, detail: audit.geo.checks?.hasLang ? 'gesetzt' : 'fehlt' },
                                                { label: 'HTTPS', ok: audit.geo.checks?.hasHTTPS, detail: audit.geo.checks?.hasHTTPS ? 'aktiv' : 'fehlt' },
                                                { label: 'Canonical', ok: audit.geo.checks?.canonical, detail: audit.geo.checks?.canonical ? 'gesetzt' : 'fehlt' },
                                                { label: 'Kontakt/About', ok: audit.geo.checks?.hasAuthorInfo || audit.geo.checks?.hasContactInfo, detail: (audit.geo.checks?.hasAuthorInfo || audit.geo.checks?.hasContactInfo) ? 'gefunden' : 'fehlt' },
                                            ].map(({ label, ok, detail }) => (
                                                <div key={label} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium ${
                                                    ok ? 'bg-emerald-500/8 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                                                }`}>
                                                    {ok
                                                        ? <CheckCircle className="w-3 h-3 shrink-0" strokeWidth={2} />
                                                        : <XCircle className="w-3 h-3 shrink-0" strokeWidth={2} />
                                                    }
                                                    <div className="min-w-0">
                                                        <div className="truncate">{label}</div>
                                                        <div className="text-[10px] opacity-70 truncate">{detail}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Issues + Empfehlungen (nur Pro) */}
                                        {audit.geo.issues?.length > 0 ? (
                                            <div className="space-y-3 mb-5">
                                                {audit.geo.issues.map((issue, i) => (
                                                    <div key={i} className="space-y-1.5">
                                                        <IssueItem text={issue} type="error" />
                                                        {isPro && audit.geo.suggestions?.[i] && (
                                                            <div className="ml-6 text-xs text-slate-500 bg-white/[0.02] rounded-lg px-3 py-2 border border-white/[0.05]">
                                                                Empfehlung: {audit.geo.suggestions[i]}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-4 text-emerald-400 text-sm mb-4">
                                                Alle GEO-Checks bestanden ✓
                                            </div>
                                        )}

                                        {/* Priorisierte Massnahmen — nur Pro */}
                                        {isPro && audit.geo.recommendations?.length > 0 && (
                                            <div className="space-y-2 mb-5">
                                                <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-2">Priorisierte Massnahmen</div>
                                                {audit.geo.recommendations.map((r, i) => (
                                                    <div key={i} className="flex gap-3 bg-white/2 border border-white/[0.06] rounded-xl p-4">
                                                        <span className={`text-xs font-bold px-2 py-1 rounded shrink-0 h-fit ${
                                                            r.priority === 'critical' ? 'bg-red-500/15 text-red-400' :
                                                            r.priority === 'high' ? 'bg-amber-500/15 text-amber-400' :
                                                            'bg-blue-500/15 text-blue-400'
                                                        }`}>{r.priority}</span>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-sm font-semibold text-white mb-1">{r.title}</div>
                                                            <div className="text-xs text-slate-500 leading-relaxed">{r.desc}</div>
                                                        </div>
                                                        <div className="text-xs text-slate-600 shrink-0 whitespace-nowrap">{r.effort}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Generated llms.txt — nur Pro */}
                                        {isPro && !audit.geo.checks?.hasLlmsTxt && audit.geo.generatedLlmsTxt && (
                                            <div className="mt-2">
                                                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                                                    Generierte llms.txt — als /llms.txt in dein Projekt speichern
                                                </div>
                                                <pre className="bg-cyan-500/5 border border-cyan-500/15 rounded-xl p-4 text-xs text-slate-400 overflow-auto whitespace-pre-wrap">
                                                    {audit.geo.generatedLlmsTxt}
                                                </pre>
                                            </div>
                                        )}
                                    </Section>
                                )}

                                {/* PRO UPSELL — nur wenn nicht Pro */}
                                {!isPro && <ReauditCTA />}

                                {/* SEO TRACKING UPSELL */}
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                                        className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-5">
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                                <TrendingUp className="w-4 h-4 text-emerald-400" />
                                            </div>
                                            <div>
                                                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Add-on</span>
                                                <h3 className="text-sm font-bold text-white">SEO Tracking</h3>
                                            </div>
                                        </div>
                                        <ul className="space-y-1.5 mb-4">
                                            {['Wöchentliche Google-Rankings', 'Keyword-Ideen & Suchvolumen', 'Konkurrenzanalyse', 'Backlink-Übersicht'].map(f => (
                                                <li key={f} className="flex items-center gap-2 text-xs text-slate-500">
                                                    <CheckCircle className="w-3 h-3 text-emerald-400/60 shrink-0" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                        {isLoggedIn ? (
                                            <Link href="/seo/pricing" className="flex items-center justify-center gap-1.5 w-full px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl transition-all">
                                                Jetzt buchen <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        ) : (
                                            <div className="flex gap-2">
                                                <Link href="/register" className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl transition-all">
                                                    <UserPlus className="w-3 h-3" /> Registrieren
                                                </Link>
                                                <Link href="/seo/pricing" className="flex items-center justify-center px-3 py-2 border border-white/10 hover:border-white/20 text-slate-500 hover:text-slate-300 text-xs rounded-xl transition-all">
                                                    Preise
                                                </Link>
                                            </div>
                                        )}
                                    </motion.div>

                                {/* PDF DOWNLOAD — nur Pro/Agency */}
                                {result?.reportFile ? (
                                    <div className="flex justify-center pt-2">
                                        <a
                                            href={`${process.env.NEXT_PUBLIC_API_URL.replace('/api', '')}/reports/${result.reportFile.split('/').pop()}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => {
                                                if (typeof window.gtag === 'function' && localStorage.getItem('cookie_consent') === 'granted') {
                                                    window.gtag('event', 'pdf_download', {
                                                        event_category: 'engagement',
                                                        event_label: audit?.url ?? auditUrl,
                                                    })
                                                }
                                            }}
                                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-xl"
                                        >
                                            <Download className="w-4 h-4" />
                                            PDF herunterladen
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between gap-4 px-4 sm:px-5 py-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-4 h-4 text-slate-600 shrink-0" />
                                            <span className="text-sm text-slate-500">PDF-Report verfügbar mit Pro</span>
                                        </div>
                                        <Link href="/pricing"
                                            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-xs font-semibold rounded-lg transition-all shrink-0">
                                            Upgraden <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </motion.div>
                )}
            </div>

            {/* FEEDBACK WIDGET — shown 30s after audit completes */}
            {result && audit && (
                <FeedbackWidget
                    auditUrl={auditUrl}
                    reportId={result.report?._id}
                />
            )}
        </div>
    )
}