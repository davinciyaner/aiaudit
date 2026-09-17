import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Beste GEO- & KI-Sichtbarkeits-Tools 2026: 5 Tools im Vergleich',
    description: 'Scanora, Peec.ai, Otterly.ai, Writesonic und Rankscale im Preis- und Funktionsvergleich: Welches GEO-Tool passt zu welchem Budget und Anwendungsfall.',
    keywords: 'geo tool, beste geo tools, ki sichtbarkeit tool, ai sichtbarkeit tool, geo tools vergleich, generative engine optimization tools, seo geo tool, ai visibility tools 2026',
    alternates: {
        canonical: 'https://www.scanora.ai/blog/beste-geo-ki-sichtbarkeit-tools-2026',
    },
    openGraph: {
        title: 'Beste GEO- & KI-Sichtbarkeits-Tools 2026: 5 Tools im Vergleich',
        description: 'Scanora, Peec.ai, Otterly.ai, Writesonic und Rankscale im Preis- und Funktionsvergleich - faktenbasiert, mit Preisen Stand September 2026.',
        url: 'https://www.scanora.ai/blog/beste-geo-ki-sichtbarkeit-tools-2026',
        type: 'article',
        locale: 'de_DE',
        images: ['https://www.scanora.ai/blog/beste-geo-ki-sichtbarkeit-tools-2026/opengraph-image'],
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Beste GEO- & KI-Sichtbarkeits-Tools 2026: 5 Tools im Vergleich',
    description: 'Scanora, Peec.ai, Otterly.ai, Writesonic und Rankscale im Preis- und Funktionsvergleich: Welches GEO-Tool passt zu welchem Budget und Anwendungsfall.',
    image: 'https://www.scanora.ai/blog/beste-geo-ki-sichtbarkeit-tools-2026/opengraph-image',
    datePublished: '2026-09-17T09:00:00+02:00',
    dateModified: '2026-09-17T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.scanora.ai/about' },
    publisher: {
        '@type': 'Organization',
        name: 'Scanora',
        url: 'https://www.scanora.ai',
        logo: { '@type': 'ImageObject', url: 'https://www.scanora.ai/logo', width: 512, height: 512 },
    },
    url: 'https://www.scanora.ai/blog/beste-geo-ki-sichtbarkeit-tools-2026',
    mainEntityOfPage: 'https://www.scanora.ai/blog/beste-geo-ki-sichtbarkeit-tools-2026',
    about: [
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
        { '@type': 'Thing', name: 'AI Visibility Tools' },
        { '@type': 'Thing', name: 'KI-Sichtbarkeit' },
    ],
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.scanora.ai/blog' },
        { '@type': 'ListItem', position: 3, name: 'Beste GEO- & KI-Sichtbarkeits-Tools 2026', item: 'https://www.scanora.ai/blog/beste-geo-ki-sichtbarkeit-tools-2026' },
    ],
}

const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Beste GEO- & KI-Sichtbarkeits-Tools 2026',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', url: 'https://www.scanora.ai' },
        { '@type': 'ListItem', position: 2, name: 'Peec.ai', url: 'https://www.scanora.ai/vergleich/peec-alternative' },
        { '@type': 'ListItem', position: 3, name: 'Otterly.ai', url: 'https://www.scanora.ai/vergleich/otterly-alternative' },
        { '@type': 'ListItem', position: 4, name: 'Writesonic', url: 'https://www.scanora.ai/vergleich/writesonic-alternative' },
        { '@type': 'ListItem', position: 5, name: 'Rankscale', url: 'https://www.scanora.ai/vergleich/rankscale-alternative' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was ist ein GEO-Tool?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ein GEO-Tool (Generative Engine Optimization Tool) misst, wie oft und in welchem Kontext KI-Modelle wie ChatGPT, Claude, Gemini oder Perplexity eine Website in ihren Antworten erwähnen oder zitieren - die KI-Suche-Entsprechung eines klassischen SEO-Rank-Trackers für Google.',
            },
        },
        {
            '@type': 'Question',
            name: 'Welches GEO-Tool ist am günstigsten?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nach den öffentlich einsehbaren Einstiegspreisen (Stand September 2026) ist Scanora mit 4,99 €/Monat für Claude- und Gemini-Tracking der günstigste Einstieg in dieser Liste, gefolgt von Rankscale (20 $/Monat, Credit-basiert) und Otterly.ai (29 $/Monat). Peec.ai (85 €/Monat) und Writesonic (249 $/Monat für die GEO-Funktion) liegen deutlich darüber.',
            },
        },
        {
            '@type': 'Question',
            name: 'Welches GEO-Tool deckt Claude am günstigsten ab?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Scanora trackt Claude bereits im 4,99-€-Einstiegstarif. Bei Peec.ai ist Claude nur im individuell bepreisten Enterprise-Tarif verfügbar, bei Otterly.ai kostet Claude als Add-on zusätzlich 29 bis 439 $/Monat, und bei LLM Pulse ist Claude ebenfalls nur als kostenpflichtiges Enterprise-Add-on buchbar.',
            },
        },
        {
            '@type': 'Question',
            name: 'Brauche ich ein separates SEO-Tool zusätzlich zum GEO-Tool?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Bei Peec.ai, Otterly.ai und Rankscale ja - das sind reine GEO-Tracker ohne klassisches Google-Rank-Tracking. Scanora und teilweise Writesonic kombinieren beides in einem Abo. Wer ohnehin schon ein SEO-Tool nutzt, kann sich bei den reinen GEO-Spezialisten auf die Tiefe der KI-Analyse konzentrieren.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie wurde diese Liste erstellt?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Die Preise und Funktionsangaben basieren auf den öffentlich einsehbaren Preisseiten der jeweiligen Anbieter, Stand September 2026. Scanora ist unser eigenes Produkt, das wir naturgemäß am besten kennen - bei den anderen Tools haben wir uns auf öffentliche Angaben und verfügbare Reviews gestützt, nicht auf eigene bezahlte Tests aller Tarife. Tarife und Konditionen ändern sich häufig - prüfe die aktuellen Preise direkt beim jeweiligen Anbieter.',
            },
        },
    ],
}

const COMPARISON_ROWS = [
    {
        tool: 'Scanora',
        price: '4,99 €/Monat',
        trial: '14 Tage kostenlos',
        platformCount: 'Bis zu 5',
        platforms: 'Claude, Gemini ab 4,99 €; +ChatGPT, Perplexity, Google AI Overview ab 29,99 €',
        billing: 'Fixpreis',
        seo: 'Ja',
        leadTracking: 'Ja - Lead-E-Mail direkt mit AI-Quelle verknüpft',
        bestFor: 'Indie Hacker, Agenturen & Unternehmen - SEO + GEO in einem Tool',
    },
    {
        tool: 'Peec.ai',
        price: '85 €/Monat',
        trial: 'Nein',
        platformCount: '3 von 7',
        platforms: '3 frei wählbare Engines im Starter-Tarif, Claude nur Enterprise',
        billing: 'Fixpreis + Aufpreis pro zusätzlicher Engine',
        seo: 'Nein',
        leadTracking: 'Nein - kann Zitat nicht mit Besuch/Lead verknüpfen',
        bestFor: 'Marken/Agenturen mit E-Commerce-Fokus',
    },
    {
        tool: 'Otterly.ai',
        price: '29 $/Monat',
        trial: 'Nein',
        platformCount: '4 Basis + 3 Add-on',
        platforms: 'ChatGPT, Google AI Overview, Perplexity, Copilot; Claude/Gemini als Add-on',
        billing: 'Fixpreis + Add-ons',
        seo: 'Nein',
        leadTracking: 'Teilweise - Landing-Pages-Report zeigt Conversions pro Engine, keine Einzel-Lead-Zuordnung',
        bestFor: 'Agenturen mit hohem Prompt-Volumen',
    },
    {
        tool: 'Writesonic',
        price: '249 $/Monat (für GEO)',
        trial: 'Nein',
        platformCount: 'Mehrere',
        platforms: 'GEO-Funktion erst im Professional-Tarif, günstigere Tarife nur Content-Tools',
        billing: 'Fixpreis',
        seo: 'Nein',
        leadTracking: 'Nein - keine Verbindung von Sichtbarkeit zu Conversions',
        bestFor: 'Teams mit KI-Content-Produktion',
    },
    {
        tool: 'Rankscale',
        price: '20 $/Monat',
        trial: '7 Tage kostenlos',
        platformCount: '17+',
        platforms: 'Breiteste Engine-Abdeckung am Markt',
        billing: 'Credit-basiert',
        seo: 'Nein',
        leadTracking: 'Nein - GA4-Integration laut Anbieter erst in Beta',
        bestFor: 'Maximale Plattformbreite',
    },
]

export default function BesteGeoToolsPage() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
            <Navbar />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-faint)] mb-8">
                    <Link href="/" className="hover:text-[var(--text-muted)] transition-colors">Scanora</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-[var(--text-muted)] transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-[var(--text-faint)]" aria-current="page">Beste GEO-Tools 2026</span>
                </nav>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-cyan-500/15 text-cyan-400">
                            GEO
                        </span>
                        <span className="text-xs text-[var(--text-faint)]">17. September 2026</span>
                        <span className="text-xs text-[var(--text-faint)]">· Aktualisiert: 17. September 2026</span>
                        <span className="text-xs text-[var(--text-faint)]">· 11 min Lesezeit</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text-white)] leading-tight tracking-tight mb-5">
                        Beste GEO- &amp; KI-Sichtbarkeits-Tools 2026: 5 Tools im Vergleich
                    </h1>
                    <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                        Ein <strong className="text-[var(--text-white)]">GEO-Tool</strong> zeigt dir, ob ChatGPT, Claude, Gemini, Perplexity oder Google AI Overview deine Marke erwähnen, wenn Nutzer zu deiner Branche fragen. Wir vergleichen fünf Tools - <strong className="text-[var(--text-white)]">Scanora, Peec.ai, Otterly.ai, Writesonic und Rankscale</strong> - nach Preis, Plattformabdeckung und ob SEO-Tracking mit dabei ist. Offen gesagt: Scanora ist unser eigenes Produkt, entsprechend kennen wir es am besten. Die Zahlen zu den anderen Tools stammen aus deren öffentlichen Preisseiten (Stand September 2026).
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-[var(--text-faint)]">
                        <Link href="/about" className="flex items-center gap-2 hover:text-[var(--text-body)] transition-colors">
                            <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--bg-base)] text-[10px] font-bold">F</div>
                            <span>Finn Paustian</span>
                        </Link>
                        <span>·</span>
                        <span>Gründer, Scanora</span>
                    </div>
                </div>

                <div className="border-t border-[var(--border-subtle)] mb-10" />

                <div className="space-y-10 text-[var(--text-body)] leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Alle 5 Tools im Überblick</h2>
                    </section>
                </div>

                {/* Breakout: volle Viewport-Breite für die große Vergleichstabelle */}
                <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
                    <div className="max-w-6xl mx-auto px-5 sm:px-8">
                        <div className="overflow-x-auto rounded-2xl border border-[var(--border-subtle)]">
                            <table className="w-full text-base min-w-[1300px]">
                                <thead>
                                    <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-06)]">
                                        <th className="text-left px-6 py-4 text-[var(--text-muted)] font-semibold">Tool</th>
                                        <th className="text-left px-6 py-4 text-[var(--text-muted)] font-semibold">Einstiegspreis</th>
                                        <th className="text-left px-6 py-4 text-[var(--text-muted)] font-semibold">Testphase</th>
                                        <th className="text-left px-6 py-4 text-[var(--text-muted)] font-semibold">Plattformen</th>
                                        <th className="text-left px-6 py-4 text-[var(--text-muted)] font-semibold">Details zu Plattformen</th>
                                        <th className="text-left px-6 py-4 text-[var(--text-muted)] font-semibold">Abrechnung</th>
                                        <th className="text-left px-6 py-4 text-[var(--accent)] font-semibold">SEO inklusive?</th>
                                        <th className="text-left px-6 py-4 text-[var(--accent)] font-semibold">Lead-Tracking (AI-Quelle → Lead)</th>
                                        <th className="text-left px-6 py-4 text-[var(--text-muted)] font-semibold">Am besten für</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {COMPARISON_ROWS.map((row, i) => (
                                        <tr key={i} className="border-b border-[var(--border-subtle)] last:border-0">
                                            <td className="px-6 py-4 text-[var(--text-white)] font-semibold whitespace-nowrap">{row.tool}</td>
                                            <td className="px-6 py-4 text-[var(--text-body)] whitespace-nowrap">{row.price}</td>
                                            <td className="px-6 py-4 text-[var(--text-body)] whitespace-nowrap">{row.trial}</td>
                                            <td className="px-6 py-4 text-[var(--text-body)] whitespace-nowrap">{row.platformCount}</td>
                                            <td className="px-6 py-4 text-[var(--text-muted)] text-sm max-w-[260px]">{row.platforms}</td>
                                            <td className="px-6 py-4 text-[var(--text-body)] text-sm max-w-[200px]">{row.billing}</td>
                                            <td className="px-6 py-4 text-[var(--text-body)] whitespace-nowrap">{row.seo}</td>
                                            <td className="px-6 py-4 text-[var(--text-muted)] text-sm max-w-[240px]">{row.leadTracking}</td>
                                            <td className="px-6 py-4 text-[var(--text-muted)] text-sm max-w-[220px]">{row.bestFor}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-[var(--text-faint)] mt-3">
                            Preise Stand September 2026, laut öffentlich einsehbaren Preisseiten der jeweiligen Anbieter. Prüfe die aktuellen Konditionen jeweils direkt beim Anbieter.
                        </p>
                    </div>
                </div>

                <div className="space-y-10 text-[var(--text-body)] leading-relaxed mt-10">

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">1. Scanora - günstigster Einstieg, SEO + GEO kombiniert</h2>
                        <p>
                            Scanora startet bei <strong className="text-[var(--text-white)]">4,99 €/Monat</strong> (Claude- und Gemini-Tracking, 1 Website, 10 Keywords) und deckt ab 29,99 €/Monat alle fünf Kernplattformen ab: ChatGPT, Claude, Gemini, Perplexity und Google AI Overview. Anders als die übrigen vier Tools in dieser Liste bringt Scanora zusätzlich klassisches SEO-Rank-Tracking bei Google im selben Dashboard mit - inklusive einer Überschneidungs-Ansicht, ob du bei Google rankst, aber bei KI-Modellen unsichtbar bist, oder umgekehrt. Ein dauerhaft kostenloser Plan mit einem Audit pro Monat ist ohne Anmeldung und Kreditkarte nutzbar.
                        </p>
                        <p className="mt-4">
                            Ein weiterer Unterschied zu allen vier anderen Tools in dieser Liste: Scanora verknüpft Leads direkt mit ihrer KI-Quelle. Kommt ein Besucher über ChatGPT, Claude, Perplexity oder Gemini auf deine Seite und füllt danach ein Formular aus, siehst du im Dashboard, welche KI-Plattform diesen konkreten Lead gebracht hat - nicht nur eine aggregierte Sichtbarkeits-Kennzahl. Laut unabhängigen Reviews bieten Peec.ai, Rankscale und Writesonic aktuell keine native Verbindung von KI-Zitat zu einzelnem Lead; Otterly.ai zeigt immerhin Conversion-Events pro Engine über seinen Landing-Pages-Report, aber ohne Zuordnung zum einzelnen Lead.
                        </p>
                        <p className="mt-3 text-[var(--text-body)]">
                            <strong className="text-[var(--text-white)]">Am besten für:</strong> Indie Hacker, Agenturen und Unternehmen gleichermaßen, die GEO- und SEO-Tracking nicht in zwei getrennten Abos verwalten wollen, und alle, denen der Enterprise-Aufpreis für Claude bei anderen Tools zu hoch ist.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">2. Peec.ai - sieben Engines, E-Commerce-Nische, für größere Teams</h2>
                        <p>
                            Peec.ai startet bei <strong className="text-[var(--text-white)]">85 €/Monat</strong> im Starter-Tarif (50 Prompts, 3 von 7 frei wählbaren Engines) - kein reiner Fixpreis, denn jede weitere Engine über die drei gewählten hinaus kostet laut Tarifübersicht deutlich extra. Claude ist auf den Self-Serve-Tarifen nicht enthalten, sondern nur im individuell bepreisten Enterprise-Tarif buchbar. Seit Juni 2026 bietet Peec.ai zusätzlich AI Shopping Analytics: welche Produkte auf SKU-Ebene von KI-Assistenten empfohlen werden - eine Nische, die keines der anderen vier Tools in dieser Liste abdeckt. Laut unabhängigen Reviews (Discovered Labs) kann Peec.ai allerdings kein KI-Zitat mit einem konkreten Website-Besuch oder Lead verknüpfen.
                        </p>
                        <p className="mt-3 text-[var(--text-body)]">
                            <strong className="text-[var(--text-white)]">Am besten für:</strong> Marken und Agenturen mit größerem Budget und E-Commerce-Fokus, die die Shopping-Analytics-Nische brauchen. Ausführlicher Vergleich: <Link href="/vergleich/peec-alternative" className="text-[var(--accent)] hover:underline">Peec.ai Alternative im Detail</Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">3. Otterly.ai - hohes Prompt-Volumen für Agenturen</h2>
                        <p>
                            Otterly.ai startet bei <strong className="text-[var(--text-white)]">29 $/Monat</strong> im Lite-Tarif (ChatGPT, Google AI Overview, Perplexity, Microsoft Copilot). Claude, Google Gemini und Google AI Mode sind kostenpflichtige Zusatzoptionen ab 9 bis 439 $/Monat je nach Plattform und Tarif. Einen dauerhaften Gratis-Plan gibt es nicht. Dafür bietet Otterly.ai in den oberen Tarifen ein deutlich höheres Prompt-Volumen als die meisten Wettbewerber - relevant für Agenturen mit vielen Kunden-Accounts.
                        </p>
                        <p className="mt-3 text-[var(--text-body)]">
                            <strong className="text-[var(--text-white)]">Am besten für:</strong> Agenturen, die primär ChatGPT/Perplexity/AI-Overview-Volumen brauchen und Claude nicht zwingend im Basispreis benötigen. Ausführlicher Vergleich: <Link href="/vergleich/otterly-alternative" className="text-[var(--accent)] hover:underline">Otterly.ai Alternative im Detail</Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">4. Writesonic - Content-Tool mit GEO als Zusatzfunktion</h2>
                        <p>
                            Writesonic ist in erster Linie ein KI-Content-Generator; AI-Sichtbarkeits-Tracking ist nach aktuellen Tarifangaben erst im Professional-Plan ab <strong className="text-[var(--text-white)]">249 $/Monat</strong> (199 $/Monat bei jährlicher Zahlung) enthalten - die günstigeren Lite- und Standard-Tarife sind reine Content-Werkzeuge ohne GEO-Funktion. Selbst im Professional-Tarif soll die volle AI-Visibility-Suite laut mehreren Reviews nicht vollständig sein.
                        </p>
                        <p className="mt-3 text-[var(--text-body)]">
                            <strong className="text-[var(--text-white)]">Am besten für:</strong> Teams, die ohnehin große Mengen KI-generierten Content produzieren wollen und GEO-Tracking als Zusatzfunktion mitnehmen, statt ein spezialisiertes Tool zu suchen. Ausführlicher Vergleich: <Link href="/vergleich/writesonic-alternative" className="text-[var(--accent)] hover:underline">Writesonic-Alternative im Detail</Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">5. Rankscale - breiteste Plattformabdeckung, Credit-Modell</h2>
                        <p>
                            Rankscale startet bei <strong className="text-[var(--text-white)]">20 $/Monat</strong> im Essential-Tarif (120 Credits, 10 Web-Audits) und deckt außergewöhnlich viele Engines ab - über 17 laut Anbieterangaben. Abgerechnet wird über ein monatliches Credit-Guthaben statt Fixpreis: Wie viel du tatsächlich verbrauchst, hängt von der Nutzungsintensität ab, der reale Monatspreis kann also über dem gelisteten Plan-Preis liegen. Einen dauerhaften Gratis-Plan gibt es nicht, nur einen 7-tägigen Test.
                        </p>
                        <p className="mt-3 text-[var(--text-body)]">
                            <strong className="text-[var(--text-white)]">Am besten für:</strong> alle, die maximale Plattformbreite über den Mainstream (ChatGPT, Claude, Gemini, Perplexity) hinaus brauchen und mit variablen Kosten leben können. Ausführlicher Vergleich: <Link href="/vergleich/rankscale-alternative" className="text-[var(--accent)] hover:underline">Rankscale-Alternative im Detail</Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {faqLd.mainEntity.map((faq, i) => (
                                <div key={i} className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                    <h3 className="font-semibold text-[var(--text-white)] mb-2 text-sm">{faq.name}</h3>
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{faq.acceptedAnswer.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[var(--text-white)] mb-3">Methodik &amp; Transparenz</h2>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                            Scanora ist unser eigenes Produkt - die Angaben dazu stammen aus erster Hand. Für Peec.ai, Otterly.ai, Writesonic und Rankscale haben wir uns auf öffentlich einsehbare Preisseiten und Tarifübersichten der Anbieter sowie unabhängige Reviews Dritter gestützt, Stand September 2026, nicht auf eigene bezahlte Tests aller Tarifstufen. Das gilt insbesondere für die Lead-Tracking-Spalte: Die Angaben zu den vier anderen Tools stammen aus unabhängigen Produkt-Reviews, nicht aus eigenen Tests. Wir haben (noch) keine Kundenstimmen zu sammeln, deshalb verzichten wir bewusst auf Testimonials oder Nutzerzahlen in diesem Artikel, statt sie zu erfinden. Tarife, Preise und Funktionsumfang ändern sich bei allen Anbietern regelmäßig - prüfe die aktuellen Konditionen jeweils direkt bei der jeweiligen Quelle, bevor du dich entscheidest.
                        </p>
                    </section>

                </div>

                {/* CTA: Selbst ausprobieren */}
                <div className="mt-14 bg-[var(--accent-soft)] border border-[var(--accent-border)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Selbst ausprobieren</span>
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-2">
                                Teste kostenlos, wie sichtbar du bei ChatGPT &amp; Co. bist
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md">
                                Gib deine URL ein und erhalte in rund 60 Sekunden deinen ersten GEO-Score - ohne Anmeldung, ohne Kreditkarte.
                            </p>
                        </div>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[var(--accent-border)] active:scale-[0.97] active:duration-75 shrink-0"
                        >
                            Jetzt kostenlos prüfen
                        </Link>
                    </div>
                </div>

                {/* Cross-link: SEO GEO Tool */}
                <div className="mt-5 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Verwandt</span>
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-2">
                                Was ist ein SEO-GEO-Tool?
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md">
                                Google-Rankings und KI-Sichtbarkeit in einem Dashboard statt in zwei getrennten Tools - das Konzept im Detail.
                            </p>
                        </div>
                        <Link
                            href="/loesungen/seo-geo-tool"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--surface-08)] hover:bg-[var(--surface-10)] text-[var(--text-white)] text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Seite ansehen
                        </Link>
                    </div>
                </div>

                {/* Back */}
                <div className="mt-10 pt-8 border-t border-[var(--border-subtle)]">
                    <Link href="/blog" className="text-sm text-[var(--text-faint)] hover:text-[var(--text-body)] transition-colors">
                        ← Zurück zum Blog
                    </Link>
                </div>

            </article>

            <Footer />
        </main>
    )
}
