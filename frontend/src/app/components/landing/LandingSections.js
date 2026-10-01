import Link from 'next/link'
import { ArrowRight, Plus, TriangleAlert } from 'lucide-react'
import AuditUrlForm from './AuditUrlForm'
import ProductDemo from './ProductDemo'
import PricingTabs from './PricingTabs'
import { COPY, AUDIT_STATS, PLATFORMS } from './content'

// Server-rendered landing sections (all copy is in the HTML for crawlers and AI systems).
// Interactive parts are small client islands: AuditUrlForm, ProductDemo, PricingTabs.

const WRAP = 'max-w-300 mx-auto px-4 sm:px-8'
const SECTION = 'py-18 md:py-28'
const LEAD = 'text-lg leading-relaxed text-(--text-body) max-w-[62ch]'
const H2 = 'text-[clamp(30px,4vw,44px)] leading-[1.08] font-bold tracking-[-0.03em]'

export function Hero({ locale = 'de' }) {
    const c = COPY[locale].hero
    return (
        <section id="hero" className="pt-28 md:pt-34">
            <div className={`${WRAP} grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] gap-6 lg:gap-14 items-end mb-8 lg:mb-12`}>
                <div className="site-enter">
                    <p className="eyebrow">{c.eyebrow}</p>
                    <h1 className="mt-4 text-[clamp(38px,5vw,64px)] leading-[1.02] tracking-[-0.042em] font-bold">{c.h1}</h1>
                </div>
                <div className="flex flex-col gap-5 min-w-0 site-enter [animation-delay:140ms]">
                    <p className={LEAD}>{c.lead}</p>
                    <AuditUrlForm locale={locale} id="audit-url-hero" />
                </div>
            </div>
            <div className="pb-10 bg-[linear-gradient(180deg,var(--bg-base)_0%,var(--bg-surface)_38%,var(--bg-surface)_100%)]">
                <div className={`${WRAP} site-enter [animation-delay:220ms]`}>
                    <ProductDemo locale={locale} />
                    <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 pt-9 pb-2" aria-label={COPY[locale].demo.checkedOn}>
                        <span className="text-sm text-(--text-muted)">{COPY[locale].demo.checkedOn}</span>
                        {PLATFORMS.map(p => <strong key={p.key} className="text-[17px] font-semibold tracking-[-0.01em]">{p.name}</strong>)}
                    </div>
                </div>
            </div>
        </section>
    )
}

function Pill({ kind, children }) {
    const cls = kind === 'hit'
        ? 'bg-(--success-soft) text-(--success)'
        : 'bg-(--tint) text-(--text-muted)'
    return <span className={`inline-flex items-center text-[13px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${cls}`}>{children}</span>
}

export function Features({ locale = 'de' }) {
    const c = COPY[locale].features
    const card = 'rounded-2xl border p-5 sm:p-7 flex flex-col gap-2.5 min-w-0 reveal'
    const mini = 'mt-3.5 rounded-xl border p-4 flex-1'
    const prio = { h: 'bg-(--danger-soft) text-(--danger)', m: 'bg-(--warning-soft) text-(--warning)', l: 'bg-(--tint) text-(--text-muted)' }
    return (
        <section id={COPY[locale].ids.features} className={SECTION} aria-labelledby="h-features">
            <div className={WRAP}>
                <div className="flex flex-col gap-4 mb-12 max-w-190 reveal">
                    <h2 id="h-features" className={H2}>{c.h2}</h2>
                    <p className={LEAD}>{c.lead}</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <article className={`${card} lg:col-span-2 bg-(--tint) border-(--accent-border)`}>
                        <h3 className="text-[19px] font-semibold tracking-[-0.015em]">{c.chat.title}</h3>
                        <p className="text-(--text-body) max-w-[48ch]">{c.chat.text}</p>
                        <div className={`${mini} bg-(--card) border-(--line-soft)`}>
                            <div className="flex justify-end">
                                <p className="max-w-[80%] bg-(--text-white) text-(--bg-base) px-3.5 py-2.5 rounded-[14px_14px_4px_14px] text-sm">{c.chat.q}</p>
                            </div>
                            <p className="mt-3 max-w-[92%] text-sm leading-relaxed text-(--text-body)">
                                {c.chat.aBefore}<mark className="bg-(--accent-soft-strong) text-(--accent-ink) font-semibold px-1 rounded">{c.chat.brand}</mark>{c.chat.aAfter}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <Pill kind="hit">{c.chat.pills[0]}</Pill>
                                <Pill>{c.chat.pills[1]}</Pill>
                                <Pill>{c.chat.pills[2]}</Pill>
                            </div>
                        </div>
                    </article>

                    <article className={`${card} bg-[oklch(21%_0.035_264)] border-[oklch(21%_0.035_264)] text-[oklch(98%_0.004_255)]`}>
                        <h3 className="text-[19px] font-semibold tracking-[-0.015em]">{c.alert.title}</h3>
                        <p className="text-[oklch(84%_0.02_262)]">{c.alert.text}</p>
                        <div className={`${mini} bg-[oklch(28%_0.035_264)] border-[oklch(36%_0.035_264)]`}>
                            <div className="flex gap-2.5 items-start">
                                <span className="w-7 h-7 shrink-0 rounded-lg bg-[oklch(50%_0.19_25/22%)] text-[oklch(80%_0.12_25)] inline-flex items-center justify-center" aria-hidden="true">
                                    <TriangleAlert className="w-4 h-4" />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold">{c.alert.t}</p>
                                    <p className="text-[13px] text-[oklch(82%_0.02_262)] mt-1 leading-normal">{c.alert.s}</p>
                                </div>
                            </div>
                            <p className="mt-3.5 pt-3 border-t border-[oklch(36%_0.035_264)] text-[13px] text-[oklch(84%_0.02_262)] leading-normal">{c.alert.cause}</p>
                        </div>
                    </article>

                    <article className={`${card} bg-(--card) border-(--line)`}>
                        <h3 className="text-[19px] font-semibold tracking-[-0.015em]">{c.compare.title}</h3>
                        <p className="text-(--text-body)">{c.compare.text}</p>
                        <div className={`${mini} bg-(--bg-base) border-(--line-soft) overflow-x-auto`}>
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr>
                                        {c.compare.cols.map((h, i) => <th key={h} scope="col" className={`font-medium text-xs text-(--text-muted) pb-2 ${i === 2 ? 'text-right' : 'text-left'}`}>{h}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {c.compare.rows.map(([kw, pos, hit]) => (
                                        <tr key={kw} className="border-t border-(--line-soft)">
                                            <td className="py-2.5 pr-2">{kw}</td>
                                            <td className="py-2.5 pr-2 font-mono">{pos}</td>
                                            <td className="py-2.5 text-right"><Pill kind={hit ? 'hit' : 'miss'}>{hit ? c.compare.yes : c.compare.no}</Pill></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </article>

                    <article className={`${card} lg:col-span-2 bg-(--card) border-(--line)`}>
                        <h3 className="text-[19px] font-semibold tracking-[-0.015em]">{c.audit.title}</h3>
                        <p className="text-(--text-body) max-w-[56ch]">{c.audit.text}</p>
                        <div className={`${mini} bg-(--bg-base) border-(--line-soft)`}>
                            <div className="flex items-baseline gap-2 mb-3">
                                <span className="font-mono text-[32px] font-bold tracking-[-0.04em]">58</span>
                                <span className="text-[13px] text-(--text-muted)">{c.audit.scoreLabel}</span>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {c.audit.fixes.map(([k, label, text]) => (
                                    <li key={text} className="flex flex-col gap-1.5 p-3 rounded-[10px] border border-(--line-soft) bg-(--card) text-sm">
                                        <span className={`self-start text-xs font-semibold px-2 py-0.5 rounded-full ${prio[k]}`}>{label}</span>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}

export function AuditData({ locale = 'de' }) {
    const c = COPY[locale].data
    const s = AUDIT_STATS
    return (
        <section className={`${SECTION} bg-(--bg-surface)`} aria-labelledby="h-data">
            <div className={`${WRAP} grid grid-cols-1 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-18 items-end`}>
                <div className="flex flex-col gap-4 reveal">
                    <p className="eyebrow">{c.eyebrow}</p>
                    <h2 id="h-data" className={H2}>{c.h2}</h2>
                    <div className="flex items-baseline gap-2.5 mt-2">
                        <span className="font-mono text-[clamp(96px,13vw,168px)] leading-[.85] font-bold tracking-[-0.06em] text-(--accent)">{s.geo}</span>
                        <span className="text-[22px] text-(--text-muted) font-medium">{c.scoreSuffix}</span>
                    </div>
                </div>
                <div className="reveal">
                    <p className={`${LEAD} mb-7`}>{c.lead(s)}</p>
                    <div className="grid grid-cols-2 gap-px bg-(--line) border border-(--line) rounded-2xl overflow-hidden">
                        {c.stats(s).map(([v, suffix, k]) => (
                            <div key={k} className="bg-(--card) p-4.5 sm:px-6 sm:py-5.5 flex flex-col gap-1.5">
                                <span className="font-mono tabular-nums text-[28px] sm:text-[34px] font-semibold tracking-[-0.03em] leading-none">
                                    {v}{suffix && <small className="text-[15px] text-(--text-muted) font-medium tracking-normal">{suffix}</small>}
                                </span>
                                <span className="text-sm text-(--text-body)">{k}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="lg:col-span-2 text-sm text-(--text-muted) flex flex-wrap justify-between gap-x-6 gap-y-1.5 border-t border-(--line) pt-5">
                    <span>{c.source}</span>
                    <span><time dateTime={s.asOfIso}>{c.asOf}</time></span>
                </p>
            </div>
        </section>
    )
}

export function HowItWorks({ locale = 'de' }) {
    const c = COPY[locale].how
    return (
        <section className={SECTION} aria-labelledby="h-how">
            <div className={WRAP}>
                <h2 id="h-how" className={`${H2} mb-14 reveal`}>{c.h2}</h2>
                <ol className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-8">
                    {c.steps.map(([title, text, time]) => (
                        <li key={title} className="relative flex flex-col gap-3 pt-7 border-t-2 border-(--line) reveal before:absolute before:-top-0.5 before:left-0 before:w-14 before:h-0.5 before:bg-(--accent)">
                            <h3 className="text-[22px] font-semibold tracking-[-0.015em]">{title}</h3>
                            <p className="text-(--text-body) max-w-[32ch]">{text}</p>
                            <span className="text-[13px] text-(--text-muted)">{time}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}

export function WhatIsScanora({ locale = 'de' }) {
    const c = COPY[locale].what
    return (
        <section id={COPY[locale].ids.what} className={`${SECTION} border-t border-(--line-soft)`} aria-labelledby="h-what">
            <div className={`${WRAP} grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] gap-10 lg:gap-18 items-start`}>
                <div className="flex flex-col gap-5 min-w-0 reveal">
                    <h2 id="h-what" className={H2}>{c.h2}</h2>
                    <p className="text-[22px] leading-normal tracking-[-0.01em] max-w-[34em]">{c.big}</p>
                    <p className="text-(--text-body) max-w-[62ch]">{c.body}</p>
                    <p className="text-sm text-(--text-muted) max-w-[62ch]">
                        {c.sources[0]}{' '}
                        {c.sources[1].map(([label, href], i) => (
                            <span key={href}>
                                {i > 0 && (i === c.sources[1].length - 1 ? (locale === 'de' ? ' und ' : ' and ') : ', ')}
                                <a href={href} target="_blank" rel="noopener noreferrer" className="text-(--accent-ink) underline underline-offset-2 hover:no-underline">{label}</a>
                            </span>
                        ))}.
                    </p>
                    <p className="text-sm text-(--text-muted)">
                        {c.byline[0]} <strong className="text-(--text-body) font-semibold">{c.byline[1]}</strong>, {c.byline[2]} <time dateTime="2026-09-26">{c.byline[3]}</time>.
                    </p>
                </div>
                <dl className="m-0 border border-(--line) rounded-2xl bg-(--card) overflow-hidden reveal">
                    {c.facts.map(([k, v], i) => (
                        <div key={k} className={`grid grid-cols-1 sm:grid-cols-[150px_minmax(0,1fr)] gap-0.5 sm:gap-4 px-5 py-3.5 ${i ? 'border-t border-(--line-soft)' : ''}`}>
                            <dt className="text-sm text-(--text-muted)">{k}</dt>
                            <dd className="m-0 text-[15px] font-medium">{v}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}

export function PricingSection({ locale = 'de' }) {
    const c = COPY[locale].pricing
    return (
        <section id={COPY[locale].ids.pricing} className={`${SECTION} bg-(--bg-surface)`} aria-labelledby="h-pricing">
            <div className={WRAP}>
                <div className="flex flex-col gap-4 mb-9 reveal">
                    <h2 id="h-pricing" className={H2}>{c.h2}</h2>
                    <p className={LEAD}>{c.lead}</p>
                </div>
                <PricingTabs locale={locale} />
            </div>
        </section>
    )
}

export function Resources({ locale = 'de' }) {
    const c = COPY[locale].resources
    return (
        <section className={SECTION} aria-labelledby="h-resources">
            <div className={WRAP}>
                <div className="flex flex-col gap-4 mb-10 reveal">
                    <h2 id="h-resources" className={H2}>{c.h2}</h2>
                    <p className={LEAD}>{c.lead}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-10">
                    {c.cols.map(([heading, links]) => (
                        <div key={heading} className="reveal">
                            <h3 className="text-[15px] font-semibold text-(--text-muted) mb-2">{heading}</h3>
                            <ul>
                                {links.map(([label, href]) => (
                                    <li key={href}>
                                        <Link href={href} className="group flex justify-between items-center gap-3 py-3.5 min-h-12 font-medium border-b border-(--line-soft) hover:text-(--accent-ink) transition-colors">
                                            {label}
                                            <ArrowRight className="w-4 h-4 text-(--text-muted) transition-transform group-hover:translate-x-0.75 group-hover:text-(--accent-ink)" aria-hidden="true" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function LandingFAQ({ locale = 'de', faqs }) {
    const c = COPY[locale].faq
    return (
        <section id={COPY[locale].ids.faq} className={`${SECTION} pt-0 md:pt-0`} aria-labelledby="h-faq">
            <div className={`${WRAP} grid grid-cols-1 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] gap-10 lg:gap-18 items-start`}>
                <div className="lg:sticky lg:top-24 flex flex-col gap-4 reveal">
                    <p className="eyebrow">{c.eyebrow}</p>
                    <h2 id="h-faq" className={H2}>{c.h2}</h2>
                    <p className="text-(--text-body)">{c.text} <Link href={c.href} className="font-semibold text-(--accent-ink) hover:underline underline-offset-4">{c.link}</Link>.</p>
                </div>
                <FaqList faqs={faqs} />
            </div>
        </section>
    )
}

// Native <details>: every answer is in the server HTML, works without JS.
export function FaqList({ faqs, firstOpen = true }) {
    return (
        <div className="border-t border-(--line)">
            {faqs.map((f, i) => (
                <details key={f.q} open={firstOpen && i === 0} className="group border-b border-(--line)">
                    <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer flex justify-between items-center gap-5 py-5.5 text-[17px] font-semibold tracking-[-0.01em]">
                        <h3 className="m-0 text-[17px] font-semibold">{f.q}</h3>
                        <span className="w-7 h-7 shrink-0 rounded-full border border-(--line) inline-flex items-center justify-center text-(--text-body) transition-transform duration-200 group-open:rotate-45 group-open:bg-(--tint)" aria-hidden="true">
                            <Plus className="w-3.5 h-3.5" />
                        </span>
                    </summary>
                    <p className="pb-6 pr-0 sm:pr-12 text-(--text-body) max-w-[68ch] leading-relaxed">{f.a}</p>
                </details>
            ))}
        </div>
    )
}

export function FinalCTA({ locale = 'de' }) {
    const c = COPY[locale].final
    return (
        <section className="pt-2 md:pt-6 pb-18 md:pb-28" aria-labelledby="h-final">
            <div className={WRAP}>
                <div className="rounded-2xl md:rounded-3xl bg-[oklch(21%_0.035_264)] text-[oklch(98%_0.004_255)] px-5 py-9 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    <div>
                        <h2 id="h-final" className={`${H2} text-[oklch(98%_0.004_255)]`}>{c.h2}</h2>
                        <p className="text-lg leading-relaxed text-[oklch(84%_0.02_262)] mt-4">{c.lead}</p>
                    </div>
                    <AuditUrlForm locale={locale} id="audit-url-final" onDark />
                </div>
            </div>
        </section>
    )
}
