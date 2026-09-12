import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
    title: 'Alternativen | Scanora',
    description: 'Scanora im ehrlichen Vergleich zu bekannten AI-Visibility- und SEO-Tools: Preise, Features und für wen sich welches Tool eignet.',
    alternates: {
        canonical: 'https://www.scanora.ai/vergleich',
        languages: {
            'de-DE': 'https://www.scanora.ai/vergleich',
            'en-US': 'https://www.scanora.ai/en/compare',
        },
    },
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai' },
        { '@type': 'ListItem', position: 2, name: 'Vergleich', item: 'https://www.scanora.ai/vergleich' },
    ],
}

const ALTERNATIVES = [
    {
        slug: 'otterly-alternative',
        title: 'Otterly.ai Alternative: Scanora im ehrlichen Vergleich',
        description: 'Preise, abgedeckte KI-Plattformen und Funktionsumfang im direkten Vergleich – inklusive der Punkte, in denen Otterly.ai besser ist.',
        tag: 'Ab 29,99 €/Monat',
    },
    {
        slug: 'peec-alternative',
        title: 'Peec.ai Alternative: Scanora im ehrlichen Vergleich',
        description: 'Preise, abgedeckte KI-Plattformen und Funktionsumfang im direkten Vergleich – inklusive der Punkte, in denen Peec.ai besser ist.',
        tag: 'Ab 29,99 €/Monat',
    },
    {
        slug: 'rankscale-alternative',
        title: 'Rankscale Alternative: Scanora im ehrlichen Vergleich',
        description: 'Feste Preise statt Credit-System, abgedeckte KI-Plattformen und Funktionsumfang im direkten Vergleich – inklusive der Punkte, in denen Rankscale besser ist.',
        tag: 'Ab 29,99 €/Monat',
    },
    {
        slug: 'writesonic-alternative',
        title: 'Writesonic Alternative: Scanora im ehrlichen Vergleich',
        description: 'GEO-Tracking von Anfang an statt erst im 249-$-Tarif, feste Limits statt verfallender Credits – inklusive der Punkte, in denen Writesonic besser ist.',
        tag: 'Ab 29,99 €/Monat',
    },
]

export default function VergleichHubPage() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar />
            <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-[var(--text-faint)] mb-8">
                    <Link href="/" className="hover:text-[var(--text-muted)] transition-colors">Scanora</Link>
                    <span>/</span>
                    <span className="text-[var(--text-faint)]">Vergleich</span>
                </div>

                <div className="mb-12">
                    <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text-white)] tracking-tight mb-4">Alternativen</h1>
                    <p className="text-[var(--text-muted)] text-lg max-w-2xl leading-relaxed">
                        Ehrliche, faktenbasierte Vergleiche von Scanora zu bekannten AI-Visibility- und SEO-Tools – inklusive der Punkte, in denen der jeweilige Wettbewerber besser ist.
                        Suchst du stattdessen eine Lösung für ein konkretes Budget oder einen bestimmten Anwendungsfall, findest du die auf der{' '}
                        <Link href="/loesungen" className="text-[var(--text-body)] hover:text-[var(--accent)] underline underline-offset-2">Lösungen-Seite</Link>.
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
                            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-white)] mb-2 group-hover:text-[var(--accent)] transition-colors leading-snug">
                                {alt.title}
                            </h2>
                            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{alt.description}</p>
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
