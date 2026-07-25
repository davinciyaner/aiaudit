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

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was kostet SEO Automatisierung?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'SEO Automatisierung bei AuditAI startet ab 19 €/Monat für 3 Websites und 50 Keywords mit wöchentlichem Ranking-Update. Der Pro-Plan (59 €/Monat) erweitert auf 10 Websites und 200 Keywords inkl. Content-Gap-Analyse, der Expert-Plan (149 €/Monat) deckt bis zu 20 Websites und 500 Keywords ab. Alle Pläne bieten 14 Tage kostenlose Testphase.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist der Unterschied zwischen einem einmaligen SEO-Audit und SEO Automatisierung?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ein einmaliger SEO-Audit (Teil des kostenlosen AuditAI Website-Audits) zeigt deinen SEO-Score zu einem Zeitpunkt. SEO Automatisierung trackt wöchentlich automatisch deine Google-Rankings, Keyword-Ideen, Konkurrenzanalyse und Backlink-Übersicht - als laufenden Verlauf statt Einzelmessung.',
            },
        },
        {
            '@type': 'Question',
            name: 'Gibt es eine kostenlose Testphase für SEO Automatisierung?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja, alle SEO-Automatisierung-Pläne bieten 14 Tage kostenlos testen, danach automatische Verlängerung über PayPal, jederzeit kündbar.',
            },
        },
    ],
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            {children}
        </>
    )
}