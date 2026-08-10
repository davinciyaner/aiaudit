import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'KI-Sichtbarkeit erlangen: So wirst du von ChatGPT, Claude & Perplexity zitiert',
    description: 'KI-Sichtbarkeit ist mehr als llms.txt und Schema Markup. Wie du wirklich von ChatGPT, Claude, Perplexity und Google AI Overview zitiert wirst - inklusive Monitoring mit AuditAI.',
    keywords: 'ki sichtbarkeit, ki sichtbarkeit erlangen, ai visibility, ki sichtbarkeit verbessern, von chatgpt zitiert werden, von claude empfohlen werden, ki sichtbarkeit messen, generative engine optimization',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/blog/ki-sichtbarkeit-erlangen',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/blog/ki-sichtbarkeit-erlangen',
            'en-US': 'https://www.sitecheckai.dev/en/blog/ai-visibility',
        },
    },
    openGraph: {
        title: 'KI-Sichtbarkeit erlangen: So wirst du von ChatGPT, Claude & Perplexity zitiert',
        description: 'Technische GEO-Signale reichen nicht. Wie du wirklich KI-Sichtbarkeit erlangst - Content-Strategie, Monitoring und was pro Plattform tatsächlich zählt.',
        url: 'https://www.sitecheckai.dev/blog/ki-sichtbarkeit-erlangen',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'KI-Sichtbarkeit erlangen: So wirst du von ChatGPT, Claude & Perplexity zitiert',
    description: 'KI-Sichtbarkeit ist mehr als llms.txt und Schema Markup. Wie du wirklich von ChatGPT, Claude, Perplexity und Google AI Overview zitiert wirst - inklusive Monitoring mit AuditAI.',
    image: 'https://www.sitecheckai.dev/blog/ki-sichtbarkeit-erlangen/opengraph-image',
    datePublished: '2026-08-10T09:00:00+02:00',
    dateModified: '2026-08-10T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/blog/ki-sichtbarkeit-erlangen',
    mainEntityOfPage: 'https://www.sitecheckai.dev/blog/ki-sichtbarkeit-erlangen',
    about: [
        { '@type': 'Thing', name: 'KI-Sichtbarkeit' },
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
        { '@type': 'Thing', name: 'AI Visibility' },
    ],
    mentions: [
        { '@type': 'Thing', name: 'ChatGPT', url: 'https://chat.openai.com' },
        { '@type': 'Thing', name: 'Claude', url: 'https://claude.ai' },
        { '@type': 'Thing', name: 'Perplexity', url: 'https://perplexity.ai' },
    ],
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sitecheckai.dev/blog' },
        { '@type': 'ListItem', position: 3, name: 'KI-Sichtbarkeit erlangen', item: 'https://www.sitecheckai.dev/blog/ki-sichtbarkeit-erlangen' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was bedeutet KI-Sichtbarkeit erlangen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'KI-Sichtbarkeit erlangen bedeutet, dass KI-Modelle wie ChatGPT, Claude, Perplexity und Google AI Overview eine Website oder Marke kennen und in ihren Antworten aktiv zitieren oder empfehlen - nicht nur technisch crawlen können. Das erfordert drei Ebenen: technische Zugänglichkeit (llms.txt, Schema.org, Crawler-Erlaubnis), zitierbaren und autoritativen Content, und kontinuierliches Monitoring, ob die Maßnahmen tatsächlich wirken.',
            },
        },
        {
            '@type': 'Question',
            name: 'Reicht llms.txt und Schema Markup, um KI-Sichtbarkeit zu erlangen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nein. Technische GEO-Signale wie llms.txt, Schema.org und Crawler-Erlaubnis in robots.txt sind die Voraussetzung dafür, dass KI-Modelle eine Website überhaupt lesen und verstehen können - sie sind aber keine Garantie für eine Zitierung. Ob eine KI eine Quelle tatsächlich zitiert, hängt zusätzlich davon ab, wie autoritativ und vergleichbar der Content mit anderen Quellen zum selben Thema ist.',
            },
        },
        {
            '@type': 'Question',
            name: 'Warum zitieren ChatGPT, Claude und Perplexity unterschiedliche Quellen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'RAG-basierte Systeme wie Perplexity crawlen bei jeder Anfrage live das Web und zitieren dabei tendenziell viele verschiedene, frisch indexierte Quellen. Modelle mit Trainings-Cutoff wie Claude oder ChatGPT ohne Websuche greifen dagegen auf eine kleinere Zahl an Quellen zurück, die während des Trainings als besonders autoritativ eingestuft wurden - oft Vergleichs- und Übersichtsseiten. Deshalb unterscheidet sich die Strategie: für Perplexity zählt aktueller, gut indexierter Content, für Claude und ChatGPT zählt vor allem, ob eine Marke bereits in autoritativen Vergleichsquellen vorkommt.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie kann ich KI-Sichtbarkeit messen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'KI-Sichtbarkeit lässt sich messen, indem man dieselben Prompts wiederholt an ChatGPT, Claude, Perplexity und Google AI Overview stellt und protokolliert, ob und wie oft die eigene Domain erwähnt wird - als Mention-Rate pro Keyword und Plattform, plus welche Quellen stattdessen zitiert werden. Da KI-Antworten nicht deterministisch sind, braucht eine verlässliche Messung mehrere Wiederholungen über Zeit statt einer Einzelmessung.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist Share of Voice bei KI-Sichtbarkeit?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Share of Voice bei KI-Sichtbarkeit beschreibt, welcher Anteil der Zitate zu einem Thema oder Keyword auf die eigene Domain im Vergleich zu Wettbewerbern entfällt. Es reicht nicht zu wissen, ob man selbst zitiert wird - entscheidend ist auch, wer stattdessen zitiert wird und wie stark diese Konkurrenz das Thema dominiert.',
            },
        },
    ],
}

const LAYERS = [
    {
        number: '01',
        title: 'Technische Grundlage',
        color: '#06b6d4',
        desc: 'Die Voraussetzung, nicht die Lösung: llms.txt, Schema.org-Daten, FAQ-Schema mit sichtbarem HTML-Content, und KI-Crawler wie GPTBot, ClaudeBot und PerplexityBot explizit in robots.txt erlauben. Ohne das kann eine KI eine Website gar nicht lesen - mit alleine reicht es aber nicht, um zitiert zu werden.',
        internalLink: { label: 'GEO-Optimierung im Detail: die technische Checkliste', href: '/blog/geo-optimierung-2026' },
    },
    {
        number: '02',
        title: 'Zitierbarer, autoritativer Content',
        color: '#a78bfa',
        desc: 'KI-Modelle zitieren bevorzugt Quellen, die eine klare Aussage treffen und sich mit anderen Quellen zum selben Thema vergleichen lassen. Konkrete Fakten und Zahlen statt Marketingfloskeln, klare Definitionen im "X ist Y für Z"-Format, und vor allem: Präsenz in Vergleichs- und Übersichtsartikeln zum eigenen Themenfeld - eigene oder fremde. Modelle mit Trainings-Cutoff wie Claude greifen überproportional oft auf genau solche Vergleichsquellen zurück.',
    },
    {
        number: '03',
        title: 'Externe Erwähnung & E-E-A-T',
        color: '#10b981',
        desc: 'Wird die eigene Marke bereits an anderer Stelle im Web diskutiert - in Foren, Vergleichsartikeln, auf GitHub, in Testberichten? Je häufiger eine Domain im offenen Web mit einem Thema verknüpft auftaucht, desto eher übernehmen KI-Modelle diese Verknüpfung. Eine gepflegte About-Seite mit Gründerinfo und externe Quellenverweise verstärken zusätzlich das Vertrauenssignal.',
    },
    {
        number: '04',
        title: 'Kontinuierliches Monitoring',
        color: '#f59e0b',
        desc: 'KI-Antworten sind nicht deterministisch - dieselbe Frage kann je nach Zeitpunkt unterschiedlich beantwortet werden. Ohne wiederholte Messung lässt sich nicht unterscheiden, ob eine Maßnahme wirkt oder ob man nur eine Momentaufnahme sieht. Monitoring zeigt außerdem, wer stattdessen zitiert wird - und ob eine Formulierung wie "AI Visibility" von einem Modell überhaupt der richtigen Kategorie zugeordnet wird.',
        internalLink: { label: 'KI-Sichtbarkeit automatisiert tracken mit GEO Automatisierung', href: '/blog/seo-geo-automatisierung' },
    },
]

export default function KiSichtbarkeitErlangenPage() {
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
                    <span className="text-slate-500">KI-Sichtbarkeit erlangen</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-violet-500/15 text-violet-400">
                            GEO
                        </span>
                        <span className="text-xs text-slate-600">10. August 2026</span>
                        <span className="text-xs text-slate-600">· 9 min Lesezeit</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        KI-Sichtbarkeit erlangen: So wirst du von ChatGPT, Claude & Perplexity zitiert
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        llms.txt anlegen und Schema Markup einbauen ist der leichte Teil. Der eigentliche Grund, warum die meisten Websites trotzdem nicht zitiert werden, liegt eine Ebene tiefer - bei Content-Strategie und Monitoring. Hier ist der vollständige Weg zu echter KI-Sichtbarkeit, plattformspezifisch.
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

                <div className="prose prose-invert prose-slate max-w-none space-y-10 text-slate-300 leading-relaxed">

                    <nav aria-label="Inhaltsverzeichnis" className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">In diesem Artikel</p>
                        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            <li><a href="#was-ist-ki-sichtbarkeit" className="text-slate-400 hover:text-violet-300 transition-colors">Was ist KI-Sichtbarkeit genau?</a></li>
                            <li><a href="#warum-technik-nicht-reicht" className="text-slate-400 hover:text-violet-300 transition-colors">Warum reicht Technik allein nicht?</a></li>
                            {LAYERS.map((l) => (
                                <li key={l.number}>
                                    <a href={`#ebene-${l.number}`} className="text-slate-400 hover:text-violet-300 transition-colors">
                                        <span className="font-mono text-slate-600 mr-1.5">{l.number}</span>{l.title}
                                    </a>
                                </li>
                            ))}
                            <li><a href="#pro-plattform" className="text-slate-400 hover:text-violet-300 transition-colors">Was zählt pro Plattform?</a></li>
                            <li><a href="#faq" className="text-slate-400 hover:text-violet-300 transition-colors">Häufige Fragen</a></li>
                        </ol>
                    </nav>

                    <section id="was-ist-ki-sichtbarkeit" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Was ist KI-Sichtbarkeit genau?</h2>
                        <p>
                            <strong className="text-white">KI-Sichtbarkeit</strong> beschreibt, wie oft und wie prominent eine Website oder Marke in den Antworten von KI-Modellen wie ChatGPT, Claude, Perplexity oder Google AI Overview erwähnt wird. Sie ist das GEO-Äquivalent zu Google-Rankings im klassischen SEO - nur dass die "Suchergebnisseite" eine generierte Antwort statt einer Liste von Links ist, und dass eine Marke entweder erwähnt wird oder eben nicht, mit allem dazwischen (Kontext, Sentiment, welche Quellen daneben zitiert werden).
                        </p>
                        <p className="mt-4">
                            "KI-Sichtbarkeit erlangen" heißt deshalb mehr als nur crawlbar zu sein. Es bedeutet, dass ein Modell eine Domain kennt, sie einem Thema zuordnet, und sie gegenüber anderen möglichen Quellen für zitierwürdig genug hält.
                        </p>
                    </section>

                    <section id="warum-technik-nicht-reicht" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Warum reicht Technik allein nicht?</h2>
                        <p>
                            llms.txt, Schema.org und offene Crawler-Regeln lösen ein Zugänglichkeitsproblem: Kann die KI die Seite überhaupt lesen? Sie lösen aber kein Autoritätsproblem: Warum sollte die KI ausgerechnet diese Seite zitieren statt einer von hundert anderen zum selben Thema?
                        </p>
                        <div className="bg-violet-500/8 border border-violet-500/20 rounded-2xl p-5 mt-5">
                            <p className="text-sm text-violet-300 font-medium mb-1">Der häufigste Fehler</p>
                            <p className="text-sm text-slate-400">
                                Websites setzen alle technischen GEO-Signale um, bleiben aber trotzdem unzitiert - weil an keiner Stelle im Web (auch nicht auf der eigenen Seite) ein Vergleich existiert, der die eigene Marke neben den bereits etablierten Antworten auf dieselbe Frage positioniert.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-2">Die 4 Ebenen, um KI-Sichtbarkeit zu erlangen</h2>
                        <p className="text-slate-400 mb-6">Technik ist nur die erste von vier Ebenen. Erst alle vier zusammen führen zu tatsächlichen Zitierungen:</p>
                        <div className="space-y-4">
                            {LAYERS.map((l) => (
                                <div key={l.number} id={`ebene-${l.number}`} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 scroll-mt-28">
                                    <div className="flex items-start gap-4">
                                        <span className="text-[11px] font-bold font-mono shrink-0 mt-0.5" style={{ color: l.color }}>{l.number}</span>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white mb-2">{l.title}</h3>
                                            <p className="text-sm text-slate-400 leading-relaxed">{l.desc}</p>
                                            {l.internalLink && (
                                                <Link
                                                    href={l.internalLink.href}
                                                    className="mt-3 inline-block text-xs text-violet-400 hover:text-violet-300 underline underline-offset-2"
                                                >
                                                    {l.internalLink.label} →
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="pro-plattform" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Was zählt pro Plattform - Claude, ChatGPT, Perplexity, Google AI Overview?</h2>
                        <p>
                            KI-Sichtbarkeit ist keine einzelne Kennzahl - jede Plattform funktioniert technisch anders und braucht deshalb eine andere Priorität:
                        </p>
                        <div className="overflow-hidden rounded-2xl border border-white/[0.07] mt-5">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <th className="text-left px-5 py-3 text-slate-400 font-semibold">Plattform</th>
                                        <th className="text-left px-5 py-3 text-slate-400 font-semibold">Funktionsweise</th>
                                        <th className="text-left px-5 py-3 text-violet-400 font-semibold">Was zählt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['Perplexity', 'Live-Websuche bei jeder Anfrage (RAG)', 'Aktueller, gut indexierter Content - reagiert am schnellsten auf neue Inhalte'],
                                        ['Claude', 'Überwiegend Trainingsdaten', 'Präsenz in bereits etablierten, autoritativen Vergleichsquellen'],
                                        ['ChatGPT', 'Trainingsdaten, teils mit Websuche', 'Eindeutige Begriffe - mehrdeutige Formulierungen werden leicht falsch zugeordnet'],
                                        ['Google AI Overview', 'Google-Index als Basis', 'Klassisches SEO-Ranking bleibt Voraussetzung für die Zitierquelle'],
                                    ].map(([platform, how, what], i) => (
                                        <tr key={i} className="border-b border-white/[0.04] last:border-0">
                                            <td className="px-5 py-3 text-white font-medium">{platform}</td>
                                            <td className="px-5 py-3 text-slate-400">{how}</td>
                                            <td className="px-5 py-3 text-slate-300">{what}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4">
                            Genau diese Streuung ist auch der Grund, warum Monitoring pro Plattform getrennt sinnvoll ist statt einer einzigen Gesamtzahl - eine Marke kann auf Claude sehr sichtbar und auf ChatGPT für dieselbe Frage komplett unsichtbar sein.
                        </p>
                    </section>

                    <section id="faq" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Häufige Fragen zu KI-Sichtbarkeit</h2>
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
                        Wirst du bei ChatGPT, Claude & Perplexity zitiert?
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        GEO Automatisierung von AuditAI testet wöchentlich automatisch, ob deine Domain erwähnt wird - inklusive Kontext, Konkurrenzvergleich und Verlauf über Zeit. Ab 4,99 €/Monat, 14 Tage kostenlos testen.
                    </p>
                    <Link
                        href="/geo/pricing"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20"
                    >
                        KI-Sichtbarkeit jetzt tracken
                    </Link>
                    <div className="mt-3 text-xs text-slate-600">14 Tage kostenlos · Claude, ChatGPT, Perplexity, Google AI Overview</div>
                </div>

                {/* Back to blog */}
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
