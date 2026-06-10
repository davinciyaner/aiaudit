import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Website-Security 2026: Warum ein Hack 50.000€+ kosten kann | AuditAI',
    description: 'Gehackte Websites kosten 2026 mehr als je zuvor - DSGVO-Bußgelder, Cloud-Rechnungen durch Crypto-Mining, Datenverlust. Besonders Vibe-Coding-Projekte sind betroffen. So schützt du dich.',
    keywords: 'website security check, website gehackt, security header, dsgvo bußgeld, vibe coding sicherheit, website hacken kosten, csp header, hsts',
    alternates: { canonical: 'https://www.sitecheckai.dev/blog/website-security-check' },
    openGraph: {
        title: 'Website-Security 2026: Warum ein Hack 50.000€+ kosten kann',
        description: 'DSGVO-Bußgelder, Cloud-Rechnungen durch Crypto-Mining, Datenverlust. So schützt du deine Website.',
        url: 'https://www.sitecheckai.dev/blog/website-security-check',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Website-Security 2026: Warum ein Hack 50.000€+ kosten kann - und wie du dich schützt',
    description: 'Gehackte Websites kosten 2026 mehr als je zuvor. Besonders Vibe-Coding-Projekte sind betroffen.',
    datePublished: '2026-06-10',
    dateModified: '2026-06-10',
    author: { '@type': 'Person', name: 'Finn Paustian' },
    publisher: { '@type': 'Organization', name: 'AuditAI', url: 'https://www.sitecheckai.dev' },
    url: 'https://www.sitecheckai.dev/blog/website-security-check',
    mainEntityOfPage: 'https://www.sitecheckai.dev/blog/website-security-check',
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was ist ein Website Security Check?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ein Website Security Check prüft alle sicherheitsrelevanten Einstellungen einer Website: HTTPS-Verschlüsselung, HSTS, Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy und weitere Security-Header. Er deckt Schwachstellen auf bevor Angreifer sie ausnutzen.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie viel kostet es wenn eine Website gehackt wird?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Die Kosten eines Hacks variieren stark. Cloud-Rechnungen durch Crypto-Mining-Angriffe können innerhalb von 24 Stunden auf 10.000–50.000€ steigen. DSGVO-Bußgelder bei Datenverlust beginnen bei 10.000€ und können bis zu 4 % des Jahresumsatzes oder 20 Millionen€ betragen. Dazu kommen Entwicklerkosten für die Bereinigung (2.000–20.000€), Downtime und Reputationsschaden.',
            },
        },
        {
            '@type': 'Question',
            name: 'Sind Vibe-Coding-Websites unsicherer?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja, tendenziell. KI-Tools wie Cursor, Copilot oder Claude generieren funktionierenden Code - aber Security-Best-Practices wie Input-Validierung, Rate Limiting, Security-Header oder sichere Datenbankabfragen werden häufig weggelassen oder nicht explizit angefordert. Das Ergebnis ist Code der funktioniert aber angreifbar ist. Ein Security-Check nach jedem größeren Deployment ist bei Vibe-Coding-Projekten besonders wichtig.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was sind die wichtigsten Security-Header?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Die fünf wichtigsten Security-Header sind: Strict-Transport-Security (HSTS) - erzwingt HTTPS; Content-Security-Policy (CSP) - verhindert XSS-Angriffe; X-Frame-Options - schützt vor Clickjacking; X-Content-Type-Options - verhindert MIME-Sniffing; Referrer-Policy - kontrolliert welche URL-Informationen weitergegeben werden.',
            },
        },
    ],
}

const COSTS = [
    {
        title: 'Cloud-Rechnung durch Crypto-Mining',
        amount: '10.000 – 50.000€+',
        amountColor: '#ef4444',
        desc: 'Angreifer nutzen kompromittierte Server um Kryptowährungen zu schürfen - auf deine Kosten. AWS, Google Cloud und Azure rechnen sekundengenau ab. Wer nachts nicht aufpasst, wacht mit einer fünfstelligen Rechnung auf. Cloud-Anbieter erstatten diese Kosten selten vollständig.',
        timeframe: 'Kann in unter 24 Stunden entstehen',
    },
    {
        title: 'DSGVO-Bußgeld bei Datenverlust',
        amount: 'bis zu 20.000.000€',
        amountColor: '#f59e0b',
        desc: 'Werden Nutzerdaten gestohlen, greift die DSGVO. Bußgelder starten bei 10.000€ für kleinere Verstöße und gehen bis zu 4 % des weltweiten Jahresumsatzes oder 20 Millionen€ - je nachdem was höher ist. Hinzu kommt die Pflicht zur Meldung innerhalb von 72 Stunden.',
        timeframe: 'Meldepflicht: 72 Stunden nach Entdeckung',
    },
    {
        title: 'Bereinigung und Entwicklerkosten',
        amount: '2.000 – 20.000€',
        amountColor: '#f59e0b',
        desc: 'Nach einem Hack müssen forensische Analysen durchgeführt, Backdoors gefunden, Systeme neu aufgesetzt und Sicherheitslücken geschlossen werden. Spezialisierte Security-Entwickler kosten 150–300€ pro Stunde. Bei komplexen Angriffen kommen schnell 40–80 Stunden zusammen.',
        timeframe: 'Typische Bereinigung: 1–4 Wochen',
    },
    {
        title: 'Downtime und Reputationsschaden',
        amount: 'schwer kalkulierbar',
        amountColor: '#6366f1',
        desc: 'Während der Bereinigung ist die Website offline oder eingeschränkt. Für E-Commerce bedeutet jede Stunde Downtime direkten Umsatzverlust. Dazu kommt der langfristige Reputationsschaden: gehackte Websites landen auf Google-Blacklists und verlieren Ranking-Positionen die Monate brauchen um sich zu erholen.',
        timeframe: 'Google-Blacklist: Wochen bis zur Entfernung',
    },
]

const HEADERS = [
    {
        name: 'Strict-Transport-Security (HSTS)',
        risk: 'Kritisch',
        riskColor: '#ef4444',
        desc: 'Erzwingt HTTPS für alle Verbindungen. Ohne HSTS können Angreifer Nutzer auf HTTP umleiten und den Datenverkehr mitlesen (Man-in-the-Middle-Angriff). Besonders gefährlich in öffentlichen WLAN-Netzen.',
        fix: 'Strict-Transport-Security: max-age=63072000; includeSubDomains; preload',
    },
    {
        name: 'Content-Security-Policy (CSP)',
        risk: 'Kritisch',
        riskColor: '#ef4444',
        desc: 'Verhindert Cross-Site-Scripting (XSS) - eine der häufigsten Angriffsvektoren. Ohne CSP kann eingeschleuster JavaScript-Code im Browser deiner Nutzer ausgeführt werden und Passwörter, Session-Tokens oder Kreditkartendaten stehlen.',
        fix: "Content-Security-Policy: default-src 'self'; script-src 'self'",
    },
    {
        name: 'X-Frame-Options',
        risk: 'Hoch',
        riskColor: '#f59e0b',
        desc: 'Schützt vor Clickjacking - Angreifer betten deine Seite unsichtbar in einen iFrame ein und täuschen Nutzer dazu, Buttons oder Links zu klicken die sie gar nicht sehen. Besonders gefährlich bei Login-Seiten und Zahlungsformularen.',
        fix: 'X-Frame-Options: SAMEORIGIN',
    },
    {
        name: 'X-Content-Type-Options',
        risk: 'Mittel',
        riskColor: '#6366f1',
        desc: 'Verhindert MIME-Sniffing: Browser versuchen manchmal Dateitypen selbst zu erraten, was dazu führen kann dass eine hochgeladene Textdatei als ausführbares Skript interpretiert wird. Dieser Header unterbindet dieses Verhalten.',
        fix: 'X-Content-Type-Options: nosniff',
    },
    {
        name: 'Referrer-Policy',
        risk: 'Mittel',
        riskColor: '#6366f1',
        desc: 'Kontrolliert welche URL-Informationen beim Klick auf externe Links weitergegeben werden. Ohne diesen Header können sensitive URL-Parameter (z. B. Session-IDs, interne Pfade) an Drittseiten übermittelt werden.',
        fix: 'Referrer-Policy: strict-origin-when-cross-origin',
    },
]

export default function SecurityArtikelPage() {
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
                    <span className="text-slate-500">Website-Security 2026</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-red-500/15 text-red-400">
                            Security
                        </span>
                        <span className="text-xs text-slate-600">10. Juni 2026</span>
                        <span className="text-xs text-slate-600">· 10 min Lesezeit</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        Website-Security 2026: Warum ein Hack 50.000€+ kosten kann - und wie du dich schützt
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Alle paar Minuten wird weltweit eine Website gehackt. Was früher vor allem große Konzerne betraf, trifft heute kleine Unternehmen, Freelancer und Startups mit voller Wucht - besonders solche die ihren Code mit KI-Tools wie Cursor, Copilot oder Claude gebaut haben. Die Kosten eines Hacks beginnen bei ein paar tausend Euro und können schnell in den sechsstelligen Bereich steigen.
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
                        <h2 className="text-2xl font-bold text-white mb-4">Das unterschätzte Risiko: Jede Website ist ein Ziel</h2>
                        <p>
                            Ein weit verbreiteter Irrglaube: "Meine Website ist zu klein und unbekannt - warum sollte jemand sie hacken?" Die Antwort: Automatisierte Angriffe scannen täglich Millionen von Websites nach bekannten Schwachstellen. Es geht nicht um dich persönlich. Es geht darum, ob dein Server als Relay für Spam-Mails nutzbar ist, ob auf ihm Crypto-Mining laufen kann, oder ob sich darin gespeicherte Kundendaten zu Geld machen lassen.
                        </p>
                        <p className="mt-4">
                            Laut aktuellem Lagebericht des BSI (Bundesamt für Sicherheit in der Informationstechnik) werden täglich über 70.000 neue Schadprogrammvarianten registriert. Kleine und mittelständische Unternehmen sind dabei überproportional betroffen - weil sie in der Regel weniger in Security investieren als Konzerne, aber ähnlich verwundbar sind.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Vibe Coding und Security: Ein unterschätztes Risiko</h2>
                        <p>
                            <strong className="text-white">Vibe Coding</strong> - also das Entwickeln von Websites und Apps mit KI-Unterstützung durch Tools wie Cursor, GitHub Copilot, Claude oder ChatGPT - hat die Einstiegshürde für Webentwicklung drastisch gesenkt. In Stunden entstehen funktionsfähige Anwendungen, die früher Wochen gedauert hätten.
                        </p>
                        <p className="mt-4">
                            Das Problem: KI-Tools generieren Code der <em>funktioniert</em> - aber nicht unbedingt Code der <em>sicher</em> ist. Security-Best-Practices wie Input-Validierung, parameterisierte Datenbankabfragen, Rate Limiting, CORS-Konfiguration oder Security-Header werden von KI-Modellen nicht automatisch eingebaut, es sei denn man fragt explizit danach. Und selbst dann ist das Ergebnis nicht immer vollständig.
                        </p>
                        <div className="bg-red-500/8 border border-red-500/20 rounded-2xl p-5 mt-5">
                            <p className="text-sm text-red-300 font-semibold mb-2">Typische Security-Lücken in Vibe-Coding-Projekten:</p>
                            <ul className="space-y-1.5">
                                {[
                                    'Fehlende oder zu permissive Content-Security-Policy',
                                    'API-Schlüssel direkt im Frontend-Code (sichtbar für jeden)',
                                    'Keine Rate Limiting auf Login- und API-Endpunkten',
                                    'SQL-Abfragen ohne Parametrisierung (SQL Injection möglich)',
                                    'Fehlende HTTPS-Erzwingung und HSTS-Header',
                                    'Offene Admin-Panels ohne IP-Beschränkung',
                                    'Fehlende Validierung von Datei-Uploads',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                        <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p className="mt-4">
                            Das bedeutet nicht, dass Vibe Coding grundsätzlich unsicher ist - es bedeutet, dass Security ein expliziter Schritt im Entwicklungsprozess sein muss, nicht eine Selbstverständlichkeit.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">Was ein Hack wirklich kostet</h2>
                        <div className="space-y-4">
                            {COSTS.map((cost, i) => (
                                <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
                                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                        <h3 className="font-semibold text-white">{cost.title}</h3>
                                        <span className="text-sm font-bold shrink-0" style={{ color: cost.amountColor }}>{cost.amount}</span>
                                    </div>
                                    <p className="text-sm text-slate-400 leading-relaxed mb-2">{cost.desc}</p>
                                    <p className="text-xs text-slate-600 italic">{cost.timeframe}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-red-500/8 border border-red-500/20 rounded-2xl p-5 mt-5">
                            <p className="text-sm font-semibold text-red-300 mb-1">Reales Beispiel: AWS-Rechnung nach Credential-Diebstahl</p>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Ein häufiges Szenario: Ein Entwickler committed versehentlich einen AWS-Schlüssel auf GitHub. Automatisierte Bots scannen GitHub rund um die Uhr nach solchen Schlüsseln. Innerhalb von Minuten nach dem Push starten Angreifer hunderte GPU-Instanzen für Crypto-Mining. Das Ergebnis nach 12 Stunden: eine AWS-Rechnung über 15.000–80.000€. AWS erstattet solche Kosten nur in Ausnahmefällen und maximal teilweise.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Die 5 wichtigsten Security-Header - und warum sie fehlen</h2>
                        <p className="text-slate-400 mb-6">
                            Security-Header sind HTTP-Response-Header die der Server mit jeder Antwort mitschickt. Sie kosten nichts, sind in 10 Minuten gesetzt - und fehlen auf <strong className="text-white">78 % der analysierten Websites</strong>.
                        </p>
                        <div className="space-y-4">
                            {HEADERS.map((header, i) => (
                                <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <h3 className="font-semibold text-white text-sm">{header.name}</h3>
                                        <span
                                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                            style={{ background: header.riskColor + '18', color: header.riskColor }}
                                        >
                                            {header.risk}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-400 leading-relaxed mb-3">{header.desc}</p>
                                    <pre className="text-xs bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 text-emerald-400 font-mono overflow-x-auto">
                                        {header.fix}
                                    </pre>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Security-Checkliste: Das Minimum das jede Website braucht</h2>
                        <div className="space-y-2">
                            {[
                                ['HTTPS auf allen Seiten aktiv', 'HTTP-Anfragen werden auf HTTPS umgeleitet'],
                                ['HSTS-Header gesetzt', 'Erzwingt HTTPS auch bei direktem Aufruf'],
                                ['Content-Security-Policy', 'Verhindert XSS-Angriffe'],
                                ['X-Frame-Options', 'Schützt vor Clickjacking'],
                                ['X-Content-Type-Options', 'Verhindert MIME-Sniffing'],
                                ['Referrer-Policy', 'Kontrolliert weitergegebene URL-Daten'],
                                ['Keine API-Keys im Frontend', 'Secrets gehören in Umgebungsvariablen'],
                                ['Rate Limiting auf Login/API', 'Verhindert Brute-Force-Angriffe'],
                                ['Abhängigkeiten aktuell halten', 'npm audit regelmäßig ausführen'],
                                ['Datei-Uploads validieren', 'Nur erlaubte Dateitypen und Größen akzeptieren'],
                            ].map(([title, desc], i) => (
                                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                                    <div className="w-5 h-5 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-[9px] font-bold text-red-400">{i + 1}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-white">{title}</span>
                                        <span className="text-sm text-slate-500"> - {desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Häufige Fragen zur Website-Security</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    q: 'Was ist ein Website Security Check?',
                                    a: 'Ein Website Security Check prüft alle sicherheitsrelevanten Einstellungen einer Website: HTTPS-Verschlüsselung, HSTS, Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy und weitere Security-Header. Er deckt Schwachstellen auf bevor Angreifer sie ausnutzen.',
                                },
                                {
                                    q: 'Wie viel kostet es wenn eine Website gehackt wird?',
                                    a: 'Cloud-Rechnungen durch Crypto-Mining-Angriffe können innerhalb von 24 Stunden auf 10.000–50.000€ steigen. DSGVO-Bußgelder bei Datenverlust beginnen bei 10.000€. Dazu kommen Entwicklerkosten für die Bereinigung (2.000–20.000€) und Downtime.',
                                },
                                {
                                    q: 'Sind Vibe-Coding-Websites unsicherer?',
                                    a: 'Tendenziell ja. KI-Tools generieren funktionierenden Code, aber Security-Best-Practices wie Input-Validierung, Rate Limiting oder Security-Header werden häufig weggelassen. Ein Security-Check nach jedem Deployment ist bei Vibe-Coding-Projekten besonders wichtig.',
                                },
                                {
                                    q: 'Was sind die wichtigsten Security-Header?',
                                    a: 'HSTS (erzwingt HTTPS), Content-Security-Policy (verhindert XSS), X-Frame-Options (schützt vor Clickjacking), X-Content-Type-Options (verhindert MIME-Sniffing) und Referrer-Policy. Diese fünf Header decken die häufigsten Angriffsvektoren ab.',
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
                <div className="mt-14 bg-gradient-to-br from-red-950/40 to-[#05080f] border border-red-500/20 rounded-2xl p-6 sm:p-8 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                        Wie sicher ist deine Website wirklich?
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        AuditAI prüft 14 Security-Checks in unter 60 Sekunden - inklusive aller Security-Header aus diesem Artikel. Finde heraus ob deine Website angreifbar ist, bevor es jemand anderes tut.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-violet-600 hover:from-red-500 hover:to-violet-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-red-500/20"
                    >
                        Security-Check jetzt starten →
                    </Link>
                    <div className="mt-3 text-xs text-slate-600">Kostenlose Registrierung · Keine Kreditkarte · 60 Sekunden</div>
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