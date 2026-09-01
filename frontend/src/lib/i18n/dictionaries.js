export const dictionaries = {
    de: {
        nav: {
            login: 'Anmelden',
            cta: 'Jetzt prüfen',
            dashboard: 'Dashboard',
            profile: 'Mein Profil',
            logout: 'Abmelden',
            rankings: 'Rankings',
            trackingPreise: 'Tracking Preise',
            kiTracking: 'KI-Tracking',
            geoPreise: 'GEO Preise',
            seoAutomatisierung: 'SEO Automatisierung',
            geoAutomatisierung: 'GEO Automatisierung',
        },
        footer: {
            tagline: 'AI Visibility & SEO - in 60 Sekunden.',
            product: 'Produkt',
            blogHeading: 'Blog',
            legal: 'Rechtliches',
            copyright: '© 2026 AuditAI. Alle Rechte vorbehalten.',
            support: 'Support kontaktieren',
        },
        common: {
            loading: 'Lädt...',
            save: 'Speichern',
        },
    },
    en: {
        nav: {
            login: 'Log in',
            cta: 'Check now',
            dashboard: 'Dashboard',
            profile: 'My Profile',
            logout: 'Log out',
            rankings: 'Rankings',
            trackingPreise: 'Tracking Pricing',
            kiTracking: 'AI Tracking',
            geoPreise: 'GEO Pricing',
            seoAutomatisierung: 'SEO Automation',
            geoAutomatisierung: 'GEO Automation',
        },
        footer: {
            tagline: 'AI Visibility & SEO - in 60 seconds.',
            product: 'Product',
            blogHeading: 'Blog',
            legal: 'Legal',
            copyright: '© 2026 AuditAI. All rights reserved.',
            support: 'Contact support',
        },
        common: {
            loading: 'Loading...',
            save: 'Save',
        },
    },
}

export function t(locale, path) {
    const dict = dictionaries[locale] ?? dictionaries.de
    const value = path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict)
    if (value !== undefined) return value
    return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dictionaries.de) ?? path
}
