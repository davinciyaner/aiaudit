export async function analyzeSecurity(url, headers, html) {
    const issues = []
    const suggestions = []
    let score = 100

    function check(condition, deduction, issue, suggestion) {
        if (!condition) {
            score -= deduction
            issues.push(issue)
            suggestions.push(suggestion)
        }
    }

    // HTTPS
    check(url.startsWith('https://'), 25,
        'Seite läuft nicht über HTTPS!',
        'SSL-Zertifikat einrichten und HTTP auf HTTPS redirecten.')

    // Security Headers
    const h = headers || {}

    check(!!h['strict-transport-security'], 10,
        'HSTS Header fehlt.',
        'Strict-Transport-Security Header hinzufügen: max-age=31536000; includeSubDomains')

    check(!!h['x-content-type-options'], 8,
        'X-Content-Type-Options Header fehlt.',
        'Header hinzufügen: X-Content-Type-Options: nosniff')

    check(!!h['x-frame-options'] || (h['content-security-policy'] || '').includes('frame-ancestors'), 8,
        'Clickjacking-Schutz fehlt (X-Frame-Options).',
        'Header hinzufügen: X-Frame-Options: SAMEORIGIN')

    check(!!h['content-security-policy'], 10,
        'Content-Security-Policy Header fehlt.',
        'CSP Header implementieren um XSS-Angriffe zu verhindern')

    check(!!h['referrer-policy'], 5,
        'Referrer-Policy Header fehlt.',
        'Header hinzufügen: Referrer-Policy: strict-origin-when-cross-origin')

    check(!!h['permissions-policy'], 5,
        'Permissions-Policy Header fehlt.',
        'Permissions-Policy Header setzen um Browser-Features zu kontrollieren')

    // Server Header versteckt?
    const serverHeader = h['server'] || ''
    check(!serverHeader || serverHeader === 'cloudflare' || serverHeader.length < 5, 5,
        `Server-Header verrät zu viel: "${serverHeader}".`,
        'Server-Header entfernen oder generisch halten.')

    // Mixed Content Check (HTTP in HTTPS Seite)
    if (url.startsWith('https://') && html) {
        const httpResources = (html.match(/src=["']http:\/\//g) || []).length
        check(httpResources === 0, 10,
            `${httpResources} Mixed-Content Ressourcen gefunden (HTTP in HTTPS Seite).`,
            'Alle Ressourcen auf HTTPS umstellen.')
    }

    return {
        score: Math.max(0, score),
        https: url.startsWith('https://'),
        headers: {
            hsts: !!h['strict-transport-security'],
            xContentType: !!h['x-content-type-options'],
            xFrameOptions: !!h['x-frame-options'],
            csp: !!h['content-security-policy'],
            referrerPolicy: !!h['referrer-policy'],
        },
        issues,
        suggestions,
    }
}