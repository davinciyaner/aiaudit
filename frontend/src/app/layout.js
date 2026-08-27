import './globals.css'
import { headers } from 'next/headers'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { MotionConfig } from 'framer-motion'
import Script from 'next/script'
import CookieBanner from './components/CookieBanner'
import { getRootJsonLd } from '../lib/i18n/rootJsonLd'

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

export default async function RootLayout({ children }) {
    const headerList = await headers()
    const pathname = headerList.get('x-pathname') || ''
    const locale = pathname.startsWith('/en') ? 'en' : 'de'
    const jsonLd = getRootJsonLd(locale)

    return (
        <html lang={locale} className="dark">
        <head>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        </head>
        <body className="bg-[#080b14] text-white antialiased">
        <MotionConfig reducedMotion="user">
            {children}
        </MotionConfig>
        <Script
            src="https://news.google.com/swg/js/v1/publisher.js"
            strategy="afterInteractive"
        />
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-691789119"
            strategy="lazyOnload"
        />
        <Script id="google-gtag" strategy="lazyOnload">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                    'ad_storage': 'denied',
                    'analytics_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied',
                    'wait_for_update': 500
                });
                gtag('js', new Date());
                gtag('config', 'AW-691789119');
            `}
        </Script>
        <CookieBanner locale={locale} />
        <Analytics />
        <SpeedInsights />
        </body>
        </html>
    )
}