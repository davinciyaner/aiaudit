'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Menu, X, LogOut, User, ChevronDown,
    LayoutDashboard, Search, Globe, BookOpen, CreditCard, TrendingUp,
    Layers, Wallet, Bot,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { t } from '@/lib/i18n/dictionaries'
import { getCounterpart } from '@/lib/i18n/routeMap'
import ThemeToggle from './ThemeToggle'

const NAV_ITEMS_DE = [
    {
        key: 'seo',
        label: 'SEO',
        items: [
            { icon: Search, label: 'Einmal-Audit', desc: 'SEO-Score & Fehler aufdecken', href: '/dashboard' },
            { icon: TrendingUp, label: 'SEO Automatisierung', desc: 'Wöchentliche Google-Rankings', href: '/seo/dashboard', accent: true },
            { icon: CreditCard, label: 'Tracking Preise', desc: '3 Pläne ab 29,99€/Monat', href: '/seo/pricing' },
            { icon: BookOpen, label: 'SEO-Fehler vermeiden', desc: 'Leitfaden aus der Praxis', href: '/blog/seo-test-haeufige-fehler' },
        ],
    },
    {
        key: 'geo',
        label: 'GEO',
        items: [
            { icon: Globe, label: 'GEO Automatisierung', desc: 'KI-Erwähnungen tracken', href: '/geo/dashboard', accent: true },
            { icon: CreditCard, label: 'GEO Preise', desc: '3 Pläne ab 4,99€/Monat', href: '/geo/pricing' },
            { icon: BookOpen, label: 'GEO-Optimierung 2026', desc: 'Tipps für KI-Suchen', href: '/blog/geo-optimierung-2026' },
        ],
    },
    { key: 'preise', label: 'Preise', href: '/pricing' },
    {
        key: 'loesungen',
        label: 'Lösungen',
        items: [
            { icon: Layers, label: 'SEO + GEO Tool', desc: 'Rankings & KI-Sichtbarkeit in 1 Dashboard', href: '/loesungen/seo-geo-tool', accent: true },
            { icon: Wallet, label: 'Günstiges KI-Sichtbarkeit Tool', desc: 'SEO + AI Visibility in einem Abo', href: '/loesungen/guenstiges-ki-sichtbarkeit-tool' },
            { icon: Bot, label: 'Claude AI Sichtbarkeit tracken', desc: 'Empfiehlt dich Claude?', href: '/loesungen/claude-ai-sichtbarkeit-tracken' },
        ],
    },
    { key: 'blog', label: 'Blog', href: '/blog' },
]

const NAV_ITEMS_EN = [
    {
        key: 'seo',
        label: 'SEO',
        items: [
            { icon: Search, label: 'One-Time Audit', desc: 'Uncover SEO score & issues', href: '/en/dashboard' },
            { icon: TrendingUp, label: 'SEO Automation', desc: 'Weekly Google rankings', href: '/en/seo/dashboard', accent: true },
            { icon: CreditCard, label: 'Tracking Pricing', desc: '3 plans from €29.99/month', href: '/en/seo/pricing' },
            { icon: BookOpen, label: 'Avoid SEO mistakes', desc: 'A practical guide', href: '/en/blog/common-seo-mistakes' },
        ],
    },
    {
        key: 'geo',
        label: 'GEO',
        items: [
            { icon: Globe, label: 'GEO Automation', desc: 'Track AI mentions', href: '/en/geo/dashboard', accent: true },
            { icon: CreditCard, label: 'GEO Pricing', desc: '3 plans from €4.99/month', href: '/en/geo/pricing' },
            { icon: BookOpen, label: 'GEO Optimization 2026', desc: 'Tips for AI search', href: '/en/blog/what-is-geo' },
        ],
    },
    { key: 'preise', label: 'Pricing', href: '/en/pricing' },
    { key: 'blog', label: 'Blog', href: '/en/blog' },
]

function NavDropdown({ item, isOpen, onOpen, onClose }) {
    const closeTimer = useRef(null)
    const triggerRef = useRef(null)
    const panelRef = useRef(null)

    const handleMouseEnter = () => {
        clearTimeout(closeTimer.current)
        onOpen()
    }
    const handleMouseLeave = () => {
        closeTimer.current = setTimeout(onClose, 120)
    }

    // Dropdown Design: full keyboard control - Arrow Down opens and enters the menu,
    // Arrow Up/Down cycles items, Escape closes and returns focus to the trigger.
    const handleTriggerKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            onOpen()
            requestAnimationFrame(() => panelRef.current?.querySelector('a')?.focus())
        }
    }
    const handlePanelKeyDown = (e) => {
        const items = Array.from(panelRef.current?.querySelectorAll('a') ?? [])
        const i = items.indexOf(document.activeElement)
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            ;(items[i + 1] ?? items[0])?.focus()
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            ;(items[i - 1] ?? items[items.length - 1])?.focus()
        } else if (e.key === 'Escape') {
            e.preventDefault()
            onClose()
            triggerRef.current?.focus()
        }
    }

    return (
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button
                ref={triggerRef}
                onClick={() => (isOpen ? onClose() : onOpen())}
                onKeyDown={handleTriggerKeyDown}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-controls={`navdrop-${item.key}`}
                className={`flex items-center gap-1 px-3 py-2 min-h-11 text-sm font-medium rounded-[10px] transition-colors ${
                isOpen ? 'text-(--text-white) bg-(--tint)' : 'text-(--text-body) hover:text-(--text-white) hover:bg-(--tint)'
            }`}>
                {item.label}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={panelRef}
                        id={`navdrop-${item.key}`}
                        role="menu"
                        onKeyDown={handlePanelKeyDown}
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-(--card) border border-(--line) rounded-2xl shadow-card-hover overflow-hidden"
                    >
                        <div className="p-1.5 space-y-0.5">
                            {item.items.map(sub => {
                                const a = !!sub.accent
                                const hoverBg   = a ? 'hover:bg-(--accent-soft)' : 'hover:bg-(--surface-06)'
                                const iconBg    = a ? 'bg-(--accent-soft)' : 'bg-(--surface-06) group-hover:bg-(--surface-08)'
                                const iconColor = a ? 'text-(--accent-ink)' : 'text-(--text-muted)'
                                const textColor = a ? 'text-(--accent-ink)' : 'text-(--text-body) group-hover:text-(--text-white)'
                                return (
                                <Link key={sub.href} href={sub.href} onClick={onClose}
                                    className={`flex items-start gap-3 px-3 py-2.5 rounded-lg transition-all group ${hoverBg}`}
                                >
                                    <div className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
                                        <sub.icon className={`w-3.5 h-3.5 ${iconColor}`} />
                                    </div>
                                    <div>
                                        <div className={`text-sm font-medium ${textColor} transition-colors`}>
                                            {sub.label}
                                        </div>
                                        <div className="text-xs text-(--text-faint) mt-0.5">{sub.desc}</div>
                                    </div>
                                </Link>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function MobileAccordion({ item, isOpen, onToggle, onClose }) {
    return (
        <div>
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-4 py-3 text-sm text-(--text-white) rounded-lg hover:bg-(--surface-06) transition-all"
            >
                {item.label}
                <ChevronDown className={`w-4 h-4 text-(--text-faint) transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="pl-4 pb-1 space-y-0.5">
                            {item.items.map(sub => {
                                const cls = sub.accent
                                    ? 'text-(--accent-ink) hover:bg-(--accent-soft)'
                                    : 'text-(--text-muted) hover:text-(--text-white) hover:bg-(--surface-06)'
                                return (
                                <Link key={sub.href} href={sub.href} onClick={onClose}
                                    className={`flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg transition-all ${cls}`}
                                >
                                    <sub.icon className="w-3.5 h-3.5 shrink-0" />
                                    {sub.label}
                                </Link>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function Navbar({ locale = 'de' }) {
    const NAV_ITEMS = locale === 'en' ? NAV_ITEMS_EN : NAV_ITEMS_DE
    const [mobileOpen, setMobileOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [userDropdownOpen, setUserDropdownOpen] = useState(false)
    const [activeNav, setActiveNav] = useState(null)
    const [mobileExpanded, setMobileExpanded] = useState(null)
    const userDropdownRef = useRef(null)
    const router = useRouter()
    const pathname = usePathname()
    const counterpart = getCounterpart(pathname, locale)

    useEffect(() => {
        const stored = localStorage.getItem('user')
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                if (!parsed.name && parsed.email) parsed.name = parsed.email.split('@')[0]
                setUser(parsed)
            } catch (e) {}
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
                setUserDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        setUserDropdownOpen(false)
        router.push('/')
    }

    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : '?'

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-50 bg-(--bg-base)/90 backdrop-blur-xl border-b border-(--line-soft)"
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link href={locale === 'en' ? '/en' : '/'} className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-lg bg-(--text-white) flex items-center justify-center">
                            <svg className="w-4 h-4 text-(--bg-base)" viewBox="0 0 192 192" fill="none">
                                <circle cx="96" cy="96" r="50" stroke="currentColor" strokeWidth="14" />
                                <circle cx="110" cy="82" r="13" fill="currentColor" />
                            </svg>
                        </div>
                        <span className="font-bold text-(--text-white) text-lg tracking-tight">
                            Scanora
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_ITEMS.map(item =>
                            item.items ? (
                                <NavDropdown
                                    key={item.key}
                                    item={item}
                                    isOpen={activeNav === item.key}
                                    onOpen={() => setActiveNav(item.key)}
                                    onClose={() => setActiveNav(null)}
                                />
                            ) : (
                                <Link key={item.key} href={item.href}
                                    className="px-3 py-2 min-h-11 inline-flex items-center text-sm font-medium text-(--text-body) hover:text-(--text-white) rounded-[10px] hover:bg-(--tint) transition-colors">
                                    {item.label}
                                </Link>
                            )
                        )}
                    </div>

                    {/* Desktop Right */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <div className="relative" ref={userDropdownRef}>
                                <button
                                    onClick={() => setUserDropdownOpen(prev => !prev)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-(--surface-06) transition-all group"
                                >
                                    <div className="w-7 h-7 rounded-full bg-(--text-white) flex items-center justify-center text-(--bg-base) text-xs font-bold shrink-0">
                                        {initials}
                                    </div>
                                    <span className="text-sm text-(--text-body) font-medium group-hover:text-(--text-white) transition-colors">
                                        {user.name}
                                    </span>
                                    <ChevronDown className={`w-3.5 h-3.5 text-(--text-faint) transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {userDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 6, scale: 0.97 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 top-full mt-2 w-56 bg-(--card) border border-(--line) rounded-2xl shadow-card-hover overflow-hidden"
                                        >
                                            <div className="px-3 py-2.5 border-b border-(--border-subtle)">
                                                <div className="text-xs text-(--text-faint) truncate">{user.email}</div>
                                            </div>
                            <div className="p-1.5 space-y-0.5">
                                                <Link href={locale === 'en' ? '/en/dashboard' : '/dashboard'} onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-(--text-body) hover:text-(--text-white) hover:bg-(--surface-06) rounded-lg transition-all">
                                                    <LayoutDashboard className="w-3.5 h-3.5 text-(--text-faint)" /> <span>{t(locale, 'nav.dashboard')}</span>
                                                </Link>
                                                <Link href={locale === 'en' ? '/en/profile' : '/profile'} onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-(--text-body) hover:text-(--text-white) hover:bg-(--surface-06) rounded-lg transition-all">
                                                    <User className="w-3.5 h-3.5 text-(--text-faint)" /> <span>{t(locale, 'nav.profile')}</span>
                                                </Link>
                                                <div className="my-1 border-t border-(--border-subtle)" />
                                                <p className="px-3 pt-1 pb-0.5 text-xs text-(--text-muted) font-semibold ">{t(locale, 'nav.seoAutomatisierung')}</p>
                                                <Link href={locale === 'en' ? '/en/seo/dashboard' : '/seo/dashboard'} onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-(--text-body) hover:text-(--text-white) hover:bg-(--surface-06) rounded-lg transition-all">
                                                    <TrendingUp className="w-3.5 h-3.5 text-(--accent-ink)" /> <span>{t(locale, 'nav.rankings')}</span>
                                                </Link>
                                                <Link href={locale === 'en' ? '/en/seo/pricing' : '/seo/pricing'} onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-(--text-body) hover:text-(--text-white) hover:bg-(--surface-06) rounded-lg transition-all">
                                                    <CreditCard className="w-3.5 h-3.5 text-(--text-faint)" /> <span>{t(locale, 'nav.trackingPreise')}</span>
                                                </Link>
                                                <div className="my-1 border-t border-(--border-subtle)" />
                                                <p className="px-3 pt-1 pb-0.5 text-xs text-(--text-muted) font-semibold ">{t(locale, 'nav.geoAutomatisierung')}</p>
                                                <Link href={locale === 'en' ? '/en/geo/dashboard' : '/geo/dashboard'} onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-(--text-body) hover:text-(--text-white) hover:bg-(--surface-06) rounded-lg transition-all">
                                                    <Globe className="w-3.5 h-3.5 text-(--accent-ink)" /> <span>{t(locale, 'nav.kiTracking')}</span>
                                                </Link>
                                                <Link href={locale === 'en' ? '/en/geo/pricing' : '/geo/pricing'} onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-(--text-body) hover:text-(--text-white) hover:bg-(--surface-06) rounded-lg transition-all">
                                                    <CreditCard className="w-3.5 h-3.5 text-(--text-faint)" /> <span>{t(locale, 'nav.geoPreise')}</span>
                                                </Link>
                                                <div className="my-1 border-t border-(--border-subtle)" />
                                                <button onClick={handleLogout}
                                                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-(--text-muted) hover:text-(--danger) hover:bg-(--danger-soft) rounded-lg transition-all">
                                                    <LogOut className="w-3.5 h-3.5" /> <span>{t(locale, 'nav.logout')}</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link href={locale === 'en' ? '/en/login' : '/login'} className="px-3 py-2 text-sm font-medium text-(--text-body) hover:text-(--text-white) rounded-[10px] hover:bg-(--tint) transition-colors">
                                {t(locale, 'nav.login')}
                            </Link>
                        )}
                        <Link href={locale === 'en' ? '/en/dashboard' : '/dashboard'}
                            className="btn-primary btn-sm">
                            <span>{t(locale, 'nav.cta')}</span>
                        </Link>
                        {counterpart && (
                            <Link href={counterpart}
                                className="px-2.5 py-1.5 text-xs font-semibold text-(--text-muted) hover:text-(--text-white) border border-(--line) rounded-[10px] transition-colors">
                                {locale === 'en' ? 'DE' : 'EN'}
                            </Link>
                        )}
                        <ThemeToggle locale={locale} />
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-3 -mr-1 text-(--text-muted) hover:text-(--text-white)"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label={mobileOpen ? (locale === 'en' ? 'Close menu' : 'Menü schließen') : (locale === 'en' ? 'Open menu' : 'Menü öffnen')}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-nav-menu"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        id="mobile-nav-menu"
                        className="fixed top-16 left-0 right-0 z-40 bg-(--bg-base) border-b border-(--line) p-4 space-y-1 max-h-[calc(100dvh-4rem)] overflow-y-auto"
                    >
                        {NAV_ITEMS.map(item =>
                            item.items ? (
                                <MobileAccordion
                                    key={item.key}
                                    item={item}
                                    isOpen={mobileExpanded === item.key}
                                    onToggle={() => setMobileExpanded(prev => prev === item.key ? null : item.key)}
                                    onClose={() => { setMobileExpanded(null); setMobileOpen(false) }}
                                />
                            ) : (
                                <Link key={item.key} href={item.href} onClick={() => setMobileOpen(false)}
                                    className="block px-4 py-3 text-sm text-(--text-body) hover:text-(--text-white) rounded-lg hover:bg-(--surface-06) transition-all">
                                    {item.label}
                                </Link>
                            )
                        )}

                        <div className="border-t border-(--border-subtle) my-1" />

                        {user ? (
                            <>
                                <Link href={locale === 'en' ? '/en/dashboard' : '/dashboard'} onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2 px-4 py-3 text-sm text-(--text-body) hover:text-(--text-white) rounded-lg hover:bg-(--surface-06) transition-all">
                                    <LayoutDashboard className="w-4 h-4 text-(--text-faint)" /> <span>{t(locale, 'nav.dashboard')}</span>
                                </Link>
                                <Link href={locale === 'en' ? '/en/profile' : '/profile'} onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2 px-4 py-3 text-sm text-(--text-body) hover:text-(--text-white) rounded-lg hover:bg-(--surface-06) transition-all">
                                    <User className="w-4 h-4 text-(--text-faint)" /> <span>{t(locale, 'nav.profile')}</span>
                                </Link>
                                <Link href={locale === 'en' ? '/en/seo/dashboard' : '/seo/dashboard'} onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2 px-4 py-3 text-sm text-(--text-body) hover:text-(--text-white) rounded-lg hover:bg-(--surface-06) transition-all">
                                    <TrendingUp className="w-4 h-4 text-(--accent-ink)" /> <span>{t(locale, 'nav.seoAutomatisierung')}</span>
                                </Link>
                                <Link href={locale === 'en' ? '/en/geo/dashboard' : '/geo/dashboard'} onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2 px-4 py-3 text-sm text-(--text-body) hover:text-(--text-white) rounded-lg hover:bg-(--surface-06) transition-all">
                                    <Globe className="w-4 h-4 text-(--accent-ink)" /> <span>{t(locale, 'nav.geoAutomatisierung')}</span>
                                </Link>
                                <button onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-(--text-muted) hover:text-(--danger) rounded-lg hover:bg-(--danger-soft) transition-all">
                                    <LogOut className="w-4 h-4" /> <span>{t(locale, 'nav.logout')}</span>
                                </button>
                            </>
                        ) : (
                            <Link href={locale === 'en' ? '/en/login' : '/login'} onClick={() => setMobileOpen(false)}
                                className="block px-4 py-3 text-sm text-(--text-body) hover:text-(--text-white) rounded-lg hover:bg-(--surface-06) transition-all">
                                {t(locale, 'nav.login')}
                            </Link>
                        )}

                        <Link href={locale === 'en' ? '/en/dashboard' : '/dashboard'} onClick={() => setMobileOpen(false)}
                            className="mt-2 btn-primary w-full">
                            <span>{t(locale, 'nav.cta')}</span>
                        </Link>

                        {counterpart && (
                            <Link href={counterpart} onClick={() => setMobileOpen(false)}
                                className="block px-4 py-3 text-center text-xs font-semibold text-(--text-faint) hover:text-(--text-white) border border-(--border-strong) rounded-lg transition-colors">
                                {locale === 'en' ? 'Deutsch' : 'English'}
                            </Link>
                        )}

                        <div className="flex justify-center pt-2">
                            <ThemeToggle locale={locale} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}