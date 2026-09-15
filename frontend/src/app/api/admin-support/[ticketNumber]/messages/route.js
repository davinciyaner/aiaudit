import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const BACKEND = process.env.NEXT_PUBLIC_API_URL

export async function POST(req, context) {
    const { ticketNumber } = await context.params
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_auth')?.value
    const { body } = await req.json()
    const res = await fetch(`${BACKEND}/support/${ticketNumber}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body }),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
}
