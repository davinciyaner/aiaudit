'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { COPY, DEMO_SERIES, DEMO_WEEKS, DEMO_WEEKS_EN, PLATFORMS, DEMO_COMPETITORS, DEMO_SOURCES } from './content'

const W = 640, H = 230, PL = 40, PR = 14, PT = 12, PB = 30, YMAX = 60

function MentionChart({ series, weeks, ariaLabel }) {
    const x = i => PL + i * (W - PL - PR) / (weeks.length - 1)
    const y = v => PT + (1 - v / YMAX) * (H - PT - PB)
    const path = a => a.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
    const li = weeks.length - 1
    const last = series.me[li]
    return (
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel} className="w-full h-auto block">
            {[0, 20, 40, 60].map(t => (
                <g key={t}>
                    <line x1={PL} x2={W - PR} y1={y(t)} y2={y(t)} stroke="var(--line-soft)" strokeWidth="1" />
                    <text x={PL - 8} y={y(t) + 4} textAnchor="end" fill="var(--text-muted)" fontSize="11" fontFamily="var(--font-mono)">{t}%</text>
                </g>
            ))}
            {weeks.map((w, i) => i % 2 === 1 && (
                <text key={w} x={x(i)} y={H - 8} textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontFamily="var(--font-mono)">{w}</text>
            ))}
            <path d={`${path(series.me)} L${x(li)} ${y(0)} L${x(0)} ${y(0)} Z`} fill="var(--accent-soft)" />
            <path d={path(series.cmp)} fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d={path(series.me)} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            <circle cx={x(li)} cy={y(last)} r="4.5" fill="var(--card)" stroke="var(--accent)" strokeWidth="2.5" />
            <text x={x(li) - 10} y={y(last) - 10} textAnchor="end" fill="var(--accent-ink)" fontSize="11" fontWeight="500" fontFamily="var(--font-mono)">{last}%</text>
        </svg>
    )
}

function Bars({ items }) {
    return (
        <ul className="flex flex-col gap-3">
            {items.map(it => (
                <li key={it.label} className={`grid grid-cols-[minmax(0,1fr)_auto] gap-x-2.5 gap-y-1 text-sm ${it.me ? 'font-semibold' : ''}`}>
                    <span className="truncate">{it.label}</span>
                    <span className="font-mono tabular-nums text-(--text-body)">{it.value} %</span>
                    <span className="col-span-2 h-1.5 rounded-full" style={{ width: `${it.width}%`, background: it.muted ? 'color-mix(in oklch, var(--text-muted) 35%, transparent)' : 'var(--accent)' }} />
                </li>
            ))}
        </ul>
    )
}

export default function ProductDemo({ locale = 'de' }) {
    const c = COPY[locale].demo
    const weeks = locale === 'en' ? DEMO_WEEKS_EN : DEMO_WEEKS
    const [tab, setTab] = useState(0)
    const [platform, setPlatform] = useState('all')
    const tabRefs = useRef([])
    const series = DEMO_SERIES[platform]
    const li = weeks.length - 1
    const platformName = platform === 'all' ? c.all : PLATFORMS.find(p => p.key === platform).name

    const onTabKey = (e, i) => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
        if (!d) return
        e.preventDefault()
        const n = (i + d + c.tabs.length) % c.tabs.length
        setTab(n)
        tabRefs.current[n]?.focus()
    }

    const platformBars = PLATFORMS
        .map(p => ({ label: p.name, value: DEMO_SERIES[p.key].me[li] }))
        .sort((a, b) => b.value - a.value)
        .map(p => ({ ...p, width: p.value / YMAX * 100 }))
    const maxShare = Math.max(...DEMO_COMPETITORS.map(d => d.share))
    const competitorBars = DEMO_COMPETITORS.map(d => ({
        label: d.domain + (d.me ? c.youSuffix : ''), value: d.share, me: d.me, muted: !d.me, width: d.share / maxShare * 62,
    }))

    const box = 'border border-(--line-soft) rounded-xl p-4 min-w-0'
    const boxHead = 'flex flex-wrap justify-between items-center gap-3 mb-2.5'

    return (
        <>
            <figure aria-label={c.aria} className="m-0 rounded-[20px] bg-(--card) border border-(--line) overflow-hidden [box-shadow:var(--shadow-demo)]">
                <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 px-4 py-3 border-b border-(--line-soft)">
                    <div className="flex items-center gap-2.5 text-sm font-semibold">
                        <span className="w-6 h-6 rounded-md bg-(--text-white) text-(--bg-base) inline-flex items-center justify-center text-[11px] font-bold" aria-hidden="true">AN</span>
                        <span className="font-mono font-medium text-(--text-body)">agentur-nordlicht.de</span>
                    </div>
                    <div role="tablist" aria-label={c.tabsAria} className="flex w-full sm:w-auto gap-0.5 p-0.75 rounded-[10px] bg-(--tint)">
                        {c.tabs.map((label, i) => (
                            <button
                                key={label}
                                ref={el => (tabRefs.current[i] = el)}
                                role="tab"
                                id={`demo-tab-${i}`}
                                aria-controls={`demo-panel-${i}`}
                                aria-selected={tab === i}
                                tabIndex={tab === i ? 0 : -1}
                                onClick={() => setTab(i)}
                                onKeyDown={e => onTabKey(e, i)}
                                className={`flex-1 sm:flex-none min-h-8.5 px-3.5 rounded-lg text-[13px] font-semibold whitespace-nowrap transition-colors ${tab === i ? 'bg-(--card) text-(--text-white) shadow-(--shadow-tight)' : 'text-(--text-body) hover:text-(--text-white)'}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    <span className="hidden sm:inline text-[13px] text-(--text-muted)">{c.range}</span>
                </div>

                <div className="p-3.5 sm:p-5">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                        {[
                            [c.kpis.rate, `${series.me[li]} %`, `+${series.me[li] - series.me[0]} ${c.kpis.since}`, true],
                            [c.kpis.sov, '22 %', c.kpis.sovSub, false],
                            [c.kpis.src, '14', c.kpis.srcSub, false],
                            [c.kpis.geo, '71', c.kpis.geoSub, true, ' / 100'],
                        ].map(([k, v, d, up, suffix]) => (
                            <div key={k} className="border border-(--line-soft) rounded-xl px-4 py-3.5 flex flex-col gap-1 min-w-0">
                                <span className="text-[13px] text-(--text-muted)">{k}</span>
                                <span className="font-mono tabular-nums text-[22px] sm:text-[28px] font-semibold tracking-tight leading-tight">
                                    {v}{suffix && <small className="text-sm text-(--text-muted) font-normal">{suffix}</small>}
                                </span>
                                <span className={`text-[13px] ${up ? 'text-(--success) font-medium' : 'text-(--text-muted)'}`}>{d}</span>
                            </div>
                        ))}
                    </div>

                    <div role="tabpanel" id="demo-panel-0" aria-labelledby="demo-tab-0" hidden={tab !== 0}>
                        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] gap-4">
                            <div className={box}>
                                <div className={boxHead}>
                                    <span className="text-sm font-semibold">{c.chartTitle}</span>
                                    <span className="flex gap-3.5 text-xs text-(--text-muted)">
                                        <span><i className="inline-block w-3.5 h-0.5 mr-1.5 align-middle bg-(--accent)" />{c.you}</span>
                                        <span><i className="inline-block w-3.5 mr-1.5 align-middle border-t-2 border-dashed border-(--text-muted)" />{c.avgCmp}</span>
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-2" role="group" aria-label={c.filterAria}>
                                    {[{ key: 'all', name: c.all }, ...PLATFORMS].map(p => (
                                        <button
                                            key={p.key}
                                            type="button"
                                            aria-pressed={platform === p.key}
                                            onClick={() => setPlatform(p.key)}
                                            className={`min-h-7.5 px-2.5 rounded-full text-xs font-medium border transition-colors ${platform === p.key ? 'bg-(--text-white) border-(--text-white) text-(--bg-base)' : 'bg-(--card) border-(--line) text-(--text-body) hover:border-(--text-muted)'}`}
                                        >
                                            {p.name}
                                        </button>
                                    ))}
                                </div>
                                <MentionChart series={series} weeks={weeks} ariaLabel={c.chartAria(platformName, series.me[0], series.me[li], series.cmp[li])} />
                            </div>
                            <div className={box}>
                                <div className={boxHead}>
                                    <span className="text-sm font-semibold">{c.perPlatform}</span>
                                    <span className="text-[13px] text-(--text-muted)">{c.week}</span>
                                </div>
                                <Bars items={platformBars} />
                            </div>
                        </div>
                    </div>

                    <div role="tabpanel" id="demo-panel-1" aria-labelledby="demo-tab-1" hidden={tab !== 1}>
                        <div className={box}>
                            <div className={boxHead}>
                                <span className="text-sm font-semibold">{c.sovTitle}</span>
                                <span className="text-[13px] text-(--text-muted)">{c.allPlatforms}</span>
                            </div>
                            <Bars items={competitorBars} />
                        </div>
                    </div>

                    <div role="tabpanel" id="demo-panel-2" aria-labelledby="demo-tab-2" hidden={tab !== 2}>
                        <div className={box}>
                            <div className={boxHead}>
                                <span className="text-sm font-semibold">{c.srcTitle}</span>
                                <span className="text-[13px] text-(--text-muted)">{c.week}</span>
                            </div>
                            <ul>
                                {DEMO_SOURCES.map((s, i) => (
                                    <li key={s.url} className={`grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 py-3 items-center ${i ? 'border-t border-(--line-soft)' : ''}`}>
                                        <span className={`font-mono text-[13px] break-all ${s.own ? 'text-(--accent-ink) font-medium' : ''}`}>{s.url}</span>
                                        <span className="font-mono text-[13px] text-(--text-body) row-span-2 col-start-2">{s.count}×</span>
                                        <span className="text-xs text-(--text-muted)">{s.by}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </figure>
            <p className="flex flex-wrap justify-between gap-3 text-[13px] text-(--text-muted) pt-3.5 px-1">
                <span>{c.note}</span>
                <Link href={COPY[locale].sampleReport} className="font-semibold text-(--accent-ink) hover:underline underline-offset-4"
                    onClick={() => { if (typeof window.gtag === 'function') window.gtag('event', 'sample_report_click') }}>
                    {c.sample}
                </Link>
            </p>
        </>
    )
}
