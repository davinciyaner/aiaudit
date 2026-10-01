import Link from 'next/link'
import { Sparkles, RefreshCw, Zap as ZapIcon, Mail } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: { absolute: 'About Scanora - Why This Tool Exists' },
    description: 'Scanora automatically tracks whether your website gets cited by ChatGPT, Claude, Perplexity, and Google AI Overview - and how it ranks on Google.',
    alternates: {
        canonical: 'https://www.scanora.ai/en/about',
        languages: {
            'de-DE': 'https://www.scanora.ai/about',
            'en-US': 'https://www.scanora.ai/en/about',
        },
    },
    openGraph: {
        title: 'About Scanora',
        description: 'Why Scanora exists and what it automates.',
        url: 'https://www.scanora.ai/en/about',
        type: 'website',
        locale: 'en_US',
        images: ['https://www.scanora.ai/en/opengraph-image'],
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: 'https://www.scanora.ai/en/about',
    name: 'About Scanora',
    mainEntity: {
        '@type': 'SoftwareApplication',
        name: 'Scanora',
        applicationCategory: 'BusinessApplication',
        description: 'Automated tracking of AI visibility (ChatGPT, Claude, Perplexity, Google AI Overview) and classic SEO rankings in a single report.',
        url: 'https://www.scanora.ai',
    },
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai/en' },
        { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.scanora.ai/en/about' },
    ],
}

const FACTS = [
    { icon: Sparkles, label: 'AI visibility & SEO in one report', color: 'var(--accent)' },
    { icon: ZapIcon, label: 'Audit in under 60 seconds', color: 'var(--accent)' },
    { icon: RefreshCw, label: 'Weekly automated tracking', color: 'var(--success)' },
]

export default function AboutPageEn() {
    return (
        <main className="bg-(--bg-base) min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar locale="en" />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-28 md:pt-34 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-(--text-faint) mb-8">
                    <Link href="/en" className="hover:text-(--text-muted) transition-colors">Scanora</Link>
                    <span>/</span>
                    <span className="text-(--text-faint)">About</span>
                </div>

                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-(--accent) flex items-center justify-center shrink-0">
                        <ZapIcon className="w-7 h-7 text-(--text-white)" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-[clamp(34px,4.4vw,54px)] leading-[1.05] tracking-[-0.038em] font-bold text-(--text-white)">About Scanora</h1>
                        <p className="text-(--text-muted) text-sm mt-1">AI visibility & SEO tracking, one report</p>
                    </div>
                </div>

                {/* Facts row */}
                <div className="grid sm:grid-cols-3 gap-3 mb-12">
                    {FACTS.map(({ icon: Icon, label, color }) => (
                        <div key={label} className="flex items-center gap-3 bg-(--card) border border-(--line) rounded-xl p-4">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `color-mix(in oklch, ${color} 10%, transparent)` }}>
                                <Icon className="w-4 h-4" style={{ color }} />
                            </div>
                            <span className="text-sm text-(--text-body)">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Bio */}
                <div className="prose prose-invert prose-slate max-w-none text-(--text-body) leading-relaxed space-y-5">
                    <h2 className="text-xl font-bold text-(--text-white) mb-3">Why Scanora?</h2>
                    <p>
                        Google isn't the only search engine anymore. More and more people ask ChatGPT, Claude, or
                        Perplexity for recommendations instead of googling - and a website can sit at #1 on Google while
                        being completely invisible to those AI models. Keeping an eye on both means, in practice: manually
                        checking rankings, meta data, and Core Web Vitals - plus regularly asking several AI models
                        yourself whether your site even gets mentioned. Spread across multiple tools, that quickly turns
                        into a full-time job on its own.
                    </p>
                    <p>
                        Scanora automates exactly that: one audit that tracks both AI visibility across ChatGPT, Claude,
                        Perplexity, and Google AI Overview, and classic Google rankings - with concrete, prioritized fixes
                        instead of generic tips. Checks run automatically every week in the background, so a ranking drop
                        or a lost AI mention gets caught before it costs traffic.
                    </p>

                    <h2 className="text-xl font-bold text-(--text-white) mb-3 mt-10">Contact</h2>
                    <p>
                        Questions or feedback about Scanora:{' '}
                        <a href="mailto:scanoraai@gmail.com" className="text-(--accent-ink) hover:text-(--accent-ink) inline-flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" />
                            scanoraai@gmail.com
                        </a>
                    </p>
                </div>

                <div className="mt-14 pt-8 border-t border-(--line)">
                    <Link
                        href="/en/blog"
                        className="inline-flex items-center gap-2 text-sm text-(--accent-ink) hover:text-(--accent-ink) transition-colors font-medium"
                    >
                        Read all blog articles →
                    </Link>
                </div>
            </article>

            <Footer locale="en" />
        </main>
    )
}
