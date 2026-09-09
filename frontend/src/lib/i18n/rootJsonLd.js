export function getRootJsonLd(locale) {
    if (locale === 'en') {
        return {
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'Organization',
                    '@id': 'https://www.scanora.ai/en/#organization',
                    name: 'Scanora',
                    url: 'https://www.scanora.ai/en',
                    description: 'AI-powered website audit tool for SEO, performance, and GEO (AI search) visibility.',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://www.scanora.ai/logo',
                        contentUrl: 'https://www.scanora.ai/logo',
                        width: 512,
                        height: 512,
                    },
                    sameAs: ['https://x.com/scanoraai'],
                },
                {
                    '@type': 'WebSite',
                    '@id': 'https://www.scanora.ai/en/#website',
                    url: 'https://www.scanora.ai/en',
                    name: 'Scanora',
                    publisher: { '@id': 'https://www.scanora.ai/en/#organization' },
                    inLanguage: 'en-US',
                    dateModified: '2026-09-09',
                },
                {
                    '@type': 'SoftwareApplication',
                    name: 'Scanora',
                    url: 'https://www.scanora.ai/en',
                    applicationCategory: 'BusinessApplication',
                    operatingSystem: 'Web',
                    description: 'Full website audit powered by AI: SEO, performance, and GEO (AI search) visibility in under 60 seconds.',
                    dateModified: '2026-09-09',
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
                '@id': 'https://www.scanora.ai/#organization',
                name: 'Scanora',
                url: 'https://www.scanora.ai',
                description: 'KI-gestütztes Website-Audit-Tool für SEO, Performance und GEO-Sichtbarkeit.',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://www.scanora.ai/logo',
                    contentUrl: 'https://www.scanora.ai/logo',
                    width: 512,
                    height: 512,
                },
                sameAs: ['https://x.com/scanoraai'],
            },
            {
                '@type': 'WebSite',
                '@id': 'https://www.scanora.ai/#website',
                url: 'https://www.scanora.ai',
                name: 'Scanora',
                publisher: { '@id': 'https://www.scanora.ai/#organization' },
                inLanguage: 'de-DE',
                dateModified: '2026-09-09',
            },
            {
                '@type': 'SoftwareApplication',
                name: 'Scanora',
                url: 'https://www.scanora.ai',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web',
                description: 'Vollständiger Website-Audit mit KI: SEO, Performance und GEO-Sichtbarkeit in unter 60 Sekunden.',
                dateModified: '2026-09-09',
                offers: [
                    { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'EUR', description: '1 Audit pro Monat' },
                    { '@type': 'Offer', name: 'Pro', price: '29', priceCurrency: 'EUR', description: '10 Audits pro Monat' },
                    { '@type': 'Offer', name: 'Agency', price: '99', priceCurrency: 'EUR', description: 'Unbegrenzte Audits' },
                ],
            },
            {
                '@type': 'WebPage',
                '@id': 'https://www.scanora.ai/#webpage',
                url: 'https://www.scanora.ai',
                name: 'AI Visibility & SEO prüfen: Wirst du von ChatGPT, Perplexity und Google zitiert?',
                isPartOf: { '@id': 'https://www.scanora.ai/#website' },
                inLanguage: 'de-DE',
                primaryImageOfPage: { '@id': 'https://www.scanora.ai/logo' },
                datePublished: '2026-01-15',
                dateModified: '2026-09-09',
                about: [
                    { '@type': 'Thing', name: 'Generative Engine Optimization' },
                    { '@type': 'Thing', name: 'AI Visibility' },
                    { '@type': 'Thing', name: 'SEO-Audit' },
                ],
            },
            {
                '@type': 'Article',
                '@id': 'https://www.scanora.ai/#article',
                headline: 'AI Visibility & SEO prüfen: Wirst du von ChatGPT, Perplexity und Google zitiert?',
                description: 'Scanora prüft in unter 60 Sekunden kostenlos, ob eine Website bei ChatGPT, Claude, Perplexity und Google AI Overview zitiert wird, plus klassische SEO-Rankings.',
                author: { '@type': 'Organization', '@id': 'https://www.scanora.ai/#organization', name: 'Scanora' },
                publisher: { '@id': 'https://www.scanora.ai/#organization' },
                datePublished: '2026-01-15',
                dateModified: '2026-09-09',
                mainEntityOfPage: { '@id': 'https://www.scanora.ai/#webpage' },
                about: [
                    { '@type': 'Thing', name: 'Generative Engine Optimization' },
                    { '@type': 'Thing', name: 'AI Visibility' },
                    { '@type': 'Thing', name: 'SEO-Audit' },
                ],
                isPartOf: { '@id': 'https://www.scanora.ai/#website' },
            },
        ],
    }
}
