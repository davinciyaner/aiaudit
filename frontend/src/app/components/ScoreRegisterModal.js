'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, UserPlus, Search, Globe, Calendar, BarChart2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const FREE_ITEMS_DE = [
    { icon: Calendar, label: '1 Audit pro Monat', desc: 'Vollständige Analyse deiner Website' },
    { icon: Search, label: 'SEO-Score & Analyse', desc: 'Title, Meta, H1, Alt-Texte & alle Fehler' },
    { icon: Globe, label: 'GEO-Sichtbarkeit', desc: 'llms.txt, Schema, KI-Crawler & alle Checks' },
    { icon: BarChart2, label: 'Performance-Metriken', desc: 'Ladezeiten, Core Web Vitals & alle Issues' },
]

const FREE_ITEMS_EN = [
    { icon: Calendar, label: '1 audit per month', desc: 'Full analysis of your website' },
    { icon: Search, label: 'SEO score & analysis', desc: 'Title, meta, H1, alt text & all issues' },
    { icon: Globe, label: 'GEO visibility', desc: 'llms.txt, schema, AI crawlers & all checks' },
    { icon: BarChart2, label: 'Performance metrics', desc: 'Load times, Core Web Vitals & all issues' },
]

export default function ScoreRegisterModal({ open, onClose, auditUrl = '', mode = 'start', locale = 'de' }) {
    const router = useRouter()
    const FREE_ITEMS = locale === 'en' ? FREE_ITEMS_EN : FREE_ITEMS_DE

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
                            className="relative w-full max-w-md bg-(--bg-surface) border border-(--accent-border) rounded-2xl shadow-2xl shadow-(--accent-border) overflow-hidden pointer-events-auto"
                        >

                            <div className="relative z-10 p-6 sm:p-8 text-center">
                                <button
                                    onClick={onClose}
                                    aria-label={locale === 'en' ? 'Close' : 'Schließen'}
                                    className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-lg bg-(--surface-06) hover:bg-(--surface-10) text-(--text-muted) hover:text-(--text-white) transition-all"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                <div className="w-14 h-14 rounded-2xl bg-(--accent-soft) border border-(--accent-border) flex items-center justify-center mx-auto mb-5">
                                    <Lock className="w-6 h-6 text-(--accent-ink)" />
                                </div>

                                <h3 className="text-xl font-bold text-(--text-white) mb-2">
                                    {locale === 'en' ? 'Start free - in 30 seconds' : 'Gratis starten - in 30 Sekunden'}
                                </h3>
                                <p className="text-(--text-muted) text-sm mb-5 leading-relaxed">
                                    {locale === 'en'
                                        ? 'With a free account you see every score and every issue on your website. AI fixes and the PDF report are included from Pro.'
                                        : 'Mit einem kostenlosen Account siehst du alle Scores und alle Fehler deiner Website. KI-Fixes und PDF-Report gibt es ab Pro.'}
                                </p>

                                <div className="mb-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-semibold text-(--accent-ink)">{locale === 'en' ? 'Included for free' : 'Kostenlos enthalten'}</span>
                                        <div className="flex-1 h-px bg-(--border-subtle)" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        {FREE_ITEMS.map(({ icon: Icon, label, desc }) => (
                                            <div key={label} className="flex items-center gap-3 px-3 py-2.5 bg-(--card) border border-(--line) rounded-xl text-left">
                                                <div className="w-7 h-7 rounded-lg bg-(--accent-soft) flex items-center justify-center shrink-0">
                                                    <Icon className="w-3.5 h-3.5 text-(--accent-ink)" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-xs font-medium text-(--text-body) leading-tight">{label}</div>
                                                    <div className="text-[11px] text-(--text-faint) leading-tight mt-0.5">{desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                <button
                                    onClick={handleRegister}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) font-semibold rounded-[10px] transition-all active:scale-[0.97] active:duration-75 mb-3"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    {locale === 'en' ? 'Create free account' : 'Kostenlosen Account erstellen'}
                                </button>

                                <Link
                                    href="/login"
                                    onClick={onClose}
                                    className="block text-xs text-(--text-faint) hover:text-(--text-muted) transition-colors"
                                >
                                    {locale === 'en' ? 'Already registered? Log in →' : 'Bereits registriert? Einloggen →'}
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}