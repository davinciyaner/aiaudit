import { mkdirSync } from 'fs'
import { chromium } from 'playwright'

const SITE_URL = 'https://www.sitecheckai.dev'

const LABELS = {
    en: {
        websitePerformanceReport: 'Website Performance Report',
        overall: 'Overall', seoTag: 'SEO', performanceTag: 'Performance', keywordsTag: 'Keywords', geoTag: 'GEO', aiReportTag: 'AI Report',
        poweredBy: 'Powered by Claude AI',
        generatedAnalysis: 'Generated Analysis',
        performanceAnalysis: 'Performance Analysis', requestsLower: 'requests', totalLower: 'total',
        issuesFound: 'Issues Found', recommendations: 'Recommendations', noPerfIssues: 'No performance issues found',
        pageSize: 'Page Size', requestsLabel: 'Requests', fullLoad: 'Full Load', domLoad: 'DOM Load',
        domReady: 'DOM Ready', complete: 'Complete', totalWeight: 'Total Weight', totalResources: 'Total Resources', timeToFirstByte: 'Time to First Byte',
        seoAnalysis: 'SEO Analysis', score: 'Score', issuesFoundCount: 'issues found',
        titleTag: 'Title Tag', notFound: 'Not found', characters: 'characters', good: 'Good', adjust: 'Adjust',
        metaDescription: 'Meta Description',
        h1Tags: 'H1 Tags', h2Tags: 'H2 Tags', internalLinks: 'Internal Links', imagesWithoutAlt: 'Images w/o Alt',
        allSeoPassed: 'All SEO checks passed',
        keywordIntelligence: 'Keyword Intelligence', words: 'words', keywordsIdentified: 'keywords identified',
        removeOrStrengthen: 'Remove or Strengthen', longTail: 'Long-tail Keywords to Test',
        geoAnalysis: 'GEO Analysis', aiVisibilityScore: 'AI Visibility Score', aiVisibility: 'AI Visibility',
        actionItems: 'Action Items', generatedLlms: 'Generated llms.txt — save as /llms.txt in your project',
        screenshots: 'Screenshots', desktopMobile: 'Desktop & Mobile Capture', desktop: 'Desktop', mobile: 'Mobile',
        priority: { critical: 'CRITICAL', high: 'HIGH', medium: 'MEDIUM', low: 'LOW' },
        scoreGood: 'Good', scoreNeedsWork: 'Needs Work', scoreCritical: 'Critical',
    },
    de: {
        websitePerformanceReport: 'Website Performance Report',
        overall: 'Gesamt', seoTag: 'SEO', performanceTag: 'Performance', keywordsTag: 'Keywords', geoTag: 'GEO', aiReportTag: 'KI-Bericht',
        poweredBy: 'Bereitgestellt von Claude AI',
        generatedAnalysis: 'Generierte Analyse',
        performanceAnalysis: 'Performance-Analyse', requestsLower: 'Requests', totalLower: 'gesamt',
        issuesFound: 'Gefundene Probleme', recommendations: 'Empfehlungen', noPerfIssues: 'Keine Performance-Probleme gefunden',
        pageSize: 'Seitengröße', requestsLabel: 'Anfragen', fullLoad: 'Volle Ladezeit', domLoad: 'DOM geladen',
        domReady: 'DOM bereit', complete: 'Abgeschlossen', totalWeight: 'Gesamtgewicht', totalResources: 'Ressourcen gesamt', timeToFirstByte: 'Time to First Byte',
        seoAnalysis: 'SEO-Analyse', score: 'Score', issuesFoundCount: 'Probleme gefunden',
        titleTag: 'Title-Tag', notFound: 'Nicht gefunden', characters: 'Zeichen', good: 'Gut', adjust: 'Anpassen',
        metaDescription: 'Meta Description',
        h1Tags: 'H1-Tags', h2Tags: 'H2-Tags', internalLinks: 'Interne Links', imagesWithoutAlt: 'Bilder ohne Alt',
        allSeoPassed: 'Alle SEO-Checks bestanden',
        keywordIntelligence: 'Keyword Intelligence', words: 'Wörter', keywordsIdentified: 'Keywords identifiziert',
        removeOrStrengthen: 'Entfernen oder stärken', longTail: 'Long-Tail-Keywords zum Testen',
        geoAnalysis: 'GEO-Analyse', aiVisibilityScore: 'KI-Sichtbarkeits-Score', aiVisibility: 'KI-Sichtbarkeit',
        actionItems: 'Massnahmen', generatedLlms: 'Generierte llms.txt — als /llms.txt im Projekt speichern',
        screenshots: 'Screenshots', desktopMobile: 'Desktop- & Mobile-Aufnahme', desktop: 'Desktop', mobile: 'Mobile',
        priority: { critical: 'KRITISCH', high: 'HOCH', medium: 'MITTEL', low: 'NIEDRIG' },
        scoreGood: 'Gut', scoreNeedsWork: 'Verbesserungswürdig', scoreCritical: 'Kritisch',
    },
}

export function generateHTMLReport(auditData, aiReport, language = 'de') {
    const { url, timestamp, overallScore, seo, performance, keywords, geo, screenshots } = auditData
    const T = language === 'en' ? LABELS.en : LABELS.de

    const scoreColor = (s) => s >= 80 ? '#22c55e' : s >= 60 ? '#f59e0b' : '#ef4444'
    const scoreLabel = (s) => s >= 80 ? T.scoreGood : s >= 60 ? T.scoreNeedsWork : T.scoreCritical

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
        const sectionPatterns = language === 'en' ? [
            'SUMMARY',
            'CRITICAL ISSUES',
            'SEO ANALYSIS',
            'PERFORMANCE ANALYSIS',
            'KEYWORD STRATEGY',
            'GEO ANALYSIS',
            'ACTION PLAN',
        ] : [
            'ZUSAMMENFASSUNG',
            'KRITISCHE PROBLEME',
            'SEO-ANALYSE',
            'PERFORMANCE-ANALYSE',
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
            : [{ title: language === 'en' ? 'AI ANALYSIS' : 'AI ANALYSE', content: cleaned }]
    }

    const aiSections = parseAISections(aiReport)

    const issueRow = (text) =>
        `<div style="display:flex;gap:10px;align-items:flex-start;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-left:3px solid #ef4444;border-radius:10px;padding:10px 14px;margin-bottom:8px"><div style="color:#fca5a5;font-size:12px;line-height:1.55;flex:1">${text}</div></div>`

    const suggestionRow = (text) =>
        `<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:8px"><div style="width:6px;height:6px;border-radius:50%;background:#06b6d4;flex-shrink:0;margin-top:5px"></div><div style="font-size:12px;color:#94a3b8;line-height:1.6;flex:1">${text}</div></div>`

    const sectionHeader = (title, subtitle) =>
        `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06)">
            <div>
                <div style="font-size:19px;font-weight:700;color:#f8fafc">${title}</div>
                ${subtitle ? `<div style="font-size:11px;color:#64748b;margin-top:2px">${subtitle}</div>` : ''}
            </div>
            <a href="${SITE_URL}" style="font-size:10px;color:#475569;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none">AuditAI</a>
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
            <div style="display:flex;flex-direction:column;align-items:center;gap:6px;margin-bottom:24px">
                <span style="font-size:28px;font-weight:800;background:linear-gradient(to right,#a78bfa,#22d3ee);-webkit-background-clip:text;-webkit-text-fill-color:transparent">AuditAI</span>
                <a href="${SITE_URL}" style="font-size:12px;color:#67e8f9;text-decoration:none;font-weight:600">${SITE_URL}</a>
            </div>
            <div style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:0.15em;font-weight:600;margin-bottom:12px">${T.websitePerformanceReport}</div>
            <div style="background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:20px 28px;margin-bottom:32px;max-width:360px">
                <div style="font-size:13px;color:#94a3b8;margin-bottom:6px;word-break:break-all">${url}</div>
                <div style="font-size:11px;color:#475569">${new Date(timestamp).toLocaleString(language === 'en' ? 'en-US' : 'de-DE', { dateStyle: 'long', timeStyle: 'short' })}</div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;width:100%;max-width:480px;margin-bottom:32px">
                ${[[T.overall, overallScore], [T.seoTag, seo.score], [T.performanceTag, performance.score], [T.geoTag, geo ? geo.score : 0]].map(([label, score]) => `
                <div style="background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px 6px;text-align:center">
                    <div style="font-size:26px;font-weight:800;color:${scoreColor(score)};line-height:1;margin-bottom:4px">${score}</div>
                    <div style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:0.07em;font-weight:600;margin-bottom:3px">${label}</div>
                    <div style="font-size:9px;color:${scoreColor(score)};font-weight:600">${scoreLabel(score)}</div>
                </div>`).join('')}
            </div>
            <div style="display:flex;gap:7px;flex-wrap:wrap;justify-content:center">
                ${[[T.seoTag, '#10b981'], [T.performanceTag, '#f59e0b'], [T.keywordsTag, '#a78bfa'], [T.geoTag, '#6366f1'], [T.aiReportTag, '#06b6d4']].map(([l, c]) =>
        `<span style="font-size:10px;padding:4px 12px;background:${c}18;border:1px solid ${c}35;border-radius:999px;color:${c};font-weight:600">${l}</span>`
    ).join('')}
            </div>
        </div>
        <div style="text-align:center;font-size:10px;color:#334155;padding-top:14px;border-top:1px solid rgba(255,255,255,0.04)">${T.poweredBy}</div>
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
            ${sectionHeader(section.title, T.generatedAnalysis)}
            <div style="flex:1;background:rgba(15,23,42,0.55);border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:20px;">
                ${rendered}
            </div>
        </div>`
    }).join('')

    // PAGE: Performance
    const performancePage = `
    <div style="${pageStyle}">
        ${glow(-60, -60, null, null, 'rgba(245,158,11,0.07)')}
        ${sectionHeader(T.performanceAnalysis, `${performance.metrics.resourceCount} ${T.requestsLower} · ${performance.metrics.totalSize} KB ${T.totalLower}`)}
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px">
            ${[
        ['TTFB', performance.metrics.ttfb + 'ms', performance.metrics.ttfb < 600, T.timeToFirstByte],
        ['First Contentful Paint', performance.metrics.fcp + 'ms', performance.metrics.fcp < 1800, 'FCP'],
        [T.domLoad, performance.metrics.domLoad + 'ms', performance.metrics.domLoad < 3000, T.domReady],
        [T.fullLoad, performance.metrics.fullLoad + 'ms', performance.metrics.fullLoad < 5000, T.complete],
        [T.pageSize, performance.metrics.totalSize + ' KB', true, T.totalWeight],
        [T.requestsLabel, performance.metrics.resourceCount, true, T.totalResources],
    ].map(([label, value, good, sub]) => `
            <div style="background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:16px;text-align:center">
                <div style="font-size:26px;font-weight:800;color:${good ? '#10b981' : '#ef4444'};line-height:1.1;margin-bottom:4px">${value}</div>
                <div style="font-size:11px;font-weight:600;color:#e2e8f0;margin-bottom:2px">${label}</div>
                <div style="font-size:9px;color:#475569">${sub}</div>
            </div>`).join('')}
        </div>
        ${performance.issues.length > 0 ? `
        <div style="margin-bottom:16px">
            <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">${T.issuesFound}</div>
            ${performance.issues.map(i => issueRow(i)).join('')}
        </div>` : `
        <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:14px;text-align:center;margin-bottom:16px">
            <div style="font-size:13px;color:#6ee7b7;font-weight:600">${T.noPerfIssues}</div>
        </div>`}
        ${performance.suggestions?.length > 0 ? `
        <div>
            <div style="font-size:11px;font-weight:700;color:#67e8f9;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">${T.recommendations}</div>
            ${performance.suggestions.map(s => suggestionRow(s)).join('')}
        </div>` : ''}
    </div>`

    // PAGE: SEO
    const seoPage = `
    <div style="${pageStyle}">
        ${glow(-60, -60, null, null, 'rgba(16,185,129,0.07)')}
        ${sectionHeader(T.seoAnalysis, `${T.score}: ${seo.score}/100 · ${seo.issues.length} ${T.issuesFoundCount}`)}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
            <div style="background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:16px">
                <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#475569;font-weight:600;margin-bottom:8px">${T.titleTag}</div>
                <div style="font-size:13px;font-weight:600;color:#f1f5f9;margin-bottom:10px;line-height:1.4">${seo.title.text || T.notFound}</div>
                <div style="height:3px;border-radius:2px;background:rgba(255,255,255,0.06);margin-bottom:5px">
                    <div style="height:100%;width:${Math.min(100, (seo.title.length / 60) * 100)}%;background:${seo.title.length >= 30 && seo.title.length <= 60 ? '#10b981' : '#ef4444'};border-radius:2px"></div>
                </div>
                <div style="display:flex;justify-content:space-between">
                    <div style="font-size:10px;color:#64748b">${seo.title.length}/60 ${T.characters}</div>
                    <div style="font-size:10px;color:${seo.title.length >= 30 && seo.title.length <= 60 ? '#10b981' : '#ef4444'};font-weight:600">${seo.title.length >= 30 && seo.title.length <= 60 ? T.good : T.adjust}</div>
                </div>
            </div>
            <div style="background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:16px">
                <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#475569;font-weight:600;margin-bottom:8px">${T.metaDescription}</div>
                <div style="font-size:12px;color:#94a3b8;margin-bottom:10px;line-height:1.5">${(seo.description.text || T.notFound).slice(0, 110)}${(seo.description.text?.length || 0) > 110 ? '...' : ''}</div>
                <div style="height:3px;border-radius:2px;background:rgba(255,255,255,0.06);margin-bottom:5px">
                    <div style="height:100%;width:${Math.min(100, (seo.description.length / 160) * 100)}%;background:${seo.description.length >= 120 && seo.description.length <= 160 ? '#10b981' : '#ef4444'};border-radius:2px"></div>
                </div>
                <div style="display:flex;justify-content:space-between">
                    <div style="font-size:10px;color:#64748b">${seo.description.length}/160 ${T.characters}</div>
                    <div style="font-size:10px;color:${seo.description.length >= 120 && seo.description.length <= 160 ? '#10b981' : '#ef4444'};font-weight:600">${seo.description.length >= 120 && seo.description.length <= 160 ? T.good : T.adjust}</div>
                </div>
            </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px">
            ${[
        [T.h1Tags, seo.headings?.h1?.length || 0, seo.headings?.h1?.length === 1],
        [T.h2Tags, seo.headings?.h2?.length || 0, (seo.headings?.h2?.length || 0) > 0],
        [T.internalLinks, seo.links?.internal || 0, (seo.links?.internal || 0) > 0],
        [T.imagesWithoutAlt, seo.images?.withoutAlt || 0, seo.images?.withoutAlt === 0],
    ].map(([label, value, good]) => `
            <div style="background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:12px;text-align:center">
                <div style="font-size:22px;font-weight:800;color:${good ? '#10b981' : '#ef4444'};margin-bottom:4px">${value}</div>
                <div style="font-size:9px;color:#475569;text-transform:uppercase;letter-spacing:0.06em">${label}</div>
            </div>`).join('')}
        </div>
        ${seo.issues.length > 0 ? `
        <div style="margin-bottom:14px">
            <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">${T.issuesFound}</div>
            ${seo.issues.map(i => issueRow(i)).join('')}
        </div>` : `
        <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:14px;text-align:center;margin-bottom:14px">
            <div style="font-size:12px;color:#6ee7b7;font-weight:600">${T.allSeoPassed}</div>
        </div>`}
        ${seo.suggestions?.length > 0 ? `
        <div>
            <div style="font-size:11px;font-weight:700;color:#67e8f9;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">${T.recommendations}</div>
            ${seo.suggestions.map(s => suggestionRow(s)).join('')}
        </div>` : ''}
    </div>`

    // PAGE: Keywords
    const keywordsPage = `
    <div style="${pageStyle}">
        ${glow(-60, -60, null, null, 'rgba(167,139,250,0.07)')}
        ${sectionHeader(T.keywordIntelligence, `${keywords.totalWords} ${T.words} · ${keywords.topKeywords.length} ${T.keywordsIdentified}`)}
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
            <div style="font-size:11px;font-weight:700;color:#f87171;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:7px">${T.removeOrStrengthen}</div>
            <div style="font-size:11px;color:#94a3b8;line-height:1.8">${keywords.weakKeywords.join(' &middot; ')}</div>
        </div>` : ''}
        ${keywords.longTailSuggestions?.length > 0 ? `
        <div style="background:rgba(6,182,212,0.05);border:1px solid rgba(6,182,212,0.15);border-radius:12px;padding:14px">
            <div style="font-size:11px;font-weight:700;color:#67e8f9;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">${T.longTail}</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px">
                ${keywords.longTailSuggestions.map(kw => `<span style="font-size:11px;padding:5px 12px;background:rgba(6,182,212,0.1);border:1px solid rgba(6,182,212,0.2);border-radius:999px;color:#67e8f9">${kw}</span>`).join('')}
            </div>
        </div>` : ''}
    </div>`

    // PAGE: GEO
    const geoPage = geo ? `
    <div style="${pageStyle}">
        ${glow(-60, -60, null, null, 'rgba(99,102,241,0.08)')}
        ${sectionHeader(T.geoAnalysis, `${T.aiVisibilityScore}: ${geo.score}/100`)}

        <div style="display:grid;grid-template-columns:160px 1fr;gap:16px;margin-bottom:20px">
            <div style="background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:20px;text-align:center;display:flex;flex-direction:column;justify-content:center;align-items:center">
                <div style="font-size:48px;font-weight:800;color:${scoreColor(geo.score)};line-height:1">${geo.score}</div>
                <div style="font-size:10px;color:#64748b;margin-top:6px;text-transform:uppercase;letter-spacing:0.08em">${T.aiVisibility}</div>
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
            <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">${T.actionItems}</div>
            ${geo.recommendations.map(r => `
            <div style="display:flex;gap:12px;align-items:flex-start;background:rgba(15,23,42,0.5);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:12px 14px;margin-bottom:8px">
                <div style="padding:3px 8px;border-radius:6px;font-size:9px;font-weight:700;text-transform:uppercase;flex-shrink:0;background:${r.priority === 'critical' ? 'rgba(239,68,68,0.15)' : r.priority === 'high' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)'};color:${r.priority === 'critical' ? '#fca5a5' : r.priority === 'high' ? '#fcd34d' : '#93c5fd'}">${T.priority[r.priority] || r.priority}</div>
                <div style="flex:1">
                    <div style="font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:3px">${r.title}</div>
                    <div style="font-size:11px;color:#64748b;line-height:1.5">${r.desc}</div>
                </div>
                <div style="font-size:10px;color:#475569;flex-shrink:0">${r.effort}</div>
            </div>`).join('')}
        </div>` : ''}

        <div>
            <div style="font-size:11px;font-weight:700;color:#67e8f9;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px">${T.generatedLlms}</div>
            <div style="background:rgba(6,182,212,0.05);border:1px solid rgba(6,182,212,0.15);border-radius:10px;padding:14px;font-family:monospace;font-size:10px;color:#94a3b8;line-height:1.7;white-space:pre-wrap">${geo.generatedLlmsTxt}</div>
        </div>
    </div>` : ''

    const screenshotsPage = screenshots ? `
    <div style="${pageStyle}">
        ${glow(-60, -60, null, null, 'rgba(124,58,237,0.07)')}
        ${sectionHeader(T.screenshots, T.desktopMobile)}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;flex:1">
            <div>
                <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#475569;font-weight:600;margin-bottom:8px">${T.desktop} · 1280px</div>
                <div style="border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;height:360px;background:#0a0e1a">
                    <img src="data:image/jpeg;base64,${screenshots.desktop}" style="width:100%;display:block;object-fit:cover;object-position:top" />
                </div>
            </div>
            <div>
                <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#475569;font-weight:600;margin-bottom:8px">${T.mobile} · 390px</div>
                <div style="border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;height:360px;background:#0a0e1a;display:flex;justify-content:center">
                    <img src="data:image/jpeg;base64,${screenshots.mobile}" style="height:100%;display:block;object-fit:cover;object-position:top" />
                </div>
            </div>
        </div>
    </div>` : ''

    return `<!DOCTYPE html>
<html lang="${language === 'en' ? 'en' : 'de'}">
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
${geoPage}
${screenshotsPage}
</body>
</html>`
}

export async function saveReportAsPDF(html, url) {
    mkdirSync('./reports', { recursive: true })
    const filename = `reports/audit-${new URL(url).hostname}-${Date.now()}.pdf`
    const browser = await chromium.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-extensions',
        ],
    })
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