import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'
import { jsonrepair } from 'jsonrepair'

// Explizites Timeout — ohne das warten die SDKs bis zu 10 Minuten pro Anfrage, was bei
// CHECK_CONCURRENCY=5 einen ganzen Batch blockieren und den Gesamt-Check extrem verzögern kann.
const CHECK_TIMEOUT_MS = 45000

const anthropic  = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, timeout: CHECK_TIMEOUT_MS })
const openai     = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: CHECK_TIMEOUT_MS })
const perplexity = new OpenAI({ apiKey: process.env.perplexity_sitecheck, baseURL: 'https://api.perplexity.ai', timeout: CHECK_TIMEOUT_MS })

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
        signal: AbortSignal.timeout(CHECK_TIMEOUT_MS),
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

export const PLATFORM_COSTS = {
    claude:     0.0066,  // Sonnet 4.6: $3/M in, $15/M out
    chatgpt:    0.0045,  // GPT-4o: $2.50/M in, $10/M out
    perplexity: 0.0056,  // Sonar: $1/M in+out, dominated by the ~$5/1000-request search fee
    google_aio: 0.0026,  // DataForSEO SERP Live Advanced (~$0.002) + load_async_ai_overview surcharge ($0.0006, refunded when no AI Overview appears)
}

export const PROMPT_INTENTS = ['empfehlung', 'vergleich']

export function buildQuery(keyword, language, intent = 'empfehlung') {
    if (intent === 'vergleich') {
        return language === 'de'
            ? `Was ist die beste Website, das beste Tool oder der beste Dienst für "${keyword}"? Vergleiche die Top-Optionen und nenne konkrete Domains oder Namen.`
            : `What is the best website, tool or service for "${keyword}"? Compare the top options and name specific domains or names.`
    }
    return language === 'de'
        ? `Ich suche nach Empfehlungen für: "${keyword}". Welche Websites, Tools oder Dienste kennst du dazu und würdest du empfehlen? Nenne konkrete Domains oder Namen.`
        : `I'm looking for recommendations for: "${keyword}". Which websites, tools or services do you know and would recommend? Please name specific domains or names.`
}


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

const DOMAIN_MENTION_REGEX = /\b[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9-]+)*\.(?:com|de|net|org|io|co|app|ai|dev|info|eu|at|ch|tools?|shop)\b/gi

function extractDomainMentions(text, excludeDomain) {
    const normalizedExclude = excludeDomain.replace(/^www\./, '').toLowerCase()
    const found = [...text.matchAll(DOMAIN_MENTION_REGEX)].map(m => m[0].toLowerCase())
    const unique = [...new Set(found)].filter(d => d !== normalizedExclude && !d.endsWith(`.${normalizedExclude}`))
    return unique.map(domain => ({ url: null, domain, title: null, snippet: null }))
}

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

async function withRateLimitRetry(fn, label, retries = 4, baseDelay = 3000) {
    for (let attempt = 0; ; attempt++) {
        try {
            return await fn()
        } catch (err) {
            if (err.status !== 429 || attempt >= retries) throw err
            const delay = baseDelay * 2 ** attempt
            console.warn(`[geoService] ${label} rate limit erreicht, retry in ${delay}ms (Versuch ${attempt + 1}/${retries + 1})`)
            await new Promise(r => setTimeout(r, delay))
        }
    }
}

async function checkWithClaude(keyword, domain, language, intent) {
    const msg = await withRateLimitRetry(() => anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 400,
        messages: [{ role: 'user', content: buildQuery(keyword, language, intent) }],
    }), 'claude')
    const text = msg.content[0].text
    return { ...extractMention(text, domain), citations: extractDomainMentions(text, domain) }
}

async function checkWithChatGPT(keyword, domain, language, intent) {
    const res = await withRateLimitRetry(() => openai.chat.completions.create({
        model: 'gpt-4o',
        max_tokens: 400,
        messages: [{ role: 'user', content: buildQuery(keyword, language, intent) }],
    }), 'chatgpt')
    const text = res.choices[0].message.content
    return { ...extractMention(text, domain), citations: extractDomainMentions(text, domain) }
}

async function checkWithPerplexity(keyword, domain, language, intent) {
    const res = await withRateLimitRetry(() => perplexity.chat.completions.create({
        model: 'sonar',
        max_tokens: 400,
        messages: [{ role: 'user', content: buildQuery(keyword, language, intent) }],
    }), 'perplexity')
    return extractPerplexityCitation(res, domain)
}

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

async function checkOneCombination(site, keyword, platform, intent) {
    const fn = PLATFORM_FNS[platform]
    if (!fn) return null
    try {
        const result = await fn(keyword, site.domain, site.language, intent)
        const sentiment = result.mentioned ? await classifySentiment(result.context, site.domain) : null
        return { keyword, platform, promptIntent: intent, ...result, sentiment }
    } catch (err) {
        console.error(`[geoService] ${platform}/${intent} Fehler bei "${keyword}":`, err.message)
        return { keyword, platform, promptIntent: intent, mentioned: false, context: null, citations: [], sentiment: null }
    }
}

// Wie checkOneCombination, aber als zwei separat aufrufbare Stufen (Mention-Check und
// Sentiment-Klassifizierung getrennt), damit ein Aufrufer den Fortschritt dazwischen
// persistieren kann (z.B. für einen Live-Status beim einmaligen Gratis-Check).
export async function checkPlatformMention(platform, keyword, domain, language, intent = 'empfehlung') {
    const fn = PLATFORM_FNS[platform]
    if (!fn) return { mentioned: false, context: null, citations: [] }
    try {
        return await fn(keyword, domain, language, intent)
    } catch (err) {
        console.error(`[geoService] ${platform}/${intent} Fehler bei "${keyword}":`, err.message)
        return { mentioned: false, context: null, citations: [] }
    }
}

export async function classifySentimentSafe(context, domain) {
    try {
        return await classifySentiment(context, domain)
    } catch {
        return null
    }
}

const CHECK_CONCURRENCY = 5

export async function checkSiteMentions(site, variantCount = 1) {
    const platforms = site.platforms?.length ? site.platforms : ['claude']
    const intents = PROMPT_INTENTS.slice(0, Math.max(1, Math.min(variantCount, PROMPT_INTENTS.length)))

    const combos = []
    for (const keyword of site.keywords) {
        for (const intent of intents) {
            combos.push({ keyword, intent })
        }
    }

    const results = []
    for (let i = 0; i < combos.length; i += CHECK_CONCURRENCY) {
        const batch = combos.slice(i, i + CHECK_CONCURRENCY)
        const batchResults = await Promise.all(batch.map(async ({ keyword, intent }) => {
            const perPlatform = await Promise.all(
                platforms.map(platform => checkOneCombination(site, keyword, platform, intent))
            )
            return perPlatform.filter(Boolean)
        }))
        results.push(...batchResults.flat())
    }
    return results
}

export async function getAiKeywordVolume(keywords, location = 'Germany', language = 'de') {
    if (!DFS_LOGIN || !DFS_PASSWORD || !keywords.length) return []

    const data = await dfsPost('/v3/ai_optimization/ai_keyword_data/keywords_search_volume/live', [{
        keywords: keywords.slice(0, 50),
        location_name: location,
        language_code: language,
    }])

    const items = data?.tasks?.[0]?.result?.[0]?.items || []
    return items.map(item => ({
        keyword: item.keyword,
        aiSearchVolume: item.ai_search_volume ?? null,
    }))
}

export async function classifyGeoSuitableKeywords(keywords, language = 'de') {
    if (!keywords.length) return []

    const langLabel = language === 'de' ? 'Deutsch' : 'English'
    const msg = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1500,
        messages: [{
            role: 'user',
            content: `Hier ist eine Liste von SEO-Keywords auf ${langLabel}. Wähle NUR die Keywords aus, die jemand realistisch als Empfehlungsfrage an ein KI-Modell wie ChatGPT stellen würde (z.B. "Welches Tool empfiehlst du für X?", "Was ist die beste Alternative zu X?"). Lass enge, technische Rechercheanfragen weg, die man nur bei Google eingibt, aber nie einer KI stellt (z.B. spezifische Metriken, Anleitungen, reine Informationsbegriffe ohne Produkt-/Tool-Bezug).

Keywords:
${keywords.map(k => `- ${k}`).join('\n')}

Antworte NUR mit einem JSON-Objekt in diesem Format, ohne weiteren Text: {"suitable": ["keyword1", "keyword2"]}`,
        }],
    })

    const text = msg.content[0]?.text || ''
    const start = text.indexOf('{')
    const end   = text.lastIndexOf('}')
    if (start === -1 || end === -1) return []

    const extracted = text.slice(start, end + 1)
    let parsed
    try {
        parsed = JSON.parse(extracted)
    } catch {
        parsed = JSON.parse(jsonrepair(extracted))
    }

    const suitable = new Set((parsed.suitable || []).map(k => k.toLowerCase().trim()))
    return keywords.filter(k => suitable.has(k.toLowerCase().trim()))
}