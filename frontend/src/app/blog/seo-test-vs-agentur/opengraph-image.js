import { ImageResponse } from 'next/og'
import { blogOgImage } from '../ogImageTemplate'
import { ogFonts } from '../ogImageTemplate'

export const alt = 'SEO-Agentur prüfen: SEO-Check vs. Agentur im Kostenvergleich'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        blogOgImage('SEO-Agentur unabhängig prüfen lassen: Check vs. Agentur im Vergleich', 'SEO'),
        { ...size, fonts: await ogFonts() },
    )
}
