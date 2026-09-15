import { chromium } from 'playwright'
import { analyzeSEO } from './seo.js'
import { analyzePerformance } from './performance.js'
import { analyzeKeywords } from './keywords.js'
import { analyzeGEO } from './geo.js'

const MAX_PAGES = 25

const PRIVATE_HOST_RE = [
    /^localhost$/i,
    /^127\./,
    /^10\./,
    /^192\.168\./,
    /^172\.(1[6-9]|2\d|3[01])\./,
    /^::1$/,
    /^0\.0\.0\.0$/,
    /^169\.254\./,
    /^fd[0-9a-f]{2}:/i,
    /^fe80:/i,
    /^::ffff:/i,   // IPv4-mapped IPv6 (z.B. ::ffff:127.0.0.1)
]

// Cloud-Metadata-Hostnamen (IP-Adresse 169.254.169.254 ist bereits über PRIVATE_HOST_RE abgedeckt)
const METADATA_HOSTS = new Set([
    'metadata.google.internal',       // GCP
    'metadata.goog',                  // GCP (alternative)
    'instance-data',                  // einige Cloud-Anbieter
    'instance-data.ec2.internal',     // AWS
])

function isPrivateHost(hostname) {
    const h = hostname.toLowerCase()
    return PRIVATE_HOST_RE.some(r => r.test(h)) || METADATA_HOSTS.has(h)
}

function readTimingEntries() {
    // `null` statt `0` fuer nicht messbare Werte — sonst wird ein fehlgeschlagener
    // Messwert im Scoring wie eine perfekte 0ms-Zeit behandelt statt als Mangel.
    const nav = performance.getEntriesByType('navigation')[0] || null
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0] || null

    // Bevorzugt die Werte des PerformanceObservers aus addInitScript (siehe runAudit) — die
    // getEntriesByType-Polls darunter sind nur ein Fallback für den Fall, dass der Observer aus
    // irgendeinem Grund nicht lief (z.B. sehr alte Chromium-Version ohne LCP/CLS-Unterstützung).
    let lcp = typeof window.__perfLCP === 'number' ? window.__perfLCP : null
    if (lcp === null) {
        try {
            const lcpEntries = performance.getEntriesByType('largest-contentful-paint')
            if (lcpEntries.length) lcp = lcpEntries[lcpEntries.length - 1].startTime
        } catch {}
    }

    let cls = typeof window.__perfCLS === 'number' ? window.__perfCLS : null
    if (cls === null) {
        try {
            cls = performance.getEntriesByType('layout-shift')
                .filter(e => !e.hadRecentInput)
                .reduce((sum, e) => sum + e.value, 0)
        } catch {}
    }

    return {
        requestStart: nav ? nav.requestStart : null,
        responseStart: nav ? nav.responseStart : null,
        domContentLoadedEventEnd: nav ? nav.domContentLoadedEventEnd : null,
        loadEventEnd: nav ? nav.loadEventEnd : null,
        firstContentfulPaint: fcpEntry ? fcpEntry.startTime : null,
        largestContentfulPaint: lcp,
        cumulativeLayoutShift: cls,
    }
}

// LCP und CLS finalisieren sich in Chrome nach dem load-Event oft noch weiter (spät ladendes
// Hero-Bild, Web-Font-Swap, nachträglich eingefügter Content) — direkt bei 'load' ausgelesen
// kommen sie regelmäßig leer oder unvollständig zurück ("konnte nicht gemessen werden"), obwohl
// der Browser sie kurz danach längst erfasst hätte. Eine kurze Wartezeit plus ein zweiter,
// bevorzugter Lesevorgang fängt das ab, ohne einen echten Messfehler (z.B. Navigation-Timing-API
// komplett nicht verfügbar) zu verschleiern — beide Versuche liefern in dem Fall weiterhin null.
async function collectTiming(page) {
    await page.waitForTimeout(1500)
    const first = await page.evaluate(readTimingEntries)

    const incomplete = first.requestStart == null || first.responseStart == null || first.largestContentfulPaint == null
    if (!incomplete) return first

    await page.waitForTimeout(1500)
    const retry = await page.evaluate(readTimingEntries)

    return {
        requestStart: retry.requestStart ?? first.requestStart,
        responseStart: retry.responseStart ?? first.responseStart,
        domContentLoadedEventEnd: retry.domContentLoadedEventEnd ?? first.domContentLoadedEventEnd,
        loadEventEnd: retry.loadEventEnd ?? first.loadEventEnd,
        firstContentfulPaint: retry.firstContentfulPaint ?? first.firstContentfulPaint,
        largestContentfulPaint: retry.largestContentfulPaint ?? first.largestContentfulPaint,
        cumulativeLayoutShift: retry.cumulativeLayoutShift ?? first.cumulativeLayoutShift,
    }
}

async function crawlSite(page, startUrl) {
    let origin = new URL(startUrl).origin
    const visited = new Set()
    const queue = [startUrl]
    const crawled = []

    while (queue.length > 0 && crawled.length < MAX_PAGES) {
        const url = queue.shift()
        if (visited.has(url)) continue
        visited.add(url)

        try {
            const response = await page.goto(url, { waitUntil: 'load', timeout: 20000 })
            const html = await page.content()

            // Nach einem permanenten Redirect (z.B. scanora.ai -> www.scanora.ai) zeigt page.url()
            // erst die tatsächliche finale Origin. Ohne diese Korrektur bleibt "origin" auf der
            // Pre-Redirect-Domain stehen, alle gefundenen Links (die auf die neue Origin zeigen)
            // werden rausgefiltert, und der Crawl kommt nie über die Startseite hinaus.
            if (crawled.length === 0) {
                const finalUrl = response?.url() || page.url()
                origin = new URL(finalUrl).origin
            }

            // Interne Links sammeln
            const links = await page.evaluate((origin) => {
                return Array.from(document.querySelectorAll('a[href]'))
                    .map(a => {
                        try {
                            const u = new URL(a.href)
                            u.hash = ''
                            return u.href
                        } catch { return null }
                    })
                    .filter(href => href && href.startsWith(origin))
            }, origin)

            for (const link of links) {
                if (!visited.has(link) && !queue.includes(link)) {
                    queue.push(link)
                }
            }

            crawled.push({ url, html, status: response.status() })
            console.log(`Gecrawlt [${crawled.length}/${MAX_PAGES}]: ${url}`)
        } catch (err) {
            console.log(`Übersprungen: ${url} — ${err.message}`)
        }
    }

    return crawled
}

function aggregateSEO(seoResults) {
    if (seoResults.length === 0) return null
    if (seoResults.length === 1) return seoResults[0]

    // Seiten mit noindex (Login, Register, Dashboard, Rechtstexte, ...) werden von Google nie
    // in der Suche gezeigt — Title-/Description-Laenge, Wortanzahl etc. auf diesen Seiten zu
    // bewerten waere irrefuehrend und wuerde den Score einer eigentlich gut optimierten Seite
    // grundlos druecken. Sie fliessen deshalb nicht in Score-Durchschnitt oder Issue-Liste ein.
    const indexableResults = seoResults.filter(r => !r.noindex)
    const scored = indexableResults.length > 0 ? indexableResults : seoResults

    const avgScore = Math.round(scored.reduce((s, r) => s + r.score, 0) / scored.length)

    // Einzigartige Issues und Suggestions sammeln
    const issueSet = new Set()
    const suggestionSet = new Set()
    scored.forEach(r => {
        r.issues.forEach(i => issueSet.add(i))
        r.suggestions.forEach(s => suggestionSet.add(s))
    })

    return {
        ...(scored[0]),
        score: avgScore,
        issues: Array.from(issueSet),
        suggestions: Array.from(suggestionSet),
        pagesAnalyzed: scored.length,
        excludedNoindexPages: seoResults.length - scored.length,
        perPage: scored.map(r => ({ url: r._url, score: r.score }))
    }
}

export async function runAudit(url, language) {
    console.log(`Starte Audit fuer: ${url}`)

    if (!url.startsWith('http')) url = 'https://' + url

    const browser = await chromium.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-extensions',
            '--js-flags=--max-old-space-size=256',
        ],
    })
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        viewport: { width: 1280, height: 800 },
        extraHTTPHeaders: {},       // keine Auth-/Cookie-Header weiterreichen
        storageState: { cookies: [], origins: [] },  // isolierter Kontext ohne Session-Daten
        ignoreHTTPSErrors: false,
        permissions: [],
    })
    const page = await context.newPage()

    // In dieser Chromium-Version liefert performance.getEntriesByType('largest-contentful-paint')
    // nach dem Laden zuverlässig NICHTS zurück (getestet, auch bei example.com) — obwohl der
    // Eintrag laut Spec "buffered" sein sollte. Einzig zuverlässiger Weg: ein PerformanceObserver,
    // der VOR der Navigation registriert wird und live mitschreibt (addInitScript läuft bei jeder
    // Navigation auf dieser Page erneut, bevor Seiten-JS ausgeführt wird).
    await page.addInitScript(() => {
        window.__perfLCP = null
        window.__perfCLS = 0
        try {
            new PerformanceObserver((list) => {
                const entries = list.getEntries()
                if (entries.length) window.__perfLCP = entries[entries.length - 1].startTime
            }).observe({ type: 'largest-contentful-paint', buffered: true })
        } catch {}
        try {
            new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) window.__perfCLS += entry.value
                }
            }).observe({ type: 'layout-shift', buffered: true })
        } catch {}
    })

    // SSRF via Redirect: jede Navigation (inkl. 301/302-Ziele) auf private IPs oder
    // Nicht-HTTP-Protokolle wird abgebrochen bevor Playwright ihr folgt
    await page.route('**', async (route) => {
        try {
            const { hostname, protocol } = new URL(route.request().url())
            if (!['http:', 'https:'].includes(protocol) || isPrivateHost(hostname)) {
                await route.abort('blockedbyclient')
                return
            }
        } catch {
            await route.abort('blockedbyclient')
            return
        }
        await route.continue()
    })

    const resources = []
    page.on('response', async response => {
        try {
            // Playwright 1.4x hatte timing() auf Response, seit einem Breaking Change liegt es
            // nur noch auf Request — response.timing() gab hier still einen Fehler und ließ
            // Ressourcengröße/-anzahl für JEDEN Audit auf 0 stehen, ohne dass es auffiel.
            const timing = response.request().timing()
            resources.push({
                url: response.url(),
                status: response.status(),
                type: response.request().resourceType(),
                size: parseInt(response.headers()['content-length'] || '0'),
                duration: timing.responseEnd
            })
        } catch {}
    })

    console.log('Seite wird geladen...')
    const startTime = Date.now()
    let headers = {}
    let responseStatus = 0
    let timing = {}

    try {
        // Landingpage laden für Performance-Messung und Screenshots
        const response = await page.goto(url, { waitUntil: 'load', timeout: 20000 })
        headers = response.headers()
        responseStatus = response.status()
        console.log(`Geladen in ${Date.now() - startTime}ms (Status: ${responseStatus})`)

        timing = await collectTiming(page)

        // Genaue Ressourcengrößen via Performance API (content-length ist bei gzip/brotli oft 0)
        const perfResourceSizes = await page.evaluate(() => {
            const map = {}
            for (const r of performance.getEntriesByType('resource')) {
                map[r.name] = r.transferSize || r.decodedBodySize || 0
            }
            return map
        })

        console.log('Screenshots werden erstellt...')
        const screenshotDesktop = await page.screenshot({ fullPage: true, type: 'jpeg', quality: 85 })
        await page.setViewportSize({ width: 390, height: 844 })
        await page.waitForTimeout(500)
        const screenshotMobile = await page.screenshot({ fullPage: true, type: 'jpeg', quality: 85 })

        // Resources der Landingpage sichern mit korrekten Größen
        const landingResources = resources.map(r => ({
            ...r,
            size: perfResourceSizes[r.url] || r.size
        }))

        // Website crawlen
        console.log('Website wird gecrawlt...')
        const crawledPages = await crawlSite(page, url)
        console.log(`${crawledPages.length} Seiten gecrawlt`)

        const landingHtml = crawledPages[0]?.html || ''

        console.log('Analyse läuft...')
        const [seoResults, performance, keywords, geo] = await Promise.all([
            Promise.all(crawledPages.map(async p => {
                const result = await analyzeSEO(p.url, p.html)
                result._url = p.url
                return result
            })),
            analyzePerformance(url, page, { timing, resources: landingResources }),
            analyzeKeywords(url, landingHtml),
            analyzeGEO(url, landingHtml, language),
        ])
        const seo = aggregateSEO(seoResults)
        console.log('Analyse done')

        await browser.close()

        const overallScore = Math.round(
            (seo.score * 0.40) +
            (performance.score * 0.20) +
            (geo.score * 0.40)
        )

        console.log(`Audit abgeschlossen | Gesamt: ${overallScore}/100 | ${crawledPages.length} Seiten analysiert`)

        return {
            url,
            timestamp: new Date().toISOString(),
            status: responseStatus,
            overallScore,
            pagesAnalyzed: crawledPages.length,
            seo,
            performance,
            keywords,
            geo,
            screenshots: {
                desktop: screenshotDesktop.toString('base64'),
                mobile: screenshotMobile.toString('base64'),
            }
        }

    } catch (err) {
        await browser.close()
        throw new Error(`Audit fehlgeschlagen: ${err.message}`)
    }
}