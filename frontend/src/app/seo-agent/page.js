import SeoAgentWaitlist from '../components/site/SeoAgentWaitlist'

export const metadata = {
    title: 'SEO-Agent: Rankings automatisch verbessern (Warteliste)',
    description: 'Der SEO-Agent von Scanora findet fehlende Keywords, vergleicht deinen Content mit den Seiten vor dir und schreibt Verbesserungen. Jetzt auf die Warteliste.',
    alternates: {
        canonical: 'https://www.scanora.ai/seo-agent',
        languages: {
            'de-DE': 'https://www.scanora.ai/seo-agent',
            'en-US': 'https://www.scanora.ai/en/seo-agent',
        },
    },
    openGraph: {
        title: 'SEO-Agent von Scanora: Warteliste',
        description: 'Keywords pflegen, Content mit der Konkurrenz vergleichen, Verbesserungen schreiben. Trag dich ein und teste den Agenten als Erstes.',
        url: 'https://www.scanora.ai/seo-agent',
        images: ['https://www.scanora.ai/opengraph-image'],
    },
}

export default function SeoAgentPage() {
    return <SeoAgentWaitlist locale="de" />
}
