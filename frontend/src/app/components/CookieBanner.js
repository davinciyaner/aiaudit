'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function CookieBanner() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        try {
            const consent = localStorage.getItem('cookie_consent')
            if (!consent) setVisible(true)
        } catch (e) {}
    }, [])

    function accept() {
        try { localStorage.setItem('cookie_consent', 'granted') } catch (e) {}
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                ad_storage: 'granted',
                analytics_storage: 'granted',
            })
        }
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
                    aria-label="Cookie-Einwilligung"
                >
                    <div className="bg-[#0d1117] border border-white/10 rounded-2xl p-5 shadow-2xl shadow-black/60">
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Cookie-Einstellungen</p>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            Wir verwenden <strong className="text-slate-200">Marketing-Cookies</strong> von Google Ads, um den Erfolg unserer Werbeanzeigen zu messen. Technisch notwendige Daten (Login-Session) werden unabhängig von deiner Wahl gespeichert.
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                            Du kannst ablehnen — die Website funktioniert vollständig ohne Marketing-Cookies.{' '}
                            <Link href="/datenschutz" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">
                                Datenschutzerklärung
                            </Link>
                        </p>
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={accept}
                                className="flex-1 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-all"
                            >
                                Akzeptieren
                            </button>
                            <button
                                onClick={decline}
                                className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-semibold py-2.5 rounded-xl border border-white/10 transition-all"
                            >
                                Ablehnen
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}