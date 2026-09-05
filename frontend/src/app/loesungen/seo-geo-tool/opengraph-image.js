import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../blog/ogImageTemplate'

export const runtime = 'edge'
export const alt = 'SEO + GEO Tool: Google-Rankings & KI-Sichtbarkeit in einem Dashboard'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('SEO + GEO Tool: Google-Rankings & KI-Sichtbarkeit in einem Dashboard', 'SEO + GEO'),
        { ...size },
    )
}
