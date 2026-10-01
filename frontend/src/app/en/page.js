import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Hero, Features, AuditData, HowItWorks, WhatIsScanora, PricingSection, Resources, LandingFAQ, FinalCTA } from '../components/landing/LandingSections'
import { FAQS_EN } from '../components/en/faqDataEn'

export const metadata = {
    title: { absolute: 'AI Visibility & SEO Tracking: Does ChatGPT Recommend You? | Scanora' },
    description: 'Free AI visibility & SEO check in 60 seconds: see if ChatGPT, Claude, Gemini, Perplexity and Google AI Overview recommend your website.',
    keywords: 'ai visibility, ai visibility tracker, ai visibility score, geo, geo optimization, seo automation, mention rate tracking, share of voice ai, track chatgpt visibility, track ai mentions, seo test, free seo test, seo check, free website seo check, free seo analysis, free website audit, seo analysis tool, website checker, lighthouse alternative 2026',
    alternates: {
        canonical: 'https://www.scanora.ai/en',
        languages: {
            'de-DE': 'https://www.scanora.ai',
            'en-US': 'https://www.scanora.ai/en',
            'x-default': 'https://www.scanora.ai',
        },
    },
    openGraph: {
        title: 'See if ChatGPT & co. recommend your website | Scanora',
        description: 'Scanora measures how often AI systems mention you, who gets named instead and what you need to change. Free check in 60 seconds.',
        url: 'https://www.scanora.ai/en',
        siteName: 'Scanora',
        type: 'website',
        locale: 'en_US',
        images: ['https://www.scanora.ai/en/opengraph-image'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'See if ChatGPT & co. recommend your website | Scanora',
        description: 'AI visibility & SEO tracking: free check in 60 seconds, tracking from €4.99/month.',
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS_EN.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
}

const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.scanora.ai/en/#webpage',
    url: 'https://www.scanora.ai/en',
    name: 'See if ChatGPT & co. recommend your website: AI Visibility & SEO Tracking',
    description: 'Scanora checks for free in under 60 seconds whether ChatGPT, Claude, Gemini, Perplexity and Google AI Overview mention a website, and tracks AI mentions and Google rankings weekly.',
    isPartOf: { '@id': 'https://www.scanora.ai/en/#website' },
    inLanguage: 'en-US',
    dateModified: '2026-10-01',
    author: { '@id': 'https://www.scanora.ai/#founder' },
    about: [
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
        { '@type': 'Thing', name: 'AI Visibility' },
        { '@type': 'Thing', name: 'SEO audit' },
    ],
}

export default function LandingPageEn() {
    return (
        <main className="bg-(--bg-base) min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <Navbar locale="en" />
            <Hero locale="en" />
            <Features locale="en" />
            <AuditData locale="en" />
            <HowItWorks locale="en" />
            <WhatIsScanora locale="en" />
            <PricingSection locale="en" />
            <Resources locale="en" />
            <LandingFAQ locale="en" faqs={FAQS_EN} />
            <FinalCTA locale="en" />
            <Footer locale="en" />
        </main>
    )
}
