import { ImageResponse } from 'next/og'
import { blogOgImage } from '../blog/ogImageTemplate'

export const alt = 'Scanora Alternativen'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('Alternativen', 'Scanora'),
        { ...size },
    )
}
