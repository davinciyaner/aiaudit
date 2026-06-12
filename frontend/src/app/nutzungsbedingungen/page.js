import Link from 'next/link'
import { Zap } from 'lucide-react'

export const metadata = {
    title: 'Nutzungsbedingungen – AuditAI',
    description: 'Nutzungsbedingungen für die Nutzung von AuditAI.',
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

export default function NutzungsbedingungenPage() {
    return (
        <div className="min-h-screen bg-[#05080f] text-slate-300">
            <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20">

                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm">
                        <Zap className="w-4 h-4 text-violet-400" />
                        <span className="text-white font-bold">Audit<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">AI</span></span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mt-6 mb-2">Nutzungsbedingungen</h1>
                    <p className="text-slate-500 text-sm">Stand: Juni 2026 · Anbieter: Finn Paustian, 23566 Lübeck</p>
                </div>

                <div className="space-y-2">

                    <Section title="1. Geltungsbereich">
                        <p>
                            Diese Nutzungsbedingungen gelten für die Nutzung der Webanwendung <strong className="text-slate-300">AuditAI</strong> unter <strong className="text-slate-300">sitecheckai.dev</strong> sowie aller zugehörigen Dienste (Website-Audit, Security Monitoring). Mit der Registrierung oder der Nutzung des Dienstes erklärt der Nutzer sein Einverständnis mit diesen Bedingungen.
                        </p>
                        <p>
                            Ergänzend gelten die <Link href="/agb" className="text-violet-400 hover:text-violet-300">Allgemeinen Geschäftsbedingungen (AGB)</Link> für kostenpflichtige Abonnements sowie die <Link href="/datenschutz" className="text-violet-400 hover:text-violet-300">Datenschutzerklärung</Link> und der <Link href="/avv" className="text-violet-400 hover:text-violet-300">Auftragsverarbeitungsvertrag (AVV)</Link> für das Security Monitoring.
                        </p>
                    </Section>

                    <Section title="2. Leistung und Zugang">
                        <p>
                            AuditAI stellt ein Online-Tool zur automatisierten Analyse von Websites bereit. Die Nutzung des kostenlosen Tarifs ist nach Registrierung unmittelbar möglich. Kostenpflichtige Funktionen stehen nach Abschluss eines Abonnements zur Verfügung.
                        </p>
                        <p>
                            Der Anbieter behält sich vor, den Dienst jederzeit weiterzuentwickeln, Funktionen hinzuzufügen oder zu entfernen sowie den Dienst vorübergehend für Wartungsarbeiten einzuschränken. Ein Anspruch auf ununterbrochene Verfügbarkeit besteht nicht.
                        </p>
                    </Section>

                    <Section title="3. Erlaubte Nutzung">
                        <p>Der Nutzer darf AuditAI ausschließlich für folgende Zwecke verwenden:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Analyse eigener Websites oder Websites, für deren Analyse der Nutzer eine ausdrückliche Genehmigung des Betreibers besitzt</li>
                            <li>Überwachung eigener Websites oder solcher, für die der Nutzer als Betreiber, Webmaster oder beauftragter Dienstleister zuständig ist</li>
                            <li>Erstellung von Berichten und Analysen für eigene Kunden im Rahmen einer professionellen Tätigkeit</li>
                        </ul>
                    </Section>

                    <Section title="4. Verbotene Nutzung">
                        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 text-red-200/80 text-sm leading-relaxed">
                            Folgende Nutzungen sind ausdrücklich untersagt und können zur sofortigen Sperrung des Accounts sowie zur strafrechtlichen Verfolgung führen:
                        </div>
                        <ul className="list-disc list-inside space-y-1.5 ml-2 mt-3">
                            <li>Analyse oder Überwachung von Websites ohne Genehmigung des jeweiligen Betreibers</li>
                            <li>Nutzung des Dienstes für automatisierte Angriffe, Denial-of-Service-Attacken oder das Aufspüren von Sicherheitslücken in fremden Systemen</li>
                            <li>Umgehung technischer Schutzmaßnahmen der Plattform (Rate-Limiting, Authentifizierung)</li>
                            <li>Weitergabe von Zugangsdaten an Dritte</li>
                            <li>Nutzung des Dienstes zum Zweck des Sammelns oder Weiterverkaufens von Daten über fremde Websites</li>
                            <li>Eingabe falscher Registrierungsdaten oder Identitätsangaben</li>
                            <li>Nutzung durch Personen oder Unternehmen, die auf Sanktionslisten stehen</li>
                        </ul>
                    </Section>

                    <Section title="5. Nutzerverantwortung">
                        <Sub title="5.1 Eigene Inhalte und Eingaben">
                            <p>
                                Der Nutzer ist allein verantwortlich für die Websites und URLs, die er in AuditAI eingibt. Der Anbieter überprüft nicht, ob der Nutzer zur Analyse der eingegebenen Websites berechtigt ist. Die Verantwortung für die Rechtmäßigkeit der Nutzung liegt ausschließlich beim Nutzer.
                            </p>
                        </Sub>
                        <Sub title="5.2 Analyseergebnisse">
                            <p>
                                Die von AuditAI bereitgestellten Analysen, Scores und Empfehlungen — insbesondere KI-generierte Inhalte — dienen ausschließlich als unverbindliche Hinweise. Der Nutzer ist für alle Entscheidungen, die er auf Basis dieser Ergebnisse trifft, selbst verantwortlich. Der Anbieter übernimmt keine Haftung für Schäden, die durch die Umsetzung von Empfehlungen entstehen.
                            </p>
                        </Sub>
                        <Sub title="5.3 Zugangsdaten">
                            <p>
                                Der Nutzer ist verpflichtet, sein Passwort geheim zu halten und den Anbieter unverzüglich zu informieren, wenn er Kenntnis von einer unbefugten Nutzung seines Accounts erlangt. Der Anbieter haftet nicht für Schäden, die aus der Weitergabe von Zugangsdaten durch den Nutzer entstehen.
                            </p>
                        </Sub>
                    </Section>

                    <Section title="6. KI-generierte Inhalte">
                        <p>
                            AuditAI nutzt KI-Modelle (Claude API, Anthropic) zur Erstellung von Analyseergebnissen und Empfehlungen. Der Nutzer nimmt zur Kenntnis, dass:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>KI-generierte Inhalte fehlerhaft, unvollständig oder veraltet sein können</li>
                            <li>die Ergebnisse keine professionelle Beratung (rechtlich, technisch, sicherheitsrelevant) ersetzen</li>
                            <li>der Anbieter keine Garantie für die Richtigkeit oder Vollständigkeit der KI-Ausgaben übernimmt</li>
                        </ul>
                    </Section>

                    <Section title="7. Sperrung und Kündigung">
                        <p>
                            Der Anbieter ist berechtigt, einen Account ohne Vorankündigung zu sperren oder zu löschen, wenn der begründete Verdacht besteht, dass der Nutzer gegen diese Nutzungsbedingungen verstößt — insbesondere gegen Abschnitt 4 (Verbotene Nutzung).
                        </p>
                        <p>
                            Bei kostenpflichtigen Abonnements gelten ergänzend die Kündigungsregelungen der <Link href="/agb" className="text-violet-400 hover:text-violet-300">AGB (§ 6)</Link>.
                        </p>
                    </Section>

                    <Section title="8. Haftungsausschluss">
                        <p>
                            Der Dienst wird „wie er ist" bereitgestellt. Der Anbieter übernimmt keine Gewähr für die Fehlerfreiheit, Verfügbarkeit oder Eignung für einen bestimmten Zweck. Die Haftung ist im Rahmen des gesetzlich Zulässigen ausgeschlossen, insbesondere für:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Fehler in KI-generierten Analyseergebnissen</li>
                            <li>Datenverlust durch technische Störungen</li>
                            <li>Schäden durch vertragswidrige Nutzung des Dienstes</li>
                            <li>Ausfälle von Drittdiensten (PayPal, Anthropic, Vercel, MongoDB)</li>
                        </ul>
                        <p>
                            Die Haftung für Vorsatz und grobe Fahrlässigkeit sowie für Schäden an Leib, Leben und Gesundheit bleibt unberührt.
                        </p>
                    </Section>

                    <Section title="9. Änderungen der Nutzungsbedingungen">
                        <p>
                            Der Anbieter behält sich vor, diese Nutzungsbedingungen jederzeit zu ändern. Registrierte Nutzer werden über wesentliche Änderungen per E-Mail informiert. Die jeweils aktuelle Fassung ist unter <strong className="text-slate-300">sitecheckai.dev/nutzungsbedingungen</strong> abrufbar. Die fortgesetzte Nutzung des Dienstes nach Inkrafttreten der Änderungen gilt als Zustimmung.
                        </p>
                    </Section>

                    <Section title="10. Anwendbares Recht">
                        <p>
                            Es gilt das Recht der Bundesrepublik Deutschland. Für Verbraucher gilt dies nur, sofern dadurch keine zwingenden Verbraucherschutzbestimmungen des Aufenthaltslandes eingeschränkt werden.
                        </p>
                        <p>
                            Bei Fragen oder Beschwerden: <a href="mailto:finnpaustian94@gmail.com" className="text-violet-400 hover:text-violet-300">finnpaustian94@gmail.com</a>
                        </p>
                    </Section>

                    <div className="border-t border-white/5 pt-8 flex flex-wrap gap-6 text-slate-600 text-xs">
                        <Link href="/" className="hover:text-slate-400 transition-colors">Startseite</Link>
                        <Link href="/agb" className="hover:text-slate-400 transition-colors">AGB</Link>
                        <Link href="/datenschutz" className="hover:text-slate-400 transition-colors">Datenschutz</Link>
                        <Link href="/avv" className="hover:text-slate-400 transition-colors">AVV</Link>
                        <Link href="/impressum" className="hover:text-slate-400 transition-colors">Impressum</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}