'use client'
import { useState } from 'react'
import { Zap } from 'lucide-react'
import Link from 'next/link'
import SupportModal from './SupportModal'
import { t } from '../../lib/i18n/dictionaries'

const COLUMNS_DE = [
    {
        heading: 'Produkt',
        links: [
            { label: 'Features', href: '#features' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Über mich', href: '/about' },
        ],
    },
    {
        heading: 'Alternativen',
        links: [
            { label: 'Alle Alternativen', href: '/vergleich' },
            { label: 'Otterly.ai Alternative', href: '/vergleich/otterly-alternative' },
            { label: 'Peec.ai Alternative', href: '/vergleich/peec-alternative' },
            { label: 'Rankscale Alternative', href: '/vergleich/rankscale-alternative' },
            { label: 'Writesonic Alternative', href: '/vergleich/writesonic-alternative' },
        ],
    },
    {
        heading: 'Lösungen',
        links: [
            { label: 'Alle Lösungen', href: '/loesungen' },
            { label: 'Günstiges KI-Sichtbarkeit Tool', href: '/loesungen/guenstiges-ki-sichtbarkeit-tool' },
            { label: 'Claude AI Sichtbarkeit tracken', href: '/loesungen/claude-ai-sichtbarkeit-tracken' },
        ],
    },
    {
        heading: 'Blog',
        links: [
            { label: 'Alle Artikel', href: '/blog' },
            { label: 'SEO-Test', href: '/blog/seo-test-haeufige-fehler' },
            { label: 'GEO-Optimierung', href: '/blog/geo-optimierung-2026' },
        ],
    },
    {
        heading: 'Rechtliches',
        links: [
            { label: 'Impressum', href: '/impressum' },
            { label: 'Nutzungsbedingungen', href: '/nutzungsbedingungen' },
            { label: 'Datenschutz', href: '/datenschutz' },
            { label: 'AGB', href: '/agb' },
            { label: 'AVV', href: '/avv' },
        ],
    },
]

const COLUMNS_EN = [
    {
        heading: 'Product',
        links: [
            { label: 'Features', href: '#features' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Dashboard', href: '/en/dashboard' },
            { label: 'About', href: '/en/about' },
        ],
    },
    {
        heading: 'Alternatives',
        links: [
            { label: 'All Alternatives', href: '/en/compare' },
            { label: 'Otterly.ai Alternative', href: '/en/compare/otterly-alternative' },
            { label: 'Peec.ai Alternative', href: '/en/compare/peec-alternative' },
            { label: 'Rankscale Alternative', href: '/en/compare/rankscale-alternative' },
            { label: 'Writesonic Alternative', href: '/en/compare/writesonic-alternative' },
        ],
    },
    {
        heading: 'Solutions',
        links: [
            { label: 'All Solutions', href: '/en/solutions' },
            { label: 'Affordable AI Visibility Tool', href: '/en/solutions/affordable-ai-visibility-tool' },
            { label: 'Claude AI Visibility Tracking', href: '/en/solutions/claude-ai-visibility-tracking' },
        ],
    },
    {
        heading: 'Blog',
        links: [
            { label: 'All Articles', href: '/en/blog' },
            { label: 'SEO Test', href: '/en/blog/common-seo-mistakes' },
            { label: 'GEO Optimization', href: '/en/blog/what-is-geo' },
        ],
    },
    {
        heading: 'Legal',
        links: [
            { label: 'Imprint', href: '/impressum' },
            { label: 'Terms of Service', href: '/nutzungsbedingungen' },
            { label: 'Privacy Policy', href: '/datenschutz' },
            { label: 'Terms & Conditions', href: '/agb' },
            { label: 'DPA', href: '/avv' },
        ],
    },
]

export default function Footer({ locale = 'de' }) {
    const COLUMNS = locale === 'en' ? COLUMNS_EN : COLUMNS_DE
    const [supportOpen, setSupportOpen] = useState(false)

    return (
        <>
            <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-base)]">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">

                    {/* Top: Brand + Columns */}
                    <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">

                        {/* Brand */}
                        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
                            <Link href={locale === 'en' ? '/en' : '/'} className="inline-flex items-center gap-2.5 mb-3">
                                <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                                    <Zap className="w-3.5 h-3.5 text-[var(--bg-base)]" strokeWidth={2.5} />
                                </div>
                                <span className="font-bold text-white">
                                    AuditAI
                                </span>
                            </Link>
                            <p className="text-xs text-slate-400 leading-relaxed max-w-[180px]">
                                {t(locale, 'footer.tagline')}
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
                                                className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
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
                    <div className="mt-12 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-xs text-slate-500">{t(locale, 'footer.copyright')}</p>
                        <button
                            onClick={() => setSupportOpen(true)}
                            className="text-xs text-slate-400 hover:text-slate-200 transition-colors py-2 -my-2"
                        >
                            {t(locale, 'footer.support')}
                        </button>
                    </div>
                </div>
            </footer>

            <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} locale={locale} />
        </>
    )
}