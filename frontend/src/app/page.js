import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LiveAuditStats from './components/LiveAuditStats'
import PersonaSection from './components/PersonaSection'
import ResultsSection from './components/ResultsSection'
import ProductShowcase from './components/ProductShowcase'
import Pricing from './components/Pricing'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import LandingFeedback from './components/LandingFeedback'
import FAQ from './components/FAQ'
import { FAQS } from './components/faqData'

export const metadata = {
    title: 'AI Visibility & SEO-Check kostenlos – Scanora (60s)',
    description: 'Kostenloser SEO- & AI-Visibility-Check in 60 Sekunden: Siehst du bei ChatGPT, Claude, Gemini, Perplexity & Google AI Overview auf? Jetzt gratis testen!',
    keywords: 'ai visibility, ai visibility tracker, ai visibility score, geo check, ki sichtbarkeit, ki sichtbarkeit messen, geo automatisierung, seo automatisierung, mention rate tracking, share of voice ki, chatgpt sichtbarkeit tracken, ki erwähnungen tracken, seo test, seo test kostenlos, seo check, website seo check, kostenloser seo check, seo analyse kostenlos, website audit kostenlos, SEO analyse tool, GEO optimierung, website checker, lighthouse alternative 2026',
    openGraph: {
        title: 'AI Visibility & SEO prüfen | Scanora',
        description: 'AI Visibility & SEO — kostenloser Website-Score in 60 Sekunden, konkrete KI-Fixes ab Pro.',
        url: 'https://www.scanora.ai',
        siteName: 'Scanora',
        type: 'website',
        locale: 'de_DE',
        images: ['https://www.scanora.ai/opengraph-image'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Visibility & SEO prüfen | Scanora',
        description: 'Website prüfen: AI Visibility & SEO in 60 Sekunden. Kostenlos starten. KI-Report ab Pro.',
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
        canonical: 'https://www.scanora.ai',
        languages: {
            'de-DE': 'https://www.scanora.ai',
            'en-US': 'https://www.scanora.ai/en',
            'x-default': 'https://www.scanora.ai',
        },
    },
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
}

// WebPage + Article für die Startseite selbst. Vorher lag dieser Block global in
// rootJsonLd.js und wurde von JEDER Unterseite der Domain identisch ausgeliefert, wodurch
// z.B. /vergleich/otterly-alternative strukturiert behauptete, mainEntityOfPage der Startseite
// zu sein — ein Widerspruch zum seitenspezifischen Canonical-Tag. Jetzt erscheint dieser Block
// nur noch hier, wo mainEntityOfPage korrekt auf die eigene URL zeigt.
const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.scanora.ai/#webpage',
    url: 'https://www.scanora.ai',
    name: 'AI Visibility & SEO prüfen: Wirst du von ChatGPT, Perplexity und Google zitiert?',
    isPartOf: { '@id': 'https://www.scanora.ai/#website' },
    inLanguage: 'de-DE',
    primaryImageOfPage: { '@id': 'https://www.scanora.ai/logo' },
    datePublished: '2026-01-15',
    dateModified: '2026-09-26',
    about: [
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
        { '@type': 'Thing', name: 'AI Visibility' },
        { '@type': 'Thing', name: 'SEO-Audit' },
    ],
}

const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.scanora.ai/#article',
    headline: 'AI Visibility & SEO prüfen: Wirst du von ChatGPT, Perplexity und Google zitiert?',
    description: 'Scanora prüft in unter 60 Sekunden kostenlos, ob eine Website bei ChatGPT, Claude, Perplexity und Google AI Overview zitiert wird, plus klassische SEO-Rankings.',
    author: { '@id': 'https://www.scanora.ai/#founder' },
    publisher: { '@id': 'https://www.scanora.ai/#organization' },
    datePublished: '2026-01-15',
    dateModified: '2026-09-26',
    mainEntityOfPage: { '@id': 'https://www.scanora.ai/#webpage' },
    about: [
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
        { '@type': 'Thing', name: 'AI Visibility' },
        { '@type': 'Thing', name: 'SEO-Audit' },
    ],
    isPartOf: { '@id': 'https://www.scanora.ai/#website' },
}

export default function LandingPage() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen pb-20 sm:pb-0">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <Navbar />
            <Hero />
            <LiveAuditStats />
            <PersonaSection />
            <ResultsSection />
            <ProductShowcase />
            <Pricing />
            <FAQ />
            <FinalCTA />
            <Footer />
            <LandingFeedback />
        </main>
    )
}
