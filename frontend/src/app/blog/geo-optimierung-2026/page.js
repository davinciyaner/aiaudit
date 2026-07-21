import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'GEO-Optimierung 2026: So wirst du von ChatGPT und Claude empfohlen',
    description: 'GEO (Generative Engine Optimization) erklärt: Wie du deine Website optimierst damit ChatGPT, Claude und Perplexity sie als Quelle zitieren. Konkrete Checkliste mit 19 Signalen.',
    keywords: 'GEO Optimierung, Generative Engine Optimization, ChatGPT Sichtbarkeit, Claude Sichtbarkeit, llms.txt, KI Sichtbarkeit, GEO SEO Unterschied',
    alternates: { canonical: 'https://www.sitecheckai.dev/blog/geo-optimierung-2026' },
    openGraph: {
        title: 'GEO-Optimierung 2026: So wirst du von ChatGPT und Claude empfohlen',
        description: 'Wie du deine Website für KI-Modelle optimierst. Mit konkreter Checkliste und GEO-Score-Tool.',
        url: 'https://www.sitecheckai.dev/blog/geo-optimierung-2026',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'GEO-Optimierung 2026: So wirst du von ChatGPT und Claude empfohlen',
    description: 'GEO (Generative Engine Optimization) erklärt: Wie du deine Website optimierst damit ChatGPT, Claude und Perplexity sie als Quelle zitieren.',
    image: 'https://www.sitecheckai.dev/blog/geo-optimierung-2026/opengraph-image',
    datePublished: '2026-06-10T09:00:00+02:00',
    dateModified: '2026-06-10T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.sitecheckai.dev/about' },
    publisher: {
        '@type': 'Organization',
        name: 'AuditAI',
        url: 'https://www.sitecheckai.dev',
        logo: { '@type': 'ImageObject', url: 'https://www.sitecheckai.dev/logo', width: 512, height: 512 },
    },
    url: 'https://www.sitecheckai.dev/blog/geo-optimierung-2026',
    mainEntityOfPage: 'https://www.sitecheckai.dev/blog/geo-optimierung-2026',
    about: [
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
        { '@type': 'Thing', name: 'KI-Sichtbarkeit' },
        { '@type': 'Thing', name: 'ChatGPT SEO' },
    ],
    mentions: [
        { '@type': 'Thing', name: 'ChatGPT', url: 'https://chat.openai.com' },
        { '@type': 'Thing', name: 'Claude', url: 'https://claude.ai' },
        { '@type': 'Thing', name: 'Perplexity', url: 'https://perplexity.ai' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was ist GEO-Optimierung?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'GEO steht für Generative Engine Optimization. Es bezeichnet die Optimierung einer Website, damit KI-Modelle wie ChatGPT, Claude oder Perplexity sie als vertrauenswürdige Quelle erkennen und in ihren Antworten zitieren. Ähnlich wie SEO für Google-Algorithmen optimiert, zielt GEO auf die Indexierung und Nutzung durch generative KI-Systeme ab.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist der Unterschied zwischen GEO und SEO?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'SEO optimiert für Suchmaschinen wie Google, die nach Keywords und Backlinks rankten. GEO optimiert für KI-Modelle, die nach strukturierten Daten, klaren Entitätsdefinitionen, Autorensignalen und zitierbaren Inhalten suchen. Beide sind wichtig: SEO bringt Traffic aus klassischen Suchen, GEO sorgt für Erwähnungen in KI-Antworten.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist llms.txt und warum ist es wichtig für GEO?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'llms.txt ist eine Textdatei im Root-Verzeichnis einer Website (ähnlich wie robots.txt), die speziell für KI-Modelle und Large Language Models lesbar ist. Sie beschreibt in strukturierter Form was die Website ist, was sie anbietet und welche Inhalte für KI-Crawler relevant sind. Viele KI-Crawler lesen llms.txt als erste Orientierung über eine Website.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie lange dauert es bis GEO-Optimierung wirkt?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'GEO wirkt anders als SEO. Technische Signale wie llms.txt, Schema.org-Daten und robots.txt-Einstellungen können innerhalb weniger Tage von KI-Crawlern aufgenommen werden. Ob ein KI-Modell eine Website dann tatsächlich zitiert, hängt von Training und Retrieval-Algorithmen ab - das kann Wochen bis Monate dauern. Perplexity und ähnliche RAG-basierte Systeme reagieren schneller als Modelle mit festem Trainingsdaten-Cutoff.',
            },
        },
    ],
}

const SIGNALS = [
    {
        number: '01',
        title: 'llms.txt erstellen',
        color: '#06b6d4',
        desc: 'Die wichtigste GEO-Datei. Erstelle eine Datei unter /llms.txt mit einer klaren Beschreibung deiner Website, deiner Produkte und deiner Kernaussagen. Strukturiere sie mit Markdown-Überschriften. Ergänze /llms-full.txt für eine ausführliche Version.',
        example: '# MeinTool\n> MeinTool ist ein X für Y, das Z in unter 60 Sekunden macht.',
        source: { label: 'llms.txt-Spezifikation (llmstxt.org)', url: 'https://llmstxt.org' },
    },
    {
        number: '02',
        title: 'Schema.org Structured Data',
        color: '#7c3aed',
        desc: 'JSON-LD im Head-Bereich deiner Seite. Mindestens Organization-Schema (Name, URL, Logo), FAQPage-Schema für häufige Fragen und je nach Website-Typ SoftwareApplication oder Product.',
        example: null,
        source: { label: 'Offizielle Schema.org-Dokumentation', url: 'https://schema.org' },
    },
    {
        number: '03',
        title: 'FAQ-Schema mit echtem HTML-Content',
        color: '#10b981',
        desc: 'Wichtig: FAQ-Schema im JSON-LD allein reicht nicht. Die Fragen und Antworten müssen auch als sichtbarer HTML-Text auf der Seite vorhanden sein. KI-Modelle scrapen den sichtbaren Content - nicht nur den Head.',
        example: null,
    },
    {
        number: '04',
        title: 'KI-Crawler in robots.txt erlauben',
        color: '#f59e0b',
        desc: 'Viele Websites blockieren unwissentlich KI-Crawler. Stelle sicher dass GPTBot, ClaudeBot, anthropic-ai, PerplexityBot und YouBot in deiner robots.txt explizit erlaubt sind.',
        example: 'User-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /',
        source: { label: 'Offizielle Crawler-Doku: OpenAI GPTBot', url: 'https://developers.openai.com/api/docs/bots' },
    },
    {
        number: '05',
        title: 'Klare Produktdefinition',
        color: '#ef4444',
        desc: 'KI-Modelle brauchen eine eindeutige "X ist Y für Z"-Definition. Schreibe auf deiner Homepage in einem der ersten Absätze präzise was dein Tool ist, für wen es ist und was es löst. Vermeide Marketingfloskeln.',
        example: null,
    },
    {
        number: '06',
        title: 'E-E-A-T Signale',
        color: '#a78bfa',
        desc: 'Experience, Expertise, Authoritativeness, Trustworthiness. KI-Modelle bevorzugen Quellen mit identifizierbarem Autor, Kontaktdaten, Datenschutzerklärung und Impressum. Eine /about-Seite mit Gründerinfo erhöht das Vertrauen erheblich.',
        example: null,
    },
]

export default function GeoArtikelPage() {
    return (
        <main className="bg-[#05080f] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <Navbar />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
                    <Link href="/" className="hover:text-slate-400 transition-colors">AuditAI</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-slate-400 transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-slate-500">GEO-Optimierung 2026</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-cyan-500/15 text-cyan-400">
                            GEO
                        </span>
                        <span className="text-xs text-slate-600">10. Juni 2026</span>
                        <span className="text-xs text-slate-600">· 8 min Lesezeit</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        GEO-Optimierung 2026: So wirst du von ChatGPT und Claude empfohlen
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Klassisches SEO optimiert für Google. Doch 2026 entscheiden KI-Modelle wie ChatGPT, Claude und Perplexity täglich welche Websites sie ihren Nutzern empfehlen - nach komplett anderen Regeln. Hier erfährst du wie GEO funktioniert und wie du deinen Score in 60 Minuten deutlich verbesserst.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-slate-600">
                        <Link href="/about" className="flex items-center gap-2 hover:text-slate-300 transition-colors">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-white text-[10px] font-bold">F</div>
                            <span>Finn Paustian</span>
                        </Link>
                        <span>·</span>
                        <span>Gründer, AuditAI</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/5 mb-10" />

                {/* Content */}
                <div className="prose prose-invert prose-slate max-w-none space-y-10 text-slate-300 leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Was ist GEO-Optimierung?</h2>
                        <p>
                            GEO steht für <strong className="text-white">Generative Engine Optimization</strong> - die Optimierung deiner Website für KI-Modelle wie ChatGPT, Claude, Perplexity, Gemini oder YouChat. Der Begriff wurde 2023 in der <a href="https://arxiv.org/abs/2311.09735" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">GEO-Forschungsarbeit von Princeton, Georgia Tech und dem Allen Institute for AI</a> geprägt. Während SEO darauf abzielt in Googles Suchergebnissen weit oben zu erscheinen, sorgt GEO dafür, dass KI-Modelle deine Website als vertrauenswürdige Quelle erkennen und in ihren Antworten zitieren.
                        </p>
                        <p className="mt-4">
                            Der Unterschied ist fundamental: Google rankt nach Keywords, Backlinks und technischen Signalen. KI-Modelle hingegen suchen nach <strong className="text-white">strukturierten, zitierbaren Inhalten</strong>, klaren Entitätsdefinitionen und Vertrauenssignalen. Eine Website die bei Google auf Seite 1 rankt, kann für KI-Modelle trotzdem unsichtbar sein - und umgekehrt.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Warum GEO 2026 entscheidend ist</h2>
                        <p>
                            ChatGPT hat laut <a href="https://techcrunch.com/2026/02/27/chatgpt-reaches-900m-weekly-active-users" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">OpenAI-Angaben über 900 Millionen wöchentliche Nutzer</a> (Stand Februar 2026). Perplexity beantwortet täglich Millionen von Suchanfragen mit zitierten Quellen. Claude wird zunehmend in Business-Workflows eingesetzt. Immer mehr Menschen fragen nicht mehr Google - sie fragen eine KI.
                        </p>
                        <p className="mt-4">
                            Wer bei diesen Antworten nicht vorkommt, verliert sichtbar an Reichweite - selbst wenn Google-Rankings sich nicht verändern. Das ist der blinde Fleck der meisten SEO-Strategien in 2026.
                        </p>
                        <div className="bg-cyan-500/8 border border-cyan-500/20 rounded-2xl p-5 mt-5">
                            <p className="text-sm text-cyan-300 font-medium mb-1">Wichtige Einschätzung</p>
                            <p className="text-sm text-slate-400">
                                GEO ersetzt SEO nicht - es ergänzt es. Wer heute nur für Google optimiert, lässt einen wachsenden Kanal ungenutzt. Die Websites die jetzt anfangen GEO-Signale aufzubauen, werden 2027 einen klaren Vorsprung haben.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">GEO vs. SEO: Die wichtigsten Unterschiede</h2>
                        <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <th className="text-left px-5 py-3 text-slate-400 font-semibold">Aspekt</th>
                                        <th className="text-left px-5 py-3 text-slate-400 font-semibold">SEO (Google)</th>
                                        <th className="text-left px-5 py-3 text-cyan-400 font-semibold">GEO (KI-Modelle)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['Ziel', 'Ranking in Suchergebnissen', 'Zitiert werden in KI-Antworten'],
                                        ['Kernfaktor', 'Keywords & Backlinks', 'Strukturierte Daten & Klarheit'],
                                        ['Technisch', 'robots.txt, Sitemap, Core Web Vitals', 'llms.txt, Schema.org, FAQ-Schema'],
                                        ['Content', 'Keyword-Dichte, E-E-A-T', 'Zitierbare Fakten, klare Definitionen'],
                                        ['Messung', 'Rankings, Impressions, CTR', 'GEO-Score, Crawler-Erlaubnis, Erwähnungen'],
                                    ].map(([aspect, seo, geo], i) => (
                                        <tr key={i} className="border-b border-white/[0.04] last:border-0">
                                            <td className="px-5 py-3 text-white font-medium">{aspect}</td>
                                            <td className="px-5 py-3 text-slate-400">{seo}</td>
                                            <td className="px-5 py-3 text-slate-300">{geo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-2">Die 6 wichtigsten GEO-Signale</h2>
                        <p className="text-slate-400 mb-6">AuditAI prüft insgesamt 19 GEO-Signale. Das sind die sechs mit dem größten Einfluss:</p>
                        <figure className="mb-6">
                            <Image
                                src="/blog/auditai-geo-report.png"
                                alt="AuditAI GEO-Report zeigt geprüfte KI-Sichtbarkeits-Signale wie llms.txt, Organization-Schema, KI-Crawler-Erlaubnis und sitemap.xml"
                                width={960}
                                height={411}
                                className="w-full h-auto rounded-2xl border border-white/[0.07]"
                            />
                            <figcaption className="text-xs text-slate-600 mt-2">
                                Ein echter GEO-Score-Report aus AuditAI — alle 12 KI-Sichtbarkeits-Signale auf einen Blick, inklusive gefundenem Fehler.
                            </figcaption>
                        </figure>
                        <div className="space-y-4">
                            {SIGNALS.map((s) => (
                                <div key={s.number} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
                                    <div className="flex items-start gap-4">
                                        <span className="text-[11px] font-bold font-mono shrink-0 mt-0.5" style={{ color: s.color }}>{s.number}</span>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                                            <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                                            {s.example && (
                                                <pre className="mt-3 text-xs bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 text-slate-400 font-mono overflow-x-auto">
                                                    {s.example}
                                                </pre>
                                            )}
                                            {s.source && (
                                                <a
                                                    href={s.source.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-3 inline-block text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
                                                >
                                                    Quelle: {s.source.label} ↗
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Welche KI-Modelle profitieren von GEO?</h2>
                        <p>
                            Nicht alle KI-Modelle funktionieren gleich. Es gibt zwei grundlegende Typen:
                        </p>
                        <p className="mt-4">
                            <strong className="text-white">RAG-basierte Systeme</strong> (Retrieval Augmented Generation) wie Perplexity oder Bing Copilot crawlen das Web in Echtzeit und zitieren Quellen direkt. Hier wirken GEO-Signale am schnellsten - innerhalb von Tagen bis Wochen.
                        </p>
                        <p className="mt-4">
                            <strong className="text-white">Modelle mit Trainings-Cutoff</strong> wie ChatGPT (ohne Browsing) oder Claude (ohne Websuche) kennen nur Inhalte aus ihrem Trainingsdatensatz. Hier dauert es länger - aber je mehr deine Website im öffentlichen Web diskutiert wird (GitHub, Reddit, HackerNews, Produktseiten), desto höher die Chance in zukünftige Trainingsläufe aufgenommen zu werden.
                        </p>
                        <p className="mt-4">
                            <strong className="text-white">Hybrid-Systeme</strong> wie ChatGPT mit aktivierter Websuche oder Claude mit Webzugang kombinieren beide Ansätze. Für diese ist eine gute technische GEO-Grundlage (llms.txt, Schema.org, saubere Canonicals) besonders wichtig.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">GEO-Checkliste: 10 Quick-Wins</h2>
                        <div className="space-y-2">
                            {[
                                ['llms.txt erstellen', '/llms.txt mit klarer Produktbeschreibung anlegen'],
                                ['llms-full.txt erstellen', 'Ausführliche Version mit Preisen, Features, FAQs'],
                                ['Organization Schema', 'JSON-LD mit Name, URL, Logo, sameAs'],
                                ['FAQ Schema + HTML-Content', 'Fragen im JSON-LD UND als sichtbarer Text auf der Seite'],
                                ['KI-Crawler erlauben', 'GPTBot, ClaudeBot, anthropic-ai, PerplexityBot in robots.txt'],
                                ['Sitemap aktuell halten', 'Alle relevanten Seiten in sitemap.xml'],
                                ['Klare Produktdefinition', '"X ist Y für Z" - in den ersten 100 Wörtern der Homepage'],
                                ['Zahlen & Statistiken', 'Konkrete Daten die KI-Modelle gerne zitieren'],
                                ['About/Founder-Seite', 'Wer steckt dahinter - E-E-A-T Signal für KI'],
                                ['Externe Quellenverweise', 'Links zu autoritären Quellen (Google, OWASP, Schema.org)'],
                            ].map(([title, desc], i) => (
                                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                                    <div className="w-5 h-5 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-[9px] font-bold text-cyan-400">{i + 1}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-white">{title}</span>
                                        <span className="text-sm text-slate-500"> - {desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Häufige Fragen zu GEO</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    q: 'Was ist GEO-Optimierung?',
                                    a: 'GEO steht für Generative Engine Optimization. Es bezeichnet die Optimierung einer Website, damit KI-Modelle wie ChatGPT, Claude oder Perplexity sie als vertrauenswürdige Quelle erkennen und in ihren Antworten zitieren. Ähnlich wie SEO für Google-Algorithmen optimiert, zielt GEO auf die Indexierung und Nutzung durch generative KI-Systeme ab.',
                                },
                                {
                                    q: 'Was ist der Unterschied zwischen GEO und SEO?',
                                    a: 'SEO optimiert für Suchmaschinen wie Google, die nach Keywords und Backlinks rankten. GEO optimiert für KI-Modelle, die nach strukturierten Daten, klaren Entitätsdefinitionen und zitierbaren Inhalten suchen. Beide sind wichtig und ergänzen sich gegenseitig.',
                                },
                                {
                                    q: 'Was ist llms.txt und warum ist es wichtig?',
                                    a: 'llms.txt ist eine Textdatei im Root-Verzeichnis einer Website (ähnlich wie robots.txt), die speziell für KI-Modelle lesbar ist. Sie beschreibt was die Website ist, was sie anbietet und welche Inhalte für KI-Crawler relevant sind. Viele KI-Crawler lesen llms.txt als erste Orientierung.',
                                },
                                {
                                    q: 'Wie lange dauert es bis GEO-Optimierung wirkt?',
                                    a: 'RAG-basierte Systeme wie Perplexity reagieren innerhalb von Tagen bis Wochen auf technische GEO-Signale. Modelle mit festem Trainingsdaten-Cutoff wie GPT-4 können Monate bis zum nächsten Training-Update benötigen. Technische Quick-Wins wie llms.txt und KI-Crawler-Erlaubnis wirken am schnellsten.',
                                },
                            ].map((faq, i) => (
                                <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
                                    <h3 className="font-semibold text-white mb-2 text-sm">{faq.q}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* CTA */}
                <div className="mt-14 bg-gradient-to-br from-cyan-950/40 to-[#05080f] border border-cyan-500/20 rounded-2xl p-6 sm:p-8 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                        Wie gut ist dein GEO-Score?
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        AuditAI prüft alle 19 GEO-Signale in unter 60 Sekunden - inklusive llms.txt, Schema.org, KI-Crawler-Erlaubnis und Content-Qualität. Start ohne Registrierung, für den vollständigen Report mit allen Scores meldest du dich kostenlos an.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20"
                    >
                        GEO-Score jetzt prüfen
                    </Link>
                    <div className="mt-3 text-xs text-slate-600">Ohne Registrierung starten · Voller Report kostenlos · 60 Sekunden</div>
                </div>

                {/* Back to blog */}
                <div className="mt-10 pt-8 border-t border-white/5">
                    <Link href="/blog" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                        ← Zurück zum Blog
                    </Link>
                </div>

            </article>

            <Footer />
        </main>
    )
}