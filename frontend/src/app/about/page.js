import Link from 'next/link'
import { Sparkles, RefreshCw, Zap as ZapIcon, Mail } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
    title: 'Über Scanora – Warum es dieses Tool gibt',
    description: 'Scanora trackt automatisiert, ob deine Website bei ChatGPT, Claude, Perplexity und Google AI Overview zitiert wird — und wie sie bei Google rankt. Ein Report statt zehn Einzeltools.',
    alternates: { canonical: 'https://www.scanora.ai/about' },
    openGraph: {
        title: 'Über Scanora',
        description: 'Warum es Scanora gibt und was es automatisiert.',
        url: 'https://www.scanora.ai/about',
        type: 'website',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: 'https://www.scanora.ai/about',
    name: 'Über Scanora',
    mainEntity: {
        '@type': 'SoftwareApplication',
        name: 'Scanora',
        applicationCategory: 'BusinessApplication',
        description: 'Automatisiertes Tracking von AI Visibility (ChatGPT, Claude, Perplexity, Google AI Overview) und klassischen SEO-Rankings in einem Report.',
        url: 'https://www.scanora.ai',
    },
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai' },
        { '@type': 'ListItem', position: 2, name: 'Über Scanora', item: 'https://www.scanora.ai/about' },
    ],
}

const FACTS = [
    { icon: Sparkles, label: 'AI Visibility & SEO in einem Report', color: '#7c3aed' },
    { icon: ZapIcon, label: 'Audit in unter 60 Sekunden', color: '#06b6d4' },
    { icon: RefreshCw, label: 'Wöchentliches automatisches Tracking', color: '#10b981' },
]

export default function AboutPage() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-[var(--text-faint)] mb-8">
                    <Link href="/" className="hover:text-[var(--text-muted)] transition-colors">Scanora</Link>
                    <span>/</span>
                    <span className="text-[var(--text-faint)]">Über Scanora</span>
                </div>

                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shrink-0">
                        <ZapIcon className="w-7 h-7 text-[var(--text-white)]" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-white)] tracking-tight">Über Scanora</h1>
                        <p className="text-[var(--text-muted)] text-sm mt-1">AI Visibility & SEO Tracking, ein Report</p>
                    </div>
                </div>

                {/* Facts row */}
                <div className="grid sm:grid-cols-3 gap-3 mb-12">
                    {FACTS.map(({ icon: Icon, label, color }) => (
                        <div key={label} className="flex items-center gap-3 bg-[var(--text-white)]/[0.03] border border-[var(--text-white)]/[0.06] rounded-xl p-4">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}1a` }}>
                                <Icon className="w-4 h-4" style={{ color }} />
                            </div>
                            <span className="text-sm text-[var(--text-body)]">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Bio */}
                <div className="prose prose-invert prose-slate max-w-none text-[var(--text-body)] leading-relaxed space-y-5">
                    <h2 className="text-xl font-bold text-[var(--text-white)] mb-3">Warum Scanora?</h2>
                    <p>
                        Google ist nicht mehr die einzige Suchmaschine. Immer mehr Menschen fragen ChatGPT, Claude oder
                        Perplexity nach Empfehlungen, statt zu googeln — und eine Website kann bei Google auf Platz 1 stehen
                        und für diese KI-Modelle trotzdem komplett unsichtbar sein. Beides im Blick zu behalten heißt in der
                        Praxis: Rankings, Meta-Daten und Core Web Vitals manuell prüfen — und zusätzlich regelmäßig selbst
                        bei mehreren KI-Modellen nachfragen, ob die eigene Seite überhaupt erwähnt wird. Über mehrere Tools
                        verteilt, ist das schnell ein Vollzeitjob für sich.
                    </p>
                    <p>
                        Scanora automatisiert genau das: ein Audit, das sowohl die AI Visibility bei ChatGPT, Claude,
                        Perplexity und Google AI Overview als auch die klassischen Google-Rankings trackt — mit konkreten,
                        priorisierten Fixes statt generischen Tipps. Checks laufen wöchentlich automatisch im Hintergrund,
                        damit ein Ranking-Abfall oder eine verlorene KI-Erwähnung auffällt, bevor sie Traffic kostet.
                    </p>

                    <h2 className="text-xl font-bold text-[var(--text-white)] mb-3 mt-10">Kontakt</h2>
                    <p>
                        Fragen oder Feedback zu Scanora:{' '}
                        <a href="mailto:sitecheckai@gmail.com" className="text-violet-400 hover:text-violet-300 inline-flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" />
                            sitecheckai@gmail.com
                        </a>
                    </p>
                </div>

                <div className="mt-14 pt-8 border-t border-[var(--text-white)]/5">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium"
                    >
                        Alle Artikel im Blog lesen →
                    </Link>
                </div>
            </article>

            <Footer />
        </main>
    )
}