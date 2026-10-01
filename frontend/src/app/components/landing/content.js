import { getPlans } from '@/lib/plans'

// Copy and data for the landing page in both locales. Components stay locale-agnostic and
// read everything from here, so /, /en and later locales share one layout.
//
// Audit statistics: aggregated manually from the report collection (see
// backend/models/report_model.js, auditData.{overallScore,seo.score,performance.score,geo.score}).
// When updating, also update `asOf` / `asOfIso`.

export const AUDIT_STATS = {
    audits: 151,
    sites: 130,
    geo: 58,
    seo: 64.8,
    performance: 93.3,
    overall: 67.8,
    asOfIso: '2026-09-26',
}

// Example data for the product demo. Clearly labeled as example on the page.
export const DEMO_WEEKS = ['KW 31', 'KW 32', 'KW 33', 'KW 34', 'KW 35', 'KW 36', 'KW 37', 'KW 38']
export const DEMO_WEEKS_EN = ['W31', 'W32', 'W33', 'W34', 'W35', 'W36', 'W37', 'W38']
export const DEMO_SERIES = {
    all:        { me: [17, 20, 20, 25, 28, 30, 33, 35], cmp: [24, 25, 24, 26, 25, 27, 26, 27] },
    chatgpt:    { me: [22, 25, 24, 30, 33, 36, 39, 42], cmp: [28, 29, 27, 30, 29, 31, 30, 31] },
    claude:     { me: [15, 18, 19, 24, 27, 31, 35, 38], cmp: [20, 21, 22, 22, 23, 24, 24, 25] },
    gemini:     { me: [12, 13, 12, 15, 17, 18, 20, 21], cmp: [18, 18, 19, 19, 20, 20, 21, 21] },
    perplexity: { me: [25, 29, 28, 35, 38, 41, 44, 47], cmp: [30, 31, 30, 33, 32, 34, 33, 34] },
    aio:        { me: [16, 17, 17, 21, 23, 24, 27, 29], cmp: [22, 22, 23, 23, 24, 24, 25, 25] },
}
export const PLATFORMS = [
    { key: 'chatgpt', name: 'ChatGPT' },
    { key: 'claude', name: 'Claude' },
    { key: 'gemini', name: 'Gemini' },
    { key: 'perplexity', name: 'Perplexity' },
    { key: 'aio', name: 'Google AI Overview' },
]
export const DEMO_COMPETITORS = [
    { domain: 'pixelwerk-hamburg.de', share: 31 },
    { domain: 'agentur-nordlicht.de', share: 22, me: true },
    { domain: 'elbmedia.de', share: 17 },
    { domain: 'hafenblick-digital.de', share: 13 },
    { domain: 'kontor-studio.de', share: 9 },
    { domain: 'speicherstadt-web.de', share: 8 },
]
export const DEMO_SOURCES = [
    { url: 'agentur-nordlicht.de/leistungen/webdesign', by: 'Perplexity, ChatGPT', count: 9, own: true },
    { url: 'pixelwerk-hamburg.de/referenzen', by: 'Perplexity, Google AI Overview', count: 7 },
    { url: 'agentur-nordlicht.de/ueber-uns', by: 'Claude', count: 4, own: true },
    { url: 'clutch.co/de/agenturen/hamburg', by: 'ChatGPT, Gemini', count: 4 },
    { url: 'elbmedia.de/blog/webdesign-kosten', by: 'Google AI Overview', count: 3 },
]

// Plans come from the shared source (lib/plans.js) so the landing page, /pricing and the
// GEO/SEO pricing pages always show the same prices and features.
function landingPlans(locale) {
    const en = locale === 'en'
    const price = p => (en ? `€${p}` : `${p} €`)
    const base = en ? '/en' : ''
    const cta = {
        audit: { free: en ? 'Check for free' : 'Kostenlos prüfen', pro: en ? 'Choose Pro' : 'Pro wählen', agency: en ? 'Choose Agency' : 'Agency wählen' },
        tracking: { einsteiger: en ? 'Choose Starter' : 'Einsteiger wählen', pro: en ? 'Choose Pro' : 'Pro wählen', expert: en ? 'Choose Expert' : 'Expert wählen' },
    }
    const map = (product, href, ctas) => getPlans(locale, product).map(p => ({
        id: `${product}-${p.id}`,
        name: p.name,
        price: price(p.price),
        per: p.period,
        desc: p.desc,
        flag: p.badge,
        featured: !!p.highlight,
        features: p.features,
        locked: p.locked,
        cta: ctas[p.id],
        href,
        free: product === 'audit' && p.id === 'free',
    }))
    return {
        audit: map('audit', `${base}/pricing`, cta.audit),
        geo: map('geo', `${base}/geo/pricing`, cta.tracking),
        seo: map('seo', `${base}/seo/pricing`, cta.tracking),
    }
}

export const COPY = {
    de: {
        home: '/',
        dashboard: '/dashboard',
        sampleReport: '/beispiel-report',
        ids: { features: 'funktionen', pricing: 'preise', faq: 'faq', what: 'was-ist-scanora' },
        form: {
            label: 'Deine Website',
            placeholder: 'deinewebsite.de',
            cta: 'Kostenlos prüfen',
            busy: 'Wird geprüft…',
            hint: 'Ohne Anmeldung. Alle Fehler siehst du nach kostenloser Registrierung, KI-Fixes und PDF-Report ab Pro.',
            error: 'Bitte gib eine URL ein, z. B. deinewebsite.de',
            as: 'Wird geprüft als',
        },
        hero: {
            eyebrow: 'AI Visibility & SEO Tracking',
            h1: 'Sieh, ob ChatGPT & Co. deine Website empfehlen.',
            lead: 'Scanora misst, wie oft KI-Systeme dich nennen, wer stattdessen genannt wird und was du ändern musst.',
        },
        demo: {
            aria: 'Interaktive Demo des Scanora-Dashboards mit Beispieldaten',
            tabs: ['Übersicht', 'Wettbewerber', 'Quellen'],
            tabsAria: 'Dashboard-Ansicht',
            range: 'Letzte 8 Wochen',
            kpis: { rate: 'Mention-Rate', since: 'Pkt. seit KW 31', sov: 'Share of Voice', sovSub: 'Platz 2 von 6', src: 'Zitierte Quellen', srcSub: 'davon 5 eigene Seiten', geo: 'GEO-Score', geoSub: '+13 nach Fixes' },
            chartTitle: 'Mention-Rate im Verlauf',
            you: 'Du',
            avgCmp: 'Ø Wettbewerber',
            all: 'Alle',
            filterAria: 'Plattform filtern',
            perPlatform: 'Pro Plattform',
            week: 'KW 38',
            sovTitle: 'Share of Voice: „Webdesign Agentur Hamburg“',
            allPlatforms: 'alle Plattformen',
            youSuffix: ' (du)',
            srcTitle: 'Welche Seiten KI-Antworten zitieren',
            note: 'Beispieldaten einer fiktiven Agentur. So sieht dein Dashboard im GEO-Tracking aus, Wettbewerber-Analyse ab GEO Pro.',
            sample: 'Beispiel-Report ansehen',
            checkedOn: 'Geprüft auf',
            chartAria: (name, from, to, cmp) => `Mention-Rate ${name}: von ${from} auf ${to} Prozent in 8 Wochen, Wettbewerber im Schnitt ${cmp} Prozent`,
        },
        features: {
            h2: 'Das bekommst du mit Scanora',
            lead: 'Vier Antworten auf eine Frage: Wie wirst du in KI-Antworten sichtbar, und wie hältst du das?',
            chat: {
                title: 'Was KI über dich sagt',
                text: 'Du siehst die Antwort auf typische Kundenfragen, ob du genannt wirst und in welchem Zusammenhang.',
                q: 'Welche Agentur in Hamburg empfiehlst du für Webdesign im Mittelstand?',
                aBefore: 'Für mittelständische Unternehmen in Hamburg werden häufig ',
                brand: 'Agentur Nordlicht',
                aAfter: ' und Pixelwerk genannt. Nordlicht ist auf B2B-Websites spezialisiert und zeigt Referenzen aus Maschinenbau und Logistik …',
                pills: ['Genannt auf Platz 1', 'Quelle: /leistungen/webdesign', 'Perplexity'],
            },
            alert: {
                title: 'Alerts, bevor es weh tut',
                text: 'Verlierst du eine Erwähnung oder ein Ranking, bekommst du eine E-Mail mit möglicher Ursache.',
                t: 'Erwähnung verloren',
                s: 'Perplexity nennt dich nicht mehr für „webdesign agentur hamburg“.',
                cause: 'Mögliche Ursache: /leistungen/webdesign seit 12.09. nicht mehr erreichbar (404).',
            },
            compare: {
                title: 'Google und KI im Abgleich',
                text: 'Pro Keyword: deine Google-Position neben der Frage, ob KI dich nennt.',
                cols: ['Keyword', 'Google', 'KI'],
                yes: 'genannt',
                no: 'nicht genannt',
                rows: [['webdesign hamburg', '#4', true], ['b2b website relaunch', '#2', false], ['agentur mittelstand', '#11', true], ['website kosten agentur', '#7', false]],
            },
            audit: {
                title: 'Ein Audit, sortiert nach Wirkung',
                text: 'Der kostenlose Audit prüft GEO, SEO und Performance auf bis zu 25 Unterseiten und sortiert die Fehler nach Wirkung. Konkrete Fixes liefert der KI-Report ab Pro.',
                scoreLabel: '/ 100 GEO-Score, 6 Punkte zu beheben',
                fixes: [['h', 'Hoch', 'ClaudeBot ist in robots.txt blockiert'], ['h', 'Hoch', 'Keine llms.txt gefunden'], ['m', 'Mittel', 'FAQ-Schema fehlt auf 4 Seiten'], ['l', 'Niedrig', '8 Bilder ohne Alt-Text']],
            },
        },
        data: {
            eyebrow: 'Scanora-Auditdaten',
            h2: 'Die meisten Websites sind für KI kaum sichtbar.',
            scoreSuffix: '/ 100 Ø GEO-Score',
            lead: (s) => `Über alle ${s.audits} bisherigen Scanora-Audits von ${s.sites} Websites liegt der durchschnittliche GEO-Score bei ${s.geo} von 100 Punkten. Bei SEO und Performance schneiden dieselben Seiten deutlich besser ab.`,
            stats: (s) => [[String(s.audits), '', `Audits von ${s.sites} Websites`], [fmt(s.seo, 'de'), ' / 100', 'Ø SEO-Score'], [fmt(s.performance, 'de'), ' / 100', 'Ø Performance-Score'], [fmt(s.overall, 'de'), ' / 100', 'Ø Gesamt-Score']],
            source: 'Quelle: alle abgeschlossenen Scanora-Audits',
            asOf: 'Stand: 26.09.2026',
        },
        how: {
            h2: 'So funktioniert der Check',
            steps: [
                ['URL eingeben', 'Du gibst deine Domain ein. Eine Anmeldung brauchst du dafür nicht.', 'wenige Sekunden'],
                ['Scanora analysiert', 'Bis zu 25 Unterseiten werden auf GEO-, SEO- und Performance-Signale geprüft.', 'unter 60 Sekunden'],
                ['Fixes umsetzen', 'Du bekommst einen Score und eine Liste der Punkte, die am meisten bringen.', 'priorisiert nach Wirkung'],
            ],
        },
        what: {
            h2: 'Was ist Scanora?',
            big: 'Scanora ist ein SEO- und GEO-Tool aus Deutschland. Es misst, wie gut eine Website bei Google rankt und wie oft ChatGPT, Claude, Gemini, Perplexity und Google AI Overview sie in ihren Antworten nennen.',
            body: 'Der Einstieg ist ein kostenloser Website-Audit in unter 60 Sekunden. Danach kannst du Google-Rankings und KI-Erwähnungen wöchentlich automatisch tracken. Bei Ranking-Einbrüchen oder verlorenen KI-Erwähnungen bekommst du eine E-Mail mit möglichen Ursachen.',
            byline: ['Von', 'Finn Paustian', 'Gründer von Scanora. Aktualisiert am', '26. September 2026'],
            facts: [['Kategorie', 'SEO- und GEO-Monitoring'], ['Anbieter', 'Scanora, Deutschland'], ['KI-Plattformen', 'ChatGPT, Claude, Gemini, Perplexity, Google AI Overview'], ['Audit-Dauer', 'unter 60 Sekunden'], ['Kostenlos', '1 Audit pro Monat, Start ohne Anmeldung'], ['KI-Tracking', 'ab 4,99 € pro Monat'], ['SEO-Tracking', 'ab 29,99 € pro Monat']],
        },
        pricing: {
            h2: 'Preise',
            lead: 'Kostenlos starten. Monatlich kündbar. Alle Preise in Euro pro Monat.',
            tabsAria: 'Produkt wählen',
            tabs: [['audit', 'Website-Audit', 'Einmalige Analysen deiner Website mit GEO-, SEO- und Performance-Score.'], ['geo', 'KI-Sichtbarkeit tracken', 'Wöchentlicher Check, ob KI-Systeme deine Website für deine Keywords nennen, mit Verlauf über Zeit.'], ['seo', 'Google-Rankings tracken', 'Wöchentlich aktualisierte Google-Rankings pro Keyword, mit Alerts bei Einbrüchen.']],
            plans: landingPlans('de'),
            note: 'Kein versteckter Trial. Jederzeit kündbar.',
            all: 'Alle Preise im Detail',
            allHref: '/pricing',
        },
        resources: {
            h2: 'Vergleiche und Ratgeber',
            lead: 'Ahrefs und Semrush sind vor allem SEO-Tools und bieten KI-Sichtbarkeit als separates Zusatzmodul an. Scanora deckt beides in einem Produkt ab. So stehen wir im Vergleich zu spezialisierten GEO-Tools:',
            cols: [
                ['Scanora im Vergleich', [['Otterly-Alternative', '/vergleich/otterly-alternative'], ['Peec-AI-Alternative', '/vergleich/peec-alternative'], ['Rankscale-Alternative', '/vergleich/rankscale-alternative'], ['Writesonic-Alternative', '/vergleich/writesonic-alternative']]],
                ['Lösungen', [['SEO- und GEO-Tool in einem', '/loesungen/seo-geo-tool'], ['ChatGPT-Sichtbarkeit tracken', '/loesungen/chatgpt-sichtbarkeit-tracken'], ['Claude-Sichtbarkeit tracken', '/loesungen/claude-ai-sichtbarkeit-tracken'], ['Günstiges KI-Sichtbarkeits-Tool', '/loesungen/guenstiges-ki-sichtbarkeit-tool']]],
                ['Ratgeber', [['Was ist GEO?', '/blog/geo-optimierung-2026'], ['llms.txt erklärt', '/blog/llms-txt-erklaert'], ['Häufige Fehler beim SEO-Test', '/blog/seo-test-haeufige-fehler'], ['Alle Artikel im Blog', '/blog']]],
            ],
        },
        faq: {
            eyebrow: 'FAQ',
            h2: 'Häufige Fragen zu AI Visibility und SEO',
            text: 'Deine Frage fehlt? Schreib uns über den',
            link: 'Support',
            href: '/support',
        },
        final: {
            h2: 'Finde heraus, ob KI dich empfiehlt.',
            lead: 'Ein Audit, 60 Sekunden, ohne Anmeldung.',
        },
    },
    en: {
        home: '/en',
        dashboard: '/en/dashboard',
        sampleReport: '/en/example-report',
        ids: { features: 'features', pricing: 'pricing', faq: 'faq', what: 'what-is-scanora' },
        form: {
            label: 'Your website',
            placeholder: 'yourwebsite.com',
            cta: 'Check for free',
            busy: 'Checking…',
            hint: 'No sign-up needed. See every issue after free registration, AI fixes and PDF report from Pro.',
            error: 'Please enter a URL, e.g. yourwebsite.com',
            as: 'Will be checked as',
        },
        hero: {
            eyebrow: 'AI Visibility & SEO Tracking',
            h1: 'See if ChatGPT & co. recommend your website.',
            lead: 'Scanora measures how often AI systems mention you, who gets named instead and what you need to change.',
        },
        demo: {
            aria: 'Interactive demo of the Scanora dashboard with example data',
            tabs: ['Overview', 'Competitors', 'Sources'],
            tabsAria: 'Dashboard view',
            range: 'Last 8 weeks',
            kpis: { rate: 'Mention rate', since: 'pts since W31', sov: 'Share of voice', sovSub: 'Rank 2 of 6', src: 'Cited sources', srcSub: '5 of them your own pages', geo: 'GEO score', geoSub: '+13 after fixes' },
            chartTitle: 'Mention rate over time',
            you: 'You',
            avgCmp: 'Avg. competitors',
            all: 'All',
            filterAria: 'Filter by platform',
            perPlatform: 'Per platform',
            week: 'W38',
            sovTitle: 'Share of voice: “web design agency Hamburg”',
            allPlatforms: 'all platforms',
            youSuffix: ' (you)',
            srcTitle: 'Which pages AI answers cite',
            note: 'Example data of a fictional agency. This is what your dashboard looks like in GEO tracking, competitor analysis from GEO Pro.',
            sample: 'View example report',
            checkedOn: 'Checked on',
            chartAria: (name, from, to, cmp) => `Mention rate ${name}: from ${from} to ${to} percent in 8 weeks, competitors average ${cmp} percent`,
        },
        features: {
            h2: 'What you get with Scanora',
            lead: 'Four answers to one question: how do you become visible in AI answers, and how do you stay there?',
            chat: {
                title: 'What AI says about you',
                text: 'You see the answer to typical customer questions, whether you are named and in which context.',
                q: 'Which agency in Hamburg do you recommend for web design for mid-sized companies?',
                aBefore: 'For mid-sized companies in Hamburg, ',
                brand: 'Agentur Nordlicht',
                aAfter: ' and Pixelwerk are mentioned most often. Nordlicht specializes in B2B websites and shows references from engineering and logistics …',
                pills: ['Named in position 1', 'Source: /leistungen/webdesign', 'Perplexity'],
            },
            alert: {
                title: 'Alerts before it hurts',
                text: 'If you lose a mention or a ranking, you get an email with the likely cause.',
                t: 'Mention lost',
                s: 'Perplexity no longer names you for “web design agency hamburg”.',
                cause: 'Likely cause: /leistungen/webdesign has returned 404 since Sep 12.',
            },
            compare: {
                title: 'Google and AI side by side',
                text: 'Per keyword: your Google position next to whether AI names you.',
                cols: ['Keyword', 'Google', 'AI'],
                yes: 'named',
                no: 'not named',
                rows: [['web design hamburg', '#4', true], ['b2b website relaunch', '#2', false], ['agency mid-sized business', '#11', true], ['website cost agency', '#7', false]],
            },
            audit: {
                title: 'An audit sorted by impact',
                text: 'The free audit checks GEO, SEO and performance on up to 25 pages and sorts the issues by impact. The AI report from Pro adds concrete fixes.',
                scoreLabel: '/ 100 GEO score, 6 issues to fix',
                fixes: [['h', 'High', 'ClaudeBot is blocked in robots.txt'], ['h', 'High', 'No llms.txt found'], ['m', 'Medium', 'FAQ schema missing on 4 pages'], ['l', 'Low', '8 images without alt text']],
            },
        },
        data: {
            eyebrow: 'Scanora audit data',
            h2: 'Most websites are barely visible to AI.',
            scoreSuffix: '/ 100 avg. GEO score',
            lead: (s) => `Across all ${s.audits} Scanora audits of ${s.sites} websites so far, the average GEO score is ${s.geo} out of 100. The same sites score much better on SEO and performance.`,
            stats: (s) => [[String(s.audits), '', `audits of ${s.sites} websites`], [fmt(s.seo, 'en'), ' / 100', 'Avg. SEO score'], [fmt(s.performance, 'en'), ' / 100', 'Avg. performance score'], [fmt(s.overall, 'en'), ' / 100', 'Avg. overall score']],
            source: 'Source: all completed Scanora audits',
            asOf: 'As of Sep 26, 2026',
        },
        how: {
            h2: 'How the check works',
            steps: [
                ['Enter your URL', 'You enter your domain. No sign-up needed.', 'a few seconds'],
                ['Scanora analyzes', 'Up to 25 pages are checked for GEO, SEO and performance signals.', 'under 60 seconds'],
                ['Apply the fixes', 'You get a score and a list of the changes with the biggest impact.', 'prioritized by impact'],
            ],
        },
        what: {
            h2: 'What is Scanora?',
            big: 'Scanora is an SEO and GEO tool from Germany. It measures how well a website ranks on Google and how often ChatGPT, Claude, Gemini, Perplexity and Google AI Overview mention it in their answers.',
            body: 'You start with a free website audit in under 60 seconds. After that you can track Google rankings and AI mentions automatically every week. If rankings drop or AI mentions disappear, you get an email with likely causes.',
            byline: ['By', 'Finn Paustian', 'founder of Scanora. Updated on', 'September 26, 2026'],
            facts: [['Category', 'SEO and GEO monitoring'], ['Provider', 'Scanora, Germany'], ['AI platforms', 'ChatGPT, Claude, Gemini, Perplexity, Google AI Overview'], ['Audit time', 'under 60 seconds'], ['Free', '1 audit per month, start without sign-up'], ['AI tracking', 'from €4.99 per month'], ['SEO tracking', 'from €29.99 per month']],
        },
        pricing: {
            h2: 'Pricing',
            lead: 'Start for free. Cancel monthly. All prices in euros per month.',
            tabsAria: 'Choose a product',
            tabs: [['audit', 'Website audit', 'One-off analyses of your website with GEO, SEO and performance scores.'], ['geo', 'Track AI visibility', 'A weekly check whether AI systems name your website for your keywords, with history over time.'], ['seo', 'Track Google rankings', 'Weekly Google rankings per keyword, with alerts on drops.']],
            plans: landingPlans('en'),
            note: 'No hidden trial. Cancel anytime.',
            all: 'All pricing details',
            allHref: '/en/pricing',
        },
        resources: {
            h2: 'Comparisons and guides',
            lead: 'Ahrefs and Semrush are mainly SEO tools and sell AI visibility as a separate add-on. Scanora covers both in one product. Here is how we compare to specialized GEO tools:',
            cols: [
                ['Scanora compared', [['Otterly alternative', '/en/compare/otterly-alternative'], ['Peec AI alternative', '/en/compare/peec-alternative'], ['Rankscale alternative', '/en/compare/rankscale-alternative'], ['Writesonic alternative', '/en/compare/writesonic-alternative']]],
                ['Solutions', [['All solutions', '/en/solutions'], ['Affordable AI visibility tool', '/en/solutions/affordable-ai-visibility-tool'], ['Track Claude AI visibility', '/en/solutions/claude-ai-visibility-tracking']]],
                ['Guides', [['What is GEO?', '/en/blog/what-is-geo'], ['llms.txt explained', '/en/blog/llms-txt-explained'], ['Common SEO mistakes', '/en/blog/common-seo-mistakes'], ['All blog articles', '/en/blog']]],
            ],
        },
        faq: {
            eyebrow: 'FAQ',
            h2: 'Frequently asked questions about AI visibility and SEO',
            text: 'Missing your question? Contact our',
            link: 'support',
            href: '/en/support',
        },
        final: {
            h2: 'Find out if AI recommends you.',
            lead: 'One audit, 60 seconds, no sign-up.',
        },
    },
}

function fmt(n, locale) {
    return locale === 'de' ? String(n).replace('.', ',') : String(n)
}
