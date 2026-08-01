import { ImageResponse } from 'next/og'
import { blogOgImage } from '../../../blog/ogImageTemplate'

export const runtime = 'edge'
export const alt = 'Schema Markup for AI Citations: How to Get Cited by ChatGPT & Co.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        blogOgImage('Schema Markup for AI Citations: How to Get Cited by ChatGPT & Co.', 'Schema Markup'),
        { ...size },
    )
}
