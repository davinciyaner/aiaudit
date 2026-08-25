import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ResultsSection from './components/ResultsSection'
import ProductShowcase from './components/ProductShowcase'
import WhyAudit from './components/WhyAudit'
import AIVisibilityExplainer from './components/AIVisibilityExplainer'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import LandingFeedback from './components/LandingFeedback'
import FAQ from './components/FAQ'
import { FAQS } from './components/faqData'

export const metadata = {
    title: 'KI-Sichtbarkeit (AI Visibility) & SEO prüfen – Audit in 60s | AuditAI',
    description: 'Kostenloser Website-Audit für KI-Sichtbarkeit (AI Visibility) & SEO in 60 Sekunden: Sichtbarkeit bei ChatGPT, Claude, Perplexity & Google AI Overview sowie Title-Tags und Google-Rankings prüfen.',
    keywords: 'ki sichtbarkeit, ki sichtbarkeit messen, ai visibility, ai visibility tracker, ai visibility score, geo automatisierung, seo automatisierung, mention rate tracking, share of voice ki, chatgpt sichtbarkeit tracken, ki erwähnungen tracken, seo test, seo test kostenlos, seo check, website seo check, kostenloser seo check, seo analyse kostenlos, website audit kostenlos, SEO analyse tool, GEO optimierung, website checker, lighthouse alternative 2026',
    openGraph: {
        title: 'KI-Sichtbarkeit (AI Visibility) & SEO prüfen | AuditAI',
        description: 'KI-Sichtbarkeit (AI Visibility) & SEO — ein vollständiger Website-Audit mit konkreten Fixes. Kostenlos starten.',
        url: 'https://www.sitecheckai.dev',
        siteName: 'AuditAI',
        type: 'website',
        locale: 'de_DE',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'KI-Sichtbarkeit (AI Visibility) & SEO prüfen | AuditAI',
        description: 'Website prüfen: KI-Sichtbarkeit (AI Visibility) & SEO in 60 Sekunden. Kostenlos starten. KI-Report ab Pro.',
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
        <main className="bg-[var(--bg-base)] min-h-screen pb-20 sm:pb-0">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <Navbar />
            <Hero />
            <ResultsSection />
            <ProductShowcase />
            <AIVisibilityExplainer />
            <WhyAudit />
            <Pricing />
            <FAQ />
            <Footer />
            <LandingFeedback />
        </main>
    )
}
