import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Core Web Vitals 2026: Verstehen und kostenlos testen',
    description: 'Core Web Vitals einfach erklärt: LCP, INP und CLS mit den offiziellen Google-Schwellenwerten. Plus: wie du sie in unter 2 Minuten kostenlos testest.',
    keywords: 'core web vitals, core web vitals testen, core web vitals kostenlos, core web vitals prüfen kostenlos, lcp inp cls, ladezeit test kostenlos, pagespeed insights',
    alternates: { canonical: 'https://www.sitecheckai.dev/blog/core-web-vitals-testen' },
    openGraph: {
        title: 'Core Web Vitals 2026: Verstehen und kostenlos testen',
        description: 'LCP, INP und CLS erklärt - mit den offiziellen Schwellenwerten und kostenlosen Test-Tools.',
        url: 'https://www.sitecheckai.dev/blog/core-web-vitals-testen',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Core Web Vitals 2026: Verstehen und kostenlos testen',
    description: 'Core Web Vitals einfach erklärt: LCP, INP und CLS mit den offiziellen Google-Schwellenwerten. Plus: wie du sie kostenlos testest.',
    image: 'https://www.sitecheckai.dev/blog/core-web-vitals-testen/opengraph-image',
    datePublished: '2026-07-26T09:00:00+02:00',
    dateModified: '2026-07-26T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/blog/core-web-vitals-testen',
    mainEntityOfPage: 'https://www.sitecheckai.dev/blog/core-web-vitals-testen',
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sitecheckai.dev/blog' },
        { '@type': 'ListItem', position: 3, name: 'Core Web Vitals testen', item: 'https://www.sitecheckai.dev/blog/core-web-vitals-testen' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was sind Core Web Vitals?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Core Web Vitals sind drei von Google definierte Metriken, die die wahrgenommene Nutzererfahrung einer Website messen: LCP (Ladegeschwindigkeit), INP (Reaktionsfähigkeit) und CLS (visuelle Stabilität). Sie sind seit 2021 offizieller Google-Ranking-Faktor.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie teste ich meine Core Web Vitals kostenlos?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Am schnellsten mit Googles eigenem PageSpeed Insights (pagespeed.web.dev) - URL eingeben, Ergebnis in Sekunden. Für mehrere Seiten gleichzeitig eignet sich ein automatisierter SEO-Test wie AuditAI besser, da PageSpeed Insights nur eine URL pro Durchlauf prüft.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist der Unterschied zwischen INP und dem alten FID?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'FID (First Input Delay) maß nur die Verzögerung bis zur ersten Reaktion auf eine Nutzerinteraktion. INP (Interaction to Next Paint) hat FID im März 2024 als offizielle Core-Web-Vitals-Metrik abgelöst und misst die Reaktionsfähigkeit über die gesamte Seitenbesuchsdauer hinweg - ein deutlich vollständigeres Bild der tatsächlichen Interaktivität.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie oft sollte ich Core Web Vitals prüfen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nach jedem größeren Deployment und mindestens einmal im Monat, da neue Bilder, Skripte oder Drittanbieter-Einbindungen die Werte unbemerkt verschlechtern können. Wer Core Web Vitals auf mehreren Seiten im Blick behalten will, profitiert von einem automatisierten, wiederkehrenden Check statt manueller Einzelprüfung.',
            },
        },
    ],
}

const VITALS = [
    {
        code: 'LCP',
        name: 'Largest Contentful Paint',
        measures: 'Ladegeschwindigkeit - wie schnell der größte sichtbare Inhalt (meist ein Bild oder Textblock) lädt.',
        good: '≤ 2,5 s',
        ok: '2,5 s – 4,0 s',
        poor: '> 4,0 s',
        color: '#7c3aed',
    },
    {
        code: 'INP',
        name: 'Interaction to Next Paint',
        measures: 'Reaktionsfähigkeit - wie schnell die Seite auf Klicks, Taps oder Tastatureingaben visuell reagiert.',
        good: '≤ 200 ms',
        ok: '200 ms – 500 ms',
        poor: '> 500 ms',
        color: '#06b6d4',
    },
    {
        code: 'CLS',
        name: 'Cumulative Layout Shift',
        measures: 'Visuelle Stabilität - wie stark sich Elemente während des Ladens unerwartet verschieben.',
        good: '≤ 0,1',
        ok: '0,1 – 0,25',
        poor: '> 0,25',
        color: '#f59e0b',
    },
]

const CAUSES = [
    {
        vital: 'LCP',
        title: 'Häufigste Ursachen für schlechten LCP',
        items: [
            'Unkomprimierte oder falsch formatierte Bilder (kein WebP/AVIF)',
            'Render-blockierendes CSS und JavaScript im <head>',
            'Langsame Server-Antwortzeit (TTFB über 800ms)',
            'Fehlendes Preloading für das wichtigste Bild oberhalb des Folds',
        ],
    },
    {
        vital: 'INP',
        title: 'Häufigste Ursachen für schlechten INP',
        items: [
            'Große, blockierende JavaScript-Bundles die den Main Thread besetzen',
            'Schwere Drittanbieter-Skripte (Tracking, Chat-Widgets, Ads)',
            'Zu viele DOM-Elemente, die bei Interaktion neu berechnet werden müssen',
            'Fehlendes Code-Splitting - die ganze Seite lädt JS, das nur ein Teil braucht',
        ],
    },
    {
        vital: 'CLS',
        title: 'Häufigste Ursachen für schlechten CLS',
        items: [
            'Bilder und Videos ohne feste width/height-Attribute',
            'Web-Fonts ohne font-display: optional oder swap (Schriftwechsel verschiebt Text)',
            'Dynamisch nachgeladene Inhalte (Banner, Cookie-Hinweise) ohne reservierten Platz',
            'Anzeigen-Container ohne fest definierte Mindesthöhe',
        ],
    },
]

export default function CoreWebVitalsPage() {
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
                    <span className="text-slate-500">Core Web Vitals testen</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-amber-500/15 text-amber-400">
                            Performance
                        </span>
                        <span className="text-xs text-slate-600">26. Juli 2026</span>
                        <span className="text-xs text-slate-600">· 8 min Lesezeit</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        Core Web Vitals 2026: Verstehen und kostenlos testen
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        LCP, INP, CLS - drei Abkürzungen, die seit 2021 mitentscheiden, wie gut deine Website bei Google rankt. Hier erfährst du, was sie messen, welche Werte "gut" sind und wie du sie in unter 2 Minuten kostenlos testest.
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
                        <h2 className="text-2xl font-bold text-white mb-4">Was sind Core Web Vitals?</h2>
                        <p>
                            Core Web Vitals sind drei Metriken, die Google als{' '}
                            <a href="https://developers.google.com/search/docs/appearance/core-web-vitals" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">
                                offiziellen Bestandteil der Suchergebnis-Bewertung
                            </a>{' '}
                            einsetzt, um zu messen, wie eine Website sich für echte Nutzer anfühlt - nicht nur wie schnell sie technisch lädt, sondern wie schnell sie nutzbar wirkt. Seit 2021 fließen sie direkt in Rankings ein, als Teil dessen, was Google "Page Experience" nennt.
                        </p>
                        <p className="mt-4">
                            Der entscheidende Unterschied zu älteren Ladezeit-Metriken: Core Web Vitals werden nicht nur im Labor gemessen (Lighthouse-Simulation), sondern auch als echte Felddaten aus dem Chrome-Browser realer Besucher erhoben. Eine Seite kann im Labortest gut abschneiden und trotzdem bei echten Nutzern schlecht performen, wenn diese langsamere Geräte oder Verbindungen haben.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-2">Die 3 Core Web Vitals im Detail</h2>
                        <p className="text-slate-400 mb-6">Alle drei Werte müssen im 75. Perzentil "gut" sein, damit Google die Seite insgesamt als "gut" bewertet.</p>
                        <div className="space-y-4">
                            {VITALS.map((v) => (
                                <div key={v.code} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded" style={{ background: v.color + '18', color: v.color }}>{v.code}</span>
                                        <h3 className="font-semibold text-white">{v.name}</h3>
                                    </div>
                                    <p className="text-sm text-slate-400 leading-relaxed mb-4">{v.measures}</p>
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg py-2 px-1">
                                            <div className="text-[8px] sm:text-[10px] text-emerald-400 font-semibold uppercase tracking-normal sm:tracking-wider leading-tight break-words">Gut</div>
                                            <div className="text-sm text-white font-mono mt-0.5">{v.good}</div>
                                        </div>
                                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg py-2 px-1">
                                            <div className="text-[8px] sm:text-[10px] text-amber-400 font-semibold uppercase tracking-normal sm:tracking-wider leading-tight break-words">Verbesserungswürdig</div>
                                            <div className="text-sm text-white font-mono mt-0.5">{v.ok}</div>
                                        </div>
                                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-1">
                                            <div className="text-[8px] sm:text-[10px] text-red-400 font-semibold uppercase tracking-normal sm:tracking-wider leading-tight break-words">Schlecht</div>
                                            <div className="text-sm text-white font-mono mt-0.5">{v.poor}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-cyan-500/8 border border-cyan-500/20 rounded-2xl p-5 mt-5">
                            <p className="text-sm text-cyan-300 font-medium mb-1">Wichtig, falls du ältere Artikel liest</p>
                            <p className="text-sm text-slate-400">
                                INP hat im März 2024 die Metrik FID (First Input Delay) als offiziellen Core Web Vital abgelöst. Viele ältere SEO-Ratgeber nennen noch FID - das ist veraltet. Prüfe heute nur noch INP.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Wie testest du deine Core Web Vitals kostenlos?</h2>
                        <p>
                            Der schnellste Weg: <a href="https://pagespeed.web.dev" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">PageSpeed Insights</a> von Google selbst. URL eingeben, warten, fertig - du bekommst sowohl Labordaten (Lighthouse-Simulation) als auch echte Felddaten aus dem Chrome User Experience Report, sofern die Seite genug Traffic hat.
                        </p>
                        <p className="mt-4">
                            Alternativen für den manuellen Check: die Chrome DevTools (Lighthouse-Tab, direkt im Browser) für Labordaten, oder der Core-Web-Vitals-Bericht in der Google Search Console für aggregierte Felddaten über die letzte 28-Tage-Periode.
                        </p>
                        <p className="mt-4">
                            Der Haken an allen dreien: Sie prüfen jeweils nur eine URL pro Durchlauf. Willst du mehrere Unterseiten gleichzeitig sehen - Produktseiten, Blogartikel, Landingpages - brauchst du entweder viel manuelle Zeit oder ein automatisiertes Tool, das mehrseitig crawlt.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">Die häufigsten Ursachen für schlechte Werte</h2>
                        <div className="space-y-5">
                            {CAUSES.map((c) => (
                                <div key={c.vital} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                                    <h3 className="font-semibold text-white mb-3">{c.title}</h3>
                                    <ul className="space-y-2">
                                        {c.items.map((item) => (
                                            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                                                <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0 mt-2" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Häufige Fragen zu Core Web Vitals</h2>
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
                        Core Web Vitals auf allen Unterseiten prüfen
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        AuditAI misst LCP, TTFB, FCP und Ladezeit auf bis zu 25 Unterseiten gleichzeitig - zusammen mit SEO- und GEO-Signalen im selben Report. Start ohne Registrierung, für den vollständigen Report mit allen Scores meldest du dich kostenlos an.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-violet-600 hover:from-amber-400 hover:to-violet-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/20"
                    >
                        Performance jetzt testen
                    </Link>
                    <div className="mt-3 text-xs text-slate-600">Ohne Registrierung starten · Voller Report kostenlos · 60 Sekunden</div>
                </div>

                {/* Cross-link to sibling posts */}
                <div className="mt-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1 block">Weiterlesen</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                Die SEO-Checkliste 2026 in 15 Minuten
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Core Web Vitals sind nur eine von 6 Phasen - die komplette Selbst-Check-Reihenfolge inklusive GEO-Signalen.
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