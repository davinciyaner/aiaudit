import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Claude AI Sichtbarkeit tracken 2026: So siehst du, ob Claude dich empfiehlt',
    description: 'Claude AI Sichtbarkeit tracken ab 4,99 €/Monat - während Claude-Tracking bei den meisten AI-Visibility-Tools nur als teures Enterprise-Add-on verfügbar ist. So funktioniert es und was du dafür bezahlst.',
    keywords: 'claude ai sichtbarkeit, claude sichtbarkeit tracken, claude visibility tracking, claude ai tracking tool, claude ki sichtbarkeit, generative engine optimization claude',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/loesungen/claude-ai-sichtbarkeit-tracken',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/loesungen/claude-ai-sichtbarkeit-tracken',
            'en-US': 'https://www.sitecheckai.dev/en/solutions/claude-ai-visibility-tracking',
        },
    },
    openGraph: {
        title: 'Claude AI Sichtbarkeit tracken 2026: So siehst du, ob Claude dich empfiehlt',
        description: 'Claude-Tracking ist bei den meisten AI-Visibility-Tools ein teures Enterprise-Add-on oder gar nicht verfügbar. AuditAI trackt es ab 4,99 €/Monat inklusive.',
        url: 'https://www.sitecheckai.dev/loesungen/claude-ai-sichtbarkeit-tracken',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Claude AI Sichtbarkeit tracken 2026: So siehst du, ob Claude dich empfiehlt',
    description: 'Claude-Tracking ist bei den meisten AI-Visibility-Tools ein teures Enterprise-Add-on oder gar nicht verfügbar. AuditAI trackt es ab 4,99 €/Monat inklusive.',
    image: 'https://www.sitecheckai.dev/loesungen/claude-ai-sichtbarkeit-tracken/opengraph-image',
    datePublished: '2026-08-29T09:00:00+02:00',
    dateModified: '2026-08-29T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/loesungen/claude-ai-sichtbarkeit-tracken',
    mainEntityOfPage: 'https://www.sitecheckai.dev/loesungen/claude-ai-sichtbarkeit-tracken',
    about: [
        { '@type': 'Thing', name: 'AI Visibility Tracking' },
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
        { '@type': 'Thing', name: 'Claude (Anthropic)' },
    ],
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev' },
        { '@type': 'ListItem', position: 2, name: 'Lösungen', item: 'https://www.sitecheckai.dev/loesungen' },
        { '@type': 'ListItem', position: 3, name: 'Claude AI Sichtbarkeit tracken', item: 'https://www.sitecheckai.dev/loesungen/claude-ai-sichtbarkeit-tracken' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was bedeutet "Claude AI Sichtbarkeit tracken"?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Es bedeutet, regelmäßig zu prüfen, ob und wie Anthropics Claude deine Website oder Marke erwähnt, wenn Nutzer zu relevanten Themen aus deiner Branche fragen. Anders als bei einer einmaligen Stichprobe zeigt automatisiertes Tracking den Verlauf über Zeit - inklusive Sentiment und welche Konkurrenten Claude stattdessen zitiert.',
            },
        },
        {
            '@type': 'Question',
            name: 'Warum ist Claude-Tracking bei vielen Tools so teuer oder gar nicht verfügbar?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Bei mehreren bekannten AI-Visibility-Tools ist Claude entweder nur im individuell bepreisten Enterprise-Tarif enthalten oder ein separates Add-on, das erst ab höheren Preisstufen buchbar ist. Das liegt vermutlich an den API-Kosten und daran, dass viele Tools ursprünglich primär auf ChatGPT und Google AI Overview ausgerichtet waren. AuditAI hat Claude von Anfang an in den günstigsten Plan integriert.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie oft wird meine Sichtbarkeit bei Claude geprüft?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Automatisch einmal pro Woche, zusätzlich sind je nach Plan 2 bis 20 manuelle Checks pro Monat möglich. Jeder Check läuft über zwei Prompt-Varianten (empfehlungsorientiert und vergleichend), damit sichtbar wird, bei welcher Art von Anfrage du erwähnt wirst.',
            },
        },
        {
            '@type': 'Question',
            name: 'Kann ich Claude-Tracking mit anderen KI-Plattformen kombinieren?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja. Der Einsteiger-Plan (4,99 €/Monat) deckt Claude allein ab, der Pro-Plan (9,99 €/Monat) ergänzt ChatGPT, Perplexity und Google AI Overview im selben Dashboard - ohne separate Buchung pro Plattform.',
            },
        },
        {
            '@type': 'Question',
            name: 'Kann ich Claude-Sichtbarkeit kostenlos testen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja, ohne Anmeldung und ohne Kreditkarte. Ein einmaliger Audit inklusive GEO-Sichtbarkeit ist über den dauerhaft kostenlosen Plan möglich. Die laufende, wöchentliche Automatisierung ab 4,99 €/Monat hat zusätzlich 14 Tage kostenlose Testphase.',
            },
        },
    ],
}

const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Claude AI Sichtbarkeit tracken',
    description: 'So richtest du automatisiertes Tracking ein, ob Claude deine Website bei relevanten Anfragen erwähnt.',
    step: [
        { '@type': 'HowToStep', position: 1, name: 'Keywords festlegen', text: 'Themen und Suchanfragen definieren, zu denen Claude deine Marke erwähnen könnte.' },
        { '@type': 'HowToStep', position: 2, name: 'Prompt-Varianten prüfen', text: 'Jedes Keyword sowohl empfehlungsorientiert als auch vergleichend abfragen, da Claude je nach Formulierung unterschiedlich antwortet.' },
        { '@type': 'HowToStep', position: 3, name: 'Automatisch wöchentlich checken', text: 'Die Abfragen wöchentlich automatisiert wiederholen statt einmalig zu prüfen, um Veränderungen über Zeit zu erkennen.' },
        { '@type': 'HowToStep', position: 4, name: 'Auswerten und reagieren', text: 'Erwähnung, Sentiment und zitierte Konkurrenten auswerten und daraus konkrete Fixes ableiten (llms.txt, Schema Markup, Crawler-Freigaben).' },
    ],
}

const MARKET_ROWS = [
    ['AuditAI', '4,99 €/Monat', 'Ja, von Anfang an im Einsteiger-Plan enthalten'],
    ['Peec.ai', '85 €/Monat', 'Nein, nur im individuell bepreisten Enterprise-Tarif'],
    ['LLM Pulse', '49 €/Monat', 'Nein, nur als kostenpflichtiges Add-on auf dem Enterprise-Plan'],
    ['Rankscale', '20 $/Monat', 'Ja, aber über ein Credit-System statt Fixpreis abgerechnet'],
]

const TRACKING_STEPS = [
    { num: 1, title: 'Keywords festlegen', text: 'Themen und Suchanfragen definieren, zu denen Claude deine Marke erwähnen könnte - z. B. "bestes Tool für X" oder "X vs Y".' },
    { num: 2, title: 'Zwei Prompt-Varianten prüfen', text: 'Jedes Keyword empfehlungsorientiert ("Welches Tool kennst du für X?") und vergleichend ("Was ist das beste Tool für X?") abfragen - Claude antwortet je nach Formulierung unterschiedlich.' },
    { num: 3, title: 'Wöchentlich automatisch wiederholen', text: 'Eine Einzelmessung zeigt nur eine Momentaufnahme. Wöchentliches Tracking zeigt, ob sich deine Sichtbarkeit verbessert, verschlechtert oder stabil bleibt.' },
    { num: 4, title: 'Auswerten und Fixes ableiten', text: 'Erwähnung, Sentiment und welche Konkurrenten stattdessen zitiert werden auswerten - und daraus konkrete technische Fixes ableiten (llms.txt, Schema Markup, Crawler-Freigaben für ClaudeBot).' },
]

export default function ClaudeAiSichtbarkeitPage() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen">
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
                    <Link href="/loesungen" className="hover:text-slate-400 transition-colors">Lösungen</Link>
                    <span>/</span>
                    <span className="text-slate-500">Claude AI Sichtbarkeit tracken</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[var(--accent-soft)] text-[var(--accent)]">
                            Lösung
                        </span>
                        <span className="text-xs text-slate-600">29. August 2026</span>
                        <span className="text-xs text-slate-600">· 7 min Lesezeit</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        Claude AI Sichtbarkeit tracken 2026: So siehst du, ob Claude dich empfiehlt
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Claude hat sich als eigenständige Antwort-Quelle etabliert - auch weil Claude Code für viele Entwickler und Teams der erste Anlaufpunkt ist, um neue Tools zu bewerten. Wer nur ChatGPT trackt, sieht bestenfalls die halbe Wahrheit. Das Problem: Bei den meisten AI-Visibility-Tools ist Claude-Tracking entweder ein teures Enterprise-Add-on oder gar nicht buchbar.
                    </p>
                    <p className="mt-4 text-slate-300 leading-relaxed">
                        AuditAI trackt Claude-Sichtbarkeit ab <strong className="text-white">4,99 €/Monat</strong> - inklusive, ohne Enterprise-Gespräch, ohne Add-on-Aufpreis. Hier die Marktlage im Überblick, wie das Tracking technisch funktioniert und was du konkret damit machst.
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
                        <h2 className="text-2xl font-bold text-white mb-4">Claude-Tracking ist am Markt oft teurer als die Basis-Plattformen</h2>
                        <p>
                            Ein Muster zieht sich durch mehrere bekannte AI-Visibility-Tools: ChatGPT, Perplexity und Google AI Overview sind meist im Grundpreis enthalten - Claude dagegen ist entweder ein separates, teures Add-on oder ausschließlich im individuell bepreisten Enterprise-Tarif verfügbar. Wer speziell wissen will, wie er bei Claude abschneidet, zahlt in der Praxis oft deutlich mehr als für die restlichen Plattformen zusammen.
                        </p>
                        <div className="overflow-x-auto rounded-2xl border border-[var(--border-subtle)] mt-5">
                            <table className="w-full text-sm min-w-[560px]">
                                <thead>
                                    <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-06)]">
                                        <th className="text-left px-5 py-3 text-slate-400 font-semibold">Tool</th>
                                        <th className="text-left px-5 py-3 text-slate-400 font-semibold">Einstiegspreis</th>
                                        <th className="text-left px-5 py-3 text-[var(--accent)] font-semibold">Claude im Einstiegspreis enthalten?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MARKET_ROWS.map(([tool, price, claude], i) => (
                                        <tr key={i} className="border-b border-[var(--border-subtle)] last:border-0">
                                            <td className="px-5 py-3 text-white font-medium whitespace-nowrap">{tool}</td>
                                            <td className="px-5 py-3 text-slate-300 whitespace-nowrap">{price}</td>
                                            <td className="px-5 py-3 text-slate-300">{claude}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-600 mt-3">
                            Preise Stand August 2026, laut öffentlich einsehbaren Preisseiten der jeweiligen Anbieter. Prüfe die aktuellen Konditionen jeweils direkt beim Anbieter.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">So funktioniert Claude-Sichtbarkeits-Tracking</h2>
                        <p>Vier Schritte, automatisiert statt manuell:</p>
                        <div className="space-y-3 mt-5">
                            {TRACKING_STEPS.map((s) => (
                                <div key={s.num} className="flex gap-4 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-5">
                                    <span className="text-[var(--accent)] font-mono font-bold text-sm shrink-0">{s.num}</span>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1 text-sm">{s.title}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed">{s.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Was AuditAI konkret liefert</h2>
                        <p>
                            Ab dem Einsteiger-Plan (4,99 €/Monat, 1 Website, 10 Keywords) prüft AuditAI wöchentlich automatisch, ob Claude deine Website erwähnt - inklusive Mention-Verlauf über Zeit. Der Pro-Plan (9,99 €/Monat) ergänzt ChatGPT, Perplexity und Google AI Overview im selben Dashboard, plus zwei Prompt-Varianten pro Keyword statt einer.
                        </p>
                        <p className="mt-4">
                            Anders als reine Analytics-Dashboards bleibt es nicht bei der Zahl: AuditAI prüft zusätzlich, ob llms.txt vorhanden ist, ob Schema Markup korrekt gesetzt ist und ob ClaudeBot überhaupt crawlen darf - und zeigt dir priorisiert, was zu tun ist, um öfter zitiert zu werden.
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
                                Prüfe kostenlos, ob Claude dich schon erwähnt
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Gib deine URL ein und erhalte in rund 60 Sekunden deinen ersten GEO-Score - ohne Anmeldung, ohne Kreditkarte.
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

                {/* Cross-link: GEO Pricing */}
                <div className="mt-5 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Preise</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                GEO Automatisierung: alle Pläne im Detail
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Claude, ChatGPT, Perplexity und Google AI Overview - Websites, Keywords und Checks pro Plan im Vergleich.
                            </p>
                        </div>
                        <Link
                            href="/geo/pricing"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--surface-08)] hover:bg-[var(--surface-10)] text-white text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Preise ansehen
                        </Link>
                    </div>
                </div>

                {/* Cross-link: Rankscale */}
                <div className="mt-5 bg-[var(--surface-06)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1 block">Vergleich</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                Rankscale-Alternative: der ausführliche Vergleich
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Rankscale trackt Claude zwar inklusive, aber über ein Credit-System statt Fixpreis - der Unterschied im Detail.
                            </p>
                        </div>
                        <Link
                            href="/vergleich/rankscale-alternative"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--surface-08)] hover:bg-[var(--surface-10)] text-white text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Vergleich lesen
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
