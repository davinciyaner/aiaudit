import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../blog/ogImageTemplate'
import { ogFonts } from '../../blog/ogImageTemplate'

export const alt = 'Claude AI Sichtbarkeit tracken 2026'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        blogOgImage('Claude AI Sichtbarkeit tracken 2026: So siehst du, ob Claude dich empfiehlt', 'Lösung'),
        { ...size, fonts: await ogFonts() },
    )
}
