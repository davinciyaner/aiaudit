'use client'
import { motion } from 'framer-motion'
import {
    ArrowRight, Globe, RefreshCw, Zap, Check, X,
    LayoutDashboard, Users, GitCompare, Lightbulb, ArrowUp,
} from 'lucide-react'
import Link from 'next/link'

const PLATFORM_META = {
    claude:     { label: 'Claude', color: 'text-violet-400' },
    chatgpt:    { label: 'ChatGPT', color: 'text-green-400' },
    perplexity: { label: 'Perplexity', color: 'text-teal-400' },
    google_aio: { label: 'Google AIO', color: 'text-blue-400' },
}
const PLATFORMS = ['claude', 'chatgpt', 'perplexity', 'google_aio']

const MENTIONS = [
    { keyword: 'seo tool', claude: true, chatgpt: true, perplexity: false, google_aio: true  },
    { keyword: 'generative engine optimization', claude: true, chatgpt: true, perplexity: true, google_aio: false },
    { keyword: 'llms.txt einrichten', claude: true, chatgpt: false, perplexity: true, google_aio: false },
    { keyword: 'website seo check', claude: true, chatgpt: false, perplexity: false, google_aio: false },
    { keyword: 'ai seo audit', claude: false, chatgpt: false, perplexity: false, google_aio: false },
]

const COMPETITORS = [
    { domain: 'seo-tool-vergleich.de', share: 18.4, platforms: 4 },
    { domain: 'toolstack.io', share: 14.1, platforms: 3 },
    { domain: 'aiseo-guide.com', share: 9.7,  platforms: 2 },
    { domain: 'rankwatch.net', share: 6.2,  platforms: 3 },
]

const CORRELATION = [
    { keyword: 'seo tool', seoPos: 4, geo: true, status: 'Beides', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { keyword: 'website audit', seoPos: 12, geo: false, status: 'Nur SEO', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { keyword: 'generative engine optimization', seoPos: null, geo: true,  status: 'Nur KI', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { keyword: 'ai seo audit', seoPos: null, geo: false, status: 'Beides fehlt', color: 'text-slate-500 bg-white/5 border-white/10' },
]

const SUGGESTIONS = [
    { keyword: 'seo tool', vol: 516 },
    { keyword: 'generative engine optimization', vol: 240 },
    { keyword: 'llms.txt einrichten', vol: 88 },
    { keyword: 'website audit', vol: 17 },
]

const TABS = [
    { id: 'overview',    label: 'Übersicht',                   icon: LayoutDashboard },
    { id: 'competitors', label: 'Wettbewerber',                 icon: Users },
    { id: 'correlation', label: 'SEO-Ranking + KI-Erwähnungen', icon: GitCompare },
    { id: 'suggestions', label: 'Keywords vorschlagen',         icon: Lightbulb },
]

const BENEFITS = [
    {
        icon: Users, color: '#22d3ee',
        title: 'Share of Voice',
        desc: 'Sieh genau, welche anderen Domains KI-Modelle neben dir zitieren — und auf welcher Plattform und für welches Keyword genau.',
    },
    {
        icon: RefreshCw, color: '#a78bfa',
        title: 'Wöchentlich automatisch',
        desc: 'Claude, ChatGPT, Perplexity und Google AI Overview werden jede Woche automatisch geprüft — mit echten Empfehlungsfragen, nicht synthetischen Tests.',
    },
    {
        icon: GitCompare, color: '#34d399',
        title: 'SEO + KI-Sichtbarkeit',
        desc: 'Rankst du bei Google, wirst aber nie von KI genannt — oder umgekehrt? Nur möglich, weil beide Datenquellen im selben System liegen.',
    },
    {
        icon: Lightbulb, color: '#fbbf24',
        title: 'Echtes AI-Suchvolumen',
        desc: 'Keyword-Vorschläge basierend auf echtem KI-Anfrage-Volumen, nicht nur auf klassischem Google-Suchvolumen.',
    },
]

function OverviewPanel() {
    return (
        <div>
            <div className="flex items-center gap-5 px-5 pt-4 pb-4 flex-wrap border-b border-white/[0.05]">
                <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-500">Visibility</span>
                    <span className="text-lg font-bold text-white">12/30</span>
                    <span className="inline-flex items-center gap-0.5 text-emerald-400 text-xs font-bold"><ArrowUp className="w-3.5 h-3.5" strokeWidth={2.5} />3</span>
                </div>
                <div className="w-px h-7 bg-white/10" />
                <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-500">Position</span>
                    <span className="text-lg font-bold text-white">3/5</span>
                </div>
                <div className="ml-auto flex gap-2 items-end h-10">
                    {[30, 45, 38, 55, 48, 62, 58, 70].map((h, i) => (
                        <div key={i} className="w-2 rounded-sm bg-violet-500/40" style={{ height: `${h}%` }} />
                    ))}
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/[0.05]">
                            <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Keyword</th>
                            {PLATFORMS.map(p => (
                                <th key={p} className={`px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap ${PLATFORM_META[p].color}`}>{PLATFORM_META[p].label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {MENTIONS.map((m, i) => (
                            <tr key={i} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                                <td className="px-5 py-3.5"><span className="text-sm text-slate-200">{m.keyword}</span></td>
                                {PLATFORMS.map(p => (
                                    <td key={p} className="px-4 py-3.5">
                                        {m[p]
                                            ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><Check className="w-2.5 h-2.5" />Ja</span>
                                            : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/5 text-slate-500 border border-white/10"><X className="w-2.5 h-2.5" />Nein</span>}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default function GeoTrackingTeaser() {
    return (
        <section className="relative pt-2 sm:pt-6 pb-8 sm:pb-28 bg-[#080b14] overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/50 overflow-hidden mb-8"
                >
                    <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/40" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/40" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                            <div className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-md px-3 py-1.5 text-xs text-slate-600 flex items-center gap-2">
                                <Globe className="w-3 h-3 text-slate-700" />
                                sitecheckai.dev/geo/dashboard
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                            <RefreshCw className="w-3 h-3" />
                            Mo, 09. Jun. · auto
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05] bg-white/[0.01]">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/15 flex items-center justify-center">
                                <Globe className="w-4 h-4 text-violet-400" />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-white">meine-website.de</div>
                                <div className="text-[11px] text-slate-600">30 Keywords · 4 Plattformen · wöchentlich</div>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-xs text-violet-300 font-semibold">
                            <RefreshCw className="w-3 h-3" />
                            Jetzt prüfen
                        </div>
                    </div>

                    <div className="flex items-center gap-0 border-b border-white/[0.05] overflow-x-auto">
                        {TABS.map((t, i) => (
                            <div key={t.id}
                                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all cursor-default ${
                                    i === 0
                                        ? 'text-violet-400 border-violet-400 bg-violet-500/[0.04]'
                                        : 'text-slate-500 border-transparent'
                                }`}>
                                <t.icon className="w-3.5 h-3.5" />
                                {t.label}
                            </div>
                        ))}
                    </div>

                    <OverviewPanel />

                    {/* Footer bar */}
                    <div className="px-5 py-3 border-t border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                        <span className="text-[11px] text-slate-700">5 von 30 Keywords · meine-website.de · AuditAI KI-Sichtbarkeit</span>
                        <span className="text-[11px] text-violet-600 font-medium cursor-default">Alle 30 anzeigen →</span>
                    </div>
                </motion.div>

                {/* Feature mini-cards row showing the other 3 tabs */}
                <div className="grid sm:grid-cols-3 gap-4 mb-16">
                    {/* Wettbewerber */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                        className="bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-white/[0.05] flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-cyan-400" />
                            <h3 className="text-sm font-semibold text-white">Share of Voice</h3>
                            <span className="ml-auto text-[10px] text-cyan-500/60 font-semibold uppercase tracking-wide">Wettbewerber</span>
                        </div>
                        <div className="divide-y divide-white/[0.04]">
                            {COMPETITORS.map((c, i) => (
                                <div key={i} className="px-4 py-2.5 flex items-center justify-between gap-3">
                                    <span className="text-xs text-slate-300 truncate">{c.domain}</span>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="text-[10px] text-slate-500">{c.platforms} Plattf.</span>
                                        <span className="text-[10px] text-violet-400 font-semibold">{c.share}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* SEO-Ranking + KI-Erwähnung */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.22 }}
                        className="bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-white/[0.05] flex items-center gap-2">
                            <GitCompare className="w-3.5 h-3.5 text-emerald-400" />
                            <h3 className="text-sm font-semibold text-white">SEO + KI-Erwähnung</h3>
                        </div>
                        <div className="divide-y divide-white/[0.04]">
                            {CORRELATION.map((c, i) => (
                                <div key={i} className="px-4 py-2.5 flex items-center justify-between gap-3">
                                    <span className="text-xs text-slate-300 truncate">{c.keyword}</span>
                                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border shrink-0 ${c.color}`}>{c.status}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Keywords vorschlagen */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.29 }}
                        className="bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-white/[0.05] flex items-center gap-2">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                            <h3 className="text-sm font-semibold text-white">Keywords vorschlagen</h3>
                            <span className="ml-auto text-[10px] text-amber-500/60 font-semibold uppercase tracking-wide">AI-Volumen</span>
                        </div>
                        <div className="divide-y divide-white/[0.04]">
                            {SUGGESTIONS.map((s, i) => (
                                <div key={i} className="px-4 py-2.5 flex items-center justify-between gap-3">
                                    <span className="text-xs text-slate-300 truncate">{s.keyword}</span>
                                    <span className="text-[10px] text-cyan-400 font-semibold shrink-0">{s.vol.toLocaleString('de-DE')} KI-Suchen/Mo.</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Benefits + CTA */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                    {BENEFITS.map((b, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5"
                        >
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                                style={{ background: b.color + '15', border: `1px solid ${b.color}25` }}>
                                <b.icon className="w-4.5 h-4.5" style={{ color: b.color }} strokeWidth={1.8} />
                            </div>
                            <h3 className="text-sm font-semibold text-white mb-1.5">{b.title}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center gap-3">
                    <Link href="/geo/pricing"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20">
                        KI-Sichtbarkeit tracken
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-sm font-semibold rounded-xl transition-all duration-200">
                        <Zap className="w-4 h-4 text-cyan-400" />
                        Audit kostenlos testen
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
