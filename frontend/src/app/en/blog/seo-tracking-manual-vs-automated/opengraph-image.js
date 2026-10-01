import { ImageResponse } from 'next/og'
import { blogOgImage } from '@/app/blog/ogImageTemplate'
import { ogFonts } from '@/app/blog/ogImageTemplate'

export const alt = "Manual vs. Automated SEO Tracking: What's Actually Worth It?"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        blogOgImage("Manual vs. Automated SEO Tracking: What's Actually Worth It?", 'SEO + GEO'),
        { ...size, fonts: await ogFonts() },
    )
}
