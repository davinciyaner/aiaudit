import Link from 'next/link'
import HubLayout, { HubSection, HubTable } from '../../components/site/HubLayout'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Scanora Alternatives: AI Visibility Tools Compared',
    description: 'Scanora compared honestly with Otterly.ai, Peec.ai, Rankscale and Writesonic: pricing in euros, AI platforms, free plan and who each tool is for.',
    alternates: {
        canonical: 'https://www.scanora.ai/en/compare',
        languages: {
            'de-DE': 'https://www.scanora.ai/vergleich',
            'en-US': 'https://www.scanora.ai/en/compare',
        },
    },
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai/en' },
        { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://www.scanora.ai/en/compare' },
    ],
}

const ALTERNATIVES = [
    {
        slug: 'otterly-alternative',
        title: 'Otterly.ai Alternative: An Honest Look at Scanora',
        description: 'Pricing, covered AI platforms, and feature scope side by side - including the areas where Otterly.ai is still ahead.',
        tag: 'Scanora from €4.99/month',
    },
    {
        slug: 'peec-alternative',
        title: 'Peec.ai Alternative: An Honest Look at Scanora',
        description: 'Pricing, covered AI platforms, and feature scope side by side - including the areas where Peec.ai is still ahead.',
        tag: 'Scanora from €4.99/month',
    },
    {
        slug: 'rankscale-alternative',
        title: 'Rankscale Alternative: An Honest Look at Scanora',
        description: 'Fixed pricing instead of a credit system, covered AI platforms, and feature scope side by side - including the areas where Rankscale is still ahead.',
        tag: 'Scanora from €4.99/month',
    },
    {
        slug: 'writesonic-alternative',
        title: 'Writesonic Alternative: An Honest Look at Scanora',
        description: 'GEO tracking from day one instead of gated behind a $249 tier, fixed limits instead of expiring credits - including the areas where Writesonic is still ahead.',
        tag: 'Scanora from €4.99/month',
    },
]

export default function CompareHubPageEn() {
    return (
        <main className="bg-(--bg-base) min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar locale="en" />
            <HubLayout
                crumbs={[['Scanora', '/en'], ['Comparisons']]}
                title="Scanora alternatives: AI visibility tools compared"
                lead={<>
                    <p>Honest, fact-based comparisons of Scanora with Otterly.ai, Peec.ai, Rankscale and Writesonic, including the areas where the other tool is ahead.</p>
                    <p>Scanora checks whether ChatGPT, Claude, Gemini, Perplexity and Google AI Overview mention your website and tracks your Google rankings in the same account. Looking for a specific budget or use case instead? See the <Link href="/en/solutions" className="font-semibold text-(--accent-ink) hover:underline underline-offset-4">solutions page</Link>.</p>
                </>}
                items={ALTERNATIVES.map(a => ({ ...a, href: `/en/compare/${a.slug}` }))}
                readLabel="Read comparison"
            >
                <HubSection title="At a glance">
                    <HubTable
                        head={['Tool', 'AI tracking entry price', 'Permanent free plan', 'Notable']}
                        rows={[
                            ['Scanora', '€4.99/month (Claude + Gemini), all 5 platforms from €74.99', 'Yes, 1 audit per month', 'SEO rankings in the same account'],
                            ['Otterly.ai', '$29/month (Lite)', 'No, trial only', 'Claude as an add-on for $29 to $439/month'],
                            ['Peec.ai', '€85/month (Starter, 50 prompts)', 'No, 7-day trial only', 'Claude only on the Enterprise plan'],
                            ['Rankscale', '$20/month (Essential, 120 credits)', 'No, 7-day trial only', 'Credit system instead of fixed limits'],
                            ['Writesonic', '$249/month (Professional)', 'No, trial only', 'GEO only from the Professional plan'],
                        ]}
                        note="Prices according to the vendors' pricing pages; details and sources in each comparison."
                    />
                </HubSection>
                <HubSection title="How we compare">
                    <p>Every comparison checks the same five points: entry price, which AI platforms are included at no extra cost, whether there is a permanent free plan, whether SEO rankings run in the same tool, and how billing works, fixed limits or credits.</p>
                    <p>Competitor details come from their public pricing and product pages. Where another tool fits better, the comparison says so explicitly.</p>
                </HubSection>
                <HubSection title="When Scanora is not the right choice">
                    <p>If you are a large agency tracking very many prompts across many client workspaces, Otterly.ai and Peec.ai are built for that volume. If you mainly want to write content with AI, Writesonic is the better fit. Scanora is built for teams that want AI visibility and Google rankings in one tool at a fixed price in euros.</p>
                </HubSection>
            </HubLayout>
            <Footer locale="en" />
        </main>
    )
}
