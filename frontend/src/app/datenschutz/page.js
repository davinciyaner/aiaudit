import Link from 'next/link'
import { Zap } from 'lucide-react'

export const metadata = {
    title: 'Datenschutzerklärung',
    description: 'Datenschutzerklärung für AuditAI gemäß DSGVO.',
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

export default function DatenschutzPage() {
    return (
        <div className="min-h-screen bg-[#05080f] text-slate-300">
            <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20">

                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm">
                        <Zap className="w-4 h-4 text-violet-400" />
                        <span className="text-white font-bold">Audit<span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">AI</span></span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mt-6 mb-2">Datenschutzerklärung</h1>
                    <p className="text-slate-500 text-sm">Stand: Mai 2026 · Gemäß DSGVO, BDSG und TTDSG</p>
                </div>

                <div className="space-y-2">

                    <Section title="1. Verantwortlicher">
                        <p>
                            Verantwortlicher im Sinne der DSGVO für die Verarbeitung personenbezogener Daten auf dieser Website:
                        </p>
                        <p className="bg-white/2 border border-white/5 rounded-xl p-4 not-prose">
                            Finn Paustian<br />
                            [DEINE STRASSE UND HAUSNUMMER]<br />
                            [PLZ] [DEINE STADT]<br />
                            Deutschland<br />
                            E-Mail: <a href="mailto:finnolinoo@gmail.com" className="text-violet-400 hover:text-violet-300">finnolinoo@gmail.com</a>
                        </p>
                    </Section>

                    <Section title="2. Erhobene Daten und Verarbeitungszwecke">
                        <Sub title="2.1 Registrierung und Account">
                            <p>Bei der Registrierung werden folgende Daten erhoben und verarbeitet:</p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>Name (Vorname, Nachname)</li>
                                <li>E-Mail-Adresse</li>
                                <li>Passwort (verschlüsselt gespeichert, nicht einsehbar)</li>
                            </ul>
                            <p>
                                <strong className="text-slate-300">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).<br />
                                <strong className="text-slate-300">Zweck:</strong> Bereitstellung des Nutzeraccounts, Authentifizierung, Speicherung von Audit-Reports.<br />
                                <strong className="text-slate-300">Speicherdauer:</strong> Bis zur Löschung des Accounts auf Anfrage.
                            </p>
                        </Sub>

                        <Sub title="2.2 Website-Audit-Daten">
                            <p>
                                Zur Durchführung eines Audits wird die eingegebene Website-URL verarbeitet. Diese URL wird an folgende Dienste übermittelt:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>Intern: Technische Analyse (SEO, Performance, Security, GEO)</li>
                                <li><strong className="text-slate-300">Claude API (Anthropic, Inc.):</strong> Zur Erstellung des KI-generierten Berichts (siehe Abschnitt 5)</li>
                            </ul>
                            <p>
                                Audit-Ergebnisse werden in der Datenbank gespeichert und dem jeweiligen Nutzeraccount zugeordnet. Nicht eingeloggte Nutzer erhalten keine persistente Speicherung.
                            </p>
                            <p>
                                <strong className="text-slate-300">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Erbringung des Dienstes).
                            </p>
                        </Sub>

                        <Sub title="2.3 Serverdaten / Zugriffsprotokolle">
                            <p>
                                Bei jedem Seitenaufruf werden technisch bedingt folgende Daten vorübergehend verarbeitet:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>IP-Adresse (anonymisiert)</li>
                                <li>Datum und Uhrzeit des Zugriffs</li>
                                <li>Aufgerufene URL</li>
                                <li>Browser-Typ und Betriebssystem (User-Agent)</li>
                            </ul>
                            <p>
                                <strong className="text-slate-300">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren Betrieb).<br />
                                <strong className="text-slate-300">Speicherdauer:</strong> Maximal 7 Tage, danach automatische Löschung.
                            </p>
                        </Sub>
                    </Section>

                    <Section title="3. Cookies und lokale Speicherung">
                        <p>
                            AuditAI verwendet <strong className="text-slate-300">keine Tracking-Cookies</strong> und kein Cookie-Banner-Tracking. Es werden ausschließlich technisch notwendige Speichermechanismen eingesetzt:
                        </p>
                        <Sub title="LocalStorage (Browser-Speicher)">
                            <p>
                                Nach dem Login werden folgende Daten im LocalStorage deines Browsers gespeichert:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li><code className="text-violet-300 text-xs bg-violet-500/10 px-1.5 py-0.5 rounded">token</code> – JWT-Authentifizierungstoken (7 Tage gültig)</li>
                                <li><code className="text-violet-300 text-xs bg-violet-500/10 px-1.5 py-0.5 rounded">user</code> – Name und E-Mail des eingeloggten Nutzers</li>
                            </ul>
                            <p>
                                Diese Daten verlassen deinen Browser nicht und werden ausschließlich zur Authentifizierung verwendet. Sie werden beim Abmelden oder nach Ablauf des Tokens automatisch gelöscht.
                            </p>
                            <p>
                                <strong className="text-slate-300">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (technisch notwendig zur Vertragserfüllung), § 25 Abs. 2 Nr. 2 TTDSG.
                            </p>
                        </Sub>
                    </Section>

                    <Section title="4. Zahlungsabwicklung über PayPal">
                        <p>
                            Für kostenpflichtige Abonnements (Pro und Agency) nutzt AuditAI <strong className="text-slate-300">PayPal</strong> als Zahlungsdienstleister.
                        </p>
                        <p>
                            Anbieter: PayPal (Europe) S.à.r.l. et Cie, S.C.A., 22-24 Boulevard Royal, 2449 Luxemburg.
                        </p>
                        <p>
                            Bei einer Zahlung über PayPal werden folgende Daten von AuditAI an PayPal übermittelt:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Der gewählte Abonnementplan</li>
                            <li>Die Subscription-ID zur Verifizierung der Zahlung</li>
                        </ul>
                        <p>
                            Die eigentliche Zahlungsabwicklung (Bankdaten, Kartendaten etc.) erfolgt ausschließlich auf den Servern von PayPal. AuditAI erhält und speichert <strong className="text-slate-300">keine Zahlungsdaten</strong>. Es wird lediglich die PayPal Subscription-ID und der Planstatus gespeichert.
                        </p>
                        <p>
                            <strong className="text-slate-300">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).<br />
                            Weitere Informationen zur Datenschutzverarbeitung bei PayPal: <a href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full" className="text-violet-400 hover:text-violet-300" target="_blank" rel="noopener noreferrer">PayPal Datenschutzerklärung</a>
                        </p>
                    </Section>

                    <Section title="5. Nutzung der Claude API (Anthropic)">
                        <p>
                            AuditAI nutzt die <strong className="text-slate-300">Claude API von Anthropic, Inc.</strong> zur Erstellung KI-generierter Website-Analysen und Berichte.
                        </p>
                        <p>
                            Anbieter: Anthropic, Inc., 548 Market Street, San Francisco, CA 94104, USA.
                        </p>
                        <Sub title="Was wird an Anthropic übermittelt?">
                            <p>Zur Erstellung des KI-Reports werden folgende Daten an die Anthropic-Server übermittelt:</p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>Die zu analysierende Website-URL</li>
                                <li>Die technischen Analyseergebnisse (SEO-Daten, Performance-Daten, Security-Daten, GEO-Daten)</li>
                            </ul>
                            <p>
                                Es werden <strong className="text-slate-300">keine personenbezogenen Nutzerdaten</strong> (Name, E-Mail etc.) an Anthropic übermittelt.
                            </p>
                        </Sub>
                        <Sub title="Datenverarbeitung in den USA">
                            <p>
                                Anthropic verarbeitet Daten in den USA. Die Übermittlung erfolgt auf Basis von Standardvertragsklauseln gemäß Art. 46 Abs. 2 lit. c DSGVO. Weitere Informationen: <a href="https://www.anthropic.com/privacy" className="text-violet-400 hover:text-violet-300" target="_blank" rel="noopener noreferrer">Anthropic Privacy Policy</a>
                            </p>
                        </Sub>
                        <Sub title="Hinweis zur KI-Nutzung">
                            <p>
                                Die durch die Claude API erstellten Berichte und Empfehlungen sind KI-generiert und dienen ausschließlich als unverbindliche Hinweise. Es wird ausdrücklich keine Haftung für die Korrektheit, Vollständigkeit oder Aktualität der KI-generierten Inhalte übernommen. Die Nutzung erfolgt auf eigene Verantwortung.
                            </p>
                        </Sub>
                        <p>
                            <strong className="text-slate-300">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung — der KI-Report ist Bestandteil des angebotenen Dienstes).
                        </p>
                    </Section>

                    <Section title="6. Datenspeicherung (MongoDB)">
                        <p>
                            Alle Nutzerdaten (Account-Daten, Audit-Reports, Subscription-Daten) werden in einer MongoDB-Datenbank gespeichert, die über MongoDB Atlas gehostet wird.
                        </p>
                        <p>
                            Anbieter: MongoDB, Inc., 1633 Broadway, New York, NY 10019, USA. Die Datenbank ist passwortgeschützt, der Zugriff ist auf autorisierte Server beschränkt. Passwörter werden ausschließlich in verschlüsselter Form (bcrypt) gespeichert.
                        </p>
                        <p>
                            <strong className="text-slate-300">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO.
                        </p>
                    </Section>

                    <Section title="7. Keine Weitergabe an Dritte">
                        <p>
                            Personenbezogene Daten werden nicht an Dritte verkauft, vermietet oder anderweitig weitergegeben, außer:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Zur Vertragserfüllung notwendige Dienstleister (PayPal, Anthropic, MongoDB — wie oben beschrieben)</li>
                            <li>Bei gesetzlicher Verpflichtung</li>
                        </ul>
                        <p>Es findet kein Verkauf von Nutzerdaten statt.</p>
                    </Section>

                    <Section title="8. Deine Rechte nach DSGVO">
                        <p>Du hast folgende Rechte bezüglich deiner personenbezogenen Daten:</p>
                        <ul className="space-y-2 ml-2">
                            <li><strong className="text-slate-300">Auskunft</strong> (Art. 15 DSGVO): Welche Daten über dich gespeichert sind.</li>
                            <li><strong className="text-slate-300">Berichtigung</strong> (Art. 16 DSGVO): Korrektur falscher oder unvollständiger Daten.</li>
                            <li><strong className="text-slate-300">Löschung</strong> (Art. 17 DSGVO): Vollständige Löschung deines Accounts und aller gespeicherten Daten.</li>
                            <li><strong className="text-slate-300">Einschränkung</strong> (Art. 18 DSGVO): Einschränkung der Verarbeitung deiner Daten.</li>
                            <li><strong className="text-slate-300">Datenübertragbarkeit</strong> (Art. 20 DSGVO): Übermittlung deiner Daten in einem maschinenlesbaren Format.</li>
                            <li><strong className="text-slate-300">Widerspruch</strong> (Art. 21 DSGVO): Widerspruch gegen bestimmte Verarbeitungen.</li>
                            <li><strong className="text-slate-300">Beschwerde</strong>: Du hast das Recht, Beschwerde bei einer Datenschutzaufsichtsbehörde einzulegen.</li>
                        </ul>
                        <p>
                            Zur Ausübung dieser Rechte wende dich per E-Mail an: <a href="mailto:finnolinoo@gmail.com" className="text-violet-400 hover:text-violet-300">finnolinoo@gmail.com</a>. Anfragen werden innerhalb von 30 Tagen beantwortet.
                        </p>
                    </Section>

                    <Section title="9. Datensicherheit">
                        <p>
                            AuditAI setzt technische und organisatorische Maßnahmen ein, um deine Daten zu schützen:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Verschlüsselte Datenübertragung via HTTPS (TLS)</li>
                            <li>Passwörter werden ausschließlich als bcrypt-Hash gespeichert</li>
                            <li>JWT-Token mit begrenzter Gültigkeit (7 Tage)</li>
                            <li>Datenbankzugriff nur von authorisierten Server-Instanzen</li>
                            <li>HTTP-Sicherheitsheader (HSTS, CSP, X-Frame-Options etc.)</li>
                        </ul>
                    </Section>

                    <Section title="10. Änderungen dieser Datenschutzerklärung">
                        <p>
                            Diese Datenschutzerklärung kann bei Änderungen des Dienstes oder der gesetzlichen Anforderungen aktualisiert werden. Die jeweils aktuelle Version ist unter <a href="https://auditai.io/datenschutz" className="text-violet-400 hover:text-violet-300">auditai.io/datenschutz</a> abrufbar. Bei wesentlichen Änderungen werden registrierte Nutzer per E-Mail informiert.
                        </p>
                    </Section>

                    <div className="border-t border-white/5 pt-8 flex gap-6 text-slate-600 text-xs">
                        <Link href="/" className="hover:text-slate-400 transition-colors">Startseite</Link>
                        <Link href="/impressum" className="hover:text-slate-400 transition-colors">Impressum</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
