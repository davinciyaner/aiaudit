import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../../blog/ogImageTemplate'

export const runtime = 'edge'
export const alt = 'Claude AI Visibility Tracking 2026'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('Claude AI Visibility Tracking 2026: See Whether Claude Recommends You', 'Solution'),
        { ...size },
    )
}
