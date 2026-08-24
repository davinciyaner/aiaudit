import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Was ist GEO? Generative Engine Optimization einfach erklärt (+ Checkliste 2026)',
    description: 'GEO (Generative Engine Optimization) bezeichnet die Optimierung von Content für KI-Antworten wie ChatGPT, Claude und Google AI Overview. Definition, Unterschied zu SEO und 19-Punkte-Checkliste.',
    keywords: 'was ist geo, GEO Optimierung, Generative Engine Optimization, ChatGPT SEO, KI Suchmaschinenoptimierung, ChatGPT Sichtbarkeit, Claude Sichtbarkeit, llms.txt, KI Sichtbarkeit, GEO SEO Unterschied',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/blog/geo-optimierung-2026',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/blog/geo-optimierung-2026',
            'en-US': 'https://www.sitecheckai.dev/en/blog/what-is-geo',
        },
    },
    openGraph: {
        title: 'Was ist GEO? Generative Engine Optimization einfach erklärt (+ Checkliste 2026)',
        description: 'GEO (Generative Engine Optimization) erklärt: Definition, Unterschied zu SEO und konkrete Checkliste mit 19 Signalen für ChatGPT, Claude und Google AI Overview.',
        url: 'https://www.sitecheckai.dev/blog/geo-optimierung-2026',
        type: 'article',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Was ist GEO? Generative Engine Optimization einfach erklärt (+ Checkliste 2026)',
    description: 'GEO (Generative Engine Optimization) bezeichnet die Optimierung von Content für KI-Antworten wie ChatGPT, Claude und Google AI Overview. Definition, Unterschied zu SEO und 19-Punkte-Checkliste.',
    image: 'https://www.sitecheckai.dev/blog/geo-optimierung-2026/opengraph-image',
    datePublished: '2026-06-10T09:00:00+02:00',
    dateModified: '2026-08-24T09:00:00+02:00',
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

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AuditAI', item: 'https://www.sitecheckai.dev' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sitecheckai.dev/blog' },
        { '@type': 'ListItem', position: 3, name: 'Was ist GEO?', item: 'https://www.sitecheckai.dev/blog/geo-optimierung-2026' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was ist Generative Engine Optimization (GEO)?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Generative Engine Optimization (GEO) ist die Optimierung einer Website, damit generative KI-Modelle wie ChatGPT, Claude, Perplexity und Google AI Overview sie als vertrauenswürdige Quelle erkennen und in ihren Antworten zitieren - im Unterschied zu klassischem SEO, das für Ranking-Positionen in Suchergebnissen optimiert. Der Begriff wurde 2023 in einer gemeinsamen Forschungsarbeit von Princeton, Georgia Tech und dem Allen Institute for AI geprägt.',
            },
        },
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
                text: 'llms.txt ist eine Textdatei im Root-Verzeichnis einer Website (ähnlich wie robots.txt), die speziell für KI-Modelle und Large Language Models lesbar sein soll. Sie beschreibt in strukturierter Form, was die Website ist und was sie anbietet. Wichtig: Kein großer KI-Anbieter hat bestätigt, die Datei tatsächlich zu nutzen - Google hat explizit erklärt, dass sie für Suche und AI Overviews nicht notwendig ist. llms.txt ist also kein bestätigtes GEO-Signal, kann aber trotzdem als saubere Produkt-Dokumentation sinnvoll sein.',
            },
        },
        {
            '@type': 'Question',
            name: 'Was ist ChatGPT SEO?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: '"ChatGPT SEO" ist eine umgangssprachliche Bezeichnung für GEO (Generative Engine Optimization) mit Fokus auf ChatGPT konkret - also die Optimierung einer Website, damit ChatGPT sie in seinen Antworten erwähnt oder empfiehlt. Fachlich ist GEO der breitere Begriff, da er alle KI-Modelle (ChatGPT, Claude, Perplexity, Google AI Overview) abdeckt, aber die Techniken dahinter sind identisch: strukturierte Daten, llms.txt, klare Produktdefinitionen und zitierbare Fakten.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie lange dauert es bis GEO-Optimierung wirkt?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'GEO wirkt anders als SEO. Technische Signale wie Schema.org-Daten und robots.txt-Crawler-Freigaben können innerhalb weniger Tage von KI-Crawlern aufgenommen werden (llms.txt ausgenommen, da bislang kein großer Anbieter dessen Nutzung bestätigt hat). Ob ein KI-Modell eine Website dann tatsächlich zitiert, hängt von Training und Retrieval-Algorithmen ab - das kann Wochen bis Monate dauern. Perplexity und ähnliche RAG-basierte Systeme reagieren schneller als Modelle mit festem Trainingsdaten-Cutoff.',
            },
        },
    ],
}

const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'GEO-Optimierung: Die 10 wichtigsten Quick-Wins umsetzen',
    description: 'Die zehn GEO-Quick-Wins in der Reihenfolge, in der sie zuerst umgesetzt werden sollten.',
    totalTime: 'PT60M',
    step: [
        { '@type': 'HowToStep', name: 'llms.txt erstellen', text: '/llms.txt mit klarer Produktbeschreibung anlegen.' },
        { '@type': 'HowToStep', name: 'llms-full.txt erstellen', text: 'Ausführliche Version mit Preisen, Features, FAQs.' },
        { '@type': 'HowToStep', name: 'Organization Schema', text: 'JSON-LD mit Name, URL, Logo, sameAs einbinden.' },
        { '@type': 'HowToStep', name: 'FAQ Schema + HTML-Content', text: 'Fragen im JSON-LD UND als sichtbarer Text auf der Seite.' },
        { '@type': 'HowToStep', name: 'KI-Crawler erlauben', text: 'GPTBot, ClaudeBot, anthropic-ai, PerplexityBot in robots.txt zulassen.' },
        { '@type': 'HowToStep', name: 'Sitemap aktuell halten', text: 'Alle relevanten Seiten in sitemap.xml eintragen.' },
        { '@type': 'HowToStep', name: 'Klare Produktdefinition', text: '"X ist Y für Z" in den ersten 100 Wörtern der Homepage.' },
        { '@type': 'HowToStep', name: 'Zahlen & Statistiken', text: 'Konkrete Daten liefern, die KI-Modelle gerne zitieren.' },
        { '@type': 'HowToStep', name: 'About/Founder-Seite', text: 'Wer steckt dahinter - E-E-A-T-Signal für KI-Modelle.' },
        { '@type': 'HowToStep', name: 'Externe Quellenverweise', text: 'Links zu autoritären Quellen wie Google, OWASP oder Schema.org setzen.' },
    ],
}

const SIGNALS = [
    {
        number: '01',
        title: 'llms.txt erstellen',
        color: '#06b6d4',
        desc: 'Eine unter GEO-Fans verbreitete, aber bislang unbestätigte Datei: Kein großer KI-Anbieter (Google, OpenAI, Anthropic) hat bestätigt, llms.txt tatsächlich zu nutzen - Google hat sie sogar explizit als für Suche und AI Overviews überflüssig bezeichnet. Sie schadet trotzdem nicht und dient als kompakte Produkt-Dokumentation: eine Datei unter /llms.txt mit klarer Beschreibung deiner Website, deiner Produkte und Kernaussagen, strukturiert mit Markdown-Überschriften. Optional ergänzt um /llms-full.txt als ausführliche Version.',
        example: '# MeinTool\n> MeinTool ist ein X für Y, das Z in unter 60 Sekunden macht.',
        source: { label: 'llms.txt-Spezifikation (llmstxt.org)', url: 'https://llmstxt.org' },
        internalLink: { label: 'llms.txt ausführlich erklärt', href: '/blog/llms-txt-erklaert' },
    },
    {
        number: '02',
        title: 'Schema.org Structured Data',
        color: '#7c3aed',
        desc: 'JSON-LD im Head-Bereich deiner Seite. Mindestens Organization-Schema (Name, URL, Logo), FAQPage-Schema für häufige Fragen und je nach Website-Typ SoftwareApplication oder Product.',
        example: null,
        source: { label: 'Offizielle Schema.org-Dokumentation', url: 'https://schema.org' },
        internalLink: { label: 'Schema Markup für KI-Zitate im Detail', href: '/blog/schema-markup-ki-zitate' },
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
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Navbar />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
                    <Link href="/" className="hover:text-slate-400 transition-colors">AuditAI</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-slate-400 transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-slate-500">Was ist GEO?</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-cyan-500/15 text-cyan-400">
                            GEO
                        </span>
                        <span className="text-xs text-slate-600">10. Juni 2026</span>
                        <span className="text-xs text-slate-600">· 8 min Lesezeit</span>
                        <span className="text-xs text-slate-600">· Aktualisiert am 24. August 2026</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
                        Was ist GEO? Generative Engine Optimization einfach erklärt
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Klassisches SEO optimiert für Google. Doch 2026 entscheiden KI-Modelle wie ChatGPT, Claude, Perplexity und Google AI Overview täglich welche Websites sie ihren Nutzern empfehlen - nach komplett anderen Regeln. Hier erfährst du wie GEO funktioniert und wie du deinen Score in 60 Minuten deutlich verbesserst.
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

                    <nav aria-label="Inhaltsverzeichnis" className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">In diesem Artikel</p>
                        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                            <li><a href="#was-ist-geo" className="text-slate-400 hover:text-cyan-300 transition-colors">Was ist GEO-Optimierung (Generative Engine Optimization)?</a></li>
                            <li><a href="#warum-geo" className="text-slate-400 hover:text-cyan-300 transition-colors">Warum ist GEO 2026 entscheidend?</a></li>
                            <li><a href="#geo-vs-seo" className="text-slate-400 hover:text-cyan-300 transition-colors">GEO vs. SEO im Vergleich</a></li>
                            {SIGNALS.map((s) => (
                                <li key={s.number}>
                                    <a href={`#signal-${s.number}`} className="text-slate-400 hover:text-cyan-300 transition-colors">
                                        <span className="font-mono text-slate-600 mr-1.5">{s.number}</span>{s.title}
                                    </a>
                                </li>
                            ))}
                            <li><a href="#ki-modelle" className="text-slate-400 hover:text-cyan-300 transition-colors">Welche KI-Modelle profitieren von GEO?</a></li>
                            <li><a href="#quick-wins" className="text-slate-400 hover:text-cyan-300 transition-colors">10 GEO-Quick-Wins</a></li>
                            <li><a href="#faq" className="text-slate-400 hover:text-cyan-300 transition-colors">Häufige Fragen</a></li>
                        </ol>
                    </nav>

                    <section id="was-ist-geo" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Was ist GEO-Optimierung (Generative Engine Optimization)?</h2>
                        <p>
                            GEO steht für <strong className="text-white">Generative Engine Optimization</strong> (manchmal auch als KI-Suchmaschinenoptimierung oder ChatGPT SEO bezeichnet) - die Optimierung deiner Website für KI-Modelle wie ChatGPT, Claude, Perplexity, Gemini oder YouChat. Der Begriff wurde 2023 in der <a href="https://arxiv.org/abs/2311.09735" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">GEO-Forschungsarbeit von Princeton, Georgia Tech und dem Allen Institute for AI</a> geprägt. Während SEO darauf abzielt in Googles Suchergebnissen weit oben zu erscheinen, sorgt GEO dafür, dass KI-Modelle deine Website als vertrauenswürdige Quelle erkennen und in ihren Antworten zitieren.
                        </p>
                        <p className="mt-4">
                            Der Unterschied ist fundamental: Google rankt nach Keywords, Backlinks und technischen Signalen. KI-Modelle hingegen suchen nach <strong className="text-white">strukturierten, zitierbaren Inhalten</strong>, klaren Entitätsdefinitionen und Vertrauenssignalen. Eine Website die bei Google auf Seite 1 rankt, kann für KI-Modelle trotzdem unsichtbar sein - und umgekehrt.
                        </p>
                    </section>

                    <section id="warum-geo" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Warum ist GEO 2026 entscheidend?</h2>
                        <p>
                            ChatGPT hat laut <a href="https://techcrunch.com/2026/02/27/chatgpt-reaches-900m-weekly-active-users" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">OpenAI-Angaben über 900 Millionen wöchentliche Nutzer</a> (Stand Februar 2026). Perplexity liefert als Antwortmaschine direkt zitierte Quellen statt einer Linkliste und wächst weiter rapide. Claude wird zunehmend in Business-Workflows eingesetzt. Immer mehr Menschen fragen nicht mehr Google - sie fragen eine KI.
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

                    <section id="geo-vs-seo" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">GEO vs. SEO: Was ist der Unterschied?</h2>
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
                        <h2 className="text-2xl font-bold text-white mb-2">Was sind die 6 wichtigsten GEO-Signale?</h2>
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
                                <div key={s.number} id={`signal-${s.number}`} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 scroll-mt-28">
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
                                            {s.internalLink && (
                                                <Link
                                                    href={s.internalLink.href}
                                                    className="mt-3 ml-4 inline-block text-xs text-violet-400 hover:text-violet-300 underline underline-offset-2"
                                                >
                                                    {s.internalLink.label} →
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="ki-modelle" className="scroll-mt-28">
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
                            <strong className="text-white">Hybrid-Systeme</strong> wie ChatGPT mit aktivierter Websuche oder Claude mit Webzugang kombinieren beide Ansätze. Für diese ist eine gute technische GEO-Grundlage (Schema.org, saubere Canonicals, zitierbare Fakten) besonders wichtig.
                        </p>
                    </section>

                    <section id="quick-wins" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Welche 10 GEO-Quick-Wins solltest du zuerst umsetzen?</h2>
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

                    <section id="faq" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-white mb-4">Häufige Fragen zu GEO</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    q: 'Was ist Generative Engine Optimization (GEO)?',
                                    a: 'Generative Engine Optimization (GEO) ist die Optimierung einer Website, damit generative KI-Modelle wie ChatGPT, Claude, Perplexity und Google AI Overview sie als vertrauenswürdige Quelle erkennen und in ihren Antworten zitieren - im Unterschied zu klassischem SEO, das für Ranking-Positionen in Suchergebnissen optimiert. Der Begriff wurde 2023 in einer gemeinsamen Forschungsarbeit von Princeton, Georgia Tech und dem Allen Institute for AI geprägt.',
                                },
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
                                    a: 'llms.txt ist eine Textdatei im Root-Verzeichnis einer Website (ähnlich wie robots.txt), die speziell für KI-Modelle lesbar sein soll. Sie beschreibt, was die Website ist und was sie anbietet. Kein großer KI-Anbieter hat bislang bestätigt, die Datei tatsächlich zu nutzen - Google hat sie sogar explizit als überflüssig bezeichnet. Sie ist also kein bestätigtes GEO-Signal, kann aber trotzdem als saubere Produkt-Dokumentation sinnvoll sein.',
                                },
                                {
                                    q: 'Was ist ChatGPT SEO?',
                                    a: '"ChatGPT SEO" ist eine umgangssprachliche Bezeichnung für GEO mit Fokus auf ChatGPT konkret - die Optimierung einer Website, damit ChatGPT sie in Antworten erwähnt oder empfiehlt. Fachlich ist GEO der breitere Begriff für alle KI-Modelle, die Techniken dahinter sind aber identisch: strukturierte Daten, llms.txt, klare Produktdefinitionen und zitierbare Fakten.',
                                },
                                {
                                    q: 'Wie lange dauert es bis GEO-Optimierung wirkt?',
                                    a: 'RAG-basierte Systeme wie Perplexity reagieren innerhalb von Tagen bis Wochen auf technische GEO-Signale. Modelle mit festem Trainingsdaten-Cutoff wie GPT-4 können Monate bis zum nächsten Training-Update benötigen. Technische Quick-Wins wie Schema Markup und KI-Crawler-Erlaubnis wirken am schnellsten - llms.txt ausgenommen, da bislang kein großer Anbieter dessen Nutzung bestätigt hat.',
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