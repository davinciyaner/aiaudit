'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThumbsUp, ThumbsDown, X, CheckCircle } from 'lucide-react'

const POSITIVE_OPTIONS = [
    { value: 'seo',         label: 'Die SEO-Analyse' },
    { value: 'geo',         label: 'Die GEO-Sichtbarkeit' },
    { value: 'performance', label: 'Die Performance-Tipps' },
    { value: 'suggestions', label: 'Die Verbesserungsvorschläge' },
]

const NEGATIVE_OPTIONS = [
    { value: 'unclear',        label: 'Die Ergebnisse waren unklar' },
    { value: 'more_details',   label: 'Ich wollte mehr Details' },
    { value: 'not_actionable', label: 'Die Tipps waren nicht umsetzbar' },
    { value: 'broken',         label: 'Etwas hat nicht funktioniert' },
]

export default function FeedbackWidget({ auditUrl, reportId }) {
    const [visible, setVisible] = useState(false)
    const [vote, setVote] = useState(null)
    const [done, setDone] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 15000)
        return () => clearTimeout(t)
    }, [])

    const handleVote = (v) => setVote(v)

    const handleReason = async (reason) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: auditUrl, reportId, vote, reason }),
            })
        } catch { /* silent */ }
        setDone(true)
        setTimeout(() => setVisible(false), 2500)
    }

    const handleDismiss = () => setVisible(false)

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-72 z-50 bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-5"
                >
                    {/* Close */}
                    {!done && (
                        <button
                            onClick={handleDismiss}
                            className="absolute top-3 right-3 p-1 text-slate-600 hover:text-slate-400 transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}

                    <AnimatePresence mode="wait">
                        {/* STEP 1 — vote */}
                        {!vote && !done && (
                            <motion.div key="vote" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <p className="text-sm font-semibold text-white mb-4 pr-4">
                                    War dieser Audit hilfreich?
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleVote('yes')}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all text-sm font-medium"
                                    >
                                        <ThumbsUp className="w-4 h-4" /> Ja
                                    </button>
                                    <button
                                        onClick={() => handleVote('no')}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-sm font-medium"
                                    >
                                        <ThumbsDown className="w-4 h-4" /> Nein
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2 — follow-up */}
                        {vote && !done && (
                            <motion.div key="reason" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <p className="text-sm font-semibold text-white mb-3 pr-4">
                                    {vote === 'yes' ? 'Was hat dir am meisten geholfen?' : 'Was hat gefehlt?'}
                                </p>
                                <div className="space-y-1.5">
                                    {(vote === 'yes' ? POSITIVE_OPTIONS : NEGATIVE_OPTIONS).map(opt => (
                                        <button
                                            key={opt.value}
                                            onClick={() => handleReason(opt.value)}
                                            className="w-full text-left px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.07] hover:border-white/15 text-slate-300 hover:text-white text-xs transition-all"
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3 — thank you */}
                        {done && (
                            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center text-center py-2 gap-3">
                                <CheckCircle className="w-8 h-8 text-emerald-400" strokeWidth={1.5} />
                                <p className="text-sm font-semibold text-white">Danke für dein Feedback!</p>
                                <p className="text-xs text-slate-500">Das hilft uns, besser zu werden.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
