import { mkdirSync } from 'fs'
import { chromium } from 'playwright'

export function generateHTMLReport(auditData, aiReport) {
    const { url, timestamp, overallScore, seo, performance, security, keywords, geo } = auditData

    const scoreColor = (s) => s >= 80 ? '#22c55e' : s >= 60 ? '#f59e0b' : '#ef4444'
    const scoreLabel = (s) => s >= 80 ? 'Good' : s >= 60 ? 'Needs Work' : 'Critical'

    const cleanAI = (text) => text
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/#{1,6}\s+/g, '')
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#f1f5f9">$1</strong>')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/^-\s+/gm, '• ')
        .replace(/\n{3,}/g, '\n\n')
        .trim()

    const parseAISections = (text) => {
        const cleaned = cleanAI(text)

        // Flexiblere Erkennung — auch mit Leerzeichen, Zeilenumbrüchen, Nummern davor
        const sectionPatterns = [
            'ZUSAMMENFASSUNG',
            'KRITISCHE PROBLEME',
            'SEO-ANALYSE',
            'PERFORMANCE-ANALYSE',
            'SICHERHEITS-ANALYSE',
            'SICHERHEITSANALYSE',   // ← Variante ohne Bindestrich
            'KEYWORD-STRATEGIE',
            'KEYWORD STRATEGIE',    // ← Variante mit Leerzeichen
            'GEO-ANALYSE',
            'ACTION PLAN',
            'AKTIONSPLAN',
        ]

        // Text in Zeilen aufteilen und Abschnitte erkennen
        const lines = cleaned.split('\n')
        const sections = []
        let currentTitle = null
        let currentLines = []

        for (const line of lines) {
            const trimmed = line.trim().toUpperCase()
            // Prüfen ob diese Zeile ein Abschnittsname ist
            const matchedPattern = sectionPatterns.find(p =>
                trimmed === p ||
                trimmed === p + ':' ||
                trimmed.startsWith(p + ' ') ||
                trimmed.endsWith(' ' + p)
            )

            if (matchedPattern) {
                // Vorherigen Abschnitt speichern
                if (currentTitle && currentLines.length > 0) {
                    sections.push({
                        title: currentTitle,
                        content: currentLines.join('\n').trim()
                    })
                }
                currentTitle = line.trim().replace(/:$/, '')
                currentLines = []
            } else if (currentTitle) {
                currentLines.push(line)
            }
        }

        // Letzten Abschnitt speichern
        if (currentTitle && currentLines.length > 0) {
            sections.push({ title: currentTitle, content: currentLines.join('\n').trim() })
        }

        return sections.length > 0
            ? sections
            : [{ title: 'AI ANALYSE', content: cleaned }]
    }

    const aiSections = parseAISections(aiReport)

    const issueRow = (text) =>
        `<div style="display:flex;gap:10px;align-items:flex-start;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-left:3px solid #ef4444;border-radius:10px;padding:10px 14px;margin-bottom:8px"><div style="color:#fca5a5;font-size:12px;line-height:1.55;flex:1">${text}</div></div>`

    const suggestionRow = (text) =>
        `<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:8px"><div style="width:6px;height:6px;border-radius:50%;background:#06b6d4;flex-shrink:0;margin-top:5px"></div><div style="font-size:12px;color:#94a3b8;line-height:1.6;flex:1">${text}</div></div>`

    const sectionHeader = (icon, title, subtitle) =>
        `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06)">
            <div style="display:flex;align-items:center;gap:12px">
                <div style="width:36px;height:36px;background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0">${icon}</div>
                <div>
                    <div style="font-size:19px;font-weight:700;color:#f8fafc">${title}</div>
                    ${subtitle ? `<div style="font-size:11px;color:#64748b;margin-top:2px">${subtitle}</div>` : ''}
                </div>
            </div>
            <div style="font-size:10px;color:#475569;font-weight:600;letter-spacing:0.08em;text-transform:uppercase">AuditAI</div>
        </div>`

    const pageStyle = `width:210mm;min-height:297mm;padding:32px 36px;page-break-after:always;break-after:page;display:flex;flex-direction:column;background:#0a0e1a;position:relative;overflow:hidden;box-sizing:border-box`

    const glow = (top, right, bottom, left, color) => {
        let style = `position:absolute;width:250px;height:250px;background:radial-gradient(circle,${color},transparent 70%);border-radius:50%;pointer-events:none;`
        if (top !== null) style += `top:${top}px;`
        if (right !== null) style += `right:${right}px;`
        if (bottom !== null) style += `bottom:${bottom}px;`
        if (left !== null) style += `left:${left}px;`
        return `<div style="${style}"></div>`
    }

    // PAGE 1: Cover
    const coverPage = `
    <div style="${pageStyle}">
        ${glow(-80, -80, null, null, 'rgba(124,58,237,0.15)')}
        ${glow(null, null, -60, -60, 'rgba(6,182,212,0.08)')}
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:relative;z-index:1">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:24px">
                <div style="width:48px;height:48px;background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 8px 28px rgba(124,58,237,0.35)">&#9889;</div>
                <span style="font-size:28px;font-weight:800;background:linear-gradient(to right,#a78bfa,#22d3ee);-webkit-background-clip:text;-webkit-text-fill-color:transparent">AuditAI</span>
            </div>
            <div style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:0.15em;font-weight:600;margin-bottom:12px">Website Performance Report</div>
            <div style="background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:20px 28px;margin-bottom:32px;max-width:360px">
                <div style="font-size:13px;color:#94a3b8;margin-bottom:6px;word-break:break-all">${url}</div>
                <div style="font-size:11px;color:#475569">${new Date(timestamp).toLocaleString('de-DE', { dateStyle: 'long', timeStyle: 'short' })}</div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;width:100%;max-width:520px;margin-bottom:32px">
                ${[['Overall', overallScore], ['SEO', seo.score], ['Performance', performance.score], ['Security', security.score], ['GEO', geo ? geo.score : 0]].map(([label, score]) => `
                <div style="background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px 6px;text-align:center">
                    <div style="font-size:26px;font-weight:800;color:${scoreColor(score)};line-height:1;margin-bottom:4px">${score}</div>
                    <div style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:0.07em;font-weight:600;margin-bottom:3px">${label}</div>
                    <div style="font-size:9px;color:${scoreColor(score)};font-weight:600">${scoreLabel(score)}</div>
                </div>`).join('')}
            </div>
            <div style="display:flex;gap:7px;flex-wrap:wrap;justify-content:center">
                ${[['SEO', '#10b981'], ['Performance', '#f59e0b'], ['Security', '#3b82f6'], ['Keywords', '#a78bfa'], ['GEO', '#6366f1'], ['AI Report', '#06b6d4']].map(([l, c]) =>
        `<span style="font-size:10px;padding:4px 12px;background:${c}18;border:1px solid ${c}35;border-radius:999px;color:${c};font-weight:600">${l}</span>`
    ).join('')}
            </div>
        </div>
        <div style="text-align:center;font-size:10px;color:#334155;padding-top:14px;border-top:1px solid rgba(255,255,255,0.04)">Powered by Claude AI</div>
    </div>`

    // PAGE 2+: AI Sections
    const aiPages = aiSections.map(section => {
        const lines = section.content.split('\n').filter(l => l.trim())
        const rendered = lines.map(line => {
            if (line.startsWith('•') || line.startsWith('-')) {
                const text = line.replace(/^[•\-]\s*/, '')
                return `<div style="display:flex;gap:9px;margin-bottom:7px"><div style="width:5px;height:5px;border-radius:50%;background:#7c3aed;flex-shrink:0;margin-top:7px"></div><div style="font-size:12px;color:#94a3b8;line-height:1.65">${text}</div></div>`
            }
            return `<div style="font-size:12px;color:#94a3b8;line-height:1.75;margin-bottom:9px">${line}</div>`
        }).join('')
        return `
        <div style="${pageStyle}">
            ${glow(-60, -60, null, null, 'rgba(124,58,237,0.07)')}
            ${sectionHeader('&#129302;', section.title, 'Generated Analysis')}
            <div style="flex:1;background:rgba(15,23,42,0.55);border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:20px;">
                ${rendered}
            </div>
        </div>`
    }).join('')

    // PAGE: Performance
    const performancePage = `
    <div style="${pageStyle}">
        ${glow(-60, -60, null, null, 'rgba(245,158,11,0.07)')}
        ${sectionHeader('&#9889;', 'Performance Analysis', `${performance.metrics.resourceCount} requests · ${performance.metrics.totalSize} KB total`)}
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px">
            ${[
        ['TTFB', performance.metrics.ttfb + 'ms', performance.metrics.ttfb < 600, 'Time to First Byte'],
        ['First Contentful Paint', performance.metrics.fcp + 'ms', performance.metrics.fcp < 1800, 'FCP'],
        ['DOM Load', performance.metrics.domLoad + 'ms', performance.metrics.domLoad < 3000, 'DOM Ready'],
        ['Full Load', performance.metrics.fullLoad + 'ms', performance.metrics.fullLoad < 5000, 'Complete'],
        ['Page Size', performance.metrics.totalSize + ' KB', true, 'Total Weight'],
        ['Requests', performance.metrics.resourceCount, true, 'Total Resources'],
    ].map(([label, value, good, sub]) => `
            <div style="background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:16px;text-align:center">
                <div style="font-size:26px;font-weight:800;color:${good ? '#10b981' : '#ef4444'};line-height:1.1;margin-bottom:4px">${value}</div>
                <div style="font-size:11px;font-weight:600;color:#e2e8f0;margin-bottom:2px">${label}</div>
                <div style="font-size:9px;color:#475569">${sub}</div>
            </div>`).join('')}
        </div>
        ${performance.issues.length > 0 ? `
        <div style="margin-bottom:16px">
            <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">Issues Found</div>
            ${performance.issues.map(i => issueRow(i)).join('')}
        </div>` : `
        <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:14px;text-align:center;margin-bottom:16px">
            <div style="font-size:13px;color:#6ee7b7;font-weight:600">No performance issues found</div>
        </div>`}
        ${performance.suggestions?.length > 0 ? `
        <div>
            <div style="font-size:11px;font-weight:700;color:#67e8f9;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">Recommendations</div>
            ${performance.suggestions.map(s => suggestionRow(s)).join('')}
        </div>` : ''}
    </div>`

    // PAGE: SEO
    const seoPage = `
    <div style="${pageStyle}">
        ${glow(-60, -60, null, null, 'rgba(16,185,129,0.07)')}
        ${sectionHeader('&#128269;', 'SEO Analysis', `Score: ${seo.score}/100 · ${seo.issues.length} issues found`)}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
            <div style="background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:16px">
                <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#475569;font-weight:600;margin-bottom:8px">Title Tag</div>
                <div style="font-size:13px;font-weight:600;color:#f1f5f9;margin-bottom:10px;line-height:1.4">${seo.title.text || 'Not found'}</div>
                <div style="height:3px;border-radius:2px;background:rgba(255,255,255,0.06);margin-bottom:5px">
                    <div style="height:100%;width:${Math.min(100, (seo.title.length / 60) * 100)}%;background:${seo.title.length >= 30 && seo.title.length <= 60 ? '#10b981' : '#ef4444'};border-radius:2px"></div>
                </div>
                <div style="display:flex;justify-content:space-between">
                    <div style="font-size:10px;color:#64748b">${seo.title.length}/60 characters</div>
                    <div style="font-size:10px;color:${seo.title.length >= 30 && seo.title.length <= 60 ? '#10b981' : '#ef4444'};font-weight:600">${seo.title.length >= 30 && seo.title.length <= 60 ? 'Good' : 'Adjust'}</div>
                </div>
            </div>
            <div style="background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:16px">
                <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#475569;font-weight:600;margin-bottom:8px">Meta Description</div>
                <div style="font-size:12px;color:#94a3b8;margin-bottom:10px;line-height:1.5">${(seo.description.text || 'Not found').slice(0, 110)}${(seo.description.text?.length || 0) > 110 ? '...' : ''}</div>
                <div style="height:3px;border-radius:2px;background:rgba(255,255,255,0.06);margin-bottom:5px">
                    <div style="height:100%;width:${Math.min(100, (seo.description.length / 160) * 100)}%;background:${seo.description.length >= 120 && seo.description.length <= 160 ? '#10b981' : '#ef4444'};border-radius:2px"></div>
                </div>
                <div style="display:flex;justify-content:space-between">
                    <div style="font-size:10px;color:#64748b">${seo.description.length}/160 characters</div>
                    <div style="font-size:10px;color:${seo.description.length >= 120 && seo.description.length <= 160 ? '#10b981' : '#ef4444'};font-weight:600">${seo.description.length >= 120 && seo.description.length <= 160 ? 'Good' : 'Adjust'}</div>
                </div>
            </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px">
            ${[
        ['H1 Tags', seo.headings?.h1?.length || 0, seo.headings?.h1?.length === 1],
        ['H2 Tags', seo.headings?.h2?.length || 0, (seo.headings?.h2?.length || 0) > 0],
        ['Internal Links', seo.links?.internal || 0, (seo.links?.internal || 0) > 0],
        ['Images w/o Alt', seo.images?.withoutAlt || 0, seo.images?.withoutAlt === 0],
    ].map(([label, value, good]) => `
            <div style="background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:12px;text-align:center">
                <div style="font-size:22px;font-weight:800;color:${good ? '#10b981' : '#ef4444'};margin-bottom:4px">${value}</div>
                <div style="font-size:9px;color:#475569;text-transform:uppercase;letter-spacing:0.06em">${label}</div>
            </div>`).join('')}
        </div>
        ${seo.issues.length > 0 ? `
        <div style="margin-bottom:14px">
            <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">Issues Found</div>
            ${seo.issues.map(i => issueRow(i)).join('')}
        </div>` : `
        <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:14px;text-align:center;margin-bottom:14px">
            <div style="font-size:12px;color:#6ee7b7;font-weight:600">All SEO checks passed</div>
        </div>`}
        ${seo.suggestions?.length > 0 ? `
        <div>
            <div style="font-size:11px;font-weight:700;color:#67e8f9;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">Recommendations</div>
            ${seo.suggestions.map(s => suggestionRow(s)).join('')}
        </div>` : ''}
    </div>`

    // PAGE: Keywords
    const keywordsPage = `
    <div style="${pageStyle}">
        ${glow(-60, -60, null, null, 'rgba(167,139,250,0.07)')}
        ${sectionHeader('&#127919;', 'Keyword Intelligence', `${keywords.totalWords} words · ${keywords.topKeywords.length} keywords identified`)}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
            ${keywords.topKeywords.slice(0, 8).map(k => `
            <div style="background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:14px;display:flex;align-items:center;justify-content:space-between">
                <div>
                    <div style="font-size:13px;font-weight:700;color:#f1f5f9;margin-bottom:5px">${k.keyword}</div>
                    <div style="display:flex;gap:4px;flex-wrap:wrap">
                        ${k.inTitle ? `<span style="font-size:9px;padding:2px 7px;background:rgba(167,139,250,0.15);border:1px solid rgba(167,139,250,0.3);border-radius:999px;color:#a78bfa;font-weight:600">Title</span>` : ''}
                        ${k.inH1 ? `<span style="font-size:9px;padding:2px 7px;background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.25);border-radius:999px;color:#6ee7b7;font-weight:600">H1</span>` : ''}
                        ${k.inMeta ? `<span style="font-size:9px;padding:2px 7px;background:rgba(6,182,212,0.12);border:1px solid rgba(6,182,212,0.25);border-radius:999px;color:#67e8f9;font-weight:600">Meta</span>` : ''}
                    </div>
                </div>
                <div style="text-align:right;flex-shrink:0;margin-left:12px">
                    <div style="font-size:22px;font-weight:800;color:#a78bfa;line-height:1">${k.score}</div>
                    <div style="font-size:9px;color:#475569;margin-top:2px">${k.density}</div>
                </div>
            </div>`).join('')}
        </div>
        ${keywords.weakKeywords?.length > 0 ? `
        <div style="background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.15);border-radius:12px;padding:14px;margin-bottom:12px">
            <div style="font-size:11px;font-weight:700;color:#f87171;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:7px">Remove or Strengthen</div>
            <div style="font-size:11px;color:#94a3b8;line-height:1.8">${keywords.weakKeywords.join(' &middot; ')}</div>
        </div>` : ''}
        ${keywords.longTailSuggestions?.length > 0 ? `
        <div style="background:rgba(6,182,212,0.05);border:1px solid rgba(6,182,212,0.15);border-radius:12px;padding:14px">
            <div style="font-size:11px;font-weight:700;color:#67e8f9;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">Long-tail Keywords to Test</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px">
                ${keywords.longTailSuggestions.map(kw => `<span style="font-size:11px;padding:5px 12px;background:rgba(6,182,212,0.1);border:1px solid rgba(6,182,212,0.2);border-radius:999px;color:#67e8f9">${kw}</span>`).join('')}
            </div>
        </div>` : ''}
    </div>`

    // PAGE: Security
    const secChecks = security.checks || [
        { name: 'HTTPS', passed: security.https, severity: 'critical' },
        { name: 'HSTS', passed: !!security.headers?.hsts, severity: 'high' },
        { name: 'Content-Security-Policy', passed: !!security.headers?.csp, severity: 'high' },
        { name: 'X-Content-Type-Options', passed: !!security.headers?.xContentType, severity: 'medium' },
        { name: 'Clickjacking-Schutz', passed: !!security.headers?.xFrameOptions, severity: 'medium' },
        { name: 'Referrer-Policy', passed: !!security.headers?.referrerPolicy, severity: 'low' },
    ]

    const riskMap = {
        'HTTPS': 'Alle Daten werden unverschlüsselt übertragen — Passwörter, Formulardaten und Cookies können von Angreifern im selben Netzwerk mitgelesen werden (Man-in-the-Middle-Angriff).',
        'HSTS': '"SSL-Stripping"-Angriffe können Nutzer auf HTTP umleiten, selbst wenn HTTPS eingerichtet ist. Erste Verbindungen bleiben angreifbar.',
        'X-Content-Type-Options': 'Browser interpretieren Dateitypen falsch — als Bild getarnte Scripts können XSS-Angriffe über Datei-Uploads auslösen.',
        'Clickjacking-Schutz': 'Deine Seite kann unsichtbar in einen iframe eingebettet werden. Nutzer klicken unwissentlich auf versteckte Buttons (z.B. "Zahlung bestätigen").',
        'Content-Security-Policy': 'Ohne CSP können Angreifer über XSS-Lücken beliebige Scripts einschleusen, Nutzerdaten stehlen und im Namen des Nutzers Aktionen ausführen.',
        'Referrer-Policy': 'Session-Tokens, interne Pfade und sensible URL-Parameter werden bei jedem Link-Klick im Referer-Header an externe Seiten weitergegeben.',
        'Permissions-Policy': 'Eingebettete Werbung oder Drittanbieter-Scripts können auf Kamera, Mikrofon oder GPS-Standort der Nutzer zugreifen.',
        'Server-Header': 'Angreifer erfahren exakte Server-Software und Version — gezielte Ausnutzung bekannter Sicherheitslücken dieser Version wird erheblich einfacher.',
        'Mixed Content': 'HTTP-Ressourcen auf einer HTTPS-Seite können abgefangen und manipuliert werden. Browser zeigen Sicherheitswarnungen, Nutzer verlieren Vertrauen.',
        'Cookie-Sicherheit': 'Ohne HttpOnly sind Session-Cookies per JavaScript stehlbar. Ohne Secure werden Cookies unverschlüsselt übertragen. Ohne SameSite sind CSRF-Angriffe möglich.',
        'Subresource Integrity': 'Wird ein CDN kompromittiert, kann Schadcode über deine Seite an alle Besucher verteilt werden — ohne dass du es bemerkst.',
        'Cross-Origin-Opener-Policy': 'Andere Browser-Tabs können über window.opener auf deine Seite zugreifen (Spectre-Angriffe, Cross-Tab-Datenleak).',
        'Sensible Dateien': '.env, .git und Backup-Dateien enthalten oft Datenbankpasswörter, API-Keys und Secrets — vollständiger Systemzugriff für Angreifer ist möglich.',
        'security.txt': 'Sicherheitsforscher können entdeckte Schwachstellen nicht verantwortungsvoll melden. Lücken bleiben länger offen und ausnutzbar.',
    }

    const sevStyle = {
        critical: { label: 'KRITISCH', bg: 'rgba(239,68,68,0.15)',  border: 'rgba(239,68,68,0.3)',   color: '#fca5a5', cardBg: 'rgba(239,68,68,0.05)',  cardBorder: 'rgba(239,68,68,0.2)'  },
        high:     { label: 'HOCH',     bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.3)',  color: '#fdba74', cardBg: 'rgba(249,115,22,0.04)', cardBorder: 'rgba(249,115,22,0.18)' },
        medium:   { label: 'MITTEL',   bg: 'rgba(234,179,8,0.15)',  border: 'rgba(234,179,8,0.28)',  color: '#fde68a', cardBg: 'rgba(234,179,8,0.04)',  cardBorder: 'rgba(234,179,8,0.18)' },
        low:      { label: 'NIEDRIG',  bg: 'rgba(100,116,139,0.12)', border: 'rgba(100,116,139,0.22)', color: '#94a3b8', cardBg: 'rgba(100,116,139,0.04)', cardBorder: 'rgba(100,116,139,0.15)' },
        info:     { label: 'INFO',     bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.18)', color: '#64748b', cardBg: 'rgba(100,116,139,0.03)', cardBorder: 'rgba(100,116,139,0.12)' },
    }

    const failedSecChecks = secChecks.filter(c => !c.passed)
    const passedSecCount = secChecks.length - failedSecChecks.length

    const securityOverviewPage = `
    <div style="${pageStyle}">
        ${glow(-60, -60, null, null, 'rgba(59,130,246,0.07)')}
        ${sectionHeader('&#128274;', 'Security Analysis', `Score: ${security.score}/100 · ${failedSecChecks.length} von ${secChecks.length} Checks fehlgeschlagen`)}

        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:20px">
            ${secChecks.map(chk => {
                const s = chk.passed ? null : (sevStyle[chk.severity] || sevStyle.medium)
                return `<div style="background:${chk.passed ? 'rgba(16,185,129,0.07)' : s.cardBg};border:1px solid ${chk.passed ? 'rgba(16,185,129,0.2)' : s.cardBorder};border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:9px">
                    <span style="font-size:14px;flex-shrink:0">${chk.passed ? '&#9989;' : '&#10060;'}</span>
                    <div>
                        <div style="font-size:10px;font-weight:700;color:${chk.passed ? '#6ee7b7' : s.color};line-height:1.3">${chk.name}</div>
                        ${!chk.passed ? `<div style="font-size:8px;color:${s.color};opacity:0.75;text-transform:uppercase;letter-spacing:0.05em;margin-top:2px">${s.label}</div>` : ''}
                    </div>
                </div>`
            }).join('')}
        </div>

        <div style="background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:16px 20px;margin-bottom:16px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
                <div style="font-size:12px;font-weight:600;color:#94a3b8">Security Score</div>
                <div style="font-size:28px;font-weight:800;color:${scoreColor(security.score)}">${security.score}<span style="font-size:13px;color:#475569;font-weight:400">/100</span></div>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:3px;margin-bottom:12px">
                <div style="height:100%;width:${security.score}%;background:${scoreColor(security.score)};border-radius:3px"></div>
            </div>
            <div style="display:flex;justify-content:space-around">
                <div style="text-align:center">
                    <div style="font-size:22px;font-weight:700;color:#6ee7b7">${passedSecCount}</div>
                    <div style="font-size:9px;color:#475569;text-transform:uppercase;letter-spacing:0.06em">Bestanden</div>
                </div>
                <div style="width:1px;background:rgba(255,255,255,0.06)"></div>
                <div style="text-align:center">
                    <div style="font-size:22px;font-weight:700;color:#fca5a5">${failedSecChecks.length}</div>
                    <div style="font-size:9px;color:#475569;text-transform:uppercase;letter-spacing:0.06em">Fehlgeschlagen</div>
                </div>
                <div style="width:1px;background:rgba(255,255,255,0.06)"></div>
                <div style="text-align:center">
                    <div style="font-size:22px;font-weight:700;color:#94a3b8">${secChecks.length}</div>
                    <div style="font-size:9px;color:#475569;text-transform:uppercase;letter-spacing:0.06em">Gesamt</div>
                </div>
            </div>
        </div>

        ${failedSecChecks.length === 0 ? `
        <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:24px;text-align:center">
            <div style="font-size:28px;margin-bottom:8px">&#127881;</div>
            <div style="font-size:14px;color:#6ee7b7;font-weight:700">Alle Security-Checks bestanden!</div>
            <div style="font-size:11px;color:#475569;margin-top:4px">Deine Website erfüllt alle geprüften Sicherheitsstandards.</div>
        </div>` : `
        <div style="font-size:10px;color:#475569;text-align:center;padding:8px">Detaillierte Risikoanalyse auf der nächsten Seite &#8594;</div>
        `}
    </div>`

    const securityDetailsPage = failedSecChecks.length > 0 ? `
    <div style="${pageStyle}">
        ${glow(-60, null, null, -60, 'rgba(239,68,68,0.05)')}
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06)">
            <div style="display:flex;align-items:center;gap:12px">
                <div style="width:36px;height:36px;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.25);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0">&#128272;</div>
                <div>
                    <div style="font-size:19px;font-weight:700;color:#f8fafc">Sicherheitslücken im Detail</div>
                    <div style="font-size:11px;color:#64748b;margin-top:2px">Risiken & Lösungen für ${failedSecChecks.length} fehlgeschlagene Checks</div>
                </div>
            </div>
            <div style="font-size:10px;color:#475569;font-weight:600;letter-spacing:0.08em;text-transform:uppercase">AuditAI</div>
        </div>

        ${failedSecChecks.map((chk, i) => {
            const s = sevStyle[chk.severity] || sevStyle.medium
            const issue = security.issues?.[i] || `${chk.name} — Problem gefunden`
            const suggestion = security.suggestions?.[i] || ''
            const risk = riskMap[chk.name] || 'Dieses Sicherheitsmerkmal schützt deine Website und Besucher vor bekannten Angriffsvektoren.'
            return `<div style="background:${s.cardBg};border:1px solid ${s.cardBorder};border-left:3px solid ${s.color};border-radius:10px;padding:12px 14px;margin-bottom:10px">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                    <span style="font-size:8px;font-weight:700;padding:2px 8px;border-radius:4px;text-transform:uppercase;letter-spacing:0.06em;background:${s.bg};border:1px solid ${s.border};color:${s.color};flex-shrink:0">${s.label}</span>
                    <span style="font-size:12px;font-weight:700;color:#f1f5f9">${chk.name}</span>
                </div>
                <div style="font-size:10px;color:#94a3b8;line-height:1.6;margin-bottom:5px">
                    <span style="color:#fca5a5;font-weight:600">Problem: </span>${issue}
                </div>
                <div style="font-size:10px;color:#94a3b8;line-height:1.6;margin-bottom:5px">
                    <span style="color:${s.color};font-weight:600">Was passiert ohne Fix: </span>${risk}
                </div>
                ${suggestion ? `<div style="font-size:10px;color:#67e8f9;line-height:1.6;background:rgba(6,182,212,0.06);border:1px solid rgba(6,182,212,0.12);border-radius:6px;padding:6px 10px">
                    <span style="font-weight:600">&#128161; Empfehlung: </span>${suggestion}
                </div>` : ''}
            </div>`
        }).join('')}
    </div>` : ''

    // PAGE: GEO
    const geoPage = geo ? `
    <div style="${pageStyle}">
        ${glow(-60, -60, null, null, 'rgba(99,102,241,0.08)')}
        ${sectionHeader('&#127760;', 'GEO Analysis', `AI Visibility Score: ${geo.score}/100`)}

        <div style="display:grid;grid-template-columns:160px 1fr;gap:16px;margin-bottom:20px">
            <div style="background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:20px;text-align:center;display:flex;flex-direction:column;justify-content:center;align-items:center">
                <div style="font-size:48px;font-weight:800;color:${scoreColor(geo.score)};line-height:1">${geo.score}</div>
                <div style="font-size:10px;color:#64748b;margin-top:6px;text-transform:uppercase;letter-spacing:0.08em">AI Visibility</div>
                <div style="font-size:11px;font-weight:600;color:${scoreColor(geo.score)};margin-top:4px">${scoreLabel(geo.score)}</div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                ${[
        ['llms.txt', geo.checks.hasLlmsTxt],
        ['Schema.org', geo.checks.hasStructuredData],
        ['FAQ Schema', geo.checks.hasFAQ],
        ['Organization', geo.checks.hasOrganization],
        ['AI Crawlers OK', geo.checks.robotsAllowsAI],
        ['Direct Definition', geo.checks.hasDirectDefinition],
        ['Statistics', geo.checks.hasStatistics],
        ['HTTPS', geo.checks.hasHTTPS],
    ].map(([name, ok]) => `
                <div style="background:${ok ? 'rgba(16,185,129,0.07)' : 'rgba(239,68,68,0.07)'};border:1px solid ${ok ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'};border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:8px">
                    <span style="font-size:14px">${ok ? '&#9989;' : '&#10060;'}</span>
                    <span style="font-size:11px;color:${ok ? '#6ee7b7' : '#fca5a5'};font-weight:600">${name}</span>
                </div>`).join('')}
            </div>
        </div>

        ${geo.recommendations?.length > 0 ? `
        <div style="margin-bottom:16px">
            <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">Action Items</div>
            ${geo.recommendations.map(r => `
            <div style="display:flex;gap:12px;align-items:flex-start;background:rgba(15,23,42,0.5);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:12px 14px;margin-bottom:8px">
                <div style="padding:3px 8px;border-radius:6px;font-size:9px;font-weight:700;text-transform:uppercase;flex-shrink:0;background:${r.priority === 'critical' ? 'rgba(239,68,68,0.15)' : r.priority === 'high' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)'};color:${r.priority === 'critical' ? '#fca5a5' : r.priority === 'high' ? '#fcd34d' : '#93c5fd'}">${r.priority}</div>
                <div style="flex:1">
                    <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:3px">${r.title}</div>
                    <div style="font-size:11px;color:#64748b;line-height:1.5">${r.desc}</div>
                </div>
                <div style="font-size:10px;color:#475569;flex-shrink:0">${r.effort}</div>
            </div>`).join('')}
        </div>` : ''}

        <div>
            <div style="font-size:11px;font-weight:700;color:#67e8f9;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px">Generated llms.txt — save as /llms.txt in your project</div>
            <div style="background:rgba(6,182,212,0.05);border:1px solid rgba(6,182,212,0.15);border-radius:10px;padding:14px;font-family:monospace;font-size:10px;color:#94a3b8;line-height:1.7;white-space:pre-wrap">${geo.generatedLlmsTxt}</div>
        </div>
    </div>` : ''

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<style>
@page { margin: 0; size: A4; }
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: -apple-system, 'Segoe UI', sans-serif; background:#0a0e1a; color:#f1f5f9; }
</style>
</head>
<body>
${coverPage}
${aiPages}
${performancePage}
${seoPage}
${keywordsPage}
${securityOverviewPage}
${securityDetailsPage}
${geoPage}
</body>
</html>`
}

export async function saveReportAsPDF(html, url) {
    mkdirSync('./reports', { recursive: true })
    const filename = `reports/audit-${new URL(url).hostname}-${Date.now()}.pdf`
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle' })
    await page.pdf({
        path: filename,
        format: 'A4',
        printBackground: true,
        margin: { top: '0px', bottom: '0px', left: '0px', right: '0px' }
    })
    await browser.close()
    return filename
}