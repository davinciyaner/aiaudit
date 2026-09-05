import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
    title: 'Lösungen | AuditAI',
    description: 'AuditAI-Lösungen für konkrete Anwendungsfälle: günstiges KI-Sichtbarkeit Tool, SEO und AI Visibility kombiniert, und mehr.',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/loesungen',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/loesungen',
            'en-US': 'https://www.sitecheckai.dev/en/solutions',
        },
    },
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev' },
        { '@type': 'ListItem', position: 2, name: 'Lösungen', item: 'https://www.sitecheckai.dev/loesungen' },
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
        description: 'Bei den meisten Tools ist Claude-Tracking ein teures Enterprise-Add-on oder gar nicht verfügbar. So funktioniert es bei AuditAI ab 4,99 €/Monat.',
        tag: 'Ab 4,99 €/Monat',
    },
]

export default function LoesungenHubPage() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar />
            <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
                    <Link href="/" className="hover:text-slate-400 transition-colors">AuditAI</Link>
                    <span>/</span>
                    <span className="text-slate-500">Lösungen</span>
                </div>

                <div className="mb-12">
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">Lösungen</h1>
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        AuditAI-Lösungen für konkrete Situationen und Budgets – abseits des direkten Tool-zu-Tool-Vergleichs.
                        Suchst du stattdessen einen Vergleich zu einem bestimmten Anbieter, findest du den auf der{' '}
                        <Link href="/vergleich" className="text-slate-300 hover:text-[var(--accent)] underline underline-offset-2">Vergleichsseite</Link>.
                    </p>
                </div>

                <div className="space-y-4">
                    {SOLUTIONS.map((solution) => (
                        <Link
                            key={solution.slug}
                            href={`/loesungen/${solution.slug}`}
                            className="group block bg-[var(--surface-06)] hover:bg-[var(--surface-08)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] rounded-2xl p-6 sm:p-8 transition-all duration-200"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[var(--accent-soft)] text-[var(--accent)]">
                                    {solution.tag}
                                </span>
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors leading-snug">
                                {solution.title}
                            </h2>
                            <p className="text-sm text-slate-400 leading-relaxed">{solution.description}</p>
                            <div className="mt-4 text-xs text-[var(--accent)] font-medium">
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
