import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: 'Sichtbarkeit in Claude tracken 2026: Claude AI Sichtbarkeit prüfen',
    description: 'Wie Claude AI entscheidet, wen es zitiert: Training vs. Websuche, Crawler-Steuerung und Zitierregeln. Sichtbarkeit in Claude mit Scanora tracken.',
    keywords: 'sichtbarkeit in claude, claude ai sichtbarkeit, claude sichtbarkeit tracken, claude visibility tracking, claude ai visibility, perplexity sichtbarkeit, claude ki sichtbarkeit, generative engine optimization claude',
    alternates: {
        canonical: 'https://www.scanora.ai/loesungen/claude-ai-sichtbarkeit-tracken',
        languages: {
            'de-DE': 'https://www.scanora.ai/loesungen/claude-ai-sichtbarkeit-tracken',
            'en-US': 'https://www.scanora.ai/en/solutions/claude-ai-visibility-tracking',
        },
    },
    openGraph: {
        title: 'Sichtbarkeit in Claude tracken 2026: Claude AI Sichtbarkeit prüfen',
        description: 'Sichtbarkeit in Claude tracken ab 4,99 €/Monat - während die meisten anderen Tools Claude nur als teures Enterprise-Add-on anbieten.',
        url: 'https://www.scanora.ai/loesungen/claude-ai-sichtbarkeit-tracken',
        type: 'article',
        locale: 'de_DE',
        images: ['https://www.scanora.ai/loesungen/claude-ai-sichtbarkeit-tracken/opengraph-image'],
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Sichtbarkeit in Claude tracken 2026: Claude AI Sichtbarkeit prüfen',
    description: 'Sichtbarkeit in Claude tracken ab 4,99 €/Monat, Perplexity und ChatGPT ab 74,99 €/Monat - während Claude-Tracking bei den meisten AI-Visibility-Tools nur als teures Enterprise-Add-on verfügbar ist.',
    image: 'https://www.scanora.ai/loesungen/claude-ai-sichtbarkeit-tracken/opengraph-image',
    datePublished: '2026-08-29T09:00:00+02:00',
    dateModified: '2026-10-01T09:00:00+02:00',
    author: { '@type': 'Person', name: 'Finn Paustian', url: 'https://www.scanora.ai/about' },
    publisher: {
        '@type': 'Organization',
        name: 'Scanora',
        url: 'https://www.scanora.ai',
        logo: { '@type': 'ImageObject', url: 'https://www.scanora.ai/logo', width: 512, height: 512 },
    },
    url: 'https://www.scanora.ai/loesungen/claude-ai-sichtbarkeit-tracken',
    mainEntityOfPage: 'https://www.scanora.ai/loesungen/claude-ai-sichtbarkeit-tracken',
    about: [
        { '@type': 'Thing', name: 'AI Visibility Tracking' },
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
        { '@type': 'Thing', name: 'Claude (Anthropic)' },
    ],
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Scanora', item: 'https://www.scanora.ai' },
        { '@type': 'ListItem', position: 2, name: 'Lösungen', item: 'https://www.scanora.ai/loesungen' },
        { '@type': 'ListItem', position: 3, name: 'Sichtbarkeit in Claude tracken', item: 'https://www.scanora.ai/loesungen/claude-ai-sichtbarkeit-tracken' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Was bedeutet "Sichtbarkeit in Claude"?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Sichtbarkeit in Claude beschreibt, ob und wie oft Anthropics Claude deine Website oder Marke erwähnt, wenn Nutzer zu relevanten Themen aus deiner Branche fragen. Gemessen wird das über die Mention-Rate (Anteil der Prüfungen mit Erwähnung) und über Zitate mit Quellenkontext, die zeigen, in welchem Zusammenhang und mit welchem Sentiment du genannt wirst. Anders als eine einmalige Stichprobe zeigt automatisiertes, wöchentliches Tracking den Verlauf über Zeit - inklusive welcher Konkurrenten Claude stattdessen zitiert.',
            },
        },
        {
            '@type': 'Question',
            name: 'Sucht Claude bei jeder Anfrage im Web, oder antwortet es auch ohne Suche?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nein. Laut Anthropics eigener Dokumentation antwortet Claude bei stabilem Wissen (etablierte Fakten, Grundlagenwissen) direkt aus dem Training. Es sucht aktiv, wenn eine Frage aktuelle, veränderliche oder produktspezifische Informationen verlangt - genau der Fall bei den meisten Kaufentscheidungs-Prompts.',
            },
        },
        {
            '@type': 'Question',
            name: 'Kann ich als Website-Betreiber steuern, ob Claude meine Seite fürs Training oder nur für Live-Antworten nutzt?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja. Anthropic betreibt drei getrennte Crawler (ClaudeBot fürs Training, Claude-User und Claude-SearchBot für Live-Anfragen), die sich einzeln per robots.txt steuern lassen. Ein pauschales Blockieren "aller Bots" nimmt dir beide Kanäle gleichzeitig.',
            },
        },
        {
            '@type': 'Question',
            name: 'Hat Constitutional AI Einfluss darauf, welche Quellen Claude zitiert?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nach Anthropics eigener Veröffentlichung zur Verfassung: nein, jedenfalls nicht direkt. Die Prinzipien betreffen Schadensvermeidung und ethisches Verhalten, nicht die Auswahl von Quellen in einer Websuche-Antwort. Die Quellenauswahl steuert der Websuche-Mechanismus selbst.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie unterscheidet sich "Sichtbarkeit in Claude" von "Sichtbarkeit in ChatGPT"?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Technisch vor allem in der Zugriffssteuerung: Claude trennt Training und Live-Suche über drei separate Crawler, ChatGPT hat Websuche standardmäßig aktiviert und ein einheitlicheres Crawler-System. Inhaltlich zählen bei beiden ähnliche Faktoren: Auffindbarkeit, kompakte Fakten, Aktualität.',
            },
        },
        {
            '@type': 'Question',
            name: 'Warum ist Claude-Tracking bei vielen Tools so teuer oder gar nicht verfügbar?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Bei mehreren bekannten AI-Visibility-Tools ist Claude entweder nur im individuell bepreisten Enterprise-Tarif enthalten oder ein separates Add-on, das erst ab höheren Preisstufen buchbar ist. Das liegt vermutlich an den API-Kosten und daran, dass viele Tools ursprünglich primär auf ChatGPT und Google AI Overview ausgerichtet waren. Scanora hat Claude von Anfang an in den günstigsten Plan integriert.',
            },
        },
        {
            '@type': 'Question',
            name: 'Wie oft wird meine Sichtbarkeit bei Claude geprüft?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Automatisch einmal pro Woche, zusätzlich sind je nach Plan 2 bis 3 manuelle Checks pro Monat möglich. Ab dem Pro-Plan läuft jeder Check über zwei Prompt-Varianten (empfehlungsorientiert und vergleichend), damit sichtbar wird, bei welcher Art von Anfrage du erwähnt wirst.',
            },
        },
        {
            '@type': 'Question',
            name: 'Kann ich Claude-Tracking mit anderen KI-Plattformen kombinieren?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja. Der Einsteiger-Plan (4,99 €/Monat) deckt Claude und Gemini ab, der Pro-Plan (74,99 €/Monat) ergänzt ChatGPT, Perplexity und Google AI Overview im selben Dashboard - ohne separate Buchung pro Plattform.',
            },
        },
        {
            '@type': 'Question',
            name: 'Trackt Scanora auch Perplexity-Sichtbarkeit?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja. Perplexity ist neben Claude, ChatGPT, Gemini und Google AI Overview eine der fünf Plattformen, die Scanora im Pro-Plan (74,99 €/Monat) wöchentlich automatisch prüft - im selben Dashboard und mit denselben zwei Prompt-Varianten pro Keyword wie bei Claude. So siehst du direkt, ob dich Perplexity bei einer Anfrage nennt, obwohl Claude dich (noch) nicht erwähnt, oder umgekehrt.',
            },
        },
        {
            '@type': 'Question',
            name: 'Kann ich Claude-Sichtbarkeit kostenlos testen?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja, ohne Anmeldung und ohne Kreditkarte. Ein einmaliger Audit inklusive GEO-Sichtbarkeit ist über den dauerhaft kostenlosen Plan möglich. Die laufende, wöchentliche Automatisierung ab 4,99 €/Monat hat zusätzlich 14 Tage kostenlose Testphase.',
            },
        },
    ],
}

const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Sichtbarkeit in Claude tracken',
    description: 'So richtest du automatisiertes Tracking ein, ob Claude (und optional Perplexity) deine Website bei relevanten Anfragen erwähnt.',
    step: [
        { '@type': 'HowToStep', position: 1, name: 'Keywords festlegen', text: 'Themen und Suchanfragen definieren, zu denen Claude deine Marke erwähnen könnte.' },
        { '@type': 'HowToStep', position: 2, name: 'Prompt-Varianten prüfen', text: 'Jedes Keyword sowohl empfehlungsorientiert als auch vergleichend abfragen, da Claude je nach Formulierung unterschiedlich antwortet.' },
        { '@type': 'HowToStep', position: 3, name: 'Automatisch wöchentlich checken', text: 'Die Abfragen wöchentlich automatisiert wiederholen statt einmalig zu prüfen, um Veränderungen über Zeit zu erkennen.' },
        { '@type': 'HowToStep', position: 4, name: 'Auswerten und reagieren', text: 'Erwähnung, Sentiment und zitierte Konkurrenten auswerten und daraus konkrete Fixes ableiten (llms.txt, Schema Markup, Crawler-Freigaben).' },
    ],
}

const MARKET_ROWS = [
    ['Scanora', '4,99 €/Monat', 'Ja, von Anfang an im Einsteiger-Plan enthalten'],
    ['Peec.ai', '85 €/Monat', 'Nein, nur im individuell bepreisten Enterprise-Tarif'],
    ['LLM Pulse', '49 €/Monat', 'Nein, nur als kostenpflichtiges Add-on auf dem Enterprise-Plan'],
    ['Rankscale', '20 $/Monat', 'Ja, aber über ein Credit-System statt Fixpreis abgerechnet'],
]

const CLAUDE_CRAWLERS = [
    { name: 'ClaudeBot', role: 'Sammelt Daten für das Modelltraining.' },
    { name: 'Claude-User', role: 'Ruft Seiten ab, wenn ein Nutzer eine konkrete Suche auslöst.' },
    { name: 'Claude-SearchBot', role: 'Verbessert die Qualität der Suchergebnisse und Indexierung.' },
]

const VISIBILITY_FACTORS = [
    { num: 1, title: 'Crawler-Zugriff', text: 'Ohne Freigabe für ClaudeBot, Claude-User und Claude-SearchBot in der robots.txt bist du aus beiden Kanälen - Training und Live-Suche - ausgeschlossen. Das ist die Grundvoraussetzung vor jeder inhaltlichen Optimierung.' },
    { num: 2, title: 'Klassische Auffindbarkeit', text: 'Claudes Websuche-Tool greift auf reguläre Suchergebnisse zurück. Wer bei Google nicht sauber indexiert ist, taucht auch in Claudes Suchergebnissen nicht auf - technisches SEO ist damit indirekt auch GEO.' },
    { num: 3, title: 'Kompakte, eigenständige Fakten-Sätze', text: 'Pro Quelle zitiert Claude nur einen Ausschnitt von bis zu 150 Zeichen. Sätze, die auch isoliert verständlich sind und eine konkrete Aussage treffen, gewinnen gegen verschachtelte Marketing-Formulierungen.' },
    { num: 4, title: 'Sichtbares Aktualitätsdatum', text: 'Claude erhält zu jedem Suchergebnis das Alter der Seite mitgeliefert. Bei Themen mit Aktualitätsbezug - Preise, Vergleichszahlen, DR-Werte - spricht ein gepflegtes "Stand: [Monat/Jahr]" für sich.' },
    { num: 5, title: 'Nachbarschaft in Domain-Listen', text: 'Wer Claude in eine eigene Anwendung integriert, kann die Websuche auf bestimmte Domains beschränken oder ausschließen. Erwähnungen auf seriösen Drittseiten erhöhen die Chance, in einer solchen Nachbarschaft mitgedacht zu werden.' },
    { num: 6, title: 'Präsenz im Trainingskorpus', text: 'Für Antworten ohne Websuche zählt nur, was zum Trainingsstichtag öffentlich prominent war - Wikipedia, Presse, breit verlinkte Verzeichniseinträge. Sehr neue oder isoliert stehende Seiten haben hier praktisch keine Chance.' },
]

const VISIBILITY_STRATEGIES = [
    { num: 1, title: 'robots.txt aktiv prüfen', text: 'ClaudeBot, Claude-User und Claude-SearchBot müssen explizit erlaubt sein. Ein pauschales Disallow für alle Bots trifft auch diese drei mit.' },
    { num: 2, title: 'Technisches SEO nicht vernachlässigen', text: 'Claude sucht über reale Suchergebnisse - jede Verbesserung deiner klassischen Google-Sichtbarkeit wirkt sich indirekt auch auf deine Claude-Sichtbarkeit aus.' },
    { num: 3, title: 'In zitierfähigen Sätzen schreiben', text: 'Eine Kernaussage pro Satz, konkrete Zahlen und Namen statt vager Formulierungen. Testfrage: Ergibt dieser eine Satz auch isoliert für sich Sinn?' },
    { num: 4, title: 'Aktualität sichtbar machen', text: 'Ein gepflegtes Datum bei Vergleichs- und Datenseiten ist ein Signal, das Claude direkt mitgeliefert bekommt.' },
    { num: 5, title: 'Substanzielle Drittpräsenz aufbauen', text: 'Erwähnungen in Fachpresse, anerkannten Verzeichnissen und - wo thematisch gerechtfertigt - Wikipedia erhöhen sowohl die Chance auf Trainingskorpus-Präsenz als auch auf vertrauenswürdige Domain-Nachbarschaften.' },
    { num: 6, title: 'Regelmäßig selbst testen', text: 'Frag Claude mit aktivierter Websuche typische Kaufentscheidungs-Prompts aus deiner Branche und prüfe, ob dein Produkt auftaucht - genau diese Lücken schließt du dann gezielt auf deiner Seite.' },
]

const PLATFORM_COMPARISON_ROWS = [
    ['Grundprinzip', 'LLM mit optionalem Websuche-Tool, das Entwickler pro Anwendung gezielt aktivieren', 'Websuche standardmäßig aktiv, drei Stufen: schnelle Suche, agentisches Reasoning, Deep Research', 'Von Grund auf Such-Engine; vier Modellstufen (Sonar bis Sonar Deep Research) - Suche ist Kernprodukt'],
    ['Wann wird gesucht?', 'Claude entscheidet selbst nach Aktualitätsbedarf der Frage; über Systemprompt und Suchlimit steuerbar', 'Standardmäßig bei jeder Anfrage aktiv, lässt sich deaktivieren', 'Grundsätzlich bei jeder Antwort - Modellwahl bestimmt nur die Recherchetiefe'],
    ['Zitierformat', 'Präziser Ausschnitt bis 150 Zeichen pro Quelle, exakt im Text verortet', 'Inline-Zitate mit Start-/End-Position, plus separate "Sources"-Liste aller konsultierten Seiten', 'Inline-Quellenangaben nach Relevanz/Aktualität - Auswahlkriterien nicht offiziell dokumentiert'],
    ['Steuerung durch dich', 'Granular über drei getrennte Bots für Training, Live-Nutzeranfrage und Suchindex', 'Ein Crawler-System; Domain-Filterung liegt beim App-Entwickler, nicht bei dir', 'Eigenes Crawling, kaum öffentlich dokumentierte Steuerungsmöglichkeiten'],
]

const CLAUDE_SOURCES = [
    { label: 'Anthropic: Web search tool - Dokumentation', href: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool' },
    { label: "Anthropic: Claude's Constitution", href: 'https://www.anthropic.com/news/claudes-constitution' },
    { label: 'Anthropic Support: Wie Anthropic das Web crawlt', href: 'https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler' },
    { label: 'OpenAI: Web search guide', href: 'https://developers.openai.com/api/docs/guides/tools-web-search' },
    { label: 'Perplexity: Model-Dokumentation', href: 'https://docs.perplexity.ai/getting-started/models' },
]

const TRACKING_STEPS = [
    { num: 1, title: 'Keywords festlegen', text: 'Themen und Suchanfragen definieren, zu denen Claude deine Marke erwähnen könnte - z. B. "bestes Tool für X" oder "X vs Y".' },
    { num: 2, title: 'Zwei Prompt-Varianten prüfen', text: 'Jedes Keyword empfehlungsorientiert ("Welches Tool kennst du für X?") und vergleichend ("Was ist das beste Tool für X?") abfragen - Claude antwortet je nach Formulierung unterschiedlich.' },
    { num: 3, title: 'Wöchentlich automatisch wiederholen', text: 'Eine Einzelmessung zeigt nur eine Momentaufnahme. Wöchentliches Tracking zeigt, ob sich deine Sichtbarkeit verbessert, verschlechtert oder stabil bleibt.' },
    { num: 4, title: 'Auswerten und Fixes ableiten', text: 'Erwähnung, Sentiment und welche Konkurrenten stattdessen zitiert werden auswerten - und daraus konkrete technische Fixes ableiten (llms.txt, Schema Markup, Crawler-Freigaben für ClaudeBot).' },
]

export default function ClaudeAiSichtbarkeitPage() {
    return (
        <main className="bg-(--bg-base) min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
            <Navbar />

            <article className="max-w-190 mx-auto px-4 sm:px-8 pt-28 md:pt-34 pb-18 md:pb-28">

                {/* Breadcrumb */}
                <div className="flex flex-wrap items-center gap-2 text-sm text-(--text-muted) mb-8">
                    <Link href="/" className="hover:text-(--accent-ink) transition-colors">Scanora</Link>
                    <span>/</span>
                    <Link href="/loesungen" className="hover:text-(--accent-ink) transition-colors">Lösungen</Link>
                    <span>/</span>
                    <span className="text-(--text-faint)">Sichtbarkeit in Claude tracken</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-(--accent-soft) text-(--accent-ink)">
                            Lösung
                        </span>
                        <span className="text-xs text-(--text-faint)">29. August 2026</span>
                        <span className="text-xs text-(--text-faint)">· Aktualisiert: 1. Oktober 2026</span>
                        <span className="text-xs text-(--text-faint)">· 12 min Lesezeit</span>
                    </div>
                    <h1 className="text-[clamp(34px,4.4vw,52px)] font-bold text-(--text-white) leading-[1.06] tracking-[-0.035em] mb-5">
                        Sichtbarkeit in Claude tracken 2026: So siehst du, ob Claude dich empfiehlt
                    </h1>
                    <p className="text-lg text-(--text-body) leading-relaxed">
                        <strong className="text-(--text-white)">Sichtbarkeit in Claude</strong> bedeutet: Wie oft und in welchem Kontext nennt Anthropics Claude deine Marke, wenn Nutzer zu Themen aus deiner Branche fragen? Gemessen wird das über die Mention-Rate über Zeit und über Zitate mit Quellenkontext, statt einer einmaligen Stichprobe. Scanora trackt das automatisch einmal pro Woche - ab 4,99 €/Monat, inklusive Gemini im Einsteiger-Plan; der Pro-Plan ergänzt ChatGPT, Perplexity und Google AI Overview im selben Dashboard.
                    </p>
                    <p className="mt-4 text-(--text-body) leading-relaxed">
                        Claude hat sich als eigenständige Antwort-Quelle etabliert - auch weil Claude Code für viele Entwickler und Teams der erste Anlaufpunkt ist, um neue Tools zu bewerten. Wer nur ChatGPT trackt, sieht bestenfalls die halbe Wahrheit. Das Problem: Bei den meisten AI-Visibility-Tools ist Claude-Tracking entweder ein teures Enterprise-Add-on oder gar nicht buchbar. Hier die Marktlage im Überblick, wie das Tracking technisch funktioniert und was du konkret damit machst.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-(--text-faint)">
                        <Link href="/about" className="flex items-center gap-2 hover:text-(--text-body) transition-colors">
                            <div className="w-6 h-6 rounded-full bg-(--accent) flex items-center justify-center text-(--on-accent) text-[10px] font-bold">F</div>
                            <span>Finn Paustian</span>
                        </Link>
                        <span>·</span>
                        <span>Gründer, Scanora</span>
                    </div>
                </div>

                <div className="border-t border-(--border-subtle) mb-10" />

                <div className="space-y-10 text-(--text-body) leading-relaxed">

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Wie funktioniert Claude eigentlich?</h2>
                        <p>
                            Bevor man optimiert, muss man verstehen, dass „Sichtbarkeit in Claude" zwei völlig unterschiedliche Dinge meinen kann.
                        </p>
                        <p className="mt-4">
                            <strong className="text-(--text-white)">Weg 1: Claude antwortet aus dem Trainingskorpus.</strong> Ohne Websuche kennt Claude nur, was bis zu seinem Trainingsstichtag öffentlich prominent genug war, um in den Trainingsdaten zu landen - gesammelt über einen eigenen Crawler namens ClaudeBot. Fragt jemand direkt nach deinem Produkt und Claude sucht nicht, antwortet es ausschließlich aus diesem eingefrorenen Wissensstand. Neue oder schwach verlinkte Produkte tauchen hier schlicht nicht auf, unabhängig davon, wie gut die eigene Website aktuell ist.
                        </p>
                        <p className="mt-4">
                            <strong className="text-(--text-white)">Weg 2: Claude nutzt die Websuche.</strong> Laut Anthropics eigener Dokumentation entscheidet Claude von Fall zu Fall, ob es das Web durchsucht: Bei stabilem Wissen (etablierte Fakten, Mathematik, Programmierkonzepte) antwortet es direkt. Bei allem, was aktuell, veränderlich oder auf ein bestimmtes Unternehmen, eine Person oder ein Produkt bezogen ist, sucht es aktiv. Eine Frage wie „welches Tool zeigt mir meine Sichtbarkeit in Claude?" fällt fast immer in die zweite Kategorie - genau der Moment, in dem eine gut aufgestellte Website eine echte Chance hat.
                        </p>
                        <p className="mt-4">
                            Technisch läuft das so ab: Claude formuliert eine Suchanfrage, erhält Ergebnisse mit URL, Titel und Alter der Seite zurück, und zitiert daraus einen präzisen Ausschnitt von <strong className="text-(--text-white)">maximal 150 Zeichen</strong> pro Quelle - keine Zusammenfassung der ganzen Seite, sondern ein exakt verorteter Satz oder Halbsatz. Nicht die Seite als Ganzes „gewinnt", sondern der eine Satz, der sich sauber herausschneiden lässt.
                        </p>
                        <p className="mt-5 font-semibold text-(--text-white) text-sm">Zugriff ist keine Selbstverständlichkeit</p>
                        <p className="mt-2">
                            Anthropic betreibt laut eigener Support-Dokumentation drei getrennte Crawler mit unterschiedlicher Aufgabe:
                        </p>
                        <div className="space-y-2 mt-4">
                            {CLAUDE_CRAWLERS.map((c) => (
                                <div key={c.name} className="flex gap-3 bg-(--card) border border-(--line) rounded-xl p-4">
                                    <span className="text-(--accent-ink) font-mono font-semibold text-sm shrink-0">{c.name}</span>
                                    <span className="text-sm text-(--text-muted)">{c.role}</span>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4">
                            Das heißt konkret: Eine Seite kann fürs Training gesperrt sein und trotzdem in Live-Antworten mit Websuche zitiert werden - oder umgekehrt. Wer in seiner robots.txt pauschal „alle Bots" blockiert, verschwindet aus beiden Kanälen gleichzeitig, ohne es zu merken.
                        </p>
                        <p className="mt-5 font-semibold text-(--text-white) text-sm">Ein verbreiteter Irrtum</p>
                        <p className="mt-2">
                            Viele Ratgeber behaupten, „Constitutional AI" entscheide, welchen Quellen Claude vertraut. Das lässt sich anhand von Anthropics eigener Veröffentlichung zur Verfassung nicht bestätigen. Die dortigen Prinzipien - u. a. abgeleitet aus der UN-Menschenrechtserklärung, Apples Nutzungsbedingungen und DeepMinds Sparrow-Regeln - drehen sich um Schadensvermeidung, Diskriminierung und ethisches Verhalten, nicht um Kriterien zur Quellenauswahl. Welche Quelle in einer Antwort landet, entscheidet der Websuche-Mechanismus (Suchergebnis-Relevanz, ggf. Domain-Filter, Aktualität der Seite) - nicht die Verfassung. Man optimiert also nicht für „Vertrauenswürdigkeit im ethischen Sinn", sondern für technische Auffindbarkeit und zitierfähige Fakten.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Welche Faktoren beeinflussen, ob Claude dich zitiert?</h2>
                        <div className="space-y-3">
                            {VISIBILITY_FACTORS.map((f) => (
                                <div key={f.num} className="flex gap-4 bg-(--card) border border-(--line) rounded-2xl p-5">
                                    <span className="text-(--accent-ink) font-mono font-bold text-sm shrink-0">{f.num}</span>
                                    <div>
                                        <h3 className="font-semibold text-(--text-white) mb-1 text-sm">{f.title}</h3>
                                        <p className="text-sm text-(--text-muted) leading-relaxed">{f.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">So verbesserst du deine Sichtbarkeit in Claude</h2>
                        <div className="space-y-3">
                            {VISIBILITY_STRATEGIES.map((s) => (
                                <div key={s.num} className="flex gap-4 bg-(--card) border border-(--line) rounded-2xl p-5">
                                    <span className="text-(--accent-ink) font-mono font-bold text-sm shrink-0">{s.num}</span>
                                    <div>
                                        <h3 className="font-semibold text-(--text-white) mb-1 text-sm">{s.title}</h3>
                                        <p className="text-sm text-(--text-muted) leading-relaxed">{s.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">So funktioniert Claude-Sichtbarkeits-Tracking</h2>
                        <p>Vier Schritte, automatisiert statt manuell:</p>
                        <div className="space-y-3 mt-5">
                            {TRACKING_STEPS.map((s) => (
                                <div key={s.num} className="flex gap-4 bg-(--card) border border-(--line) rounded-2xl p-5">
                                    <span className="text-(--accent-ink) font-mono font-bold text-sm shrink-0">{s.num}</span>
                                    <div>
                                        <h3 className="font-semibold text-(--text-white) mb-1 text-sm">{s.title}</h3>
                                        <p className="text-sm text-(--text-muted) leading-relaxed">{s.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Was Scanora konkret liefert</h2>
                        <p>
                            Ab dem Einsteiger-Plan (4,99 €/Monat, 1 Website, 10 Keywords) prüft Scanora wöchentlich automatisch, ob Claude und Gemini deine Website erwähnen - inklusive Mention-Verlauf über Zeit. Der Pro-Plan (74,99 €/Monat) ergänzt ChatGPT, Perplexity und Google AI Overview im selben Dashboard, plus zwei Prompt-Varianten pro Keyword statt einer.
                        </p>
                        <p className="mt-4">
                            Anders als reine Analytics-Dashboards bleibt es nicht bei der Zahl: Scanora prüft zusätzlich, ob llms.txt vorhanden ist, ob Schema Markup korrekt gesetzt ist und ob ClaudeBot überhaupt crawlen darf - und zeigt dir priorisiert, was zu tun ist, um öfter zitiert zu werden.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Claude vs. ChatGPT vs. Perplexity - was wirklich unterscheidet</h2>
                        <p>
                            Die drei Plattformen werden in den meisten Ratgebern in einen Topf geworfen. Tatsächlich unterscheiden sie sich an genau den Stellen, die für Sichtbarkeit zählen - technisch, nicht nur im Ton.
                        </p>
                        <div className="overflow-x-auto rounded-2xl border border-(--border-subtle) mt-5">
                            <table className="w-full text-sm min-w-180">
                                <thead>
                                    <tr className="border-b border-(--line) bg-(--card)">
                                        <th className="text-left px-5 py-3 text-(--text-muted) font-semibold">Kriterium</th>
                                        <th className="text-left px-5 py-3 text-(--accent-ink) font-semibold">Claude</th>
                                        <th className="text-left px-5 py-3 text-(--text-muted) font-semibold">ChatGPT</th>
                                        <th className="text-left px-5 py-3 text-(--text-muted) font-semibold">Perplexity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PLATFORM_COMPARISON_ROWS.map(([criterion, claude, chatgpt, perplexity], i) => (
                                        <tr key={i} className="border-b border-(--border-subtle) last:border-0 align-top">
                                            <td className="px-5 py-3 text-(--text-white) font-medium whitespace-nowrap">{criterion}</td>
                                            <td className="px-5 py-3 text-(--text-body)">{claude}</td>
                                            <td className="px-5 py-3 text-(--text-body)">{chatgpt}</td>
                                            <td className="px-5 py-3 text-(--text-body)">{perplexity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4">
                            Die Grundhygiene - crawlbar sein, Fakten kompakt und aktuell halten - wirkt bei allen drei Plattformen ähnlich. Der Unterschied liegt in der Kontrolle: Nur bei Claude kannst du über robots.txt granular festlegen, ob du fürs Training, für Live-Antworten oder für beides sichtbar sein willst. Bei ChatGPT und Perplexity ist diese Entscheidung entweder pauschaler oder liegt außerhalb deiner Reichweite.
                        </p>
                        <p className="text-xs text-(--text-faint) mt-3">
                            Perplexitys Ranking-/Zitations-Kriterien sind nicht vollständig offiziell dokumentiert; die entsprechenden Angaben basieren auf beobachtbaren Mustern.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Claude-Tracking ist am Markt oft teurer als die Basis-Plattformen</h2>
                        <p>
                            Ein Muster zieht sich durch mehrere bekannte AI-Visibility-Tools: ChatGPT, Perplexity und Google AI Overview sind meist im Grundpreis enthalten - Claude dagegen ist entweder ein separates, teures Add-on oder ausschließlich im individuell bepreisten Enterprise-Tarif verfügbar. Wer speziell wissen will, wie er bei Claude abschneidet, zahlt in der Praxis oft deutlich mehr als für die restlichen Plattformen zusammen.
                        </p>
                        <div className="overflow-x-auto rounded-2xl border border-(--border-subtle) mt-5">
                            <table className="w-full text-sm min-w-140">
                                <thead>
                                    <tr className="border-b border-(--line) bg-(--card)">
                                        <th className="text-left px-5 py-3 text-(--text-muted) font-semibold">Tool</th>
                                        <th className="text-left px-5 py-3 text-(--text-muted) font-semibold">Einstiegspreis</th>
                                        <th className="text-left px-5 py-3 text-(--accent-ink) font-semibold">Claude im Einstiegspreis enthalten?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MARKET_ROWS.map(([tool, price, claude], i) => (
                                        <tr key={i} className="border-b border-(--border-subtle) last:border-0">
                                            <td className="px-5 py-3 text-(--text-white) font-medium whitespace-nowrap">{tool}</td>
                                            <td className="px-5 py-3 text-(--text-body) whitespace-nowrap">{price}</td>
                                            <td className="px-5 py-3 text-(--text-body)">{claude}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-(--text-faint) mt-3">
                            Preise Stand August 2026, laut öffentlich einsehbaren Preisseiten der jeweiligen Anbieter. Prüfe die aktuellen Konditionen jeweils direkt beim Anbieter.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Quellen</h2>
                        <p className="text-sm text-(--text-muted) mb-3">
                            Primärquellen, direkt bei den Anbietern recherchiert.
                        </p>
                        <ul className="space-y-2">
                            {CLAUDE_SOURCES.map((s) => (
                                <li key={s.href} className="text-sm">
                                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-(--accent-ink) hover:underline wrap-break-word">
                                        {s.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <p className="text-xs text-(--text-faint) mt-3">
                            Stand: September 2026.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[28px] leading-tight tracking-[-0.03em] font-bold text-(--text-white) mb-4">Häufige Fragen</h2>
                        <div className="space-y-4">
                            {faqLd.mainEntity.map((faq, i) => (
                                <div key={i} className="bg-(--card) border border-(--line) rounded-2xl p-5">
                                    <h3 className="font-semibold text-(--text-white) mb-2 text-sm">{faq.name}</h3>
                                    <p className="text-sm text-(--text-muted) leading-relaxed">{faq.acceptedAnswer.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* CTA: Selbst ausprobieren */}
                <div className="mt-14 bg-(--accent-soft) border border-(--accent-border) rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-(--accent-ink) mb-1 block">Selbst ausprobieren</span>
                            <h3 className="text-base sm:text-lg font-bold text-(--text-white) mb-2">
                                Prüfe kostenlos, ob Claude dich schon erwähnt
                            </h3>
                            <p className="text-(--text-muted) text-sm leading-relaxed max-w-md">
                                Gib deine URL ein und erhalte in rund 60 Sekunden deinen ersten GEO-Score - ohne Anmeldung, ohne Kreditkarte.
                            </p>
                        </div>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) text-sm font-semibold rounded-[10px] transition-all duration-200 active:scale-[0.97] active:duration-75 shrink-0"
                        >
                            Jetzt kostenlos prüfen
                        </Link>
                    </div>
                </div>

                {/* Cross-link: GEO Pricing */}
                <div className="mt-5 bg-(--card) border border-(--line) rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-(--accent-ink) mb-1 block">Preise</span>
                            <h3 className="text-base sm:text-lg font-bold text-(--text-white) mb-2">
                                GEO Automatisierung: alle Pläne im Detail
                            </h3>
                            <p className="text-(--text-muted) text-sm leading-relaxed max-w-md">
                                Claude, ChatGPT, Perplexity und Google AI Overview - Websites, Keywords und Checks pro Plan im Vergleich.
                            </p>
                        </div>
                        <Link
                            href="/geo/pricing"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--surface-08) hover:bg-(--surface-10) text-(--text-white) text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Preise ansehen
                        </Link>
                    </div>
                </div>

                {/* Cross-link: ChatGPT */}
                <div className="mt-5 bg-(--card) border border-(--line) rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-(--accent-ink) mb-1 block">Verwandt</span>
                            <h3 className="text-base sm:text-lg font-bold text-(--text-white) mb-2">
                                Sichtbarkeit in ChatGPT tracken
                            </h3>
                            <p className="text-(--text-muted) text-sm leading-relaxed max-w-md">
                                ChatGPT ist die meistgenutzte KI-Suchoberfläche - so trackst du deine Sichtbarkeit dort zusammen mit Google-Rankings.
                            </p>
                        </div>
                        <Link
                            href="/loesungen/chatgpt-sichtbarkeit-tracken"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--surface-08) hover:bg-(--surface-10) text-(--text-white) text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Seite ansehen
                        </Link>
                    </div>
                </div>

                {/* Cross-link: Rankscale */}
                <div className="mt-5 bg-(--card) border border-(--line) rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                        <div>
                            <span className="text-xs font-semibold text-(--accent-ink) mb-1 block">Vergleich</span>
                            <h3 className="text-base sm:text-lg font-bold text-(--text-white) mb-2">
                                Rankscale-Alternative: der ausführliche Vergleich
                            </h3>
                            <p className="text-(--text-muted) text-sm leading-relaxed max-w-md">
                                Rankscale trackt Claude zwar inklusive, aber über ein Credit-System statt Fixpreis - der Unterschied im Detail.
                            </p>
                        </div>
                        <Link
                            href="/vergleich/rankscale-alternative"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--surface-08) hover:bg-(--surface-10) text-(--text-white) text-sm font-semibold rounded-xl transition-all duration-200 shrink-0"
                        >
                            Vergleich lesen
                        </Link>
                    </div>
                </div>

                {/* Back */}
                <div className="mt-10 pt-8 border-t border-(--border-subtle)">
                    <Link href="/" className="text-sm text-(--text-faint) hover:text-(--text-body) transition-colors">
                        ← Zurück zur Startseite
                    </Link>
                </div>

            </article>

            <Footer />
        </main>
    )
}
