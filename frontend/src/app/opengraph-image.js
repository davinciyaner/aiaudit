import { ImageResponse } from 'next/og'

export const alt = 'Scanora – SEO- & GEO-Monitoring: KI-Sichtbarkeit (AI Visibility) und Google-Rankings tracken'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Echte Marken-Farben aus globals.css (--bg-base, --accent, --text-white, --text-muted),
// von OKLCH nach Hex konvertiert — next/og (Satori) unterstuetzt kein oklch().
const BG_BASE = '#030712'
const ACCENT = '#19a5e8'
const TEXT_WHITE = '#f3f5f9'
const TEXT_MUTED = '#8b939f'

const TAGS = ['AI Visibility', 'SEO-Tracking', 'Konkurrenzanalyse', 'KI-Zitate']

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
                    background: BG_BASE,
                    padding: '64px 80px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Einzelner Accent-Glow oben mittig — wie im echten Hero, kein Zwei-Farben-Verlauf */}
                <div
                    style={{
                        position: 'absolute',
                        top: -160,
                        left: '50%',
                        width: 900,
                        height: 500,
                        borderRadius: '50%',
                        background: 'radial-gradient(ellipse, rgba(25,165,232,0.18) 0%, transparent 70%)',
                        transform: 'translateX(-50%)',
                    }}
                />

                {/* Logo — identisch zum echten Navbar-Icon (Kreis + versetzter Punkt) auf Accent-Flaeche */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 14,
                            background: ACCENT,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 192 192" fill="none">
                            <circle cx="96" cy="96" r="50" stroke={BG_BASE} strokeWidth="14" />
                            <circle cx="110" cy="82" r="13" fill={BG_BASE} />
                        </svg>
                    </div>
                    <span style={{ fontSize: 30, fontWeight: 700, color: TEXT_WHITE, letterSpacing: '-0.5px' }}>
                        Scanora
                    </span>
                </div>

                {/* Headline — einheitliche Farbe, keine Zweifarbigkeit */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, justifyContent: 'center' }}>
                    <div
                        style={{
                            fontSize: 62,
                            fontWeight: 800,
                            color: TEXT_WHITE,
                            lineHeight: 1.05,
                            letterSpacing: '-1.5px',
                        }}
                    >
                        AI Visibility & SEO
                    </div>
                    <div
                        style={{
                            fontSize: 62,
                            fontWeight: 800,
                            lineHeight: 1.05,
                            letterSpacing: '-1.5px',
                            color: TEXT_WHITE,
                        }}
                    >
                        Google kennt dich –
                    </div>
                    <div
                        style={{
                            fontSize: 62,
                            fontWeight: 800,
                            lineHeight: 1.05,
                            letterSpacing: '-1.5px',
                            color: TEXT_WHITE,
                        }}
                    >
                        KI auch?
                    </div>
                    <div style={{ fontSize: 26, color: TEXT_MUTED, marginTop: 16, fontWeight: 400 }}>
                        SEO- & GEO-Monitoring, wöchentlich automatisch — scanora.ai
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
                                color: TEXT_MUTED,
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
