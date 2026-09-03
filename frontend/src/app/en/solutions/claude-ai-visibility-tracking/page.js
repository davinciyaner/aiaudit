import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export const metadata = {
    title: { absolute: 'Claude AI Visibility Tracking 2026: See Whether Claude Recommends You' },
    description: "Track Claude AI visibility from €4.99/month - while Claude tracking on most AI-visibility tools is only available as an expensive Enterprise add-on. How it works and what it actually costs.",
    keywords: 'claude ai visibility, claude visibility tracking, claude ai tracking tool, track claude mentions, generative engine optimization claude',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/solutions/claude-ai-visibility-tracking',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/loesungen/claude-ai-sichtbarkeit-tracken',
            'en-US': 'https://www.sitecheckai.dev/en/solutions/claude-ai-visibility-tracking',
        },
    },
    openGraph: {
        title: 'Claude AI Visibility Tracking 2026: See Whether Claude Recommends You',
        description: "Claude tracking is an expensive Enterprise add-on - or unavailable - on most AI-visibility tools. AuditAI includes it from €4.99/month.",
        url: 'https://www.sitecheckai.dev/en/solutions/claude-ai-visibility-tracking',
        type: 'article',
        locale: 'en_US',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Claude AI Visibility Tracking 2026: See Whether Claude Recommends You',
    description: "Claude tracking is an expensive Enterprise add-on - or unavailable - on most AI-visibility tools. AuditAI includes it from €4.99/month.",
    image: 'https://www.sitecheckai.dev/en/solutions/claude-ai-visibility-tracking/opengraph-image',
    datePublished: '2026-08-29T09:00:00+02:00',
    dateModified: '2026-08-29T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/en/solutions/claude-ai-visibility-tracking',
    mainEntityOfPage: 'https://www.sitecheckai.dev/en/solutions/claude-ai-visibility-tracking',
    about: [
        { '@type': 'Thing', name: 'AI Visibility Tracking' },
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
        { '@type': 'Thing', name: 'Claude (Anthropic)' },
    ],
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev/en' },
        { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://www.sitecheckai.dev/en/solutions' },
        { '@type': 'ListItem', position: 3, name: 'Claude AI Visibility Tracking', item: 'https://www.sitecheckai.dev/en/solutions/claude-ai-visibility-tracking' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What does "Claude AI visibility tracking" mean?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: "It means regularly checking whether and how Anthropic's Claude mentions your website or brand when users ask questions relevant to your industry. Unlike a one-off spot check, automated tracking shows the trend over time - including sentiment and which competitors Claude cites instead.",
            },
        },
        {
            '@type': 'Question',
            name: 'Why is Claude tracking so expensive or unavailable on many tools?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: "On several well-known AI-visibility tools, Claude is either only included in a custom-priced Enterprise plan, or it's a separate add-on only available on higher tiers. This likely comes down to API costs and the fact that many tools were originally built primarily around ChatGPT and Google AI Overview. AuditAI built Claude into its cheapest plan from day one.",
            },
        },
        {
            '@type': 'Question',
            name: 'How often is my visibility on Claude checked?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Automatically once a week, plus 2 to 20 manual checks per month depending on the plan. Each check runs two prompt variants (recommendation-oriented and comparative), so you can see which type of query mentions you.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I combine Claude tracking with other AI platforms?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. The Starter plan (€4.99/month) covers Claude and Gemini, and the Pro plan (€29.99/month) adds ChatGPT, Perplexity, and Google AI Overview in the same dashboard - no separate booking per platform.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I try Claude visibility tracking for free?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, no signup and no credit card required. A one-time audit including GEO visibility is available through the permanently free plan. The ongoing, weekly automation from €4.99/month additionally comes with a 14-day free trial.',
            },
        },
    ],
}

const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Track Claude AI visibility',
    description: 'How to set up automated tracking of whether Claude mentions your website for relevant queries.',
    step: [
        { '@type': 'HowToStep', position: 1, name: 'Define keywords', text: 'Define the topics and queries where Claude could plausibly mention your brand.' },
        { '@type': 'HowToStep', position: 2, name: 'Check prompt variants', text: 'Query each keyword both in a recommendation-style and a comparison-style phrasing, since Claude answers differently depending on wording.' },
        { '@type': 'HowToStep', position: 3, name: 'Automate weekly checks', text: 'Repeat the queries automatically every week instead of checking once, so you can spot changes over time.' },
        { '@type': 'HowToStep', position: 4, name: 'Analyze and act', text: 'Review mentions, sentiment, and which competitors get cited instead, then turn that into concrete fixes (llms.txt, schema markup, crawler access).' },
    ],
}

const MARKET_ROWS = [
    ['AuditAI', '€4.99/month', 'Yes, included in the Starter plan from day one'],
    ['Peec.ai', '€85/month', 'No, only on the custom-priced Enterprise plan'],
    ['LLM Pulse', '€49/month', 'No, only as a paid add-on on the Enterprise plan'],
    ['Rankscale', '$20/month', 'Yes, but billed through a credit system instead of a fixed price'],
]

const TRACKING_STEPS = [
    { num: 1, title: 'Define keywords', text: 'Define the topics and queries where Claude could plausibly mention your brand - e.g. "best tool for X" or "X vs Y".' },
    { num: 2, title: 'Check two prompt variants', text: 'Query each keyword in a recommendation-style phrasing ("What tool do you know for X?") and a comparative one ("What\'s the best tool for X?") - Claude answers differently depending on wording.' },
    { num: 3, title: 'Repeat automatically every week', text: 'A one-time check only shows a snapshot. Weekly tracking shows whether your visibility is improving, declining, or holding steady.' },
    { num: 4, title: 'Analyze and turn it into fixes', text: 'Review mentions, sentiment, and which competitors get cited instead - then turn that into concrete technical fixes (llms.txt, schema markup, crawler access for ClaudeBot).' },
]

export default function ClaudeAiVisibilityPageEn() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen">
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
                    <Link href="/en/solutions" className="hover:text-slate-400 transition-colors">Solutions</Link>
                    <span>/</span>
                    <span className="text-slate-500">Claude AI Visibility Tracking</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[var(--accent-soft)] text-[var(--accent)]">
                            Solution
                        </span>
                        <span className="text-xs text-slate-600">August 29, 2026</span>
                        <span className="text-xs text-slate-600">· 7 min read</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        Claude AI Visibility Tracking 2026: See Whether Claude Recommends You
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Claude has become a real answer source in its own right - partly because Claude Code is the first stop for many developers and teams evaluating new tools. If you're only tracking ChatGPT, you're seeing at best half the picture. The problem: on most AI-visibility tools, Claude tracking is either an expensive Enterprise add-on or not available at all.
                    </p>
                    <p className="mt-4 text-slate-300 leading-relaxed">
                        AuditAI tracks Claude visibility from <strong className="text-white">€4.99/month</strong> - included, no Enterprise sales call, no add-on surcharge. Here's the market landscape, how the tracking works technically, and what you actually do with it.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-slate-600">
                        <Link href="/about" className="flex items-center gap-2 hover:text-slate-300 transition-colors">
                            <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--bg-base)] text-[10px] font-bold">F</div>
                            <span>Finn Paustian</span>
                        </Link>
                        <span>·</span>
                        <span>Founder, AuditAI</span>
                    </div>
                </div>

                <div className="border-t border-[var(--border-subtle)] mb-10" />

                <div className="space-y-10 text-slate-300 leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Claude tracking is often pricier than the base platforms</h2>
                        <p>
                            A pattern shows up across several well-known AI-visibility tools: ChatGPT, Perplexity, and Google AI Overview are usually included in the base price - Claude, on the other hand, is either a separate, expensive add-on or only available on a custom-priced Enterprise plan. If you specifically want to know how you perform on Claude, you often end up paying more for it alone than for all the other platforms combined.
                        </p>
                        <div className="overflow-x-auto rounded-2xl border border-[var(--border-subtle)] mt-5">
                            <table className="w-full text-sm min-w-[560px]">
                                <thead>
                                    <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-06)]">
                                        <th className="text-left px-5 py-3 text-slate-400 font-semibold">Tool</th>
                                        <th className="text-left px-5 py-3 text-slate-400 font-semibold">Entry price</th>
                                        <th className="text-left px-5 py-3 text-[var(--accent)] font-semibold">Claude included at entry price?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MARKET_ROWS.map(([tool, price, claude], i) => (
                                        <tr key={i} className="border-b border-[var(--border-subtle)] last:border-0">
                                            <td className="px-5 py-3 text-white font-medium whitespace-nowrap">{tool}</td>
                                            <td className="px-5 py-3 text-slate-300 whitespace-nowrap">{price}</td>
                                            <td className="px-5 py-3 text-slate-300">{claude}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-600 mt-3">
                            Pricing as of August 2026, based on each vendor's publicly listed pricing page. Always double-check current terms directly with the vendor.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">How Claude visibility tracking works</h2>
                        <p>Four steps, automated instead of manual:</p>
                        <div className="space-y-3 mt-5">
                            {TRACKING_STEPS.map((s) => (
                                <div key={s.num} className="flex gap-4 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                    <span className="text-[var(--accent)] font-mono font-bold text-sm shrink-0">{s.num}</span>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1 text-sm">{s.title}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed">{s.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">What AuditAI actually gives you</h2>
                        <p>
                            From the Starter plan (€4.99/month, 1 website, 10 keywords), AuditAI automatically checks every week whether Claude and Gemini mention your website - including a mention history over time. The Pro plan (€29.99/month) adds ChatGPT, Perplexity, and Google AI Overview in the same dashboard, plus two prompt variants per keyword instead of one.
                        </p>
                        <p className="mt-4">
                            Unlike pure analytics dashboards, it doesn't stop at the number: AuditAI also checks whether llms.txt exists, whether schema markup is set up correctly, and whether ClaudeBot is even allowed to crawl - then shows you, in priority order, what to fix to get cited more often.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Frequently asked questions</h2>
                        <div className="space-y-4">
                            {faqLd.mainEntity.map((faq, i) => (
                                <div key={i} className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                    <h3 className="font-semibold text-white mb-2 text-sm">{faq.name}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{faq.acceptedAnswer.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* CTA: Try it yourself */}
                <div className="mt-14 bg-[var(--accent-soft)] border border-[var(--accent-border)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Try it yourself</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                Check for free whether Claude already mentions you
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Enter your URL and get your first GEO score in about 60 seconds - no signup, no credit card.
                            </p>
                        </div>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[var(--accent-border)] shrink-0"
                        >
                            Check for free now
                        </Link>
                    </div>
                </div>

                {/* Cross-link: GEO Pricing */}
                <div className="mt-5 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Pricing</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                GEO automation: every plan in detail
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Claude, ChatGPT, Perplexity, and Google AI Overview - websites, keywords, and checks per plan compared.
                            </p>
                        </div>
                        <Link
                            href="/en/geo/pricing"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--surface-08)] hover:bg-[var(--surface-10)] text-white text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            View pricing
                        </Link>
                    </div>
                </div>

                {/* Cross-link: Rankscale */}
                <div className="mt-5 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Comparison</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                Rankscale Alternative: the full comparison
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Rankscale does include Claude, but bills it through a credit system instead of a fixed price - the difference in detail.
                            </p>
                        </div>
                        <Link
                            href="/en/compare/rankscale-alternative"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--surface-08)] hover:bg-[var(--surface-10)] text-white text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Read comparison
                        </Link>
                    </div>
                </div>

                {/* Back */}
                <div className="mt-10 pt-8 border-t border-[var(--border-subtle)]">
                    <Link href="/en" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                        ← Back to homepage
                    </Link>
                </div>

            </article>

            <Footer locale="en" />
        </main>
    )
}
