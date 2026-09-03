export const metadata = {
    title: 'GEO Automation Pricing – Track Your Brand on ChatGPT, Claude, Gemini, Perplexity & Google AI Overview',
    description: 'Plans start at €4.99/month. Get a weekly automated check of whether ChatGPT, Claude, Gemini, Perplexity, and Google AI Overview mention your site, plus topic visibility analysis, historical trends, and a full mention history over time. 14-day free trial.',
    keywords: 'geo automation pricing, ai visibility tracking tool, chatgpt visibility tracker, claude ai visibility, gemini ai visibility, perplexity visibility tracker, google ai overview tracking, generative engine optimization tool, geo tracking cost',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/geo/pricing',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/geo/pricing',
            'en-US': 'https://www.sitecheckai.dev/en/geo/pricing',
        },
    },
    openGraph: {
        title: 'GEO Automation Pricing | AuditAI',
        description: 'Weekly, automated tracking of whether ChatGPT, Claude, Gemini, Perplexity, and Google AI Overview cite your site. Plans from €4.99/month, 14 days free.',
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
                text: 'GEO automation at AuditAI starts at €4.99/month for 1 website and 10 keywords with weekly Claude and Gemini tracking. The Pro plan (€29.99/month) adds ChatGPT, Perplexity, and Google AI Overview tracking for 3 websites and 20 keywords, 2 prompt variants per keyword, and topic visibility analysis, and the Expert plan (€89.99/month) covers up to 10 websites and 60 keywords plus historical trends per keyword. Every plan includes a 14-day free trial.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I track my visibility on Claude (Claude AI)?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Even the Starter plan at €4.99/month automatically checks every week whether and how often Claude and Google Gemini cite your website as a source for relevant queries — including a mention history over time. To also track ChatGPT, Perplexity, and Google AI Overview in the same dashboard, you need the Pro plan at €29.99/month.',
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
            name: 'What do topic visibility analysis and historical trends show me?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Topic visibility analysis (from Pro) shows which domains get cited most often in AI answers touching your tracked keywords — across all contexts, not just tool recommendations (for that, use the separate Competitors tab). Historical trends (Expert) show, per keyword, how much overall mention volume that topic gets in Google AI Overview responses each month — a topic-volume trend, not domain-specific citation tracking.',
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
    description: 'Weekly tracking of whether ChatGPT, Claude, Gemini, Perplexity, and Google AI Overview name your domain as a source in response to relevant queries.',
    offers: [
        { '@type': 'Offer', name: 'Starter', price: '4.99', priceCurrency: 'EUR', description: '1 website, 10 keywords, Claude & Gemini tracking' },
        { '@type': 'Offer', name: 'Pro', price: '29.99', priceCurrency: 'EUR', description: '3 websites, 20 keywords, Claude + ChatGPT + Gemini + Perplexity + Google AI Overview tracking, 2 prompt variants per keyword, topic visibility analysis' },
        { '@type': 'Offer', name: 'Expert', price: '89.99', priceCurrency: 'EUR', description: '10 websites, 60 keywords, all platforms, 2 prompt variants per keyword, topic visibility analysis, historical trends per keyword (Google AI Overview)' },
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
