import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../blog/ogImageTemplate'

export const alt = 'ChatGPT Sichtbarkeit tracken 2026'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('Sichtbarkeit in ChatGPT tracken 2026: So siehst du, ob ChatGPT dich empfiehlt', 'Lösung'),
        { ...size },
    )
}
