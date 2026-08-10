import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: { absolute: 'Blog – SEO, GEO & Website Optimization | AuditAI' },
    description: 'Practical articles on SEO, GEO optimization, and performance. Learn how to optimize your website for Google and AI models.',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/blog',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/blog',
            'en-US': 'https://www.sitecheckai.dev/en/blog',
        },
    },
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev/en' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sitecheckai.dev/en/blog' },
    ],
}

const ARTICLES = [
    {
        slug: 'ai-visibility',
        title: 'AI Visibility: How to Get Cited by ChatGPT, Claude & Perplexity',
        description: 'AI visibility is more than llms.txt and schema markup. How to actually get cited by ChatGPT, Claude, Perplexity and Google AI Overview - including monitoring with AuditAI.',
        category: 'GEO',
        categoryColor: '#06b6d4',
        date: 'Aug 10, 2026',
        readTime: '9 min',
    },
    {
        slug: 'core-web-vitals-testing',
        title: 'Core Web Vitals in 2026: What They Are and How to Test Them for Free',
        description: 'Core Web Vitals explained simply: LCP, INP, and CLS with Google\'s official thresholds. Plus how to test them for free in under 2 minutes.',
        category: 'Performance',
        categoryColor: '#f59e0b',
        date: 'Jul 26, 2026',
        readTime: '8 min',
    },
    {
        slug: 'seo-tool-vs-agency',
        title: 'SEO Tool vs. SEO Agency: The Honest Cost Comparison (2026)',
        description: 'DIY SEO audit vs. hiring an SEO agency: real costs, what each option actually covers, and who each one is really for - no sales pitch.',
        category: 'SEO',
        categoryColor: '#7c3aed',
        date: 'Jul 26, 2026',
        readTime: '8 min',
    },
    {
        slug: 'llms-txt-explained',
        title: 'llms.txt Explained: What It Is and How to Set It Up Correctly',
        description: 'llms.txt explained simply: the robots.txt for AI models. Origin, structure, the difference from llms-full.txt, and a step-by-step guide to creating your own.',
        category: 'GEO',
        categoryColor: '#06b6d4',
        date: 'Jul 26, 2026',
        readTime: '7 min',
    },
    {
        slug: 'schema-markup-ai-citations',
        title: 'Schema Markup for AI Citations: How to Get Cited by ChatGPT & Co.',
        description: 'Schema markup (JSON-LD) explained simply: the most important types for AI citability, free testing tools, and the most common mistake that kills rich results.',
        category: 'GEO',
        categoryColor: '#06b6d4',
        date: 'Jul 26, 2026',
        readTime: '7 min',
    },
    {
        slug: 'seo-tracking-manual-vs-automated',
        title: "Manual vs. Automated SEO Tracking: What's Actually Worth It?",
        description: 'Manual SEO and GEO tracking vs. automation compared: time cost, price, and why AI visibility is nearly impossible to track reliably by hand.',
        category: 'SEO & GEO',
        categoryColor: '#10b981',
        date: 'Jul 15, 2026',
        readTime: '9 min',
    },
    {
        slug: 'best-seo-tools-2026',
        title: 'AuditAI: The SEO Tool With GEO Analysis (2026)',
        description: 'AuditAI checks SEO, performance, and GEO (AI visibility for ChatGPT, Claude & Perplexity) in one report. All the features, pricing, and what you get as a user.',
        category: 'Tools',
        categoryColor: '#f59e0b',
        date: 'Jul 15, 2026',
        readTime: '8 min',
    },
    {
        slug: 'seo-checklist-2026',
        title: 'SEO Checklist 2026: Find Every Mistake Yourself in 15 Minutes',
        description: 'The complete SEO checklist for 2026, in a fixed order: 6 phases, 15 minutes, every important SEO and GEO signal. Check it yourself or run it automatically with AuditAI.',
        category: 'SEO',
        categoryColor: '#7c3aed',
        date: 'Jul 15, 2026',
        readTime: '7 min',
    },
    {
        slug: 'seo-geo-automation',
        title: 'SEO Rank Tracker & AI Visibility Monitor: Automate SEO and GEO Tracking',
        description: 'An automated SEO rank tracker and keyword tracker, plus AI visibility monitoring for ChatGPT, Claude, Perplexity & Google AI Overview - updated automatically every week instead of checking manually. With pricing and a comparison.',
        category: 'SEO & GEO',
        categoryColor: '#10b981',
        date: 'Jul 5, 2026',
        readTime: '10 min',
    },
    {
        slug: 'common-seo-mistakes',
        title: '10 Common SEO Mistakes That Cost You Google Rankings (+ Free Fixes)',
        description: 'These 10 SEO mistakes are hurting rankings on most websites - and nobody notices. Run a free SEO test to catch and fix them today.',
        category: 'SEO',
        categoryColor: '#7c3aed',
        date: 'Jun 10, 2026',
        readTime: '9 min',
    },
    {
        slug: 'what-is-geo',
        title: 'What is GEO? Generative Engine Optimization Explained',
        description: 'GEO (Generative Engine Optimization) explained: how to optimize your website so ChatGPT, Claude, Perplexity, and Google AI Overview cite it as a source. With a concrete checklist.',
        category: 'GEO',
        categoryColor: '#06b6d4',
        date: 'Jun 10, 2026',
        readTime: '8 min',
    },
]

export default function BlogPageEn() {
    return (
        <main className="bg-[#05080f] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar locale="en" />
            <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-32 pb-24">
                <div className="mb-12">
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">Blog</h1>
                    <p className="text-slate-400 text-lg">SEO, GEO, and performance — explained practically.</p>
                </div>

                <div className="space-y-4">
                    {ARTICLES.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/en/blog/${article.slug}`}
                            className="group block bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/10 rounded-2xl p-6 sm:p-8 transition-all duration-200"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span
                                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
                                    style={{ background: article.categoryColor + '18', color: article.categoryColor }}
                                >
                                    {article.category}
                                </span>
                                <span className="text-xs text-slate-600">{article.date}</span>
                                <span className="text-xs text-slate-600">· {article.readTime} read</span>
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors leading-snug">
                                {article.title}
                            </h2>
                            <p className="text-sm text-slate-400 leading-relaxed">{article.description}</p>
                            <div className="mt-4 text-xs text-violet-400 font-medium group-hover:text-violet-300 transition-colors">
                                Read article →
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer locale="en" />
        </main>
    )
}
