import { ImageResponse } from 'next/og'
import { blogOgImage } from '@/app/blog/ogImageTemplate'
import { ogFonts } from '@/app/blog/ogImageTemplate'

export const alt = 'Peec.ai Alternative: How Scanora Compares'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        blogOgImage('Peec.ai Alternative: An Honest Look at Scanora', 'Comparison'),
        { ...size, fonts: await ogFonts() },
    )
}
