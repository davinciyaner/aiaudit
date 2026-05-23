export async function analyzePerformance(url, page, metrics) {
    const issues = []
    const suggestions = []

    // Timing-Metriken aus Playwright
    const timing = metrics.timing || {}
    const resources = metrics.resources || []

    const ttfb = timing.responseStart - timing.requestStart || 0
    const fcp = timing.firstContentfulPaint || 0
    const domLoad = timing.domContentLoadedEventEnd - timing.navigationStart || 0
    const fullLoad = timing.loadEventEnd - timing.navigationStart || 0

    // Score berechnen
    let score = 100

    if (ttfb > 600) { score -= 20; issues.push(`TTFB zu hoch: ${ttfb}ms (Ziel: <600ms)`); suggestions.push('Server-Response-Zeit optimieren, CDN verwenden') }
    if (fcp > 1800) { score -= 20; issues.push(`First Contentful Paint zu langsam: ${fcp}ms (Ziel: <1800ms)`); suggestions.push('Kritisches CSS inline einbinden, render-blocking Resources entfernen') }
    if (domLoad > 3000) { score -= 15; issues.push(`DOM Load zu langsam: ${domLoad}ms`); suggestions.push('JavaScript minimieren und defer/async verwenden') }
    if (fullLoad > 5000) { score -= 15; issues.push(`Vollständige Ladezeit zu hoch: ${fullLoad}ms (Ziel: <5000ms)`); suggestions.push('Bilder komprimieren, unnötige Third-Party Scripts entfernen') }

    // Ressourcen analysieren
    const largeResources = resources.filter(r => r.size > 500000)
    const slowResources = resources.filter(r => r.duration > 1000)
    const totalSize = resources.reduce((sum, r) => sum + (r.size || 0), 0)

    if (largeResources.length > 0) {
        score -= 10
        issues.push(`${largeResources.length} große Ressourcen (>500KB) gefunden`)
        suggestions.push(`Folgende Dateien komprimieren: ${largeResources.map(r => r.url.split('/').pop()).slice(0, 3).join(', ')}`)
    }

    if (totalSize > 3000000) {
        score -= 10
        issues.push(`Gesamtgröße der Seite zu groß: ${(totalSize / 1024 / 1024).toFixed(1)}MB`)
        suggestions.push('Bilder als WebP/AVIF, JavaScript und CSS minifizieren')
    }

    // Ressourcen nach Typ
    const byType = {}
    resources.forEach(r => {
        const type = r.type || 'other'
        if (!byType[type]) byType[type] = { count: 0, size: 0 }
        byType[type].count++
        byType[type].size += r.size || 0
    })

    if ((byType.image?.count || 0) > 30) {
        score -= 5
        issues.push(`Viele Bilder auf der Seite: ${byType.image.count}`)
        suggestions.push('Lazy Loading für Bilder implementieren')
    }

    return {
        score: Math.max(0, score),
        metrics: {
            ttfb: Math.round(ttfb),
            fcp: Math.round(fcp),
            domLoad: Math.round(domLoad),
            fullLoad: Math.round(fullLoad),
            totalSize: Math.round(totalSize / 1024),
            resourceCount: resources.length,
        },
        resources: {
            byType,
            large: largeResources.slice(0, 5).map(r => ({
                url: r.url,
                size: Math.round((r.size || 0) / 1024) + 'KB',
                duration: Math.round(r.duration) + 'ms'
            })),
            slow: slowResources.slice(0, 5).map(r => ({
                url: r.url,
                duration: Math.round(r.duration) + 'ms'
            }))
        },
        issues,
        suggestions,
    }
}