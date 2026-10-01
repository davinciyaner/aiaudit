import { ImageResponse } from 'next/og'
import { blogOgImage } from '../ogImageTemplate'
import { ogFonts } from '../ogImageTemplate'

export const alt = 'Die besten kostenlosen SEO-Check-Tools 2026 im Vergleich'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        blogOgImage('Die besten kostenlosen SEO-Check-Tools 2026 im Vergleich', 'SEO-Tools'),
        { ...size, fonts: await ogFonts() },
    )
}