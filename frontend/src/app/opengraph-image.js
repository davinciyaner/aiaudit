import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AuditAI – Website prüfen: SEO, GEO, Performance & Security'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const TAGS = ['SEO-Analyse', 'GEO-Sichtbarkeit', 'Security-Scan', 'Performance']

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#05080f',
                    padding: '64px 80px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Glow top-center */}
                <div
                    style={{
                        position: 'absolute',
                        top: -120,
                        left: '50%',
                        width: 700,
                        height: 500,
                        borderRadius: '50%',
                        background: 'radial-gradient(ellipse, rgba(124,58,237,0.25) 0%, transparent 65%)',
                        transform: 'translateX(-50%)',
                    }}
                />
                {/* Glow bottom-right */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: -80,
                        right: -80,
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        background: 'radial-gradient(ellipse, rgba(6,182,212,0.15) 0%, transparent 65%)',
                    }}
                />

                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 14,
                            background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 24,
                        }}
                    >
                        ⚡
                    </div>
                    <span style={{ fontSize: 30, fontWeight: 700, color: 'white', letterSpacing: '-0.5px' }}>
                        Audit<span style={{ color: '#a78bfa' }}>AI</span>
                    </span>
                </div>

                {/* Headline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, justifyContent: 'center' }}>
                    <div
                        style={{
                            fontSize: 62,
                            fontWeight: 800,
                            color: 'white',
                            lineHeight: 1.05,
                            letterSpacing: '-1.5px',
                        }}
                    >
                        Website prüfen:
                    </div>
                    <div
                        style={{
                            fontSize: 62,
                            fontWeight: 800,
                            lineHeight: 1.05,
                            letterSpacing: '-1.5px',
                            color: '#a78bfa',
                        }}
                    >
                        SEO, GEO, Performance
                    </div>
                    <div
                        style={{
                            fontSize: 62,
                            fontWeight: 800,
                            lineHeight: 1.05,
                            letterSpacing: '-1.5px',
                            color: 'white',
                        }}
                    >
                        & Security.
                    </div>
                    <div style={{ fontSize: 26, color: '#64748b', marginTop: 16, fontWeight: 400 }}>
                        Kostenloser KI-Audit in unter 60 Sekunden — sitecheckai.dev
                    </div>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: 12 }}>
                    {TAGS.map((tag) => (
                        <div
                            key={tag}
                            style={{
                                padding: '10px 22px',
                                borderRadius: 24,
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#94a3b8',
                                fontSize: 20,
                                fontWeight: 500,
                            }}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
        ),
        { ...size },
    )
}