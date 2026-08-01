import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../../blog/ogImageTemplate'

export const runtime = 'edge'
export const alt = 'llms.txt Explained: What It Is and How to Set It Up Correctly'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('llms.txt Explained: What It Is and How to Set It Up Correctly', 'GEO'),
        { ...size },
    )
}
