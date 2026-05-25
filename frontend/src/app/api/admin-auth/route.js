import { NextResponse } from 'next/server'

export async function POST(req) {
    const { token } = await req.json()
    if (!token || token !== process.env.ADMIN_TOKEN) {
        return NextResponse.json({ error: 'Ungültiger Token.' }, { status: 401 })
    }
    const res = NextResponse.json({ ok: true })
    res.cookies.set('admin_auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 8,
        path: '/',
    })
    return res
}

export async function DELETE() {
    const res = NextResponse.json({ ok: true })
    res.cookies.delete('admin_auth')
    return res
}