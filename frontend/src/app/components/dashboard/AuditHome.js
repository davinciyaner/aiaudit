'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Download, Lock, RefreshCw, Sparkles, Search, Zap, TrendingUp } from 'lucide-react'
import { getPlans } from '@/lib/plans'

// Start state of /dashboard (before an audit runs). Logged-in users get their real account
// data (quota, recent audits, tracking status); visitors get what the check covers and what
// a free account / Pro adds.

const T = {
    de: {
        hello: name => `Hallo ${name}`,
        planLabel: { free: 'Free', pro: 'Pro', agency: 'Agency' },
        kpiAudits: 'Audits diesen Monat',
        unlimited: 'unbegrenzt',
        of: 'von',
        left: n => (n === 1 ? '1 Audit übrig' : `${n} Audits übrig`),
        noneLeft: 'Kontingent aufgebraucht',
        kpiLast: 'Letzter Gesamt-Score',
        kpiTotal: 'Audits insgesamt',
        kpiGeo: 'Ø Mention-Rate (GEO)',
        kpiSeo: 'Ø Google-Position (SEO)',
        notBooked: 'nicht gebucht',
        noData: 'noch keine Daten',
        recent: 'Letzte Audits',
        allInProfile: 'Alle im Profil',
        emptyTitle: 'Noch kein Audit',
        emptyText: 'Gib oben deine URL ein. Dein erstes Ergebnis erscheint hier.',
        rerun: 'Erneut prüfen',
        pdf: 'PDF',
        scores: { overall: 'Gesamt', seo: 'SEO', performance: 'Perf.', geo: 'GEO' },
        geoTitle: 'KI-Sichtbarkeit tracken',
        seoTitle: 'Google-Rankings tracken',
        geoText: 'Wöchentlicher Check, ob ChatGPT, Claude, Gemini, Perplexity und Google AI Overview dich nennen.',
        seoText: 'Wöchentliche Google-Positionen pro Keyword, mit E-Mail-Alerts bei Einbrüchen.',
        sites: (u, m) => `${u} von ${m} Websites`,
        keywords: (u, m) => `${u} von ${m} Keywords`,
        open: 'Dashboard öffnen',
        from: p => `ab ${p} €/Monat`,
        book: 'Pläne ansehen',
        noSites: 'Noch keine Website hinzugefügt.',
        mention: v => (v == null ? 'noch kein Check' : `${v} % Mention-Rate`),
        position: v => (v == null ? 'noch kein Ranking' : `Ø Position ${v}`),
        upgradeTitle: 'Konkrete Fixes und PDF-Report',
        upgradeText: 'Mit Pro schreibt der KI-Bericht für jeden gefundenen Fehler eine Schritt-für-Schritt-Anleitung. 10 Audits pro Monat, PDF-Export.',
        upgradeCta: 'Pro für 29 €/Monat',
        checksTitle: 'Das prüft der Audit',
        checks: [
            ['GEO / KI-Sichtbarkeit', ['llms.txt', 'Schema.org und FAQ-Schema', 'KI-Crawler in robots.txt', 'Klare Produktdefinition']],
            ['SEO', ['Title-Tags und Meta-Descriptions', 'H1-Struktur und Überschriften', 'Bild-Alt-Texte und Canonicals', 'Interne Links, bis zu 25 Unterseiten']],
            ['Performance', ['Time to First Byte (TTFB)', 'First Contentful Paint (FCP)', 'Ladezeit', 'Desktop und Mobile']],
        ],
        tiersTitle: 'Was du bekommst',
        tiers: [
            ['Ohne Anmeldung', ['Scores für GEO, SEO und Performance', 'Die ersten Fehler pro Bereich']],
            ['Kostenloser Account', ['Alle gefundenen Fehler', 'Audit-Verlauf', '1 Audit pro Monat']],
            ['Pro, 29 €/Monat', ['KI-Bericht mit konkreten Fixes', 'PDF-Report', '10 Audits pro Monat']],
        ],
        sample: 'Beispiel-Report ansehen',
        sampleHref: '/beispiel-report',
        register: 'Kostenlos registrieren',
        registerHref: '/register',
        login: 'Einloggen',
        loginHref: '/login',
        profileHref: '/profile',
        pricingHref: '/pricing',
        geoHref: '/geo/dashboard', geoPricing: '/geo/pricing', seoHref: '/seo/dashboard', seoPricing: '/seo/pricing',
        date: d => new Date(d).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    },
    en: {
        hello: name => `Hi ${name}`,
        planLabel: { free: 'Free', pro: 'Pro', agency: 'Agency' },
        kpiAudits: 'Audits this month',
        unlimited: 'unlimited',
        of: 'of',
        left: n => (n === 1 ? '1 audit left' : `${n} audits left`),
        noneLeft: 'Quota used up',
        kpiLast: 'Latest overall score',
        kpiTotal: 'Audits in total',
        kpiGeo: 'Avg. mention rate (GEO)',
        kpiSeo: 'Avg. Google position (SEO)',
        notBooked: 'not booked',
        noData: 'no data yet',
        recent: 'Recent audits',
        allInProfile: 'All in your profile',
        emptyTitle: 'No audit yet',
        emptyText: 'Enter your URL above. Your first result will show up here.',
        rerun: 'Check again',
        pdf: 'PDF',
        scores: { overall: 'Overall', seo: 'SEO', performance: 'Perf.', geo: 'GEO' },
        geoTitle: 'Track AI visibility',
        seoTitle: 'Track Google rankings',
        geoText: 'A weekly check whether ChatGPT, Claude, Gemini, Perplexity and Google AI Overview mention you.',
        seoText: 'Weekly Google positions per keyword, with email alerts on drops.',
        sites: (u, m) => `${u} of ${m} websites`,
        keywords: (u, m) => `${u} of ${m} keywords`,
        open: 'Open dashboard',
        from: p => `from €${p}/month`,
        book: 'See plans',
        noSites: 'No website added yet.',
        mention: v => (v == null ? 'no check yet' : `${v}% mention rate`),
        position: v => (v == null ? 'no ranking yet' : `avg. position ${v}`),
        upgradeTitle: 'Concrete fixes and PDF report',
        upgradeText: 'With Pro, the AI report writes step-by-step instructions for every issue found. 10 audits per month, PDF export.',
        upgradeCta: 'Pro for €29/month',
        checksTitle: 'What the audit checks',
        checks: [
            ['GEO / AI visibility', ['llms.txt', 'Schema.org and FAQ schema', 'AI crawlers in robots.txt', 'Clear product definition']],
            ['SEO', ['Title tags and meta descriptions', 'H1 structure and headings', 'Image alt text and canonicals', 'Internal links, up to 25 pages']],
            ['Performance', ['Time to First Byte (TTFB)', 'First Contentful Paint (FCP)', 'Load time', 'Desktop and mobile']],
        ],
        tiersTitle: 'What you get',
        tiers: [
            ['Without sign-up', ['Scores for GEO, SEO and performance', 'The first issues per area']],
            ['Free account', ['Every issue found', 'Audit history', '1 audit per month']],
            ['Pro, €29/month', ['AI report with concrete fixes', 'PDF report', '10 audits per month']],
        ],
        sample: 'View example report',
        sampleHref: '/en/example-report',
        register: 'Sign up for free',
        registerHref: '/en/register',
        login: 'Log in',
        loginHref: '/en/login',
        profileHref: '/en/profile',
        pricingHref: '/en/pricing',
        geoHref: '/en/geo/dashboard', geoPricing: '/en/geo/pricing', seoHref: '/en/seo/dashboard', seoPricing: '/en/seo/pricing',
        date: d => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    },
}

const card = 'bg-(--card) border border-(--line) rounded-2xl'

function scoreColor(v) {
    if (v >= 80) return 'text-(--success)'
    if (v >= 50) return 'text-(--warning)'
    return 'text-(--danger)'
}

function Kpi({ label, value, sub, subTone }) {
    return (
        <div className={`${card} px-4 py-3.5 flex flex-col gap-1 min-w-0`}>
            <span className="text-[13px] text-(--text-muted)">{label}</span>
            <span className="font-mono tabular-nums text-[26px] font-semibold tracking-tight leading-tight truncate">{value}</span>
            {sub && <span className={`text-[13px] ${subTone || 'text-(--text-muted)'}`}>{sub}</span>}
        </div>
    )
}

function Skeleton({ className }) {
    return <div className={`animate-pulse rounded-xl bg-(--tint) ${className}`} />
}

async function getJson(path, token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, { headers: { Authorization: `Bearer ${token}` } })
    if (res.status === 403) return { notBooked: true }
    if (!res.ok) throw new Error(String(res.status))
    return res.json()
}

function TrackingCard({ c, kind, data, locale }) {
    const geo = kind === 'geo'
    const plans = getPlans(locale, kind)
    const title = geo ? c.geoTitle : c.seoTitle
    const Icon = geo ? Sparkles : TrendingUp
    const booked = data && !data.notBooked
    return (
        <div className={`${card} p-5 sm:p-6 flex flex-col gap-3 min-w-0`}>
            <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-[10px] bg-(--accent-soft) text-(--accent-ink) inline-flex items-center justify-center" aria-hidden="true"><Icon className="w-4.5 h-4.5" /></span>
                <div className="min-w-0">
                    <h3 className="text-[16px] font-semibold">{title}</h3>
                    <p className="text-[13px] text-(--text-muted)">
                        {booked ? `${c.planLabel[data.plan] || data.plan.charAt(0).toUpperCase() + data.plan.slice(1)} · ${c.sites(data.usedSites, data.maxSites)}` : c.notBooked}
                    </p>
                </div>
            </div>
            {!data && <Skeleton className="h-16" />}
            {data && !booked && (
                <>
                    <p className="text-sm text-(--text-body)">{geo ? c.geoText : c.seoText}</p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-1">
                        <span className="text-sm font-medium">{c.from(plans[0].price)}</span>
                        <Link href={geo ? c.geoPricing : c.seoPricing} className="btn-ghost btn-sm">{c.book}</Link>
                    </div>
                </>
            )}
            {booked && (
                <>
                    {data.sites.length === 0
                        ? <p className="text-sm text-(--text-muted)">{c.noSites}</p>
                        : (
                            <ul className="flex flex-col">
                                {data.sites.slice(0, 3).map((s, i) => (
                                    <li key={s._id} className={`flex justify-between gap-3 py-2 text-sm ${i ? 'border-t border-(--line-soft)' : ''}`}>
                                        <Link href={`${geo ? c.geoHref.replace('/dashboard', '') : c.seoHref.replace('/dashboard', '')}/${s._id}`} className="font-medium truncate hover:text-(--accent-ink)">{s.displayName || s.domain}</Link>
                                        <span className="text-(--text-muted) shrink-0">{geo ? c.mention(s.mentionRate) : c.position(s.avgPosition)}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    <div className="mt-auto flex items-center justify-between gap-3 pt-1">
                        <span className="text-[13px] text-(--text-muted)">{c.keywords(data.usedKeywords, data.maxKeywords)}</span>
                        <Link href={geo ? c.geoHref : c.seoHref} className="btn-ghost btn-sm">{c.open}</Link>
                    </div>
                </>
            )}
        </div>
    )
}

function avg(values) {
    const v = values.filter(x => typeof x === 'number')
    return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : null
}

function LoggedIn({ c, locale, token, onRerun }) {
    const [profile, setProfile] = useState(null)
    const [history, setHistory] = useState(null)
    const [geo, setGeo] = useState(null)
    const [seo, setSeo] = useState(null)

    useEffect(() => {
        getJson('/users/profile', token).then(setProfile).catch(() => setProfile({ error: true }))
        getJson('/users/history?page=1', token).then(setHistory).catch(() => setHistory({ reports: [], total: 0 }))
        getJson('/geo/sites', token).then(setGeo).catch(() => setGeo({ notBooked: true }))
        getJson('/seo/sites', token).then(setSeo).catch(() => setSeo({ notBooked: true }))
    }, [token])

    const audits = profile?.audits
    const plan = profile?.subscription?.plan || 'free'
    const left = audits && audits.limit != null ? Math.max(0, audits.limit - audits.used) : null
    const reports = history?.reports || []
    const last = reports[0]
    const geoAvg = geo && !geo.notBooked ? avg(geo.sites.map(s => s.mentionRate)) : null
    const seoAvg = seo && !seo.notBooked ? avg(seo.sites.map(s => s.avgPosition)) : null
    const canRerun = left == null || left > 0

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
                <h2 className="text-[22px] font-bold tracking-[-0.02em]">{profile?.user?.name ? c.hello(profile.user.name.split(' ')[0]) : ' '}</h2>
                <span className="text-xs font-semibold text-(--accent-ink) bg-(--accent-soft) px-2.5 py-1 rounded-full">{c.planLabel[plan] || plan}</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {!profile ? [0, 1, 2, 3].map(i => <Skeleton key={i} className="h-26" />) : (
                    <>
                        <Kpi label={c.kpiAudits}
                            value={audits ? (audits.limit == null ? audits.used : `${audits.used}/${audits.limit}`) : '-'}
                            sub={audits ? (audits.limit == null ? c.unlimited : left > 0 ? c.left(left) : c.noneLeft) : null}
                            subTone={left === 0 ? 'text-(--warning) font-medium' : undefined} />
                        <Kpi label={c.kpiLast}
                            value={last ? <span className={scoreColor(last.scores.overall)}>{last.scores.overall}</span> : '-'}
                            sub={last ? last.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : c.noData} />
                        <Kpi label={c.kpiGeo}
                            value={geo?.notBooked ? '-' : geoAvg == null ? '-' : `${geoAvg} %`}
                            sub={geo?.notBooked ? c.notBooked : geoAvg == null ? c.noData : null} />
                        <Kpi label={c.kpiSeo}
                            value={seo?.notBooked ? '-' : seoAvg == null ? '-' : seoAvg}
                            sub={seo?.notBooked ? c.notBooked : seoAvg == null ? c.noData : null} />
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-4">
                <section className={`${card} p-5 sm:p-6 min-w-0`} aria-labelledby="recent-audits">
                    <div className="flex items-center justify-between gap-3 mb-3">
                        <h2 id="recent-audits" className="text-[16px] font-semibold">{c.recent}</h2>
                        {reports.length > 0 && <Link href={c.profileHref} className="text-sm font-semibold text-(--accent-ink) hover:underline underline-offset-4">{c.allInProfile}</Link>}
                    </div>
                    {!history && <div className="flex flex-col gap-2"><Skeleton className="h-14" /><Skeleton className="h-14" /><Skeleton className="h-14" /></div>}
                    {history && reports.length === 0 && (
                        <div className="rounded-xl border border-dashed border-(--line) px-5 py-8 text-center">
                            <Search className="w-5 h-5 mx-auto text-(--text-muted) mb-2" aria-hidden="true" />
                            <p className="font-semibold">{c.emptyTitle}</p>
                            <p className="text-sm text-(--text-muted) mt-1">{c.emptyText}</p>
                        </div>
                    )}
                    {reports.length > 0 && (
                        <ul className="flex flex-col">
                            {reports.slice(0, 5).map((r, i) => {
                                const pdfUrl = r.pdfPath ? `${process.env.NEXT_PUBLIC_API_URL.replace('/api', '')}/reports/${r.pdfPath.split('/').pop()}` : null
                                return (
                                    <li key={r._id} className={`grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-2 sm:gap-4 py-3 items-center ${i ? 'border-t border-(--line-soft)' : ''}`}>
                                        <div className="min-w-0">
                                            <p className="font-medium truncate">{r.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</p>
                                            <p className="text-[13px] text-(--text-muted)">{c.date(r.createdAt)}</p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                            {['overall', 'seo', 'performance', 'geo'].map(k => (
                                                <span key={k} className="text-[13px] text-(--text-muted)">
                                                    {c.scores[k]} <strong className={`font-mono font-semibold ${scoreColor(r.scores[k])}`}>{r.scores[k]}</strong>
                                                </span>
                                            ))}
                                            {pdfUrl && (
                                                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] font-semibold text-(--accent-ink) hover:underline underline-offset-4">
                                                    <Download className="w-3.5 h-3.5" aria-hidden="true" />{c.pdf}
                                                </a>
                                            )}
                                            {canRerun && (
                                                <button type="button" onClick={() => onRerun(r.url)} className="inline-flex items-center gap-1 text-[13px] font-semibold text-(--text-body) hover:text-(--accent-ink)">
                                                    <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />{c.rerun}
                                                </button>
                                            )}
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </section>

                <div className="flex flex-col gap-4 min-w-0">
                    <TrackingCard c={c} kind="geo" data={geo} locale={locale} />
                    <TrackingCard c={c} kind="seo" data={seo} locale={locale} />
                </div>
            </div>

            {profile && plan === 'free' && (
                <div className="rounded-2xl bg-[oklch(21%_0.035_264)] text-[oklch(98%_0.004_255)] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <p className="font-semibold">{c.upgradeTitle}</p>
                        <p className="text-sm text-[oklch(84%_0.02_262)] mt-1 max-w-[60ch]">{c.upgradeText}</p>
                    </div>
                    <Link href={c.pricingHref} className="btn-primary shrink-0">{c.upgradeCta}<ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
                </div>
            )}
        </div>
    )
}

function Visitor({ c }) {
    const icons = [Sparkles, Search, Zap]
    return (
        <div className="flex flex-col gap-4 mt-2">
            <section aria-labelledby="checks-title">
                <h2 id="checks-title" className="sr-only">{c.checksTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {c.checks.map(([title, items], i) => {
                        const Icon = icons[i]
                        return (
                            <div key={title} className={`${card} p-5`}>
                                <div className="flex items-center gap-2.5 mb-3">
                                    <span className="w-8 h-8 rounded-[10px] bg-(--accent-soft) text-(--accent-ink) inline-flex items-center justify-center" aria-hidden="true"><Icon className="w-4 h-4" /></span>
                                    <h3 className="text-[15px] font-semibold">{title}</h3>
                                </div>
                                <ul className="flex flex-col gap-1.5">
                                    {items.map(it => (
                                        <li key={it} className="flex gap-2 text-sm text-(--text-body)"><Check className="w-4 h-4 mt-0.5 shrink-0 text-(--accent)" aria-hidden="true" />{it}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section className={`${card} p-5 sm:p-6`} aria-labelledby="tiers-title">
                <h2 id="tiers-title" className="text-[16px] font-semibold mb-4">{c.tiersTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 md:divide-x divide-(--line-soft)">
                    {c.tiers.map(([title, items], i) => (
                        <div key={title} className={`md:px-5 ${i === 0 ? 'md:pl-0' : ''} ${i === 2 ? 'md:pr-0' : ''}`}>
                            <p className={`text-sm font-semibold mb-2 ${i === 2 ? 'text-(--accent-ink)' : ''}`}>{title}</p>
                            <ul className="flex flex-col gap-1.5">
                                {items.map(it => (
                                    <li key={it} className="flex gap-2 text-sm text-(--text-body)">
                                        {i === 0 ? <Check className="w-4 h-4 mt-0.5 shrink-0 text-(--text-muted)" aria-hidden="true" /> : i === 1 ? <Check className="w-4 h-4 mt-0.5 shrink-0 text-(--accent)" aria-hidden="true" /> : <Lock className="w-4 h-4 mt-0.5 shrink-0 text-(--accent-ink)" aria-hidden="true" />}
                                        {it}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-5 pt-5 border-t border-(--line-soft)">
                    <Link href={c.registerHref} className="btn-primary btn-sm">{c.register}</Link>
                    <Link href={c.sampleHref} className="btn-ghost btn-sm">{c.sample}</Link>
                    <Link href={c.loginHref} className="text-sm font-semibold text-(--text-body) hover:text-(--accent-ink) ml-auto">{c.login}</Link>
                </div>
            </section>
        </div>
    )
}

export default function AuditHome({ locale = 'de', onRerun }) {
    const c = T[locale === 'en' ? 'en' : 'de']
    const [token, setToken] = useState(undefined)
    useEffect(() => { setToken(localStorage.getItem('token') || null) }, [])
    if (token === undefined) return null
    return (
        <div className="mt-8">
            {token ? <LoggedIn c={c} locale={locale} token={token} onRerun={onRerun} /> : <Visitor c={c} />}
        </div>
    )
}
