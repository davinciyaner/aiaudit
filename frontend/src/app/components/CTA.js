'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

export default function CTA() {
    return (
        <>
            {/* Final CTA */}
            <section className="relative py-16 md:py-28 overflow-hidden bg-[#05080f]">
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.10), transparent)' }} />
                <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-violet-500/50" />
                            <div className="w-2 h-2 rounded-full bg-violet-500" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-violet-500/50" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight tracking-tight">
                            Deine nächste Website<br />wird sicher live gehen.
                        </h2>
                        <p className="text-base sm:text-lg text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
                            Registrieren, URL eingeben, 60 Sekunden warten, Alle Scores und SEO Fehler sehen.
                        </p>
                        <Link href="/dashboard"
                            className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 sm:py-5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-2xl transition-all duration-200 shadow-2xl shadow-violet-500/25 text-sm sm:text-base">
                            Website jetzt kostenlos prüfen
                        </Link>
                        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-slate-600">
                            {['Kostenlos starten', 'Scores sehen', 'SEO Fehler sehen'].map(t => (
                                <div key={t} className="flex items-center gap-1.5">
                                    <Check className="w-3 h-3" strokeWidth={3} /> {t}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}