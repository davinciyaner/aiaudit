'use client'
import { motion } from 'framer-motion'
import { TrendingDown, AlertTriangle, RefreshCw, ArrowRight, Clock, BarChart2, ShieldOff, Zap } from 'lucide-react'
import Link from 'next/link'

const STATS = [
    {
        value: '91%',
        label: 'aller Google-Klicks landen auf Seite 1',
        sub: 'Seite 2 existiert für deine Kunden nicht.',
        color: '#ef4444',
    },
    {
        value: '500+',
        label: 'Algorithmus-Updates pro Jahr',
        sub: 'Was letzten Monat funktioniert hat, schadet dir vielleicht heute.',
        color: '#f59e0b',
    },
    {
        value: '53%',
        label: 'der Nutzer verlassen Seiten nach 3 Sekunden',
        sub: 'Ohne Audit weißt du nicht, ob du betroffen bist.',
        color: '#ef4444',
    },
]

const DECAY_ITEMS = [
    {
        icon: TrendingDown,
        title: 'Rankings fallen ohne Vorwarnung',
        desc: 'Google aktualisiert seinen Algorithmus hunderte Male im Jahr. Jede Änderung kann deine Position verschieben — du bekommst keine E-Mail dazu.',
        color: '#ef4444',
    },
    {
        icon: ShieldOff,
        title: 'Neue Seiten mit SEO-Fehlern gehen live',
        desc: 'Jeder Deploy kann neue H1-Tags, fehlende Meta-Descriptions oder kaputte Canonicals einführen. Kein Mensch prüft das manuell bei jedem Update.',
        color: '#f59e0b',
    },
    {
        icon: Clock,
        title: 'Konkurrenten optimieren — du stehst still',
        desc: 'Deine Mitbewerber prüfen ihre Seiten regelmäßig und schließen Lücken. Ohne Monitoring verlierst du Positionen, auch wenn du nichts falsch machst.',
        color: '#f59e0b',
    },
    {
        icon: BarChart2,
        title: 'Fixes ohne Monitoring sind raten',
        desc: 'Du optimierst etwas und hoffst, dass es hilft. Ohne regelmäßige Audits siehst du nicht, ob deine Änderungen tatsächlich wirken oder ob neue Probleme entstehen.',
        color: '#6366f1',
    },
]

export default function WhyAudit() {
    return (
        <section className="relative py-20 md:py-32 bg-[#05080f] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-red-950/8 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(239,68,68,0.04) 0%, transparent 70%)' }} />

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-medium mb-6">
                        <AlertTriangle className="w-3.5 h-3.5" /> Warum ein einmaliger Test nicht reicht
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold mb-5 leading-tight tracking-tight">
                        Deine Rankings verfallen.<br />
                        <span className="text-red-400">Jeden Monat.</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        Ein SEO-Test ist kein Einmalevent. Google ändert sich ständig, deine Seite ändert sich ständig - und jede Änderung kann neue Probleme einführen, die du nicht siehst.
                    </p>
                </motion.div>

                {/* Stats */}
                <div className="grid sm:grid-cols-3 gap-5 mb-20">
                    {STATS.map((s, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                            <div className="text-4xl sm:text-5xl font-black mb-3" style={{ color: s.color }}>{s.value}</div>
                            <div className="text-sm font-semibold text-white mb-2 leading-snug">{s.label}</div>
                            <div className="text-xs text-slate-500 leading-relaxed">{s.sub}</div>
                        </motion.div>
                    ))}
                </div>

                {/* What goes wrong without audits */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
                    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-3 tracking-tight">
                        Was passiert, <span className="text-slate-500">wenn du</span> nicht <span className="text-slate-500">prüfst</span>
                    </h3>
                    <p className="text-slate-300 text-center text-sm mb-10 max-w-xl mx-auto">
                        Deine Website ist kein statisches Dokument. Sie verändert sich mit jedem Deploy, jedem Inhalt, jedem Update — und nicht immer zum Besseren.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {DECAY_ITEMS.map((item, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                className="flex gap-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 sm:p-6">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                                    style={{ background: item.color + '15', border: `1px solid ${item.color}25` }}>
                                    <item.icon className="w-5 h-5" style={{ color: item.color }} strokeWidth={1.8} />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white mb-1.5">{item.title}</div>
                                    <div className="text-xs text-slate-500 leading-relaxed">{item.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Pro CTA */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="relative overflow-hidden rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-950/40 to-[#05080f] p-8 sm:p-12">
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                        <div className="flex-1 text-center lg:text-left">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                                Während deine Konkurrenz schläft,<br className="hidden sm:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400"> weißt du genau wo du stehst.</span>
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Mit AuditAI Pro hast du 10 vollständige SEO-Audits pro Monat — mit KI-Bericht, PDF-Export und vollständigem Audit-Verlauf. Du prüfst wenn du willst, so oft du willst.
                            </p>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 justify-center lg:justify-start">
                                {['10 Audits pro Monat', 'KI-Bericht mit konkreten Fixes', 'PDF-Export', 'Audit-Verlauf'].map(f => (
                                    <div key={f} className="flex items-center gap-1.5 text-xs text-slate-400">
                                        <RefreshCw className="w-3 h-3 text-violet-400" /> {f}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-3 shrink-0">
                            <div className="text-center mb-1">
                                <div className="text-4xl font-black text-white">29€</div>
                                <div className="text-xs text-slate-500 mt-1">pro Monat · jederzeit kündbar</div>
                            </div>
                            <Link href="/pricing"
                                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/25 hover:-translate-y-0.5 text-sm whitespace-nowrap">
                                Jetzt Pro holen
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="/dashboard" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
                                Erst kostenlos testen →
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}