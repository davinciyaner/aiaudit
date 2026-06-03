import { load } from 'cheerio'


export async function analyzeSEO(url, html) {
    const $ = load(html)
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

    const title = $('title').text().trim()
    const titleLen = title.length
    check(titleLen >= 30 && titleLen <= 60, 10,
        `Titel zu ${titleLen < 30 ? 'short' : 'long'} (${titleLen} Zeichen, ideal: 30-60).`,
        'Titel zwischen 30-60 Zeichen halten, wichtigstes Keyword zuerst.')

    const desc = $('meta[name="description"]').attr('content') || ''
    const descLen = desc.length
    check(descLen >= 120 && descLen <= 160, 10,
        `Meta Description ${descLen === 0 ? 'fehlt' : `zu ${descLen < 120 ? 'kurz' : 'lang'} (${descLen} Zeichen).`}`,
        'Meta Description zwischen 120-160 Zeichen, Call-to-Action hinzufügen.')

    const h1s = $('h1')
    check(h1s.length === 1, 10,
        h1s.length === 0 ? 'Keine H1 Tags gefunden' : `${h1s.length} H1 Tags (nur 1 erlaubt)`, 'Nur ein H1 Tag pro Seite.')

    const h2s = $('h2')
    check(h2s.length > 0, 5,
        'Keine H2 Tags gefunden',
        'Nutze H2 Tags für Unterüberschriften')

    const imgs = $('img')
    const imgsWithoutAlt = $('img:not([alt])').length
    check(imgsWithoutAlt === 0, 8,
        `${imgsWithoutAlt} von ${imgs.length} Bilder ohne Alt-Text.`,
        'Alle Bilder mit beschreibendem Alt-Text versehen.')

    // Canonical
    const canonical = $('link[rel="canonical"]').attr('href')
    check(!!canonical, 7,
        'Kein Canonical Tag gefunden.',
        `Canonical Tag hinzufügen: <link rel="canonical" href="${url}">.`)

    // OG Tags
    const ogTitle = $('meta[property="og:title"]').attr('content')
    const ogDesc = $('meta[property="og:description"]').attr('content')
    const ogImage = $('meta[property="og:image"]').attr('content')
    check(!!ogTitle && !!ogDesc && !!ogImage, 8,
        'Open Graph Tags unvollständig.',
        'og:title, og:description und og:image hinzufügen für Social Sharing.')

    // Twitter Cards
    const twitterCard = $('meta[name="twitter:card"]').attr('content')
    check(!!twitterCard, 5,
        'Twitter Card Meta Tags fehlen.',
        'Twitter Card Tags hinzufügen für bessere Twitter-Vorschau.')

    // Structured Data
    const structuredData = $('script[type="application/ld+json"]').length
    check(structuredData > 0, 7,
        'Kein Structured Data (JSON-LD) gefunden.',
        'Schema.org Markup hinzufügen (WebSite, Organization, etc.).')

    // Robots Meta
    const robots = $('meta[name="robots"]').attr('content')
    check(!robots || !robots.includes('noindex'), 8,
        'Seite auf noindex gesetzt!',
        'Robots Meta Tag prüfen, noindex entfernen wenn nicht gewünscht.')

    // Viewport
    const viewport = $('meta[name="viewport"]').attr('content')
    check(!!viewport, 8,
        'Viewport Meta Tag fehlt — Seite nicht mobil-optimiert.',
        'Füge hinzu: <meta name="viewport" content="width=device-width, initial-scale=1">')

    // Lang-Attribut
    const lang = $('html').attr('lang')
    check(!!lang, 5,
        'HTML lang-Attribut fehlt.',
        'Sprache im HTML-Tag setzen, z.B. <html lang="de">')

    // Links
    const internalLinks = []
    const externalLinks = []
    const brokenLinks = []
    const hostname = new URL(url).hostname

    $('a[href]').each((_, el) => {
        const href = $(el).attr('href')
        if (!href || href.startsWith('#') || href.startsWith('mailto:')) return
        try {
            const linkUrl = new URL(href, url)
            if (linkUrl.hostname === hostname) {
                internalLinks.push(href)
            } else {
                externalLinks.push(href)
            }
        } catch { brokenLinks.push(href) }
    })

    check(internalLinks.length > 0, 5,
        'Keine internen Links gefunden.',
        'Interne Verlinkung verbessern für bessere SEO-Struktur.')

    // Word count
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim()
    const wordCount = bodyText.split(' ').filter(w => w.length > 2).length
    check(wordCount >= 300, 7,
        `Zu wenig Text auf der Seite (${wordCount} Wörter, Minimum: 300).`,
        'Mindestens 300 Wörter relevanten Content auf der Seite haben.')

    // Keywords aus Title extrahieren
    const keywords = title.toLowerCase()
        .split(/[\s\-|,]+/)
        .filter(w => w.length > 3)

    const scorePercent = Math.round((score.total / score.max) * 100)

    return {
        score: scorePercent,
        title: { text: title, length: titleLen },
        description: { text: desc, length: descLen },
        headings: {
            h1: h1s.map((_, el) => $(el).text()).get(),
            h2: h2s.map((_, el) => $(el).text()).get(),
        },
        links: {
            internal: internalLinks.length,
            external: externalLinks.length,
            broken: brokenLinks,
        },
        images: { total: imgs.length, withoutAlt: imgsWithoutAlt },
        wordCount,
        keywords,
        canonical,
        structuredData: structuredData > 0,
        issues,
        suggestions,
    }
}