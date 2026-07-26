'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FAQS } from './faqData'

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