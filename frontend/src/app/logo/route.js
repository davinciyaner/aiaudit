import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 28,
                    background: '#05080f',
                }}
            >
                <div
                    style={{
                        width: 168,
                        height: 168,
                        borderRadius: 42,
                        background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
                        boxShadow: '0 12px 40px rgba(124, 58, 237, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <svg width="92" height="92" viewBox="0 0 24 24" fill="white">
                        <path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" />
                    </svg>
                </div>
                <span style={{ fontSize: 46, fontWeight: 700, color: 'white', letterSpacing: '-1px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    Audit<span style={{ color: '#a78bfa' }}>AI</span>
                </span>
            </div>
        ),
        { width: 512, height: 512 },
    )
}