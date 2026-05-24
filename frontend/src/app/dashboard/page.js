'use client'

import {useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {
    Zap,
    Download,
    RefreshCw,
    ExternalLink,
    AlertTriangle,
    CheckCircle,
    XCircle,
    ChevronDown,
    ChevronUp
} from 'lucide-react'
import {Toaster} from 'react-hot-toast'
import Link from 'next/link'

import ScoreCard from "../components/ScoreCard"
import AuditForm from "../components/AuditForm"
import Loading from "../components/Loading"

function IssueItem({text, type = 'error'}) {
    const styles = {
        error: 'bg-red-500/10 border-red-500/20 text-red-400',
        warn: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
        success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    }

    const icons = {error: XCircle, warn: AlertTriangle, success: CheckCircle}
    const Icon = icons[type] || AlertTriangle

    return (
        <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-sm ${styles[type]}`}>
            <Icon className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.8}/>
            {text}
        </div>
    )
}

function Section({title, icon, children, defaultOpen = true}) {
    const [open, setOpen] = useState(defaultOpen)

    return (
        <div className="bg-white/2 border border-white/[0.07] rounded-2xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-6 py-5 hover:bg-white/2 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className="text-lg">{icon}</span>
                    <span className="font-semibold text-white">{title}</span>
                </div>
                {open ? (
                    <ChevronUp className="w-4 h-4 text-slate-500"/>
                ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500"/>
                )}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{height: 0, opacity: 0}}
                        animate={{height: 'auto', opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{duration: 0.3}}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 border-t border-white/5">
                            <div className="pt-4">{children}</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function Dashboard() {
    const [loading, setLoading] = useState(false)
    const [auditUrl, setAuditUrl] = useState('')
    const [result, setResult] = useState(null)

    const handleStart = () => {
        setLoading(true)
        setResult(null)
    }

    const handleComplete = (data) => {
        setLoading(false)
        setResult(data || null)
    }

    // 🔥 SAFE ACCESS (CRASH FIX)
    const audit = result?.auditData

    // 🔥 DOWNLOAD URL FIX
    const downloadUrl =
        result?.reportFile
            ? `${process.env.NEXT_PUBLIC_API_URL.replace('/api', '')}/reports/${result.reportFile.split('/').pop()}`
            : null

    return (
        <div className="min-h-screen bg-[#080b14]">
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#0d1117',
                        color: '#e8e5e0',
                        border: '1px solid rgba(255,255,255,0.08)'
                    }
                }}
            />

            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 bg-[#080b14]/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div
                            className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white"/>
                        </div>
                        <span className="font-bold text-white">
                            Audit<span className="text-cyan-400">AI</span>
                        </span>
                    </Link>

                    {result && (
                        <button
                            onClick={() => {
                                setResult(null)
                                setLoading(false)
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white border border-white/10 rounded-xl"
                        >
                            <RefreshCw className="w-3.5 h-3.5"/>
                            Neuer Audit
                        </button>
                    )}
                </div>
            </nav>

            <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">

                {/* HEADER */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        {result ? 'Audit Fertig' : 'Audit deine Website'}
                    </h1>
                    <p className="text-slate-400">
                        {result
                            ? `Resultate für ${result?.auditData?.url || auditUrl}`
                            : 'Gib deine URL ein und erhalte einen vollständigen AI Bericht'}
                    </p>
                </motion.div>

                {/* FORM */}
                {!result && !loading && (
                    <AuditForm
                        onAuditStart={(url) => {
                            handleStart()
                            setAuditUrl(url)
                        }}
                        onAuditComplete={handleComplete}
                    />
                )}

                {/* LOADING */}
                {loading && <Loading url={auditUrl}/>}

                {/* RESULTS */}
                {result && audit && (
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        className="space-y-6"
                    >

                        {/* SCORE CARDS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <ScoreCard label="Overall" score={audit.overallScore ?? 0}/>
                            <ScoreCard label="SEO" score={audit?.seo?.score ?? 0}/>
                            <ScoreCard label="Performance" score={audit?.performance?.score ?? 0}/>
                            <ScoreCard label="Security" score={audit?.security?.score ?? 0}/>
                        </div>

                        {/* AI REPORT */}
                        <Section title="AI Analysis & Recommendations" icon="🤖">
                            <div
                                className="text-slate-300 text-sm whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{
                                    __html: (result.aiReport || '')
                                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                                        .replace(/\n/g, '<br/>')
                                }}
                            />
                        </Section>

                        {/* PERFORMANCE */}
                        <Section title="Performance" icon="⚡">
                            <div className="space-y-2">
                                {audit?.performance?.issues?.map((issue, i) => (
                                    <IssueItem key={i} text={issue} type="warn"/>
                                ))}
                            </div>
                        </Section>

                        {/* SEO */}
                        <Section title="SEO Analysis" icon="🔍">
                            <div className="text-white text-sm">
                                Title: {audit?.seo?.title?.text || 'N/A'}
                            </div>
                        </Section>

                        // In ScoreCard Grid:
                        <ScoreCard label="GEO" score={audit?.geo?.score ?? 0} delay={0.4}/>

                        // Neue Section:
                        <Section title="GEO — AI Visibility" icon="🤖">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                                {[
                                    ['llms.txt', audit.geo.checks.hasLlmsTxt],
                                    ['FAQ Schema', audit.geo.checks.hasFAQ],
                                    ['Organization', audit.geo.checks.hasOrganization],
                                    ['AI Crawlers', audit.geo.checks.robotsAllowsAI],
                                ].map(([name, ok]) => (
                                    <div key={name}
                                         className={`rounded-xl p-3 text-center border ${ok ? 'bg-emerald-500/8 border-emerald-500/20' : 'bg-red-500/8 border-red-500/20'}`}>
                                        <div className="text-xl mb-1">{ok ? '✅' : '❌'}</div>
                                        <div
                                            className={`text-xs font-semibold ${ok ? 'text-emerald-400' : 'text-red-400'}`}>{name}</div>
                                    </div>
                                ))}
                            </div>

                            {audit.geo.recommendations.map((r, i) => (
                                <div key={i}
                                     className="flex gap-3 bg-white/2 border border-white/6 rounded-xl p-4 mb-3">
            <span className={`text-xs font-bold px-2 py-1 rounded shrink-0 ${
                r.priority === 'critical' ? 'bg-red-500/15 text-red-400' :
                    r.priority === 'high' ? 'bg-amber-500/15 text-amber-400' :
                        'bg-blue-500/15 text-blue-400'}`}>{r.priority}</span>
                                    <div>
                                        <div className="text-sm font-semibold text-white mb-1">{r.title}</div>
                                        <div className="text-xs text-slate-500 leading-relaxed">{r.desc}</div>
                                    </div>
                                    <div className="text-xs text-slate-600 shrink-0">{r.effort}</div>
                                </div>
                            ))}

                            {/* Generated llms.txt */}
                            <div className="mt-4">
                                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                                    Generated llms.txt — save as /llms.txt in your project
                                </div>
                                <pre
                                    className="bg-cyan-500/5 border border-cyan-500/15 rounded-xl p-4 text-xs text-slate-400 overflow-auto">
            {audit.geo.generatedLlmsTxt}
        </pre>
                            </div>
                        </Section>

                        {/* SECURITY */}
                        <Section title="Security" icon="🔒">
                            {audit?.security?.checks?.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
                                    {audit.security.checks.map((chk, i) => (
                                        <div
                                            key={i}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium ${
                                                chk.passed
                                                    ? 'bg-emerald-500/8 border-emerald-500/20 text-emerald-400'
                                                    : chk.severity === 'critical'
                                                        ? 'bg-red-500/10 border-red-500/30 text-red-400'
                                                        : chk.severity === 'high'
                                                            ? 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                                                            : chk.severity === 'info'
                                                                ? 'bg-slate-500/8 border-slate-500/20 text-slate-400'
                                                                : 'bg-amber-500/8 border-amber-500/20 text-amber-400'
                                            }`}
                                        >
                                            {chk.passed
                                                ? <CheckCircle className="w-3 h-3 shrink-0" strokeWidth={2}/>
                                                : <XCircle className="w-3 h-3 shrink-0" strokeWidth={2}/>
                                            }
                                            <span className="truncate">{chk.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {audit?.security?.issues?.length > 0 ? (
                                <div className="space-y-3">
                                    {audit.security.issues.map((issue, i) => (
                                        <div key={i} className="space-y-1.5">
                                            <IssueItem text={issue} type="error"/>
                                            {audit.security.suggestions?.[i] && (
                                                <div className="ml-6 text-xs text-slate-500 bg-white/[0.02] rounded-lg px-3 py-2 border border-white/[0.05]">
                                                    Empfehlung: {audit.security.suggestions[i]}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4 text-emerald-400 text-sm">
                                    Alle Security-Checks bestanden
                                </div>
                            )}
                        </Section>

                        {/* DOWNLOAD */}
                        {result?.reportFile && (
                            <div className="flex justify-center pt-6">
                                <a
                                    href={`${process.env.NEXT_PUBLIC_API_URL.replace('/api', '')}/reports/${result.reportFile.split('/').pop()}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-xl"
                                >
                                    <Download className="w-4 h-4"/>
                                    PDF herunterladen
                                    <ExternalLink className="w-3.5 h-3.5"/>
                                </a>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    )
}