import { ImageResponse } from 'next/og'
import { blogOgImage } from '@/app/blog/ogImageTemplate'
import { ogFonts } from '@/app/blog/ogImageTemplate'

export const alt = 'What is GEO? Generative Engine Optimization Explained'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        blogOgImage('What is GEO? Generative Engine Optimization Explained', 'GEO'),
        { ...size, fonts: await ogFonts() },
    )
}
