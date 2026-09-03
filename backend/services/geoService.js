import Anthropic from '@anthropic-ai/sdk'
import { jsonrepair } from 'jsonrepair'

// Explizites Timeout — ohne das warten die SDKs bis zu 10 Minuten pro Anfrage, was bei
// CHECK_CONCURRENCY=5 einen ganzen Batch blockieren und den Gesamt-Check extrem verzögern kann.
const CHECK_TIMEOUT_MS = 45000

// anthropic wird nur noch für Sentiment-Klassifizierung und Keyword-Eignungs-Klassifizierung
// direkt genutzt (siehe classifySentiment/classifyGeoSuitableKeywords) — die eigentlichen
// Plattform-Checks (Claude/ChatGPT/Gemini/Perplexity) laufen über DataForSEOs LLM Responses API,
// siehe checkWithLlmResponses weiter unten.
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, timeout: CHECK_TIMEOUT_MS })

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
    gemini:      'Gemini',
    perplexity:  'Perplexity',
    google_aio:  'Google AI Overview',
}

// Aus echten Live-Testcalls gegen DataForSEOs LLM Responses API übernommen — jeweils Mittelwert
// aus den Prompts für beide Intents (empfehlung/vergleich), money_spent-Feld der Antwort +
// 0,0006 $ DataForSEO-Grundgebühr, mit den produktiv genutzten Modellen (siehe LLM_RESPONSES_MODEL
// unten). Nicht geschätzt — Antwortlänge (und damit Kosten) schwankt aber real pro Aufruf; die
// echten money_spent-Werte werden pro Call zusätzlich geloggt (siehe checkWithLlmResponses).
export const PLATFORM_COSTS = {
    claude:     0.0121,  // getestet: claude-sonnet-4-6, Ø aus empfehlung ($0,0067) + vergleich ($0,0175)
    chatgpt:    0.0040,  // getestet: gpt-4o, Ø aus empfehlung ($0,0033) + vergleich ($0,0048)
    gemini:     0.0110,  // getestet: gemini-3.5-flash, Ø aus empfehlung ($0,0103) + vergleich ($0,0111) — antwortet sehr ausführlich (~1150 Output-Tokens)
    perplexity: 0.0064,  // getestet: sonar, Ø aus empfehlung ($0,0059) + vergleich ($0,0063)
    google_aio: 0.0026,  // DataForSEO SERP Live Advanced (~$0.002) + load_async_ai_overview surcharge ($0.0006, refunded when no AI Overview appears)
}

// DataForSEO "AI Optimization" API (Top Mentioned Domains, Historical): einheitlich 0,1 $
// Grundgebühr pro Request + 0,001 $ pro Zeile (bestätigt gegen docs.dataforseo.com). Für
// Wettbewerbs-Analytics ist "eine Zeile" eine Domain im Top-N-Ranking, für Historie ein
// Monat x Plattform.
const AI_OPT_REQUEST_FEE = 0.1
const AI_OPT_ROW_FEE = 0.001
function aiOptimizationCostUsd(rowCount) {
    if (!rowCount) return 0
    return AI_OPT_REQUEST_FEE + rowCount * AI_OPT_ROW_FEE
}
// getTopMentionedDomains fragt pro Sample-Keyword einen eigenen Request ab (siehe Kommentar dort),
// deshalb hier die Kosten über sampleKeywordCount Requests statt eines einzigen.
export function marketAnalyticsCostUsd(topN, sampleKeywordCount = 1) {
    return aiOptimizationCostUsd(topN) * sampleKeywordCount
}
export function historicalTrendCostUsd(months, platformCount = 2) {
    return aiOptimizationCostUsd(months * platformCount)
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

async function dfsPostWithRetry(endpoint, body, label, retries = 1) {
    for (let attempt = 0; ; attempt++) {
        const data = await dfsPost(endpoint, body)
        const task = data.tasks?.[0]
        if (task?.status_code === 20000) return data
        if (attempt >= retries) {
            // Letzter Versuch fehlgeschlagen — volle Antwort loggen (gekürzt), nicht nur die
            // (bei fehlendem Task immer leeren) task?.status_code-Felder. Zeigt z.B. den echten
            // Top-Level-Fehler bei falschem Endpoint-Pfad (data.status_code/status_message).
            console.error(`[geoService] ${label}: kein gültiger Task in der Antwort — endpoint=${endpoint} top-level=${data.status_code} ${data.status_message} raw=${JSON.stringify(data).slice(0, 500)}`)
            return data
        }
        console.warn(`[geoService] ${label} transienter Fehler (Versuch ${attempt + 1}/${retries + 1}): task=${task?.status_code} ${task?.status_message} top-level=${data.status_code} ${data.status_message}`)
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
    }], `Google AI Overview "${keyword}"`)

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

// Claude/ChatGPT/Gemini/Perplexity laufen alle über denselben DataForSEO-Endpoint
// (/v3/ai_optimization/{plattform}/llm_responses/live) statt über vier separate Direct-API-Keys —
// bestätigt gegen die echte API (Modell-Liste per GET .../models, Response-Form per Live-Testcall
// mit echtem money_spent-Feld). Jede Plattform bekommt hier ein festes, aktuelles Modell; die
// Kosten in PLATFORM_COSTS sind aus echten Testcalls übernommen, nicht geschätzt.
const LLM_RESPONSES_MODEL = {
    claude:     'claude-sonnet-4-6',
    chatgpt:    'gpt-4o',
    gemini:     'gemini-3.5-flash',
    perplexity: 'sonar',
}
const LLM_RESPONSES_PATH_SEGMENT = {
    claude: 'claude', chatgpt: 'chat_gpt', gemini: 'gemini', perplexity: 'perplexity',
}

async function checkWithLlmResponses(platform, keyword, domain, language, intent) {
    if (!DFS_LOGIN || !DFS_PASSWORD) {
        console.warn(`[geoService] DATAFORSEO_LOGIN/PASSWORD nicht gesetzt — ${platform}-Check übersprungen`)
        return { mentioned: false, context: null, citations: [] }
    }

    const data = await dfsPostWithRetry(`/v3/ai_optimization/${LLM_RESPONSES_PATH_SEGMENT[platform]}/llm_responses/live`, [{
        user_prompt: buildQuery(keyword, language, intent),
        model_name: LLM_RESPONSES_MODEL[platform],
    }], `LLM Responses/${platform} "${keyword}"/${intent}`)

    const task = data.tasks?.[0]
    if (task?.status_code !== 20000) {
        console.warn(`[geoService] ${platform}-Check endgültig fehlgeschlagen bei "${keyword}":`, task?.status_code, task?.status_message)
        return { mentioned: false, context: null, citations: [] }
    }

    const result = task.result?.[0]
    // Echte Kosten pro Call mitloggen (statt nur die PLATFORM_COSTS-Schätzung zu vertrauen) —
    // damit sich vor allem der ungetestete ChatGPT-Wert später aus echten Produktionsdaten statt
    // aus einem o4-mini-Platzhalter kalibrieren lässt.
    if (result?.money_spent != null) {
        console.log(`[geoService] ${platform} (${LLM_RESPONSES_MODEL[platform]}) money_spent=${result.money_spent} tokens=${result.input_tokens}/${result.output_tokens}`)
    }
    const item = result?.items?.[0]
    if (!item) {
        console.log(`[geoService] ${platform}-Check "${keyword}": Status Ok, aber keine items in der Antwort — raw=${JSON.stringify(result).slice(0, 400)}`)
        return { mentioned: false, context: null, citations: [] }
    }

    const text = (item.sections || []).map(s => s.text || '').join('\n')
    const annotations = item.annotations || []
    const structuredCitations = annotations
        .map(a => ({ url: a.url || null, domain: safeHostname(a.url), title: a.title || null, snippet: null }))
        .filter(c => c.domain)
    // Fällt auf die Regex-Extraktion aus dem Antworttext zurück, falls das Modell keine
    // annotations liefert (z.B. ohne web_search) — noch nicht gegen jede Plattform live bestätigt.
    const citations = structuredCitations.length ? structuredCitations : extractDomainMentions(text, domain)

    const { mentioned: textMentioned, context } = extractMention(text, domain)
    const normalizedDomain = domain.replace(/^www\./, '').toLowerCase()
    const citationMatch = citations.find(c => c.domain === normalizedDomain || c.domain?.endsWith(`.${normalizedDomain}`))

    return { mentioned: textMentioned || !!citationMatch, context: context || null, citations }
}

const checkWithClaude     = (keyword, domain, language, intent) => checkWithLlmResponses('claude', keyword, domain, language, intent)
const checkWithChatGPT    = (keyword, domain, language, intent) => checkWithLlmResponses('chatgpt', keyword, domain, language, intent)
const checkWithGemini     = (keyword, domain, language, intent) => checkWithLlmResponses('gemini', keyword, domain, language, intent)
const checkWithPerplexity = (keyword, domain, language, intent) => checkWithLlmResponses('perplexity', keyword, domain, language, intent)

// Bestätigt gegen die reale DataForSEO-Doku (docs.dataforseo.com/v3/ai_optimization/llm_mentions/...):
// alle Endpoints unten akzeptieren als "platform" nur 'google' oder 'chat_gpt'.
function keywordTarget(keyword) {
    return { keyword, search_filter: 'include' }
}

const MARKET_ANALYTICS_TOP_N = 20
// Kostenkontrolle: 1 Request pro Keyword (siehe Kommentar unten), deshalb hier begrenzt statt
// alle getrackten Keywords einer Site abzufragen.
const MARKET_ANALYTICS_SAMPLE_KEYWORDS = 5

// Wettbewerbs-Analytics: welche Domains werden über die getrackten Keywords hinweg am häufigsten
// von KI-Systemen (Google AI Overview, ChatGPT) genannt — eine Marktsicht aus DataForSEOs eigenem
// Datensatz, zusätzlich zum bestehenden getCompetitors() (das nur aus den eigenen Check-Ergebnissen
// aggregiert).
//
// WICHTIG (gegen den echten Account verifiziert): Mehrere Keywords in EINEM target-Array werden von
// DataForSEO als UND-Schnittmenge behandelt (eine Domain muss zu allen gleichzeitig passen), nicht
// als "irgendeins davon" — ein Test mit 10 unterschiedlichen Keywords in einem Request lieferte 0
// Treffer, derselbe Request mit nur 1 Keyword lieferte 20 echte Domains. Deshalb hier bewusst EIN
// Request pro Keyword (auf MARKET_ANALYTICS_SAMPLE_KEYWORDS begrenzt) und die Ergebnisse selbst pro
// Domain aufsummiert, statt DataForSEOs Multi-Target-Kombination zu vertrauen.
export async function getTopMentionedDomains(keywords, language) {
    if (!DFS_LOGIN || !DFS_PASSWORD || !keywords.length) return []

    const sample = keywords.slice(0, MARKET_ANALYTICS_SAMPLE_KEYWORDS)
    const settled = await Promise.allSettled(sample.map(keyword => dfsPostWithRetry(
        '/v3/ai_optimization/llm_mentions/top_mentioned_domains/live',
        [{
            target: [keywordTarget(keyword)],
            limit: MARKET_ANALYTICS_TOP_N,
            location_name: language === 'de' ? 'Germany' : 'United States',
            language_code: language,
        }],
        `Markt-Analyse "${keyword}"`,
    )))

    const totals = new Map() // domain -> aufsummierte mentions über alle Sample-Keywords
    let anySucceeded = false

    for (const result of settled) {
        if (result.status !== 'fulfilled') continue
        const task = result.value.tasks?.[0]
        if (task?.status_code !== 20000) continue
        anySucceeded = true

        for (const item of task.result?.[0]?.items || []) {
            const domain = (item.domain || '').replace(/^www\./, '').toLowerCase()
            if (!domain) continue
            totals.set(domain, (totals.get(domain) || 0) + (item.total?.mentions ?? 0))
        }
    }

    // Bei einem Totalausfall wird geworfen statt [] zurückzugeben — der Aufrufer (getMarketAnalytics
    // in geo_tracking.js) darf ein Fehlerergebnis nicht als "0 Domains gefunden" langfristig cachen.
    if (!anySucceeded) {
        throw new Error('top_mentioned_domains: alle Keyword-Abfragen fehlgeschlagen')
    }
    if (!totals.size) {
        console.log(`[geoService] top_mentioned_domains: erfolgreich, aber 0 Domains über ${sample.length} Sample-Keyword(s) gefunden`)
    }

    return [...totals.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, MARKET_ANALYTICS_TOP_N)
        .map(([domain, count], i) => ({ domain, count, rank: i + 1 }))
}

// Nur diese beiden Codes laut Doku — Claude/Perplexity/Gemini werden nicht unterstützt.
const HISTORICAL_PLATFORMS = ['google', 'chat_gpt']

// Monatliche Mentions-Historie für EIN Keyword. fromMonth (Format "YYYY-MM") erlaubt inkrementelles
// Nachladen, statt bei jedem Aufruf die komplette Historie seit 2025-08 neu abzufragen — der
// Aufrufer (getHistoricalTrend in geo_tracking.js) cached bereits geladene Monate und übergibt hier
// nur, ab wann neue Daten gebraucht werden.
export async function getKeywordMentionHistory(keyword, language, fromMonth = '2025-08') {
    if (!DFS_LOGIN || !DFS_PASSWORD) return []

    // Bestätigt gegen die reale API: ChatGPT liefert nur für location_code 2840 (USA) /
    // language_code 'en' Daten — bei anderen Sprachen weist die API location_name für
    // platform=chat_gpt sogar als "Invalid Field" zurück. Für nicht-englische Sites daher nur
    // Google AI Overview abfragen, statt einen Call zu machen, der strukturell nie erfolgreich ist.
    const platforms = language === 'en' ? HISTORICAL_PLATFORMS : HISTORICAL_PLATFORMS.filter(p => p !== 'chat_gpt')

    const results = await Promise.all(platforms.map(async (platform) => {
        let data
        try {
            data = await dfsPostWithRetry('/v3/ai_optimization/llm_mentions/historical/live', [{
                target: [keywordTarget(keyword)],
                platform,
                date_from: `${fromMonth}-01`,
                location_name: language === 'de' ? 'Germany' : 'United States',
                language_code: language,
            }], `Historie/${platform} "${keyword}"`)
        } catch (err) {
            console.error(`[geoService] historical/${platform} fehlgeschlagen für "${keyword}":`, err.message)
            return []
        }

        const task = data.tasks?.[0]
        if (task?.status_code !== 20000) return []

        const items = task.result?.[0]?.items || []
        return items
            .filter(item => item.year != null && item.month != null)
            .map(item => ({
                month: `${item.year}-${String(item.month).padStart(2, '0')}`,
                platform,
                mentionsCount: item.metrics?.mentions ?? 0,
                aiSearchVolume: item.metrics?.ai_search_volume ?? null,
            }))
    }))

    return results.flat().sort((a, b) => a.month.localeCompare(b.month))
}

const PLATFORM_FNS = {
    claude:     checkWithClaude,
    chatgpt:    checkWithChatGPT,
    gemini:     checkWithGemini,
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

// keywordsOverride: optionale Teilmenge von site.keywords — für gezielte manuelle Rechecks
// (siehe triggerCheck in geo_tracking.js), damit ein manueller Check nicht zwingend die komplette
// Site neu prüfen muss. Der wöchentliche Auto-Check (geoTrackingJob.js) ruft ohne dritten Parameter
// auf und prüft dadurch weiterhin immer alle Keywords.
export async function checkSiteMentions(site, variantCount = 1, keywordsOverride = null) {
    const platforms = site.platforms?.length ? site.platforms : ['claude']
    const intents = PROMPT_INTENTS.slice(0, Math.max(1, Math.min(variantCount, PROMPT_INTENTS.length)))
    const keywords = keywordsOverride?.length ? keywordsOverride : site.keywords

    const combos = []
    for (const keyword of keywords) {
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