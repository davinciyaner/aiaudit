'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, LogIn, AlertCircle } from 'lucide-react'

// Diese Seite wird von der Chrome Extension geöffnet.
// Sie liest den JWT aus localStorage und sendet ihn via postMessage an die Extension.
// Die Extension schließt den Tab danach automatisch.

export default function ExtensionAuthPage() {
    const [status, setStatus] = useState('loading') // loading | connected | login | error

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userRaw = localStorage.getItem('user')

        if (!token) { setStatus('login'); return }

        let email = ''
        try { email = JSON.parse(userRaw)?.email || '' } catch {}

        // Mehrfach senden damit der Content Script sicher bereit ist
        const send = () => window.postMessage({ type: 'SITECHECK_EXT_AUTH', token, email }, '*')
        send()
        const t1 = setTimeout(send, 500)
        const t2 = setTimeout(send, 1200)
        setStatus('connected')

        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [])

    return (
        <div className="min-h-screen bg-(--bg-base) flex items-center justify-center p-6">
            <div className="w-full max-w-sm">

                {/* Logo */}
                <div className="flex items-center justify-center gap-2.5 mb-8">
                    <div className="w-9 h-9 rounded-xl bg-(--text-white) flex items-center justify-center">
                        <svg className="w-4.5 h-4.5 text-(--text-white)" viewBox="0 0 192 192" fill="none"><circle cx="96" cy="96" r="50" stroke="currentColor" strokeWidth="14" /><circle cx="110" cy="82" r="13" fill="currentColor" /></svg>
                    </div>
                    <span className="text-xl font-bold text-(--text-white) tracking-tight">
                        Scanora
                    </span>
                </div>

                {/* Loading */}
                {status === 'loading' && (
                    <div className="text-center">
                        <div className="w-8 h-8 border-2 border-(--accent-border) border-t-violet-500 rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-(--text-muted) text-sm">Verbindung wird hergestellt…</p>
                    </div>
                )}

                {/* Verbunden */}
                {status === 'connected' && (
                    <div className="bg-(--card) border border-(--line) rounded-2xl p-8 text-center">
                        <div className="w-14 h-14 rounded-full bg-(--success-soft) border border-(--success-border) flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-7 h-7 text-(--success)" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-xl font-bold text-(--text-white) mb-2">Verbunden!</h1>
                        <p className="text-(--text-muted) text-sm leading-relaxed">
                            Die Extension ist jetzt mit deinem Account verbunden.<br />
                            Dieser Tab schließt sich in Kürze automatisch.
                        </p>
                        <div className="mt-6 flex justify-center gap-1.5">
                            {[0, 1, 2].map(i => (
                                <span key={i} className="w-1.5 h-1.5 rounded-full bg-(--accent) opacity-60"
                                      style={{ animation: `pulse 1.2s ${i * 0.2}s infinite` }} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Nicht eingeloggt */}
                {status === 'login' && (
                    <div className="bg-(--card) border border-(--line) rounded-2xl p-8 text-center">
                        <div className="w-14 h-14 rounded-full bg-(--accent-soft) border border-(--accent-border) flex items-center justify-center mx-auto mb-4">
                            <LogIn className="w-7 h-7 text-(--accent-ink)" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-xl font-bold text-(--text-white) mb-2">Noch nicht eingeloggt</h1>
                        <p className="text-(--text-muted) text-sm leading-relaxed mb-6">
                            Logge dich zuerst auf Scanora ein. Danach öffne die Extension erneut - sie verbindet sich automatisch.
                        </p>
                        <a
                            href="/login"
                            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-(--accent) hover:bg-(--accent) hover:text-(--on-accent) font-semibold text-sm transition-all shadow-lg shadow-(--accent-border)"
                        >
                            Jetzt einloggen
                        </a>
                        <p className="mt-4 text-xs text-(--text-faint)">
                            Kein Account?{' '}
                            <a href="/register" className="text-(--accent-ink) hover:text-(--accent-ink) transition-colors">
                                Keine Registrierung nötig
                            </a>
                        </p>
                    </div>
                )}

                {/* Fehler */}
                {status === 'error' && (
                    <div className="bg-(--card) border border-(--danger-border) rounded-2xl p-8 text-center">
                        <div className="w-14 h-14 rounded-full bg-(--danger-soft) border border-(--danger-border) flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-7 h-7 text-(--danger)" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-xl font-bold text-(--text-white) mb-2">Verbindung fehlgeschlagen</h1>
                        <p className="text-(--text-muted) text-sm">
                            Bitte lade die Seite neu oder öffne die Extension erneut.
                        </p>
                    </div>
                )}

            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.4; transform: scale(0.9); }
                    50%       { opacity: 1;   transform: scale(1.1); }
                }
            `}</style>
        </div>
    )
}