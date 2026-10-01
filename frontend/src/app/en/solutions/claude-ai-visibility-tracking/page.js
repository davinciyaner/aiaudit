import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export const metadata = {
    title: { absolute: 'Claude AI Visibility Tracking: Does Claude Recommend You?' },
    description: "How Claude AI decides who it cites: training vs. web search, crawler control and citation rules. Track your Claude visibility with Scanora.",
    keywords: 'claude ai visibility, claude visibility tracking, claude ai tracking tool, track claude mentions, generative engine optimization claude',
    alternates: {
        canonical: 'https://www.scanora.ai/en/solutions/claude-ai-visibility-tracking',
        languages: {
            'de-DE': 'https://www.scanora.ai/loesungen/claude-ai-sichtbarkeit-tracken',
            'en-US': 'https://www.scanora.ai/en/solutions/claude-ai-visibility-tracking',
        },
    },
    openGraph: {
        title: 'Claude AI Visibility Tracking 2026: See Whether Claude Recommends You',
        description: "Claude tracking is an expensive Enterprise add-on - or unavailable - on most AI-visibility tools. Scanora includes it from €4.99/month.",
        url: 'https://www.scanora.ai/en/solutions/claude-ai-visibility-tracking',
        type: 'article',
        locale: 'en_US',
        images: ['https://www.scanora.ai/en/solutions/claude-ai-visibility-tracking/opengraph-image'],
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Claude AI Visibility Tracking 2026: See Whether Claude Recommends You',
    description: "Claude tracking is an expensive Enterprise add-on - or unavailable - on most AI-visibility tools. Scanora includes it from €4.99/month.",
    image: 'https://www.scanora.ai/en/solutions/claude-ai-visibility-tracking/opengraph-image',
    datePublished: '2026-08-29T09:00:00+02:00',
    dateModified: '2026-10-01T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.scanora.ai/about' },
    publisher: {
        '@type': 'Organization',
        name: 'Scanora',
        url: 'https://www.scanora.ai',
        logo: { '@type': 'ImageObject', url: 'https://www.scanora.ai/logo', width: 512, height: 512 },
    },
    url: 'https://www.scanora.ai/en/solutions/claude-ai-visibility-tracking',
    mainEntityOfPage: 'https://www.scanora.ai/en/solutions/claude-ai-visibility-tracking',
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
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai/en' },
        { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://www.scanora.ai/en/solutions' },
        { '@type': 'ListItem', position: 3, name: 'Claude AI Visibility Tracking', item: 'https://www.scanora.ai/en/solutions/claude-ai-visibility-tracking' },
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
                text: "It means regularly checking whether and how Anthropic's Claude mentions your website or brand when users ask questions relevant to your industry. It's measured through the mention rate (share of checks with a mention) and through citations with source context, showing in what context and with what sentiment you're named. Unlike a one-off spot check, automated weekly tracking shows the trend over time - including which competitors Claude cites instead.",
            },
        },
        {
            '@type': 'Question',
            name: 'Does Claude search the web on every query, or does it also answer without searching?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: "No. According to Anthropic's own documentation, Claude answers directly from training for stable knowledge (established facts, foundational knowledge). It actively searches when a question requires current, changing, or product-specific information - which is the case for most purchase-decision prompts.",
            },
        },
        {
            '@type': 'Question',
            name: 'As a website owner, can I control whether Claude uses my site for training or only for live answers?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Anthropic runs three separate crawlers (ClaudeBot for training, Claude-User and Claude-SearchBot for live queries) that can each be controlled individually via robots.txt. Blanket-blocking "all bots" removes you from both channels at once.',
            },
        },
        {
            '@type': 'Question',
            name: 'Does Constitutional AI influence which sources Claude cites?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: "Based on Anthropic's own publication on the Constitution: no, not directly. Its principles concern harm avoidance and ethical behavior, not source selection in a web-search answer. Source selection is handled by the web search mechanism itself.",
            },
        },
        {
            '@type': 'Question',
            name: 'How is "visibility in Claude" different from "visibility in ChatGPT"?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Mainly in access control: Claude separates training and live search via three distinct crawlers, while ChatGPT has web search on by default and a more unified crawler system. Content-wise, similar factors matter for both: findability, compact facts, freshness.',
            },
        },
        {
            '@type': 'Question',
            name: 'Why is Claude tracking so expensive or unavailable on many tools?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: "On several well-known AI-visibility tools, Claude is either only included in a custom-priced Enterprise plan, or it's a separate add-on only available on higher tiers. This likely comes down to API costs and the fact that many tools were originally built primarily around ChatGPT and Google AI Overview. Scanora built Claude into its cheapest plan from day one.",
            },
        },
        {
            '@type': 'Question',
            name: 'How often is my visibility on Claude checked?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Automatically once a week, plus 2 to 3 manual checks per month depending on the plan. From the Pro plan, each check runs two prompt variants (recommendation-oriented and comparative), so you can see which type of query mentions you.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I combine Claude tracking with other AI platforms?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. The Starter plan (€4.99/month) covers Claude and Gemini, and the Pro plan (€74.99/month) adds ChatGPT, Perplexity, and Google AI Overview in the same dashboard - no separate booking per platform.',
            },
        },
        {
            '@type': 'Question',
            name: 'Does Scanora also track Perplexity visibility?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: "Yes. Perplexity is one of five platforms - alongside Claude, ChatGPT, Gemini, and Google AI Overview - that Scanora checks automatically every week on the Pro plan (€74.99/month), in the same dashboard and with the same two prompt variants per keyword as Claude. So you can see directly whether Perplexity names you for a query even though Claude doesn't (yet), or vice versa.",
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
    ['Scanora', '€4.99/month', 'Yes, included in the Starter plan from day one'],
    ['Peec.ai', '€85/month', 'No, only on the custom-priced Enterprise plan'],
    ['LLM Pulse', '€49/month', 'No, only as a paid add-on on the Enterprise plan'],
    ['Rankscale', '$20/month', 'Yes, but billed through a credit system instead of a fixed price'],
]

const CLAUDE_CRAWLERS = [
    { name: 'ClaudeBot', role: 'Collects data for model training.' },
    { name: 'Claude-User', role: "Fetches pages when a user's query triggers a search." },
    { name: 'Claude-SearchBot', role: 'Improves search result quality and indexing.' },
]

const VISIBILITY_FACTORS = [
    { num: 1, title: 'Crawler access', text: "Without allowing ClaudeBot, Claude-User, and Claude-SearchBot in robots.txt, you're excluded from both channels - training and live search. That's the baseline before any content optimization." },
    { num: 2, title: 'Classic findability', text: "Claude's web search tool draws on regular search results. If you're not cleanly indexed on Google, you won't show up in Claude's search results either - technical SEO is indirectly GEO too." },
    { num: 3, title: 'Compact, self-contained facts', text: 'Claude cites only up to 150 characters per source. Sentences that stand on their own and make one concrete claim beat nested marketing phrasing that only makes sense in context.' },
    { num: 4, title: 'Visible freshness dates', text: 'Claude receives the page age alongside every search result. For topics with a time component - pricing, comparison numbers, DR values - a maintained "as of [month/year]" signals freshness.' },
    { num: 5, title: 'Neighborhood in domain lists', text: 'Anyone integrating Claude into their own app can restrict or exclude web search to specific domains. Mentions on reputable third-party sites raise the odds of being included in such a trusted neighborhood.' },
    { num: 6, title: 'Presence in the training corpus', text: 'For answers without a search, only what was publicly prominent by the training cutoff counts - Wikipedia, press coverage, widely-linked directory entries. Very new or isolated pages have essentially no chance here.' },
]

const VISIBILITY_STRATEGIES = [
    { num: 1, title: 'Actively audit robots.txt', text: 'ClaudeBot, Claude-User, and Claude-SearchBot must be explicitly allowed. A blanket disallow for all bots catches these three too.' },
    { num: 2, title: "Don't neglect technical SEO", text: "Claude searches via real search results - every improvement to your classic Google visibility indirectly helps your Claude visibility too." },
    { num: 3, title: 'Write in citable sentences', text: 'One core claim per sentence, concrete numbers and names instead of vague phrasing. Test question: does this one sentence make sense in isolation, without the rest of the paragraph?' },
    { num: 4, title: 'Make freshness visible', text: 'A maintained date on comparison and data pages is a signal Claude receives directly.' },
    { num: 5, title: 'Build substantial third-party presence', text: 'Mentions in trade press, recognized directories, and - where topically justified - Wikipedia increase both your odds of training-corpus presence and of being included in trusted domain neighborhoods.' },
    { num: 6, title: 'Test it yourself regularly', text: "Ask Claude with web search enabled the kind of purchase-decision prompts typical for your industry, and check whether your product shows up - then close exactly those gaps on your own site." },
]

const PLATFORM_COMPARISON_ROWS = [
    ['Core model', 'An LLM with an optional web search tool that developers enable per application', 'Web search on by default, three tiers: quick search, agentic reasoning, deep research', 'Built from the ground up as a search engine; four model tiers (Sonar to Sonar Deep Research) - search is the core product'],
    ['When does it search?', 'Claude decides based on how time-sensitive the question is; steerable via system prompt and search limit', 'On by default for every query, can be disabled', 'Essentially every answer - model choice only sets the research depth'],
    ['Citation format', 'A precise excerpt of up to 150 characters per source, exactly located in the text', 'Inline citations with start/end position in the text, plus a separate "sources" list of every page consulted', 'Inline source attributions based on relevance/freshness - selection criteria not officially documented'],
    ['Control for you as a site owner', 'Granular, via three separate bots for training, live user queries, and search index', 'One crawler system; domain filtering sits with the app developer, not with you', 'Its own crawling, with little publicly documented control for site owners'],
]

const CLAUDE_SOURCES = [
    { label: 'Anthropic: Web search tool documentation', href: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool' },
    { label: "Anthropic: Claude's Constitution", href: 'https://www.anthropic.com/news/claudes-constitution' },
    { label: 'Anthropic Support: How Anthropic crawls the web', href: 'https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler' },
    { label: 'OpenAI: Web search guide', href: 'https://developers.openai.com/api/docs/guides/tools-web-search' },
    { label: 'Perplexity: Model documentation', href: 'https://docs.perplexity.ai/getting-started/models' },
]

const TRACKING_STEPS = [
    { num: 1, title: 'Define keywords', text: 'Define the topics and queries where Claude could plausibly mention your brand - e.g. "best tool for X" or "X vs Y".' },
    { num: 2, title: 'Check two prompt variants', text: 'Query each keyword in a recommendation-style phrasing ("What tool do you know for X?") and a comparative one ("What\'s the best tool for X?") - Claude answers differently depending on wording.' },
    { num: 3, title: 'Repeat automatically every week', text: 'A one-time check only shows a snapshot. Weekly tracking shows whether your visibility is improving, declining, or holding steady.' },
    { num: 4, title: 'Analyze and turn it into fixes', text: 'Review mentions, sentiment, and which competitors get cited instead - then turn that into concrete technical fixes (llms.txt, schema markup, crawler access for ClaudeBot).' },
]

export default function ClaudeAiVisibilityPageEn() {
    return (
        <main className="bg-(--bg-base) min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
            <Navbar locale="en" />

            <article className="max-w-190 mx-auto px-4 sm:px-8 pt-28 md:pt-34 pb-18 md:pb-28">

                {/* Breadcrumb */}
                <div className="flex flex-wrap items-center gap-2 text-sm text-(--text-muted) mb-8">
                    <Link href="/en" className="hover:text-(--accent-ink) transition-colors">Scanora</Link>
                    <span>/</span>
                    <Link href="/en/solutions" className="hover:text-(--accent-ink) transition-colors">Solutions</Link>
                    <span>/</span>
                    <span className="text-(--text-faint)">Claude AI Visibility Tracking</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-(--accent-soft) text-(--accent-ink)">
                            Solution
                        </span>
                        <span className="text-xs text-(--text-faint)">August 29, 2026</span>
                        <span className="text-xs text-(--text-faint)">· Updated: October 1, 2026</span>
                        <span className="text-xs text-(--text-faint)">· 12 min read</span>
                    </div>
                    <h1 className="text-[clamp(34px,4.4vw,52px)] font-bold text-(--text-white) leading-[1.06] tracking-[-0.035em] mb-5">
                        Claude AI Visibility Tracking 2026: See Whether Claude Recommends You
                    </h1>
                    <p className="text-lg text-(--text-body) leading-relaxed">
                        <strong className="text-(--text-white)">Claude visibility</strong> means: how often, and in what context, does Anthropic's Claude name your brand when users ask about topics in your industry? It's measured through the mention rate over time and through citations with source context, rather than a one-off spot check. Scanora tracks this automatically once a week - from €4.99/month, including Gemini on the Starter plan; the Pro plan adds ChatGPT, Perplexity, and Google AI Overview in the same dashboard.
                    </p>
                    <p className="mt-4 text-(--text-body) leading-relaxed">
                        Claude has become a real answer source in its own right - partly because Claude Code is the first stop for many developers and teams evaluating new tools. If you're only tracking ChatGPT, you're seeing at best half the picture. The problem: on most AI-visibility tools, Claude tracking is either an expensive Enterprise add-on or not bookable at all. Here's the market landscape, how the tracking works technically, and what you actually do with it.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-(--text-faint)">
                        <Link href="/about" className="flex items-center gap-2 hover:text-(--text-body) transition-colors">
                            <div className="w-6 h-6 rounded-full bg-(--accent) flex items-center justify-center text-(--on-accent) text-[10px] font-bold">F</div>
                            <span>Finn Paustian</span>
                        </Link>
                        <span>·</span>
                        <span>Founder, Scanora</span>
                    </div>
                </div>

                <div className="border-t border-(--border-subtle) mb-10" />

                <div className="space-y-10 text-(--text-body) leading-relaxed">

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">How does Claude actually work?</h2>
                        <p>
                            Before you optimize for it, it helps to understand that "visibility in Claude" can mean two very different things.
                        </p>
                        <p className="mt-4">
                            <strong className="text-(--text-white)">Path 1: Claude answers from the training corpus.</strong> Without web search, Claude only knows what was publicly prominent enough by its training cutoff to make it into the training data - collected via its own crawler called ClaudeBot. If someone asks about your product directly and Claude doesn't search, it answers purely from that frozen knowledge state. New or weakly-linked products simply don't show up here, regardless of how good your current website is.
                        </p>
                        <p className="mt-4">
                            <strong className="text-(--text-white)">Path 2: Claude uses web search.</strong> According to Anthropic's own documentation, Claude decides case by case whether to search the web: for stable knowledge (established facts, math, coding concepts) it answers directly. For anything current, changing, or tied to a specific company, person, or product, it actively searches. A question like "which tool tracks my visibility in Claude?" almost always falls into the second category - exactly the moment where a well-built website has a real shot.
                        </p>
                        <p className="mt-4">
                            Technically, it works like this: Claude formulates a search query, gets back results with URL, title, and page age, and cites a precise excerpt of <strong className="text-(--text-white)">up to 150 characters</strong> per source - not a summary of the whole page, but one exactly-located sentence or clause. It's not the page as a whole that "wins" - it's the one sentence that can be cleanly extracted.
                        </p>
                        <p className="mt-5 font-semibold text-(--text-white) text-sm">Access isn't a given</p>
                        <p className="mt-2">
                            According to Anthropic's own support documentation, Anthropic runs three separate crawlers with distinct jobs:
                        </p>
                        <div className="space-y-2 mt-4">
                            {CLAUDE_CRAWLERS.map((c) => (
                                <div key={c.name} className="flex gap-3 bg-(--card) border border-(--line) rounded-xl p-4">
                                    <span className="text-(--accent-ink) font-mono font-semibold text-sm shrink-0">{c.name}</span>
                                    <span className="text-sm text-(--text-muted)">{c.role}</span>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4">
                            In practice, that means a page can be blocked from training and still get cited in live web-search answers - or the reverse. If your robots.txt blanket-blocks "all bots," you disappear from both channels at once, without necessarily noticing.
                        </p>
                        <p className="mt-5 font-semibold text-(--text-white) text-sm">A common misconception</p>
                        <p className="mt-2">
                            Many guides claim that "Constitutional AI" decides which sources Claude trusts. That doesn't hold up against Anthropic's own publication on the Constitution. Its principles - drawn in part from the UN Declaration of Human Rights, Apple's Terms of Service, and DeepMind's Sparrow rules - are about harm avoidance, discrimination, and ethical behavior, not criteria for source selection. Which source ends up in an answer is decided by the web search mechanism (search result relevance, any domain filters, page freshness) - not the Constitution. In other words: you're not optimizing for "trustworthiness" in an ethical sense, but for technical findability and citable facts.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">What factors influence whether Claude cites you?</h2>
                        <div className="space-y-3">
                            {VISIBILITY_FACTORS.map((f) => (
                                <div key={f.num} className="flex gap-4 bg-(--card) border border-(--line) rounded-2xl p-5">
                                    <span className="text-(--accent-ink) font-mono font-bold text-sm shrink-0">{f.num}</span>
                                    <div>
                                        <h3 className="font-semibold text-(--text-white) mb-1 text-sm">{f.title}</h3>
                                        <p className="text-sm text-(--text-muted) leading-relaxed">{f.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">How to improve your visibility in Claude</h2>
                        <div className="space-y-3">
                            {VISIBILITY_STRATEGIES.map((s) => (
                                <div key={s.num} className="flex gap-4 bg-(--card) border border-(--line) rounded-2xl p-5">
                                    <span className="text-(--accent-ink) font-mono font-bold text-sm shrink-0">{s.num}</span>
                                    <div>
                                        <h3 className="font-semibold text-(--text-white) mb-1 text-sm">{s.title}</h3>
                                        <p className="text-sm text-(--text-muted) leading-relaxed">{s.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">How Claude visibility tracking works</h2>
                        <p>Four steps, automated instead of manual:</p>
                        <div className="space-y-3 mt-5">
                            {TRACKING_STEPS.map((s) => (
                                <div key={s.num} className="flex gap-4 bg-(--card) border border-(--line) rounded-2xl p-5">
                                    <span className="text-(--accent-ink) font-mono font-bold text-sm shrink-0">{s.num}</span>
                                    <div>
                                        <h3 className="font-semibold text-(--text-white) mb-1 text-sm">{s.title}</h3>
                                        <p className="text-sm text-(--text-muted) leading-relaxed">{s.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">What Scanora actually gives you</h2>
                        <p>
                            From the Starter plan (€4.99/month, 1 website, 10 keywords), Scanora automatically checks every week whether Claude and Gemini mention your website - including a mention history over time. The Pro plan (€74.99/month) adds ChatGPT, Perplexity, and Google AI Overview in the same dashboard, plus two prompt variants per keyword instead of one.
                        </p>
                        <p className="mt-4">
                            Unlike pure analytics dashboards, it doesn't stop at the number: Scanora also checks whether llms.txt exists, whether schema markup is set up correctly, and whether ClaudeBot is even allowed to crawl - then shows you, in priority order, what to fix to get cited more often.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Claude vs. ChatGPT vs. Perplexity: what actually differs</h2>
                        <p>
                            Most guides lump these three platforms together. In reality, they differ exactly where it matters for visibility - technically, not just in tone.
                        </p>
                        <div className="overflow-x-auto rounded-2xl border border-(--border-subtle) mt-5">
                            <table className="w-full text-sm min-w-180">
                                <thead>
                                    <tr className="border-b border-(--line) bg-(--card)">
                                        <th className="text-left px-5 py-3 text-(--text-muted) font-semibold">Criterion</th>
                                        <th className="text-left px-5 py-3 text-(--accent-ink) font-semibold">Claude</th>
                                        <th className="text-left px-5 py-3 text-(--text-muted) font-semibold">ChatGPT</th>
                                        <th className="text-left px-5 py-3 text-(--text-muted) font-semibold">Perplexity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PLATFORM_COMPARISON_ROWS.map(([criterion, claude, chatgpt, perplexity], i) => (
                                        <tr key={i} className="border-b border-(--border-subtle) last:border-0 align-top">
                                            <td className="px-5 py-3 text-(--text-white) font-medium whitespace-nowrap">{criterion}</td>
                                            <td className="px-5 py-3 text-(--text-body)">{claude}</td>
                                            <td className="px-5 py-3 text-(--text-body)">{chatgpt}</td>
                                            <td className="px-5 py-3 text-(--text-body)">{perplexity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4">
                            Basic hygiene - be crawlable, keep facts compact and current - works similarly across all three platforms. The real difference is control: only with Claude can you granularly decide, via robots.txt, whether you want to be visible for training, for live answers, or both. On ChatGPT and Perplexity, that decision is either broader or out of your hands entirely.
                        </p>
                        <p className="text-xs text-(--text-faint) mt-3">
                            Perplexity's ranking/citation criteria aren't fully documented officially; the corresponding points above are based on observable patterns.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Claude tracking is often pricier than the base platforms</h2>
                        <p>
                            A pattern shows up across several well-known AI-visibility tools: ChatGPT, Perplexity, and Google AI Overview are usually included in the base price - Claude, on the other hand, is either a separate, expensive add-on or only available on a custom-priced Enterprise plan. If you specifically want to know how you perform on Claude, you often end up paying more for it alone than for all the other platforms combined.
                        </p>
                        <div className="overflow-x-auto rounded-2xl border border-(--border-subtle) mt-5">
                            <table className="w-full text-sm min-w-140">
                                <thead>
                                    <tr className="border-b border-(--line) bg-(--card)">
                                        <th className="text-left px-5 py-3 text-(--text-muted) font-semibold">Tool</th>
                                        <th className="text-left px-5 py-3 text-(--text-muted) font-semibold">Entry price</th>
                                        <th className="text-left px-5 py-3 text-(--accent-ink) font-semibold">Claude included at entry price?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MARKET_ROWS.map(([tool, price, claude], i) => (
                                        <tr key={i} className="border-b border-(--border-subtle) last:border-0">
                                            <td className="px-5 py-3 text-(--text-white) font-medium whitespace-nowrap">{tool}</td>
                                            <td className="px-5 py-3 text-(--text-body) whitespace-nowrap">{price}</td>
                                            <td className="px-5 py-3 text-(--text-body)">{claude}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-(--text-faint) mt-3">
                            Pricing as of August 2026, based on each vendor's publicly listed pricing page. Always double-check current terms directly with the vendor.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Sources</h2>
                        <p className="text-sm text-(--text-muted) mb-3">
                            Primary sources, researched directly from the providers.
                        </p>
                        <ul className="space-y-2">
                            {CLAUDE_SOURCES.map((s) => (
                                <li key={s.href} className="text-sm">
                                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-(--accent-ink) hover:underline wrap-break-word">
                                        {s.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <p className="text-xs text-(--text-faint) mt-3">
                            As of: September 2026.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Frequently asked questions</h2>
                        <div className="space-y-4">
                            {faqLd.mainEntity.map((faq, i) => (
                                <div key={i} className="bg-(--card) border border-(--line) rounded-2xl p-5">
                                    <h3 className="font-semibold text-(--text-white) mb-2 text-sm">{faq.name}</h3>
                                    <p className="text-sm text-(--text-muted) leading-relaxed">{faq.acceptedAnswer.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* CTA: Try it yourself */}
                <div className="mt-14 bg-(--accent-soft) border border-(--accent-border) rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-(--accent-ink) mb-1 block">Try it yourself</span>
                            <h3 className="text-base sm:text-lg font-bold text-(--text-white) mb-2">
                                Check for free whether Claude already mentions you
                            </h3>
                            <p className="text-(--text-muted) text-sm leading-relaxed max-w-md">
                                Enter your URL and get your first GEO score in about 60 seconds - no signup, no credit card.
                            </p>
                        </div>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) text-sm font-semibold rounded-[10px] transition-all duration-200 active:scale-[0.97] active:duration-75 shrink-0"
                        >
                            Check for free now
                        </Link>
                    </div>
                </div>

                {/* Cross-link: GEO Pricing */}
                <div className="mt-5 bg-(--card) border border-(--line) rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-(--accent-ink) mb-1 block">Pricing</span>
                            <h3 className="text-base sm:text-lg font-bold text-(--text-white) mb-2">
                                GEO automation: every plan in detail
                            </h3>
                            <p className="text-(--text-muted) text-sm leading-relaxed max-w-md">
                                Claude, ChatGPT, Perplexity, and Google AI Overview - websites, keywords, and checks per plan compared.
                            </p>
                        </div>
                        <Link
                            href="/en/geo/pricing"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--surface-08) hover:bg-(--surface-10) text-(--text-white) text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            View pricing
                        </Link>
                    </div>
                </div>

                {/* Cross-link: Rankscale */}
                <div className="mt-5 bg-(--card) border border-(--line) rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-(--accent-ink) mb-1 block">Comparison</span>
                            <h3 className="text-base sm:text-lg font-bold text-(--text-white) mb-2">
                                Rankscale Alternative: the full comparison
                            </h3>
                            <p className="text-(--text-muted) text-sm leading-relaxed max-w-md">
                                Rankscale does include Claude, but bills it through a credit system instead of a fixed price - the difference in detail.
                            </p>
                        </div>
                        <Link
                            href="/en/compare/rankscale-alternative"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--surface-08) hover:bg-(--surface-10) text-(--text-white) text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Read comparison
                        </Link>
                    </div>
                </div>

                {/* Back */}
                <div className="mt-10 pt-8 border-t border-(--border-subtle)">
                    <Link href="/en" className="text-sm text-(--text-faint) hover:text-(--text-body) transition-colors">
                        ← Back to homepage
                    </Link>
                </div>

            </article>

            <Footer locale="en" />
        </main>
    )
}
