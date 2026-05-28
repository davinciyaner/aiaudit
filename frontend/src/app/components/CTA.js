'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Check, AlertTriangle, Code2, Lock, Eye, Wifi, Database, Bug, Terminal } from 'lucide-react'
import Link from 'next/link'

const SECURITY_RISKS = [
    { icon: Code2, title: 'Fehlende Security Headers', severity: 'Critical', severityColor: '#ef4444', desc: 'KI-Assistenten schreiben selten CSP, HSTS oder X-Frame-Options. Das Ergebnis: XSS, Clickjacking und MIME-Sniffing — Angriffe die Nutzerdaten stehlen.', example: 'Fehlende CSP, HSTS, X-Frame-Options' },
    { icon: Eye, title: 'Server-Fingerprinting', severity: 'High', severityColor: '#f59e0b', desc: 'Dein Webserver verrät seine Version im Response-Header. Angreifer scannen das automatisch und nutzen bekannte Exploits.', example: 'Server: Vercel / nginx/1.18.0' },
    { icon: Database, title: 'Keine Input-Sanitization', severity: 'Critical', severityColor: '#ef4444', desc: 'Vibe-Code verbindet oft direkt Frontend-Input mit DB-Queries. SQL-Injection öffnet vollständigen Datenbankzugriff.', example: 'req.body.id direkt in DB-Query' },
    { icon: Wifi, title: 'Mixed Content', severity: 'High', severityColor: '#f59e0b', desc: 'HTTPS-Seiten mit HTTP-Ressourcen entwerten das SSL-Zertifikat. Browser zeigen Warnungen, Google rankt schlechter.', example: '<img src="http://..."> auf HTTPS-Seite' },
    { icon: Lock, title: 'Schwache Sessions', severity: 'High', severityColor: '#f59e0b', desc: 'KI generiert Sessions ohne Secure/HttpOnly Flags. Sessions können per Cookie-Theft oder CSRF gekapert werden.', example: 'Cookie ohne Secure; HttpOnly' },
    { icon: Bug, title: 'Exponierte Fehler-Details', severity: 'Medium', severityColor: '#3b82f6', desc: 'Standard-Error-Handler geben Stacktraces und Dateistrukturen preis. Das ist eine Roadmap für Angreifer.', example: 'Stack trace im HTTP Response sichtbar' },
]

export default function CTA() {
    return (
        <>
            {/* Security Risks Section */}
            <section id="security" className="relative py-32 bg-[#05080f]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent" />
                <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-medium mb-6">
                            <AlertTriangle className="w-3.5 h-3.5" /> Was KI-Assistenten übersehen
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight tracking-tight">
                            Vibe-Code geht live.<br />
                            <span className="text-red-400">Sicherheitslücken auch.</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            ChatGPT, Claude und Cursor schreiben Code der funktioniert - aber sie denken nicht wie ein Angreifer. Diese Risiken entstehen automatisch wenn du eine Website schnell deployst.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {SECURITY_RISKS.map((risk, i) => (
                            <motion.div key={i}
                                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                        className="group bg-white/[0.02] border border-white/[0.06] hover:border-red-500/20 rounded-2xl p-6 transition-all duration-300">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: risk.severityColor + '15', border: `1px solid ${risk.severityColor}25` }}>
                                        <risk.icon className="w-5 h-5" style={{ color: risk.severityColor }} strokeWidth={1.8} />
                                    </div>
                                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: risk.severityColor + '15', color: risk.severityColor }}>{risk.severity}</span>
                                </div>
                                <h3 className="font-semibold text-white text-sm mb-2">{risk.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed mb-4">{risk.desc}</p>
                                <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] rounded-lg border border-white/5">
                                    <Terminal className="w-3 h-3 text-slate-600 flex-shrink-0" />
                                    <code className="text-[10px] text-slate-500 font-mono">{risk.example}</code>
                                </div>
                                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-emerald-500">
                                    <Check className="w-3 h-3" strokeWidth={3} /> AuditAI erkennt das automatisch
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
                        <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600/80 to-violet-600/80 hover:from-red-500/80 hover:to-violet-500/80 text-white font-semibold rounded-2xl transition-all text-sm shadow-lg">
                            Meine Website auf Sicherheitslücken prüfen
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-32 overflow-hidden bg-[#05080f]">
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.10), transparent)' }} />
                <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="h-px w-20 bg-gradient-to-r from-transparent to-violet-500/50" />
                            <div className="w-2 h-2 rounded-full bg-violet-500" />
                            <div className="h-px w-20 bg-gradient-to-l from-transparent to-violet-500/50" />
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                            Deine nächste Website<br />wird sicher live gehen.
                        </h2>
                        <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
                            Kein Account nötig. URL eingeben, 60 Sekunden warten, vollständigen Report herunterladen.
                        </p>
                        <Link href="/dashboard" className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-2xl transition-all duration-200 shadow-2xl shadow-violet-500/25 hover:-translate-y-0.5 text-base">
                            Website jetzt kostenlos prüfen
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <div className="flex items-center justify-center gap-6 mt-8 text-xs text-slate-600">
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