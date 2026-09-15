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
                    founder: { '@id': 'https://www.scanora.ai/#founder' },
                    sameAs: [
                        'https://x.com/scanoraai',
                        'https://www.linkedin.com/company/scanora-ai',
                        'https://github.com/scanora-ai',
                    ],
                },
                {
                    '@type': 'Person',
                    '@id': 'https://www.scanora.ai/#founder',
                    name: 'Finn Paustian',
                    jobTitle: 'Founder',
                    url: 'https://www.scanora.ai/about',
                    sameAs: [
                        'https://www.linkedin.com/in/finn-paustian',
                        'https://x.com/scanoraai',
                    ],
                    worksFor: { '@id': 'https://www.scanora.ai/en/#organization' },
                },
                {
                    '@type': 'WebSite',
                    '@id': 'https://www.scanora.ai/en/#website',
                    url: 'https://www.scanora.ai/en',
                    name: 'Scanora',
                    publisher: { '@id': 'https://www.scanora.ai/en/#organization' },
                    inLanguage: 'en-US',
                    dateModified: '2026-09-12',
                },
                {
                    '@type': 'SoftwareApplication',
                    name: 'Scanora',
                    url: 'https://www.scanora.ai/en',
                    applicationCategory: 'BusinessApplication',
                    operatingSystem: 'Web',
                    description: 'Full website audit powered by AI: SEO, performance, and GEO (AI search) visibility in under 60 seconds.',
                    dateModified: '2026-09-12',
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
                founder: { '@id': 'https://www.scanora.ai/#founder' },
                sameAs: [
                    'https://x.com/scanoraai',
                    'https://www.linkedin.com/company/scanora-ai',
                    'https://github.com/scanora-ai',
                ],
            },
            {
                '@type': 'WebSite',
                '@id': 'https://www.scanora.ai/#website',
                url: 'https://www.scanora.ai',
                name: 'Scanora',
                publisher: { '@id': 'https://www.scanora.ai/#organization' },
                inLanguage: 'de-DE',
                dateModified: '2026-09-12',
            },
            {
                '@type': 'SoftwareApplication',
                name: 'Scanora',
                url: 'https://www.scanora.ai',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web',
                description: 'Vollständiger Website-Audit mit KI: SEO, Performance und GEO-Sichtbarkeit in unter 60 Sekunden.',
                dateModified: '2026-09-12',
                offers: [
                    { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'EUR', description: '1 Audit pro Monat' },
                    { '@type': 'Offer', name: 'Pro', price: '29', priceCurrency: 'EUR', description: '10 Audits pro Monat' },
                    { '@type': 'Offer', name: 'Agency', price: '99', priceCurrency: 'EUR', description: 'Unbegrenzte Audits' },
                ],
            },
            {
                '@type': 'Person',
                '@id': 'https://www.scanora.ai/#founder',
                name: 'Finn Paustian',
                jobTitle: 'Founder',
                url: 'https://www.scanora.ai/about',
                sameAs: [
                    'https://www.linkedin.com/in/finn-paustian',
                    'https://x.com/scanoraai',
                ],
                worksFor: { '@id': 'https://www.scanora.ai/#organization' },
            },
        ],
    }
}
