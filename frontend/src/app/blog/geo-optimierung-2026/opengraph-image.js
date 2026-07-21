import { ImageResponse } from 'next/og'
import { blogOgImage } from '../ogImageTemplate'

export const runtime = 'edge'
export const alt = 'GEO-Optimierung 2026: So wirst du von ChatGPT und Claude empfohlen'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('GEO-Optimierung 2026: So wirst du von ChatGPT und Claude empfohlen', 'GEO'),
        { ...size },
    )
}