import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Website SEO Check & Audit: AuditAI mit GEO-Analyse (2026)',
    description: 'Website SEO Check und Website Audit mit AuditAI: SEO, Performance und GEO (KI-Sichtbarkeit für ChatGPT, Claude & Perplexity) in einem Report. Alle Features, Preise und was du als Nutzer bekommst.',
    keywords: 'website seo check, website audit, website seo analyse, seo check, seo audit, seo tool, kostenloser seo test, seo software, seo automatisierung, geo tool, geo check, geo automatisierung, ki sichtbarkeit, generative engine optimization, chatgpt seo, core web vitals test, keyword tracking, google ranking tool, backlink check, llms.txt, schema markup',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/blog/beste-seo-check-tools-2026',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/blog/beste-seo-check-tools-2026',
            'en-US': 'https://www.sitecheckai.dev/en/blog/best-seo-tools-2026',
        },
    },
    openGraph: {
        title: 'Website SEO Check & Audit: AuditAI mit GEO-Analyse (2026)',
        description: 'SEO, Performance und GEO in einem Report - alle Features, Preise und was du bekommst.',
        url: 'https://www.sitecheckai.dev/blog/beste-seo-check-tools-2026',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Website SEO Check & Audit: AuditAI mit GEO-Analyse (2026)',
    description: 'Website SEO Check und Website Audit mit AuditAI: SEO, Performance und GEO (KI-Sichtbarkeit für ChatGPT, Claude & Perplexity) in einem Report. Alle Features, Preise und was du als Nutzer bekommst.',
    image: 'https://www.sitecheckai.dev/blog/beste-seo-check-tools-2026/opengraph-image',
    datePublished: '2026-07-15T09:00:00+02:00',
    dateModified: '2026-08-06T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/blog/beste-seo-check-tools-2026',
    mainEntityOfPage: 'https://www.sitecheckai.dev/blog/beste-seo-check-tools-2026',
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sitecheckai.dev/blog' },
        { '@type': 'ListItem', position: 3, name: 'Website SEO Check & Audit mit GEO-Analyse', item: 'https://www.sitecheckai.dev/blog/beste-seo-check-tools-2026' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was ist ein Website SEO Check?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ein Website SEO Check ist eine automatisierte Analyse einer Website auf SEO-relevante Faktoren wie Title-Tags, Meta-Descriptions, Ladezeit, Seitenstruktur und technische Fehler. AuditAI führt diesen Check in unter 60 Sekunden durch und ergänzt ihn um einen GEO-Check, der prüft, ob KI-Modelle wie ChatGPT oder Claude die Website als Quelle erkennen und zitieren.',
            },
        },
        {
            '@type': 'Question',
            name: 'Ist AuditAI wirklich kostenlos nutzbar?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja. Der Audit lässt sich ohne Registrierung starten. Für den vollständigen Report mit allen Scores (SEO, Performance, GEO) reicht ein kostenloser Account - 1 Audit pro Monat, dauerhaft kostenlos, keine Kreditkarte nötig.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist der Unterschied zwischen dem Audit und der SEO-/GEO-Automatisierung?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Der Audit zeigt den Status deiner Website zu einem Zeitpunkt. Die SEO-Automatisierung und GEO-Automatisierung sind separate, laufende Abos: sie tracken Google-Rankings bzw. KI-Erwähnungen automatisch jede Woche und alarmieren dich bei Veränderungen.',
            },
        },
        {
            '@type': 'Question',
            name: 'Prüft AuditAI auch, ob ich von ChatGPT oder Google AI Overviews empfohlen werde?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja, das ist der GEO-Teil des Produkts. Der einmalige Audit prüft 19 technische GEO-Signale (llms.txt, Schema-Markup, KI-Crawler-Zugriff). Die GEO-Automatisierung geht weiter und fragt wöchentlich Claude, ChatGPT, Perplexity und Google AI Overview direkt, ob sie deine Domain erwähnen.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie lange dauert ein Audit?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Unter 60 Sekunden für SEO-, Performance- und GEO-Analyse zusammen.',
            },
        },
        {
            '@type': 'Question',
            name: 'Kann ich die Abos jederzeit kündigen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja. Alle kostenpflichtigen Pläne sind jederzeit kündbar, kein versteckter Trial-Trick. Die SEO- und GEO-Automatisierung bieten zusätzlich 14 Tage kostenlos zum Testen.',
            },
        },
    ],
}

export default function AuditAiOverviewPage() {
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
                    <span className="text-slate-500">Website SEO Check & Audit mit GEO-Analyse</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-amber-500/15 text-amber-400">
                            Tools
                        </span>
                        <span className="text-xs text-slate-600">15. Juli 2026</span>
                        <span className="text-xs text-slate-600">· Aktualisiert 6. August 2026</span>
                        <span className="text-xs text-slate-600">· 8 min Lesezeit</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        Website SEO Check & Audit mit AuditAI (inkl. GEO-Analyse)
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Ein Website SEO Check ist eine automatisierte Analyse deiner Website auf technische, inhaltliche und Performance-Probleme, die deine Google-Rankings beeinflussen. Die meisten SEO-Tools prüfen dabei nur, ob deine Website für Google okay aussieht - und ignorieren komplett, ob ChatGPT, Claude, Perplexity oder Google AI Overview dich überhaupt kennen. AuditAI prüft beides: klassisches SEO, Performance und GEO (KI-Sichtbarkeit), in einem Report, in unter 60 Sekunden. Hier ist alles, was du als Nutzer bekommst.
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

                    <nav aria-label="Inhaltsverzeichnis" className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">In diesem Artikel</p>
                        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            <li><a href="#was-ist-auditai" className="text-slate-400 hover:text-amber-300 transition-colors">Was ist AuditAI?</a></li>
                            <li><a href="#kostenloser-audit" className="text-slate-400 hover:text-amber-300 transition-colors">Der kostenlose Audit</a></li>
                            <li><a href="#seo-analyse" className="text-slate-400 hover:text-amber-300 transition-colors">SEO-Analyse im Detail</a></li>
                            <li><a href="#performance" className="text-slate-400 hover:text-amber-300 transition-colors">Performance-Check</a></li>
                            <li><a href="#geo-check" className="text-slate-400 hover:text-amber-300 transition-colors">GEO-Check: KI-Sichtbarkeit</a></li>
                            <li><a href="#ki-report" className="text-slate-400 hover:text-amber-300 transition-colors">Der KI-Report</a></li>
                            <li><a href="#seo-automatisierung" className="text-slate-400 hover:text-amber-300 transition-colors">SEO-Automatisierung</a></li>
                            <li><a href="#geo-automatisierung" className="text-slate-400 hover:text-amber-300 transition-colors">GEO-Automatisierung</a></li>
                            <li><a href="#fuer-wen" className="text-slate-400 hover:text-amber-300 transition-colors">Für wen ist AuditAI?</a></li>
                            <li><a href="#preise" className="text-slate-400 hover:text-amber-300 transition-colors">Preise im Überblick</a></li>
                            <li><a href="#faq" className="text-slate-400 hover:text-amber-300 transition-colors">Häufige Fragen</a></li>
                        </ol>
                    </nav>

                    <section id="was-ist-auditai" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Was ist AuditAI?</h2>
                        <p>
                            AuditAI ist ein KI-gestütztes Website-Audit-Tool, das SEO, Performance und GEO (Generative Engine Optimization) in einem einzigen Scan zusammenführt. Statt für jeden Bereich ein eigenes Tool zu brauchen - einen SEO-Checker, ein Performance-Tool und (falls überhaupt vorhanden) ein separates GEO-Tool - bekommst du bei AuditAI alle drei Analysen gleichzeitig, ausgewertet von Claude (Anthropic).
                        </p>
                        <p className="mt-4">
                            Der Unterschied zu klassischen SEO-Checkern: die meisten davon wurden gebaut, lange bevor ChatGPT, Perplexity und Google AI Overview relevante Trafficquellen wurden. Ihre Checklisten enden bei Title-Tags und Backlinks. AuditAI prüft zusätzlich, ob KI-Modelle deine Website als Quelle erkennen und zitieren können.
                        </p>
                    </section>

                    <section id="kostenloser-audit" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Der kostenlose Audit: Was du sofort bekommst</h2>
                        <p className="mb-5">
                            Du gibst eine URL ein, wartest unter 60 Sekunden und bekommst einen vollständigen Website-Check - ganz ohne Registrierung für den ersten Blick, mit kostenlosem Account für den vollen Report.
                        </p>
                        <figure className="mb-6">
                            <Image
                                src="/blog/auditai-score-overview.png"
                                alt="AuditAI Score-Übersicht mit Overall-, SEO-, Performance- und GEO-Score aus einem echten Audit-Report"
                                width={960}
                                height={194}
                                className="w-full h-auto rounded-2xl border border-white/[0.07]"
                            />
                            <figcaption className="text-xs text-slate-600 mt-2">
                                Die Score-Übersicht eines echten AuditAI-Reports: SEO, Performance und GEO in einer Ansicht.
                            </figcaption>
                        </figure>
                        <div className="space-y-2">
                            {[
                                ['Gesamt-Score', 'Ein Overall-Score, der SEO, Performance und GEO gewichtet zusammenfasst'],
                                ['SEO-Score', 'Wie gut deine Seite für Google-Rankingfaktoren aufgestellt ist'],
                                ['Performance-Score', 'Ladezeit und technische Kennzahlen nach echten Schwellenwerten'],
                                ['GEO-Score', 'Ob KI-Modelle deine Website technisch überhaupt erkennen und zitieren können'],
                                ['Audit-Verlauf', 'Frühere Checks bleiben gespeichert, damit du Fortschritt siehst'],
                            ].map(([title, desc], i) => (
                                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                                    <div className="w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-[9px] font-bold text-amber-400">{i + 1}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-white">{title}</span>
                                        <span className="text-sm text-slate-500"> - {desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="seo-analyse" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Website SEO Analyse im Detail</h2>
                        <p className="mb-5">
                            Der SEO-Teil deckt die Faktoren ab, die Google zum Bewerten deiner Seite nutzt:
                        </p>
                        <figure className="mb-6">
                            <Image
                                src="/blog/auditai-seo-issues.png"
                                alt="AuditAI SEO-Fehlerliste mit priorisierten Problemen und konkreten Fixes"
                                width={960}
                                height={420}
                                className="w-full h-auto rounded-2xl border border-white/[0.07]"
                            />
                            <figcaption className="text-xs text-slate-600 mt-2">
                                Gefundene SEO-Probleme, priorisiert und mit klarer Beschreibung statt nur einer Fehlerliste.
                            </figcaption>
                        </figure>
                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            {[
                                'Title-Tag (Länge & Keyword-Relevanz)', 'Meta-Description', 'H1- bis H6-Struktur',
                                'Bild-Alt-Texte', 'Canonical Tag', 'Open Graph & Twitter Card',
                                'Structured Data / JSON-LD', 'Robots Meta Tag', 'Interne Verlinkung',
                                'Wortanzahl pro Seite', 'HTML lang-Attribut', 'HTTPS-Status',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2 text-slate-400">
                                    <span className="text-emerald-400">✓</span> {item}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="performance" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Performance-Check</h2>
                        <p className="mb-4">
                            Ladezeit ist sowohl ein Google-Rankingfaktor als auch ein direkter Umsatzfaktor - AuditAI misst die Kennzahlen, die wirklich zählen:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            {[
                                'Time to First Byte (TTFB)', 'First Contentful Paint (FCP)',
                                'DOM Load', 'Vollständige Ladezeit',
                                'Seitengröße', 'Anzahl HTTP-Requests',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2 text-slate-400">
                                    <span className="text-emerald-400">✓</span> {item}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="geo-check" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">GEO-Check: Wirst du von ChatGPT & Co. gefunden?</h2>
                        <p className="mb-5">
                            Das ist der Teil, den fast kein anderes Tool prüft. 19 technische Signale entscheiden, ob KI-Modelle deine Website als vertrauenswürdige Quelle erkennen:
                        </p>
                        <figure className="mb-6">
                            <Image
                                src="/blog/auditai-geo-report.png"
                                alt="AuditAI GEO-Report mit geprüften KI-Sichtbarkeits-Signalen wie llms.txt, Organization-Schema, KI-Crawler-Zugriff und sitemap.xml"
                                width={960}
                                height={411}
                                className="w-full h-auto rounded-2xl border border-white/[0.07]"
                            />
                            <figcaption className="text-xs text-slate-600 mt-2">
                                Ein echter GEO-Report: alle geprüften KI-Sichtbarkeitssignale auf einen Blick, inklusive gefundenem Problem.
                            </figcaption>
                        </figure>
                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            {[
                                'llms.txt vorhanden & korrekt', 'llms-full.txt vorhanden',
                                'Organization Schema (JSON-LD)', 'FAQ Schema mit sichtbarem HTML',
                                'KI-Crawler-Erlaubnis in robots.txt', 'sitemap.xml vollständig & aktuell',
                                'Klare Produktdefinition im Content', 'Konkrete Zahlen & Statistiken',
                                'Externe Quellenverweise', 'Autor- & About-Informationen (E-E-A-T)',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2 text-slate-400">
                                    <span className="text-emerald-400">✓</span> {item}
                                </div>
                            ))}
                        </div>
                        <p className="mt-5">
                            Mehr zum Konzept dahinter: <Link href="/blog/geo-optimierung-2026" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">GEO-Optimierung 2026</Link>.
                        </p>
                    </section>

                    <section id="ki-report" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Der KI-Report: Konkrete Fixes statt nur Zahlen</h2>
                        <p>
                            Ab dem Pro-Plan generiert Claude (Anthropic) einen vollständigen Bericht aus den Audit-Daten - keine generische Fehlerliste, sondern:
                        </p>
                        <div className="space-y-2 mt-4">
                            {[
                                ['Priorisierte Problem-Zusammenfassung', 'Was zuerst angegangen werden sollte und warum'],
                                ['Konkrete Fixes pro Kategorie', 'Direkt umsetzbar, nicht nur "verbessere deine Meta-Tags"'],
                                ['Action-Plan', 'Quick Wins zuerst, aufwendigere Fixes danach'],
                                ['Desktop- & Mobile-Screenshots', 'Visueller Vergleich beider Ansichten'],
                                ['PDF-Export', 'Zum Teilen oder Archivieren'],
                            ].map(([title, desc], i) => (
                                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                                    <div className="w-5 h-5 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-[9px] font-bold text-violet-400">{i + 1}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-white">{title}</span>
                                        <span className="text-sm text-slate-500"> - {desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="seo-automatisierung" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">SEO-Automatisierung: Laufendes Ranking-Tracking</h2>
                        <p className="mb-4">
                            Der einmalige Audit zeigt den Status jetzt. Die SEO-Automatisierung ist ein separates Abo für laufendes Monitoring:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            {[
                                'Wöchentliches Google-Ranking-Tracking', 'E-Mail-Alert bei signifikanten Bewegungen',
                                'Keyword-Ideen mit Suchvolumen & CPC', 'Automatische Konkurrenzanalyse',
                                'Content-Gap-Analyse (ab Pro)', 'Monatliche Backlink-Übersicht',
                                'Automatische Keyword-Erkennung aus neuem Content',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2 text-slate-400">
                                    <span className="text-emerald-400">✓</span> {item}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="geo-automatisierung" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">GEO-Automatisierung: KI-Sichtbarkeit im Verlauf</h2>
                        <p className="mb-4">
                            Und das GEO-Pendant dazu - laufendes Tracking, ob KI-Modelle dich tatsächlich erwähnen, nicht nur ob die technischen Voraussetzungen stimmen:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            {[
                                'Wöchentlicher Check auf Claude, ChatGPT, Perplexity & Google AI Overview',
                                'Echte Nutzeranfragen statt synthetischer Tests',
                                'Mention-Rate in % pro Keyword & Plattform',
                                'Zwei Frage-Varianten: Empfehlung & Vergleich (ab Pro)',
                                'Verlauf über Zeit', 'Manuelle Checks auf Abruf',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2 text-slate-400">
                                    <span className="text-emerald-400">✓</span> {item}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="fuer-wen" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Für wen ist AuditAI gedacht?</h2>
                        <p>
                            Webentwickler und Agenturen, die schnell den Status einer Website (eigen oder Kunde) prüfen wollen, ohne drei Tools zu jonglieren. SEO-Freelancer, die ihren Kunden auch KI-Sichtbarkeit als Thema mitgeben wollen, bevor es zum Standard wird. Und kleine bis mittelständische Unternehmen, die selbst verstehen wollen, warum sie bei Google - oder bei ChatGPT - nicht auftauchen, ohne dafür eine Agentur zu beauftragen.
                        </p>
                    </section>

                    <section id="preise" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Preise im Überblick</h2>
                        <div className="overflow-hidden rounded-2xl border border-white/[0.07] mb-4">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <th className="text-left px-4 py-3 text-slate-400 font-semibold">Plan</th>
                                        <th className="text-left px-4 py-3 text-slate-400 font-semibold">Preis</th>
                                        <th className="text-left px-4 py-3 text-slate-400 font-semibold">Enthalten</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['Free (Audit)', '€0/Monat', '1 Audit/Monat, SEO-, Performance- & GEO-Score'],
                                        ['Pro (Audit)', '€29/Monat', '10 Audits/Monat, KI-Report, Screenshots, PDF-Export'],
                                        ['SEO-Automatisierung', 'ab €19/Monat', 'Wöchentliches Ranking-Tracking, 14 Tage gratis testen'],
                                        ['GEO-Automatisierung', 'ab €4,99/Monat', 'Wöchentliches KI-Mention-Tracking, 14 Tage gratis testen'],
                                    ].map(([plan, price, desc]) => (
                                        <tr key={plan} className="border-b border-white/[0.04] last:border-0">
                                            <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{plan}</td>
                                            <td className="px-4 py-3 text-amber-400 font-medium whitespace-nowrap">{price}</td>
                                            <td className="px-4 py-3 text-slate-400">{desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-sm text-slate-500">
                            Alle Automatisierungs-Pläne jederzeit kündbar, kein versteckter Trial-Trick.
                        </p>
                    </section>

                    <section id="faq" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Häufige Fragen</h2>
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
                <div className="mt-14 bg-gradient-to-br from-amber-950/30 to-[#05080f] border border-amber-500/20 rounded-2xl p-6 sm:p-8 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                        SEO, Performance und GEO in einem Report
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        Prüfe deine Website in unter 60 Sekunden - inklusive llms.txt, KI-Crawler-Erlaubnis und Schema für KI-Zitate. Start ohne Registrierung, für den vollständigen Report mit allen Scores meldest du dich kostenlos an.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-violet-600 hover:from-amber-400 hover:to-violet-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/20"
                    >
                        Kostenlosen Audit starten
                    </Link>
                    <div className="mt-3 text-xs text-slate-600">Ohne Registrierung starten · Voller Report kostenlos · 60 Sekunden</div>
                </div>

                {/* Cross-link to sibling posts */}
                <div className="mt-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1 block">Weiterlesen</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                SEO-Checkliste 2026: In 15 Minuten alle Fehler selbst finden
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Willst du erstmal selbst prüfen? 6 Phasen, alle wichtigen Punkte in fester Reihenfolge.
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
