'use client'
import { motion } from 'framer-motion'
import { Lock, UserPlus, ArrowRight, Zap, Search, Globe } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const LOCKED_FEATURES = [
    { icon: Search, label: 'SEO-Lösungen' },
    { icon: Zap, label: 'Performance-Tipps' },
    { icon: Globe, label: 'GEO-Optimierung' },
    { icon: UserPlus, label: 'Audit-Verlauf' },
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
            className="relative overflow-hidden rounded-2xl border border-(--accent-border) bg-(--bg-base) p-5 sm:p-8 md:p-12 text-center shadow-2xl shadow-(--accent-border)"
        >

            <div className="relative z-10 max-w-lg mx-auto">

                {/* Category badges */}
                {stats.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                        {stats.map(({ count, label, severity }) => (
                            <div key={label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-semibold ${
                                severity === 'critical'
                                    ? 'bg-(--danger-soft) border-(--danger-border) text-(--danger)'
                                    : 'bg-(--warning-soft) border-(--warning-border) text-(--warning)'
                            }`}>
                                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${severity === 'critical' ? 'bg-(--danger) animate-pulse' : 'bg-(--warning)'}`} />
                                {count} {label}
                            </div>
                        ))}
                    </div>
                )}

                <div className="w-14 h-14 rounded-2xl bg-(--accent-soft) border border-(--accent-border) flex items-center justify-center mx-auto mb-5">
                    <Lock className="w-6 h-6 text-(--accent-ink)" />
                </div>

                <h3 className="text-2xl font-bold text-(--text-white) mb-2">
                    {total > 0
                        ? `${total} Problem${total !== 1 ? 'e' : ''} gefunden`
                        : 'Audit abgeschlossen'}
                </h3>
                <p className="text-(--text-muted) text-sm mb-8 leading-relaxed">
                    Diese Fehler kosten dich täglich Besucher. Registriere dich kostenlos - und sieh genau, wie du jeden einzelnen behebst.
                </p>

                {/* What gets unlocked */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {LOCKED_FEATURES.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex flex-col items-center gap-2 p-3 bg-(--card) border border-(--line) rounded-xl">
                            <Icon className="w-5 h-5 text-(--text-muted)" />
                            <span className="text-[11px] text-(--text-faint) leading-tight">{label}</span>
                        </div>
                    ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={handleRegister}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-(--accent) hover:bg-(--accent) hover:text-(--on-accent) font-semibold rounded-xl transition-all shadow-lg shadow-(--accent-border)"
                    >
                        <UserPlus className="w-4 h-4" />
                        Fixes kostenlos freischalten
                    </button>
                    <Link
                        href="/pricing"
                        className="flex items-center justify-center gap-2 px-6 py-3 text-(--text-body) hover:text-(--text-white) border border-(--line) hover:border-(--accent-border) text-sm font-semibold rounded-xl transition-all"
                    >
                        Pro für 29€/Monat
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <Link href="/login" className="block mt-5 text-xs text-(--text-faint) hover:text-(--text-muted) transition-colors">
                    Bereits registriert? Einloggen →
                </Link>
            </div>
        </motion.div>
    )
}
