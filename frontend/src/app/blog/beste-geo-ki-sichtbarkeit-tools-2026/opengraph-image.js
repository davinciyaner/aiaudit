import { ImageResponse } from 'next/og'
import { blogOgImage } from '../ogImageTemplate'

export const alt = 'Beste GEO- & KI-Sichtbarkeits-Tools 2026: 5 Tools im Vergleich'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('Beste GEO- & KI-Sichtbarkeits-Tools 2026: 5 Tools im Vergleich', 'GEO'),
        { ...size },
    )
}
