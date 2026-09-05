import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'SEO + GEO Tool: Google-Rankings & KI-Sichtbarkeit',
    description: 'Google-Rankings und KI-Sichtbarkeit bei ChatGPT, Claude, Gemini & Perplexity in einem Dashboard - inklusive der Überschneidung zwischen beiden.',
    keywords: 'seo geo tool, seo geo, geoseo, seo und geo, generative engine optimization, generative optimization engine, geo tool, ki sichtbarkeit, ai visibility, geo automatisierung, seo automatisierung',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/loesungen/seo-geo-tool',
    },
    openGraph: {
        title: 'SEO + GEO Tool: Google-Rankings & KI-Sichtbarkeit',
        description: 'Google-Rankings und KI-Sichtbarkeit bei ChatGPT, Claude, Gemini & Perplexity in einem Dashboard - inklusive der Überschneidung zwischen beiden.',
        url: 'https://www.sitecheckai.dev/loesungen/seo-geo-tool',
        siteName: 'AuditAI',
        type: 'website',
        locale: 'de_DE',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SEO + GEO Tool: Google-Rankings & KI-Sichtbarkeit',
        description: 'Google-Rankings und KI-Sichtbarkeit bei ChatGPT, Claude, Gemini & Perplexity in einem Dashboard.',
    },
}

const softwareLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://www.sitecheckai.dev/#software',
    name: 'AuditAI',
    alternateName: 'SiteCheckAI',
    url: 'https://www.sitecheckai.dev',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'SEO & Generative Engine Optimization',
    operatingSystem: 'Web',
    description: 'SEO + GEO Tool: trackt Google-Rankings und KI-Sichtbarkeit bei ChatGPT, Claude, Gemini, Perplexity und Google AI Overview in einem Dashboard.',
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev' },
        { '@type': 'ListItem', position: 2, name: 'Lösungen', item: 'https://www.sitecheckai.dev/loesungen' },
        { '@type': 'ListItem', position: 3, name: 'SEO + GEO Tool', item: 'https://www.sitecheckai.dev/loesungen/seo-geo-tool' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was ist der Unterschied zwischen SEO und GEO?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'SEO (Search Engine Optimization) optimiert eine Website für klassische Google-Suchergebnisse. GEO (Generative Engine Optimization) optimiert dafür, von KI-Modellen wie ChatGPT, Claude oder Perplexity in ihren Antworten zitiert und empfohlen zu werden. Beide verfolgen dasselbe Ziel - gefunden zu werden -, nur auf unterschiedlichen Kanälen.',
            },
        },
        {
            '@type': 'Question',
            name: 'Ersetzt GEO das klassische SEO?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nein. Google-Suche bleibt für die meisten Websites weiterhin der größte Traffic-Kanal. GEO kommt zusätzlich dazu, weil ein wachsender Teil der Nutzer direkt KI-Modelle statt Google befragt. Wer nur SEO betreibt, wird für diesen Teil der Suche unsichtbar.',
            },
        },
        {
            '@type': 'Question',
            name: 'Welche KI-Plattformen werden bei AuditAI getrackt?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'ChatGPT, Claude, Gemini, Perplexity und Google AI Overview - wöchentlich automatisch, plus beliebige eigene Fragen jederzeit manuell prüfbar.',
            },
        },
        {
            '@type': 'Question',
            name: 'Brauche ich zwei separate Tools für SEO und GEO?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nein. AuditAI bietet beides in einem Konto: ein SEO-Dashboard mit Google-Rankings und ein GEO-Dashboard mit KI-Sichtbarkeit - plus eine Überschneidungs-Ansicht, die zeigt, wo du bei Google rankst, aber von KI-Modellen nicht erwähnt wirst, oder umgekehrt.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was kostet das SEO + GEO Tool?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'SEO-Automatisierung und GEO-Automatisierung sind einzeln oder kombiniert buchbar, ab wenigen Euro im Monat. Ein kostenloser Einzel-Check von SEO und KI-Sichtbarkeit ist ohne Registrierung möglich.',
            },
        },
    ],
}

const DASHBOARD_SEO = [
    { label: 'seo geo tool', value: 'Platz 8', up: true },
    { label: 'ki sichtbarkeit', value: 'Platz 15', up: true },
    { label: 'seo automatisierung', value: 'Platz 47', up: false },
    { label: 'geo tool', value: 'Platz 6', up: true },
]

const DASHBOARD_GEO = [
    { label: 'ChatGPT', ok: true },
    { label: 'Claude', ok: true },
    { label: 'Perplexity', ok: false },
    { label: 'Google AI Overview', ok: true },
]

const CORRELATION_ROWS = [
    { keyword: 'seo geo tool', position: 'Platz 8', mentioned: true, status: 'good', label: 'Beides ✓' },
    { keyword: 'seo automatisierung', position: 'Platz 47', mentioned: false, status: 'bad', label: 'Beides fehlt' },
    { keyword: 'ki sichtbarkeit', position: 'Platz 15', mentioned: false, status: 'warn', label: 'Nur Google' },
    { keyword: 'llm txt', position: 'Platz 92', mentioned: true, status: 'warn', label: 'Nur KI' },
]

const STATUS_STYLES = {
    good: 'bg-emerald-500/10 text-emerald-400',
    bad: 'bg-red-500/10 text-red-400',
    warn: 'bg-amber-500/10 text-amber-400',
}

const FEATURES = [
    { icon: '📈', title: 'SEO-Rank-Tracking', desc: 'Google-Positionen pro Keyword, mit Verlauf über Zeit.' },
    { icon: '🤖', title: 'GEO-Automatisierung', desc: 'Wöchentlich geprüft: ChatGPT, Claude, Gemini, Perplexity, Google AI Overview.' },
    { icon: '🔗', title: 'SEO ↔ GEO Überschneidung', desc: 'Rankst du bei Google, aber unsichtbar bei KI? Oder umgekehrt?' },
    { icon: '🎯', title: 'Eigene Prompts', desc: 'Tracke die exakte Frage, die ein echter Kunde stellen würde - wortwörtlich.' },
    { icon: '📄', title: 'llms.txt Generator', desc: 'Automatisch erstellt, basierend auf deinem echten Seiteninhalt.' },
    { icon: '🏆', title: 'Wettbewerber-Analyse', desc: 'Welche Domains KI-Modelle stattdessen zitieren - und warum.' },
]

export default function SeoGeoToolPage() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <Navbar />

            <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-28 flex items-center gap-2 text-xs text-slate-600">
                <Link href="/" className="hover:text-slate-400 transition-colors">AuditAI</Link>
                <span>/</span>
                <Link href="/loesungen" className="hover:text-slate-400 transition-colors">Lösungen</Link>
                <span>/</span>
                <span className="text-slate-500">SEO + GEO Tool</span>
            </div>

            {/* HERO */}
            <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-8 sm:pt-10 pb-16 text-center">
                <h1 className="text-3xl sm:text-5xl font-bold text-white leading-[1.15] tracking-tight mb-6">
                    AuditAI ist ein <span className="text-[var(--accent)]">SEO + GEO Tool</span>,<br className="hidden sm:block" />
                    das deine Google-Rankings und deine KI-Sichtbarkeit in einem Dashboard zeigt.
                </h1>
                <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
                    AuditAI ist ein Tool für SEO-Automatisierung und GEO-Automatisierung: Es verfolgt automatisch, ob du bei Google rankst - und ob dich ChatGPT, Claude, Gemini und Perplexity ihren Nutzern empfehlen. Eine Plattform statt zwei separate Tools, ein gemeinsamer Blick auf beide Sichtbarkeits-Kanäle statt zweier getrennter Anmeldungen und Rechnungen.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
                    <Link href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all shadow-lg shadow-[var(--accent-border)]">
                        Kostenlos prüfen →
                    </Link>
                    <Link href="/blog/seo-geo-automatisierung"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--surface-08)] hover:bg-[var(--surface-10)] border border-[var(--border-subtle)] text-slate-300 hover:text-white text-sm font-semibold rounded-xl transition-all">
                        So funktioniert's im Detail
                    </Link>
                </div>
                <p className="text-xs text-slate-600">Keine Kreditkarte nötig · Ergebnis in 60 Sekunden</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12">
                    {[['5', 'Plattformen getrackt'], ['60s', 'bis zum ersten Ergebnis'], ['2', 'Dashboards, 1 Konto'], ['wöchentlich', 'automatisch geprüft']].map(([num, label]) => (
                        <div key={label} className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl py-5 px-3 text-center">
                            <div className="text-2xl font-extrabold text-[var(--accent)]">{num}</div>
                            <div className="text-[11px] text-slate-500 mt-1">{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* WARUM */}
            <section className="max-w-4xl mx-auto px-5 sm:px-8 py-16 border-t border-[var(--border-subtle)]">
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">Warum SEO allein nicht mehr reicht</h2>
                <p className="text-slate-400 text-center max-w-xl mx-auto mb-10 leading-relaxed">
                    Immer mehr Menschen googeln nicht mehr - sie fragen direkt ChatGPT, Perplexity oder Google AI Overview nach einer konkreten Empfehlung. Wer da nicht genannt wird, verliert Kunden, bevor er überhaupt eine klassische Suchergebnisseite erreicht.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-[var(--bg-surface)] border border-red-500/20 rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-2">Nur SEO-Tools</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Zeigen Google-Rankings - aber nichts darüber, ob dich KI-Modelle überhaupt kennen oder empfehlen. Der wachsende Teil der Suche bleibt unsichtbar.</p>
                    </div>
                    <div className="bg-[var(--bg-surface)] border border-red-500/20 rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-2">Nur GEO-Tools</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Zeigen KI-Zitierungen - aber ignorieren, dass klassisches Google-Ranking weiterhin die Mehrheit des Traffics bringt. Ein blinder Fleck in die andere Richtung.</p>
                    </div>
                </div>
                <div className="bg-[var(--accent-soft)] border border-[var(--accent-border)] rounded-2xl p-6">
                    <h3 className="font-bold text-white mb-2">AuditAI: beides zusammen</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">SEO-Rankings und KI-Sichtbarkeit für dieselben Keywords, im selben Dashboard - inklusive der Überschneidung: rankst du bei Google, aber die KI kennt dich nicht? Oder umgekehrt? Genau das siehst du hier zuerst.</p>
                </div>
            </section>

            {/* WAS IST GEO */}
            <section className="max-w-4xl mx-auto px-5 sm:px-8 py-16 border-t border-[var(--border-subtle)]">
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">Was ist Generative Engine Optimization (GEO)?</h2>
                <div className="bg-[var(--bg-surface)] border border-[var(--accent-border)] border-l-4 border-l-[var(--accent)] rounded-2xl p-6 sm:p-7 mb-5">
                    <p className="text-slate-200 leading-relaxed">
                        <strong className="text-white">Generative Engine Optimization (GEO)</strong> ist die Praxis, eine Website so zu gestalten, dass KI-Modelle wie ChatGPT, Claude, Gemini und Perplexity sie in ihren Antworten zitieren und empfehlen - genauso wie SEO eine Website für klassische Google-Rankings optimiert.
                    </p>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                    GEO ersetzt SEO nicht, sondern ergänzt es: Beide verfolgen dasselbe Ziel - gefunden zu werden -, nur für zwei unterschiedliche Arten der Suche. Konkrete Signale, die KI-Modelle bei der Quellenauswahl beachten: strukturierte Daten (Schema.org), eine llms.txt-Datei nach dem{' '}
                    <a href="https://llmstxt.org" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] underline underline-offset-2 hover:opacity-80">
                        offenen llms.txt-Standard
                    </a>, FAQ-Inhalte, klare Produktdefinitionen und ob KI-Crawler wie GPTBot oder ClaudeBot überhaupt zugelassen sind.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed mt-4">
                    Der Unterschied zu klassischem SEO liegt vor allem darin, wie die Bewertung passiert: Google-Rankings entstehen durch Crawling, Indexierung und hunderte Ranking-Signale über Zeit. KI-Modelle dagegen entscheiden pro einzelner Antwort neu, welche Quellen sie zitieren - und stützen sich dabei stark auf strukturierte, eindeutig maschinenlesbare Signale statt auf reine Textmenge. Genau deshalb reicht es nicht, bestehenden SEO-Content einfach unverändert zu lassen und zu hoffen, dass KI-Modelle ihn schon finden.
                </p>
            </section>

            {/* DASHBOARDS */}
            <section className="max-w-4xl mx-auto px-5 sm:px-8 py-16 border-t border-[var(--border-subtle)]">
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">Zwei Dashboards, ein durchgehendes Bild</h2>
                <p className="text-slate-400 text-center max-w-xl mx-auto mb-10 leading-relaxed">
                    Getrennt genug, um jedes für sich klar zu halten - aber durchgehend verbunden, damit du nie zwischen zwei losgelösten Tools hin- und herspringst.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
                            <span className="text-sm font-bold text-white">📈 SEO-Dashboard</span>
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">Ø Position 14</span>
                        </div>
                        <div className="p-5 space-y-2">
                            {DASHBOARD_SEO.map(row => (
                                <div key={row.label} className="flex items-center justify-between py-1.5 border-b border-[var(--border-subtle)] last:border-0 text-sm">
                                    <span className="flex items-center gap-2 text-slate-300">
                                        <span className={`w-1.5 h-1.5 rounded-full ${row.up ? 'bg-[var(--accent)]' : 'bg-slate-600'}`} />
                                        {row.label}
                                    </span>
                                    <span className="text-xs text-slate-500">{row.value}{row.up ? ' ↑' : ''}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
                            <span className="text-sm font-bold text-white">🤖 GEO-Dashboard</span>
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">3/5 Plattformen</span>
                        </div>
                        <div className="p-5 space-y-2">
                            {DASHBOARD_GEO.map(row => (
                                <div key={row.label} className="flex items-center justify-between py-1.5 border-b border-[var(--border-subtle)] last:border-0 text-sm">
                                    <span className="flex items-center gap-2 text-slate-300">
                                        <span className={`w-1.5 h-1.5 rounded-full ${row.ok ? 'bg-[var(--accent)]' : 'bg-slate-600'}`} />
                                        {row.label}
                                    </span>
                                    <span className="text-xs text-slate-500">{row.ok ? 'Erwähnt' : 'Nicht erwähnt'}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-[var(--border-subtle)]">
                        <span className="text-sm font-bold text-white">🔗 SEO ↔ GEO Überschneidung - der eigentliche Unterschied zu zwei separaten Tools</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm min-w-[520px]">
                            <thead>
                                <tr className="border-b border-[var(--border-subtle)]">
                                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Keyword</th>
                                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Google-Position</th>
                                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Von KI erwähnt?</th>
                                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CORRELATION_ROWS.map(row => (
                                    <tr key={row.keyword} className="border-b border-[var(--border-subtle)] last:border-0">
                                        <td className="px-5 py-3 text-slate-300">{row.keyword}</td>
                                        <td className="px-5 py-3 text-slate-300">{row.position}</td>
                                        <td className="px-5 py-3 text-slate-300">{row.mentioned ? 'Ja' : 'Nein'}</td>
                                        <td className="px-5 py-3">
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[row.status]}`}>{row.label}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="max-w-4xl mx-auto px-5 sm:px-8 py-16 border-t border-[var(--border-subtle)]">
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">Alles, was in einem SEO + GEO Tool dazugehört</h2>
                <p className="text-slate-400 text-center max-w-xl mx-auto mb-10 leading-relaxed">
                    Keine Zusatz-Tools, kein Hin- und Herwechseln zwischen zwei Dashboards.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {FEATURES.map(f => (
                        <div key={f.title} className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5">
                            <div className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-base mb-3">{f.icon}</div>
                            <h3 className="font-bold text-white text-sm mb-1.5">{f.title}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mt-8 max-w-2xl mx-auto text-center">
                    Alle Funktionen laufen im selben Konto, mit derselben Domain als gemeinsamer Basis. Läuft für eine Domain zusätzlich ein SEO-Automatisierung-Abo, schlägt dir die GEO-Automatisierung automatisch vor, welche deiner bereits getrackten SEO-Keywords sich realistisch als KI-Frage eignen - samt echtem KI-Suchvolumen, nicht nur einer Vermutung. Kein manuelles Abgleichen zwischen zwei Exporttabellen, kein Rätselraten, ob ein Keyword schon irgendwo getrackt wird.
                </p>
            </section>

            {/* FUER WEN */}
            <section className="max-w-4xl mx-auto px-5 sm:px-8 py-16 border-t border-[var(--border-subtle)]">
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">Für wen ist das SEO + GEO Tool gedacht?</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6">
                        <h3 className="font-bold text-white text-sm mb-3">Agenturen &amp; Freelancer</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Wer Kunden betreut, muss beides erklären können: klassische Google-Rankings und die neue KI-Sichtbarkeit. Ein gemeinsames Dashboard statt zwei Tool-Abos spart Zeit im Reporting und macht die Überschneidung sofort sichtbar - ein starkes Argument im Kundengespräch.
                        </p>
                    </div>
                    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6">
                        <h3 className="font-bold text-white text-sm mb-3">Inhouse-Marketing-Teams</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Wer intern für Sichtbarkeit verantwortlich ist, braucht eine Antwort auf beide Fragen der Geschäftsführung: "Ranken wir bei Google?" und "Kennt uns ChatGPT?" - ohne zwei getrennte Reports zusammenzubauen.
                        </p>
                    </div>
                    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6">
                        <h3 className="font-bold text-white text-sm mb-3">SaaS- &amp; Produkt-Teams</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Gerade bei technischen Produkten fragen potenzielle Kunden zunehmend direkt eine KI statt Google. Wer hier nicht auftaucht, verliert Reichweite, die klassisches SEO-Tracking allein nicht zeigen würde.
                        </p>
                    </div>
                    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6">
                        <h3 className="font-bold text-white text-sm mb-3">Einzelunternehmer &amp; kleine Websites</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Ein kostenloser Einzel-Check ohne Registrierung reicht, um in 60 Sekunden zu sehen, wo man steht - bevor man sich für ein laufendes Abo entscheidet.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-4xl mx-auto px-5 sm:px-8 py-16 border-t border-[var(--border-subtle)]">
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">Häufige Fragen</h2>
                <div className="space-y-4">
                    {faqLd.mainEntity.map((faq, i) => (
                        <div key={i} className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5">
                            <h3 className="font-semibold text-white mb-2 text-sm">{faq.name}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{faq.acceptedAnswer.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-24">
                <div className="text-center rounded-3xl p-10 sm:p-14"
                    style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.08))', border: '1px solid var(--accent-border)' }}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Finde in 60 Sekunden heraus, wo du stehst</h2>
                    <p className="text-slate-400 mb-7">SEO-Rankings und KI-Sichtbarkeit - ein Audit, ein Dashboard.</p>
                    <Link href="/dashboard"
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all shadow-lg shadow-[var(--accent-border)]">
                        Jetzt kostenlos prüfen →
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
