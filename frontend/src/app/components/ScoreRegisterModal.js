'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, UserPlus, Search, Shield, Zap, Globe } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const FREE_ITEMS = [
    { icon: Search, label: 'SEO-Analyse & alle Probleme' },
    { icon: Shield, label: 'Security-Checks' },
    { icon: Zap, label: 'Performance-Score' },
    { icon: Globe, label: 'KI-Sichtbarkeit (GEO)' },
]


// mode="start" → Pre-Audit (Registrierung nötig um zu starten)
export default function ScoreRegisterModal({ open, onClose, auditUrl = '', mode = 'start' }) {
    const router = useRouter()

    const handleRegister = () => {
        if (auditUrl) sessionStorage.setItem('pendingAuditUrl', auditUrl)
        onClose()
        router.push('/register')
    }

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                        <motion.div
                            key="modal"
                            initial={{ opacity: 0, scale: 0.94, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 16 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                            className="relative w-full max-w-md bg-[#0d1117] border border-violet-500/25 rounded-2xl shadow-2xl shadow-violet-500/10 overflow-hidden pointer-events-auto"
                        >
                            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-violet-600/10 blur-3xl" />

                            <div className="relative z-10 p-6 sm:p-8 text-center">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-5">
                                    <Lock className="w-6 h-6 text-violet-400" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">
                                    Kostenlos registrieren & Audit starten
                                </h3>
                                <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                                    Mit einem kostenlosen Account siehst du alle Scores, Probleme und Security-Checks deiner Website.
                                </p>

                                <div className="mb-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">Kostenlos enthalten</span>
                                        <div className="flex-1 h-px bg-white/5" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {FREE_ITEMS.map(({ icon: Icon, label }) => (
                                            <div key={label} className="flex items-center gap-2 p-3 bg-white/3 border border-white/6 rounded-xl text-left">
                                                <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                                                <span className="text-xs text-slate-400">{label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                <button
                                    onClick={handleRegister}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/20 mb-3"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Kostenlos registrieren
                                </button>

                                <Link
                                    href="/login"
                                    onClick={onClose}
                                    className="block text-xs text-slate-600 hover:text-slate-400 transition-colors"
                                >
                                    Bereits registriert? Einloggen →
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}