// Single source of truth for all plans shown on the site: landing page, /pricing,
// /geo/pricing and /seo/pricing (de + en). Limits mirror backend/controllers/
// {geo_tracking,seo_tracking}.js and routes/audit_router.js; prices mirror the PayPal plans.
// Pages add their own presentation fields (CTA labels, PayPal env keys, icons) on top.

const PLANS = {
    de: {
        audit: [
            {
                id: 'free', name: 'Free', price: '0', period: 'für immer',
                desc: 'Zum Ausprobieren von Scanora',
                features: ['1 Audit pro Monat', 'SEO-Score & Analyse', 'Performance-Metriken', 'GEO-Sichtbarkeit', 'Audit-Verlauf'],
            },
            {
                id: 'pro', name: 'Pro', price: '29', period: 'pro Monat', highlight: true, badge: 'Beliebteste',
                desc: 'Für Freelancer und kleine Agenturen',
                features: ['10 Audits pro Monat', 'Alles aus Free', 'KI-generierter Bericht mit konkreten Fixes', 'PDF-Report', 'Desktop + Mobile Screenshots'],
            },
            {
                id: 'agency', name: 'Agency', price: '99', period: 'pro Monat',
                desc: 'Für Teams mit mehreren Kunden',
                features: ['Unbegrenzte Audits', 'Alles aus Pro', 'Priorität-Support'],
            },
        ],
        geo: [
            {
                id: 'einsteiger', name: 'Einsteiger', price: '4,99', period: 'pro Monat',
                desc: 'Für Einzelpersonen und erste Schritte',
                features: ['1 Website tracken', '10 Keywords', 'Claude + Gemini Tracking', 'Wöchentlicher Auto-Check', '2 manuelle Checks pro Monat', 'Mention-Verlauf'],
                locked: ['ChatGPT Tracking (ab Pro)', 'Perplexity Tracking (ab Pro)', 'Google AI Overview Tracking (ab Pro)', '2 Prompt-Varianten pro Keyword (ab Pro)', 'Themen-Sichtbarkeits-Analyse (ab Pro)'],
            },
            {
                id: 'pro', name: 'Pro', price: '74,99', period: 'pro Monat', highlight: true, badge: 'Beliebteste',
                desc: 'Für Freelancer und kleine Agenturen',
                features: ['3 Websites tracken', '20 Keywords', 'Claude + ChatGPT + Gemini + Perplexity + Google AI Overview Tracking', '2 Prompt-Varianten pro Keyword (Empfehlung + Vergleich)', 'Wöchentlicher Auto-Check', '2 manuelle Checks pro Monat', 'Themen-Sichtbarkeits-Analyse (Top 20 Domains)', 'Mention-Verlauf'],
                locked: ['Historien-Trends pro Keyword (Google AI Overview, ab Expert)'],
            },
            {
                id: 'expert', name: 'Expert', price: '199,99', period: 'pro Monat',
                desc: 'Für Agenturen mit vielen Kunden',
                features: ['10 Websites tracken', '60 Keywords', 'Claude + ChatGPT + Gemini + Perplexity + Google AI Overview Tracking', '2 Prompt-Varianten pro Keyword (Empfehlung + Vergleich)', 'Wöchentlicher Auto-Check', '3 manuelle Checks pro Monat', 'Themen-Sichtbarkeits-Analyse (Top 20 Domains)', 'Historien-Trends pro Keyword (Google AI Overview)', 'Mention-Verlauf', 'Priorisierter Support'],
            },
        ],
        seo: [
            {
                id: 'einsteiger', name: 'Einsteiger', price: '29,99', period: 'pro Monat',
                desc: 'Für Einzelpersonen und kleine Projekte',
                features: ['3 Websites tracken', '50 Keywords gesamt', 'Wöchentliches Ranking-Update', '2 manuelle Checks pro Monat', 'Ranking-Verlauf (8 Wochen)', 'Keyword-Ideen & Suchvolumen (6 Aufrufe/Monat)', 'Automatische Keyword-Erkennung aus neuen Seiten & Inhalten (bis zu 10 pro Lauf)', 'E-Mail Alerts bei großen Einbrüchen', 'Konkurrenten-Analyse (automatisch, wöchentlich)', 'Backlink-Übersicht (automatisch, monatlich)'],
                locked: ['Content Gap Analyse (ab Pro)'],
            },
            {
                id: 'pro', name: 'Pro', price: '89,99', period: 'pro Monat', highlight: true, badge: 'Beliebteste',
                desc: 'Für Freelancer und wachsende Unternehmen',
                features: ['10 Websites tracken', '200 Keywords gesamt', 'Wöchentliches Ranking-Update', '4 manuelle Checks pro Monat', 'Ranking-Verlauf (6 Monate)', 'Keyword-Ideen & Suchvolumen (20 Aufrufe/Monat)', 'Automatische Keyword-Erkennung aus neuen Seiten & Inhalten (bis zu 30 pro Lauf)', 'E-Mail Alerts ab 5 Positionen', 'Konkurrenten-Analyse (automatisch, wöchentlich)', 'Backlink-Übersicht (automatisch, monatlich)', 'Content Gap Analyse - wöchentlich automatisch je Website, insgesamt bis zu 100 Abrufe/Monat'],
            },
            {
                id: 'expert', name: 'Expert', price: '179,99', period: 'pro Monat',
                desc: 'Für Agenturen mit vielen Kunden',
                features: ['20 Websites tracken', '500 Keywords gesamt', 'Wöchentliches Ranking-Update', '6 manuelle Checks pro Monat', 'Ranking-Verlauf unbegrenzt', 'Keyword-Ideen & Suchvolumen (40 Aufrufe/Monat)', 'Automatische Keyword-Erkennung aus neuen Seiten & Inhalten (bis zu 50 pro Lauf)', 'E-Mail Alerts ab 3 Positionen', 'Konkurrenten-Analyse (automatisch, wöchentlich)', 'Backlink-Übersicht (automatisch, monatlich)', 'Content Gap Analyse - wöchentlich automatisch je Website, insgesamt bis zu 300 Abrufe/Monat', 'Priorisierter Support'],
            },
        ],
    },
    en: {
        audit: [
            {
                id: 'free', name: 'Free', price: '0', period: 'forever',
                desc: 'To try out Scanora',
                features: ['1 audit per month', 'SEO score & analysis', 'Performance metrics', 'GEO visibility', 'Audit history'],
            },
            {
                id: 'pro', name: 'Pro', price: '29', period: 'per month', highlight: true, badge: 'Most popular',
                desc: 'For freelancers and small agencies',
                features: ['10 audits per month', 'Everything in Free', 'AI-generated report with concrete fixes', 'PDF report', 'Desktop + mobile screenshots'],
            },
            {
                id: 'agency', name: 'Agency', price: '99', period: 'per month',
                desc: 'For teams with multiple clients',
                features: ['Unlimited audits', 'Everything in Pro', 'Priority support'],
            },
        ],
        geo: [
            {
                id: 'einsteiger', name: 'Starter', price: '4.99', period: 'per month',
                desc: 'For individuals and first steps',
                features: ['Track 1 website', '10 keywords', 'Claude + Gemini tracking', 'Weekly auto-check', '2 manual checks per month', 'Mention history'],
                locked: ['ChatGPT tracking (from Pro)', 'Perplexity tracking (from Pro)', 'Google AI Overview tracking (from Pro)', '2 prompt variants per keyword (from Pro)', 'Topic visibility analysis (from Pro)'],
            },
            {
                id: 'pro', name: 'Pro', price: '74.99', period: 'per month', highlight: true, badge: 'Most popular',
                desc: 'For freelancers and small agencies',
                features: ['Track 3 websites', '20 keywords', 'Claude + ChatGPT + Gemini + Perplexity + Google AI Overview tracking', '2 prompt variants per keyword (recommendation + comparison)', 'Weekly auto-check', '2 manual checks per month', 'Topic visibility analysis (top 20 domains)', 'Mention history'],
                locked: ['Historical trends per keyword (Google AI Overview, from Expert)'],
            },
            {
                id: 'expert', name: 'Expert', price: '199.99', period: 'per month',
                desc: 'For agencies with many clients',
                features: ['Track 10 websites', '60 keywords', 'Claude + ChatGPT + Gemini + Perplexity + Google AI Overview tracking', '2 prompt variants per keyword (recommendation + comparison)', 'Weekly auto-check', '3 manual checks per month', 'Topic visibility analysis (top 20 domains)', 'Historical trends per keyword (Google AI Overview)', 'Mention history', 'Priority support'],
            },
        ],
        seo: [
            {
                id: 'einsteiger', name: 'Starter', price: '29.99', period: 'per month',
                desc: 'For individuals and small projects',
                features: ['Track 3 websites', '50 keywords total', 'Weekly ranking update', '2 manual checks per month', 'Ranking history (8 weeks)', 'Keyword ideas & search volume (6 lookups/month)', 'Automatic keyword discovery from new pages & content (up to 10 per run)', 'Email alerts on major drops', 'Competitor analysis (automatic, weekly)', 'Backlink overview (automatic, monthly)'],
                locked: ['Content gap analysis (from Pro)'],
            },
            {
                id: 'pro', name: 'Pro', price: '89.99', period: 'per month', highlight: true, badge: 'Most popular',
                desc: 'For freelancers and growing companies',
                features: ['Track 10 websites', '200 keywords total', 'Weekly ranking update', '4 manual checks per month', 'Ranking history (6 months)', 'Keyword ideas & search volume (20 lookups/month)', 'Automatic keyword discovery from new pages & content (up to 30 per run)', 'Email alerts from 5 positions', 'Competitor analysis (automatic, weekly)', 'Backlink overview (automatic, monthly)', 'Content gap analysis - weekly, automatic per website, up to 100 lookups/month total'],
            },
            {
                id: 'expert', name: 'Expert', price: '179.99', period: 'per month',
                desc: 'For agencies with many clients',
                features: ['Track 20 websites', '500 keywords total', 'Weekly ranking update', '6 manual checks per month', 'Unlimited ranking history', 'Keyword ideas & search volume (40 lookups/month)', 'Automatic keyword discovery from new pages & content (up to 50 per run)', 'Email alerts from 3 positions', 'Competitor analysis (automatic, weekly)', 'Backlink overview (automatic, monthly)', 'Content gap analysis - weekly, automatic per website, up to 300 lookups/month total', 'Priority support'],
            },
        ],
    },
}

export function getPlans(locale, product) {
    return PLANS[locale === 'en' ? 'en' : 'de'][product]
}

// Merges page-specific fields (cta, planEnvKey, icon, href, ...) onto the shared plan data,
// matched by plan id. Shared data wins for everything that describes the plan itself.
export function withPlanData(locale, product, pagePlans) {
    const shared = getPlans(locale, product)
    return pagePlans.map(p => {
        const s = shared.find(x => x.id === p.id)
        if (!s) return p
        const { features, locked, desc, price, name, period } = s
        return { ...p, name, price, desc, features, locked, ...(p.period !== undefined || period ? { period } : {}) }
    })
}
