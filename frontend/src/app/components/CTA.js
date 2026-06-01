'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Check, AlertTriangle, Code2, Lock, Eye, Wifi, Database, Bug, Terminal } from 'lucide-react'
import Link from 'next/link'

const SECURITY_RISKS = [
    { icon: Code2, title: 'Fehlende Security Headers', severity: 'Critical', severityColor: '#ef4444', desc: 'CSP, HSTS und X-Frame-Options fehlen fast immer in KI-generiertem Code. Das Ergebnis: XSS, Clickjacking und MIME-Sniffing.', example: 'Fehlende CSP, HSTS, X-Frame-Options' },
    { icon: Eye, title: 'Server-Fingerprinting', severity: 'High', severityColor: '#f59e0b', desc: 'Dein Webserver verrät seine Version im Response-Header. Angreifer scannen das automatisch und nutzen bekannte Exploits.', example: 'Server: nginx/1.18.0' },
    { icon: Database, title: 'Keine Input-Sanitization', severity: 'Critical', severityColor: '#ef4444', desc: 'Vibe-Code verbindet oft direkt Frontend-Input mit DB-Queries. SQL-Injection öffnet vollständigen Datenbankzugriff.', example: 'req.body.id direkt in DB-Query' },
    { icon: Wifi, title: 'Mixed Content', severity: 'High', severityColor: '#f59e0b', desc: 'HTTP-Ressourcen auf HTTPS-Seiten entwerten das SSL-Zertifikat. Browser zeigen Warnungen, Google rankt schlechter.', example: '<img src="http://..."> auf HTTPS' },
    { icon: Lock, title: 'Schwache Sessions', severity: 'High', severityColor: '#f59e0b', desc: 'KI generiert Sessions ohne Secure/HttpOnly Flags. Diese können per Cookie-Theft oder CSRF gekapert werden.', example: 'Cookie ohne Secure; HttpOnly' },
    { icon: Bug, title: 'Exponierte Fehler-Details', severity: 'Medium', severityColor: '#3b82f6', desc: 'Standard-Error-Handler geben Stacktraces und Dateistrukturen preis — eine Roadmap für Angreifer.', example: 'Stack trace im HTTP Response' },
]

export default function CTA() {
    return (
        <>
            {/* Security Section */}
            <section id="security" className="relative py-16 md:py-28 bg-[#05080f]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent" />
                <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-medium mb-5">
                            <AlertTriangle className="w-3.5 h-3.5" /> Was KI-Assistenten übersehen
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
                            Vibe-Code geht live.<br />
                            <span className="text-red-400">Sicherheitslücken auch.</span>
                        </h2>
                        <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
                            ChatGPT und Claude schreiben Code der funktioniert — aber nicht Code der sicher ist. Diese Risiken entstehen automatisch.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {SECURITY_RISKS.map((risk, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                                className="bg-white/[0.02] border border-white/[0.06] hover:border-red-500/20 rounded-2xl p-5 transition-all duration-300">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ background: risk.severityColor + '15', border: `1px solid ${risk.severityColor}25` }}>
                                        <risk.icon className="w-5 h-5" style={{ color: risk.severityColor }} strokeWidth={1.8} />
                                    </div>
                                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                                        style={{ background: risk.severityColor + '15', color: risk.severityColor }}>{risk.severity}</span>
                                </div>
                                <h3 className="font-semibold text-white text-sm mb-2">{risk.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed mb-4">{risk.desc}</p>
                                <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] rounded-lg border border-white/5">
                                    <Terminal className="w-3 h-3 text-slate-600 shrink-0" />
                                    <code className="text-[10px] text-slate-500 font-mono truncate">{risk.example}</code>
                                </div>
                                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-emerald-500">
                                    <Check className="w-3 h-3" strokeWidth={3} /> AuditAI erkennt das automatisch
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10 sm:mt-12 flex justify-center">
                        <Link href="/dashboard"
                            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600/80 to-violet-600/80 hover:from-red-500/80 hover:to-violet-500/80 text-white font-semibold rounded-2xl transition-all text-sm shadow-lg">
                            Meine Website auf Sicherheitslücken prüfen
                            <ArrowRight className="w-4 h-4 shrink-0" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-16 md:py-28 overflow-hidden bg-[#05080f]">
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.10), transparent)' }} />
                <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-violet-500/50" />
                            <div className="w-2 h-2 rounded-full bg-violet-500" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-violet-500/50" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight tracking-tight">
                            Deine nächste Website<br />wird sicher live gehen.
                        </h2>
                        <p className="text-base sm:text-lg text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
                            Kein Account nötig. URL eingeben, 60 Sekunden warten, vollständigen Report herunterladen.
                        </p>
                        <Link href="/dashboard"
                            className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 sm:py-5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-2xl transition-all duration-200 shadow-2xl shadow-violet-500/25 text-sm sm:text-base">
                            Website jetzt kostenlos prüfen
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                        </Link>
                        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-slate-600">
                            {['Kein Account', 'Kostenlos starten', 'PDF-Export inklusive'].map(t => (
                                <div key={t} className="flex items-center gap-1.5">
                                    <Check className="w-3 h-3" strokeWidth={3} /> {t}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}