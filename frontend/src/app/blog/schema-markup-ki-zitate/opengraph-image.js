import { ImageResponse } from 'next/og'
import { blogOgImage } from '../ogImageTemplate'

export const alt = 'Schema Markup KI-Zitate 2026: So wirst du für ChatGPT & Co. zitierfähig'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('Schema Markup für KI-Zitate: Definition, Code & häufigster Fehler', 'GEO'),
        { ...size },
    )
}
