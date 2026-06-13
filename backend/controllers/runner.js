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
]

function isPrivateHost(hostname) {
    return PRIVATE_HOST_RE.some(r => r.test(hostname))
}

async function crawlSite(page, startUrl) {
    const origin = new URL(startUrl).origin
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

    const avgScore = Math.round(seoResults.reduce((s, r) => s + r.score, 0) / seoResults.length)

    // Einzigartige Issues und Suggestions sammeln
    const issueSet = new Set()
    const suggestionSet = new Set()
    seoResults.forEach(r => {
        r.issues.forEach(i => issueSet.add(i))
        r.suggestions.forEach(s => suggestionSet.add(s))
    })

    return {
        ...seoResults[0],
        score: avgScore,
        issues: Array.from(issueSet),
        suggestions: Array.from(suggestionSet),
        pagesAnalyzed: seoResults.length,
        perPage: seoResults.map(r => ({ url: r._url, score: r.score }))
    }
}

export async function runAudit(url) {
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
            const timing = response.timing()
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

        timing = await page.evaluate(() => {
            const nav = performance.getEntriesByType('navigation')[0] || {}
            const fcp = performance.getEntriesByName('first-contentful-paint')[0]
            return {
                requestStart: nav.requestStart || 0,
                responseStart: nav.responseStart || 0,
                domContentLoadedEventEnd: nav.domContentLoadedEventEnd || 0,
                loadEventEnd: nav.loadEventEnd || 0,
                firstContentfulPaint: fcp ? fcp.startTime : 0
            }
        })

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
            analyzeGEO(url, landingHtml),
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