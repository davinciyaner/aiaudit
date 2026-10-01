import Link from 'next/link'
import HubLayout, { HubSection, HubTable } from '../../components/site/HubLayout'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Solutions: AI Visibility and SEO for Your Use Case',
    description: 'Scanora solutions for specific use cases: an affordable AI visibility tool with SEO, and tracking whether Claude recommends your website.',
    alternates: {
        canonical: 'https://www.scanora.ai/en/solutions',
        languages: {
            'de-DE': 'https://www.scanora.ai/loesungen',
            'en-US': 'https://www.scanora.ai/en/solutions',
        },
    },
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai/en' },
        { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://www.scanora.ai/en/solutions' },
    ],
}

const SOLUTIONS = [
    {
        slug: 'affordable-ai-visibility-tool',
        title: 'Affordable AI Visibility Tool: SEO and AI Visibility in One Plan',
        description: 'For anyone who doesn\'t want to pay for AI visibility and SEO in two separate tools. All prices, features, and who benefits.',
        tag: 'From €4.99/month',
    },
    {
        slug: 'claude-ai-visibility-tracking',
        title: 'Claude AI Visibility Tracking: See Whether Claude Recommends You',
        description: "On most tools, Claude tracking is an expensive Enterprise add-on or unavailable. How it works at Scanora from €4.99/month.",
        tag: 'From €4.99/month',
    },
]

export default function SolutionsHubPageEn() {
    return (
        <main className="bg-(--bg-base) min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar locale="en" />
            <HubLayout
                crumbs={[['Scanora', '/en'], ['Solutions']]}
                title="Solutions for your use case"
                lead={<>
                    <p>Scanora measures how often ChatGPT, Claude, Gemini, Perplexity and Google AI Overview mention your website, and how you rank on Google. These pages show what that looks like for a specific use case.</p>
                    <p>Want to compare Scanora directly with another tool? See the <Link href="/en/compare" className="font-semibold text-(--accent-ink) hover:underline underline-offset-4">comparisons page</Link>.</p>
                </>}
                items={SOLUTIONS.map(s => ({ ...s, href: `/en/solutions/${s.slug}` }))}
                readLabel="View solution"
            >
                <HubSection title="Which solution fits you?">
                    <HubTable
                        head={['If you …', 'then see']}
                        rows={[
                            [<>want to start with a small budget and keep SEO in the same plan</>, <Link href="/en/solutions/affordable-ai-visibility-tool" className="font-semibold text-(--accent-ink) hover:underline underline-offset-4">Affordable AI visibility tool</Link>],
                            [<>mainly want to know whether Claude recommends you</>, <Link href="/en/solutions/claude-ai-visibility-tracking" className="font-semibold text-(--accent-ink) hover:underline underline-offset-4">Claude AI visibility tracking</Link>],
                            [<>want ChatGPT, Perplexity and Google AI Overview as well</>, <Link href="/en/geo/pricing" className="font-semibold text-(--accent-ink) hover:underline underline-offset-4">GEO Pro, all 5 platforms</Link>],
                            [<>want to compare Scanora with Otterly.ai, Peec.ai and others</>, <Link href="/en/compare" className="font-semibold text-(--accent-ink) hover:underline underline-offset-4">Comparisons</Link>],
                        ]}
                    />
                </HubSection>
                <HubSection title="What every plan has in common">
                    <ul className="flex flex-col gap-2 list-disc pl-5">
                        <li>Start with a free website audit in under 60 seconds, no sign-up needed.</li>
                        <li>AI tracking from €4.99/month with Claude and Gemini, all five platforms from the Pro plan.</li>
                        <li>An automatic weekly check with history instead of a one-off measurement.</li>
                        <li>Email alerts when rankings drop or AI mentions disappear.</li>
                        <li>Cancel monthly, prices in euros. See all plans on the <Link href="/en/pricing" className="font-semibold text-(--accent-ink) hover:underline underline-offset-4">pricing page</Link>.</li>
                    </ul>
                </HubSection>
            </HubLayout>
            <Footer locale="en" />
        </main>
    )
}
