import * as cheerio from 'cheerio'

const MESSAGES = {
    de: {
        fewTitleKeywords: () => 'Zu wenige Keywords im Title Tag - wichtigste Keywords einbauen',
        fewH1Keywords: () => 'H1 enthält zu wenige Keywords - Hauptkeyword in H1 platzieren',
        notInMeta: (list) => `Top-Keywords nicht in Meta Description: ${list.join(', ')}`,
        weakKeywords: (n) => `${n} Keywords erscheinen nur einmal und haben keinen SEO-Wert`,
    },
    en: {
        fewTitleKeywords: () => 'Too few keywords in the title tag - add your most important keywords',
        fewH1Keywords: () => 'H1 contains too few keywords - place your main keyword in the H1',
        notInMeta: (list) => `Top keywords missing from the meta description: ${list.join(', ')}`,
        weakKeywords: (n) => `${n} keywords appear only once and have no SEO value`,
    },
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

    // Keyword-Extraktion - deutsche Liste bewusst breit (Pronomen, Artikel, Hilfsverben,
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

    // Long-tail suggestions: real 2-4 word phrases from title, H1, H2 and meta description
    // (the terms the page already targets), ranked by where they appear and how often they
    // recur in the body. Replaces the old "<single word> + kostenlos/Test/2026" templates,
    // which produced suggestions like "website kostenlos" or "wie visibility funktioniert".
    const domain = new URL(url).hostname.replace('www.', '')
    const brandTerms = new Set(['scanora', domain.split('.')[0]])
    const genericOnly = new Set(['website', 'webseite', 'seite', 'page', 'tool', 'tools', 'jetzt', 'kostenlos', 'free', 'mehr', 'more', 'neu', 'new'])
    // Sentence glue that makes a phrase read like a fragment of marketing copy instead of a
    // search query ("empfiehlt dich chatgpt"); search-style verbs (tracken, prüfen, ...) stay.
    const fragmentWords = new Set(['dich', 'dir', 'mich', 'mir', 'uns', 'euch', 'sich', 'sieh', 'siehst', 'empfiehlt', 'empfehlen',
        'bekommst', 'bekommt', 'findest', 'findet', 'hilft', 'helfen', 'macht', 'machen', 'gibt', 'geht', 'lässt', 'kostenloser', 'kostenlose',
        'meisten', 'kaum', 'wenige', 'einige', 'manche', 'oft', 'selten', 'wirklich', 'welche', 'welcher', 'bedeutet', 'mehrere', 'pro',
        'you', 'see', 'get', 'gets', 'recommend', 'recommends', 'helps', 'makes', 'lets', 'free',
        'on', 'of', 'to', 'in', 'at', 'by', 'or', 'an', 'is', 'be', 'as', 'it', 'we', 'us', 'most', 'many', 'few', 'orders'])
    const phraseSources = [
        [title, 5],
        [h1Text, 4],
        [metaDesc, 3],
        // question headings (FAQ) break apart into fragments like "welche ki-plattformen trackt"
        ...$('h2, h3').map((_, el) => [[$(el).text().toLowerCase(), 2]]).get().filter(([t]) => !t.includes('?')),
    ]
    const topicTerms = new Set(sorted.slice(0, 20).map(k => k.keyword).filter(k => !brandTerms.has(k)))
    const phraseScores = new Map()
    for (const [text, weight] of phraseSources) {
        // split into runs of content words; stop words and punctuation end a run
        const runs = text.split(/[|.,!?;:()"“”„«»\[\]/–—]+/).flatMap(chunk => {
            const out = [[]]
            for (const w of chunk.trim().split(/\s+/)) {
                const clean = w.replace(/^[-'’&]+|[-'’&]+$/g, '')
                if (!clean || clean.length < 2 || stopWords.has(clean) || /^\d+$/.test(clean)) { out.push([]); continue }
                out[out.length - 1].push(clean)
            }
            return out.filter(r => r.length >= 2)
        })
        for (const run of runs) {
            for (let n = 2; n <= Math.min(4, run.length); n++) {
                for (let i = 0; i + n <= run.length; i++) {
                    const words = run.slice(i, i + n)
                    if (words.every(w => genericOnly.has(w) || brandTerms.has(w))) continue
                    if (words.some(w => brandTerms.has(w))) continue
                    if (words.some(w => fragmentWords.has(w))) continue
                    // must touch the page's actual topic, otherwise UI headings like "url eingeben" slip in
                    if (!words.some(w => topicTerms.has(w) || [...topicTerms].some(t => w.includes(t) && t.length > 3))) continue
                    const phrase = words.join(' ')
                    const bodyHits = bodyText.split(phrase).length - 1
                    phraseScores.set(phrase, (phraseScores.get(phrase) || 0) + weight + Math.min(bodyHits, 5))
                }
            }
        }
    }
    const ranked = [...phraseScores.entries()].sort((a, b) => b[1] - a[1] || b[0].length - a[0].length).map(([p]) => p)
    // drop phrases fully contained in a higher-ranked one ("ki sichtbarkeit" vs "ki sichtbarkeit tracken")
    const longTailSuggestions = []
    for (const p of ranked) {
        if (longTailSuggestions.some(q => q.includes(p) || p.includes(q))) continue
        longTailSuggestions.push(p)
        if (longTailSuggestions.length === 8) break
    }

    return {
        topKeywords: keywordDensity,
        weakKeywords: weakKeywords.slice(0, 10).map(k => k.keyword),
        recommendations,
        longTailSuggestions,
        metaKeywords: metaKeywords.split(',').map(k => k.trim()).filter(Boolean),
        totalWords,
    }
}