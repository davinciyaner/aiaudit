import { ImageResponse } from 'next/og'
import { blogOgImage } from '../ogImageTemplate'

export const runtime = 'edge'
export const alt = 'SEO-Checkliste 2026: In 15 Minuten alle Fehler selbst finden'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('SEO-Checkliste 2026: In 15 Minuten alle Fehler selbst finden', 'SEO-Checkliste'),
        { ...size },
    )
}