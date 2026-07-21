import { ImageResponse } from 'next/og'
import { blogOgImage } from '../ogImageTemplate'

export const runtime = 'edge'
export const alt = 'SEO-Test: Die 10 häufigsten Fehler die deinen Google-Rank kosten'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('SEO-Test: Die 10 häufigsten Fehler die deinen Google-Rank kosten', 'SEO-Test'),
        { ...size },
    )
}