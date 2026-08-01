import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export const metadata = {
    title: { absolute: '10 Common SEO Mistakes That Cost You Google Rankings (+ Free Fixes)' },
    description: 'These 10 SEO mistakes are hurting rankings on most websites - and nobody notices. Run a free SEO test to catch and fix them today.',
    keywords: 'seo mistakes, common seo mistakes, seo test, free seo checker, website seo audit, missing meta description, h1 tag missing, core web vitals',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/blog/common-seo-mistakes',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/blog/seo-test-haeufige-fehler',
            'en-US': 'https://www.sitecheckai.dev/en/blog/common-seo-mistakes',
        },
    },
    openGraph: {
        title: '10 Common SEO Mistakes That Cost You Google Rankings',
        description: 'These 10 SEO mistakes are hurting rankings on most websites. Run a free SEO test to fix them today.',
        url: 'https://www.sitecheckai.dev/en/blog/common-seo-mistakes',
        type: 'article',
        locale: 'en_US',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '10 Common SEO Mistakes That Cost You Google Rankings (+ Free Fixes)',
    description: 'These 10 SEO mistakes are hurting rankings on most websites - and nobody notices.',
    image: 'https://www.sitecheckai.dev/en/blog/common-seo-mistakes/opengraph-image',
    datePublished: '2026-06-10T09:00:00+02:00',
    dateModified: '2026-08-01T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/en/blog/common-seo-mistakes',
    mainEntityOfPage: 'https://www.sitecheckai.dev/en/blog/common-seo-mistakes',
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev/en' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sitecheckai.dev/en/blog' },
        { '@type': 'ListItem', position: 3, name: '10 Common SEO Mistakes', item: 'https://www.sitecheckai.dev/en/blog/common-seo-mistakes' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What does an SEO test check?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'An SEO test checks all relevant on-page factors of a website: title tag, meta description, H1 tag, image alt text, canonical tag, internal links, load time (Core Web Vitals), structured data, Open Graph tags, and other technical signals. A complete SEO test crawls not just the homepage, but up to 25 subpages.',
            },
        },
        {
            '@type': 'Question',
            name: 'How often should I run an SEO test?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'After every major deployment, after content updates, and after Google core updates - at minimum weekly for active websites. SEO mistakes don\'t only come from intentional changes: a plugin update, a new image without alt text, or an accidentally set noindex directive can quietly cost you rankings. The more often you check, the sooner you catch problems.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is the single most important SEO factor on a website?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'There is no single most important factor - SEO is an interplay of many signals. But the three most common issues with the biggest impact are: missing or too-short meta descriptions, a missing or non-keyword-rich H1 tag, and poor Core Web Vitals (especially load times over 3 seconds).',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I run an SEO test for free?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. AuditAI offers a free SEO test with 14 checks - including title tag, meta description, H1, alt text, canonical, Open Graph, structured data, and more. The free plan allows 1 full audit per month with no credit card required.',
            },
        },
    ],
}

const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to run an SEO test on your website',
    description: 'Check the core on-page factors that most often cost you rankings.',
    totalTime: 'PT15M',
    step: [
        { '@type': 'HowToStep', name: 'Check the meta description', text: 'Check whether every page has a unique meta description of 120-160 characters.', url: 'https://www.sitecheckai.dev/en/blog/common-seo-mistakes#mistake-01' },
        { '@type': 'HowToStep', name: 'Check the H1 tag', text: 'Make sure every page has exactly one H1 tag containing the primary keyword.', url: 'https://www.sitecheckai.dev/en/blog/common-seo-mistakes#mistake-02' },
        { '@type': 'HowToStep', name: 'Measure load time', text: 'Measure Core Web Vitals (LCP, INP, CLS) and TTFB in Chrome DevTools or with an automated test.', url: 'https://www.sitecheckai.dev/en/blog/common-seo-mistakes#mistake-03' },
        { '@type': 'HowToStep', name: 'Check image alt text', text: 'Verify that all content images have descriptive alt text.', url: 'https://www.sitecheckai.dev/en/blog/common-seo-mistakes#mistake-04' },
        { '@type': 'HowToStep', name: 'Check the canonical tag', text: 'Check whether every page has a correct, self-referencing canonical tag.', url: 'https://www.sitecheckai.dev/en/blog/common-seo-mistakes#mistake-05' },
        { '@type': 'HowToStep', name: 'Check the title tag', text: 'Check the length (50-60 characters) and uniqueness of every title tag.', url: 'https://www.sitecheckai.dev/en/blog/common-seo-mistakes#mistake-06' },
        { '@type': 'HowToStep', name: 'Check Open Graph tags', text: 'Check og:title, og:description, and og:image on every page.', url: 'https://www.sitecheckai.dev/en/blog/common-seo-mistakes#mistake-07' },
        { '@type': 'HowToStep', name: 'Check content length', text: 'Make sure important pages have at least 300 words of relevant content.', url: 'https://www.sitecheckai.dev/en/blog/common-seo-mistakes#mistake-08' },
        { '@type': 'HowToStep', name: 'Check structured data', text: 'Check whether Organization, WebSite, and if relevant Article or FAQPage schema exist as JSON-LD.', url: 'https://www.sitecheckai.dev/en/blog/common-seo-mistakes#mistake-09' },
        { '@type': 'HowToStep', name: 'Check indexability', text: 'Check important pages via URL Inspection in Google Search Console for accidental noindex.', url: 'https://www.sitecheckai.dev/en/blog/common-seo-mistakes#mistake-10' },
    ],
}

const MISTAKES = [
    {
        number: '01',
        severity: 'Critical',
        severityColor: '#ef4444',
        title: 'Missing or too-short meta description',
        impact: 'Directly measurable: lower CTR in search results',
        desc: 'The meta description is the text that appears under your page title in Google. Google doesn\'t use it directly as a ranking factor - but it decides whether someone clicks your result or a competitor\'s. If it\'s missing, Google generates its own snippet from the page text, and that snippet is rarely compelling.',
        fix: 'Write a unique meta description for every page, 120-160 characters. Include the page\'s main keyword, state a clear benefit, and close with an indirect call to action.',
        stat: '72.9% of all websites have no meta description set, according to an Ahrefs analysis of over 1 million domains.',
        source: { label: 'Ahrefs: "We Studied Over 1 Million Domains to Find the Most Common Technical SEO Issues"', url: 'https://ahrefs.com/blog/site-audit-study/' },
    },
    {
        number: '02',
        severity: 'Critical',
        severityColor: '#ef4444',
        title: 'H1 tag missing or not keyword-rich',
        impact: "Direct: Google can't clearly identify the page's topic",
        desc: 'The H1 tag is the strongest on-page SEO signal after the title tag. Google uses it to identify a page\'s main topic. Many websites either have no H1, multiple H1s on one page, or an H1 that doesn\'t contain the main keyword.',
        fix: 'Exactly one H1 tag per page. It must include the page\'s primary keyword, read naturally, and accurately describe the page\'s content. The H1 can - and should - differ from the title tag.',
        stat: '59.5% of websites have no H1 tag at all, according to the same Ahrefs analysis.',
        source: { label: 'Ahrefs: "We Studied Over 1 Million Domains to Find the Most Common Technical SEO Issues"', url: 'https://ahrefs.com/blog/site-audit-study/' },
    },
    {
        number: '03',
        severity: 'High',
        severityColor: '#f59e0b',
        title: 'Load time over 3 seconds (Core Web Vitals)',
        impact: '53% of users abandon pages that take longer than 3 seconds to load',
        desc: 'Core Web Vitals have been an official Google ranking factor since 2021. The three metrics - LCP (Largest Contentful Paint), FID/INP (interactivity), and CLS (layout stability) - measure perceived load speed. Poor load time costs you both rankings and users.',
        fix: 'Compress images and convert to WebP, enable lazy loading, remove unnecessary JavaScript, and use browser caching. TTFB (Time to First Byte) should stay under 800ms, FCP under 1.8 seconds.',
        source: { label: 'Google/Think with Google: "The Need for Mobile Speed"', url: 'https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/' },
        stat: 'Websites that load in under 2 seconds rank an average of 2.5 positions higher than those over 4 seconds.',
    },
    {
        number: '04',
        severity: 'High',
        severityColor: '#f59e0b',
        title: 'Missing image alt text',
        impact: 'Lost ranking opportunities in Google Image Search',
        desc: 'Alt text describes images for search engines and screen readers. Google is increasingly able to interpret images on its own, but precise alt text is still a direct SEO signal. If alt text is missing across many images, you lose both accessibility points and ranking opportunities in image search.',
        fix: 'Every content image needs descriptive alt text that concretely describes the image - without "image of" or "photo of". Decorative images get an empty alt attribute (alt="").',
        stat: '80.4% of websites have missing alt attributes on images, according to the same Ahrefs analysis.',
        source: { label: 'Ahrefs: "We Studied Over 1 Million Domains to Find the Most Common Technical SEO Issues"', url: 'https://ahrefs.com/blog/site-audit-study/' },
    },
    {
        number: '05',
        severity: 'High',
        severityColor: '#f59e0b',
        title: 'Missing or incorrect canonical tag',
        impact: 'Duplicate-content issues and split link authority',
        desc: 'Canonical tags tell Google which version of a URL is the "real" one. Without them, Google can index the wrong version of pages with similar content (e.g. URL parameters, www vs. non-www, HTTP vs. HTTPS). That splits link authority and hurts the ranking of your main page.',
        fix: 'Add a self-referencing canonical tag to every page (<link rel="canonical" href="https://yourdomain.com/page">). For duplicate content, always point to the primary version.',
        stat: null,
    },
    {
        number: '06',
        severity: 'Medium',
        severityColor: '#6366f1',
        title: 'Title tag too long, too short, or duplicated',
        impact: 'Google truncates titles that are too long, and generates its own for titles that are too short',
        desc: 'The title tag is the single strongest SEO signal there is - and also the most commonly mishandled. Too long (over 60 characters): Google truncates it with "…". Too short (under 30 characters): too little keyword signal. Duplicated: multiple pages with an identical title compete against each other.',
        fix: '50-60 characters, main keyword as early as possible, brand name at the end (e.g. "Keyword Topic - Brand Name"). Every page needs a unique title tag.',
        stat: null,
    },
    {
        number: '07',
        severity: 'Medium',
        severityColor: '#6366f1',
        title: 'Missing Open Graph tags',
        impact: 'Unattractive previews when shared on social media and messaging apps',
        desc: 'Open Graph tags (og:title, og:description, og:image) control how your page looks in WhatsApp, LinkedIn, X/Twitter, or Slack when someone shares the link. If og:image is missing, the link shows no image - which massively reduces click-through rate. If og:title is missing, the browser falls back to the regular title, which is often not optimized for social networks.',
        fix: "Set at least og:title, og:description, og:image (1200×630px), and og:url on every page. The og:image should visually communicate the page's core message.",
        stat: null,
    },
    {
        number: '08',
        severity: 'Medium',
        severityColor: '#6366f1',
        title: 'Too little content (under 300 words)',
        impact: 'Google treats "thin content" as a low-quality signal',
        desc: "Pages with very little text - under 300 words - give Google almost no context about the page's topic. Google can't classify the topic and shows the page less often. This is especially common on product pages, landing pages, and blog posts meant to be \"short and punchy\" that end up light on substantive information.",
        fix: 'At least 300 words per page, 800+ for important pages. More words only help if the content is relevant - filler hurts. Answer the questions your audience is actually asking.',
        stat: null,
    },
    {
        number: '09',
        severity: 'Medium',
        severityColor: '#6366f1',
        title: 'No structured data (Schema.org)',
        impact: 'Missed rich results in Google search listings',
        desc: 'Structured data (JSON-LD with Schema.org markup) enables Google rich results - enhanced listings like FAQ boxes, star ratings, or product prices. Websites without structured data are stuck with the standard listing and statistically get a lower CTR than rich-result listings.',
        fix: 'At minimum, add Organization schema and WebSite schema to every page. For blogs: Article schema. For product pages: Product schema. For FAQs: FAQPage schema. Always as JSON-LD in the head.',
        stat: null,
    },
    {
        number: '10',
        severity: 'High',
        severityColor: '#f59e0b',
        title: 'Accidental "noindex" on important pages',
        impact: 'The page disappears completely from Google search',
        desc: 'A single robots meta tag with "noindex", or an incorrectly set X-Robots-Tag in the server response, is enough for Google to remove a page from its index entirely - no matter how good the title, content, or backlinks are. This happens more often than you\'d think: a staging flag forgotten after launch, a CMS default, or a plugin update that resets the robots setting.',
        fix: 'After every deployment, check your most important pages with URL Inspection in Google Search Console, or automate it with an SEO test - AuditAI flags accidental noindex immediately as a critical error.',
        ctaLink: '/dashboard',
        stat: null,
    },
]

export default function CommonSeoMistakesPageEn() {
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
                    <span className="text-slate-500">10 Common SEO Mistakes</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-violet-500/15 text-violet-400">
                            SEO
                        </span>
                        <span className="text-xs text-slate-600">June 10, 2026</span>
                        <span className="text-xs text-slate-600">· 9 min read</span>
                        <span className="text-xs text-slate-600">· Updated Aug 1, 2026</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        10 Common SEO Mistakes That Cost You Google Rankings
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Most SEO mistakes aren&apos;t secrets - they&apos;re just invisible. No error in the console, no alert. The site runs fine, traffic just stalls. Here are the 10 problems we see over and over in website audits, why they cost you rankings, and how to fix them in under 60 minutes.
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
                        <h2 className="text-2xl font-bold text-white mb-4">What is an SEO test, and why do you need one?</h2>
                        <p>
                            An SEO test is a systematic review of every on-page factor on your website - everything you can directly control: title tags, meta descriptions, headings, load time, images, internal links, and technical signals like canonical tags or structured data.
                        </p>
                        <p className="mt-4">
                            The difference from a one-time setup: SEO decays. Google says it makes{' '}
                            <a href="https://developers.google.com/search/blog/2023/11/q-and-a-on-search-updates" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
                                thousands of changes to its search systems every year
                            </a>{' '}
                            (over 3,200 in 2023 alone, according to Google). Every new piece of content, every deployment, can quietly introduce new problems. A page that was flawless in January can have critical SEO issues by June - without anyone consciously changing anything.
                        </p>
                        <div className="bg-violet-500/8 border border-violet-500/20 rounded-2xl p-5 mt-5">
                            <p className="text-sm text-violet-300 font-medium mb-1">Position 1 gets an average of 27.6% of all clicks</p>
                            <p className="text-sm text-slate-400">
                                Land on page 2 and you might as well not exist for potential customers - and jumping from position 5 to position 1 alone can multiply traffic to the same page. A single fixed SEO mistake can make that difference.{' '}
                                <a href="https://backlinko.com/google-ctr-stats" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
                                    Source: Backlinko analysis of 4 million Google search results ↗
                                </a>
                            </p>
                        </div>
                    </section>

                    <nav aria-label="Table of contents" className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">In this article</p>
                        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            {MISTAKES.map((e) => (
                                <li key={e.number}>
                                    <a href={`#mistake-${e.number}`} className="text-slate-400 hover:text-violet-300 transition-colors">
                                        <span className="font-mono text-slate-600 mr-1.5">{e.number}</span>{e.title}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a href="#how-to-run" className="text-slate-400 hover:text-violet-300 transition-colors">How do I run an SEO test?</a>
                            </li>
                            <li>
                                <a href="#faq" className="text-slate-400 hover:text-violet-300 transition-colors">Frequently asked questions</a>
                            </li>
                        </ol>
                    </nav>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">The 10 most common SEO mistakes</h2>
                        <figure className="mb-6">
                            <Image
                                src="/blog/auditai-seo-issues.png"
                                alt="AuditAI SEO report showing real detected issues like overly long title tags and meta descriptions"
                                width={926}
                                height={168}
                                className="w-full h-auto rounded-2xl border border-white/[0.07]"
                            />
                            <figcaption className="text-xs text-slate-600 mt-2">
                                How AuditAI flags detected issues in a real report — title tag and meta description problems from a live audit.
                            </figcaption>
                        </figure>
                        <div className="space-y-5">
                            {MISTAKES.slice(0, 6).map((e) => (
                                <div key={e.number} id={`mistake-${e.number}`} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6 scroll-mt-28">
                                    <div className="flex items-start gap-4">
                                        <span className="text-[11px] font-bold font-mono shrink-0 mt-0.5 text-slate-600">{e.number}</span>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-white">{e.title}</h3>
                                                <span
                                                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                                    style={{ background: e.severityColor + '18', color: e.severityColor }}
                                                >
                                                    {e.severity}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-3 italic">{e.impact}</p>
                                            <p className="text-sm text-slate-400 leading-relaxed mb-3">{e.desc}</p>
                                            {e.stat && (
                                                <p className="text-xs text-slate-500 bg-white/[0.03] rounded-lg px-3 py-2 mb-3 border-l-2 border-slate-700">
                                                    {e.stat}
                                                    {e.source && (
                                                        <>
                                                            {' '}
                                                            <a
                                                                href={e.source.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-violet-400 hover:text-violet-300 underline underline-offset-2"
                                                            >
                                                                Source: {e.source.label} ↗
                                                            </a>
                                                        </>
                                                    )}
                                                </p>
                                            )}
                                            <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
                                                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Fix: </span>
                                                <span className="text-xs text-slate-400 leading-relaxed">
                                                    {e.fix}
                                                    {e.ctaLink && (
                                                        <>
                                                            {' '}
                                                            <Link href={e.ctaLink} className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
                                                                Check automatically now ↗
                                                            </Link>
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <figure className="my-6">
                            <Image
                                src="/blog/auditai-seo-checks.png"
                                alt="AuditAI check grid showing failed checks for title tag (69 characters) and meta description (169 characters), plus passed checks for H1 tag, alt text, canonical, and structured data"
                                width={910}
                                height={103}
                                className="w-full h-auto rounded-2xl border border-white/[0.07]"
                            />
                            <figcaption className="text-xs text-slate-600 mt-2">
                                Same report, different website: the title tag (69 characters, too long) and meta description (169 characters, too long) are flagged directly as errors here - H1 tag, alt text, canonical, and structured data were already clean in this example.
                            </figcaption>
                        </figure>

                        <div className="space-y-5">
                            {MISTAKES.slice(6).map((e) => (
                                <div key={e.number} id={`mistake-${e.number}`} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6 scroll-mt-28">
                                    <div className="flex items-start gap-4">
                                        <span className="text-[11px] font-bold font-mono shrink-0 mt-0.5 text-slate-600">{e.number}</span>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-white">{e.title}</h3>
                                                <span
                                                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                                    style={{ background: e.severityColor + '18', color: e.severityColor }}
                                                >
                                                    {e.severity}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-3 italic">{e.impact}</p>
                                            <p className="text-sm text-slate-400 leading-relaxed mb-3">{e.desc}</p>
                                            {e.stat && (
                                                <p className="text-xs text-slate-500 bg-white/[0.03] rounded-lg px-3 py-2 mb-3 border-l-2 border-slate-700">
                                                    {e.stat}
                                                    {e.source && (
                                                        <>
                                                            {' '}
                                                            <a
                                                                href={e.source.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-violet-400 hover:text-violet-300 underline underline-offset-2"
                                                            >
                                                                Source: {e.source.label} ↗
                                                            </a>
                                                        </>
                                                    )}
                                                </p>
                                            )}
                                            <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
                                                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Fix: </span>
                                                <span className="text-xs text-slate-400 leading-relaxed">
                                                    {e.fix}
                                                    {e.ctaLink && (
                                                        <>
                                                            {' '}
                                                            <Link href={e.ctaLink} className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
                                                                Check automatically now ↗
                                                            </Link>
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="how-to-run" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">How do I run an SEO test?</h2>
                        <p>
                            You can check SEO issues manually - read the title tag in the browser tab, search the page source for meta tags, measure load time in Chrome DevTools. That takes 15-30 minutes per page, is error-prone, and doesn&apos;t scale to multiple pages or regular checks. You&apos;ll find a fixed check order for the manual route in our{' '}
                            <Link href="/en/blog/seo-checklist-2026" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
                                2026 SEO Checklist
                            </Link>.
                        </p>
                        <p className="mt-4">
                            The problem with manual checks: you never check the entire website. Most SEO mistakes don&apos;t live on the homepage - they&apos;re hiding on subpages, product pages, or blog posts nobody actively maintains anymore. An automated SEO test crawls up to 25 pages at once and catches exactly these hidden problems.
                        </p>
                        <p className="mt-4">
                            AuditAI checks all 14 SEO checks from this article in under 60 seconds - including H1, meta descriptions, alt text, canonical, Open Graph, structured data, and Core Web Vitals.
                        </p>
                    </section>

                    <section id="faq" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Frequently asked questions about SEO tests</h2>
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
                        How many of these mistakes does your website have?
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        AuditAI checks all 14 SEO checks in under 60 seconds - including the 10 mistakes from this article. Start without registration, sign up free for the full report with all scores.
                    </p>
                    <figure className="max-w-md mx-auto mb-6">
                        <Image
                            src="/blog/auditai-score-overview.png"
                            alt="AuditAI score overview showing an overall score of 90, SEO score of 78, performance score of 100, and GEO score of 96"
                            width={960}
                            height={194}
                            className="w-full h-auto rounded-xl border border-white/[0.07]"
                        />
                    </figure>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20"
                    >
                        Start SEO test now
                    </Link>
                    <div className="mt-3 text-xs text-slate-600">No registration to start · Full report free · 60 seconds</div>
                </div>

                {/* Cross-link to sibling post */}
                <div className="mt-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1 block">Keep reading</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                The 2026 SEO Checklist in 15 Minutes
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                These 10 mistakes turned into a fixed check order: 6 phases, 24 points, 15 minutes - including GEO signals for AI visibility.
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

                {/* SEO AUTOMATION CTA */}
                <div className="mt-5 bg-emerald-500/[0.04] border border-emerald-500/20 rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 block">SEO Automation</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                Don&apos;t just check once — track it automatically
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                SEO mistakes happen continuously: new pages without meta tags, images missing alt text after updates, accidental noindex. With SEO Automation you monitor your rankings and keywords automatically, every week.
                            </p>
                            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                                {['Weekly Google rankings', 'Keyword ideas', 'Competitor analysis', 'Backlink overview'].map(f => (
                                    <li key={f} className="flex items-center gap-1.5 text-xs text-slate-500">
                                        <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link
                            href="/en/seo/pricing"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20 shrink-0"
                        >
                            Start tracking
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
