import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'SEO-Test selbst machen oder Agentur beauftragen? Der ehrliche Kostenvergleich',
    description: 'SEO-Audit selbst durchführen vs. SEO-Agentur beauftragen: Kosten, was jede Option wirklich abdeckt, und für wen sich was lohnt - ohne Verkaufsrhetorik.',
    keywords: 'seo test vs agentur, seo audit selbst machen, seo agentur kosten, seo agentur oder selbst machen, lohnt sich seo agentur, seo selbst optimieren',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/blog/seo-test-vs-agentur',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/blog/seo-test-vs-agentur',
            'en-US': 'https://www.sitecheckai.dev/en/blog/seo-tool-vs-agency',
        },
    },
    openGraph: {
        title: 'SEO-Test selbst machen oder Agentur beauftragen? Der ehrliche Kostenvergleich',
        description: 'Kosten, Leistungsumfang und für wen sich was lohnt - der ehrliche Vergleich ohne Verkaufsrhetorik.',
        url: 'https://www.sitecheckai.dev/blog/seo-test-vs-agentur',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SEO-Test selbst machen oder Agentur beauftragen? Der ehrliche Kostenvergleich',
    description: 'SEO-Audit selbst durchführen vs. SEO-Agentur beauftragen: Kosten, was jede Option wirklich abdeckt, und für wen sich was lohnt.',
    image: 'https://www.sitecheckai.dev/blog/seo-test-vs-agentur/opengraph-image',
    datePublished: '2026-07-26T09:00:00+02:00',
    dateModified: '2026-07-30T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/blog/seo-test-vs-agentur',
    mainEntityOfPage: 'https://www.sitecheckai.dev/blog/seo-test-vs-agentur',
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sitecheckai.dev/blog' },
        { '@type': 'ListItem', position: 3, name: 'SEO-Test vs. Agentur', item: 'https://www.sitecheckai.dev/blog/seo-test-vs-agentur' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Kann ein SEO-Test eine Agentur ersetzen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Für die technische Diagnose ja, für die Umsetzung nein. Ein automatisierter SEO-Test findet Fehler und zeigt Scores - er schreibt keinen Content, baut keine Backlinks auf und entwickelt keine Content-Strategie. Für reine technische Fehlerdiagnose ist er oft die günstigere und schnellere Wahl, für strategische Weiterentwicklung bleibt eine Agentur oder ein Freelancer relevant.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was kostet eine SEO-Agentur in Deutschland?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Monatliche Retainer starten für kleine Projekte bei etwa 500-1.000 €, für kleine und mittlere Unternehmen liegen sie meist zwischen 1.500 und 4.000 €, in wettbewerbsstarken Branchen zwischen 4.000 und 8.000 € oder mehr. Stundensätze für Freelancer bewegen sich je nach Erfahrung zwischen 90 und 300 €.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wann lohnt sich ein automatisierter SEO-Test statt einer Agentur?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Wenn das Hauptproblem technische Fehler sind (fehlende Meta-Descriptions, langsame Ladezeit, kaputte Canonicals) statt fehlender Content-Strategie oder Backlink-Aufbau. Auch für Freelancer, kleine Unternehmen oder als laufendes Monitoring zwischen Agentur-Zyklen ist ein SEO-Test die günstigere, schnellere Option.',
            },
        },
        {
            '@type': 'Question',
            name: 'Kann ich SEO-Test und Agentur kombinieren?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Das ist in der Praxis die häufigste sinnvolle Kombination: ein automatisierter SEO-Test übernimmt das laufende technische Monitoring zwischen den Terminen, die Agentur oder der Freelancer kümmert sich um Content-Strategie, Backlink-Aufbau und komplexere Optimierungen. So werden technische Probleme sofort sichtbar, statt erst beim nächsten Agentur-Report aufzufallen.',
            },
        },
    ],
}

const AGENTUR_SCOPE = [
    { title: 'Strategie & Content-Planung', desc: 'Keyword-Recherche, Content-Kalender, Themenclustering auf Basis von Wettbewerbsanalyse.' },
    { title: 'Content-Erstellung', desc: 'Texte, Landingpages, manchmal auch Bilder/Grafiken - je nach Paket.' },
    { title: 'Backlink-Aufbau', desc: 'Digital PR, Gastbeiträge, Verzeichnis-Einträge - der Teil, den kein automatisiertes Tool übernehmen kann.' },
    { title: 'Technische Umsetzung', desc: 'Manche Agenturen implementieren Fixes direkt, andere liefern nur Empfehlungen an dein Entwicklerteam.' },
    { title: 'Reporting & Beratung', desc: 'Regelmäßige Calls, Rankings-Reports, strategische Anpassungen.' },
]

const TEST_SCOPE = [
    { title: 'Technische Fehlerdiagnose', desc: 'Meta-Tags, Ladezeit, Core Web Vitals, Alt-Texte, Canonical, Structured Data - automatisch auf mehreren Seiten.' },
    { title: 'GEO-Signale', desc: 'llms.txt, KI-Crawler-Erlaubnis, Schema-Markup für KI-Zitierbarkeit - ein Bereich, den die meisten klassischen Agenturen 2026 noch nicht standardmäßig prüfen.' },
    { title: 'Wiederholbarkeit', desc: 'Nach jedem Deployment in 60 Sekunden erneut prüfbar, ohne neuen Auftrag.' },
    { title: 'Priorisierte Fixes', desc: 'Ab Pro-Plan ein KI-generierter Bericht mit konkreten Handlungsempfehlungen.' },
]

const COMPARISON = [
    ['Kosten pro Monat', 'ab 29 €/Monat (AuditAI Pro)', '500 € - 8.000+ € (Retainer)'],
    ['Setup-Zeit', 'Sofort, ohne Vertragslaufzeit', 'Wochen bis Monate (Onboarding, Strategie)'],
    ['Deckt technische SEO-Fehler ab', 'Ja, automatisiert', 'Ja, meist als Teil des Pakets'],
    ['Deckt GEO/KI-Sichtbarkeit ab', 'Ja, dediziert', 'Selten, hängt stark von der Agentur ab'],
    ['Content-Strategie & Erstellung', 'Nein', 'Ja, oft Kernleistung'],
    ['Backlink-Aufbau', 'Nein (nur Übersicht via SEO Automatisierung)', 'Ja, oft Kernleistung'],
    ['Persönliche Beratung', 'Nein', 'Ja'],
]

export default function SeoTestVsAgenturPage() {
    return (
        <main className="bg-[#05080f] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
                    <Link href="/" className="hover:text-slate-400 transition-colors">AuditAI</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-slate-400 transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-slate-500">SEO-Test vs. Agentur</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-violet-500/15 text-violet-400">
                            SEO
                        </span>
                        <span className="text-xs text-slate-600">26. Juli 2026</span>
                        <span className="text-xs text-slate-600">· 8 min Lesezeit</span>
                        <span className="text-xs text-slate-600">· Aktualisiert am 30. Juli 2026</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        SEO-Test selbst machen oder Agentur beauftragen?
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Die ehrliche Antwort: Es kommt darauf an, was dein eigentliches Problem ist. Ein automatisierter SEO-Test und eine SEO-Agentur lösen unterschiedliche Probleme - hier der Vergleich ohne Verkaufsrhetorik, inklusive echter Preisspannen.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-slate-600">
                        <Link href="/about" className="flex items-center gap-2 hover:text-slate-300 transition-colors">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-white text-[10px] font-bold">F</div>
                            <span>Finn Paustian</span>
                        </Link>
                        <span>·</span>
                        <span>Gründer, AuditAI</span>
                    </div>
                </div>

                <div className="border-t border-white/5 mb-10" />

                <div className="space-y-10 text-slate-300 leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Was eine SEO-Agentur wirklich abdeckt</h2>
                        <p>
                            Eine gute SEO-Agentur macht deutlich mehr als Fehler suchen. Der Wert liegt vor allem in Arbeit, die (noch) niemand automatisieren kann:
                        </p>
                        <div className="space-y-3 mt-5">
                            {AGENTUR_SCOPE.map((s) => (
                                <div key={s.title} className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2" />
                                    <div>
                                        <span className="text-sm font-medium text-white">{s.title}</span>
                                        <span className="text-sm text-slate-500"> - {s.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Was ein automatisierter SEO-Test abdeckt - und was nicht</h2>
                        <p>
                            Ein Tool wie AuditAI ist ein Diagnose-Instrument, keine Ersatz-Agentur. Es findet technische Probleme automatisch und wiederholt - schreibt aber keine Inhalte und baut keine Backlinks auf. Welche Fehler das konkret sind, steht mit Zahlen und Fix-Anleitung in unserem Artikel zu den{' '}
                            <Link href="/blog/seo-test-haeufige-fehler" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">
                                10 häufigsten SEO-Fehlern
                            </Link>.
                        </p>
                        <div className="space-y-3 mt-5">
                            {TEST_SCOPE.map((s) => (
                                <div key={s.title} className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                                    <div>
                                        <span className="text-sm font-medium text-white">{s.title}</span>
                                        <span className="text-sm text-slate-500"> - {s.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">Der Kostenvergleich im Überblick</h2>
                        <div className="overflow-x-auto rounded-2xl border border-white/[0.07]">
                            <table className="w-full text-sm min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <th className="text-left px-5 py-3 text-slate-400 font-semibold">Kriterium</th>
                                        <th className="text-left px-5 py-3 text-amber-400 font-semibold">Automatisierter SEO-Test</th>
                                        <th className="text-left px-5 py-3 text-violet-400 font-semibold">SEO-Agentur</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {COMPARISON.map(([aspect, tool, agency], i) => (
                                        <tr key={i} className="border-b border-white/[0.04] last:border-0">
                                            <td className="px-5 py-3 text-white font-medium">{aspect}</td>
                                            <td className="px-5 py-3 text-slate-300">{tool}</td>
                                            <td className="px-5 py-3 text-slate-300">{agency}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-600 mt-3">
                            Agentur-Preisspannen basieren auf mehreren aktuellen deutschen Marktübersichten für 2026, z.B.{' '}
                            <a href="https://www.seoagentur.de/magazin/was-kostet-seo/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-400 underline underline-offset-2">
                                seoagentur.de: Was kostet SEO 2026? ↗
                            </a>{' '}
                            - deine tatsächlichen Kosten hängen stark von Branche, Wettbewerb und Leistungsumfang ab.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Wann lohnt sich was?</h2>
                        <p>
                            Wenn dein Hauptproblem technische Fehler sind - langsame Ladezeit, fehlende Meta-Descriptions, kaputte Canonicals, mangelnde KI-Sichtbarkeit - ist ein automatisierter SEO-Test fast immer die schnellere und günstigere erste Wahl. Das gilt besonders für Freelancer, kleine Unternehmen und alle, die zuerst wissen wollen, wo sie überhaupt stehen, bevor sie einen größeren Betrag investieren.
                        </p>
                        <p className="mt-4">
                            Eine Agentur wird relevant, sobald es um Content-Strategie, Backlink-Aufbau oder komplexe technische Migrationen geht - Arbeit, die Erfahrung, Kreativität und Ausführung braucht, nicht nur Diagnose.
                        </p>
                        <div className="bg-violet-500/8 border border-violet-500/20 rounded-2xl p-5 mt-5">
                            <p className="text-sm text-violet-300 font-medium mb-1">Die pragmatischste Kombination</p>
                            <p className="text-sm text-slate-400">
                                Viele Websites fahren am besten mit beidem: automatisiertes Monitoring für laufende technische Kontrolle zwischen den Terminen, plus Agentur oder Freelancer für Strategie und Umsetzung. So fallen technische Probleme sofort auf, statt erst beim nächsten Quartals-Report.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Häufige Fragen zu SEO-Test vs. Agentur</h2>
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
                        Erst prüfen, dann entscheiden
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        Bevor du eine Agentur beauftragst, lohnt sich ein kostenloser Check: Vielleicht sind es nur ein paar technische Fehler, die du selbst in 60 Sekunden findest. Start ohne Registrierung, für den vollständigen Report mit allen Scores meldest du dich kostenlos an.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20"
                    >
                        Kostenlosen SEO-Test starten
                    </Link>
                    <div className="mt-3 text-xs text-slate-600">Ohne Registrierung starten · Voller Report kostenlos · 60 Sekunden</div>
                </div>

                {/* Cross-link to sibling posts */}
                <div className="mt-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1 block">Weiterlesen</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                Die besten kostenlosen SEO-Check-Tools 2026
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Falls du erstmal selbst testen willst: 13 Tools im Vergleich, inklusive echter Nutzerbewertungen.
                            </p>
                        </div>
                        <Link
                            href="/blog/beste-seo-check-tools-2026"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] hover:bg-white/10 text-white text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Vergleich lesen
                        </Link>
                    </div>
                </div>

                {/* Back */}
                <div className="mt-10 pt-8 border-t border-white/5">
                    <Link href="/blog" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                        ← Zurück zum Blog
                    </Link>
                </div>

            </article>

            <Footer />
        </main>
    )
}