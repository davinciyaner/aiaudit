import SampleReportClient from '../../components/SampleReportClient'

export const metadata = {
    title: 'Download a Free Example Report',
    description: 'Download a real Scanora report: SEO analysis, performance, keyword intelligence, all 23 GEO signals, and the full AI report — free by email.',
    alternates: {
        canonical: 'https://www.scanora.ai/en/example-report',
        languages: {
            'de-DE': 'https://www.scanora.ai/beispiel-report',
            'en-US': 'https://www.scanora.ai/en/example-report',
        },
    },
    openGraph: {
        title: 'Download a Free Example Report | Scanora',
        description: 'A real Scanora report to download: SEO, performance, keywords, GEO, and the AI report.',
        url: 'https://www.scanora.ai/en/example-report',
        images: ['https://www.scanora.ai/opengraph-image'],
    },
}

export default function ExampleReportPage() {
    return <SampleReportClient locale="en" />
}
