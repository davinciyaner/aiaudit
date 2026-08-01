export const metadata = {
    title: 'Pricing & Plans',
    description: 'Try AuditAI for free or upgrade to Pro/Agency. Free: 1 audit/month. Pro: €29/month with 10 audits. Agency: €99/month, unlimited audits. Cancel anytime.',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/pricing',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/pricing',
            'en-US': 'https://www.sitecheckai.dev/en/pricing',
        },
    },
    openGraph: {
        title: 'Pricing & Plans | AuditAI',
        description: 'Start for free or upgrade — SEO, performance & GEO audits for freelancers and agencies.',
        url: 'https://www.sitecheckai.dev/en/pricing',
        locale: 'en_US',
    },
}

export default function PricingLayout({ children }) {
    return children
}
