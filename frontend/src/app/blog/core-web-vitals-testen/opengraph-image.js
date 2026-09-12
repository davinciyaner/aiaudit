import { ImageResponse } from 'next/og'
import { blogOgImage } from '../ogImageTemplate'

export const alt = 'Core Web Vitals testen kostenlos: LCP, INP & CLS prüfen (2026)'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('Core Web Vitals testen: LCP, INP & CLS kostenlos prüfen', 'Performance'),
        { ...size },
    )
}
