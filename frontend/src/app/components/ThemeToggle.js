'use client'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { t } from '@/lib/i18n/dictionaries'

// Reads/writes the .light class on <html> directly (see the blocking script in
// app/layout.js that applies it before first paint) instead of any state library —
// there's exactly one source of truth for the theme, the DOM class itself.
export default function ThemeToggle({ locale = 'de', className = '' }) {
    const [isLight, setIsLight] = useState(false)

    useEffect(() => {
        setIsLight(document.documentElement.classList.contains('light'))
    }, [])

    const toggle = () => {
        const next = !isLight
        document.documentElement.classList.toggle('light', next)
        try {
            localStorage.setItem('scanora-theme', next ? 'light' : 'dark')
        } catch (e) {}
        setIsLight(next)
    }

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={t(locale, isLight ? 'nav.themeToDark' : 'nav.themeToLight')}
            title={t(locale, isLight ? 'nav.themeToDark' : 'nav.themeToLight')}
            className={`flex items-center justify-center w-9 h-9 shrink-0 rounded-lg text-[var(--text-faint)] hover:text-[var(--text-white)] hover:bg-[var(--surface-06)] transition-colors ${className}`}
        >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
    )
}
