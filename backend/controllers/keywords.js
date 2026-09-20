import * as cheerio from 'cheerio'

const MESSAGES = {
    de: {
        fewTitleKeywords: () => 'Zu wenige Keywords im Title Tag — wichtigste Keywords einbauen',
        fewH1Keywords: () => 'H1 enthält zu wenige Keywords — Hauptkeyword in H1 platzieren',
        notInMeta: (list) => `Top-Keywords nicht in Meta Description: ${list.join(', ')}`,
        weakKeywords: (n) => `${n} Keywords erscheinen nur einmal und haben keinen SEO-Wert`,
    },
    en: {
        fewTitleKeywords: () => 'Too few keywords in the title tag — add your most important keywords',
        fewH1Keywords: () => 'H1 contains too few keywords — place your main keyword in the H1',
        notInMeta: (list) => `Top keywords missing from the meta description: ${list.join(', ')}`,
        weakKeywords: (n) => `${n} keywords appear only once and have no SEO value`,
    },
}

// "kostenlos"/"Vergleich"/"wie X funktioniert" sind DE-Templates; EN braucht eigene
// grammatisch passende Muster statt einer woertlichen Uebersetzung.
const LONGTAIL_TEMPLATES = {
    de: (term) => [`${term} kostenlos`, `${term} Test`, `${term} Vergleich`, `${term} 2026`, `wie ${term} funktioniert`],
    en: (term) => [`${term} free`, `${term} review`, `${term} vs`, `${term} 2026`, `how does ${term} work`],
}

export async function analyzeKeywords(url, html, language) {
    const outputLang = language === 'en' ? 'en' : 'de'
    const M = MESSAGES[outputLang]

    const $ = cheerio.load(html)
    $('script, style, noscript').remove()

    // Text aus wichtigen Bereichen extrahieren
    const title = $('title').text().toLowerCase()
    const h1Text = $('h1').text().toLowerCase()
    const h2Text = $('h2').map((_, el) => $(el).text()).get().join(' ').toLowerCase()
    const metaDesc = ($('meta[name="description"]').attr('content') || '').toLowerCase()
    const metaKeywords = ($('meta[name="keywords"]').attr('content') || '').toLowerCase()
    const bodyText = $('body').text().toLowerCase().replace(/\s+/g, ' ')

    // Keyword-Extraktion — deutsche Liste bewusst breit (Pronomen, Artikel, Hilfsverben,
    // Konjunktionen), sonst rutschen haeufige Fuellwoerter wie "deine" oder "auch" als
    // vermeintliches Top-Keyword durch und erzeugen sinnlose Long-Tail-Vorschlaege daraus.
    const stopWords = new Set([
        // Artikel/Pronomen
        'und', 'oder', 'die', 'der', 'das', 'des', 'dem', 'den', 'ein', 'eine', 'einer', 'eines', 'einem', 'einen',
        'ich', 'du', 'dein', 'deine', 'deiner', 'deines', 'deinem', 'deinen', 'mein', 'meine', 'meiner', 'meines',
        'meinem', 'meinen', 'sein', 'seine', 'seiner', 'ihr', 'ihre', 'ihrer', 'unser', 'unsere', 'euer', 'eure',
        'wir', 'ihr', 'sie', 'es', 'man', 'diese', 'dieser', 'dieses', 'diesem', 'diesen', 'jede', 'jeder', 'jedes',
        'alle', 'alles', 'kein', 'keine', 'keiner',
        // Hilfs-/Modalverben (haeufigste Formen)
        'ist', 'sind', 'war', 'waren', 'sein', 'bin', 'bist', 'seid', 'wird', 'werden', 'wurde', 'wurden',
        'hat', 'haben', 'hatte', 'hatten', 'kann', 'können', 'konnte', 'muss', 'müssen', 'musste',
        'soll', 'sollen', 'sollte', 'will', 'wollen', 'wollte', 'darf', 'dürfen',
        // Praepositionen/Konjunktionen/Adverbien
        'für', 'von', 'vom', 'auf', 'an', 'am', 'in', 'im', 'zu', 'zum', 'zur', 'bei', 'nach', 'aus', 'als',
        'wenn', 'weil', 'dass', 'ob', 'wie', 'was', 'wer', 'wo', 'wann', 'warum', 'auch', 'noch', 'nur',
        'schon', 'sehr', 'mehr', 'viel', 'viele', 'so', 'doch', 'aber', 'denn', 'dann', 'also', 'sowie',
        'nicht', 'kein', 'über', 'unter', 'durch', 'gegen', 'ohne', 'um', 'bis', 'seit', 'zwischen', 'hier',
        'dort', 'jetzt', 'heute', 'immer', 'kannst', 'wirst',
        // Englisch
        'the', 'and', 'for', 'with', 'this', 'that', 'are', 'was', 'has', 'have', 'been', 'will',
        'from', 'they', 'their', 'what', 'which', 'when', 'how', 'not', 'but', 'you', 'your', 'yours',
        'also', 'more', 'than', 'our', 'can', 'all', 'over', 'about', 'into', 'just', 'like', 'get',
        'its', 'his', 'her', 'she', 'him', 'them', 'who', 'whom', 'would', 'could', 'should',
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
            message: M.fewTitleKeywords(),
            priority: 'high'
        })
    }

    const h1Keywords = sorted.filter(k => k.inH1)
    if (h1Keywords.length < 2) {
        recommendations.push({
            type: 'add',
            message: M.fewH1Keywords(),
            priority: 'high'
        })
    }

    const notInMeta = topKeywords.filter(k => !k.inMeta).slice(0, 3)
    if (notInMeta.length > 0) {
        recommendations.push({
            type: 'optimize',
            message: M.notInMeta(notInMeta.map(k => k.keyword)),
            priority: 'medium'
        })
    }

    if (weakKeywords.length > 5) {
        recommendations.push({
            type: 'remove',
            message: M.weakKeywords(weakKeywords.length),
            priority: 'low',
            keywords: weakKeywords.slice(0, 5).map(k => k.keyword)
        })
    }

    // Long-tail Keyword-Vorschläge basierend auf gefundenen Keywords
    const domain = new URL(url).hostname.replace('www.', '')

    // Plattform-/Marken-Begriffe wie "google" oder "chatgpt" tauchen oft haeufig auf (weil die
    // Seite ueber sie schreibt), sind aber als Long-Tail-Ziel sinnlos — niemand sucht "google 2026"
    // und man kann nicht fuer "Google" ranken. Fuer die Vorschlags-Templates raus, aus der reinen
    // Keyword-Haeufigkeitsanzeige oben aber bewusst nicht (die zeigt korrekt, was auf der Seite steht).
    const nonBrandableTerms = new Set([
        'google', 'chatgpt', 'claude', 'gemini', 'perplexity', 'openai', 'anthropic', 'microsoft',
        'scanora', domain.split('.')[0],
    ])
    const topTerms = topKeywords.filter(k => !nonBrandableTerms.has(k.keyword)).slice(0, 3).map(k => k.keyword)
    // "beste X Seite"/"X ohne Gebühren" klingen bei vielen Begriffen holprig ("beste website
    // Seite"). Diese Muster passen grammatisch auf praktisch jedes Substantiv/jeden Markennamen.
    const buildLongTail = LONGTAIL_TEMPLATES[outputLang]
    const longTailSuggestions = topTerms.flatMap(term => buildLongTail(term)).slice(0, 10)

    return {
        topKeywords: keywordDensity,
        weakKeywords: weakKeywords.slice(0, 10).map(k => k.keyword),
        recommendations,
        longTailSuggestions,
        metaKeywords: metaKeywords.split(',').map(k => k.trim()).filter(Boolean),
        totalWords,
    }
}