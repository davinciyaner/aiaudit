export const metadata = {
    title: 'GEO Check kostenlos: Wirst du von ChatGPT zitiert?',
    description: 'GEO Check kostenlos: Prüfe einmalig, ob deine Website von ChatGPT, Claude, Perplexity oder Google AI Overview zitiert wird. Für laufendes Tracking gibt es GEO Automatisierung. Keine Registrierung nötig.',
    keywords: 'geo check, geo check kostenlos, chatgpt sichtbarkeit check, claude zitiert werden, ai visibility check, google ai overview check, ki sichtbarkeit test, geo automatisierung, geoautomation',
    alternates: {
        canonical: 'https://www.scanora.ai/geo/check',
        languages: {
            'de-DE': 'https://www.scanora.ai/geo/check',
            'en-US': 'https://www.scanora.ai/en/geo/check',
        },
    },
    openGraph: {
        title: 'GEO Check | Scanora',
        description: 'Prüfe einmalig kostenlos, ob deine Website von ChatGPT, Claude, Perplexity oder Google AI Overview zitiert wird.',
        url: 'https://www.scanora.ai/geo/check',
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
            name: 'Wie kann ich prüfen, ob meine Website von ChatGPT oder Claude zitiert wird?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Mit dem kostenlosen GEO Check von Scanora: Domain und Keyword eingeben, eine Plattform (ChatGPT, Claude, Perplexity oder Google AI Overview) auswählen und in wenigen Sekunden siehst du, ob und wie deine Website dort erwähnt wird - ganz ohne Registrierung.',
            },
        },
        {
            '@type': 'Question',
            name: 'Ist der GEO Check wirklich kostenlos?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja, jeder Account bzw. jede IP-Adresse kann den GEO Check einmal komplett kostenlos nutzen. Für wiederkehrende Prüfungen und mehrere Plattformen gleichzeitig gibt es GEO Automatisierung ab 4,99 €/Monat.',
            },
        },
        {
            '@type': 'Question',
            name: 'Welche KI-Modelle werden geprüft?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'ChatGPT, Claude, Perplexity und Google AI Overview - die vier meistgenutzten KI-Systeme, die Nutzer heute für Produktempfehlungen befragen.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist der Unterschied zwischen GEO Check und GEO Automatisierung?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Der GEO Check ist eine einmalige Prüfung: Er zeigt zu einem Zeitpunkt, ob eine Plattform deine Website nennt. GEO Automatisierung ist die laufende Version davon - sie prüft wöchentlich automatisch bis zu fünf KI-Systeme (Claude, ChatGPT, Gemini, Perplexity und Google AI Overview), berechnet deine Mention-Rate über Zeit und meldet Änderungen per E-Mail, statt dass du manuell neu prüfen musst.',
            },
        },
    ],
}

const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Wie kann ich prüfen, ob meine Website von ChatGPT oder Claude zitiert wird?',
    description: 'Mit dem kostenlosen GEO Check von Scanora in drei Schritten prüfen, ob eine Domain von ChatGPT, Claude, Perplexity oder Google AI Overview als Quelle genannt wird.',
    totalTime: 'PT1M',
    step: [
        { '@type': 'HowToStep', name: 'Domain & Keyword eingeben', text: 'Website-Domain und ein Keyword eingeben, für das die Website gefunden werden soll.' },
        { '@type': 'HowToStep', name: 'Plattform auswählen', text: 'Eine der vier KI-Plattformen wählen: ChatGPT, Claude, Perplexity oder Google AI Overview.' },
        { '@type': 'HowToStep', name: 'Ergebnis erhalten', text: 'Innerhalb weniger Sekunden zeigt Scanora, ob und mit welchem Kontext die Domain zitiert wird.' },
    ],
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai' },
        { '@type': 'ListItem', position: 2, name: 'GEO', item: 'https://www.scanora.ai/geo/pricing' },
        { '@type': 'ListItem', position: 3, name: 'GEO Check', item: 'https://www.scanora.ai/geo/check' },
    ],
}

export default function GeoCheckLayout({ children }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            {children}
        </>
    )
}
