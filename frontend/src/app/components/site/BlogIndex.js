import Link from 'next/link'

// Shared blog overview: featured newest article + grid. Typographic covers per category
// (no stock imagery); the category decides the cover treatment.
function coverClass(category) {
    const c = category.toLowerCase()
    if (c.includes('geo') && !c.includes('seo')) return 'bg-(--accent) text-(--on-accent)'
    if (c.includes('seo') && !c.includes('geo')) return 'bg-[oklch(21%_0.035_264)] text-[oklch(98%_0.004_255)]'
    return 'bg-(--tint) text-(--accent-ink) border border-(--line)'
}

function Cover({ article, large }) {
    return (
        <div className={`w-full max-w-full ${large ? 'aspect-16/10 text-[clamp(26px,3vw,38px)] p-6' : 'aspect-video text-xl p-4.5'} rounded-2xl flex items-end font-mono font-medium tracking-[-0.02em] overflow-hidden ${coverClass(article.category)}`} aria-hidden="true">
            {article.cover || article.category}
        </div>
    )
}

export default function BlogIndex({ title, lead, articles, basePath, readLabel }) {
    const [featured, ...rest] = articles
    return (
        <div className="max-w-300 mx-auto px-4 sm:px-8 pt-28 md:pt-34 pb-18 md:pb-28">
            <header className="mb-12 max-w-190">
                <h1 className="text-[clamp(34px,4.4vw,54px)] leading-[1.05] tracking-[-0.038em] font-bold">{title}</h1>
                <p className="mt-5 text-lg leading-relaxed text-(--text-body) max-w-[62ch]">{lead}</p>
            </header>

            <Link href={`${basePath}/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] gap-6 lg:gap-10 items-center mb-14">
                <Cover article={featured} large />
                <div className="flex flex-col gap-3.5">
                    <span className="text-[13px] font-semibold text-(--accent-ink)">{featured.category}</span>
                    <h2 className="text-[clamp(26px,3vw,36px)] leading-[1.12] font-bold tracking-[-0.03em] group-hover:text-(--accent-ink) transition-colors">{featured.title}</h2>
                    <p className="text-[15px] text-(--text-body) leading-relaxed">{featured.description}</p>
                    <p className="text-sm text-(--text-muted)">{featured.date} · {featured.readTime} {readLabel}</p>
                </div>
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {rest.map(a => (
                    <Link key={a.slug} href={`${basePath}/${a.slug}`} className="group flex flex-col gap-3 min-w-0">
                        <Cover article={a} />
                        <span className="text-[13px] font-semibold text-(--accent-ink)">{a.category}</span>
                        <h2 className="text-lg leading-snug font-semibold tracking-[-0.015em] group-hover:text-(--accent-ink) transition-colors">{a.title}</h2>
                        <p className="text-[15px] text-(--text-body) leading-relaxed line-clamp-3">{a.description}</p>
                        <p className="text-sm text-(--text-muted)">{a.date} · {a.readTime} {readLabel}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}
