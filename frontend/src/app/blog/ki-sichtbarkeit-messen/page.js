import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'KI-Sichtbarkeit messen 2026: Kennzahlen, Dashboard & eigene Daten',
    description: 'KI-Sichtbarkeit messen: die 3 Kennzahlen, die wirklich zählen, Schritt-für-Schritt mit echten Dashboard-Screenshots, plus warum Sichtbarkeit allein nichts über Leads aussagt.',
    keywords: 'ki sichtbarkeit messen, geo messen, ki sichtbarkeit tracken, ai visibility messen, sichtbarkeit in ki systemen messen, ki sichtbarkeit kpi, chatgpt sichtbarkeit messen, generative engine optimization messen',
    alternates: {
        canonical: 'https://www.scanora.ai/blog/ki-sichtbarkeit-messen',
        languages: {
            'de-DE': 'https://www.scanora.ai/blog/ki-sichtbarkeit-messen',
            'en-US': 'https://www.scanora.ai/en/blog/measure-ai-visibility',
        },
    },
    openGraph: {
        title: 'KI-Sichtbarkeit messen 2026: Kennzahlen, Dashboard & eigene Daten',
        description: 'Die 3 Kennzahlen, die beim Messen von KI-Sichtbarkeit wirklich zählen - mit echten Dashboard-Screenshots und dem Schritt, den die meisten Guides auslassen: der Verbindung zu echten Leads.',
        url: 'https://www.scanora.ai/blog/ki-sichtbarkeit-messen',
        type: 'article',
        locale: 'de_DE',
        images: ['https://www.scanora.ai/blog/ki-sichtbarkeit-messen/opengraph-image'],
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'KI-Sichtbarkeit messen 2026: Kennzahlen, Dashboard & eigene Daten',
    description: 'KI-Sichtbarkeit messen: die 3 Kennzahlen, die wirklich zählen, Schritt-für-Schritt mit echten Dashboard-Screenshots, plus warum Sichtbarkeit allein nichts über Leads aussagt.',
    image: 'https://www.scanora.ai/blog/ki-sichtbarkeit-messen/opengraph-image',
    datePublished: '2026-09-18T09:00:00+02:00',
    dateModified: '2026-09-18T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.scanora.ai/about' },
    publisher: {
        '@type': 'Organization',
        name: 'Scanora',
        url: 'https://www.scanora.ai',
        logo: { '@type': 'ImageObject', url: 'https://www.scanora.ai/logo', width: 512, height: 512 },
    },
    url: 'https://www.scanora.ai/blog/ki-sichtbarkeit-messen',
    mainEntityOfPage: 'https://www.scanora.ai/blog/ki-sichtbarkeit-messen',
    about: [
        { '@type': 'Thing', name: 'KI-Sichtbarkeit' },
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
        { '@type': 'Thing', name: 'AI Visibility Measurement' },
    ],
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.scanora.ai/blog' },
        { '@type': 'ListItem', position: 3, name: 'KI-Sichtbarkeit messen', item: 'https://www.scanora.ai/blog/ki-sichtbarkeit-messen' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was bedeutet KI-Sichtbarkeit messen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'KI-Sichtbarkeit messen heißt, systematisch und wiederholbar zu prüfen, ob und wie oft KI-Modelle wie ChatGPT, Claude, Gemini oder Perplexity eine Marke oder Website in ihren Antworten erwähnen, zitieren oder empfehlen - im Unterschied zu einer einmaligen, zufälligen Stichprobe.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie oft sollte ich KI-Sichtbarkeit messen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Mindestens wöchentlich mit denselben Prompts, damit die Ergebnisse über Zeit vergleichbar sind. KI-Antworten schwanken von Anfrage zu Anfrage - eine Einzelmessung zeigt nur eine Momentaufnahme, kein verlässliches Bild.',
            },
        },
        {
            '@type': 'Question',
            name: 'Ist KI-Sichtbarkeit dasselbe wie SEO?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nein, aber beide hängen zusammen. SEO misst die Position in klassischen Google-Suchergebnissen. KI-Sichtbarkeit misst, ob eine KI dich in einer generierten Antwort erwähnt - unabhängig von einer Positionsnummer. Eine Seite kann bei Google gut ranken und bei ChatGPT trotzdem unsichtbar sein, oder umgekehrt.',
            },
        },
        {
            '@type': 'Question',
            name: 'Kann ich KI-Sichtbarkeit kostenlos messen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja, ein einmaliger Check ist ohne Anmeldung und Kreditkarte möglich. Für laufendes, wöchentliches Tracking über mehrere Plattformen ist meist ein kostenpflichtiges Abo nötig, da jede automatisierte Prüfung reale API-Kosten bei den KI-Anbietern verursacht.',
            },
        },
        {
            '@type': 'Question',
            name: 'Woher weiß ich, ob ein KI-Zitat auch zu einem echten Lead führt?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Reine Sichtbarkeits-Tools können das nicht beantworten - sie zeigen nur, ob du erwähnt wirst, nicht was danach passiert. Dafür braucht es Lead-Attribution: Der Besucher, der über ChatGPT, Claude, Perplexity oder Gemini auf deine Website kommt, wird bei der Konversion (z. B. Formularausfüllung) mit der jeweiligen KI-Quelle verknüpft, statt nur als anonymer Traffic zu erscheinen.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie komme ich mit meiner Website auf Platz 1 bei ChatGPT, Claude & Co.?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Fünf Hebel wirken am meisten: KI-Crawler wie GPTBot und ClaudeBot technisch zulassen, klare zitierfähige Definitionssätze direkt nach Überschriften liefern, korrektes Schema Markup setzen, in bereits von KI zitierten Drittquellen auftauchen, und regelmäßig statt einmalig messen. Anders als ein Google-Ranking ist "Platz 1" bei einer KI kein fixer Zustand, sondern verändert sich mit jedem Modell-Update neu.',
            },
        },
    ],
}

const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'KI-Sichtbarkeit messen',
    description: 'So misst du systematisch, ob KI-Modelle deine Website erwähnen.',
    step: [
        { '@type': 'HowToStep', position: 1, name: 'Website und KI-Plattformen festlegen', text: 'Domain eintragen und auswählen, welche KI-Plattformen geprüft werden sollen (Claude, ChatGPT, Perplexity, Google AI Overview).' },
        { '@type': 'HowToStep', position: 2, name: 'Relevante Keywords/Prompts definieren', text: 'Themen und Fragen festlegen, bei denen die Marke realistisch erwähnt werden könnte.' },
        { '@type': 'HowToStep', position: 3, name: 'Wöchentlich automatisiert prüfen', text: 'Dieselben Prompts regelmäßig wiederholen, um die Mention-Rate über Zeit zu verfolgen statt einer Einzelmessung.' },
        { '@type': 'HowToStep', position: 4, name: 'Sichtbarkeit mit Leads verknüpfen', text: 'Zusätzlich messen, ob Besucher aus KI-Quellen tatsächlich konvertieren, nicht nur ob die Marke erwähnt wird.' },
    ],
}

const KPI_ROWS = [
    { name: 'Mention-Rate', def: 'Anteil der geprüften Anfragen, bei denen die Marke überhaupt erwähnt wird - die Basiskennzahl.' },
    { name: 'Empfehlungs-Kontext (Sentiment)', def: 'Wird die Marke aktiv empfohlen, nur neutral genannt oder im Vergleich schlechter dargestellt als Konkurrenten?' },
    { name: 'Lead-Herkunft', def: 'Wie viele der tatsächlichen Website-Besucher und Conversions stammen nachweislich aus einer KI-Quelle - die Kennzahl, die Sichtbarkeit mit Geschäftsergebnis verbindet.' },
]

export default function KiSichtbarkeitMessenPage() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
            <Navbar />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-faint)] mb-8">
                    <Link href="/" className="hover:text-[var(--text-muted)] transition-colors">Scanora</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-[var(--text-muted)] transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-[var(--text-faint)]" aria-current="page">KI-Sichtbarkeit messen</span>
                </nav>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-cyan-500/15 text-cyan-400">
                            GEO
                        </span>
                        <span className="text-xs text-[var(--text-faint)]">18. September 2026</span>
                        <span className="text-xs text-[var(--text-faint)]">· Aktualisiert: 18. September 2026</span>
                        <span className="text-xs text-[var(--text-faint)]">· 10 min Lesezeit</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text-white)] leading-tight tracking-tight mb-5">
                        KI-Sichtbarkeit messen 2026: Kennzahlen, Dashboard &amp; eigene Daten
                    </h1>
                    <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                        <strong className="text-[var(--text-white)]">KI-Sichtbarkeit messen</strong> heißt, systematisch und wiederholbar zu prüfen, ob ChatGPT, Claude, Gemini oder Perplexity deine Marke in ihren Antworten erwähnen - statt einer zufälligen Einzel-Stichprobe. In diesem Artikel zeigen wir die drei Kennzahlen, die dafür wirklich zählen, mit echten Screenshots aus unserem eigenen Dashboard - und den Schritt, den die meisten Anleitungen zu diesem Thema komplett auslassen: die Verbindung von Sichtbarkeit zu tatsächlichen Leads.
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
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Warum das gerade jetzt wichtig ist</h2>
                        <p>
                            <strong className="text-[var(--text-white)]">37 % der Verbraucher starten ihre Suche inzwischen mit einer KI statt mit Google</strong>, bei B2B-Software-Käufern beginnt schon jede zweite Recherche (51 %) mit einem KI-Chatbot statt mit einer klassischen Suchmaschine - ein Sprung von nur 29 % im April 2025. Unter Gen Z haben bereits 82 % KI-Chatbots genutzt, gegenüber 68 % bei Millennials.
                        </p>
                        <p className="mt-4">
                            Wichtig für die Einordnung: Google verarbeitet weiterhin rund 90 % des globalen Suchtraffics - KI-Suche verdrängt die klassische Suche also (noch) nicht, sondern entwickelt sich als paralleler Kanal daneben. Trotzdem ist die Wachstumsrate bemerkenswert: KI-Traffic auf Websites ist von 2024 bis 2026 um das 16-fache gestiegen, und Traffic über Claude wuchs allein von 2025 auf 2026 um 320 %.
                        </p>
                        <p className="mt-4 text-xs text-[var(--text-faint)]">
                            Quellen: <a href="https://www.position.digital/blog/ai-seo-statistics/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Position Digital, AI SEO Statistics 2026</a>, <a href="https://www.orbitmedia.com/blog/ai-vs-google/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Orbit Media, AI-Search Adoption Survey</a>, <a href="https://thestacc.com/blog/ai-search-referral-traffic-stats/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">The Stacc, AI Search Referral Traffic Statistics 2026</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Die 3 Kennzahlen, die wirklich zählen</h2>
                        <p>
                            Die meisten Anleitungen zu diesem Thema listen fünf, sechs oder mehr KPIs auf - Präsenzquote, Themenabdeckung, Stabilitätsquote und so weiter. In der Praxis reduziert sich das auf drei Fragen, die tatsächlich Handlungen auslösen:
                        </p>
                        <div className="overflow-x-auto rounded-2xl border border-[var(--border-subtle)] mt-5">
                            <table className="w-full text-sm min-w-[560px]">
                                <thead>
                                    <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-06)]">
                                        <th className="text-left px-5 py-3 text-[var(--text-muted)] font-semibold">Kennzahl</th>
                                        <th className="text-left px-5 py-3 text-[var(--accent)] font-semibold">Was sie zeigt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {KPI_ROWS.map((k, i) => (
                                        <tr key={i} className="border-b border-[var(--border-subtle)] last:border-0">
                                            <td className="px-5 py-3 text-[var(--text-white)] font-medium whitespace-nowrap align-top">{k.name}</td>
                                            <td className="px-5 py-3 text-[var(--text-body)] align-top">{k.def}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4">
                            Die dritte Kennzahl - Lead-Herkunft - fehlt in den meisten Anleitungen zu diesem Thema komplett, weil die meisten reinen Sichtbarkeits-Tools sie schlicht nicht messen können. Mehr dazu weiter unten.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">So misst du es Schritt für Schritt</h2>
                        <p>
                            Am Beispiel unseres eigenen Dashboards - der Ablauf ist bei den meisten GEO-Tools ähnlich, die konkreten Screenshots stammen aus Scanora:
                        </p>

                        <div className="mt-6 space-y-3">
                            <div className="flex gap-4 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                <span className="text-[var(--accent)] font-mono font-bold text-sm shrink-0">1</span>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-white)] mb-1 text-sm">Website eintragen, Plattformen wählen, erste Keywords festlegen</h3>
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">Domain hinzufügen, KI-Plattformen auswählen (inklusive Gemini) und die ersten Themen/Keywords direkt mit anlegen.</p>
                                </div>
                            </div>
                            <figure className="mt-2">
                                <Image
                                    src="/blog/ki-sichtbarkeit-messen-website-hinzufuegen.png"
                                    alt="Scanora Dashboard: Website hinzufügen, alle 5 KI-Plattformen inklusive Gemini auswählen und erste Keywords eintragen"
                                    width={448}
                                    height={770}
                                    className="w-full max-w-sm h-auto rounded-2xl border border-[var(--border-subtle)]"
                                />
                                <figcaption className="text-xs text-[var(--text-faint)] mt-2">
                                    Beispielansicht mit Demo-Daten, UI 1:1 aus dem Scanora-Dashboard.
                                </figcaption>
                            </figure>

                            <div className="flex gap-4 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5 mt-6">
                                <span className="text-[var(--accent)] font-mono font-bold text-sm shrink-0">2</span>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-white)] mb-1 text-sm">Später weitere Keywords oder eigene Prompts ergänzen</h3>
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">Zwei Wege: fertige Keywords (werden in ein Prompt-Template eingesetzt) oder ein komplett eigener, frei formulierter Prompt - z. B. exakt die Frage, die ein echter Kunde stellen würde.</p>
                                </div>
                            </div>
                            <figure className="mt-2">
                                <Image
                                    src="/blog/ki-sichtbarkeit-messen-keywords-prompts.png"
                                    alt="Scanora Dashboard: Keywords hinzufügen und eigenen, frei formulierten Prompt hinzufügen"
                                    width={520}
                                    height={340}
                                    className="w-full max-w-md h-auto rounded-2xl border border-[var(--border-subtle)]"
                                />
                                <figcaption className="text-xs text-[var(--text-faint)] mt-2">
                                    Beispielansicht mit Demo-Daten, UI 1:1 aus dem Scanora-Dashboard: Keywords und eigene Prompts sind zwei getrennte Eingabewege.
                                </figcaption>
                            </figure>

                            <div className="flex gap-4 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5 mt-6">
                                <span className="text-[var(--accent)] font-mono font-bold text-sm shrink-0">3</span>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-white)] mb-1 text-sm">Plattformen im Detail konfigurieren</h3>
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">Pro Website lässt sich einzeln festlegen, welche KI-Plattformen aktiv geprüft werden - inklusive Gemini.</p>
                                </div>
                            </div>
                            <figure className="mt-2">
                                <Image
                                    src="/blog/ki-sichtbarkeit-messen-plattformen.png"
                                    alt="Scanora Dashboard: KI-Plattformen Claude, ChatGPT, Gemini, Perplexity und Google AI Overview zum Tracking auswählen"
                                    width={420}
                                    height={336}
                                    className="w-full max-w-sm h-auto rounded-2xl border border-[var(--border-subtle)]"
                                />
                                <figcaption className="text-xs text-[var(--text-faint)] mt-2">
                                    Beispielansicht mit Demo-Daten, UI 1:1 aus dem Scanora-Dashboard: alle 5 KI-Plattformen inklusive Gemini einzeln aktivierbar.
                                </figcaption>
                            </figure>

                            <div className="flex gap-4 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5 mt-6">
                                <span className="text-[var(--accent)] font-mono font-bold text-sm shrink-0">4</span>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-white)] mb-1 text-sm">Mention-Rate über Zeit auswerten</h3>
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">Eine Einzelmessung ist eine Momentaufnahme. Der Verlauf über mehrere Checks zeigt, ob sich die Sichtbarkeit tatsächlich verändert.</p>
                                </div>
                            </div>
                            <figure className="mt-2">
                                <Image
                                    src="/blog/ki-sichtbarkeit-messen-trend.png"
                                    alt="Scanora Dashboard: Mention-Rate-Verlauf über mehrere wöchentliche KI-Sichtbarkeits-Checks, steigend von 12% auf 68%"
                                    width={940}
                                    height={370}
                                    className="w-full h-auto rounded-2xl border border-[var(--border-subtle)]"
                                />
                                <figcaption className="text-xs text-[var(--text-faint)] mt-2">
                                    Beispielansicht mit Demo-Daten, UI 1:1 aus dem Scanora-Dashboard: So sieht ein positiver Verlauf über 7 Checks aus, wenn die Sichtbarkeit durch die Fixes aus dem übernächsten Abschnitt tatsächlich steigt - keine echten, garantierten Ergebniszahlen.
                                </figcaption>
                            </figure>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Der fehlende Schritt: von Sichtbarkeit zu echten Leads</h2>
                        <p>
                            Fast jede Anleitung zu diesem Thema hört bei der Mention-Rate auf. Das Problem: Eine hohe Erwähnungsquote sagt nichts darüber aus, ob daraus auch echte Besucher oder Kunden werden. Und genau hier lohnt sich der Blick auf reale Zahlen: <strong className="text-[var(--text-white)]">KI-Traffic konvertiert nachweislich besser als klassischer organischer Suchtraffic</strong> - ChatGPT-Referral-Traffic mit rund 15,9 %, Perplexity mit 10,5 %, Claude mit 5,0 % - teils 4,4x bis 23x höher als der Durchschnitt organischer Suchbesucher.
                        </p>
                        <p className="mt-4">
                            Deshalb hat Scanora zusätzlich zum reinen Sichtbarkeits-Tracking eine <strong className="text-[var(--text-white)]">Lead-Attribution</strong> gebaut: Ein Tracking-Snippet erkennt, ob ein Besucher über ChatGPT, Claude, Perplexity oder Gemini kommt, und verknüpft das bei einer Konversion (z. B. Kontaktformular) mit der jeweiligen KI-Quelle - nur mit Cookie-Einwilligung. Damit lässt sich beantworten, was reine Sichtbarkeits-Zahlen nicht können: nicht nur "werde ich erwähnt", sondern "bringt mir das tatsächlich Leads".
                        </p>
                        <figure className="mt-6">
                            <Image
                                src="/blog/ki-sichtbarkeit-messen-leads.png"
                                alt="Scanora Leads-Dashboard: Leads nach KI-Quelle aufgeschlüsselt - ChatGPT, Claude, Perplexity und Gemini - mit Verlauf und Einzel-Lead-Tabelle"
                                width={900}
                                height={529}
                                className="w-full h-auto rounded-2xl border border-[var(--border-subtle)]"
                            />
                            <figcaption className="text-xs text-[var(--text-faint)] mt-2">
                                Beispielansicht mit Demo-Daten, UI 1:1 aus dem Scanora-Dashboard: So sieht die Aufschlüsselung aus, sobald Leads über KI-Quellen reinkommen - pro Plattform, mit Verlauf und einzelnen Leads inklusive Herkunftsseite.
                            </figcaption>
                        </figure>
                        <p className="mt-4 text-sm text-[var(--text-faint)]">
                            Transparenz: Das Lead-Tracking-Feature ist neu, wir haben noch keine belastbare Menge an aggregierten Kundendaten dazu vorzuweisen - der Screenshot zeigt deshalb bewusst Demo-Daten, keine echten Kundenzahlen. Die zitierten Conversion-Raten stammen aus unabhängigen Branchen-Studien, nicht aus eigenen Scanora-Daten.
                        </p>
                        <p className="mt-4 text-xs text-[var(--text-faint)]">
                            Quelle Conversion-Raten: <a href="https://thestacc.com/blog/ai-search-referral-traffic-stats/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">The Stacc, AI Search Referral Traffic Statistics 2026</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Konkurrenz im Blick behalten: wer wird von KI-Modellen empfohlen</h2>
                        <p>
                            Die eigene Mention-Rate allein ist nur die halbe Antwort. Genauso wichtig: <strong className="text-[var(--text-white)]">welche anderen Domains KI-Modelle stattdessen zitieren</strong>, wenn sie dich nicht nennen. Erst der Vergleich zeigt, ob eine schwache Sichtbarkeit an dir liegt oder daran, dass ein Wettbewerber in genau diesem Themenfeld dominanter positioniert ist.
                        </p>
                        <figure className="mt-6">
                            <Image
                                src="/blog/ki-sichtbarkeit-messen-wettbewerber.png"
                                alt="Scanora Wettbewerber-Tracking: Welche Domains KI-Modelle zu den getrackten Keywords zitieren, mit Anteil, Durchschnittsposition und Plattform-Verteilung"
                                width={900}
                                height={210}
                                className="w-full h-auto rounded-2xl border border-[var(--border-subtle)]"
                            />
                            <figcaption className="text-xs text-[var(--text-faint)] mt-2">
                                Beispielansicht mit Demo-Daten, UI 1:1 aus dem Scanora-Dashboard: Anteil pro Domain, durchschnittliche Position bei Erwähnung, und auf welchen der 5 Plattformen (farbige Punkte) die jeweilige Domain zitiert wird.
                            </figcaption>
                        </figure>
                        <p className="mt-4">
                            Praktisch heißt das: Zeigt die Auswertung, dass ein Wettbewerber auf allen 5 Plattformen zitiert wird und du nur auf 2-3, ist das ein konkretes Ziel - nicht "irgendwie sichtbarer werden", sondern "auf den fehlenden Plattformen aufholen". Zeigt sie dagegen, dass niemand aus der Branche zuverlässig zitiert wird, ist das Themenfeld insgesamt unterversorgt - eine Chance, als Erster zur verlässlichen Quelle zu werden.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">So wirst du erwähnt und empfohlen - und kommst auf Platz 1</h2>
                        <p>
                            Messen zeigt den Ist-Zustand. Diese fünf Hebel bewegen ihn in der Praxis am meisten - in der Reihenfolge, in der sie normalerweise zuerst wirken:
                        </p>
                        <div className="space-y-3 mt-5">
                            <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                <h3 className="font-semibold text-[var(--text-white)] mb-1.5 text-sm">1. KI-Crawler technisch zulassen</h3>
                                <p className="text-sm text-[var(--text-muted)] leading-relaxed">GPTBot, ClaudeBot, PerplexityBot & Co. müssen laut robots.txt überhaupt crawlen dürfen - ein banal klingender, aber überraschend häufiger Blocker. Eine llms.txt ergänzt das um eine explizite, strukturierte Zusammenfassung für KI-Systeme.</p>
                            </div>
                            <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                <h3 className="font-semibold text-[var(--text-white)] mb-1.5 text-sm">2. Klare, zitierfähige Definitionen liefern</h3>
                                <p className="text-sm text-[var(--text-muted)] leading-relaxed">KI-Modelle extrahieren bevorzugt kurze, eindeutige Sätze direkt nach einer Überschrift ("X ist ..."), nicht vage Marketing-Absätze. Wer die eigene Definition nicht in einem zitierbaren Satz liefert, überlässt die Formulierung der KI - und damit dem Zufall.</p>
                            </div>
                            <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                <h3 className="font-semibold text-[var(--text-white)] mb-1.5 text-sm">3. Schema Markup korrekt setzen</h3>
                                <p className="text-sm text-[var(--text-muted)] leading-relaxed">Organization-, FAQPage- und Article-Schema geben KI-Systemen strukturierte Fakten statt sie aus Fließtext raten zu lassen - insbesondere für Preise, Autor und Aktualität relevant.</p>
                            </div>
                            <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                <h3 className="font-semibold text-[var(--text-white)] mb-1.5 text-sm">4. In fremden Quellen auftauchen, die KI-Modelle bereits zitieren</h3>
                                <p className="text-sm text-[var(--text-muted)] leading-relaxed">Claude und Perplexity zitieren überwiegend etablierte Drittquellen (Vergleichsportale, Fachartikel, Verzeichnisse), nicht nur die eigene Domain. Erwähnungen auf bereits von KI zitierten Seiten wirken oft stärker als weitere eigene Inhalte.</p>
                            </div>
                            <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                <h3 className="font-semibold text-[var(--text-white)] mb-1.5 text-sm">5. Regelmäßig nachmessen statt einmal optimieren</h3>
                                <p className="text-sm text-[var(--text-muted)] leading-relaxed">KI-Antworten verändern sich mit jedem Modell-Update. "Platz 1" bei einer KI ist kein fixer Zustand wie ein Google-Ranking, sondern muss wöchentlich neu erarbeitet werden - genau deshalb zählt kontinuierliches Messen (siehe oben) mehr als eine einmalige Optimierung.</p>
                            </div>
                        </div>
                        <p className="mt-6">
                            Statt bei diesen fünf Hebeln zu raten, zeigt Scanora pro Keyword direkt, welcher davon bei dir konkret fehlt - im Vergleich zur Quelle, die eine KI tatsächlich zitiert:
                        </p>
                        <figure className="mt-4">
                            <Image
                                src="/blog/ki-sichtbarkeit-messen-citability.png"
                                alt="Scanora Citability-Diagnose: eigener GEO-Score, konkrete fehlende Fixes wie llms.txt und FAQPage-Schema, im direkten Vergleich zur von Claude zitierten Quelle"
                                width={640}
                                height={331}
                                className="w-full max-w-xl h-auto rounded-2xl border border-[var(--border-subtle)]"
                            />
                            <figcaption className="text-xs text-[var(--text-faint)] mt-2">
                                Beispielansicht mit Demo-Daten, UI 1:1 aus dem Scanora-Dashboard: eigener GEO-Score, die konkret fehlenden Fixes mit Aufwandsschätzung, und der direkte Unterschied zur Quelle, die eine KI stattdessen zitiert.
                            </figcaption>
                        </figure>
                        <p className="mt-4">
                            Eine ausführlichere Anleitung mit den 4 Ebenen der KI-Sichtbarkeit: <Link href="/blog/ki-sichtbarkeit-erlangen" className="text-violet-400 hover:text-violet-300">KI-Sichtbarkeit erlangen</Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Ohne Tool: manuell messen</h2>
                        <p>
                            Wer erstmal ohne Tool starten will: eine Tabelle mit 15-20 realistischen Fragen anlegen, jede davon einzeln in ChatGPT, Claude, Perplexity und Gemini eingeben (im Inkognito-Modus, um personalisierte Ergebnisse zu vermeiden), und pro Antwort notieren, ob und wie die Marke erwähnt wird. Der Nachteil: Das lässt sich kaum wöchentlich wiederholen, ohne dass es zur Nebenbeschäftigung wird - und Lead-Attribution ist auf diesem Weg gar nicht möglich, da dafür ein Tracking-Snippet auf der eigenen Website nötig ist.
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

                </div>

                {/* CTA: Selbst ausprobieren */}
                <div className="mt-14 bg-[var(--accent-soft)] border border-[var(--accent-border)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Selbst ausprobieren</span>
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-2">
                                Miss deine eigene KI-Sichtbarkeit kostenlos
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

                {/* Cross-link: KI-Sichtbarkeit erlangen */}
                <div className="mt-5 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Verwandt</span>
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-2">
                                KI-Sichtbarkeit erlangen: die nächsten Schritte
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md">
                                Messen zeigt den Ist-Zustand. Dieser Artikel zeigt, was du konkret tust, um öfter zitiert zu werden.
                            </p>
                        </div>
                        <Link
                            href="/blog/ki-sichtbarkeit-erlangen"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--surface-08)] hover:bg-[var(--surface-10)] text-[var(--text-white)] text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Artikel lesen
                        </Link>
                    </div>
                </div>

                {/* Cross-link: Beste GEO Tools */}
                <div className="mt-5 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Vergleich</span>
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-2">
                                Beste GEO-Tools 2026: 5 Tools im Vergleich
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md">
                                Welches Tool zum Messen passt zu welchem Budget - Preise und Funktionsumfang im Detail.
                            </p>
                        </div>
                        <Link
                            href="/blog/beste-geo-ki-sichtbarkeit-tools-2026"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--surface-08)] hover:bg-[var(--surface-10)] text-[var(--text-white)] text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Vergleich lesen
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
