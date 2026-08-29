import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../../blog/ogImageTemplate'

export const runtime = 'edge'
export const alt = 'Affordable AI Visibility Tool: SEO and AI Visibility in One Plan'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('Affordable AI Visibility Tool: SEO and AI Visibility in One Plan', 'Solution'),
        { ...size },
    )
}
