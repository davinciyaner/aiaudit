import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export const metadata = {
    title: { absolute: 'Scanora: The SEO Tool With GEO Analysis (2026)' },
    description: 'Scanora checks SEO, performance, and GEO (AI visibility for ChatGPT, Claude & Perplexity) in one report. All the features, pricing, and what you get as a user.',
    keywords: 'seo tool, seo check, seo audit, website audit, free seo test, seo software, seo automation, geo tool, geo check, geo automation, ai visibility, generative engine optimization, chatgpt seo, core web vitals test, keyword tracking, google ranking tool, backlink check, llms.txt, schema markup, website analysis',
    alternates: {
        canonical: 'https://www.scanora.ai/en/blog/best-seo-tools-2026',
        languages: {
            'de-DE': 'https://www.scanora.ai/blog/beste-seo-check-tools-2026',
            'en-US': 'https://www.scanora.ai/en/blog/best-seo-tools-2026',
        },
    },
    openGraph: {
        title: 'Scanora: The SEO Tool With GEO Analysis (2026)',
        description: 'SEO, performance, and GEO in one report - all the features, pricing, and what you get.',
        url: 'https://www.scanora.ai/en/blog/best-seo-tools-2026',
        type: 'article',
        locale: 'en_US',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Scanora: The SEO Tool With GEO Analysis (2026)',
    description: 'Scanora checks SEO, performance, and GEO (AI visibility for ChatGPT, Claude & Perplexity) in one report. All the features, pricing, and what you get as a user.',
    image: 'https://www.scanora.ai/en/blog/best-seo-tools-2026/opengraph-image',
    datePublished: '2026-07-15T09:00:00+02:00',
    dateModified: '2026-08-04T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.scanora.ai/about' },
    publisher: {
        '@type': 'Organization',
        name: 'Scanora',
        url: 'https://www.scanora.ai',
        logo: { '@type': 'ImageObject', url: 'https://www.scanora.ai/logo', width: 512, height: 512 },
    },
    url: 'https://www.scanora.ai/en/blog/best-seo-tools-2026',
    mainEntityOfPage: 'https://www.scanora.ai/en/blog/best-seo-tools-2026',
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai/en' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.scanora.ai/en/blog' },
        { '@type': 'ListItem', position: 3, name: 'Scanora: SEO Tool With GEO Analysis', item: 'https://www.scanora.ai/en/blog/best-seo-tools-2026' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Is Scanora really free to use?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. The audit can be started without registration. The full report with all scores (SEO, performance, GEO) just needs a free account - 1 audit per month, free forever, no credit card required.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is the difference between the audit and SEO/GEO automation?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The audit shows your website\'s status at a point in time. SEO automation and GEO automation are separate, ongoing subscriptions: they track Google rankings and AI mentions automatically every week and alert you when something changes.',
            },
        },
        {
            '@type': 'Question',
            name: 'Does Scanora check whether ChatGPT or Google AI Overviews recommend me?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, that\'s the GEO part of the product. The one-time audit checks 19 technical GEO signals (llms.txt, schema markup, AI crawler access). GEO automation goes further and asks Claude, ChatGPT, Perplexity, and Google AI Overview directly, every week, whether they mention your domain.',
            },
        },
        {
            '@type': 'Question',
            name: 'How long does an audit take?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Under 60 seconds for SEO, performance, and GEO analysis combined.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I cancel the subscriptions anytime?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. All paid plans are cancellable anytime, no hidden trial tricks. SEO and GEO automation also come with a 14-day free trial.',
            },
        },
    ],
}

export default function AuditAiOverviewPageEn() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar locale="en" />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-[var(--text-faint)] mb-8">
                    <Link href="/en" className="hover:text-[var(--text-muted)] transition-colors">Scanora</Link>
                    <span>/</span>
                    <Link href="/en/blog" className="hover:text-[var(--text-muted)] transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-[var(--text-faint)]">Scanora: SEO Tool With GEO Analysis</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-amber-500/15 text-amber-400">
                            Tools
                        </span>
                        <span className="text-xs text-[var(--text-faint)]">July 15, 2026</span>
                        <span className="text-xs text-[var(--text-faint)]">· Updated Aug 4, 2026</span>
                        <span className="text-xs text-[var(--text-faint)]">· 8 min read</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text-white)] leading-tight tracking-tight mb-5">
                        Scanora: The SEO Tool With GEO Analysis
                    </h1>
                    <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                        Most SEO tools check whether your website looks okay to Google - and completely ignore whether ChatGPT, Claude, Perplexity, or Google AI Overview even know you exist. Scanora checks both: classic SEO, performance, and GEO (AI visibility), in one report, in under 60 seconds. Here&apos;s everything you get as a user.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-[var(--text-faint)]">
                        <Link href="/en/about" className="flex items-center gap-2 hover:text-[var(--text-body)] transition-colors">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-[var(--text-white)] text-[10px] font-bold">F</div>
                            <span>Finn Paustian</span>
                        </Link>
                        <span>·</span>
                        <span>Founder, Scanora</span>
                    </div>
                </div>

                <div className="border-t border-[var(--text-white)]/5 mb-10" />

                <div className="space-y-10 text-[var(--text-body)] leading-relaxed">

                    <nav aria-label="Table of contents" className="bg-[var(--text-white)]/[0.02] border border-[var(--text-white)]/[0.06] rounded-2xl p-5 sm:p-6">
                        <p className="text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider mb-3">In this article</p>
                        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            <li><a href="#what-is-scanora" className="text-[var(--text-muted)] hover:text-amber-300 transition-colors">What is Scanora?</a></li>
                            <li><a href="#free-audit" className="text-[var(--text-muted)] hover:text-amber-300 transition-colors">The free audit</a></li>
                            <li><a href="#seo-analysis" className="text-[var(--text-muted)] hover:text-amber-300 transition-colors">SEO analysis in detail</a></li>
                            <li><a href="#performance" className="text-[var(--text-muted)] hover:text-amber-300 transition-colors">Performance check</a></li>
                            <li><a href="#geo-check" className="text-[var(--text-muted)] hover:text-amber-300 transition-colors">GEO check: AI visibility</a></li>
                            <li><a href="#ai-report" className="text-[var(--text-muted)] hover:text-amber-300 transition-colors">The AI report</a></li>
                            <li><a href="#seo-automation" className="text-[var(--text-muted)] hover:text-amber-300 transition-colors">SEO automation</a></li>
                            <li><a href="#geo-automation" className="text-[var(--text-muted)] hover:text-amber-300 transition-colors">GEO automation</a></li>
                            <li><a href="#who-its-for" className="text-[var(--text-muted)] hover:text-amber-300 transition-colors">Who is Scanora for?</a></li>
                            <li><a href="#pricing" className="text-[var(--text-muted)] hover:text-amber-300 transition-colors">Pricing overview</a></li>
                            <li><a href="#faq" className="text-[var(--text-muted)] hover:text-amber-300 transition-colors">Frequently asked questions</a></li>
                        </ol>
                    </nav>

                    <section id="what-is-scanora" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">What is Scanora?</h2>
                        <p>
                            Scanora is an AI-powered website audit tool that combines SEO, performance, and GEO (Generative Engine Optimization) in a single scan. Instead of needing a separate tool for each - an SEO checker, a performance tool, and (if one even exists) a separate GEO tool - Scanora runs all three analyses at once, evaluated by Claude (Anthropic).
                        </p>
                        <p className="mt-4">
                            The difference from classic SEO checkers: most of them were built long before ChatGPT, Perplexity, and Google AI Overview became meaningful traffic sources. Their checklists stop at title tags and backlinks. Scanora also checks whether AI models can recognize and cite your website as a source.
                        </p>
                    </section>

                    <section id="free-audit" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">The free audit: what you get instantly</h2>
                        <p className="mb-5">
                            You enter a URL, wait under 60 seconds, and get a full website check - no registration needed for the first look, a free account unlocks the full report.
                        </p>
                        <figure className="mb-6">
                            <Image
                                src="/blog/auditai-score-overview.png"
                                alt="Scanora score overview showing overall, SEO, performance, and GEO scores from a real audit report"
                                width={960}
                                height={194}
                                className="w-full h-auto rounded-2xl border border-[var(--text-white)]/[0.07]"
                            />
                            <figcaption className="text-xs text-[var(--text-faint)] mt-2">
                                The score overview from a real Scanora report: SEO, performance, and GEO in one view.
                            </figcaption>
                        </figure>
                        <div className="space-y-2">
                            {[
                                ['Overall score', 'A single weighted score summarizing SEO, performance, and GEO'],
                                ['SEO score', 'How well your page is set up for Google ranking factors'],
                                ['Performance score', 'Load time and technical metrics against real thresholds'],
                                ['GEO score', 'Whether AI models can technically recognize and cite your website at all'],
                                ['Audit history', 'Past checks stay saved so you can see progress over time'],
                            ].map(([title, desc], i) => (
                                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-[var(--text-white)]/[0.04] last:border-0">
                                    <div className="w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-[9px] font-bold text-amber-400">{i + 1}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-[var(--text-white)]">{title}</span>
                                        <span className="text-sm text-[var(--text-faint)]"> - {desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="seo-analysis" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">SEO analysis in detail</h2>
                        <p className="mb-5">
                            The SEO portion covers the factors Google actually uses to evaluate your page:
                        </p>
                        <figure className="mb-6">
                            <Image
                                src="/blog/auditai-seo-issues.png"
                                alt="Scanora SEO issue list with prioritized problems and concrete fixes"
                                width={960}
                                height={420}
                                className="w-full h-auto rounded-2xl border border-[var(--text-white)]/[0.07]"
                            />
                            <figcaption className="text-xs text-[var(--text-faint)] mt-2">
                                Found SEO issues, prioritized and clearly described instead of just a raw error list.
                            </figcaption>
                        </figure>
                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            {[
                                'Title tag (length & keyword relevance)', 'Meta description', 'H1-H6 structure',
                                'Image alt text', 'Canonical tag', 'Open Graph & Twitter Card',
                                'Structured data / JSON-LD', 'Robots meta tag', 'Internal linking',
                                'Word count per page', 'HTML lang attribute', 'HTTPS status',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2 text-[var(--text-muted)]">
                                    <span className="text-emerald-400">✓</span> {item}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="performance" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Performance check</h2>
                        <p className="mb-4">
                            Load time is both a Google ranking factor and a direct revenue factor - Scanora measures the metrics that actually matter:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            {[
                                'Time to First Byte (TTFB)', 'First Contentful Paint (FCP)',
                                'DOM load', 'Full page load time',
                                'Page size', 'Number of HTTP requests',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2 text-[var(--text-muted)]">
                                    <span className="text-emerald-400">✓</span> {item}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="geo-check" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">GEO check: are you found by ChatGPT & co.?</h2>
                        <p className="mb-5">
                            This is the part almost no other tool checks. 19 technical signals determine whether AI models recognize your website as a trustworthy source:
                        </p>
                        <figure className="mb-6">
                            <Image
                                src="/blog/scanora-geo-report.png"
                                alt="Scanora GEO report showing checked AI visibility signals like llms.txt, Organization schema, AI crawler access, and sitemap.xml"
                                width={960}
                                height={411}
                                className="w-full h-auto rounded-2xl border border-[var(--text-white)]/[0.07]"
                            />
                            <figcaption className="text-xs text-[var(--text-faint)] mt-2">
                                A real GEO report: every checked AI visibility signal at a glance, including a found issue.
                            </figcaption>
                        </figure>
                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            {[
                                'llms.txt present & correctly formatted', 'llms-full.txt present',
                                'Organization schema (JSON-LD)', 'FAQ schema with visible HTML content',
                                'AI crawler access allowed in robots.txt', 'sitemap.xml complete & current',
                                'Clear product definition in the content', 'Concrete numbers & statistics',
                                'External source links', 'Author & about info (E-E-A-T)',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2 text-[var(--text-muted)]">
                                    <span className="text-emerald-400">✓</span> {item}
                                </div>
                            ))}
                        </div>
                        <p className="mt-5">
                            More on the concept behind this: <Link href="/en/blog/what-is-geo" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">What is GEO?</Link>.
                        </p>
                    </section>

                    <section id="ai-report" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">The AI report: concrete fixes, not just numbers</h2>
                        <p>
                            On the Pro plan and above, Claude (Anthropic) generates a full report from the audit data - not a generic error list, but:
                        </p>
                        <div className="space-y-2 mt-4">
                            {[
                                ['Prioritized problem summary', 'What to tackle first, and why'],
                                ['Concrete fixes per category', 'Directly actionable, not just "improve your meta tags"'],
                                ['Action plan', 'Quick wins first, bigger fixes after'],
                                ['Desktop & mobile screenshots', 'Visual comparison of both views'],
                                ['PDF export', 'For sharing or archiving'],
                            ].map(([title, desc], i) => (
                                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-[var(--text-white)]/[0.04] last:border-0">
                                    <div className="w-5 h-5 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-[9px] font-bold text-violet-400">{i + 1}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-[var(--text-white)]">{title}</span>
                                        <span className="text-sm text-[var(--text-faint)]"> - {desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="seo-automation" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">SEO automation: ongoing ranking tracking</h2>
                        <p className="mb-4">
                            The one-time audit shows your status right now. SEO automation is a separate subscription for ongoing monitoring:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            {[
                                'Weekly Google ranking tracking', 'Email alerts on significant moves',
                                'Keyword ideas with search volume & CPC', 'Automated competitor analysis',
                                'Content gap analysis (Pro and above)', 'Monthly backlink summary',
                                'Automatic keyword discovery from new content',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2 text-[var(--text-muted)]">
                                    <span className="text-emerald-400">✓</span> {item}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="geo-automation" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">GEO automation: AI visibility over time</h2>
                        <p className="mb-4">
                            And the GEO counterpart - ongoing tracking of whether AI models actually mention you, not just whether the technical prerequisites are in place:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            {[
                                'Weekly check across Claude, ChatGPT, Perplexity & Google AI Overview',
                                'Real user-style queries, not synthetic tests',
                                'Mention rate (%) per keyword & platform',
                                'Two prompt variants: recommendation & comparison (Pro and above)',
                                'History over time', 'Manual checks on demand',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2 text-[var(--text-muted)]">
                                    <span className="text-emerald-400">✓</span> {item}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="who-its-for" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Who is Scanora for?</h2>
                        <p>
                            Web developers and agencies who want a fast status check on a website (their own or a client&apos;s) without juggling three tools. SEO freelancers who want to bring AI visibility to their clients&apos; attention before it becomes standard practice. And small to mid-size businesses who want to understand for themselves why they&apos;re not showing up on Google - or in ChatGPT - without hiring an agency to find out.
                        </p>
                    </section>

                    <section id="pricing" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Pricing overview</h2>
                        <div className="overflow-hidden rounded-2xl border border-[var(--text-white)]/[0.07] mb-4">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-[var(--text-white)]/5 bg-[var(--text-white)]/[0.02]">
                                        <th className="text-left px-4 py-3 text-[var(--text-muted)] font-semibold">Plan</th>
                                        <th className="text-left px-4 py-3 text-[var(--text-muted)] font-semibold">Price</th>
                                        <th className="text-left px-4 py-3 text-[var(--text-muted)] font-semibold">Includes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['Free (Audit)', '€0/month', '1 audit/month, SEO, performance & GEO score'],
                                        ['Pro (Audit)', '€29/month', '10 audits/month, AI report, screenshots, PDF export'],
                                        ['SEO Automation', 'from €19/month', 'Weekly ranking tracking, 14-day free trial'],
                                        ['GEO Automation', 'from €4.99/month', 'Weekly AI mention tracking, 14-day free trial'],
                                    ].map(([plan, price, desc]) => (
                                        <tr key={plan} className="border-b border-[var(--text-white)]/[0.04] last:border-0">
                                            <td className="px-4 py-3 text-[var(--text-white)] font-medium whitespace-nowrap">{plan}</td>
                                            <td className="px-4 py-3 text-amber-400 font-medium whitespace-nowrap">{price}</td>
                                            <td className="px-4 py-3 text-[var(--text-muted)]">{desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-sm text-[var(--text-faint)]">
                            All automation plans are cancellable anytime, no hidden trial tricks.
                        </p>
                    </section>

                    <section id="faq" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Frequently asked questions</h2>
                        <div className="space-y-4">
                            {faqLd.mainEntity.map((faq, i) => (
                                <div key={i} className="bg-[var(--text-white)]/[0.02] border border-[var(--text-white)]/[0.06] rounded-2xl p-5">
                                    <h3 className="font-semibold text-[var(--text-white)] mb-2 text-sm">{faq.name}</h3>
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{faq.acceptedAnswer.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* CTA */}
                <div className="mt-14 bg-gradient-to-br from-amber-950/30 to-[var(--bg-base)] border border-amber-500/20 rounded-2xl p-6 sm:p-8 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-white)] mb-3">
                        SEO, performance, and GEO in one report
                    </h2>
                    <p className="text-[var(--text-muted)] text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        Check your website in under 60 seconds - including llms.txt, AI crawler access, and schema for AI citations. Start without registration, sign up free for the full report with all scores.
                    </p>
                    <Link
                        href="/en/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-violet-600 hover:from-amber-400 hover:to-violet-500 text-[var(--text-white)] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/20"
                    >
                        Start free audit
                    </Link>
                    <div className="mt-3 text-xs text-[var(--text-faint)]">No registration to start · Full report free · 60 seconds</div>
                </div>

                {/* Cross-link to sibling posts */}
                <div className="mt-5 bg-[var(--text-white)]/[0.02] border border-[var(--text-white)]/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1 block">Keep reading</span>
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-2">
                                SEO Checklist 2026: Find Every Issue Yourself in 15 Minutes
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md">
                                Want to check things yourself first? 6 phases, every important point in a fixed order.
                            </p>
                        </div>
                        <Link
                            href="/en/blog/seo-checklist-2026"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--text-white)]/[0.06] hover:bg-[var(--text-white)]/10 text-[var(--text-white)] text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Open checklist
                        </Link>
                    </div>
                </div>

                {/* Back */}
                <div className="mt-10 pt-8 border-t border-[var(--text-white)]/5">
                    <Link href="/en/blog" className="text-sm text-[var(--text-faint)] hover:text-[var(--text-body)] transition-colors">
                        ← Back to blog
                    </Link>
                </div>

            </article>

            <Footer locale="en" />
        </main>
    )
}
