export const metadata = {
    title: 'SEO- & AI-Visibility-Check Preise – ab kostenlos',
    description: 'Scanora kostenlos testen oder auf Pro/Agency upgraden: Free 1 Audit/Monat, Pro €29 mit 10 Audits, Agency €99 unbegrenzt. Jederzeit kündbar.',
    alternates: {
        canonical: 'https://www.scanora.ai/pricing',
        languages: {
            'de-DE': 'https://www.scanora.ai/pricing',
            'en-US': 'https://www.scanora.ai/en/pricing',
            'x-default': 'https://www.scanora.ai/pricing',
        },
    },
    openGraph: {
        title: 'SEO- & AI-Visibility-Check Preise – ab kostenlos | Scanora',
        description: 'Scanora kostenlos testen oder auf Pro/Agency upgraden: Free 1 Audit/Monat, Pro €29 mit 10 Audits, Agency €99 unbegrenzt. Jederzeit kündbar.',
        url: 'https://www.scanora.ai/pricing',
    },
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai' },
        { '@type': 'ListItem', position: 2, name: 'Preise & Pläne', item: 'https://www.scanora.ai/pricing' },
    ],
}

export default function PricingLayout({ children }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            {children}
        </>
    )
}