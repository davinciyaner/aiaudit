'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

function loadClarity() {
    if (typeof window === 'undefined' || window.clarity) return
    ;(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}
        t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)
    })(window, document, 'clarity', 'script', 'wwbww32zg0')
}

// Pushed directly onto dataLayer (not via window.gtag) so this works even if
// gtag.js hasn't finished loading yet — same mechanism the gtag() stub uses internally.
function updateConsent(granted) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(['consent', 'update', {
        ad_storage: granted ? 'granted' : 'denied',
        analytics_storage: granted ? 'granted' : 'denied',
        ad_user_data: granted ? 'granted' : 'denied',
        ad_personalization: granted ? 'granted' : 'denied',
    }])
}

export default function CookieBanner({ locale = 'de' }) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        try {
            const consent = localStorage.getItem('cookie_consent')
            if (!consent) {
                setVisible(true)
            } else if (consent === 'granted') {
                updateConsent(true)
                loadClarity()
            }
        } catch (e) {}
    }, [])

    function accept() {
        try { localStorage.setItem('cookie_consent', 'granted') } catch (e) {}
        updateConsent(true)
        loadClarity()
        setVisible(false)
    }

    function decline() {
        try { localStorage.setItem('cookie_consent', 'denied') } catch (e) {}
        setVisible(false)
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed bottom-4 left-4 right-4 z-50 max-w-lg mx-auto"
                    role="dialog"
                    aria-label={locale === 'en' ? 'Cookie consent' : 'Cookie-Einwilligung'}
                >
                    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-2xl shadow-black/60">
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">{locale === 'en' ? 'Cookie settings' : 'Cookie-Einstellungen'}</p>
                        {locale === 'en' ? (
                            <>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    We use <strong className="text-slate-200">analytics and marketing cookies</strong> from{' '}
                                    <strong className="text-slate-200">Microsoft Clarity</strong> (heatmaps & session recordings) and{' '}
                                    <strong className="text-slate-200">Google Ads</strong> (conversion tracking). Technically necessary data (login session) is stored regardless of your choice.
                                </p>
                                <p className="text-xs text-slate-500 mt-2">
                                    You can decline — the website works fully without these cookies.{' '}
                                    <Link href="/datenschutz" className="text-slate-300 hover:text-[var(--accent)] underline underline-offset-2 transition-colors">
                                        Privacy Policy
                                    </Link>
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    Wir verwenden <strong className="text-slate-200">Analyse- und Marketing-Cookies</strong> von{' '}
                                    <strong className="text-slate-200">Microsoft Clarity</strong> (Heatmaps & Sitzungsaufzeichnungen) und{' '}
                                    <strong className="text-slate-200">Google Ads</strong> (Conversion-Tracking). Technisch notwendige Daten (Login-Session) werden unabhängig von deiner Wahl gespeichert.
                                </p>
                                <p className="text-xs text-slate-500 mt-2">
                                    Du kannst ablehnen — die Website funktioniert vollständig ohne diese Cookies.{' '}
                                    <Link href="/datenschutz" className="text-slate-300 hover:text-[var(--accent)] underline underline-offset-2 transition-colors">
                                        Datenschutzerklärung
                                    </Link>
                                </p>
                            </>
                        )}
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={accept}
                                className="flex-1 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold py-2.5 rounded-xl transition-all"
                            >
                                {locale === 'en' ? 'Accept' : 'Akzeptieren'}
                            </button>
                            <button
                                onClick={decline}
                                className="flex-1 bg-[var(--surface-06)] hover:bg-[var(--surface-10)] text-slate-300 text-sm font-semibold py-2.5 rounded-xl border border-[var(--border-subtle)] transition-all"
                            >
                                {locale === 'en' ? 'Decline' : 'Ablehnen'}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}