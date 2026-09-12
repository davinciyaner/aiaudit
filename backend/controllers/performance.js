export async function analyzePerformance(url, page, metrics) {
    const issues = []
    const suggestions = []

    // Timing-Metriken aus Playwright
    const timing = metrics.timing || {}
    const resources = metrics.resources || []

    const isMeasured = v => typeof v === 'number' && Number.isFinite(v) && v >= 0

    // `null` bei fehlender Messung statt `0` — ein Messfehler ist kein Bestwert.
    const ttfb = isMeasured(timing.responseStart) && isMeasured(timing.requestStart)
        ? timing.responseStart - timing.requestStart
        : null
    const fcp = isMeasured(timing.firstContentfulPaint) ? timing.firstContentfulPaint : null
    const domLoad = isMeasured(timing.domContentLoadedEventEnd) ? timing.domContentLoadedEventEnd : null
    const fullLoad = isMeasured(timing.loadEventEnd) ? timing.loadEventEnd : null
    const lcp = isMeasured(timing.largestContentfulPaint) ? timing.largestContentfulPaint : null
    // CLS darf 0 sein (kein Layout-Shift) — negative/undefined Werte gelten als nicht gemessen.
    const cls = typeof timing.cumulativeLayoutShift === 'number' && Number.isFinite(timing.cumulativeLayoutShift) && timing.cumulativeLayoutShift >= 0
        ? timing.cumulativeLayoutShift
        : null

    // Score berechnen
    let score = 100

    if (ttfb === null) { score -= 20; issues.push('TTFB konnte nicht gemessen werden'); suggestions.push('Audit erneut ausführen — Navigation-Timing wurde nicht erfasst') }
    else if (ttfb > 600) { score -= 20; issues.push(`TTFB zu hoch: ${Math.round(ttfb)}ms (Ziel: <600ms)`); suggestions.push('Server-Response-Zeit optimieren, CDN verwenden') }

    if (fcp === null) { score -= 20; issues.push('First Contentful Paint konnte nicht gemessen werden'); suggestions.push('Audit erneut ausführen — Paint-Timing wurde nicht erfasst') }
    else if (fcp > 1800) { score -= 20; issues.push(`First Contentful Paint zu langsam: ${Math.round(fcp)}ms (Ziel: <1800ms)`); suggestions.push('Kritisches CSS inline einbinden, render-blocking Resources entfernen') }

    if (domLoad === null) { score -= 15; issues.push('DOM Load konnte nicht gemessen werden'); suggestions.push('Audit erneut ausführen — Navigation-Timing wurde nicht erfasst') }
    else if (domLoad > 3000) { score -= 15; issues.push(`DOM Load zu langsam: ${Math.round(domLoad)}ms`); suggestions.push('JavaScript minimieren und defer/async verwenden') }

    if (fullLoad === null) { score -= 15; issues.push('Vollständige Ladezeit konnte nicht gemessen werden'); suggestions.push('Audit erneut ausführen — Navigation-Timing wurde nicht erfasst') }
    else if (fullLoad > 5000) { score -= 15; issues.push(`Vollständige Ladezeit zu hoch: ${Math.round(fullLoad)}ms (Ziel: <5000ms)`); suggestions.push('Bilder komprimieren, unnötige Third-Party Scripts entfernen') }

    // Echte Core Web Vitals (LCP/CLS). INP ist bewusst nicht enthalten — es erfordert eine
    // echte Nutzerinteraktion und lässt sich in einem automatisierten, interaktionslosen
    // Crawl nicht seriös messen (kein Fake-Wert statt echter Messung).
    if (lcp === null) { score -= 10; issues.push('Largest Contentful Paint (LCP) konnte nicht gemessen werden'); suggestions.push('Audit erneut ausführen') }
    else if (lcp > 4000) { score -= 20; issues.push(`LCP zu langsam: ${Math.round(lcp)}ms (Ziel: <2500ms)`); suggestions.push('Größtes Above-the-Fold-Element priorisiert laden (z.B. Preload für Hero-Bild), render-blocking Resources reduzieren') }
    else if (lcp > 2500) { score -= 10; issues.push(`LCP verbesserungswürdig: ${Math.round(lcp)}ms (Ziel: <2500ms)`); suggestions.push('Hero-Bild/-Text schneller sichtbar machen') }

    if (cls === null) { score -= 8; issues.push('Cumulative Layout Shift (CLS) konnte nicht gemessen werden'); suggestions.push('Audit erneut ausführen') }
    else if (cls > 0.25) { score -= 15; issues.push(`CLS zu hoch: ${cls.toFixed(3)} (Ziel: <0.1)`); suggestions.push('Feste Breiten/Höhen für Bilder und eingebettete Inhalte setzen, Web-Fonts mit font-display: optional laden') }
    else if (cls > 0.1) { score -= 8; issues.push(`CLS verbesserungswürdig: ${cls.toFixed(3)} (Ziel: <0.1)`); suggestions.push('Layout-Verschiebungen durch nachladende Inhalte (Ads, Fonts, Bilder ohne Dimensionen) reduzieren') }

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
            ttfb: ttfb === null ? null : Math.round(ttfb),
            fcp: fcp === null ? null : Math.round(fcp),
            domLoad: domLoad === null ? null : Math.round(domLoad),
            fullLoad: fullLoad === null ? null : Math.round(fullLoad),
            lcp: lcp === null ? null : Math.round(lcp),
            cls: cls === null ? null : Number(cls.toFixed(3)),
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