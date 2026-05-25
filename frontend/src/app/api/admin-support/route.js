import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const BACKEND = process.env.NEXT_PUBLIC_API_URL

async function getAdminToken(req) {
    const cookieStore = await cookies()
    return cookieStore.get('admin_auth')?.value
}

export async function GET() {
    const token = await getAdminToken()
    const res = await fetch(`${BACKEND}/support`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
}