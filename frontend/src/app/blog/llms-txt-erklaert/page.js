import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'llms.txt erklärt: Was es ist und wie du es richtig einrichtest',
    description: 'llms.txt einfach erklärt: die robots.txt für KI-Modelle. Herkunft, Aufbau, Unterschied zu llms-full.txt und eine Schritt-für-Schritt-Anleitung zum Erstellen.',
    keywords: 'llms.txt, llms.txt was ist das, llms.txt erstellen, llms-full.txt, ai crawler datei, llms.txt beispiel, llms.txt generator',
    alternates: { canonical: 'https://www.sitecheckai.dev/blog/llms-txt-erklaert' },
    openGraph: {
        title: 'llms.txt erklärt: Was es ist und wie du es richtig einrichtest',
        description: 'Die robots.txt für KI-Modelle: Herkunft, Aufbau und Schritt-für-Schritt-Anleitung.',
        url: 'https://www.sitecheckai.dev/blog/llms-txt-erklaert',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'llms.txt erklärt: Was es ist und wie du es richtig einrichtest',
    description: 'llms.txt einfach erklärt: die robots.txt für KI-Modelle. Herkunft, Aufbau, Unterschied zu llms-full.txt und eine Schritt-für-Schritt-Anleitung.',
    image: 'https://www.sitecheckai.dev/blog/llms-txt-erklaert/opengraph-image',
    datePublished: '2026-07-26T09:00:00+02:00',
    dateModified: '2026-07-30T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/blog/llms-txt-erklaert',
    mainEntityOfPage: 'https://www.sitecheckai.dev/blog/llms-txt-erklaert',
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sitecheckai.dev/blog' },
        { '@type': 'ListItem', position: 3, name: 'llms.txt erklärt', item: 'https://www.sitecheckai.dev/blog/llms-txt-erklaert' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was ist llms.txt?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'llms.txt ist eine Markdown-Textdatei im Root-Verzeichnis einer Website (ähnlich wie robots.txt), die KI-Modellen in strukturierter, kompakter Form erklärt, was eine Website ist, was sie anbietet und wo relevante Inhalte liegen. Sie wurde im September 2024 von Jeremy Howard (Answer.AI) als offener Standard vorgeschlagen.',
            },
        },
        {
            '@type': 'Question',
            name: 'Ist llms.txt Pflicht für KI-Sichtbarkeit?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nein, es ist kein offizieller Google- oder OpenAI-Standard und keine Pflicht. Es ist ein freiwilliger, community-getriebener Vorschlag, den aber immer mehr Websites und Dokumentations-Plattformen übernehmen, weil er KI-Crawlern eine klare erste Orientierung gibt statt sie durch Navigation, Werbung und JavaScript navigieren zu lassen.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist der Unterschied zwischen llms.txt und llms-full.txt?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'llms.txt ist eine kurze Übersicht - Produktbeschreibung, Kernaussagen, Links zu weiteren Ressourcen. llms-full.txt (optional) enthält dieselben Informationen in ausführlicher Form, oft inklusive Preisen, FAQs und technischen Details, für KI-Modelle die mehr Kontext laden können.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wo muss llms.txt liegen und wie finde ich es?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Im Root-Verzeichnis der Domain, erreichbar unter deinedomain.de/llms.txt - genau wie robots.txt oder sitemap.xml. Es muss öffentlich und ohne Login abrufbar sein, damit KI-Crawler es lesen können.',
            },
        },
    ],
}

const STRUCTURE = [
    { part: '# Projektname', desc: 'Ein H1 mit dem Namen deiner Website oder deines Produkts - Pflichtfeld laut Spezifikation.' },
    { part: '> Kurzbeschreibung', desc: 'Ein Blockquote-Absatz: was die Website ist, in ein bis zwei Sätzen, ohne Marketing-Floskeln.' },
    { part: '## Abschnitte mit Links', desc: 'Frei wählbare H2-Überschriften (z.B. "Docs", "Preise", "API") mit Markdown-Links zu den wichtigsten Unterseiten.' },
    { part: '## Optional', desc: 'Ein Abschnitt für weniger wichtige Links, die KI-Modelle bei Bedarf überspringen können.' },
]

const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Eine llms.txt erstellen',
    description: 'Die Struktur einer llms.txt-Datei Schritt für Schritt aufgebaut, laut llmstxt.org-Spezifikation.',
    totalTime: 'PT10M',
    step: [
        { '@type': 'HowToStep', name: 'Projektname als H1', text: 'Ein H1 mit dem Namen deiner Website oder deines Produkts - Pflichtfeld laut Spezifikation.' },
        { '@type': 'HowToStep', name: 'Kurzbeschreibung als Blockquote', text: 'Ein Blockquote-Absatz: was die Website ist, in ein bis zwei Sätzen, ohne Marketing-Floskeln.' },
        { '@type': 'HowToStep', name: 'Abschnitte mit Links', text: 'Frei wählbare H2-Überschriften (z. B. "Docs", "Preise", "API") mit Markdown-Links zu den wichtigsten Unterseiten.' },
        { '@type': 'HowToStep', name: 'Optional-Abschnitt', text: 'Ein Abschnitt für weniger wichtige Links, die KI-Modelle bei Bedarf überspringen können.' },
        { '@type': 'HowToStep', name: 'Unter /llms.txt veröffentlichen', text: 'Datei öffentlich und ohne Login im Root-Verzeichnis der Domain bereitstellen, im validen Markdown-Format.' },
    ],
}

const MISTAKES = [
    { title: 'Marketing-Text statt Fakten', desc: 'llms.txt sollte präzise und faktisch sein - "X ist ein Y für Z, das A macht" statt Werbesprache. KI-Modelle extrahieren daraus direkte Aussagen.' },
    { title: 'Datei blockiert oder hinter Login', desc: 'llms.txt muss öffentlich ohne Authentifizierung erreichbar sein - sonst können KI-Crawler es gar nicht lesen.' },
    { title: 'Nie aktualisiert', desc: 'Neue Features, geänderte Preise oder umbenannte Produkte veralten in der Datei, wenn sie nicht bei Änderungen mitgepflegt wird.' },
    { title: 'Falsches Format', desc: 'llms.txt muss valides Markdown sein, keine HTML-Seite mit .txt-Endung - sonst können viele Parser es nicht sauber verarbeiten.' },
]

export default function LlmsTxtPage() {
    return (
        <main className="bg-[#05080f] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
                    <Link href="/" className="hover:text-slate-400 transition-colors">AuditAI</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-slate-400 transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-slate-500">llms.txt erklärt</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-cyan-500/15 text-cyan-400">
                            GEO
                        </span>
                        <span className="text-xs text-slate-600">26. Juli 2026</span>
                        <span className="text-xs text-slate-600">· 7 min Lesezeit</span>
                        <span className="text-xs text-slate-600">· Aktualisiert am 30. Juli 2026</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        llms.txt erklärt: Was es ist und wie du es richtig einrichtest
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Eine einzige Textdatei im Root-Verzeichnis kann darüber entscheiden, ob KI-Modelle deine Website überhaupt verstehen. Hier erfährst du, woher llms.txt kommt, wie es aufgebaut ist und wie du in 10 Minuten deine eigene erstellst.
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
                        <h2 className="text-2xl font-bold text-white mb-4">Was ist llms.txt?</h2>
                        <p>
                            llms.txt ist eine Markdown-Datei im Root-Verzeichnis einer Website - erreichbar unter <code className="text-xs bg-white/[0.06] px-1.5 py-0.5 rounded">deinedomain.de/llms.txt</code>, ähnlich wie robots.txt oder sitemap.xml. Der Unterschied: robots.txt sagt Crawlern, was sie NICHT besuchen dürfen. llms.txt sagt KI-Modellen, WAS deine Website ist und WO die wichtigsten Inhalte liegen - eine strukturierte Kurzfassung statt einer HTML-Seite voller Navigation, Werbung und JavaScript.
                        </p>
                        <p className="mt-4">
                            Vorgeschlagen wurde der Standard im{' '}
                            <a href="https://www.answer.ai/posts/2024-09-03-llmstxt.html" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                                September 2024 von Jeremy Howard und dem Team von Answer.AI
                            </a>{' '}
                            - als Reaktion auf ein konkretes Problem: Kontextfenster von KI-Modellen sind zu klein für komplette Websites, und normale HTML-Seiten sind für Sprachmodelle unnötig schwer zu verarbeiten.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Warum llms.txt für GEO relevant ist</h2>
                        <p>
                            Viele KI-Crawler lesen llms.txt als erste Orientierung, bevor sie den Rest der Website crawlen - ähnlich wie Googlebot zuerst robots.txt und sitemap.xml prüft. Eine gepflegte llms.txt erhöht die Wahrscheinlichkeit, dass ein KI-Modell deine Produktdefinition korrekt versteht, statt sie aus fragmentierten HTML-Schnipseln zu erraten.
                        </p>
                        <p className="mt-4">
                            Wichtig für die Einordnung: llms.txt ist kein offizieller Standard von Google, OpenAI oder Anthropic und garantiert keine Zitate. Es ist ein freiwilliger, offener Vorschlag - aber einer, den immer mehr Dokumentations-Plattformen und Tools übernehmen, weil er strukturell Sinn ergibt. Es ist nur eines von mehreren GEO-Signalen - die vollständige Übersicht steht in unserem Artikel zur{' '}
                            <Link href="/blog/geo-optimierung-2026" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                                GEO-Optimierung 2026
                            </Link>, zusammen mit{' '}
                            <Link href="/blog/schema-markup-ki-zitate" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                                Schema Markup für KI-Zitate
                            </Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">Wie ist eine llms.txt aufgebaut?</h2>
                        <div className="space-y-3">
                            {STRUCTURE.map((s) => (
                                <div key={s.part} className="flex items-start gap-4 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                                    <code className="text-xs text-cyan-400 font-mono shrink-0 mt-0.5 whitespace-nowrap">{s.part}</code>
                                    <span className="text-sm text-slate-400">{s.desc}</span>
                                </div>
                            ))}
                        </div>
                        <pre className="mt-5 text-xs bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 text-slate-400 font-mono overflow-x-auto">
{`# MeinProdukt
> MeinProdukt ist ein Tool für X, das Y in unter 60 Sekunden löst.

## Docs
- [Erste Schritte](https://beispiel.de/docs/start): Schnelleinstieg
- [API-Referenz](https://beispiel.de/docs/api): Vollständige API-Doku

## Preise
- [Preise & Pläne](https://beispiel.de/pricing): Alle Tarife im Überblick`}
                        </pre>
                        <p className="text-xs text-slate-600 mt-3">
                            Vollständige Spezifikation:{' '}
                            <a href="https://llmstxt.org" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-400 underline underline-offset-2">
                                llmstxt.org ↗
                            </a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">llms.txt vs. llms-full.txt: Was ist der Unterschied?</h2>
                        <p>
                            llms.txt bleibt bewusst kurz - eine Orientierung mit Links. llms-full.txt (optional, unter <code className="text-xs bg-white/[0.06] px-1.5 py-0.5 rounded">/llms-full.txt</code>) enthält dieselben Themen ausführlicher: Preise im Detail, häufige Fragen, technische Spezifikationen. Für KI-Modelle, die mehr Kontext auf einmal laden können, liefert die ausführliche Version direktere, zitierfähige Antworten - ohne dass Nutzer erst mehrere verlinkte Unterseiten abklappern müssen.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">Häufige Fehler beim Einrichten</h2>
                        <div className="space-y-3">
                            {MISTAKES.map((m) => (
                                <div key={m.title} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
                                    <h3 className="font-semibold text-white mb-1.5 text-sm">{m.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{m.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Häufige Fragen zu llms.txt</h2>
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
                <div className="mt-14 bg-gradient-to-br from-cyan-950/40 to-[#05080f] border border-cyan-500/20 rounded-2xl p-6 sm:p-8 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                        Hast du bereits eine llms.txt?
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        AuditAI prüft automatisch, ob llms.txt und llms-full.txt vorhanden und korrekt formatiert sind - als Teil von 19 GEO-Signalen in unter 60 Sekunden. Start ohne Registrierung, für den vollständigen Report mit allen Scores meldest du dich kostenlos an.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20"
                    >
                        GEO-Score jetzt prüfen
                    </Link>
                    <div className="mt-3 text-xs text-slate-600">Ohne Registrierung starten · Voller Report kostenlos · 60 Sekunden</div>
                </div>

                {/* Cross-link to sibling posts */}
                <div className="mt-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1 block">Weiterlesen</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                GEO-Optimierung 2026: So wirst du von ChatGPT und Claude empfohlen
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                llms.txt ist eines von 19 GEO-Signalen - die vollständige Übersicht, was sonst noch zählt.
                            </p>
                        </div>
                        <Link
                            href="/blog/geo-optimierung-2026"
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