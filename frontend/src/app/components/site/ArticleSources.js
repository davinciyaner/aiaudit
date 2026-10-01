// Primary sources at the end of a blog article (de + en). Plain server component.
export default function ArticleSources({ title, sources }) {
    return (
        <section className="mt-12 pt-8 border-t border-(--line)" aria-labelledby="quellen">
            <h2 id="quellen" className="text-lg font-semibold text-(--text-white) mb-4">{title}</h2>
            <ol className="flex flex-col gap-2.5 text-[15px] list-decimal pl-5 marker:text-(--text-muted)">
                {sources.map(s => (
                    <li key={s.href} className="text-(--text-body) leading-relaxed pl-1">
                        <a href={s.href} target="_blank" rel="noopener noreferrer"
                            className="text-(--accent-ink) underline underline-offset-2 hover:no-underline">{s.label}</a>
                        <span className="text-(--text-muted)">, {s.publisher}</span>
                    </li>
                ))}
            </ol>
        </section>
    )
}
