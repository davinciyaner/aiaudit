import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../../blog/ogImageTemplate'

export const runtime = 'edge'
export const alt = 'Core Web Vitals in 2026: What They Are and How to Test Them for Free'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('Core Web Vitals in 2026: What They Are and How to Test Them for Free', 'Performance'),
        { ...size },
    )
}
