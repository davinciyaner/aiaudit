import { chromium } from 'playwright'
import { analyzeSEO } from './seo.js'
import { analyzePerformance } from './performance.js'
import { analyzeSecurity } from './security.js'
import { analyzeKeywords } from './keywords.js'
import { analyzeGEO } from './geo.js'

export async function runAudit(url) {
    console.log(`Starte Audit fuer: ${url}`)

    if (!url.startsWith('http')) url = 'https://' + url

    const browser = await chromium.launch({ headless: true })
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
    let html = ''
    let headers = {}
    let responseStatus = 0

    try {
        const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
        headers = response.headers()
        responseStatus = response.status()
        html = await page.content()
        console.log(`Geladen in ${Date.now() - startTime}ms (Status: ${responseStatus})`)

        const timing = await page.evaluate(() => {
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
        const screenshotDesktop = await page.screenshot({ fullPage: true, type: 'png' })
        await page.setViewportSize({ width: 390, height: 844 })
        await page.waitForTimeout(500)
        const screenshotMobile = await page.screenshot({ fullPage: true, type: 'png' })

        console.log('Analysen laufen...')
        const seo = await analyzeSEO(url, html)
        console.log('SEO done')
        const performance = await analyzePerformance(url, page, { timing, resources })
        console.log('Performance done')
        const security = await analyzeSecurity(url, headers, html)
        console.log('Security done')
        const keywords = await analyzeKeywords(url, html)
        console.log('Keywords done')
        const geo = await analyzeGEO(url, html)
        console.log('GEO done')

        await browser.close()

        const overallScore = Math.round(
            (seo.score * 0.30) +
            (performance.score * 0.30) +
            (security.score * 0.25) +
            (geo.score * 0.15)
        )

        console.log(`Audit abgeschlossen | Gesamt: ${overallScore}/100`)

        return {
            url,
            timestamp: new Date().toISOString(),
            status: responseStatus,
            overallScore,
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