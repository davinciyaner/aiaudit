'use client'
import { motion } from 'framer-motion'
import { Eye, Quote, Trophy } from 'lucide-react'

const CONCEPTS = [
    {
        icon: Eye, color: '#a78bfa',
        title: 'Visibility (Mention Rate)',
        desc: 'Does your domain get mentioned at all when someone asks ChatGPT, Claude, Perplexity or Google AI Overview for a recommendation? The mention rate shows you that in percent — per keyword and platform.',
    },
    {
        icon: Quote, color: '#22d3ee',
        title: 'Citation & Context',
        desc: "It's not just whether you're named that counts, but how. AuditAI shows you the exact sentence where the AI mentions you — and which other sources it cites alongside you.",
    },
    {
        icon: Trophy, color: '#34d399',
        title: 'Share of Voice',
        desc: 'Who else gets mentioned? The competitors view shows you where you stand compared to other domains — domain by domain, platform by platform.',
    },
]

const STEPS = [
    {
        title: 'Ready in seconds',
        desc: 'Add your domain, ready for the first check right away.',
        alt: 'Adding a website to AuditAI AI Visibility — choosing the domain and AI platforms',
        image: '/homepage/en/geo-add-site.png', imgW: 448, imgH: 462,
    },
    {
        title: 'Find the right questions',
        desc: 'Your keywords are automatically translated into real AI recommendation prompts.',
        alt: 'Adding keywords for AI visibility tracking that get used as AI prompts',
        image: '/homepage/en/geo-add-keywords.png', imgW: 952, imgH: 161,
    },
    {
        title: 'Pick your platforms',
        desc: 'Claude, ChatGPT, Perplexity and Google AI Overview — individually or all together.',
        alt: 'Selecting the AI platforms Claude, ChatGPT, Perplexity and Google AI Overview in the AuditAI dashboard',
        image: '/homepage/en/geo-platform-select.png', imgW: 952, imgH: 339,
    },
    {
        title: "Never miss a change",
        desc: 'Re-checked automatically every week, including trend history and competitor comparison.',
        mock: true,
    },
]

// HowTo schema for the 4 setup steps — makes the flow directly readable as structured
// instructions for Google Rich Results and for generative AI models (GEO), not just prose.
const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Set up AI Visibility tracking with AuditAI',
    description: 'Set up in four steps whether and how often Claude, ChatGPT, Perplexity and Google AI Overview mention a website.',
    step: STEPS.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.title,
        text: s.desc,
    })),
}

export default function GeoHowItWorks() {
    return (
        <section id="ai-visibility" className="relative py-20 sm:py-28 bg-[#05080f] overflow-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

                {/* Part 1: Explain the concepts */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-4">
                        See where Google and{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                            AI disagree about you
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base leading-relaxed">
                        Three metrics show you what AI-visibility-only tools can't — because they don't have your SEO data.
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

                {/* Part 2: How setup works */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-4">
                        Ready to go in{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                            3 minutes
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base leading-relaxed">
                        No setup hassle — four steps, then tracking runs automatically.
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
