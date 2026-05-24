export async function analyzeSecurity(url, headers, html) {
    const issues = []
    const suggestions = []
    const checks = []
    let score = 100

    function check(name, condition, deduction, issue, suggestion, severity = 'medium') {
        checks.push({ name, passed: !!condition, severity })
        if (!condition) {
            score -= deduction
            issues.push(issue)
            suggestions.push(suggestion)
        }
    }

    const isHttps = url.startsWith('https://')
    const h = headers || {}

    // HTTPS
    check('HTTPS', isHttps, 25,
        'Seite läuft nicht über HTTPS!',
        'SSL-Zertifikat einrichten und HTTP auf HTTPS redirecten.',
        'critical')

    // HSTS
    check('HSTS', !!h['strict-transport-security'], 10,
        'HSTS Header fehlt.',
        'Strict-Transport-Security Header hinzufügen: max-age=31536000; includeSubDomains',
        'high')

    // X-Content-Type-Options
    check('X-Content-Type-Options', !!h['x-content-type-options'], 8,
        'X-Content-Type-Options Header fehlt.',
        'Header hinzufügen: X-Content-Type-Options: nosniff',
        'medium')

    // Clickjacking
    check('Clickjacking-Schutz', !!h['x-frame-options'] || (h['content-security-policy'] || '').includes('frame-ancestors'), 8,
        'Clickjacking-Schutz fehlt (X-Frame-Options).',
        'Header hinzufügen: X-Frame-Options: SAMEORIGIN',
        'medium')

    // CSP
    check('Content-Security-Policy', !!h['content-security-policy'], 10,
        'Content-Security-Policy Header fehlt.',
        'CSP Header implementieren um XSS-Angriffe zu verhindern',
        'high')

    // Referrer-Policy
    check('Referrer-Policy', !!h['referrer-policy'], 5,
        'Referrer-Policy Header fehlt.',
        'Header hinzufügen: Referrer-Policy: strict-origin-when-cross-origin',
        'low')

    // Permissions-Policy
    check('Permissions-Policy', !!h['permissions-policy'], 5,
        'Permissions-Policy Header fehlt.',
        'Permissions-Policy Header setzen um Browser-Features zu kontrollieren',
        'low')

    // Server Header
    const serverHeader = h['server'] || ''
    check('Server-Header', !serverHeader || serverHeader === 'cloudflare' || serverHeader.length < 5, 5,
        `Server-Header verrät zu viel: "${serverHeader}".`,
        'Server-Header entfernen oder generisch halten.',
        'low')

    // Mixed Content
    if (isHttps && html) {
        const httpResources = (html.match(/src=["']http:\/\//g) || []).length
        check('Mixed Content', httpResources === 0, 10,
            `${httpResources} Mixed-Content Ressourcen gefunden (HTTP in HTTPS Seite).`,
            'Alle Ressourcen auf HTTPS umstellen.',
            'high')
    }

    // Cookie Security (HttpOnly, Secure, SameSite)
    const setCookieHeader = h['set-cookie'] || ''
    if (setCookieHeader) {
        const c = setCookieHeader.toLowerCase()
        const missingFlags = []
        if (!c.includes('httponly')) missingFlags.push('HttpOnly')
        if (!c.includes('; secure') && !c.includes(',secure') && !c.includes('\nsecure')) missingFlags.push('Secure')
        if (!c.includes('samesite=')) missingFlags.push('SameSite')
        check('Cookie-Sicherheit', missingFlags.length === 0, 8,
            `Cookies fehlen Sicherheitsflags: ${missingFlags.join(', ')}.`,
            'Session-Cookies mit HttpOnly; Secure; SameSite=Strict konfigurieren.',
            'high')
    }

    // Subresource Integrity (SRI)
    if (html) {
        try {
            const origin = new URL(url).origin
            const scriptTags = html.match(/<script[^>]+src=["']https?:\/\/[^"']+["'][^>]*/gi) || []
            const externalWithoutSri = scriptTags.filter(tag => {
                const srcMatch = tag.match(/src=["'](https?:\/\/[^"']+)["']/)
                if (!srcMatch) return false
                return !srcMatch[1].startsWith(origin) && !tag.toLowerCase().includes('integrity=')
            })
            if (scriptTags.length > 0) {
                check('Subresource Integrity', externalWithoutSri.length === 0, 5,
                    `${externalWithoutSri.length} externe Script(s) ohne SRI-Hash gefunden.`,
                    'Integrity-Attribut für externe Scripts hinzufügen (srihash.org).',
                    'medium')
            }
        } catch {}
    }

    // Cross-Origin-Opener-Policy
    check('Cross-Origin-Opener-Policy', !!h['cross-origin-opener-policy'], 3,
        'Cross-Origin-Opener-Policy Header fehlt.',
        'Header hinzufügen: Cross-Origin-Opener-Policy: same-origin',
        'low')

    // Sensible Dateien (parallel, kurzer Timeout)
    const sensitiveFiles = ['/.env', '/.git/config', '/backup.sql', '/phpinfo.php']
    try {
        const results = await Promise.allSettled(
            sensitiveFiles.map(file =>
                fetch(new URL(file, url).href, {
                    method: 'HEAD',
                    signal: AbortSignal.timeout(3000),
                    redirect: 'manual',
                })
            )
        )
        const exposed = sensitiveFiles.filter((_, i) =>
            results[i].status === 'fulfilled' && results[i].value.status === 200
        )
        check('Sensible Dateien', exposed.length === 0, 20,
            `Kritisch: Sensible Datei(en) öffentlich zugänglich: ${exposed.join(', ')}`,
            'Sensible Dateien sofort vom Webserver entfernen oder Zugriff sperren.',
            'critical')
    } catch {}

    // security.txt
    try {
        const secRes = await fetch(new URL('/.well-known/security.txt', url).href, {
            signal: AbortSignal.timeout(3000),
        })
        check('security.txt', secRes.ok, 3,
            'Keine security.txt Datei gefunden.',
            '/.well-known/security.txt mit Kontaktinfos für Sicherheitsmeldungen erstellen.',
            'info')
    } catch {
        check('security.txt', false, 3,
            'Keine security.txt Datei gefunden.',
            '/.well-known/security.txt mit Kontaktinfos für Sicherheitsmeldungen erstellen.',
            'info')
    }

    return {
        score: Math.max(0, score),
        https: isHttps,
        headers: {
            hsts: !!h['strict-transport-security'],
            xContentType: !!h['x-content-type-options'],
            xFrameOptions: !!h['x-frame-options'],
            csp: !!h['content-security-policy'],
            referrerPolicy: !!h['referrer-policy'],
            permissionsPolicy: !!h['permissions-policy'],
            coop: !!h['cross-origin-opener-policy'],
        },
        checks,
        issues,
        suggestions,
    }
}
