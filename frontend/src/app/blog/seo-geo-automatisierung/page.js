import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'SEO Automatisierung & GEO Automatisierung: Rankings und KI-Sichtbarkeit automatisch tracken',
    description: 'SEO Automatisierung und GEO Automatisierung erklärt: Wie du Google-Rankings und KI-Sichtbarkeit bei ChatGPT & Claude wöchentlich automatisch trackst - statt manuell zu prüfen. Mit Preisen und Vergleich.',
    keywords: 'seo automatisierung, geo automatisierung, ki sichtbarkeit, seo automatisierung tool, geo automatisierung tool, ranking tracking automatisch, google rankings automatisch tracken, chatgpt sichtbarkeit tracken, ki sichtbarkeit prüfen, automatisiertes seo tracking, keyword tracking automatisch, seo monitoring tool',
    alternates: { canonical: 'https://www.sitecheckai.dev/blog/seo-geo-automatisierung' },
    openGraph: {
        title: 'SEO Automatisierung & GEO Automatisierung: Rankings und KI-Sichtbarkeit automatisch tracken',
        description: 'Wie du Google-Rankings und KI-Sichtbarkeit bei ChatGPT & Claude wöchentlich automatisch trackst - statt manuell zu prüfen.',
        url: 'https://www.sitecheckai.dev/blog/seo-geo-automatisierung',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SEO Automatisierung & GEO Automatisierung: Rankings und KI-Sichtbarkeit automatisch tracken',
    description: 'SEO Automatisierung und GEO Automatisierung erklärt: Wie du Google-Rankings und KI-Sichtbarkeit bei ChatGPT & Claude wöchentlich automatisch trackst.',
    image: 'https://www.sitecheckai.dev/blog/seo-geo-automatisierung/opengraph-image',
    datePublished: '2026-07-05T09:00:00+02:00',
    dateModified: '2026-07-05T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/blog/seo-geo-automatisierung',
    mainEntityOfPage: 'https://www.sitecheckai.dev/blog/seo-geo-automatisierung',
    about: [
        { '@type': 'Thing', name: 'SEO Automatisierung' },
        { '@type': 'Thing', name: 'GEO Automatisierung' },
        { '@type': 'Thing', name: 'KI-Sichtbarkeit' },
    ],
    mentions: [
        { '@type': 'Thing', name: 'ChatGPT', url: 'https://chat.openai.com' },
        { '@type': 'Thing', name: 'Claude', url: 'https://claude.ai' },
        { '@type': 'Organization', name: 'Google Search Console' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was ist SEO Automatisierung?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'SEO Automatisierung bedeutet, dass Google-Rankings, Keyword-Ideen, Konkurrenzanalysen und Backlinks nicht mehr manuell geprüft werden, sondern wöchentlich automatisch aktualisiert werden. Statt selbst in der Google Search Console nachzusehen, bekommst du Rankings, Gewinner und Verlierer sowie neue Keyword-Chancen automatisch aufbereitet.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist GEO Automatisierung?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'GEO Automatisierung (Generative Engine Optimization) prüft wöchentlich automatisch, ob KI-Modelle wie ChatGPT und Claude deine Website oder Marke in ihren Antworten erwähnen. Statt manuell Dutzende Prompts in verschiedenen KI-Tools zu testen, trackt die Automatisierung deine KI-Sichtbarkeit kontinuierlich und zeigt den Verlauf über Zeit.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist KI-Sichtbarkeit?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'KI-Sichtbarkeit beschreibt, wie oft und wie prominent eine Website oder Marke in den Antworten von KI-Modellen wie ChatGPT, Claude oder Perplexity erwähnt wird. Sie ist das GEO-Äquivalent zu Google-Rankings im klassischen SEO - nur dass die "Suchergebnisseite" eine generierte Antwort statt einer Liste von Links ist.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was kostet SEO- und GEO Automatisierung?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'SEO Automatisierung startet bei 19 Euro pro Monat (3 Websites, 50 Keywords, wöchentliches Ranking-Update). GEO Automatisierung startet bei 4,99 Euro pro Monat (1 Website, 10 Keywords, Claude-Tracking). Beide bieten 14 Tage kostenlose Testphase, danach automatische Verlängerung, jederzeit kündbar.',
            },
        },
    ],
}

const SEO_FEATURES = [
    { title: 'Wöchentliches Ranking-Update', desc: 'Google-Positionen für alle getrackten Keywords werden jede Woche automatisch aktualisiert - inklusive Gewinner und Verlierer.' },
    { title: 'Keyword-Ideen & Suchvolumen', desc: 'Neue Keyword-Chancen mit Suchvolumen, Wettbewerbsstärke und CPC, automatisch vorgeschlagen.' },
    { title: 'Konkurrenzanalyse', desc: 'Sieh welche Domains für deine Keywords ranken und wo die Konkurrenz stärker ist.' },
    { title: 'Backlink-Übersicht', desc: 'Referring Domains, Dofollow/Nofollow-Verhältnis und Spam Score im Blick behalten.' },
]

const GEO_FEATURES = [
    { title: 'Wöchentlicher KI-Check', desc: 'Automatischer Check, ob ChatGPT und Claude deine Domain bei relevanten Prompts erwähnen.' },
    { title: 'Claude + ChatGPT Tracking', desc: 'Ab dem Pro-Plan werden beide Modelle parallel getrackt, im Einsteiger-Plan Claude allein.' },
    { title: 'Mention-Verlauf', desc: 'Verlauf über Zeit statt Einzelmessung - so erkennst du ob deine GEO-Signale wirken.' },
    { title: 'Mehrere Websites & Keywords', desc: 'Von 1 Website / 10 Keywords im Einsteiger-Plan bis 10 Websites / 100 Keywords im Expert-Plan.' },
]

export default function SeoGeoAutomatisierungPage() {
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
                    <span className="text-slate-500">SEO & GEO Automatisierung</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-emerald-500/15 text-emerald-400">
                            SEO
                        </span>
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-violet-500/15 text-violet-400">
                            GEO
                        </span>
                        <span className="text-xs text-slate-600">5. Juli 2026</span>
                        <span className="text-xs text-slate-600">· 10 min Lesezeit</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        SEO Automatisierung & GEO Automatisierung: Rankings und KI-Sichtbarkeit automatisch tracken
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Ein einmaliger Audit zeigt dir den Zustand heute. Aber Google-Rankings und KI-Sichtbarkeit ändern sich jede Woche - mit oder ohne dein Zutun. SEO Automatisierung und GEO Automatisierung übernehmen das laufende Tracking, damit du Verschlechterungen siehst bevor sie Umsatz kosten.
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
                        <h2 className="text-2xl font-bold text-white mb-4">Warum manuelles Prüfen 2026 nicht mehr reicht</h2>
                        <p>
                            Ein Website-Audit ist eine Momentaufnahme. Er zeigt dir Fehler und Chancen genau in dem Moment, in dem du ihn ausführst. Das Problem: Google aktualisiert seinen Algorithmus laufend, Konkurrenten veröffentlichen neue Inhalte, und KI-Modelle wie <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">ChatGPT</a> und <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Claude</a> ändern ständig, welche Quellen sie zitieren. Ein Zustand der heute gut aussieht, kann in vier Wochen unbemerkt schlechter geworden sein.
                        </p>
                        <p className="mt-4">
                            Manuell in der <a href="https://search.google.com/search-console/about" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">Google Search Console</a> nachzusehen oder Dutzende Prompts in ChatGPT und Claude durchzutesten, kostet Zeit und wird in der Praxis selten regelmäßig gemacht. Genau hier setzen <strong className="text-white">SEO Automatisierung</strong> und <strong className="text-white">GEO Automatisierung</strong> an: laufendes Tracking statt einmaliger Prüfung.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">SEO Automatisierung: Google-Rankings die sich von selbst aktualisieren</h2>
                        <p>
                            SEO Automatisierung trackt deine Google-Positionen für ausgewählte Keywords wöchentlich - automatisch, ohne dass du selbst nachsehen musst. Statt eines einmaligen SEO-Scores bekommst du einen Verlauf: welche Keywords steigen, welche fallen, und wo neue Chancen entstehen.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4 mt-6">
                            {SEO_FEATURES.map(f => (
                                <div key={f.title} className="bg-emerald-500/[0.04] border border-emerald-500/15 rounded-2xl p-5">
                                    <h3 className="font-semibold text-white mb-1.5 text-sm">{f.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">GEO Automatisierung: KI-Sichtbarkeit bei ChatGPT und Claude tracken</h2>
                        <p>
                            GEO Automatisierung überträgt dasselbe Prinzip auf KI-Sichtbarkeit - also darauf, wie oft KI-Modelle eine Website als Quelle zitieren (der Fachbegriff <a href="https://arxiv.org/abs/2311.09735" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Generative Engine Optimization</a> stammt aus einer 2023er Forschungsarbeit von Princeton, Georgia Tech und dem Allen Institute for AI). Statt einmalig zu prüfen ob ChatGPT oder Claude deine Website kennen, wird das wöchentlich automatisch erneut getestet - mit denselben Prompts, damit die Ergebnisse über Zeit vergleichbar bleiben.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4 mt-6">
                            {GEO_FEATURES.map(f => (
                                <div key={f.title} className="bg-violet-500/[0.04] border border-violet-500/15 rounded-2xl p-5">
                                    <h3 className="font-semibold text-white mb-1.5 text-sm">{f.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">SEO Automatisierung vs. GEO Automatisierung im Vergleich</h2>
                        <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <th className="text-left px-5 py-3 text-slate-400 font-semibold">Aspekt</th>
                                        <th className="text-left px-5 py-3 text-emerald-400 font-semibold">SEO Automatisierung</th>
                                        <th className="text-left px-5 py-3 text-violet-400 font-semibold">GEO Automatisierung</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['Was wird getrackt', 'Google-Ranking-Positionen', 'Erwähnungen bei ChatGPT & Claude'],
                                        ['Frequenz', 'Wöchentlich automatisch', 'Wöchentlich automatisch'],
                                        ['Zusatz-Daten', 'Keyword-Ideen, Konkurrenz, Backlinks', 'Mention-Verlauf pro Modell'],
                                        ['Einstiegspreis', 'ab 19 €/Monat', 'ab 4,99 €/Monat'],
                                        ['Testphase', '14 Tage kostenlos', '14 Tage kostenlos'],
                                    ].map(([aspect, seo, geo], i) => (
                                        <tr key={i} className="border-b border-white/[0.04] last:border-0">
                                            <td className="px-5 py-3 text-white font-medium">{aspect}</td>
                                            <td className="px-5 py-3 text-slate-300">{seo}</td>
                                            <td className="px-5 py-3 text-slate-300">{geo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Brauchst du beides?</h2>
                        <p>
                            SEO Automatisierung und GEO Automatisierung beantworten unterschiedliche Fragen. SEO Automatisierung zeigt, ob du bei Google gefunden wirst. GEO Automatisierung zeigt, ob du empfohlen wirst, wenn jemand ChatGPT oder Claude statt Google fragt. Beide Kanäle wachsen unabhängig voneinander - ein gutes Google-Ranking sagt nichts darüber aus, ob eine KI deine Website kennt, und umgekehrt.
                        </p>
                        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 mt-5">
                            <p className="text-sm text-slate-300">
                                Für die meisten Websites ist der pragmatische Einstieg: mit SEO Automatisierung starten, weil Google weiterhin den größten Traffic-Anteil liefert - und GEO Automatisierung ergänzen, sobald die eigene Zielgruppe zunehmend KI-Tools statt klassischer Suche nutzt.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Häufige Fragen zu SEO- und GEO Automatisierung</h2>
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

                {/* Cross-link to sibling post */}
                <div className="mb-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 block">Weiterlesen</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                Manuell vs. automatisiert: Lohnt sich der Umstieg?
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Zeitaufwand, Kosten und warum KI-Sichtbarkeit manuell kaum zuverlässig messbar ist - der ehrliche Vergleich.
                            </p>
                        </div>
                        <Link
                            href="/blog/seo-tracking-manuell-vs-automatisiert"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] hover:bg-white/10 text-white text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Vergleich lesen
                        </Link>
                    </div>
                </div>

                {/* CTA: SEO Automatisierung */}
                <div className="mt-14 bg-emerald-500/[0.04] border border-emerald-500/20 rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 block">SEO Automatisierung</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                Google-Rankings wöchentlich automatisch tracken
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Ab 19 €/Monat, 3 Websites, 50 Keywords, 14 Tage kostenlos testen.
                            </p>
                        </div>
                        <Link
                            href="/seo/pricing"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20 shrink-0"
                        >
                            Jetzt SEO automatisieren
                        </Link>
                    </div>
                </div>

                {/* CTA: GEO Automatisierung */}
                <div className="mt-5 bg-violet-500/[0.04] border border-violet-500/20 rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1 block">GEO Automatisierung</span>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                KI-Sichtbarkeit bei ChatGPT & Claude tracken
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                Ab 4,99 €/Monat, wöchentlicher Auto-Check, 14 Tage kostenlos testen.
                            </p>
                        </div>
                        <Link
                            href="/geo/pricing"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20 shrink-0"
                        >
                            Jetzt GEO automatisieren
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