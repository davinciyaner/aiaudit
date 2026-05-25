import { chromium } from 'playwright'
import { analyzeSEO } from './seo.js'
import { analyzePerformance } from './performance.js'
import { analyzeSecurity } from './security.js'
import { analyzeKeywords } from './keywords.js'
import { analyzeGEO } from './geo.js'

const MAX_PAGES = 8

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
            const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
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
        viewport: { width: 1280, height: 800 }
    })
    const page = await context.newPage()

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
        // Landingpage laden für Performance/Security/Screenshots
        const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
        headers = response.headers()
        responseStatus = response.status()
        console.log(`Geladen in ${Date.now() - startTime}ms (Status: ${responseStatus})`)

        timing = await page.evaluate(() => {
            const t = performance.timing
            const fcp = performance.getEntriesByName('first-contentful-paint')[0]
            return {
                navigationStart: t.navigationStart,
                requestStart: t.requestStart,
                responseStart: t.responseStart,
                domContentLoadedEventEnd: t.domContentLoadedEventEnd,
                loadEventEnd: t.loadEventEnd,
                firstContentfulPaint: fcp ? fcp.startTime : 0
            }
        })

        console.log('Screenshots werden erstellt...')
        const screenshotDesktop = await page.screenshot({ fullPage: false, type: 'jpeg', quality: 80 })
        await page.setViewportSize({ width: 390, height: 844 })
        await page.waitForTimeout(500)
        const screenshotMobile = await page.screenshot({ fullPage: false, type: 'jpeg', quality: 80 })

        // Resources der Landingpage sichern bevor der Crawler andere Seiten lädt
        const landingResources = [...resources]

        // Website crawlen
        console.log('Website wird gecrawlt...')
        const crawledPages = await crawlSite(page, url)
        console.log(`${crawledPages.length} Seiten gecrawlt`)

        // SEO auf allen Seiten analysieren
        console.log('SEO-Analyse läuft...')
        const seoResults = []
        for (const p of crawledPages) {
            const result = await analyzeSEO(p.url, p.html)
            result._url = p.url
            seoResults.push(result)
        }
        const seo = aggregateSEO(seoResults)
        console.log('SEO done')

        // Performance, Security, Keywords, GEO auf Landingpage
        const landingHtml = crawledPages[0]?.html || ''
        const performance = await analyzePerformance(url, page, { timing, resources: landingResources })
        console.log('Performance done')
        const security = await analyzeSecurity(url, headers, landingHtml)
        console.log('Security done')
        const keywords = await analyzeKeywords(url, landingHtml)
        console.log('Keywords done')
        const geo = await analyzeGEO(url, landingHtml)
        console.log('GEO done')

        await browser.close()

        const overallScore = Math.round(
            (seo.score * 0.30) +
            (performance.score * 0.30) +
            (security.score * 0.25) +
            (geo.score * 0.15)
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
            security,
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