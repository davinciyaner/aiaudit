'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Search } from 'lucide-react'
import Link from 'next/link'

export default function FinalCTA() {
    return (
        <section className="relative py-16 sm:py-24 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)' }} />

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="relative z-10 max-w-2xl mx-auto px-5 sm:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                    Google kennt dich - KI auch?
                </h2>
                <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed">
                    Ein Audit, 60 Sekunden, keine Anmeldung nötig.
                </p>
                <Link href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[var(--accent-border)]">
                    <Search className="w-4 h-4" />Jetzt kostenlos prüfen<ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </motion.div>
        </section>
    )
}
