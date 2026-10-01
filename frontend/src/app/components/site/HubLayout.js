import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// Shared layout for the comparison and solution overview pages (de + en): breadcrumb,
// header, linked cards, then page-specific sections passed as children.
export default function HubLayout({ crumbs, title, lead, items, readLabel, children }) {
    return (
        <div className="max-w-300 mx-auto px-4 sm:px-8 pt-28 md:pt-34 pb-18 md:pb-28">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-(--text-muted) mb-8">
                {crumbs.map(([label, href], i) => (
                    <span key={label} className="flex items-center gap-2">
                        {i > 0 && <span aria-hidden="true">/</span>}
                        {href ? <Link href={href} className="hover:text-(--accent-ink) transition-colors">{label}</Link> : <span>{label}</span>}
                    </span>
                ))}
            </nav>

            <header className="mb-12 max-w-190">
                <h1 className="text-[clamp(34px,4.4vw,54px)] leading-[1.05] tracking-[-0.038em] font-bold">{title}</h1>
                <div className="mt-5 text-lg leading-relaxed text-(--text-body) max-w-[62ch] flex flex-col gap-4">{lead}</div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map(item => (
                    <Link key={item.href} href={item.href}
                        className="group card p-6 sm:p-7 flex flex-col gap-3 hover:border-(--accent) transition-colors">
                        {item.tag && <span className="self-start text-xs font-semibold px-2.5 py-1 rounded-full bg-(--accent-soft) text-(--accent-ink)">{item.tag}</span>}
                        <h2 className="text-lg sm:text-xl font-semibold leading-snug tracking-[-0.015em] group-hover:text-(--accent-ink) transition-colors">{item.title}</h2>
                        <p className="text-[15px] text-(--text-body) leading-relaxed">{item.description}</p>
                        <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-(--accent-ink)">
                            {readLabel}<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.75" aria-hidden="true" />
                        </span>
                    </Link>
                ))}
            </div>

            <div className="mt-16 flex flex-col gap-14 max-w-225">{children}</div>
        </div>
    )
}

export function HubSection({ title, children }) {
    return (
        <section>
            <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold mb-4">{title}</h2>
            <div className="text-(--text-body) leading-relaxed flex flex-col gap-4">{children}</div>
        </section>
    )
}

export function HubTable({ head, rows, note }) {
    return (
        <div>
            <div className="overflow-x-auto card">
                <table className="w-full min-w-155 text-[15px] border-collapse">
                    <thead>
                        <tr>{head.map(h => <th key={h} scope="col" className="text-left text-sm font-semibold text-(--text-muted) px-5 py-3.5 border-b border-(--line)">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                        {rows.map((r, i) => (
                            <tr key={r[0]} className={i ? 'border-t border-(--line-soft)' : ''}>
                                {r.map((cell, j) => j === 0
                                    ? <th key={j} scope="row" className="text-left font-semibold px-5 py-3.5 align-top">{cell}</th>
                                    : <td key={j} className="px-5 py-3.5 align-top text-(--text-body)">{cell}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {note && <p className="mt-3 text-sm text-(--text-muted)">{note}</p>}
        </div>
    )
}
