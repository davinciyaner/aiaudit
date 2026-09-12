import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import FaqAccordion from './FaqAccordion'

export const metadata = {
    title: 'llms.txt erklärt: Beispiel, Vorlage & Schritt-für-Schritt-Anleitung',
    description: 'llms.txt einfach erklärt: Definition, Unterschied zu robots.txt, ein echtes Beispiel zum Kopieren und eine Schritt-für-Schritt-Anleitung, um deine eigene llms.txt-Datei zu erstellen und zu implementieren.',
    keywords: 'llms.txt, llms txt, llms.txt erstellen, llms.txt beispiel, llms.txt implementierung, llms.txt datei erstellen, llms.txt vorlage, llms.txt was ist das, llms-full.txt, ai crawler datei, llms.txt generator',
    alternates: {
        canonical: 'https://www.scanora.ai/blog/llms-txt-erklaert',
        languages: {
            'de-DE': 'https://www.scanora.ai/blog/llms-txt-erklaert',
            'en-US': 'https://www.scanora.ai/en/blog/llms-txt-explained',
        },
    },
    openGraph: {
        title: 'llms.txt erklärt: Beispiel, Vorlage & Schritt-für-Schritt-Anleitung',
        description: 'llms.txt einfach erklärt: Definition, Unterschied zu robots.txt, ein echtes Beispiel und eine Schritt-für-Schritt-Anleitung zur Implementierung.',
        url: 'https://www.scanora.ai/blog/llms-txt-erklaert',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'llms.txt erklärt: Beispiel, Vorlage & Schritt-für-Schritt-Anleitung',
    description: 'llms.txt einfach erklärt: Definition, Unterschied zu robots.txt, ein echtes Beispiel und eine Schritt-für-Schritt-Anleitung zum Erstellen und Implementieren.',
    image: 'https://www.scanora.ai/blog/llms-txt-erklaert/opengraph-image',
    datePublished: '2026-07-26T09:00:00+02:00',
    dateModified: '2026-09-12T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.scanora.ai/about' },
    publisher: {
        '@type': 'Organization',
        name: 'Scanora',
        url: 'https://www.scanora.ai',
        logo: { '@type': 'ImageObject', url: 'https://www.scanora.ai/logo', width: 512, height: 512 },
    },
    url: 'https://www.scanora.ai/blog/llms-txt-erklaert',
    mainEntityOfPage: 'https://www.scanora.ai/blog/llms-txt-erklaert',
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.scanora.ai/blog' },
        { '@type': 'ListItem', position: 3, name: 'llms.txt erklärt', item: 'https://www.scanora.ai/blog/llms-txt-erklaert' },
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
                text: 'llms.txt ist eine öffentliche Markdown-Textdatei im Root-Verzeichnis einer Website (erreichbar unter deinedomain.de/llms.txt, ähnlich wie robots.txt), die KI-Modellen in strukturierter, kompakter Form erklärt, was eine Website ist, was sie anbietet und wo relevante Inhalte liegen. Sie wurde im September 2024 von Jeremy Howard (Answer.AI) als informeller, offener Standard vorgeschlagen - kein offizieller W3C-Standard.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was gehört in eine llms.txt-Datei?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Laut Spezifikation vier Bestandteile: ein H1 mit dem Projekt- oder Websitenamen, ein Blockquote mit einer kurzen, faktischen Beschreibung, beliebig viele H2-Abschnitte mit Markdown-Links zu den wichtigsten Unterseiten (z. B. Docs, Preise, API) und optional ein "Optional"-Abschnitt für weniger wichtige Links, die KI-Modelle bei Bedarf überspringen können.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist der Unterschied zwischen llms.txt und robots.txt?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'robots.txt ist eine Verbotsliste: Sie sagt Crawlern, welche Bereiche einer Website sie NICHT besuchen dürfen, und ist ein etablierter, von Suchmaschinen respektierter Standard. llms.txt ist das Gegenteil - eine positive, kuratierte Übersicht, die KI-Modellen sagt, WAS eine Website ist und WO die wichtigsten Inhalte liegen. llms.txt ist zudem kein offiziell bestätigter Standard, robots.txt schon.',
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
            name: 'Ist llms.txt Pflicht?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nein. Es ist kein offizieller Standard von Google, OpenAI oder Anthropic, und keiner der großen KI-Anbieter hat bestätigt, llms.txt automatisch abzurufen. Google hat sogar explizit erklärt, dass die Datei für die Suche und AI Overviews nicht notwendig ist. Es bleibt ein freiwilliger, community-getriebener Vorschlag ohne belegte, garantierte Wirkung auf KI-Zitate - aber ohne Nachteile, wenn sie korrekt eingerichtet ist.',
            },
        },
        {
            '@type': 'Question',
            name: 'Prüft Google llms.txt für die Google-Suche oder nur KI-Systeme wie AI Overview?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Weder noch mit garantierter Wirkung: Google hat erklärt, dass llms.txt für die reguläre Google-Suche und für AI Overviews nicht notwendig ist, weil Google Seiteninhalte bereits vollständig über die bestehende Indexierung crawlt. Die Datei richtet sich stattdessen an externe KI-Systeme und Tools, die gezielt danach suchen (z. B. RAG-Systeme oder KI-Coding-Agents) - nicht an den Google-Suchindex selbst.',
            },
        },
        {
            '@type': 'Question',
            name: 'Nutzen ChatGPT, Claude oder Perplexity llms.txt?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Keiner dieser Anbieter hat offiziell bestätigt, gezielt /llms.txt abzurufen, und Logfile-Analysen mehrerer SEO-Tools fanden bisher keine belastbaren Hinweise auf einen systematischen Abruf durch ChatGPT-, Claude- oder Perplexity-Crawler. Möglich ist die Nutzung dennoch, etwa wenn ein Nutzer eine URL direkt in ein Chat-Fenster einfügt oder ein KI-Coding-Agent das Root-Verzeichnis einer Website durchsucht.',
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
        {
            '@type': 'Question',
            name: 'Wie erstelle ich eine llms.txt-Datei Schritt für Schritt?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Eine Markdown-Datei mit H1-Projektname, einem Blockquote mit Kurzbeschreibung und H2-Abschnitten mit Links zu den wichtigsten Unterseiten (z. B. Docs, Preise, API) erstellen, als llms.txt speichern und im Root-Verzeichnis unter deinedomain.de/llms.txt öffentlich sowie ohne Login bereitstellen. Die vollständige Implementierung dauert in der Regel unter 10 Minuten.',
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
    name: 'llms.txt erstellen und implementieren',
    description: 'Schritt-für-Schritt-Anleitung, um eine llms.txt-Datei zu erstellen und auf der eigenen Website zu implementieren, laut llmstxt.org-Spezifikation.',
    totalTime: 'PT10M',
    step: [
        { '@type': 'HowToStep', name: 'Projektname als H1 festlegen', text: 'Ein H1 mit dem Namen deiner Website oder deines Produkts - Pflichtfeld laut Spezifikation.' },
        { '@type': 'HowToStep', name: 'Kurzbeschreibung als Blockquote schreiben', text: 'Ein Blockquote-Absatz: was die Website ist, in ein bis zwei Sätzen, ohne Marketing-Floskeln.' },
        { '@type': 'HowToStep', name: 'Abschnitte mit Links strukturieren', text: 'Frei wählbare H2-Überschriften (z. B. "Docs", "Preise", "API") mit Markdown-Links zu den wichtigsten Unterseiten.' },
        { '@type': 'HowToStep', name: 'Optional-Abschnitt ergänzen', text: 'Ein Abschnitt für weniger wichtige Links, die KI-Modelle bei Bedarf überspringen können.' },
        { '@type': 'HowToStep', name: 'Datei als llms.txt speichern', text: 'Die fertige Markdown-Datei exakt als "llms.txt" (Kleinschreibung, ohne zusätzliche Endung) speichern.' },
        { '@type': 'HowToStep', name: 'Unter /llms.txt implementieren', text: 'Datei öffentlich und ohne Login im Root-Verzeichnis der Domain bereitstellen, sodass sie unter deinedomain.de/llms.txt abrufbar ist.' },
        { '@type': 'HowToStep', name: 'Erreichbarkeit prüfen', text: 'Die URL direkt im Browser öffnen und kontrollieren, dass reiner Markdown-Text ausgeliefert wird - kein HTML, kein Login, kein 404.' },
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
        <main className="bg-[var(--bg-base)] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-[var(--text-faint)] mb-8">
                    <Link href="/" className="hover:text-[var(--text-muted)] transition-colors">Scanora</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-[var(--text-muted)] transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-[var(--text-faint)]">llms.txt erklärt</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-cyan-500/15 text-cyan-400">
                            GEO
                        </span>
                        <span className="text-xs text-[var(--text-faint)]">26. Juli 2026</span>
                        <span className="text-xs text-[var(--text-faint)]">· 8 min Lesezeit</span>
                        <span className="text-xs text-[var(--text-faint)]">· Aktualisiert am 12. September 2026</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text-white)] leading-tight tracking-tight mb-5">
                        llms.txt erklärt: Beispiel, Vorlage & Schritt-für-Schritt-Anleitung
                    </h1>
                    <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                        <strong className="text-[var(--text-white)] font-semibold">llms.txt</strong> ist eine öffentliche Markdown-Datei unter <code className="text-sm bg-[var(--text-white)]/[0.06] px-1.5 py-0.5 rounded">deinedomain.de/llms.txt</code>, die KI-Modellen wie ChatGPT, Claude oder Perplexity in wenigen Sätzen erklärt, was eine Website ist und wo ihre wichtigsten Inhalte liegen. Anders als robots.txt, die Crawlern nur sagt, was sie <em>nicht</em> besuchen dürfen, liefert llms.txt eine positive, kuratierte Übersicht - lesbar für Sprachmodelle statt für klassische Suchmaschinen-Crawler. Genutzt wird der 2024 vorgeschlagene, informelle Standard vor allem von SaaS-Produkten, Doku-Seiten und KI-Coding-Agents, die schnell den Kontext einer Website erfassen müssen. Weiter unten: ein echtes Beispiel und die Schritt-für-Schritt-Anleitung zum Erstellen.
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
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Woher kommt llms.txt und welches Problem löst es?</h2>
                        <p>
                            llms.txt ist ähnlich aufgebaut wie <code className="text-xs bg-[var(--text-white)]/[0.06] px-1.5 py-0.5 rounded">robots.txt</code> oder <code className="text-xs bg-[var(--text-white)]/[0.06] px-1.5 py-0.5 rounded">sitemap.xml</code> - eine schlichte Textdatei im Root-Verzeichnis, kein zusätzliches Framework, keine Konfiguration. Vorgeschlagen wurde der Standard im{' '}
                            <a href="https://www.answer.ai/posts/2024-09-03-llmstxt.html" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                                September 2024 von Jeremy Howard und dem Team von Answer.AI
                            </a>{' '}
                            - als Reaktion auf ein konkretes Problem: Kontextfenster von KI-Modellen sind begrenzt und normale HTML-Seiten voller Navigation, Werbung und JavaScript sind für Sprachmodelle unnötig schwer zu verarbeiten. llms.txt liefert stattdessen reinen, strukturierten Markdown-Text.
                        </p>
                        <p className="mt-4">
                            Genutzt wird die Datei heute vor allem von drei Gruppen: SaaS- und Dev-Tool-Anbietern, die ihre Doku KI-lesbar machen wollen, RAG-Systemen, die gezielt nach einer kompakten Website-Übersicht suchen, und KI-Coding-Agents (z. B. in Cursor oder Claude Code), die schnell verstehen müssen, worum es auf einer Website geht. Wichtig für die Einordnung: Es handelt sich um einen informellen, community-getriebenen Standard - kein offizieller W3C-Standard und keine von Google, OpenAI oder Anthropic offiziell bestätigte Spezifikation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Nutzt Google llms.txt wirklich? Der aktuelle Stand</h2>
                        <p>
                            Kein großer KI-Anbieter hat bislang offiziell bestätigt, llms.txt tatsächlich einzulesen. Google hat sich am deutlichsten geäußert: Die Datei ist für die Google-Suche und AI Overviews nicht notwendig, weil Google Seiteninhalte bereits vollständig über die reguläre Indexierung crawlt und verarbeitet - eine separate Zusammenfassungsdatei bringt dafür keinen zusätzlichen Nutzen. Auch für ChatGPT, Claude oder Perplexity gibt es keine offizielle Bestätigung eines gezielten /llms.txt-Abrufs, und Logfile-Analysen mehrerer SEO-Tools fanden bisher keine Hinweise darauf, dass die bekannten KI-Crawler die Datei tatsächlich abrufen.
                        </p>
                        <p className="mt-4">
                            Für die Einordnung heißt das: llms.txt ist aktuell kein nachgewiesenes GEO-Signal mit belegter Wirkung auf Zitate oder Rankings, sondern ein freiwilliger, community-getriebener Vorschlag ohne offizielle Unterstützung der großen KI-Anbieter. Sinnvoll bleibt sie trotzdem als saubere Produkt-Dokumentation für dich selbst und für Tools, die gezielt danach suchen (z. B. manche RAG-Systeme oder KI-Coding-Agents) - nur solltest du sie nicht als Hauptstrategie für KI-Sichtbarkeit behandeln. Die Signale mit belegter Wirkung wie Schema Markup, Crawler-Freigaben und zitierbare Inhalte findest du in unserem Artikel zur{' '}
                            <Link href="/blog/geo-optimierung-2026" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                                GEO-Optimierung 2026
                            </Link>, zusammen mit{' '}
                            <Link href="/blog/schema-markup-ki-zitate" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                                Schema Markup für KI-Zitate
                            </Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-2">Was gehört in eine llms.txt-Datei? Der Aufbau</h2>
                        <p className="text-sm text-[var(--text-muted)] mb-6">
                            Die Spezifikation kennt vier Bausteine - in genau dieser Reihenfolge:
                        </p>
                        <div className="space-y-3">
                            {STRUCTURE.map((s) => (
                                <div key={s.part} className="flex items-start gap-4 bg-[var(--text-white)]/[0.02] border border-[var(--text-white)]/[0.06] rounded-xl p-4">
                                    <code className="text-xs text-cyan-400 font-mono shrink-0 mt-0.5 whitespace-nowrap">{s.part}</code>
                                    <span className="text-sm text-[var(--text-muted)]">{s.desc}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-[var(--text-muted)] mt-6 mb-2">
                            Ein vollständiges llms.txt-Beispiel nach dieser Struktur:
                        </p>
                        <pre className="text-xs bg-[var(--text-white)]/[0.04] border border-[var(--text-white)]/[0.06] rounded-xl p-4 text-[var(--text-muted)] font-mono overflow-x-auto">
{`# MeinProdukt
> MeinProdukt ist ein Tool für X, das Y in unter 60 Sekunden löst.

## Docs
- [Erste Schritte](https://beispiel.de/docs/start): Schnelleinstieg
- [API-Referenz](https://beispiel.de/docs/api): Vollständige API-Doku
- [Konfiguration](https://beispiel.de/docs/config): Alle Einstellungen im Detail

## Preise
- [Preise & Pläne](https://beispiel.de/pricing): Alle Tarife im Überblick

## Optional
- [Blog](https://beispiel.de/blog): Produkt-Updates und Artikel
- [Changelog](https://beispiel.de/changelog): Versionsverlauf`}
                        </pre>
                        <p className="text-xs text-[var(--text-faint)] mt-3">
                            Vollständige Spezifikation:{' '}
                            <a href="https://llmstxt.org" target="_blank" rel="noopener noreferrer" className="text-[var(--text-faint)] hover:text-[var(--text-muted)] underline underline-offset-2">
                                llmstxt.org ↗
                            </a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-2">llms.txt erstellen: Schritt-für-Schritt-Anleitung</h2>
                        <p className="text-sm text-[var(--text-muted)] mb-6">
                            So erstellst und implementierst du deine eigene llms.txt-Datei - vom leeren Editor bis zur live erreichbaren Datei unter <code className="text-xs bg-[var(--text-white)]/[0.06] px-1.5 py-0.5 rounded">/llms.txt</code>:
                        </p>
                        <ol className="space-y-3">
                            {howToLd.step.map((step, i) => (
                                <li key={step.name} className="flex items-start gap-4 bg-[var(--text-white)]/[0.02] border border-[var(--text-white)]/[0.06] rounded-xl p-4">
                                    <span className="shrink-0 w-6 h-6 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                                    <span className="text-sm text-[var(--text-muted)]">
                                        <span className="text-[var(--text-white)] font-semibold">{step.name}.</span> {step.text}
                                    </span>
                                </li>
                            ))}
                        </ol>
                        <p className="text-sm text-[var(--text-muted)] mt-5">
                            Für die meisten Websites reicht dafür ein einfacher Texteditor und Zugriff auf das Root-Verzeichnis des Servers oder Hosting-Panels - ein CMS-Plugin oder Build-Skript ist nicht zwingend nötig, kann die Implementierung bei häufigen Änderungen aber automatisieren.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">llms.txt vs. llms-full.txt: Was ist der Unterschied?</h2>
                        <p>
                            llms.txt bleibt bewusst kurz - eine Orientierung mit Links. llms-full.txt (optional, unter <code className="text-xs bg-[var(--text-white)]/[0.06] px-1.5 py-0.5 rounded">/llms-full.txt</code>) enthält dieselben Themen ausführlicher: Preise im Detail, häufige Fragen, technische Spezifikationen. Für KI-Modelle, die mehr Kontext auf einmal laden können, liefert die ausführliche Version direktere, zitierfähige Antworten - ohne dass Nutzer erst mehrere verlinkte Unterseiten abklappern müssen.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-6">Häufige Fehler beim Einrichten</h2>
                        <div className="space-y-3">
                            {MISTAKES.map((m) => (
                                <div key={m.title} className="bg-[var(--text-white)]/[0.02] border border-[var(--text-white)]/[0.06] rounded-2xl p-5">
                                    <h3 className="font-semibold text-[var(--text-white)] mb-1.5 text-sm">{m.title}</h3>
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{m.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Häufige Fragen zu llms.txt</h2>
                        <FaqAccordion faqs={faqLd.mainEntity} />
                    </section>

                </div>

                {/* CTA */}
                <div className="mt-14 bg-gradient-to-br from-cyan-950/40 to-[var(--bg-base)] border border-cyan-500/20 rounded-2xl p-6 sm:p-8 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-white)] mb-3">
                        Hast du bereits eine llms.txt?
                    </h2>
                    <p className="text-[var(--text-muted)] text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        Scanora prüft automatisch, ob llms.txt und llms-full.txt vorhanden und korrekt formatiert sind - als Teil von 19 GEO-Signalen in unter 60 Sekunden. Start ohne Registrierung, für den vollständigen Report mit allen Scores meldest du dich kostenlos an.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-[var(--text-white)] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20"
                    >
                        GEO-Score jetzt prüfen
                    </Link>
                    <div className="mt-3 text-xs text-[var(--text-faint)]">Ohne Registrierung starten · Voller Report kostenlos · 60 Sekunden</div>
                </div>

                {/* Cross-link to sibling posts */}
                <div className="mt-5 bg-[var(--text-white)]/[0.02] border border-[var(--text-white)]/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1 block">Weiterlesen</span>
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-2">
                                GEO-Optimierung 2026: So wirst du von ChatGPT und Claude empfohlen
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md">
                                llms.txt ist eines von 19 GEO-Signalen - die vollständige Übersicht, was sonst noch zählt.
                            </p>
                        </div>
                        <Link
                            href="/blog/geo-optimierung-2026"
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