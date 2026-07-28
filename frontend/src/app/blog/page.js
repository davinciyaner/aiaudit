import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
    title: 'Blog – SEO, GEO & Website-Optimierung',
    description: 'Praxisnahe Artikel über SEO, GEO-Optimierung und Performance. Lerne wie du deine Website für Google und KI-Modelle optimierst.',
    alternates: { canonical: 'https://www.sitecheckai.dev/blog' },
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sitecheckai.dev/blog' },
    ],
}

const ARTICLES = [
    {
        slug: 'core-web-vitals-testen',
        title: 'Core Web Vitals 2026: Verstehen und kostenlos testen',
        description: 'LCP, INP und CLS erklärt - mit den offiziellen Google-Schwellenwerten. Plus: wie du sie in unter 2 Minuten kostenlos testest.',
        category: 'Performance',
        categoryColor: '#f59e0b',
        date: '26. Juli 2026',
        readTime: '8 min',
    },
    {
        slug: 'seo-test-vs-agentur',
        title: 'SEO-Test selbst machen oder Agentur beauftragen? Der ehrliche Kostenvergleich',
        description: 'SEO-Audit selbst durchführen vs. SEO-Agentur beauftragen: Kosten, Leistungsumfang und für wen sich was lohnt - ohne Verkaufsrhetorik.',
        category: 'SEO',
        categoryColor: '#7c3aed',
        date: '26. Juli 2026',
        readTime: '8 min',
    },
    {
        slug: 'llms-txt-erklaert',
        title: 'llms.txt erklärt: Was es ist und wie du es richtig einrichtest',
        description: 'Die robots.txt für KI-Modelle: Herkunft, Aufbau, Unterschied zu llms-full.txt und eine Schritt-für-Schritt-Anleitung zum Erstellen.',
        category: 'GEO',
        categoryColor: '#06b6d4',
        date: '26. Juli 2026',
        readTime: '7 min',
    },
    {
        slug: 'schema-markup-ki-zitate',
        title: 'Schema Markup für KI-Zitate: So wirst du für ChatGPT & Co. zitierfähig',
        description: 'Die wichtigsten Schema-Typen für KI-Zitierbarkeit, kostenlose Test-Tools und der häufigste Fehler, der Rich Results kostet.',
        category: 'GEO',
        categoryColor: '#06b6d4',
        date: '26. Juli 2026',
        readTime: '7 min',
    },
    {
        slug: 'seo-tracking-manuell-vs-automatisiert',
        title: 'Manuelles SEO-Tracking vs. automatisiert: Was lohnt sich wirklich?',
        description: 'Manuelles SEO- und GEO-Tracking vs. Automatisierung im Vergleich: Zeitaufwand, Kosten und warum KI-Sichtbarkeit manuell kaum zuverlässig messbar ist.',
        category: 'SEO & GEO',
        categoryColor: '#10b981',
        date: '15. Juli 2026',
        readTime: '9 min',
    },
    {
        slug: 'beste-seo-check-tools-2026',
        title: 'Die besten kostenlosen SEO-Check-Tools 2026 im Vergleich',
        description: '13 SEO-Check-Tools im Vergleich inkl. G2-/Capterra-/OMR-Bewertungen: kostenlose Version, Funktionsumfang, Limits und wer als einziges auch KI-Sichtbarkeit (GEO) prüft.',
        category: 'Tools',
        categoryColor: '#f59e0b',
        date: '15. Juli 2026',
        readTime: '13 min',
    },
    {
        slug: 'seo-checkliste-2026',
        title: 'SEO-Checkliste 2026: In 15 Minuten alle Fehler selbst finden',
        description: 'Die komplette SEO-Checkliste 2026 in fester Reihenfolge: 6 Phasen, 15 Minuten, alle wichtigen SEO- und GEO-Signale.',
        category: 'SEO',
        categoryColor: '#7c3aed',
        date: '15. Juli 2026',
        readTime: '7 min',
    },
    {
        slug: 'seo-geo-automatisierung',
        title: 'SEO Automatisierung & GEO Automatisierung: Rankings und KI-Sichtbarkeit automatisch tracken',
        description: 'Wie du Google-Rankings und KI-Sichtbarkeit bei ChatGPT, Claude, Perplexity & Google AI Overview wöchentlich automatisch trackst - statt manuell zu prüfen. Mit Preisen und Vergleich.',
        category: 'SEO & GEO',
        categoryColor: '#10b981',
        date: '5. Juli 2026',
        readTime: '10 min',
    },
    {
        slug: 'seo-test-haeufige-fehler',
        title: 'SEO-Test: Die 10 häufigsten Fehler die deinen Google-Rank kosten',
        description: 'Diese 10 SEO-Fehler machen die meisten Websites — und keiner merkt es. Mit kostenlosem SEO-Test-Tool checken und sofort beheben.',
        category: 'SEO',
        categoryColor: '#7c3aed',
        date: '10. Juni 2026',
        readTime: '9 min',
    },
    {
        slug: 'geo-optimierung-2026',
        title: 'GEO-Optimierung 2026: So wirst du von ChatGPT und Claude empfohlen',
        description: 'GEO (Generative Engine Optimization) erklärt: Wie du deine Website optimierst damit ChatGPT, Claude, Perplexity und Google AI Overview sie als Quelle zitieren. Mit konkreter Checkliste.',
        category: 'GEO',
        categoryColor: '#06b6d4',
        date: '10. Juni 2026',
        readTime: '8 min',
    },
]

export default function BlogPage() {
    return (
        <main className="bg-[#05080f] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar />
            <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-32 pb-24">
                <div className="mb-12">
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">Blog</h1>
                    <p className="text-slate-400 text-lg">SEO, GEO und Performance — praxisnah erklärt.</p>
                </div>

                <div className="space-y-4">
                    {ARTICLES.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/blog/${article.slug}`}
                            className="group block bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/10 rounded-2xl p-6 sm:p-8 transition-all duration-200"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span
                                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
                                    style={{ background: article.categoryColor + '18', color: article.categoryColor }}
                                >
                                    {article.category}
                                </span>
                                <span className="text-xs text-slate-600">{article.date}</span>
                                <span className="text-xs text-slate-600">· {article.readTime} Lesezeit</span>
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors leading-snug">
                                {article.title}
                            </h2>
                            <p className="text-sm text-slate-400 leading-relaxed">{article.description}</p>
                            <div className="mt-4 text-xs text-violet-400 font-medium group-hover:text-violet-300 transition-colors">
                                Artikel lesen →
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    )
}