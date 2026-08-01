export function getRootJsonLd(locale) {
    if (locale === 'en') {
        return {
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'Organization',
                    '@id': 'https://www.sitecheckai.dev/en/#organization',
                    name: 'AuditAI',
                    url: 'https://www.sitecheckai.dev/en',
                    description: 'AI-powered website audit tool for SEO, performance, and GEO (AI search) visibility.',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://www.sitecheckai.dev/logo',
                        width: 512,
                        height: 512,
                    },
                    sameAs: ['https://twitter.com/auditai'],
                },
                {
                    '@type': 'WebSite',
                    '@id': 'https://www.sitecheckai.dev/en/#website',
                    url: 'https://www.sitecheckai.dev/en',
                    name: 'AuditAI',
                    publisher: { '@id': 'https://www.sitecheckai.dev/en/#organization' },
                    inLanguage: 'en-US',
                },
                {
                    '@type': 'SoftwareApplication',
                    name: 'AuditAI',
                    url: 'https://www.sitecheckai.dev/en',
                    applicationCategory: 'BusinessApplication',
                    operatingSystem: 'Web',
                    description: 'Full website audit powered by AI: SEO, performance, and GEO (AI search) visibility in under 60 seconds.',
                    offers: [
                        { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'EUR', description: '1 audit per month' },
                        { '@type': 'Offer', name: 'Pro', price: '29', priceCurrency: 'EUR', description: '10 audits per month' },
                        { '@type': 'Offer', name: 'Agency', price: '99', priceCurrency: 'EUR', description: 'Unlimited audits' },
                    ],
                },
            ],
        }
    }

    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': 'https://www.sitecheckai.dev/#organization',
                name: 'AuditAI',
                url: 'https://www.sitecheckai.dev',
                description: 'KI-gestütztes Website-Audit-Tool für SEO, Performance und GEO-Sichtbarkeit.',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://www.sitecheckai.dev/logo',
                    width: 512,
                    height: 512,
                },
                sameAs: ['https://twitter.com/auditai'],
            },
            {
                '@type': 'WebSite',
                '@id': 'https://www.sitecheckai.dev/#website',
                url: 'https://www.sitecheckai.dev',
                name: 'AuditAI',
                publisher: { '@id': 'https://www.sitecheckai.dev/#organization' },
                inLanguage: 'de-DE',
            },
            {
                '@type': 'SoftwareApplication',
                name: 'AuditAI',
                url: 'https://www.sitecheckai.dev',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web',
                description: 'Vollständiger Website-Audit mit KI: SEO, Performance und GEO-Sichtbarkeit in unter 60 Sekunden.',
                offers: [
                    { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'EUR', description: '1 Audit pro Monat' },
                    { '@type': 'Offer', name: 'Pro', price: '29', priceCurrency: 'EUR', description: '10 Audits pro Monat' },
                    { '@type': 'Offer', name: 'Agency', price: '99', priceCurrency: 'EUR', description: 'Unbegrenzte Audits' },
                ],
            },
        ],
    }
}
