'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Star } from 'lucide-react'

const LS_KEY = 'lf_submitted'

export default function LandingFeedback() {
    const [visible, setVisible] = useState(false)
    const [step, setStep] = useState('rating')
    const [rating, setRating] = useState(0)
    const [hovered, setHovered] = useState(0)
    const [auditBarrier, setAuditBarrier] = useState('')
    const [missingFeature, setMissingFeature] = useState('')
    const [sending, setSending] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem(LS_KEY)) return
        const t = setTimeout(() => setVisible(true), 15000)
        return () => clearTimeout(t)
    }, [])

    const dismiss = () => {
        setVisible(false)
        localStorage.setItem(LS_KEY, '1')
    }

    const handleRating = (value) => {
        setRating(value)
        setStep('text')
    }

    const handleSubmit = async () => {
        setSending(true)
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/landing-feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rating,
                    auditBarrier: auditBarrier.trim() || null,
                    missingFeature: missingFeature.trim() || null,
                }),
            })
        } catch { /* silent */ }
        setSending(false)
        setStep('done')
        localStorage.setItem(LS_KEY, '1')
        setTimeout(() => setVisible(false), 3000)
    }

    const ratingLabel = (r) => ['', 'Schlecht', 'Nicht gut', 'Ok', 'Gut', 'Sehr gut'][r] ?? ''

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    // bottom-28 (112px) auf Mobile damit es über der Sticky-URL-Bar liegt (~76px + safe area)
                    // sm:bottom-6 auf Desktop normal
                    className="fixed bottom-28 left-3 right-3 sm:bottom-6 sm:left-auto sm:right-6 sm:w-80 z-50 bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl shadow-black/60"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 sm:px-5 pt-4 pb-3 border-b border-white/5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Schnelles Feedback</span>
                        {step !== 'done' && (
                            <button
                                onClick={dismiss}
                                className="p-2 -mr-1.5 text-slate-600 hover:text-slate-400 transition-colors"
                                aria-label="Schließen"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                        <AnimatePresence mode="wait">

                            {/* Step 1: Sterne */}
                            {step === 'rating' && (
                                <motion.div key="rating"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}>
                                    <p className="text-sm font-semibold text-white mt-4 mb-4">
                                        Wie gefällt dir die Seite?
                                    </p>
                                    <div className="flex items-center justify-between gap-1 mb-1">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <button
                                                key={i}
                                                onClick={() => handleRating(i)}
                                                onMouseEnter={() => setHovered(i)}
                                                onMouseLeave={() => setHovered(0)}
                                                className="flex-1 flex flex-col items-center py-3 sm:py-2 rounded-xl active:bg-white/5 hover:bg-white/5 transition-all"
                                            >
                                                <Star
                                                    className="w-7 h-7 sm:w-6 sm:h-6 transition-all duration-150"
                                                    fill={(hovered || rating) >= i ? '#f59e0b' : 'transparent'}
                                                    stroke={(hovered || rating) >= i ? '#f59e0b' : 'rgba(100,116,139,0.5)'}
                                                    strokeWidth={1.5}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    <div className="text-center h-5">
                                        {(hovered > 0 || rating > 0) && (
                                            <span className="text-xs text-slate-500">{ratingLabel(hovered || rating)}</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={dismiss}
                                        className="w-full mt-2 text-xs text-slate-700 hover:text-slate-500 transition-colors py-3 sm:py-1"
                                    >
                                        Überspringen
                                    </button>
                                </motion.div>
                            )}

                            {/* Step 2: Textfelder */}
                            {step === 'text' && (
                                <motion.div key="text"
                                    initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                                    transition={{ duration: 0.2 }}>
                                    <div className="flex items-center gap-1 mt-4 mb-4">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star key={i} className="w-4 h-4"
                                                fill={i <= rating ? '#f59e0b' : 'transparent'}
                                                stroke={i <= rating ? '#f59e0b' : 'rgba(100,116,139,0.3)'}
                                                strokeWidth={1.5} />
                                        ))}
                                        <span className="text-xs text-slate-500 ml-1">{ratingLabel(rating)}</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs text-slate-400 mb-1.5 block leading-snug">
                                                Was hält dich davon ab, einen Audit zu starten?
                                            </label>
                                            <textarea
                                                value={auditBarrier}
                                                onChange={e => setAuditBarrier(e.target.value)}
                                                placeholder="z.B. Nicht sicher ob es wirklich kostenlos ist…"
                                                rows={2}
                                                // text-base (16px) auf Mobile verhindert iOS-Zoom; sm:text-xs auf Desktop
                                                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-base sm:text-xs leading-snug text-white placeholder-slate-600 outline-none focus:border-violet-500/50 resize-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-400 mb-1.5 block leading-snug">
                                                Was fehlt dir auf dieser Seite?
                                            </label>
                                            <textarea
                                                value={missingFeature}
                                                onChange={e => setMissingFeature(e.target.value)}
                                                placeholder="z.B. Mehr Beispiele, Preistransparenz…"
                                                rows={2}
                                                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-base sm:text-xs leading-snug text-white placeholder-slate-600 outline-none focus:border-violet-500/50 resize-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={dismiss}
                                            className="flex-1 py-3 sm:py-2.5 rounded-xl text-xs text-slate-500 hover:text-slate-300 border border-white/[0.06] hover:border-white/10 transition-all"
                                        >
                                            Überspringen
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={sending}
                                            className="flex-1 py-3 sm:py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 transition-all shadow-lg shadow-violet-500/20"
                                        >
                                            {sending ? 'Sende…' : 'Senden'}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Danke */}
                            {step === 'done' && (
                                <motion.div key="done"
                                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex flex-col items-center text-center py-5 gap-3">
                                    <CheckCircle className="w-9 h-9 text-emerald-400" strokeWidth={1.5} />
                                    <div>
                                        <p className="text-sm font-semibold text-white">Danke für dein Feedback!</p>
                                        <p className="text-xs text-slate-500 mt-1">Das hilft uns sehr, die Seite zu verbessern.</p>
                                    </div>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}