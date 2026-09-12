export const metadata = {
    title: 'GEO Check: Are You Cited by ChatGPT?',
    description: 'Free GEO Check: see whether your website is cited by ChatGPT, Claude, Perplexity, or Google AI Overview. For ongoing tracking, see GEO Automation. No registration required.',
    keywords: 'geo check, free geo check, chatgpt visibility check, claude citation check, ai visibility test, ai visibility check, google ai overview check, geo automation',
    alternates: {
        canonical: 'https://www.scanora.ai/en/geo/check',
        languages: {
            'de-DE': 'https://www.scanora.ai/geo/check',
            'en-US': 'https://www.scanora.ai/en/geo/check',
        },
    },
    openGraph: {
        title: 'GEO Check | Scanora',
        description: 'Check for free, once, whether your website is cited by ChatGPT, Claude, Perplexity, or Google AI Overview.',
        url: 'https://www.scanora.ai/en/geo/check',
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
            name: 'How can I check if my website is cited by ChatGPT or Claude?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Use the free GEO Check from Scanora: enter your domain and a keyword, pick a platform (ChatGPT, Claude, Perplexity, or Google AI Overview), and within seconds you\'ll see whether and how your website is mentioned there - no registration required.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is the GEO Check really free?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, every account or IP address can use the GEO Check once, completely free. For recurring checks across multiple platforms at once, GEO Automation starts at €4.99/month.',
            },
        },
        {
            '@type': 'Question',
            name: 'Which AI models are checked?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'ChatGPT, Claude, Perplexity, and Google AI Overview - the four most-used AI systems people ask for product recommendations today.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is the difference between a GEO Check and GEO Automation?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'A GEO Check is a one-time check: it shows, at a single point in time, whether one platform mentions your website. GEO Automation is the ongoing version of that - it automatically checks up to five AI systems (Claude, ChatGPT, Gemini, Perplexity, and Google AI Overview) every week, calculates your mention rate over time, and alerts you by email on changes, instead of you having to re-check manually.',
            },
        },
    ],
}

const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How can I check if my website is cited by ChatGPT or Claude?',
    description: 'Use the free GEO Check from Scanora in three steps to see whether a domain is named as a source by ChatGPT, Claude, Perplexity, or Google AI Overview.',
    totalTime: 'PT1M',
    step: [
        { '@type': 'HowToStep', name: 'Enter domain & keyword', text: 'Enter your website domain and a keyword you want the website to be found for.' },
        { '@type': 'HowToStep', name: 'Pick a platform', text: 'Choose one of the four AI platforms: ChatGPT, Claude, Perplexity, or Google AI Overview.' },
        { '@type': 'HowToStep', name: 'Get your result', text: 'Within seconds, Scanora shows whether and in what context the domain is cited.' },
    ],
}

export default function GeoCheckLayoutEn({ children }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
            {children}
        </>
    )
}
