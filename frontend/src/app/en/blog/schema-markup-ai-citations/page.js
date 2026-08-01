import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export const metadata = {
    title: { absolute: 'Schema Markup for AI Citations: How to Get Cited by ChatGPT & Co.' },
    description: 'Schema markup (JSON-LD) explained simply: the most important types for AI citability, free testing tools, and the most common mistake that kills rich results.',
    keywords: 'schema markup, structured data testing free, schema markup ai, json-ld generator, faq schema, organization schema, rich results test',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/blog/schema-markup-ai-citations',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/blog/schema-markup-ki-zitate',
            'en-US': 'https://www.sitecheckai.dev/en/blog/schema-markup-ai-citations',
        },
    },
    openGraph: {
        title: 'Schema Markup for AI Citations: How to Get Cited by ChatGPT & Co.',
        description: 'The most important schema types for AI citability, free testing tools, and the most common mistake that kills them.',
        url: 'https://www.sitecheckai.dev/en/blog/schema-markup-ai-citations',
        type: 'article',
        locale: 'en_US',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Schema Markup for AI Citations: How to Get Cited by ChatGPT & Co.',
    description: 'Schema markup (JSON-LD) explained simply: the most important types for AI citability, free testing tools, and the most common mistake that kills rich results.',
    image: 'https://www.sitecheckai.dev/en/blog/schema-markup-ai-citations/opengraph-image',
    datePublished: '2026-07-26T09:00:00+02:00',
    dateModified: '2026-08-01T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/en/blog/schema-markup-ai-citations',
    mainEntityOfPage: 'https://www.sitecheckai.dev/en/blog/schema-markup-ai-citations',
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev/en' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sitecheckai.dev/en/blog' },
        { '@type': 'ListItem', position: 3, name: 'Schema Markup for AI Citations', item: 'https://www.sitecheckai.dev/en/blog/schema-markup-ai-citations' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What is schema markup?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Schema markup is structured data in JSON-LD format, usually embedded in the <head> of a page. It describes content in a standardized vocabulary (schema.org) that both Google can use for rich results and AI models can use for precise citations.',
            },
        },
        {
            '@type': 'Question',
            name: 'How do I test schema markup for free?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'With Google\'s free Rich Results Test (search.google.com/test/rich-results) - enter a URL and it shows every schema type found, along with errors and warnings. For pure syntax checking, the Schema Markup Validator from schema.org itself (validator.schema.org) is a good complement.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is FAQ schema alone enough for better AI citations?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. FAQ schema in JSON-LD needs to match the visible questions and answers in the HTML exactly - AI models and Google both cross-check the two. Schema that claims content the page doesn\'t actually display isn\'t just ineffective, it can also be treated as misleading markup.',
            },
        },
        {
            '@type': 'Question',
            name: 'What schema should every website have at minimum?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Organization schema (who runs the site) and WebSite schema as a baseline. Blog posts should add Article schema, product pages should add Product or SoftwareApplication schema, and pages with genuine questions and answers should add FAQPage schema.',
            },
        },
    ],
}

const SCHEMA_TYPES = [
    { type: 'Organization', use: 'Who runs the website - name, logo, contact details, social profiles.', why: 'A baseline trust signal AI models use to map a brand to a domain.' },
    { type: 'WebSite', use: 'Core site-level metadata, often linked to a search function.', why: 'Helps classify the site as a whole, not just individual subpages.' },
    { type: 'Article', use: 'Blog posts and news: author, publish date, headline.', why: 'Gives AI models author and freshness context for citations - important E-E-A-T signals.' },
    { type: 'FAQPage', use: 'Question-and-answer pairs that also appear visibly in the HTML.', why: 'The most direct format for AI citations - question and answer are already pre-formatted.' },
    { type: 'Product / SoftwareApplication', use: 'Pricing, ratings, and feature set of a product.', why: 'Enables precise price and feature citations instead of vague paraphrasing.' },
]

export default function SchemaMarkupPageEn() {
    return (
        <main className="bg-[#05080f] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar locale="en" />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
                    <Link href="/en" className="hover:text-slate-400 transition-colors">AuditAI</Link>
                    <span>/</span>
                    <Link href="/en/blog" className="hover:text-slate-400 transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-slate-500">Schema Markup for AI Citations</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-cyan-500/15 text-cyan-400">
                            GEO
                        </span>
                        <span className="text-xs text-slate-600">Jul 26, 2026</span>
                        <span className="text-xs text-slate-600">· 7 min read</span>
                        <span className="text-xs text-slate-600">· Updated Aug 1, 2026</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        Schema Markup for AI Citations: How to Get Cited by ChatGPT & Co.
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Schema markup is invisible to visitors - but it's exactly the language Google and AI models use to understand and cite content precisely. Here are the key types, how to test them for free, and the mistake that most often makes all of it worthless.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-slate-600">
                        <Link href="/about" className="flex items-center gap-2 hover:text-slate-300 transition-colors">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-white text-[10px] font-bold">F</div>
                            <span>Finn Paustian</span>
                        </Link>
                        <span>·</span>
                        <span>Founder, AuditAI</span>
                    </div>
                </div>

                <div className="border-t border-white/5 mb-10" />

                <div className="space-y-10 text-slate-300 leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">What is schema markup, and why does it matter for GEO?</h2>
                        <p>
                            Schema markup is structured data in{' '}
                            <a href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                                JSON-LD format
                            </a>
                            , a standardized vocabulary (schema.org) used to describe content in a machine-readable way - usually embedded invisibly in the <code className="text-xs bg-white/[0.06] px-1.5 py-0.5 rounded">&lt;head&gt;</code> section. Instead of an AI having to guess who wrote an article or what a product costs from body text, it's stated explicitly and unambiguously in the markup.
                        </p>
                        <p className="mt-4">
                            For classic SEO, schema markup enables rich results - star ratings, FAQ boxes, pricing shown directly in search results. For{' '}
                            <Link href="/en/blog/what-is-geo" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">GEO</Link>
                            {' '}the effect is similar, but even more direct: AI models use structured data to extract facts precisely instead of interpreting them out of ambiguous text. Along with{' '}
                            <Link href="/en/blog/llms-txt-explained" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">llms.txt</Link>
                            {' '}it's one of the two central technical foundations of GEO.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">The most important schema types for AI citability</h2>
                        <div className="space-y-3">
                            {SCHEMA_TYPES.map((s) => (
                                <div key={s.type} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
                                    <h3 className="font-mono text-sm font-semibold text-cyan-400 mb-2">{s.type}</h3>
                                    <p className="text-sm text-slate-300 mb-1.5">{s.use}</p>
                                    <p className="text-xs text-slate-500">{s.why}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">How to test schema markup for free</h2>
                        <p>
                            Google's{' '}
                            <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                                Rich Results Test
                            </a>{' '}
                            is the standard check: enter a URL and every schema type found is displayed along with errors and warnings. For pure syntax validation without Google's rich-result-specific scoring, the{' '}
                            <a href="https://validator.schema.org" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                                Schema Markup Validator
                            </a>{' '}
                            from schema.org itself is a good addition.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">The most common mistake: schema that doesn't match the visible content</h2>
                        <p>
                            One mistake we keep seeing in audits, even with technically sharp teams: the FAQ schema in JSON-LD lists different or additional questions than what's actually visible on the page. It happens easily when FAQ content and schema are maintained in two separate places in the code, and a content change only gets applied to one of them.
                        </p>
                        <p className="mt-4">
                            The problem: both Google and AI models cross-check structured data against the visible HTML. A mismatch doesn't just mean the extra schema questions have no effect - Google explicitly treats blatant discrepancies between markup and visible content as a policy violation.
                        </p>
                        <div className="bg-red-500/8 border border-red-500/20 rounded-2xl p-5 mt-5">
                            <p className="text-sm text-red-300 font-medium mb-1">The most reliable fix</p>
                            <p className="text-sm text-slate-400">
                                Generate FAQ schema (or any other content schema) directly from the same data source that renders the visible content, instead of maintaining schema and HTML separately. That way the two can never drift apart in the first place.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Frequently asked questions about schema markup</h2>
                        <div className="space-y-4">
                            {faqLd.mainEntity.map((faq, i) => (
                                <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
                                    <h3 className="font-semibold text-white mb-2 text-sm">{faq.name}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{faq.acceptedAnswer.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* CTA */}
                <div className="mt-14 bg-gradient-to-br from-cyan-950/40 to-[#05080f] border border-cyan-500/20 rounded-2xl p-6 sm:p-8 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                        Does your schema match your visible content?
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        AuditAI automatically checks whether Organization, FAQ, and other schema types are present and correct - as part of 19 GEO signals in under 60 seconds. Start without registration, sign up free for the full report with all scores.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20"
                    >
                        Check your GEO score now
                    </Link>
                    <div className="mt-3 text-xs text-slate-600">No registration to start · Full report free · 60 seconds</div>
                </div>

                {/* Cross-link to sibling posts */}
                <div className="mt-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1 block">Keep reading</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                llms.txt explained
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Schema markup is one GEO signal among many - llms.txt is the other one AI crawlers read first.
                            </p>
                        </div>
                        <Link
                            href="/en/blog/llms-txt-explained"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] hover:bg-white/10 text-white text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Read article
                        </Link>
                    </div>
                </div>

                <div className="mt-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1 block">Keep reading</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                GEO in 2026: How to Get Recommended by ChatGPT and Claude
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Schema markup is one of five GEO signals - see the bigger picture and how they work together.
                            </p>
                        </div>
                        <Link
                            href="/en/blog/what-is-geo"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] hover:bg-white/10 text-white text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Read article
                        </Link>
                    </div>
                </div>

                {/* Back */}
                <div className="mt-10 pt-8 border-t border-white/5">
                    <Link href="/en/blog" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                        ← Back to blog
                    </Link>
                </div>

            </article>

            <Footer locale="en" />
        </main>
    )
}
