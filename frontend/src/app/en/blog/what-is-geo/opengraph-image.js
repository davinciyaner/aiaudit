import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../../blog/ogImageTemplate'

export const runtime = 'edge'
export const alt = 'What is GEO? Generative Engine Optimization Explained'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('What is GEO? Generative Engine Optimization Explained', 'GEO'),
        { ...size },
    )
}
