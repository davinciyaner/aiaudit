import Link from 'next/link'
import HubLayout, { HubSection, HubTable } from '../components/site/HubLayout'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
    title: 'Lösungen für KI-Sichtbarkeit und SEO-Tracking',
    description: 'Scanora-Lösungen für konkrete Anwendungsfälle: SEO und KI-Sichtbarkeit in einem Tool, günstiges KI-Tracking, Claude- und ChatGPT-Sichtbarkeit tracken.',
    alternates: {
        canonical: 'https://www.scanora.ai/loesungen',
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
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai' },
        { '@type': 'ListItem', position: 2, name: 'Lösungen', item: 'https://www.scanora.ai/loesungen' },
    ],
}

const SOLUTIONS = [
    {
        slug: 'seo-geo-tool',
        title: 'SEO + GEO Tool: Google-Rankings & KI-Sichtbarkeit in einem Dashboard',
        description: 'Für alle, die Google-Rankings und KI-Sichtbarkeit nicht in zwei getrennten Tools verwalten wollen, sondern die Überschneidung direkt sehen wollen.',
        tag: 'SEO + GEO',
    },
    {
        slug: 'guenstiges-ki-sichtbarkeit-tool',
        title: 'Günstiges KI-Sichtbarkeit Tool: SEO und AI Visibility in einem Abo',
        description: 'Für alle, die KI-Sichtbarkeit und SEO nicht in zwei separaten Tools bezahlen wollen. Alle Preise, Features und wer davon profitiert.',
        tag: 'Ab 4,99 €/Monat',
    },
    {
        slug: 'claude-ai-sichtbarkeit-tracken',
        title: 'Claude AI Sichtbarkeit tracken: So siehst du, ob Claude dich empfiehlt',
        description: 'Bei den meisten Tools ist Claude-Tracking ein teures Enterprise-Add-on oder gar nicht verfügbar. So funktioniert es bei Scanora ab 4,99 €/Monat.',
        tag: 'Ab 4,99 €/Monat',
    },
    {
        slug: 'chatgpt-sichtbarkeit-tracken',
        title: 'ChatGPT Sichtbarkeit tracken: So siehst du, ob ChatGPT dich empfiehlt',
        description: 'ChatGPT-Tracking plus klassische Google-Rankings im selben Dashboard statt zwei getrennter Abos. So funktioniert es bei Scanora ab 74,99 €/Monat.',
        tag: 'Ab 74,99 €/Monat',
    },
]

export default function LoesungenHubPage() {
    return (
        <main className="bg-(--bg-base) min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar />
            <HubLayout
                crumbs={[['Scanora', '/'], ['Lösungen']]}
                title="Lösungen für deinen Anwendungsfall"
                lead={<>
                    <p>Scanora misst, wie oft ChatGPT, Claude, Gemini, Perplexity und Google AI Overview deine Website nennen, und wie du bei Google rankst. Diese Seiten zeigen, wie das für einen konkreten Anwendungsfall aussieht.</p>
                    <p>Willst du Scanora direkt mit einem anderen Tool vergleichen, findest du das auf der <Link href="/vergleich" className="font-semibold text-(--accent-ink) hover:underline underline-offset-4">Vergleichs-Seite</Link>.</p>
                </>}
                items={SOLUTIONS.map(s => ({ ...s, href: `/loesungen/${s.slug}` }))}
                readLabel="Lösung ansehen"
            >
                <HubSection title="Welche Lösung passt zu dir?">
                    <HubTable
                        head={['Wenn du …', 'dann passt']}
                        rows={[
                            [<>Google-Rankings und KI-Sichtbarkeit in einem Dashboard sehen willst</>, <Link href="/loesungen/seo-geo-tool" className="font-semibold text-(--accent-ink) hover:underline underline-offset-4">SEO + GEO Tool</Link>],
                            [<>mit kleinem Budget starten willst</>, <Link href="/loesungen/guenstiges-ki-sichtbarkeit-tool" className="font-semibold text-(--accent-ink) hover:underline underline-offset-4">Günstiges KI-Sichtbarkeits-Tool</Link>],
                            [<>vor allem wissen willst, ob Claude dich empfiehlt</>, <Link href="/loesungen/claude-ai-sichtbarkeit-tracken" className="font-semibold text-(--accent-ink) hover:underline underline-offset-4">Claude-Sichtbarkeit tracken</Link>],
                            [<>vor allem wissen willst, ob ChatGPT dich empfiehlt</>, <Link href="/loesungen/chatgpt-sichtbarkeit-tracken" className="font-semibold text-(--accent-ink) hover:underline underline-offset-4">ChatGPT-Sichtbarkeit tracken</Link>],
                        ]}
                    />
                </HubSection>
                <HubSection title="Was alle Lösungen gemeinsam haben">
                    <ul className="flex flex-col gap-2 list-disc pl-5">
                        <li>Einstieg mit einem kostenlosen Website-Audit in unter 60 Sekunden, ohne Anmeldung.</li>
                        <li>KI-Tracking ab 4,99 €/Monat mit Claude und Gemini, alle fünf Plattformen ab dem Pro-Plan.</li>
                        <li>Wöchentlicher automatischer Check mit Verlauf statt einer einmaligen Messung.</li>
                        <li>E-Mail-Alerts, wenn Rankings einbrechen oder KI-Erwähnungen wegfallen.</li>
                        <li>Monatlich kündbar, Preise in Euro. Alle Pläne findest du auf der <Link href="/pricing" className="font-semibold text-(--accent-ink) hover:underline underline-offset-4">Preisseite</Link>.</li>
                    </ul>
                </HubSection>
            </HubLayout>
            <Footer />
        </main>
    )
}
