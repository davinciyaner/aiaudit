'use client'
import { Toaster } from 'react-hot-toast'

// Single Toaster mounted once in the root layout — react-hot-toast renders every
// toast()/toast.success()/toast.error() call from anywhere in the app through this
// one instance, so styling it here (via theme tokens) covers every page in both
// light and dark mode instead of the ~30 near-duplicate <Toaster> blocks this replaced.
export default function AppToaster() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                style: {
                    background: 'var(--bg-surface)',
                    color: 'var(--text-white)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-card)',
                    fontSize: '14px',
                    maxWidth: 'calc(100vw - 2rem)',
                },
                success: {
                    iconTheme: { primary: 'var(--success)', secondary: 'var(--bg-surface)' },
                },
                error: {
                    iconTheme: { primary: 'var(--danger)', secondary: 'var(--bg-surface)' },
                },
            }}
        />
    )
}
