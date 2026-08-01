import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../../blog/ogImageTemplate'

export const runtime = 'edge'
export const alt = 'SEO Checklist 2026: Find Every Mistake Yourself in 15 Minutes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('SEO Checklist 2026: Find Every Mistake Yourself in 15 Minutes', 'SEO Checklist'),
        { ...size },
    )
}
