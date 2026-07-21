import { ImageResponse } from 'next/og'
import { blogOgImage } from '../ogImageTemplate'

export const runtime = 'edge'
export const alt = 'Die besten kostenlosen SEO-Check-Tools 2026 im Vergleich'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('Die besten kostenlosen SEO-Check-Tools 2026 im Vergleich', 'SEO-Tools'),
        { ...size },
    )
}