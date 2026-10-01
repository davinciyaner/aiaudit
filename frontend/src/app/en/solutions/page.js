import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Solutions',
    description: 'Scanora solutions for specific use cases: affordable AI visibility tool, combined SEO and AI visibility tracking, and more.',
    alternates: {
        canonical: 'https://www.scanora.ai/en/solutions',
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
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai/en' },
        { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://www.scanora.ai/en/solutions' },
    ],
}

const SOLUTIONS = [
    {
        slug: 'affordable-ai-visibility-tool',
        title: 'Affordable AI Visibility Tool: SEO and AI Visibility in One Plan',
        description: 'For anyone who doesn\'t want to pay for AI visibility and SEO in two separate tools. All prices, features, and who benefits.',
        tag: 'From €4.99/month',
    },
    {
        slug: 'claude-ai-visibility-tracking',
        title: 'Claude AI Visibility Tracking: See Whether Claude Recommends You',
        description: "On most tools, Claude tracking is an expensive Enterprise add-on or unavailable. How it works at Scanora from €4.99/month.",
        tag: 'From €4.99/month',
    },
]

export default function SolutionsHubPageEn() {
    return (
        <main className="bg-(--bg-base) min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar locale="en" />
            <div className="max-w-300 mx-auto px-4 sm:px-8 pt-28 md:pt-34 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-(--text-faint) mb-8">
                    <Link href="/en" className="hover:text-(--text-muted) transition-colors">Scanora</Link>
                    <span>/</span>
                    <span className="text-(--text-faint)">Solutions</span>
                </div>

                <div className="mb-12">
                    <h1 className="text-[clamp(34px,4.4vw,54px)] leading-[1.05] tracking-[-0.038em] font-bold text-(--text-white) mb-5">Solutions</h1>
                    <p className="text-(--text-muted) text-lg max-w-2xl leading-relaxed">
                        Scanora solutions for specific situations and budgets - separate from a direct tool-to-tool comparison.
                        Looking for a comparison to a specific provider instead? Check the{' '}
                        <Link href="/en/compare" className="text-(--text-body) hover:text-(--accent-ink) underline underline-offset-2">comparison page</Link>.
                    </p>
                </div>

                <div className="space-y-4">
                    {SOLUTIONS.map((solution) => (
                        <Link
                            key={solution.slug}
                            href={`/en/solutions/${solution.slug}`}
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
                                View page →
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer locale="en" />
        </main>
    )
}
