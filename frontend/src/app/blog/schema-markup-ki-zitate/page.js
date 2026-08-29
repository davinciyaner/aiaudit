import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Schema Markup für KI-Zitate 2026: So wirst du für ChatGPT & Co. zitierfähig',
    description: 'Schema Markup (JSON-LD) einfach erklärt: Prioritäten-Reihenfolge, fertiger Code zum Kopieren, kostenlose Generatoren & Test-Tools sowie der häufigste Fehler, der Rich Results kostet.',
    keywords: 'schema markup, schema markup generator, structured data prüfen kostenlos, schema markup ki, json-ld generator, json-ld beispiel, faq schema, organization schema, rich results test',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/blog/schema-markup-ki-zitate',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/blog/schema-markup-ki-zitate',
            'en-US': 'https://www.sitecheckai.dev/en/blog/schema-markup-ai-citations',
        },
    },
    openGraph: {
        title: 'Schema Markup für KI-Zitate 2026: So wirst du für ChatGPT & Co. zitierfähig',
        description: 'Prioritäten-Reihenfolge, fertiger JSON-LD-Code zum Kopieren, kostenlose Generatoren & Test-Tools sowie der häufigste Fehler, der Rich Results kostet.',
        url: 'https://www.sitecheckai.dev/blog/schema-markup-ki-zitate',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Schema Markup für KI-Zitate 2026: So wirst du für ChatGPT & Co. zitierfähig',
    description: 'Schema Markup (JSON-LD) einfach erklärt: Prioritäten-Reihenfolge, fertiger Code zum Kopieren, kostenlose Generatoren & Test-Tools sowie der häufigste Fehler, der Rich Results kostet.',
    image: 'https://www.sitecheckai.dev/blog/schema-markup-ki-zitate/opengraph-image',
    datePublished: '2026-07-26T09:00:00+02:00',
    dateModified: '2026-08-29T09:00:00+02:00',
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
        {
            '@type': 'Question',
            name: 'Womit erzeuge ich Schema Markup ohne selbst zu coden?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Mit einem Formular-Generator wie dem Merkle Schema Generator oder dem Tool von TechnicalSEO.com - Daten eingeben, fertigen JSON-LD-Code kopieren und in den <head>-Bereich einfügen.',
            },
        },
    ],
}

const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Schema Markup in der richtigen Reihenfolge implementieren',
    description: 'Die empfohlene Implementierungs-Reihenfolge für Schema Markup, damit jeder Typ auf dem Vertrauens- und Kontextsignal des vorherigen aufbaut.',
    step: [
        { '@type': 'HowToStep', position: 1, name: 'Organization', text: 'Wer die Website betreibt als Basis-Vertrauenssignal hinterlegen - ohne das kann keine KI eine Marke einer Domain zuordnen.' },
        { '@type': 'HowToStep', position: 2, name: 'WebSite', text: 'Metadaten der Seite als Ganzes ergänzen, um Unterseiten einem übergeordneten Angebot zuzuordnen.' },
        { '@type': 'HowToStep', position: 3, name: 'Article', text: 'Autor, Datum und Headline für Blogartikel markieren, sobald Organization-Schema steht.' },
        { '@type': 'HowToStep', position: 4, name: 'Product / SoftwareApplication', text: 'Preise, Bewertungen und Funktionsumfang auszeichnen, um präzise Preiszitate statt vager Umschreibungen zu ermöglichen.' },
        { '@type': 'HowToStep', position: 5, name: 'FAQPage', text: 'Sichtbare Frage-Antwort-Paare zuletzt auszeichnen - das direkteste Format für KI-Zitate.' },
    ],
}

const PRIORITY_STEPS = [
    { num: 1, type: 'Organization', purpose: 'Wer betreibt die Website', why: 'Basis-Vertrauenssignal - ohne das kann keine KI eine Marke einer Domain zuordnen.' },
    { num: 2, type: 'WebSite', purpose: 'Metadaten der Seite als Ganzes', why: 'Ordnet Unterseiten einem übergeordneten Angebot zu.' },
    { num: 3, type: 'Article', purpose: 'Autor, Datum, Headline', why: 'Liefert E-E-A-T-Kontext, sobald Organization steht.' },
    { num: 4, type: 'Product / SoftwareApplication', purpose: 'Preise, Bewertungen, Features', why: 'Ermöglicht präzise Preiszitate statt vager Umschreibungen.' },
    { num: 5, type: 'FAQPage', purpose: 'Sichtbare Frage-Antwort-Paare', why: 'Das direkteste Zitatformat - Frage und Antwort sind bereits vorformuliert.' },
]

const GENERATOR_TOOLS = [
    { name: 'Merkle Schema Generator', desc: 'Formularbasiert, deckt die gängigsten Typen ab - guter Startpunkt.' },
    { name: 'TechnicalSEO.com Generator', desc: 'Ähnlich, mit besonders starker Local-Business-Abdeckung.' },
    { name: 'Google Structured Data Markup Helper', desc: 'Markiert Elemente direkt auf einer eingefügten Seite per Klick.' },
]

export default function SchemaMarkupPage() {
    return (
        <main className="bg-[#05080f] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
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
                        <span className="text-xs text-slate-600">· 8 min Lesezeit</span>
                        <span className="text-xs text-slate-600">· Aktualisiert am 29. August 2026</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        Schema Markup für KI-Zitate 2026: So wirst du für ChatGPT & Co. zitierfähig
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Schema Markup ist unsichtbar für Besucher - aber genau die Sprache, die Google und KI-Modelle nutzen, um Inhalte präzise zu verstehen und zu zitieren. Die wichtigsten Typen in der richtigen Reihenfolge, fertiger JSON-LD-Code zum Kopieren, kostenlose Generatoren und Test-Tools, und der Fehler, der am häufigsten alles wirkungslos macht.
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
                        <h2 className="text-2xl font-bold text-white mb-4">In dieser Reihenfolge implementieren</h2>
                        <p>Die Reihenfolge ist kein Zufall - jeder Typ baut auf dem Vertrauens- und Kontextsignal des vorherigen auf.</p>
                        <div className="overflow-x-auto rounded-2xl border border-white/[0.07] mt-5">
                            <table className="w-full text-sm min-w-[560px]">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <th className="text-left px-4 py-3 text-slate-400 font-semibold w-10">#</th>
                                        <th className="text-left px-4 py-3 text-slate-400 font-semibold">Schema-Typ</th>
                                        <th className="text-left px-4 py-3 text-slate-400 font-semibold">Zweck</th>
                                        <th className="text-left px-4 py-3 text-slate-400 font-semibold">Warum an dieser Stelle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PRIORITY_STEPS.map((s) => (
                                        <tr key={s.num} className="border-b border-white/[0.04] last:border-0">
                                            <td className="px-4 py-3 text-cyan-400 font-mono font-bold">{s.num}</td>
                                            <td className="px-4 py-3 text-white font-mono text-xs font-semibold whitespace-nowrap">{s.type}</td>
                                            <td className="px-4 py-3 text-slate-300">{s.purpose}</td>
                                            <td className="px-4 py-3 text-slate-400">{s.why}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Organization-Schema zum Kopieren</h2>
                        <p>Das Minimum, mit dem jede Website starten sollte - direkt einsatzbereit:</p>
                        <pre className="mt-4 text-xs bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 text-slate-400 font-mono overflow-x-auto">
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Deine Firma",
  "url": "https://deine-domain.de",
  "logo": "https://deine-domain.de/logo.png",
  "sameAs": ["https://linkedin.com/company/..."]
}
</script>`}
                        </pre>
                        <p className="mt-5">Danach FAQPage-Schema - aber nur für Fragen, die auch sichtbar auf der Seite stehen (mehr dazu weiter unten):</p>
                        <pre className="mt-4 text-xs bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 text-slate-400 font-mono overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Deine Frage, wortgleich zum sichtbaren Text",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Deine Antwort, wortgleich zum sichtbaren Text"
    }
  }]
}`}
                        </pre>
                        <p className="text-xs text-slate-600 mt-3">
                            Für die Prioritäten-Tabelle oben ist zusätzlich HowTo-Schema im &lt;head&gt; dieser Seite hinterlegt - unsichtbar im Text, aber maschinenlesbar für die Implementierungs-Reihenfolge selbst.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Kostenlose Generatoren</h2>
                        <p>Falls Code schreiben keine Option ist - diese drei erzeugen valides JSON-LD über ein Formular:</p>
                        <div className="space-y-2 mt-4">
                            {GENERATOR_TOOLS.map((t) => (
                                <div key={t.name} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                                    <span className="text-sm font-semibold text-white sm:min-w-[220px] shrink-0">{t.name}</span>
                                    <span className="text-sm text-slate-500">{t.desc}</span>
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