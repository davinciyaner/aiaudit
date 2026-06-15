// DataForSEO API — DATAFORSEO_LOGIN + DATAFORSEO_PASSWORD in .env setzen
const LOGIN    = process.env.DATAFORSEO_LOGIN
const PASSWORD = process.env.DATAFORSEO_PASSWORD

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

    const data = await dfsPost('/v3/domain_analytics/google/competitors_domain/live', [{
        target: domain,
        location_name: location,
        language_code: language,
        limit: 10,
    }])

    return (data.tasks?.[0]?.result?.[0]?.items || []).map(item => ({
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