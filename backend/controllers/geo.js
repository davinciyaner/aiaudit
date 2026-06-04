import * as cheerio from 'cheerio'

const AI_CRAWLERS = [
    'GPTBot',
    'ClaudeBot',
    'PerplexityBot',
    'Applebot-Extended',
    'amazonbot',
    'cohere-ai',
    'Bytespider',
    'CCBot',
    'anthropic-ai',
    'YouBot',
]

export async function analyzeGEO(url, html) {
    const $ = cheerio.load(html)
    const issues = []
    const suggestions = []
    const score = { total: 0, max: 0 }

    function check(condition, points, issue, suggestion) {
        score.max += points
        if (condition) {
            score.total += points
        } else {
            issues.push(issue)
            suggestions.push(suggestion)
        }
    }

    const hostname = new URL(url).origin
    const bodyText = $('body').text().replace(/\s+/g, ' ').toLowerCase()
    const metaDesc = ($('meta[name="description"]').attr('content') || '').toLowerCase()
    const pageTitle = $('title').text()
    const pageDescription = $('meta[name="description"]').attr('content') || ''

    // ─── 1. STRUCTURED DATA ───────────────────────────────────────────
    const structuredDataScripts = $('script[type="application/ld+json"]')
    const structuredDataCount = structuredDataScripts.length
    let hasOrganization = false
    let hasSoftwareApp = false
    let hasFAQ = false
    let hasWebSite = false
    let hasArticle = false
    let hasBreadcrumb = false

    structuredDataScripts.each((_, el) => {
        try {
            const data = JSON.parse($(el).html())
            const items = Array.isArray(data)
                ? data
                : data['@graph']
                    ? data['@graph']
                    : [data]

            items.forEach(item => {
                const type = item['@type'] || ''
                if (type === 'Organization' || type === 'LocalBusiness' || type === 'Corporation') hasOrganization = true
                if (type === 'SoftwareApplication' || type === 'WebApplication') hasSoftwareApp = true
                if (type === 'FAQPage') hasFAQ = true
                if (type === 'WebSite') hasWebSite = true
                if (type === 'Article' || type === 'BlogPosting' || type === 'NewsArticle') hasArticle = true
                if (type === 'BreadcrumbList') hasBreadcrumb = true
            })
        } catch {}
    })

    check(structuredDataCount > 0, 7,
        'Kein Structured Data (JSON-LD) gefunden',
        'Schema.org JSON-LD hinzufuegen — KI-Modelle lesen strukturierte Daten direkt aus')
    check(hasOrganization, 6,
        'Organization Schema fehlt',
        'Organization Schema mit Name, URL, Description, Logo und sameAs (Social-Links) hinzufuegen')
    check(hasFAQ, 8,
        'FAQ Schema fehlt — sehr wichtig fuer KI-Zitate',
        'FAQPage Schema hinzufuegen: KI zitiert FAQ-Antworten direkt in ihren Antworten')
    check(hasSoftwareApp || hasWebSite, 4,
        'WebSite oder SoftwareApplication Schema fehlt',
        'WebSite Schema mit SearchAction hinzufuegen, oder SoftwareApplication mit featureList und offers')

    // ─── 2. KI-INDEXIERBARKEIT ─────────────────────────────────────────
    let hasLlmsTxt = false
    let hasLlmsFullTxt = false
    try {
        const [llmsRes, llmsFullRes] = await Promise.all([
            fetch(`${hostname}/llms.txt`, { signal: AbortSignal.timeout(5000) }),
            fetch(`${hostname}/llms-full.txt`, { signal: AbortSignal.timeout(5000) }),
        ])
        hasLlmsTxt = llmsRes.ok
        hasLlmsFullTxt = llmsFullRes.ok
    } catch {}

    check(hasLlmsTxt, 10,
        'llms.txt fehlt — wichtigste GEO-Datei',
        'llms.txt unter /llms.txt ablegen: erklaert KI-Modellen direkt was dein Produkt macht')
    check(hasLlmsFullTxt, 3,
        'llms-full.txt fehlt',
        'llms-full.txt mit vollstaendigem Seiteninhalt hinzufuegen (erweiterter llms.txt-Standard)')

    // robots.txt — mehrere KI-Crawler pruefen
    let robotsContent = ''
    try {
        const robotsRes = await fetch(`${hostname}/robots.txt`, { signal: AbortSignal.timeout(5000) })
        if (robotsRes.ok) robotsContent = await robotsRes.text()
    } catch {}

    const blockedCrawlers = AI_CRAWLERS.filter(bot => {
        const idx = robotsContent.toLowerCase().indexOf(`user-agent: ${bot.toLowerCase()}`)
        if (idx === -1) return false
        const after = robotsContent.slice(idx)
        return /disallow:\s*\//i.test(after.split('\n').slice(0, 5).join('\n'))
    })
    check(blockedCrawlers.length === 0, 8,
        blockedCrawlers.length > 0
            ? `KI-Crawler blockiert: ${blockedCrawlers.join(', ')}`
            : 'KI-Crawler blockiert',
        'GPTBot, ClaudeBot, PerplexityBot und weitere KI-Crawler in robots.txt erlauben')

    // sitemap.xml
    let hasSitemap = false
    try {
        if (/sitemap:/i.test(robotsContent)) {
            hasSitemap = true
        } else {
            const sitemapRes = await fetch(`${hostname}/sitemap.xml`, { signal: AbortSignal.timeout(5000) })
            hasSitemap = sitemapRes.ok && (sitemapRes.headers.get('content-type') || '').includes('xml')
        }
    } catch {}
    check(hasSitemap, 5,
        'Keine sitemap.xml gefunden',
        'sitemap.xml erstellen und in robots.txt verlinken — KI-Crawler nutzen sie zur vollstaendigen Indexierung')

    // ─── 3. CONTENT-QUALITAET ─────────────────────────────────────────
    const hasDirectDefinition = (
        /\b(is a|is an|ist ein|ist eine|is the)\b/.test(bodyText) ||
        /\b(is a|is an|ist ein|ist eine)\b/.test(metaDesc)
    )
    check(hasDirectDefinition, 8,
        'Keine klare Produktdefinition gefunden',
        'KI bevorzugt direkte Definitionen: "X is a tool that does Y" — klar und konkret in H1 oder erstem Absatz')

    const hasStatistics = /\d+\s*(%|prozent)|\d+\s*(sekunden|seconds|ms|millisekunden)|\d+[\s.,]+\d*\s*(nutzer|users|kunden|clients|websites|seiten|pages)/i.test(bodyText)
    check(hasStatistics, 6,
        'Keine konkreten Zahlen oder Statistiken gefunden',
        'KI zitiert spezifische Fakten: "analysiert in 60 Sekunden", "10.000 Nutzer" — konkret statt vage')

    const wordCount = bodyText.split(/\s+/).filter(w => w.length > 2).length
    check(wordCount >= 800, 5,
        `Zu wenig Content (${wordCount} Woerter, Minimum: 800)`,
        'Mindestens 800 Woerter informativen Content — KI braucht ausreichend Text um dich korrekt zitieren zu koennen')

    const h2Count = $('h2').length
    check(h2Count >= 3, 4,
        `Zu wenige Abschnitte (${h2Count} H2-Tags, Minimum: 3)`,
        'Mindestens 3-5 H2-Ueberschriften setzen fuer klare Themenstruktur die KI versteht')

    const externalLinks = []
    $('a[href]').each((_, el) => {
        const href = $(el).attr('href') || ''
        try {
            const linkUrl = new URL(href, url)
            if (linkUrl.hostname !== new URL(url).hostname && href.startsWith('http')) {
                externalLinks.push(href)
            }
        } catch {}
    })
    check(externalLinks.length > 0, 4,
        'Keine externen Quellenverweise gefunden',
        'Links zu autoritaeren Quellen (Studien, Docs, Wikipedia) erhoehen das Vertrauen von KI-Modellen in deine Inhalte')

    // ─── 4. VERTRAUEN / E-E-A-T ───────────────────────────────────────
    const hasAuthorInfo = (
        $('[rel="author"]').length > 0 ||
        $('meta[name="author"]').length > 0 ||
        bodyText.includes('about us') ||
        bodyText.includes('ueber uns') ||
        bodyText.includes('über uns') ||
        bodyText.includes('author') ||
        bodyText.includes('autor')
    )
    check(hasAuthorInfo, 5,
        'Keine Autor/About-Informationen gefunden',
        'About-Seite, Autoren-Bio und Expertise-Signale hinzufuegen — E-E-A-T ist wichtig fuer KI-Vertrauen')

    const hasContactInfo = (
        $('a[href^="mailto:"]').length > 0 ||
        bodyText.includes('kontakt') ||
        bodyText.includes('contact') ||
        /\+[\d\s]{8,}/.test(bodyText)
    )
    check(hasContactInfo, 4,
        'Keine Kontaktinformationen gefunden',
        'Kontaktdaten sichtbar machen — signalisiert KI-Modellen dass du ein legitimes Unternehmen bist')

    const hasPrivacyPolicy = $('a[href*="privacy"], a[href*="datenschutz"], a[href*="impressum"]').length > 0
    check(hasPrivacyPolicy, 3,
        'Keine Datenschutz/Impressum Links gefunden',
        'Privacy Policy und Impressum verlinken — grundlegende Trust-Signale fuer KI und Suchmaschinen')

    // ─── 5. TECHNISCH ─────────────────────────────────────────────────
    const hasHTTPS = url.startsWith('https://')
    check(hasHTTPS, 5,
        'Kein HTTPS — Seite nicht verschluesselt',
        'HTTPS einrichten — Grundvoraussetzung fuer KI-Empfehlungen und Nutzervertrauen')

    const canonical = $('link[rel="canonical"]').attr('href')
    check(!!canonical, 3,
        'Canonical Tag fehlt',
        'Canonical Tag setzen damit KI-Crawler die kanonische URL eindeutig kennen')

    const lang = $('html').attr('lang')
    check(!!lang, 4,
        'HTML lang-Attribut fehlt',
        'Sprache im HTML-Tag setzen (z.B. lang="de") — KI ordnet Inhalte sonst keiner Sprache zu')

    // ─── SCORE ────────────────────────────────────────────────────────
    const scorePercent = Math.round((score.total / score.max) * 100)

    // ─── EMPFEHLUNGEN (priorisiert) ───────────────────────────────────
    const recommendations = []
    if (!hasLlmsTxt) recommendations.push({
        priority: 'critical',
        title: 'llms.txt erstellen',
        desc: 'Die wichtigste GEO-Massnahme. KI-Assistenten lesen diese Datei um dein Produkt direkt zu verstehen und zu empfehlen.',
        effort: '15 Minuten',
    })
    if (!hasFAQ) recommendations.push({
        priority: 'critical',
        title: 'FAQ Schema hinzufuegen',
        desc: 'KI zitiert FAQ-Antworten direkt in ihren Antworten. Beantworte die 5 wichtigsten Fragen zu deinem Produkt als FAQPage Schema.',
        effort: '1-2 Stunden',
    })
    if (blockedCrawlers.length > 0) recommendations.push({
        priority: 'critical',
        title: 'KI-Crawler freigeben',
        desc: `${blockedCrawlers.join(', ')} sind in robots.txt blockiert. Solange das der Fall ist, erscheinst du nicht in KI-Antworten dieser Dienste.`,
        effort: '5 Minuten',
    })
    if (!hasOrganization) recommendations.push({
        priority: 'high',
        title: 'Organization Schema',
        desc: 'Hilft KI-Modellen dein Unternehmen eindeutig zu identifizieren, korrekt zu benennen und sicher zu zitieren.',
        effort: '30 Minuten',
    })
    if (!hasSitemap) recommendations.push({
        priority: 'high',
        title: 'sitemap.xml erstellen',
        desc: 'KI-Crawler nutzen die Sitemap zur vollstaendigen Indexierung. Ohne Sitemap werden viele deiner Seiten nicht gefunden.',
        effort: '30 Minuten',
    })
    if (!hasStatistics) recommendations.push({
        priority: 'medium',
        title: 'Konkrete Zahlen einbauen',
        desc: 'KI-Modelle zitieren spezifische Fakten deutlich haeufiger als vage Aussagen. "60 Sekunden" > "schnell".',
        effort: '1 Stunde',
    })
    if (!hasDirectDefinition) recommendations.push({
        priority: 'medium',
        title: 'Klare Produktdefinition',
        desc: 'KI versteht "X is a tool that does Y" besser als Marketing-Sprache. Eine klare Definition im ersten Absatz genuegt.',
        effort: '30 Minuten',
    })
    if (!lang) recommendations.push({
        priority: 'medium',
        title: 'Sprache im HTML-Tag setzen',
        desc: 'lang="de" oder lang="en" im HTML-Tag — wichtig damit KI-Modelle deinen Content der richtigen Sprache zuordnen.',
        effort: '5 Minuten',
    })

    return {
        score: scorePercent,
        issues,
        suggestions,
        checks: {
            hasStructuredData: structuredDataCount > 0,
            hasOrganization,
            hasSoftwareApp,
            hasFAQ,
            hasWebSite,
            hasArticle,
            hasBreadcrumb,
            hasLlmsTxt,
            hasLlmsFullTxt,
            robotsAllowsAI: blockedCrawlers.length === 0,
            blockedCrawlers,
            hasSitemap,
            hasDirectDefinition,
            hasStatistics,
            hasAuthorInfo,
            hasContactInfo,
            hasPrivacyPolicy,
            wordCount,
            h2Count,
            hasHTTPS,
            canonical: !!canonical,
            hasLang: !!lang,
            externalLinksCount: externalLinks.length,
        },
        recommendations,
        generatedLlmsTxt: generateLlmsTxt(url, pageTitle, pageDescription),
        generatedSchema: generateSchemaOrg(url, pageTitle, pageDescription),
    }
}

function generateLlmsTxt(url, title, description) {
    const hostname = new URL(url).hostname
    return `# ${title || hostname}

> ${description || 'Website'}

## What is this?
${title || hostname} is a web service available at ${url}.

## Key Information
- URL: ${url}
- Description: ${description || 'See website for details'}

## Sitemap
- ${url}/sitemap.xml

## For AI Systems
This file follows the llms.txt standard (https://llmstxt.org).
`
}

function generateSchemaOrg(url, title, description) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: title,
        url: url,
        description: description,
    }
}