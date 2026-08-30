import { Check, X, Lock } from 'lucide-react'

export const PLATFORM_META = {
    claude:     { label: 'Claude',             mono: 'C',   solid: '#d97757', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    chatgpt:    { label: 'ChatGPT',            mono: 'GPT', solid: '#74aa9c', color: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/20'  },
    perplexity: { label: 'Perplexity',         mono: 'P',   solid: '#20b8cd', color: 'text-teal-400',   bg: 'bg-teal-500/10',   border: 'border-teal-500/20'   },
    google_aio: { label: 'Google AI Overview', mono: 'G',   solid: '#4285f4', color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20'   },
}

export const ALL_PLATFORMS = ['claude', 'chatgpt', 'perplexity', 'google_aio']

export function PlatformIcon({ platform, size = 'md', locked = false }) {
    const meta = PLATFORM_META[platform]
    const dims = { sm: 'w-7 h-7 text-[10px]', md: 'w-9 h-9 text-xs', lg: 'w-12 h-12 text-sm' }[size]
    return (
        <div className={`relative shrink-0 ${dims} rounded-full flex items-center justify-center font-bold text-white`}
            style={{ background: locked ? '#334155' : meta.solid }}
        >
            {locked ? <Lock className="w-1/2 h-1/2 opacity-70" /> : meta.mono}
        </div>
    )
}

export function MentionBadge({ mentioned, labels = { yes: 'Ja', no: 'Nein' } }) {
    if (mentioned == null) return <span className="text-xs text-slate-600">—</span>
    return mentioned
        ? <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] bg-[var(--accent-soft)] border border-[var(--accent-border)] px-2 py-0.5 rounded-md"><Check className="w-3 h-3" />{labels.yes}</span>
        : <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-[var(--surface-08)] border border-[var(--border-subtle)] px-2 py-0.5 rounded-md"><X className="w-3 h-3 opacity-50" />{labels.no}</span>
}

export function SentimentBadge({ sentiment, labels = { positive: 'Positiv', neutral: 'Neutral', negative: 'Negativ' } }) {
    if (!sentiment) return null
    const meta = {
        positive: { label: labels.positive, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
        neutral:  { label: labels.neutral,  color: 'text-slate-400',   bg: 'bg-[var(--surface-08)]', border: 'border-[var(--border-subtle)]' },
        negative: { label: labels.negative, color: 'text-red-400',    bg: 'bg-red-500/10',   border: 'border-red-500/20' },
    }[sentiment]
    if (!meta) return null
    return (
        <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-md ${meta.color} ${meta.bg} border ${meta.border}`}>
            {meta.label}
        </span>
    )
}
