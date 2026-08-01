import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export const metadata = {
    title: { absolute: 'llms.txt Explained: What It Is and How to Set It Up Correctly' },
    description: 'llms.txt explained simply: the robots.txt for AI models. Origin, structure, the difference from llms-full.txt, and a step-by-step guide to creating your own.',
    keywords: 'llms.txt, what is llms.txt, create llms.txt, llms-full.txt, ai crawler file, llms.txt example, llms.txt generator',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/blog/llms-txt-explained',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/blog/llms-txt-erklaert',
            'en-US': 'https://www.sitecheckai.dev/en/blog/llms-txt-explained',
        },
    },
    openGraph: {
        title: 'llms.txt Explained: What It Is and How to Set It Up Correctly',
        description: 'The robots.txt for AI models: origin, structure, and a step-by-step setup guide.',
        url: 'https://www.sitecheckai.dev/en/blog/llms-txt-explained',
        type: 'article',
        locale: 'en_US',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'llms.txt Explained: What It Is and How to Set It Up Correctly',
    description: 'llms.txt explained simply: the robots.txt for AI models. Origin, structure, the difference from llms-full.txt, and a step-by-step guide.',
    image: 'https://www.sitecheckai.dev/en/blog/llms-txt-explained/opengraph-image',
    datePublished: '2026-07-26T09:00:00+02:00',
    dateModified: '2026-08-01T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/en/blog/llms-txt-explained',
    mainEntityOfPage: 'https://www.sitecheckai.dev/en/blog/llms-txt-explained',
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev/en' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sitecheckai.dev/en/blog' },
        { '@type': 'ListItem', position: 3, name: 'llms.txt Explained', item: 'https://www.sitecheckai.dev/en/blog/llms-txt-explained' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What is llms.txt?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'llms.txt is a markdown text file in a website\'s root directory (similar to robots.txt) that explains, in a structured, compact form, what a website is, what it offers, and where the relevant content lives - specifically for AI models to read. It was proposed as an open standard in September 2024 by Jeremy Howard (Answer.AI).',
            },
        },
        {
            '@type': 'Question',
            name: 'Is llms.txt required for AI visibility?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No, it\'s not an official Google or OpenAI standard, and it\'s not required. It\'s a voluntary, community-driven proposal - but one that more and more websites and documentation platforms are adopting, because it gives AI crawlers clear first orientation instead of making them navigate through menus, ads, and JavaScript.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is the difference between llms.txt and llms-full.txt?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'llms.txt is a short overview - product description, key points, links to further resources. llms-full.txt (optional) contains the same information in expanded form, often including pricing, FAQs, and technical details, for AI models that can load more context.',
            },
        },
        {
            '@type': 'Question',
            name: 'Where does llms.txt need to live, and how do I find it?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'In the domain\'s root directory, reachable at yourdomain.com/llms.txt - just like robots.txt or sitemap.xml. It has to be publicly accessible without a login so AI crawlers can read it.',
            },
        },
    ],
}

const STRUCTURE = [
    { part: '# Project name', desc: 'An H1 with the name of your website or product - required by the specification.' },
    { part: '> Short description', desc: 'A blockquote paragraph: what the website is, in one or two sentences, with no marketing fluff.' },
    { part: '## Sections with links', desc: 'Freely chosen H2 headings (e.g. "Docs", "Pricing", "API") with markdown links to the most important subpages.' },
    { part: '## Optional', desc: 'A section for less important links that AI models can skip if needed.' },
]

const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Create an llms.txt file',
    description: 'The structure of an llms.txt file, built step by step, per the llmstxt.org specification.',
    totalTime: 'PT10M',
    step: [
        { '@type': 'HowToStep', name: 'Project name as H1', text: 'An H1 with the name of your website or product - required by the specification.' },
        { '@type': 'HowToStep', name: 'Short description as a blockquote', text: 'A blockquote paragraph: what the website is, in one or two sentences, with no marketing fluff.' },
        { '@type': 'HowToStep', name: 'Sections with links', text: 'Freely chosen H2 headings (e.g. "Docs", "Pricing", "API") with markdown links to the most important subpages.' },
        { '@type': 'HowToStep', name: 'Optional section', text: 'A section for less important links that AI models can skip if needed.' },
        { '@type': 'HowToStep', name: 'Publish at /llms.txt', text: 'Make the file public and accessible without login in the domain\'s root directory, in valid markdown format.' },
    ],
}

const MISTAKES = [
    { title: 'Marketing copy instead of facts', desc: 'llms.txt should be precise and factual - "X is a Y for Z that does A" instead of marketing language. AI models extract direct statements from it.' },
    { title: 'File blocked or behind a login', desc: 'llms.txt needs to be publicly accessible without authentication - otherwise AI crawlers can\'t read it at all.' },
    { title: 'Never updated', desc: 'New features, changed pricing, or renamed products go stale in the file if it isn\'t maintained alongside those changes.' },
    { title: 'Wrong format', desc: 'llms.txt has to be valid markdown, not an HTML page with a .txt extension - otherwise many parsers can\'t process it cleanly.' },
]

export default function LlmsTxtPageEn() {
    return (
        <main className="bg-[#05080f] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar locale="en" />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
                    <Link href="/en" className="hover:text-slate-400 transition-colors">AuditAI</Link>
                    <span>/</span>
                    <Link href="/en/blog" className="hover:text-slate-400 transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-slate-500">llms.txt Explained</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-cyan-500/15 text-cyan-400">
                            GEO
                        </span>
                        <span className="text-xs text-slate-600">July 26, 2026</span>
                        <span className="text-xs text-slate-600">· 7 min read</span>
                        <span className="text-xs text-slate-600">· Updated Aug 1, 2026</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        llms.txt Explained: What It Is and How to Set It Up Correctly
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        A single text file in your root directory can decide whether AI models understand your website at all. Here&apos;s where llms.txt comes from, how it&apos;s structured, and how to create your own in 10 minutes.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-slate-600">
                        <Link href="/en/about" className="flex items-center gap-2 hover:text-slate-300 transition-colors">
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
                        <h2 className="text-2xl font-bold text-white mb-4">What is llms.txt?</h2>
                        <p>
                            llms.txt is a markdown file in a website&apos;s root directory - reachable at <code className="text-xs bg-white/[0.06] px-1.5 py-0.5 rounded">yourdomain.com/llms.txt</code>, similar to robots.txt or sitemap.xml. The difference: robots.txt tells crawlers what they&apos;re NOT allowed to visit. llms.txt tells AI models WHAT your website is and WHERE the most important content lives - a structured summary instead of an HTML page full of navigation, ads, and JavaScript.
                        </p>
                        <p className="mt-4">
                            The standard was proposed in{' '}
                            <a href="https://www.answer.ai/posts/2024-09-03-llmstxt.html" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                                September 2024 by Jeremy Howard and the team at Answer.AI
                            </a>{' '}
                            - in response to a concrete problem: AI models&apos; context windows are too small for entire websites, and regular HTML pages are unnecessarily hard for language models to process.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Why llms.txt matters for GEO</h2>
                        <p>
                            Many AI crawlers read llms.txt as their first point of orientation before crawling the rest of a website - similar to how Googlebot checks robots.txt and sitemap.xml first. A well-maintained llms.txt increases the odds that an AI model understands your product definition correctly, instead of guessing at it from fragmented HTML snippets.
                        </p>
                        <p className="mt-4">
                            Important context: llms.txt is not an official standard from Google, OpenAI, or Anthropic, and it doesn&apos;t guarantee citations. It&apos;s a voluntary, open proposal - but one that more and more documentation platforms and tools are adopting because it makes structural sense. It&apos;s just one of several GEO signals - the full overview is in our article on{' '}
                            <Link href="/en/blog/what-is-geo" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                                What is GEO?
                            </Link>, along with{' '}
                            <Link href="/en/blog/schema-markup-ai-citations" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                                Schema Markup for AI Citations
                            </Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">How is an llms.txt structured?</h2>
                        <div className="space-y-3">
                            {STRUCTURE.map((s) => (
                                <div key={s.part} className="flex items-start gap-4 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                                    <code className="text-xs text-cyan-400 font-mono shrink-0 mt-0.5 whitespace-nowrap">{s.part}</code>
                                    <span className="text-sm text-slate-400">{s.desc}</span>
                                </div>
                            ))}
                        </div>
                        <pre className="mt-5 text-xs bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 text-slate-400 font-mono overflow-x-auto">
{`# MyProduct
> MyProduct is a tool for X that solves Y in under 60 seconds.

## Docs
- [Getting started](https://example.com/docs/start): Quick start guide
- [API reference](https://example.com/docs/api): Full API documentation

## Pricing
- [Pricing & plans](https://example.com/pricing): All plans at a glance`}
                        </pre>
                        <p className="text-xs text-slate-600 mt-3">
                            Full specification:{' '}
                            <a href="https://llmstxt.org" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-400 underline underline-offset-2">
                                llmstxt.org ↗
                            </a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">llms.txt vs. llms-full.txt: what&apos;s the difference?</h2>
                        <p>
                            llms.txt stays deliberately short - an overview with links. llms-full.txt (optional, at <code className="text-xs bg-white/[0.06] px-1.5 py-0.5 rounded">/llms-full.txt</code>) covers the same topics in more depth: detailed pricing, FAQs, technical specs. For AI models that can load more context at once, the expanded version delivers more direct, citable answers - without making users click through several linked subpages first.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">Common mistakes when setting it up</h2>
                        <div className="space-y-3">
                            {MISTAKES.map((m) => (
                                <div key={m.title} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
                                    <h3 className="font-semibold text-white mb-1.5 text-sm">{m.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{m.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Frequently asked questions about llms.txt</h2>
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
                        Do you already have an llms.txt?
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        AuditAI automatically checks whether llms.txt and llms-full.txt exist and are correctly formatted - as part of 19 GEO signals in under 60 seconds. Start without registration, sign up free for the full report with all scores.
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
                                What is GEO? How to Get Recommended by ChatGPT and Claude
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                llms.txt is one of 19 GEO signals - the full overview of what else counts.
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
