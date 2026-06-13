import Link from 'next/link'
import { Zap } from 'lucide-react'

export const metadata = {
    title: 'Impressum',
    description: 'Impressum und rechtliche Angaben für AuditAI.',
    robots: { index: false },
}

export default function ImpressumPage() {
    return (
        <div className="min-h-screen bg-[#05080f] text-slate-300">
            <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20">

                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 text-sm">
                        <Zap className="w-4 h-4 text-violet-400" />
                        <span className="text-white font-bold">Audit<span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">AI</span></span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mt-6 mb-2">Impressum</h1>
                    <p className="text-slate-500 text-sm">Angaben gemäß § 5 TMG</p>
                </div>

                <div className="space-y-10 text-sm leading-relaxed">

                    <section>
                        <h2 className="text-white font-semibold text-base mb-3">Anbieter</h2>
                        <p>
                            Finn Paustian<br />
                            Am Rund 6<br />
                            23566 Lübeck<br />
                            Deutschland
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white font-semibold text-base mb-3">Kontakt</h2>
                        <p>
                            E-Mail: <a href="mailto:finnpaustian94@gmail.com" className="text-violet-400 hover:text-violet-300">finnpaustian94@gmail.com</a><br />
                            Telefon: 01752436318
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white font-semibold text-base mb-3">Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)</h2>
                        <p>
                            Finn Paustian<br />
                            Am Rund 6<br />
                            23566 Lübeck
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white font-semibold text-base mb-3">EU-Streitschlichtung</h2>
                        <p className="text-slate-400">
                            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">
                                https://ec.europa.eu/consumers/odr/
                            </a>
                            .<br />
                            Unsere E-Mail-Adresse finden Sie oben im Impressum.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white font-semibold text-base mb-3">Verbraucherstreitbeilegung (§ 36 VSBG)</h2>
                        <p className="text-slate-400">
                            Wir nehmen an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle nicht teil und sind dazu nicht verpflichtet (§ 36 VSBG).
                        </p>
                    </section>

                    <div className="border-t border-white/5 pt-10">
                        <h2 className="text-white font-semibold text-lg mb-6">Haftungsausschluss</h2>

                        <section className="mb-8">
                            <h3 className="text-white font-semibold mb-3">Haftung für Inhalte</h3>
                            <p className="text-slate-400">
                                Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehme ich jedoch keine Gewähr. Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h3 className="text-white font-semibold mb-3">Haftung für KI-generierte Inhalte</h3>
                            <p className="text-slate-400">
                                AuditAI nutzt die Claude API von Anthropic zur Erstellung von KI-generierten Website-Analysen und Berichten. Die durch die KI erstellten Inhalte, Empfehlungen und Bewertungen dienen ausschließlich als unverbindliche Hinweise und stellen keine rechtlich bindende Beratung dar. Für die Korrektheit, Vollständigkeit oder Aktualität der KI-generierten Analyseergebnisse wird ausdrücklich keine Haftung übernommen. Die Nutzung der Analyseergebnisse erfolgt auf eigene Verantwortung des Nutzers. Es wird keinerlei Haftung für Schäden übernommen, die aus der Umsetzung der KI-generierten Empfehlungen entstehen.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h3 className="text-white font-semibold mb-3">Haftung für technische Analyseergebnisse</h3>
                            <p className="text-slate-400">
                                Die technischen Audit-Ergebnisse (SEO, Performance, GEO) werden automatisiert erstellt und können Fehler enthalten. Sie ersetzen keine professionelle Rechtsberatung. Für Schäden oder Verluste, die durch die Nutzung oder Nichtnutzung der bereitgestellten Informationen entstehen, wird keine Haftung übernommen.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h3 className="text-white font-semibold mb-3">Haftung für Links</h3>
                            <p className="text-slate-400">
                                Dieses Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Links umgehend entfernen.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-white font-semibold mb-3">Urheberrecht</h3>
                            <p className="text-slate-400">
                                Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                            </p>
                        </section>
                    </div>

                    <div className="border-t border-white/5 pt-8 flex gap-6 text-slate-600 text-xs">
                        <Link href="/" className="hover:text-slate-400 transition-colors">Startseite</Link>
                        <Link href="/datenschutz" className="hover:text-slate-400 transition-colors">Datenschutz</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}