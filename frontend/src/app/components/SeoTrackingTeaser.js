'use client'
import { motion } from 'framer-motion'
import {
    TrendingUp, TrendingDown, Minus, ArrowRight, Bell,
    RefreshCw, Search, Globe, BarChart2, Zap, Lightbulb,
    Users, Link2, ChevronUp, ChevronDown,
} from 'lucide-react'
import Link from 'next/link'

// ─── Mock data ────────────────────────────────────────────────────────────────

const RANKINGS = [
    { keyword: 'seo test kostenlos',     pos: 3,  prev: 7,  vol: '8.1K', url: 'sitecheckai.dev' },
    { keyword: 'website audit tool',     pos: 11, prev: 11, vol: '4.3K', url: 'sitecheckai.dev/audit' },
    { keyword: 'core web vitals check',  pos: 6,  prev: 14, vol: '2.7K', url: 'sitecheckai.dev' },
    { keyword: 'seo analyse online',     pos: 18, prev: 9,  vol: '5.2K', url: 'sitecheckai.dev/blog/seo' },
    { keyword: 'meta description prüfen',pos: 2,  prev: 5,  vol: '1.9K', url: 'sitecheckai.dev' },
    { keyword: 'lighthouse alternative', pos: 7,  prev: 7,  vol: '3.4K', url: 'sitecheckai.dev' },
]

const IDEAS = [
    { keyword: 'seo check tool kostenlos', vol: '12.4K', comp: 'HIGH',   cpc: '2.40' },
    { keyword: 'website geschwindigkeit',  vol: '6.8K',  comp: 'MEDIUM', cpc: '1.10' },
    { keyword: 'google ranking prüfen',    vol: '5.2K',  comp: 'MEDIUM', cpc: '0.90' },
    { keyword: 'meta tags generator',      vol: '3.7K',  comp: 'LOW',    cpc: '0.60' },
    { keyword: 'h1 tag prüfen',            vol: '2.1K',  comp: 'LOW',    cpc: '0.40' },
]

const COMPETITORS = [
    { domain: 'seobility.net',     shared: 142, top10: 89,  top3: 31 },
    { domain: 'seorch.de',         shared: 118, top10: 74,  top3: 22 },
    { domain: 'webpagetest.org',   shared: 97,  top10: 61,  top3: 18 },
    { domain: 'pagespeed.web.dev', shared: 84,  top10: 52,  top3: 14 },
    { domain: 'sistrix.de',        shared: 63,  top10: 41,  top3: 9  },
]

const BACKLINKS = [
    { label: 'Backlinks gesamt',  value: '14.382', color: 'text-white' },
    { label: 'Referring Domains', value: '892',    color: 'text-emerald-400' },
    { label: 'Dofollow',          value: '11.210', color: 'text-emerald-400' },
    { label: 'Nofollow',          value: '3.172',  color: 'text-slate-400' },
    { label: 'Referring IPs',     value: '741',    color: 'text-teal-400' },
    { label: 'Spam Score',        value: '4%',     color: 'text-emerald-400' },
]

const TABS = [
    { id: 'rankings',     label: 'Rankings',      icon: TrendingUp },
    { id: 'ideas',        label: 'Keyword-Ideen', icon: Lightbulb },
    { id: 'competitors',  label: 'Konkurrenten',  icon: Users },
    { id: 'backlinks',    label: 'Backlinks',      icon: Link2 },
]

const BENEFITS = [
    {
        icon: RefreshCw, color: '#7c3aed',
        title: 'Wöchentlich automatisch',
        desc: 'Deine Rankings werden jeden Montag automatisch für alle Keywords aktualisiert — ohne manuellen Aufwand.',
    },
    {
        icon: Lightbulb, color: '#f59e0b',
        title: 'Keyword-Ideen & Volumen',
        desc: 'Suchvolumen, Wettbewerbsstärke und CPC für deine Keywords — plus 20 neue Ideen auf Knopfdruck.',
    },
    {
        icon: Users, color: '#06b6d4',
        title: 'Konkurrenzanalyse',
        desc: 'Sieh welche Domains für deine Keywords ranken, wie viele gemeinsame Keywords ihr habt und wo sie stärker sind.',
    },
    {
        icon: Bell, color: '#10b981',
        title: 'Backlinks & Alerts',
        desc: 'Backlink-Profil deiner Domain auf einen Blick. Bei starken Rankingverlusten bekommst du sofort eine E-Mail.',
    },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Delta({ pos, prev }) {
    const d = prev - pos
    if (d > 0) return (
        <span className="inline-flex items-center gap-0.5 text-emerald-400 text-xs font-bold">
            <ChevronUp className="w-3 h-3" />+{d}
        </span>
    )
    if (d < 0) return (
        <span className="inline-flex items-center gap-0.5 text-red-400 text-xs font-bold">
            <ChevronDown className="w-3 h-3" />{d}
        </span>
    )
    return <span className="text-slate-600 text-xs">—</span>
}

function PosColor(pos) {
    return pos <= 3 ? 'text-emerald-400' : pos <= 10 ? 'text-teal-400' : pos <= 30 ? 'text-amber-400' : 'text-slate-400'
}

function CompColor(c) {
    return c === 'HIGH' ? 'text-red-400' : c === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'
}

function VolumeBar({ value, max }) {
    const num = parseFloat(value) * (value.endsWith('K') ? 1000 : 1)
    const pct = Math.min((num / max) * 100, 100)
    return (
        <div className="flex items-center gap-2 min-w-0">
            <div className="w-14 h-1.5 bg-white/5 rounded-full overflow-hidden shrink-0">
                <div className="h-full bg-emerald-500/50 rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs text-slate-400 shrink-0">{value}</span>
        </div>
    )
}

// ─── Tab panels ───────────────────────────────────────────────────────────────

function RankingsPanel() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-white/[0.05]">
                        {['Keyword', 'Position', 'Änderung', 'Volumen', 'URL'].map(h => (
                            <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {RANKINGS.map((r, i) => (
                        <tr key={i} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                            <td className="px-5 py-3.5">
                                <span className="text-sm text-slate-200">{r.keyword}</span>
                            </td>
                            <td className="px-5 py-3.5">
                                <span className={`text-sm font-bold ${PosColor(r.pos)}`}>#{r.pos}</span>
                            </td>
                            <td className="px-5 py-3.5">
                                <Delta pos={r.pos} prev={r.prev} />
                            </td>
                            <td className="px-5 py-3.5">
                                <span className="text-xs text-slate-400">{r.vol}</span>
                            </td>
                            <td className="px-5 py-3.5">
                                <span className="text-xs text-slate-600 truncate block max-w-[160px]">{r.url}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function IdeasPanel() {
    const maxVol = 12400
    return (
        <div className="overflow-x-auto">
            <div className="px-5 py-2.5 mb-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500">Neue Keyword-Ideen</span>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="border-b border-white/[0.05]">
                        {['Keyword', 'Volumen/Monat', 'Wettbewerb', 'CPC'].map(h => (
                            <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {IDEAS.map((r, i) => (
                        <tr key={i} className="border-b border-white/[0.04] last:border-0 hover:bg-emerald-500/[0.03] transition-colors">
                            <td className="px-5 py-3.5">
                                <span className="text-sm text-emerald-300 font-medium">{r.keyword}</span>
                            </td>
                            <td className="px-5 py-3.5">
                                <VolumeBar value={r.vol} max={maxVol} />
                            </td>
                            <td className="px-5 py-3.5">
                                <span className={`text-xs font-semibold ${CompColor(r.comp)}`}>{r.comp}</span>
                            </td>
                            <td className="px-5 py-3.5">
                                <span className="text-xs text-slate-400">€{r.cpc}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function CompetitorsPanel() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-white/[0.05]">
                        {['#', 'Domain', 'Gemeinsame KW', 'Top 10', 'Top 3'].map(h => (
                            <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {COMPETITORS.map((c, i) => (
                        <tr key={i} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                            <td className="px-5 py-3.5"><span className="text-sm text-slate-500">{i + 1}</span></td>
                            <td className="px-5 py-3.5">
                                <span className="text-sm text-slate-200 font-medium">{c.domain}</span>
                            </td>
                            <td className="px-5 py-3.5"><span className="text-sm font-bold text-white">{c.shared}</span></td>
                            <td className="px-5 py-3.5"><span className="text-sm text-teal-400">{c.top10}</span></td>
                            <td className="px-5 py-3.5"><span className="text-sm text-emerald-400 font-semibold">{c.top3}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function BacklinksPanel() {
    return (
        <div className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {BACKLINKS.map(s => (
                    <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                        <div className="text-[11px] text-slate-600 mb-1.5">{s.label}</div>
                        <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                    </div>
                ))}
            </div>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
                <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-3">Backlink-Profil Übersicht</div>
                <div className="flex gap-2 items-end h-14">
                    {[40, 55, 48, 70, 63, 85, 78, 92, 88, 100, 94, 82].map((h, i) => (
                        <div key={i} className="flex-1 rounded-sm bg-emerald-500/30 hover:bg-emerald-500/50 transition-colors" style={{ height: `${h}%` }} />
                    ))}
                </div>
                <div className="text-[10px] text-slate-700 mt-2">Neue Backlinks — letzte 12 Monate</div>
            </div>
        </div>
    )
}


const PANELS = { rankings: RankingsPanel, ideas: IdeasPanel, competitors: CompetitorsPanel, backlinks: BacklinksPanel }

export default function SeoTrackingTeaser() {
    return (
        <section className="relative py-20 sm:py-28 bg-[#05080f] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
                        Dein Ranking,{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                            jede Woche automatisiert neu.
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
                        Statt manuell in der Google Search Console nachsehen: Rankings, Keyword-Ideen, Konkurrenten und Backlinks - alles automatisch, alles an einem Ort.
                    </p>
                </motion.div>

                {/* Dashboard mock — full width */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/50 overflow-hidden mb-8"
                >
                    {/* Browser chrome */}
                    <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/40" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/40" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                            <div className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-md px-3 py-1.5 text-xs text-slate-600 flex items-center gap-2">
                                <Globe className="w-3 h-3 text-slate-700" />
                                sitecheckai.dev/seo/dashboard
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                            <RefreshCw className="w-3 h-3" />
                            Mo, 09. Jun. · auto
                        </div>
                    </div>

                    {/* Domain header bar */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05] bg-white/[0.01]">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center">
                                <Globe className="w-4 h-4 text-emerald-400" />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-white">meine-website.de</div>
                                <div className="text-[11px] text-slate-600">500 Keywords · wöchentlich</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex gap-4 text-center">
                                {[['3', 'Top 3', 'text-emerald-400'], ['12', 'Top 10', 'text-teal-400'], ['+8', 'Gewinner', 'text-cyan-400'], ['−2', 'Verlierer', 'text-red-400']].map(([v, l, c]) => (
                                    <div key={l}>
                                        <div className={`text-sm font-bold ${c}`}>{v}</div>
                                        <div className="text-[10px] text-slate-600">{l}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-semibold">
                                <RefreshCw className="w-3 h-3" />
                                Jetzt prüfen
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-0 border-b border-white/[0.05] overflow-x-auto">
                        {TABS.map((t, i) => (
                            <div key={t.id}
                                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all cursor-default ${
                                    i === 0
                                        ? 'text-emerald-400 border-emerald-400 bg-emerald-500/[0.04]'
                                        : 'text-slate-500 border-transparent'
                                }`}>
                                <t.icon className="w-3.5 h-3.5" />
                                {t.label}
                            </div>
                        ))}
                    </div>

                    {/* Rankings table */}
                    <RankingsPanel />

                    {/* Footer bar */}
                    <div className="px-5 py-3 border-t border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                        <span className="text-[11px] text-slate-700">250 von 500 Keywords · meine-website.de · AuditAI SEO Tracking</span>
                        <span className="text-[11px] text-emerald-600 font-medium cursor-default">Alle 500 anzeigen →</span>
                    </div>
                </motion.div>

                {/* Feature mini-cards row showing the other 3 tabs */}
                <div className="grid sm:grid-cols-3 gap-4 mb-16">
                    {/* Keyword-Ideen */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                        className="bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-white/[0.05] flex items-center gap-2">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-sm font-semibold text-white">Keyword-Ideen</span>
                            <span className="ml-auto text-[10px] text-amber-500/60 font-semibold uppercase tracking-wide">20 neue</span>
                        </div>
                        <div className="divide-y divide-white/[0.04]">
                            {IDEAS.slice(0, 4).map((r, i) => (
                                <div key={i} className="px-4 py-2.5 flex items-center justify-between gap-3">
                                    <span className="text-xs text-emerald-300 truncate">{r.keyword}</span>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className={`text-[10px] font-semibold ${CompColor(r.comp)}`}>{r.comp}</span>
                                        <span className="text-[10px] text-slate-500">{r.vol}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Konkurrenten */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.22 }}
                        className="bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-white/[0.05] flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="text-sm font-semibold text-white">Konkurrenten</span>
                            <span className="ml-auto text-[10px] text-cyan-500/60 font-semibold uppercase tracking-wide">Top 10</span>
                        </div>
                        <div className="divide-y divide-white/[0.04]">
                            {COMPETITORS.slice(0, 4).map((c, i) => (
                                <div key={i} className="px-4 py-2.5 flex items-center justify-between gap-3">
                                    <span className="text-xs text-slate-300 truncate">{c.domain}</span>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="text-[10px] text-slate-500">{c.shared} KW</span>
                                        <span className="text-[10px] text-emerald-400 font-semibold">{c.top3}×T3</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Backlinks */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.29 }}
                        className="bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-white/[0.05] flex items-center gap-2">
                            <Link2 className="w-3.5 h-3.5 text-violet-400" />
                            <span className="text-sm font-semibold text-white">Backlinks</span>
                        </div>
                        <div className="p-4 grid grid-cols-2 gap-3">
                            {BACKLINKS.map(s => (
                                <div key={s.label} className="bg-white/[0.03] rounded-lg p-3">
                                    <div className="text-[10px] text-slate-600 mb-1">{s.label}</div>
                                    <div className={`text-base font-bold ${s.color}`}>{s.value}</div>
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
                            <div className="text-sm font-semibold text-white mb-1.5">{b.title}</div>
                            <div className="text-xs text-slate-500 leading-relaxed">{b.desc}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center gap-3">
                    <Link href="/seo/pricing"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20">
                        SEO Tracking starten
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-sm font-semibold rounded-xl transition-all duration-200">
                        <Zap className="w-4 h-4 text-violet-400" />
                        Audit kostenlos testen
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}