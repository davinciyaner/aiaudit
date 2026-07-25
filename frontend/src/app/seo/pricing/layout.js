export const metadata = {
    title: 'SEO Automatisierung Preise – Rankings wöchentlich automatisch tracken',
    description: 'SEO Automatisierung ab 19€/Monat: Google-Rankings wöchentlich automatisch tracken, Keyword-Ideen, Konkurrenz- & Backlink-Analyse. 14 Tage kostenlos testen.',
    keywords: 'seo automatisierung preise, seo tracking tool, google rankings automatisch tracken, keyword tracking tool, ranking monitoring, seo automatisierung kosten',
    alternates: { canonical: 'https://www.sitecheckai.dev/seo/pricing' },
    openGraph: {
        title: 'SEO Automatisierung Preise | AuditAI',
        description: 'Google-Rankings wöchentlich automatisch tracken statt manuell zu prüfen. Pläne ab 19€/Monat, 14 Tage kostenlos.',
        url: 'https://www.sitecheckai.dev/seo/pricing',
        type: 'website',
        locale: 'de_DE',
    },
}

const seoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://www.sitecheckai.dev/seo/pricing#software',
    name: 'AuditAI SEO Automatisierung',
    url: 'https://www.sitecheckai.dev/seo/pricing',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Wöchentliches Google-Ranking-Tracking, Keyword-Ideen, Konkurrenzanalyse und Backlink-Übersicht.',
    offers: [
        { '@type': 'Offer', name: 'Einsteiger', price: '19', priceCurrency: 'EUR', description: '3 Websites, 50 Keywords, wöchentliches Ranking-Update' },
        { '@type': 'Offer', name: 'Pro', price: '59', priceCurrency: 'EUR', description: '10 Websites, 200 Keywords, Content-Gap-Analyse' },
        { '@type': 'Offer', name: 'Expert', price: '149', priceCurrency: 'EUR', description: '20 Websites, 500 Keywords, priorisierter Support' },
    ],
}

export default function SeoPricingLayout({ children }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(seoJsonLd) }}
            />
            {children}
        </>
    )
}