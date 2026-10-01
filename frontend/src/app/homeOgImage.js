import { OG, OgLogo, words } from './blog/ogImageTemplate'

const PLATFORMS = ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Google AI Overview']

// Homepage Open Graph image in the light site design; same headline as the hero.
export function homeOgImage({ headline, sub }) {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: OG.paper,
                padding: '64px 80px',
                fontFamily: 'Geist, system-ui, sans-serif',
                borderBottom: `14px solid ${OG.accent}`,
            }}
        >
            <OgLogo />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 66, fontWeight: 700, color: OG.ink, lineHeight: 1.08, maxWidth: 1000 }}>
                    {words(headline)}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 28, color: OG.body, fontWeight: 500, maxWidth: 940, lineHeight: 1.35 }}>{words(sub)}</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                {PLATFORMS.map(p => (
                    <div key={p} style={{ padding: '10px 18px', borderRadius: 999, background: '#ffffff', border: `1px solid ${OG.line}`, color: OG.body, fontSize: 20, fontWeight: 500 }}>
                        {p}
                    </div>
                ))}
            </div>
        </div>
    )
}
