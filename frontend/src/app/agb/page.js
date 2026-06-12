import Link from 'next/link'
import { Zap } from 'lucide-react'

export const metadata = {
    title: 'Allgemeine Geschäftsbedingungen – AuditAI',
    description: 'AGB für die Nutzung von AuditAI.',
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

function Highlight({ children }) {
    return (
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-amber-200/80 text-sm leading-relaxed">
            {children}
        </div>
    )
}

export default function AgbPage() {
    return (
        <div className="min-h-screen bg-[#05080f] text-slate-300">
            <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20">

                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm">
                        <Zap className="w-4 h-4 text-violet-400" />
                        <span className="text-white font-bold">Audit<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">AI</span></span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mt-6 mb-2">Allgemeine Geschäftsbedingungen</h1>
                    <p className="text-slate-500 text-sm">Stand: Juni 2026</p>
                </div>

                <div className="space-y-2">

                    <Section title="§ 1 Geltungsbereich und Anbieter">
                        <p>
                            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen
                        </p>
                        <p className="bg-white/2 border border-white/5 rounded-xl p-4">
                            Finn Paustian<br />
                            Am Rund 6, 23566 Lübeck<br />
                            E-Mail: <a href="mailto:finnpaustian94@gmail.com" className="text-violet-400 hover:text-violet-300">finnpaustian94@gmail.com</a><br />
                            (nachfolgend „Anbieter")
                        </p>
                        <p>
                            und natürlichen oder juristischen Personen, die die Dienste von AuditAI unter <strong className="text-slate-300">sitecheckai.dev</strong> nutzen (nachfolgend „Nutzer").
                        </p>
                        <p>
                            Abweichende Bedingungen des Nutzers werden nicht anerkannt, es sei denn, der Anbieter stimmt diesen ausdrücklich schriftlich zu.
                        </p>
                    </Section>

                    <Section title="§ 2 Leistungsbeschreibung">
                        <Sub title="2.1 Website-Audit">
                            <p>
                                AuditAI stellt ein Online-Tool zur automatisierten Analyse von Websites bereit. Die Analyse umfasst je nach gewähltem Tarif folgende Bereiche:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>SEO-Analyse (Suchmaschinenoptimierung)</li>
                                <li>GEO-Analyse (Sichtbarkeit in KI-gestützten Suchen)</li>
                                <li>Security-Check (Sicherheitsheader, SSL, HTTPS-Weiterleitung)</li>
                                <li>Performance-Analyse (Ladezeiten, Core Web Vitals)</li>
                            </ul>
                            <p>
                                Die Analyseergebnisse werden teils durch KI-Modelle (Claude API, Anthropic) generiert und sind als unverbindliche Hinweise zu verstehen. Der Anbieter übernimmt keine Gewähr für deren Vollständigkeit oder Fehlerfreiheit.
                            </p>
                        </Sub>

                        <Sub title="2.2 Security Monitoring">
                            <p>
                                Security Monitoring ist ein optionaler Zusatzdienst, der Websites des Nutzers automatisiert und regelmäßig auf folgende Merkmale prüft:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>Erreichbarkeit (Uptime-Monitoring) via HTTP/HTTPS</li>
                                <li>Gültigkeit und Ablaufdatum von SSL-Zertifikaten</li>
                                <li>Vorhandensein von Sicherheitsheadern in HTTP-Antworten</li>
                                <li>HTTP-zu-HTTPS-Weiterleitung</li>
                            </ul>
                            <p>
                                Für Security Monitoring gelten ergänzend die Bestimmungen in § 5.
                            </p>
                        </Sub>

                        <Sub title="2.3 Verfügbarkeit">
                            <p>
                                Der Anbieter strebt eine Verfügbarkeit der Plattform von 99 % im Jahresmittel an, übernimmt jedoch keine garantierte Verfügbarkeitszusage. Geplante Wartungsarbeiten werden, soweit möglich, vorab angekündigt. Ein Anspruch auf ununterbrochene Verfügbarkeit besteht nicht.
                            </p>
                        </Sub>
                    </Section>

                    <Section title="§ 3 Vertragsschluss und Nutzerkonto">
                        <p>
                            Der Vertrag kommt durch die Registrierung auf AuditAI und die Bestätigung dieser AGB zustande. Mit der Registrierung versichert der Nutzer, dass er:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>volljährig und geschäftsfähig ist, oder</li>
                            <li>ein Unternehmen vertritt und zur Abgabe rechtsverbindlicher Erklärungen berechtigt ist.</li>
                        </ul>
                        <p>
                            Der Nutzer ist für die Geheimhaltung seiner Zugangsdaten verantwortlich. Bei unbefugter Nutzung des Accounts ist der Anbieter unverzüglich zu informieren.
                        </p>
                    </Section>

                    <Section title="§ 4 Vergütung und Zahlung">
                        <Sub title="4.1 Tarife">
                            <p>
                                AuditAI bietet verschiedene Abo-Tarife an, deren jeweils aktuelle Preise und Leistungsumfang auf der Preisseite (<a href="/pricing" className="text-violet-400 hover:text-violet-300">sitecheckai.dev/pricing</a>) sowie der Security-Monitoring-Preisseite (<a href="/monitoring/pricing" className="text-violet-400 hover:text-violet-300">sitecheckai.dev/monitoring/pricing</a>) einsehbar sind. Es gilt die zum Zeitpunkt der Bestellung gültige Preisliste.
                            </p>
                        </Sub>
                        <Sub title="4.2 Zahlungsabwicklung">
                            <p>
                                Die Abrechnung erfolgt monatlich im Voraus über PayPal Subscriptions. Mit Bestätigung einer kostenpflichtigen Bestellung erklärt der Nutzer sich mit der Einleitung des Zahlungsvorgangs einverstanden. Die Zahlung erfolgt jeweils zu Beginn des Abrechnungszeitraums automatisch.
                            </p>
                        </Sub>
                        <Sub title="4.3 Preisänderungen">
                            <p>
                                Preisänderungen werden dem Nutzer mindestens 30 Tage vor Inkrafttreten per E-Mail angekündigt. Stimmt der Nutzer der Preisänderung nicht zu, kann er das Abonnement bis zum Wirksamwerden der Änderung kündigen.
                            </p>
                        </Sub>
                    </Section>

                    <Section title="§ 5 Pflichten des Nutzers beim Security Monitoring">
                        <Highlight>
                            <strong>Wichtig — Nutzungsberechtigung für das Security Monitoring:</strong> Der Nutzer darf ausschließlich Websites in das Security Monitoring aufnehmen, für die er nachweislich die Berechtigung besitzt. Dies ist der Fall, wenn der Nutzer:
                            <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                                <li>Eigentümer der jeweiligen Domain ist,</li>
                                <li>im Auftrag des Domain-Inhabers handelt und eine ausdrückliche schriftliche Genehmigung besitzt, oder</li>
                                <li>als technisch Verantwortlicher (z.B. Webmaster, Systemadministrator) für die Domain tätig ist und befugt ist, automatisierte Zugriffe zu autorisieren.</li>
                            </ul>
                            <p className="mt-2">
                                Die Überwachung fremder Websites ohne Genehmigung ist ausdrücklich verboten und kann nach § 202a StGB (Ausspähen von Daten) sowie zivilrechtlich verfolgt werden. Der Anbieter wird in solchen Fällen mit Behörden kooperieren.
                            </p>
                        </Highlight>

                        <Sub title="5.1 Allgemeine Nutzerpflichten">
                            <p>Der Nutzer verpflichtet sich,</p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>die Plattform ausschließlich für rechtmäßige Zwecke zu nutzen,</li>
                                <li>keine automatisierten Angriffe, DoS-Angriffe oder sonstigen missbräuchlichen Zugriffe über die Plattform durchzuführen,</li>
                                <li>den Anbieter unverzüglich zu informieren, wenn er bemerkt, dass ein zu überwachender Server nicht (mehr) in seinem Eigentum oder seiner Verantwortung liegt,</li>
                                <li>keine sensiblen Zugangsdaten oder persönliche Daten Dritter in die Plattform einzugeben.</li>
                            </ul>
                        </Sub>

                        <Sub title="5.2 Monitoring-Frequenz und Fair Use">
                            <p>
                                Das Security Monitoring sendet in regelmäßigen Abständen automatisierte HTTP(S)-Anfragen an die überwachten Websites. Die Intervalle richten sich nach dem gewählten Tarif:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li><strong className="text-slate-300">Einsteiger:</strong> alle 5 Minuten · bis zu 5 Websites</li>
                                <li><strong className="text-slate-300">Pro:</strong> alle 1 Minute · bis zu 10 Websites</li>
                                <li><strong className="text-slate-300">Expert:</strong> alle 1 Minute · bis zu 30 Websites</li>
                            </ul>
                            <p>
                                Der Nutzer ist dafür verantwortlich, sicherzustellen, dass der Hosting-Anbieter der überwachten Website automatisierte Anfragen in dieser Frequenz erlaubt. Der Anbieter übernimmt keine Haftung für Sperrungen durch Drittanbieter aufgrund des Monitoring-Traffics.
                            </p>
                        </Sub>

                        <Sub title="5.3 Freistellung">
                            <p>
                                Der Nutzer stellt den Anbieter von sämtlichen Ansprüchen Dritter frei, die aus einer vertragswidrigen Nutzung des Security Monitorings entstehen — insbesondere aus der unberechtigten Überwachung fremder Websites.
                            </p>
                        </Sub>
                    </Section>

                    <Section title="§ 6 Laufzeit und Kündigung">
                        <p>
                            Abonnements laufen auf monatlicher Basis und verlängern sich automatisch, sofern sie nicht vor Ablauf des jeweiligen Abrechnungsmonats gekündigt werden. Die Kündigung kann jederzeit über die PayPal-Kontoverwaltung vorgenommen werden. Eine anteilige Erstattung bereits gezahlter Gebühren findet nicht statt.
                        </p>
                        <p>
                            Der Anbieter ist berechtigt, das Vertragsverhältnis mit sofortiger Wirkung zu kündigen, wenn der Nutzer gegen diese AGB — insbesondere gegen § 5 — verstößt.
                        </p>
                        <p>
                            Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
                        </p>
                    </Section>

                    <Section title="§ 6a Widerrufsrecht bei digitalen Leistungen">
                        <p>
                            Für Verbraucher im Sinne des § 13 BGB gilt: Bei kostenpflichtigen Abonnements besteht grundsätzlich ein 14-tägiges Widerrufsrecht ab Vertragsschluss.
                        </p>
                        <p>
                            Das Widerrufsrecht erlischt vorzeitig, wenn der Anbieter mit der Ausführung des Vertrags begonnen hat und der Verbraucher ausdrücklich zugestimmt hat, dass der Anbieter vor Ablauf der Widerrufsfrist mit der Ausführung beginnt, und seine Kenntnis davon bestätigt hat, dass er durch seine Zustimmung mit Beginn der Ausführung sein Widerrufsrecht verliert (§ 356 Abs. 5 BGB).
                        </p>
                        <p>
                            <strong className="text-slate-300">Sofortiger Beginn der Leistungserbringung:</strong> Mit Abschluss eines Abonnements beginnt AuditAI unmittelbar mit der Bereitstellung des Dienstes (Freischaltung von Audits, Aktivierung des Security Monitorings). Der Nutzer stimmt mit dem Abschluss des Abonnements ausdrücklich zu, dass die Leistungserbringung sofort beginnt, und bestätigt seine Kenntnis, dass er dadurch sein Widerrufsrecht verliert.
                        </p>
                        <p>
                            Das Recht zur ordentlichen Kündigung laufender Abonnements gemäß § 6 bleibt unberührt.
                        </p>
                    </Section>

                    <Section title="§ 7 Haftungsbeschränkung">
                        <p>
                            Der Anbieter haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie für vorsätzlich oder grob fahrlässig verursachte Schäden.
                        </p>
                        <p>
                            Im Übrigen ist die Haftung des Anbieters auf vorhersehbare, vertragstypische Schäden beschränkt. Die Haftung für entgangenen Gewinn, mittelbare Schäden und Folgeschäden ist ausgeschlossen, soweit gesetzlich zulässig.
                        </p>
                        <p>
                            Der Anbieter übernimmt keine Haftung für:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Die Richtigkeit, Vollständigkeit oder Aktualität von KI-generierten Audit-Ergebnissen</li>
                            <li>Entscheidungen, die der Nutzer auf Basis von Analyseergebnissen trifft</li>
                            <li>Ausfälle von Drittdiensten (PayPal, Anthropic, MongoDB, Vercel)</li>
                            <li>Schäden, die durch eine vertragswidrige Nutzung des Security Monitorings entstehen</li>
                        </ul>
                    </Section>

                    <Section title="§ 8 Datenschutz">
                        <p>
                            Der Umgang mit personenbezogenen Daten richtet sich nach der <a href="/datenschutz" className="text-violet-400 hover:text-violet-300">Datenschutzerklärung</a>. Sofern der Nutzer im Rahmen des Security Monitorings personenbezogene Daten verarbeitet (z.B. Websites, auf denen Besucherdaten erfasst werden), gilt ergänzend der <a href="/avv" className="text-violet-400 hover:text-violet-300">Auftragsverarbeitungsvertrag (AVV)</a>.
                        </p>
                    </Section>

                    <Section title="§ 9 Änderungen der AGB">
                        <p>
                            Der Anbieter behält sich vor, diese AGB mit einer Ankündigungsfrist von mindestens 30 Tagen zu ändern. Die Änderungen werden dem Nutzer per E-Mail mitgeteilt. Widerspricht der Nutzer nicht innerhalb von 30 Tagen nach Zugang der Änderungsmitteilung, gelten die geänderten AGB als akzeptiert. Auf dieses Widerspruchsrecht und die Folgen des Schweigens wird in der Änderungsmitteilung gesondert hingewiesen.
                        </p>
                    </Section>

                    <Section title="§ 10 Schlussbestimmungen">
                        <p>
                            Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG). Für Nutzer, die Verbraucher im Sinne des BGB sind, gilt diese Rechtswahl nur insoweit, als dadurch nicht zwingende Verbraucherschutzvorschriften des Staates, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat, eingeschränkt werden.
                        </p>
                        <p>
                            Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchführbar sein, berührt dies die Wirksamkeit der übrigen Bestimmungen nicht. An die Stelle der unwirksamen Bestimmung tritt die gesetzlich zulässige Regelung, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.
                        </p>
                    </Section>

                    <div className="border-t border-white/5 pt-8 flex gap-6 text-slate-600 text-xs">
                        <Link href="/" className="hover:text-slate-400 transition-colors">Startseite</Link>
                        <Link href="/datenschutz" className="hover:text-slate-400 transition-colors">Datenschutz</Link>
                        <Link href="/avv" className="hover:text-slate-400 transition-colors">AVV</Link>
                        <Link href="/impressum" className="hover:text-slate-400 transition-colors">Impressum</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}