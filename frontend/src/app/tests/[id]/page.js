'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp, Clock, BarChart2 } from 'lucide-react'
import Link from 'next/link'

function StatusBadge({ status }) {
    const map = {
        running: 'bg-(--warning-soft) text-(--warning) border-(--warning-border)',
        done:    'bg-(--success-soft) text-(--success) border-(--success-border)',
        error:   'bg-(--danger-soft) text-(--danger) border-(--danger-border)',
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
        <div className="bg-(--card) border border-(--line) rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <div>
                <div className="text-2xl font-bold text-(--text-white)">{value}</div>
                <div className="text-xs text-(--text-faint)">{label}</div>
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

    const borderColor = fail ? 'border-(--danger-border)' : warn ? 'border-(--warning-border)' : 'border-(--line)'
    const expandBg    = fail ? 'border-(--danger-border)'  : 'border-(--warning-border)'
    const textColor   = fail ? 'text-(--danger)'        : 'text-(--warning)'
    const bgColor     = fail ? 'bg-(--danger-soft)'        : 'bg-(--warning-soft)'

    return (
        <div className={`rounded-xl border overflow-hidden ${borderColor}`}>
            <button
                onClick={() => expandable && setOpen(o => !o)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left ${expandable ? 'hover:bg-(--tint) cursor-pointer' : ''}`}
            >
                <span className="text-(--text-faint) text-xs w-5 shrink-0 text-right">{step.step}</span>
                {pass && <CheckCircle    className="w-4 h-4 text-(--success) shrink-0" strokeWidth={1.8} />}
                {warn && <AlertTriangle  className="w-4 h-4 text-(--warning) shrink-0"   strokeWidth={1.8} />}
                {fail && <XCircle        className="w-4 h-4 text-(--danger) shrink-0"     strokeWidth={1.8} />}
                <span className={`text-xs font-semibold px-2 py-0.5 rounded shrink-0 ${
                    step.action === 'navigate' ? 'bg-(--accent-soft) text-(--accent-ink)' :
                    step.action === 'click'    ? 'bg-(--accent-soft) text-(--accent-ink)' :
                    step.action === 'input'    ? 'bg-(--accent-soft) text-(--accent-ink)' :
                                                'bg-(--text-faint)/15 text-(--text-muted)'
                }`}>{step.action}</span>
                <span className="text-(--text-muted) text-sm truncate flex-1">
                    {step.action === 'navigate' ? (step.value || step.url) : (step.selector || '')}
                </span>
                {step.attempts > 1 && (
                    <span className="text-(--text-faint) text-xs shrink-0">{step.attempts}x</span>
                )}
                <span className="text-(--text-faint) text-xs shrink-0">{step.duration}ms</span>
                {expandable && (
                    open
                        ? <ChevronUp   className="w-3.5 h-3.5 text-(--text-faint) shrink-0" />
                        : <ChevronDown className="w-3.5 h-3.5 text-(--text-faint) shrink-0" />
                )}
            </button>

            {expandable && open && (
                <div className={`px-4 pb-4 border-t ${expandBg} pt-3 space-y-3`}>
                    <p className={`text-sm ${textColor} ${bgColor} rounded-xl px-3 py-2`}>{step.error}</p>
                    {step.screenshot && (
                        <img
                            src={`data:image/png;base64,${step.screenshot}`}
                            alt="Screenshot bei Fehler"
                            className="rounded-xl border border-(--line) w-full"
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
        <div className="min-h-screen bg-(--bg-base)">
            <nav className="sticky top-0 z-50 bg-(--bg-base)/90 backdrop-blur-xl border-b border-(--line)">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-(--accent) flex items-center justify-center">
                            <svg className="w-4 h-4 text-(--text-white)" viewBox="0 0 192 192" fill="none"><circle cx="96" cy="96" r="50" stroke="currentColor" strokeWidth="14" /><circle cx="110" cy="82" r="13" fill="currentColor" /></svg>
                        </div>
                        <span className="font-bold text-(--text-white)">
                            Scanora
                        </span>
                    </Link>
                    {data && <StatusBadge status={data.status} />}
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12">

                {/* Loading */}
                {!data && !error && (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <div className="w-8 h-8 border-2 border-(--accent-border) border-t-violet-500 rounded-full animate-spin" />
                        <p className="text-(--text-faint) text-sm">Test wird geladen…</p>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="bg-(--danger-soft) border border-(--danger-border) rounded-2xl p-8 text-center">
                        <XCircle className="w-10 h-10 text-(--danger) mx-auto mb-3" strokeWidth={1.5} />
                        <p className="text-(--text-white) font-semibold mb-1">Test nicht gefunden</p>
                        <p className="text-(--text-faint) text-sm">{error}</p>
                    </div>
                )}

                {/* Result */}
                {data && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

                        {/* Header */}
                        <div>
                            <h1 className="text-2xl font-bold text-(--text-white)">{data.name}</h1>
                            <p className="text-(--text-faint) text-sm mt-1">
                                {new Date(data.createdAt).toLocaleString('de-DE')}
                            </p>
                        </div>

                        {/* Running spinner */}
                        {data.status === 'running' && (
                            <div className="flex items-center gap-3 bg-(--warning-soft) border border-(--warning-border) rounded-2xl px-5 py-4">
                                <div className="w-5 h-5 border-2 border-(--warning-border) border-t-amber-400 rounded-full animate-spin shrink-0" />
                                <p className="text-(--warning) text-sm">Test läuft - Seite aktualisiert sich automatisch…</p>
                            </div>
                        )}

                        {/* Summary */}
                        {data.summary && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <StatCard icon={BarChart2}      label="Gesamt"    value={data.summary.total}            color="bg-(--text-faint)/15 text-(--text-muted)" />
                                <StatCard icon={CheckCircle}    label="Bestanden" value={data.summary.passed}           color="bg-(--success-soft) text-(--success)" />
                                <StatCard icon={AlertTriangle}  label="Warnungen" value={data.summary.warned ?? 0}      color="bg-(--warning-soft) text-(--warning)" />
                                <StatCard icon={XCircle}        label="Fehler"    value={data.summary.failed}           color="bg-(--danger-soft) text-(--danger)" />
                                <StatCard icon={Clock}          label="Dauer"     value={`${(data.summary.duration / 1000).toFixed(1)}s`} color="bg-(--accent-soft) text-(--accent-ink)" />
                            </div>
                        )}

                        {/* Steps */}
                        {data.steps?.length > 0 && (
                            <div className="bg-(--card) border border-(--line) rounded-2xl p-4 space-y-2">
                                <h2 className="text-sm font-semibold text-(--text-muted) mb-3">Schritte</h2>
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