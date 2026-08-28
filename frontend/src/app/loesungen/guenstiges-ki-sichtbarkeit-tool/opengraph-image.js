import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../blog/ogImageTemplate'

export const runtime = 'edge'
export const alt = 'Günstiges KI-Sichtbarkeit Tool: SEO und AI Visibility in einem Abo'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('Günstiges KI-Sichtbarkeit Tool: SEO und AI Visibility in einem Abo', 'Lösung'),
        { ...size },
    )
}
