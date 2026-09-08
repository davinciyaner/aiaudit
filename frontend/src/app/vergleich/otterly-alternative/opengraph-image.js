import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../blog/ogImageTemplate'

export const runtime = 'edge'
export const alt = 'Otterly.ai Alternative: Scanora im Vergleich'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('Otterly.ai Alternative: Scanora im ehrlichen Vergleich', 'Vergleich'),
        { ...size },
    )
}
