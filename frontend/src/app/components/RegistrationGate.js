'use client'
import { motion } from 'framer-motion'
import { Lock, UserPlus, ArrowRight, Zap, Search, Globe } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const LOCKED_FEATURES = [
    { icon: Search, label: 'SEO-Lösungen' },
    { icon: Zap, label: 'Performance-Tipps' },
    { icon: Globe, label: 'GEO-Optimierung' },
]

const PENDING_URL_KEY = 'pendingAuditUrl'

// stats: [{ count, label, severity: 'critical' | 'warn' }]
export default function RegistrationGate({ stats = [], auditUrl = '' }) {
    const router = useRouter()
    const total = stats.reduce((sum, s) => sum + s.count, 0)

    const handleRegister = () => {
        if (auditUrl) sessionStorage.setItem(PENDING_URL_KEY, auditUrl)
        router.push('/register')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden rounded-2xl border border-violet-500/25 bg-[#0d1117] p-5 sm:p-8 md:p-12 text-center shadow-2xl shadow-violet-500/10"
        >
            <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/8 blur-3xl" />

            <div className="relative z-10 max-w-lg mx-auto">

                {/* Category badges */}
                {stats.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                        {stats.map(({ count, label, severity }) => (
                            <div key={label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-semibold ${
                                severity === 'critical'
                                    ? 'bg-red-500/15 border-red-500/25 text-red-400'
                                    : 'bg-amber-500/15 border-amber-500/25 text-amber-400'
                            }`}>
                                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${severity === 'critical' ? 'bg-red-400 animate-pulse' : 'bg-amber-400'}`} />
                                {count} {label}
                            </div>
                        ))}
                    </div>
                )}

                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-5">
                    <Lock className="w-6 h-6 text-violet-400" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                    {total > 0
                        ? `${total} Problem${total !== 1 ? 'e' : ''} gefunden`
                        : 'Audit abgeschlossen'}
                </h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                    Diese Fehler kosten dich täglich Besucher. Registriere dich kostenlos — und sieh genau, wie du jeden einzelnen behebst.
                </p>

                {/* What gets unlocked */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {LOCKED_FEATURES.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex flex-col items-center gap-2 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                            <Icon className="w-5 h-5 text-slate-400" />
                            <span className="text-[11px] text-slate-500 leading-tight">{label}</span>
                        </div>
                    ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={handleRegister}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/20"
                    >
                        <UserPlus className="w-4 h-4" />
                        Keine Registrierung nötig
                    </button>
                    <Link
                        href="/pricing"
                        className="flex items-center justify-center gap-2 px-6 py-3 text-slate-300 hover:text-white border border-white/10 hover:border-violet-500/40 text-sm font-semibold rounded-xl transition-all"
                    >
                        Pro für 29€/Monat
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <Link href="/login" className="block mt-5 text-xs text-slate-600 hover:text-slate-400 transition-colors">
                    Bereits registriert? Einloggen →
                </Link>
            </div>
        </motion.div>
    )
}
