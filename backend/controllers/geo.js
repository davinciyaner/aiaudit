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

// Ein Eintrag pro check()-Aufruf unten, [issue, suggestion] zurueckgebend — dynamische Werte (Listen,
// Zahlen) kommen als Funktionsargumente rein statt fix eingebrannt zu sein. So bleiben DE/EN garantiert
// zu denselben Kriterien synchron, statt zwei an entfernten Stellen gepflegte String-Listen zu riskieren.
const MESSAGES = {
    de: {
        structuredData:   () => ['Kein Structured Data (JSON-LD) gefunden', 'Schema.org JSON-LD hinzufuegen — KI-Modelle lesen strukturierte Daten direkt aus'],
        organization:     () => ['Organization Schema fehlt', 'Organization Schema mit Name, URL, Description, Logo und sameAs (Social-Links) hinzufuegen'],
        faq:              () => ['FAQ Schema fehlt — sehr wichtig fuer KI-Zitate', 'FAQPage Schema hinzufuegen: KI zitiert FAQ-Antworten direkt in ihren Antworten'],
        websiteOrApp:     () => ['WebSite oder SoftwareApplication Schema fehlt', 'WebSite Schema mit SearchAction hinzufuegen, oder SoftwareApplication mit featureList und offers'],
        breadcrumb:       () => ['BreadcrumbList Schema fehlt', 'BreadcrumbList Schema hinzufuegen — hilft KI-Modellen und Google, die Seitenhierarchie zu verstehen'],
        brokenImages:     (list) => [list.length ? `Bild-Link(s) in strukturierten Daten sind kaputt (404): ${list.join(', ')}` : 'Bild-Links in strukturierten Daten kaputt', 'Alle image/logo-URLs im JSON-LD muessen erreichbar sein, sonst wirken die strukturierten Daten unglaubwuerdig'],
        faqMismatch:      (missing, total) => [`${missing} von ${total} FAQ-Antworten stehen im Schema, aber nicht im sichtbaren Server-HTML`, 'Alle FAQ-Antworten muessen als Text im initialen HTML vorhanden sein (z.B. via CSS-Transition statt Conditional-Unmount) — sonst sehen Crawler/LLMs nur die Fragen, nicht die Antworten'],
        testimonials:     () => ['Keine Kundenstimmen/Testimonials gefunden', 'Echte Kundenzitate oder Case Studies als Zitat-Block ergaenzen — starkes Vertrauenssignal fuer Nutzer und KI-Systeme'],
        llmsTxt:          () => ['llms.txt fehlt — wichtigste GEO-Datei', 'llms.txt unter /llms.txt ablegen: erklaert KI-Modellen direkt was dein Produkt macht'],
        llmsFullTxt:      () => ['llms-full.txt fehlt', 'llms-full.txt mit vollstaendigem Seiteninhalt hinzufuegen (erweiterter llms.txt-Standard)'],
        aiCrawlers:       (list) => [list.length ? `KI-Crawler blockiert: ${list.join(', ')}` : 'KI-Crawler blockiert', 'GPTBot, ClaudeBot, PerplexityBot und weitere KI-Crawler in robots.txt erlauben'],
        sitemap:          () => ['Keine sitemap.xml gefunden', 'sitemap.xml erstellen und in robots.txt verlinken — KI-Crawler nutzen sie zur vollstaendigen Indexierung'],
        directDefinition: () => ['Keine klare Produktdefinition gefunden', 'KI bevorzugt direkte Definitionen: "X is a tool that does Y" — klar und konkret in H1 oder erstem Absatz'],
        statistics:       () => ['Keine konkreten Zahlen oder Statistiken gefunden', 'KI zitiert spezifische Fakten: "analysiert in 60 Sekunden", "10.000 Nutzer" — konkret statt vage'],
        wordCount:        (n) => [`Zu wenig Content (${n} Woerter, Minimum: 800)`, 'Mindestens 800 Woerter informativen Content — KI braucht ausreichend Text um dich korrekt zitieren zu koennen'],
        h2Count:          (n) => [`Zu wenige Abschnitte (${n} H2-Tags, Minimum: 3)`, 'Mindestens 3-5 H2-Ueberschriften setzen fuer klare Themenstruktur die KI versteht'],
        externalLinks:    () => ['Keine externen Quellenverweise gefunden', 'Links zu autoritaeren Quellen (Studien, Docs, Wikipedia) erhoehen das Vertrauen von KI-Modellen in deine Inhalte'],
        authorInfo:       () => ['Keine Autor/About-Informationen gefunden', 'About-Seite, Autoren-Bio und Expertise-Signale hinzufuegen — E-E-A-T ist wichtig fuer KI-Vertrauen'],
        contactInfo:      () => ['Keine Kontaktinformationen gefunden', 'Kontaktdaten sichtbar machen — signalisiert KI-Modellen dass du ein legitimes Unternehmen bist'],
        privacyPolicy:    () => ['Keine Datenschutz/Impressum Links gefunden', 'Privacy Policy und Impressum verlinken — grundlegende Trust-Signale fuer KI und Suchmaschinen'],
        https:            () => ['Kein HTTPS — Seite nicht verschluesselt', 'HTTPS einrichten — Grundvoraussetzung fuer KI-Empfehlungen und Nutzervertrauen'],
        canonical:        () => ['Canonical Tag fehlt', 'Canonical Tag setzen damit KI-Crawler die kanonische URL eindeutig kennen'],
        lang:             () => ['HTML lang-Attribut fehlt', 'Sprache im HTML-Tag setzen (z.B. lang="de") — KI ordnet Inhalte sonst keiner Sprache zu'],
    },
    en: {
        structuredData:   () => ['No structured data (JSON-LD) found', 'Add Schema.org JSON-LD — AI models read structured data directly'],
        organization:     () => ['Organization schema missing', 'Add an Organization schema with name, URL, description, logo, and sameAs (social links)'],
        faq:              () => ['FAQ schema missing — very important for AI citations', 'Add an FAQPage schema: AI cites FAQ answers directly in its responses'],
        websiteOrApp:     () => ['WebSite or SoftwareApplication schema missing', 'Add a WebSite schema with SearchAction, or a SoftwareApplication schema with featureList and offers'],
        breadcrumb:       () => ['BreadcrumbList schema missing', 'Add a BreadcrumbList schema — helps AI models and Google understand your page hierarchy'],
        brokenImages:     (list) => [list.length ? `Image link(s) in structured data are broken (404): ${list.join(', ')}` : 'Image links in structured data are broken', 'Every image/logo URL in the JSON-LD must be reachable, otherwise the structured data looks untrustworthy'],
        faqMismatch:      (missing, total) => [`${missing} of ${total} FAQ answers are in the schema but not in the visible server HTML`, "Every FAQ answer must exist as text in the initial HTML (e.g. via a CSS transition instead of a conditional unmount) — otherwise crawlers/LLMs only see the questions, not the answers"],
        testimonials:     () => ['No customer testimonials found', 'Add real customer quotes or case studies as a quote block — a strong trust signal for users and AI systems'],
        llmsTxt:          () => ['llms.txt missing — the most important GEO file', 'Add an llms.txt at /llms.txt: tells AI models directly what your product does'],
        llmsFullTxt:      () => ['llms-full.txt missing', 'Add an llms-full.txt with the full page content (extended llms.txt standard)'],
        aiCrawlers:       (list) => [list.length ? `AI crawlers blocked: ${list.join(', ')}` : 'AI crawlers blocked', 'Allow GPTBot, ClaudeBot, PerplexityBot, and other AI crawlers in robots.txt'],
        sitemap:          () => ['No sitemap.xml found', 'Create a sitemap.xml and link it in robots.txt — AI crawlers use it for complete indexing'],
        directDefinition: () => ['No clear product definition found', 'AI prefers direct definitions: "X is a tool that does Y" — clear and concrete in the H1 or first paragraph'],
        statistics:       () => ['No concrete numbers or statistics found', 'AI cites specific facts: "analyzes in 60 seconds", "10,000 users" — be concrete, not vague'],
        wordCount:        (n) => [`Not enough content (${n} words, minimum: 800)`, 'At least 800 words of informative content — AI needs enough text to cite you correctly'],
        h2Count:          (n) => [`Too few sections (${n} H2 tags, minimum: 3)`, 'Add at least 3-5 H2 headings for a clear topic structure AI can understand'],
        externalLinks:    () => ['No external source references found', "Links to authoritative sources (studies, docs, Wikipedia) increase AI models' trust in your content"],
        authorInfo:       () => ['No author/about information found', 'Add an about page, author bio, and expertise signals — E-E-A-T matters for AI trust'],
        contactInfo:      () => ['No contact information found', "Make contact details visible — signals to AI models that you're a legitimate business"],
        privacyPolicy:    () => ['No privacy policy/imprint links found', 'Link to a privacy policy and imprint — basic trust signals for AI and search engines'],
        https:            () => ['No HTTPS — page is not encrypted', 'Set up HTTPS — a baseline requirement for AI recommendations and user trust'],
        canonical:        () => ['Canonical tag missing', 'Set a canonical tag so AI crawlers know the canonical URL unambiguously'],
        lang:             () => ['HTML lang attribute missing', "Set the language in the HTML tag (e.g. lang=\"en\") — otherwise AI won't attribute your content to any language"],
    },
}

// Gleiches Prinzip wie MESSAGES oben, fuer die priorisierte Empfehlungsliste am Ende — title/effort
// sind immer statisch, desc kann eine Funktion sein wenn sie dynamische Werte braucht.
const RECOMMENDATIONS = {
    de: {
        llmsTxt:          { priority: 'critical', title: 'llms.txt erstellen', desc: 'Die wichtigste GEO-Massnahme. KI-Assistenten lesen diese Datei um dein Produkt direkt zu verstehen und zu empfehlen.', effort: '15 Minuten' },
        faq:              { priority: 'critical', title: 'FAQ Schema hinzufuegen', desc: 'KI zitiert FAQ-Antworten direkt in ihren Antworten. Beantworte die 5 wichtigsten Fragen zu deinem Produkt als FAQPage Schema.', effort: '1-2 Stunden' },
        aiCrawlers:       { priority: 'critical', title: 'KI-Crawler freigeben', desc: (list) => `${list.join(', ')} sind in robots.txt blockiert. Solange das der Fall ist, erscheinst du nicht in KI-Antworten dieser Dienste.`, effort: '5 Minuten' },
        faqMismatch:      { priority: 'critical', title: 'FAQ-Antworten fehlen im Server-HTML', desc: (n) => `${n} FAQ-Antwort(en) stehen zwar im Schema, aber nicht als Text im HTML — vermutlich ein Akkordeon, das Antworten erst per Klick ins DOM laedt. Crawler ohne JS sehen sie nie.`, effort: '30 Minuten' },
        brokenImages:     { priority: 'high', title: 'Kaputte Bild-Links in strukturierten Daten reparieren', desc: (list) => `${list.length} Bild-URL(en) im JSON-LD liefern 404: ${list.join(', ')}`, effort: '15 Minuten' },
        organization:     { priority: 'high', title: 'Organization Schema', desc: 'Hilft KI-Modellen dein Unternehmen eindeutig zu identifizieren, korrekt zu benennen und sicher zu zitieren.', effort: '30 Minuten' },
        sitemap:          { priority: 'high', title: 'sitemap.xml erstellen', desc: 'KI-Crawler nutzen die Sitemap zur vollstaendigen Indexierung. Ohne Sitemap werden viele deiner Seiten nicht gefunden.', effort: '30 Minuten' },
        statistics:       { priority: 'medium', title: 'Konkrete Zahlen einbauen', desc: 'KI-Modelle zitieren spezifische Fakten deutlich haeufiger als vage Aussagen. "60 Sekunden" > "schnell".', effort: '1 Stunde' },
        directDefinition: { priority: 'medium', title: 'Klare Produktdefinition', desc: 'KI versteht "X is a tool that does Y" besser als Marketing-Sprache. Eine klare Definition im ersten Absatz genuegt.', effort: '30 Minuten' },
        lang:             { priority: 'medium', title: 'Sprache im HTML-Tag setzen', desc: 'lang="de" oder lang="en" im HTML-Tag — wichtig damit KI-Modelle deinen Content der richtigen Sprache zuordnen.', effort: '5 Minuten' },
        llmsFullTxt:      { priority: 'medium', title: 'llms-full.txt ergaenzen', desc: 'Erweiterter llms.txt-Standard mit vollstaendigem Seiteninhalt — hilft KI-Modellen, deine Inhalte vollstaendig zu erfassen.', effort: '30 Minuten' },
    },
    en: {
        llmsTxt:          { priority: 'critical', title: 'Create an llms.txt', desc: 'The most important GEO measure. AI assistants read this file to directly understand and recommend your product.', effort: '15 minutes' },
        faq:              { priority: 'critical', title: 'Add FAQ schema', desc: 'AI cites FAQ answers directly in its responses. Answer the 5 most important questions about your product as an FAQPage schema.', effort: '1-2 hours' },
        aiCrawlers:       { priority: 'critical', title: 'Unblock AI crawlers', desc: (list) => `${list.join(', ')} are blocked in robots.txt. As long as that's the case, you won't appear in AI responses from these services.`, effort: '5 minutes' },
        faqMismatch:      { priority: 'critical', title: 'FAQ answers missing from server HTML', desc: (n) => `${n} FAQ answer(s) are in the schema but not present as text in the HTML — likely an accordion that only loads answers into the DOM on click. Crawlers without JS never see them.`, effort: '30 minutes' },
        brokenImages:     { priority: 'high', title: 'Fix broken image links in structured data', desc: (list) => `${list.length} image URL(s) in the JSON-LD return a 404: ${list.join(', ')}`, effort: '15 minutes' },
        organization:     { priority: 'high', title: 'Organization schema', desc: 'Helps AI models clearly identify your business, name it correctly, and cite it with confidence.', effort: '30 minutes' },
        sitemap:          { priority: 'high', title: 'Create a sitemap.xml', desc: "AI crawlers use the sitemap for complete indexing. Without one, many of your pages won't be found.", effort: '30 minutes' },
        statistics:       { priority: 'medium', title: 'Add concrete numbers', desc: 'AI models cite specific facts far more often than vague claims. "60 seconds" beats "fast".', effort: '1 hour' },
        directDefinition: { priority: 'medium', title: 'Clear product definition', desc: 'AI understands "X is a tool that does Y" better than marketing language. A clear definition in the first paragraph is enough.', effort: '30 minutes' },
        lang:             { priority: 'medium', title: 'Set the language in the HTML tag', desc: 'lang="de" or lang="en" in the HTML tag — important so AI models attribute your content to the right language.', effort: '5 minutes' },
        llmsFullTxt:      { priority: 'medium', title: 'Add llms-full.txt', desc: 'Extended llms.txt standard with the full page content — helps AI models fully capture your content.', effort: '30 minutes' },
    },
}

export async function analyzeGEO(url, html, language) {
    const outputLang = language === 'en' ? 'en' : 'de'
    const M = MESSAGES[outputLang]

    const $ = cheerio.load(html)
    const issues = []
    const suggestions = []
    const score = { total: 0, max: 0 }

    function check(condition, points, key, ...args) {
        score.max += points
        if (condition) {
            score.total += points
        } else {
            const [issue, suggestion] = M[key](...args)
            issues.push(issue)
            suggestions.push(suggestion)
        }
    }

    const hostname = new URL(url).origin
    const pageTitle = $('title').text()
    const pageDescription = $('meta[name="description"]').attr('content') || ''

    const structuredDataScripts = $('script[type="application/ld+json"]')
    const structuredDataCount = structuredDataScripts.length
    let hasOrganization = false
    let hasSoftwareApp = false
    let hasFAQ = false
    let hasWebSite = false
    let hasArticle = false
    let hasBreadcrumb = false
    const faqAnswers = []       // { question, answer } aus allen FAQPage-Schemas
    const schemaImageUrls = new Set()

    const collectImageUrl = (val) => {
        if (!val) return
        if (typeof val === 'string') schemaImageUrls.add(val)
        else if (typeof val === 'object') {
            if (val.url) schemaImageUrls.add(val.url)
            if (val.contentUrl) schemaImageUrls.add(val.contentUrl)
        }
    }

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

                if (type === 'FAQPage' && Array.isArray(item.mainEntity)) {
                    item.mainEntity.forEach(q => {
                        const answer = (q.acceptedAnswer?.text || '').trim()
                        if (answer) faqAnswers.push({ question: q.name || '', answer })
                    })
                }

                collectImageUrl(item.image)
                collectImageUrl(item.logo)
                collectImageUrl(item.primaryImageOfPage)
            })
        } catch {}
    })

    check(structuredDataCount > 0, 7, 'structuredData')
    check(hasOrganization, 6, 'organization')
    check(hasFAQ, 8, 'faq')
    check(hasSoftwareApp || hasWebSite, 4, 'websiteOrApp')
    check(hasBreadcrumb, 3, 'breadcrumb')

    // Bild-Links aus JSON-LD (Person.image, Organization.logo, primaryImageOfPage) muessen
    // erreichbar sein — ein 404 in strukturierten Daten schadet der Glaubwuerdigkeit.
    let brokenSchemaImages = []
    if (schemaImageUrls.size > 0) {
        const checkedImages = await Promise.all(Array.from(schemaImageUrls).slice(0, 10).map(async imgUrl => {
            try {
                const res = await fetch(imgUrl, { method: 'HEAD', signal: AbortSignal.timeout(5000) })
                return { imgUrl, ok: res.ok }
            } catch {
                return { imgUrl, ok: false }
            }
        }))
        brokenSchemaImages = checkedImages.filter(r => !r.ok).map(r => r.imgUrl)
    }
    check(brokenSchemaImages.length === 0, 6, 'brokenImages', brokenSchemaImages)

    // Script/Style-Inhalte erst NACH der JSON-LD-Auswertung entfernen — sonst landen
    // JS-Bundle-Tokens (const, queryselector, ...) in Wortanzahl und Keyword-Checks.
    $('script, style, noscript').remove()
    const bodyText = $('body').text().replace(/\s+/g, ' ').toLowerCase()
    const metaDesc = ($('meta[name="description"]').attr('content') || '').toLowerCase()

    // FAQ-Schema vs. sichtbarer Content: prueft, ob jede im FAQPage-Schema versprochene
    // Antwort auch tatsaechlich als Text im Server-HTML steht — nicht nur die Frage.
    // Deckt genau das Akkordeon-Problem ab, bei dem Antworten erst per Klick ins DOM
    // gemountet werden und Crawler ohne JS-Ausfuehrung sie nie zu Gesicht bekommen.
    const faqAnswersMissingFromContent = faqAnswers.filter(({ answer }) => {
        const snippet = answer.slice(0, 40).toLowerCase().trim()
        return snippet.length > 10 && !bodyText.includes(snippet)
    })
    if (hasFAQ) {
        check(faqAnswersMissingFromContent.length === 0, 8, 'faqMismatch', faqAnswersMissingFromContent.length, faqAnswers.length)
    }

    const hasTestimonials = $('blockquote').length > 0 || $('[class*="testimonial" i], [class*="review" i]').length > 0
    check(hasTestimonials, 4, 'testimonials')

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

    check(hasLlmsTxt, 10, 'llmsTxt')
    check(hasLlmsFullTxt, 3, 'llmsFullTxt')

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
    check(blockedCrawlers.length === 0, 8, 'aiCrawlers', blockedCrawlers)

    let hasSitemap = false
    try {
        if (/sitemap:/i.test(robotsContent)) {
            hasSitemap = true
        } else {
            const sitemapRes = await fetch(`${hostname}/sitemap.xml`, { signal: AbortSignal.timeout(5000) })
            hasSitemap = sitemapRes.ok && (sitemapRes.headers.get('content-type') || '').includes('xml')
        }
    } catch {}
    check(hasSitemap, 5, 'sitemap')

    const hasDirectDefinition = (
        /\b(is a|is an|ist ein|ist eine|is the)\b/.test(bodyText) ||
        /\b(is a|is an|ist ein|ist eine)\b/.test(metaDesc)
    )
    check(hasDirectDefinition, 8, 'directDefinition')

    const hasStatistics = /\d+\s*(%|prozent)|\d+\s*(sekunden|seconds|ms|millisekunden)|\d+[\s.,]+\d*\s*(nutzer|users|kunden|clients|websites|seiten|pages)/i.test(bodyText)
    check(hasStatistics, 6, 'statistics')

    const wordCount = bodyText.split(/\s+/).filter(w => w.length > 2).length
    check(wordCount >= 800, 5, 'wordCount', wordCount)

    const h2Count = $('h2').length
    check(h2Count >= 3, 4, 'h2Count', h2Count)

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
    check(externalLinks.length > 0, 4, 'externalLinks')

    const hasAuthorInfo = (
        $('[rel="author"]').length > 0 ||
        $('meta[name="author"]').length > 0 ||
        bodyText.includes('about us') ||
        bodyText.includes('ueber uns') ||
        bodyText.includes('über uns') ||
        bodyText.includes('author') ||
        bodyText.includes('autor')
    )
    check(hasAuthorInfo, 5, 'authorInfo')

    const hasContactInfo = (
        $('a[href^="mailto:"]').length > 0 ||
        bodyText.includes('kontakt') ||
        bodyText.includes('contact') ||
        /\+[\d\s]{8,}/.test(bodyText)
    )
    check(hasContactInfo, 4, 'contactInfo')

    const hasPrivacyPolicy = $('a[href*="privacy"], a[href*="datenschutz"], a[href*="impressum"]').length > 0
    check(hasPrivacyPolicy, 3, 'privacyPolicy')

    const hasHTTPS = url.startsWith('https://')
    check(hasHTTPS, 5, 'https')

    const canonical = $('link[rel="canonical"]').attr('href')
    check(!!canonical, 3, 'canonical')

    const lang = $('html').attr('lang')
    check(!!lang, 4, 'lang')

    const scorePercent = Math.round((score.total / score.max) * 100)

    function rec(key, ...args) {
        const r = RECOMMENDATIONS[outputLang][key]
        return { priority: r.priority, title: r.title, desc: typeof r.desc === 'function' ? r.desc(...args) : r.desc, effort: r.effort }
    }

    const recommendations = []
    if (!hasLlmsTxt) recommendations.push(rec('llmsTxt'))
    if (!hasFAQ) recommendations.push(rec('faq'))
    if (blockedCrawlers.length > 0) recommendations.push(rec('aiCrawlers', blockedCrawlers))
    if (faqAnswersMissingFromContent.length > 0) recommendations.push(rec('faqMismatch', faqAnswersMissingFromContent.length))
    if (brokenSchemaImages.length > 0) recommendations.push(rec('brokenImages', brokenSchemaImages))
    if (!hasOrganization) recommendations.push(rec('organization'))
    if (!hasSitemap) recommendations.push(rec('sitemap'))
    if (!hasStatistics) recommendations.push(rec('statistics'))
    if (!hasDirectDefinition) recommendations.push(rec('directDefinition'))
    if (!lang) recommendations.push(rec('lang'))
    if (!hasLlmsFullTxt) recommendations.push(rec('llmsFullTxt'))

    const PRIORITY_RANK = { critical: 0, high: 1, medium: 2, low: 3 }
    recommendations.sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority])

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
            hasTestimonials,
            faqAnswersMissingFromContent: faqAnswersMissingFromContent.length,
            brokenSchemaImages,
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
        generatedLlmsTxt: generateLlmsTxt(url, pageTitle, pageDescription, outputLang),
        generatedSchema: generateSchemaOrg(url, pageTitle, pageDescription),
    }
}

function generateLlmsTxt(url, title, description, language) {
    const hostname = new URL(url).hostname
    const sitemapUrl = new URL('/sitemap.xml', url).href
    if (language === 'en') {
        return `# ${title || hostname}

> ${description || 'Website'}

## What is this?
${title || hostname} is a web service, available at ${url}.

## Key information
- URL: ${url}
- Description: ${description || 'See the website for details'}

## Sitemap
- ${sitemapUrl}

## For AI systems
This file follows the llms.txt standard (https://llmstxt.org).
`
    }
    return `# ${title || hostname}

> ${description || 'Website'}

## Was ist das?
${title || hostname} ist ein Webdienst, erreichbar unter ${url}.

## Wichtige Informationen
- URL: ${url}
- Beschreibung: ${description || 'Siehe Website fuer Details'}

## Sitemap
- ${sitemapUrl}

## Fuer KI-Systeme
Diese Datei folgt dem llms.txt-Standard (https://llmstxt.org).
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
