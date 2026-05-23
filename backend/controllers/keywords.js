import * as cheerio from 'cheerio'

export async function analyzeKeywords(url, html) {
    const $ = cheerio.load(html)

    // Text aus wichtigen Bereichen extrahieren
    const title = $('title').text().toLowerCase()
    const h1Text = $('h1').text().toLowerCase()
    const h2Text = $('h2').map((_, el) => $(el).text()).get().join(' ').toLowerCase()
    const metaDesc = ($('meta[name="description"]').attr('content') || '').toLowerCase()
    const metaKeywords = ($('meta[name="keywords"]').attr('content') || '').toLowerCase()
    const bodyText = $('body').text().toLowerCase().replace(/\s+/g, ' ')

    // Keyword-Extraktion
    const stopWords = new Set([
        'und', 'oder', 'die', 'der', 'das', 'ein', 'eine', 'ist', 'sind', 'mit',
        'für', 'von', 'auf', 'an', 'in', 'zu', 'bei', 'nach', 'aus', 'the', 'and',
        'for', 'with', 'this', 'that', 'are', 'was', 'has', 'have', 'been', 'will',
        'from', 'they', 'their', 'what', 'which', 'when', 'how', 'not', 'but',
        'also', 'more', 'than', 'your', 'our', 'you', 'can', 'all', 'over'
    ])

    function extractKeywords(text, weight = 1) {
        return text.split(/[\s,.\-!?;:()/]+/)
            .filter(w => w.length > 3 && !stopWords.has(w) && !/^\d+$/.test(w))
            .map(w => ({ word: w, weight }))
    }

    // Gewichtete Keyword-Sammlung
    const allKeywords = [
        ...extractKeywords(title, 5),        // Title: höchste Priorität
        ...extractKeywords(h1Text, 4),        // H1: sehr wichtig
        ...extractKeywords(metaDesc, 3),      // Meta Desc: wichtig
        ...extractKeywords(h2Text, 2),        // H2: mittel
        ...extractKeywords(bodyText, 1),      // Body: Basis
    ]

    // Häufigkeit + Gewichtung berechnen
    const keywordMap = {}
    allKeywords.forEach(({ word, weight }) => {
        if (!keywordMap[word]) keywordMap[word] = { count: 0, score: 0 }
        keywordMap[word].count++
        keywordMap[word].score += weight
    })

    // Sortieren nach Score
    const sorted = Object.entries(keywordMap)
        .sort((a, b) => b[1].score - a[1].score)
        .slice(0, 30)
        .map(([keyword, data]) => ({
            keyword,
            count: data.count,
            score: data.score,
            inTitle: title.includes(keyword),
            inH1: h1Text.includes(keyword),
            inMeta: metaDesc.includes(keyword),
        }))

    // Top Keywords (behalten)
    const topKeywords = sorted.slice(0, 10)

    // Schwache Keywords (zu selten oder zu generisch)
    const weakKeywords = sorted.filter(k => k.count === 1 && !k.inTitle && !k.inH1)

    // Keyword-Dichte berechnen
    const totalWords = bodyText.split(/\s+/).length
    const keywordDensity = topKeywords.map(k => ({
        ...k,
        density: ((k.count / totalWords) * 100).toFixed(2) + '%'
    }))

    // Empfehlungen
    const recommendations = []

    const titleKeywords = sorted.filter(k => k.inTitle)
    if (titleKeywords.length < 3) {
        recommendations.push({
            type: 'add',
            message: 'Zu wenige Keywords im Title Tag — wichtigste Keywords einbauen',
            priority: 'high'
        })
    }

    const h1Keywords = sorted.filter(k => k.inH1)
    if (h1Keywords.length < 2) {
        recommendations.push({
            type: 'add',
            message: 'H1 enthält zu wenige Keywords — Hauptkeyword in H1 platzieren',
            priority: 'high'
        })
    }

    const notInMeta = topKeywords.filter(k => !k.inMeta).slice(0, 3)
    if (notInMeta.length > 0) {
        recommendations.push({
            type: 'optimize',
            message: `Top-Keywords nicht in Meta Description: ${notInMeta.map(k => k.keyword).join(', ')}`,
            priority: 'medium'
        })
    }

    if (weakKeywords.length > 5) {
        recommendations.push({
            type: 'remove',
            message: `${weakKeywords.length} Keywords erscheinen nur einmal und haben keinen SEO-Wert`,
            priority: 'low',
            keywords: weakKeywords.slice(0, 5).map(k => k.keyword)
        })
    }

    // Long-tail Keyword-Vorschläge basierend auf gefundenen Keywords
    const domain = new URL(url).hostname.replace('www.', '')
    const topTerms = topKeywords.slice(0, 3).map(k => k.keyword)
    const longTailSuggestions = topTerms.flatMap(term => [
        `${term} kostenlos`,
        `${term} ohne Gebühren`,
        `beste ${term} Seite`,
        `${term} 2026`,
        `wie ${term} funktioniert`,
    ]).slice(0, 10)

    return {
        topKeywords: keywordDensity,
        weakKeywords: weakKeywords.slice(0, 10).map(k => k.keyword),
        recommendations,
        longTailSuggestions,
        metaKeywords: metaKeywords.split(',').map(k => k.trim()).filter(Boolean),
        totalWords,
    }
}