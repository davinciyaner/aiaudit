'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Wird nur angezeigt, wenn das Backend beim Login showReactivationBanner=true zurückgegeben hat
// (Nutzer war 35+ Tage inaktiv, siehe auth_router.js /login). Rein clientseitig über localStorage
// gesteuert — kein Tracking-Aufwand, kein zweiter API-Call. Kein E-Mail-Versand, deshalb ohne
// Einwilligungsproblematik nutzbar.
export default function ReactivationBanner({ locale = 'de' }) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('showReactivationBanner') === '1') setVisible(true)
    }, [])

    const dismiss = () => {
        localStorage.removeItem('showReactivationBanner')
        setVisible(false)
    }

    const pricingHref = locale === 'en' ? '/en/pricing' : '/pricing'

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                >
                    <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-soft)] p-5 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center shrink-0">
                            <TrendingUp className="w-5 h-5 text-[var(--bg-base)]" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-[var(--text-white)] mb-1">
                                {locale === 'en' ? 'Welcome back' : 'Willkommen zurück'}
                            </p>
                            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                                {locale === 'en'
                                    ? "Google rankings and AI mentions can shift a lot in this much time. Your last audit is likely outdated — worth a fresh check, or set up ongoing tracking so you don't have to remember."
                                    : 'Google-Rankings und KI-Erwähnungen können sich in dieser Zeit stark verändern. Dein letztes Audit ist wahrscheinlich veraltet — ein neuer Check lohnt sich, oder du richtest laufendes Tracking ein, damit du nicht mehr selbst daran denken musst.'}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Link
                                href={pricingHref}
                                onClick={dismiss}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-xs font-semibold rounded-lg transition-all"
                            >
                                {locale === 'en' ? 'See tracking plans' : 'Tracking-Pläne ansehen'} <ArrowRight className="w-3 h-3" />
                            </Link>
                            <button
                                onClick={dismiss}
                                aria-label={locale === 'en' ? 'Dismiss' : 'Schließen'}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-faint)] hover:text-[var(--text-white)] hover:bg-[var(--surface-08)] transition-all shrink-0"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
