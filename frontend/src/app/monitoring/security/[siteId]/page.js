'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Clock, Loader2, CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import Navbar from '../../../components/Navbar'
import toast, { Toaster } from 'react-hot-toast'

const API = process.env.NEXT_PUBLIC_API_URL

// Einfacher SVG-Linien-Chart für Antwortzeiten / Security-Score
function LineChart({ data, valueKey, color }) {
    const filtered = (data || []).filter(d => d[valueKey] != null)
    if (!filtered.length) return (
        <div className="h-28 flex items-center justify-center text-slate-600 text-sm">Noch keine Daten</div>
    )

    const values = filtered.map(d => d[valueKey])
    const min = Math.min(...values)
    const max = Math.max(...values)
    const W = 400
    const H = 80
    const pad = 8
    const flatLine = min === max

    const coords = filtered.map((d, i, arr) => {
        const x = pad + (arr.length > 1 ? (i / (arr.length - 1)) : 0.5) * (W - pad * 2)
        const y = flatLine ? H / 2 : H - pad - ((d[valueKey] - min) / (max - min)) * (H - pad * 2)
        return { x, y, d }
    })

    const points = coords.map(c => `${c.x},${c.y}`).join(' ')
    const latest = filtered[filtered.length - 1]
    const latestVal = latest[valueKey]

    return (
        <div>
            <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl font-bold" style={{ color }}>{latestVal}</span>
                {filtered.length > 1 && (
                    <span className={`text-xs font-medium ${latestVal > values[0] ? 'text-emerald-400' : latestVal < values[0] ? 'text-red-400' : 'text-slate-500'}`}>
                        {latestVal > values[0] ? '▲' : latestVal < values[0] ? '▼' : '—'} {Math.abs(latestVal - values[0])}
                    </span>
                )}
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-20" preserveAspectRatio="none">
                {filtered.length === 1 ? (
                    <circle cx={W / 2} cy={H / 2} r="4" fill={color} />
                ) : (
                    <>
                        <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
                        {coords.map((c, i) => (
                            <circle key={i} cx={c.x} cy={c.y} r="2.5" fill={color} opacity="0.6" />
                        ))}
                    </>
                )}
            </svg>
            <div className="flex justify-between text-xs text-slate-600 mt-1 px-1">
                <span>{new Date(filtered[0]?.checkedAt || filtered[0]?.scannedAt).toLocaleString('de-DE', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                {filtered.length > 1 && (
                    <span>{new Date(latest?.checkedAt || latest?.scannedAt).toLocaleString('de-DE', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                )}
            </div>
        </div>
    )
}

// Status-Bar: letzte N checks als farbige Blöcke (wie UptimeRobot)
function UptimeStatusBar({ checks }) {
    const recent = checks.slice(-90)
    if (!recent.length) return (
        <div className="text-slate-500 text-sm">Noch keine Daten</div>
    )
    const colors = { up: 'bg-emerald-500', down: 'bg-red-500', degraded: 'bg-yellow-400' }
    const titles = { up: 'Online', down: 'Offline', degraded: 'Beeinträchtigt' }

    return (
        <div className="flex gap-0.5 h-8 items-end">
            {recent.map((check, i) => (
                <div
                    key={i}
                    className={`flex-1 rounded-sm ${colors[check.status]} opacity-80 hover:opacity-100 transition-opacity`}
                    title={`${titles[check.status]} · ${new Date(check.checkedAt).toLocaleString('de-DE')}${check.responseTime ? ` · ${check.responseTime}ms` : ''}`}
                />
            ))}
        </div>
    )
}

function StatCard({ label, value, sub, color = 'text-white' }) {
    return (
        <div className="bg-white/3 border border-white/6 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">{label}</p>
            <p className={`text-xl font-bold ${color}`}>{value ?? '—'}</p>
            {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
        </div>
    )
}

function AlertItem({ alert, onResolve }) {
    const icons = { critical: XCircle, high: AlertTriangle, medium: AlertTriangle, low: AlertTriangle }
    const colors = { critical: 'text-red-400', high: 'text-orange-400', medium: 'text-yellow-400', low: 'text-slate-400' }
    const Icon = icons[alert.severity] || AlertTriangle

    return (
        <div className="flex items-start gap-3 p-3 bg-white/2 border border-white/6 rounded-xl">
            <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${colors[alert.severity]}`} />
            <div className="flex-1 min-w-0">
                <p className="text-sm text-white">{alert.message}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                    {new Date(alert.detectedAt).toLocaleString('de-DE')}
                </p>
            </div>
            <button
                onClick={() => onResolve(alert._id)}
                className="shrink-0 text-xs text-slate-600 hover:text-slate-300 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                title="Als erledigt markieren"
            >
                Schließen
            </button>
        </div>
    )
}

const ISSUE_DETAILS = [
    {
        match: ['hsts', 'strict-transport'],
        what: 'HSTS (HTTP Strict Transport Security) zwingt Browser dazu, deine Website ausschließlich über HTTPS aufzurufen — auch wenn jemand manuell "http://" eingibt.',
        consequences: 'Ohne HSTS kann ein Angreifer im gleichen Netzwerk (z.B. öffentliches WLAN) die erste HTTP-Anfrage abfangen und den Nutzer auf eine gefälschte Seite umleiten, bevor die HTTPS-Weiterleitung greift (SSL-Stripping-Angriff).',
        fix: 'Füge folgenden HTTP-Header zu deinem Server hinzu:\n\nStrict-Transport-Security: max-age=31536000; includeSubDomains\n\nBei Vercel: in vercel.json unter "headers" eintragen. Bei nginx: add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;',
    },
    {
        match: ['x-content-type-options', 'mime'],
        what: 'X-Content-Type-Options verhindert MIME-Sniffing — Browser dürfen den Dateityp einer Antwort nicht selbst raten, sondern müssen den vom Server angegebenen Typ verwenden.',
        consequences: 'Ohne diesen Header könnte ein Browser eine hochgeladene Textdatei als JavaScript interpretieren und ausführen. Das ermöglicht Cross-Site-Scripting (XSS) über scheinbar harmlose Datei-Uploads.',
        fix: 'Header hinzufügen:\n\nX-Content-Type-Options: nosniff\n\nBei Vercel (vercel.json):\n{ "headers": [{ "source": "/(.*)", "headers": [{ "key": "X-Content-Type-Options", "value": "nosniff" }] }] }',
    },
    {
        match: ['clickjacking', 'x-frame-options', 'frame'],
        what: 'X-Frame-Options verhindert, dass deine Website in einem <iframe> auf einer fremden Seite eingebettet werden kann.',
        consequences: 'Ohne diesen Schutz sind Clickjacking-Angriffe möglich: Ein Angreifer blendet deine Website unsichtbar über eine andere Seite. Nutzer klicken auf Buttons, die sie nicht sehen — z.B. "Zahlung bestätigen" oder "Account löschen".',
        fix: 'Header hinzufügen:\n\nX-Frame-Options: SAMEORIGIN\n\nOder moderner per CSP:\nContent-Security-Policy: frame-ancestors \'self\'\n\nSOMEORIGIN erlaubt Einbettung nur auf deiner eigenen Domain.',
    },
    {
        match: ['content-security-policy', 'csp'],
        what: 'Die Content Security Policy (CSP) legt fest, welche Quellen für Scripts, Styles, Bilder und andere Ressourcen auf deiner Seite erlaubt sind.',
        consequences: 'Ohne CSP kann eingeschleuster Code (z.B. durch XSS) beliebige externe Scripts laden — Passwörter, Session-Tokens und persönliche Daten deiner Nutzer können so gestohlen werden. CSP ist die wichtigste Verteidigungslinie gegen XSS-Angriffe.',
        fix: 'Starte mit einer einfachen Policy und verschärfe sie schrittweise:\n\nContent-Security-Policy: default-src \'self\'; script-src \'self\'; style-src \'self\' \'unsafe-inline\'; img-src \'self\' data: https:;\n\nTipp: Nutze report-uri.com um Verstöße zu monitoren bevor du die Policy scharf schaltest.',
    },
    {
        match: ['referrer-policy', 'referrer'],
        what: 'Referrer-Policy kontrolliert, welche URL-Informationen beim Klick auf einen Link an die Zielseite übermittelt werden.',
        consequences: 'Ohne diese Policy sehen andere Websites die vollständige URL deiner Besucher — inklusive Token in der URL (z.B. ?reset-token=abc123), internen Pfaden oder Nutzernamen. Das verletzt die Privatsphäre deiner Nutzer.',
        fix: 'Header hinzufügen:\n\nReferrer-Policy: strict-origin-when-cross-origin\n\nDas sendet nur den Domain-Namen (ohne Pfad) an externe Seiten und die vollständige URL innerhalb deiner eigenen Domain.',
    },
    {
        match: ['permissions-policy', 'permission'],
        what: 'Permissions-Policy kontrolliert, welche Browser-Features (Kamera, Mikrofon, Standort, etc.) auf deiner Website erlaubt sind.',
        consequences: 'Ohne diese Policy könnte eingeschleuster Code (z.B. über eine kompromittierte Werbeanzeige) heimlich auf Kamera oder Mikrofon des Nutzers zugreifen — ohne dass dieser es merkt.',
        fix: 'Header hinzufügen und nur benötigte Features erlauben:\n\nPermissions-Policy: camera=(), microphone=(), geolocation=(), payment=(self)\n\nLeere Klammern () bedeuten "für niemanden erlaubt". (self) bedeutet nur deine eigene Domain.',
    },
    {
        match: ['server-header', 'server header', 'verrät zu viel', 'vercel', 'nginx', 'apache'],
        what: 'Der Server-HTTP-Header verrät, welche Software und oft welche Version deinen Webserver betreibt (z.B. "nginx/1.18.0" oder "Apache/2.4.41").',
        consequences: 'Angreifer können gezielt nach bekannten Sicherheitslücken für genau diese Version suchen. Es ist vergleichbar damit, ein Namensschild mit deiner genauen Schlüsselart für Einbrecher zu tragen. Bei "Vercel" ist es weniger kritisch, da es eine verwaltete Plattform ist — kein direkter Handlungsbedarf.',
        fix: 'Bei eigenem nginx-Server:\nserver_tokens off; in der nginx.conf\n\nBei Apache:\nServerTokens Prod\nServerSignature Off\n\nBei Vercel: Nicht direkt konfigurierbar — Vercel verwaltet die Infrastruktur. Da Vercel regelmäßig gepatcht wird, ist das Risiko gering.',
    },
    {
        match: ['security.txt'],
        what: 'security.txt ist eine standardisierte Datei unter /.well-known/security.txt, die Sicherheitsforschern mitteilt, wie sie gefundene Schwachstellen bei dir melden können.',
        consequences: 'Wenn ein Sicherheitsforscher eine Lücke in deiner Website entdeckt, weiß er nicht, wie er dich erreichen soll. Im schlimmsten Fall wird die Lücke öffentlich veröffentlicht ("Full Disclosure") oder an Dritte verkauft, statt dir privat gemeldet zu werden.',
        fix: 'Erstelle die Datei /.well-known/security.txt mit folgendem Inhalt:\n\nContact: mailto:security@deinedomain.de\nExpires: 2027-12-31T23:59:59z\nPreferred-Languages: de, en\n\nBei Next.js: Datei in /public/.well-known/security.txt ablegen. Generator: securitytxt.org',
    },
    {
        match: ['mixed content', 'http in https'],
        what: 'Mixed Content bedeutet, dass auf deiner HTTPS-Seite Ressourcen (Bilder, Scripts, CSS) über unverschlüsseltes HTTP geladen werden.',
        consequences: 'Browser blockieren aktive Mixed Content (Scripts, iframes) komplett und zeigen Sicherheitswarnungen. Noch gefährlicher: HTTP-Ressourcen können von Angreifern im Netzwerk manipuliert werden — ein HTTP-Script könnte durch schadhafen Code ersetzt werden.',
        fix: 'Ändere alle HTTP-URLs auf HTTPS:\n• Bilder: <img src="https://...">\n• Scripts: <script src="https://...">\n\nBei WordPress: "Better Search Replace" Plugin nutzen oder in der DB:\nUPDATE wp_posts SET post_content = REPLACE(post_content, \'http://\', \'https://\');\n\nIn der Browser-Konsole siehst du alle Mixed-Content-Warnungen.',
    },
    {
        match: ['cookie', 'httponly', 'samesite', 'secure flag'],
        what: 'Cookies ohne Sicherheitsattribute können von Angreifern gestohlen oder missbraucht werden. Die drei wichtigen Flags sind HttpOnly, Secure und SameSite.',
        consequences: 'HttpOnly fehlt → JavaScript kann Cookies lesen (XSS-Angriff stiehlt Session). Secure fehlt → Cookie wird auch über HTTP übertragen und kann abgefangen werden. SameSite fehlt → Cross-Site-Request-Forgery (CSRF) möglich: Fremde Seiten lösen Aktionen in deinem Namen aus.',
        fix: 'Setze alle drei Flags bei Session-Cookies:\n\nSet-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict; Path=/\n\nIn Express.js:\nres.cookie("session", token, { httpOnly: true, secure: true, sameSite: "strict" })\n\nSameSite=Strict: Kein Cross-Site-Senden. SameSite=Lax: Erlaubt GET-Links von anderen Seiten (gut für normale Websites).',
    },
    {
        match: ['subresource integrity', 'sri', 'integrity'],
        what: 'Subresource Integrity (SRI) prüft ob externe Scripts und Stylesheets (z.B. von einem CDN) verändert wurden, bevor sie ausgeführt werden.',
        consequences: 'Supply-Chain-Angriff: Wird ein CDN kompromittiert, kann ein Angreifer schadhaften Code in dein jQuery, Bootstrap oder andere Libraries einschleusen. Ohne SRI wird der Code blind ausgeführt — mit SRI schlägt die Prüfung fehl und der Code wird blockiert.',
        fix: 'Füge einen integrity-Hash zu externen Scripts hinzu:\n\n<script \n  src="https://cdn.example.com/jquery.min.js"\n  integrity="sha384-HIER_DER_HASH"\n  crossorigin="anonymous">\n</script>\n\nHash generieren: srihash.org — URL eingeben, Hash kopieren. Beim nächsten CDN-Update muss der Hash aktualisiert werden.',
    },
    {
        match: ['cross-origin-opener', 'coop'],
        what: 'Cross-Origin-Opener-Policy (COOP) isoliert deinen Browser-Tab von anderen Tabs und Fenstern, die von deiner Seite geöffnet wurden.',
        consequences: 'Ohne COOP können Spectre-ähnliche Timing-Angriffe Speicherinhalte deiner Seite aus anderen Browser-Tabs auslesen. Betrifft besonders Seiten, die sensible Daten (Tokens, Passwörter) im Speicher halten.',
        fix: 'Header hinzufügen:\n\nCross-Origin-Opener-Policy: same-origin\n\nAchtung: same-origin blockiert window.opener für Popups. Falls du OAuth-Popups verwendest, nutze stattdessen:\nCross-Origin-Opener-Policy: same-origin-allow-popups',
    },
    {
        match: ['http leitet nicht auf https', 'http redirect', 'https um'],
        what: 'Deine Website antwortet auf http:// ohne automatisch auf https:// umzuleiten. Besucher, die die URL ohne "https://" eingeben, werden unverschlüsselt bedient.',
        consequences: 'Alle Daten (Formulare, Logins, Cookies) werden im Klartext übertragen und können im Netzwerk mitgelesen werden. Suchmaschinen bevorzugen außerdem HTTPS-Seiten im Ranking.',
        fix: 'Bei Vercel, Netlify oder Cloudflare ist HTTP→HTTPS-Redirect standardmäßig aktiviert — prüfe ob er deaktiviert wurde.\n\nBei nginx:\nserver {\n  listen 80;\n  return 301 https://$host$request_uri;\n}\n\nBei Apache (.htaccess):\nRewriteEngine On\nRewriteCond %{HTTPS} off\nRewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]',
    },
    {
        match: ['sensible datei', '.env', '.git', 'backup', 'phpinfo'],
        what: 'Sensible Dateien wie .env, .git/config oder backup.sql sind öffentlich über den Browser abrufbar.',
        consequences: 'Katastrophal: Angreifer erhalten direkt Datenbankpasswörter, API-Keys, Secret-Keys und ggf. den kompletten Quellcode. Das ist die häufigste Ursache für vollständige Website-Kompromittierungen.',
        fix: 'Sofortmaßnahme:\n1. Dateien vom Server entfernen\n2. Alle exponierten Passwörter und API-Keys sofort rotieren\n\nPräventiv bei nginx:\nlocation ~ /\\. { deny all; return 404; }\n\nBei Apache (.htaccess):\n<FilesMatch "(\\.env|\\.git|\\.htaccess|backup\\.sql)">\n  Order allow,deny\n  Deny from all\n</FilesMatch>',
    },
]

function getIssueDetails(message) {
    const lower = message.toLowerCase()
    return ISSUE_DETAILS.find(d => d.match.some(keyword => lower.includes(keyword))) || null
}

function IssueItem({ issue }) {
    const [open, setOpen] = useState(false)
    const details = getIssueDetails(issue.message)

    return (
        <div className="border border-white/8 rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(v => !v)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-white/3 transition-colors"
            >
                <div className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200">{issue.message}</span>
                </div>
                <span className={`text-slate-500 shrink-0 text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
            </button>

            {open && (
                <div className="border-t border-white/6 divide-y divide-white/4">
                    {details ? (
                        <>
                            <div className="px-4 py-3.5">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Was ist das?</p>
                                <p className="text-sm text-slate-300 leading-relaxed">{details.what}</p>
                            </div>
                            <div className="px-4 py-3.5 bg-red-500/3">
                                <p className="text-xs font-semibold text-red-400/70 uppercase tracking-wider mb-1.5">Folgen wenn nicht behoben</p>
                                <p className="text-sm text-slate-300 leading-relaxed">{details.consequences}</p>
                            </div>
                            <div className="px-4 py-3.5 bg-emerald-500/3">
                                <p className="text-xs font-semibold text-emerald-400/70 uppercase tracking-wider mb-1.5">So behebst du es</p>
                                <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">{details.fix}</pre>
                            </div>
                        </>
                    ) : (
                        <div className="px-4 py-3.5">
                            <p className="text-sm text-slate-400 leading-relaxed">{issue.suggestion || 'Bitte einen neuen Check starten für Lösungshinweise.'}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

function SecurityHeadersTable({ headers }) {
    if (!headers) return null
    const rows = [
        { key: 'hsts', label: 'HSTS' },
        { key: 'xContentType', label: 'X-Content-Type-Options' },
        { key: 'xFrameOptions', label: 'X-Frame-Options' },
        { key: 'csp', label: 'Content-Security-Policy' },
        { key: 'referrerPolicy', label: 'Referrer-Policy' },
        { key: 'permissionsPolicy', label: 'Permissions-Policy' },
        { key: 'coop', label: 'Cross-Origin-Opener-Policy' },
    ]
    return (
        <div className="space-y-2">
            {rows.map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-white/4 last:border-0">
                    <span className="text-sm text-slate-400">{label}</span>
                    {headers[key]
                        ? <CheckCircle className="w-4 h-4 text-emerald-400" />
                        : <XCircle className="w-4 h-4 text-red-400" />
                    }
                </div>
            ))}
        </div>
    )
}

export default function SecuritySiteDetailPage() {
    const router = useRouter()
    const { siteId } = useParams()
    const [site, setSite] = useState(null)
    const [uptimeData, setUptimeData] = useState(null)
    const [scans, setScans] = useState([])
    const [alerts, setAlerts] = useState([])
    const [loading, setLoading] = useState(true)
    const [checking, setChecking] = useState(false)
    const [hoursFilter, setHoursFilter] = useState(24)
    const [alertSettings, setAlertSettings] = useState({ critical: true, medium: false, low: false })
    const [savingAlerts, setSavingAlerts] = useState(false)

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    const fetchData = useCallback(async () => {
        try {
            const [siteRes, uptimeRes, scansRes, alertsRes] = await Promise.all([
                fetch(`${API}/security-monitoring/sites/${siteId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch(`${API}/security-monitoring/sites/${siteId}/uptime?hours=${hoursFilter}`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch(`${API}/security-monitoring/sites/${siteId}/scans`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch(`${API}/security-monitoring/alerts`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ])
            if (siteRes.status === 401) { router.push('/login'); return }
            if (!siteRes.ok) { router.push('/monitoring/security'); return }

            const [siteJson, uptimeJson, scansJson, alertsJson] = await Promise.all([
                siteRes.json(), uptimeRes.json(), scansRes.json(), alertsRes.json(),
            ])
            setSite(siteJson.site)
            if (siteJson.site?.alertSettings) setAlertSettings(siteJson.site.alertSettings)
            setUptimeData(uptimeJson)
            setScans(scansJson.scans || [])
            const siteAlerts = (alertsJson.alerts || []).filter(a => a.siteId?._id === siteId || a.siteId === siteId)
            setAlerts(siteAlerts)
        } catch {
            toast.error('Fehler beim Laden')
        } finally {
            setLoading(false)
        }
    }, [siteId, token, router, hoursFilter])

    useEffect(() => { fetchData() }, [fetchData])

    const handleManualCheck = async () => {
        setChecking(true)
        try {
            const res = await fetch(`${API}/security-monitoring/sites/${siteId}/check`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            })
            if (res.status === 429) {
                const data = await res.json()
                toast.error(data.error)
                return
            }
            if (!res.ok) throw new Error()
            toast.success('Check abgeschlossen')
            await fetchData()
        } catch {
            toast.error('Check fehlgeschlagen')
        } finally {
            setChecking(false)
        }
    }

    const handleResolveAlert = async (alertId) => {
        try {
            const res = await fetch(`${API}/security-monitoring/alerts/${alertId}/resolve`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` },
            })
            if (!res.ok) throw new Error()
            setAlerts(prev => prev.filter(a => a._id !== alertId))
            toast.success('Alert geschlossen')
        } catch {
            toast.error('Konnte Alert nicht schließen')
        }
    }

    const toggleAlertSetting = async (key) => {
        const next = { ...alertSettings, [key]: !alertSettings[key] }
        setAlertSettings(next)
        setSavingAlerts(true)
        try {
            const res = await fetch(`${API}/security-monitoring/sites/${siteId}/alert-settings`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(next),
            })
            if (!res.ok) throw new Error()
        } catch {
            setAlertSettings(alertSettings)
            toast.error('Einstellungen konnten nicht gespeichert werden')
        } finally {
            setSavingAlerts(false)
        }
    }

    const latestScan = scans[0]
    const latestStatus = uptimeData?.checks?.at(-1)?.status
    const statusColors = { up: 'text-emerald-400', down: 'text-red-400', degraded: 'text-yellow-400' }
    const statusLabels = { up: 'Online', down: 'Offline', degraded: 'Beeinträchtigt' }

    if (loading) return (
        <div className="min-h-screen bg-[#05080f] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
        </div>
    )

    return (
        <div className="min-h-screen bg-[#05080f]">
            <Toaster position="top-right" toastOptions={{ style: { background: '#0d1117', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' } }} />
            <Navbar />

            <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-28 pb-20">
                {/* Back + Header */}
                <div className="mb-8">
                    <Link href="/monitoring/security" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Alle Websites
                    </Link>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">{site?.displayName || site?.domain || '…'}</h1>
                                {latestStatus && (
                                    <span className={`text-sm font-medium ${statusColors[latestStatus] || 'text-slate-400'}`}>
                                        ● {statusLabels[latestStatus] || latestStatus}
                                    </span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={handleManualCheck}
                            disabled={checking}
                            className="flex items-center gap-2 px-4 py-2.5 border border-white/10 hover:border-white/20 rounded-xl text-sm text-slate-400 hover:text-white transition-all duration-200"
                        >
                            {checking ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                            Check starten
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    <StatCard
                        label="Uptime (24h)"
                        value={uptimeData?.uptimePercent != null ? `${uptimeData.uptimePercent}%` : null}
                        color={uptimeData?.uptimePercent >= 99 ? 'text-emerald-400' : uptimeData?.uptimePercent >= 95 ? 'text-yellow-400' : 'text-red-400'}
                    />
                    <StatCard
                        label="Ø Antwortzeit"
                        value={uptimeData?.avgResponseTime != null ? `${uptimeData.avgResponseTime} ms` : null}
                        color={uptimeData?.avgResponseTime < 500 ? 'text-emerald-400' : uptimeData?.avgResponseTime < 1500 ? 'text-yellow-400' : 'text-red-400'}
                    />
                    <StatCard
                        label="Security Score"
                        value={latestScan?.score != null ? `${latestScan.score}/100` : null}
                        color={latestScan?.score >= 80 ? 'text-emerald-400' : latestScan?.score >= 60 ? 'text-yellow-400' : 'text-red-400'}
                    />
                    <StatCard
                        label="SSL Ablauf"
                        value={latestScan?.sslDaysLeft != null ? `${latestScan.sslDaysLeft} Tage` : null}
                        sub={latestScan?.sslExpiry ? new Date(latestScan.sslExpiry).toLocaleDateString('de-DE') : null}
                        color={latestScan?.sslDaysLeft > 30 ? 'text-emerald-400' : latestScan?.sslDaysLeft > 7 ? 'text-yellow-400' : 'text-red-400'}
                    />
                </div>

                {/* Uptime History */}
                <div className="bg-white/2 border border-white/6 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-white">Uptime History</h2>
                        <div className="flex gap-1">
                            {[24, 72, 168].map(h => (
                                <button
                                    key={h}
                                    onClick={() => setHoursFilter(h)}
                                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${hoursFilter === h ? 'bg-violet-500/20 text-violet-400' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    {h === 24 ? '24h' : h === 72 ? '3d' : '7d'}
                                </button>
                            ))}
                        </div>
                    </div>
                    <UptimeStatusBar checks={uptimeData?.checks || []} />
                    <div className="flex justify-between mt-2 text-xs text-slate-600">
                        <span>Früher</span>
                        <span>{uptimeData?.total || 0} Checks · {uptimeData?.uptimePercent ?? '—'}% oben</span>
                        <span>Jetzt</span>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    {/* Antwortzeit-Chart */}
                    <div className="bg-white/2 border border-white/6 rounded-2xl p-6">
                        <div className="mb-4">
                            <h2 className="font-semibold text-white">Antwortzeit</h2>
                            <p className="text-xs text-slate-500 mt-0.5">Zeit bis die Website antwortet (ms) — unter 500 ms ist gut</p>
                        </div>
                        <LineChart
                            data={uptimeData?.checks?.filter(c => c.status === 'up') || []}
                            valueKey="responseTime"
                            color="#06b6d4"
                        />
                    </div>

                    {/* Security Score History */}
                    <div className="bg-white/2 border border-white/6 rounded-2xl p-6">
                        <div className="mb-4">
                            <h2 className="font-semibold text-white">Security Score</h2>
                            <p className="text-xs text-slate-500 mt-0.5">0–100 Punkte basierend auf 18 Sicherheitschecks — je höher, desto besser</p>
                        </div>
                        <LineChart
                            data={[...scans].reverse()}
                            valueKey="score"
                            color="#a78bfa"
                        />
                    </div>
                </div>

                {/* Offene Alerts */}
                {alerts.length > 0 && (
                    <div className="bg-white/2 border border-red-500/20 rounded-2xl p-6 mb-6">
                        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            Offene Alerts ({alerts.length})
                        </h2>
                        <div className="space-y-2">
                            {alerts.map(alert => <AlertItem key={alert._id} alert={alert} onResolve={handleResolveAlert} />)}
                        </div>
                    </div>
                )}

                {/* Benachrichtigungseinstellungen */}
                <div className="bg-white/2 border border-white/6 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="font-semibold text-white">E-Mail Benachrichtigungen</h2>
                            <p className="text-xs text-slate-500 mt-0.5">Wähle bei welchen Problemen du eine E-Mail erhalten möchtest</p>
                        </div>
                        {savingAlerts && <Loader2 className="w-4 h-4 text-slate-500 animate-spin" />}
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3">
                        {[
                            {
                                key: 'critical',
                                label: 'Kritisch',
                                activeColor: 'bg-red-500/20 border-red-500/50 text-red-300',
                                issues: alerts.filter(a => a.severity === 'critical').map(a => a.message),
                                fallback: 'Website offline, SSL abgelaufen (< 7 Tage)',
                            },
                            {
                                key: 'medium',
                                label: 'Mittel',
                                activeColor: 'bg-orange-500/20 border-orange-500/50 text-orange-300',
                                issues: alerts.filter(a => a.severity === 'high' || a.severity === 'medium').map(a => a.message),
                                fallback: 'SSL läuft ab (< 30 Tage), HTTP-Redirect fehlt',
                            },
                            {
                                key: 'low',
                                label: 'Unkritisch',
                                activeColor: 'bg-slate-500/20 border-slate-400/40 text-slate-300',
                                issues: (latestScan?.issues || []).filter(i => i.severity === 'low').map(i => i.message),
                                fallback: 'Fehlende Security-Header, HTTP-Redirect',
                            },
                        ].map(({ key, label, activeColor, issues, fallback }) => (
                            <button
                                key={key}
                                onClick={() => toggleAlertSetting(key)}
                                className={`flex flex-col gap-2 px-4 py-3.5 rounded-xl border transition-all duration-150 text-left w-full ${
                                    alertSettings[key]
                                        ? activeColor
                                        : 'border-white/8 text-slate-600 hover:border-white/15 hover:text-slate-400'
                                }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                        alertSettings[key] ? 'border-current bg-current' : 'border-slate-600'
                                    }`}>
                                        {alertSettings[key] && <div className="w-1.5 h-1.5 rounded-full bg-[#05080f]" />}
                                    </div>
                                    <span className="text-sm font-medium">{label}</span>
                                    {issues.length > 0 && (
                                        <span className={`ml-auto text-xs font-semibold px-1.5 py-0.5 rounded-md ${alertSettings[key] ? 'bg-current/20' : 'bg-white/6 text-slate-500'}`}>
                                            {issues.length}
                                        </span>
                                    )}
                                </div>
                                <div className="pl-6 space-y-0.5">
                                    {issues.length > 0 ? (
                                        issues.slice(0, 3).map((msg, i) => (
                                            <p key={i} className="text-xs opacity-70 leading-snug truncate">{msg}</p>
                                        ))
                                    ) : (
                                        <p className="text-xs opacity-50 leading-snug">{fallback}</p>
                                    )}
                                    {issues.length > 3 && (
                                        <p className="text-xs opacity-40">+{issues.length - 3} weitere</p>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Letzter Security Scan */}
                {latestScan && (
                    <div className="bg-white/2 border border-white/6 rounded-2xl p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold text-white">Letzter Security Scan</h2>
                            <span className="text-xs text-slate-500">
                                {new Date(latestScan.scannedAt).toLocaleString('de-DE')}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className={`p-3 rounded-xl border ${latestScan.sslValid ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                                <p className="text-xs text-slate-500 mb-1">SSL</p>
                                <p className={`text-sm font-semibold ${latestScan.sslValid ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {latestScan.sslValid ? 'Gültig' : 'Ungültig'}
                                </p>
                            </div>
                            <div className="p-3 rounded-xl border border-white/6 bg-white/2">
                                <p className="text-xs text-slate-500 mb-1">Probleme</p>
                                <p className={`text-sm font-semibold ${latestScan.issues?.length ? 'text-yellow-400' : 'text-emerald-400'}`}>
                                    {latestScan.issues?.length ?? 0} gefunden
                                </p>
                            </div>
                        </div>

                        {/* HTTP Redirect */}
                        <div className="mb-6">
                            <div className={`p-3 rounded-xl border ${latestScan.httpRedirect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                                <p className="text-xs text-slate-500 mb-1">HTTP → HTTPS</p>
                                <p className={`text-sm font-semibold ${latestScan.httpRedirect ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {latestScan.httpRedirect == null ? '—' : latestScan.httpRedirect ? 'Aktiv' : 'Fehlt'}
                                </p>
                            </div>
                        </div>

                        <h3 className="text-sm font-medium text-slate-400 mb-3">Security Headers</h3>
                        <SecurityHeadersTable headers={latestScan.securityHeaders} />

                        {latestScan.issues?.length > 0 && (
                            <>
                                <h3 className="text-sm font-medium text-slate-400 mt-6 mb-3">
                                    Gefundene Probleme ({latestScan.issues.length})
                                </h3>
                                <div className="space-y-2">
                                    {latestScan.issues.map((issue, i) => (
                                        <IssueItem key={i} issue={issue} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Scan History */}
                {scans.length > 1 && (
                    <div className="bg-white/2 border border-white/6 rounded-2xl p-6">
                        <h2 className="font-semibold text-white mb-4">Scan-Verlauf</h2>
                        <div className="space-y-2">
                            {scans.slice(0, 10).map((scan, i) => (
                                <div key={scan._id || i} className="flex items-center justify-between py-2 border-b border-white/4 last:border-0">
                                    <span className="text-xs text-slate-500">
                                        {new Date(scan.scannedAt).toLocaleString('de-DE')}
                                    </span>
                                    <div className="flex items-center gap-4">
                                        <span className={`text-sm font-medium ${
                                            scan.score >= 80 ? 'text-emerald-400' : scan.score >= 60 ? 'text-yellow-400' : 'text-red-400'
                                        }`}>
                                            {scan.score ?? '—'}/100
                                        </span>
                                        {scan.sslValid
                                            ? <CheckCircle className="w-4 h-4 text-emerald-400" />
                                            : <XCircle className="w-4 h-4 text-red-400" />
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}