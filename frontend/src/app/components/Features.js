'use client'
import { motion } from 'framer-motion'
import { Zap, Shield, Search, TrendingUp, Brain, Camera, Key, Globe } from 'lucide-react'

const FEATURES = [
    { icon: Brain, title: 'KI-Analyse', desc: 'Spezifischer Bericht mit konkreten Fixes für deine Seite — keine generischen Tipps.', color: '#7c3aed' },
    { icon: Shield, title: 'Security Deep-Scan', desc: '14 Security-Checks: Headers, HTTPS, Mixed Content, Clickjacking und CSP.', color: '#ef4444' },
    { icon: Search, title: 'SEO Vollanalyse', desc: 'Title, Meta, H1–H6, Canonical, OG-Tags, Structured Data, Links, Alt-Texte.', color: '#10b981' },
    { icon: Zap, title: 'Core Web Vitals', desc: 'TTFB, FCP, DOM Load, Full Load mit Farbkodierung gegen Google-Richtwerte.', color: '#f59e0b' },
    { icon: Globe, title: 'GEO — KI-Sichtbarkeit', desc: 'Auffindbarkeit für ChatGPT & Claude: llms.txt, Schema.org, FAQ-Markup.', color: '#6366f1' },
    { icon: Key, title: 'Keyword Intelligence', desc: 'Top-Keywords, Dichte, schwache Keywords erkennen und Alternativen vorschlagen.', color: '#a78bfa' },
    { icon: Camera, title: 'Mobile & Desktop', desc: 'Screenshots auf 1280px und 390px — siehst genau was deine Nutzer sehen.', color: '#06b6d4' },
    { icon: TrendingUp, title: 'Aktions-Scores 0–100', desc: 'Jede Kategorie mit Score — du weißt immer was als nächstes zu tun ist.', color: '#22c55e' },
]

const TABLE_ROWS = [
    ['Security Headers', 'SecurityHeaders.io'],
    ['SEO-Analyse', 'Screaming Frog / Ahrefs'],
    ['Performance / Core Web Vitals', 'Google Lighthouse'],
    ['Keyword-Analyse', 'Ahrefs / SEMrush'],
    ['GEO / KI-Sichtbarkeit', '❌ Kein Tool verfügbar'],
    ['AI-Bericht mit Fixes', '❌ Nicht möglich'],
    ['Desktop + Mobile Screenshots', 'Manuell'],
    ['PDF-Export', 'Manuell zusammenstellen'],
]

export default function Features() {
    return (
        <section id="features" className="relative py-16 md:py-28 bg-[#05080f]">
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-16">
                    <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
                        Alles was zählt.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">In einem Tool.</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg">
                        Früher: Lighthouse, Screaming Frog, SecurityHeaders.io, Ahrefs und mehr. Jetzt: AuditAI.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {FEATURES.map((f, i) => (
                        <motion.div key={f.title}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                            className="group bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-white/10 rounded-2xl p-4 sm:p-6 transition-all duration-300">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
                                style={{ background: f.color + '18', border: `1px solid ${f.color}30` }}>
                                <f.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: f.color }} strokeWidth={1.8} />
                            </div>
                            <h3 className="font-semibold text-white text-xs sm:text-sm mb-1.5 sm:mb-2 leading-tight">{f.title}</h3>
                            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Comparison */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 sm:mt-24">
                    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 tracking-tight">
                        AuditAI vs. <span className="text-slate-400">8 separate Tools</span>
                    </h3>

                    {/* Mobile: simplified list */}
                    <div className="sm:hidden bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden">
                        <div className="grid grid-cols-2 border-b border-white/5 bg-white/[0.01]">
                            <div className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Analyse</div>
                            <div className="px-4 py-3 text-center text-xs font-semibold text-violet-400 uppercase tracking-wider bg-violet-500/5 border-l border-violet-500/10">AuditAI</div>
                        </div>
                        {TABLE_ROWS.map(([feature], i) => (
                            <div key={feature} className={`grid grid-cols-2 border-b border-white/[0.04] ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                                <div className="px-4 py-3 text-xs text-slate-300 leading-snug">{feature}</div>
                                <div className="px-4 py-3 text-center bg-violet-500/[0.03] border-l border-violet-500/10">
                                    <span className="text-emerald-400 text-base">✓</span>
                                </div>
                            </div>
                        ))}
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-4 text-sm font-semibold text-white">Preis</div>
                            <div className="px-4 py-4 text-center bg-violet-500/[0.03] border-l border-violet-500/10">
                                <span className="text-emerald-400 font-bold text-xs">Kostenlos starten</span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop: full table */}
                    <div className="hidden sm:block bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden">
                        <div className="grid grid-cols-3 border-b border-white/5">
                            <div className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Analyse</div>
                            <div className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Andere Tools<br /><span className="text-[10px] text-slate-600 font-normal">8 verschiedene, manuell</span></div>
                            <div className="px-6 py-4 text-center bg-violet-500/5 border-l border-violet-500/10 text-xs font-semibold text-violet-400 uppercase tracking-wider">AuditAI<br /><span className="text-[10px] text-violet-600 font-normal">1 Tool, automatisch</span></div>
                        </div>
                        {TABLE_ROWS.map(([feature, other], i) => (
                            <div key={feature} className={`grid grid-cols-3 border-b border-white/[0.04] ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                                <div className="px-6 py-3 text-sm text-slate-300">{feature}</div>
                                <div className="px-6 py-3 text-center text-xs text-slate-500">{other}</div>
                                <div className="px-6 py-3 text-center bg-violet-500/[0.03] border-l border-violet-500/10">
                                    <span className="text-emerald-400 text-sm">✓</span>
                                </div>
                            </div>
                        ))}
                        <div className="grid grid-cols-3">
                            <div className="px-6 py-4 text-sm font-semibold text-white">Preis</div>
                            <div className="px-6 py-4 text-center text-sm text-red-400 font-medium">€200–500 / Monat</div>
                            <div className="px-6 py-4 text-center bg-violet-500/[0.03] border-l border-violet-500/10">
                                <span className="text-emerald-400 font-bold text-sm">Kostenlos starten</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}