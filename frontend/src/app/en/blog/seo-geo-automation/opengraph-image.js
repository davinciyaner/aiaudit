import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../../blog/ogImageTemplate'

export const runtime = 'edge'
export const alt = 'SEO Automation & GEO Automation: Track Rankings and AI Visibility Automatically'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('SEO & GEO Automation: Track Rankings and AI Visibility Automatically', 'Automation'),
        { ...size },
    )
}
