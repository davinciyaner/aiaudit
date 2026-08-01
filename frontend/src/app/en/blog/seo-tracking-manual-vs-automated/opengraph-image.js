import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../../blog/ogImageTemplate'

export const runtime = 'edge'
export const alt = "Manual vs. Automated SEO Tracking: What's Actually Worth It?"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage("Manual vs. Automated SEO Tracking: What's Actually Worth It?", 'SEO + GEO'),
        { ...size },
    )
}
