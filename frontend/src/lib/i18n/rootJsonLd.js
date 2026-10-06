// Every paid plan with its current price. Keep in sync with the pricing pages
// (app/pricing, app/geo/pricing, app/seo/pricing) and backend plan limits.
const MODIFIED = '2026-10-01'

function offers(locale) {
    const en = locale === 'en'
    const base = en ? 'https://www.scanora.ai/en' : 'https://www.scanora.ai'
    const o = (name, price, description, path) => ({
        '@type': 'Offer', name, price, priceCurrency: 'EUR', description, url: base + path,
        availability: 'https://schema.org/InStock',
    })
    return en ? [
        o('Audit Free', '0', '1 website audit per month (SEO, performance, GEO score)', '/pricing'),
        o('Audit Pro', '29', '10 audits per month with AI report and concrete fixes', '/pricing'),
        o('Audit Agency', '99', 'Unlimited audits', '/pricing'),
        o('GEO Starter', '4.99', 'AI visibility tracking: 1 website, 10 keywords, Claude and Gemini', '/geo/pricing'),
        o('GEO Pro', '74.99', 'AI visibility tracking: 3 websites, 20 keywords, ChatGPT, Claude, Gemini, Perplexity, Google AI Overview', '/geo/pricing'),
        o('GEO Expert', '199.99', 'AI visibility tracking: 10 websites, 60 keywords, all 5 platforms, history trends', '/geo/pricing'),
        o('SEO Starter', '29.99', 'Google ranking tracking: 3 websites, 50 keywords, weekly updates', '/seo/pricing'),
        o('SEO Pro', '89.99', 'Google ranking tracking: 10 websites, 200 keywords, content gap analysis', '/seo/pricing'),
        o('SEO Expert', '179.99', 'Google ranking tracking: 20 websites, 500 keywords, prioritized support', '/seo/pricing'),
    ] : [
        o('Audit Free', '0', '1 Website-Audit pro Monat (SEO-, Performance- und GEO-Score)', '/pricing'),
        o('Audit Pro', '29', '10 Audits pro Monat mit KI-Report und konkreten Fixes', '/pricing'),
        o('Audit Agency', '99', 'Unbegrenzte Audits', '/pricing'),
        o('GEO Einsteiger', '4.99', 'KI-Sichtbarkeits-Tracking: 1 Website, 10 Keywords, Claude und Gemini', '/geo/pricing'),
        o('GEO Pro', '74.99', 'KI-Sichtbarkeits-Tracking: 3 Websites, 20 Keywords, ChatGPT, Claude, Gemini, Perplexity, Google AI Overview', '/geo/pricing'),
        o('GEO Expert', '199.99', 'KI-Sichtbarkeits-Tracking: 10 Websites, 60 Keywords, alle 5 Plattformen, Historien-Trends', '/geo/pricing'),
        o('SEO Einsteiger', '29.99', 'Google-Ranking-Tracking: 3 Websites, 50 Keywords, wöchentliche Updates', '/seo/pricing'),
        o('SEO Pro', '89.99', 'Google-Ranking-Tracking: 10 Websites, 200 Keywords, Content-Gap-Analyse', '/seo/pricing'),
        o('SEO Expert', '179.99', 'Google-Ranking-Tracking: 20 Websites, 500 Keywords, priorisierter Support', '/seo/pricing'),
    ]
}

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
                    description: 'SEO and GEO tool from Germany. Measures how well a website ranks on Google and how often ChatGPT, Claude, Gemini, Perplexity and Google AI Overview mention it.',
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
                    ],
                },
                {
                    '@type': 'Person',
                    '@id': 'https://www.scanora.ai/#founder',
                    name: 'Finn Paustian',
                    jobTitle: 'Founder',
                    url: 'https://www.scanora.ai/about',
                    worksFor: { '@id': 'https://www.scanora.ai/en/#organization' },
                },
                {
                    '@type': 'WebSite',
                    '@id': 'https://www.scanora.ai/en/#website',
                    url: 'https://www.scanora.ai/en',
                    name: 'Scanora',
                    publisher: { '@id': 'https://www.scanora.ai/en/#organization' },
                    inLanguage: 'en-US',
                    dateModified: MODIFIED,
                },
                {
                    '@type': 'SoftwareApplication',
                    name: 'Scanora',
                    url: 'https://www.scanora.ai/en',
                    applicationCategory: 'BusinessApplication',
                    operatingSystem: 'Web',
                    description: 'Free website audit in under 60 seconds plus weekly tracking of Google rankings and AI visibility in ChatGPT, Claude, Gemini, Perplexity and Google AI Overview.',
                    featureList: ['AI visibility tracking (mention rate, share of voice, citations)', 'Google ranking tracking', 'Website audit for SEO, performance and GEO', 'Email alerts on lost rankings or AI mentions'],
                    dateModified: MODIFIED,
                    offers: offers(locale),
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
                description: 'SEO- und GEO-Tool aus Deutschland. Misst, wie gut eine Website bei Google rankt und wie oft ChatGPT, Claude, Gemini, Perplexity und Google AI Overview sie nennen.',
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
                ],
            },
            {
                '@type': 'WebSite',
                '@id': 'https://www.scanora.ai/#website',
                url: 'https://www.scanora.ai',
                name: 'Scanora',
                publisher: { '@id': 'https://www.scanora.ai/#organization' },
                inLanguage: 'de-DE',
                dateModified: MODIFIED,
            },
            {
                '@type': 'SoftwareApplication',
                name: 'Scanora',
                url: 'https://www.scanora.ai',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web',
                description: 'Kostenloser Website-Audit in unter 60 Sekunden plus wöchentliches Tracking von Google-Rankings und KI-Sichtbarkeit in ChatGPT, Claude, Gemini, Perplexity und Google AI Overview.',
                featureList: ['KI-Sichtbarkeits-Tracking (Mention-Rate, Share of Voice, Zitate)', 'Google-Ranking-Tracking', 'Website-Audit für SEO, Performance und GEO', 'E-Mail-Alerts bei verlorenen Rankings oder KI-Erwähnungen'],
                dateModified: MODIFIED,
                offers: offers(locale),
            },
            {
                '@type': 'Person',
                '@id': 'https://www.scanora.ai/#founder',
                name: 'Finn Paustian',
                jobTitle: 'Founder',
                url: 'https://www.scanora.ai/about',
                worksFor: { '@id': 'https://www.scanora.ai/#organization' },
            },
        ],
    }
}
