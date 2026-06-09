'use client'
import { motion } from 'framer-motion'
import { ShieldCheck, ShieldAlert } from 'lucide-react'
import Link from 'next/link'

const CHECKS = [
    { label: 'HTTPS erzwungen', detail: 'SSL-Zertifikat & HTTP zu HTTPS Redirect' },
    { label: 'HSTS', detail: 'HTTP Strict Transport Security' },
    { label: 'Content-Security-Policy', detail: 'XSS-Schutz, Script-Quellen kontrollieren' },
    { label: 'Clickjacking-Schutz', detail: 'X-Frame-Options oder CSP frame-ancestors' },
    { label: 'X-Content-Type-Options', detail: 'MIME-Sniffing verhindern' },
    { label: 'Referrer-Policy', detail: 'Datenweitergabe beim Seitenwechsel' },
    { label: 'Permissions-Policy', detail: 'Browser-APIs einschränken' },
    { label: 'Server-Header', detail: 'Keine sensiblen Serverinfos preisgeben' },
    { label: 'Mixed Content', detail: 'Kein HTTP in HTTPS-Seiten' },
    { label: 'Cookie-Sicherheit', detail: 'HttpOnly, Secure & SameSite Flags' },
    { label: 'Subresource Integrity (SRI)', detail: 'Externe Scripts mit Integrity-Hash' },
    { label: 'Cross-Origin-Opener-Policy', detail: 'Isolation gegenüber Drittseiten' },
    { label: 'Sensible Dateien', detail: '.env, .git/config, backup.sql, phpinfo.php' },
    { label: 'security.txt', detail: 'Kontakt für Sicherheitsmeldungen' },
]

const MOCK_RESULTS = [
    { label: 'HTTPS', ok: true,  severity: null,       note: 'Aktiv ✓' },
    { label: 'HSTS', ok: false, severity: 'High',      note: 'Header fehlt' },
    { label: 'CSP',  ok: false, severity: 'High',      note: 'Nicht konfiguriert' },
    { label: 'X-Frame-Options', ok: true, severity: null, note: 'DENY ✓' },
    { label: 'X-Content-Type',  ok: false, severity: 'Medium', note: 'Fehlt' },
    { label: 'Cookie-Sicherheit', ok: false, severity: 'High', note: 'SameSite fehlt' },
    { label: 'Sensible Dateien', ok: true, severity: null, note: 'Keine gefunden ✓' },
    { label: 'security.txt', ok: false, severity: 'Info', note: 'Nicht vorhanden' },
]

const SEVERITY_COLORS = {
    Critical: 'bg-red-500/15 text-red-400',
    High:     'bg-orange-500/15 text-orange-400',
    Medium:   'bg-amber-500/15 text-amber-400',
    Info:     'bg-slate-500/15 text-slate-400',
}

export default function SecuritySection() {
    return (
        <section id="security" className="relative py-20 sm:py-28 bg-[#05080f]">
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(239,68,68,0.07) 0%, transparent 70%)' }} />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-tight">
                            Sicherheitslücken, bevor{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                                Angreifer sie finden.
                            </span>
                        </h2>
                        <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
                            80 % aller Websites haben kritische Security-Header nicht gesetzt - und die Betreiber wissen es nicht. AuditAI prüft alle 14 Punkte mit Schweregrad-Bewertung.
                        </p>
                        <ul className="space-y-2.5 mb-8">
                            {CHECKS.map((c, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-[7px] shrink-0" />
                                    <span className="text-sm text-slate-300">
                                        <span className="font-medium text-white">{c.label}</span>
                                        <span className="text-slate-500"> - {c.detail}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <Link href="/dashboard"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-red-500/20">
                            Security jetzt prüfen
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                            <span className="text-sm font-semibold text-white">Security-Report</span>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/15 text-red-300 font-semibold">Score: 38/100</span>
                        </div>
                        <div className="p-5 space-y-2.5">
                            {MOCK_RESULTS.map((r, i) => (
                                <div key={i} className="flex items-center justify-between gap-3 py-1.5 border-b border-white/[0.04] last:border-0">
                                    <div className="flex items-center gap-2.5">
                                        {r.ok
                                            ? <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                                            : <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                                        }
                                        <span className="text-sm text-slate-300">{r.label}</span>
                                    </div>
                                    {r.ok
                                        ? <span className="text-xs text-emerald-400">{r.note}</span>
                                        : <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${SEVERITY_COLORS[r.severity]}`}>{r.severity}</span>
                                    }
                                </div>
                            ))}
                        </div>
                        <div className="px-5 pb-4">
                            <div className="text-[11px] text-slate-600">14 Checks - Severity: Critical / High / Medium / Info - AuditAI</div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}