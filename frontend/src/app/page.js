import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SeoSection from './components/SeoSection'
import GeoSection from './components/GeoSection'
import SecuritySection from './components/SecuritySection'
import PerformanceSection from './components/PerformanceSection'
import WhyAudit from './components/WhyAudit'
import Features from './components/Features'
import ExtensionSection from './components/ExtensionSection'
import CTA from './components/CTA'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import LandingFeedback from './components/LandingFeedback'

export const metadata = {
    title: 'Kostenloser Website-Audit: SEO, Security & GEO | AuditAI',
    description: 'SEO, Performance, Security & KI-Sichtbarkeit in 60 Sekunden prüfen. Kostenloser Website-Audit mit konkreten Fixes – keine Registrierung nötig.',
    keywords: 'seo test, seo test kostenlos, seo check, website seo check, kostenloser seo check, seo analyse kostenlos, website audit kostenlos, SEO analyse tool, security header check, performance test, core web vitals test, GEO optimierung, website checker, lighthouse alternative 2026',
    openGraph: {
        title: 'Kostenloser SEO-Test & Website-Audit in 60 Sekunden | AuditAI',
        description: 'SEO-Test, Security, Performance & KI-Sichtbarkeit — ein vollständiger Website-Audit mit konkreten Fixes. Kostenlos starten, kein Account nötig.',
        url: 'https://sitecheckai.dev',
        siteName: 'AuditAI',
        type: 'website',
        locale: 'de_DE',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kostenloser SEO-Test & Website-Audit | AuditAI',
        description: 'SEO-Test, Security & Performance in 60 Sekunden. KI-Report mit konkreten Fixes. Kostenlos.',
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: { canonical: 'https://sitecheckai.dev' },
}

export default function LandingPage() {
    return (
        <main className="bg-[#05080f] min-h-screen pb-20 sm:pb-0">
            <Navbar />
            <Hero />
            <SeoSection />
            <GeoSection />
            <SecuritySection />
            <PerformanceSection />
            <WhyAudit />
            <Features />
            <ExtensionSection />
            <CTA />
            <Pricing />
            <Footer />
            <LandingFeedback />
        </main>
    )
}