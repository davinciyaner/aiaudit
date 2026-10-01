'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function AdminLoginPage() {
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await fetch('/api/admin-auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            router.push('/support/admin')
        } catch (err) {
            setError(err.message || 'Fehler beim Login.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-(--bg-base) flex items-center justify-center px-5">
            <div className="w-full max-w-sm">
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-(--accent) flex items-center justify-center">
                        <svg className="w-4 h-4 text-(--text-white)" viewBox="0 0 192 192" fill="none"><circle cx="96" cy="96" r="50" stroke="currentColor" strokeWidth="14" /><circle cx="110" cy="82" r="13" fill="currentColor" /></svg>
                    </div>
                    <span className="font-bold text-(--text-white)">
                        Scanora
                    </span>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-(--bg-base) border border-(--line) rounded-2xl p-6 space-y-4"
                >
                    <div className="flex items-center gap-2 mb-1">
                        <Lock className="w-4 h-4 text-(--text-faint)" />
                        <p className="text-(--text-white) font-semibold">Admin-Zugang</p>
                    </div>
                    <p className="text-xs text-(--text-faint)">Nur für autorisierte Nutzer.</p>

                    <input
                        type="password"
                        value={token}
                        onChange={e => setToken(e.target.value)}
                        placeholder="Admin-Token eingeben"
                        required
                        autoFocus
                        className="w-full bg-(--card) border border-(--line) rounded-xl px-4 py-2.5 text-sm text-(--text-white) placeholder-(--text-faint) outline-none focus:border-(--accent) focus:shadow-[0_0_0_4px_var(--accent-ring)] transition-colors"
                    />

                    {error && (
                        <p className="text-xs text-(--danger) bg-(--danger-soft) border border-(--danger-border) rounded-xl px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-(--accent) hover:bg-(--accent-hover) disabled:opacity-50 text-(--on-accent) text-sm font-semibold rounded-xl transition-all"
                    >
                        {loading ? 'Wird geprüft...' : 'Einloggen'}
                    </button>
                </form>
            </div>
        </div>
    )
}