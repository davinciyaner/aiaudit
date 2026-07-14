export const metadata = {
    title: 'Preise & Pläne',
    description: 'AuditAI kostenlos testen oder auf Pro/Agency upgraden. Free: 1 Audit/Monat. Pro: €29/Monat mit 10 Audits. Agency: €99/Monat, unbegrenzte Audits. Jederzeit kündbar.',
    alternates: { canonical: 'https://www.sitecheckai.dev/pricing' },
    openGraph: {
        title: 'Preise & Pläne | AuditAI',
        description: 'Kostenlos starten oder upgraden — SEO, Performance & GEO-Audits für Freelancer und Agenturen.',
        url: 'https://www.sitecheckai.dev/pricing',
    },
}

const pricingJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Product',
            '@id': 'https://www.sitecheckai.dev/pricing#audit',
            name: 'AuditAI Website-Audit',
            description: 'KI-gestützter Website-Audit für SEO, Performance und GEO-Sichtbarkeit in unter 60 Sekunden.',
            brand: { '@type': 'Brand', name: 'AuditAI' },
            offers: [
                { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'EUR', description: '1 Audit pro Monat', url: 'https://www.sitecheckai.dev/pricing' },
                { '@type': 'Offer', name: 'Pro', price: '29', priceCurrency: 'EUR', description: '10 Audits pro Monat, KI-generierter Bericht', url: 'https://www.sitecheckai.dev/pricing' },
                { '@type': 'Offer', name: 'Agency', price: '99', priceCurrency: 'EUR', description: 'Unbegrenzte Audits', url: 'https://www.sitecheckai.dev/pricing' },
            ],
        },
        {
            '@type': 'Product',
            '@id': 'https://www.sitecheckai.dev/pricing#seo-tracking',
            name: 'AuditAI SEO Automatisierung',
            description: 'Wöchentliches Google-Ranking-Tracking, Keyword-Ideen, Konkurrenzanalyse und Backlink-Übersicht.',
            brand: { '@type': 'Brand', name: 'AuditAI' },
            offers: [
                { '@type': 'Offer', name: 'Einsteiger', price: '19', priceCurrency: 'EUR', url: 'https://www.sitecheckai.dev/seo/pricing' },
                { '@type': 'Offer', name: 'Pro', price: '59', priceCurrency: 'EUR', url: 'https://www.sitecheckai.dev/seo/pricing' },
                { '@type': 'Offer', name: 'Expert', price: '149', priceCurrency: 'EUR', url: 'https://www.sitecheckai.dev/seo/pricing' },
            ],
        },
        {
            '@type': 'Product',
            '@id': 'https://www.sitecheckai.dev/pricing#geo-tracking',
            name: 'AuditAI GEO Automatisierung',
            description: 'Wöchentliches Tracking, ob ChatGPT und Claude deine Domain bei relevanten Anfragen als Quelle nennen.',
            brand: { '@type': 'Brand', name: 'AuditAI' },
            offers: [
                { '@type': 'Offer', name: 'Einsteiger', price: '4.99', priceCurrency: 'EUR', url: 'https://www.sitecheckai.dev/geo/pricing' },
                { '@type': 'Offer', name: 'Pro', price: '9.99', priceCurrency: 'EUR', url: 'https://www.sitecheckai.dev/geo/pricing' },
                { '@type': 'Offer', name: 'Expert', price: '19.99', priceCurrency: 'EUR', url: 'https://www.sitecheckai.dev/geo/pricing' },
            ],
        },
    ],
}

export default function PricingLayout({ children }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
            />
            {children}
        </>
    )
}