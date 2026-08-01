import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../../blog/ogImageTemplate'

export const runtime = 'edge'
export const alt = 'The Best Free SEO Audit Tools in 2026 (Compared)'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('The Best Free SEO Audit Tools in 2026 (Compared)', 'Tools'),
        { ...size },
    )
}
