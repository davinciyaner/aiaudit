import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Die besten kostenlosen SEO-Check-Tools 2026 im Vergleich',
    description: '7 SEO-Check-Tools im Vergleich: kostenlose Version, Funktionsumfang, Limits und wer als einziges auch KI-Sichtbarkeit (GEO) prüft. Mit Entscheidungshilfe.',
    keywords: 'seo analyse kostenlos, seo check tool kostenlos, website audit tool kostenlos, kostenloser seo test, seo tool vergleich',
    alternates: { canonical: 'https://www.sitecheckai.dev/blog/beste-seo-check-tools-2026' },
    openGraph: {
        title: 'Die besten kostenlosen SEO-Check-Tools 2026 im Vergleich',
        description: '7 SEO-Check-Tools im Vergleich - inklusive GEO-Check für KI-Sichtbarkeit.',
        url: 'https://www.sitecheckai.dev/blog/beste-seo-check-tools-2026',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Die besten kostenlosen SEO-Check-Tools 2026 im Vergleich',
    description: '7 SEO-Check-Tools im Vergleich: kostenlose Version, Funktionsumfang, Limits und wer als einziges auch KI-Sichtbarkeit (GEO) prüft.',
    image: 'https://www.sitecheckai.dev/blog/beste-seo-check-tools-2026/opengraph-image',
    datePublished: '2026-07-15T09:00:00+02:00',
    dateModified: '2026-07-15T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/blog/beste-seo-check-tools-2026',
    mainEntityOfPage: 'https://www.sitecheckai.dev/blog/beste-seo-check-tools-2026',
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was ist das beste kostenlose SEO-Check-Tool?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Das hängt vom Bedarf ab. Für einen reinen On-Page-SEO-Check reichen Tools wie Seobility oder SEORCH. Wer zusätzlich Performance und KI-Sichtbarkeit (GEO) in einem Report braucht, findet das aktuell nur bei wenigen Anbietern wie AuditAI - die meisten klassischen SEO-Checker prüfen GEO-Signale wie llms.txt oder KI-Crawler-Erlaubnis noch gar nicht.',
            },
        },
        {
            '@type': 'Question',
            name: 'Reicht ein kostenloses SEO-Tool oder brauche ich eine bezahlte Version?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Für einen einmaligen Check oder eine kleine Website reicht meist die kostenlose Version. Bezahlte Pläne lohnen sich, sobald du mehrere Seiten regelmäßig überwachen, Rankings über Zeit tracken oder mehrere Domains verwalten willst - die kostenlosen Versionen sind fast immer auf einzelne Checks oder wenige Seiten pro Monat limitiert.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist der Unterschied zwischen einem SEO-Checker und einem SEO-Audit-Tool?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ein SEO-Checker prüft meist eine einzelne URL gegen eine feste Liste von On-Page-Faktoren. Ein vollständiges Audit-Tool crawlt mehrere Unterseiten, prüft technische Signale wie Sitemap und robots.txt und liefert häufig einen priorisierten Maßnahmenplan statt nur einer Fehlerliste.',
            },
        },
        {
            '@type': 'Question',
            name: 'Prüfen SEO-Tools auch, ob ich von ChatGPT oder Google AI Overviews empfohlen werde?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Die meisten etablierten SEO-Checker (Stand 2026) nicht - sie wurden für klassisches Google-Ranking gebaut, nicht für GEO (Generative Engine Optimization). Nur wenige Tools prüfen explizit llms.txt-Vorhandensein, KI-Crawler-Erlaubnis in robots.txt und Schema-Markup als Zitierbarkeits-Signal für ChatGPT, Perplexity und Google AI Overviews.',
            },
        },
    ],
}

const CRITERIA = [
    { label: 'Umfang', desc: 'Prüft das Tool nur die Startseite oder mehrere Unterseiten? Für Websites mit mehr als einer Landingpage sind Einzel-URL-Checker schnell unzureichend.' },
    { label: 'Kategorien', desc: 'Reines On-Page-SEO (Title, Meta, H1) oder auch Performance und Mobile-Freundlichkeit?' },
    { label: 'GEO / KI-Sichtbarkeit', desc: 'Prüft das Tool llms.txt, Schema-Markup und ob KI-Crawler wie GPTBot oder ClaudeBot überhaupt zugelassen sind? Das ist 2026 der größte blinde Fleck der meisten Checker.' },
    { label: 'Limits der Gratis-Version', desc: 'Checks pro Tag/Monat, Anzahl geprüfter Seiten, ob ein Report als PDF exportierbar ist.' },
    { label: 'Handlungsempfehlungen', desc: 'Liefert das Tool nur eine Fehlerliste oder priorisierte, konkrete Fixes?' },
]

const TOOLS = [
    {
        name: 'AuditAI',
        tag: 'SEO + Performance + GEO in einem Report',
        tagColor: '#7c3aed',
        free: 'Start ohne Registrierung, für vollen Report kostenloser Account (1 Audit/Monat)',
        scope: 'Bis zu 25 Unterseiten',
        categories: 'SEO, Performance, GEO',
        geo: true,
        note: 'Einziges Tool in diesem Vergleich, das SEO, Performance und GEO-Signale (llms.txt, KI-Crawler-Erlaubnis, Schema für KI-Zitate) in einem einzigen Report zusammenführt. Der Audit selbst läuft ohne Registrierung, für den vollständigen Report mit allen Scores braucht es einen kostenlosen Account. Pro-Plan ergänzt einen KI-generierten Report mit priorisierten Fixes.',
    },
    {
        name: 'Seobility',
        tag: 'Umfangreicher klassischer On-Page-Check',
        tagColor: '#06b6d4',
        free: 'Kostenlos mit Limit, kostenpflichtige Pläne für mehr Seiten',
        scope: 'Mehrere Unterseiten je nach Plan',
        categories: 'SEO, teilweise Performance',
        geo: false,
        note: 'Sehr gründlicher On-Page-Check mit klarer Fehlerpriorisierung. Gut für klassisches SEO, aber kein Blick auf KI-Sichtbarkeit.',
    },
    {
        name: 'SEORCH',
        tag: 'Schneller Rundum-Check ohne Anmeldung',
        tagColor: '#10b981',
        free: 'Komplett kostenlos',
        scope: 'Einzelne URL',
        categories: 'SEO, Core Web Vitals, Mobile',
        geo: false,
        note: 'Deckt viele Faktoren ab und ist ohne Registrierung nutzbar. Kein mehrseitiges Crawling und keine GEO-Signale.',
    },
    {
        name: 'IONOS SEO Check',
        tag: 'Einfacher Einstieg für kleine Websites',
        tagColor: '#f59e0b',
        free: 'Kostenlos',
        scope: 'Einzelne URL',
        categories: 'On-Page SEO, Social-SEO',
        geo: false,
        note: 'Guter Einstiegspunkt, aber eingeschränkt auf Basis-Faktoren. Kein technischer Tiefencheck, keine Sicherheits- oder GEO-Prüfung.',
    },
    {
        name: 'SE Ranking Checker',
        tag: 'SEO-Suite mit KI-Suchtracking als Zusatzmodul',
        tagColor: '#ef4444',
        free: 'Kostenlose Checks mit Tageslimit, Vollzugang kostenpflichtig',
        scope: 'Skalierbar, aber kostenpflichtig',
        categories: 'SEO, Rank-Tracking, teils LLM-Monitoring',
        geo: 'teilweise',
        note: 'Eine der wenigen etablierten Suiten mit Ansätzen für KI-Suchtracking - allerdings meist als separates, kostenpflichtiges Modul und nicht im kostenlosen Basis-Check enthalten.',
    },
    {
        name: 'Ahrefs Webmaster Tools',
        tag: 'Technisches Crawling für die eigene Domain',
        tagColor: '#B07AA1',
        free: 'Kostenlos für verifizierte eigene Website',
        scope: 'Ganze Domain (nach Verifizierung)',
        categories: 'Technisches SEO, Backlinks',
        geo: false,
        note: 'Sehr solides technisches Crawling, erfordert aber Property-Verifizierung. Fokus auf klassisches SEO und Backlinks, keine GEO-Signale.',
    },
    {
        name: 'Semrush Site Audit (Free-Check)',
        tag: 'Bekannteste Suite, Gratis-Check stark limitiert',
        tagColor: '#59A14F',
        free: 'Wenige kostenlose Checks pro Tag',
        scope: 'Begrenzt in der Gratis-Version',
        categories: 'SEO, Performance',
        geo: false,
        note: 'Der volle Funktionsumfang (inkl. eigener AI-Search-Toolkits) liegt hinter einem kostenpflichtigen Plan. Der freie Site-Checker ist ein guter erster Eindruck, aber schnell limitiert.',
    },
]

export default function BesteSeoToolsPage() {
    return (
        <main className="bg-[#05080f] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <Navbar />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
                    <Link href="/" className="hover:text-slate-400 transition-colors">AuditAI</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-slate-400 transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-slate-500">Beste SEO-Check-Tools 2026</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-amber-500/15 text-amber-400">
                            Tools
                        </span>
                        <span className="text-xs text-slate-600">15. Juli 2026</span>
                        <span className="text-xs text-slate-600">· 10 min Lesezeit</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        Die besten kostenlosen SEO-Check-Tools 2026 im Vergleich
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Sieben Tools, ein Kriterium, das die meisten Vergleiche ignorieren: keines davon außer AuditAI prüft, ob deine Website überhaupt für ChatGPT, Perplexity und Google AI Overviews sichtbar ist. Hier der ehrliche Vergleich - inklusive Limits, Funktionsumfang und für wen sich welches Tool wirklich lohnt.
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
                        <h2 className="text-2xl font-bold text-white mb-4">Worauf du bei einem SEO-Check-Tool achten solltest</h2>
                        <p>
                            Die meisten "SEO-Checker" prüfen im Kern dieselben zehn bis fünfzehn On-Page-Faktoren: Title-Tag, Meta-Description, H1, Alt-Texte, Ladezeit. Der Unterschied liegt selten in der Genauigkeit, sondern in fünf Punkten, die bestimmen, ob dir ein Tool wirklich weiterhilft.
                        </p>
                        <div className="space-y-3 mt-5">
                            {CRITERIA.map((c) => (
                                <div key={c.label} className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                                    <div>
                                        <span className="text-sm font-medium text-white">{c.label}</span>
                                        <span className="text-sm text-slate-500"> - {c.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">7 Tools im Vergleich</h2>
                        <div className="overflow-x-auto rounded-2xl border border-white/[0.07]">
                            <table className="w-full text-sm min-w-[640px]">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <th className="text-left px-4 py-3 text-slate-400 font-semibold">Tool</th>
                                        <th className="text-left px-4 py-3 text-slate-400 font-semibold">Gratis-Version</th>
                                        <th className="text-left px-4 py-3 text-slate-400 font-semibold">Kategorien</th>
                                        <th className="text-left px-4 py-3 text-amber-400 font-semibold">GEO-Check</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TOOLS.map((t) => (
                                        <tr key={t.name} className="border-b border-white/[0.04] last:border-0">
                                            <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{t.name}</td>
                                            <td className="px-4 py-3 text-slate-400">{t.free}</td>
                                            <td className="px-4 py-3 text-slate-400">{t.categories}</td>
                                            <td className="px-4 py-3">
                                                {t.geo === true && <span className="text-emerald-400 font-medium">✓ Ja</span>}
                                                {t.geo === false && <span className="text-slate-600">✗ Nein</span>}
                                                {t.geo === 'teilweise' && <span className="text-amber-400">teilweise</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">Die Tools im Detail</h2>
                        <div className="space-y-5">
                            {TOOLS.map((t) => (
                                <div key={t.name} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <h3 className="font-semibold text-white">{t.name}</h3>
                                        <span
                                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                            style={{ background: t.tagColor + '18', color: t.tagColor }}
                                        >
                                            {t.tag}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-3">
                                        <span className="text-slate-400">Umfang:</span> {t.scope}
                                    </p>
                                    <p className="text-sm text-slate-400 leading-relaxed">{t.note}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Warum die meisten Tools GEO nicht prüfen</h2>
                        <p>
                            Die meisten der etablierten SEO-Checker wurden gebaut, lange bevor ChatGPT, Perplexity und Google AI Overviews relevante Trafficquellen wurden. Ihre Check-Listen sind auf klassische Google-Rankingfaktoren zugeschnitten - Title-Tags, Backlinks, Ladezeit. Das ist nicht falsch, aber unvollständig.
                        </p>
                        <p className="mt-4">
                            KI-Sichtbarkeit hängt von anderen Signalen ab: Ist eine <code className="text-xs bg-white/[0.06] px-1.5 py-0.5 rounded">llms.txt</code> vorhanden? Dürfen GPTBot und ClaudeBot laut robots.txt überhaupt crawlen? Steht FAQ-Content nicht nur im JSON-LD, sondern auch sichtbar im HTML? Diese Punkte entscheiden, ob eine KI deine Website als Quelle zitiert - und tauchen in den meisten kostenlosen SEO-Checks schlicht nicht auf.
                        </p>
                        <div className="bg-amber-500/8 border border-amber-500/20 rounded-2xl p-5 mt-5">
                            <p className="text-sm text-amber-300 font-medium mb-1">Der praktische Unterschied</p>
                            <p className="text-sm text-slate-400">
                                Eine Website kann bei Google auf Seite 1 stehen und trotzdem in ChatGPT-Antworten komplett unsichtbar sein - weil KI-Crawler in der robots.txt blockiert sind. Ein klassischer SEO-Check findet dieses Problem nicht, weil er nicht danach sucht.
                            </p>
                        </div>
                        <p className="mt-4">
                            Mehr zu den konkreten GEO-Signalen und wie du sie selbst prüfst: <Link href="/blog/geo-optimierung-2026" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">GEO-Optimierung 2026</Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Wie du das richtige Tool für dich auswählst</h2>
                        <p>
                            Für einen schnellen, einmaligen On-Page-Check reicht ein einfacher Gratis-Checker wie SEORCH oder IONOS. Betreust du eine Website mit mehreren Unterseiten und willst technische Fehler und GEO-Signale in einem Durchgang sehen, lohnt sich ein Tool, das mehrseitig crawlt statt nur eine URL zu prüfen.
                        </p>
                        <p className="mt-4">
                            Die praktischste erste Frage: Willst du nur wissen, ob deine Website für Google okay aussieht - oder auch, ob sie für KI-Suchsysteme sichtbar ist? Für Ersteres reicht fast jedes Tool aus dieser Liste. Für Zweiteres bleiben aktuell nur sehr wenige Optionen.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Häufige Fragen zu SEO-Check-Tools</h2>
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
                        SEO, Performance und GEO in einem Report
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        AuditAI prüft alle drei Bereiche in unter 60 Sekunden - inklusive llms.txt, KI-Crawler-Erlaubnis und Schema für KI-Zitate. Start ohne Registrierung, für den vollständigen Report mit allen Scores meldest du dich kostenlos an.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-violet-600 hover:from-amber-400 hover:to-violet-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/20"
                    >
                        Kostenlosen Audit starten
                    </Link>
                    <div className="mt-3 text-xs text-slate-600">Ohne Registrierung starten · Voller Report kostenlos · 60 Sekunden</div>
                </div>

                {/* Cross-link to sibling posts */}
                <div className="mt-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1 block">Weiterlesen</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                SEO-Checkliste 2026: In 15 Minuten alle Fehler selbst finden
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Statt ein Tool zu wählen, kannst du auch selbst prüfen: 6 Phasen, 24 Punkte zum Abhaken.
                            </p>
                        </div>
                        <Link
                            href="/blog/seo-checkliste-2026"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] hover:bg-white/10 text-white text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Checkliste öffnen
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
