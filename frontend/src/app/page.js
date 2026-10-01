import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Hero, Features, AuditData, HowItWorks, WhatIsScanora, PricingSection, Resources, LandingFAQ, FinalCTA } from './components/landing/LandingSections'
import { FAQS } from './components/faqData'

export const metadata = {
    title: 'AI Visibility & SEO Tracking: Empfiehlt dich ChatGPT? | Scanora',
    description: 'Kostenloser AI-Visibility- & SEO-Check in 60 Sekunden: Sieh, ob ChatGPT, Claude, Gemini, Perplexity und Google AI Overview deine Website empfehlen.',
    keywords: 'ai visibility, ai visibility tracker, ai visibility score, geo check, ki sichtbarkeit, ki sichtbarkeit messen, geo automatisierung, seo automatisierung, mention rate tracking, share of voice ki, chatgpt sichtbarkeit tracken, ki erwähnungen tracken, seo test, seo test kostenlos, seo check, website seo check, kostenloser seo check, seo analyse kostenlos, website audit kostenlos, SEO analyse tool, GEO optimierung, website checker, lighthouse alternative 2026',
    openGraph: {
        title: 'Sieh, ob ChatGPT & Co. deine Website empfehlen | Scanora',
        description: 'Scanora misst, wie oft KI-Systeme dich nennen, wer stattdessen genannt wird und was du ändern musst. Kostenloser Check in 60 Sekunden.',
        url: 'https://www.scanora.ai',
        siteName: 'Scanora',
        type: 'website',
        locale: 'de_DE',
        images: ['https://www.scanora.ai/opengraph-image'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sieh, ob ChatGPT & Co. deine Website empfehlen | Scanora',
        description: 'AI Visibility & SEO Tracking: kostenloser Check in 60 Sekunden, Tracking ab 4,99 €/Monat.',
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
// zu sein - ein Widerspruch zum seitenspezifischen Canonical-Tag. Jetzt erscheint dieser Block
// nur noch hier, wo mainEntityOfPage korrekt auf die eigene URL zeigt.
const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.scanora.ai/#webpage',
    url: 'https://www.scanora.ai',
    name: 'Sieh, ob ChatGPT & Co. deine Website empfehlen: AI Visibility & SEO Tracking',
    isPartOf: { '@id': 'https://www.scanora.ai/#website' },
    inLanguage: 'de-DE',
    primaryImageOfPage: { '@id': 'https://www.scanora.ai/logo' },
    datePublished: '2026-01-15',
    dateModified: '2026-10-01',
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
    headline: 'Sieh, ob ChatGPT & Co. deine Website empfehlen: AI Visibility & SEO Tracking',
    description: 'Scanora prüft in unter 60 Sekunden kostenlos, ob ChatGPT, Claude, Gemini, Perplexity und Google AI Overview eine Website nennen, und trackt KI-Erwähnungen und Google-Rankings wöchentlich.',
    author: { '@id': 'https://www.scanora.ai/#founder' },
    publisher: { '@id': 'https://www.scanora.ai/#organization' },
    datePublished: '2026-01-15',
    dateModified: '2026-10-01',
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
        <main className="bg-(--bg-base) min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <Navbar />
            <Hero locale="de" />
            <Features locale="de" />
            <AuditData locale="de" />
            <HowItWorks locale="de" />
            <WhatIsScanora locale="de" />
            <PricingSection locale="de" />
            <Resources locale="de" />
            <LandingFAQ locale="de" faqs={FAQS} />
            <FinalCTA locale="de" />
            <Footer />
        </main>
    )
}
