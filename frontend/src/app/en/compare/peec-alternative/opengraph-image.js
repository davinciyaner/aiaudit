import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../../blog/ogImageTemplate'

export const runtime = 'edge'
export const alt = 'Peec.ai Alternative: How AuditAI Compares'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('Peec.ai Alternative: An Honest Look at AuditAI', 'Comparison'),
        { ...size },
    )
}
