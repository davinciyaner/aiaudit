'use client'
import { ArrowRight, Globe, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Hero() {
    const router = useRouter()

    const goToAutomation = (e, dashboardHref, pricingHref) => {
        if (!localStorage.getItem('user')) {
            e.preventDefault()
            router.push(pricingHref)
        }
    }

    return (
        <main className="relative flex items-center pt-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-20">
                    <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

                        <div>
                            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] sm:leading-none tracking-tight mb-3 sm:mb-6">
                                <span className="bg-clip-text bg-linear-to-r">
                                    KI-Sichtbarkeit <br/>und SEO Tracking
                                </span><br />
                                <span className="bg-clip-text bg-linear-to-r text-slate-400">
                                    Verfolge, ob du zitiert wirst
                                </span>
                            </h1>

                            <p className="text-sm sm:text-base text-slate-400 mb-5 sm:mb-6 max-w-3xl mx-auto">
                                Verfolge, analysiere und optimiere deine Sichtbarkeit bei ChatGPT, Claude, Perplexity und Google AI Overview
                            </p>

                            <div className="mb-5 sm:mb-8 w-full max-w-2xl mx-auto">
                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    <Link href="/geo/dashboard"
                                        onClick={e => goToAutomation(e, '/geo/dashboard', '/geo/pricing')}
                                        className="group inline-flex items-center gap-1.5 pl-2.5 pr-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/15 hover:border-violet-500/40 hover:scale-[1.03] transition-all duration-200">
                                        <Globe className="w-3 h-3 text-violet-400" />
                                        <span className="text-xs font-semibold text-violet-300">KI-Sichtbarkeit</span>
                                        <ArrowRight className="w-3 h-3 text-violet-400 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                    <Link href="/seo/dashboard"
                                          onClick={e => goToAutomation(e, '/seo/dashboard', '/seo/pricing')}
                                          className="group inline-flex items-center gap-1.5 pl-2.5 pr-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 hover:border-emerald-500/40 hover:scale-[1.03] transition-all duration-200">
                                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                                        <span className="text-xs font-semibold text-emerald-300">SEO Automatisierung</span>
                                        <ArrowRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </main>
    )
}