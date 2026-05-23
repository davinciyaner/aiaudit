import './globals.css'

export const metadata = {
    metadataBase: new URL('https://auditai.io'),
    title: {
        default: 'AuditAI – KI-gestützter Website Audit',
        template: '%s | AuditAI',
    },
    description: 'Website in unter 60 Sekunden vollständig prüfen: SEO, Performance, Security und KI-Sichtbarkeit. KI-generierter Report mit konkreten Fixes. Kostenlos starten.',
    keywords: 'website audit, SEO analyse, security check, performance test, KI sichtbarkeit, GEO, llms.txt, website checker kostenlos',
    authors: [{ name: 'AuditAI' }],
    creator: 'AuditAI',
    publisher: 'AuditAI',
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    openGraph: {
        type: 'website',
        locale: 'de_DE',
        url: 'https://auditai.io',
        siteName: 'AuditAI',
        title: 'AuditAI – KI-gestützter Website Audit',
        description: 'SEO, Performance, Security & KI-Sichtbarkeit — ein vollständiger Audit in unter 60 Sekunden.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AuditAI – KI-gestützter Website Audit',
        description: 'SEO, Performance, Security & GEO in 60 Sekunden. Kostenlos starten.',
        creator: '@auditai',
    },
    alternates: { canonical: 'https://auditai.io' },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': 'https://auditai.io/#organization',
            name: 'AuditAI',
            url: 'https://auditai.io',
            description: 'KI-gestütztes Website-Audit-Tool für SEO, Performance, Security und GEO-Sichtbarkeit.',
            sameAs: [],
        },
        {
            '@type': 'WebSite',
            '@id': 'https://auditai.io/#website',
            url: 'https://auditai.io',
            name: 'AuditAI',
            publisher: { '@id': 'https://auditai.io/#organization' },
            inLanguage: 'de-DE',
        },
        {
            '@type': 'SoftwareApplication',
            name: 'AuditAI',
            url: 'https://auditai.io',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'Vollständiger Website-Audit mit KI: SEO, Performance, Security und GEO-Sichtbarkeit in unter 60 Sekunden.',
            offers: [
                { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'EUR', description: '1 Audit pro Monat' },
                { '@type': 'Offer', name: 'Pro', price: '29', priceCurrency: 'EUR', description: '10 Audits pro Monat' },
                { '@type': 'Offer', name: 'Agency', price: '99', priceCurrency: 'EUR', description: 'Unbegrenzte Audits' },
            ],
        },
        {
            '@type': 'FAQPage',
            mainEntity: [
                {
                    '@type': 'Question',
                    name: 'Was prüft AuditAI genau?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'AuditAI analysiert deine Website in vier Bereichen: SEO (Title, Meta, Headings, Links), Performance (TTFB, FCP, Ladezeit), Security (HTTPS, HSTS, CSP, Security Headers) und GEO/KI-Sichtbarkeit (llms.txt, Schema.org, FAQ-Schema). Dazu generiert Claude AI einen vollständigen Bericht mit konkreten Fixes.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'Wie lange dauert ein Audit?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Ein vollständiger Audit dauert in der Regel unter 60 Sekunden. Der KI-Report wird parallel zur technischen Analyse generiert.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'Was kostet AuditAI?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'AuditAI ist kostenlos nutzbar mit 1 Audit pro Monat. Der Pro-Plan kostet €29/Monat (10 Audits), der Agency-Plan €99/Monat (unbegrenzte Audits). Jederzeit kündbar.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'Was ist GEO und warum ist es wichtig?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'GEO steht für Generative Engine Optimization – die Sichtbarkeit deiner Website für KI-Modelle wie ChatGPT, Claude oder Perplexity. AuditAI prüft llms.txt, strukturierte Daten, FAQ-Schema und weitere Signale, die bestimmen ob KI-Modelle deine Website als Quelle zitieren.',
                    },
                },
            ],
        },
    ],
}

export default function RootLayout({ children }) {
    return (
        <html lang="de" className="dark">
        <head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </head>
        <body className="bg-[#080b14] text-white antialiased">
        {children}
        </body>
        </html>
    )
}