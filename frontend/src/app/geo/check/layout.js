export const metadata = {
    title: 'Gratis KI-Sichtbarkeits-Check: Wirst du von ChatGPT zitiert?',
    description: 'Kostenloser Einzel-Check: Prüfe einmalig, ob deine Website von ChatGPT, Claude, Perplexity oder Google AI Overview zitiert wird. Keine Registrierung nötig.',
    keywords: 'chatgpt sichtbarkeit check, claude zitiert werden, ki sichtbarkeit test, geo check kostenlos, ai visibility check, google ai overview check',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/geo/check',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/geo/check',
            'en-US': 'https://www.sitecheckai.dev/en/geo/check',
        },
    },
    openGraph: {
        title: 'Gratis KI-Sichtbarkeits-Check | AuditAI',
        description: 'Prüfe einmalig kostenlos, ob deine Website von ChatGPT, Claude, Perplexity oder Google AI Overview zitiert wird.',
        url: 'https://www.sitecheckai.dev/geo/check',
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
                text: 'Mit dem kostenlosen KI-Sichtbarkeits-Check von AuditAI: Domain und Keyword eingeben, eine Plattform (ChatGPT, Claude, Perplexity oder Google AI Overview) auswählen und in wenigen Sekunden siehst du, ob und wie deine Website dort erwähnt wird - ganz ohne Registrierung.',
            },
        },
        {
            '@type': 'Question',
            name: 'Ist der KI-Sichtbarkeits-Check wirklich kostenlos?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja, jeder Account bzw. jede IP-Adresse kann den Check einmal komplett kostenlos nutzen. Für wiederkehrende Prüfungen und alle vier Plattformen gleichzeitig gibt es GEO Automatisierung ab 4,99 €/Monat.',
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
            name: 'Was ist der Unterschied zwischen dem Einzel-Check und GEO Automatisierung?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Der Einzel-Check zeigt einmalig, ob eine Plattform deine Website nennt. GEO Automatisierung prüft wöchentlich automatisch alle vier Plattformen, trackt den Verlauf über Zeit und meldet Änderungen per E-Mail.',
            },
        },
    ],
}

const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Wie kann ich prüfen, ob meine Website von ChatGPT oder Claude zitiert wird?',
    description: 'Mit dem kostenlosen KI-Sichtbarkeits-Check von AuditAI in drei Schritten prüfen, ob eine Domain von ChatGPT, Claude, Perplexity oder Google AI Overview als Quelle genannt wird.',
    totalTime: 'PT1M',
    step: [
        { '@type': 'HowToStep', name: 'Domain & Keyword eingeben', text: 'Website-Domain und ein Keyword eingeben, für das die Website gefunden werden soll.' },
        { '@type': 'HowToStep', name: 'Plattform auswählen', text: 'Eine der vier KI-Plattformen wählen: ChatGPT, Claude, Perplexity oder Google AI Overview.' },
        { '@type': 'HowToStep', name: 'Ergebnis erhalten', text: 'Innerhalb weniger Sekunden zeigt AuditAI, ob und mit welchem Kontext die Domain zitiert wird.' },
    ],
}

export default function GeoCheckLayout({ children }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
            {children}
        </>
    )
}
