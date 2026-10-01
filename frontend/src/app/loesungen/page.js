import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
    title: 'Lösungen',
    description: 'Scanora-Lösungen für konkrete Anwendungsfälle: günstiges KI-Sichtbarkeit Tool, SEO und AI Visibility kombiniert, und mehr.',
    alternates: {
        canonical: 'https://www.scanora.ai/loesungen',
        languages: {
            'de-DE': 'https://www.scanora.ai/loesungen',
            'en-US': 'https://www.scanora.ai/en/solutions',
        },
    },
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai' },
        { '@type': 'ListItem', position: 2, name: 'Lösungen', item: 'https://www.scanora.ai/loesungen' },
    ],
}

const SOLUTIONS = [
    {
        slug: 'seo-geo-tool',
        title: 'SEO + GEO Tool: Google-Rankings & KI-Sichtbarkeit in einem Dashboard',
        description: 'Für alle, die Google-Rankings und KI-Sichtbarkeit nicht in zwei getrennten Tools verwalten wollen, sondern die Überschneidung direkt sehen wollen.',
        tag: 'SEO + GEO',
    },
    {
        slug: 'guenstiges-ki-sichtbarkeit-tool',
        title: 'Günstiges KI-Sichtbarkeit Tool: SEO und AI Visibility in einem Abo',
        description: 'Für alle, die KI-Sichtbarkeit und SEO nicht in zwei separaten Tools bezahlen wollen. Alle Preise, Features und wer davon profitiert.',
        tag: 'Ab 4,99 €/Monat',
    },
    {
        slug: 'claude-ai-sichtbarkeit-tracken',
        title: 'Claude AI Sichtbarkeit tracken: So siehst du, ob Claude dich empfiehlt',
        description: 'Bei den meisten Tools ist Claude-Tracking ein teures Enterprise-Add-on oder gar nicht verfügbar. So funktioniert es bei Scanora ab 4,99 €/Monat.',
        tag: 'Ab 4,99 €/Monat',
    },
    {
        slug: 'chatgpt-sichtbarkeit-tracken',
        title: 'ChatGPT Sichtbarkeit tracken: So siehst du, ob ChatGPT dich empfiehlt',
        description: 'ChatGPT-Tracking plus klassische Google-Rankings im selben Dashboard statt zwei getrennter Abos. So funktioniert es bei Scanora ab 74,99 €/Monat.',
        tag: 'Ab 74,99 €/Monat',
    },
]

export default function LoesungenHubPage() {
    return (
        <main className="bg-(--bg-base) min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar />
            <div className="max-w-300 mx-auto px-4 sm:px-8 pt-28 md:pt-34 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-(--text-faint) mb-8">
                    <Link href="/" className="hover:text-(--text-muted) transition-colors">Scanora</Link>
                    <span>/</span>
                    <span className="text-(--text-faint)">Lösungen</span>
                </div>

                <div className="mb-12">
                    <h1 className="text-[clamp(34px,4.4vw,54px)] leading-[1.05] tracking-[-0.038em] font-bold text-(--text-white) mb-5">Lösungen</h1>
                    <p className="text-(--text-muted) text-lg max-w-2xl leading-relaxed">
                        Scanora-Lösungen für konkrete Situationen und Budgets - abseits des direkten Tool-zu-Tool-Vergleichs.
                        Suchst du stattdessen einen Vergleich zu einem bestimmten Anbieter, findest du den auf der{' '}
                        <Link href="/vergleich" className="text-(--text-body) hover:text-(--accent-ink) underline underline-offset-2">Vergleichsseite</Link>.
                    </p>
                </div>

                <div className="space-y-4">
                    {SOLUTIONS.map((solution) => (
                        <Link
                            key={solution.slug}
                            href={`/loesungen/${solution.slug}`}
                            className="group block bg-(--card) hover:bg-(--surface-08) border border-(--line) hover:border-(--border-strong) rounded-2xl p-6 sm:p-8 transition-all duration-200"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-(--accent-soft) text-(--accent-ink)">
                                    {solution.tag}
                                </span>
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold text-(--text-white) mb-2 group-hover:text-(--accent) transition-colors leading-snug">
                                {solution.title}
                            </h2>
                            <p className="text-sm text-(--text-muted) leading-relaxed">{solution.description}</p>
                            <div className="mt-4 text-xs text-(--accent-ink) font-medium">
                                Seite ansehen →
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    )
}
