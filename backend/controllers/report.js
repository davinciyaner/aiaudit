import { mkdirSync } from 'fs'
import { chromium } from 'playwright'

const SITE_URL = 'https://www.scanora.ai'

// Brand colors of the website (light theme, frontend/src/app/globals.css), as hex because
// the values are inlined into a PDF.
const C = {
    paper: '#f8fafc', card: '#fdfeff', tint: '#ebf1fc', line: '#dadee6', lineSoft: '#e7eaef',
    ink: '#101828', body: '#384050', muted: '#545b69',
    accent: '#1554cf', accentInk: '#0643b5',
    success: '#006f38', successSoft: '#e1f7e7', warning: '#9a5500', warningSoft: '#fef0d8', danger: '#b71824', dangerSoft: '#ffece9',
}

// A title is "too long" for Google once it gets truncated in the results (~600px, roughly
// 65 characters incl. a short brand suffix); below 30 it rarely describes the page.
const TITLE_MIN = 30
const TITLE_MAX = 65

const LABELS = {
    en: {
        reportTitle: 'Website audit: SEO, GEO & performance',
        overall: 'Overall', seoTag: 'SEO', performanceTag: 'Performance', keywordsTag: 'Keywords', geoTag: 'GEO', aiReportTag: 'AI report',
        poweredBy: 'Analysis written by Claude (Anthropic)',
        generatedAnalysis: 'AI analysis',
        performanceAnalysis: 'Performance analysis', requestsLower: 'requests', totalLower: 'total',
        issuesFound: 'Issues found', recommendations: 'Recommendations', noPerfIssues: 'No performance issues found',
        pageSize: 'Page size', requestsLabel: 'Requests', fullLoad: 'Full load', domLoad: 'DOM loaded',
        domReady: 'DOM ready', complete: 'Complete', totalWeight: 'Total weight', totalResources: 'Total resources', timeToFirstByte: 'Time to first byte',
        seoAnalysis: 'SEO analysis', score: 'Score', issuesFoundCount: 'issues found',
        titleTag: 'Title tag', notFound: 'Not found', characters: 'characters', good: 'Good', adjust: 'Adjust',
        metaDescription: 'Meta description',
        h1Tags: 'H1 tags', h2Tags: 'H2 tags', internalLinks: 'Internal links', imagesWithoutAlt: 'Images without alt',
        allSeoPassed: 'All SEO checks passed',
        keywordIntelligence: 'Keyword analysis', words: 'words', keywordsIdentified: 'keywords identified',
        rareKeywords: 'Mentioned only once', longTail: 'Long-tail ideas from your headings',
        geoAnalysis: 'GEO analysis', aiVisibilityScore: 'AI visibility score', aiVisibility: 'AI visibility',
        actionItems: 'Action items', generatedLlms: 'Suggested llms.txt (no llms.txt found on your site)',
        screenshots: 'Screenshots', desktopMobile: 'First screen on desktop and mobile', desktop: 'Desktop', mobile: 'Mobile',
        priority: { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' },
        scoreGood: 'Good', scoreNeedsWork: 'Needs work', scoreCritical: 'Critical',
        geoChecks: {
            structuredData: 'Schema.org', organization: 'Organization', faq: 'FAQ schema', websiteOrApp: 'WebSite/SoftwareApp schema',
            breadcrumb: 'Breadcrumb schema', brokenImages: 'No broken schema images', faqMismatch: 'FAQ answers in content',
            testimonials: 'Testimonials', llmsTxt: 'llms.txt', llmsFullTxt: 'llms-full.txt', aiCrawlers: 'AI crawlers allowed',
            sitemap: 'sitemap.xml', directDefinition: 'Direct definition', statistics: 'Statistics', wordCount: 'Word count ≥ 800',
            h2Count: '≥ 3 H2 headings', externalLinks: 'External links', authorInfo: 'Author info', contactInfo: 'Contact info',
            privacyPolicy: 'Privacy policy linked', https: 'HTTPS', canonical: 'Canonical tag', lang: 'HTML lang attribute',
        },
        geoChecksTitle: 'AI visibility signals', geoChecksSubtitle: 'signals passed',
        sampleDisclaimer: 'Example report: this is our own analysis of scanora.ai. Your report will look different for your own website.',
        ctaTitle: 'Get your own report', ctaSubtitle: 'Free in under 60 seconds, no credit card required',
        ctaButton: 'Check my website now', ctaPricingNote: 'Free score instantly. Full AI report with concrete fixes from €29/month (Pro).',
    },
    de: {
        reportTitle: 'Website-Audit: SEO, GEO & Performance',
        overall: 'Gesamt', seoTag: 'SEO', performanceTag: 'Performance', keywordsTag: 'Keywords', geoTag: 'GEO', aiReportTag: 'KI-Bericht',
        poweredBy: 'Analyse geschrieben von Claude (Anthropic)',
        generatedAnalysis: 'KI-Analyse',
        performanceAnalysis: 'Performance-Analyse', requestsLower: 'Requests', totalLower: 'gesamt',
        issuesFound: 'Gefundene Probleme', recommendations: 'Empfehlungen', noPerfIssues: 'Keine Performance-Probleme gefunden',
        pageSize: 'Seitengröße', requestsLabel: 'Anfragen', fullLoad: 'Volle Ladezeit', domLoad: 'DOM geladen',
        domReady: 'DOM bereit', complete: 'Abgeschlossen', totalWeight: 'Gesamtgewicht', totalResources: 'Ressourcen gesamt', timeToFirstByte: 'Time to First Byte',
        seoAnalysis: 'SEO-Analyse', score: 'Score', issuesFoundCount: 'Probleme gefunden',
        titleTag: 'Title-Tag', notFound: 'Nicht gefunden', characters: 'Zeichen', good: 'Gut', adjust: 'Anpassen',
        metaDescription: 'Meta Description',
        h1Tags: 'H1-Tags', h2Tags: 'H2-Tags', internalLinks: 'Interne Links', imagesWithoutAlt: 'Bilder ohne Alt',
        allSeoPassed: 'Alle SEO-Checks bestanden',
        keywordIntelligence: 'Keyword-Analyse', words: 'Wörter', keywordsIdentified: 'Keywords identifiziert',
        rareKeywords: 'Nur einmal erwähnt', longTail: 'Long-Tail-Ideen aus deinen Überschriften',
        geoAnalysis: 'GEO-Analyse', aiVisibilityScore: 'KI-Sichtbarkeits-Score', aiVisibility: 'KI-Sichtbarkeit',
        actionItems: 'Maßnahmen', generatedLlms: 'Vorschlag für eine llms.txt (auf deiner Website wurde keine gefunden)',
        screenshots: 'Screenshots', desktopMobile: 'Erster Bildschirm auf Desktop und Handy', desktop: 'Desktop', mobile: 'Mobil',
        priority: { critical: 'Kritisch', high: 'Hoch', medium: 'Mittel', low: 'Niedrig' },
        scoreGood: 'Gut', scoreNeedsWork: 'Verbesserungswürdig', scoreCritical: 'Kritisch',
        geoChecks: {
            structuredData: 'Schema.org', organization: 'Organisation', faq: 'FAQ-Schema', websiteOrApp: 'WebSite/SoftwareApp-Schema',
            breadcrumb: 'Breadcrumb-Schema', brokenImages: 'Keine defekten Schema-Bilder', faqMismatch: 'FAQ-Antworten im Content',
            testimonials: 'Testimonials', llmsTxt: 'llms.txt', llmsFullTxt: 'llms-full.txt', aiCrawlers: 'KI-Crawler erlaubt',
            sitemap: 'sitemap.xml', directDefinition: 'Direkte Definition', statistics: 'Statistiken', wordCount: 'Wortanzahl ≥ 800',
            h2Count: '≥ 3 H2-Überschriften', externalLinks: 'Externe Links', authorInfo: 'Autoren-Info', contactInfo: 'Kontakt-Info',
            privacyPolicy: 'Datenschutzerklärung verlinkt', https: 'HTTPS', canonical: 'Canonical-Tag', lang: 'HTML lang-Attribut',
        },
        geoChecksTitle: 'KI-Sichtbarkeits-Signale', geoChecksSubtitle: 'Signale erfüllt',
        sampleDisclaimer: 'Beispiel-Report: Das ist unsere eigene Analyse von scanora.ai. Dein Report sieht für deine eigene Website anders aus.',
        ctaTitle: 'Hol dir deinen eigenen Report', ctaSubtitle: 'Kostenlos in unter 60 Sekunden, keine Kreditkarte nötig',
        ctaButton: 'Jetzt meine Website prüfen', ctaPricingNote: 'Kostenloser Score sofort. Voller KI-Bericht mit konkreten Fixes ab 29 €/Monat (Pro).',
    },
}

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const ICON_CHECK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${C.success}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>`
const ICON_CROSS = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${C.danger}" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>`
const LOGO = `<svg width="18" height="18" viewBox="0 0 192 192" fill="none"><circle cx="96" cy="96" r="50" stroke="${C.paper}" stroke-width="14"/><circle cx="110" cy="82" r="13" fill="${C.paper}"/></svg>`

// isSample=true adds a disclaimer and a closing CTA page. Only for the public example
// download; real customer reports (audit_router.js) must not show either.
export function generateHTMLReport(auditData, aiReport, language = 'de', { isSample = false } = {}) {
    const { url, timestamp, overallScore, seo, performance, keywords, geo, screenshots } = auditData
    const T = language === 'en' ? LABELS.en : LABELS.de

    const scoreColor = (s) => s >= 80 ? C.success : s >= 60 ? C.warning : C.danger
    const scoreLabel = (s) => s >= 80 ? T.scoreGood : s >= 60 ? T.scoreNeedsWork : T.scoreCritical

    const cleanAI = (text) => text
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/#{1,6}\s+/g, '')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/^-\s+/gm, '• ')
        .replace(/\n{3,}/g, '\n\n')
        .trim()

    const parseAISections = (text) => {
        const cleaned = cleanAI(text)
        const sectionPatterns = language === 'en'
            ? ['SUMMARY', 'CRITICAL ISSUES', 'SEO ANALYSIS', 'PERFORMANCE ANALYSIS', 'KEYWORD STRATEGY', 'GEO ANALYSIS', 'ACTION PLAN']
            : ['ZUSAMMENFASSUNG', 'KRITISCHE PROBLEME', 'SEO-ANALYSE', 'PERFORMANCE-ANALYSE', 'KEYWORD-STRATEGIE', 'KEYWORD STRATEGIE', 'GEO-ANALYSE', 'ACTION PLAN', 'AKTIONSPLAN']
        const lines = cleaned.split('\n')
        const sections = []
        let currentTitle = null
        let currentLines = []
        for (const line of lines) {
            const trimmed = line.trim().toUpperCase()
            const matched = sectionPatterns.find(p => trimmed === p || trimmed === p + ':' || trimmed.startsWith(p + ' ') || trimmed.endsWith(' ' + p))
            if (matched) {
                if (currentTitle && currentLines.length > 0) sections.push({ title: currentTitle, content: currentLines.join('\n').trim() })
                currentTitle = line.trim().replace(/:$/, '')
                currentLines = []
            } else if (currentTitle) {
                currentLines.push(line)
            }
        }
        if (currentTitle && currentLines.length > 0) sections.push({ title: currentTitle, content: currentLines.join('\n').trim() })
        return sections.length > 0 ? sections : [{ title: language === 'en' ? 'AI ANALYSIS' : 'KI-ANALYSE', content: cleaned }]
    }

    // Section titles from the model come in UPPERCASE; shown in sentence case in the PDF.
    const prettyTitle = (t) => {
        const map = language === 'en'
            ? { SUMMARY: 'Summary', 'CRITICAL ISSUES': 'Critical issues', 'ACTION PLAN': 'Action plan', 'AI ANALYSIS': 'AI analysis' }
            : { ZUSAMMENFASSUNG: 'Zusammenfassung', 'KRITISCHE PROBLEME': 'Kritische Probleme', 'ACTION PLAN': 'Action Plan', AKTIONSPLAN: 'Action Plan', 'KI-ANALYSE': 'KI-Analyse' }
        return map[t.toUpperCase()] || t.charAt(0) + t.slice(1).toLowerCase()
    }

    const allAISections = aiReport ? parseAISections(aiReport) : []
    // The four topical AI sections are embedded into their data sections below; summary,
    // critical issues and action plan keep their own section.
    const takeAISection = (pattern) => {
        const idx = allAISections.findIndex(s => pattern.test(s.title))
        return idx === -1 ? null : allAISections.splice(idx, 1)[0]
    }
    const seoAISection = takeAISection(/SEO/i)
    const performanceAISection = takeAISection(/PERFORMANCE/i)
    const keywordAISection = takeAISection(/KEYWORD/i)
    const geoAISection = takeAISection(/GEO/i)
    const aiSections = allAISections

    const renderAIProse = (content) => content.split('\n').filter(l => l.trim()).map(line => {
        if (/^[•-]/.test(line)) return `<div class="bullet"><span class="dot"></span><div>${line.replace(/^[•-]\s*/, '')}</div></div>`
        return `<p class="prose">${line}</p>`
    }).join('')

    const aiProseBox = (section) => section ? `<div class="card prose-card">${renderAIProse(section.content)}</div>` : ''
    const issueRow = (text) => `<div class="issue">${esc(text)}</div>`
    const suggestionRow = (text) => `<div class="bullet"><span class="dot"></span><div>${esc(text)}</div></div>`
    const subhead = (text) => `<div class="subhead">${text}</div>`

    const sectionHeader = (title, subtitle) => `
        <div class="section-head">
            <div>
                <h2>${title}</h2>
                ${subtitle ? `<div class="section-sub">${subtitle}</div>` : ''}
            </div>
            <a class="brand-mini" href="${SITE_URL}">Scanora</a>
        </div>`

    const dateStr = new Date(timestamp).toLocaleString(language === 'en' ? 'en-US' : 'de-DE', { dateStyle: 'long', timeStyle: 'short' })

    const coverPage = `
    <div class="page cover">
        <div class="cover-top">
            <div class="logo"><span class="logo-mark">${LOGO}</span><span>Scanora</span></div>
            <span class="muted small">${dateStr}</span>
        </div>
        <div class="cover-main">
            <div class="eyebrow">${T.reportTitle}</div>
            <h1>${esc(url.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</h1>
            <div class="score-grid">
                ${[[T.overall, overallScore], [T.seoTag, seo.score], [T.performanceTag, performance.score], [T.geoTag, geo ? geo.score : 0]].map(([label, score], i) => `
                <div class="score-card${i === 0 ? ' score-main' : ''}">
                    <div class="score-label">${label}</div>
                    <div class="score-value" style="color:${scoreColor(score)}">${score}<span>/100</span></div>
                    <div class="score-state" style="color:${scoreColor(score)}">${scoreLabel(score)}</div>
                </div>`).join('')}
            </div>
            <div class="chips">${[T.seoTag, T.performanceTag, T.keywordsTag, T.geoTag, ...(aiReport ? [T.aiReportTag] : [])].map(l => `<span class="chip">${l}</span>`).join('')}</div>
            ${isSample ? `<div class="note">${T.sampleDisclaimer}</div>` : ''}
        </div>
        <div class="cover-foot"><span>${aiReport ? T.poweredBy : ''}</span><a href="${SITE_URL}">${SITE_URL.replace('https://', '')}</a></div>
    </div>`

    const aiPages = aiSections.map(section => `
        <div class="section">
            ${sectionHeader(prettyTitle(section.title), T.generatedAnalysis)}
            <div class="card prose-card">${renderAIProse(section.content)}</div>
        </div>`).join('')

    const metricCard = (label, value, good, sub) => `
        <div class="card metric">
            <div class="metric-value" style="color:${good ? C.success : C.danger}">${value}</div>
            <div class="metric-label">${label}</div>
            <div class="metric-sub">${sub}</div>
        </div>`

    const performancePage = `
    <div class="section">
        ${sectionHeader(T.performanceAnalysis, `${performance.metrics.resourceCount} ${T.requestsLower} · ${performance.metrics.totalSize} KB ${T.totalLower}`)}
        ${aiProseBox(performanceAISection)}
        <div class="grid-3">
            ${metricCard('TTFB', performance.metrics.ttfb + ' ms', performance.metrics.ttfb < 600, T.timeToFirstByte)}
            ${metricCard('First Contentful Paint', performance.metrics.fcp + ' ms', performance.metrics.fcp < 1800, 'FCP')}
            ${metricCard(T.domLoad, performance.metrics.domLoad + ' ms', performance.metrics.domLoad < 3000, T.domReady)}
            ${metricCard(T.fullLoad, performance.metrics.fullLoad + ' ms', performance.metrics.fullLoad < 5000, T.complete)}
            ${metricCard(T.pageSize, performance.metrics.totalSize + ' KB', true, T.totalWeight)}
            ${metricCard(T.requestsLabel, performance.metrics.resourceCount, true, T.totalResources)}
        </div>
        ${performance.issues.length > 0
        ? `${subhead(T.issuesFound)}${performance.issues.map(issueRow).join('')}`
        : `<div class="ok-box">${T.noPerfIssues}</div>`}
        ${performance.suggestions?.length > 0 ? `${subhead(T.recommendations)}${performance.suggestions.map(suggestionRow).join('')}` : ''}
    </div>`

    const titleOk = seo.title.length >= TITLE_MIN && seo.title.length <= TITLE_MAX
    const descOk = seo.description.length >= 120 && seo.description.length <= 160
    const meter = (ratio, ok) => `<div class="meter"><div style="width:${Math.min(100, ratio * 100)}%;background:${ok ? C.success : C.danger}"></div></div>`

    const seoPage = `
    <div class="section">
        ${sectionHeader(T.seoAnalysis, `${T.score}: ${seo.score}/100 · ${seo.issues.length} ${T.issuesFoundCount}`)}
        ${aiProseBox(seoAISection)}
        <div class="grid-2">
            <div class="card">
                <div class="label">${T.titleTag}</div>
                <div class="field-text">${esc(seo.title.text || T.notFound)}</div>
                ${meter(seo.title.length / TITLE_MAX, titleOk)}
                <div class="meter-row"><span>${seo.title.length}/${TITLE_MAX} ${T.characters}</span><strong style="color:${titleOk ? C.success : C.danger}">${titleOk ? T.good : T.adjust}</strong></div>
            </div>
            <div class="card">
                <div class="label">${T.metaDescription}</div>
                <div class="field-text small">${esc((seo.description.text || T.notFound).slice(0, 140))}${(seo.description.text?.length || 0) > 140 ? '…' : ''}</div>
                ${meter(seo.description.length / 160, descOk)}
                <div class="meter-row"><span>${seo.description.length}/160 ${T.characters}</span><strong style="color:${descOk ? C.success : C.danger}">${descOk ? T.good : T.adjust}</strong></div>
            </div>
        </div>
        <div class="grid-4">
            ${[
        [T.h1Tags, seo.headings?.h1?.length || 0, seo.headings?.h1?.length === 1],
        [T.h2Tags, seo.headings?.h2?.length || 0, (seo.headings?.h2?.length || 0) > 0],
        [T.internalLinks, seo.links?.internal || 0, (seo.links?.internal || 0) > 0],
        [T.imagesWithoutAlt, seo.images?.withoutAlt || 0, seo.images?.withoutAlt === 0],
    ].map(([label, value, good]) => `<div class="card stat"><div class="stat-value" style="color:${good ? C.success : C.danger}">${value}</div><div class="stat-label">${label}</div></div>`).join('')}
        </div>
        ${seo.issues.length > 0 ? `${subhead(T.issuesFound)}${seo.issues.map(issueRow).join('')}` : `<div class="ok-box">${T.allSeoPassed}</div>`}
        ${seo.suggestions?.length > 0 ? `${subhead(T.recommendations)}${seo.suggestions.map(suggestionRow).join('')}` : ''}
    </div>`

    const keywordsPage = `
    <div class="section">
        ${sectionHeader(T.keywordIntelligence, `${keywords.totalWords} ${T.words} · ${keywords.topKeywords.length} ${T.keywordsIdentified}`)}
        ${aiProseBox(keywordAISection)}
        <div class="grid-2 tight">
            ${keywords.topKeywords.slice(0, 8).map(k => `
            <div class="card kw">
                <div>
                    <div class="kw-name">${esc(k.keyword)}</div>
                    <div class="tags">${k.inTitle ? '<span class="tag">Title</span>' : ''}${k.inH1 ? '<span class="tag">H1</span>' : ''}${k.inMeta ? '<span class="tag">Meta</span>' : ''}</div>
                </div>
                <div class="kw-num"><div>${k.count}×</div><span>${k.density}</span></div>
            </div>`).join('')}
        </div>
        ${keywords.weakKeywords?.length > 0 ? `
        <div class="card soft">
            <div class="label">${T.rareKeywords}</div>
            <div class="small body">${keywords.weakKeywords.map(esc).join(', ')}</div>
        </div>` : ''}
        ${keywords.longTailSuggestions?.length > 0 ? `
        <div class="card soft">
            <div class="label">${T.longTail}</div>
            <div class="chips left">${keywords.longTailSuggestions.map(kw => `<span class="chip">${esc(kw)}</span>`).join('')}</div>
        </div>` : ''}
    </div>`

    const geoChecksList = geo ? [
        [T.geoChecks.structuredData, geo.checks.hasStructuredData],
        [T.geoChecks.organization, geo.checks.hasOrganization],
        [T.geoChecks.faq, geo.checks.hasFAQ],
        [T.geoChecks.websiteOrApp, geo.checks.hasSoftwareApp || geo.checks.hasWebSite],
        [T.geoChecks.breadcrumb, geo.checks.hasBreadcrumb],
        [T.geoChecks.brokenImages, (geo.checks.brokenSchemaImages?.length ?? 0) === 0],
        ...(geo.checks.hasFAQ ? [[T.geoChecks.faqMismatch, (geo.checks.faqAnswersMissingFromContent ?? 0) === 0]] : []),
        [T.geoChecks.testimonials, geo.checks.hasTestimonials],
        [T.geoChecks.llmsTxt, geo.checks.hasLlmsTxt],
        [T.geoChecks.llmsFullTxt, geo.checks.hasLlmsFullTxt],
        [T.geoChecks.aiCrawlers, geo.checks.robotsAllowsAI],
        [T.geoChecks.sitemap, geo.checks.hasSitemap],
        [T.geoChecks.directDefinition, geo.checks.hasDirectDefinition],
        [T.geoChecks.statistics, geo.checks.hasStatistics],
        [T.geoChecks.wordCount, (geo.checks.wordCount ?? 0) >= 800],
        [T.geoChecks.h2Count, (geo.checks.h2Count ?? 0) >= 3],
        [T.geoChecks.externalLinks, (geo.checks.externalLinksCount ?? 0) > 0],
        [T.geoChecks.authorInfo, geo.checks.hasAuthorInfo],
        [T.geoChecks.contactInfo, geo.checks.hasContactInfo],
        [T.geoChecks.privacyPolicy, geo.checks.hasPrivacyPolicy],
        [T.geoChecks.https, geo.checks.hasHTTPS],
        [T.geoChecks.canonical, geo.checks.canonical],
        [T.geoChecks.lang, geo.checks.hasLang],
    ] : []
    const geoChecksPassed = geoChecksList.filter(([, ok]) => ok).length

    const geoPage = geo ? `
    <div class="section">
        ${sectionHeader(T.geoAnalysis, `${T.aiVisibilityScore}: ${geo.score}/100`)}
        ${aiProseBox(geoAISection)}
        <div class="geo-top">
            <div class="card center">
                <div class="big-score" style="color:${scoreColor(geo.score)}">${geo.score}</div>
                <div class="label">${T.aiVisibility}</div>
                <div class="small" style="color:${scoreColor(geo.score)};font-weight:600">${scoreLabel(geo.score)}</div>
            </div>
            <div class="card">
                <div class="label">${T.geoChecksTitle}</div>
                <div class="big-count">${geoChecksPassed}<span>/${geoChecksList.length} ${T.geoChecksSubtitle}</span></div>
            </div>
        </div>
        <div class="checks">
            ${geoChecksList.map(([name, ok]) => `<div class="check ${ok ? 'pass' : 'fail'}">${ok ? ICON_CHECK : ICON_CROSS}<span>${name}</span></div>`).join('')}
        </div>
        ${geo.recommendations?.length > 0 ? `${subhead(T.actionItems)}${geo.recommendations.map(r => `
            <div class="card action">
                <span class="prio prio-${r.priority}">${T.priority[r.priority] || r.priority}</span>
                <div class="action-body"><strong>${esc(r.title)}</strong><div class="small muted">${esc(r.desc)}</div></div>
                <span class="small muted">${esc(r.effort)}</span>
            </div>`).join('')}` : ''}
        ${!geo.checks.hasLlmsTxt && geo.generatedLlmsTxt ? `${subhead(T.generatedLlms)}<pre class="code">${esc(geo.generatedLlmsTxt)}</pre>` : ''}
    </div>` : ''

    // Screenshots are viewport captures (runner.js): 1280x800 desktop and 390x844 mobile.
    const screenshotsPage = screenshots ? `
    <div class="section">
        ${sectionHeader(T.screenshots, T.desktopMobile)}
        <div class="shots">
            <div><div class="label">${T.desktop} · 1280 px</div><div class="shot"><img src="data:image/jpeg;base64,${screenshots.desktop}" /></div></div>
            <div><div class="label">${T.mobile} · 390 px</div><div class="shot"><img src="data:image/jpeg;base64,${screenshots.mobile}" /></div></div>
        </div>
    </div>` : ''

    const ctaUrl = language === 'en' ? `${SITE_URL}/en` : SITE_URL
    const ctaPage = isSample ? `
    <div class="section">
        <div class="cta">
            <h2>${T.ctaTitle}</h2>
            <p>${T.ctaSubtitle}</p>
            <a class="button" href="${ctaUrl}">${T.ctaButton}</a>
            <p class="small">${T.ctaPricingNote}</p>
        </div>
    </div>` : ''

    return `<!DOCTYPE html>
<html lang="${language === 'en' ? 'en' : 'de'}">
<head>
<meta charset="UTF-8"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@500&display=swap" rel="stylesheet">
<style>
@page { margin: 0; size: A4; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Geist', -apple-system, 'Segoe UI', sans-serif; background: ${C.paper}; color: ${C.ink}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
a { color: ${C.accentInk}; text-decoration: none; }
.page { width: 210mm; min-height: 297mm; padding: 40px 44px; break-after: page; display: flex; flex-direction: column; background: ${C.paper}; }
.section { width: 210mm; padding: 28px 44px 20px; break-inside: avoid; background: ${C.paper}; }
.small { font-size: 11px; line-height: 1.5; }
.muted { color: ${C.muted}; }
.body { color: ${C.body}; }
.card { background: ${C.card}; border: 1px solid ${C.line}; border-radius: 14px; padding: 16px; }
.card.soft { background: ${C.tint}; border-color: ${C.tint}; margin-top: 12px; }
.label { font-size: 11px; font-weight: 600; color: ${C.muted}; margin-bottom: 8px; }
.subhead { font-size: 13px; font-weight: 600; color: ${C.ink}; margin: 18px 0 10px; }

.cover-top { display: flex; justify-content: space-between; align-items: center; }
.logo { display: flex; align-items: center; gap: 10px; font-size: 18px; font-weight: 700; letter-spacing: -0.02em; }
.logo-mark { width: 30px; height: 30px; border-radius: 8px; background: ${C.ink}; display: inline-flex; align-items: center; justify-content: center; }
.cover-main { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.eyebrow { font-size: 13px; font-weight: 600; color: ${C.accentInk}; margin-bottom: 12px; }
h1 { font-size: 40px; line-height: 1.08; letter-spacing: -0.035em; font-weight: 700; margin-bottom: 36px; word-break: break-all; }
.score-grid { display: grid; grid-template-columns: 1.3fr 1fr 1fr 1fr; gap: 10px; margin-bottom: 24px; }
.score-card { background: ${C.card}; border: 1px solid ${C.line}; border-radius: 14px; padding: 16px; }
.score-main { border: 2px solid ${C.accent}; }
.score-label { font-size: 12px; color: ${C.muted}; margin-bottom: 6px; }
.score-value { font-size: 34px; font-weight: 700; letter-spacing: -0.03em; line-height: 1; }
.score-value span { font-size: 13px; color: ${C.muted}; font-weight: 500; letter-spacing: 0; }
.score-state { font-size: 11px; font-weight: 600; margin-top: 6px; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { font-size: 11px; font-weight: 500; padding: 4px 11px; border-radius: 999px; background: ${C.tint}; color: ${C.accentInk}; }
.note { margin-top: 20px; font-size: 11px; color: ${C.body}; background: ${C.tint}; border-radius: 10px; padding: 10px 14px; max-width: 460px; }
.cover-foot { display: flex; justify-content: space-between; font-size: 11px; color: ${C.muted}; border-top: 1px solid ${C.lineSoft}; padding-top: 14px; }

.section-head { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 12px; margin-bottom: 16px; border-bottom: 1px solid ${C.line}; }
h2 { font-size: 22px; font-weight: 700; letter-spacing: -0.03em; }
.section-sub { font-size: 12px; color: ${C.muted}; margin-top: 3px; }
.brand-mini { font-size: 11px; font-weight: 600; color: ${C.muted}; }
.prose-card { margin-bottom: 14px; }
.prose { font-size: 12px; line-height: 1.7; color: ${C.body}; margin-bottom: 8px; }
.prose:last-child { margin-bottom: 0; }
.prose strong { color: ${C.ink}; }
.bullet { display: flex; gap: 9px; margin-bottom: 7px; font-size: 12px; line-height: 1.6; color: ${C.body}; }
.dot { width: 5px; height: 5px; border-radius: 50%; background: ${C.accent}; flex-shrink: 0; margin-top: 7px; }
.issue { font-size: 12px; line-height: 1.55; color: ${C.ink}; background: ${C.dangerSoft}; border-radius: 10px; padding: 9px 12px; margin-bottom: 6px; }
.ok-box { font-size: 12px; font-weight: 600; color: ${C.success}; background: ${C.successSoft}; border-radius: 10px; padding: 12px; text-align: center; margin-top: 4px; }

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
.grid-2.tight { gap: 8px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 4px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 4px; }
.metric { text-align: left; }
.metric-value { font-size: 22px; font-weight: 700; letter-spacing: -0.02em; }
.metric-label { font-size: 12px; font-weight: 600; color: ${C.ink}; margin-top: 4px; }
.metric-sub { font-size: 10px; color: ${C.muted}; }
.stat { text-align: center; padding: 12px; }
.stat-value { font-size: 22px; font-weight: 700; }
.stat-label { font-size: 10px; color: ${C.muted}; margin-top: 2px; }
.field-text { font-size: 13px; font-weight: 600; line-height: 1.4; margin-bottom: 10px; }
.field-text.small { font-weight: 400; color: ${C.body}; font-size: 12px; }
.meter { height: 4px; border-radius: 4px; background: ${C.lineSoft}; overflow: hidden; margin-bottom: 6px; }
.meter div { height: 100%; border-radius: 4px; }
.meter-row { display: flex; justify-content: space-between; font-size: 10px; color: ${C.muted}; }

.kw { display: flex; justify-content: space-between; align-items: center; padding: 12px 14px; }
.kw-name { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
.tags { display: flex; gap: 4px; }
.tag { font-size: 9px; font-weight: 600; padding: 2px 7px; border-radius: 999px; background: ${C.tint}; color: ${C.accentInk}; }
.kw-num { text-align: right; }
.kw-num div { font-size: 18px; font-weight: 700; color: ${C.accent}; }
.kw-num span { font-size: 10px; color: ${C.muted}; }
.chips.left { justify-content: flex-start; }
.card.soft .chip { background: ${C.card}; }

.geo-top { display: grid; grid-template-columns: 170px 1fr; gap: 10px; margin-bottom: 10px; }
.center { text-align: center; }
.big-score { font-size: 44px; font-weight: 700; line-height: 1; margin-bottom: 6px; }
.big-count { font-size: 28px; font-weight: 700; }
.big-count span { font-size: 13px; color: ${C.muted}; font-weight: 500; }
.checks { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.check { display: flex; align-items: center; gap: 7px; font-size: 11px; font-weight: 500; border-radius: 9px; padding: 8px 10px; }
.check.pass { background: ${C.successSoft}; color: ${C.ink}; }
.check.fail { background: ${C.dangerSoft}; color: ${C.ink}; }
.check svg { flex-shrink: 0; }
.action { display: flex; gap: 12px; align-items: flex-start; padding: 12px 14px; margin-bottom: 6px; }
.action-body { flex: 1; font-size: 12px; }
.prio { font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 999px; flex-shrink: 0; }
.prio-critical { background: ${C.dangerSoft}; color: ${C.danger}; }
.prio-high { background: ${C.warningSoft}; color: ${C.warning}; }
.prio-medium, .prio-low { background: ${C.tint}; color: ${C.accentInk}; }
.code { background: ${C.ink}; color: #e3e8f2; font-family: 'Geist Mono', ui-monospace, monospace; font-size: 10px; line-height: 1.6; border-radius: 10px; padding: 14px; white-space: pre-wrap; }

.shots { display: grid; grid-template-columns: 3.2fr 1fr; gap: 16px; align-items: start; }
.shot { border: 1px solid ${C.line}; border-radius: 12px; overflow: hidden; background: ${C.card}; }
.shot img { width: 100%; display: block; }

.cta { background: ${C.ink}; color: ${C.paper}; border-radius: 18px; padding: 40px; text-align: center; }
.cta h2 { color: ${C.paper}; margin-bottom: 8px; }
.cta p { color: #c9cfdb; font-size: 13px; margin-bottom: 18px; }
.cta .small { margin: 16px 0 0; }
.button { display: inline-block; background: ${C.accent}; color: #fff; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 10px; }
</style>
</head>
<body>
${coverPage}
${aiPages}
${seoPage}
${performancePage}
${keywordsPage}
${geoPage}
${screenshotsPage}
${ctaPage}
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
    // networkidle also waits for the Geist web font; if it can't load, the PDF falls back
    // to the system font instead of failing.
    await page.setContent(html, { waitUntil: 'networkidle', timeout: 30000 })
    await page.evaluate(() => document.fonts?.ready).catch(() => {})
    await page.pdf({
        path: filename,
        format: 'A4',
        printBackground: true,
        margin: { top: '0px', bottom: '0px', left: '0px', right: '0px' }
    })
    await browser.close()
    return filename
}
