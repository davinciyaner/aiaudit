import SeoAgentWaitlist from '../../components/site/SeoAgentWaitlist'

export const metadata = {
    title: 'SEO Agent: Improve Rankings Automatically (Waitlist)',
    description: "Scanora's SEO agent finds missing keywords, compares your content with the pages ranking above you and writes improvements. Join the waitlist.",
    alternates: {
        canonical: 'https://www.scanora.ai/en/seo-agent',
        languages: {
            'de-DE': 'https://www.scanora.ai/seo-agent',
            'en-US': 'https://www.scanora.ai/en/seo-agent',
        },
    },
    openGraph: {
        title: 'Scanora SEO agent: waitlist',
        description: 'Maintain keywords, compare content with competitors, write improvements. Join and test the agent first.',
        url: 'https://www.scanora.ai/en/seo-agent',
        images: ['https://www.scanora.ai/en/opengraph-image'],
    },
}

export default function SeoAgentPageEn() {
    return <SeoAgentWaitlist locale="en" />
}
