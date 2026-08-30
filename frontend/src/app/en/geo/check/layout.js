export const metadata = {
    title: 'Free AI Visibility Check: Are You Cited by ChatGPT?',
    description: 'Free one-time check: see whether your website is cited by ChatGPT, Claude, Perplexity, or Google AI Overview. No registration required.',
    keywords: 'chatgpt visibility check, claude citation check, ai visibility test, free geo check, ai visibility check, google ai overview check',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/geo/check',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/geo/check',
            'en-US': 'https://www.sitecheckai.dev/en/geo/check',
        },
    },
    openGraph: {
        title: 'Free AI Visibility Check | AuditAI',
        description: 'Check for free, once, whether your website is cited by ChatGPT, Claude, Perplexity, or Google AI Overview.',
        url: 'https://www.sitecheckai.dev/en/geo/check',
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
                text: 'Use the free AI visibility check from AuditAI: enter your domain and a keyword, pick a platform (ChatGPT, Claude, Perplexity, or Google AI Overview), and within seconds you\'ll see whether and how your website is mentioned there - no registration required.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is the AI visibility check really free?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, every account or IP address can use the check once, completely free. For recurring checks across all four platforms at once, GEO Automation starts at €4.99/month.',
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
            name: 'What is the difference between the one-time check and GEO Automation?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The one-time check shows once whether a single platform mentions your website. GEO Automation checks all four platforms automatically every week, tracks the trend over time, and alerts you by email on changes.',
            },
        },
    ],
}

const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How can I check if my website is cited by ChatGPT or Claude?',
    description: 'Use the free AI visibility check from AuditAI in three steps to see whether a domain is named as a source by ChatGPT, Claude, Perplexity, or Google AI Overview.',
    totalTime: 'PT1M',
    step: [
        { '@type': 'HowToStep', name: 'Enter domain & keyword', text: 'Enter your website domain and a keyword you want the website to be found for.' },
        { '@type': 'HowToStep', name: 'Pick a platform', text: 'Choose one of the four AI platforms: ChatGPT, Claude, Perplexity, or Google AI Overview.' },
        { '@type': 'HowToStep', name: 'Get your result', text: 'Within seconds, AuditAI shows whether and in what context the domain is cited.' },
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
