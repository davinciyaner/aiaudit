import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../../blog/ogImageTemplate'

export const alt = 'Measure AI Visibility 2026: KPIs, Dashboard & Your Own Data'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('Measure AI Visibility 2026: KPIs, Dashboard & Your Own Data', 'GEO'),
        { ...size },
    )
}
