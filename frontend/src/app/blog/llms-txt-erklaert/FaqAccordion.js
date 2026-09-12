'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

// Answers stay permanently mounted in the server-rendered HTML (grid-rows 0fr/1fr
// trick) instead of being conditionally rendered on click. Crawlers, LLMs and
// AI Overviews therefore see the full text of every answer, not just the one
// currently open in the UI - only the visual height collapses.
function FaqItem({ faq, isOpen, onToggle, id }) {
    return (
        <div className="bg-[var(--text-white)]/[0.02] border border-[var(--text-white)]/[0.06] rounded-2xl overflow-hidden">
            <h3 className="m-0">
                <button
                    type="button"
                    onClick={onToggle}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-panel`}
                    id={`${id}-trigger`}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[var(--text-white)] leading-snug"
                >
                    {faq.name}
                    <ChevronDown className={`w-4 h-4 text-[var(--text-faint)] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </h3>
            <div
                id={`${id}-panel`}
                role="region"
                aria-labelledby={`${id}-trigger`}
                aria-hidden={!isOpen}
                className={`grid overflow-hidden transition-[grid-template-rows] duration-200 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="min-h-0 overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-[var(--text-muted)] leading-relaxed">
                        {faq.acceptedAnswer.text}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function FaqAccordion({ faqs }) {
    const [openIndex, setOpenIndex] = useState(0)

    return (
        <div className="space-y-3">
            {faqs.map((faq, i) => (
                <FaqItem
                    key={faq.name}
                    id={`llms-txt-faq-${i}`}
                    faq={faq}
                    isOpen={openIndex === i}
                    onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
                />
            ))}
        </div>
    )
}
