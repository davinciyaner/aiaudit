import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import CTA from './components/CTA'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

export const metadata = {
    title: 'AuditAI – KI-gestützter Website Audit | SEO, Security & Performance',
    description: 'Website in unter 60 Sekunden vollständig prüfen: SEO-Fehler, Security-Lücken, Performance-Killer und KI-Sichtbarkeit. KI-Report mit konkreten Fixes. Jetzt kostenlos starten.',
    keywords: 'website audit kostenlos, SEO analyse tool, security header check, performance test, GEO optimierung, llms.txt generator, website checker, core web vitals, vibe coding sicherheit, lighthouse alternative 2026',
    openGraph: {
        title: 'AuditAI – Kompletter Website Audit in 60 Sekunden',
        description: 'SEO, Performance, Security & GEO — ein KI-generierter Report mit konkreten Fixes. Kostenlos starten.',
        url: 'https://sitecheckai.dev',
        siteName: 'AuditAI',
        type: 'website',
        locale: 'de_DE',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AuditAI – KI-gestützter Website Audit',
        description: 'SEO, Performance, Security & GEO in 60 Sekunden. KI-Report mit konkreten Fixes. Kostenlos.',
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: { canonical: 'https://sitecheckai.dev' },
}

export default function LandingPage() {
    return (
        <main className="bg-[#05080f] min-h-screen">
            <Navbar />
            <Hero />
            <Features />
            <CTA />
            <Pricing />
            <Footer />
        </main>
    )
}