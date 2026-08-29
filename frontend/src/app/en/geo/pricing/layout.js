export const metadata = {
    title: 'GEO Automation Pricing – Track Your Brand on ChatGPT, Claude, Perplexity & Google AI Overview',
    description: 'Plans start at €4.99/month. Get a weekly automated check of whether ChatGPT, Claude, Perplexity, and Google AI Overview mention your site, plus a full mention history over time. 14-day free trial.',
    keywords: 'geo automation pricing, ai visibility tracking tool, chatgpt visibility tracker, claude ai visibility, perplexity visibility tracker, google ai overview tracking, generative engine optimization tool, geo tracking cost',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/geo/pricing',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/geo/pricing',
            'en-US': 'https://www.sitecheckai.dev/en/geo/pricing',
        },
    },
    openGraph: {
        title: 'GEO Automation Pricing | AuditAI',
        description: 'Weekly, automated tracking of whether ChatGPT, Claude, Perplexity, and Google AI Overview cite your site. Plans from €4.99/month, 14 days free.',
        url: 'https://www.sitecheckai.dev/en/geo/pricing',
        type: 'website',
        locale: 'en_US',
    },
}

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What does a GEO audit or GEO automation cost?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'GEO automation at AuditAI starts at €4.99/month for 1 website and 10 keywords with weekly Claude tracking. The Pro plan (€9.99/month) adds ChatGPT, Perplexity, and Google AI Overview tracking for 3 websites plus 2 prompt variants per keyword, and the Expert plan (€19.99/month) covers up to 10 websites. Every plan includes a 14-day free trial.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I track my visibility on Claude (Claude AI)?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Even the Starter plan at €4.99/month automatically checks every week whether and how often Claude cites your website as a source for relevant queries — including a mention history over time. To also track ChatGPT, Perplexity, and Google AI Overview in the same dashboard, you need the Pro plan at €9.99/month.',
            },
        },
        {
            '@type': 'Question',
            name: "What's the difference between a one-time GEO audit and GEO automation?",
            acceptedAnswer: {
                '@type': 'Answer',
                text: "A one-time GEO audit (included in AuditAI's free website audit) shows your GEO score at a single point in time. GEO automation runs an automatic weekly check across ChatGPT, Claude, Perplexity, and Google AI Overview, giving you a trend over time instead of just a snapshot.",
            },
        },
        {
            '@type': 'Question',
            name: 'Is there a free trial for GEO automation?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, every GEO automation plan comes with a 14-day free trial. Billing then renews automatically via PayPal, and you can cancel anytime.',
            },
        },
    ],
}

const geoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://www.sitecheckai.dev/en/geo/pricing#software',
    name: 'AuditAI GEO Automation',
    url: 'https://www.sitecheckai.dev/en/geo/pricing',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Weekly tracking of whether ChatGPT, Claude, Perplexity, and Google AI Overview name your domain as a source in response to relevant queries.',
    offers: [
        { '@type': 'Offer', name: 'Starter', price: '4.99', priceCurrency: 'EUR', description: '1 website, 10 keywords, Claude tracking' },
        { '@type': 'Offer', name: 'Pro', price: '9.99', priceCurrency: 'EUR', description: '3 websites, 30 keywords, Claude + ChatGPT + Perplexity + Google AI Overview tracking, 2 prompt variants per keyword' },
        { '@type': 'Offer', name: 'Expert', price: '19.99', priceCurrency: 'EUR', description: '10 websites, 100 keywords, Claude + ChatGPT + Perplexity + Google AI Overview tracking, 2 prompt variants per keyword' },
    ],
}

export default function GeoPricingLayoutEn({ children }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(geoJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            {children}
        </>
    )
}
