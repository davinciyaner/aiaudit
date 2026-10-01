'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Globe, CheckCircle2, AlertCircle } from 'lucide-react'
import { COPY } from './content'

function normalizeUrl(input) {
    const trimmed = input.trim()
    if (!trimmed) return ''
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
    return 'https://' + trimmed
}

// The URL entry used by the hero and the closing CTA. Hands the URL to the dashboard via
// sessionStorage (pendingAuditUrl), which starts the audit there.
export default function AuditUrlForm({ locale = 'de', id, onDark = false }) {
    const c = COPY[locale].form
    const router = useRouter()
    const [url, setUrl] = useState('')
    const [touched, setTouched] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const normalized = normalizeUrl(url)
    const isEmpty = !url.trim()
    const showError = touched && isEmpty
    const showOk = touched && !isEmpty

    const handleSubmit = (e) => {
        e.preventDefault()
        if (submitting) return
        if (isEmpty) {
            setTouched(true)
            return
        }
        setSubmitting(true)
        sessionStorage.setItem('pendingAuditUrl', normalized)
        router.push(COPY[locale].dashboard)
    }

    const barState = showError
        ? 'border-(--danger)'
        : showOk
            ? 'border-(--success)'
            : 'border-(--line) focus-within:border-(--accent)'
    const hint = showError
        ? c.error
        : !isEmpty && !/^https?:/.test(url.trim())
            ? `${c.as} ${normalized}`
            : c.hint

    return (
        <form onSubmit={handleSubmit} noValidate className="w-full max-w-145 flex flex-col gap-2">
            <label htmlFor={id} className={`text-sm font-medium ${onDark ? 'text-[oklch(88%_0.015_262)]' : 'text-(--text-body)'}`}>
                {c.label}
            </label>
            <div className={`flex flex-col sm:flex-row sm:items-center gap-2 p-2 sm:p-1.5 rounded-[14px] bg-(--card) border transition-[border-color,box-shadow] duration-200 focus-within:shadow-[0_0_0_4px_var(--accent-ring)] ${onDark ? '' : 'shadow-card'} ${barState}`}>
                <span className={`hidden sm:inline-flex pl-2.5 ${showError ? 'text-(--danger)' : showOk ? 'text-(--success)' : 'text-(--text-muted)'}`} aria-hidden="true">
                    {showError ? <AlertCircle className="w-4.5 h-4.5" /> : showOk ? <CheckCircle2 className="w-4.5 h-4.5" /> : <Globe className="w-4.5 h-4.5" />}
                </span>
                <input
                    id={id}
                    type="text"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    onBlur={() => setTouched(true)}
                    disabled={submitting}
                    placeholder={c.placeholder}
                    aria-invalid={showError}
                    aria-describedby={`${id}-hint`}
                    className="flex-1 min-w-0 bg-transparent text-(--text-white) placeholder:text-(--text-muted) text-base outline-none px-2 py-3 disabled:opacity-60"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    inputMode="url"
                    spellCheck={false}
                />
                <button type="submit" disabled={submitting} aria-busy={submitting} className="btn-primary w-full sm:w-auto">
                    {submitting
                        ? <><span className="w-4 h-4 rounded-full border-2 border-(--on-accent)/30 border-t-(--on-accent) animate-spin" aria-hidden="true" /><span>{c.busy}</span></>
                        : <><span>{c.cta}</span><ArrowRight className="w-4 h-4" aria-hidden="true" /></>}
                </button>
            </div>
            <p id={`${id}-hint`} role={showError ? 'alert' : undefined}
                className={`text-sm mt-0.5 ${showError ? (onDark ? 'text-[oklch(78%_0.14_25)]' : 'text-(--danger)') : onDark ? 'text-[oklch(80%_0.02_262)]' : 'text-(--text-muted)'}`}>
                {hint}
            </p>
        </form>
    )
}
