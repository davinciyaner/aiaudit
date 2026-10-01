'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Check, Lock } from 'lucide-react'
import ScoreRegisterModal from '../ScoreRegisterModal'
import { COPY } from './content'

export function PlanGrid({ plans, onFree }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            {plans.map(p => (
                <article key={p.id} className={`bg-(--card) rounded-2xl p-6 sm:p-7 flex flex-col gap-5 min-w-0 ${p.featured ? 'border-2 border-(--accent) shadow-card' : 'border border-(--line)'}`}>
                    <div className="flex justify-between items-center gap-3">
                        <h3 className="text-[17px] font-semibold">{p.name}</h3>
                        {p.flag && <span className="text-xs font-semibold text-(--accent-ink) bg-(--accent-soft) px-2.5 py-1 rounded-full">{p.flag}</span>}
                    </div>
                    <div className="flex items-baseline gap-1.5">
                        <span className="tabular-nums text-[44px] font-bold tracking-[-0.04em] leading-none">{p.price}</span>
                        <span className="text-[15px] text-(--text-muted)">{p.per}</span>
                    </div>
                    <p className="text-[15px] text-(--text-body) -mt-2">{p.desc}</p>
                    <ul className="flex flex-col gap-2.5 flex-1">
                        {p.features.map(f => (
                            <li key={f} className="flex gap-2.5 text-[15px]">
                                <Check className="w-4 h-4 mt-0.75 shrink-0 text-(--accent)" strokeWidth={2.25} aria-hidden="true" />{f}
                            </li>
                        ))}
                        {p.locked?.map(f => (
                            <li key={f} className="flex gap-2.5 text-[15px] text-(--text-muted)">
                                <Lock className="w-4 h-4 mt-0.75 shrink-0" strokeWidth={2} aria-hidden="true" />{f}
                            </li>
                        ))}
                    </ul>
                    {p.free
                        ? <button type="button" onClick={onFree} className="btn-ghost w-full">{p.cta}</button>
                        : <Link href={p.href} className={`${p.featured ? 'btn-primary' : 'btn-ghost'} w-full`}>{p.cta}</Link>}
                </article>
            ))}
        </div>
    )
}

export function useFreeCta(locale) {
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => { setIsLoggedIn(!!localStorage.getItem('token')) }, [])
    const onFree = () => {
        if (isLoggedIn) router.push(COPY[locale].dashboard)
        else setModalOpen(true)
    }
    const modal = <ScoreRegisterModal open={modalOpen} onClose={() => setModalOpen(false)} locale={locale} />
    return { onFree, modal }
}

export default function PricingTabs({ locale = 'de', showAllLink = true }) {
    const c = COPY[locale].pricing
    const [active, setActive] = useState(0)
    const refs = useRef([])
    const { onFree, modal } = useFreeCta(locale)

    const onKey = (e, i) => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
        if (!d) return
        e.preventDefault()
        const n = (i + d + c.tabs.length) % c.tabs.length
        setActive(n)
        refs.current[n]?.focus()
    }

    return (
        <>
            {modal}
            <div role="tablist" aria-label={c.tabsAria} className="grid grid-cols-1 sm:inline-flex gap-1 p-1 rounded-xl bg-(--card) border border-(--line) mb-7 max-w-full">
                {c.tabs.map(([key, label], i) => (
                    <button
                        key={key}
                        ref={el => (refs.current[i] = el)}
                        role="tab"
                        id={`price-tab-${key}`}
                        aria-controls={`price-panel-${key}`}
                        aria-selected={active === i}
                        tabIndex={active === i ? 0 : -1}
                        onClick={() => setActive(i)}
                        onKeyDown={e => onKey(e, i)}
                        className={`min-h-10 px-4 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${active === i ? 'bg-(--text-white) text-(--bg-base)' : 'text-(--text-body) hover:bg-(--tint) hover:text-(--text-white)'}`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            {/* All panels stay in the DOM (hidden attribute) so every plan is in the HTML. */}
            {c.tabs.map(([key, , intro], i) => (
                <div key={key} role="tabpanel" id={`price-panel-${key}`} aria-labelledby={`price-tab-${key}`} hidden={active !== i}>
                    <p className="text-(--text-body) mb-6 max-w-[62ch]">{intro}</p>
                    <PlanGrid plans={c.plans[key]} locale={locale} onFree={onFree} />
                </div>
            ))}
            <p className="mt-6 text-sm text-(--text-muted)">
                {c.note}{' '}
                {showAllLink && <Link href={c.allHref} className="font-semibold text-(--accent-ink) hover:underline underline-offset-4">{c.all}</Link>}
            </p>
        </>
    )
}
