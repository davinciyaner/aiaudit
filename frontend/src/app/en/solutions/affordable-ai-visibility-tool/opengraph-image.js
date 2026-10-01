import { ImageResponse } from 'next/og'
import { blogOgImage } from '@/app/blog/ogImageTemplate'
import { ogFonts } from '@/app/blog/ogImageTemplate'

export const alt = 'Affordable AI Visibility Tool: SEO and AI Visibility in One Plan'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        blogOgImage('Affordable AI Visibility Tool: SEO and AI Visibility in One Plan', 'Solution'),
        { ...size, fonts: await ogFonts() },
    )
}
