'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, BarChart2, Globe, FileText } from 'lucide-react'
import Link from 'next/link'

const PRO_FEATURES_DE = [
    { icon: BarChart2, label: '10 Audits pro Monat' },
    { icon: FileText, label: 'KI-Bericht mit Fixes' },
    { icon: Globe, label: 'PDF-Export' },
    { icon: Calendar, label: 'Audit-Verlauf' },
]

const PRO_FEATURES_EN = [
    { icon: BarChart2, label: '10 audits per month' },
    { icon: FileText, label: 'AI report with fixes' },
    { icon: Globe, label: 'PDF export' },
    { icon: Calendar, label: 'Audit history' },
]

export default function ReauditCTA({ locale = 'de' }) {
    const PRO_FEATURES = locale === 'en' ? PRO_FEATURES_EN : PRO_FEATURES_DE
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-06)] p-6"
        >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
                <div>
                    <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2 block">
                        {locale === 'en' ? 'More with Pro' : 'Mehr mit Pro'}
                    </span>
                    <h3 className="text-base font-bold text-white mb-3">
                        {locale === 'en' ? 'Unlock AI report & PDF with Pro' : 'KI-Bericht & PDF mit Pro freischalten'}
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
                    href={locale === 'en' ? '/en/pricing' : '/pricing'}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all shadow-lg shadow-[var(--accent-border)] shrink-0"
                >
                    {locale === 'en' ? 'Upgrade to Pro' : 'Zu Pro upgraden'}
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>
        </motion.div>
    )
}
