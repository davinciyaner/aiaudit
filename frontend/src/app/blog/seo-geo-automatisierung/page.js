import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ArticleSources from '../../components/site/ArticleSources'

export const metadata = {
    title: 'SEO & GEO automatisieren: Rankings und KI-Sichtbarkeit',
    description: 'Automatisierter SEO Rank Tracker plus KI-Sichtbarkeits-Monitoring für ChatGPT, Claude & Perplexity - wöchentlich automatisch statt manuell geprüft.',
    keywords: 'seo tool, rank tracker, keyword tracker, seo monitoring, google ranking tool, keyword monitoring, seo tracking tool, seo automatisierung, geo automatisierung, ki sichtbarkeit, automatisiertes seo tracking, seo monitoring tool',
    alternates: {
        canonical: 'https://www.scanora.ai/blog/seo-geo-automatisierung',
        languages: {
            'de-DE': 'https://www.scanora.ai/blog/seo-geo-automatisierung',
            'en-US': 'https://www.scanora.ai/en/blog/seo-geo-automation',
        },
    },
    openGraph: {
        title: 'SEO Rank Tracker & KI-Sichtbarkeits-Monitor: SEO- und GEO-Tracking automatisieren',
        description: 'Automatisierter SEO Rank Tracker plus KI-Sichtbarkeits-Monitoring für ChatGPT, Claude & Perplexity - wöchentlich automatisch statt manuell geprüft.',
        url: 'https://www.scanora.ai/blog/seo-geo-automatisierung',
        type: 'article',
        locale: 'de_DE',
        images: ['https://www.scanora.ai/blog/seo-geo-automatisierung/opengraph-image'],
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SEO Rank Tracker & KI-Sichtbarkeits-Monitor: SEO- und GEO-Tracking automatisieren',
    description: 'Ein automatisierter SEO Rank Tracker und Keyword Tracker, plus KI-Sichtbarkeits-Monitoring für ChatGPT, Claude, Perplexity & Google AI Overview - wöchentlich automatisch statt manuell geprüft.',
    image: 'https://www.scanora.ai/blog/seo-geo-automatisierung/opengraph-image',
    datePublished: '2026-07-05T09:00:00+02:00',
    dateModified: '2026-10-01T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.scanora.ai/about' },
    publisher: {
        '@type': 'Organization',
        name: 'Scanora',
        url: 'https://www.scanora.ai',
        logo: { '@type': 'ImageObject', url: 'https://www.scanora.ai/logo', width: 512, height: 512 },
    },
    url: 'https://www.scanora.ai/blog/seo-geo-automatisierung',
    mainEntityOfPage: 'https://www.scanora.ai/blog/seo-geo-automatisierung',
    about: [
        { '@type': 'Thing', name: 'SEO Rank Tracker' },
        { '@type': 'Thing', name: 'Keyword Tracker' },
        { '@type': 'Thing', name: 'KI-Sichtbarkeits-Monitoring' },
    ],
    mentions: [
        { '@type': 'Thing', name: 'ChatGPT', url: 'https://chat.openai.com' },
        { '@type': 'Thing', name: 'Claude', url: 'https://claude.ai' },
        { '@type': 'Organization', name: 'Google Search Console' },
    ],
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.scanora.ai/blog' },
        { '@type': 'ListItem', position: 3, name: 'SEO Rank Tracker & KI-Sichtbarkeits-Monitor', item: 'https://www.scanora.ai/blog/seo-geo-automatisierung' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was ist SEO Automatisierung?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'SEO Automatisierung bedeutet, dass Google-Rankings, Keyword-Ideen, Konkurrenzanalysen und Backlinks nicht mehr manuell geprüft werden, sondern wöchentlich automatisch aktualisiert werden. Statt selbst in der Google Search Console nachzusehen, bekommst du Rankings, Gewinner und Verlierer sowie neue Keyword-Chancen automatisch aufbereitet.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist GEO Automatisierung?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'GEO Automatisierung (Generative Engine Optimization) prüft wöchentlich automatisch, ob KI-Modelle wie ChatGPT, Claude, Perplexity und Google AI Overview deine Website oder Marke in ihren Antworten erwähnen. Statt manuell Dutzende Prompts in verschiedenen KI-Tools zu testen, trackt die Automatisierung deine KI-Sichtbarkeit kontinuierlich und zeigt den Verlauf über Zeit.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist der Unterschied zwischen einem SEO-Tool und einem AI-Tracker?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ein SEO-Tool wie SEO Automatisierung ist auf Google-Rankings ausgerichtet: Keyword-Positionen, Konkurrenzanalyse, Backlinks. Ein AI-Tracker wie GEO Automatisierung prüft stattdessen, ob KI-Modelle wie ChatGPT, Claude, Perplexity und Google AI Overview eine Website oder Marke in ihren Antworten erwähnen. Beide arbeiten wöchentlich automatisch, messen aber unterschiedliche Sichtbarkeit: Google-Rankings vs. Erwähnungen in KI-Antworten.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist KI-Sichtbarkeit?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'KI-Sichtbarkeit beschreibt, wie oft und wie prominent eine Website oder Marke in den Antworten von KI-Modellen wie ChatGPT, Claude, Perplexity oder Google AI Overview erwähnt wird. Sie ist das GEO-Äquivalent zu Google-Rankings im klassischen SEO - nur dass die "Suchergebnisseite" eine generierte Antwort statt einer Liste von Links ist.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie kann ich KI-Sichtbarkeit messen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'KI-Sichtbarkeit lässt sich messen, indem man wiederholt dieselben Prompts an ChatGPT, Claude, Perplexity und Google AI Overview stellt und protokolliert, ob und wie oft die eigene Domain in den Antworten erwähnt wird - als Mention-Rate in Prozent pro Keyword und Plattform. Da KI-Antworten nicht deterministisch sind, braucht eine verlässliche Messung mehrere Wiederholungen über Zeit statt einer Einzelmessung, was GEO Automatisierung wöchentlich automatisch übernimmt.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was kostet SEO- und GEO Automatisierung?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'SEO Automatisierung startet bei 29,99 Euro pro Monat (3 Websites, 50 Keywords, wöchentliches Ranking-Update). GEO Automatisierung startet bei 4,99 Euro pro Monat (1 Website, 10 Keywords, Claude- und Gemini-Tracking). Beide bieten 14 Tage kostenlose Testphase, danach automatische Verlängerung, jederzeit kündbar.',
            },
        },
    ],
}

const SEO_FEATURES = [
    { title: 'Wöchentliches Ranking-Update', desc: 'Google-Positionen für alle getrackten Keywords werden jede Woche automatisch aktualisiert - inklusive Gewinner und Verlierer.' },
    { title: 'Keyword-Ideen & Suchvolumen', desc: 'Neue Keyword-Chancen mit Suchvolumen, Wettbewerbsstärke und CPC, automatisch vorgeschlagen.' },
    { title: 'Konkurrenzanalyse', desc: 'Sieh welche Domains für deine Keywords ranken und wo die Konkurrenz stärker ist.' },
    { title: 'Backlink-Übersicht', desc: 'Referring Domains, Dofollow/Nofollow-Verhältnis und Spam Score im Blick behalten.' },
]

const GEO_FEATURES = [
    { title: 'Wöchentlicher KI-Check', desc: 'Automatischer Check, ob ChatGPT, Claude, Gemini, Perplexity und Google AI Overview deine Domain bei relevanten Prompts erwähnen.' },
    { title: 'Claude + ChatGPT + Gemini + Perplexity + Google AI Overview Tracking', desc: 'Ab dem Pro-Plan werden alle fünf Plattformen parallel getrackt, im Einsteiger-Plan Claude und Gemini.' },
    { title: 'Mention-Verlauf', desc: 'Verlauf über Zeit statt Einzelmessung - so erkennst du ob deine GEO-Signale wirken.' },
    { title: 'Mehrere Websites & Keywords', desc: 'Von 1 Website / 10 Keywords im Einsteiger-Plan bis 10 Websites / 60 Keywords im Expert-Plan.' },
]

const SOURCES = [
    {
        "label": "Leistungsbericht in der Search Console",
        "publisher": "Google Search Console Hilfe",
        "href": "https://support.google.com/webmasters/answer/7576553"
    },
    {
        "label": "Leitfaden zu Googles Ranking-Systemen",
        "publisher": "Google Search Central",
        "href": "https://developers.google.com/search/docs/appearance/ranking-systems-guide"
    },
    {
        "label": "GEO: Generative Engine Optimization (Aggarwal et al., 2023)",
        "publisher": "arXiv",
        "href": "https://arxiv.org/abs/2311.09735"
    },
    {
        "label": "KI-Funktionen in der Google-Suche und deine Website",
        "publisher": "Google Search Central",
        "href": "https://developers.google.com/search/docs/appearance/ai-features"
    }
]

export default function SeoGeoAutomatisierungPage() {
    return (
        <main className="bg-(--bg-base) min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar />

            <article className="max-w-190 mx-auto px-4 sm:px-8 pt-28 md:pt-34 pb-18 md:pb-28">

                {/* Breadcrumb */}
                <div className="flex flex-wrap items-center gap-2 text-sm text-(--text-muted) mb-8">
                    <Link href="/" className="hover:text-(--accent-ink) transition-colors">Scanora</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-(--accent-ink) transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-(--text-faint)">SEO Rank Tracker & KI-Sichtbarkeits-Monitor</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-(--success-soft) text-(--success)">
                            SEO
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-(--accent-soft) text-(--accent-ink)">
                            GEO
                        </span>
                        <span className="text-xs text-(--text-faint)">5. Juli 2026</span>
                        <span className="text-xs text-(--text-faint)">· 10 min Lesezeit</span>
                        <span className="text-xs text-(--text-faint)">· Aktualisiert am 1. Oktober 2026</span>
                    </div>
                    <h1 className="text-[clamp(34px,4.4vw,52px)] font-bold text-(--text-white) leading-[1.06] tracking-[-0.035em] mb-5">
                        SEO Rank Tracker & KI-Sichtbarkeits-Monitor
                    </h1>
                    <p className="text-lg text-(--text-body) leading-relaxed">
                        Ein einmaliger Audit zeigt dir den Zustand heute. Aber Google-Rankings und KI-Sichtbarkeit ändern sich jede Woche - mit oder ohne dein Zutun. Ein automatisierter Rank Tracker und Keyword Tracker (SEO Automatisierung) plus ein KI-Sichtbarkeits-Monitor (GEO Automatisierung) übernehmen das laufende Tracking, damit du Verschlechterungen siehst bevor sie Umsatz kosten.
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
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Warum reicht manuelles Prüfen 2026 nicht mehr aus?</h2>
                        <p>
                            Ein Website-Audit ist eine Momentaufnahme. Er zeigt dir Fehler und Chancen genau in dem Moment, in dem du ihn ausführst. Das Problem: Google aktualisiert seinen Algorithmus laufend, Konkurrenten veröffentlichen neue Inhalte, und KI-Modelle wie <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-(--success) hover:text-(--success) underline underline-offset-2">ChatGPT</a> und <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-(--accent-ink) hover:text-(--accent-ink) underline underline-offset-2">Claude</a> ändern ständig, welche Quellen sie zitieren. Ein Zustand der heute gut aussieht, kann in vier Wochen unbemerkt schlechter geworden sein.
                        </p>
                        <p className="mt-4">
                            Manuell in der <a href="https://search.google.com/search-console/about" target="_blank" rel="noopener noreferrer" className="text-(--success) hover:text-(--success) underline underline-offset-2">Google Search Console</a> nachzusehen oder Dutzende Prompts in ChatGPT, Claude, Perplexity und Google AI Overview durchzutesten, kostet Zeit und wird in der Praxis selten regelmäßig gemacht. Genau hier setzen <strong className="text-(--text-white)">SEO Automatisierung</strong> und <strong className="text-(--text-white)">GEO Automatisierung</strong> an: laufendes Tracking statt einmaliger Prüfung. Für den einmaligen Einstieg reicht dagegen die manuelle{' '}
                            <Link href="/blog/seo-checkliste-2026" className="text-(--success) hover:text-(--success) underline underline-offset-2">
                                SEO-Checkliste 2026
                            </Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Wie funktioniert ein automatisierter SEO Rank Tracker?</h2>
                        <p>
                            SEO Automatisierung ist ein Rank Tracker und Keyword Tracker in einem: er trackt deine Google-Positionen für ausgewählte Keywords wöchentlich - automatisch, ohne dass du selbst nachsehen musst. Statt eines einmaligen SEO-Scores bekommst du einen Verlauf: welche Keywords steigen, welche fallen, und wo neue Chancen entstehen.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4 mt-6">
                            {SEO_FEATURES.map(f => (
                                <div key={f.title} className="bg-(--success)/4 border border-(--success-border) rounded-2xl p-5">
                                    <h3 className="font-semibold text-(--text-white) mb-1.5 text-sm">{f.title}</h3>
                                    <p className="text-sm text-(--text-muted) leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Wie funktioniert GEO Automatisierung für KI-Sichtbarkeit?</h2>
                        <p>
                            GEO Automatisierung überträgt dasselbe Prinzip darauf, KI-Sichtbarkeit zu messen - also darauf, wie oft KI-Modelle eine Website als Quelle zitieren (der Fachbegriff <a href="https://arxiv.org/abs/2311.09735" target="_blank" rel="noopener noreferrer" className="text-(--accent-ink) hover:text-(--accent-ink) underline underline-offset-2">Generative Engine Optimization</a> stammt aus einer 2023er Forschungsarbeit von Princeton, Georgia Tech und dem Allen Institute for AI). Statt einmalig zu prüfen ob ChatGPT oder Claude deine Website kennen, wird das wöchentlich automatisch erneut getestet - mit denselben Prompts, damit die Ergebnisse über Zeit vergleichbar bleiben.
                        </p>
                        <figure className="mt-6">
                            <Image
                                src="/blog/scanora-geo-report.png"
                                alt="Scanora GEO-Report zeigt geprüfte KI-Sichtbarkeits-Signale wie llms.txt, Organization-Schema, KI-Crawler-Erlaubnis und externe Quellenverweise"
                                width={960}
                                height={411}
                                className="w-full h-auto rounded-2xl border border-(--line)"
                            />
                            <figcaption className="text-xs text-(--text-faint) mt-2">
                                So sieht der einmalige GEO-Signal-Check aus, auf dem GEO Automatisierung aufbaut. Der Unterschied: Bei GEO Automatisierung läuft genau diese Prüfung wöchentlich automatisch, statt nur einmal.
                            </figcaption>
                        </figure>
                        <div className="grid sm:grid-cols-2 gap-4 mt-6">
                            {GEO_FEATURES.map(f => (
                                <div key={f.title} className="bg-(--accent)/4 border border-(--accent-border) rounded-2xl p-5">
                                    <h3 className="font-semibold text-(--text-white) mb-1.5 text-sm">{f.title}</h3>
                                    <p className="text-sm text-(--text-muted) leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Was ist der Unterschied zwischen SEO Automatisierung und GEO Automatisierung?</h2>
                        <div className="overflow-hidden rounded-2xl border border-(--line)">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-(--line) bg-(--card)">
                                        <th className="text-left px-5 py-3 text-(--text-muted) font-semibold">Aspekt</th>
                                        <th className="text-left px-5 py-3 text-(--success) font-semibold">SEO Automatisierung</th>
                                        <th className="text-left px-5 py-3 text-(--accent-ink) font-semibold">GEO Automatisierung</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['Was wird getrackt', 'Google-Ranking-Positionen', 'Erwähnungen bei ChatGPT, Claude, Perplexity & Google AI Overview'],
                                        ['Frequenz', 'Wöchentlich automatisch', 'Wöchentlich automatisch'],
                                        ['Zusatz-Daten', 'Keyword-Ideen, Konkurrenz, Backlinks', 'Mention-Verlauf pro Modell'],
                                        ['Einstiegspreis', 'ab 29,99 €/Monat', 'ab 4,99 €/Monat'],
                                        ['Testphase', '14 Tage kostenlos', '14 Tage kostenlos'],
                                    ].map(([aspect, seo, geo], i) => (
                                        <tr key={i} className="border-b border-(--line) last:border-0">
                                            <td className="px-5 py-3 text-(--text-white) font-medium">{aspect}</td>
                                            <td className="px-5 py-3 text-(--text-body)">{seo}</td>
                                            <td className="px-5 py-3 text-(--text-body)">{geo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Brauchst du beides?</h2>
                        <p>
                            SEO Automatisierung und GEO Automatisierung beantworten unterschiedliche Fragen. SEO Automatisierung zeigt, ob du bei Google gefunden wirst. GEO Automatisierung zeigt, ob du empfohlen wirst, wenn jemand ChatGPT oder Claude statt Google fragt. Anders gesagt: SEO Automatisierung ist ein klassisches SEO-Tool für Google-Rankings, GEO Automatisierung ist ein AI-Tracker für KI-Sichtbarkeit. Beide Kanäle wachsen unabhängig voneinander - ein gutes Google-Ranking sagt nichts darüber aus, ob eine KI deine Website kennt, und umgekehrt. Was GEO technisch dafür braucht, steht im Detail in unserem Artikel zur{' '}
                            <Link href="/blog/geo-optimierung-2026" className="text-(--accent-ink) hover:text-(--accent-ink) underline underline-offset-2">
                                GEO-Optimierung 2026
                            </Link>.
                        </p>
                        <div className="bg-(--card) border border-(--line) rounded-2xl p-5 mt-5">
                            <p className="text-sm text-(--text-body)">
                                Für die meisten Websites ist der pragmatische Einstieg: mit SEO Automatisierung starten, weil Google weiterhin den größten Traffic-Anteil liefert - und GEO Automatisierung ergänzen, sobald die eigene Zielgruppe zunehmend KI-Tools statt klassischer Suche nutzt.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Häufige Fragen zu SEO- und GEO Automatisierung</h2>
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

                {/* Cross-link to sibling post */}
                <div className="mb-5 bg-(--card) border border-(--line) rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-(--success) mb-1 block">Weiterlesen</span>
                            <h3 className="text-base sm:text-lg font-bold text-(--text-white) mb-2">
                                Manuell vs. automatisiert: Lohnt sich der Umstieg?
                            </h3>
                            <p className="text-(--text-muted) text-sm leading-relaxed max-w-md">
                                Zeitaufwand, Kosten und warum KI-Sichtbarkeit manuell kaum zuverlässig messbar ist - der ehrliche Vergleich.
                            </p>
                        </div>
                        <Link
                            href="/blog/seo-tracking-manuell-vs-automatisiert"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--tint) hover:bg-(--tint) text-(--text-white) text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Vergleich lesen
                        </Link>
                    </div>
                </div>

                {/* Cross-link: SEO + GEO Tool */}
                <div className="mb-5 bg-(--card) border border-(--line) rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-(--accent-ink) mb-1 block">Passende Lösung</span>
                            <h3 className="text-base sm:text-lg font-bold text-(--text-white) mb-2">
                                SEO + GEO Tool: Google-Rankings &amp; KI-Sichtbarkeit in einem Dashboard
                            </h3>
                            <p className="text-(--text-muted) text-sm leading-relaxed max-w-md">
                                Google-Rankings und KI-Sichtbarkeit für dieselben Keywords im selben Dashboard - inklusive der Überschneidung zwischen beiden.
                            </p>
                        </div>
                        <Link
                            href="/loesungen/seo-geo-tool"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--tint) hover:bg-(--tint) text-(--text-white) text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Seite ansehen
                        </Link>
                    </div>
                </div>

                {/* Cross-link to KI-Sichtbarkeit deep dive */}
                <div className="mb-5 bg-(--card) border border-(--line) rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-(--accent-ink) mb-1 block">Weiterlesen</span>
                            <h3 className="text-base sm:text-lg font-bold text-(--text-white) mb-2">
                                KI-Sichtbarkeit erlangen: So wirst du tatsächlich zitiert
                            </h3>
                            <p className="text-(--text-muted) text-sm leading-relaxed max-w-md">
                                Technische GEO-Signale sind nur die halbe Miete - Content-Strategie und plattformspezifische Unterschiede im Detail.
                            </p>
                        </div>
                        <Link
                            href="/blog/ki-sichtbarkeit-erlangen"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--tint) hover:bg-(--tint) text-(--text-white) text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Artikel lesen
                        </Link>
                    </div>
                </div>

                {/* CTA: SEO Automatisierung */}
                <div className="mt-14 bg-(--success)/4 border border-(--success-border) rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-(--success) mb-1 block">SEO Automatisierung</span>
                            <h3 className="text-base sm:text-lg font-bold text-(--text-white) mb-2">
                                Google-Rankings wöchentlich automatisch tracken
                            </h3>
                            <p className="text-(--text-muted) text-sm leading-relaxed max-w-md">
                                Ab 29,99 €/Monat, 3 Websites, 50 Keywords, 14 Tage kostenlos testen.
                            </p>
                        </div>
                        <Link
                            href="/seo/pricing"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--success) hover:bg-(--success) text-(--on-accent) text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-(--accent-border) shrink-0"
                        >
                            Jetzt SEO automatisieren
                        </Link>
                    </div>
                </div>

                {/* CTA: GEO Automatisierung */}
                <div className="mt-5 bg-(--accent)/4 border border-(--accent-border) rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-(--accent-ink) mb-1 block">GEO Automatisierung</span>
                            <h3 className="text-base sm:text-lg font-bold text-(--text-white) mb-2">
                                KI-Sichtbarkeit bei ChatGPT, Claude, Perplexity & Google AI Overview tracken
                            </h3>
                            <p className="text-(--text-muted) text-sm leading-relaxed max-w-md">
                                Ab 4,99 €/Monat, wöchentlicher Auto-Check, 14 Tage kostenlos testen.
                            </p>
                        </div>
                        <Link
                            href="/geo/pricing"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--accent) hover:bg-(--accent) text-(--on-accent) text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-(--accent-border) shrink-0"
                        >
                            Jetzt GEO automatisieren
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