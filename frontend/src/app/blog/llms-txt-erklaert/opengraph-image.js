import { ImageResponse } from 'next/og'
import { blogOgImage } from '../ogImageTemplate'

export const alt = 'llms.txt erklärt: Beispiel, Vorlage & Schritt-für-Schritt-Anleitung'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('llms.txt erklärt: Beispiel, Vorlage & Schritt-für-Schritt-Anleitung', 'GEO'),
        { ...size },
    )
}
