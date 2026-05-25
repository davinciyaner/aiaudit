'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Zap, Lock } from 'lucide-react'

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
        <div className="min-h-screen bg-[#080b14] flex items-center justify-center px-5">
            <div className="w-full max-w-sm">
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-white">
                        Audit<span className="text-cyan-400">AI</span>
                    </span>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 space-y-4"
                >
                    <div className="flex items-center gap-2 mb-1">
                        <Lock className="w-4 h-4 text-slate-500" />
                        <p className="text-white font-semibold">Admin-Zugang</p>
                    </div>
                    <p className="text-xs text-slate-500">Nur für autorisierte Nutzer.</p>

                    <input
                        type="password"
                        value={token}
                        onChange={e => setToken(e.target.value)}
                        placeholder="Admin-Token eingeben"
                        required
                        autoFocus
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500/50 transition-colors"
                    />

                    {error && (
                        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-all"
                    >
                        {loading ? 'Wird geprüft...' : 'Einloggen'}
                    </button>
                </form>
            </div>
        </div>
    )
}