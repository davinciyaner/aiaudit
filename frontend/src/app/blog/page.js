import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
    title: 'Blog – SEO, GEO & Website-Optimierung | AuditAI',
    description: 'Praxisnahe Artikel über SEO, GEO-Optimierung, Security und Performance. Lerne wie du deine Website für Google und KI-Modelle optimierst.',
    alternates: { canonical: 'https://sitecheckai.dev/blog' },
}

const ARTICLES = [
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
        description: 'GEO (Generative Engine Optimization) erklärt: Wie du deine Website optimierst damit ChatGPT, Claude und Perplexity sie als Quelle zitieren. Mit konkreter Checkliste.',
        category: 'GEO',
        categoryColor: '#06b6d4',
        date: '10. Juni 2026',
        readTime: '8 min',
    },
    {
        slug: 'website-security-check',
        title: 'Website-Security 2026: Warum ein Hack 50.000€+ kosten kann — und wie du dich schützt',
        description: 'Websites werden täglich gehackt — besonders Vibe-Coding-Projekte. DSGVO-Bußgelder, Cloud-Rechnungen durch Crypto-Mining und Datenverlust können schnell sechsstellig werden. So schützt du dich.',
        category: 'Security',
        categoryColor: '#ef4444',
        date: '10. Juni 2026',
        readTime: '10 min',
    },
]

export default function BlogPage() {
    return (
        <main className="bg-[#05080f] min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-32 pb-24">
                <div className="mb-12">
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">Blog</h1>
                    <p className="text-slate-400 text-lg">SEO, GEO, Security und Performance — praxisnah erklärt.</p>
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