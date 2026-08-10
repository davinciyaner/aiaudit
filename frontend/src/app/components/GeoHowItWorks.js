'use client'
import { motion } from 'framer-motion'
import { Eye, Quote, Trophy } from 'lucide-react'

const CONCEPTS = [
    {
        icon: Eye, color: '#a78bfa',
        title: 'Visibility (Mention-Rate)',
        desc: 'Wird deine Domain überhaupt erwähnt, wenn jemand ChatGPT, Claude, Perplexity oder Google AI Overview nach einer Empfehlung fragt? Die Mention-Rate zeigt dir das in Prozent — pro Keyword und Plattform einzeln.',
    },
    {
        icon: Quote, color: '#22d3ee',
        title: 'Zitierung & Kontext',
        desc: 'Nicht nur ob du genannt wirst zählt, sondern wie. AuditAI zeigt dir den exakten Satz, in dem die KI dich erwähnt — und welche anderen Quellen sie dabei mitzitiert.',
    },
    {
        icon: Trophy, color: '#34d399',
        title: 'Share of Voice',
        desc: 'Wer wird sonst noch genannt? Die Wettbewerber-Ansicht zeigt dir, wo du im Vergleich zu anderen Domains stehst — Domain für Domain, Plattform für Plattform.',
    },
]

const STEPS = [
    {
        title: 'Sofort startklar',
        desc: 'Domain hinzufügen, in Sekunden bereit für den ersten Check.',
        alt: 'Website zur AuditAI KI-Sichtbarkeit hinzufügen — Domain und KI-Plattformen auswählen',
        image: '/homepage/geo-add-site.png', imgW: 448, imgH: 462,
    },
    {
        title: 'Die richtigen Fragen finden',
        desc: 'Deine Keywords werden automatisch in echte KI-Empfehlungsfragen übersetzt.',
        alt: 'Keywords für das KI-Sichtbarkeits-Tracking hinzufügen, die als KI-Prompts genutzt werden',
        image: '/homepage/geo-add-keywords.png', imgW: 952, imgH: 161,
    },
    {
        title: 'Deine Plattformen wählen',
        desc: 'Claude, ChatGPT, Perplexity und Google AI Overview — einzeln oder alle zusammen.',
        alt: 'Auswahl der KI-Plattformen Claude, ChatGPT, Perplexity und Google AI Overview im AuditAI-Dashboard',
        image: '/homepage/geo-platform-select.png', imgW: 952, imgH: 339,
    },
    {
        title: 'Nichts verpassen',
        desc: 'Jede Woche automatisch neu geprüft, inklusive Verlauf und Wettbewerbervergleich.',
        mock: true,
    },
]

// HowTo-Schema für die 4 Einrichtungsschritte — macht den Ablauf direkt für Google Rich Results
// und für generative KI-Modelle (GEO) als strukturierte Anleitung lesbar, nicht nur als Fließtext.
const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'KI-Sichtbarkeit mit AuditAI einrichten',
    description: 'In vier Schritten einrichten, ob und wie oft Claude, ChatGPT, Perplexity und Google AI Overview eine Website erwähnen.',
    step: STEPS.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.title,
        text: s.desc,
    })),
}

export default function GeoHowItWorks() {
    return (
        <section id="ki-sichtbarkeit" className="relative py-20 sm:py-28 bg-[#05080f] overflow-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

                {/* Teil 1: Konzepte erklären */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-4">
                        Sieh, wo Google und{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                            KI unterschiedlicher Meinung sind
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base leading-relaxed">
                        Drei Kennzahlen zeigen dir, was reine KI-Sichtbarkeits-Tools nicht sehen können — weil ihnen deine SEO-Daten fehlen.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-3 gap-5 mb-24">
                    {CONCEPTS.map((c, i) => (
                        <motion.div key={c.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6"
                        >
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                                style={{ background: c.color + '15', border: `1px solid ${c.color}25` }}>
                                <c.icon className="w-5 h-5" style={{ color: c.color }} strokeWidth={1.8} />
                            </div>
                            <h3 className="text-base font-semibold text-white mb-2">{c.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{c.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Teil 2: So funktioniert die Einrichtung */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-4">
                        So bist du in{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                            3 Minuten startklar
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base leading-relaxed">
                        Kein Setup-Aufwand — vier Schritte, dann läuft das Tracking automatisch.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-6">
                    {STEPS.map((s, i) => (
                        <motion.div key={s.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative bg-[#0d1117] border border-white/[0.06] rounded-2xl overflow-hidden"
                        >
                            <div className="bg-[#080b0f] p-5 h-72 flex items-center justify-center">
                                {s.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={s.image} alt={s.alt} className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg" />
                                ) : (
                                    <div className="w-full h-full flex items-end gap-2 px-2">
                                        {[22, 32, 28, 42, 50, 58, 68, 80, 76, 90].map((h, hi) => (
                                            <div key={hi} className="flex-1 rounded-sm bg-gradient-to-t from-violet-600/70 to-cyan-400/70" style={{ height: `${h}%` }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="p-6 border-t border-white/[0.06]">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-7 h-7 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0">
                                        <span className="text-xs font-bold text-violet-400">{i + 1}</span>
                                    </div>
                                    <h3 className="text-base font-semibold text-white">{s.title}</h3>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
