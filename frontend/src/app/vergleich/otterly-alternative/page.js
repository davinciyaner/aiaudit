import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Otterly.ai Alternative: Scanora im Vergleich (2026)',
    description: 'Otterly.ai-Alternative gesucht? Scanora trackt KI-Sichtbarkeit bei ChatGPT, Claude, Gemini, Perplexity & Google AI Overview ab 29,99 €/Monat – plus SEO-Audit im selben Tool. Echter Free-Plan.',
    keywords: 'otterly alternative, otterly.ai alternative, otterly ai vergleich, günstige ai visibility tool, geo tracking tool, ki sichtbarkeit tool',
    alternates: {
        canonical: 'https://www.scanora.ai/vergleich/otterly-alternative',
        languages: {
            'de-DE': 'https://www.scanora.ai/vergleich/otterly-alternative',
            'en-US': 'https://www.scanora.ai/en/compare/otterly-alternative',
        },
    },
    openGraph: {
        title: 'Otterly.ai Alternative: Scanora im Vergleich (2026)',
        description: 'Scanora trackt KI-Sichtbarkeit bei ChatGPT, Claude, Gemini, Perplexity & Google AI Overview ab 29,99 €/Monat – plus SEO-Audit im selben Tool. Der ehrliche Vergleich zu Otterly.ai.',
        url: 'https://www.scanora.ai/vergleich/otterly-alternative',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Otterly.ai Alternative: Scanora im ehrlichen Vergleich',
    description: 'Scanora trackt KI-Sichtbarkeit bei ChatGPT, Claude, Gemini, Perplexity & Google AI Overview ab 29,99 €/Monat – plus SEO-Audit im selben Tool. Der faktenbasierte Vergleich zu Otterly.ai.',
    image: 'https://www.scanora.ai/vergleich/otterly-alternative/opengraph-image',
    datePublished: '2026-08-27T09:00:00+02:00',
    dateModified: '2026-09-12T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.scanora.ai/about' },
    publisher: {
        '@type': 'Organization',
        name: 'Scanora',
        url: 'https://www.scanora.ai',
        logo: { '@type': 'ImageObject', url: 'https://www.scanora.ai/logo', width: 512, height: 512 },
    },
    url: 'https://www.scanora.ai/vergleich/otterly-alternative',
    mainEntityOfPage: 'https://www.scanora.ai/vergleich/otterly-alternative',
    about: [
        { '@type': 'Thing', name: 'AI Visibility Tracking' },
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
        { '@type': 'SoftwareApplication', name: 'Otterly.ai' },
    ],
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai' },
        { '@type': 'ListItem', position: 2, name: 'Vergleich', item: 'https://www.scanora.ai/vergleich' },
        { '@type': 'ListItem', position: 3, name: 'Otterly.ai Alternative', item: 'https://www.scanora.ai/vergleich/otterly-alternative' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Ist Scanora eine echte Alternative zu Otterly.ai?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja – für alle, die KI-Sichtbarkeit tracken wollen. Scanora deckt dieselben zentralen KI-Plattformen ab (ChatGPT, Claude, Gemini, Perplexity, Google AI Overview) und ergänzt sie um ein SEO-Audit. Für reines, sehr großvolumiges und internationales Agentur-Monitoring bleibt Otterly.ai spezialisierter.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was kostet Scanora im Vergleich zu Otterly.ai?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Scanoras GEO-Automatisierung startet bei 4,99 €/Monat für Claude-Tracking bzw. 29,99 €/Monat für alle fünf KI-Plattformen und bietet einen dauerhaft kostenlosen Plan. Otterly.ai beginnt bei 29 $/Monat ohne dauerhaften Gratis-Tarif – und Claude, Google Gemini sowie Google AI Mode kosten dort zusätzlich als kostenpflichtiges Add-on.',
            },
        },
        {
            '@type': 'Question',
            name: 'Deckt Scanora auch klassisches SEO ab?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja. Neben der GEO-Automatisierung gibt es eine separate SEO-Automatisierung mit wöchentlichen Ranking-Updates, Keyword-Ideen, Konkurrenzanalyse und Backlink-Übersicht. Zusätzlich prüft das Audit Title-Tags, Meta-Descriptions, Überschriften, interne Links und strukturierte Daten über mehrere Seiten. Otterly.ai ist ein reines AI-Visibility-Tool ohne SEO-Funktionen.',
            },
        },
        {
            '@type': 'Question',
            name: 'Welche KI-Plattformen sind bei Otterly.ai im Grundpreis enthalten?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Im Kernplan von Otterly.ai sind ChatGPT, Google AI Overview, Perplexity und Microsoft Copilot enthalten. Claude, Google Gemini und Google AI Mode sind kostenpflichtige Zusatzoptionen – Claude kostet je nach Tarif zwischen 29 $ und 439 $ pro Monat extra.',
            },
        },
        {
            '@type': 'Question',
            name: 'Kann ich Scanora kostenlos testen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja, ohne Anmeldung und ohne Kreditkarte. Du gibst deine URL ein und erhältst in etwa 60 Sekunden ein Ergebnis. Der Free-Plan bleibt dauerhaft kostenlos; die Automatisierungs-Abos haben zusätzlich eine 14-tägige Testphase.',
            },
        },
    ],
}

const OVERVIEW_ROWS = [
    ['GEO-Einstieg', '4,99 €/Monat (Claude) · 29,99 €/Monat (alle 5 Plattformen)', '29 $/Monat (Lite)'],
    ['Kostenloser Plan', 'Ja, dauerhaft (Audit inkl. GEO-Sichtbarkeit)', 'Nein, nur Testphase'],
    ['Standardmäßig enthaltene KI-Plattformen', 'ChatGPT, Claude, Gemini, Perplexity, Google AI Overview (ab Pro)', 'ChatGPT, Google AI Overview, Perplexity, Microsoft Copilot'],
    ['Claude-Tracking', 'Ab 4,99 €/Monat inklusive', 'Kostenpflichtiges Add-on, 29–439 $/Monat'],
    ['SEO-Audit + Google-Rankings', 'Ja, im selben Tool buchbar', 'Nein, reines AI-Visibility-Tool'],
    ['Ansatz', 'Audit-first mit priorisierten Fixes', 'Prompt-Monitoring-Dashboard'],
    ['Prompt-/Keyword-Volumen (oben)', '100 Keywords (GEO Expert)', 'Bis 400 Prompts (Premium), bis 500 im Agentur-Partner-Modell'],
]

const AUDITAI_FOR = [
    'alle fünf großen KI-Plattformen ohne Plattform-Aufpreise tracken willst',
    'KI-Sichtbarkeit und SEO beim selben Anbieter statt in zwei Tools haben willst',
    'einen niedrigen Einstiegspreis in Euro und einen echten Gratis-Plan brauchst',
    'nicht nur Zahlen, sondern einen priorisierten Fix-Plan willst',
]

const OTTERLY_FOR = [
    'als Agentur sehr viele Prompts über viele Kunden-Workspaces trackst',
    'internationales Multi-Country-Monitoring über 50+ Märkte brauchst',
    'Looker-Studio-Reporting und umfangreichen API-/MCP-Zugang benötigst',
]

export default function OtterlyAlternativePage() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-[var(--text-faint)] mb-8">
                    <Link href="/" className="hover:text-[var(--text-muted)] transition-colors">Scanora</Link>
                    <span>/</span>
                    <Link href="/vergleich" className="hover:text-[var(--text-muted)] transition-colors">Vergleich</Link>
                    <span>/</span>
                    <span className="text-[var(--text-faint)]">Otterly.ai Alternative</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-violet-500/15 text-violet-400">
                            Vergleich
                        </span>
                        <span className="text-xs text-[var(--text-faint)]">27. August 2026</span>
                        <span className="text-xs text-[var(--text-faint)]">· 8 min Lesezeit</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text-white)] leading-tight tracking-tight mb-5">
                        Otterly.ai-Alternative: Scanora im ehrlichen Vergleich
                    </h1>
                    <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                        Kurzfassung vorweg: <strong className="text-[var(--text-white)]">Scanora</strong> trackt deine KI-Sichtbarkeit bei ChatGPT, Claude, Gemini, Perplexity und Google AI Overview ab 29,99 €/Monat – und bringt SEO-Audit sowie Google-Rankings im selben Haus mit. <strong className="text-[var(--text-white)]">Otterly.ai</strong> ist ein reiner, sehr ausgereifter AI-Visibility-Tracker mit hohem Prompt-Volumen in den oberen Tarifen. Welches Tool passt, hängt davon ab, ob du ein bezahlbares Kombi-Tool oder ein spezialisiertes, großvolumiges GEO-Dashboard willst.
                    </p>
                    <p className="mt-4 text-[var(--text-body)] leading-relaxed">
                        Du suchst eine Alternative zu Otterly.ai – meistens aus einem von zwei Gründen: Der Einstieg ist dir bei 15 getrackten Prompts zu knapp, oder die Rechnung wird teuer, sobald du die KI-Plattformen dazubuchst, die du eigentlich brauchst. Diese Seite vergleicht beide Tools fair und faktenbasiert – inklusive der Punkte, in denen Otterly.ai besser ist.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-[var(--text-faint)]">
                        <Link href="/about" className="flex items-center gap-2 hover:text-[var(--text-body)] transition-colors">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-[var(--text-white)] text-[10px] font-bold">F</div>
                            <span>Finn Paustian</span>
                        </Link>
                        <span>·</span>
                        <span>Gründer, Scanora</span>
                    </div>
                </div>

                <div className="border-t border-[var(--text-white)]/5 mb-10" />

                <div className="space-y-10 text-[var(--text-body)] leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Der schnelle Überblick</h2>
                        <div className="overflow-x-auto rounded-2xl border border-[var(--text-white)]/[0.07]">
                            <table className="w-full text-sm min-w-[560px]">
                                <thead>
                                    <tr className="border-b border-[var(--text-white)]/5 bg-[var(--text-white)]/[0.02]">
                                        <th className="text-left px-5 py-3 text-[var(--text-muted)] font-semibold">Aspekt</th>
                                        <th className="text-left px-5 py-3 text-violet-400 font-semibold">Scanora</th>
                                        <th className="text-left px-5 py-3 text-cyan-400 font-semibold">Otterly.ai</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {OVERVIEW_ROWS.map(([aspect, ai, ot], i) => (
                                        <tr key={i} className="border-b border-[var(--text-white)]/[0.04] last:border-0">
                                            <td className="px-5 py-3 text-[var(--text-white)] font-medium whitespace-nowrap">{aspect}</td>
                                            <td className="px-5 py-3 text-[var(--text-body)]">{ai}</td>
                                            <td className="px-5 py-3 text-[var(--text-body)]">{ot}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-[var(--text-faint)] mt-3">
                            Preise Stand August 2026. Otterly rechnet in US-Dollar, Scanora in Euro inkl. MwSt. Otterly-Zahlen laut{' '}
                            <a href="https://otterly.ai/pricing" target="_blank" rel="noopener noreferrer" className="text-[var(--text-faint)] hover:text-[var(--text-body)] underline underline-offset-2">
                                offizieller Otterly.ai-Preisseite
                            </a>. Prüfe die aktuellen Konditionen jeweils direkt beim Anbieter.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Wo Scanora die bessere Wahl ist</h2>

                        <h3 className="text-lg font-semibold text-[var(--text-white)] mt-6 mb-2">1. Alle fünf großen KI-Plattformen für 29,99 €/Monat – ohne Add-on-Mathematik</h3>
                        <p>
                            Im Kernplan von Otterly.ai sind vier Engines enthalten – aber das sind ChatGPT, Google AI Overview, Perplexity und Microsoft Copilot. Ausgerechnet die Plattform, die im deutschsprachigen Raum oft zuerst gefragt ist, kostet extra: Claude ist bei Otterly.ai ein Add-on für 29 bis 439 $/Monat je nach Tarif, Google Gemini und Google AI Mode kommen mit je 9 bis 149 $/Monat hinzu. Scanora trackt ChatGPT, Claude, Gemini, Perplexity und Google AI Overview zusammen ab dem GEO-Pro-Tarif für 29,99 €/Monat. Kein Nachrechnen, keine Plattform-Aufpreise.
                        </p>

                        <h3 className="text-lg font-semibold text-[var(--text-white)] mt-6 mb-2">2. Ein echter kostenloser Plan statt nur einer Testphase</h3>
                        <p>
                            Otterly.ai bietet keinen dauerhaften Gratis-Tarif, sondern nur eine zeitlich begrenzte Testphase. Bei Scanora kannst du dauerhaft kostenlos ein Audit pro Monat inklusive GEO-Sichtbarkeit fahren – ideal, um zu prüfen, ob KI-Sichtbarkeit für dich überhaupt ein Thema ist, bevor du zahlst.
                        </p>

                        <h3 className="text-lg font-semibold text-[var(--text-white)] mt-6 mb-2">3. KI-Sichtbarkeit und SEO unter einem Dach</h3>
                        <p>
                            Otterly.ai ist ein reiner AI-Visibility-Tracker – klassisches SEO deckt es nicht ab. Wer beides will, zahlt in der Praxis für zwei Tools. Scanora bietet zusätzlich zur GEO-Automatisierung eine SEO-Automatisierung mit wöchentlichen Google-Ranking-Updates, Keyword-Ideen, Konkurrenzanalyse und Backlink-Übersicht – aus einem Anbieter, wahlweise als separates Abo buchbar.
                        </p>

                        <h3 className="text-lg font-semibold text-[var(--text-white)] mt-6 mb-2">4. Audit-first: konkrete Fixes statt roher Zahlen</h3>
                        <p>
                            Otterly.ai zeigt dir, <em>wie oft</em> und <em>wo</em> du in KI-Antworten auftauchst. Scanora geht einen Schritt weiter und liefert einen priorisierten Maßnahmenplan: Es prüft llms.txt, Schema.org, FAQ-Markup und die Erlaubnis für KI-Crawler (GPTBot, ClaudeBot, PerplexityBot) und sagt dir konkret, was du ändern musst, um zitiert zu werden.
                        </p>

                        <h3 className="text-lg font-semibold text-[var(--text-white)] mt-6 mb-2">5. Niedrigerer Einstieg in Euro</h3>
                        <p>
                            Scanora startet bei 4,99 €/Monat für Claude-Tracking und bei 29,99 €/Monat für alle fünf Plattformen – deutlich unter dem Otterly-Einstieg von 29 $/Monat, und ohne Währungsumrechnung für Kunden im DACH-Raum. Für Selbstständige und kleine Websites ist das die risikoärmere Einstiegshürde.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Wo Otterly.ai die bessere Wahl ist</h2>
                        <p>
                            Fairness gehört zu einem echten Vergleich – und Otterly.ai ist in einigen Punkten stärker:
                        </p>
                        <p className="mt-4">
                            <strong className="text-[var(--text-white)]">Höheres Prompt-Volumen und Agentur-Strukturen.</strong> Otterly.ai skaliert bis 400 getrackte Prompts im Premium-Tarif und bietet ein Agentur-Partner-Modell mit eigenen Client-Workspaces und bis zu 500 Prompts. Wer sehr viele Prompts über viele Kunden trackt, findet dort mehr Kapazität als bei Scanoras 100 Keywords im GEO-Expert-Tarif.
                        </p>
                        <p className="mt-4">
                            <strong className="text-[var(--text-white)]">Reife und Reichweite des reinen GEO-Trackings.</strong> Otterly.ai ist auf AI-Visibility spezialisiert und bringt Features wie Multi-Country-Tracking über 50+ Märkte, einen Looker-Studio-Connector sowie API- und MCP-Zugang in den höheren Tarifen mit. Für Teams, die ausschließlich tiefes, internationales GEO-Monitoring als eigenen Kanal betreiben, ist diese Spezialisierung ein echter Vorteil.
                        </p>
                        <p className="mt-4">
                            <strong className="text-[var(--text-white)]">Etabliertes Produkt.</strong> Otterly.ai ist länger am Markt und in vielen Tool-Vergleichen als einer der bekannteren AI-Visibility-Tracker etabliert.
                        </p>
                        <p className="mt-4">
                            Kurz gesagt: Wenn du ein reines, hochskalierbares und internationales GEO-Monitoring für eine Agentur mit vielen Kunden brauchst, ist Otterly.ai einen Blick wert. Wenn du KI-Sichtbarkeit <em>und</em> SEO in einem bezahlbaren Tool willst und Wert auf konkrete Handlungsempfehlungen legst, ist Scanora die passendere Wahl.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Für wen eignet sich was?</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-violet-500/[0.04] border border-violet-500/15 rounded-2xl p-5">
                                <h3 className="font-semibold text-[var(--text-white)] mb-3 text-sm">Wähle Scanora, wenn du …</h3>
                                <ul className="space-y-2">
                                    {AUDITAI_FOR.map((item, i) => (
                                        <li key={i} className="text-sm text-[var(--text-muted)] leading-relaxed flex gap-2">
                                            <span className="text-violet-400 shrink-0">–</span>{item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-cyan-500/[0.04] border border-cyan-500/15 rounded-2xl p-5">
                                <h3 className="font-semibold text-[var(--text-white)] mb-3 text-sm">Wähle Otterly.ai, wenn du …</h3>
                                <ul className="space-y-2">
                                    {OTTERLY_FOR.map((item, i) => (
                                        <li key={i} className="text-sm text-[var(--text-muted)] leading-relaxed flex gap-2">
                                            <span className="text-cyan-400 shrink-0">–</span>{item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {faqLd.mainEntity.map((faq, i) => (
                                <div key={i} className="bg-[var(--text-white)]/[0.02] border border-[var(--text-white)]/[0.06] rounded-2xl p-5">
                                    <h3 className="font-semibold text-[var(--text-white)] mb-2 text-sm">{faq.name}</h3>
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{faq.acceptedAnswer.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* CTA: Selbst ausprobieren */}
                <div className="mt-14 bg-violet-500/[0.04] border border-violet-500/20 rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1 block">Selbst ausprobieren</span>
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-2">
                                Der schnellste Weg zur Entscheidung ist ein direkter Test
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md">
                                Gib deine URL ein und sieh in rund 60 Sekunden deinen KI-Sichtbarkeits- und SEO-Score – ohne Anmeldung, ohne Kreditkarte.
                            </p>
                        </div>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-[var(--text-white)] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20 shrink-0"
                        >
                            Jetzt kostenlos prüfen
                        </Link>
                    </div>
                </div>

                {/* Cross-link: Lösungen */}
                <div className="mt-5 bg-[var(--text-white)]/[0.02] border border-[var(--text-white)]/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 block">Passende Lösung</span>
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-2">
                                Günstiges KI-Sichtbarkeit Tool: alle Preise im Überblick
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md">
                                Für wen sich ein günstiges Kombi-Tool aus SEO und KI-Sichtbarkeit lohnt – und was in jedem Tarif enthalten ist.
                            </p>
                        </div>
                        <Link
                            href="/loesungen/guenstiges-ki-sichtbarkeit-tool"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--text-white)]/[0.06] hover:bg-[var(--text-white)]/10 text-[var(--text-white)] text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Seite ansehen
                        </Link>
                    </div>
                </div>

                {/* Cross-link: SEO + GEO Tool */}
                <div className="mt-5 bg-[var(--text-white)]/[0.02] border border-[var(--text-white)]/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 block">Passende Lösung</span>
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-2">
                                SEO + GEO Tool: Google-Rankings &amp; KI-Sichtbarkeit in einem Dashboard
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md">
                                Google-Rankings und KI-Sichtbarkeit für dieselben Keywords im selben Dashboard – inklusive der Überschneidung zwischen beiden.
                            </p>
                        </div>
                        <Link
                            href="/loesungen/seo-geo-tool"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--text-white)]/[0.06] hover:bg-[var(--text-white)]/10 text-[var(--text-white)] text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Seite ansehen
                        </Link>
                    </div>
                </div>

                {/* Cross-link */}
                <div className="mt-5 bg-[var(--text-white)]/[0.02] border border-[var(--text-white)]/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 block">Weiterlesen</span>
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-2">
                                SEO Rank Tracker & KI-Sichtbarkeits-Monitor
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md">
                                Wie SEO Automatisierung und GEO Automatisierung bei Scanora im Detail funktionieren – inklusive Preisen.
                            </p>
                        </div>
                        <Link
                            href="/blog/seo-geo-automatisierung"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--text-white)]/[0.06] hover:bg-[var(--text-white)]/10 text-[var(--text-white)] text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Artikel lesen
                        </Link>
                    </div>
                </div>

                {/* Back */}
                <div className="mt-10 pt-8 border-t border-[var(--text-white)]/5">
                    <Link href="/blog" className="text-sm text-[var(--text-faint)] hover:text-[var(--text-body)] transition-colors">
                        ← Zurück zum Blog
                    </Link>
                </div>

            </article>

            <Footer />
        </main>
    )
}
