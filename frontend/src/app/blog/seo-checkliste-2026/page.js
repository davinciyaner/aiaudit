import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ArticleSources from '../../components/site/ArticleSources'

export const metadata = {
    title: 'SEO-Checkliste 2026: Alle Fehler in 15 Minuten finden',
    description: 'Die komplette SEO-Checkliste 2026: 6 Phasen, 15 Minuten, alle wichtigen SEO- und GEO-Signale. Selbst prüfen oder automatisch mit Scanora checken.',
    keywords: 'seo checkliste 2026, seo checkliste, seo fehler checkliste, seo fehler finden, technische seo checkliste, seo test kostenlos',
    alternates: {
        canonical: 'https://www.scanora.ai/blog/seo-checkliste-2026',
        languages: {
            'de-DE': 'https://www.scanora.ai/blog/seo-checkliste-2026',
            'en-US': 'https://www.scanora.ai/en/blog/seo-checklist-2026',
        },
    },
    openGraph: {
        title: 'SEO-Checkliste 2026: In 15 Minuten alle Fehler selbst finden',
        description: '6 Phasen, 15 Minuten, alle wichtigen SEO- und GEO-Signale in fester Reihenfolge.',
        url: 'https://www.scanora.ai/blog/seo-checkliste-2026',
        type: 'article',
        locale: 'de_DE',
        images: ['https://www.scanora.ai/blog/seo-checkliste-2026/opengraph-image'],
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SEO-Checkliste 2026: In 15 Minuten alle Fehler selbst finden',
    description: 'Die komplette SEO-Checkliste 2026 in fester Reihenfolge: 6 Phasen, 15 Minuten, alle wichtigen SEO- und GEO-Signale.',
    image: 'https://www.scanora.ai/blog/seo-checkliste-2026/opengraph-image',
    datePublished: '2026-07-15T09:00:00+02:00',
    dateModified: '2026-07-30T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.scanora.ai/about' },
    publisher: {
        '@type': 'Organization',
        name: 'Scanora',
        url: 'https://www.scanora.ai',
        logo: { '@type': 'ImageObject', url: 'https://www.scanora.ai/logo', width: 512, height: 512 },
    },
    url: 'https://www.scanora.ai/blog/seo-checkliste-2026',
    mainEntityOfPage: 'https://www.scanora.ai/blog/seo-checkliste-2026',
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.scanora.ai/blog' },
        { '@type': 'ListItem', position: 3, name: 'SEO-Checkliste 2026', item: 'https://www.scanora.ai/blog/seo-checkliste-2026' },
    ],
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
                text: 'Der Artikel zu den 10 häufigsten SEO-Fehlern erklärt, warum bestimmte Probleme Rankings kosten und wie du sie behebst. Diese Checkliste ist der praktische Ablauf dazu - eine feste Reihenfolge, mit der du in 15 Minuten selbst herausfindest, welche dieser Fehler auf deiner eigenen Seite vorkommen.',
            },
        },
        {
            '@type': 'Question',
            name: 'Reicht eine manuelle SEO-Checkliste oder brauche ich ein Tool?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Für eine einzelne Seite reicht die manuelle Checkliste. Sobald du mehrere Seiten, regelmäßige Deployments oder mehrere Domains betreust, wird der manuelle Aufwand schnell unrealistisch. Ein automatisierter SEO-Test wie Scanora prüft dieselben Punkte auf bis zu 25 Unterseiten gleichzeitig - inklusive GEO-Signalen, die in klassischen Checklisten oft fehlen.',
            },
        },
    ],
}

const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'SEO-Checkliste 2026: Die eigene Website in 6 Phasen selbst prüfen',
    description: 'Sechs Phasen, 24 Punkte, feste Reihenfolge - vom größten Hebel pro Minute bis zum GEO-Bonus-Check.',
    totalTime: 'PT15M',
    step: [
        { '@type': 'HowToStep', name: 'Crawlability & Indexierung', text: 'robots.txt, noindex-Direktiven, XML-Sitemap und Crawling-Fehler in der Search Console prüfen.', url: 'https://www.scanora.ai/blog/seo-checkliste-2026#phase-01' },
        { '@type': 'HowToStep', name: 'Meta-Grundlagen', text: 'Title-Tag, Meta-Description, H1-Tag und Heading-Hierarchie prüfen.', url: 'https://www.scanora.ai/blog/seo-checkliste-2026#phase-02' },
        { '@type': 'HowToStep', name: 'Ladezeit & Core Web Vitals', text: 'PageSpeed-Score, LCP, Bildkomprimierung und Mobile-Friendly-Test prüfen.', url: 'https://www.scanora.ai/blog/seo-checkliste-2026#phase-03' },
        { '@type': 'HowToStep', name: 'Content & interne Struktur', text: 'Wortanzahl, interne Links, Duplicate Content und Canonical-Tag prüfen.', url: 'https://www.scanora.ai/blog/seo-checkliste-2026#phase-04' },
        { '@type': 'HowToStep', name: 'Technisches Vertrauen & Security', text: 'HTTPS, HSTS-Header, defekte Links, Impressum und Datenschutzerklärung prüfen.', url: 'https://www.scanora.ai/blog/seo-checkliste-2026#phase-05' },
        { '@type': 'HowToStep', name: 'GEO-Bonus-Check: KI-Sichtbarkeit', text: 'llms.txt, Organization- und FAQPage-Schema sowie KI-Crawler-Erlaubnis in robots.txt prüfen.', url: 'https://www.scanora.ai/blog/seo-checkliste-2026#phase-06' },
    ],
}

const PHASES = [
    {
        number: '01',
        title: 'Crawlability & Indexierung',
        time: '2 Min',
        color: 'var(--accent)',
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
        color: 'var(--accent)',
        items: [
            { label: 'Title-Tag ist einzigartig und 50-60 Zeichen lang', hint: 'Haupt-Keyword möglichst am Anfang' },
            { label: 'Meta-Description vorhanden (120-160 Zeichen)', hint: 'Jede Seite braucht eine eigene, keine Duplikate' },
            { label: 'Genau ein H1-Tag pro Seite', hint: 'Enthält das primäre Keyword der Seite' },
            { label: 'Heading-Hierarchie ist sauber (H2 vor H3 vor H4)', hint: 'Keine Ebene wird übersprungen' },
        ],
        source: { label: 'Google Search Central: Title-Links', url: 'https://developers.google.com/search/docs/appearance/title-link' },
    },
    {
        number: '03',
        title: 'Ladezeit & Core Web Vitals',
        time: '3 Min',
        color: 'var(--warning)',
        items: [
            { label: 'PageSpeed-Insights-Score über 80 (mobil)', hint: 'pagespeed.web.dev mit der eigenen URL testen' },
            { label: 'LCP unter 2,5 Sekunden', hint: 'Largest Contentful Paint - größter sichtbarer Inhalt' },
            { label: 'Bilder sind komprimiert und im WebP-Format', hint: 'Besonders Hero-Bilder und Produktbilder prüfen' },
            { label: 'Seite besteht den Mobile-Friendly-Test', hint: 'search.google.com/test/mobile-friendly' },
        ],
        source: { label: 'Google Search Central: Core Web Vitals', url: 'https://developers.google.com/search/docs/appearance/core-web-vitals' },
        internalLink: { label: 'LCP, INP & CLS im Detail erklärt', href: '/blog/core-web-vitals-testen' },
    },
    {
        number: '04',
        title: 'Content & interne Struktur',
        time: '3 Min',
        color: 'var(--success)',
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
        color: 'var(--danger)',
        items: [
            { label: 'HTTPS ist aktiv, HTTP leitet automatisch weiter', hint: 'Schloss-Symbol im Browser prüfen' },
            { label: 'HSTS-Header ist gesetzt', hint: 'Strict-Transport-Security in den Response-Headern' },
            { label: 'Keine defekten internen Links oder 404-Seiten', hint: 'Wichtigste Klickpfade manuell durchklicken' },
            { label: 'Impressum und Datenschutzerklärung sind erreichbar', hint: 'E-E-A-T-Signal, besonders für Google und KI-Modelle' },
        ],
        source: { label: 'Google Search Central Blog: HTTPS as a ranking signal', url: 'https://developers.google.com/search/blog/2014/08/https-as-ranking-signal' },
    },
    {
        number: '06',
        title: 'GEO-Bonus-Check: KI-Sichtbarkeit',
        time: '2 Min',
        color: 'var(--accent)',
        items: [
            { label: 'llms.txt existiert im Root-Verzeichnis', hint: 'deinedomain.de/llms.txt mit kurzer Produktbeschreibung' },
            { label: 'Organization- und FAQPage-Schema sind eingebunden', hint: 'JSON-LD im Head, mit Rich-Results-Test von Google prüfen' },
            { label: 'GPTBot, ClaudeBot & PerplexityBot sind in robots.txt erlaubt', hint: 'Viele Websites blockieren KI-Crawler unabsichtlich' },
            { label: 'FAQ-Inhalte stehen auch sichtbar im HTML', hint: 'Nicht nur im JSON-LD - KI-Modelle scrapen sichtbaren Text' },
        ],
    },
]

const SOURCES = [
    {
        "label": "SEO-Leitfaden für Einsteiger",
        "publisher": "Google Search Central",
        "href": "https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
    },
    {
        "label": "Google Search Essentials",
        "publisher": "Google Search Central",
        "href": "https://developers.google.com/search/docs/essentials"
    },
    {
        "label": "Titellinks in der Google-Suche",
        "publisher": "Google Search Central",
        "href": "https://developers.google.com/search/docs/appearance/title-link"
    },
    {
        "label": "Snippets und Meta Descriptions",
        "publisher": "Google Search Central",
        "href": "https://developers.google.com/search/docs/appearance/snippet"
    },
    {
        "label": "Doppelte URLs mit Canonical konsolidieren",
        "publisher": "Google Search Central",
        "href": "https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls"
    },
    {
        "label": "Best Practices für Bilder",
        "publisher": "Google Search Central",
        "href": "https://developers.google.com/search/docs/appearance/google-images"
    },
    {
        "label": "Core Web Vitals und Google-Suchergebnisse",
        "publisher": "Google Search Central",
        "href": "https://developers.google.com/search/docs/appearance/core-web-vitals"
    }
]

export default function SeoChecklistePage() {
    return (
        <main className="bg-(--bg-base) min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar />

            <article className="max-w-190 mx-auto px-4 sm:px-8 pt-28 md:pt-34 pb-18 md:pb-28">

                {/* Breadcrumb */}
                <div className="flex flex-wrap items-center gap-2 text-sm text-(--text-muted) mb-8">
                    <Link href="/" className="hover:text-(--accent-ink) transition-colors">Scanora</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-(--accent-ink) transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-(--text-faint)">SEO-Checkliste 2026</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-(--accent-soft) text-(--accent-ink)">
                            SEO
                        </span>
                        <span className="text-xs text-(--text-faint)">15. Juli 2026</span>
                        <span className="text-xs text-(--text-faint)">· 7 min Lesezeit</span>
                        <span className="text-xs text-(--text-faint)">· Aktualisiert am 30. Juli 2026</span>
                    </div>
                    <h1 className="text-[clamp(34px,4.4vw,52px)] font-bold text-(--text-white) leading-[1.06] tracking-[-0.035em] mb-5">
                        SEO-Checkliste 2026: In 15 Minuten alle Fehler selbst finden
                    </h1>
                    <p className="text-lg text-(--text-body) leading-relaxed">
                        Keine Erklärungen, kein Drumherum - nur die Reihenfolge, in der du deine eigene Website in 15 Minuten selbst durchprüfst. Sechs Phasen, 24 Punkte, inklusive der GEO-Signale die klassische Checklisten meistens vergessen.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-(--text-faint)">
                        <Link href="/about" className="flex items-center gap-2 hover:text-(--text-body) transition-colors">
                            <div className="w-6 h-6 rounded-full bg-(--accent) flex items-center justify-center text-(--on-accent) text-[10px] font-bold">F</div>
                            <span>Finn Paustian</span>
                        </Link>
                        <span>·</span>
                        <span>Gründer, Scanora</span>
                    </div>
                </div>

                <div className="border-t border-(--line) mb-10" />

                <div className="space-y-10 text-(--text-body) leading-relaxed">

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Warum eine Checkliste statt einer Erklärung?</h2>
                        <p>
                            In unserem Artikel über die <Link href="/blog/seo-test-haeufige-fehler" className="text-(--accent-ink) hover:text-(--accent-ink) underline underline-offset-2">10 häufigsten SEO-Fehler</Link> erklären wir, warum einzelne Probleme Rankings kosten. Diese Checkliste geht den umgekehrten Weg: keine Theorie, sondern eine feste Reihenfolge - so wie wir sie selbst vor jedem größeren Deployment durchgehen.
                        </p>
                        <p className="mt-4">
                            Die sechs Phasen sind bewusst nach Aufwand sortiert: Was am schnellsten geht, kommt zuerst. Wenn du nur 5 Minuten hast, mach zumindest Phase 1 und 2 - das sind die Punkte mit dem größten Hebel pro investierter Minute.
                        </p>
                        <div className="bg-(--accent-soft) border border-(--accent-border) rounded-2xl p-5 mt-5">
                            <p className="text-sm text-(--accent-ink) font-medium mb-1">Was du brauchst</p>
                            <p className="text-sm text-(--text-muted)">
                                Zugriff auf Google Search Console, den Seitenquelltext (Rechtsklick → "Seitenquelltext anzeigen") und pagespeed.web.dev. Für alle sechs Phasen ohne manuelles Nachschauen: ein automatisierter SEO-Test.
                            </p>
                        </div>
                    </section>

                    <nav aria-label="Inhaltsverzeichnis" className="bg-(--card) border border-(--line) rounded-2xl p-5 sm:p-6">
                        <p className="text-xs font-semibold text-(--text-faint) mb-3">In diesem Artikel</p>
                        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            {PHASES.map((phase) => (
                                <li key={phase.number}>
                                    <a href={`#phase-${phase.number}`} className="text-(--text-muted) hover:text-(--accent-ink) transition-colors">
                                        <span className="font-mono text-(--text-faint) mr-1.5">{phase.number}</span>{phase.title}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a href="#was-tun" className="text-(--text-muted) hover:text-(--accent-ink) transition-colors">Was tun, wenn du Fehler findest?</a>
                            </li>
                            <li>
                                <a href="#faq" className="text-(--text-muted) hover:text-(--accent-ink) transition-colors">Häufige Fragen</a>
                            </li>
                        </ol>
                    </nav>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-2">Die Checkliste: 6 Phasen, 24 Punkte</h2>
                        <p className="text-(--text-muted) mb-6">Von oben nach unten durcharbeiten - jede Phase baut auf der vorherigen auf.</p>
                        <figure className="mb-6">
                            <Image
                                src="/blog/auditai-seo-checks.png"
                                alt="Scanora Check-Grid zeigt bestandene und fehlgeschlagene Punkte wie Title-Tag, Meta Description, H1-Tag und Alt-Texte"
                                width={910}
                                height={103}
                                className="w-full h-auto rounded-2xl border border-(--line)"
                            />
                            <figcaption className="text-xs text-(--text-faint) mt-2">
                                Genau diese Art von Punkten prüft Scanora automatisch - grün bestanden, rot mit konkretem Fehlergrund.
                            </figcaption>
                        </figure>
                        <div className="space-y-5">
                            {PHASES.map((phase) => (
                                <div key={phase.number} id={`phase-${phase.number}`} className="bg-(--card) border border-(--line) rounded-2xl p-5 sm:p-6 scroll-mt-28">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-[11px] font-bold font-mono shrink-0 text-(--text-faint)">{phase.number}</span>
                                        <h3 className="font-semibold text-(--text-white) flex-1">{phase.title}</h3>
                                        <span
                                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                                            style={{ background: `color-mix(in oklch, ${phase.color} 9%, transparent)`, color: phase.color }}
                                        >
                                            {phase.time}
                                        </span>
                                    </div>
                                    <div className="space-y-2.5">
                                        {phase.items.map((item, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div
                                                    className="w-4 h-4 rounded border shrink-0 mt-0.5"
                                                    style={{ borderColor: `color-mix(in oklch, ${phase.color} 38%, transparent)` }}
                                                />
                                                <div>
                                                    <span className="text-sm text-(--text-body)">{item.label}</span>
                                                    <span className="block text-xs text-(--text-faint) mt-0.5">{item.hint}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {phase.source && (
                                        <a
                                            href={phase.source.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 inline-block text-xs text-(--text-faint) hover:text-(--text-muted) underline underline-offset-2 transition-colors"
                                        >
                                            Quelle: {phase.source.label} ↗
                                        </a>
                                    )}
                                    {phase.internalLink && (
                                        <Link
                                            href={phase.internalLink.href}
                                            className="mt-4 ml-4 inline-block text-xs text-(--accent-ink) hover:text-(--accent-ink) underline underline-offset-2 transition-colors"
                                        >
                                            {phase.internalLink.label} →
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="was-tun" className="scroll-mt-28">
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Was tun, wenn du Fehler findest?</h2>
                        <p>
                            Priorisiere nach Phase, nicht nach Anzahl. Ein fehlender Title-Tag (Phase 2) wiegt schwerer als drei fehlende Alt-Texte (Phase 4). Behebe Phase 1 und 2 immer zuerst - ohne saubere Indexierung und Meta-Daten bringt der Rest wenig.
                        </p>
                        <p className="mt-4">
                            Für die konkrete Begründung und Fix-Anleitung zu den häufigsten Problemen aus Phase 2 und 3 lohnt sich ein Blick in unseren Artikel zu den <Link href="/blog/seo-test-haeufige-fehler" className="text-(--accent-ink) hover:text-(--accent-ink) underline underline-offset-2">10 häufigsten SEO-Fehlern</Link> - dort erklären wir jeden Punkt mit Zahlen und Fix im Detail.
                        </p>
                    </section>

                    <section id="faq" className="scroll-mt-28">
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Häufige Fragen zur SEO-Checkliste</h2>
                        <div className="space-y-4">
                            {faqLd.mainEntity.map((faq, i) => (
                                <div key={i} className="bg-(--card) border border-(--line) rounded-2xl p-5">
                                    <h3 className="font-semibold text-(--text-white) mb-2 text-sm">{faq.name}</h3>
                                    <p className="text-sm text-(--text-muted) leading-relaxed">{faq.acceptedAnswer.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* CTA */}
                <div className="mt-14 bg-(--tint) border border-(--line) rounded-2xl p-6 sm:p-8 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-(--text-white) mb-3">
                        Phase 1, 2, 3, 4 & 6 in 60 Sekunden statt 13 Minuten
                    </h2>
                    <p className="text-(--text-muted) text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        Scanora deckt Crawlability, Meta-Daten, Core Web Vitals, Content-Struktur und GEO-Signale automatisch ab - auf bis zu 25 Unterseiten gleichzeitig. Nur Phase 5 (Security-Header) prüfst du aktuell noch manuell. Start ohne Registrierung, für den vollständigen Report mit allen Scores meldest du dich kostenlos an.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-(--accent) hover:bg-(--accent) hover:text-(--on-accent) text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-(--accent-border)"
                    >
                        SEO-Test jetzt starten
                    </Link>
                    <div className="mt-3 text-xs text-(--text-faint)">Ohne Registrierung starten · Voller Report kostenlos · 60 Sekunden</div>
                </div>

                {/* Cross-link to sibling post */}
                <div className="mt-5 bg-(--card) border border-(--line) rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-(--accent-ink) mb-1 block">Weiterlesen</span>
                            <h3 className="text-base sm:text-lg font-bold text-(--text-white) mb-2">
                                Die 10 häufigsten SEO-Fehler im Detail
                            </h3>
                            <p className="text-(--text-muted) text-sm leading-relaxed max-w-md">
                                Warum genau kosten fehlende Meta-Descriptions oder ein falscher H1 Rankings? Mit Zahlen, Beispielen und konkreter Fix-Anleitung zu jedem Punkt.
                            </p>
                        </div>
                        <Link
                            href="/blog/seo-test-haeufige-fehler"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--tint) hover:bg-(--tint) text-(--text-white) text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Artikel lesen
                        </Link>
                    </div>
                </div>

                <ArticleSources title="Quellen" sources={SOURCES} />

                {/* Back */}
                <div className="mt-10 pt-8 border-t border-(--line)">
                    <Link href="/blog" className="text-sm text-(--text-faint) hover:text-(--text-body) transition-colors">
                        ← Zurück zum Blog
                    </Link>
                </div>

            </article>

            <Footer />
        </main>
    )
}
