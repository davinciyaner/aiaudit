'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
    {
        q: 'Was prüft AuditAI genau?',
        a: 'AuditAI analysiert deine Website in vier Bereichen: SEO (Title, Meta, Headings, Links), Performance (TTFB, FCP, Ladezeit), Security (HTTPS, HSTS, CSP, Security Headers) und GEO/KI-Sichtbarkeit (llms.txt, Schema.org, FAQ-Schema). Dazu generiert Claude AI einen vollständigen Bericht mit konkreten Fixes.',
    },
    {
        q: 'Was ist der Unterschied zwischen einem Website-Check und einem SEO-Test?',
        a: 'Ein Website-Check prüft technische Grundlagen wie Ladezeit, Security-Header und Erreichbarkeit. Ein SEO-Test geht tiefer: Title-Tags, Meta-Descriptions, H1-Struktur, interne Links und Keyword-Dichte. AuditAI macht beides in einem einzigen Scan — inklusive Security und KI-Sichtbarkeit.',
    },
    {
        q: 'Wie lange dauert ein Audit?',
        a: 'Ein vollständiger Audit dauert in der Regel unter 60 Sekunden. Der KI-Report wird parallel zur technischen Analyse generiert.',
    },
    {
        q: 'Ist AuditAI wirklich kostenlos?',
        a: 'Der Free-Plan ist dauerhaft kostenlos und enthält 1 Audit pro Monat mit SEO-Score, GEO-Sichtbarkeit, Security-Check, Performance-Metriken und Audit-Verlauf. Der KI-generierte Bericht mit konkreten Fixes ist ab dem Pro-Plan verfügbar (€29/Monat, 10 Audits). Agency kostet €99/Monat (unbegrenzte Audits). Kein versteckter Trial, jederzeit kündbar.',
    },
    {
        q: 'Was ist GEO und warum ist es wichtig?',
        a: 'GEO steht für Generative Engine Optimization – die Sichtbarkeit deiner Website für KI-Modelle wie ChatGPT, Claude oder Perplexity. Während klassisches SEO für Google optimiert, sorgt GEO dafür, dass KI-Modelle deine Website als Quelle zitieren. AuditAI prüft llms.txt, strukturierte Daten, FAQ-Schema und weitere Signale.',
    },
    {
        q: 'Wie verbessere ich meinen SEO-Score schnell?',
        a: 'Die häufigsten Quick-Wins: Title-Tag auf 50–60 Zeichen optimieren, Meta-Descriptions auf jeder Seite setzen, H1-Tag mit Haupt-Keyword versehen, fehlende Bild-Alt-Texte ergänzen und Security-Header aktivieren. AuditAI zeigt dir nach dem Audit genau welche dieser Punkte bei dir fehlen — priorisiert nach Wirkung.',
    },
]

export default function FAQ() {
    const [open, setOpen] = useState(null)

    return (
        <section id="faq" className="relative py-16 md:py-24 bg-[#05080f]">
            <div className="max-w-3xl mx-auto px-5 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 sm:mb-14"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                        Häufige Fragen
                    </h2>
                    <p className="text-slate-400 text-base">
                        Alles was du über Website-Audits, SEO-Tests und GEO wissen musst.
                    </p>
                </motion.div>

                <div className="space-y-2">
                    {FAQS.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.04 }}
                            className="border border-white/[0.07] rounded-2xl overflow-hidden bg-white/[0.02]"
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
                            >
                                <span className="text-sm font-medium text-white leading-snug">{faq.q}</span>
                                <ChevronDown
                                    className="w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200"
                                    style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                />
                            </button>
                            <AnimatePresence initial={false}>
                                {open === i && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/[0.04] pt-3">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}