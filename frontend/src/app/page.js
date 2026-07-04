import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SeoTrackingTeaser from './components/SeoTrackingTeaser'
import SeoSection from './components/SeoSection'
import GeoSection from './components/GeoSection'
import PerformanceSection from './components/PerformanceSection'
import WhyAudit from './components/WhyAudit'
import Features from './components/Features'
import ExtensionSection from './components/ExtensionSection'
import CTA from './components/CTA'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import LandingFeedback from './components/LandingFeedback'
import FAQ from './components/FAQ'

export const metadata = {
    title: 'SEO Automatisierung & KI-Sichtbarkeit prüfen – Audit in 60s | AuditAI',
    description: 'Kostenloser Website-Audit für SEO-Automatisierung & KI-Sichtbarkeit in 60 Sekunden: Title-Tags, Core Web Vitals und Sichtbarkeit bei ChatGPT, Claude & Perplexity prüfen.',
    keywords: 'seo automatisierung, ki sichtbarkeit, seo test, seo test kostenlos, seo check, website seo check, kostenloser seo check, seo analyse kostenlos, website audit kostenlos, SEO analyse tool, performance test, core web vitals test, GEO optimierung, website checker, lighthouse alternative 2026',
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
    alternates: { canonical: 'https://www.sitecheckai.dev' },
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was prüft AuditAI genau?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'AuditAI analysiert deine Website in drei Bereichen: SEO (Title, Meta, Headings, Links), Performance (TTFB, FCP, Ladezeit) und GEO/KI-Sichtbarkeit (llms.txt, Schema.org, FAQ-Schema). Dazu generiert Claude AI einen vollständigen Bericht mit konkreten Fixes.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie lange dauert ein Audit?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ein vollständiger Audit dauert in der Regel unter 60 Sekunden. Der KI-Report wird parallel zur technischen Analyse generiert.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was kostet AuditAI?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Der Free-Plan ist kostenlos und enthält 1 Audit pro Monat mit SEO-Score, GEO-Sichtbarkeit und Performance-Metriken. Der KI-generierte Bericht mit konkreten Fixes ist ab dem Pro-Plan enthalten (€29/Monat, 10 Audits). Der Agency-Plan kostet €99/Monat (unbegrenzte Audits). Jederzeit kündbar.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist GEO und warum ist es wichtig?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'GEO steht für Generative Engine Optimization – die Sichtbarkeit deiner Website für KI-Modelle wie ChatGPT, Claude oder Perplexity. AuditAI prüft llms.txt, strukturierte Daten, FAQ-Schema und weitere Signale, die bestimmen ob KI-Modelle deine Website als Quelle zitieren.',
            },
        },
    ],
}

export default function LandingPage() {
    return (
        <main className="bg-[#05080f] min-h-screen pb-20 sm:pb-0">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <Navbar />
            <Hero />
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
            <Footer />
            <LandingFeedback />
        </main>
    )
}