import { NextResponse } from 'next/server'

export function proxy(request) {
    const { pathname } = request.nextUrl

    if (pathname === '/support/admin') {
        const cookie = request.cookies.get('admin_auth')
        const adminToken = process.env.ADMIN_TOKEN

        if (!cookie || !adminToken || cookie.value !== adminToken) {
            return NextResponse.redirect(new URL('/support/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon\\.ico|.*\\..*).*)'],
}