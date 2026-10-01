import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../blog/ogImageTemplate'
import { ogFonts } from '../../blog/ogImageTemplate'

export const alt = 'Peec.ai Alternative: Scanora im Vergleich'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        blogOgImage('Peec.ai Alternative: Scanora im ehrlichen Vergleich', 'Vergleich'),
        { ...size, fonts: await ogFonts() },
    )
}
