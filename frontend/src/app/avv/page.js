import Link from 'next/link'

export const metadata = {
    title: 'Auftragsverarbeitungsvertrag – Scanora',
    description: 'AVV gemäß Art. 28 DSGVO für die Nutzung von Scanora.',
    robots: { index: false },
    alternates: { canonical: 'https://www.scanora.ai/avv' },
}

function Section({ title, children }) {
    return (
        <section className="mb-10">
            <h2 className="text-[var(--text-white)] font-semibold text-base mb-3 pb-2 border-b border-[var(--text-white)]/5">{title}</h2>
            <div className="text-[var(--text-muted)] text-sm leading-relaxed space-y-3">{children}</div>
        </section>
    )
}

function Sub({ title, children }) {
    return (
        <div className="mt-5">
            <h3 className="text-[var(--text-body)] font-medium mb-2">{title}</h3>
            <div className="text-[var(--text-muted)] text-sm leading-relaxed space-y-2">{children}</div>
        </div>
    )
}

function TableRow({ label, value }) {
    return (
        <div className="grid grid-cols-2 gap-4 py-2.5 border-b border-[var(--text-white)]/5 last:border-0">
            <span className="text-[var(--text-faint)] text-xs font-medium uppercase tracking-wider">{label}</span>
            <span className="text-[var(--text-body)] text-sm">{value}</span>
        </div>
    )
}

export default function AvvPage() {
    return (
        <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-body)]">
            <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20">

                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-violet-400" viewBox="0 0 192 192" fill="none"><circle cx="96" cy="96" r="50" stroke="currentColor" strokeWidth="14" /><circle cx="110" cy="82" r="13" fill="currentColor" /></svg>
                        <span className="text-[var(--text-white)] font-bold">Scanora</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-[var(--text-white)] mt-6 mb-2">Auftragsverarbeitungsvertrag</h1>
                    <p className="text-[var(--text-faint)] text-sm">Gemäß Art. 28 DSGVO · Stand: Juni 2026</p>
                </div>

                <div className="space-y-2">

                    <Section title="Präambel">
                        <p>
                            Dieser Auftragsverarbeitungsvertrag (AVV) regelt die datenschutzrechtliche Beziehung zwischen dem Nutzer von Scanora (nachfolgend <strong className="text-[var(--text-body)]">„Verantwortlicher"</strong>) und dem Anbieter des Dienstes (nachfolgend <strong className="text-[var(--text-body)]">„Auftragsverarbeiter"</strong>) gemäß Art. 28 DSGVO.
                        </p>
                        <p>
                            Dieser AVV gilt automatisch als geschlossen, sobald der Nutzer kostenpflichtige Dienste von Scanora — insbesondere die SEO Automatisierung — in Anspruch nimmt, bei deren Nutzung personenbezogene Daten im Auftrag des Nutzers verarbeitet werden. Durch die Nutzung des Dienstes erklärt der Nutzer sein Einverständnis mit den Bedingungen dieses AVV.
                        </p>
                        <p className="bg-[var(--text-white)]/2 border border-[var(--text-white)]/5 rounded-xl p-4 not-prose text-sm">
                            <strong className="text-[var(--text-body)]">Auftragsverarbeiter:</strong><br />
                            Finn Paustian, Am Rund 6, 23566 Lübeck<br />
                            E-Mail: <a href="mailto:sitecheckai@gmail.com" className="text-violet-400 hover:text-violet-300">sitecheckai@gmail.com</a><br /><br />
                            <strong className="text-[var(--text-body)]">Verantwortlicher:</strong><br />
                            Der jeweilige Nutzer des Scanora-Dienstes (gemäß Registrierungsdaten)
                        </p>
                    </Section>

                    <Section title="§ 1 Gegenstand und Dauer der Verarbeitung">
                        <p>
                            Gegenstand der Auftragsverarbeitung ist die Erbringung der in den AGB und auf der Produktseite beschriebenen Dienstleistungen, soweit dabei personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet werden. Dies betrifft insbesondere:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Speicherung der vom Verantwortlichen eingetragenen Domains, Keywords und der dazugehörigen Google-Ranking-Positionen (SEO Automatisierung)</li>
                            <li>Abruf von Ranking-, Keyword- und Backlink-Daten über die DataForSEO API im Auftrag des Verantwortlichen</li>
                        </ul>
                        <p>
                            Die Verarbeitung erfolgt für die Dauer des aktiven Abonnements zuzüglich einer Löschfrist von 30 Tagen nach Vertragsende.
                        </p>

                        <Sub title="Verarbeitungsübersicht SEO Automatisierung">
                            <div className="bg-[var(--text-white)]/2 border border-[var(--text-white)]/5 rounded-xl p-4">
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
                        <div className="bg-[var(--text-white)]/2 border border-[var(--text-white)]/5 rounded-xl p-4 space-y-3 text-sm">
                            <div>
                                <strong className="text-[var(--text-body)]">MongoDB Atlas (MongoDB, Inc.)</strong><br />
                                <span className="text-[var(--text-faint)]">Zweck: Datenbankhosting · Standort: EU (Frankfurt)</span>
                            </div>
                            <div className="border-t border-[var(--text-white)]/5 pt-3">
                                <strong className="text-[var(--text-body)]">Vercel Inc.</strong><br />
                                <span className="text-[var(--text-faint)]">Zweck: Hosting der Webanwendung · Standort: EU / USA (Standardvertragsklauseln)</span>
                            </div>
                            <div className="border-t border-[var(--text-white)]/5 pt-3">
                                <strong className="text-[var(--text-body)]">SendGrid / Twilio (für E-Mail-Benachrichtigungen)</strong><br />
                                <span className="text-[var(--text-faint)]">Zweck: Versand von Alert-E-Mails · Standort: USA (Standardvertragsklauseln)</span>
                            </div>
                            <div className="border-t border-[var(--text-white)]/5 pt-3">
                                <strong className="text-[var(--text-body)]">DataForSEO Ltd.</strong><br />
                                <span className="text-[var(--text-faint)]">Zweck: Abruf von Google-Ranking-Daten, Keyword-Suchvolumina, Wettbewerbs- und Backlink-Daten für SEO Automatisierung · Standort: Vilnius, Litauen (EU) · Übermittelte Daten: Keyword, Standortname, Sprachcode — keine personenbezogenen Daten der Endnutzer</span>
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
                            Zur Ausübung von Datenschutzrechten wende dich an: <a href="mailto:sitecheckai@gmail.com" className="text-violet-400 hover:text-violet-300">sitecheckai@gmail.com</a>
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
                            Nach Beendigung des Vertragsverhältnisses werden alle im Rahmen der Auftragsverarbeitung gespeicherten Daten des Verantwortlichen — darunter SEO-Automatisierungsdaten (Domains, Keywords, Ranking-Positionen) — innerhalb von 30 Tagen automatisch gelöscht, sofern keine gesetzliche Aufbewahrungspflicht entgegensteht.
                        </p>
                        <p>
                            Der Verantwortliche kann vor Vertragsende einen Datenexport seiner SEO-Automatisierungsdaten per E-Mail an <a href="mailto:sitecheckai@gmail.com" className="text-violet-400 hover:text-violet-300">sitecheckai@gmail.com</a> anfordern.
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

                    <div className="border-t border-[var(--text-white)]/5 pt-8 flex gap-6 text-[var(--text-faint)] text-xs">
                        <Link href="/" className="hover:text-[var(--text-muted)] transition-colors">Startseite</Link>
                        <Link href="/agb" className="hover:text-[var(--text-muted)] transition-colors">AGB</Link>
                        <Link href="/datenschutz" className="hover:text-[var(--text-muted)] transition-colors">Datenschutz</Link>
                        <Link href="/impressum" className="hover:text-[var(--text-muted)] transition-colors">Impressum</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}