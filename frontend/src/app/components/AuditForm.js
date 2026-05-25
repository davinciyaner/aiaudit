'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Globe } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AuditForm({ onAuditStart, onAuditComplete }) {
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!url.trim()) return toast.error('Bitte eine URL eingeben')
        let auditUrl = url.trim()
        if (!auditUrl.startsWith('http')) auditUrl = 'https://' + auditUrl
        setLoading(true)
        onAuditStart?.(auditUrl)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/audit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: auditUrl })
            })
            if (res.status === 429) {
                onAuditComplete?.({ limitReached: true })
                return
            }
            if (!res.ok) throw new Error('Audit fehlgeschlagen')
            const data = await res.json()
            onAuditComplete?.(data)
            toast.success('Audit abgeschlossen!')
        } catch (err) {
            toast.error(err.message || 'Fehler beim Audit')
            onAuditComplete?.(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="relative flex items-center gap-3 p-2 bg-white/[0.03] border border-white/10 rounded-2xl focus-within:border-violet-500/50 focus-within:bg-white/[0.05] transition-all duration-200 shadow-xl shadow-black/20">
                <div className="flex items-center gap-3 flex-1 px-3">
                    <Globe className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <input
                        type="text" value={url} onChange={e => setUrl(e.target.value)}
                        placeholder="https://yourwebsite.com"
                        className="flex-1 bg-transparent text-white placeholder-slate-600 text-sm outline-none py-2"
                        disabled={loading}
                    />
                </div>
                <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.97 }}
                               className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20 flex-shrink-0">
                    {loading ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Analysiert...</>
                    ) : (
                        <><Search className="w-4 h-4" />Jetzt auditieren<ArrowRight className="w-3.5 h-3.5" /></>
                    )}
                </motion.button>
            </div>
            <p className="text-xs text-slate-600 text-center mt-3">Kostenlos · Kein Account nötig · Ergebnis in ~60 Sekunden</p>
        </form>
    )
}