import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export const metadata = {
    title: { absolute: 'Core Web Vitals in 2026: What They Are and How to Test Them for Free' },
    description: 'Core Web Vitals explained simply: LCP, INP, and CLS with Google\'s official thresholds. Plus how to test them for free in under 2 minutes.',
    keywords: 'core web vitals, core web vitals testing, core web vitals test free, free core web vitals check, lcp inp cls, free page speed test, pagespeed insights',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/blog/core-web-vitals-testing',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/blog/core-web-vitals-testen',
            'en-US': 'https://www.sitecheckai.dev/en/blog/core-web-vitals-testing',
        },
    },
    openGraph: {
        title: 'Core Web Vitals in 2026: What They Are and How to Test Them for Free',
        description: 'LCP, INP, and CLS explained - with the official thresholds and free testing tools.',
        url: 'https://www.sitecheckai.dev/en/blog/core-web-vitals-testing',
        type: 'article',
        locale: 'en_US',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Core Web Vitals in 2026: What They Are and How to Test Them for Free',
    description: 'Core Web Vitals explained simply: LCP, INP, and CLS with Google\'s official thresholds. Plus how to test them for free.',
    image: 'https://www.sitecheckai.dev/en/blog/core-web-vitals-testing/opengraph-image',
    datePublished: '2026-07-26T09:00:00+02:00',
    dateModified: '2026-08-01T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/en/blog/core-web-vitals-testing',
    mainEntityOfPage: 'https://www.sitecheckai.dev/en/blog/core-web-vitals-testing',
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev/en' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sitecheckai.dev/en/blog' },
        { '@type': 'ListItem', position: 3, name: 'Core Web Vitals Testing', item: 'https://www.sitecheckai.dev/en/blog/core-web-vitals-testing' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What are Core Web Vitals?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Core Web Vitals are three metrics defined by Google that measure a website\'s perceived user experience: LCP (loading speed), INP (responsiveness), and CLS (visual stability). They\'ve been an official Google ranking factor since 2021.',
            },
        },
        {
            '@type': 'Question',
            name: 'How do I test my Core Web Vitals for free?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The fastest way is Google\'s own PageSpeed Insights (pagespeed.web.dev) - enter a URL, get results in seconds. For checking multiple pages at once, an automated SEO test tool like AuditAI works better, since PageSpeed Insights only checks one URL per run.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is the difference between INP and the old FID?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'FID (First Input Delay) only measured the delay until the first reaction to a user interaction. INP (Interaction to Next Paint) replaced FID as the official Core Web Vitals metric in March 2024 and measures responsiveness across a visitor\'s entire time on the page - a much more complete picture of actual interactivity.',
            },
        },
        {
            '@type': 'Question',
            name: 'How often should I check Core Web Vitals?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'After every major deployment, and at least once a month, since new images, scripts, or third-party embeds can quietly degrade your scores. If you need to keep an eye on Core Web Vitals across multiple pages, an automated, recurring check beats manual one-off testing.',
            },
        },
    ],
}

const VITALS = [
    {
        code: 'LCP',
        name: 'Largest Contentful Paint',
        measures: 'Loading speed - how fast the largest visible content (usually an image or text block) loads.',
        good: '≤ 2.5 s',
        ok: '2.5 s – 4.0 s',
        poor: '> 4.0 s',
        color: '#7c3aed',
    },
    {
        code: 'INP',
        name: 'Interaction to Next Paint',
        measures: 'Responsiveness - how quickly the page visually reacts to clicks, taps, or keyboard input.',
        good: '≤ 200 ms',
        ok: '200 ms – 500 ms',
        poor: '> 500 ms',
        color: '#06b6d4',
    },
    {
        code: 'CLS',
        name: 'Cumulative Layout Shift',
        measures: 'Visual stability - how much elements unexpectedly shift while the page is loading.',
        good: '≤ 0.1',
        ok: '0.1 – 0.25',
        poor: '> 0.25',
        color: '#f59e0b',
    },
]

const CAUSES = [
    {
        vital: 'LCP',
        title: 'Most common causes of poor LCP',
        items: [
            'Uncompressed or poorly formatted images (no WebP/AVIF)',
            'Render-blocking CSS and JavaScript in the <head>',
            'Slow server response time (TTFB over 800ms)',
            'Missing preload for the most important above-the-fold image',
        ],
    },
    {
        vital: 'INP',
        title: 'Most common causes of poor INP',
        items: [
            'Large, blocking JavaScript bundles that occupy the main thread',
            'Heavy third-party scripts (tracking, chat widgets, ads)',
            'Too many DOM elements that need to be recalculated on interaction',
            'Missing code-splitting - the whole page loads JS that only part of it needs',
        ],
    },
    {
        vital: 'CLS',
        title: 'Most common causes of poor CLS',
        items: [
            'Images and videos without fixed width/height attributes',
            'Web fonts without font-display: optional or swap (font swaps shift text)',
            'Dynamically loaded content (banners, cookie notices) without reserved space',
            'Ad containers without a defined minimum height',
        ],
    },
]

export default function CoreWebVitalsPageEn() {
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
                    <span className="text-slate-500">Core Web Vitals Testing</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-amber-500/15 text-amber-400">
                            Performance
                        </span>
                        <span className="text-xs text-slate-600">July 26, 2026</span>
                        <span className="text-xs text-slate-600">· 8 min read</span>
                        <span className="text-xs text-slate-600">· Updated Aug 1, 2026</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        Core Web Vitals in 2026: What They Are and How to Test Them for Free
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        LCP, INP, CLS - three acronyms that have helped decide how well your website ranks on Google since 2021. Here&apos;s what they measure, what counts as &quot;good,&quot; and how to test them for free in under 2 minutes.
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
                        <h2 className="text-2xl font-bold text-white mb-4">What are Core Web Vitals?</h2>
                        <p>
                            Core Web Vitals are three metrics Google uses as an{' '}
                            <a href="https://developers.google.com/search/docs/appearance/core-web-vitals" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">
                                official part of how it evaluates search results
                            </a>{' '}
                            to measure how a website feels to real users - not just how fast it technically loads, but how fast it feels usable. They&apos;ve fed directly into rankings since 2021, as part of what Google calls &quot;page experience.&quot;
                        </p>
                        <p className="mt-4">
                            The key difference from older loading-speed metrics: Core Web Vitals aren&apos;t just measured in the lab (Lighthouse simulation) - they&apos;re also collected as real field data from the Chrome browsers of actual visitors. A page can score well in a lab test and still perform poorly for real users if those users are on slower devices or connections. We break down, with numbers, how much slow load times actually hurt rankings in our article on the{' '}
                            <Link href="/en/blog/common-seo-mistakes" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">
                                10 most common SEO mistakes
                            </Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-2">The 3 Core Web Vitals in detail</h2>
                        <p className="text-slate-400 mb-6">All three values need to be &quot;good&quot; at the 75th percentile for Google to rate the page as &quot;good&quot; overall.</p>
                        <div className="space-y-4">
                            {VITALS.map((v) => (
                                <div key={v.code} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded" style={{ background: v.color + '18', color: v.color }}>{v.code}</span>
                                        <h3 className="font-semibold text-white">{v.name}</h3>
                                    </div>
                                    <p className="text-sm text-slate-400 leading-relaxed mb-4">{v.measures}</p>
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg py-2 px-1">
                                            <div className="text-[8px] sm:text-[10px] text-emerald-400 font-semibold uppercase tracking-normal sm:tracking-wider leading-tight break-words">Good</div>
                                            <div className="text-sm text-white font-mono mt-0.5">{v.good}</div>
                                        </div>
                                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg py-2 px-1">
                                            <div className="text-[8px] sm:text-[10px] text-amber-400 font-semibold uppercase tracking-normal sm:tracking-wider leading-tight break-words">Needs work</div>
                                            <div className="text-sm text-white font-mono mt-0.5">{v.ok}</div>
                                        </div>
                                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-1">
                                            <div className="text-[8px] sm:text-[10px] text-red-400 font-semibold uppercase tracking-normal sm:tracking-wider leading-tight break-words">Poor</div>
                                            <div className="text-sm text-white font-mono mt-0.5">{v.poor}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-cyan-500/8 border border-cyan-500/20 rounded-2xl p-5 mt-5">
                            <p className="text-sm text-cyan-300 font-medium mb-1">Worth knowing if you&apos;re reading older articles</p>
                            <p className="text-sm text-slate-400">
                                INP replaced FID (First Input Delay) as the official Core Web Vital in March 2024. Many older SEO guides still mention FID - that&apos;s outdated. Only check INP today.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">How do you test your Core Web Vitals for free?</h2>
                        <p>
                            The fastest way: <a href="https://pagespeed.web.dev" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">PageSpeed Insights</a> from Google itself. Enter a URL, wait, done - you get both lab data (Lighthouse simulation) and real field data from the Chrome User Experience Report, provided the page gets enough traffic.
                        </p>
                        <p className="mt-4">
                            Alternatives for manual checking: Chrome DevTools (the Lighthouse tab, right in the browser) for lab data, or the Core Web Vitals report in Google Search Console for aggregated field data over the last 28-day period.
                        </p>
                        <p className="mt-4">
                            The catch with all three: they each check only one URL per run. If you want to see multiple subpages at once - product pages, blog posts, landing pages - you either need a lot of manual time or an automated tool that crawls multiple pages.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">The most common causes of poor scores</h2>
                        <div className="space-y-5">
                            {CAUSES.map((c) => (
                                <div key={c.vital} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                                    <h3 className="font-semibold text-white mb-3">{c.title}</h3>
                                    <ul className="space-y-2">
                                        {c.items.map((item) => (
                                            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                                                <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0 mt-2" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Frequently asked questions about Core Web Vitals</h2>
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
                <div className="mt-14 bg-gradient-to-br from-amber-950/30 to-[#05080f] border border-amber-500/20 rounded-2xl p-6 sm:p-8 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                        Check Core Web Vitals across every subpage
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        AuditAI measures LCP, TTFB, FCP, and load time across up to 25 subpages at once - alongside SEO and GEO signals in the same report. Start without registration, sign up free for the full report with all scores.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-violet-600 hover:from-amber-400 hover:to-violet-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/20"
                    >
                        Test performance now
                    </Link>
                    <div className="mt-3 text-xs text-slate-600">No registration to start · Full report free · 60 seconds</div>
                </div>

                {/* Cross-link to sibling posts */}
                <div className="mt-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1 block">Keep reading</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                The SEO Checklist 2026 in 15 Minutes
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Core Web Vitals is just one of 6 phases - the complete self-check sequence, including GEO signals.
                            </p>
                        </div>
                        <Link
                            href="/en/blog/seo-checklist-2026"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] hover:bg-white/10 text-white text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Open checklist
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
