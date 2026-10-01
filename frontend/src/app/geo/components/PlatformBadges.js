import { Check, X, Lock } from 'lucide-react'

export const PLATFORM_META = {
    claude: { label: 'Claude', mono: 'C', solid: '#d97757', color: 'text-(--accent-ink)', bg: 'bg-(--accent-soft)', border: 'border-(--accent-border)' },
    chatgpt: { label: 'ChatGPT', mono: 'GPT', solid: '#74aa9c', color: 'text-(--success)', bg: 'bg-(--success-soft)', border: 'border-(--success-border)' },
    perplexity: { label: 'Perplexity', mono: 'P', solid: '#20b8cd', color: 'text-(--success)', bg: 'bg-(--success-soft)', border: 'border-(--success-border)' },
    google_aio: { label: 'Google AI Overview', mono: 'G', solid: '#4285f4', color: 'text-(--accent-ink)', bg: 'bg-(--accent-soft)', border: 'border-(--accent-border)' },
}

export const ALL_PLATFORMS = ['claude', 'chatgpt', 'perplexity', 'google_aio']

export function PlatformIcon({ platform, size = 'md', locked = false }) {
    const meta = PLATFORM_META[platform]
    const dims = { sm: 'w-7 h-7 text-[10px]', md: 'w-9 h-9 text-xs', lg: 'w-12 h-12 text-sm' }[size]
    return (
        <div className={`relative shrink-0 ${dims} rounded-full flex items-center justify-center font-bold ${locked ? 'text-(--text-white)' : 'text-[#0f1117]'}`}
            style={{ background: locked ? 'var(--border-strong)' : meta.solid }}
        >
            {locked ? <Lock className="w-1/2 h-1/2 opacity-70" /> : meta.mono}
        </div>
    )
}

export function MentionBadge({ mentioned, labels = { yes: 'Ja', no: 'Nein' } }) {
    if (mentioned == null) return <span className="text-xs text-(--text-faint)">-</span>
    return mentioned
        ? <span className="inline-flex items-center gap-1 text-xs font-semibold text-(--accent-ink) bg-(--accent-soft) border border-(--accent-border) px-2 py-0.5 rounded-md"><Check className="w-3 h-3" />{labels.yes}</span>
        : <span className="inline-flex items-center gap-1 text-xs font-semibold text-(--text-faint) bg-(--surface-08) border border-(--border-subtle) px-2 py-0.5 rounded-md"><X className="w-3 h-3 opacity-50" />{labels.no}</span>
}

export function SentimentBadge({ sentiment, labels = { positive: 'Positiv', neutral: 'Neutral', negative: 'Negativ' } }) {
    if (!sentiment) return null
    const meta = {
        positive: { label: labels.positive, color: 'text-(--success)', bg: 'bg-(--success-soft)', border: 'border-(--success-border)' },
        neutral:  { label: labels.neutral,  color: 'text-(--text-muted)',   bg: 'bg-(--surface-08)', border: 'border-(--border-subtle)' },
        negative: { label: labels.negative, color: 'text-(--danger)',    bg: 'bg-(--danger-soft)',   border: 'border-(--danger-border)' },
    }[sentiment]
    if (!meta) return null
    return (
        <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-md ${meta.color} ${meta.bg} border ${meta.border}`}>
            {meta.label}
        </span>
    )
}
