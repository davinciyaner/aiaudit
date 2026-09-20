import { load } from 'cheerio'

// Gleiches Prinzip wie in geo.js: ein Eintrag pro check()-Aufruf, [issue, suggestion] liefernd —
// dynamische Werte kommen als Funktionsargumente rein statt fix eingebrannt zu sein, damit DE/EN
// garantiert zu denselben Kriterien synchron bleiben.
const MESSAGES = {
    de: {
        title:            (len, text) => [`Titel zu ${len < 30 ? 'kurz' : 'lang'} (${len} Zeichen, ideal: 30-60): "${text}"`, 'Titel zwischen 30-60 Zeichen halten, wichtigstes Keyword zuerst.'],
        description:      (len, text) => [len === 0 ? 'Meta Description fehlt' : `Meta Description zu ${len < 120 ? 'kurz' : 'lang'} (${len} Zeichen): "${text}"`, 'Meta Description zwischen 120-160 Zeichen, Call-to-Action hinzufügen.'],
        h1:               (count) => [count === 0 ? 'Keine H1 Tags gefunden' : `${count} H1 Tags (nur 1 erlaubt)`, 'Nur ein H1 Tag pro Seite.'],
        h2:               () => ['Keine H2 Tags gefunden', 'Nutze H2 Tags für Unterüberschriften'],
        imagesAlt:        (without, total) => [`${without} von ${total} Bilder ohne Alt-Text.`, 'Alle Bilder mit beschreibendem Alt-Text versehen.'],
        canonical:        (url) => ['Kein Canonical Tag gefunden.', `Canonical Tag hinzufügen: <link rel="canonical" href="${url}">.`],
        ogTags:           () => ['Open Graph Tags unvollständig.', 'og:title, og:description und og:image hinzufügen für Social Sharing.'],
        twitterCard:      () => ['Twitter Card Meta Tags fehlen.', 'Twitter Card Tags hinzufügen für bessere Twitter-Vorschau.'],
        structuredData:   () => ['Kein Structured Data (JSON-LD) gefunden.', 'Schema.org Markup hinzufügen (WebSite, Organization, etc.).'],
        brokenImages:     (list) => [list.length ? `Bild-Link(s) in strukturierten Daten sind kaputt (404): ${list.join(', ')}` : 'Bild-Links in strukturierten Daten kaputt', 'Alle image/logo-URLs im JSON-LD muessen erreichbar sein, sonst verliert Google Vertrauen in die Rich-Result-Daten.'],
        noindex:          () => ['Seite auf noindex gesetzt!', 'Robots Meta Tag prüfen, noindex entfernen wenn nicht gewünscht.'],
        viewport:         () => ['Viewport Meta Tag fehlt — Seite nicht mobil-optimiert.', 'Füge hinzu: <meta name="viewport" content="width=device-width, initial-scale=1">'],
        lang:             () => ['HTML lang-Attribut fehlt.', 'Sprache im HTML-Tag setzen, z.B. <html lang="de">'],
        internalLinks:    () => ['Keine internen Links gefunden.', 'Interne Verlinkung verbessern für bessere SEO-Struktur.'],
        wordCount:        (n) => [`Zu wenig Text auf der Seite (${n} Wörter, Minimum: 300).`, 'Mindestens 300 Wörter relevanten Content auf der Seite haben.'],
        testimonials:     () => ['Keine Kundenstimmen/Testimonials gefunden.', 'Echte Kundenzitate oder Case Studies als Zitat-Block ergänzen — starkes Vertrauens- und Content-Signal.'],
    },
    en: {
        title:            (len, text) => [`Title too ${len < 30 ? 'short' : 'long'} (${len} characters, ideal: 30-60): "${text}"`, 'Keep the title between 30-60 characters, most important keyword first.'],
        description:      (len, text) => [len === 0 ? 'Meta description missing' : `Meta description too ${len < 120 ? 'short' : 'long'} (${len} characters): "${text}"`, 'Keep the meta description between 120-160 characters, add a call-to-action.'],
        h1:               (count) => [count === 0 ? 'No H1 tags found' : `${count} H1 tags (only 1 allowed)`, 'Use exactly one H1 tag per page.'],
        h2:               () => ['No H2 tags found', 'Use H2 tags for subheadings'],
        imagesAlt:        (without, total) => [`${without} of ${total} images without alt text.`, 'Add descriptive alt text to all images.'],
        canonical:        (url) => ['No canonical tag found.', `Add a canonical tag: <link rel="canonical" href="${url}">.`],
        ogTags:           () => ['Open Graph tags incomplete.', 'Add og:title, og:description, and og:image for social sharing.'],
        twitterCard:      () => ['Twitter Card meta tags missing.', 'Add Twitter Card tags for a better Twitter preview.'],
        structuredData:   () => ['No structured data (JSON-LD) found.', 'Add Schema.org markup (WebSite, Organization, etc.).'],
        brokenImages:     (list) => [list.length ? `Image link(s) in structured data are broken (404): ${list.join(', ')}` : 'Image links in structured data are broken', 'Every image/logo URL in the JSON-LD must be reachable, otherwise Google loses trust in the rich result data.'],
        noindex:          () => ['Page is set to noindex!', 'Check the robots meta tag, remove noindex if not intended.'],
        viewport:         () => ['Viewport meta tag missing — page is not mobile-optimized.', 'Add: <meta name="viewport" content="width=device-width, initial-scale=1">'],
        lang:             () => ['HTML lang attribute missing.', 'Set the language in the HTML tag, e.g. <html lang="en">'],
        internalLinks:    () => ['No internal links found.', 'Improve internal linking for a better SEO structure.'],
        wordCount:        (n) => [`Not enough text on the page (${n} words, minimum: 300).`, 'Have at least 300 words of relevant content on the page.'],
        testimonials:     () => ['No customer testimonials found.', 'Add real customer quotes or case studies as a quote block — a strong trust and content signal.'],
    },
}

export async function analyzeSEO(url, html, language) {
    const outputLang = language === 'en' ? 'en' : 'de'
    const M = MESSAGES[outputLang]

    const $ = load(html)
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

    const truncate = (s, n) => s.length > n ? s.slice(0, n) + '…' : s

    const title = $('title').text().trim()
    const titleLen = title.length
    check(titleLen >= 30 && titleLen <= 60, 10, 'title', titleLen, truncate(title, 70))

    const desc = $('meta[name="description"]').attr('content') || ''
    const descLen = desc.length
    check(descLen >= 120 && descLen <= 160, 10, 'description', descLen, truncate(desc, 90))

    const h1s = $('h1')
    check(h1s.length === 1, 10, 'h1', h1s.length)

    const h2s = $('h2')
    check(h2s.length > 0, 5, 'h2')

    const imgs = $('img')
    const imgsWithoutAlt = $('img:not([alt])').length
    check(imgsWithoutAlt === 0, 8, 'imagesAlt', imgsWithoutAlt, imgs.length)

    // Canonical
    const canonical = $('link[rel="canonical"]').attr('href')
    check(!!canonical, 7, 'canonical', url)

    // OG Tags
    const ogTitle = $('meta[property="og:title"]').attr('content')
    const ogDesc = $('meta[property="og:description"]').attr('content')
    const ogImage = $('meta[property="og:image"]').attr('content')
    check(!!ogTitle && !!ogDesc && !!ogImage, 8, 'ogTags')

    // Twitter Cards
    const twitterCard = $('meta[name="twitter:card"]').attr('content')
    check(!!twitterCard, 5, 'twitterCard')

    // Structured Data
    const structuredDataScripts = $('script[type="application/ld+json"]')
    const structuredData = structuredDataScripts.length
    check(structuredData > 0, 7, 'structuredData')

    // Bild-Links aus JSON-LD (Person.image, Organization.logo, primaryImageOfPage) muessen
    // erreichbar sein — ein 404 in strukturierten Daten kostet Rich-Result-Glaubwuerdigkeit.
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
            const items = Array.isArray(data) ? data : data['@graph'] ? data['@graph'] : [data]
            items.forEach(item => {
                collectImageUrl(item.image)
                collectImageUrl(item.logo)
                collectImageUrl(item.primaryImageOfPage)
            })
        } catch {}
    })
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

    // Script/Style-Inhalte raus, bevor wir Fliesstext extrahieren — sonst landen JS-Bundle-Tokens
    // (const, queryselector, ...) und CSS-Klassennamen in Wortanzahl und Keyword-Analyse.
    $('script, style, noscript').remove()

    // Robots Meta
    const robots = $('meta[name="robots"]').attr('content')
    check(!robots || !robots.includes('noindex'), 8, 'noindex')

    // Viewport
    const viewport = $('meta[name="viewport"]').attr('content')
    check(!!viewport, 8, 'viewport')

    // Lang-Attribut
    const lang = $('html').attr('lang')
    check(!!lang, 5, 'lang')

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

    check(internalLinks.length > 0, 5, 'internalLinks')

    // Word count
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim()
    const wordCount = bodyText.split(' ').filter(w => w.length > 2).length
    check(wordCount >= 300, 7, 'wordCount', wordCount)

    const hasTestimonials = $('blockquote').length > 0 || $('[class*="testimonial" i], [class*="review" i]').length > 0
    check(hasTestimonials, 4, 'testimonials')

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
        brokenSchemaImages,
        hasTestimonials,
        noindex: !!robots && robots.includes('noindex'),
        issues,
        suggestions,
    }
}
