import { ImageResponse } from 'next/og'
import { blogOgImage } from '../ogImageTemplate'
import { ogFonts } from '../ogImageTemplate'

export const alt = 'SEO Automatisierung & GEO Automatisierung: Rankings und KI-Sichtbarkeit automatisch tracken'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        blogOgImage('SEO & GEO Automatisierung: Rankings und KI-Sichtbarkeit automatisch tracken', 'Automatisierung'),
        { ...size, fonts: await ogFonts() },
    )
}