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
                        width: 220,
                        height: 220,
                        borderRadius: 56,
                        background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 120,
                    }}
                >
                    ⚡
                </div>
                <span style={{ fontSize: 56, fontWeight: 700, color: 'white', letterSpacing: '-1px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    Audit<span style={{ color: '#a78bfa' }}>AI</span>
                </span>
            </div>
        ),
        { width: 512, height: 512 },
    )
}