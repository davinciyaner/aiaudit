import { ImageResponse } from 'next/og'
import { blogOgImage } from '@/app/blog/ogImageTemplate'
import { ogFonts } from '@/app/blog/ogImageTemplate'

export const alt = 'Rankscale Alternative: How Scanora Compares'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        blogOgImage('Rankscale Alternative: An Honest Look at Scanora', 'Comparison'),
        { ...size, fonts: await ogFonts() },
    )
}
