import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GeoTrackingTeaser from './components/GeoTrackingTeaser'
import GeoHowItWorks from './components/GeoHowItWorks'
import SeoTrackingTeaser from './components/SeoTrackingTeaser'
import SeoSection from './components/SeoSection'
import GeoSection from './components/GeoSection'
import WhyAudit from './components/WhyAudit'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import LandingFeedback from './components/LandingFeedback'
import FAQ from './components/FAQ'
import { FAQS } from './components/faqData'

export const metadata = {
    title: 'SEO Automatisierung & KI-Sichtbarkeit prüfen – Audit in 60s | AuditAI',
    description: 'Kostenloser Website-Audit für SEO-Automatisierung & KI-Sichtbarkeit in 60 Sekunden: Title-Tags, Core Web Vitals und Sichtbarkeit bei ChatGPT, Claude, Perplexity & Google AI Overview prüfen.',
    keywords: 'seo automatisierung, ki sichtbarkeit, geo automatisierung, ai visibility tracker, mention rate tracking, share of voice ki, chatgpt sichtbarkeit tracken, ki erwähnungen tracken, seo test, seo test kostenlos, seo check, website seo check, kostenloser seo check, seo analyse kostenlos, website audit kostenlos, SEO analyse tool, performance test, core web vitals test, GEO optimierung, website checker, lighthouse alternative 2026',
    openGraph: {
        title: 'SEO Automatisierung & KI-Sichtbarkeit prüfen | AuditAI',
        description: 'SEO-Automatisierung, Performance & KI-Sichtbarkeit — ein vollständiger Website-Audit mit konkreten Fixes. Kostenlos starten.',
        url: 'https://www.sitecheckai.dev',
        siteName: 'AuditAI',
        type: 'website',
        locale: 'de_DE',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SEO Automatisierung & KI-Sichtbarkeit prüfen | AuditAI',
        description: 'Website prüfen: SEO-Automatisierung, Performance & KI-Sichtbarkeit in 60 Sekunden. Kostenlos starten. KI-Report ab Pro.',
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
        canonical: 'https://www.sitecheckai.dev',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev',
            'en-US': 'https://www.sitecheckai.dev/en',
            'x-default': 'https://www.sitecheckai.dev',
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

export default function LandingPage() {
    return (
        <main className="bg-[#05080f] min-h-screen pb-20 sm:pb-0">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <Navbar />
            <Hero />
            <GeoTrackingTeaser />
            <GeoHowItWorks />
            <SeoTrackingTeaser />
            <SeoSection />
            <GeoSection />
            <WhyAudit />
            <Features />
            <Pricing />
            <FAQ />
            <Footer />
            <LandingFeedback />
        </main>
    )
}