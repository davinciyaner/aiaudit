import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Alternatives | AuditAI',
    description: 'AuditAI compared honestly to well-known AI visibility and SEO tools: pricing, features, and who each tool is really for.',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/compare',
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
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev/en' },
        { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://www.sitecheckai.dev/en/compare' },
    ],
}

const ALTERNATIVES = [
    {
        slug: 'otterly-alternative',
        title: 'Otterly.ai Alternative: An Honest Look at AuditAI',
        description: 'Pricing, covered AI platforms, and feature scope side by side — including the areas where Otterly.ai is still ahead.',
        tag: 'From €29.99/month',
    },
    {
        slug: 'peec-alternative',
        title: 'Peec.ai Alternative: An Honest Look at AuditAI',
        description: 'Pricing, covered AI platforms, and feature scope side by side — including the areas where Peec.ai is still ahead.',
        tag: 'From €29.99/month',
    },
    {
        slug: 'rankscale-alternative',
        title: 'Rankscale Alternative: An Honest Look at AuditAI',
        description: 'Fixed pricing instead of a credit system, covered AI platforms, and feature scope side by side — including the areas where Rankscale is still ahead.',
        tag: 'From €29.99/month',
    },
    {
        slug: 'writesonic-alternative',
        title: 'Writesonic Alternative: An Honest Look at AuditAI',
        description: 'GEO tracking from day one instead of gated behind a $249 tier, fixed limits instead of expiring credits — including the areas where Writesonic is still ahead.',
        tag: 'From €29.99/month',
    },
]

export default function CompareHubPageEn() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar locale="en" />
            <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
                    <Link href="/en" className="hover:text-slate-400 transition-colors">AuditAI</Link>
                    <span>/</span>
                    <span className="text-slate-500">Compare</span>
                </div>

                <div className="mb-12">
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">Alternatives</h1>
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        Honest, fact-checked comparisons of AuditAI against well-known AI visibility and SEO tools — including where the competitor is actually stronger.
                        Looking for a solution for a specific budget or use case instead? Check the{' '}
                        <Link href="/en/solutions" className="text-slate-300 hover:text-[var(--accent)] underline underline-offset-2">solutions page</Link>.
                    </p>
                </div>

                <div className="space-y-4">
                    {ALTERNATIVES.map((alt) => (
                        <Link
                            key={alt.slug}
                            href={`/en/compare/${alt.slug}`}
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
                                Read comparison →
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer locale="en" />
        </main>
    )
}
