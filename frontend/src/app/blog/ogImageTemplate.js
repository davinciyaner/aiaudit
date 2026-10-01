// Brand colors from globals.css (light theme), converted from OKLCH to hex because
// next/og (Satori) does not support oklch().
export const OG = {
    paper: '#f8fafc',  // --bg-base
    tint: '#ebf1fc',   // --tint
    line: '#dadee6',   // --line
    ink: '#101828',    // --text-white (strongest ink)
    body: '#384050',   // --text-body
    muted: '#545b69',  // --text-muted
    accent: '#1554cf', // --accent
    accentInk: '#0643b5',
}

// Geist (the site font) for OG images. Satori only ships a regular-weight default font,
// so headlines would not render bold without this. Falls back to the default font if the
// download fails, so a build never breaks on it.
async function loadFont(weight) {
    try {
        const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Geist:wght@${weight}`)).text()
        const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
        if (!src) return null
        return { name: 'Geist', data: await (await fetch(src)).arrayBuffer(), weight, style: 'normal' }
    } catch {
        return null
    }
}

export async function ogFonts() {
    return (await Promise.all([loadFont(500), loadFont(700)])).filter(Boolean)
}

// Satori spaces words unevenly in wrapped text; laying words out as flex items with a
// fixed gap keeps the spacing even.
export function words(text, gap = '0.26em') {
    return text.split(' ').map((w, i) => <span key={i} style={{ marginRight: gap }}>{w}</span>)
}

export function OgLogo() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: OG.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="30" height="30" viewBox="0 0 192 192" fill="none">
                    <circle cx="96" cy="96" r="50" stroke={OG.paper} strokeWidth="14" />
                    <circle cx="110" cy="82" r="13" fill={OG.paper} />
                </svg>
            </div>
            <span style={{ fontSize: 30, fontWeight: 700, color: OG.ink, letterSpacing: '-0.5px' }}>Scanora</span>
        </div>
    )
}

// Shared Open Graph image for articles, comparisons and solution pages.
export function blogOgImage(title, tag) {
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

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flex: 1,
                    alignItems: 'center',
                    alignContent: 'center',
                    fontSize: 54,
                    fontWeight: 700,
                    color: OG.ink,
                    lineHeight: 1.1,
                    maxWidth: 1040,
                }}
            >
                {words(title)}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {tag && (
                    <div style={{ padding: '10px 20px', borderRadius: 999, background: OG.tint, color: OG.accentInk, fontSize: 20, fontWeight: 600 }}>
                        {tag}
                    </div>
                )}
                <div style={{ fontSize: 20, color: OG.muted, fontWeight: 500 }}>scanora.ai</div>
            </div>
        </div>
    )
}
