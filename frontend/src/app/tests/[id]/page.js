'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle, Zap, ChevronDown, ChevronUp, Clock, BarChart2 } from 'lucide-react'
import Link from 'next/link'

function StatusBadge({ status }) {
    const map = {
        running: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
        done:    'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
        error:   'bg-red-500/15 text-red-400 border-red-500/25',
    }
    const labels = { running: 'Läuft…', done: 'Fertig', error: 'Fehler' }
    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${map[status] ?? map.error}`}>
            {labels[status] ?? status}
        </span>
    )
}

function StatCard({ icon: Icon, label, value, color }) {
    return (
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <div>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-slate-500">{label}</div>
            </div>
        </div>
    )
}

function StepRow({ step }) {
    const [open, setOpen] = useState(false)
    const pass = step.result === 'pass'
    const warn = step.result === 'warn'
    const fail = step.result === 'fail'
    const expandable = warn || fail

    const borderColor = fail ? 'border-red-500/20' : warn ? 'border-amber-500/20' : 'border-white/[0.06]'
    const expandBg    = fail ? 'border-red-500/10'  : 'border-amber-500/10'
    const textColor   = fail ? 'text-red-400'        : 'text-amber-400'
    const bgColor     = fail ? 'bg-red-500/8'        : 'bg-amber-500/8'

    return (
        <div className={`rounded-xl border overflow-hidden ${borderColor}`}>
            <button
                onClick={() => expandable && setOpen(o => !o)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left ${expandable ? 'hover:bg-white/2 cursor-pointer' : ''}`}
            >
                <span className="text-slate-600 text-xs w-5 shrink-0 text-right">{step.step}</span>
                {pass && <CheckCircle    className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.8} />}
                {warn && <AlertTriangle  className="w-4 h-4 text-amber-400 shrink-0"   strokeWidth={1.8} />}
                {fail && <XCircle        className="w-4 h-4 text-red-400 shrink-0"     strokeWidth={1.8} />}
                <span className={`text-xs font-semibold px-2 py-0.5 rounded shrink-0 ${
                    step.action === 'navigate' ? 'bg-violet-500/15 text-violet-400' :
                    step.action === 'click'    ? 'bg-cyan-500/15 text-cyan-400' :
                    step.action === 'input'    ? 'bg-blue-500/15 text-blue-400' :
                                                'bg-slate-500/15 text-slate-400'
                }`}>{step.action}</span>
                <span className="text-slate-400 text-sm truncate flex-1">
                    {step.action === 'navigate' ? (step.value || step.url) : (step.selector || '')}
                </span>
                {step.attempts > 1 && (
                    <span className="text-slate-600 text-xs shrink-0">{step.attempts}x</span>
                )}
                <span className="text-slate-600 text-xs shrink-0">{step.duration}ms</span>
                {expandable && (
                    open
                        ? <ChevronUp   className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        : <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                )}
            </button>

            {expandable && open && (
                <div className={`px-4 pb-4 border-t ${expandBg} pt-3 space-y-3`}>
                    <p className={`text-sm ${textColor} ${bgColor} rounded-xl px-3 py-2`}>{step.error}</p>
                    {step.screenshot && (
                        <img
                            src={`data:image/png;base64,${step.screenshot}`}
                            alt="Screenshot bei Fehler"
                            className="rounded-xl border border-white/[0.06] w-full"
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default function TestResultPage() {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) return
        let stopped = false

        async function load() {
            try {
                const token = localStorage.getItem('token')
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tests/${id}`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                })
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const json = await res.json()
                if (!stopped) setData(json)
                if (json.status === 'running' && !stopped) {
                    setTimeout(load, 2000)
                }
            } catch (e) {
                if (!stopped) setError(e.message)
            }
        }

        load()
        return () => { stopped = true }
    }, [id])

    return (
        <div className="min-h-screen bg-[#080b14]">
            <nav className="sticky top-0 z-50 bg-[#080b14]/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-white">
                            Audit<span className="text-cyan-400">AI</span>
                        </span>
                    </Link>
                    {data && <StatusBadge status={data.status} />}
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12">

                {/* Loading */}
                {!data && !error && (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                        <p className="text-slate-500 text-sm">Test wird geladen…</p>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="bg-red-500/8 border border-red-500/20 rounded-2xl p-8 text-center">
                        <XCircle className="w-10 h-10 text-red-400 mx-auto mb-3" strokeWidth={1.5} />
                        <p className="text-white font-semibold mb-1">Test nicht gefunden</p>
                        <p className="text-slate-500 text-sm">{error}</p>
                    </div>
                )}

                {/* Result */}
                {data && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

                        {/* Header */}
                        <div>
                            <h1 className="text-2xl font-bold text-white">{data.name}</h1>
                            <p className="text-slate-500 text-sm mt-1">
                                {new Date(data.createdAt).toLocaleString('de-DE')}
                            </p>
                        </div>

                        {/* Running spinner */}
                        {data.status === 'running' && (
                            <div className="flex items-center gap-3 bg-amber-500/8 border border-amber-500/20 rounded-2xl px-5 py-4">
                                <div className="w-5 h-5 border-2 border-amber-400/40 border-t-amber-400 rounded-full animate-spin shrink-0" />
                                <p className="text-amber-400 text-sm">Test läuft — Seite aktualisiert sich automatisch…</p>
                            </div>
                        )}

                        {/* Summary */}
                        {data.summary && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <StatCard icon={BarChart2}      label="Gesamt"    value={data.summary.total}            color="bg-slate-500/15 text-slate-400" />
                                <StatCard icon={CheckCircle}    label="Bestanden" value={data.summary.passed}           color="bg-emerald-500/15 text-emerald-400" />
                                <StatCard icon={AlertTriangle}  label="Warnungen" value={data.summary.warned ?? 0}      color="bg-amber-500/15 text-amber-400" />
                                <StatCard icon={XCircle}        label="Fehler"    value={data.summary.failed}           color="bg-red-500/15 text-red-400" />
                                <StatCard icon={Clock}          label="Dauer"     value={`${(data.summary.duration / 1000).toFixed(1)}s`} color="bg-violet-500/15 text-violet-400" />
                            </div>
                        )}

                        {/* Steps */}
                        {data.steps?.length > 0 && (
                            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 space-y-2">
                                <h2 className="text-sm font-semibold text-slate-400 mb-3">Schritte</h2>
                                {data.steps.map((step, i) => (
                                    <StepRow key={i} step={step} />
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    )
}