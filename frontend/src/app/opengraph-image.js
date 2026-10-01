import { ImageResponse } from 'next/og'
import { homeOgImage } from './homeOgImage'
import { ogFonts } from './blog/ogImageTemplate'

export const alt = 'Scanora: Sieh, ob ChatGPT & Co. deine Website empfehlen. SEO- und GEO-Monitoring für Google und KI-Antworten.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        homeOgImage({
            headline: 'Sieh, ob ChatGPT & Co. deine Website empfehlen.',
            sub: 'SEO- und GEO-Monitoring aus Deutschland. Kostenloser Check in 60 Sekunden.',
        }),
        { ...size, fonts: await ogFonts() },
    )
}
