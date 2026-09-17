import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Sichtbarkeit in ChatGPT tracken 2026: ChatGPT AI Sichtbarkeit prüfen',
    description: 'Sichtbarkeit in ChatGPT tracken ab 29,99 €/Monat inklusive Google-Rankings im selben Dashboard - wöchentliches Mention-Tracking mit Quellenkontext.',
    keywords: 'sichtbarkeit in chatgpt, chatgpt sichtbarkeit tracken, chatgpt ai sichtbarkeit, chatgpt visibility tracking, chatgpt seo, ki sichtbarkeit chatgpt, generative engine optimization chatgpt, chatgpt erwähnungen tracken',
    alternates: {
        canonical: 'https://www.scanora.ai/loesungen/chatgpt-sichtbarkeit-tracken',
    },
    openGraph: {
        title: 'Sichtbarkeit in ChatGPT tracken 2026: ChatGPT AI Sichtbarkeit prüfen',
        description: 'Sichtbarkeit in ChatGPT tracken ab 29,99 €/Monat - inklusive klassischer Google-Rankings im selben Dashboard, nicht in zwei getrennten Tools.',
        url: 'https://www.scanora.ai/loesungen/chatgpt-sichtbarkeit-tracken',
        type: 'article',
        locale: 'de_DE',
        images: ['https://www.scanora.ai/loesungen/chatgpt-sichtbarkeit-tracken/opengraph-image'],
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Sichtbarkeit in ChatGPT tracken 2026: ChatGPT AI Sichtbarkeit prüfen',
    description: 'Sichtbarkeit in ChatGPT tracken ab 29,99 €/Monat, inklusive klassischer Google-Rankings im selben Dashboard statt zwei getrennter Abos.',
    image: 'https://www.scanora.ai/loesungen/chatgpt-sichtbarkeit-tracken/opengraph-image',
    datePublished: '2026-09-17T09:00:00+02:00',
    dateModified: '2026-09-17T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.scanora.ai/about' },
    publisher: {
        '@type': 'Organization',
        name: 'Scanora',
        url: 'https://www.scanora.ai',
        logo: { '@type': 'ImageObject', url: 'https://www.scanora.ai/logo', width: 512, height: 512 },
    },
    url: 'https://www.scanora.ai/loesungen/chatgpt-sichtbarkeit-tracken',
    mainEntityOfPage: 'https://www.scanora.ai/loesungen/chatgpt-sichtbarkeit-tracken',
    about: [
        { '@type': 'Thing', name: 'AI Visibility Tracking' },
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
        { '@type': 'Thing', name: 'ChatGPT (OpenAI)' },
    ],
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai' },
        { '@type': 'ListItem', position: 2, name: 'Lösungen', item: 'https://www.scanora.ai/loesungen' },
        { '@type': 'ListItem', position: 3, name: 'Sichtbarkeit in ChatGPT tracken', item: 'https://www.scanora.ai/loesungen/chatgpt-sichtbarkeit-tracken' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was bedeutet "Sichtbarkeit in ChatGPT"?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Sichtbarkeit in ChatGPT beschreibt, ob und wie oft ChatGPT deine Website oder Marke erwähnt, wenn Nutzer zu relevanten Themen aus deiner Branche fragen. Gemessen wird das über die Mention-Rate über Zeit und über Zitate mit Quellenkontext - nicht über eine einzelne Stichprobe, die je nach Tagesform und Prompt-Formulierung stark schwanken kann.',
            },
        },
        {
            '@type': 'Question',
            name: 'Reicht es nicht, einfach ChatGPT selbst zu fragen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Eine manuelle Stichprobe zeigt nur eine Momentaufnahme unter genau deiner Formulierung. Automatisiertes, wöchentliches Tracking über mehrere Prompt-Varianten zeigt dagegen den Verlauf über Zeit und macht sichtbar, welche Konkurrenten ChatGPT stattdessen zitiert - das lässt sich manuell kaum konsistent wiederholen.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was kostet ChatGPT-Sichtbarkeits-Tracking bei Scanora?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'ChatGPT ist Teil des GEO-Pro-Plans ab 29,99 €/Monat, zusammen mit Claude, Gemini, Perplexity und Google AI Overview - alle fünf Plattformen im selben Abo, ohne Aufpreis pro Plattform. Der günstigere Einsteiger-Plan (4,99 €/Monat) deckt Claude und Gemini ab, aber noch nicht ChatGPT.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was unterscheidet Scanora von reinen ChatGPT-Tracking-Tools?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Reine GEO-Tracker zeigen nur, ob KI-Modelle dich erwähnen. Scanora kombiniert das mit klassischem SEO-Rank-Tracking bei Google im selben Dashboard - inklusive der Überschneidungs-Ansicht, ob du bei Google rankst, aber bei ChatGPT unsichtbar bist, oder umgekehrt. Das ersetzt zwei separate Abos und zwei separate Logins.',
            },
        },
        {
            '@type': 'Question',
            name: 'Kann ich ChatGPT-Sichtbarkeit kostenlos testen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja, ohne Anmeldung und ohne Kreditkarte. Ein einmaliger Audit inklusive GEO-Sichtbarkeits-Check über mehrere KI-Plattformen ist über den dauerhaft kostenlosen Plan möglich. Die laufende, wöchentliche Automatisierung inklusive ChatGPT ab 29,99 €/Monat hat zusätzlich 14 Tage kostenlose Testphase.',
            },
        },
    ],
}

const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Sichtbarkeit in ChatGPT tracken',
    description: 'So richtest du automatisiertes Tracking ein, ob ChatGPT deine Website bei relevanten Anfragen erwähnt.',
    step: [
        { '@type': 'HowToStep', position: 1, name: 'Keywords festlegen', text: 'Themen und Suchanfragen definieren, zu denen ChatGPT deine Marke erwähnen könnte.' },
        { '@type': 'HowToStep', position: 2, name: 'Prompt-Varianten prüfen', text: 'Jedes Keyword sowohl empfehlungsorientiert als auch vergleichend abfragen, da ChatGPT je nach Formulierung unterschiedlich antwortet.' },
        { '@type': 'HowToStep', position: 3, name: 'Automatisch wöchentlich checken', text: 'Die Abfragen wöchentlich automatisiert wiederholen statt einmalig zu prüfen, um Veränderungen über Zeit zu erkennen.' },
        { '@type': 'HowToStep', position: 4, name: 'Auswerten und reagieren', text: 'Erwähnung, Sentiment und zitierte Konkurrenten auswerten und daraus konkrete Fixes ableiten (llms.txt, Schema Markup, Crawler-Freigaben für GPTBot).' },
    ],
}

const MARKET_ROWS = [
    ['Scanora', '29,99 €/Monat', 'Ja', 'Ja, im selben Dashboard'],
    ['Otterly.ai', '29 $/Monat', 'Ja', 'Nein, reines GEO-Tool'],
    ['Peec.ai', '85 €/Monat', 'Ja (1 von 3 wählbaren Engines)', 'Nein, reines GEO-Tool'],
    ['Writesonic', '249 $/Monat', 'Ja', 'Nein, primär Content-Generierung'],
]

const TRACKING_STEPS = [
    { num: 1, title: 'Keywords festlegen', text: 'Themen und Suchanfragen definieren, zu denen ChatGPT deine Marke erwähnen könnte - z. B. "bestes Tool für X" oder "X vs Y".' },
    { num: 2, title: 'Zwei Prompt-Varianten prüfen', text: 'Jedes Keyword empfehlungsorientiert ("Welches Tool kennst du für X?") und vergleichend ("Was ist das beste Tool für X?") abfragen - ChatGPT antwortet je nach Formulierung unterschiedlich.' },
    { num: 3, title: 'Wöchentlich automatisch wiederholen', text: 'Eine Einzelmessung zeigt nur eine Momentaufnahme. Wöchentliches Tracking zeigt, ob sich deine Sichtbarkeit verbessert, verschlechtert oder stabil bleibt.' },
    { num: 4, title: 'Auswerten und Fixes ableiten', text: 'Erwähnung, Sentiment und welche Konkurrenten stattdessen zitiert werden auswerten - und daraus konkrete technische Fixes ableiten (llms.txt, Schema Markup, Crawler-Freigaben für GPTBot).' },
]

export default function ChatgptSichtbarkeitPage() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
            <Navbar />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-faint)] mb-8">
                    <Link href="/" className="hover:text-[var(--text-muted)] transition-colors">Scanora</Link>
                    <span>/</span>
                    <Link href="/loesungen" className="hover:text-[var(--text-muted)] transition-colors">Lösungen</Link>
                    <span>/</span>
                    <span className="text-[var(--text-faint)]" aria-current="page">Sichtbarkeit in ChatGPT tracken</span>
                </nav>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[var(--accent-soft)] text-[var(--accent)]">
                            Lösung
                        </span>
                        <span className="text-xs text-[var(--text-faint)]">17. September 2026</span>
                        <span className="text-xs text-[var(--text-faint)]">· Aktualisiert: 17. September 2026</span>
                        <span className="text-xs text-[var(--text-faint)]">· 6 min Lesezeit</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text-white)] leading-tight tracking-tight mb-5">
                        Sichtbarkeit in ChatGPT tracken 2026: So siehst du, ob ChatGPT dich empfiehlt
                    </h1>
                    <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                        <strong className="text-[var(--text-white)]">Sichtbarkeit in ChatGPT</strong> bedeutet: Wie oft und in welchem Kontext nennt ChatGPT deine Marke, wenn Nutzer zu Themen aus deiner Branche fragen? Gemessen wird das über die Mention-Rate über Zeit und über Zitate mit Quellenkontext, statt einer einmaligen Stichprobe. Scanora trackt das automatisch einmal pro Woche im GEO-Pro-Plan ab 29,99 €/Monat - zusammen mit Claude, Gemini, Perplexity und Google AI Overview im selben Dashboard.
                    </p>
                    <p className="mt-4 text-[var(--text-body)] leading-relaxed">
                        ChatGPT ist die mit Abstand meistgenutzte KI-Suchoberfläche - entsprechend ist ChatGPT-Tracking bei praktisch jedem GEO-Tool im Basisangebot enthalten, anders als etwa Claude. Der eigentliche Unterschied zwischen den Anbietern liegt deshalb selten bei "ChatGPT dabei oder nicht", sondern beim Gesamtpreis und ob klassisches SEO-Tracking bei Google mit im selben Tool steckt oder als zweites Abo dazukommt.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-[var(--text-faint)]">
                        <Link href="/about" className="flex items-center gap-2 hover:text-[var(--text-body)] transition-colors">
                            <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--bg-base)] text-[10px] font-bold">F</div>
                            <span>Finn Paustian</span>
                        </Link>
                        <span>·</span>
                        <span>Gründer, Scanora</span>
                    </div>
                </div>

                <div className="border-t border-[var(--border-subtle)] mb-10" />

                <div className="space-y-10 text-[var(--text-body)] leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">ChatGPT ist überall dabei - der Unterschied liegt woanders</h2>
                        <p>
                            Anders als bei Claude, das bei mehreren Tools nur als teures Enterprise-Add-on verfügbar ist, gehört ChatGPT-Tracking bei so gut wie jedem GEO-Tool zum Basisangebot. Die relevante Frage ist deshalb nicht "trackt das Tool ChatGPT", sondern: Was kostet der Einstieg, und bekommst du klassisches Google-Ranking-Tracking gleich mit oder brauchst du dafür ein zweites Tool?
                        </p>
                        <div className="overflow-x-auto rounded-2xl border border-[var(--border-subtle)] mt-5">
                            <table className="w-full text-sm min-w-[620px]">
                                <thead>
                                    <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-06)]">
                                        <th className="text-left px-5 py-3 text-[var(--text-muted)] font-semibold">Tool</th>
                                        <th className="text-left px-5 py-3 text-[var(--text-muted)] font-semibold">Einstiegspreis</th>
                                        <th className="text-left px-5 py-3 text-[var(--text-muted)] font-semibold">ChatGPT dabei?</th>
                                        <th className="text-left px-5 py-3 text-[var(--accent)] font-semibold">Google-Rankings inklusive?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MARKET_ROWS.map(([tool, price, chatgpt, seo], i) => (
                                        <tr key={i} className="border-b border-[var(--border-subtle)] last:border-0">
                                            <td className="px-5 py-3 text-[var(--text-white)] font-medium whitespace-nowrap">{tool}</td>
                                            <td className="px-5 py-3 text-[var(--text-body)] whitespace-nowrap">{price}</td>
                                            <td className="px-5 py-3 text-[var(--text-body)]">{chatgpt}</td>
                                            <td className="px-5 py-3 text-[var(--text-body)]">{seo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-[var(--text-faint)] mt-3">
                            Preise Stand September 2026, laut öffentlich einsehbaren Preisseiten der jeweiligen Anbieter. Prüfe die aktuellen Konditionen jeweils direkt beim Anbieter.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">So funktioniert ChatGPT-Sichtbarkeits-Tracking</h2>
                        <p>Vier Schritte, automatisiert statt manuell:</p>
                        <div className="space-y-3 mt-5">
                            {TRACKING_STEPS.map((s) => (
                                <div key={s.num} className="flex gap-4 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                    <span className="text-[var(--accent)] font-mono font-bold text-sm shrink-0">{s.num}</span>
                                    <div>
                                        <h3 className="font-semibold text-[var(--text-white)] mb-1 text-sm">{s.title}</h3>
                                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{s.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Was Scanora konkret liefert</h2>
                        <p>
                            Im GEO-Pro-Plan (29,99 €/Monat) prüft Scanora wöchentlich automatisch, ob ChatGPT, Claude, Gemini, Perplexity und Google AI Overview deine Website erwähnen - inklusive Mention-Verlauf über Zeit und zwei Prompt-Varianten pro Keyword.
                        </p>
                        <p className="mt-4">
                            Anders als reine GEO-Dashboards bleibt es nicht bei der Zahl: Scanora prüft zusätzlich, ob llms.txt vorhanden ist, ob Schema Markup korrekt gesetzt ist und ob GPTBot überhaupt crawlen darf - und zeigt priorisiert, was zu tun ist, um öfter zitiert zu werden. Und weil dasselbe Konto auch klassisches SEO-Rank-Tracking bei Google übernimmt, siehst du direkt die Überschneidung: rankst du bei Google, aber bist bei ChatGPT unsichtbar - oder umgekehrt?
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[var(--text-white)] mb-4">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {faqLd.mainEntity.map((faq, i) => (
                                <div key={i} className="bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                    <h3 className="font-semibold text-[var(--text-white)] mb-2 text-sm">{faq.name}</h3>
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{faq.acceptedAnswer.text}</p>
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
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-2">
                                Prüfe kostenlos, ob ChatGPT dich schon erwähnt
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md">
                                Gib deine URL ein und erhalte in rund 60 Sekunden deinen ersten GEO-Score - ohne Anmeldung, ohne Kreditkarte.
                            </p>
                        </div>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[var(--accent-border)] active:scale-[0.97] active:duration-75 shrink-0"
                        >
                            Jetzt kostenlos prüfen
                        </Link>
                    </div>
                </div>

                {/* Cross-link: Claude */}
                <div className="mt-5 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Verwandt</span>
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-2">
                                Sichtbarkeit in Claude tracken
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md">
                                Claude ist bei den meisten Tools ein teures Enterprise-Add-on - bei Scanora schon ab 4,99 €/Monat im Einsteiger-Plan enthalten.
                            </p>
                        </div>
                        <Link
                            href="/loesungen/claude-ai-sichtbarkeit-tracken"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--surface-08)] hover:bg-[var(--surface-10)] text-[var(--text-white)] text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Seite ansehen
                        </Link>
                    </div>
                </div>

                {/* Cross-link: GEO Pricing */}
                <div className="mt-5 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Preise</span>
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-white)] mb-2">
                                GEO Automatisierung: alle Pläne im Detail
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md">
                                ChatGPT, Claude, Perplexity und Google AI Overview - Websites, Keywords und Checks pro Plan im Vergleich.
                            </p>
                        </div>
                        <Link
                            href="/geo/pricing"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--surface-08)] hover:bg-[var(--surface-10)] text-[var(--text-white)] text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Preise ansehen
                        </Link>
                    </div>
                </div>

                {/* Back */}
                <div className="mt-10 pt-8 border-t border-[var(--border-subtle)]">
                    <Link href="/" className="text-sm text-[var(--text-faint)] hover:text-[var(--text-body)] transition-colors">
                        ← Zurück zur Startseite
                    </Link>
                </div>

            </article>

            <Footer />
        </main>
    )
}
