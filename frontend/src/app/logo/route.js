import { ImageResponse } from 'next/og'


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
                        background: '#00a6f4',
                        boxShadow: '0 12px 40px rgba(0, 166, 244, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <svg width="92" height="92" viewBox="0 0 192 192" fill="none">
                        <circle cx="96" cy="96" r="50" stroke="white" strokeWidth="14" />
                        <circle cx="110" cy="82" r="13" fill="white" />
                    </svg>
                </div>
                <span style={{ fontSize: 46, fontWeight: 700, color: 'white', letterSpacing: '-1px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    Scanora
                </span>
            </div>
        ),
        { width: 512, height: 512 },
    )
}