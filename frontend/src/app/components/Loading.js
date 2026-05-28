'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const steps = [
    { label: 'Browser wird geöffnet...', icon: '🌐' },
    { label: 'Website wird geladen...', icon: '📡' },
    { label: 'Screenshots werden erstellt...', icon: '📸' },
    { label: 'SEO wird analysiert...', icon: '🔍' },
    { label: 'Performance wird gemessen...', icon: '⚡' },
    { label: 'Security wird geprüft...', icon: '🔒' },
    { label: 'Keywords werden extrahiert...', icon: '🎯' },
    { label: 'GEO-Sichtbarkeit wird analysiert...', icon: '🌍' },
    { label: 'KI-Bericht wird generiert...', icon: '🤖' },
]

export default function Loading({ url }) {
    const [currentStep, setCurrentStep] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev < steps.length - 1) return prev + 1
                clearInterval(interval)
                return prev
            })
        }, 6500)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-lg mx-auto">
            <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 sm:p-8 text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 opacity-20 animate-ping" />
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 opacity-40 animate-pulse" />
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-xl">{steps[currentStep].icon}</span>
                    </div>
                </div>

                <h3 className="text-white font-semibold mb-1">Website wird auditiert</h3>
                {url && <p className="text-slate-500 text-sm mb-6 truncate">{url}</p>}

                <AnimatePresence mode="wait">
                    <motion.p key={currentStep} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                              className="text-violet-400 text-sm font-medium mb-6">
                        {steps[currentStep].label}
                    </motion.p>
                </AnimatePresence>

                <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-4">
                    <motion.div className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
                                initial={{ width: '0%' }}
                                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                                transition={{ duration: 0.5 }} />
                </div>

                <div className="grid grid-cols-9 gap-1">
                    {steps.map((_, i) => (
                        <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-gradient-to-r from-violet-500 to-cyan-500' : 'bg-white/5'}`} />
                    ))}
                </div>
                <p className="text-slate-600 text-xs mt-4">Kann bis zu 60 Sekunden dauern</p>
            </div>
        </motion.div>
    )
}