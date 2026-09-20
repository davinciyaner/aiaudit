import { NextResponse } from 'next/server'
import { getCounterpart } from '@/lib/i18n/routeMap'

// Set once a visitor has been geo-redirected (or has landed on /en on their own),
// so we never fight a manual language switch back to German afterwards.
const LOCALE_COOKIE = 'locale_redirected'

// Crawlers/bots must always see the German URL they requested — geo-redirecting them
// would make Google (and AI crawlers) index the wrong locale depending on which
// country their fetch happened to come from.
const BOT_UA = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegrambot|discordbot|slackbot|applebot|ahrefsbot|semrushbot|mj12bot|dotbot|petalbot|bytespider|gptbot|ccbot|perplexitybot|ia_archiver/i

export function proxy(request) {
    const { pathname } = request.nextUrl

    if (pathname === '/support/admin') {
        const cookie = request.cookies.get('admin_auth')
        const adminToken = process.env.ADMIN_TOKEN

        if (!cookie || !adminToken || cookie.value !== adminToken) {
            return NextResponse.redirect(new URL('/support/admin/login', request.url))
        }
    }

    const isEn = pathname === '/en' || pathname.startsWith('/en/')
    const hasLocaleCookie = request.cookies.has(LOCALE_COOKIE)

    // Visitor already made (or already reflects) a locale choice — mark it so a later
    // manual switch back to German is never overridden by the geo-redirect below.
    if (isEn && !hasLocaleCookie) {
        const response = NextResponse.next()
        response.cookies.set(LOCALE_COOKIE, '1', { maxAge: 60 * 60 * 24 * 365, path: '/' })
        return response
    }

    if (!isEn && !hasLocaleCookie && !BOT_UA.test(request.headers.get('user-agent') || '')) {
        const country = request.headers.get('x-vercel-ip-country')
        if (country === 'US') {
            const target = getCounterpart(pathname, 'de')
            if (target) {
                const response = NextResponse.redirect(new URL(target + request.nextUrl.search, request.url))
                response.cookies.set(LOCALE_COOKIE, '1', { maxAge: 60 * 60 * 24 * 365, path: '/' })
                return response
            }
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon\\.ico|.*\\..*).*)'],
}