import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export const metadata = {
    title: 'Affordable AI Visibility Tool from €4.99',
    description: 'Looking for an affordable AI visibility tool with SEO built in? Scanora combines GEO tracking (from €4.99/month) and SEO rankings.',
    keywords: 'affordable ai visibility tool, cheap ai visibility tool, seo and ai visibility tracker combined, ai visibility and seo in one tool, affordable geo tool, ai visibility tool pricing comparison',
    alternates: {
        canonical: 'https://www.scanora.ai/en/solutions/affordable-ai-visibility-tool',
        languages: {
            'de-DE': 'https://www.scanora.ai/loesungen/guenstiges-ki-sichtbarkeit-tool',
            'en-US': 'https://www.scanora.ai/en/solutions/affordable-ai-visibility-tool',
        },
    },
    openGraph: {
        title: 'Affordable AI Visibility Tool: SEO and AI Visibility in One Plan',
        description: 'Scanora combines GEO tracking (Claude and Gemini from €4.99/month, all five platforms from €74.99/month) and SEO rankings - with a real free plan.',
        url: 'https://www.scanora.ai/en/solutions/affordable-ai-visibility-tool',
        type: 'article',
        locale: 'en_US',
        images: ['https://www.scanora.ai/en/solutions/affordable-ai-visibility-tool/opengraph-image'],
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Affordable AI Visibility Tool: SEO and AI Visibility in One Plan',
    description: 'Scanora combines GEO tracking (Claude and Gemini from €4.99/month, all five platforms from €74.99/month) and SEO rankings - with a real free plan.',
    image: 'https://www.scanora.ai/en/solutions/affordable-ai-visibility-tool/opengraph-image',
    datePublished: '2026-08-28T09:00:00+02:00',
    dateModified: '2026-10-01T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.scanora.ai/about' },
    publisher: {
        '@type': 'Organization',
        name: 'Scanora',
        url: 'https://www.scanora.ai',
        logo: { '@type': 'ImageObject', url: 'https://www.scanora.ai/logo', width: 512, height: 512 },
    },
    url: 'https://www.scanora.ai/en/solutions/affordable-ai-visibility-tool',
    mainEntityOfPage: 'https://www.scanora.ai/en/solutions/affordable-ai-visibility-tool',
    about: [
        { '@type': 'Thing', name: 'AI Visibility Tracking' },
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
        { '@type': 'Thing', name: 'Search Engine Optimization' },
    ],
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai/en' },
        { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://www.scanora.ai/en/solutions' },
        { '@type': 'ListItem', position: 3, name: 'Affordable AI Visibility Tool', item: 'https://www.scanora.ai/en/solutions/affordable-ai-visibility-tool' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What is an affordable AI visibility tool?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'An AI visibility tool (also called a GEO or AI monitoring tool) checks whether and how often ChatGPT, Claude, Perplexity, or Google AI Overview mention your website. "Affordable" means a low entry price without per-platform add-on fees or a mandatory agency package. Scanora starts at €4.99/month for Claude tracking.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is there a tool that combines SEO and AI visibility tracking?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Scanora offers SEO automation (weekly Google rankings, keyword ideas, competitor analysis, backlinks) and GEO automation (AI visibility across ChatGPT, Claude, Perplexity, Google AI Overview) from one account - bookable separately or together. Most pure AI-visibility tools don\'t cover classic SEO at all.',
            },
        },
        {
            '@type': 'Question',
            name: 'How much does AI visibility tracking cost with Scanora?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'GEO automation starts at €4.99/month (Claude + Gemini, 1 website, 10 keywords, weekly auto-check). The Pro plan at €74.99/month covers all five AI platforms. SEO automation starts separately at €29.99/month. All automation plans include a 14-day free trial.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is Scanora really free to use?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. The Free plan is permanently free and includes 1 audit per month with an SEO score, GEO visibility, and performance metrics - no credit card required. The automation subscriptions (ongoing weekly checks) are optional add-ons.',
            },
        },
        {
            '@type': 'Question',
            name: 'Which AI platforms does GEO automation cover?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Claude, ChatGPT, Gemini, Perplexity, and Google AI Overview. The Starter plan includes Claude and Gemini; from the Pro plan (€74.99/month) all five platforms are included - with no separate per-platform add-on cost.',
            },
        },
    ],
}

const PRICING_ROWS = [
    ['Free Audit', '1 audit/month · SEO score, GEO visibility, performance', '€0 forever'],
    ['GEO Starter', 'Claude + Gemini · 1 website · 10 keywords · weekly auto-check', '€4.99/month'],
    ['GEO Pro', 'ChatGPT + Claude + Gemini + Perplexity + Google AI Overview · 3 websites · 20 keywords', '€74.99/month'],
    ['SEO Starter', '3 websites · 50 keywords · weekly ranking updates · backlink overview', '€29.99/month'],
]

const INCLUDED_GEO = [
    'Mention tracking across Claude, ChatGPT, Perplexity, and Google AI Overview',
    'Sentiment analysis for every mention (positive/neutral/negative)',
    'Competitor ranking: which domains get cited instead of you, and at what average rank',
    'Weekly auto-checks plus manual checks on demand',
]

const INCLUDED_SEO = [
    'Weekly Google ranking updates per keyword',
    'Keyword ideas with real search volume',
    'Competitor analysis: which domains rank for your keywords',
    'Backlink overview, updated monthly',
]

const FOR_WHOM = [
    'you don\'t want to pay for AI visibility and SEO in two separate subscriptions',
    'you\'re a freelancer or small business that needs a low entry price',
    'a genuine free plan matters more to you than a time-limited trial',
    'you want prioritized fixes instead of just raw numbers',
]

export default function AffordableGeoToolPageEn() {
    return (
        <main className="bg-(--bg-base) min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar locale="en" />

            <article className="max-w-190 mx-auto px-4 sm:px-8 pt-28 md:pt-34 pb-18 md:pb-28">

                {/* Breadcrumb */}
                <div className="flex flex-wrap items-center gap-2 text-sm text-(--text-muted) mb-8">
                    <Link href="/en" className="hover:text-(--accent-ink) transition-colors">Scanora</Link>
                    <span>/</span>
                    <Link href="/en/solutions" className="hover:text-(--accent-ink) transition-colors">Solutions</Link>
                    <span>/</span>
                    <span className="text-(--text-faint)">Affordable AI Visibility Tool</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-(--accent-soft) text-(--accent-ink)">
                            Solution
                        </span>
                        <span className="text-xs text-(--text-faint)">August 28, 2026</span>
                        <span className="text-xs text-(--text-faint)">· 6 min read</span>
                    </div>
                    <h1 className="text-[clamp(34px,4.4vw,52px)] font-bold text-(--text-white) leading-[1.06] tracking-[-0.035em] mb-5">
                        Affordable AI Visibility Tool: SEO and AI Visibility in One Plan
                    </h1>
                    <p className="text-lg text-(--text-body) leading-relaxed">
                        Most AI visibility tools are pure prompt-monitoring dashboards - no SEO, often starting at $25–30/month, with every extra AI platform billed separately. If you need both, you end up paying for two subscriptions. Scanora combines GEO automation (AI visibility across ChatGPT, Claude, Gemini, Perplexity, and Google AI Overview) with SEO automation in one account - starting at €4.99/month with Claude and Gemini, with a permanently free plan.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-(--text-faint)">
                        <Link href="/en/about" className="flex items-center gap-2 hover:text-(--text-body) transition-colors">
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
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Why one tool for both makes more sense</h2>
                        <p>
                            Classic SEO optimizes for Google showing you in the blue link list. GEO (Generative Engine Optimization) optimizes for ChatGPT, Claude, Perplexity, or Google AI Overview <em>citing</em> you inside a generated answer. The two are connected - structured data, clear product definitions, and technically clean pages help with both - but they're usually measured by completely separate tools: an SEO rank tracker here, an AI visibility dashboard there. Two subscriptions, two logins, two invoices.
                        </p>
                        <p className="mt-4">
                            Scanora bundles both into one account. You see your Google rankings and your AI mentions side by side, but you can also book just one of the two if that's all you need.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">All prices at a glance</h2>
                        <div className="overflow-x-auto rounded-2xl border border-(--border-subtle)">
                            <table className="w-full text-sm min-w-140">
                                <thead>
                                    <tr className="border-b border-(--line) bg-(--card)">
                                        <th className="text-left px-5 py-3 text-(--text-muted) font-semibold">Plan</th>
                                        <th className="text-left px-5 py-3 text-(--text-muted) font-semibold">Includes</th>
                                        <th className="text-left px-5 py-3 text-(--accent-ink) font-semibold">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PRICING_ROWS.map(([plan, included, price], i) => (
                                        <tr key={i} className="border-b border-(--border-subtle) last:border-0">
                                            <td className="px-5 py-3 text-(--text-white) font-medium whitespace-nowrap">{plan}</td>
                                            <td className="px-5 py-3 text-(--text-body)">{included}</td>
                                            <td className="px-5 py-3 text-(--text-white) font-semibold whitespace-nowrap">{price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-(--text-faint) mt-3">
                            Prices as of August 2026. All automation plans (SEO + GEO) include a 14-day free trial, cancel anytime. See details on the{' '}
                            <Link href="/en/pricing" className="text-(--text-faint) hover:text-(--text-body) underline underline-offset-2">pricing pages</Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">What's included</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-(--card) border border-(--line) rounded-2xl p-5">
                                <h3 className="font-semibold text-(--text-white) mb-3 text-sm">GEO automation (AI visibility)</h3>
                                <ul className="space-y-2">
                                    {INCLUDED_GEO.map((item, i) => (
                                        <li key={i} className="text-sm text-(--text-muted) leading-relaxed flex gap-2">
                                            <span className="text-(--accent-ink) shrink-0">–</span>{item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-(--card) border border-(--line) rounded-2xl p-5">
                                <h3 className="font-semibold text-(--text-white) mb-3 text-sm">SEO automation</h3>
                                <ul className="space-y-2">
                                    {INCLUDED_SEO.map((item, i) => (
                                        <li key={i} className="text-sm text-(--text-muted) leading-relaxed flex gap-2">
                                            <span className="text-(--accent-ink) shrink-0">–</span>{item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Who this is for</h2>
                        <p className="mb-4">An affordable combined tool is the right choice if …</p>
                        <ul className="space-y-2">
                            {FOR_WHOM.map((item, i) => (
                                <li key={i} className="text-sm text-(--text-muted) leading-relaxed flex gap-2">
                                    <span className="text-(--accent-ink) shrink-0">–</span>{item}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-sm text-(--text-faint)">
                            For very high-volume agency monitoring across many client workspaces, a specialized, pricier tool like{' '}
                            <Link href="/en/compare/otterly-alternative" className="text-(--text-muted) hover:text-(--accent-ink) underline underline-offset-2">Otterly.ai</Link>{' '}
                            may offer more capacity - but for most single sites, freelancers, and small teams, Scanora's cheaper combined approach is enough.
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
                                Check for free how visible you are on Google and in AI answers
                            </h3>
                            <p className="text-(--text-muted) text-sm leading-relaxed max-w-md">
                                Enter your URL and get your SEO and AI visibility score in about 60 seconds - no sign-up, no credit card.
                            </p>
                        </div>
                        <Link
                            href="/en/dashboard"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) text-sm font-semibold rounded-[10px] transition-all duration-200 active:scale-[0.97] active:duration-75 shrink-0"
                        >
                            Check for free
                        </Link>
                    </div>
                </div>

                {/* Cross-link: comparison page */}
                <div className="mt-5 bg-(--card) border border-(--line) rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-(--accent-ink) mb-1 block">Comparison</span>
                            <h3 className="text-base sm:text-lg font-bold text-(--text-white) mb-2">
                                Otterly.ai alternative: the full comparison
                            </h3>
                            <p className="text-(--text-muted) text-sm leading-relaxed max-w-md">
                                How Scanora stacks up against the best-known pure AI-visibility tracker - including pricing and where it falls short.
                            </p>
                        </div>
                        <Link
                            href="/en/compare/otterly-alternative"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--surface-08) hover:bg-(--surface-10) text-(--text-white) text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Read comparison
                        </Link>
                    </div>
                </div>

                {/* Cross-link: SEO+GEO automation blog post */}
                <div className="mt-5 bg-(--card) border border-(--line) rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-(--accent-ink) mb-1 block">Read more</span>
                            <h3 className="text-base sm:text-lg font-bold text-(--text-white) mb-2">
                                SEO rank tracker & AI visibility monitor
                            </h3>
                            <p className="text-(--text-muted) text-sm leading-relaxed max-w-md">
                                How SEO automation and GEO automation work in detail at Scanora - including pricing.
                            </p>
                        </div>
                        <Link
                            href="/en/blog/seo-geo-automation"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--surface-08) hover:bg-(--surface-10) text-(--text-white) text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Read article
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
