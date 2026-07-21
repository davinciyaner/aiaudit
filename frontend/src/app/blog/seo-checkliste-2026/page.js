import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'SEO-Checkliste 2026: In 15 Minuten alle Fehler selbst finden',
    description: 'Die komplette SEO-Checkliste 2026 zum Abhaken: 6 Phasen, 15 Minuten, alle wichtigen SEO- und GEO-Signale. Selbst prüfen oder automatisch mit AuditAI checken.',
    keywords: 'seo checkliste 2026, seo checkliste, seo fehler checkliste, seo fehler finden, technische seo checkliste, seo test kostenlos',
    alternates: { canonical: 'https://www.sitecheckai.dev/blog/seo-checkliste-2026' },
    openGraph: {
        title: 'SEO-Checkliste 2026: In 15 Minuten alle Fehler selbst finden',
        description: '6 Phasen, 15 Minuten, alle wichtigen SEO- und GEO-Signale zum Abhaken.',
        url: 'https://www.sitecheckai.dev/blog/seo-checkliste-2026',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SEO-Checkliste 2026: In 15 Minuten alle Fehler selbst finden',
    description: 'Die komplette SEO-Checkliste 2026 zum Abhaken: 6 Phasen, 15 Minuten, alle wichtigen SEO- und GEO-Signale.',
    image: 'https://www.sitecheckai.dev/blog/seo-checkliste-2026/opengraph-image',
    datePublished: '2026-07-15',
    dateModified: '2026-07-15',
    author: { '@type': 'Person', name: 'Finn Paustian' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/blog/seo-checkliste-2026',
    mainEntityOfPage: 'https://www.sitecheckai.dev/blog/seo-checkliste-2026',
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was gehört in eine SEO-Checkliste 2026?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Eine vollständige SEO-Checkliste 2026 deckt sechs Bereiche ab: Crawlability & Indexierung, Meta-Grundlagen (Title, Description, Headings), Ladezeit & Core Web Vitals, Content & interne Struktur, technisches Vertrauen (HTTPS, Security-Header, defekte Links) sowie GEO-Signale für KI-Sichtbarkeit (llms.txt, Schema.org, KI-Crawler-Erlaubnis).',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie lange dauert eine SEO-Checkliste?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Der manuelle Self-Check in diesem Artikel dauert etwa 15 Minuten für eine einzelne Seite - vorausgesetzt du hast Zugriff auf Google Search Console und PageSpeed Insights. Für eine komplette Website mit mehreren Unterseiten empfiehlt sich ein automatisiertes Tool, das alle Punkte in unter 60 Sekunden prüft.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist der Unterschied zwischen dieser Checkliste und den 10 häufigsten SEO-Fehlern?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Der Artikel zu den 10 häufigsten SEO-Fehlern erklärt, warum bestimmte Probleme Rankings kosten und wie du sie behebst. Diese Checkliste ist der praktische Ablauf dazu - eine Reihenfolge zum Abhaken, mit der du in 15 Minuten selbst herausfindest, welche dieser Fehler auf deiner eigenen Seite vorkommen.',
            },
        },
        {
            '@type': 'Question',
            name: 'Reicht eine manuelle SEO-Checkliste oder brauche ich ein Tool?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Für eine einzelne Seite reicht die manuelle Checkliste. Sobald du mehrere Seiten, regelmäßige Deployments oder mehrere Domains betreust, wird der manuelle Aufwand schnell unrealistisch. Ein automatisierter SEO-Test wie AuditAI prüft dieselben Punkte auf bis zu 25 Unterseiten gleichzeitig - inklusive GEO-Signalen, die in klassischen Checklisten oft fehlen.',
            },
        },
    ],
}

const PHASES = [
    {
        number: '01',
        title: 'Crawlability & Indexierung',
        time: '2 Min',
        color: '#7c3aed',
        items: [
            { label: 'robots.txt blockiert keine wichtigen Seiten', hint: 'deinedomain.de/robots.txt öffnen und auf ungewollte "Disallow"-Zeilen prüfen' },
            { label: 'Keine versehentliche noindex-Direktive', hint: 'Seitenquelltext nach <meta name="robots" content="noindex"> durchsuchen' },
            { label: 'XML-Sitemap ist aktuell und bei Google eingereicht', hint: 'Google Search Console → Sitemaps' },
            { label: 'Keine Crawling-Fehler in der Search Console', hint: 'Search Console → Seiten → Nicht indexiert' },
        ],
    },
    {
        number: '02',
        title: 'Meta-Grundlagen',
        time: '3 Min',
        color: '#7c3aed',
        items: [
            { label: 'Title-Tag ist einzigartig und 50-60 Zeichen lang', hint: 'Haupt-Keyword möglichst am Anfang' },
            { label: 'Meta-Description vorhanden (120-160 Zeichen)', hint: 'Jede Seite braucht eine eigene, keine Duplikate' },
            { label: 'Genau ein H1-Tag pro Seite', hint: 'Enthält das primäre Keyword der Seite' },
            { label: 'Heading-Hierarchie ist sauber (H2 vor H3 vor H4)', hint: 'Keine Ebene wird übersprungen' },
        ],
    },
    {
        number: '03',
        title: 'Ladezeit & Core Web Vitals',
        time: '3 Min',
        color: '#f59e0b',
        items: [
            { label: 'PageSpeed-Insights-Score über 80 (mobil)', hint: 'pagespeed.web.dev mit der eigenen URL testen' },
            { label: 'LCP unter 2,5 Sekunden', hint: 'Largest Contentful Paint - größter sichtbarer Inhalt' },
            { label: 'Bilder sind komprimiert und im WebP-Format', hint: 'Besonders Hero-Bilder und Produktbilder prüfen' },
            { label: 'Seite besteht den Mobile-Friendly-Test', hint: 'search.google.com/test/mobile-friendly' },
        ],
    },
    {
        number: '04',
        title: 'Content & interne Struktur',
        time: '3 Min',
        color: '#10b981',
        items: [
            { label: 'Wichtige Seiten haben mindestens 300 Wörter', hint: 'Landingpages und Blogartikel eher 800+' },
            { label: 'Jede Seite hat mindestens 2-3 interne Links', hint: 'Von und zu thematisch verwandten Seiten' },
            { label: 'Kein Duplicate Content zwischen Unterseiten', hint: 'Besonders bei Produkt- oder Standortseiten prüfen' },
            { label: 'Canonical-Tag ist korrekt gesetzt', hint: 'Self-referencing, außer bei bewussten Duplikaten' },
        ],
    },
    {
        number: '05',
        title: 'Technisches Vertrauen & Security',
        time: '2 Min',
        color: '#ef4444',
        items: [
            { label: 'HTTPS ist aktiv, HTTP leitet automatisch weiter', hint: 'Schloss-Symbol im Browser prüfen' },
            { label: 'HSTS-Header ist gesetzt', hint: 'Strict-Transport-Security in den Response-Headern' },
            { label: 'Keine defekten internen Links oder 404-Seiten', hint: 'Wichtigste Klickpfade manuell durchklicken' },
            { label: 'Impressum und Datenschutzerklärung sind erreichbar', hint: 'E-E-A-T-Signal, besonders für Google und KI-Modelle' },
        ],
    },
    {
        number: '06',
        title: 'GEO-Bonus-Check: KI-Sichtbarkeit',
        time: '2 Min',
        color: '#06b6d4',
        items: [
            { label: 'llms.txt existiert im Root-Verzeichnis', hint: 'deinedomain.de/llms.txt mit kurzer Produktbeschreibung' },
            { label: 'Organization- und FAQPage-Schema sind eingebunden', hint: 'JSON-LD im Head, mit Rich-Results-Test von Google prüfen' },
            { label: 'GPTBot, ClaudeBot & PerplexityBot sind in robots.txt erlaubt', hint: 'Viele Websites blockieren KI-Crawler unabsichtlich' },
            { label: 'FAQ-Inhalte stehen auch sichtbar im HTML', hint: 'Nicht nur im JSON-LD - KI-Modelle scrapen sichtbaren Text' },
        ],
    },
]

export default function SeoChecklistePage() {
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
                    <span className="text-slate-500">SEO-Checkliste 2026</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-violet-500/15 text-violet-400">
                            SEO
                        </span>
                        <span className="text-xs text-slate-600">15. Juli 2026</span>
                        <span className="text-xs text-slate-600">· 7 min Lesezeit</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        SEO-Checkliste 2026: In 15 Minuten alle Fehler selbst finden
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Keine Erklärungen, kein Drumherum - nur die Reihenfolge, in der du deine eigene Website in 15 Minuten selbst durchprüfst. Sechs Phasen, 24 Punkte zum Abhaken, inklusive der GEO-Signale die klassische Checklisten meistens vergessen.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-slate-600">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-white text-[10px] font-bold">F</div>
                        <span>Finn Paustian</span>
                        <span>·</span>
                        <span>Gründer, AuditAI</span>
                    </div>
                </div>

                <div className="border-t border-white/5 mb-10" />

                <div className="space-y-10 text-slate-300 leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Warum eine Checkliste statt einer Erklärung?</h2>
                        <p>
                            In unserem Artikel über die <Link href="/blog/seo-test-haeufige-fehler" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">10 häufigsten SEO-Fehler</Link> erklären wir, warum einzelne Probleme Rankings kosten. Diese Checkliste geht den umgekehrten Weg: keine Theorie, sondern eine feste Reihenfolge zum Abhaken - so wie wir sie selbst vor jedem größeren Deployment durchgehen.
                        </p>
                        <p className="mt-4">
                            Die sechs Phasen sind bewusst nach Aufwand sortiert: Was am schnellsten geht, kommt zuerst. Wenn du nur 5 Minuten hast, mach zumindest Phase 1 und 2 - das sind die Punkte mit dem größten Hebel pro investierter Minute.
                        </p>
                        <div className="bg-violet-500/8 border border-violet-500/20 rounded-2xl p-5 mt-5">
                            <p className="text-sm text-violet-300 font-medium mb-1">Was du brauchst</p>
                            <p className="text-sm text-slate-400">
                                Zugriff auf Google Search Console, den Seitenquelltext (Rechtsklick → "Seitenquelltext anzeigen") und pagespeed.web.dev. Für alle sechs Phasen ohne manuelles Nachschauen: ein automatisierter SEO-Test.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-2">Die Checkliste: 6 Phasen, 24 Punkte</h2>
                        <p className="text-slate-400 mb-6">Von oben nach unten durcharbeiten - jede Phase baut auf der vorherigen auf.</p>
                        <div className="space-y-5">
                            {PHASES.map((phase) => (
                                <div key={phase.number} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-[11px] font-bold font-mono shrink-0 text-slate-600">{phase.number}</span>
                                        <h3 className="font-semibold text-white flex-1">{phase.title}</h3>
                                        <span
                                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                                            style={{ background: phase.color + '18', color: phase.color }}
                                        >
                                            {phase.time}
                                        </span>
                                    </div>
                                    <div className="space-y-2.5">
                                        {phase.items.map((item, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div
                                                    className="w-4 h-4 rounded border shrink-0 mt-0.5"
                                                    style={{ borderColor: phase.color + '60' }}
                                                />
                                                <div>
                                                    <span className="text-sm text-slate-200">{item.label}</span>
                                                    <span className="block text-xs text-slate-500 mt-0.5">{item.hint}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Was tun, wenn du Fehler findest?</h2>
                        <p>
                            Priorisiere nach Phase, nicht nach Anzahl. Ein fehlender Title-Tag (Phase 2) wiegt schwerer als drei fehlende Alt-Texte (Phase 4). Behebe Phase 1 und 2 immer zuerst - ohne saubere Indexierung und Meta-Daten bringt der Rest wenig.
                        </p>
                        <p className="mt-4">
                            Für die konkrete Begründung und Fix-Anleitung zu den häufigsten Problemen aus Phase 2 und 3 lohnt sich ein Blick in unseren Artikel zu den <Link href="/blog/seo-test-haeufige-fehler" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">10 häufigsten SEO-Fehlern</Link> - dort erklären wir jeden Punkt mit Zahlen und Fix im Detail.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Häufige Fragen zur SEO-Checkliste</h2>
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
                        Phase 1, 2, 3, 4 & 6 in 60 Sekunden statt 13 Minuten
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        AuditAI deckt Crawlability, Meta-Daten, Core Web Vitals, Content-Struktur und GEO-Signale automatisch ab - auf bis zu 25 Unterseiten gleichzeitig. Nur Phase 5 (Security-Header) prüfst du aktuell noch manuell. Start ohne Registrierung, für den vollständigen Report mit allen Scores meldest du dich kostenlos an.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20"
                    >
                        SEO-Test jetzt starten
                    </Link>
                    <div className="mt-3 text-xs text-slate-600">Ohne Registrierung starten · Voller Report kostenlos · 60 Sekunden</div>
                </div>

                {/* Cross-link to sibling post */}
                <div className="mt-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1 block">Weiterlesen</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                Die 10 häufigsten SEO-Fehler im Detail
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Warum genau kosten fehlende Meta-Descriptions oder ein falscher H1 Rankings? Mit Zahlen, Beispielen und konkreter Fix-Anleitung zu jedem Punkt.
                            </p>
                        </div>
                        <Link
                            href="/blog/seo-test-haeufige-fehler"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] hover:bg-white/10 text-white text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Artikel lesen
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
