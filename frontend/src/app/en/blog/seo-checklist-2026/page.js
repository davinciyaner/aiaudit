import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export const metadata = {
    title: { absolute: 'SEO Checklist 2026: Find Every Mistake Yourself in 15 Minutes' },
    description: 'The complete SEO checklist for 2026, in a fixed order: 6 phases, 15 minutes, every important SEO and GEO signal. Check it yourself or run it automatically with AuditAI.',
    keywords: 'seo checklist 2026, seo checklist, seo mistakes checklist, find seo mistakes, technical seo checklist, free seo test',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/blog/seo-checklist-2026',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/blog/seo-checkliste-2026',
            'en-US': 'https://www.sitecheckai.dev/en/blog/seo-checklist-2026',
        },
    },
    openGraph: {
        title: 'SEO Checklist 2026: Find Every Mistake Yourself in 15 Minutes',
        description: '6 phases, 15 minutes, every important SEO and GEO signal in a fixed order.',
        url: 'https://www.sitecheckai.dev/en/blog/seo-checklist-2026',
        type: 'article',
        locale: 'en_US',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SEO Checklist 2026: Find Every Mistake Yourself in 15 Minutes',
    description: 'The complete SEO checklist for 2026, in a fixed order: 6 phases, 15 minutes, every important SEO and GEO signal.',
    image: 'https://www.sitecheckai.dev/en/blog/seo-checklist-2026/opengraph-image',
    datePublished: '2026-07-15T09:00:00+02:00',
    dateModified: '2026-08-01T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/en/blog/seo-checklist-2026',
    mainEntityOfPage: 'https://www.sitecheckai.dev/en/blog/seo-checklist-2026',
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev/en' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sitecheckai.dev/en/blog' },
        { '@type': 'ListItem', position: 3, name: 'SEO Checklist 2026', item: 'https://www.sitecheckai.dev/en/blog/seo-checklist-2026' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What belongs in an SEO checklist for 2026?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'A complete 2026 SEO checklist covers six areas: crawlability & indexing, meta basics (title, description, headings), load time & Core Web Vitals, content & internal structure, technical trust (HTTPS, security headers, broken links), and GEO signals for AI visibility (llms.txt, Schema.org, AI crawler access).',
            },
        },
        {
            '@type': 'Question',
            name: 'How long does an SEO checklist take?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The manual self-check in this article takes about 15 minutes for a single page - assuming you have access to Google Search Console and PageSpeed Insights. For a full website with multiple pages, an automated tool that checks every point in under 60 seconds is the more practical route.',
            },
        },
        {
            '@type': 'Question',
            name: 'What\'s the difference between this checklist and the 10 most common SEO mistakes?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Our article on the 10 most common SEO mistakes explains why certain problems cost rankings and how to fix them. This checklist is the practical workflow for that - a fixed order that lets you find out in 15 minutes which of those mistakes show up on your own site.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is a manual SEO checklist enough, or do I need a tool?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'For a single page, the manual checklist is enough. Once you\'re managing multiple pages, regular deployments, or several domains, manual effort quickly becomes unrealistic. An automated SEO test like AuditAI checks the same points across up to 25 subpages at once - including GEO signals that classic checklists often miss.',
            },
        },
    ],
}

const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'SEO Checklist 2026: Check Your Own Website in 6 Phases',
    description: 'Six phases, 24 points, fixed order - from the biggest wins per minute to the GEO bonus check.',
    totalTime: 'PT15M',
    step: [
        { '@type': 'HowToStep', name: 'Crawlability & indexing', text: 'Check robots.txt, noindex directives, XML sitemap, and crawl errors in Search Console.', url: 'https://www.sitecheckai.dev/en/blog/seo-checklist-2026#phase-01' },
        { '@type': 'HowToStep', name: 'Meta basics', text: 'Check the title tag, meta description, H1 tag, and heading hierarchy.', url: 'https://www.sitecheckai.dev/en/blog/seo-checklist-2026#phase-02' },
        { '@type': 'HowToStep', name: 'Load time & Core Web Vitals', text: 'Check PageSpeed score, LCP, image compression, and the mobile-friendly test.', url: 'https://www.sitecheckai.dev/en/blog/seo-checklist-2026#phase-03' },
        { '@type': 'HowToStep', name: 'Content & internal structure', text: 'Check word count, internal links, duplicate content, and the canonical tag.', url: 'https://www.sitecheckai.dev/en/blog/seo-checklist-2026#phase-04' },
        { '@type': 'HowToStep', name: 'Technical trust & security', text: 'Check HTTPS, the HSTS header, broken links, and legal/privacy pages.', url: 'https://www.sitecheckai.dev/en/blog/seo-checklist-2026#phase-05' },
        { '@type': 'HowToStep', name: 'GEO bonus check: AI visibility', text: 'Check llms.txt, Organization and FAQPage schema, and AI crawler access in robots.txt.', url: 'https://www.sitecheckai.dev/en/blog/seo-checklist-2026#phase-06' },
    ],
}

const PHASES = [
    {
        number: '01',
        title: 'Crawlability & indexing',
        time: '2 min',
        color: '#7c3aed',
        items: [
            { label: 'robots.txt doesn\'t block important pages', hint: 'Open yourdomain.com/robots.txt and check for unwanted "Disallow" lines' },
            { label: 'No accidental noindex directive', hint: 'Search the page source for <meta name="robots" content="noindex">' },
            { label: 'XML sitemap is current and submitted to Google', hint: 'Google Search Console → Sitemaps' },
            { label: 'No crawl errors in Search Console', hint: 'Search Console → Pages → Not indexed' },
        ],
    },
    {
        number: '02',
        title: 'Meta basics',
        time: '3 min',
        color: '#7c3aed',
        items: [
            { label: 'Title tag is unique and 50-60 characters long', hint: 'Main keyword as close to the front as possible' },
            { label: 'Meta description exists (120-160 characters)', hint: 'Every page needs its own - no duplicates' },
            { label: 'Exactly one H1 tag per page', hint: 'Contains the page\'s primary keyword' },
            { label: 'Heading hierarchy is clean (H2 before H3 before H4)', hint: 'No level gets skipped' },
        ],
        source: { label: 'Google Search Central: Title links', url: 'https://developers.google.com/search/docs/appearance/title-link' },
    },
    {
        number: '03',
        title: 'Load time & Core Web Vitals',
        time: '3 min',
        color: '#f59e0b',
        items: [
            { label: 'PageSpeed Insights score above 80 (mobile)', hint: 'Test your own URL at pagespeed.web.dev' },
            { label: 'LCP under 2.5 seconds', hint: 'Largest Contentful Paint - the largest visible content element' },
            { label: 'Images are compressed and in WebP format', hint: 'Check hero images and product images especially' },
            { label: 'Page passes the mobile-friendly test', hint: 'search.google.com/test/mobile-friendly' },
        ],
        source: { label: 'Google Search Central: Core Web Vitals', url: 'https://developers.google.com/search/docs/appearance/core-web-vitals' },
        internalLink: { label: 'LCP, INP & CLS explained in detail', href: '/en/blog/core-web-vitals-testing' },
    },
    {
        number: '04',
        title: 'Content & internal structure',
        time: '3 min',
        color: '#10b981',
        items: [
            { label: 'Important pages have at least 300 words', hint: 'Landing pages and blog posts should aim for 800+' },
            { label: 'Every page has at least 2-3 internal links', hint: 'To and from topically related pages' },
            { label: 'No duplicate content between subpages', hint: 'Check product pages or location pages especially closely' },
            { label: 'Canonical tag is set correctly', hint: 'Self-referencing, except for intentional duplicates' },
        ],
    },
    {
        number: '05',
        title: 'Technical trust & security',
        time: '2 min',
        color: '#ef4444',
        items: [
            { label: 'HTTPS is active, HTTP redirects automatically', hint: 'Check the lock icon in the browser' },
            { label: 'HSTS header is set', hint: 'Strict-Transport-Security in the response headers' },
            { label: 'No broken internal links or 404 pages', hint: 'Manually click through the most important click paths' },
            { label: 'Legal notice and privacy policy are reachable', hint: 'An E-E-A-T signal, especially for Google and AI models' },
        ],
        source: { label: 'Google Search Central Blog: HTTPS as a ranking signal', url: 'https://developers.google.com/search/blog/2014/08/https-as-ranking-signal' },
    },
    {
        number: '06',
        title: 'GEO bonus check: AI visibility',
        time: '2 min',
        color: '#06b6d4',
        items: [
            { label: 'llms.txt exists at the root', hint: 'yourdomain.com/llms.txt with a short product description' },
            { label: 'Organization and FAQPage schema are in place', hint: 'JSON-LD in the head, checked with Google\'s Rich Results Test' },
            { label: 'GPTBot, ClaudeBot & PerplexityBot are allowed in robots.txt', hint: 'Many websites unintentionally block AI crawlers' },
            { label: 'FAQ content is also visible in the HTML', hint: 'Not just in JSON-LD - AI models scrape visible text' },
        ],
    },
]

export default function SeoChecklistPageEn() {
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
                    <span className="text-slate-500">SEO Checklist 2026</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-violet-500/15 text-violet-400">
                            SEO
                        </span>
                        <span className="text-xs text-slate-600">Jul 15, 2026</span>
                        <span className="text-xs text-slate-600">· 7 min read</span>
                        <span className="text-xs text-slate-600">· Updated Aug 1, 2026</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        SEO Checklist 2026: Find Every Mistake Yourself in 15 Minutes
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        No explanations, no fluff - just the order in which to check your own website yourself in 15 minutes. Six phases, 24 points, including the GEO signals classic checklists usually forget.
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
                        <h2 className="text-2xl font-bold text-white mb-4">Why a checklist instead of an explainer?</h2>
                        <p>
                            In our article on the <Link href="/en/blog/common-seo-mistakes" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">10 most common SEO mistakes</Link>, we explain why individual problems cost rankings. This checklist takes the opposite approach: no theory, just a fixed order - the same one we run through ourselves before every major deployment.
                        </p>
                        <p className="mt-4">
                            The six phases are deliberately sorted by effort: the fastest checks come first. If you only have 5 minutes, at least do phases 1 and 2 - those are the points with the biggest payoff per minute invested.
                        </p>
                        <div className="bg-violet-500/8 border border-violet-500/20 rounded-2xl p-5 mt-5">
                            <p className="text-sm text-violet-300 font-medium mb-1">What you'll need</p>
                            <p className="text-sm text-slate-400">
                                Access to Google Search Console, the page source (right-click → "View page source"), and pagespeed.web.dev. To cover all six phases without manually looking anything up: an automated SEO test.
                            </p>
                        </div>
                    </section>

                    <nav aria-label="Table of contents" className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">In this article</p>
                        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            {PHASES.map((phase) => (
                                <li key={phase.number}>
                                    <a href={`#phase-${phase.number}`} className="text-slate-400 hover:text-violet-300 transition-colors">
                                        <span className="font-mono text-slate-600 mr-1.5">{phase.number}</span>{phase.title}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a href="#what-next" className="text-slate-400 hover:text-violet-300 transition-colors">What to do when you find mistakes?</a>
                            </li>
                            <li>
                                <a href="#faq" className="text-slate-400 hover:text-violet-300 transition-colors">Frequently asked questions</a>
                            </li>
                        </ol>
                    </nav>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-2">The checklist: 6 phases, 24 points</h2>
                        <p className="text-slate-400 mb-6">Work through top to bottom - each phase builds on the previous one.</p>
                        <figure className="mb-6">
                            <Image
                                src="/blog/auditai-seo-checks.png"
                                alt="AuditAI check grid showing passed and failed points like title tag, meta description, H1 tag, and alt texts"
                                width={910}
                                height={103}
                                className="w-full h-auto rounded-2xl border border-white/[0.07]"
                            />
                            <figcaption className="text-xs text-slate-600 mt-2">
                                This is exactly the kind of check AuditAI runs automatically — green for passed, red with a concrete reason for failed.
                            </figcaption>
                        </figure>
                        <div className="space-y-5">
                            {PHASES.map((phase) => (
                                <div key={phase.number} id={`phase-${phase.number}`} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6 scroll-mt-28">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-[11px] font-bold font-mono shrink-0 text-slate-600">{phase.number}</span>
                                        <h3 className="font-semibold text-white flex-1">{phase.title}</h3>
                                        <span
                                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                                            style={{ background: phase.color + '18', color: phase.color }}
                                        >
                                            {phase.time}
                                        </span>
                                    </div>
                                    <div className="space-y-2.5">
                                        {phase.items.map((item, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div
                                                    className="w-4 h-4 rounded border shrink-0 mt-0.5"
                                                    style={{ borderColor: phase.color + '60' }}
                                                />
                                                <div>
                                                    <span className="text-sm text-slate-200">{item.label}</span>
                                                    <span className="block text-xs text-slate-500 mt-0.5">{item.hint}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {phase.source && (
                                        <a
                                            href={phase.source.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 inline-block text-xs text-slate-600 hover:text-slate-400 underline underline-offset-2 transition-colors"
                                        >
                                            Source: {phase.source.label} ↗
                                        </a>
                                    )}
                                    {phase.internalLink && (
                                        <Link
                                            href={phase.internalLink.href}
                                            className="mt-4 ml-4 inline-block text-xs text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors"
                                        >
                                            {phase.internalLink.label} →
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="what-next" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">What to do when you find mistakes?</h2>
                        <p>
                            Prioritize by phase, not by count. A missing title tag (phase 2) matters more than three missing alt texts (phase 4). Always fix phases 1 and 2 first - without clean indexing and metadata, everything else has limited impact.
                        </p>
                        <p className="mt-4">
                            For the concrete reasoning and fix instructions behind the most common problems from phases 2 and 3, it's worth checking our article on the <Link href="/en/blog/common-seo-mistakes" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">10 most common SEO mistakes</Link> - we walk through each point with numbers and a detailed fix there.
                        </p>
                    </section>

                    <section id="faq" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Frequently asked questions about the SEO checklist</h2>
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
                        Phases 1, 2, 3, 4 & 6 in 60 seconds instead of 13 minutes
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        AuditAI automatically covers crawlability, metadata, Core Web Vitals, content structure, and GEO signals - across up to 25 subpages at once. Only phase 5 (security headers) still needs a manual check today. Start without registration, sign up free for the full report with all scores.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20"
                    >
                        Start your SEO test now
                    </Link>
                    <div className="mt-3 text-xs text-slate-600">No registration to start · Full report free · 60 seconds</div>
                </div>

                {/* Cross-link to sibling post */}
                <div className="mt-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1 block">Keep reading</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                The 10 most common SEO mistakes in detail
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Why exactly do missing meta descriptions or the wrong H1 cost rankings? With numbers, examples, and a concrete fix for every point.
                            </p>
                        </div>
                        <Link
                            href="/en/blog/common-seo-mistakes"
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
