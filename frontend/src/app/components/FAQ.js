'use client'
import { motion } from 'framer-motion'
import { FAQS } from './faqData'

export default function FAQ() {
    return (
        <section id="faq" className="relative py-16 md:py-24 bg-[var(--bg-base)]">
            <div className="max-w-3xl mx-auto px-5 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 sm:mb-14"
                >
                    <p className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                        Häufig gestellte Fragen
                    </p>
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
                            className="border border-[var(--border-subtle)] rounded-2xl overflow-hidden bg-[var(--surface-06)] px-5 py-4"
                        >
                            <h2 className="m-0 text-sm font-medium text-white leading-snug">{faq.q}</h2>
                            <p className="mt-3 pt-3 text-sm text-slate-400 leading-relaxed border-t border-[var(--border-subtle)]">
                                {faq.a}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}