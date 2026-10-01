import { ImageResponse } from 'next/og'
import { homeOgImage } from '../homeOgImage'
import { ogFonts } from '../blog/ogImageTemplate'

export const alt = 'Scanora: See if ChatGPT & co. recommend your website. SEO and GEO monitoring for Google and AI answers.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        homeOgImage({
            headline: 'See if ChatGPT & co. recommend your website.',
            sub: 'SEO and GEO monitoring from Germany. Free check in 60 seconds.',
        }),
        { ...size, fonts: await ogFonts() },
    )
}
