import Link from 'next/link'
import HubLayout, { HubSection, HubTable } from '../components/site/HubLayout'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
    title: 'Scanora Alternativen: AI-Visibility-Tools im Vergleich',
    description: 'Scanora im ehrlichen Vergleich zu Otterly.ai, Peec.ai, Rankscale und Writesonic: Preise in Euro, KI-Plattformen, Free-Plan und für wen welches Tool passt.',
    alternates: {
        canonical: 'https://www.scanora.ai/vergleich',
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
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai' },
        { '@type': 'ListItem', position: 2, name: 'Vergleich', item: 'https://www.scanora.ai/vergleich' },
    ],
}

const ALTERNATIVES = [
    {
        slug: 'otterly-alternative',
        title: 'Otterly.ai Alternative: Scanora im ehrlichen Vergleich',
        description: 'Preise, abgedeckte KI-Plattformen und Funktionsumfang im direkten Vergleich - inklusive der Punkte, in denen Otterly.ai besser ist.',
        tag: 'Scanora ab 4,99 €/Monat',
    },
    {
        slug: 'peec-alternative',
        title: 'Peec.ai Alternative: Scanora im ehrlichen Vergleich',
        description: 'Preise, abgedeckte KI-Plattformen und Funktionsumfang im direkten Vergleich - inklusive der Punkte, in denen Peec.ai besser ist.',
        tag: 'Scanora ab 4,99 €/Monat',
    },
    {
        slug: 'rankscale-alternative',
        title: 'Rankscale Alternative: Scanora im ehrlichen Vergleich',
        description: 'Feste Preise statt Credit-System, abgedeckte KI-Plattformen und Funktionsumfang im direkten Vergleich - inklusive der Punkte, in denen Rankscale besser ist.',
        tag: 'Scanora ab 4,99 €/Monat',
    },
    {
        slug: 'writesonic-alternative',
        title: 'Writesonic Alternative: Scanora im ehrlichen Vergleich',
        description: 'GEO-Tracking von Anfang an statt erst im 249-$-Tarif, feste Limits statt verfallender Credits - inklusive der Punkte, in denen Writesonic besser ist.',
        tag: 'Scanora ab 4,99 €/Monat',
    },
]

export default function VergleichHubPage() {
    return (
        <main className="bg-(--bg-base) min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar />
            <HubLayout
                crumbs={[['Scanora', '/'], ['Vergleiche']]}
                title="Scanora Alternativen: AI-Visibility-Tools im Vergleich"
                lead={<>
                    <p>Ehrliche, faktenbasierte Vergleiche von Scanora mit Otterly.ai, Peec.ai, Rankscale und Writesonic, inklusive der Punkte, in denen der jeweilige Wettbewerber besser ist.</p>
                    <p>Scanora prüft, ob ChatGPT, Claude, Gemini, Perplexity und Google AI Overview deine Website nennen, und trackt im selben Konto deine Google-Rankings. Suchst du eine Lösung für ein bestimmtes Budget oder einen Anwendungsfall, findest du sie auf der <Link href="/loesungen" className="font-semibold text-(--accent-ink) hover:underline underline-offset-4">Lösungen-Seite</Link>.</p>
                </>}
                items={ALTERNATIVES.map(a => ({ ...a, href: `/vergleich/${a.slug}` }))}
                readLabel="Vergleich lesen"
            >
                <HubSection title="Auf einen Blick">
                    <HubTable
                        head={['Tool', 'Einstieg KI-Tracking', 'Dauerhafter Free-Plan', 'Besonderheit']}
                        rows={[
                            ['Scanora', '4,99 €/Monat (Claude + Gemini), alle 5 Plattformen ab 74,99 €', 'Ja, 1 Audit pro Monat', 'SEO-Rankings im selben Konto'],
                            ['Otterly.ai', '29 $/Monat (Lite)', 'Nein, nur Testphase', 'Claude als Add-on für 29 bis 439 $/Monat'],
                            ['Peec.ai', '85 €/Monat (Starter, 50 Prompts)', 'Nein, nur 7-Tage-Trial', 'Claude nur im Enterprise-Tarif'],
                            ['Rankscale', '20 $/Monat (Essential, 120 Credits)', 'Nein, nur 7-Tage-Trial', 'Credit-System statt fester Limits'],
                            ['Writesonic', '249 $/Monat (Professional)', 'Nein, nur Trial', 'GEO erst ab dem Professional-Tarif'],
                        ]}
                        note="Preise laut den Preisseiten der Anbieter, Details und Quellen in den einzelnen Vergleichen."
                    />
                </HubSection>
                <HubSection title="So vergleichen wir">
                    <p>Jeder Vergleich prüft dieselben fünf Punkte: den Einstiegspreis, welche KI-Plattformen ohne Aufpreis enthalten sind, ob es einen dauerhaften kostenlosen Plan gibt, ob SEO-Rankings im selben Tool laufen und wie abgerechnet wird, also feste Limits oder Credits.</p>
                    <p>Die Wettbewerber-Angaben stammen aus deren öffentlichen Preis- und Produktseiten. Wo ein anderes Tool besser passt, steht das im jeweiligen Vergleich ausdrücklich dabei.</p>
                </HubSection>
                <HubSection title="Wann Scanora nicht die richtige Wahl ist">
                    <p>Trackst du als große Agentur sehr viele Prompts über viele Kunden-Workspaces, sind Otterly.ai und Peec.ai auf dieses Volumen ausgelegt. Willst du in erster Linie Texte mit KI erstellen, ist Writesonic das passendere Werkzeug. Scanora ist für Teams gebaut, die KI-Sichtbarkeit und Google-Rankings zu einem festen Preis in Euro in einem Tool sehen wollen.</p>
                </HubSection>
            </HubLayout>
            <Footer />
        </main>
    )
}
