import { ImageResponse } from 'next/og'
import { blogOgImage } from '../ogImageTemplate'

export const runtime = 'edge'
export const alt = 'KI-Sichtbarkeit erlangen: So wirst du von ChatGPT, Claude & Perplexity zitiert'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('KI-Sichtbarkeit erlangen: So wirst du von ChatGPT, Claude & Perplexity zitiert', 'GEO'),
        { ...size },
    )
}
