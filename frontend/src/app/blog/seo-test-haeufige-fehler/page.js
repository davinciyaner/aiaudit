import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'SEO-Test: Die 10 häufigsten Fehler die deinen Google-Rank kosten',
    description: 'Diese 10 SEO-Fehler machen die meisten Websites - und keiner merkt es. Mit kostenlosem SEO-Test-Tool checken und sofort beheben.',
    keywords: 'seo test, seo fehler, seo check kostenlos, seo analyse, website seo prüfen, meta description fehlt, h1 tag, core web vitals',
    alternates: { canonical: 'https://www.sitecheckai.dev/blog/seo-test-haeufige-fehler' },
    openGraph: {
        title: 'SEO-Test: Die 10 häufigsten Fehler die deinen Google-Rank kosten',
        description: 'Diese 10 SEO-Fehler machen die meisten Websites. Mit kostenlosem SEO-Test sofort beheben.',
        url: 'https://www.sitecheckai.dev/blog/seo-test-haeufige-fehler',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SEO-Test: Die 10 häufigsten Fehler die deinen Google-Rank kosten',
    description: 'Diese 10 SEO-Fehler machen die meisten Websites - und keiner merkt es.',
    datePublished: '2026-06-10',
    dateModified: '2026-06-10',
    author: { '@type': 'Person', name: 'Finn Paustian' },
    publisher: { '@type': 'Organization', name: 'AuditAI', url: 'https://www.sitecheckai.dev' },
    url: 'https://www.sitecheckai.dev/blog/seo-test-haeufige-fehler',
    mainEntityOfPage: 'https://www.sitecheckai.dev/blog/seo-test-haeufige-fehler',
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was prüft ein SEO-Test?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ein SEO-Test prüft alle relevanten On-Page-Faktoren einer Website: Title-Tag, Meta-Description, H1-Tag, Bild-Alt-Texte, Canonical-Tag, interne Links, Ladezeit (Core Web Vitals), Structured Data, Open-Graph-Tags und weitere technische Signale. Ein vollständiger SEO-Test crawlt dabei nicht nur die Startseite, sondern bis zu 25 Unterseiten.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie oft sollte ich einen SEO-Test durchführen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nach jedem größeren Deployment, nach Content-Updates und nach Google Core Updates - mindestens aber wöchentlich für aktive Websites. SEO-Fehler entstehen nicht nur durch aktive Änderungen: ein Update eines Plugins, ein neues Bild ohne Alt-Text oder eine versehentlich gesetzte noindex-Direktive können unbemerkt Rankings kosten. Je häufiger du prüfst, desto früher erkennst du Probleme.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist der wichtigste SEO-Faktor auf einer Website?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Es gibt keinen einzelnen wichtigsten Faktor - SEO ist ein Zusammenspiel vieler Signale. Aber die drei häufigsten Probleme mit dem größten Einfluss sind: fehlende oder zu kurze Meta-Descriptions, fehlender oder nicht-keyword-reicher H1-Tag, und schlechte Core Web Vitals (besonders Ladezeit über 3 Sekunden).',
            },
        },
        {
            '@type': 'Question',
            name: 'Kann ich einen SEO-Test kostenlos durchführen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja. AuditAI bietet einen kostenlosen SEO-Test mit 14 Checks - inklusive Title-Tag, Meta-Description, H1, Alt-Texte, Canonical, Open Graph, Structured Data und mehr. Der Free-Plan erlaubt 1 vollständigen Audit pro Monat ohne Kreditkarte.',
            },
        },
    ],
}

const ERRORS = [
    {
        number: '01',
        severity: 'Kritisch',
        severityColor: '#ef4444',
        title: 'Fehlende oder zu kurze Meta-Description',
        impact: 'Direkt messbar: niedrigere CTR in den Suchergebnissen',
        desc: 'Die Meta-Description ist der Text der unter deinem Seitentitel in Google erscheint. Google nutzt sie zwar nicht direkt als Ranking-Faktor - aber sie bestimmt, ob jemand auf dein Ergebnis klickt oder das der Konkurrenz. Fehlt sie, generiert Google einen eigenen Ausschnitt aus dem Seitentext, der selten überzeugend ist.',
        fix: 'Schreibe für jede Seite eine individuelle Meta-Description mit 120–160 Zeichen. Nenne das Hauptkeyword der Seite, formuliere einen klaren Mehrwert und schließe mit einem indirekten Call-to-Action.',
        stat: '62 % der Websites haben fehlende oder identische Meta-Descriptions auf mehreren Seiten.',
    },
    {
        number: '02',
        severity: 'Kritisch',
        severityColor: '#ef4444',
        title: 'H1-Tag fehlt oder ist nicht keyword-reich',
        impact: 'Direkt: Google versteht das Thema der Seite nicht klar',
        desc: 'Der H1-Tag ist das stärkste On-Page-SEO-Signal nach dem Title-Tag. Google nutzt ihn um das Hauptthema einer Seite zu identifizieren. Viele Websites haben entweder keinen H1, mehrere H1s auf einer Seite, oder einen H1 der das Haupt-Keyword nicht enthält.',
        fix: 'Genau ein H1-Tag pro Seite. Er muss das primäre Keyword der Seite enthalten, natürlich klingen und den Inhalt der Seite treffend beschreiben. Der H1 darf - und sollte - sich vom Title-Tag unterscheiden.',
        stat: '41 % der analysierten Websites haben keinen oder einen nicht-keyword-reichen H1.',
    },
    {
        number: '03',
        severity: 'Hoch',
        severityColor: '#f59e0b',
        title: 'Ladezeit über 3 Sekunden (Core Web Vitals)',
        impact: '53 % der Nutzer verlassen Seiten die länger als 3 Sekunden laden',
        desc: 'Core Web Vitals sind seit 2021 offizieller Google-Ranking-Faktor. Die drei Metriken - LCP (Largest Contentful Paint), FID/INP (Interaktivität) und CLS (Layout-Stabilität) - messen die wahrgenommene Ladegeschwindigkeit. Eine schlechte Ladezeit kostet Rankings und Nutzer gleichermaßen.',
        fix: 'Bilder komprimieren und in WebP konvertieren, Lazy Loading aktivieren, unnötige JavaScript-Dateien entfernen, Browser-Caching nutzen. TTFB (Time to First Byte) sollte unter 800ms liegen, FCP unter 1,8 Sekunden.',
        stat: 'Websites mit einer Ladezeit unter 2 Sekunden ranken im Schnitt 2,5 Positionen höher als solche über 4 Sekunden.',
    },
    {
        number: '04',
        severity: 'Hoch',
        severityColor: '#f59e0b',
        title: 'Fehlende Bild-Alt-Texte',
        impact: 'Verlorene Ranking-Chancen in der Google-Bildersuche',
        desc: 'Alt-Texte beschreiben Bilder für Suchmaschinen und Screenreader. Google kann Bilder zwar zunehmend selbst interpretieren, aber ein präziser Alt-Text ist nach wie vor ein direktes SEO-Signal. Fehlen Alt-Texte auf vielen Bildern, verlierst du sowohl Accessibility-Punkte als auch Ranking-Chancen in der Bildersuche.',
        fix: 'Jedes inhaltliche Bild braucht einen beschreibenden Alt-Text der das Bild konkret beschreibt - ohne "Bild von" oder "Foto von". Dekorative Bilder erhalten ein leeres alt-Attribut (alt="").',
        stat: 'Im Durchschnitt haben 78 % der Bilder auf deutschen Unternehmenswebsites keinen oder einen leeren Alt-Text.',
    },
    {
        number: '05',
        severity: 'Hoch',
        severityColor: '#f59e0b',
        title: 'Kein oder falscher Canonical-Tag',
        impact: 'Duplicate-Content-Probleme und gesplittete Link-Autorität',
        desc: 'Canonical-Tags teilen Google mit, welche Version einer URL die "echte" ist. Ohne sie kann Google bei Seiten mit ähnlichem Content (z. B. URL-Parameter, www vs. non-www, HTTP vs. HTTPS) die falsche Version indexieren. Das splittet die Link-Autorität und schadet dem Ranking der Hauptseite.',
        fix: 'Setze auf jeder Seite einen self-referencing Canonical-Tag (<link rel="canonical" href="https://deinedomain.de/seite">). Bei doppelten Inhalten verweise immer auf die Hauptversion.',
        stat: null,
    },
    {
        number: '06',
        severity: 'Mittel',
        severityColor: '#6366f1',
        title: 'Title-Tag zu lang, zu kurz oder doppelt',
        impact: 'Google kürzt zu lange Titles, generiert bei zu kurzen einen eigenen',
        desc: 'Der Title-Tag ist das stärkste SEO-Signal überhaupt - und gleichzeitig das am häufigsten falsch gesetzte. Zu lang (über 60 Zeichen): Google kürzt mit "…". Zu kurz (unter 30 Zeichen): zu wenig Keyword-Signal. Doppelt: mehrere Seiten mit identischem Title konkurrieren gegeneinander.',
        fix: '50–60 Zeichen, Haupt-Keyword möglichst früh, Markenname am Ende (z. B. "Keyword-Thema - Markenname"). Jede Seite braucht einen einzigartigen Title-Tag.',
        stat: null,
    },
    {
        number: '07',
        severity: 'Mittel',
        severityColor: '#6366f1',
        title: 'Fehlende Open-Graph-Tags',
        impact: 'Unattraktive Vorschauen beim Teilen in Social Media und Messengern',
        desc: 'Open-Graph-Tags (og:title, og:description, og:image) steuern wie deine Seite in WhatsApp, LinkedIn, Twitter/X oder Slack aussieht wenn jemand den Link teilt. Fehlt og:image, zeigt der Link kein Bild - was die Klickrate massiv reduziert. Fehlt og:title, greift der Browser auf den normalen Title zurück der oft nicht für soziale Netzwerke optimiert ist.',
        fix: 'Mindestens og:title, og:description, og:image (1200×630px) und og:url auf jeder Seite setzen. Das og:image sollte die Kernaussage der Seite visuell kommunizieren.',
        stat: null,
    },
    {
        number: '08',
        severity: 'Mittel',
        severityColor: '#6366f1',
        title: 'Zu wenig Content (unter 300 Wörter)',
        impact: 'Google wertet "Thin Content" als minderwertiges Signal',
        desc: 'Seiten mit sehr wenig Text - unter 300 Wörtern - bieten Google kaum Kontext über das Thema der Seite. Google kann das Thema nicht einordnen und zeigt die Seite seltener an. Das gilt besonders für Produktseiten, Landing Pages und Blog-Artikel die "kurz und knackig" sein sollen, aber dabei zu wenig substanzielle Information liefern.',
        fix: 'Mindestens 300 Wörter pro Seite, für wichtige Seiten 800+. Mehr Wörter helfen nur wenn der Content relevant ist - Fülltext schadet. Beantworte die Fragen die deine Zielgruppe stellt.',
        stat: null,
    },
    {
        number: '09',
        severity: 'Mittel',
        severityColor: '#6366f1',
        title: 'Kein Structured Data (Schema.org)',
        impact: 'Verpasste Rich Results in den Google-Suchergebnissen',
        desc: 'Structured Data (JSON-LD mit Schema.org-Markup) ermöglicht Google Rich Results - also erweiterte Darstellungen in den Suchergebnissen wie FAQ-Boxen, Bewertungssterne oder Produktpreise. Websites ohne Structured Data sind auf die Standard-Darstellung beschränkt und haben statistisch eine niedrigere CTR als Rich-Result-Ergebnisse.',
        fix: 'Mindestens Organization-Schema und WebSite-Schema auf jeder Seite. Für Blogs: Article-Schema. Für Produktseiten: Product-Schema. Für FAQs: FAQPage-Schema. Immer als JSON-LD im Head-Bereich.',
        stat: null,
    },
    {
        number: '10',
        severity: 'Mittel',
        severityColor: '#6366f1',
        title: 'Fehlende Security-Header',
        impact: 'Indirektes SEO-Signal: Sicherheit als Ranking-Faktor',
        desc: 'HTTPS ist seit 2014 offizieller Google-Ranking-Faktor. Aber viele Websites vernachlässigen die Security-Header die darüber hinausgehen: HSTS, Content-Security-Policy, X-Frame-Options und X-Content-Type-Options. Diese sind zwar kein direkter Ranking-Faktor, aber sie sind Teil von Googles "Page Experience"-Bewertung und beeinflussen das Vertrauen der Nutzer.',
        fix: 'Mindestens HTTPS, HSTS (Strict-Transport-Security), X-Frame-Options: SAMEORIGIN und X-Content-Type-Options: nosniff setzen. Diese Header werden im Server oder in next.config.js / vercel.json konfiguriert.',
        stat: '78 % der Websites haben kritische Security-Header nicht gesetzt.',
    },
]

export default function SeoTestArtikelPage() {
    return (
        <main className="bg-[#05080f] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <Navbar />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
                    <Link href="/" className="hover:text-slate-400 transition-colors">AuditAI</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-slate-400 transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-slate-500">SEO-Test: Die 10 häufigsten Fehler</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-violet-500/15 text-violet-400">
                            SEO
                        </span>
                        <span className="text-xs text-slate-600">10. Juni 2026</span>
                        <span className="text-xs text-slate-600">· 9 min Lesezeit</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        SEO-Test: Die 10 häufigsten Fehler die deinen Google-Rank kosten
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Die meisten SEO-Fehler sind keine Geheimnisse - sie sind einfach unsichtbar. Kein Fehler in der Konsole, kein Alarm. Die Seite läuft, der Traffic stagniert. Hier sind die 10 häufigsten Probleme die wir in Website-Audits immer wieder finden, warum sie Rankings kosten und wie du sie in 60 Minuten behebst.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-slate-600">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-white text-[10px] font-bold">F</div>
                        <span>Finn Paustian</span>
                        <span>·</span>
                        <span>Gründer, AuditAI</span>
                    </div>
                </div>

                <div className="border-t border-white/5 mb-10" />

                <div className="space-y-10 text-slate-300 leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Was ist ein SEO-Test und warum brauchst du ihn?</h2>
                        <p>
                            Ein SEO-Test ist eine systematische Analyse aller On-Page-Faktoren einer Website - also alles was du direkt kontrollieren kannst: Title-Tags, Meta-Descriptions, Überschriften, Ladezeit, Bilder, interne Links und technische Signale wie Canonical-Tags oder Structured Data.
                        </p>
                        <p className="mt-4">
                            Der Unterschied zu einem einmaligen Setup: SEO verfällt. Google aktualisiert seinen Algorithmus über 500 Mal pro Jahr. Jeder neue Seiteninhalt, jedes Deployment kann neue Fehler einführen. Eine Seite die im Januar perfekt war, kann im Juni kritische SEO-Probleme haben - ohne dass sich irgendjemand bewusst etwas geändert hat.
                        </p>
                        <div className="bg-violet-500/8 border border-violet-500/20 rounded-2xl p-5 mt-5">
                            <p className="text-sm text-violet-300 font-medium mb-1">91 % aller Google-Klicks gehen an Seite 1</p>
                            <p className="text-sm text-slate-400">
                                Wer auf Seite 2 landet, existiert für potenzielle Kunden praktisch nicht. Ein einziger behobener SEO-Fehler kann den Unterschied zwischen Seite 1 und Seite 2 ausmachen.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">Die 10 häufigsten SEO-Fehler</h2>
                        <div className="space-y-5">
                            {ERRORS.map((e) => (
                                <div key={e.number} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                                    <div className="flex items-start gap-4">
                                        <span className="text-[11px] font-bold font-mono shrink-0 mt-0.5 text-slate-600">{e.number}</span>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-white">{e.title}</h3>
                                                <span
                                                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                                    style={{ background: e.severityColor + '18', color: e.severityColor }}
                                                >
                                                    {e.severity}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-3 italic">{e.impact}</p>
                                            <p className="text-sm text-slate-400 leading-relaxed mb-3">{e.desc}</p>
                                            {e.stat && (
                                                <p className="text-xs text-slate-500 bg-white/[0.03] rounded-lg px-3 py-2 mb-3 border-l-2 border-slate-700">
                                                    {e.stat}
                                                </p>
                                            )}
                                            <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
                                                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Fix: </span>
                                                <span className="text-xs text-slate-400 leading-relaxed">{e.fix}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Wie führe ich einen SEO-Test durch?</h2>
                        <p>
                            Du kannst SEO-Fehler manuell prüfen - Title-Tag im Browser-Tab lesen, Quelltext nach Meta-Tags durchsuchen, Ladezeit in Chrome DevTools messen. Das dauert pro Seite 15–30 Minuten, ist fehleranfällig und skaliert nicht auf mehrere Seiten oder regelmäßige Checks.
                        </p>
                        <p className="mt-4">
                            Das Problem mit manuellen Checks: du prüfst nie die komplette Website. Die meisten SEO-Fehler sitzen nicht auf der Startseite - sie stecken auf Unterseiten, in Produktpages oder in Blogartikeln die niemand mehr aktiv bearbeitet. Ein automatisierter SEO-Test crawlt bis zu 25 Seiten gleichzeitig und findet genau diese versteckten Probleme.
                        </p>
                        <p className="mt-4">
                            AuditAI prüft alle 14 SEO-Checks aus diesem Artikel in unter 60 Sekunden - inklusive H1, Meta-Descriptions, Alt-Texte, Canonical, Open Graph, Structured Data und Core Web Vitals.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Häufige Fragen zum SEO-Test</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    q: 'Was prüft ein SEO-Test?',
                                    a: 'Ein SEO-Test prüft alle relevanten On-Page-Faktoren einer Website: Title-Tag, Meta-Description, H1-Tag, Bild-Alt-Texte, Canonical-Tag, interne Links, Ladezeit (Core Web Vitals), Structured Data, Open-Graph-Tags und weitere technische Signale. Ein vollständiger SEO-Test crawlt dabei nicht nur die Startseite, sondern bis zu 25 Unterseiten.',
                                },
                                {
                                    q: 'Wie oft sollte ich einen SEO-Test durchführen?',
                                    a: 'Nach jedem größeren Deployment, nach Content-Updates und nach Google Core Updates - mindestens aber wöchentlich für aktive Websites. SEO-Fehler entstehen nicht nur durch aktive Änderungen: ein Update eines Plugins, ein neues Bild ohne Alt-Text oder eine versehentlich gesetzte noindex-Direktive können unbemerkt Rankings kosten. Je häufiger du prüfst, desto früher erkennst du Probleme bevor Google sie bewertet.',
                                },
                                {
                                    q: 'Was ist der wichtigste SEO-Faktor?',
                                    a: 'Es gibt keinen einzelnen wichtigsten Faktor - SEO ist ein Zusammenspiel vieler Signale. Aber die drei häufigsten Probleme mit dem größten Einfluss sind: fehlende Meta-Descriptions, fehlender H1-Tag und schlechte Core Web Vitals (Ladezeit über 3 Sekunden).',
                                },
                                {
                                    q: 'Kann ich einen SEO-Test kostenlos durchführen?',
                                    a: 'Ja. AuditAI bietet einen kostenlosen SEO-Test mit 14 Checks - inklusive Title-Tag, Meta-Description, H1, Alt-Texte, Canonical, Open Graph, Structured Data und mehr. Der Free-Plan erlaubt 1 vollständigen Audit pro Monat ohne Kreditkarte.',
                                },
                            ].map((faq, i) => (
                                <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
                                    <h3 className="font-semibold text-white mb-2 text-sm">{faq.q}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* CTA */}
                <div className="mt-14 bg-gradient-to-br from-violet-950/40 to-[#05080f] border border-violet-500/20 rounded-2xl p-6 sm:p-8 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                        Wie viele dieser Fehler hat deine Website?
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        AuditAI prüft alle 14 SEO-Checks in unter 60 Sekunden - inklusive der 10 Fehler aus diesem Artikel. Start ohne Registrierung, für den vollständigen Report mit allen Scores meldest du dich kostenlos an.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20"
                    >
                        SEO-Test jetzt starten
                    </Link>
                    <div className="mt-3 text-xs text-slate-600">Ohne Registrierung starten · Voller Report kostenlos · 60 Sekunden</div>
                </div>

                {/* Cross-link to sibling post */}
                <div className="mt-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1 block">Weiterlesen</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                Die SEO-Checkliste 2026 zum Abhaken
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Diese 10 Fehler in eine feste Prüfreihenfolge gebracht: 6 Phasen, 24 Punkte, 15 Minuten - inklusive GEO-Signalen für KI-Sichtbarkeit.
                            </p>
                        </div>
                        <Link
                            href="/blog/seo-checkliste-2026"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] hover:bg-white/10 text-white text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Checkliste öffnen
                        </Link>
                    </div>
                </div>

                {/* SEO AUTOMATISIERUNG CTA */}
                <div className="mt-5 bg-emerald-500/[0.04] border border-emerald-500/20 rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 block">SEO Automatisierung</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                Nicht nur einmal prüfen — automatisch tracken
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                SEO-Fehler entstehen laufend: neue Seiten ohne Meta-Tags, Bilder ohne Alt-Text nach Updates, versehentliches noindex. Mit SEO Automatisierung überwachst du deine Rankings und Keywords jede Woche automatisch.
                            </p>
                            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                                {['Wöchentliche Google-Rankings', 'Keyword-Ideen', 'Konkurrenzanalyse', 'Backlink-Übersicht'].map(f => (
                                    <li key={f} className="flex items-center gap-1.5 text-xs text-slate-500">
                                        <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link
                            href="/seo/pricing"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20 shrink-0"
                        >
                            Jetzt tracken
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