import SampleReportClient from '../components/SampleReportClient'

export const metadata = {
    title: 'Beispiel-Report kostenlos herunterladen',
    description: 'Lade einen echten Scanora-Report herunter: SEO-Analyse, Performance, Keyword Intelligence, alle 23 GEO-Signale und den vollen KI-Bericht — kostenlos per E-Mail.',
    alternates: {
        canonical: 'https://www.scanora.ai/beispiel-report',
        languages: {
            'de-DE': 'https://www.scanora.ai/beispiel-report',
            'en-US': 'https://www.scanora.ai/en/example-report',
        },
    },
    openGraph: {
        title: 'Beispiel-Report kostenlos herunterladen | Scanora',
        description: 'Ein echter Scanora-Report zum Download: SEO, Performance, Keywords, GEO und KI-Bericht.',
        url: 'https://www.scanora.ai/beispiel-report',
        images: ['https://www.scanora.ai/opengraph-image'],
    },
}

export default function BeispielReportPage() {
    return <SampleReportClient locale="de" />
}
