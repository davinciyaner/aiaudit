import { ImageResponse } from 'next/og'
import { blogOgImage } from '@/app/blog/ogImageTemplate'
import { ogFonts } from '@/app/blog/ogImageTemplate'

export const alt = '10 Common SEO Mistakes That Cost You Google Rankings'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        blogOgImage('10 Common SEO Mistakes That Cost You Google Rankings', 'SEO'),
        { ...size, fonts: await ogFonts() },
    )
}
