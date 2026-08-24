import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export const metadata = {
    title: { absolute: 'What is GEO? Generative Engine Optimization Explained (+ 2026 Checklist)' },
    description: 'GEO (Generative Engine Optimization) explained: how to optimize your website so ChatGPT, Claude, Perplexity, and Google AI Overview cite it as a source. Concrete 19-signal checklist.',
    keywords: 'what is geo, GEO optimization, Generative Engine Optimization, ChatGPT SEO, AI search optimization, AI visibility, llms.txt, GEO vs SEO',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/blog/what-is-geo',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/blog/geo-optimierung-2026',
            'en-US': 'https://www.sitecheckai.dev/en/blog/what-is-geo',
        },
    },
    openGraph: {
        title: 'What is GEO? Generative Engine Optimization Explained (+ 2026 Checklist)',
        description: 'How to optimize your website for AI models. With a concrete checklist and GEO score tool.',
        url: 'https://www.sitecheckai.dev/en/blog/what-is-geo',
        type: 'article',
        locale: 'en_US',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What is GEO? Generative Engine Optimization Explained (+ 2026 Checklist)',
    description: 'GEO (Generative Engine Optimization) explained: how to optimize your website so ChatGPT, Claude, Perplexity, and Google AI Overview cite it as a source.',
    image: 'https://www.sitecheckai.dev/en/blog/what-is-geo/opengraph-image',
    datePublished: '2026-06-10T09:00:00+02:00',
    dateModified: '2026-08-24T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/en/blog/what-is-geo',
    mainEntityOfPage: 'https://www.sitecheckai.dev/en/blog/what-is-geo',
    about: [
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
        { '@type': 'Thing', name: 'AI visibility' },
        { '@type': 'Thing', name: 'ChatGPT SEO' },
    ],
    mentions: [
        { '@type': 'Thing', name: 'ChatGPT', url: 'https://chat.openai.com' },
        { '@type': 'Thing', name: 'Claude', url: 'https://claude.ai' },
        { '@type': 'Thing', name: 'Perplexity', url: 'https://perplexity.ai' },
    ],
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev/en' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sitecheckai.dev/en/blog' },
        { '@type': 'ListItem', position: 3, name: 'What is GEO?', item: 'https://www.sitecheckai.dev/en/blog/what-is-geo' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What is GEO (Generative Engine Optimization)?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'GEO stands for Generative Engine Optimization. It refers to optimizing a website so AI models like ChatGPT, Claude, or Perplexity recognize it as a trustworthy source and cite it in their answers. Similar to how SEO optimizes for Google\'s algorithms, GEO targets indexing and use by generative AI systems.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is the difference between GEO and SEO?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'SEO optimizes for search engines like Google, which rank by keywords and backlinks. GEO optimizes for AI models, which look for structured data, clear entity definitions, author signals, and citable content. Both matter: SEO drives traffic from classic search, GEO earns mentions in AI answers.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is llms.txt and why does it matter for GEO?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'llms.txt is a text file in a website\'s root directory (similar to robots.txt) meant to be specifically readable by AI models and large language models. It describes, in structured form, what the website is and what it offers. Important: no major AI provider has confirmed actually using the file - Google has explicitly stated it isn\'t necessary for Search or AI Overviews. llms.txt is therefore not a confirmed GEO signal, though it can still be worthwhile as clean product documentation.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is "ChatGPT SEO"?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: '"ChatGPT SEO" is a colloquial term for GEO (Generative Engine Optimization) with a specific focus on ChatGPT - optimizing a website so ChatGPT mentions or recommends it in its answers. Technically, GEO is the broader term since it covers all AI models (ChatGPT, Claude, Perplexity, Google AI Overview), but the underlying techniques are identical: structured data, llms.txt, clear product definitions, and citable facts.',
            },
        },
        {
            '@type': 'Question',
            name: 'How long does it take for GEO to show results?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'GEO works differently from SEO. Technical signals like Schema.org data and robots.txt crawler access can be picked up by AI crawlers within days (llms.txt excepted, since no major provider has confirmed using it). Whether an AI model actually cites a website then depends on training and retrieval algorithms - that can take weeks to months. Perplexity and similar RAG-based systems react faster than models with a fixed training-data cutoff.',
            },
        },
    ],
}

const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'GEO: Implementing the 10 most important quick wins',
    description: 'The ten GEO quick wins in the order they should be implemented first.',
    totalTime: 'PT60M',
    step: [
        { '@type': 'HowToStep', name: 'Create llms.txt', text: 'Add /llms.txt with a clear product description.' },
        { '@type': 'HowToStep', name: 'Create llms-full.txt', text: 'A detailed version with pricing, features, FAQs.' },
        { '@type': 'HowToStep', name: 'Organization Schema', text: 'Embed JSON-LD with name, URL, logo, sameAs.' },
        { '@type': 'HowToStep', name: 'FAQ Schema + HTML content', text: 'Questions in JSON-LD AND as visible text on the page.' },
        { '@type': 'HowToStep', name: 'Allow AI crawlers', text: 'Allow GPTBot, ClaudeBot, anthropic-ai, PerplexityBot in robots.txt.' },
        { '@type': 'HowToStep', name: 'Keep the sitemap current', text: 'List all relevant pages in sitemap.xml.' },
        { '@type': 'HowToStep', name: 'Clear product definition', text: '"X is Y for Z" in the first 100 words of the homepage.' },
        { '@type': 'HowToStep', name: 'Numbers & statistics', text: 'Provide concrete data that AI models like to cite.' },
        { '@type': 'HowToStep', name: 'About/founder page', text: 'Who\'s behind it - an E-E-A-T signal for AI models.' },
        { '@type': 'HowToStep', name: 'External source links', text: 'Link to authoritative sources like Google, OWASP, or Schema.org.' },
    ],
}

const SIGNALS = [
    {
        number: '01',
        title: 'Create llms.txt',
        color: '#06b6d4',
        desc: 'A file popular among GEO enthusiasts, but currently unconfirmed: no major AI provider (Google, OpenAI, Anthropic) has confirmed actually using llms.txt - Google has explicitly called it unnecessary for Search and AI Overviews. It doesn\'t hurt to have one, though, and it doubles as compact product documentation: a file at /llms.txt with a clear description of your website, your products, and your key points, structured with Markdown headings. Optionally add /llms-full.txt for a detailed version.',
        example: '# MyTool\n> MyTool is an X for Y that does Z in under 60 seconds.',
        source: { label: 'llms.txt specification (llmstxt.org)', url: 'https://llmstxt.org' },
        internalLink: { label: 'llms.txt explained in depth', href: '/blog/llms-txt-erklaert' },
    },
    {
        number: '02',
        title: 'Schema.org structured data',
        color: '#7c3aed',
        desc: 'JSON-LD in the head of your page. At minimum, Organization schema (name, URL, logo), FAQPage schema for common questions, and depending on your website type, SoftwareApplication or Product.',
        example: null,
        source: { label: 'Official Schema.org documentation', url: 'https://schema.org' },
        internalLink: { label: 'Schema markup for AI citations in detail', href: '/blog/schema-markup-ki-zitate' },
    },
    {
        number: '03',
        title: 'FAQ schema with real HTML content',
        color: '#10b981',
        desc: 'Important: FAQ schema in JSON-LD alone isn\'t enough. The questions and answers also need to exist as visible HTML text on the page. AI models scrape the visible content - not just the head.',
        example: null,
    },
    {
        number: '04',
        title: 'Allow AI crawlers in robots.txt',
        color: '#f59e0b',
        desc: 'Many websites unknowingly block AI crawlers. Make sure GPTBot, ClaudeBot, anthropic-ai, PerplexityBot, and YouBot are explicitly allowed in your robots.txt.',
        example: 'User-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /',
        source: { label: 'Official crawler docs: OpenAI GPTBot', url: 'https://developers.openai.com/api/docs/bots' },
    },
    {
        number: '05',
        title: 'Clear product definition',
        color: '#ef4444',
        desc: 'AI models need an unambiguous "X is Y for Z" definition. Write, in one of the first paragraphs of your homepage, precisely what your tool is, who it\'s for, and what problem it solves. Avoid marketing fluff.',
        example: null,
    },
    {
        number: '06',
        title: 'E-E-A-T signals',
        color: '#a78bfa',
        desc: 'Experience, Expertise, Authoritativeness, Trustworthiness. AI models favor sources with an identifiable author, contact details, a privacy policy, and an imprint. An /about page with founder info significantly increases trust.',
        example: null,
    },
]

export default function WhatIsGeoPageEn() {
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
                    <span className="text-slate-500">What is GEO?</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-cyan-500/15 text-cyan-400">
                            GEO
                        </span>
                        <span className="text-xs text-slate-600">June 10, 2026</span>
                        <span className="text-xs text-slate-600">· 8 min read</span>
                        <span className="text-xs text-slate-600">· Updated Aug 24, 2026</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        What is GEO? Generative Engine Optimization Explained
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Classic SEO optimizes for Google. But in 2026, AI models like ChatGPT, Claude, Perplexity, and Google AI Overview decide daily which websites they recommend to their users - by completely different rules. Here's how GEO works and how to meaningfully improve your score in 60 minutes.
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

                {/* Divider */}
                <div className="border-t border-white/5 mb-10" />

                {/* Content */}
                <div className="prose prose-invert prose-slate max-w-none space-y-10 text-slate-300 leading-relaxed">

                    <nav aria-label="Table of contents" className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">In this article</p>
                        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            <li><a href="#what-is-geo" className="text-slate-400 hover:text-cyan-300 transition-colors">What is GEO (Generative Engine Optimization)?</a></li>
                            <li><a href="#why-geo" className="text-slate-400 hover:text-cyan-300 transition-colors">Why does GEO matter in 2026?</a></li>
                            <li><a href="#geo-vs-seo" className="text-slate-400 hover:text-cyan-300 transition-colors">GEO vs. SEO compared</a></li>
                            {SIGNALS.map((s) => (
                                <li key={s.number}>
                                    <a href={`#signal-${s.number}`} className="text-slate-400 hover:text-cyan-300 transition-colors">
                                        <span className="font-mono text-slate-600 mr-1.5">{s.number}</span>{s.title}
                                    </a>
                                </li>
                            ))}
                            <li><a href="#ai-models" className="text-slate-400 hover:text-cyan-300 transition-colors">Which AI models benefit from GEO?</a></li>
                            <li><a href="#quick-wins" className="text-slate-400 hover:text-cyan-300 transition-colors">10 GEO quick wins</a></li>
                            <li><a href="#faq" className="text-slate-400 hover:text-cyan-300 transition-colors">Frequently asked questions</a></li>
                        </ol>
                    </nav>

                    <section id="what-is-geo" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">What is GEO (Generative Engine Optimization)?</h2>
                        <p>
                            GEO stands for <strong className="text-white">Generative Engine Optimization</strong> (sometimes also called AI search optimization or ChatGPT SEO) - optimizing your website for AI models like ChatGPT, Claude, Perplexity, Gemini, or YouChat. The term was coined in 2023 in the <a href="https://arxiv.org/abs/2311.09735" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">GEO research paper from Princeton, Georgia Tech, and the Allen Institute for AI</a>. While SEO aims to rank high in Google's search results, GEO makes sure AI models recognize your website as a trustworthy source and cite it in their answers.
                        </p>
                        <p className="mt-4">
                            The difference is fundamental: Google ranks by keywords, backlinks, and technical signals. AI models, by contrast, look for <strong className="text-white">structured, citable content</strong>, clear entity definitions, and trust signals. A website that ranks on page 1 of Google can still be invisible to AI models - and vice versa.
                        </p>
                    </section>

                    <section id="why-geo" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Why does GEO matter in 2026?</h2>
                        <p>
                            ChatGPT has over <a href="https://techcrunch.com/2026/02/27/chatgpt-reaches-900m-weekly-active-users" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">900 million weekly users according to OpenAI</a> (as of February 2026). Perplexity delivers directly cited sources as an answer engine instead of a list of links, and keeps growing rapidly. Claude is increasingly used in business workflows. More and more people no longer ask Google - they ask an AI.
                        </p>
                        <p className="mt-4">
                            If you don't show up in these answers, you visibly lose reach - even if your Google rankings don't change at all. That's the blind spot in most 2026 SEO strategies.
                        </p>
                        <div className="bg-cyan-500/8 border border-cyan-500/20 rounded-2xl p-5 mt-5">
                            <p className="text-sm text-cyan-300 font-medium mb-1">Key takeaway</p>
                            <p className="text-sm text-slate-400">
                                GEO doesn't replace SEO - it complements it. If you only optimize for Google today, you're leaving a growing channel untapped. The websites that start building GEO signals now will have a clear edge in 2027.
                            </p>
                        </div>
                    </section>

                    <section id="geo-vs-seo" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">GEO vs. SEO: What's the difference?</h2>
                        <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <th className="text-left px-5 py-3 text-slate-400 font-semibold">Aspect</th>
                                        <th className="text-left px-5 py-3 text-slate-400 font-semibold">SEO (Google)</th>
                                        <th className="text-left px-5 py-3 text-cyan-400 font-semibold">GEO (AI models)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['Goal', 'Ranking in search results', 'Being cited in AI answers'],
                                        ['Core factor', 'Keywords & backlinks', 'Structured data & clarity'],
                                        ['Technical', 'robots.txt, sitemap, Core Web Vitals', 'llms.txt, Schema.org, FAQ schema'],
                                        ['Content', 'Keyword density, E-E-A-T', 'Citable facts, clear definitions'],
                                        ['Measurement', 'Rankings, impressions, CTR', 'GEO score, crawler access, mentions'],
                                    ].map(([aspect, seo, geo], i) => (
                                        <tr key={i} className="border-b border-white/[0.04] last:border-0">
                                            <td className="px-5 py-3 text-white font-medium">{aspect}</td>
                                            <td className="px-5 py-3 text-slate-400">{seo}</td>
                                            <td className="px-5 py-3 text-slate-300">{geo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-2">What are the 6 most important GEO signals?</h2>
                        <p className="text-slate-400 mb-6">AuditAI checks 19 GEO signals in total. These are the six with the biggest impact:</p>
                        <figure className="mb-6">
                            <Image
                                src="/blog/auditai-geo-report.png"
                                alt="AuditAI GEO report showing checked AI visibility signals like llms.txt, Organization schema, AI crawler access, and sitemap.xml"
                                width={960}
                                height={411}
                                className="w-full h-auto rounded-2xl border border-white/[0.07]"
                            />
                            <figcaption className="text-xs text-slate-600 mt-2">
                                A real GEO score report from AuditAI — all 12 AI visibility signals at a glance, including a found issue.
                            </figcaption>
                        </figure>
                        <div className="space-y-4">
                            {SIGNALS.map((s) => (
                                <div key={s.number} id={`signal-${s.number}`} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 scroll-mt-28">
                                    <div className="flex items-start gap-4">
                                        <span className="text-[11px] font-bold font-mono shrink-0 mt-0.5" style={{ color: s.color }}>{s.number}</span>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                                            <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                                            {s.example && (
                                                <pre className="mt-3 text-xs bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 text-slate-400 font-mono overflow-x-auto">
                                                    {s.example}
                                                </pre>
                                            )}
                                            {s.source && (
                                                <a
                                                    href={s.source.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-3 inline-block text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
                                                >
                                                    Source: {s.source.label} ↗
                                                </a>
                                            )}
                                            {s.internalLink && (
                                                <Link
                                                    href={s.internalLink.href}
                                                    className="mt-3 ml-4 inline-block text-xs text-violet-400 hover:text-violet-300 underline underline-offset-2"
                                                >
                                                    {s.internalLink.label} →
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="ai-models" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Which AI models benefit from GEO?</h2>
                        <p>
                            Not all AI models work the same way. There are two fundamental types:
                        </p>
                        <p className="mt-4">
                            <strong className="text-white">RAG-based systems</strong> (Retrieval Augmented Generation) like Perplexity or Bing Copilot crawl the web in real time and cite sources directly. GEO signals take effect fastest here - within days to weeks.
                        </p>
                        <p className="mt-4">
                            <strong className="text-white">Models with a training cutoff</strong> like ChatGPT (without browsing) or Claude (without web access) only know content from their training data. It takes longer here - but the more your website is discussed across the public web (GitHub, Reddit, Hacker News, product pages), the higher the chance of being picked up in future training runs.
                        </p>
                        <p className="mt-4">
                            <strong className="text-white">Hybrid systems</strong> like ChatGPT with browsing enabled or Claude with web access combine both approaches. For these, a solid technical GEO foundation (Schema.org, clean canonicals, citable facts) is especially important.
                        </p>
                    </section>

                    <section id="quick-wins" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Which 10 GEO quick wins should you implement first?</h2>
                        <div className="space-y-2">
                            {[
                                ['Create llms.txt', 'Add /llms.txt with a clear product description'],
                                ['Create llms-full.txt', 'A detailed version with pricing, features, FAQs'],
                                ['Organization Schema', 'JSON-LD with name, URL, logo, sameAs'],
                                ['FAQ Schema + HTML content', 'Questions in JSON-LD AND as visible text on the page'],
                                ['Allow AI crawlers', 'GPTBot, ClaudeBot, anthropic-ai, PerplexityBot in robots.txt'],
                                ['Keep the sitemap current', 'All relevant pages in sitemap.xml'],
                                ['Clear product definition', '"X is Y for Z" - in the first 100 words of the homepage'],
                                ['Numbers & statistics', 'Concrete data that AI models like to cite'],
                                ['About/founder page', 'Who\'s behind it - E-E-A-T signal for AI'],
                                ['External source links', 'Links to authoritative sources (Google, OWASP, Schema.org)'],
                            ].map(([title, desc], i) => (
                                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                                    <div className="w-5 h-5 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-[9px] font-bold text-cyan-400">{i + 1}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-white">{title}</span>
                                        <span className="text-sm text-slate-500"> - {desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="faq" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Frequently asked questions about GEO</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    q: 'What is GEO (Generative Engine Optimization)?',
                                    a: 'GEO stands for Generative Engine Optimization. It refers to optimizing a website so AI models like ChatGPT, Claude, or Perplexity recognize it as a trustworthy source and cite it in their answers. Similar to how SEO optimizes for Google\'s algorithms, GEO targets indexing and use by generative AI systems.',
                                },
                                {
                                    q: 'What is the difference between GEO and SEO?',
                                    a: 'SEO optimizes for search engines like Google, which rank by keywords and backlinks. GEO optimizes for AI models, which look for structured data, clear entity definitions, and citable content. Both matter and complement each other.',
                                },
                                {
                                    q: 'What is llms.txt and why does it matter?',
                                    a: 'llms.txt is a text file in a website\'s root directory (similar to robots.txt) meant to be specifically readable by AI models. It describes what the website is and what it offers. No major AI provider has confirmed actually using the file - Google has explicitly called it unnecessary. It\'s therefore not a confirmed GEO signal, though it can still be worthwhile as clean product documentation.',
                                },
                                {
                                    q: 'What is "ChatGPT SEO"?',
                                    a: '"ChatGPT SEO" is a colloquial term for GEO with a specific focus on ChatGPT - optimizing a website so ChatGPT mentions or recommends it in its answers. Technically, GEO is the broader term for all AI models, but the underlying techniques are identical: structured data, llms.txt, clear product definitions, and citable facts.',
                                },
                                {
                                    q: 'How long does it take for GEO to show results?',
                                    a: 'RAG-based systems like Perplexity react to technical GEO signals within days to weeks. Models with a fixed training-data cutoff like GPT-4 can take months until the next training update. Technical quick wins like schema markup and AI crawler access work fastest - llms.txt excepted, since no major provider has confirmed using it.',
                                },
                            ].map((faq, i) => (
                                <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
                                    <h3 className="font-semibold text-white mb-2 text-sm">{faq.q}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* CTA */}
                <div className="mt-14 bg-gradient-to-br from-cyan-950/40 to-[#05080f] border border-cyan-500/20 rounded-2xl p-6 sm:p-8 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                        How good is your GEO score?
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        AuditAI checks all 19 GEO signals in under 60 seconds - including llms.txt, Schema.org, AI crawler access, and content quality. Start without registration, sign up free for the full report with all scores.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20"
                    >
                        Check your GEO score now
                    </Link>
                    <div className="mt-3 text-xs text-slate-600">No registration to start · Full report free · 60 seconds</div>
                </div>

                {/* Back to blog */}
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
