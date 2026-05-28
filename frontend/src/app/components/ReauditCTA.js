'use client'
import { motion } from 'framer-motion'
import { RefreshCw, ArrowRight, UserPlus } from 'lucide-react'
import Link from 'next/link'

export default function ReauditCTA() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 p-6 md:p-8"
        >
            {/* subtle glow */}
            <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-violet-600/10 blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <RefreshCw className="w-4 h-4 text-violet-400" />
                        <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
                            Nächster Schritt
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">
                        Hast du die Fehler behoben?
                    </h3>
                    <p className="text-slate-400 text-sm max-w-sm">
                        Prüf deine Website erneut und sieh ob sich dein Score verbessert hat.
                        Registriere dich kostenlos für weitere Audits.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <Link
                        href="/register"
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/20"
                    >
                        <UserPlus className="w-4 h-4" />
                        Kostenlos registrieren
                    </Link>
                    <Link
                        href="/pricing"
                        className="flex items-center gap-2 px-5 py-2.5 text-slate-300 hover:text-white border border-white/10 hover:border-violet-500/40 text-sm font-semibold rounded-xl transition-all"
                    >
                        Pro für 29€/Monat
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}