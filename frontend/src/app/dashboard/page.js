'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
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
    Bot,
    FileText,
    TrendingUp,
} from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import ScoreCard from '../components/ScoreCard'
import AuditForm from '../components/AuditForm'
import Loading from '../components/Loading'
import ReactivationBanner from '../components/ReactivationBanner'
import FeedbackWidget from '../components/FeedbackWidget'
import Navbar from "@/app/components/Navbar";
import AuditHome from '../components/dashboard/AuditHome'

function IssueItem({ text, type = 'error' }) {
    const styles = {
        error: 'bg-(--danger-soft) border-(--danger-border) text-(--danger)',
        warn: 'bg-(--warning-soft) border-(--warning-border) text-(--warning)',
        success: 'bg-(--success-soft) border-(--success-border) text-(--success)',
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

const ANON_VISIBLE = 3

function LockedIssues({ count, type = 'error', onRegister }) {
    if (count <= 0) return null
    const fakeTexts = [
        'Weiteres kritisches Problem auf dieser Seite gefunden.',
        'Fehler beeinträchtigt deine Google-Sichtbarkeit.',
        'Problem mit hoher Priorität erkannt.',
    ]
    const styles = {
        error: 'bg-(--danger-soft) border-(--danger-border) text-(--danger)',
        warn: 'bg-(--warning-soft) border-(--warning-border) text-(--warning)',
    }
    const icons = { error: XCircle, warn: AlertTriangle }
    const Icon = icons[type] || XCircle
    const preview = Math.min(count, 2)

    return (
        <div className="relative mt-2">
            <div className="space-y-2 select-none pointer-events-none" style={{ filter: 'blur(5px)', opacity: 0.45 }}>
                {Array.from({ length: preview }).map((_, i) => (
                    <div key={i} className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-sm ${styles[type]}`}>
                        <Icon className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.8} />
                        {fakeTexts[i % fakeTexts.length]}
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl"
                style={{ background: 'linear-gradient(to top, var(--bg-base) 40%, transparent)' }}>
                <div className="flex flex-col items-center gap-1.5 pb-1">
                    <Lock className="w-3.5 h-3.5 text-(--text-faint)" />
                    <p className="text-xs font-semibold text-(--text-body)">+{count} weitere Problem{count !== 1 ? 'e' : ''} versteckt</p>
                    <button onClick={onRegister}
                        className="text-xs font-semibold text-(--accent-ink) hover:opacity-80 underline underline-offset-2 transition-colors">
                        Kostenlos registrieren um alle zu sehen →
                    </button>
                </div>
            </div>
        </div>
    )
}

function Section({ title, icon, children, defaultOpen = true }) {
    const [open, setOpen] = useState(defaultOpen)

    return (
        <div className="bg-(--card) border border-(--line) rounded-2xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 hover:bg-(--surface-08) transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className="text-lg">{icon}</span>
                    <span className="font-semibold text-(--text-white)">{title}</span>
                </div>
                {open ? <ChevronUp className="w-4 h-4 text-(--text-faint)" /> : <ChevronDown className="w-4 h-4 text-(--text-faint)" />}
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
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-(--border-subtle)">
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
    const [showRegisterModal, setShowRegisterModal] = useState(false)
    const [selectedGeoKws, setSelectedGeoKws] = useState(new Set())
    const [addingToGeo, setAddingToGeo] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsLoggedIn(!!token)

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
        if (data && !data.limitReached && !data.domainLimitReached) {
            const token = localStorage.getItem('token')
            // Vorher 2500ms - Modal verdeckte die Scores, bevor der Nutzer sie überhaupt gesehen
            // hatte. Erst den Score wirken lassen, dann registrieren vorschlagen.
            if (!token) setTimeout(() => setShowRegisterModal(true), 7000)
        }
    }

    const audit = result?.auditData
    const isPro = !!result?.aiReport
    const totalIssues = (audit?.performance?.issues?.length ?? 0) + (audit?.seo?.issues?.length ?? 0) + (audit?.geo?.issues?.length ?? 0)

    const openRegisterModal = () => {
        if (auditUrl) sessionStorage.setItem('pendingAuditUrl', auditUrl)
        setShowRegisterModal(true)
    }

    const toggleGeoKw = (kw) => setSelectedGeoKws(prev => {
        const n = new Set(prev); n.has(kw) ? n.delete(kw) : n.add(kw); return n
    })

    // Bringt die im Audit gefundenen Keyword-Vorschläge direkt in die GEO-Automatisierung ein —
    // legt die Site an, falls für diese Domain noch keine existiert, statt den Nutzer die
    // Keywords manuell rüberkopieren zu lassen.
    const handleAddToGeo = async () => {
        if (!isLoggedIn) { openRegisterModal(); return }
        if (!selectedGeoKws.size) return

        const token = localStorage.getItem('token')
        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        let domain
        try { domain = new URL(audit.url).hostname.replace(/^www\./, '') } catch { return }

        setAddingToGeo(true)
        try {
            const planRes = await fetch(`${apiUrl}/geo/plan`, { headers })
            const planData = await planRes.json()
            if (!planData.plan) {
                toast.error('GEO-Automatisierung erfordert ein aktives Abo')
                router.push('/geo/pricing')
                return
            }

            const sitesRes = await fetch(`${apiUrl}/geo/sites`, { headers })
            const sitesData = await sitesRes.json()
            const existingSite = (sitesData.sites || []).find(s => s.domain.replace(/^www\./, '') === domain)

            const keywords = [...selectedGeoKws]

            if (existingSite) {
                const res = await fetch(`${apiUrl}/geo/sites/${existingSite._id}/keywords`, {
                    method: 'POST', headers, body: JSON.stringify({ keywords }),
                })
                const d = await res.json()
                if (!res.ok) throw new Error(d.error)
                toast.success(`${d.added} Keyword${d.added !== 1 ? 's' : ''} zur GEO-Automatisierung hinzugefügt`)
                router.push(`/geo/${existingSite._id}`)
            } else {
                const res = await fetch(`${apiUrl}/geo/sites`, {
                    method: 'POST', headers, body: JSON.stringify({ domain, keywords }),
                })
                const d = await res.json()
                if (!res.ok) throw new Error(d.error)
                toast.success('Website mit Keywords zur GEO-Automatisierung hinzugefügt')
                router.push(`/geo/${d.site._id}`)
            }
        } catch (err) {
            toast.error(err.message || 'Fehler beim Hinzufügen zur GEO-Automatisierung')
        } finally {
            setAddingToGeo(false)
        }
    }

    return (
        <div className="min-h-screen bg-(--bg-base)">

            <Navbar />

            <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-28 pb-8 sm:pb-12">

                <ReactivationBanner />

                {/* HEADER */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                    <h1 className="text-2xl sm:text-4xl font-bold text-(--text-white) mb-3">
                        {result ? 'Audit Fertig' : 'Audit deine Website'}
                    </h1>
                    <p className="text-(--text-muted) text-sm max-md mx-auto px-4">
                        {result
                            ? `Resultate für ${result?.auditData?.url || auditUrl}`
                            : 'Prüfe GEO, SEO und Performance deiner Website in unter 60 Sekunden.'}
                    </p>
                    {result && !result.limitReached && (
                        <button
                            onClick={() => { setResult(null); setLoading(false) }}
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm text-(--text-muted) hover:text-(--text-white) border border-(--border-subtle) hover:border-(--border-strong) rounded-xl transition-all"
                        >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Neue Prüfung
                        </button>
                    )}
                </motion.div>

                {/* FORM */}
                {!result && !loading && (
                    <AuditForm
                        onAuditStart={(url) => { handleStart(); setAuditUrl(url) }}
                        onAuditComplete={handleComplete}
                    />
                )}

                {!result && !loading && (
                    <AuditHome locale="de" onRerun={(url) => runAudit(url, localStorage.getItem('token'))} />
                )}

                {/* LOADING */}
                {loading && <Loading url={auditUrl} />}

                {/* IP / PLAN RATE LIMIT */}
                {result?.limitReached && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center gap-6 py-16"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-(--warning-soft) border border-(--warning-border) flex items-center justify-center">
                            <Lock className="w-7 h-7 text-(--warning)" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-(--text-white) mb-2">Kostenlose Prüfung bereits genutzt</h2>
                            <p className="text-(--text-muted) max-w-md">
                                Du hast deine monatliche Gratis-Prüfung bereits durchgeführt. Upgrade auf{' '}
                                <span className="text-(--text-white) font-semibold">Pro</span>, um 10 Prüfungen pro Monat zu erhalten.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/pricing"
                                className="flex items-center gap-2 px-6 py-3 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) font-semibold rounded-[10px] transition-all active:scale-[0.97] active:duration-75"
                            >
                                Auf Pro upgraden <ArrowRight className="w-4 h-4" />
                            </Link>
                            <button onClick={() => setResult(null)}
                                className="px-6 py-3 text-(--text-muted) hover:text-(--text-white) border border-(--border-subtle) hover:border-(--border-strong) rounded-xl transition-all text-sm"
                            >
                                Zurück
                            </button>
                        </div>
                        <p className="text-xs text-(--text-faint)">Nächste kostenlose Prüfung: In einem Monat</p>
                    </motion.div>
                )}

                {/* DOMAIN LIMIT REACHED (anonymous, same domain again) */}
                {result?.domainLimitReached && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center gap-6 py-16"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-(--accent-soft) border border-(--accent-border) flex items-center justify-center">
                            <RefreshCw className="w-7 h-7 text-(--accent-ink)" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-(--text-white) mb-2">Hast du die Fehler behoben?</h2>
                            <p className="text-(--text-muted) max-w-md">
                                Diese Domain wurde bereits kostenlos geprüft. Erstell ein{' '}
                                <span className="text-(--text-white) font-semibold">kostenloses Konto</span> um deine Website erneut zu prüfen.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/register"
                                className="flex items-center gap-2 px-6 py-3 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) font-semibold rounded-[10px] transition-all active:scale-[0.97] active:duration-75"
                            >
                                <UserPlus className="w-4 h-4" /> Kostenlosen Account erstellen
                            </Link>
                            <Link href="/pricing"
                                className="flex items-center gap-2 px-6 py-3 text-(--text-body) hover:text-(--text-white) border border-(--border-subtle) hover:border-(--accent-border) font-semibold rounded-xl transition-all text-sm"
                            >
                                Pro für 29€/Monat <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <button onClick={() => setResult(null)} className="text-xs text-(--text-faint) hover:text-(--text-muted) transition-colors">
                            Andere URL prüfen
                        </button>
                    </motion.div>
                )}

                {/* RESULTS */}
                {result && audit && (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

                        {/* SCORE CARDS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                            <ScoreCard label="Gesamt" score={audit.overallScore ?? 0} />
                            <ScoreCard label="SEO" score={audit?.seo?.score ?? 0} delay={0.1} />
                            <ScoreCard label="Performance" score={audit?.performance?.score ?? 0} delay={0.2} />
                            <ScoreCard label="GEO" score={audit?.geo?.score ?? 0} delay={0.3} />
                        </div>


                        {/* FULL REPORT */}
                        {true && (
                            <>
                                {/* AI REPORT - nur Pro/Agency */}
                                {result.aiReport && (
                                    <Section title="KI-Analyse & Empfehlungen" icon="🤖">
                                        <div
                                            className="text-(--text-body) text-sm whitespace-pre-wrap wrap-break-word"
                                            dangerouslySetInnerHTML={{
                                                __html: (result.aiReport || '')
                                                    .replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#039;' }[c]))
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-(--text-white)">$1</strong>')
                                                    .replace(/\n/g, '<br/>'),
                                            }}
                                        />
                                    </Section>
                                )}

                                {/* PERFORMANCE */}
                                <Section title="Performance" icon="⚡">
                                    <div className="space-y-2">
                                        {(isLoggedIn ? audit?.performance?.issues : audit?.performance?.issues?.slice(0, ANON_VISIBLE))?.map((issue, i) => (
                                            <IssueItem key={i} text={issue} type="warn" />
                                        ))}
                                    </div>
                                    <LockedIssues
                                        count={isLoggedIn ? 0 : Math.max(0, (audit?.performance?.issues?.length ?? 0) - ANON_VISIBLE)}
                                        type="warn"
                                        onRegister={openRegisterModal}
                                    />
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
                                                ok ? 'bg-(--success-soft) border-(--success-border) text-(--success)' : 'bg-(--danger-soft) border-(--danger-border) text-(--danger)'
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
                                            {(isLoggedIn ? audit.seo.issues : audit.seo.issues.slice(0, ANON_VISIBLE)).map((issue, i) => (
                                                <div key={i} className="space-y-1.5">
                                                    <IssueItem text={issue} type="error" />
                                                    {isPro && audit.seo.suggestions?.[i] && (
                                                        <div className="ml-6 text-xs text-(--text-faint) bg-(--card) rounded-lg px-3 py-2 border border-(--line)">
                                                            Empfehlung: {audit.seo.suggestions[i]}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            <LockedIssues
                                                count={isLoggedIn ? 0 : Math.max(0, audit.seo.issues.length - ANON_VISIBLE)}
                                                type="error"
                                                onRegister={openRegisterModal}
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-(--success) text-sm">
                                            Alle SEO-Checks bestanden ✓
                                        </div>
                                    )}

                                    {/* Title + Description anzeigen */}
                                    {(audit?.seo?.title?.text || audit?.seo?.description?.text) && (
                                        <div className="mt-4 pt-4 border-t border-(--border-subtle) space-y-3">
                                            {audit?.seo?.title?.text && (
                                                <div>
                                                    <div className="text-xs text-(--text-faint) mb-1">Title-Tag</div>
                                                    <div className="text-xs text-(--text-muted) bg-(--card) rounded-lg px-3 py-2 border border-(--line)">{audit.seo.title.text}</div>
                                                </div>
                                            )}
                                            {audit?.seo?.description?.text && (
                                                <div>
                                                    <div className="text-xs text-(--text-faint) mb-1">Meta Description</div>
                                                    <div className="text-xs text-(--text-muted) bg-(--card) rounded-lg px-3 py-2 border border-(--line)">{audit.seo.description.text}</div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Section>

                                {/* GEO */}
                                {audit?.geo && (
                                    <Section title="GEO - KI-Sichtbarkeit" icon="🤖">
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
                                                    ok ? 'bg-(--success-soft) border-(--success-border) text-(--success)' : 'bg-(--danger-soft) border-(--danger-border) text-(--danger)'
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
                                                {(isLoggedIn ? audit.geo.issues : audit.geo.issues.slice(0, ANON_VISIBLE)).map((issue, i) => (
                                                    <div key={i} className="space-y-1.5">
                                                        <IssueItem text={issue} type="error" />
                                                        {isPro && audit.geo.suggestions?.[i] && (
                                                            <div className="ml-6 text-xs text-(--text-faint) bg-(--card) rounded-lg px-3 py-2 border border-(--line)">
                                                                Empfehlung: {audit.geo.suggestions[i]}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                                <LockedIssues
                                                    count={isLoggedIn ? 0 : Math.max(0, audit.geo.issues.length - ANON_VISIBLE)}
                                                    type="error"
                                                    onRegister={openRegisterModal}
                                                />
                                            </div>
                                        ) : (
                                            <div className="text-center py-4 text-(--success) text-sm mb-4">
                                                Alle GEO-Checks bestanden ✓
                                            </div>
                                        )}

                                        {/* Priorisierte Massnahmen - nur Pro */}
                                        {isPro && audit.geo.recommendations?.length > 0 && (
                                            <div className="space-y-2 mb-5">
                                                <div className="text-xs text-(--text-faint) mb-2">Priorisierte Massnahmen</div>
                                                {audit.geo.recommendations.map((r, i) => (
                                                    <div key={i} className="flex gap-3 bg-(--card) border border-(--line) rounded-xl p-4">
                                                        <span className={`text-xs font-bold px-2 py-1 rounded shrink-0 h-fit ${
                                                            r.priority === 'critical' ? 'bg-(--danger-soft) text-(--danger)' :
                                                            r.priority === 'high' ? 'bg-(--warning-soft) text-(--warning)' :
                                                            'bg-(--accent-soft) text-(--accent-ink)'
                                                        }`}>{{ critical: 'KRITISCH', high: 'HOCH', medium: 'MITTEL', low: 'NIEDRIG' }[r.priority] || r.priority}</span>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-sm font-semibold text-(--text-white) mb-1">{r.title}</div>
                                                            <div className="text-xs text-(--text-faint) leading-relaxed">{r.desc}</div>
                                                        </div>
                                                        <div className="text-xs text-(--text-faint) shrink-0 whitespace-nowrap">{r.effort}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Generated llms.txt - nur Pro */}
                                        {isPro && !audit.geo.checks?.hasLlmsTxt && audit.geo.generatedLlmsTxt && (
                                            <div className="mt-2">
                                                <div className="text-xs font-bold text-(--accent-ink) mb-2">
                                                    Generierte llms.txt - als /llms.txt in dein Projekt speichern
                                                </div>
                                                <pre className="bg-(--accent-soft) border border-(--accent-border) rounded-xl p-4 text-xs text-(--text-muted) overflow-auto whitespace-pre-wrap">
                                                    {audit.geo.generatedLlmsTxt}
                                                </pre>
                                            </div>
                                        )}
                                    </Section>
                                )}

                                {/* KEYWORD INTELLIGENCE - Brücke zur GEO-Automatisierung, damit Nutzer die im
                                    Audit gefundenen Vorschläge nicht manuell rüberkopieren müssen */}
                                {(audit?.keywords?.topKeywords?.length > 0 || audit?.keywords?.longTailSuggestions?.length > 0) && (
                                    <Section title="Keyword Intelligence" icon="🎯">
                                        <p className="text-xs text-(--text-faint) mb-4">
                                            Wähle Keywords aus und tracke automatisch, ob ChatGPT, Claude, Gemini, Perplexity oder Google AI Overview deine Website dafür nennen.
                                        </p>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                                            {[
                                                ...(audit.keywords.topKeywords || []).slice(0, 10).map(k => k.keyword),
                                                ...(audit.keywords.longTailSuggestions || []),
                                            ].map(kw => {
                                                const checked = selectedGeoKws.has(kw)
                                                return (
                                                    <button key={kw} type="button" onClick={() => toggleGeoKw(kw)}
                                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium text-left transition-all ${
                                                            checked
                                                                ? 'bg-(--accent-soft) border-(--accent-border) text-(--accent-ink)'
                                                                : 'bg-(--card) border-(--line) text-(--text-muted) hover:border-(--border-strong)'
                                                        }`}>
                                                        <div className={`w-3 h-3 rounded border shrink-0 ${checked ? 'bg-(--accent) border-(--accent)' : 'border-(--border-strong)'}`} />
                                                        <span className="truncate">{kw}</span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                        <button onClick={handleAddToGeo} disabled={!selectedGeoKws.size || addingToGeo}
                                            className="flex items-center gap-2 px-4 py-2.5 bg-(--accent) hover:bg-(--accent-hover) disabled:opacity-40 text-(--on-accent) text-sm font-semibold rounded-[10px] transition-all">
                                            <TrendingUp className="w-4 h-4" />
                                            {addingToGeo
                                                ? 'Wird hinzugefügt…'
                                                : `${selectedGeoKws.size || ''} Keyword${selectedGeoKws.size === 1 ? '' : 's'} zur GEO-Automatisierung hinzufügen`.trim()}
                                        </button>
                                    </Section>
                                )}

                                {/* AI REPORT UPSELL - nach den Issues, damit der Nutzer erst den Schmerz sieht */}
                                {!result.aiReport && (
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                        className="relative overflow-hidden rounded-2xl border border-(--accent-border) bg-(--bg-surface) p-6 sm:p-8 text-center">
                                        <div className="relative z-10">
                                            <div className="w-12 h-12 rounded-2xl bg-(--accent-soft) border border-(--accent-border) flex items-center justify-center mx-auto mb-4">
                                                <Bot className="w-6 h-6 text-(--accent-ink)" />
                                            </div>
                                            <h3 className="text-lg font-bold text-(--text-white) mb-2">Konkrete Fixes für jeden dieser Fehler</h3>
                                            <p className="text-(--text-muted) text-sm mb-5 max-w-md mx-auto leading-relaxed">
                                                {isLoggedIn
                                                    ? 'Der KI-Bericht analysiert deine spezifischen Ergebnisse und liefert Schritt-für-Schritt-Fixes - kein generisches "optimiere deinen Title-Tag".'
                                                    : 'Mit einem kostenlosen Account siehst du alle gefundenen Fehler. Die Schritt-für-Schritt-Fixes aus dem KI-Bericht und den PDF-Report gibt es ab Pro.'}
                                            </p>
                                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                                {isLoggedIn ? (
                                                    <>
                                                        <Link href="/pricing"
                                                            className="flex items-center justify-center gap-2 px-6 py-3 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) font-semibold rounded-[10px] transition-all active:scale-[0.97] active:duration-75 text-sm">
                                                            Pro für €29/Monat <ArrowRight className="w-4 h-4" />
                                                        </Link>
                                                        <Link href="/pricing"
                                                            className="flex items-center justify-center gap-2 px-6 py-3 text-(--text-muted) hover:text-(--text-white) border border-(--border-subtle) hover:border-(--border-strong) rounded-xl transition-all text-sm">
                                                            Alle Preise
                                                        </Link>
                                                    </>
                                                ) : (
                                                    <button onClick={openRegisterModal}
                                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) font-semibold rounded-[10px] transition-all active:scale-[0.97] active:duration-75 text-sm">
                                                        Kostenlos registrieren <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* SEO AUTOMATISIERUNG UPSELL */}
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                                        className="rounded-2xl border border-(--accent-border) bg-(--accent-soft) p-5">
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-9 h-9 rounded-xl bg-(--accent-soft-strong) border border-(--accent-border) flex items-center justify-center shrink-0">
                                                <TrendingUp className="w-4 h-4 text-(--accent-ink)" />
                                            </div>
                                            <div>
                                                <span className="text-xs font-semibold text-(--accent-ink) ">Add-on</span>
                                                <h3 className="text-sm font-bold text-(--text-white)">SEO Automatisierung</h3>
                                            </div>
                                        </div>
                                        <ul className="space-y-1.5 mb-4">
                                            {['Wöchentliche Google-Rankings', 'Keyword-Ideen & Suchvolumen', 'Konkurrenzanalyse', 'Backlink-Übersicht'].map(f => (
                                                <li key={f} className="flex items-center gap-2 text-xs text-(--text-faint)">
                                                    <CheckCircle className="w-3 h-3 text-(--accent)/60 shrink-0" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                        {isLoggedIn ? (
                                            <Link href="/seo/pricing" className="flex items-center justify-center gap-1.5 w-full px-4 py-2 bg-(--accent-soft) hover:bg-(--accent-soft-strong) border border-(--accent-border) text-(--accent-ink) text-xs font-semibold rounded-xl transition-all">
                                                Jetzt buchen <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        ) : (
                                            <div className="flex gap-2">
                                                <Link href="/register" className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-(--accent-soft) hover:bg-(--accent-soft-strong) border border-(--accent-border) text-(--accent-ink) text-xs font-semibold rounded-xl transition-all">
                                                    <UserPlus className="w-3 h-3" /> Registrieren
                                                </Link>
                                                <Link href="/seo/pricing" className="flex items-center justify-center px-3 py-2 border border-(--border-subtle) hover:border-(--border-strong) text-(--text-faint) hover:text-(--text-body) text-xs rounded-xl transition-all">
                                                    Preise
                                                </Link>
                                            </div>
                                        )}
                                    </motion.div>

                                {/* PDF DOWNLOAD - nur Pro/Agency */}
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
                                            className="flex items-center gap-2 px-6 py-3 bg-(--accent) text-(--on-accent) rounded-[10px]"
                                        >
                                            <Download className="w-4 h-4" />
                                            PDF herunterladen
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                ) : isLoggedIn ? (
                                    <div className="flex items-center justify-between gap-4 px-4 sm:px-5 py-4 rounded-xl border border-(--line) bg-(--card)">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-4 h-4 text-(--text-faint) shrink-0" />
                                            <span className="text-sm text-(--text-faint)">PDF-Report verfügbar mit Pro</span>
                                        </div>
                                        <Link href="/pricing"
                                            className="flex items-center gap-1.5 px-4 py-2 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) text-xs font-semibold rounded-lg transition-all shrink-0">
                                            Upgraden <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                ) : null}
                            </>
                        )}
                    </motion.div>
                )}
            </div>

            {/* FEEDBACK WIDGET - shown 30s after audit completes */}
            {result && audit && (
                <FeedbackWidget
                    auditUrl={auditUrl}
                    reportId={result.report?._id}
                />
            )}

            {/* REGISTER MODAL - anonymous users, 2.5s nach Audit */}
            <AnimatePresence>
                {showRegisterModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                        style={{ background: 'rgba(5,8,15,0.75)', backdropFilter: 'blur(8px)' }}
                        onClick={() => setShowRegisterModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 16 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-md bg-(--bg-surface) border border-(--border-subtle) rounded-2xl p-6 shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowRegisterModal(false)}
                                className="absolute top-4 right-4 text-(--text-faint) hover:text-(--text-body) transition-colors text-lg leading-none"
                            >✕</button>

                            <div className="mb-5">
                                <div className="w-10 h-10 rounded-xl bg-(--accent-soft-strong) border border-(--accent-border) flex items-center justify-center mb-4">
                                    <UserPlus className="w-5 h-5 text-(--accent-ink)" />
                                </div>
                                <h2 className="text-lg font-bold text-(--text-white) mb-1">Ergebnisse speichern</h2>
                                <p className="text-sm text-(--text-muted)">
                                    Erstelle einen kostenlosen Account und behalte deine Audits - kein Abo, keine Kreditkarte.
                                </p>
                            </div>

                            <ul className="space-y-2 mb-6">
                                {[
                                    'Audit-Verlauf & Vergleiche',
                                    'Erneut prüfen mit einem Klick',
                                    '1 Audit pro Monat kostenlos',
                                ].map(f => (
                                    <li key={f} className="flex items-center gap-2.5 text-sm text-(--text-body)">
                                        <span className="w-4 h-4 rounded-full bg-(--accent-soft-strong) flex items-center justify-center shrink-0">
                                            <span className="text-(--accent-ink) text-[10px]">✓</span>
                                        </span>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => {
                                    if (auditUrl) sessionStorage.setItem('pendingAuditUrl', auditUrl)
                                    router.push('/register')
                                }}
                                className="flex items-center justify-center gap-2 w-full py-3 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) font-semibold rounded-[10px] transition-all active:scale-[0.97] active:duration-75 mb-3"
                            >
                                <UserPlus className="w-4 h-4" />
                                Gratis Account erstellen
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}