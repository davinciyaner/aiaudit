import { ImageResponse } from 'next/og'
import { blogOgImage } from '@/app/blog/ogImageTemplate'
import { ogFonts } from '@/app/blog/ogImageTemplate'

export const alt = 'llms.txt Explained: What It Is and How to Set It Up Correctly'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        blogOgImage('llms.txt Explained: What It Is and How to Set It Up Correctly', 'GEO'),
        { ...size, fonts: await ogFonts() },
    )
}
