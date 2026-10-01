import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../blog/ogImageTemplate'
import { ogFonts } from '../../blog/ogImageTemplate'

export const alt = 'Scanora Alternatives'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        blogOgImage('Alternatives', 'Scanora'),
        { ...size, fonts: await ogFonts() },
    )
}
