import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Alternatives',
    description: 'Scanora compared honestly to well-known AI visibility and SEO tools: pricing, features, and who each tool is really for.',
    alternates: {
        canonical: 'https://www.scanora.ai/en/compare',
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
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai/en' },
        { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://www.scanora.ai/en/compare' },
    ],
}

const ALTERNATIVES = [
    {
        slug: 'otterly-alternative',
        title: 'Otterly.ai Alternative: An Honest Look at Scanora',
        description: 'Pricing, covered AI platforms, and feature scope side by side - including the areas where Otterly.ai is still ahead.',
        tag: 'From €74.99/month',
    },
    {
        slug: 'peec-alternative',
        title: 'Peec.ai Alternative: An Honest Look at Scanora',
        description: 'Pricing, covered AI platforms, and feature scope side by side - including the areas where Peec.ai is still ahead.',
        tag: 'From €74.99/month',
    },
    {
        slug: 'rankscale-alternative',
        title: 'Rankscale Alternative: An Honest Look at Scanora',
        description: 'Fixed pricing instead of a credit system, covered AI platforms, and feature scope side by side - including the areas where Rankscale is still ahead.',
        tag: 'From €74.99/month',
    },
    {
        slug: 'writesonic-alternative',
        title: 'Writesonic Alternative: An Honest Look at Scanora',
        description: 'GEO tracking from day one instead of gated behind a $249 tier, fixed limits instead of expiring credits - including the areas where Writesonic is still ahead.',
        tag: 'From €74.99/month',
    },
]

export default function CompareHubPageEn() {
    return (
        <main className="bg-(--bg-base) min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar locale="en" />
            <div className="max-w-300 mx-auto px-4 sm:px-8 pt-28 md:pt-34 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-(--text-faint) mb-8">
                    <Link href="/en" className="hover:text-(--text-muted) transition-colors">Scanora</Link>
                    <span>/</span>
                    <span className="text-(--text-faint)">Compare</span>
                </div>

                <div className="mb-12">
                    <h1 className="text-[clamp(34px,4.4vw,54px)] leading-[1.05] tracking-[-0.038em] font-bold text-(--text-white) mb-5">Alternatives</h1>
                    <p className="text-(--text-muted) text-lg max-w-2xl leading-relaxed">
                        Honest, fact-checked comparisons of Scanora against well-known AI visibility and SEO tools - including where the competitor is actually stronger.
                        Looking for a solution for a specific budget or use case instead? Check the{' '}
                        <Link href="/en/solutions" className="text-(--text-body) hover:text-(--accent-ink) underline underline-offset-2">solutions page</Link>.
                    </p>
                </div>

                <div className="space-y-4">
                    {ALTERNATIVES.map((alt) => (
                        <Link
                            key={alt.slug}
                            href={`/en/compare/${alt.slug}`}
                            className="group block bg-(--card) hover:bg-(--surface-08) border border-(--line) hover:border-(--border-strong) rounded-2xl p-6 sm:p-8 transition-all duration-200"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-(--accent-soft) text-(--accent-ink)">
                                    {alt.tag}
                                </span>
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold text-(--text-white) mb-2 group-hover:text-(--accent) transition-colors leading-snug">
                                {alt.title}
                            </h2>
                            <p className="text-sm text-(--text-muted) leading-relaxed">{alt.description}</p>
                            <div className="mt-4 text-xs text-(--accent-ink) font-medium">
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
