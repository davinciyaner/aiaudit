import Navbar from '../components/Navbar'
import Hero from '../components/en/Hero'
import ResultsSection from '../components/en/ResultsSection'
import ProductShowcase from '../components/en/ProductShowcase'
import WhyAudit from '../components/en/WhyAudit'
import AIVisibilityExplainer from '../components/en/AIVisibilityExplainer'
import Pricing from '../components/en/Pricing'
import Footer from '../components/Footer'
import LandingFeedback from '../components/en/LandingFeedback'
import FAQ from '../components/en/FAQ'
import { FAQS_EN } from '../components/en/faqDataEn'

export const metadata = {
    title: { absolute: 'AI Visibility & SEO Check – Audit in 60s | AuditAI' },
    description: 'Free website audit for AI Visibility & SEO in 60 seconds: check visibility in ChatGPT, Claude, Perplexity & Google AI Overview, plus title tags and Google rankings.',
    keywords: 'ai visibility, ai visibility tracker, ai visibility score, geo, geo optimization, seo automation, mention rate tracking, share of voice ai, track chatgpt visibility, track ai mentions, seo test, free seo test, seo check, free website seo check, free seo analysis, free website audit, seo analysis tool, website checker, lighthouse alternative 2026',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev',
            'en-US': 'https://www.sitecheckai.dev/en',
            'x-default': 'https://www.sitecheckai.dev',
        },
    },
    openGraph: {
        title: 'AI Visibility & SEO Check | AuditAI',
        description: 'AI Visibility & SEO — a full website audit with concrete fixes. Start for free.',
        url: 'https://www.sitecheckai.dev/en',
        siteName: 'AuditAI',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Visibility & SEO Check | AuditAI',
        description: 'Check your website: AI Visibility & SEO in 60 seconds. Start for free. AI report from Pro.',
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

export default function LandingPageEn() {
    return (
        <main className="bg-[var(--bg-base)] min-h-screen pb-20 sm:pb-0">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <Navbar locale="en" />
            <Hero />
            <ResultsSection />
            <ProductShowcase />
            <AIVisibilityExplainer />
            <WhyAudit />
            <Pricing />
            <FAQ />
            <Footer locale="en" />
            <LandingFeedback />
        </main>
    )
}
