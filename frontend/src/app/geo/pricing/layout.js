export const metadata = {
    title: 'GEO Automatisierung Preise – KI-Sichtbarkeit bei ChatGPT, Claude, Perplexity & Google AI Overview tracken',
    description: 'GEO Automatisierung ab 4,99€/Monat: Wöchentlich automatisch prüfen, ob ChatGPT, Claude, Perplexity und Google AI Overview deine Website erwähnen. Mention-Verlauf & Keyword-Tracking. 14 Tage kostenlos testen.',
    keywords: 'geo automatisierung preise, ki sichtbarkeit tracken, chatgpt sichtbarkeit tool, claude sichtbarkeit tool, perplexity sichtbarkeit tool, google ai overview tracken, generative engine optimization tool, geo tracking kosten',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/geo/pricing',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/geo/pricing',
            'en-US': 'https://www.sitecheckai.dev/en/geo/pricing',
        },
    },
    openGraph: {
        title: 'GEO Automatisierung Preise | AuditAI',
        description: 'Wöchentlich automatisch tracken, ob ChatGPT, Claude, Perplexity und Google AI Overview deine Website erwähnen. Pläne ab 4,99€/Monat, 14 Tage kostenlos.',
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
                text: 'GEO Automatisierung bei AuditAI startet ab 4,99 €/Monat für 1 Website und 10 Keywords mit wöchentlichem Claude-Tracking. Der Pro-Plan (9,99 €/Monat) ergänzt ChatGPT-, Perplexity- und Google-AI-Overview-Tracking für 3 Websites sowie 2 Prompt-Varianten pro Keyword, der Expert-Plan (19,99 €/Monat) deckt bis zu 10 Websites ab. Alle Pläne bieten 14 Tage kostenlose Testphase.',
            },
        },
        {
            '@type': 'Question',
            name: 'Kann ich meine Sichtbarkeit bei Claude (Claude AI) tracken?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja. Schon der Einsteiger-Plan ab 4,99 €/Monat trackt wöchentlich automatisch, ob und wie oft Claude deine Website bei relevanten Anfragen als Quelle nennt — inklusive Mention-Verlauf über Zeit. Für zusätzliches Tracking bei ChatGPT, Perplexity und Google AI Overview im selben Dashboard brauchst du den Pro-Plan ab 9,99 €/Monat.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist der Unterschied zwischen einem einmaligen GEO Audit und GEO Automatisierung?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ein einmaliger GEO Audit (Teil des kostenlosen AuditAI Website-Audits) zeigt deinen GEO-Score zu einem Zeitpunkt. GEO Automatisierung prüft wöchentlich automatisch, ob ChatGPT, Claude, Perplexity und Google AI Overview deine Website erwähnen, und zeigt den Verlauf über Zeit statt einer Einzelmessung.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was sind Prompt-Varianten und wozu brauche ich mehrere?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Reale Nutzer fragen KI-Systeme auf sehr unterschiedliche Art — mal empfehlungsorientiert, mal vergleichend. Ab dem Pro-Plan prüft AuditAI pro Keyword beide Varianten separat, damit sichtbar wird, bei welcher Art von Anfrage eine Domain erwähnt wird und bei welcher nicht.',
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
    description: 'Wöchentliches Tracking, ob ChatGPT, Claude, Perplexity und Google AI Overview deine Domain bei relevanten Anfragen als Quelle nennen.',
    offers: [
        { '@type': 'Offer', name: 'Einsteiger', price: '4.99', priceCurrency: 'EUR', description: '1 Website, 10 Keywords, Claude-Tracking' },
        { '@type': 'Offer', name: 'Pro', price: '9.99', priceCurrency: 'EUR', description: '3 Websites, 30 Keywords, Claude + ChatGPT + Perplexity + Google AI Overview Tracking, 2 Prompt-Varianten pro Keyword' },
        { '@type': 'Offer', name: 'Expert', price: '19.99', priceCurrency: 'EUR', description: '10 Websites, 100 Keywords, Claude + ChatGPT + Perplexity + Google AI Overview Tracking, 2 Prompt-Varianten pro Keyword' },
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