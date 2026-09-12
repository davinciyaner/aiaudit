import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { MotionConfig } from 'framer-motion'
import Script from 'next/script'
import CookieBanner from './components/CookieBanner'
import AppToaster from './components/AppToaster'
import { getRootJsonLd } from '../lib/i18n/rootJsonLd'

export const metadata = {
    metadataBase: new URL('https://www.scanora.ai'),
    title: {
        default: 'SEO Automatisierung & KI-Sichtbarkeit | Scanora',
        template: '%s | Scanora',
    },
    description: 'Kostenloser SEO-Test in unter 60 Sekunden: SEO-Automatisierung, KI-Sichtbarkeit, Title-Tags, Meta-Descriptions und Core Web Vitals prüfen. Vollständiger Website-Audit mit KI-Report und konkreten Fixes.',
    keywords: 'seo automatisierung, ki sichtbarkeit, seo test, seo test kostenlos, seo check, kostenloser seo check, website seo check, seo analyse kostenlos, website audit, core web vitals test, performance test, GEO, llms.txt, website checker kostenlos',
    authors: [{ name: 'Scanora' }],
    creator: 'Scanora',
    publisher: 'Scanora',
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    openGraph: {
        type: 'website',
        locale: 'de_DE',
        url: 'https://www.scanora.ai',
        siteName: 'Scanora',
        title: 'Scanora – KI-gestützter Website Audit',
        description: 'SEO, Performance & KI-Sichtbarkeit — ein vollständiger Audit in unter 60 Sekunden.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Scanora – KI-gestützter Website Audit',
        description: 'SEO, Performance & GEO in 60 Sekunden. Kostenlos starten.',
        creator: '@scanoraai',
    },
    alternates: {
        canonical: 'https://www.scanora.ai',
        languages: {
            de: 'https://www.scanora.ai',
            en: 'https://www.scanora.ai/en',
            'x-default': 'https://www.scanora.ai',
        },
    },
}

// Bewusst KEIN headers()/cookies() hier — das würde jede abhängige Route zur Laufzeit dynamisch
// rendern lassen (kein Prerendering, kein CDN-Cache) statt sie einmal statisch zu bauen. lang="de"
// ist der Default für alle Routen außer /en/*; die englischen Routen überschreiben lang clientseitig
// via SetHtmlLang in app/en/layout.js und liefern ihr eigenes JSON-LD dort.
const jsonLd = getRootJsonLd('de')

export default function RootLayout({ children }) {
    return (
        <html lang="de" className="dark" suppressHydrationWarning>
        <head>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Blocking (not next/script) so it runs before first paint — avoids a flash of the
            wrong theme. Defaults to dark (matches the server-rendered class) when nothing is
            stored yet or localStorage is unavailable (e.g. private browsing). */}
        <script
            dangerouslySetInnerHTML={{
                __html: `try{if(localStorage.getItem('scanora-theme')==='light')document.documentElement.classList.add('light')}catch(e){}`,
            }}
        />
        </head>
        <body className="bg-[var(--bg-base)] text-[var(--text-white)] antialiased">
        <MotionConfig reducedMotion="user">
            {children}
        </MotionConfig>
        <AppToaster />
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
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
        </body>
        </html>
    )
}