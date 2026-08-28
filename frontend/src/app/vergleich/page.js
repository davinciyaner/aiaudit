import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
    title: 'Alternativen | AuditAI',
    description: 'AuditAI im ehrlichen Vergleich zu bekannten AI-Visibility- und SEO-Tools: Preise, Features und für wen sich welches Tool eignet.',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/vergleich',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/vergleich',
            'en-US': 'https://www.sitecheckai.dev/en/compare',
        },
    },
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev' },
        { '@type': 'ListItem', position: 2, name: 'Vergleich', item: 'https://www.sitecheckai.dev/vergleich' },
    ],
}

const ALTERNATIVES = [
    {
        slug: 'otterly-alternative',
        title: 'Otterly.ai Alternative: AuditAI im ehrlichen Vergleich',
        description: 'Preise, abgedeckte KI-Plattformen und Funktionsumfang im direkten Vergleich – inklusive der Punkte, in denen Otterly.ai besser ist.',
        tag: 'Ab 9,99 €/Monat',
    },
]

export default function VergleichHubPage() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar />
            <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
                    <Link href="/" className="hover:text-slate-400 transition-colors">AuditAI</Link>
                    <span>/</span>
                    <span className="text-slate-500">Vergleich</span>
                </div>

                <div className="mb-12">
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">Alternativen</h1>
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        Ehrliche, faktenbasierte Vergleiche von AuditAI zu bekannten AI-Visibility- und SEO-Tools – inklusive der Punkte, in denen der jeweilige Wettbewerber besser ist.
                        Suchst du stattdessen eine Lösung für ein konkretes Budget oder einen bestimmten Anwendungsfall, findest du die auf der{' '}
                        <Link href="/loesungen" className="text-slate-300 hover:text-[var(--accent)] underline underline-offset-2">Lösungen-Seite</Link>.
                    </p>
                </div>

                <div className="space-y-4">
                    {ALTERNATIVES.map((alt) => (
                        <Link
                            key={alt.slug}
                            href={`/vergleich/${alt.slug}`}
                            className="group block bg-[var(--surface-06)] hover:bg-[var(--surface-08)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] rounded-2xl p-6 sm:p-8 transition-all duration-200"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[var(--accent-soft)] text-[var(--accent)]">
                                    {alt.tag}
                                </span>
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors leading-snug">
                                {alt.title}
                            </h2>
                            <p className="text-sm text-slate-400 leading-relaxed">{alt.description}</p>
                            <div className="mt-4 text-xs text-[var(--accent)] font-medium">
                                Vergleich lesen →
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    )
}
