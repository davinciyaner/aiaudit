import { ImageResponse } from 'next/og'
import { blogOgImage } from '@/app/blog/ogImageTemplate'
import { ogFonts } from '@/app/blog/ogImageTemplate'

export const alt = 'AI Visibility: How to Get Cited by ChatGPT, Claude & Perplexity'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        blogOgImage('AI Visibility: How to Get Cited by ChatGPT, Claude & Perplexity', 'GEO'),
        { ...size, fonts: await ogFonts() },
    )
}
