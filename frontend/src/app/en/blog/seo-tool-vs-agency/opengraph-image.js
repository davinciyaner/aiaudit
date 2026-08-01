import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../../blog/ogImageTemplate'

export const runtime = 'edge'
export const alt = 'SEO Tool vs. SEO Agency: The Honest Cost Comparison'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('SEO Tool vs. SEO Agency: The Honest Cost Comparison', 'SEO'),
        { ...size },
    )
}
