'use client'
import { useState } from 'react'
import { Zap } from 'lucide-react'
import Link from 'next/link'
import SupportModal from './SupportModal'

const COLUMNS = [
    {
        heading: 'Produkt',
        links: [
            { label: 'Features', href: '#features' },
            { label: 'Security', href: '#security' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Dashboard', href: '/dashboard' },
        ],
    },
    {
        heading: 'Blog',
        links: [
            { label: 'Alle Artikel', href: '/blog' },
            { label: 'SEO-Test', href: '/blog/seo-test-haeufige-fehler' },
            { label: 'GEO-Optimierung', href: '/blog/geo-optimierung-2026' },
            { label: 'Website-Security', href: '/blog/website-security-check' },
        ],
    },
    {
        heading: 'Rechtliches',
        links: [
            { label: 'Impressum', href: '/impressum' },
            { label: 'Datenschutz', href: '/datenschutz' },
        ],
    },
]

export default function Footer() {
    const [supportOpen, setSupportOpen] = useState(false)

    return (
        <>
            <footer className="border-t border-white/5 bg-[#05080f]">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">

                    {/* Top: Brand + Columns */}
                    <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">

                        {/* Brand */}
                        <div className="col-span-2 sm:col-span-1">
                            <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
                                <div className="w-7 h-7 rounded-lg bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                                    <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                                </div>
                                <span className="font-bold text-white">
                                    Audit<span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">AI</span>
                                </span>
                            </Link>
                            <p className="text-xs text-slate-600 leading-relaxed max-w-[180px]">
                                SEO, GEO, Security & Performance - in 60 Sekunden.
                            </p>
                        </div>

                        {/* Link columns */}
                        {COLUMNS.map((col) => (
                            <div key={col.heading}>
                                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-4">
                                    {col.heading}
                                </p>
                                <ul className="space-y-3">
                                    {col.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-xs text-slate-600 hover:text-slate-300 transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom: Divider + Copyright + Support */}
                    <div className="mt-12 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-xs text-slate-700">© 2026 AuditAI. Alle Rechte vorbehalten.</p>
                        <button
                            onClick={() => setSupportOpen(true)}
                            className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
                        >
                            Support kontaktieren
                        </button>
                    </div>
                </div>
            </footer>

            <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />
        </>
    )
}