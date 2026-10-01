import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { MotionConfig } from 'framer-motion'
import Script from 'next/script'
import CookieBanner from './components/CookieBanner'
import AppToaster from './components/AppToaster'
import { getRootJsonLd } from '@/lib/i18n/rootJsonLd'
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

export const metadata = {
    metadataBase: new URL('https://www.scanora.ai'),
    title: {
        default: 'SEO Automatisierung & KI-Sichtbarkeit | Scanora',
        template: '%s | Scanora',
    },
    description: 'SEO- und GEO-Tool aus Deutschland: Sieh, ob ChatGPT, Claude, Gemini, Perplexity und Google AI Overview deine Website empfehlen. Gratis-Check in 60 s.',
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
        title: 'Scanora: AI Visibility & SEO Tracking',
        description: 'Sieh, ob ChatGPT & Co. deine Website empfehlen. Kostenloser Check in 60 Sekunden, Tracking ab 4,99 €/Monat.',
        images: ['https://www.scanora.ai/opengraph-image'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Scanora: AI Visibility & SEO Tracking',
        description: 'Sieh, ob ChatGPT & Co. deine Website empfehlen. Kostenloser Check in 60 Sekunden.',
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

// Bewusst KEIN headers()/cookies() hier - das würde jede abhängige Route zur Laufzeit dynamisch
// rendern lassen (kein Prerendering, kein CDN-Cache) statt sie einmal statisch zu bauen. lang="de"
// ist der Default für alle Routen außer /en/*; die englischen Routen überschreiben lang clientseitig
// via SetHtmlLang in app/en/layout.js und liefern ihr eigenes JSON-LD dort.
const jsonLd = getRootJsonLd('de')

export const viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
        { media: '(prefers-color-scheme: dark)', color: '#0b1120' },
    ],
}

export default function RootLayout({ children }) {
    return (
        <html lang="de" className={`${geistSans.variable} ${geistMono.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
        <head>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Blocking (not next/script) so it runs before first paint, which avoids a flash of
            the wrong theme. Light is the default (matches the server-rendered markup); dark
            only applies when the visitor chose it via ThemeToggle. */}
        <script
            dangerouslySetInnerHTML={{
                __html: `try{if(localStorage.getItem('scanora-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
            }}
        />
        </head>
        <body className="bg-(--bg-base) text-(--text-white) antialiased">
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