'use client'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const CHECKS = [
    { label: 'Title tag', detail: '30–60 characters, keyword relevance' },
    { label: 'Meta description', detail: '120–160 characters, unique per page' },
    { label: 'H1 tag', detail: 'Exactly 1 per page, keyword-rich' },
    { label: 'H2 tags', detail: 'At least 1 subheading' },
    { label: 'Image alt text', detail: 'All images with descriptive alt text' },
    { label: 'Canonical tag', detail: 'Duplicate content protection' },
    { label: 'Open Graph tags', detail: 'og:title, og:description, og:image' },
    { label: 'Twitter Card', detail: 'Preview for X / Twitter' },
    { label: 'Structured data (JSON-LD)', detail: 'Schema.org markup present' },
    { label: 'Robots meta tag', detail: 'No accidental noindex' },
    { label: 'Viewport meta tag', detail: 'Mobile optimization' },
    { label: 'HTML lang attribute', detail: 'Language signal for crawlers' },
    { label: 'Internal links', detail: 'Link structure & crawlability' },
    { label: 'Word count', detail: 'At least 300 words per page' },
]

const MOCK_RESULTS = [
    { label: 'Title tag', ok: true,  note: '52 characters ✓' },
    { label: 'Meta description', ok: false, note: 'Missing on 3 pages' },
    { label: 'H1 tag', ok: true,  note: 'Present & keyword-rich ✓' },
    { label: 'Image alt text', ok: false, note: '8 images without alt text' },
    { label: 'Canonical tag', ok: true,  note: 'Correctly set ✓' },
    { label: 'Open Graph', ok: false, note: 'og:image missing' },
    { label: 'Robots meta', ok: true,  note: 'No noindex ✓' },
    { label: 'Word count', ok: false, note: '180 words (min. 300)' },
]

export default function SeoSection() {
    return (
        <section id="seo" className="relative py-20 sm:py-28 bg-[#05080f] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <div className="absolute top-0 left-0 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)' }} />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-tight">
                            Every mistake costs{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                                rankings.
                            </span>
                        </h2>
                        <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
                            AuditAI crawls your entire website up to 25 pages deep and checks every on-page factor — not just the homepage.
                        </p>
                        <ul className="space-y-2.5 mb-8">
                            {CHECKS.map((c, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-[7px] shrink-0" />
                                    <span className="text-sm text-slate-300">
                                        <span className="font-medium text-white">{c.label}</span>
                                        <span className="text-slate-500"> - {c.detail}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link href="/dashboard"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20">
                                Check SEO now
                            </Link>
                            <Link href="/seo/pricing"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-sm font-semibold rounded-xl transition-all duration-200">
                                <TrendingUp className="w-4 h-4 text-emerald-400" />
                                Track it automatically, every week
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                            <span className="text-sm font-semibold text-white">SEO Analysis</span>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-violet-500/15 text-violet-300 font-semibold">Score: 64/100</span>
                        </div>
                        <div className="p-5 space-y-2.5">
                            {MOCK_RESULTS.map((r, i) => (
                                <div key={i} className="flex items-center justify-between gap-3 py-1.5 border-b border-white/[0.04] last:border-0">
                                    <div className="flex items-center gap-2.5">
                                        {r.ok
                                            ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                                            : <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                                        }
                                        <span className="text-sm text-slate-300">{r.label}</span>
                                    </div>
                                    <span className={`text-xs ${r.ok ? 'text-emerald-400' : 'text-red-400'}`}>{r.note}</span>
                                </div>
                            ))}
                        </div>
                        <div className="px-5 pb-4 pt-1">
                            <div className="text-[11px] text-slate-600">14 checks - 12 pages analyzed - AuditAI</div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
