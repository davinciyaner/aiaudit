import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function generateAIReport(auditData, plan = 'free', language = 'de') {
    console.log(language === 'en' ? 'Generating AI report...' : 'AI-Bericht wird generiert...')

    const none = language === 'en' ? 'None' : 'Keine'
    const yes = language === 'en' ? 'yes' : 'ja'
    const no = language === 'en' ? 'no' : 'nein'
    const present = language === 'en' ? 'present' : 'vorhanden'
    const missing = language === 'en' ? 'missing' : 'fehlt'

    const largeResources = auditData.performance.resources?.large?.slice(0, 3)
        .map(r => `- ${r.url.split('/').pop() || r.url}: ${r.size}, ${r.duration}`).join('\n') || none
    const slowResources = auditData.performance.resources?.slow?.slice(0, 3)
        .map(r => `- ${r.url.split('/').pop() || r.url}: ${r.duration}`).join('\n') || none
    const h1Texts = auditData.seo.headings?.h1?.join(' | ') || (language === 'en' ? 'No H1 found' : 'Keine H1 gefunden')
    const brokenLinks = auditData.seo.links?.broken?.length || 0

    const prompt = language === 'en' ? `You are an experienced web audit expert. Analyze this website audit data and write a professional report in English.

FORMATTING RULES (strictly mandatory):
- No Markdown, no asterisks, no hashes, no backticks, no code blocks
- No HTML tags in the text
- Each section name stands ALONE on its own line in UPPERCASE, exactly as given below
- No numbers, no colons, no special characters before or after the section name
- Bullet points only with a single hyphen at the start of the line (- Text)
- Weave numbers directly into the prose
- Exactly one blank line between sections

WEBSITE DATA:

URL: ${auditData.url}
Pages crawled: ${auditData.pagesAnalyzed}
Overall score: ${auditData.overallScore}/100
SEO score: ${auditData.seo.score}/100
Performance score: ${auditData.performance.score}/100
GEO score: ${auditData.geo?.score ?? 0}/100

PAGE STATISTICS:
- Word count: ${auditData.seo.wordCount}
- Total images: ${auditData.seo.images?.total || 0}, without alt text: ${auditData.seo.images?.withoutAlt || 0}
- Internal links: ${auditData.seo.links?.internal || 0}, external links: ${auditData.seo.links?.external || 0}, broken links: ${brokenLinks}
- H1 content: ${h1Texts}

SEO ISSUES:
${auditData.seo.issues.join('\n') || none}

PERFORMANCE METRICS:
TTFB: ${auditData.performance.metrics.ttfb}ms
First Contentful Paint: ${auditData.performance.metrics.fcp}ms
DOM Load: ${auditData.performance.metrics.domLoad}ms
Full load time: ${auditData.performance.metrics.fullLoad}ms
Total size: ${auditData.performance.metrics.totalSize}KB
Number of requests: ${auditData.performance.metrics.resourceCount}

LARGE RESOURCES (>500KB):
${largeResources}

SLOW RESOURCES (>1s):
${slowResources}

PERFORMANCE ISSUES:
${auditData.performance.issues.join('\n') || none}

TOP KEYWORDS:
${auditData.keywords.topKeywords.slice(0, 10).map(k => `${k.keyword} (Score: ${k.score}, Density: ${k.density}, in Title: ${k.inTitle ? yes : no}, in H1: ${k.inH1 ? yes : no})`).join('\n')}

WEAK KEYWORDS:
${auditData.keywords.weakKeywords.join(', ') || none}

GEO CHECKS:
- llms.txt: ${auditData.geo?.checks?.hasLlmsTxt ? present : missing}
- FAQ Schema: ${auditData.geo?.checks?.hasFAQ ? present : missing}
- Organization Schema: ${auditData.geo?.checks?.hasOrganization ? present : missing}
- AI crawlers allowed: ${auditData.geo?.checks?.robotsAllowsAI ? yes : no}
- Direct product definition: ${auditData.geo?.checks?.hasDirectDefinition ? present : missing}
- Statistics/numbers: ${auditData.geo?.checks?.hasStatistics ? present : missing}

GEO ISSUES:
${auditData.geo?.issues?.join('\n') || none}

Now write the report. Use exactly these seven section names, each on its own line in uppercase, with no additional characters:

SUMMARY
2-3 sentences on the overall state. Direct, concrete, no filler.

CRITICAL ISSUES
The most urgent issues as a hyphen list. Each point: the problem and a concrete fix, in one sentence.

SEO ANALYSIS
Detailed assessment of SEO health. Concrete improvements with exact character counts and examples.

PERFORMANCE ANALYSIS
What's concretely slowing the page down. Technical fixes, no code blocks.

KEYWORD STRATEGY
Split into three paragraphs with the headings: Keywords to keep, Keywords to remove, New keywords to test.

GEO ANALYSIS
How well AI currently finds the site. What's missing for better AI recommendations. What to implement immediately.

ACTION PLAN
Prioritized to-do list. Each line in the format: Task - estimated time. Most important first.` : `Du bist ein erfahrener Web-Audit Experte. Analysiere diese Website-Audit-Daten und schreibe einen professionellen Bericht auf Deutsch.

FORMATIERUNGS-REGELN (absolut zwingend):
- Kein Markdown, keine Sternchen, keine Rauten, keine Backticks, keine Code-Bloecke
- Keine HTML-Tags im Text
- Jeder Abschnittsname steht ALLEIN auf einer Zeile in GROSSBUCHSTABEN, genau so wie unten angegeben
- Keine Nummern, keine Doppelpunkte, keine Sonderzeichen vor oder nach dem Abschnittsnamen
- Bullet Points nur mit einem einzelnen Bindestrich am Zeilenanfang (- Text)
- Zahlen direkt in den Fliestext einbauen
- Zwischen Abschnitten genau eine Leerzeile

WEBSITE DATEN:

URL: ${auditData.url}
Gecrawlte Seiten: ${auditData.pagesAnalyzed}
Gesamtscore: ${auditData.overallScore}/100
SEO Score: ${auditData.seo.score}/100
Performance Score: ${auditData.performance.score}/100
GEO Score: ${auditData.geo?.score ?? 0}/100

SEITEN-STATISTIKEN:
- Wortanzahl: ${auditData.seo.wordCount}
- Bilder gesamt: ${auditData.seo.images?.total || 0}, davon ohne Alt-Text: ${auditData.seo.images?.withoutAlt || 0}
- Interne Links: ${auditData.seo.links?.internal || 0}, Externe Links: ${auditData.seo.links?.external || 0}, Broken Links: ${brokenLinks}
- H1 Inhalte: ${h1Texts}

SEO PROBLEME:
${auditData.seo.issues.join('\n') || none}

PERFORMANCE METRIKEN:
TTFB: ${auditData.performance.metrics.ttfb}ms
First Contentful Paint: ${auditData.performance.metrics.fcp}ms
DOM Load: ${auditData.performance.metrics.domLoad}ms
Vollstaendige Ladezeit: ${auditData.performance.metrics.fullLoad}ms
Gesamtgroesse: ${auditData.performance.metrics.totalSize}KB
Anzahl Requests: ${auditData.performance.metrics.resourceCount}

GROSSE RESSOURCEN (>500KB):
${largeResources}

LANGSAME RESSOURCEN (>1s):
${slowResources}

PERFORMANCE PROBLEME:
${auditData.performance.issues.join('\n') || none}

TOP KEYWORDS:
${auditData.keywords.topKeywords.slice(0, 10).map(k => `${k.keyword} (Score: ${k.score}, Dichte: ${k.density}, in Title: ${k.inTitle ? yes : no}, in H1: ${k.inH1 ? yes : no})`).join('\n')}

SCHWACHE KEYWORDS:
${auditData.keywords.weakKeywords.join(', ') || none}

GEO CHECKS:
- llms.txt: ${auditData.geo?.checks?.hasLlmsTxt ? present : missing}
- FAQ Schema: ${auditData.geo?.checks?.hasFAQ ? present : missing}
- Organization Schema: ${auditData.geo?.checks?.hasOrganization ? present : missing}
- AI-Crawler erlaubt: ${auditData.geo?.checks?.robotsAllowsAI ? yes : no}
- Direkte Produktdefinition: ${auditData.geo?.checks?.hasDirectDefinition ? present : missing}
- Statistiken/Zahlen: ${auditData.geo?.checks?.hasStatistics ? present : missing}

GEO PROBLEME:
${auditData.geo?.issues?.join('\n') || none}

Schreibe jetzt den Bericht. Verwende genau diese sieben Abschnittsnamen, jeden auf einer eigenen Zeile in Grossbuchstaben, ohne jegliche zusaetzliche Zeichen:

ZUSAMMENFASSUNG
2-3 Saetze zum Gesamtzustand. Direkt, konkret, keine Floskeln.

KRITISCHE PROBLEME
Die dringendsten Probleme als Bindestrich-Liste. Jeder Punkt: Problem und konkrete Massnahme in einem Satz.

SEO-ANALYSE
Detaillierte Bewertung des SEO-Zustands. Konkrete Verbesserungen mit genauen Zeichenanzahlen und Beispielen.

PERFORMANCE-ANALYSE
Was verlangsamt die Seite konkret. Technische Fixes ohne Code-Bloecke.

KEYWORD-STRATEGIE
Unterteile in drei Absaetze mit den Ueberschriften: Keywords behalten, Keywords entfernen, Neue Keywords testen.

GEO-ANALYSE
Wie gut findet KI die Seite aktuell. Was fehlt fuer bessere KI-Empfehlungen. Was sofort umgesetzt werden soll.

ACTION PLAN
Priorisierte To-Do Liste. Jede Zeile im Format: Aufgabe - geschaetzter Zeitaufwand. Wichtigstes zuerst.`

    const model = ['pro', 'agency'].includes(plan) ? 'claude-opus-4-8' : 'claude-sonnet-4-6'

    const response = await client.messages.create({
        model,
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }]
    })

    if (!response.content?.[0]?.text) {
        throw new Error(language === 'en' ? 'Empty response from AI model' : 'Leere Antwort vom AI-Modell')
    }

    return response.content[0].text
}
