import Anthropic from '@anthropic-ai/sdk'
import { jsonrepair } from 'jsonrepair'
import SeoKeywordInsight from '../models/seo_keyword_insight.js'

// DataForSEO API — DATAFORSEO_LOGIN + DATAFORSEO_PASSWORD in .env setzen
const LOGIN    = process.env.DATAFORSEO_LOGIN
const PASSWORD = process.env.DATAFORSEO_PASSWORD

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function auth() {
    return Buffer.from(`${LOGIN}:${PASSWORD}`).toString('base64')
}

function isConfigured() {
    if (!LOGIN || !PASSWORD) {
        console.warn('[seoService] DATAFORSEO_LOGIN oder DATAFORSEO_PASSWORD nicht gesetzt — Stub-Modus aktiv')
        return false
    }
    return true
}

async function dfsPost(endpoint, body) {
    const res = await fetch(`https://api.dataforseo.com${endpoint}`, {
        method: 'POST',
        headers: { 'Authorization': `Basic ${auth()}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    return res.json()
}

// ─── Rank Tracking ───────────────────────────────────────────────────────────

async function checkKeywordRanking(keyword, domain, location = 'Germany', language = 'de') {
    if (!isConfigured()) return { position: null, url: null }

    console.log(`[seoService] Prüfe "${keyword}" für ${domain}`)
    const data = await dfsPost('/v3/serp/google/organic/live/regular', [{
        keyword,
        location_name: location,
        language_code: language,
        device: 'desktop',
        os: 'windows',
        depth: 100,
    }])

    const items = data.tasks?.[0]?.result?.[0]?.items
    if (!items) {
        console.warn(`[seoService] Keine Ergebnisse für "${keyword}" — API-Antwort:`, JSON.stringify(data).slice(0, 300))
        return { position: null, url: null }
    }

    const organicItems = items.filter(i => i.type === 'organic')
    console.log(`[seoService] "${keyword}" — ${organicItems.length} organische Ergebnisse. Top 5 Domains:`,
        organicItems.slice(0, 5).map(i => `${i.rank_absolute}. ${i.domain}`)
    )

    const normalizedDomain = domain.replace(/^www\./, '')
    const found = organicItems.find(i => {
        const itemDomain = (i.domain || '').replace(/^www\./, '')
        return itemDomain === normalizedDomain || itemDomain.endsWith(`.${normalizedDomain}`)
    })

    if (!found) {
        console.log(`[seoService] "${keyword}" — Domain "${normalizedDomain}" nicht in Top ${organicItems.length} gefunden`)
        return { position: null, url: null }
    }
    console.log(`[seoService] "${keyword}" — Position ${found.rank_absolute} gefunden`)
    return { position: found.rank_absolute, url: found.url }
}

export async function checkSiteRankings(site) {
    const results = []
    for (const keyword of site.keywords) {
        try {
            const ranking = await checkKeywordRanking(keyword, site.domain, site.location, site.language)
            results.push({ keyword, ...ranking })
        } catch (err) {
            console.error(`SEO check fehlgeschlagen für "${keyword}" auf ${site.domain}:`, err.message)
            results.push({ keyword, position: null, url: null })
        }
        await new Promise(r => setTimeout(r, 200))
    }
    return results
}

// ─── Keyword-Ideen ───────────────────────────────────────────────────────────

export async function getKeywordIdeas(keywords, location = 'Germany', language = 'de') {
    if (!LOGIN || !PASSWORD) return { volumes: [], ideas: [] }

    const seedKeywords = keywords.slice(0, 10)

    const [volumeData, ideasData] = await Promise.all([
        dfsPost('/v3/keywords_data/google_ads/search_volume/live', [{
            keywords: keywords.slice(0, 50),
            location_name: location,
            language_code: language,
        }]),
        dfsPost('/v3/keywords_data/google_ads/keywords_for_keywords/live', [{
            keywords: seedKeywords,
            location_name: location,
            language_code: language,
            limit: 30,
        }]),
    ])

    const volumes = (volumeData.tasks?.[0]?.result || []).map(item => ({
        keyword:       item.keyword,
        searchVolume:  item.search_volume,
        competition:   item.competition,
        cpc:           item.cpc,
    }))

    const existingKws = new Set(keywords.map(k => k.toLowerCase()))
    const ideas = (ideasData.tasks?.[0]?.result || [])
        .filter(item => !existingKws.has((item.keyword || '').toLowerCase()))
        .slice(0, 20)
        .map(item => ({
            keyword:      item.keyword,
            searchVolume: item.search_volume,
            competition:  item.competition,
            cpc:          item.cpc,
        }))

    return { volumes, ideas }
}

// ─── Konkurrenten ─────────────────────────────────────────────────────────────

export async function getCompetitors(domain, location = 'Germany', language = 'de') {
    if (!LOGIN || !PASSWORD) return []

    const data = await dfsPost('/v3/dataforseo_labs/google/competitors_domain/live', [{
        target: domain,
        location_name: location,
        language_code: language,
        limit: 10,
    }])

    const task = data.tasks?.[0]
    if (task?.status_code !== 20000) {
        console.warn('[seoService] getCompetitors Fehler:', task?.status_code, task?.status_message)
        console.warn('[seoService] getCompetitors Response:', JSON.stringify(data).slice(0, 600))
        return []
    }

    return (task.result?.[0]?.items || []).map(item => ({
        domain:             item.domain,
        intersections:      item.intersections,
        competitorMetrics: {
            organicCount:   item.competitor_metrics?.organic?.count,
            organicPos1_3:  item.competitor_metrics?.organic?.pos_1_3,
            organicPos1_10: item.competitor_metrics?.organic?.pos_1_10,
        },
        ownMetrics: {
            organicCount:   item.our_metrics?.organic?.count,
            organicPos1_3:  item.our_metrics?.organic?.pos_1_3,
            organicPos1_10: item.our_metrics?.organic?.pos_1_10,
        },
    }))
}

// ─── Content Gap ─────────────────────────────────────────────────────────────

export async function getContentGap(competitorDomain, trackedKeywords, location = 'Germany', language = 'de') {
    if (!LOGIN || !PASSWORD) return []

    const data = await dfsPost('/v3/dataforseo_labs/google/keywords_for_site/live', [{
        target: competitorDomain,
        location_name: location,
        language_code: language,
        ignore_synonyms: true,
        include_subdomains: false,
        include_serp_info: true,
        limit: 100,
    }])

    const task = data.tasks?.[0]
    if (task?.status_code !== 20000) {
        console.warn('[seoService] getContentGap Fehler:', task?.status_code, task?.status_message)
        console.warn('[seoService] getContentGap Response:', JSON.stringify(data).slice(0, 600))
        return []
    }

    const tracked = new Set(trackedKeywords.map(k => k.toLowerCase()))

    const items = task.result?.[0]?.items || []

    return items
        .filter(item => item.keyword && !tracked.has(item.keyword.toLowerCase()))
        .sort((a, b) => (b.keyword_info?.search_volume ?? 0) - (a.keyword_info?.search_volume ?? 0))
        .slice(0, 30)
        .map(item => ({
            keyword:            item.keyword,
            searchVolume:       item.keyword_info?.search_volume ?? null,
            competition:        item.keyword_info?.competition_level ?? null,
            cpc:                item.keyword_info?.cpc ?? null,
            competitorPosition: item.ranked_serp_element?.serp_item?.rank_absolute ?? null,
        }))
}

// ─── Backlinks ────────────────────────────────────────────────────────────────

export async function getBacklinkSummary(domain) {
    if (!LOGIN || !PASSWORD) return null

    const data = await dfsPost('/v3/backlinks/summary/live', [{
        target:             domain,
        include_subdomains: true,
    }])

    const r = data.tasks?.[0]?.result?.[0]
    if (!r) return null

    return {
        backlinks:         r.backlinks,
        referringDomains:  r.referring_domains,
        referringIPs:      r.referring_ips,
        dofollow:          r.dofollow,
        nofollow:          r.nofollow,
        spamScore:         r.spam_score,
        rank:              r.rank,
        firstSeen:         r.first_seen,
    }
}

// ─── AI Content & Backlink Generation ────────────────────────────────────────

function parseClaudeJSON(text) {
    const start = text.indexOf('{')
    const end   = text.lastIndexOf('}')
    if (start === -1 || end === -1) throw new Error('Kein JSON-Objekt in der Antwort gefunden')
    const extracted = text.slice(start, end + 1)
    try {
        return JSON.parse(extracted)
    } catch {
        // jsonrepair handles all common Claude JSON issues: unescaped quotes, trailing
        // commas, escaped closing quotes, single-quoted strings, etc.
        const repaired = jsonrepair(extracted)
        return JSON.parse(repaired)
    }
}

export async function generateKeywordContent(keyword, domain, language = 'de') {
    const langLabel = language === 'de' ? 'Deutsch' : 'English'
    const msg = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        messages: [{
            role: 'user',
            content: `Du bist ein SEO-Experte. Erstelle einen Content-Plan auf ${langLabel}.

Domain: ${domain}
Keyword: "${keyword}"

Antworte NUR mit einem validen JSON-Objekt — kein Markdown, keine Erklärungen.
WICHTIG: Verwende KEINE Anführungszeichen innerhalb von String-Werten. Kein \" in Strings.
Alle Strings einzeilig (keine Zeilenumbrüche).

{"title":"...","metaDescription":"...","slug":"...","outline":[{"h2":"...","description":"..."}],"intro":"...","keyPoints":["...","..."]}

- title: keyword am Anfang, max 65 Zeichen
- metaDescription: keyword enthalten, max 155 Zeichen
- slug: nur Kleinbuchstaben und Bindestriche
- outline: 4-6 Einträge
- intro: 2-3 Sätze als einzelne Zeile
- keyPoints: 4-6 Punkte`,
        }],
    })
    return parseClaudeJSON(msg.content[0].text)
}

// ─── Automated Insight Generation ────────────────────────────────────────────

export async function generateInsightsForKeywords(site, keywords) {
    for (const keyword of keywords) {
        try {
            await SeoKeywordInsight.findOneAndUpdate(
                { siteId: site._id, keyword },
                { $setOnInsert: { userId: site.userId, status: 'pending' } },
                { upsert: true, new: false }
            )
            const [contentResult, backlinkResult] = await Promise.allSettled([
                generateKeywordContent(keyword, site.domain, site.language || 'de'),
                generateBacklinkIdeas(keyword, site.domain, site.language || 'de'),
            ])
            await SeoKeywordInsight.findOneAndUpdate(
                { siteId: site._id, keyword },
                {
                    userId:      site.userId,
                    content:     contentResult.status  === 'fulfilled' ? contentResult.value  : null,
                    backlinks:   backlinkResult.status === 'fulfilled' ? backlinkResult.value : null,
                    status:      (contentResult.status === 'fulfilled' || backlinkResult.status === 'fulfilled') ? 'done' : 'error',
                    generatedAt: new Date(),
                },
                { upsert: true }
            )
            console.log(`[seoService] Insight generiert für "${keyword}" (${site.domain})`)
        } catch (err) {
            console.error(`[seoService] Insight fehlgeschlagen für "${keyword}":`, err.message)
            await SeoKeywordInsight.findOneAndUpdate(
                { siteId: site._id, keyword },
                { userId: site.userId, status: 'error', generatedAt: new Date() },
                { upsert: true }
            )
        }
        await new Promise(r => setTimeout(r, 1200))
    }
}

export async function refreshStaleInsights(site) {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const existing = await SeoKeywordInsight.find({ siteId: site._id }).lean()
    const existingSet = new Set(existing.map(e => e.keyword))

    const staleKws  = existing
        .filter(e => e.status === 'error' || !e.generatedAt || e.generatedAt < weekAgo)
        .map(e => e.keyword)
    const missingKws = site.keywords.filter(kw => !existingSet.has(kw))

    const toGenerate = [...new Set([...staleKws, ...missingKws])]
    if (toGenerate.length) await generateInsightsForKeywords(site, toGenerate)
}

export async function generateBacklinkIdeas(keyword, domain, language = 'de') {
    const langLabel = language === 'de' ? 'Deutsch' : 'English'
    const msg = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        messages: [{
            role: 'user',
            content: `Du bist ein SEO-Backlink-Stratege. Erstelle Backlink-Möglichkeiten auf ${langLabel}.

Domain: ${domain}
Keyword: "${keyword}"

Antworte NUR mit einem validen JSON-Objekt — kein Markdown, keine Erklärungen.
WICHTIG: Verwende KEINE Anführungszeichen innerhalb von String-Werten. Kein \" in Strings.
Alle Strings einzeilig (keine Zeilenumbrüche).

{"strategies":[{"type":"...","description":"...","difficulty":"low"}],"targetSites":[{"type":"...","example":"...","why":"..."}],"linkbaitIdeas":["...","..."]}

- strategies: 3-5 Einträge, difficulty ist "low", "medium" oder "high"
- targetSites: 4-6 Einträge
- linkbaitIdeas: 3-4 Einträge`,
        }],
    })
    return parseClaudeJSON(msg.content[0].text)
}