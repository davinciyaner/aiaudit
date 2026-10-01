import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ArticleSources from '../../components/site/ArticleSources'

export const metadata = {
    title: 'Core Web Vitals testen: LCP, INP & CLS kostenlos prüfen',
    description: 'Core Web Vitals kostenlos testen: LCP, INP und CLS einzeln prüfen - mit Googles PageSpeed Insights oder als mehrseitige Alternative ohne manuellen Einzelcheck.',
    keywords: 'core web vitals testen kostenlos, core web vitals tool ohne google, lcp testen, inp testen, cls testen, lcp inp cls testen, core web vitals, core web vitals testen, core web vitals kostenlos, core web vitals prüfen kostenlos, ladezeit test kostenlos, pagespeed insights',
    alternates: {
        canonical: 'https://www.scanora.ai/blog/core-web-vitals-testen',
        languages: {
            'de-DE': 'https://www.scanora.ai/blog/core-web-vitals-testen',
            'en-US': 'https://www.scanora.ai/en/blog/core-web-vitals-testing',
        },
    },
    openGraph: {
        title: 'Core Web Vitals testen kostenlos: LCP, INP & CLS prüfen (2026)',
        description: 'LCP, INP und CLS erklärt und einzeln getestet - mit den offiziellen Schwellenwerten und kostenlosen Test-Tools.',
        url: 'https://www.scanora.ai/blog/core-web-vitals-testen',
        type: 'article',
        locale: 'de_DE',
        images: ['https://www.scanora.ai/blog/core-web-vitals-testen/opengraph-image'],
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Core Web Vitals testen kostenlos: LCP, INP & CLS prüfen (2026)',
    description: 'Core Web Vitals kostenlos testen: LCP, INP und CLS einzeln prüfen - mit Googles PageSpeed Insights oder als mehrseitige Alternative.',
    image: 'https://www.scanora.ai/blog/core-web-vitals-testen/opengraph-image',
    datePublished: '2026-07-26T09:00:00+02:00',
    dateModified: '2026-09-12T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.scanora.ai/about' },
    publisher: {
        '@type': 'Organization',
        name: 'Scanora',
        url: 'https://www.scanora.ai',
        logo: { '@type': 'ImageObject', url: 'https://www.scanora.ai/logo', width: 512, height: 512 },
    },
    url: 'https://www.scanora.ai/blog/core-web-vitals-testen',
    mainEntityOfPage: 'https://www.scanora.ai/blog/core-web-vitals-testen',
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.scanora.ai/blog' },
        { '@type': 'ListItem', position: 3, name: 'Core Web Vitals testen', item: 'https://www.scanora.ai/blog/core-web-vitals-testen' },
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
                text: 'Am schnellsten mit Googles eigenem PageSpeed Insights (pagespeed.web.dev) - URL eingeben, Ergebnis in Sekunden für LCP, INP und CLS. Für mehrere Seiten gleichzeitig oder als Ergänzung im Gesamt-Audit misst Scanora TTFB und FCP über bis zu 25 Unterseiten hinweg - ersetzt aber keine dedizierte LCP/INP/CLS-Analyse.',
            },
        },
        {
            '@type': 'Question',
            name: 'Gibt es ein Core Web Vitals Tool ohne Google?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nicht ganz ohne Google-Bezug: LCP, INP und CLS sind von Google definierte Metriken, deren offizielle Werte auf Chrome-Messdaten (Lighthouse-Labordaten oder Chrome User Experience Report) basieren. Tools wie GTmetrix oder WebPageTest zeigen im Kern dieselben Lighthouse-Werte in einer anderen Oberfläche. Scanora misst mit einem eigenen Playwright-Browser TTFB und FCP als Teil eines umfassenderen SEO-, Performance- und GEO-Audits - eine echte Alternative ganz ohne Google-Technologie gibt es für die offiziellen CWV-Werte aktuell nicht.',
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
        ok: '2,5 s - 4,0 s',
        poor: '> 4,0 s',
        color: 'var(--accent)',
    },
    {
        code: 'INP',
        name: 'Interaction to Next Paint',
        measures: 'Reaktionsfähigkeit - wie schnell die Seite auf Klicks, Taps oder Tastatureingaben visuell reagiert.',
        good: '≤ 200 ms',
        ok: '200 ms - 500 ms',
        poor: '> 500 ms',
        color: 'var(--accent)',
    },
    {
        code: 'CLS',
        name: 'Cumulative Layout Shift',
        measures: 'Visuelle Stabilität - wie stark sich Elemente während des Ladens unerwartet verschieben.',
        good: '≤ 0,1',
        ok: '0,1 - 0,25',
        poor: '> 0,25',
        color: 'var(--warning)',
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

const SOURCES = [
    {
        "label": "Web Vitals",
        "publisher": "web.dev",
        "href": "https://web.dev/articles/vitals"
    },
    {
        "label": "Core Web Vitals und Google-Suchergebnisse",
        "publisher": "Google Search Central",
        "href": "https://developers.google.com/search/docs/appearance/core-web-vitals"
    },
    {
        "label": "PageSpeed Insights",
        "publisher": "Google",
        "href": "https://pagespeed.web.dev/"
    },
    {
        "label": "Chrome UX Report (CrUX)",
        "publisher": "Chrome for Developers",
        "href": "https://developer.chrome.com/docs/crux"
    }
]

export default function CoreWebVitalsPage() {
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
                    <span className="text-(--text-faint)">Core Web Vitals testen</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-(--warning-soft) text-(--warning)">
                            Performance
                        </span>
                        <span className="text-xs text-(--text-faint)">26. Juli 2026</span>
                        <span className="text-xs text-(--text-faint)">· 8 min Lesezeit</span>
                        <span className="text-xs text-(--text-faint)">· Aktualisiert am 12. September 2026</span>
                    </div>
                    <h1 className="text-[clamp(34px,4.4vw,52px)] font-bold text-(--text-white) leading-[1.06] tracking-[-0.035em] mb-5">
                        Core Web Vitals testen kostenlos: LCP, INP und CLS prüfen (2026)
                    </h1>
                    <p className="text-lg text-(--text-body) leading-relaxed">
                        Am schnellsten testest du Core Web Vitals kostenlos mit Googles PageSpeed Insights (pagespeed.web.dev): URL eingeben, in Sekunden Werte für LCP, INP und CLS erhalten - als Labordaten und, bei genug Traffic, als echte Nutzer-Felddaten. Für mehrere Seiten gleichzeitig oder als Ergänzung im Gesamt-Audit misst ein Tool wie Scanora zusätzlich TTFB und FCP.
                    </p>
                    <p className="text-lg text-(--text-body) leading-relaxed mt-4">
                        LCP, INP, CLS - drei Abkürzungen, die seit 2021 mitentscheiden, wie gut deine Website bei Google rankt. Hier erfährst du, was sie messen, welche Werte "gut" sind und wie du LCP, INP und CLS einzeln testest.
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
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Was sind Core Web Vitals?</h2>
                        <p>
                            Core Web Vitals sind drei Metriken, die Google als{' '}
                            <a href="https://developers.google.com/search/docs/appearance/core-web-vitals" target="_blank" rel="noopener noreferrer" className="text-(--warning) hover:text-(--warning) underline underline-offset-2">
                                offiziellen Bestandteil der Suchergebnis-Bewertung
                            </a>{' '}
                            einsetzt, um zu messen, wie eine Website sich für echte Nutzer anfühlt - nicht nur wie schnell sie technisch lädt, sondern wie schnell sie nutzbar wirkt. Seit 2021 fließen sie direkt in Rankings ein, als Teil dessen, was Google "Page Experience" nennt.
                        </p>
                        <p className="mt-4">
                            Der entscheidende Unterschied zu älteren Ladezeit-Metriken: Core Web Vitals werden nicht nur im Labor gemessen (Lighthouse-Simulation), sondern auch als echte Felddaten aus dem Chrome-Browser realer Besucher erhoben. Eine Seite kann im Labortest gut abschneiden und trotzdem bei echten Nutzern schlecht performen, wenn diese langsamere Geräte oder Verbindungen haben. Wie stark schlechte Ladezeit sich auf Rankings auswirkt, zeigen wir mit Zahlen in unserem Artikel zu den{' '}
                            <Link href="/blog/seo-test-haeufige-fehler" className="text-(--warning) hover:text-(--warning) underline underline-offset-2">
                                10 häufigsten SEO-Fehlern
                            </Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-2">Die 3 Core Web Vitals im Detail</h2>
                        <p className="text-(--text-muted) mb-6">Alle drei Werte müssen im 75. Perzentil "gut" sein, damit Google die Seite insgesamt als "gut" bewertet.</p>
                        <div className="space-y-4">
                            {VITALS.map((v) => (
                                <div key={v.code} className="bg-(--card) border border-(--line) rounded-2xl p-5 sm:p-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded" style={{ background: `color-mix(in oklch, ${v.color} 9%, transparent)`, color: v.color }}>{v.code}</span>
                                        <h3 className="font-semibold text-(--text-white)">{v.name}</h3>
                                    </div>
                                    <p className="text-sm text-(--text-muted) leading-relaxed mb-4">{v.measures}</p>
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div className="bg-(--success-soft) border border-(--success-border) rounded-lg py-2 px-1">
                                            <div className="text-[8px] sm:text-[10px] text-(--success) font-semibold uppercase tracking-normal sm:tracking-wider leading-tight wrap-break-word">Gut</div>
                                            <div className="text-sm text-(--text-white) font-mono mt-0.5">{v.good}</div>
                                        </div>
                                        <div className="bg-(--warning-soft) border border-(--warning-border) rounded-lg py-2 px-1">
                                            <div className="text-[8px] sm:text-[10px] text-(--warning) font-semibold uppercase tracking-normal sm:tracking-wider leading-tight wrap-break-word">Verbesserungswürdig</div>
                                            <div className="text-sm text-(--text-white) font-mono mt-0.5">{v.ok}</div>
                                        </div>
                                        <div className="bg-(--danger-soft) border border-(--danger-border) rounded-lg py-2 px-1">
                                            <div className="text-[8px] sm:text-[10px] text-(--danger) font-semibold uppercase tracking-normal sm:tracking-wider leading-tight wrap-break-word">Schlecht</div>
                                            <div className="text-sm text-(--text-white) font-mono mt-0.5">{v.poor}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-(--accent-soft) border border-(--accent-border) rounded-2xl p-5 mt-5">
                            <p className="text-sm text-(--accent-ink) font-medium mb-1">Wichtig, falls du ältere Artikel liest</p>
                            <p className="text-sm text-(--text-muted)">
                                INP hat im März 2024 die Metrik FID (First Input Delay) als offiziellen Core Web Vital abgelöst. Viele ältere SEO-Ratgeber nennen noch FID - das ist veraltet. Prüfe heute nur noch INP.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Core Web Vitals testen kostenlos: die 3 offiziellen Wege</h2>
                        <p>
                            Der schnellste Weg: <a href="https://pagespeed.web.dev" target="_blank" rel="noopener noreferrer" className="text-(--warning) hover:text-(--warning) underline underline-offset-2">PageSpeed Insights</a> von Google selbst. URL eingeben, warten, fertig - du bekommst sowohl Labordaten (Lighthouse-Simulation) als auch echte Felddaten aus dem Chrome User Experience Report, sofern die Seite genug Traffic hat.
                        </p>
                        <p className="mt-4">
                            Alternativen für den manuellen Check: die Chrome DevTools (Lighthouse-Tab, direkt im Browser) für Labordaten, oder der Core-Web-Vitals-Bericht in der Google Search Console für aggregierte Felddaten über die letzte 28-Tage-Periode.
                        </p>
                        <p className="mt-4">
                            Der Haken an allen dreien: Sie prüfen jeweils nur eine URL pro Durchlauf. Willst du mehrere Unterseiten gleichzeitig sehen - Produktseiten, Blogartikel, Landingpages - brauchst du entweder viel manuelle Zeit oder ein automatisiertes Tool, das mehrseitig crawlt.
                        </p>

                        <h3 className="text-lg font-semibold text-(--text-white) mt-8 mb-3">LCP, INP und CLS einzeln testen</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2.5 text-sm text-(--text-muted)">
                                <span className="w-1 h-1 rounded-full bg-(--warning) shrink-0 mt-2" />
                                <span><strong className="text-(--text-white)">LCP testen:</strong> im "Performance"-Tab der Chrome DevTools aufzeichnen oder direkt den LCP-Wert in PageSpeed Insights ablesen - dort auch farblich als "größtes Element" markiert.</span>
                            </li>
                            <li className="flex items-start gap-2.5 text-sm text-(--text-muted)">
                                <span className="w-1 h-1 rounded-full bg-(--warning) shrink-0 mt-2" />
                                <span><strong className="text-(--text-white)">INP testen:</strong> erfordert echte Interaktion, deshalb liefert PageSpeed Insights nur Felddaten aus dem Chrome User Experience Report zuverlässig - für Labor-Schätzwerte hilft die "Interactions"-Aufzeichnung in den Chrome DevTools.</span>
                            </li>
                            <li className="flex items-start gap-2.5 text-sm text-(--text-muted)">
                                <span className="w-1 h-1 rounded-full bg-(--warning) shrink-0 mt-2" />
                                <span><strong className="text-(--text-white)">CLS testen:</strong> im "Experience"-Bereich von PageSpeed Insights oder über die "Layout Shift Regions"-Einstellung in den Chrome DevTools sichtbar machen, welche Elemente sich verschieben.</span>
                            </li>
                        </ul>

                        <h3 className="text-lg font-semibold text-(--text-white) mt-8 mb-3">Core Web Vitals Tool ohne Google - geht das?</h3>
                        <p>
                            Nicht vollständig: LCP, INP und CLS sind von Google definierte Metriken, deren offizielle Werte technisch auf Chrome-Messdaten beruhen (Lighthouse-Labordaten oder Chrome User Experience Report). Tools wie GTmetrix oder WebPageTest zeigen im Kern dieselben Lighthouse-Werte in einer anderen Oberfläche - sie sind keine unabhängige Messung.
                        </p>
                        <p className="mt-4">
                            Scanora geht einen anderen Weg: Ein eigener Playwright-Browser misst TTFB (Server-Antwortzeit) und FCP (erster sichtbarer Inhalt) direkt und kombiniert das mit SEO- und GEO-Checks in einem Report über bis zu 25 Unterseiten gleichzeitig. Das ist ehrlich gesagt kein Ersatz für eine dedizierte LCP/INP/CLS-Tiefenanalyse - aber eine schnelle, mehrseitige Ergänzung, wenn TTFB/FCP als Teil eines Gesamt-Audits reichen.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-6">Die häufigsten Ursachen für schlechte Werte</h2>
                        <div className="space-y-5">
                            {CAUSES.map((c) => (
                                <div key={c.vital} className="bg-(--card) border border-(--line) rounded-2xl p-5 sm:p-6">
                                    <h3 className="font-semibold text-(--text-white) mb-3">{c.title}</h3>
                                    <ul className="space-y-2">
                                        {c.items.map((item) => (
                                            <li key={item} className="flex items-start gap-2.5 text-sm text-(--text-muted)">
                                                <span className="w-1 h-1 rounded-full bg-(--warning) shrink-0 mt-2" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Häufige Fragen zu Core Web Vitals</h2>
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

                {/* CTA */}
                <div className="mt-14 bg-(--tint) border border-(--line) rounded-2xl p-6 sm:p-8 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-(--text-white) mb-3">
                        TTFB und FCP auf allen Unterseiten prüfen
                    </h2>
                    <p className="text-(--text-muted) text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        Scanora misst TTFB und FCP auf bis zu 25 Unterseiten gleichzeitig - zusammen mit SEO- und GEO-Signalen im selben Report. Für die vollständige LCP/INP/CLS-Analyse einzelner Seiten bleibt PageSpeed Insights die richtige Wahl. Start ohne Registrierung, für den vollständigen Report mit allen Scores meldest du dich kostenlos an.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-(--accent) text-(--on-accent) text-sm font-semibold rounded-xl transition-all duration-200"
                    >
                        Performance jetzt testen
                    </Link>
                    <div className="mt-3 text-xs text-(--text-faint)">Ohne Registrierung starten · Voller Report kostenlos · 60 Sekunden</div>
                </div>

                {/* Cross-link to sibling posts */}
                <div className="mt-5 bg-(--card) border border-(--line) rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-(--accent-ink) mb-1 block">Weiterlesen</span>
                            <h3 className="text-base sm:text-lg font-bold text-(--text-white) mb-2">
                                Die SEO-Checkliste 2026 in 15 Minuten
                            </h3>
                            <p className="text-(--text-muted) text-sm leading-relaxed max-w-md">
                                Core Web Vitals sind nur eine von 6 Phasen - die komplette Selbst-Check-Reihenfolge inklusive GEO-Signalen.
                            </p>
                        </div>
                        <Link
                            href="/blog/seo-checkliste-2026"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--tint) hover:bg-(--tint) text-(--text-white) text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Checkliste öffnen
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