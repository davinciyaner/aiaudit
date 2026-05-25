'use client'
import { useState } from 'react'
import { Zap } from 'lucide-react'
import Link from 'next/link'
import SupportModal from './SupportModal'

export default function Footer() {
    const [supportOpen, setSupportOpen] = useState(false)

    return (
        <>
            <footer className="border-t border-white/5 bg-[#05080f]">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                            <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="font-bold text-white">
                            Audit<span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">AI</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-6 text-xs text-slate-600">
                        <Link href="#features" className="hover:text-slate-400 transition-colors">Features</Link>
                        <Link href="#security" className="hover:text-slate-400 transition-colors">Security</Link>
                        <Link href="#pricing" className="hover:text-slate-400 transition-colors">Pricing</Link>
                        <Link href="/dashboard" className="hover:text-slate-400 transition-colors">Dashboard</Link>
                        <button
                            onClick={() => setSupportOpen(true)}
                            className="hover:text-slate-400 transition-colors"
                        >
                            Support
                        </button>
                        <Link href="/impressum" className="hover:text-slate-400 transition-colors">Impressum</Link>
                        <Link href="/datenschutz" className="hover:text-slate-400 transition-colors">Datenschutz</Link>
                    </div>
                    <p className="text-xs text-slate-700">© 2026 AuditAI</p>
                </div>
            </footer>

            <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />
        </>
    )
}
