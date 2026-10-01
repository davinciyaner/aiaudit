import BlogIndex from '../../components/site/BlogIndex'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: { absolute: 'Blog - SEO, GEO & Website Optimization | Scanora' },
    description: 'Practical articles on SEO, GEO optimization, and performance. Learn how to optimize your website for Google and AI models.',
    alternates: {
        canonical: 'https://www.scanora.ai/en/blog',
        languages: {
            'de-DE': 'https://www.scanora.ai/blog',
            'en-US': 'https://www.scanora.ai/en/blog',
        },
    },
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai/en' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.scanora.ai/en/blog' },
    ],
}

const ARTICLES = [
    {
        slug: 'measure-ai-visibility',
        title: 'Measure AI Visibility 2026: KPIs, Dashboard & Your Own Data',
        description: 'The 3 KPIs that actually matter when measuring AI visibility - with real dashboard screenshots and the step most guides skip: connecting visibility to leads.',
        category: 'GEO',
        categoryColor: 'var(--accent)',
        date: 'Sep 18, 2026',
        readTime: '10 min',
    },
    {
        slug: 'ai-visibility',
        title: 'AI Visibility: How to Get Cited by ChatGPT, Claude & Perplexity',
        description: 'AI visibility is more than llms.txt and schema markup. How to actually get cited by ChatGPT, Claude, Perplexity and Google AI Overview - including monitoring with Scanora.',
        category: 'GEO',
        categoryColor: 'var(--accent)',
        date: 'Aug 10, 2026',
        readTime: '9 min',
    },
    {
        slug: 'core-web-vitals-testing',
        title: 'Core Web Vitals in 2026: What They Are and How to Test Them for Free',
        description: 'Core Web Vitals explained simply: LCP, INP, and CLS with Google\'s official thresholds. Plus how to test them for free in under 2 minutes.',
        category: 'Performance',
        categoryColor: 'var(--warning)',
        date: 'Jul 26, 2026',
        readTime: '8 min',
    },
    {
        slug: 'seo-tool-vs-agency',
        title: 'SEO Tool vs. SEO Agency: The Honest Cost Comparison (2026)',
        description: 'DIY SEO audit vs. hiring an SEO agency: real costs, what each option actually covers, and who each one is really for - no sales pitch.',
        category: 'SEO',
        categoryColor: 'var(--accent)',
        date: 'Jul 26, 2026',
        readTime: '8 min',
    },
    {
        slug: 'llms-txt-explained',
        title: 'llms.txt Explained: What It Is and How to Set It Up Correctly',
        description: 'llms.txt explained simply: the robots.txt for AI models. Origin, structure, the difference from llms-full.txt, and a step-by-step guide to creating your own.',
        category: 'GEO',
        categoryColor: 'var(--accent)',
        date: 'Jul 26, 2026',
        readTime: '7 min',
    },
    {
        slug: 'schema-markup-ai-citations',
        title: 'Schema Markup for AI Citations: How to Get Cited by ChatGPT & Co.',
        description: 'Schema markup (JSON-LD) explained simply: the most important types for AI citability, free testing tools, and the most common mistake that kills rich results.',
        category: 'GEO',
        categoryColor: 'var(--accent)',
        date: 'Jul 26, 2026',
        readTime: '7 min',
    },
    {
        slug: 'seo-tracking-manual-vs-automated',
        title: "Manual vs. Automated SEO Tracking: What's Actually Worth It?",
        description: 'Manual SEO and GEO tracking vs. automation compared: time cost, price, and why AI visibility is nearly impossible to track reliably by hand.',
        category: 'SEO & GEO',
        categoryColor: 'var(--success)',
        date: 'Jul 15, 2026',
        readTime: '9 min',
    },
    {
        slug: 'best-seo-tools-2026',
        title: 'Scanora: The SEO Tool With GEO Analysis (2026)',
        description: 'Scanora checks SEO, performance, and GEO (AI visibility for ChatGPT, Claude & Perplexity) in one report. All the features, pricing, and what you get as a user.',
        category: 'Tools',
        categoryColor: 'var(--warning)',
        date: 'Jul 15, 2026',
        readTime: '8 min',
    },
    {
        slug: 'seo-checklist-2026',
        title: 'SEO Checklist 2026: Find Every Mistake Yourself in 15 Minutes',
        description: 'The complete SEO checklist for 2026, in a fixed order: 6 phases, 15 minutes, every important SEO and GEO signal. Check it yourself or run it automatically with Scanora.',
        category: 'SEO',
        categoryColor: 'var(--accent)',
        date: 'Jul 15, 2026',
        readTime: '7 min',
    },
    {
        slug: 'seo-geo-automation',
        title: 'SEO Rank Tracker & AI Visibility Monitor: Automate SEO and GEO Tracking',
        description: 'An automated SEO rank tracker and keyword tracker, plus AI visibility monitoring for ChatGPT, Claude, Perplexity & Google AI Overview - updated automatically every week instead of checking manually. With pricing and a comparison.',
        category: 'SEO & GEO',
        categoryColor: 'var(--success)',
        date: 'Jul 5, 2026',
        readTime: '10 min',
    },
    {
        slug: 'common-seo-mistakes',
        title: '10 Common SEO Mistakes That Cost You Google Rankings (+ Free Fixes)',
        description: 'These 10 SEO mistakes are hurting rankings on most websites - and nobody notices. Run a free SEO test to catch and fix them today.',
        category: 'SEO',
        categoryColor: 'var(--accent)',
        date: 'Jun 10, 2026',
        readTime: '9 min',
    },
    {
        slug: 'what-is-geo',
        title: 'What is GEO? Generative Engine Optimization Explained',
        description: 'GEO (Generative Engine Optimization) explained: how to optimize your website so ChatGPT, Claude, Perplexity, and Google AI Overview cite it as a source. With a concrete checklist.',
        category: 'GEO',
        categoryColor: 'var(--accent)',
        date: 'Jun 10, 2026',
        readTime: '8 min',
    },
]

export default function BlogPageEn() {
    return (
        <main className="bg-(--bg-base) min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar locale="en" />
            <BlogIndex title="Blog: SEO and GEO in practice" lead="Guides, comparisons and our own data on how to become visible on Google and in AI answers from ChatGPT, Claude and Perplexity." articles={ARTICLES} basePath="/en/blog" readLabel="read" />
            <Footer locale="en" />
        </main>
    )
}
