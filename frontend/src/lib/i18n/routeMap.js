// Maps German paths <-> English paths for pages that have both a de and an en
// version. Most routes are 1:1 (just prefixed with /en), but blog slugs differ
// since post URLs are hand-written per locale rather than transliterated.
export const DE_TO_EN = {
    '/': '/en',
    '/pricing': '/en/pricing',
    '/blog': '/en/blog',
    '/blog/geo-optimierung-2026': '/en/blog/what-is-geo',
    '/blog/core-web-vitals-testen': '/en/blog/core-web-vitals-testing',
    '/blog/seo-test-vs-agentur': '/en/blog/seo-tool-vs-agency',
    '/blog/llms-txt-erklaert': '/en/blog/llms-txt-explained',
    '/blog/schema-markup-ki-zitate': '/en/blog/schema-markup-ai-citations',
    '/blog/seo-tracking-manuell-vs-automatisiert': '/en/blog/seo-tracking-manual-vs-automated',
    '/blog/beste-seo-check-tools-2026': '/en/blog/best-seo-tools-2026',
    '/blog/seo-checkliste-2026': '/en/blog/seo-checklist-2026',
    '/blog/seo-geo-automatisierung': '/en/blog/seo-geo-automation',
    '/blog/seo-test-haeufige-fehler': '/en/blog/common-seo-mistakes',
    '/blog/ki-sichtbarkeit-erlangen': '/en/blog/ai-visibility',
    '/login': '/en/login',
    '/register': '/en/register',
    '/forgot-password': '/en/forgot-password',
    '/reset-password': '/en/reset-password',
    '/dashboard': '/en/dashboard',
    '/about': '/en/about',
    '/subscription': '/en/subscription',
    '/extension-auth': '/en/extension-auth',
    '/profile': '/en/profile',
    '/support': '/en/support',
    '/seo/dashboard': '/en/seo/dashboard',
    '/seo/pricing': '/en/seo/pricing',
    '/geo/dashboard': '/en/geo/dashboard',
    '/geo/pricing': '/en/geo/pricing',
    '/geo/check': '/en/geo/check',
    '/vergleich': '/en/compare',
    '/vergleich/otterly-alternative': '/en/compare/otterly-alternative',
    '/vergleich/peec-alternative': '/en/compare/peec-alternative',
    '/vergleich/rankscale-alternative': '/en/compare/rankscale-alternative',
    '/vergleich/writesonic-alternative': '/en/compare/writesonic-alternative',
    '/loesungen': '/en/solutions',
    '/loesungen/guenstiges-ki-sichtbarkeit-tool': '/en/solutions/affordable-ai-visibility-tool',
    '/loesungen/claude-ai-sichtbarkeit-tracken': '/en/solutions/claude-ai-visibility-tracking',
    // '/loesungen/seo-geo-tool' has no EN counterpart yet — intentionally omitted so the
    // switcher hides itself there instead of linking somewhere that 404s.
}

export const EN_TO_DE = Object.fromEntries(
    Object.entries(DE_TO_EN).map(([de, en]) => [en, de])
)

// Route prefixes that have a dynamic id/slug segment ("/geo/site_abc123") instead of a
// fixed path — a static dictionary lookup can't cover these, so the id is carried over
// as-is between locales (both sides use the same underlying resource id).
const DYNAMIC_DE_PREFIXES = ['/geo/', '/seo/', '/tests/', '/support/']
// Static (non-dynamic) sub-routes that live under those same prefixes and must NOT be
// treated as "prefix + id" — they're already covered by DE_TO_EN above.
const STATIC_EXCEPTIONS = new Set(['/geo/dashboard', '/geo/pricing', '/geo/check', '/seo/dashboard', '/seo/pricing', '/support/admin'])

function dynamicCounterpart(pathname, currentLocale) {
    const prefixes = currentLocale === 'de' ? DYNAMIC_DE_PREFIXES : DYNAMIC_DE_PREFIXES.map(p => '/en' + p)
    for (const prefix of prefixes) {
        if (!pathname.startsWith(prefix)) continue
        const rest = pathname.slice(prefix.length)
        if (!rest || rest.includes('/')) continue // only a single dynamic segment, not a deeper static route
        const dePrefix = currentLocale === 'de' ? prefix : prefix.replace(/^\/en/, '')
        if (STATIC_EXCEPTIONS.has(dePrefix + rest) || STATIC_EXCEPTIONS.has(prefix + rest)) continue
        return currentLocale === 'de' ? '/en' + prefix + rest : prefix.replace(/^\/en/, '') + rest
    }
    return null
}

// Resolves a de-locale href to its en counterpart. Falls back to a naive
// '/en' + href prefix for 1:1 paths that haven't been added to DE_TO_EN yet
// (acceptable for anchors/hashes and external links, which are passed through).
export function localizeHref(locale, href) {
    if (locale !== 'en') return href
    if (!href || href.startsWith('#') || href.startsWith('http')) return href
    return DE_TO_EN[href] ?? ('/en' + href)
}

// Given the current pathname and its locale, returns the counterpart path in
// the other locale, or null if no counterpart exists yet (used to hide/disable
// the language switcher on pages that haven't been localized).
export function getCounterpart(pathname, currentLocale) {
    if (currentLocale === 'de') {
        return DE_TO_EN[pathname] ?? dynamicCounterpart(pathname, 'de') ?? null
    }
    if (pathname === '/en') return '/'
    return EN_TO_DE[pathname] ?? dynamicCounterpart(pathname, 'en') ?? null
}
