import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Schema Markup für KI-Zitate: So wirst du für ChatGPT & Co. zitierfähig',
    description: 'Schema Markup (JSON-LD) einfach erklärt: die wichtigsten Typen für KI-Zitierbarkeit, kostenlose Test-Tools und der häufigste Fehler, der Rich Results kostet.',
    keywords: 'schema markup, structured data prüfen kostenlos, schema markup ki, json-ld generator, faq schema, organization schema, rich results test',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/blog/schema-markup-ki-zitate',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/blog/schema-markup-ki-zitate',
            'en-US': 'https://www.sitecheckai.dev/en/blog/schema-markup-ai-citations',
        },
    },
    openGraph: {
        title: 'Schema Markup für KI-Zitate: So wirst du für ChatGPT & Co. zitierfähig',
        description: 'Die wichtigsten Schema-Typen für KI-Zitierbarkeit, kostenlose Test-Tools und der häufigste Fehler.',
        url: 'https://www.sitecheckai.dev/blog/schema-markup-ki-zitate',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Schema Markup für KI-Zitate: So wirst du für ChatGPT & Co. zitierfähig',
    description: 'Schema Markup (JSON-LD) einfach erklärt: die wichtigsten Typen für KI-Zitierbarkeit, kostenlose Test-Tools und der häufigste Fehler, der Rich Results kostet.',
    image: 'https://www.sitecheckai.dev/blog/schema-markup-ki-zitate/opengraph-image',
    datePublished: '2026-07-26T09:00:00+02:00',
    dateModified: '2026-07-30T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/blog/schema-markup-ki-zitate',
    mainEntityOfPage: 'https://www.sitecheckai.dev/blog/schema-markup-ki-zitate',
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sitecheckai.dev/blog' },
        { '@type': 'ListItem', position: 3, name: 'Schema Markup für KI-Zitate', item: 'https://www.sitecheckai.dev/blog/schema-markup-ki-zitate' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was ist Schema Markup?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Schema Markup ist strukturierte Daten im JSON-LD-Format, meist im <head>-Bereich einer Seite eingebettet. Es beschreibt Inhalte in einer standardisierten Sprache (schema.org), die sowohl Google für Rich Results als auch KI-Modelle für präzise Zitate nutzen können.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie teste ich Schema Markup kostenlos?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Mit Googles kostenlosem Rich Results Test (search.google.com/test/rich-results) - URL eingeben, alle gefundenen Schema-Typen werden inklusive Fehler und Warnungen angezeigt. Für reine Syntaxprüfung eignet sich zusätzlich der Schema Markup Validator von schema.org selbst (validator.schema.org).',
            },
        },
        {
            '@type': 'Question',
            name: 'Reicht FAQ-Schema allein für bessere KI-Zitate?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nein. FAQ-Schema im JSON-LD muss exakt den sichtbaren Fragen und Antworten im HTML entsprechen - KI-Modelle und Google gleichen beides ab. Schema, das Inhalte behauptet, die auf der Seite gar nicht sichtbar stehen, ist nicht nur wirkungslos, sondern kann als irreführende Auszeichnung gewertet werden.',
            },
        },
        {
            '@type': 'Question',
            name: 'Welches Schema sollte jede Website mindestens haben?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Organization-Schema (wer steht hinter der Seite) und WebSite-Schema als Basis. Für Blogartikel zusätzlich Article-Schema, für Produktseiten Product- oder SoftwareApplication-Schema, für Seiten mit echten Fragen und Antworten FAQPage-Schema.',
            },
        },
    ],
}

const SCHEMA_TYPES = [
    { type: 'Organization', use: 'Wer betreibt die Website - Name, Logo, Kontakt, Social-Profile.', why: 'Basis-Vertrauenssignal, das KI-Modelle nutzen um eine Marke einer Domain zuzuordnen.' },
    { type: 'WebSite', use: 'Grundlegende Website-Metadaten, oft mit Suchfunktion verknüpft.', why: 'Hilft bei der Einordnung der Seite als Ganzes, nicht nur einzelner Unterseiten.' },
    { type: 'Article', use: 'Blogartikel und News: Autor, Veröffentlichungsdatum, Headline.', why: 'Liefert KI-Modellen Autor- und Aktualitäts-Kontext für Zitate - wichtige E-E-A-T-Signale.' },
    { type: 'FAQPage', use: 'Frage-Antwort-Paare, die auch sichtbar im HTML stehen.', why: 'Das direkteste Format für KI-Zitate - Frage und Antwort sind bereits vorformuliert.' },
    { type: 'Product / SoftwareApplication', use: 'Preise, Bewertungen, Funktionsumfang eines Produkts.', why: 'Ermöglicht präzise Preis- und Feature-Zitate statt vager Umschreibungen.' },
]

export default function SchemaMarkupPage() {
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
                    <span className="text-slate-500">Schema Markup für KI-Zitate</span>
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
                        Schema Markup für KI-Zitate: So wirst du für ChatGPT & Co. zitierfähig
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Schema Markup ist unsichtbar für Besucher - aber genau die Sprache, die Google und KI-Modelle nutzen, um Inhalte präzise zu verstehen und zu zitieren. Hier die wichtigsten Typen, wie du sie kostenlos testest und der Fehler, der am häufigsten alles wirkungslos macht.
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
                        <h2 className="text-2xl font-bold text-white mb-4">Was ist Schema Markup und warum zählt es für GEO?</h2>
                        <p>
                            Schema Markup ist strukturierte Daten im{' '}
                            <a href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                                JSON-LD-Format
                            </a>
                            , die eine standardisierte Sprache (schema.org) nutzt, um Inhalte maschinenlesbar zu beschreiben - meist unsichtbar im <code className="text-xs bg-white/[0.06] px-1.5 py-0.5 rounded">&lt;head&gt;</code>-Bereich eingebettet. Statt dass eine KI aus Fließtext erraten muss, wer der Autor eines Artikels ist oder was ein Produkt kostet, steht es explizit und eindeutig im Markup.
                        </p>
                        <p className="mt-4">
                            Für klassisches SEO ermöglicht Schema Markup Rich Results - Sternebewertungen, FAQ-Boxen, Preisangaben direkt in den Suchergebnissen. Für{' '}
                            <Link href="/blog/geo-optimierung-2026" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">GEO</Link>
                            {' '}ist der Effekt ähnlich, aber noch direkter: KI-Modelle nutzen strukturierte Daten, um Fakten präzise zu extrahieren, statt sie aus mehrdeutigem Text zu interpretieren. Zusammen mit{' '}
                            <Link href="/blog/llms-txt-erklaert" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">llms.txt</Link>
                            {' '}ist es eines der zwei zentralen technischen GEO-Fundamente.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">Die wichtigsten Schema-Typen für KI-Zitierbarkeit</h2>
                        <div className="space-y-3">
                            {SCHEMA_TYPES.map((s) => (
                                <div key={s.type} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
                                    <h3 className="font-mono text-sm font-semibold text-cyan-400 mb-2">{s.type}</h3>
                                    <p className="text-sm text-slate-300 mb-1.5">{s.use}</p>
                                    <p className="text-xs text-slate-500">{s.why}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Wie du Schema Markup kostenlos testest</h2>
                        <p>
                            Googles{' '}
                            <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                                Rich Results Test
                            </a>{' '}
                            ist der Standard-Check: URL eingeben, alle gefundenen Schema-Typen werden mit Fehlern und Warnungen angezeigt. Für reine Syntaxprüfung ohne Google-spezifische Rich-Result-Bewertung eignet sich zusätzlich der{' '}
                            <a href="https://validator.schema.org" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                                Schema Markup Validator
                            </a>{' '}
                            von schema.org selbst.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Der häufigste Fehler: Schema, das nicht zum sichtbaren Inhalt passt</h2>
                        <p>
                            Ein Fehler, der uns in Audits auch bei technisch versierten Teams immer wieder auffällt: Das FAQ-Schema im JSON-LD listet andere oder mehr Fragen, als tatsächlich sichtbar auf der Seite stehen. Das passiert leicht, wenn FAQ-Content und Schema an zwei getrennten Stellen im Code gepflegt werden und bei einer Content-Änderung nur eine der beiden Stellen aktualisiert wird.
                        </p>
                        <p className="mt-4">
                            Das Problem: Sowohl Google als auch KI-Modelle gleichen strukturierte Daten mit dem sichtbaren HTML ab. Eine Abweichung bedeutet nicht nur, dass die zusätzlichen Schema-Fragen wirkungslos bleiben - Google wertet eklatante Diskrepanzen zwischen Markup und sichtbarem Inhalt explizit als Richtlinienverstoß.
                        </p>
                        <div className="bg-red-500/8 border border-red-500/20 rounded-2xl p-5 mt-5">
                            <p className="text-sm text-red-300 font-medium mb-1">Der zuverlässigste Fix</p>
                            <p className="text-sm text-slate-400">
                                FAQ-Schema (oder jedes andere Content-Schema) direkt aus derselben Datenquelle generieren, die auch den sichtbaren Content rendert - statt Schema und HTML getrennt zu pflegen. Dann können beide gar nicht erst auseinanderlaufen.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Häufige Fragen zu Schema Markup</h2>
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
                        Stimmt dein Schema mit deinem sichtbaren Content überein?
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        AuditAI prüft automatisch, ob Organization-, FAQ- und weitere Schema-Typen vorhanden und korrekt sind - als Teil von 19 GEO-Signalen in unter 60 Sekunden. Start ohne Registrierung, für den vollständigen Report mit allen Scores meldest du dich kostenlos an.
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
                                llms.txt erklärt
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Schema Markup ist ein GEO-Signal von vielen - llms.txt ist das andere, das KI-Crawler als erstes lesen.
                            </p>
                        </div>
                        <Link
                            href="/blog/llms-txt-erklaert"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] hover:bg-white/10 text-white text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Artikel lesen
                        </Link>
                    </div>
                </div>

                <div className="mt-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1 block">Weiterlesen</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                GEO-Optimierung 2026: So wirst du von ChatGPT und Claude empfohlen
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Schema Markup ist eines von fünf GEO-Signalen - hier siehst du das große Bild und wie die Signale zusammenspielen.
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