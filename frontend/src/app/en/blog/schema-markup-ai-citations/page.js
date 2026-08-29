import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export const metadata = {
    title: { absolute: 'Schema Markup for AI Citations 2026: How to Get Cited by ChatGPT & Co.' },
    description: 'Schema markup (JSON-LD) explained simply: priority order, ready-to-copy code, free generators & testing tools, and the most common mistake that kills rich results.',
    keywords: 'schema markup, schema markup generator, structured data testing free, schema markup ai, json-ld generator, json-ld example, faq schema, organization schema, rich results test',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/blog/schema-markup-ai-citations',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/blog/schema-markup-ki-zitate',
            'en-US': 'https://www.sitecheckai.dev/en/blog/schema-markup-ai-citations',
        },
    },
    openGraph: {
        title: 'Schema Markup for AI Citations 2026: How to Get Cited by ChatGPT & Co.',
        description: 'Priority order, ready-to-copy JSON-LD code, free generators & testing tools, and the most common mistake that kills rich results.',
        url: 'https://www.sitecheckai.dev/en/blog/schema-markup-ai-citations',
        type: 'article',
        locale: 'en_US',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Schema Markup for AI Citations 2026: How to Get Cited by ChatGPT & Co.',
    description: 'Schema markup (JSON-LD) explained simply: priority order, ready-to-copy code, free generators & testing tools, and the most common mistake that kills rich results.',
    image: 'https://www.sitecheckai.dev/en/blog/schema-markup-ai-citations/opengraph-image',
    datePublished: '2026-07-26T09:00:00+02:00',
    dateModified: '2026-08-29T09:00:00+02:00',
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
        {
            '@type': 'Question',
            name: 'How do I generate schema markup without coding it myself?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'With a form-based generator like the Merkle Schema Generator or the tool from TechnicalSEO.com - fill in your data, copy the resulting JSON-LD, and paste it into your <head> section.',
            },
        },
    ],
}

const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Implement schema markup in the right order',
    description: 'The recommended implementation order for schema markup, so each type builds on the trust and context signal of the one before it.',
    step: [
        { '@type': 'HowToStep', position: 1, name: 'Organization', text: 'Establish who runs the site as a baseline trust signal - without it, no AI can map a brand to a domain.' },
        { '@type': 'HowToStep', position: 2, name: 'WebSite', text: 'Add site-level metadata so subpages are understood as part of one overarching property.' },
        { '@type': 'HowToStep', position: 3, name: 'Article', text: 'Mark up author, date, and headline for blog posts once Organization schema is in place.' },
        { '@type': 'HowToStep', position: 4, name: 'Product / SoftwareApplication', text: 'Mark up pricing, ratings, and features to enable precise citations instead of vague paraphrasing.' },
        { '@type': 'HowToStep', position: 5, name: 'FAQPage', text: 'Mark up visible question-and-answer pairs last - the most direct format for AI citations.' },
    ],
}

const PRIORITY_STEPS = [
    { num: 1, type: 'Organization', purpose: 'Who runs the website', why: "A baseline trust signal - without it, no AI can map a brand to a domain." },
    { num: 2, type: 'WebSite', purpose: 'Metadata for the site as a whole', why: 'Groups subpages under one overarching property.' },
    { num: 3, type: 'Article', purpose: 'Author, date, headline', why: 'Adds E-E-A-T context once Organization is in place.' },
    { num: 4, type: 'Product / SoftwareApplication', purpose: 'Pricing, ratings, features', why: 'Enables precise price citations instead of vague paraphrasing.' },
    { num: 5, type: 'FAQPage', purpose: 'Visible question-and-answer pairs', why: 'The most direct citation format - question and answer are already pre-formatted.' },
]

const GENERATOR_TOOLS = [
    { name: 'Merkle Schema Generator', desc: 'Form-based, covers the most common types - a solid starting point.' },
    { name: 'TechnicalSEO.com Generator', desc: 'Similar, with especially strong local-business coverage.' },
    { name: 'Google Structured Data Markup Helper', desc: 'Tag elements directly on a pasted-in page with clicks.' },
]

export default function SchemaMarkupPageEn() {
    return (
        <main className="bg-[#05080f] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
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
                        <span className="text-xs text-slate-600">· 8 min read</span>
                        <span className="text-xs text-slate-600">· Updated Aug 29, 2026</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        Schema Markup for AI Citations 2026: How to Get Cited by ChatGPT & Co.
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Schema markup is invisible to visitors - but it's exactly the language Google and AI models use to understand and cite content precisely. The key types in the right order, ready-to-copy JSON-LD code, free generators and testing tools, and the mistake that most often makes all of it worthless.
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
                        <h2 className="text-2xl font-bold text-white mb-4">Implement in this order</h2>
                        <p>The order isn't arbitrary - each type builds on the trust and context signal of the one before it.</p>
                        <div className="overflow-x-auto rounded-2xl border border-white/[0.07] mt-5">
                            <table className="w-full text-sm min-w-[560px]">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <th className="text-left px-4 py-3 text-slate-400 font-semibold w-10">#</th>
                                        <th className="text-left px-4 py-3 text-slate-400 font-semibold">Schema type</th>
                                        <th className="text-left px-4 py-3 text-slate-400 font-semibold">Purpose</th>
                                        <th className="text-left px-4 py-3 text-slate-400 font-semibold">Why at this step</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PRIORITY_STEPS.map((s) => (
                                        <tr key={s.num} className="border-b border-white/[0.04] last:border-0">
                                            <td className="px-4 py-3 text-cyan-400 font-mono font-bold">{s.num}</td>
                                            <td className="px-4 py-3 text-white font-mono text-xs font-semibold whitespace-nowrap">{s.type}</td>
                                            <td className="px-4 py-3 text-slate-300">{s.purpose}</td>
                                            <td className="px-4 py-3 text-slate-400">{s.why}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Organization schema, ready to copy</h2>
                        <p>The minimum every website should start with - ready to use as-is:</p>
                        <pre className="mt-4 text-xs bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 text-slate-400 font-mono overflow-x-auto">
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company",
  "url": "https://your-domain.com",
  "logo": "https://your-domain.com/logo.png",
  "sameAs": ["https://linkedin.com/company/..."]
}
</script>`}
                        </pre>
                        <p className="mt-5">Next, FAQPage schema - but only for questions that are also visible on the page (more on that below):</p>
                        <pre className="mt-4 text-xs bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 text-slate-400 font-mono overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Your question, word-for-word matching the visible text",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Your answer, word-for-word matching the visible text"
    }
  }]
}`}
                        </pre>
                        <p className="text-xs text-slate-600 mt-3">
                            For the priority table above, this page also carries HowTo schema in its &lt;head&gt; - invisible in the text, but machine-readable for the implementation order itself.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Free generators</h2>
                        <p>If writing code by hand isn't an option, these three produce valid JSON-LD from a form:</p>
                        <div className="space-y-2 mt-4">
                            {GENERATOR_TOOLS.map((t) => (
                                <div key={t.name} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                                    <span className="text-sm font-semibold text-white sm:min-w-[220px] shrink-0">{t.name}</span>
                                    <span className="text-sm text-slate-500">{t.desc}</span>
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
