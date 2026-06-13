'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Zap, Menu, X, ArrowRight, LogOut, User, ChevronDown,
    LayoutDashboard, Search, Globe, BookOpen, CreditCard, TrendingUp,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
    {
        key: 'seo',
        label: 'SEO',
        items: [
            { icon: Search, label: 'Einmal-Audit', desc: 'SEO-Score & Fehler aufdecken', href: '/dashboard' },
            { icon: TrendingUp, label: 'SEO Tracking', desc: 'Wöchentliche Google-Rankings', href: '/seo/dashboard', accent: 'emerald' },
            { icon: CreditCard, label: 'Tracking Preise', desc: '3 Pläne ab €29/Monat', href: '/seo/pricing' },
            { icon: BookOpen, label: 'SEO-Fehler vermeiden', desc: 'Leitfaden aus der Praxis', href: '/blog/seo-test-haeufige-fehler' },
        ],
    },
    {
        key: 'geo',
        label: 'GEO',
        items: [
            { icon: Globe, label: 'GEO-Analyse', desc: 'KI-Sichtbarkeit messen', href: '/dashboard' },
            { icon: BookOpen, label: 'GEO-Optimierung 2026', desc: 'Tipps für KI-Suchen', href: '/blog/geo-optimierung-2026' },
        ],
    },
    { key: 'preise', label: 'Preise', href: '/pricing' },
    { key: 'blog', label: 'Blog', href: '/blog' },
]

function NavDropdown({ item, isOpen, onOpen, onClose }) {
    const closeTimer = useRef(null)

    const handleMouseEnter = () => {
        clearTimeout(closeTimer.current)
        onOpen()
    }
    const handleMouseLeave = () => {
        closeTimer.current = setTimeout(onClose, 120)
    }

    return (
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className={`flex items-center gap-1 px-4 py-2 text-sm rounded-lg transition-all ${
                isOpen ? 'text-white bg-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}>
                {item.label}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-[#0d1117] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
                    >
                        <div className="p-1.5 space-y-0.5">
                            {item.items.map(sub => {
                                const a = sub.accent
                                const hoverBg   = a === 'red' ? 'hover:bg-red-500/5' : a === 'emerald' ? 'hover:bg-emerald-500/5' : 'hover:bg-white/5'
                                const iconBg    = a === 'red' ? 'bg-red-500/10' : a === 'emerald' ? 'bg-emerald-500/10' : 'bg-white/5 group-hover:bg-white/8'
                                const iconColor = a === 'red' ? 'text-red-400' : a === 'emerald' ? 'text-emerald-400' : 'text-slate-400'
                                const textColor = a === 'red' ? 'text-red-400' : a === 'emerald' ? 'text-emerald-400' : 'text-slate-200 group-hover:text-white'
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
                                        <div className="text-xs text-slate-500 mt-0.5">{sub.desc}</div>
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
                className="w-full flex items-center justify-between px-4 py-3 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all"
            >
                {item.label}
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
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
                                const a = sub.accent
                                const cls = a === 'red'
                                    ? 'text-red-400 hover:text-red-300 hover:bg-red-500/5'
                                    : a === 'emerald'
                                    ? 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/5'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
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

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [userDropdownOpen, setUserDropdownOpen] = useState(false)
    const [activeNav, setActiveNav] = useState(null)
    const [mobileExpanded, setMobileExpanded] = useState(null)
    const userDropdownRef = useRef(null)
    const router = useRouter()

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', fn)
        return () => window.removeEventListener('scroll', fn)
    }, [])

    useEffect(() => {
        const stored = localStorage.getItem('user')
        if (stored) {
            const parsed = JSON.parse(stored)
            if (!parsed.name && parsed.email) parsed.name = parsed.email.split('@')[0]
            setUser(parsed)
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
            <motion.nav
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled ? 'bg-[#05080f]/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
                            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="font-bold text-white text-lg tracking-tight">
                            Audit<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">AI</span>
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
                                    className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
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
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-all group"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                        {initials}
                                    </div>
                                    <span className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">
                                        {user.name}
                                    </span>
                                    <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {userDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 6, scale: 0.97 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 top-full mt-2 w-52 bg-[#0d1117] border border-white/10 rounded-xl shadow-2xl shadow-black/40 overflow-hidden"
                                        >
                                            <div className="px-3 py-2.5 border-b border-white/5">
                                                <div className="text-xs text-slate-500 truncate">{user.email}</div>
                                            </div>
                                            <div className="p-1.5 space-y-0.5">
                                                <Link href="/dashboard" onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                                    <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" /> Dashboard
                                                </Link>
                                                <Link href="/profile" onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                                    <User className="w-3.5 h-3.5 text-slate-500" /> Mein Profil
                                                </Link>
                                                <div className="my-1 border-t border-white/5" />
                                                <p className="px-3 pt-1 pb-0.5 text-[10px] text-slate-600 font-semibold uppercase tracking-wider">SEO Tracking</p>
                                                <Link href="/seo/dashboard" onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Rankings
                                                </Link>
                                                <Link href="/seo/pricing" onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                                    <CreditCard className="w-3.5 h-3.5 text-slate-500" /> Tracking Preise
                                                </Link>
                                                <div className="my-1 border-t border-white/5" />
                                                <button onClick={handleLogout}
                                                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all">
                                                    <LogOut className="w-3.5 h-3.5" /> Abmelden
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
                                Anmelden
                            </Link>
                        )}
                        <Link href="/dashboard"
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20 hover:-translate-y-px">
                            Jetzt prüfen <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden p-2 text-slate-400 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="fixed top-16 left-0 right-0 z-40 bg-[#05080f]/95 backdrop-blur-xl border-b border-white/5 p-4 space-y-1"
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
                                    className="block px-4 py-3 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                                    {item.label}
                                </Link>
                            )
                        )}

                        <div className="border-t border-white/5 my-1" />

                        {user ? (
                            <>
                                <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                                    <LayoutDashboard className="w-4 h-4 text-slate-500" /> Dashboard
                                </Link>
                                <Link href="/profile" onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                                    <User className="w-4 h-4 text-slate-500" /> Mein Profil
                                </Link>
                                <Link href="/seo/dashboard" onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                                    <TrendingUp className="w-4 h-4 text-emerald-400" /> SEO Tracking
                                </Link>
                                <button onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/5 transition-all">
                                    <LogOut className="w-4 h-4" /> Abmelden
                                </button>
                            </>
                        ) : (
                            <Link href="/login" onClick={() => setMobileOpen(false)}
                                className="block px-4 py-3 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                                Anmelden
                            </Link>
                        )}

                        <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                            className="mt-2 block px-4 py-3 text-center font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-sm">
                            Jetzt prüfen →
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}