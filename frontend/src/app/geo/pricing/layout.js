export const metadata = {
    title: 'GEO Automatisierung Preise – KI-Sichtbarkeit bei ChatGPT & Claude tracken',
    description: 'GEO Automatisierung ab 4,99€/Monat: Wöchentlich automatisch prüfen, ob ChatGPT und Claude deine Website erwähnen. Mention-Verlauf & Keyword-Tracking. 14 Tage kostenlos testen.',
    keywords: 'geo automatisierung preise, ki sichtbarkeit tracken, chatgpt sichtbarkeit tool, claude sichtbarkeit tool, generative engine optimization tool, geo tracking kosten',
    alternates: { canonical: 'https://www.sitecheckai.dev/geo/pricing' },
    openGraph: {
        title: 'GEO Automatisierung Preise | AuditAI',
        description: 'Wöchentlich automatisch tracken, ob ChatGPT und Claude deine Website erwähnen. Pläne ab 4,99€/Monat, 14 Tage kostenlos.',
        url: 'https://www.sitecheckai.dev/geo/pricing',
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
            name: 'Was kostet ein GEO Audit bzw. GEO Automatisierung?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'GEO Automatisierung bei AuditAI startet ab 4,99 €/Monat für 1 Website und 10 Keywords mit wöchentlichem Claude-Tracking. Der Pro-Plan (9,99 €/Monat) ergänzt ChatGPT-Tracking für 3 Websites, der Expert-Plan (19,99 €/Monat) deckt bis zu 10 Websites ab. Alle Pläne bieten 14 Tage kostenlose Testphase.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist der Unterschied zwischen einem einmaligen GEO Audit und GEO Automatisierung?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ein einmaliger GEO Audit (Teil des kostenlosen AuditAI Website-Audits) zeigt deinen GEO-Score zu einem Zeitpunkt. GEO Automatisierung prüft wöchentlich automatisch, ob ChatGPT und Claude deine Website erwähnen, und zeigt den Verlauf über Zeit statt einer Einzelmessung.',
            },
        },
        {
            '@type': 'Question',
            name: 'Gibt es eine kostenlose Testphase für GEO Automatisierung?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja, alle GEO-Automatisierung-Pläne bieten 14 Tage kostenlos testen, danach automatische Verlängerung über PayPal, jederzeit kündbar.',
            },
        },
    ],
}

const geoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://www.sitecheckai.dev/geo/pricing#software',
    name: 'AuditAI GEO Automatisierung',
    url: 'https://www.sitecheckai.dev/geo/pricing',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Wöchentliches Tracking, ob ChatGPT und Claude deine Domain bei relevanten Anfragen als Quelle nennen.',
    offers: [
        { '@type': 'Offer', name: 'Einsteiger', price: '4.99', priceCurrency: 'EUR', description: '1 Website, 10 Keywords, Claude-Tracking' },
        { '@type': 'Offer', name: 'Pro', price: '9.99', priceCurrency: 'EUR', description: '3 Websites, 30 Keywords, Claude + ChatGPT Tracking' },
        { '@type': 'Offer', name: 'Expert', price: '19.99', priceCurrency: 'EUR', description: '10 Websites, 100 Keywords, Claude + ChatGPT Tracking' },
    ],
}

export default function GeoPricingLayout({ children }) {
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