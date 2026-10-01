import { ImageResponse } from 'next/og'
import { blogOgImage } from '@/app/blog/ogImageTemplate'
import { ogFonts } from '@/app/blog/ogImageTemplate'

export const alt = 'Claude AI Visibility Tracking 2026'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        blogOgImage('Claude AI Visibility Tracking 2026: See Whether Claude Recommends You', 'Solution'),
        { ...size, fonts: await ogFonts() },
    )
}
