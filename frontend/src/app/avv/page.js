import Link from 'next/link'
import { Zap } from 'lucide-react'

export const metadata = {
    title: 'Auftragsverarbeitungsvertrag – AuditAI',
    description: 'AVV gemäß Art. 28 DSGVO für die Nutzung von AuditAI.',
    robots: { index: false },
}

function Section({ title, children }) {
    return (
        <section className="mb-10">
            <h2 className="text-white font-semibold text-base mb-3 pb-2 border-b border-white/5">{title}</h2>
            <div className="text-slate-400 text-sm leading-relaxed space-y-3">{children}</div>
        </section>
    )
}

function Sub({ title, children }) {
    return (
        <div className="mt-5">
            <h3 className="text-slate-200 font-medium mb-2">{title}</h3>
            <div className="text-slate-400 text-sm leading-relaxed space-y-2">{children}</div>
        </div>
    )
}

function TableRow({ label, value }) {
    return (
        <div className="grid grid-cols-2 gap-4 py-2.5 border-b border-white/5 last:border-0">
            <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">{label}</span>
            <span className="text-slate-300 text-sm">{value}</span>
        </div>
    )
}

export default function AvvPage() {
    return (
        <div className="min-h-screen bg-[#05080f] text-slate-300">
            <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20">

                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm">
                        <Zap className="w-4 h-4 text-violet-400" />
                        <span className="text-white font-bold">Audit<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">AI</span></span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mt-6 mb-2">Auftragsverarbeitungsvertrag</h1>
                    <p className="text-slate-500 text-sm">Gemäß Art. 28 DSGVO · Stand: Juni 2026</p>
                </div>

                <div className="space-y-2">

                    <Section title="Präambel">
                        <p>
                            Dieser Auftragsverarbeitungsvertrag (AVV) regelt die datenschutzrechtliche Beziehung zwischen dem Nutzer von AuditAI (nachfolgend <strong className="text-slate-300">„Verantwortlicher"</strong>) und dem Anbieter des Dienstes (nachfolgend <strong className="text-slate-300">„Auftragsverarbeiter"</strong>) gemäß Art. 28 DSGVO.
                        </p>
                        <p>
                            Dieser AVV gilt automatisch als geschlossen, sobald der Nutzer kostenpflichtige Dienste von AuditAI — insbesondere das Security Monitoring oder das SEO Tracking — in Anspruch nimmt, bei deren Nutzung personenbezogene Daten im Auftrag des Nutzers verarbeitet werden. Durch die Nutzung des Dienstes erklärt der Nutzer sein Einverständnis mit den Bedingungen dieses AVV.
                        </p>
                        <p className="bg-white/2 border border-white/5 rounded-xl p-4 not-prose text-sm">
                            <strong className="text-slate-300">Auftragsverarbeiter:</strong><br />
                            Finn Paustian, Am Rund 6, 23566 Lübeck<br />
                            E-Mail: <a href="mailto:finnpaustian94@gmail.com" className="text-violet-400 hover:text-violet-300">finnpaustian94@gmail.com</a><br /><br />
                            <strong className="text-slate-300">Verantwortlicher:</strong><br />
                            Der jeweilige Nutzer des AuditAI-Dienstes (gemäß Registrierungsdaten)
                        </p>
                    </Section>

                    <Section title="§ 1 Gegenstand und Dauer der Verarbeitung">
                        <p>
                            Gegenstand der Auftragsverarbeitung ist die Erbringung der in den AGB und auf der Produktseite beschriebenen Dienstleistungen, soweit dabei personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet werden. Dies betrifft insbesondere:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Automatisierte HTTP(S)-Anfragen an vom Verantwortlichen eingetragene Websites (Security Monitoring)</li>
                            <li>Speicherung der Monitoring-Ergebnisse (Uptime-Status, Antwortzeiten, SSL-Daten, Sicherheitsheader)</li>
                            <li>Erstellung und Zustellung von E-Mail-Benachrichtigungen bei Problemen</li>
                            <li>Speicherung der vom Verantwortlichen eingetragenen Domains, Keywords und der dazugehörigen Google-Ranking-Positionen (SEO Tracking)</li>
                            <li>Abruf von Ranking-, Keyword- und Backlink-Daten über die DataForSEO API im Auftrag des Verantwortlichen</li>
                        </ul>
                        <p>
                            Die Verarbeitung erfolgt für die Dauer des aktiven Abonnements zuzüglich einer Löschfrist von 30 Tagen nach Vertragsende.
                        </p>

                        <Sub title="Verarbeitungsübersicht Security Monitoring">
                            <div className="bg-white/2 border border-white/5 rounded-xl p-4">
                                <TableRow label="Art der Daten" value="Domain-Namen, HTTP-Antwortdaten, SSL-Zertifikatsdaten, Uptime-Status, Antwortzeiten, Sicherheitsheader-Konfiguration" />
                                <TableRow label="Zweck" value="Überwachung der Verfügbarkeit und Sicherheitskonfiguration der eingetragenen Websites" />
                                <TableRow label="Betroffene Personen" value="Mittelbar: Betreiber der überwachten Websites (soweit natürliche Personen)" />
                                <TableRow label="Speicherdauer" value="Uptime-Checks: 90 Tage; Security Scans: 12 Monate; Alerts: bis zur manuellen Auflösung, max. 12 Monate" />
                                <TableRow label="Ort der Verarbeitung" value="Deutschland / EU (MongoDB Atlas, Vercel)" />
                            </div>
                        </Sub>

                        <Sub title="Verarbeitungsübersicht SEO Tracking">
                            <div className="bg-white/2 border border-white/5 rounded-xl p-4">
                                <TableRow label="Art der Daten" value="Domains, Keywords, Google-Ranking-Positionen (Top 100), Ranking-URLs, Backlink-Zusammenfassungen, Keyword-Suchvolumina" />
                                <TableRow label="Zweck" value="Wöchentliches Tracking von Google-Rankings für eingetragene Domains und Keywords; Keyword-Analyse; Wettbewerbsanalyse" />
                                <TableRow label="Betroffene Personen" value="Mittelbar: Betreiber der getrackten Domains (soweit natürliche Personen)" />
                                <TableRow label="Speicherdauer" value="Ranking-Daten: 12 Monate; Keyword-Listen: bis zur Löschung durch den Nutzer, max. 30 Tage nach Vertragsende" />
                                <TableRow label="Drittanbieter" value="DataForSEO Ltd., Vilnius, Litauen (EU) — nur Keyword + Standort + Sprachcode werden übermittelt, keine personenbezogenen Nutzerdaten" />
                                <TableRow label="Ort der Verarbeitung" value="Deutschland / EU (MongoDB Atlas, Vercel, DataForSEO)" />
                            </div>
                        </Sub>
                    </Section>

                    <Section title="§ 2 Weisungsrecht des Verantwortlichen">
                        <p>
                            Der Auftragsverarbeiter verarbeitet personenbezogene Daten ausschließlich auf dokumentierte Weisung des Verantwortlichen. Die initiale Weisung ergibt sich aus diesem AVV und den AGB. Weitere Weisungen können per E-Mail erteilt werden.
                        </p>
                        <p>
                            Ist der Auftragsverarbeiter der Auffassung, dass eine Weisung gegen die DSGVO oder andere datenschutzrechtliche Vorschriften verstößt, informiert er den Verantwortlichen unverzüglich darüber.
                        </p>
                    </Section>

                    <Section title="§ 3 Pflichten des Auftragsverarbeiters">
                        <p>Der Auftragsverarbeiter verpflichtet sich:</p>
                        <ul className="list-disc list-inside space-y-1.5 ml-2">
                            <li>Personenbezogene Daten ausschließlich im Rahmen des Vertragszwecks zu verarbeiten</li>
                            <li>Keine personenbezogenen Daten ohne Weisung des Verantwortlichen an Dritte weiterzugeben, soweit nicht gesetzlich verpflichtet</li>
                            <li>Sicherzustellen, dass alle mit der Verarbeitung befassten Personen zur Vertraulichkeit verpflichtet sind</li>
                            <li>Den Verantwortlichen unverzüglich zu informieren, wenn eine Weisung nach seiner Einschätzung datenschutzrechtlich unzulässig ist</li>
                            <li>Den Verantwortlichen bei der Erfüllung von Betroffenenanfragen sowie bei der Einhaltung der in Art. 32–36 DSGVO genannten Pflichten zu unterstützen</li>
                            <li>Nach Wahl des Verantwortlichen alle personenbezogenen Daten nach Abschluss der Erbringung der Verarbeitungsleistungen zu löschen oder zurückzugeben (§ 7 dieses AVV)</li>
                        </ul>
                    </Section>

                    <Section title="§ 4 Unterauftragnehmer">
                        <p>
                            Der Auftragsverarbeiter setzt zur Erbringung des Dienstes folgende Unterauftragnehmer ein, mit denen datenschutzkonforme Verträge gemäß Art. 28 DSGVO bestehen:
                        </p>
                        <div className="bg-white/2 border border-white/5 rounded-xl p-4 space-y-3 text-sm">
                            <div>
                                <strong className="text-slate-300">MongoDB Atlas (MongoDB, Inc.)</strong><br />
                                <span className="text-slate-500">Zweck: Datenbankhosting · Standort: EU (Frankfurt)</span>
                            </div>
                            <div className="border-t border-white/5 pt-3">
                                <strong className="text-slate-300">Vercel Inc.</strong><br />
                                <span className="text-slate-500">Zweck: Hosting der Webanwendung · Standort: EU / USA (Standardvertragsklauseln)</span>
                            </div>
                            <div className="border-t border-white/5 pt-3">
                                <strong className="text-slate-300">SendGrid / Twilio (für E-Mail-Benachrichtigungen)</strong><br />
                                <span className="text-slate-500">Zweck: Versand von Alert-E-Mails · Standort: USA (Standardvertragsklauseln)</span>
                            </div>
                            <div className="border-t border-white/5 pt-3">
                                <strong className="text-slate-300">DataForSEO Ltd.</strong><br />
                                <span className="text-slate-500">Zweck: Abruf von Google-Ranking-Daten, Keyword-Suchvolumina, Wettbewerbs- und Backlink-Daten für SEO Tracking · Standort: Vilnius, Litauen (EU) · Übermittelte Daten: Keyword, Standortname, Sprachcode — keine personenbezogenen Daten der Endnutzer</span>
                            </div>
                        </div>
                        <p>
                            Der Auftragsverarbeiter informiert den Verantwortlichen über geplante Änderungen an Unterauftragnehmern und gibt ihm die Möglichkeit, Einwände zu erheben.
                        </p>
                    </Section>

                    <Section title="§ 5 Betroffenenrechte">
                        <p>
                            Der Auftragsverarbeiter unterstützt den Verantwortlichen bei der Erfüllung von Betroffenenanfragen (Art. 15–22 DSGVO) im Rahmen des Möglichen. Betroffenenanfragen, die direkt beim Auftragsverarbeiter eingehen, leitet dieser unverzüglich an den Verantwortlichen weiter.
                        </p>
                        <p>
                            Zur Ausübung von Datenschutzrechten wende dich an: <a href="mailto:finnpaustian94@gmail.com" className="text-violet-400 hover:text-violet-300">finnpaustian94@gmail.com</a>
                        </p>
                    </Section>

                    <Section title="§ 6 Datenschutzverletzungen">
                        <p>
                            Der Auftragsverarbeiter informiert den Verantwortlichen unverzüglich, spätestens innerhalb von 48 Stunden, wenn er Kenntnis von einer Verletzung des Schutzes personenbezogener Daten erlangt, die die im Rahmen dieses AVV verarbeiteten Daten betrifft. Die Meldung enthält mindestens:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Eine Beschreibung der Art der Verletzung</li>
                            <li>Die betroffenen Kategorien und ungefähre Zahl betroffener Personen</li>
                            <li>Die wahrscheinlichen Folgen der Verletzung</li>
                            <li>Ergriffene oder vorgeschlagene Maßnahmen</li>
                        </ul>
                    </Section>

                    <Section title="§ 7 Löschung und Rückgabe der Daten">
                        <p>
                            Nach Beendigung des Vertragsverhältnisses werden alle im Rahmen der Auftragsverarbeitung gespeicherten Daten des Verantwortlichen — darunter Monitoring-Daten (Uptime-Checks, Security Scans, Alerts) sowie SEO-Tracking-Daten (Domains, Keywords, Ranking-Positionen) — innerhalb von 30 Tagen automatisch gelöscht, sofern keine gesetzliche Aufbewahrungspflicht entgegensteht.
                        </p>
                        <p>
                            Der Verantwortliche kann vor Vertragsende einen Datenexport seiner Monitoring-Daten per E-Mail an <a href="mailto:finnpaustian94@gmail.com" className="text-violet-400 hover:text-violet-300">finnpaustian94@gmail.com</a> anfordern.
                        </p>
                    </Section>

                    <Section title="§ 8 Technische und organisatorische Maßnahmen (TOM)">
                        <p>
                            Der Auftragsverarbeiter setzt folgende technische und organisatorische Maßnahmen gemäß Art. 32 DSGVO um:
                        </p>
                        <Sub title="Vertraulichkeit">
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>Verschlüsselte Datenübertragung via HTTPS / TLS 1.2+</li>
                                <li>Passwörter werden ausschließlich als bcrypt-Hash gespeichert</li>
                                <li>JWT-Authentifizierung mit begrenzter Token-Gültigkeit (7 Tage)</li>
                                <li>Datenbankzugriff nur von autorisierten Server-Instanzen via IP-Whitelist</li>
                            </ul>
                        </Sub>
                        <Sub title="Integrität">
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>HTTP-Sicherheitsheader (HSTS, CSP, X-Frame-Options, X-Content-Type-Options)</li>
                                <li>Rate-Limiting auf allen API-Endpunkten</li>
                                <li>Input-Validierung auf Server-Seite</li>
                            </ul>
                        </Sub>
                        <Sub title="Verfügbarkeit">
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>Hosting auf Vercel mit automatischer Skalierung</li>
                                <li>Datenbank-Backups über MongoDB Atlas</li>
                            </ul>
                        </Sub>
                    </Section>

                    <Section title="§ 9 Haftung">
                        <p>
                            Die Haftung im Rahmen dieses AVV richtet sich nach den Bestimmungen der AGB (§ 7) sowie den anwendbaren gesetzlichen Regelungen. Jede Partei haftet für Schäden, die durch ihre Verstöße gegen datenschutzrechtliche Pflichten entstehen.
                        </p>
                    </Section>

                    <div className="border-t border-white/5 pt-8 flex gap-6 text-slate-600 text-xs">
                        <Link href="/" className="hover:text-slate-400 transition-colors">Startseite</Link>
                        <Link href="/agb" className="hover:text-slate-400 transition-colors">AGB</Link>
                        <Link href="/datenschutz" className="hover:text-slate-400 transition-colors">Datenschutz</Link>
                        <Link href="/impressum" className="hover:text-slate-400 transition-colors">Impressum</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}