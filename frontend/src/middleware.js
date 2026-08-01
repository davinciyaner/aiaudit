import { NextResponse } from 'next/server'

export function middleware(request) {
    const { pathname } = request.nextUrl

    if (pathname === '/support/admin') {
        const cookie = request.cookies.get('admin_auth')
        const adminToken = process.env.ADMIN_TOKEN

        if (!cookie || !adminToken || cookie.value !== adminToken) {
            return NextResponse.redirect(new URL('/support/admin/login', request.url))
        }
    }

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-pathname', pathname)
    return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon\\.ico|.*\\..*).*)'],
}