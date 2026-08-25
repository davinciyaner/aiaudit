'use client'
import { motion } from 'framer-motion'
import { TrendingDown, ShieldOff, Clock, BarChart2 } from 'lucide-react'

const STATS = [
    {
        value: '27,6%',
        label: 'aller Klicks gehen an Platz 1 der Google-Suche',
        sub: 'Seite 2 existiert für deine Kunden praktisch nicht.',
        source: { label: 'Backlinko-Analyse von 4 Mio. Google-Suchergebnissen', url: 'https://backlinko.com/google-ctr-stats' },
    },
    {
        value: '3.200+',
        label: 'Änderungen an Googles Suchsystemen pro Jahr',
        sub: 'Was gestern funktioniert hat, schadet dir vielleicht heute.',
        source: { label: 'Google Search Central', url: 'https://developers.google.com/search/blog/2023/11/q-and-a-on-search-updates' },
    },
    {
        value: '53%',
        label: 'verlassen Seiten nach 3 Sekunden',
        sub: 'Ohne Audit weißt du nicht, ob du betroffen bist.',
        source: { label: 'Google: "The Need for Mobile Speed"', url: 'https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/' },
    },
]

const DECAY_ITEMS = [
    {
        icon: TrendingDown,
        title: 'Rankings fallen ohne Vorwarnung',
        desc: 'Google nimmt laut eigenen Angaben tausende Änderungen an seinen Suchsystemen pro Jahr vor. Jede Änderung kann deine Position verschieben — du bekommst keine Benachrichtigung.',
    },
    {
        icon: ShieldOff,
        title: 'Neue Seiten gehen mit Fehlern live',
        desc: 'Jeder Deploy kann fehlende Meta-Descriptions oder kaputte Canonicals einführen. Das passiert schneller als du denkst.',
    },
    {
        icon: Clock,
        title: 'Konkurrenten optimieren — du stehst still',
        desc: 'Deine Mitbewerber prüfen ihre Seiten regelmäßig. Ohne Monitoring verlierst du Positionen, auch wenn du selbst nichts falsch machst.',
    },
    {
        icon: BarChart2,
        title: 'Fixes ohne Kontrolle sind raten',
        desc: 'Du optimierst etwas und hoffst, dass es hilft. Ohne regelmäßige Audits siehst du nicht, ob deine Änderungen wirken.',
    },
]

export default function WhyAudit() {
    return (
        <section className="relative py-16 md:py-28 bg-[var(--bg-base)] overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight tracking-tight">
                        Deine Rankings verfallen. <span className="text-slate-500">Jeden Monat.</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
                        Google ändert sich ständig, deine Seite auch — und jede Änderung kann neue Probleme einführen, die du nicht siehst.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14 sm:mb-20">
                    {STATS.map((s, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-8">
                            <div className="text-4xl sm:text-5xl font-black shrink-0 text-white">{s.value}</div>
                            <div>
                                <div className="text-sm font-semibold text-white sm:mt-3 sm:mb-2 leading-snug">{s.label}</div>
                                <div className="text-xs text-slate-500 leading-relaxed mt-0.5">{s.sub}</div>
                                <a href={s.source.url} target="_blank" rel="noopener noreferrer"
                                    className="block text-[10px] text-slate-400 hover:text-slate-300 underline underline-offset-2 mt-2 transition-colors">
                                    Quelle: {s.source.label} ↗
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-3 tracking-tight">
                        Was passiert, wenn du nicht prüfst
                    </h3>
                    <p className="text-slate-400 text-center text-sm mb-8 sm:mb-10 max-w-lg mx-auto leading-relaxed">
                        Deine Website verändert sich mit jedem Deploy, jedem Inhalt, jedem Update — nicht immer zum Besseren.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                        {DECAY_ITEMS.map((item, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                className="flex gap-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 sm:p-6">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-violet-500/10 border border-violet-500/20">
                                    <item.icon className="w-5 h-5 text-violet-300" strokeWidth={1.8} />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white mb-1.5">{item.title}</div>
                                    <div className="text-xs text-slate-500 leading-relaxed">{item.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
