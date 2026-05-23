import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function generateAIReport(auditData) {
    console.log('AI-Bericht wird generiert...')

    const prompt = `Du bist ein erfahrener Web-Audit Experte. Analysiere diese Website-Audit-Daten und schreibe einen professionellen Bericht auf Deutsch.

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
Gesamtscore: ${auditData.overallScore}/100
SEO Score: ${auditData.seo.score}/100
Performance Score: ${auditData.performance.score}/100
Security Score: ${auditData.security.score}/100
GEO Score: ${auditData.geo?.score ?? 0}/100

SEO PROBLEME:
${auditData.seo.issues.join('\n') || 'Keine'}

PERFORMANCE METRIKEN:
TTFB: ${auditData.performance.metrics.ttfb}ms
First Contentful Paint: ${auditData.performance.metrics.fcp}ms
DOM Load: ${auditData.performance.metrics.domLoad}ms
Vollstaendige Ladezeit: ${auditData.performance.metrics.fullLoad}ms
Gesamtgroesse: ${auditData.performance.metrics.totalSize}KB

PERFORMANCE PROBLEME:
${auditData.performance.issues.join('\n') || 'Keine'}

SECURITY PROBLEME:
${auditData.security.issues.join('\n') || 'Keine'}

TOP KEYWORDS:
${auditData.keywords.topKeywords.slice(0, 10).map(k => `${k.keyword} (Score: ${k.score}, Dichte: ${k.density})`).join('\n')}

SCHWACHE KEYWORDS:
${auditData.keywords.weakKeywords.join(', ') || 'Keine'}

GEO CHECKS:
- llms.txt: ${auditData.geo?.checks?.hasLlmsTxt ? 'vorhanden' : 'fehlt'}
- FAQ Schema: ${auditData.geo?.checks?.hasFAQ ? 'vorhanden' : 'fehlt'}
- Organization Schema: ${auditData.geo?.checks?.hasOrganization ? 'vorhanden' : 'fehlt'}
- AI-Crawler erlaubt: ${auditData.geo?.checks?.robotsAllowsAI ? 'ja' : 'nein'}

GEO PROBLEME:
${auditData.geo?.issues?.join('\n') || 'Keine'}

Schreibe jetzt den Bericht. Verwende genau diese acht Abschnittsnamen, jeden auf einer eigenen Zeile in Grossbuchstaben, ohne jegliche zusaetzliche Zeichen:

ZUSAMMENFASSUNG
2-3 Saetze zum Gesamtzustand. Direkt, konkret, keine Floskeln.

KRITISCHE PROBLEME
Die dringendsten Probleme als Bindestrich-Liste. Jeder Punkt: Problem und konkrete Massnahme in einem Satz.

SEO-ANALYSE
Detaillierte Bewertung des SEO-Zustands. Konkrete Verbesserungen mit genauen Zeichenanzahlen und Beispielen.

PERFORMANCE-ANALYSE
Was verlangsamt die Seite konkret. Technische Fixes ohne Code-Bloecke.

SICHERHEITS-ANALYSE
Welche Header fehlen, was sie bewirken und wie man sie in der jeweiligen Hosting-Konfiguration setzt.

KEYWORD-STRATEGIE
Unterteile in drei Absaetze mit den Ueberschriften: Keywords behalten, Keywords entfernen, Neue Keywords testen.

GEO-ANALYSE
Wie gut findet KI die Seite aktuell. Was fehlt fuer bessere KI-Empfehlungen. Was sofort umgesetzt werden soll.

ACTION PLAN
Priorisierte To-Do Liste. Jede Zeile im Format: Aufgabe - geschaetzter Zeitaufwand. Wichtigstes zuerst.`

    const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 2500,
        messages: [{ role: 'user', content: prompt }]
    })

    return response.content[0].text
}