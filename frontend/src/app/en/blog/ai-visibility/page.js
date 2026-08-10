import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export const metadata = {
    title: 'AI Visibility: How to Get Cited by ChatGPT, Claude & Perplexity',
    description: 'AI visibility is more than llms.txt and schema markup. How to actually get cited by ChatGPT, Claude, Perplexity and Google AI Overview - including monitoring with AuditAI.',
    keywords: 'ai visibility, ai visibility tool, get cited by chatgpt, get cited by claude, ai visibility tracker, generative engine optimization, llm visibility, ai search optimization',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/blog/ai-visibility',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/blog/ki-sichtbarkeit-erlangen',
            'en-US': 'https://www.sitecheckai.dev/en/blog/ai-visibility',
        },
    },
    openGraph: {
        title: 'AI Visibility: How to Get Cited by ChatGPT, Claude & Perplexity',
        description: 'Technical GEO signals aren’t enough. How to actually earn AI visibility - content strategy, monitoring, and what matters on each platform.',
        url: 'https://www.sitecheckai.dev/en/blog/ai-visibility',
        type: 'article',
        locale: 'en_US',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AI Visibility: How to Get Cited by ChatGPT, Claude & Perplexity',
    description: 'AI visibility is more than llms.txt and schema markup. How to actually get cited by ChatGPT, Claude, Perplexity and Google AI Overview - including monitoring with AuditAI.',
    image: 'https://www.sitecheckai.dev/en/blog/ai-visibility/opengraph-image',
    datePublished: '2026-08-10T09:00:00+02:00',
    dateModified: '2026-08-10T09:00:00+02:00',
    inLanguage: 'en-US',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/en/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/en/blog/ai-visibility',
    mainEntityOfPage: 'https://www.sitecheckai.dev/en/blog/ai-visibility',
    about: [
        { '@type': 'Thing', name: 'AI Visibility' },
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
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
        { '@type': 'ListItem', position: 3, name: 'AI Visibility', item: 'https://www.sitecheckai.dev/en/blog/ai-visibility' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What does it mean to get AI visibility?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Getting AI visibility means AI models like ChatGPT, Claude, Perplexity and Google AI Overview know a website or brand and actively cite or recommend it in their answers - not just that they can technically crawl it. That takes three layers: technical accessibility (llms.txt, Schema.org, crawler access), citable and authoritative content, and ongoing monitoring to confirm it’s actually working.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is llms.txt and schema markup enough for AI visibility?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Technical GEO signals like llms.txt, Schema.org and crawler access in robots.txt are the prerequisite for AI models to read and understand a website at all - they don’t guarantee a citation. Whether a model actually cites a source also depends on how authoritative and comparable that content is against other sources on the same topic.',
            },
        },
        {
            '@type': 'Question',
            name: 'Why do ChatGPT, Claude and Perplexity cite different sources?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'RAG-based systems like Perplexity crawl the live web on every query and tend to cite many different, freshly indexed sources. Models with a training cutoff like Claude or ChatGPT without web search draw on a smaller set of sources deemed especially authoritative during training - often comparison and roundup pages. That means the strategy differs: for Perplexity, fresh and well-indexed content matters most; for Claude and ChatGPT, what matters most is whether a brand already appears in authoritative comparison sources.',
            },
        },
        {
            '@type': 'Question',
            name: 'How can I measure AI visibility?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'AI visibility can be measured by repeatedly sending the same prompts to ChatGPT, Claude, Perplexity and Google AI Overview and logging whether and how often your own domain is mentioned - as a mention rate per keyword and platform, plus which sources get cited instead. Because AI answers aren’t deterministic, a reliable measurement needs repeated checks over time rather than a single snapshot.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is share of voice in AI visibility?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Share of voice in AI visibility describes what portion of citations on a topic or keyword go to your own domain compared to competitors. Knowing whether you get cited isn’t enough - what matters just as much is who gets cited instead, and how dominant that competition is on the topic.',
            },
        },
    ],
}

const LAYERS = [
    {
        number: '01',
        title: 'Technical foundation',
        color: '#06b6d4',
        desc: 'The prerequisite, not the solution: llms.txt, Schema.org data, FAQ schema backed by visible HTML content, and explicitly allowing AI crawlers like GPTBot, ClaudeBot and PerplexityBot in robots.txt. Without this, an AI can’t read a website at all - but this alone doesn’t get you cited.',
    },
    {
        number: '02',
        title: 'Citable, authoritative content',
        color: '#a78bfa',
        desc: 'AI models favor sources that make a clear claim and can be compared against other sources on the same topic. Concrete facts and numbers instead of marketing fluff, clear "X is Y for Z" definitions, and above all: presence in comparison and roundup content in your space - your own or someone else’s. Training-cutoff models like Claude disproportionately draw on exactly these comparison sources.',
    },
    {
        number: '03',
        title: 'External mentions & E-E-A-T',
        color: '#10b981',
        desc: 'Is your brand already being discussed elsewhere on the web - in forums, comparison articles, on GitHub, in reviews? The more often a domain shows up linked to a topic across the open web, the more likely AI models are to pick up that association. A maintained about page with founder info and outbound references to authoritative sources reinforce that trust signal further.',
    },
    {
        number: '04',
        title: 'Ongoing monitoring',
        color: '#f59e0b',
        desc: 'AI answers aren’t deterministic - the same question can get a different answer depending on when you ask. Without repeated measurement, you can’t tell whether a change is actually working or you’re just looking at a snapshot. Monitoring also shows who gets cited instead - and whether an ambiguous phrase like "AI visibility" even gets routed to the right category by a given model.',
    },
]

export default function AiVisibilityPage() {
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
                    <span className="text-slate-500">AI Visibility</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-violet-500/15 text-violet-400">
                            GEO
                        </span>
                        <span className="text-xs text-slate-600">August 10, 2026</span>
                        <span className="text-xs text-slate-600">· 9 min read</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        AI Visibility: How to Get Cited by ChatGPT, Claude & Perplexity
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Adding llms.txt and schema markup is the easy part. The real reason most websites still don’t get cited sits one layer deeper - in content strategy and monitoring. Here’s the full path to real AI visibility, broken down by platform.
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

                <div className="prose prose-invert prose-slate max-w-none space-y-10 text-slate-300 leading-relaxed">

                    <nav aria-label="Table of contents" className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">In this article</p>
                        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            <li><a href="#what-is-ai-visibility" className="text-slate-400 hover:text-violet-300 transition-colors">What exactly is AI visibility?</a></li>
                            <li><a href="#why-technical-isnt-enough" className="text-slate-400 hover:text-violet-300 transition-colors">Why isn’t technical enough?</a></li>
                            {LAYERS.map((l) => (
                                <li key={l.number}>
                                    <a href={`#layer-${l.number}`} className="text-slate-400 hover:text-violet-300 transition-colors">
                                        <span className="font-mono text-slate-600 mr-1.5">{l.number}</span>{l.title}
                                    </a>
                                </li>
                            ))}
                            <li><a href="#per-platform" className="text-slate-400 hover:text-violet-300 transition-colors">What matters per platform?</a></li>
                            <li><a href="#faq" className="text-slate-400 hover:text-violet-300 transition-colors">FAQ</a></li>
                        </ol>
                    </nav>

                    <section id="what-is-ai-visibility" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">What exactly is AI visibility?</h2>
                        <p>
                            <strong className="text-white">AI visibility</strong> describes how often and how prominently a website or brand gets mentioned in the answers of AI models like ChatGPT, Claude, Perplexity or Google AI Overview. It’s the GEO equivalent of Google rankings in classic SEO - except the "results page" is a generated answer instead of a list of links, and a brand either gets mentioned or it doesn’t, with everything in between (context, sentiment, which other sources get cited alongside it).
                        </p>
                        <p className="mt-4">
                            "Getting AI visibility" means more than just being crawlable. It means a model knows a domain, associates it with a topic, and considers it citation-worthy relative to other possible sources.
                        </p>
                    </section>

                    <section id="why-technical-isnt-enough" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Why isn’t technical alone enough?</h2>
                        <p>
                            llms.txt, Schema.org and open crawler rules solve an accessibility problem: can the AI even read the page? They don’t solve an authority problem: why would the AI cite this particular page instead of one of a hundred others on the same topic?
                        </p>
                        <div className="bg-violet-500/8 border border-violet-500/20 rounded-2xl p-5 mt-5">
                            <p className="text-sm text-violet-300 font-medium mb-1">The most common mistake</p>
                            <p className="text-sm text-slate-400">
                                Websites implement every technical GEO signal and still don’t get cited - because nowhere on the web (including their own site) does a comparison exist that positions their brand next to the answers that are already established for the same question.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-2">The 4 layers of earning AI visibility</h2>
                        <p className="text-slate-400 mb-6">Technical is only the first of four layers. Only all four together lead to actual citations:</p>
                        <div className="space-y-4">
                            {LAYERS.map((l) => (
                                <div key={l.number} id={`layer-${l.number}`} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 scroll-mt-28">
                                    <div className="flex items-start gap-4">
                                        <span className="text-[11px] font-bold font-mono shrink-0 mt-0.5" style={{ color: l.color }}>{l.number}</span>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white mb-2">{l.title}</h3>
                                            <p className="text-sm text-slate-400 leading-relaxed">{l.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="per-platform" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">What matters per platform - Claude, ChatGPT, Perplexity, Google AI Overview?</h2>
                        <p>
                            AI visibility isn’t a single metric - each platform works differently under the hood, and needs a different priority as a result:
                        </p>
                        <div className="overflow-hidden rounded-2xl border border-white/[0.07] mt-5">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <th className="text-left px-5 py-3 text-slate-400 font-semibold">Platform</th>
                                        <th className="text-left px-5 py-3 text-slate-400 font-semibold">How it works</th>
                                        <th className="text-left px-5 py-3 text-violet-400 font-semibold">What matters</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['Perplexity', 'Live web search on every query (RAG)', 'Fresh, well-indexed content - reacts fastest to new content'],
                                        ['Claude', 'Mostly training data', 'Presence in already-established, authoritative comparison sources'],
                                        ['ChatGPT', 'Training data, partly with web search', 'Unambiguous terms - vague phrasing easily gets misrouted'],
                                        ['Google AI Overview', 'Google’s index as the base', 'Classic SEO ranking remains the prerequisite for the citation source'],
                                    ].map(([platform, how, what], i) => (
                                        <tr key={i} className="border-b border-white/[0.04] last:border-0">
                                            <td className="px-5 py-3 text-white font-medium">{platform}</td>
                                            <td className="px-5 py-3 text-slate-400">{how}</td>
                                            <td className="px-5 py-3 text-slate-300">{what}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4">
                            That spread is also why monitoring per platform separately makes more sense than a single overall number - a brand can be highly visible on Claude and completely invisible on ChatGPT for the exact same question.
                        </p>
                    </section>

                    <section id="faq" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Frequently asked questions about AI visibility</h2>
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
                <div className="mt-14 bg-gradient-to-br from-violet-950/40 to-[#05080f] border border-violet-500/20 rounded-2xl p-6 sm:p-8 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                        Are you getting cited by ChatGPT, Claude & Perplexity?
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        AuditAI’s AI visibility tracking checks weekly and automatically whether your domain gets mentioned - including context, competitor comparison, and trend over time. Starting at $4.99/month, 14-day free trial.
                    </p>
                    <Link
                        href="/en/geo/pricing"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20"
                    >
                        Start tracking AI visibility
                    </Link>
                    <div className="mt-3 text-xs text-slate-600">14-day free trial · Claude, ChatGPT, Perplexity, Google AI Overview</div>
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
