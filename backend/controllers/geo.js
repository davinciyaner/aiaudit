import * as cheerio from 'cheerio'

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

    // 1. Structured Data
    const structuredDataScripts = $('script[type="application/ld+json"]')
    const structuredDataCount = structuredDataScripts.length
    let hasOrganization = false
    let hasSoftwareApp = false
    let hasFAQ = false
    let hasWebSite = false

    structuredDataScripts.each((_, el) => {
        try {
            const data = JSON.parse($(el).html())
            const type = data['@type'] || ''
            if (type === 'Organization' || type === 'LocalBusiness') hasOrganization = true
            if (type === 'SoftwareApplication' || type === 'WebApplication') hasSoftwareApp = true
            if (type === 'FAQPage') hasFAQ = true
            if (type === 'WebSite') hasWebSite = true
        } catch {}
    })

    check(structuredDataCount > 0, 8, 'Kein Structured Data (JSON-LD) gefunden', 'Schema.org Markup hinzufuegen - KI-Modelle lesen strukturierte Daten direkt aus')
    check(hasOrganization, 6, 'Organization Schema fehlt', 'Organization Schema mit Name, URL, Description und Logo hinzufuegen')
    check(hasSoftwareApp || hasWebSite, 6, 'SoftwareApplication oder WebSite Schema fehlt', 'SoftwareApplication Schema mit featureList und offers hinzufuegen')
    check(hasFAQ, 7, 'FAQ Schema fehlt - sehr wichtig fuer KI-Zitate', 'FAQPage Schema hinzufuegen: KI zitiert FAQ-Antworten direkt in ihren Responses')

    // 2. Direkte Definitionen
    const bodyText = $('body').text().replace(/\s+/g, ' ').toLowerCase()
    const metaDesc = ($('meta[name="description"]').attr('content') || '').toLowerCase()

    const hasDirectDefinition = bodyText.includes(' is a ') || bodyText.includes(' ist ein ') || bodyText.includes(' ist eine ') || metaDesc.includes(' is a ')
    check(hasDirectDefinition, 8, 'Keine direkte Definition des Produkts gefunden', 'KI bevorzugt klare Definitionen: "X is a tool that does Y" direkt in H1 oder erstem Paragraph')

    const hasStatistics = /\d+%|\d+ seconds|\d+ sekunden|\d+ms|\d+ users/i.test(bodyText)
    check(hasStatistics, 6, 'Keine konkreten Zahlen/Statistiken gefunden', 'KI zitiert gerne konkrete Daten: "Analysiert in 60 Sekunden", "20 Audits pro Monat"')

    // 3. llms.txt
    const hostname = new URL(url).origin
    let hasLlmsTxt = false
    try {
        const llmsRes = await fetch(`${hostname}/llms.txt`, { signal: AbortSignal.timeout(5000) })
        hasLlmsTxt = llmsRes.ok
    } catch {}
    check(hasLlmsTxt, 10, 'llms.txt fehlt - wichtigste GEO-Datei', 'llms.txt unter /llms.txt ablegen: erklaert KI-Modellen direkt was dein Produkt macht')

    // 4. robots.txt AI-Crawler
    let robotsAllowsAI = true
    try {
        const robotsRes = await fetch(`${hostname}/robots.txt`, { signal: AbortSignal.timeout(5000) })
        const robotsContent = await robotsRes.text()
        const blocksGPT = robotsContent.includes('User-agent: GPTBot') && robotsContent.includes('Disallow: /')
        const blocksClaude = robotsContent.includes('User-agent: ClaudeBot') && robotsContent.includes('Disallow: /')
        robotsAllowsAI = !blocksGPT && !blocksClaude
    } catch {}
    check(robotsAllowsAI, 8, 'KI-Crawler (GPTBot, ClaudeBot) blockiert', 'GPTBot, ClaudeBot und PerplexityBot in robots.txt erlauben')

    // 5. Content
    const wordCount = bodyText.split(' ').filter(w => w.length > 2).length
    const h2Count = $('h2').length
    check(wordCount >= 500, 6, `Zu wenig Content (${wordCount} Woerter)`, 'Mindestens 500 Woerter informativen Content einbauen')
    check(h2Count >= 3, 5, `Zu wenige Abschnitte (${h2Count} H2-Tags)`, 'Mindestens 3-5 H2-Ueberschriften fuer klare Themenstruktur')

    // 6. Vertrauen
    const hasAuthorInfo = $('[rel="author"]').length > 0 || $('meta[name="author"]').length > 0 || bodyText.includes('about us') || bodyText.includes('ueber uns')
    check(hasAuthorInfo, 5, 'Keine Author/About-Informationen', 'About-Seite und Autorenangaben hinzufuegen')

    const hasPrivacyPolicy = $('a[href*="privacy"], a[href*="datenschutz"], a[href*="impressum"]').length > 0
    check(hasPrivacyPolicy, 4, 'Keine Datenschutz/Impressum Links', 'Privacy Policy und Impressum verlinken')

    const hasHTTPS = url.startsWith('https://')
    check(hasHTTPS, 5, 'Kein HTTPS', 'HTTPS einrichten - Grundvoraussetzung fuer KI-Empfehlungen')

    const canonical = $('link[rel="canonical"]').attr('href')
    check(!!canonical, 4, 'Canonical Tag fehlt', 'Canonical Tag setzen damit KI-Crawler die richtige URL kennen')

    const scorePercent = Math.round((score.total / score.max) * 100)

    const recommendations = []
    if (!hasLlmsTxt) recommendations.push({ priority: 'critical', title: 'llms.txt erstellen', desc: 'Die wichtigste GEO-Massnahme. KI-Assistenten lesen diese Datei direkt.', effort: '15 Minuten' })
    if (!hasFAQ) recommendations.push({ priority: 'high', title: 'FAQ Schema hinzufuegen', desc: 'KI zitiert FAQ-Antworten direkt. Beantworte die wichtigsten Fragen zu deinem Produkt.', effort: '1-2 Stunden' })
    if (!hasOrganization) recommendations.push({ priority: 'high', title: 'Organization Schema', desc: 'Hilft KI dein Unternehmen eindeutig zu identifizieren.', effort: '30 Minuten' })
    if (!hasStatistics) recommendations.push({ priority: 'medium', title: 'Konkrete Zahlen einbauen', desc: 'KI zitiert spezifische Fakten. "60 Sekunden" wird oefter zitiert als "schnell".', effort: '1 Stunde' })
    if (!hasDirectDefinition) recommendations.push({ priority: 'medium', title: 'Klare Produktdefinition', desc: 'KI versteht "X is a tool that does Y" besser als Marketing-Sprache.', effort: '30 Minuten' })

    const pageTitle = $('title').text()
    const pageDesc = $('meta[name="description"]').attr('content') || ''

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
            hasLlmsTxt,
            robotsAllowsAI,
            hasDirectDefinition,
            hasStatistics,
            hasAuthorInfo,
            wordCount,
            h2Count,
            hasHTTPS,
            canonical: !!canonical,
        },
        recommendations,
        generatedLlmsTxt: generateLlmsTxt(url, pageTitle, pageDesc),
        generatedSchema: generateSchemaOrg(url, pageTitle, pageDesc),
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