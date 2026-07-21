export function blogOgImage(title, tag) {
    return (
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
            <div
                style={{
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    fontSize: 50,
                    fontWeight: 800,
                    color: 'white',
                    lineHeight: 1.15,
                    letterSpacing: '-1px',
                    maxWidth: 1040,
                }}
            >
                {title}
            </div>

            {/* Footer row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {tag && (
                    <div
                        style={{
                            padding: '10px 22px',
                            borderRadius: 24,
                            background: 'rgba(124,58,237,0.12)',
                            border: '1px solid rgba(124,58,237,0.3)',
                            color: '#c4b5fd',
                            fontSize: 20,
                            fontWeight: 600,
                        }}
                    >
                        {tag}
                    </div>
                )}
                <div style={{ fontSize: 20, color: '#64748b', fontWeight: 400 }}>
                    sitecheckai.dev/blog
                </div>
            </div>
        </div>
    )
}