import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Solutions | AuditAI',
    description: 'AuditAI solutions for specific use cases: affordable AI visibility tool, combined SEO and AI visibility tracking, and more.',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/solutions',
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
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev/en' },
        { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://www.sitecheckai.dev/en/solutions' },
    ],
}

const SOLUTIONS = [
    {
        slug: 'affordable-ai-visibility-tool',
        title: 'Affordable AI Visibility Tool: SEO and AI Visibility in One Plan',
        description: 'For anyone who doesn\'t want to pay for AI visibility and SEO in two separate tools. All prices, features, and who benefits.',
        tag: 'From €4.99/month',
    },
]

export default function SolutionsHubPageEn() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar locale="en" />
            <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
                    <Link href="/en" className="hover:text-slate-400 transition-colors">AuditAI</Link>
                    <span>/</span>
                    <span className="text-slate-500">Solutions</span>
                </div>

                <div className="mb-12">
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">Solutions</h1>
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        AuditAI solutions for specific situations and budgets – separate from a direct tool-to-tool comparison.
                        Looking for a comparison to a specific provider instead? Check the{' '}
                        <Link href="/en/compare" className="text-slate-300 hover:text-[var(--accent)] underline underline-offset-2">comparison page</Link>.
                    </p>
                </div>

                <div className="space-y-4">
                    {SOLUTIONS.map((solution) => (
                        <Link
                            key={solution.slug}
                            href={`/en/solutions/${solution.slug}`}
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
