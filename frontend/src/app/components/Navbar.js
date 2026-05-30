'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Menu, X, ArrowRight, LogOut, User, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
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
            // Falls name fehlt, email als Fallback
            if (!parsed.name && parsed.email) parsed.name = parsed.email.split('@')[0]
            setUser(parsed)
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        setDropdownOpen(false)
        router.push('/')
    }

    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : '?'

    const links = [
        { label: 'Features', href: '#features' },
        { label: 'Testautomatisierung', href: '#testautomation'},
        { label: 'Sicherheit', href: '#security' },
        { label: 'Preise', href: '#pricing' },
    ]

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
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
                            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="font-bold text-white text-lg tracking-tight">
                            Audit<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">AI</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        {links.map(l => (
                            <Link key={l.href} href={l.href} className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                                {l.label}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(prev => !prev)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-all group"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                        {initials}
                                    </div>
                                    <span className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">
                                        {user.name}
                                    </span>
                                    <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 6, scale: 0.97 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 top-full mt-2 w-48 bg-[#0d1117] border border-white/10 rounded-xl shadow-2xl shadow-black/40 overflow-hidden"
                                        >
                                            <div className="px-3 py-2.5 border-b border-white/5">
                                                <div className="text-xs text-slate-500 truncate">{user.email}</div>
                                            </div>
                                            <div className="p-1.5">
                                                <Link
                                                    href="/profile"
                                                    onClick={() => setDropdownOpen(false)}
                                                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                                >
                                                    <User className="w-3.5 h-3.5" /> Mein Profil
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all"
                                                >
                                                    <LogOut className="w-3.5 h-3.5" /> Abmelden
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">Anmelden</Link>
                        )}
                        <Link href="/dashboard" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20 hover:-translate-y-px">
                            Jetzt prüfen <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <button className="md:hidden p-2 text-slate-400 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="fixed top-16 left-0 right-0 z-40 bg-[#05080f]/95 backdrop-blur-xl border-b border-white/5 p-4"
                    >
                        {links.map(l => (
                            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                                className="block px-4 py-3 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all text-sm">
                                {l.label}
                            </Link>
                        ))}
                        {user ? (
                            <>
                                <Link href="/profile" onClick={() => setMobileOpen(false)}
                                    className="block px-4 py-3 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all text-sm">
                                    Mein Profil
                                </Link>
                                <button onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/5 transition-all text-sm">
                                    Abmelden
                                </button>
                            </>
                        ) : (
                            <Link href="/login" onClick={() => setMobileOpen(false)}
                                className="block px-4 py-3 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all text-sm">
                                Anmelden
                            </Link>
                        )}
                        <Link href="/dashboard" className="mt-2 block px-4 py-3 text-center font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-sm">
                            Jetzt prüfen →
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}