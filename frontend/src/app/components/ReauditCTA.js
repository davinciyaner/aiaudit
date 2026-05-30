'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, BarChart2, Globe, FileText } from 'lucide-react'
import Link from 'next/link'

const PRO_FEATURES = [
    { icon: BarChart2, label: '10 Audits pro Monat' },
    { icon: FileText, label: 'KI-Bericht mit Fixes' },
    { icon: Globe, label: 'PDF-Export' },
    { icon: Calendar, label: 'Audit-Verlauf' },
]

export default function ReauditCTA() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6"
        >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
                <div>
                    <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2 block">
                        Mehr mit Pro
                    </span>
                    <h3 className="text-base font-bold text-white mb-3">
                        KI-Bericht &amp; PDF mit Pro freischalten
                    </h3>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {PRO_FEATURES.map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
                                <Icon className="w-3.5 h-3.5 text-slate-600" />
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
                <Link
                    href="/pricing"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/20 shrink-0"
                >
                    Zu Pro upgraden
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>
        </motion.div>
    )
}
