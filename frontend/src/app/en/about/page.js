import Link from 'next/link'
import { Sparkles, RefreshCw, Zap as ZapIcon, Mail } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: { absolute: 'About AuditAI – Why This Tool Exists' },
    description: 'AuditAI automatically tracks whether your website gets cited by ChatGPT, Claude, Perplexity, and Google AI Overview — and how it ranks on Google. One report instead of ten separate tools.',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/about',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/about',
            'en-US': 'https://www.sitecheckai.dev/en/about',
        },
    },
    openGraph: {
        title: 'About AuditAI',
        description: 'Why AuditAI exists and what it automates.',
        url: 'https://www.sitecheckai.dev/en/about',
        type: 'website',
        locale: 'en_US',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: 'https://www.sitecheckai.dev/en/about',
    name: 'About AuditAI',
    mainEntity: {
        '@type': 'SoftwareApplication',
        name: 'AuditAI',
        applicationCategory: 'BusinessApplication',
        description: 'Automated tracking of AI visibility (ChatGPT, Claude, Perplexity, Google AI Overview) and classic SEO rankings in a single report.',
        url: 'https://www.sitecheckai.dev',
    },
}

const FACTS = [
    { icon: Sparkles, label: 'AI visibility & SEO in one report', color: '#7c3aed' },
    { icon: ZapIcon, label: 'Audit in under 60 seconds', color: '#06b6d4' },
    { icon: RefreshCw, label: 'Weekly automated tracking', color: '#10b981' },
]

export default function AboutPageEn() {
    return (
        <main className="bg-[#05080f] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar locale="en" />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
                    <Link href="/en" className="hover:text-slate-400 transition-colors">AuditAI</Link>
                    <span>/</span>
                    <span className="text-slate-500">About</span>
                </div>

                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shrink-0">
                        <ZapIcon className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">About AuditAI</h1>
                        <p className="text-slate-400 text-sm mt-1">AI visibility & SEO tracking, one report</p>
                    </div>
                </div>

                {/* Facts row */}
                <div className="grid sm:grid-cols-3 gap-3 mb-12">
                    {FACTS.map(({ icon: Icon, label, color }) => (
                        <div key={label} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}1a` }}>
                                <Icon className="w-4 h-4" style={{ color }} />
                            </div>
                            <span className="text-sm text-slate-300">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Bio */}
                <div className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed space-y-5">
                    <h2 className="text-xl font-bold text-white mb-3">Why AuditAI?</h2>
                    <p>
                        Google isn't the only search engine anymore. More and more people ask ChatGPT, Claude, or
                        Perplexity for recommendations instead of googling — and a website can sit at #1 on Google while
                        being completely invisible to those AI models. Keeping an eye on both means, in practice: manually
                        checking rankings, meta data, and Core Web Vitals — plus regularly asking several AI models
                        yourself whether your site even gets mentioned. Spread across multiple tools, that quickly turns
                        into a full-time job on its own.
                    </p>
                    <p>
                        AuditAI automates exactly that: one audit that tracks both AI visibility across ChatGPT, Claude,
                        Perplexity, and Google AI Overview, and classic Google rankings — with concrete, prioritized fixes
                        instead of generic tips. Checks run automatically every week in the background, so a ranking drop
                        or a lost AI mention gets caught before it costs traffic.
                    </p>

                    <h2 className="text-xl font-bold text-white mb-3 mt-10">Contact</h2>
                    <p>
                        Questions or feedback about AuditAI:{' '}
                        <a href="mailto:sitecheckai@gmail.com" className="text-violet-400 hover:text-violet-300 inline-flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" />
                            sitecheckai@gmail.com
                        </a>
                    </p>
                </div>

                <div className="mt-14 pt-8 border-t border-white/5">
                    <Link
                        href="/en/blog"
                        className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium"
                    >
                        Read all blog articles →
                    </Link>
                </div>
            </article>

            <Footer locale="en" />
        </main>
    )
}
