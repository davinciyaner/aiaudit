import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export const metadata = {
    title: 'Measure AI Visibility 2026: KPIs, Dashboard & Your Own Data',
    description: 'Measure AI visibility: the 3 KPIs that actually matter, step-by-step with real dashboard screenshots, plus why visibility alone tells you nothing about leads.',
    keywords: 'measure ai visibility, ai visibility measurement, track ai visibility, geo measurement, ai visibility kpi, measure chatgpt visibility, generative engine optimization measurement',
    alternates: {
        canonical: 'https://www.scanora.ai/en/blog/measure-ai-visibility',
        languages: {
            'de-DE': 'https://www.scanora.ai/blog/ki-sichtbarkeit-messen',
            'en-US': 'https://www.scanora.ai/en/blog/measure-ai-visibility',
        },
    },
    openGraph: {
        title: 'Measure AI Visibility 2026: KPIs, Dashboard & Your Own Data',
        description: 'The 3 KPIs that actually matter when measuring AI visibility - with real dashboard screenshots and the step most guides on this topic skip: connecting visibility to actual leads.',
        url: 'https://www.scanora.ai/en/blog/measure-ai-visibility',
        type: 'article',
        locale: 'en_US',
        images: ['https://www.scanora.ai/en/blog/measure-ai-visibility/opengraph-image'],
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Measure AI Visibility 2026: KPIs, Dashboard & Your Own Data',
    description: 'Measure AI visibility: the 3 KPIs that actually matter, step-by-step with real dashboard screenshots, plus why visibility alone tells you nothing about leads.',
    image: 'https://www.scanora.ai/en/blog/measure-ai-visibility/opengraph-image',
    datePublished: '2026-09-18T09:00:00+02:00',
    dateModified: '2026-09-18T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.scanora.ai/about' },
    publisher: {
        '@type': 'Organization',
        name: 'Scanora',
        url: 'https://www.scanora.ai',
        logo: { '@type': 'ImageObject', url: 'https://www.scanora.ai/logo', width: 512, height: 512 },
    },
    url: 'https://www.scanora.ai/en/blog/measure-ai-visibility',
    mainEntityOfPage: 'https://www.scanora.ai/en/blog/measure-ai-visibility',
    about: [
        { '@type': 'Thing', name: 'AI Visibility' },
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
        { '@type': 'Thing', name: 'AI Visibility Measurement' },
    ],
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai/en' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.scanora.ai/en/blog' },
        { '@type': 'ListItem', position: 3, name: 'Measure AI Visibility', item: 'https://www.scanora.ai/en/blog/measure-ai-visibility' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What does it mean to measure AI visibility?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Measuring AI visibility means systematically and repeatably checking whether ChatGPT, Claude, Gemini, or Perplexity mention your brand in their answers - as opposed to a random, one-off sample.',
            },
        },
        {
            '@type': 'Question',
            name: 'How often should I measure AI visibility?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'At least weekly, using the same prompts each time so results stay comparable over time. AI answers vary from request to request - a single measurement only shows a snapshot, not a reliable picture.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is AI visibility the same as SEO?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No, but the two are related. SEO measures your position in classic Google search results. AI visibility measures whether an AI mentions you in a generated answer - independent of any ranking number. A page can rank well on Google and still be invisible to ChatGPT, or the other way around.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I measure AI visibility for free?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, a one-off check is possible without sign-up or a credit card. Ongoing, weekly tracking across multiple platforms usually requires a paid plan, since every automated check has real API costs with the AI providers.',
            },
        },
        {
            '@type': 'Question',
            name: 'How do I know if an AI citation actually leads to a real lead?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Pure visibility tools cannot answer that - they only show whether you are mentioned, not what happens afterward. That requires lead attribution: a visitor who arrives from ChatGPT, Claude, Perplexity, or Gemini gets linked to that AI source at the moment they convert (e.g. fill out a form), instead of showing up as anonymous traffic.',
            },
        },
        {
            '@type': 'Question',
            name: 'How do I get my website to rank #1 on ChatGPT, Claude & co.?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Five levers matter most: allow AI crawlers like GPTBot and ClaudeBot technically, provide clear, citable definition sentences right after headings, set up correct schema markup, get mentioned in third-party sources AI already cites, and measure regularly instead of optimizing once. Unlike a Google ranking, "#1" on an AI is not a fixed state - it shifts with every model update.',
            },
        },
    ],
}

const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Measure AI Visibility',
    description: 'How to systematically measure whether AI models mention your website.',
    step: [
        { '@type': 'HowToStep', position: 1, name: 'Set the website and AI platforms', text: 'Add the domain and choose which AI platforms to check (Claude, ChatGPT, Perplexity, Google AI Overview).' },
        { '@type': 'HowToStep', position: 2, name: 'Define relevant keywords/prompts', text: 'Define topics and questions where the brand could realistically be mentioned.' },
        { '@type': 'HowToStep', position: 3, name: 'Check automatically every week', text: 'Repeat the same prompts regularly to track mention rate over time instead of a single measurement.' },
        { '@type': 'HowToStep', position: 4, name: 'Connect visibility to leads', text: 'Also measure whether visitors from AI sources actually convert, not just whether the brand is mentioned.' },
    ],
}

const KPI_ROWS = [
    { name: 'Mention rate', def: 'Share of checked queries where the brand is mentioned at all - the baseline metric.' },
    { name: 'Recommendation context (sentiment)', def: 'Is the brand actively recommended, just mentioned neutrally, or shown worse than competitors in a comparison?' },
    { name: 'Lead source', def: 'How many of your actual website visitors and conversions provably come from an AI source - the metric that connects visibility to business outcome.' },
]

export default function MeasureAiVisibilityPage() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
            <Navbar />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-faint)] mb-8">
                    <Link href="/en" className="hover:text-[var(--text-muted)] transition-colors">Scanora</Link>
                    <span>/</span>
                    <Link href="/en/blog" className="hover:text-[var(--text-muted)] transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-[var(--text-faint)]" aria-current="page">Measure AI Visibility</span>
                </nav>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-cyan-500/15 text-cyan-400">
                            GEO
                        </span>
                        <span className="text-xs text-[var(--text-faint)]">September 18, 2026</span>
                        <span className="text-xs text-[var(--text-faint)]">· Updated: September 18, 2026</span>
                        <span className="text-xs text-[var(--text-faint)]">· 10 min read</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text-white)] leading-tight tracking-tight mb-5">
                        Measure AI Visibility 2026: KPIs, Dashboard &amp; Your Own Data
                    </h1>
                    <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                        <strong className="text-[var(--text-white)]">Measuring AI visibility</strong> means systematically and repeatably checking whether ChatGPT, Claude, Gemini, or Perplexity mention your brand in their answers - not a random one-off sample. This article shows the three KPIs that actually matter, with real screenshots from our own dashboard - and the step most guides on this topic skip entirely: connecting visibility to actual leads.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-[var(--text-faint)]">
                        <Link href="/about" className="flex items-center gap-2 hover:text-[var(--text-body)] transition-colors">
                            <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--bg-base)] text-[10px] font-bold">F</div>
                            <span>Finn Paustian</span>
                        </Link>
                        <span>·</span>
                        <span>Founder, Scanora</span>
                    </div>
                </div>

                <div className="border-t border-[var(--border-subtle)] mb-10" />

                <div className="space-y-10 text-[var(--text-body)] leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Why this matters right now</h2>
                        <p>
                            <strong className="text-[var(--text-white)]">37% of consumers now start their search with an AI instead of Google</strong>, and among B2B software buyers, one in two (51%) now starts research with an AI chatbot instead of a traditional search engine - up from just 29% in April 2025. Among Gen Z, 82% have already used AI chatbots, compared to 68% of millennials.
                        </p>
                        <p className="mt-4">
                            Important context: Google still handles roughly 90% of global search traffic - AI search isn't (yet) replacing traditional search, it's growing alongside it as a parallel channel. Still, the growth rate is notable: AI traffic to websites grew 16x from 2024 to 2026, and traffic from Claude alone grew 320% from 2025 to 2026.
                        </p>
                        <p className="mt-4 text-xs text-[var(--text-faint)]">
                            Sources: <a href="https://www.position.digital/blog/ai-seo-statistics/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Position Digital, AI SEO Statistics 2026</a>, <a href="https://www.orbitmedia.com/blog/ai-vs-google/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Orbit Media, AI-Search Adoption Survey</a>, <a href="https://thestacc.com/blog/ai-search-referral-traffic-stats/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">The Stacc, AI Search Referral Traffic Statistics 2026</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">The 3 KPIs that actually matter</h2>
                        <p>
                            Most guides on this topic list five, six, or more KPIs - presence rate, topic coverage, stability rate, and so on. In practice, it comes down to three questions that actually trigger action:
                        </p>
                        <div className="overflow-x-auto rounded-2xl border border-[var(--border-subtle)] mt-5">
                            <table className="w-full text-sm min-w-[560px]">
                                <thead>
                                    <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-06)]">
                                        <th className="text-left px-5 py-3 text-[var(--text-muted)] font-semibold">KPI</th>
                                        <th className="text-left px-5 py-3 text-[var(--accent)] font-semibold">What it shows</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {KPI_ROWS.map((k, i) => (
                                        <tr key={i} className="border-b border-[var(--border-subtle)] last:border-0">
                                            <td className="px-5 py-3 text-[var(--text-white)] font-medium whitespace-nowrap align-top">{k.name}</td>
                                            <td className="px-5 py-3 text-[var(--text-body)] align-top">{k.def}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4">
                            The third KPI - lead source - is missing from most guides on this topic, mostly because most pure visibility tools simply can&apos;t measure it. More on that below.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">How to measure it, step by step</h2>
                        <p>
                            Using our own dashboard as the example - the flow is similar across most GEO tools, the specific screenshots are from Scanora:
                        </p>

                        <div className="mt-6 space-y-3">
                            <div className="flex gap-4 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                <span className="text-[var(--accent)] font-mono font-bold text-sm shrink-0">1</span>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-white)] mb-1 text-sm">Add your website, pick platforms, set your first keywords</h3>
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">Add the domain, select AI platforms (including Gemini), and set the first topics/keywords right away.</p>
                                </div>
                            </div>
                            <figure className="mt-2">
                                <Image
                                    src="/blog/ki-sichtbarkeit-messen-website-hinzufuegen.png"
                                    alt="Scanora dashboard: add a website, select all 5 AI platforms including Gemini, and enter starting keywords"
                                    width={448}
                                    height={770}
                                    className="w-full max-w-sm h-auto rounded-2xl border border-[var(--border-subtle)]"
                                />
                                <figcaption className="text-xs text-[var(--text-faint)] mt-2">
                                    Example view with demo data, UI taken 1:1 from the Scanora dashboard.
                                </figcaption>
                            </figure>

                            <div className="flex gap-4 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5 mt-6">
                                <span className="text-[var(--accent)] font-mono font-bold text-sm shrink-0">2</span>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-white)] mb-1 text-sm">Add more keywords or custom prompts later</h3>
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">Two paths: ready-made keywords (inserted into a prompt template) or a fully custom, freely written prompt - e.g. the exact question a real customer would ask.</p>
                                </div>
                            </div>
                            <figure className="mt-2">
                                <Image
                                    src="/blog/ki-sichtbarkeit-messen-keywords-prompts.png"
                                    alt="Scanora dashboard: add keywords and add a fully custom prompt"
                                    width={520}
                                    height={340}
                                    className="w-full max-w-md h-auto rounded-2xl border border-[var(--border-subtle)]"
                                />
                                <figcaption className="text-xs text-[var(--text-faint)] mt-2">
                                    Example view with demo data, UI taken 1:1 from the Scanora dashboard: keywords and custom prompts are two separate entry paths.
                                </figcaption>
                            </figure>

                            <div className="flex gap-4 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5 mt-6">
                                <span className="text-[var(--accent)] font-mono font-bold text-sm shrink-0">3</span>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-white)] mb-1 text-sm">Configure platforms in detail</h3>
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">Each website lets you toggle which AI platforms are actively checked - including Gemini.</p>
                                </div>
                            </div>
                            <figure className="mt-2">
                                <Image
                                    src="/blog/ki-sichtbarkeit-messen-plattformen.png"
                                    alt="Scanora dashboard: select AI platforms Claude, ChatGPT, Gemini, Perplexity and Google AI Overview for tracking"
                                    width={420}
                                    height={336}
                                    className="w-full max-w-sm h-auto rounded-2xl border border-[var(--border-subtle)]"
                                />
                                <figcaption className="text-xs text-[var(--text-faint)] mt-2">
                                    Example view with demo data, UI taken 1:1 from the Scanora dashboard: all 5 AI platforms including Gemini, toggled individually.
                                </figcaption>
                            </figure>

                            <div className="flex gap-4 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5 mt-6">
                                <span className="text-[var(--accent)] font-mono font-bold text-sm shrink-0">4</span>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-white)] mb-1 text-sm">Evaluate mention rate over time</h3>
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">A single measurement is a snapshot. The trend across multiple checks shows whether visibility is actually changing.</p>
                                </div>
                            </div>
                            <figure className="mt-2">
                                <Image
                                    src="/blog/ki-sichtbarkeit-messen-trend.png"
                                    alt="Scanora dashboard: mention rate trend across weekly AI visibility checks, rising from 12% to 68%"
                                    width={940}
                                    height={370}
                                    className="w-full h-auto rounded-2xl border border-[var(--border-subtle)]"
                                />
                                <figcaption className="text-xs text-[var(--text-faint)] mt-2">
                                    Example view with demo data, UI taken 1:1 from the Scanora dashboard: what a positive trend over 7 checks looks like once the fixes from the section below actually move visibility - not a guaranteed real result.
                                </figcaption>
                            </figure>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">The missing step: from visibility to real leads</h2>
                        <p>
                            Almost every guide on this topic stops at mention rate. The problem: a high mention rate says nothing about whether it actually turns into real visitors or customers. And this is exactly where real numbers matter: <strong className="text-[var(--text-white)]">AI traffic demonstrably converts better than classic organic search traffic</strong> - ChatGPT referral traffic converts at around 15.9%, Perplexity at 10.5%, Claude at 5.0% - in some cases 4.4x to 23x higher than the average organic search visitor.
                        </p>
                        <p className="mt-4">
                            That&apos;s why, on top of pure visibility tracking, Scanora built <strong className="text-[var(--text-white)]">lead attribution</strong>: a tracking snippet detects whether a visitor arrives from ChatGPT, Claude, Perplexity, or Gemini, and links that to the AI source when they convert (e.g. a contact form) - only with cookie consent. That answers what pure visibility numbers can&apos;t: not just &quot;am I mentioned&quot;, but &quot;does it actually bring me leads&quot;.
                        </p>
                        <figure className="mt-6">
                            <Image
                                src="/blog/ki-sichtbarkeit-messen-leads.png"
                                alt="Scanora leads dashboard: leads broken down by AI source - ChatGPT, Claude, Perplexity, and Gemini - with trend and individual lead table"
                                width={900}
                                height={529}
                                className="w-full h-auto rounded-2xl border border-[var(--border-subtle)]"
                            />
                            <figcaption className="text-xs text-[var(--text-faint)] mt-2">
                                Example view with demo data, UI taken 1:1 from the Scanora dashboard: this is what the breakdown looks like once leads start coming in from AI sources - per platform, with a trend and individual leads including landing page.
                            </figcaption>
                        </figure>
                        <p className="mt-4 text-sm text-[var(--text-faint)]">
                            Transparency: the lead-tracking feature is new, and we don&apos;t yet have a meaningful volume of aggregated customer data to show - the screenshot deliberately shows demo data, not real customer numbers. The cited conversion rates come from independent industry studies, not from Scanora&apos;s own data.
                        </p>
                        <p className="mt-4 text-xs text-[var(--text-faint)]">
                            Conversion rate source: <a href="https://thestacc.com/blog/ai-search-referral-traffic-stats/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">The Stacc, AI Search Referral Traffic Statistics 2026</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Keep an eye on competitors: who AI models recommend instead</h2>
                        <p>
                            Your own mention rate is only half the answer. Just as important: <strong className="text-[var(--text-white)]">which other domains AI models cite instead</strong> when they don&apos;t mention you. Only the comparison reveals whether weak visibility is on you, or because a competitor is simply more dominant in that specific topic.
                        </p>
                        <figure className="mt-6">
                            <Image
                                src="/blog/ki-sichtbarkeit-messen-wettbewerber.png"
                                alt="Scanora competitor tracking: which domains AI models cite for your tracked keywords, with share, average position, and platform breakdown"
                                width={900}
                                height={210}
                                className="w-full h-auto rounded-2xl border border-[var(--border-subtle)]"
                            />
                            <figcaption className="text-xs text-[var(--text-faint)] mt-2">
                                Example view with demo data, UI taken 1:1 from the Scanora dashboard: share per domain, average position when mentioned, and which of the 5 platforms (colored dots) cite each domain.
                            </figcaption>
                        </figure>
                        <p className="mt-4">
                            In practice: if the data shows a competitor gets cited across all 5 platforms and you only show up on 2-3, that&apos;s a concrete target - not &quot;get more visible somehow&quot;, but &quot;catch up on the platforms you&apos;re missing&quot;. If instead nobody in your space gets cited reliably, the whole topic is underserved - an opportunity to become the go-to source first.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">How to get mentioned and recommended - and reach #1</h2>
                        <p>
                            Measuring shows where you stand today. These five levers move the needle the most in practice - roughly in the order they tend to kick in first:
                        </p>
                        <div className="space-y-3 mt-5">
                            <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                <h3 className="font-semibold text-[var(--text-white)] mb-1.5 text-sm">1. Allow AI crawlers technically</h3>
                                <p className="text-sm text-[var(--text-muted)] leading-relaxed">GPTBot, ClaudeBot, PerplexityBot, and friends need to actually be allowed to crawl via robots.txt - a blocker that sounds trivial but is surprisingly common. An llms.txt adds an explicit, structured summary for AI systems on top of that.</p>
                            </div>
                            <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                <h3 className="font-semibold text-[var(--text-white)] mb-1.5 text-sm">2. Provide clear, citable definitions</h3>
                                <p className="text-sm text-[var(--text-muted)] leading-relaxed">AI models prefer to extract short, unambiguous sentences right after a heading (&quot;X is ...&quot;), not vague marketing paragraphs. If you don&apos;t supply your own definition as a quotable sentence, you leave the wording to the AI - and to chance.</p>
                            </div>
                            <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                <h3 className="font-semibold text-[var(--text-white)] mb-1.5 text-sm">3. Set up schema markup correctly</h3>
                                <p className="text-sm text-[var(--text-muted)] leading-relaxed">Organization, FAQPage, and Article schema give AI systems structured facts instead of forcing them to guess from body copy - especially relevant for pricing, authorship, and freshness.</p>
                            </div>
                            <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                <h3 className="font-semibold text-[var(--text-white)] mb-1.5 text-sm">4. Show up in third-party sources AI already cites</h3>
                                <p className="text-sm text-[var(--text-muted)] leading-relaxed">Claude and Perplexity mostly cite established third-party sources (comparison sites, industry articles, directories), not just your own domain. A mention on a page AI already cites often outweighs another piece of content on your own site.</p>
                            </div>
                            <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                <h3 className="font-semibold text-[var(--text-white)] mb-1.5 text-sm">5. Re-measure regularly instead of optimizing once</h3>
                                <p className="text-sm text-[var(--text-muted)] leading-relaxed">AI answers change with every model update. &quot;#1&quot; on an AI isn&apos;t a fixed state like a Google ranking - it has to be re-earned weekly, which is exactly why continuous measurement (see above) matters more than a one-time optimization push.</p>
                            </div>
                        </div>
                        <p className="mt-6">
                            Instead of guessing which of these five levers applies to you, Scanora shows, per keyword, exactly what&apos;s missing - directly compared to the source an AI actually cites:
                        </p>
                        <figure className="mt-4">
                            <Image
                                src="/blog/ki-sichtbarkeit-messen-citability.png"
                                alt="Scanora citability diagnosis: your own GEO score, concrete missing fixes like llms.txt and FAQPage schema, compared directly to the source Claude actually cites"
                                width={640}
                                height={331}
                                className="w-full max-w-xl h-auto rounded-2xl border border-[var(--border-subtle)]"
                            />
                            <figcaption className="text-xs text-[var(--text-faint)] mt-2">
                                Example view with demo data, UI taken 1:1 from the Scanora dashboard: your own GEO score, the concrete missing fixes with an effort estimate, and the direct difference versus the source an AI cites instead.
                            </figcaption>
                        </figure>
                        <p className="mt-4">
                            A deeper walkthrough of the 4 levels of AI visibility: <Link href="/en/blog/ai-visibility" className="text-violet-400 hover:text-violet-300">AI Visibility: How to Get Cited by ChatGPT, Claude &amp; Perplexity</Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Without a tool: measuring manually</h2>
                        <p>
                            If you want to start without a tool: build a spreadsheet with 15-20 realistic questions, enter each one individually into ChatGPT, Claude, Perplexity, and Gemini (in incognito mode, to avoid personalized results), and note for each answer whether and how the brand is mentioned. The downside: this is hard to repeat weekly without becoming a part-time job - and lead attribution isn&apos;t possible this way at all, since that requires a tracking snippet on your own website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Frequently asked questions</h2>
                        <div className="space-y-4">
                            {faqLd.mainEntity.map((faq, i) => (
                                <div key={i} className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                    <h3 className="font-semibold text-[var(--text-white)] mb-2 text-sm">{faq.name}</h3>
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{faq.acceptedAnswer.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* CTA: try it yourself */}
                <div className="mt-14 bg-[var(--accent-soft)] border border-[var(--accent-border)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Try it yourself</span>
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-2">
                                Measure your own AI visibility for free
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md">
                                Enter your URL and get your first GEO score in about 60 seconds - no sign-up, no credit card.
                            </p>
                        </div>
                        <Link
                            href="/en/dashboard"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[var(--accent-border)] active:scale-[0.97] active:duration-75 shrink-0"
                        >
                            Check for free
                        </Link>
                    </div>
                </div>

                {/* Cross-link: AI visibility */}
                <div className="mt-5 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Related</span>
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-2">
                                AI visibility: the next steps
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md">
                                Measuring shows where you stand. This article shows exactly what to do to get cited more often.
                            </p>
                        </div>
                        <Link
                            href="/en/blog/ai-visibility"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--surface-08)] hover:bg-[var(--surface-10)] text-[var(--text-white)] text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Read the article
                        </Link>
                    </div>
                </div>

                {/* Cross-link: Compare */}
                <div className="mt-5 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Compare</span>
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-2">
                                Scanora vs. other AI visibility tools
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md">
                                See how Scanora compares to Peec.ai, Otterly.ai, Writesonic, and Rankscale on price and features.
                            </p>
                        </div>
                        <Link
                            href="/en/compare"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--surface-08)] hover:bg-[var(--surface-10)] text-[var(--text-white)] text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Compare tools
                        </Link>
                    </div>
                </div>

                {/* Back */}
                <div className="mt-10 pt-8 border-t border-[var(--border-subtle)]">
                    <Link href="/en/blog" className="text-sm text-[var(--text-faint)] hover:text-[var(--text-body)] transition-colors">
                        ← Back to blog
                    </Link>
                </div>

            </article>

            <Footer />
        </main>
    )
}
