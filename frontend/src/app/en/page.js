import Navbar from '../components/Navbar'
import Hero from '../components/en/Hero'
import GeoTrackingTeaser from '../components/en/GeoTrackingTeaser'
import GeoHowItWorks from '../components/en/GeoHowItWorks'
import SeoTrackingTeaser from '../components/en/SeoTrackingTeaser'
import SeoSection from '../components/en/SeoSection'
import GeoSection from '../components/en/GeoSection'
import PerformanceSection from '../components/en/PerformanceSection'
import WhyAudit from '../components/en/WhyAudit'
import Features from '../components/en/Features'
import ExtensionSection from '../components/en/ExtensionSection'
import CTA from '../components/en/CTA'
import Pricing from '../components/en/Pricing'
import Footer from '../components/Footer'
import LandingFeedback from '../components/en/LandingFeedback'
import FAQ from '../components/en/FAQ'
import { FAQS_EN } from '../components/en/faqDataEn'

export const metadata = {
    title: { absolute: 'SEO Automation & AI Visibility Check – Audit in 60s | AuditAI' },
    description: 'Free website audit for SEO automation & AI visibility in 60 seconds: check title tags, Core Web Vitals, and visibility in ChatGPT, Claude, Perplexity & Google AI Overview.',
    keywords: 'seo automation, ai visibility, geo automation, ai visibility tracker, mention rate tracking, share of voice ai, track chatgpt visibility, track ai mentions, seo test, free seo test, seo check, free website seo check, free seo analysis, free website audit, seo analysis tool, performance test, core web vitals test, GEO optimization, website checker, lighthouse alternative 2026',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev',
            'en-US': 'https://www.sitecheckai.dev/en',
            'x-default': 'https://www.sitecheckai.dev',
        },
    },
    openGraph: {
        title: 'SEO Automation & AI Visibility Check | AuditAI',
        description: 'SEO automation, performance & AI visibility — a full website audit with concrete fixes. Start for free.',
        url: 'https://www.sitecheckai.dev/en',
        siteName: 'AuditAI',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SEO Automation & AI Visibility Check | AuditAI',
        description: 'Check your website: SEO automation, performance & AI visibility in 60 seconds. Start for free. AI report from Pro.',
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
        <main className="bg-[#05080f] min-h-screen pb-20 sm:pb-0">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <Navbar locale="en" />
            <Hero />
            <GeoTrackingTeaser />
            <GeoHowItWorks />
            <SeoTrackingTeaser />
            <SeoSection />
            <GeoSection />
            <PerformanceSection />
            <WhyAudit />
            <Features />
            <ExtensionSection />
            <CTA />
            <Pricing />
            <FAQ />
            <Footer locale="en" />
            <LandingFeedback />
        </main>
    )
}
