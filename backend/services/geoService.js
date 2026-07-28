import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'

const anthropic  = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const openai     = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const perplexity = new OpenAI({ apiKey: process.env.perplexity_sitecheck, baseURL: 'https://api.perplexity.ai' })

// DataForSEO API — DATAFORSEO_LOGIN + DATAFORSEO_PASSWORD in .env (siehe auch seoService.js)
const DFS_LOGIN    = process.env.DATAFORSEO_LOGIN
const DFS_PASSWORD = process.env.DATAFORSEO_PASSWORD

function dfsAuth() {
    return Buffer.from(`${DFS_LOGIN}:${DFS_PASSWORD}`).toString('base64')
}

async function dfsPost(endpoint, body) {
    const res = await fetch(`https://api.dataforseo.com${endpoint}`, {
        method: 'POST',
        headers: { 'Authorization': `Basic ${dfsAuth()}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    return res.json()
}

const MAX_SITES    = 5
const MAX_KEYWORDS = 30

export { MAX_SITES, MAX_KEYWORDS }

export const PLATFORM_LABELS = {
    claude:      'Claude',
    chatgpt:     'ChatGPT',
    perplexity:  'Perplexity',
    google_aio:  'Google AI Overview',
}

// Cost per check in USD (approx 200 input + 400 output tokens)
export const PLATFORM_COSTS = {
    claude:     0.0066,  // Sonnet 4.6: $3/M in, $15/M out
    chatgpt:    0.0045,  // GPT-4o: $2.50/M in, $10/M out
    perplexity: 0.0056,  // Sonar: $1/M in+out, dominated by the ~$5/1000-request search fee
    google_aio: 0.0026,  // DataForSEO SERP Live Advanced (~$0.002) + load_async_ai_overview surcharge ($0.0006, refunded when no AI Overview appears)
}

// Reihenfolge = Priorität: bei promptVariants=1 wird nur 'empfehlung' genutzt, bei 2 kommt 'vergleich' dazu.
export const PROMPT_INTENTS = ['empfehlung', 'vergleich']

function buildQuery(keyword, language, intent = 'empfehlung') {
    if (intent === 'vergleich') {
        return language === 'de'
            ? `Was ist die beste Website, das beste Tool oder der beste Dienst für "${keyword}"? Vergleiche die Top-Optionen und nenne konkrete Domains oder Namen.`
            : `What is the best website, tool or service for "${keyword}"? Compare the top options and name specific domains or names.`
    }
    return language === 'de'
        ? `Ich suche nach Empfehlungen für: "${keyword}". Welche Websites, Tools oder Dienste kennst du dazu und würdest du empfehlen? Nenne konkrete Domains oder Namen.`
        : `I'm looking for recommendations for: "${keyword}". Which websites, tools or services do you know and would recommend? Please name specific domains or names.`
}

// Für Google AI Overview gibt's keinen Chat-Prompt, sondern eine echte Google-Suchanfrage —
// die Intent-Variante ändert hier die Suchphrase, nicht einen Gesprächssatz.
function buildSearchQuery(keyword, language, intent = 'empfehlung') {
    if (intent === 'vergleich') {
        return language === 'de' ? `beste ${keyword}` : `best ${keyword}`
    }
    return keyword
}

function extractMention(response, domain) {
    const normalizedDomain = domain.replace(/^www\./, '').toLowerCase()
    const mentioned = response.toLowerCase().includes(normalizedDomain)
    let context = null
    if (mentioned) {
        const sentences = response.split(/(?<=[.!?])\s+/)
        const hit = sentences.find(s => s.toLowerCase().includes(normalizedDomain))
        context = hit?.trim() || null
    }
    return { mentioned, context }
}

function urlMatchesDomain(url, normalizedDomain) {
    try {
        const host = new URL(url).hostname.replace(/^www\./, '').toLowerCase()
        return host === normalizedDomain || host.endsWith(`.${normalizedDomain}`)
    } catch {
        return false
    }
}

function safeHostname(url) {
    try {
        return new URL(url).hostname.replace(/^www\./, '').toLowerCase()
    } catch {
        return null
    }
}

// Claude/ChatGPT liefern ohne Web-Search-Tool keine strukturierten Quellen — Domain-Namen im
// Fließtext per Regex erkennen ist die kostenlose Notlösung, um trotzdem "wer wird sonst noch
// genannt" (Share of Voice) zu bekommen. Bewusst auf gängige TLDs beschränkt, um Fehltreffer wie
// "z.B." oder "Version 2.0" zu vermeiden.
const DOMAIN_MENTION_REGEX = /\b[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9-]+)*\.(?:com|de|net|org|io|co|app|ai|dev|info|eu|at|ch|tools?|shop)\b/gi

function extractDomainMentions(text, excludeDomain) {
    const normalizedExclude = excludeDomain.replace(/^www\./, '').toLowerCase()
    const found = [...text.matchAll(DOMAIN_MENTION_REGEX)].map(m => m[0].toLowerCase())
    const unique = [...new Set(found)].filter(d => d !== normalizedExclude && !d.endsWith(`.${normalizedExclude}`))
    return unique.map(domain => ({ url: null, domain, title: null, snippet: null }))
}

// Sentiment nur bei mentioned:true berechnen — kostet praktisch nichts (winziger Haiku-Call auf
// bereits vorhandenen Kontext-Text) und skaliert mit Erfolg statt mit Check-Volumen.
async function classifySentiment(context, domain) {
    if (!context) return null
    try {
        const msg = await anthropic.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 8,
            messages: [{
                role: 'user',
                content: `Ist diese Erwähnung von "${domain}" positiv, neutral oder negativ? Antworte nur mit genau einem Wort: positive, neutral oder negative.\n\nText: "${context}"`,
            }],
        })
        const answer = (msg.content[0]?.text || '').trim().toLowerCase()
        if (answer.includes('positiv')) return 'positive'
        if (answer.includes('negativ')) return 'negative'
        return 'neutral'
    } catch (err) {
        console.error(`[geoService] Sentiment-Klassifizierung fehlgeschlagen für "${domain}":`, err.message)
        return null
    }
}

// Perplexity liefert echte Quellen-Metadaten (search_results, citations) statt nur Fließtext —
// das ist der Unterschied zwischen "Marke genannt" und "als Quelle zitiert". Reihenfolge:
// 1) search_results (Titel+Snippet als Kontext, beste Qualität) 2) citations (nur URL) 3) Fließtext-Fallback.
// `citations` im Rückgabewert enthält ALLE zitierten Quellen (nicht nur die eigene Domain) — Basis
// für "welche Seiten werden stattdessen zitiert und warum".
function extractPerplexityCitation(res, domain) {
    const normalizedDomain = domain.replace(/^www\./, '').toLowerCase()

    const citations = (res.search_results || []).map(r => ({
        url: r.url, domain: safeHostname(r.url), title: r.title || null, snippet: r.snippet || null,
    }))
    if (!citations.length) {
        for (const url of res.citations || []) {
            citations.push({ url, domain: safeHostname(url), title: null, snippet: null })
        }
    }

    const searchHit = citations.find(c => c.domain && (c.domain === normalizedDomain || c.domain.endsWith(`.${normalizedDomain}`)))
    if (searchHit) return { mentioned: true, context: searchHit.snippet || searchHit.title || null, citations }

    const textResult = extractMention(res.choices[0].message.content, domain)
    return { ...textResult, citations }
}

async function checkWithClaude(keyword, domain, language, intent) {
    const msg = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 400,
        messages: [{ role: 'user', content: buildQuery(keyword, language, intent) }],
    })
    const text = msg.content[0].text
    return { ...extractMention(text, domain), citations: extractDomainMentions(text, domain) }
}

async function checkWithChatGPT(keyword, domain, language, intent) {
    const res = await openai.chat.completions.create({
        model: 'gpt-4o',
        max_tokens: 400,
        messages: [{ role: 'user', content: buildQuery(keyword, language, intent) }],
    })
    const text = res.choices[0].message.content
    return { ...extractMention(text, domain), citations: extractDomainMentions(text, domain) }
}

async function checkWithPerplexity(keyword, domain, language, intent) {
    const res = await perplexity.chat.completions.create({
        model: 'sonar',
        max_tokens: 400,
        messages: [{ role: 'user', content: buildQuery(keyword, language, intent) }],
    })
    return extractPerplexityCitation(res, domain)
}

// DataForSEO's Live-Advanced-Endpoint liefert vereinzelt einen transienten 40101 "Internal SE Server
// Error", der beim direkten Retry meist verschwindet (in eigenen Tests wie auch live beobachtet) —
// ohne Retry würde das fälschlich als "nicht erwähnt" statt als fehlgeschlagener Check gespeichert.
async function dfsPostWithRetry(endpoint, body, keyword, retries = 1) {
    for (let attempt = 0; ; attempt++) {
        const data = await dfsPost(endpoint, body)
        const task = data.tasks?.[0]
        if (task?.status_code === 20000 || attempt >= retries) return data
        console.warn(`[geoService] Google AI Overview transienter Fehler bei "${keyword}" (Versuch ${attempt + 1}/${retries + 1}):`, task?.status_code, task?.status_message)
        await new Promise(r => setTimeout(r, 1500))
    }
}

async function checkWithGoogleAIOverview(keyword, domain, language, intent) {
    if (!DFS_LOGIN || !DFS_PASSWORD) {
        console.warn('[geoService] DATAFORSEO_LOGIN/PASSWORD nicht gesetzt — Google AI Overview Check übersprungen')
        return { mentioned: false, context: null, citations: [] }
    }

    const data = await dfsPostWithRetry('/v3/serp/google/organic/live/advanced', [{
        keyword: buildSearchQuery(keyword, language, intent),
        location_name: language === 'de' ? 'Germany' : 'United States',
        language_code: language,
        device: 'desktop',
        load_async_ai_overview: true,
    }], keyword)

    const task = data.tasks?.[0]
    if (task?.status_code !== 20000) {
        console.warn(`[geoService] Google AI Overview endgültig fehlgeschlagen bei "${keyword}":`, task?.status_code, task?.status_message)
        return { mentioned: false, context: null, citations: [] }
    }

    const items = task.result?.[0]?.items || []
    const overview = items.find(i => i.type === 'ai_overview')
    if (!overview) return { mentioned: false, context: null, citations: [] }

    const citations = (overview.references || []).map(r => ({
        url: r.url, domain: (r.domain || safeHostname(r.url) || '').replace(/^www\./, '').toLowerCase(),
        title: r.title || r.source || null, snippet: r.text || null,
    }))

    const normalizedDomain = domain.replace(/^www\./, '').toLowerCase()
    const match = citations.find(c => c.domain === normalizedDomain || c.domain.endsWith(`.${normalizedDomain}`))

    return { mentioned: !!match, context: match?.snippet || null, citations }
}

const PLATFORM_FNS = {
    claude:     checkWithClaude,
    chatgpt:    checkWithChatGPT,
    perplexity: checkWithPerplexity,
    google_aio: checkWithGoogleAIOverview,
}

export async function checkSiteMentions(site, variantCount = 1) {
    const platforms = site.platforms?.length ? site.platforms : ['claude']
    const intents = PROMPT_INTENTS.slice(0, Math.max(1, Math.min(variantCount, PROMPT_INTENTS.length)))
    const results = []

    for (const keyword of site.keywords) {
        for (const platform of platforms) {
            const fn = PLATFORM_FNS[platform]
            if (!fn) continue
            for (const intent of intents) {
                try {
                    const result = await fn(keyword, site.domain, site.language, intent)
                    const sentiment = result.mentioned ? await classifySentiment(result.context, site.domain) : null
                    results.push({ keyword, platform, promptIntent: intent, ...result, sentiment })
                } catch (err) {
                    console.error(`[geoService] ${platform}/${intent} Fehler bei "${keyword}":`, err.message)
                    results.push({ keyword, platform, promptIntent: intent, mentioned: false, context: null, citations: [], sentiment: null })
                }
                await new Promise(r => setTimeout(r, 300))
            }
        }
    }
    return results
}