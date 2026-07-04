import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
import CookieBanner from './components/CookieBanner'

export const metadata = {
    metadataBase: new URL('https://www.sitecheckai.dev'),
    title: {
        default: 'SEO Automatisierung & KI-Sichtbarkeit | AuditAI',
        template: '%s | AuditAI',
    },
    description: 'Kostenloser SEO-Test in unter 60 Sekunden: SEO-Automatisierung, KI-Sichtbarkeit, Title-Tags, Meta-Descriptions und Core Web Vitals prüfen. Vollständiger Website-Audit mit KI-Report und konkreten Fixes.',
    keywords: 'seo automatisierung, ki sichtbarkeit, seo test, seo test kostenlos, seo check, kostenloser seo check, website seo check, seo analyse kostenlos, website audit, core web vitals test, performance test, GEO, llms.txt, website checker kostenlos',
    authors: [{ name: 'AuditAI' }],
    creator: 'AuditAI',
    publisher: 'AuditAI',
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    openGraph: {
        type: 'website',
        locale: 'de_DE',
        url: 'https://www.sitecheckai.dev',
        siteName: 'AuditAI',
        title: 'AuditAI – KI-gestützter Website Audit',
        description: 'SEO, Performance & KI-Sichtbarkeit — ein vollständiger Audit in unter 60 Sekunden.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AuditAI – KI-gestützter Website Audit',
        description: 'SEO, Performance & GEO in 60 Sekunden. Kostenlos starten.',
        creator: '@auditai',
    },
    alternates: { canonical: 'https://www.sitecheckai.dev' },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': 'https://www.sitecheckai.dev',
            name: 'AuditAI',
            url: 'https://www.sitecheckai.dev',
            description: 'KI-gestütztes Website-Audit-Tool für SEO, Performance und GEO-Sichtbarkeit.',
            sameAs: ['https://twitter.com/auditai'],
        },
        {
            '@type': 'WebSite',
            '@id': 'https://www.sitecheckai.dev/#website',
            url: 'https://www.sitecheckai.dev',
            name: 'AuditAI',
            publisher: { '@id': 'https://www.sitecheckai.dev/#organization' },
            inLanguage: 'de-DE',
        },
        {
            '@type': 'SoftwareApplication',
            name: 'AuditAI',
            url: 'https://www.sitecheckai.dev',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'Vollständiger Website-Audit mit KI: SEO, Performance und GEO-Sichtbarkeit in unter 60 Sekunden.',
            offers: [
                { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'EUR', description: '1 Audit pro Monat' },
                { '@type': 'Offer', name: 'Pro', price: '29', priceCurrency: 'EUR', description: '10 Audits pro Monat' },
                { '@type': 'Offer', name: 'Agency', price: '99', priceCurrency: 'EUR', description: 'Unbegrenzte Audits' },
            ],
        },
    ],
}

export default function RootLayout({ children }) {
    return (
        <html lang="de" className="dark">
        <head>
        </head>
        <body className="bg-[#080b14] text-white antialiased">
        {children}
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-691789119"
            strategy="afterInteractive"
        />
        <Script id="google-gtag" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-691789119');
            `}
        </Script>
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
        </body>
        </html>
    )
}