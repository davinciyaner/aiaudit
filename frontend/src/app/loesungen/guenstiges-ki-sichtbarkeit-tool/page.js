import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Günstiges KI-Sichtbarkeit Tool ab 4,99 € | AuditAI',
    description: 'Günstiges KI-Sichtbarkeit Tool gesucht, das auch SEO abdeckt? AuditAI kombiniert GEO-Tracking (ChatGPT, Claude, Perplexity) und SEO-Rankings ab 4,99 €/Monat – mit Gratis-Plan.',
    keywords: 'günstiges ki sichtbarkeit tool, ki sichtbarkeit tool günstig, ai visibility und seo in einem tool, seo und ki sichtbarkeit kombiniert, günstiges geo tool, ai visibility tool preisvergleich',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/loesungen/guenstiges-ki-sichtbarkeit-tool',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/loesungen/guenstiges-ki-sichtbarkeit-tool',
            'en-US': 'https://www.sitecheckai.dev/en/solutions/affordable-ai-visibility-tool',
        },
    },
    openGraph: {
        title: 'Günstiges KI-Sichtbarkeit Tool: SEO und AI Visibility in einem Abo',
        description: 'AuditAI kombiniert GEO-Tracking (ChatGPT, Claude, Perplexity, Google AI Overview) und SEO-Rankings ab 4,99 €/Monat – mit echtem Gratis-Plan.',
        url: 'https://www.sitecheckai.dev/loesungen/guenstiges-ki-sichtbarkeit-tool',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Günstiges KI-Sichtbarkeit Tool: SEO und AI Visibility in einem Abo',
    description: 'AuditAI kombiniert GEO-Tracking (ChatGPT, Claude, Perplexity, Google AI Overview) und SEO-Rankings ab 4,99 €/Monat – mit echtem Gratis-Plan.',
    image: 'https://www.sitecheckai.dev/loesungen/guenstiges-ki-sichtbarkeit-tool/opengraph-image',
    datePublished: '2026-08-28T09:00:00+02:00',
    dateModified: '2026-08-28T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/loesungen/guenstiges-ki-sichtbarkeit-tool',
    mainEntityOfPage: 'https://www.sitecheckai.dev/loesungen/guenstiges-ki-sichtbarkeit-tool',
    about: [
        { '@type': 'Thing', name: 'AI Visibility Tracking' },
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
        { '@type': 'Thing', name: 'Search Engine Optimization' },
    ],
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev' },
        { '@type': 'ListItem', position: 2, name: 'Lösungen', item: 'https://www.sitecheckai.dev/loesungen' },
        { '@type': 'ListItem', position: 3, name: 'Günstiges KI-Sichtbarkeit Tool', item: 'https://www.sitecheckai.dev/loesungen/guenstiges-ki-sichtbarkeit-tool' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was ist ein günstiges KI-Sichtbarkeit Tool?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ein KI-Sichtbarkeit Tool (auch AI-Visibility- oder GEO-Tool genannt) prüft, ob und wie oft ChatGPT, Claude, Perplexity oder Google AI Overview deine Website erwähnen. "Günstig" bedeutet hier: ein niedriger Einstiegspreis in Euro ohne Plattform-Aufpreise und ohne verpflichtendes Agentur-Paket. AuditAI startet bei 4,99 €/Monat für Claude-Tracking.',
            },
        },
        {
            '@type': 'Question',
            name: 'Gibt es ein Tool, das SEO und KI-Sichtbarkeit (GEO) kombiniert?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja. AuditAI bietet SEO-Automatisierung (wöchentliche Google-Rankings, Keyword-Ideen, Konkurrenzanalyse, Backlinks) und GEO-Automatisierung (KI-Sichtbarkeit bei ChatGPT, Claude, Perplexity, Google AI Overview) aus einem Konto – wahlweise einzeln oder zusammen buchbar. Die meisten reinen AI-Visibility-Tools decken kein klassisches SEO ab.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was kostet KI-Sichtbarkeit tracken bei AuditAI?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Die GEO-Automatisierung startet bei 4,99 €/Monat (Claude + Gemini, 1 Website, 10 Keywords, wöchentlicher Auto-Check). Der Pro-Plan für 19,99 €/Monat deckt alle fünf KI-Plattformen ab. SEO-Automatisierung startet separat bei 19 €/Monat. Alle Automatisierungs-Pläne haben 14 Tage kostenlose Testphase.',
            },
        },
        {
            '@type': 'Question',
            name: 'Ist AuditAI wirklich kostenlos nutzbar?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja. Der Free-Plan ist dauerhaft kostenlos und enthält 1 Audit pro Monat mit SEO-Score, GEO-Sichtbarkeit und Performance-Metriken – ganz ohne Kreditkarte. Die Automatisierungs-Abos (wöchentliche, laufende Checks) sind optional und zusätzlich buchbar.',
            },
        },
        {
            '@type': 'Question',
            name: 'Welche KI-Plattformen deckt die GEO-Automatisierung ab?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Claude, ChatGPT, Gemini, Perplexity und Google AI Overview. Im Einsteiger-Plan sind Claude und Gemini enthalten, ab dem Pro-Plan (19,99 €/Monat) sind alle fünf Plattformen inklusive – ohne separate Add-on-Kosten pro Plattform.',
            },
        },
    ],
}

const PRICING_ROWS = [
    ['Free Audit', '1 Audit/Monat · SEO-Score, GEO-Sichtbarkeit, Performance', '0 € dauerhaft'],
    ['GEO Einsteiger', 'Claude-Tracking · 1 Website · 10 Keywords · wöchentlicher Auto-Check', '4,99 €/Monat'],
    ['GEO Pro', 'ChatGPT + Claude + Gemini + Perplexity + Google AI Overview · 3 Websites · 20 Keywords', '19,99 €/Monat'],
    ['SEO Einsteiger', '3 Websites · 50 Keywords · wöchentliches Ranking-Update · Backlink-Übersicht', '19 €/Monat'],
]

const INCLUDED_GEO = [
    'Mention-Tracking bei Claude, ChatGPT, Perplexity und Google AI Overview',
    'Sentiment-Analyse jeder Erwähnung (positiv/neutral/negativ)',
    'Wettbewerber-Ranking: welche Domains werden statt dir zitiert, und auf welchem Ø Platz',
    'Wöchentlicher Auto-Check plus manuelle Checks auf Abruf',
]

const INCLUDED_SEO = [
    'Wöchentliche Google-Ranking-Updates pro Keyword',
    'Keyword-Ideen mit echtem Suchvolumen',
    'Konkurrenzanalyse: welche Domains ranken für deine Keywords',
    'Backlink-Übersicht, monatlich aktualisiert',
]

const FOR_WHOM = [
    'du KI-Sichtbarkeit und SEO nicht in zwei separaten Abos zahlen willst',
    'du als Freelancer oder kleines Unternehmen einen niedrigen Einstiegspreis brauchst',
    'dir ein echter Gratis-Plan wichtiger ist als eine zeitlich befristete Testphase',
    'du priorisierte Fixes statt nur roher Kennzahlen willst',
]

export default function GuenstigesGeoToolPage() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
                    <Link href="/" className="hover:text-slate-400 transition-colors">AuditAI</Link>
                    <span>/</span>
                    <Link href="/loesungen" className="hover:text-slate-400 transition-colors">Lösungen</Link>
                    <span>/</span>
                    <span className="text-slate-500">Günstiges KI-Sichtbarkeit Tool</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[var(--accent-soft)] text-[var(--accent)]">
                            Lösung
                        </span>
                        <span className="text-xs text-slate-600">28. August 2026</span>
                        <span className="text-xs text-slate-600">· 6 min Lesezeit</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        Günstiges KI-Sichtbarkeit Tool: SEO und AI Visibility in einem Abo
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Die meisten Tools für KI-Sichtbarkeit sind reine Prompt-Monitoring-Dashboards – ohne SEO, oft ab 25–30 $/Monat, und jede zusätzliche KI-Plattform kostet extra. Wer beides braucht, zahlt am Ende für zwei Abos. AuditAI verbindet GEO-Automatisierung (KI-Sichtbarkeit bei ChatGPT, Claude, Perplexity und Google AI Overview) und SEO-Automatisierung in einem Konto – mit einem Einstieg ab 4,99 €/Monat und einem dauerhaft kostenlosen Plan.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-slate-600">
                        <Link href="/about" className="flex items-center gap-2 hover:text-slate-300 transition-colors">
                            <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--bg-base)] text-[10px] font-bold">F</div>
                            <span>Finn Paustian</span>
                        </Link>
                        <span>·</span>
                        <span>Gründer, AuditAI</span>
                    </div>
                </div>

                <div className="border-t border-[var(--border-subtle)] mb-10" />

                <div className="space-y-10 text-slate-300 leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Warum ein Tool für beides sinnvoller ist</h2>
                        <p>
                            Klassisches SEO optimiert dafür, dass Google dich in der Linkliste zeigt. GEO (Generative Engine Optimization) optimiert dafür, dass ChatGPT, Claude, Perplexity oder Google AI Overview dich in einer generierten Antwort <em>zitieren</em>. Beides hängt zusammen – strukturierte Daten, klare Produktdefinitionen und technisch saubere Seiten helfen in beiden Disziplinen – wird aber meistens von komplett getrennten Tools gemessen: ein SEO-Rank-Tracker hier, ein AI-Visibility-Dashboard dort. Zwei Abos, zwei Logins, zwei Rechnungen.
                        </p>
                        <p className="mt-4">
                            AuditAI bündelt beides in einem Konto. Du siehst deine Google-Rankings und deine KI-Erwähnungen nebeneinander, kannst aber auch nur eines der beiden Abos buchen, wenn du nur eine Seite brauchst.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Alle Preise auf einen Blick</h2>
                        <div className="overflow-x-auto rounded-2xl border border-[var(--border-subtle)]">
                            <table className="w-full text-sm min-w-[560px]">
                                <thead>
                                    <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-06)]">
                                        <th className="text-left px-5 py-3 text-slate-400 font-semibold">Plan</th>
                                        <th className="text-left px-5 py-3 text-slate-400 font-semibold">Enthalten</th>
                                        <th className="text-left px-5 py-3 text-[var(--accent)] font-semibold">Preis</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PRICING_ROWS.map(([plan, included, price], i) => (
                                        <tr key={i} className="border-b border-[var(--border-subtle)] last:border-0">
                                            <td className="px-5 py-3 text-white font-medium whitespace-nowrap">{plan}</td>
                                            <td className="px-5 py-3 text-slate-300">{included}</td>
                                            <td className="px-5 py-3 text-white font-semibold whitespace-nowrap">{price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-600 mt-3">
                            Preise Stand August 2026, inkl. MwSt. Alle Automatisierungs-Pläne (SEO + GEO) haben 14 Tage kostenlose Testphase, monatlich kündbar. Details auf den{' '}
                            <Link href="/pricing" className="text-slate-500 hover:text-slate-300 underline underline-offset-2">Preisseiten</Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Was ist enthalten</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                <h3 className="font-semibold text-white mb-3 text-sm">GEO-Automatisierung (KI-Sichtbarkeit)</h3>
                                <ul className="space-y-2">
                                    {INCLUDED_GEO.map((item, i) => (
                                        <li key={i} className="text-sm text-slate-400 leading-relaxed flex gap-2">
                                            <span className="text-[var(--accent)] shrink-0">–</span>{item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                <h3 className="font-semibold text-white mb-3 text-sm">SEO-Automatisierung</h3>
                                <ul className="space-y-2">
                                    {INCLUDED_SEO.map((item, i) => (
                                        <li key={i} className="text-sm text-slate-400 leading-relaxed flex gap-2">
                                            <span className="text-[var(--accent)] shrink-0">–</span>{item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Für wen sich das lohnt</h2>
                        <p className="mb-4">Ein günstiges Kombi-Tool ist die richtige Wahl, wenn …</p>
                        <ul className="space-y-2">
                            {FOR_WHOM.map((item, i) => (
                                <li key={i} className="text-sm text-slate-400 leading-relaxed flex gap-2">
                                    <span className="text-[var(--accent)] shrink-0">–</span>{item}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-sm text-slate-500">
                            Für sehr großvolumiges Agentur-Monitoring über viele Kunden-Workspaces hinweg kann ein spezialisiertes, teureres Tool wie{' '}
                            <Link href="/vergleich/otterly-alternative" className="text-slate-400 hover:text-[var(--accent)] underline underline-offset-2">Otterly.ai</Link>{' '}
                            mehr Kapazität bieten – für die meisten Einzelseiten, Freelancer und kleinen Teams reicht der günstigere Kombi-Ansatz von AuditAI.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {faqLd.mainEntity.map((faq, i) => (
                                <div key={i} className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                    <h3 className="font-semibold text-white mb-2 text-sm">{faq.name}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{faq.acceptedAnswer.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* CTA: Selbst ausprobieren */}
                <div className="mt-14 bg-[var(--accent-soft)] border border-[var(--accent-border)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Selbst ausprobieren</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                Teste kostenlos, wie sichtbar du bei Google und in KI-Antworten bist
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Gib deine URL ein und erhalte in rund 60 Sekunden deinen SEO- und KI-Sichtbarkeits-Score – ohne Anmeldung, ohne Kreditkarte.
                            </p>
                        </div>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[var(--accent-border)] shrink-0"
                        >
                            Jetzt kostenlos prüfen
                        </Link>
                    </div>
                </div>

                {/* Cross-link: Vergleichsseite */}
                <div className="mt-5 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Vergleich</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                Otterly.ai-Alternative: der ausführliche Vergleich
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Wie AuditAI im Detail gegen den bekanntesten reinen AI-Visibility-Tracker abschneidet – inklusive Preisen und Grenzen.
                            </p>
                        </div>
                        <Link
                            href="/vergleich/otterly-alternative"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--surface-08)] hover:bg-[var(--surface-10)] text-white text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Vergleich lesen
                        </Link>
                    </div>
                </div>

                {/* Cross-link: SEO+GEO Automatisierung Blogpost */}
                <div className="mt-5 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Weiterlesen</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                SEO Rank Tracker & KI-Sichtbarkeits-Monitor
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Wie SEO Automatisierung und GEO Automatisierung bei AuditAI im Detail funktionieren – inklusive Preisen.
                            </p>
                        </div>
                        <Link
                            href="/blog/seo-geo-automatisierung"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--surface-08)] hover:bg-[var(--surface-10)] text-white text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Artikel lesen
                        </Link>
                    </div>
                </div>

                {/* Back */}
                <div className="mt-10 pt-8 border-t border-[var(--border-subtle)]">
                    <Link href="/" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                        ← Zurück zur Startseite
                    </Link>
                </div>

            </article>

            <Footer />
        </main>
    )
}
