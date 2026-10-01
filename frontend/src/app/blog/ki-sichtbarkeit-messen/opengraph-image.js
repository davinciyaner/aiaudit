import { ImageResponse } from 'next/og'
import { blogOgImage } from '../ogImageTemplate'
import { ogFonts } from '../ogImageTemplate'

export const alt = 'KI-Sichtbarkeit messen 2026: Kennzahlen, Dashboard & eigene Daten'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        blogOgImage('KI-Sichtbarkeit messen 2026: Kennzahlen, Dashboard & eigene Daten', 'GEO'),
        { ...size, fonts: await ogFonts() },
    )
}
