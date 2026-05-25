import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const BACKEND = process.env.NEXT_PUBLIC_API_URL

export async function PATCH(req, context) {
    const { ticketNumber } = await context.params
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_auth')?.value
    const { status } = await req.json()
    const res = await fetch(`${BACKEND}/support/${ticketNumber}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
}