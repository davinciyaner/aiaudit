export const metadata = {
    title: 'Pricing & Plans',
    description: 'Try Scanora for free or upgrade to Pro/Agency. Free: 1 audit/month. Pro: €29/month with 10 audits. Agency: €99/month, unlimited audits. Cancel anytime.',
    alternates: {
        canonical: 'https://www.scanora.ai/en/pricing',
        languages: {
            'de-DE': 'https://www.scanora.ai/pricing',
            'en-US': 'https://www.scanora.ai/en/pricing',
        },
    },
    openGraph: {
        title: 'Pricing & Plans | Scanora',
        description: 'Start for free or upgrade — SEO, performance & GEO audits for freelancers and agencies.',
        url: 'https://www.scanora.ai/en/pricing',
        locale: 'en_US',
    },
}

export default function PricingLayout({ children }) {
    return children
}
