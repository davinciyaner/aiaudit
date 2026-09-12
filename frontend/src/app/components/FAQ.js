'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FAQS } from './faqData'

function FAQItem({ faq, isOpen, onToggle, id }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-[var(--border-subtle)] rounded-2xl overflow-hidden bg-[var(--surface-06)]"
        >
            <h2 className="m-0">
                <button
                    type="button"
                    onClick={onToggle}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-panel`}
                    id={`${id}-trigger`}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-[var(--text-white)] leading-snug"
                >
                    {faq.q}
                    <ChevronDown className={`w-4 h-4 text-[var(--text-faint)] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </h2>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={`${id}-panel`}
                        role="region"
                        aria-labelledby={`${id}-trigger`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <p className="px-5 pb-4 pt-3 text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-subtle)] mx-5">
                            {faq.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0)

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
                    <p className="text-[var(--text-muted)] text-base">
                        Alles was du über Website-Audits, SEO-Tests und GEO wissen musst.
                    </p>
                </motion.div>

                <div className="space-y-2">
                    {FAQS.map((faq, i) => (
                        <FAQItem
                            key={i}
                            id={`faq-${i}`}
                            faq={faq}
                            isOpen={openIndex === i}
                            onToggle={() => setOpenIndex(prev => prev === i ? null : i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}