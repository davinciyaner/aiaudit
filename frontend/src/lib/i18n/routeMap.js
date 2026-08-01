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
}

export const EN_TO_DE = Object.fromEntries(
    Object.entries(DE_TO_EN).map(([de, en]) => [en, de])
)

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
    if (currentLocale === 'de') return DE_TO_EN[pathname] ?? null
    if (pathname === '/en') return '/'
    return EN_TO_DE[pathname] ?? null
}
