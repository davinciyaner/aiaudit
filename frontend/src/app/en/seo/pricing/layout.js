
export const metadata = {
    title: 'SEO Automation Pricing: Track Google Rankings Weekly',
    description: 'SEO automation from €29.99/month: track Google rankings weekly, keyword ideas, competitor and backlink analysis. 14-day free trial.',
    keywords: 'seo automation pricing, seo tracking tool, track google rankings automatically, keyword tracking tool, rank monitoring, seo automation cost',
    alternates: {
        canonical: 'https://www.scanora.ai/en/seo/pricing',
        languages: {
            'de-DE': 'https://www.scanora.ai/seo/pricing',
            'en-US': 'https://www.scanora.ai/en/seo/pricing',
            'x-default': 'https://www.scanora.ai/seo/pricing',
        },
    },
    openGraph: {
        title: 'SEO Automation Pricing | Scanora',
        description: 'Track Google rankings weekly instead of checking manually. Plans from €29.99/month, 14-day free trial.',
        url: 'https://www.scanora.ai/en/seo/pricing',
        type: 'website',
        locale: 'en_US',
        images: ['https://www.scanora.ai/en/opengraph-image'],
    },
}

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'How much does SEO automation cost?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'SEO automation at Scanora starts at €29.99/month for 3 websites and 50 keywords with weekly ranking updates. The Pro plan (€89.99/month) expands to 10 websites and 200 keywords including content gap analysis, the Expert plan (€179.99/month) covers up to 20 websites and 500 keywords. All plans include a 14-day free trial.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is the difference between a one-time SEO audit and SEO automation?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'A one-time SEO audit (part of the free Scanora website audit) shows your SEO score at one point in time. SEO automation tracks your Google rankings, keyword ideas, competitor analysis and backlink overview automatically every week, as an ongoing history instead of a single measurement.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is there a free trial for SEO automation?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, all SEO automation plans include a 14-day free trial, then renew automatically via PayPal. Cancel anytime.',
            },
        },
    ],
}

const seoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://www.scanora.ai/en/seo/pricing#software',
    name: 'Scanora SEO Automation',
    url: 'https://www.scanora.ai/en/seo/pricing',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Weekly Google ranking tracking, keyword ideas, competitor analysis and backlink overview.',
    offers: [
        { '@type': 'Offer', name: 'Starter', price: '29.99', priceCurrency: 'EUR', description: '3 websites, 50 keywords, weekly ranking update' },
        { '@type': 'Offer', name: 'Pro', price: '89.99', priceCurrency: 'EUR', description: '10 websites, 200 keywords, content gap analysis' },
        { '@type': 'Offer', name: 'Expert', price: '179.99', priceCurrency: 'EUR', description: '20 websites, 500 keywords, prioritized support' },
    ],
}

export default function SeoPricingLayoutEn({ children }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seoJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            {children}
        </>
    )
}
