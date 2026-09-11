'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FAQS_EN } from './faqDataEn'

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
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-white leading-snug"
                >
                    {faq.q}
                    <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
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
                        <p className="px-5 pb-4 pt-3 text-sm text-slate-400 leading-relaxed border-t border-[var(--border-subtle)] mx-5">
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
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                        Frequently asked questions
                    </h2>
                    <p className="text-slate-400 text-base">
                        Everything you need to know about website audits, SEO tests and GEO.
                    </p>
                </motion.div>

                <div className="space-y-2">
                    {FAQS_EN.map((faq, i) => (
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
