'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Loader2, MailCheck } from 'lucide-react'
import Navbar from '../Navbar'
import Footer from '../Footer'

const COPY = {
    de: {
        eyebrow: 'In Entwicklung',
        title: 'SEO-Agent: Rankings automatisch analysieren und verbessern',
        lead: 'Wir bauen einen Agenten, der deine Keywords pflegt, deinen Content mit den Seiten vor dir in Google vergleicht und Verbesserungen schreibt. Trag dich ein, wenn du ihn als Erstes testen willst.',
        form: {
            title: 'Auf die Warteliste',
            email: 'E-Mail-Adresse',
            emailPh: 'du@firma.de',
            website: 'Deine Website (optional)',
            websitePh: 'deinewebsite.de',
            interests: 'Was interessiert dich am meisten? (optional)',
            submit: 'Eintragen',
            submitting: 'Wird eingetragen…',
            note: 'Du bekommst eine E-Mail zur Bestätigung. Danach schreiben wir dir nur noch, wenn du den Agenten testen kannst. Abmelden geht jederzeit.',
            privacy: 'Datenschutzerklärung',
            privacyHref: '/datenschutz',
            invalid: 'Bitte gib eine gültige E-Mail-Adresse ein.',
            error: 'Das hat nicht geklappt. Bitte versuch es noch einmal.',
            doneTitle: 'Fast geschafft',
            done: (email) => `Wir haben dir eine E-Mail an ${email} geschickt. Klick auf den Link darin, dann bist du auf der Warteliste.`,
            doneSpam: 'Keine E-Mail da? Schau im Spam- oder Werbung-Ordner nach.',
        },
        interests: {
            'keyword-cleanup': 'Keywords ohne passenden Content erkennen',
            'keyword-discovery': 'Rankende, nicht getrackte Keywords finden',
            'content-compare': 'Content mit den Top-Ergebnissen vergleichen und verbessern',
            'email-reports': 'Vergleich als PDF per E-Mail',
        },
        featuresTitle: 'Was der Agent können soll',
        features: [
            ['Keywords aufräumen', 'Er erkennt Keywords, für die du nicht rankst, weil du keinen passenden Artikel oder Content hast. Je nach Einstellung nimmt er sie aus dem Tracking oder schlägt sie dir als Content-Idee vor.'],
            ['Neue Keywords finden', 'Er findet Keywords, für die du schon rankst, die du aber noch nicht trackst, und fügt sie hinzu oder schickt sie dir vorher zur Freigabe.'],
            ['Content vergleichen', 'Steht ein Keyword zum Beispiel auf Platz 40, analysiert er deine Seite und die Seiten, die vor dir ranken. Du siehst, wo die anderen besser sind und wo du besser bist.'],
            ['Content verbessern', 'Für die Punkte, bei denen du schwächer bist, schreibt er konkrete Verbesserungen, damit die Seite Richtung Seite 1 steigen kann.'],
        ],
        settingsTitle: 'Du stellst ein, was er darf',
        settingsLead: 'Der Agent arbeitet nur so selbstständig, wie du es willst. Für jede Aufgabe wählst du einzeln:',
        settingsHead: ['Aufgabe', 'Mögliche Einstellungen'],
        settings: [
            ['Neue Keywords', 'automatisch hinzufügen oder erst per E-Mail vorschlagen'],
            ['Keywords ohne Content', 'aus dem Tracking entfernen oder als Content-Idee vorschlagen'],
            ['Content-Vergleich', 'im Dashboard, per E-Mail oder als PDF per E-Mail'],
            ['Verbesserter Content', 'nur als Entwurf, nichts wird veröffentlicht'],
        ],
        statusTitle: 'Wie es weitergeht',
        status: [
            'Der Agent ist noch in Entwicklung. Wie schnell wir ihn bauen und welche Funktion zuerst kommt, hängt davon ab, wer sich einträgt und was dich am meisten interessiert.',
            'Einen festen Termin nennen wir bewusst noch nicht. Wer auf der Warteliste steht, bekommt als Erstes Zugang und erfährt den Preis vor allen anderen.',
        ],
        faqTitle: 'Häufige Fragen',
        faq: [
            ['Brauche ich ein Scanora-Konto?', 'Nein. Für die Warteliste reicht deine E-Mail-Adresse.'],
            ['Was kostet der Agent?', 'Das steht noch nicht fest. Auf der Warteliste erfährst du den Preis zuerst.'],
            ['Kann ich das SEO-Tracking schon heute nutzen?', 'Ja. Rankings tracken, automatische Keyword-Erkennung und E-Mail-Alerts bei Einbrüchen gibt es bereits im SEO-Tracking, Content-Gap-Analysen ab dem Pro-Plan.'],
        ],
        trackingLink: ['Zum SEO-Tracking', '/seo/pricing'],
    },
    en: {
        eyebrow: 'In development',
        title: 'SEO agent: analyze and improve your rankings automatically',
        lead: 'We are building an agent that maintains your keywords, compares your content with the pages ranking above you on Google and writes improvements. Join the waitlist if you want to test it first.',
        form: {
            title: 'Join the waitlist',
            email: 'Email address',
            emailPh: 'you@company.com',
            website: 'Your website (optional)',
            websitePh: 'yourwebsite.com',
            interests: 'What interests you most? (optional)',
            submit: 'Join',
            submitting: 'Joining…',
            note: "You'll get an email to confirm. After that we'll only write when you can test the agent. You can unsubscribe at any time.",
            privacy: 'Privacy policy',
            privacyHref: '/datenschutz',
            invalid: 'Please enter a valid email address.',
            error: "That didn't work. Please try again.",
            doneTitle: 'Almost there',
            done: (email) => `We sent an email to ${email}. Click the link in it and you're on the waitlist.`,
            doneSpam: 'No email? Check your spam or promotions folder.',
        },
        interests: {
            'keyword-cleanup': 'Spot keywords without matching content',
            'keyword-discovery': "Find keywords you rank for but don't track",
            'content-compare': 'Compare content with top results and improve it',
            'email-reports': 'Comparison as a PDF by email',
        },
        featuresTitle: 'What the agent should do',
        features: [
            ['Clean up keywords', "It spots keywords you don't rank for because you have no matching article or content. Depending on your settings it removes them from tracking or suggests them as content ideas."],
            ['Find new keywords', "It finds keywords you already rank for but don't track yet, and adds them or sends them to you for approval first."],
            ['Compare content', 'If a keyword sits on, say, position 40, it analyzes your page and the pages ranking above you. You see where the others are better and where you are.'],
            ['Improve content', 'For the points where you are weaker it writes concrete improvements, so the page can climb toward page one.'],
        ],
        settingsTitle: 'You decide what it may do',
        settingsLead: 'The agent only works as independently as you want. For each task you choose separately:',
        settingsHead: ['Task', 'Possible settings'],
        settings: [
            ['New keywords', 'add automatically or suggest by email first'],
            ['Keywords without content', 'remove from tracking or suggest as a content idea'],
            ['Content comparison', 'in the dashboard, by email or as a PDF by email'],
            ['Improved content', 'draft only, nothing gets published'],
        ],
        statusTitle: 'What happens next',
        status: [
            'The agent is still in development. How fast we build it and which feature comes first depends on who signs up and what interests you most.',
            "We deliberately don't name a date yet. Waitlist members get access first and hear the price before anyone else.",
        ],
        faqTitle: 'FAQ',
        faq: [
            ['Do I need a Scanora account?', 'No. Your email address is enough for the waitlist.'],
            ['How much will the agent cost?', "That isn't decided yet. Waitlist members hear the price first."],
            ['Can I use SEO tracking today?', 'Yes. Rank tracking, automatic keyword discovery and email alerts on drops are already part of SEO tracking, content gap analysis from the Pro plan.'],
        ],
        trackingLink: ['Go to SEO tracking', '/en/seo/pricing'],
    },
}

const H2 = 'text-[28px] leading-tight tracking-[-0.03em] font-bold'
const INPUT = 'w-full h-11 px-3.5 rounded-[10px] border border-(--line) bg-(--bg-base) text-(--text-white) placeholder:text-(--text-muted) outline-none focus:border-(--accent) focus:ring-2 focus:ring-(--accent-ring) transition-colors'

function WaitlistForm({ locale, c }) {
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')
    const [interests, setInterests] = useState([])
    const [status, setStatus] = useState('idle') // idle | loading | done | error
    const [error, setError] = useState('')

    const toggle = (key) => setInterests(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])

    async function submit(e) {
        e.preventDefault()
        const value = email.trim()
        if (!value.includes('@') || !value.includes('.')) { setError(c.form.invalid); setStatus('error'); return }
        setStatus('loading'); setError('')
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waitlist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: value, website, interests, language: locale, product: 'seo-agent' }),
            })
            if (!res.ok) {
                const data = await res.json().catch(() => ({}))
                throw new Error(data.error || c.form.error)
            }
            setStatus('done')
        } catch (err) {
            setError(err.message || c.form.error)
            setStatus('error')
        }
    }

    if (status === 'done') {
        return (
            <div className="card p-6 sm:p-8" role="status">
                <MailCheck className="w-8 h-8 text-(--accent-ink) mb-4" aria-hidden="true" />
                <h2 className="text-xl font-bold mb-2">{c.form.doneTitle}</h2>
                <p className="text-(--text-body) leading-relaxed">{c.form.done(email.trim())}</p>
                <p className="mt-3 text-sm text-(--text-muted)">{c.form.doneSpam}</p>
            </div>
        )
    }

    return (
        <form onSubmit={submit} noValidate className="card p-6 sm:p-8 flex flex-col gap-4">
            <h2 className="text-xl font-bold">{c.form.title}</h2>
            <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">{c.form.email}</span>
                <input type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder={c.form.emailPh} className={INPUT} aria-invalid={status === 'error'} />
            </label>
            <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">{c.form.website}</span>
                <input type="text" inputMode="url" autoComplete="url" value={website} onChange={e => setWebsite(e.target.value)}
                    placeholder={c.form.websitePh} className={INPUT} />
            </label>
            <fieldset className="flex flex-col gap-2">
                <legend className="text-sm font-medium mb-1.5">{c.form.interests}</legend>
                {Object.entries(c.interests).map(([key, label]) => (
                    <label key={key} className="flex items-start gap-2.5 text-[15px] text-(--text-body) cursor-pointer">
                        <input type="checkbox" checked={interests.includes(key)} onChange={() => toggle(key)}
                            className="mt-1 w-4 h-4 accent-(--accent) shrink-0" />
                        {label}
                    </label>
                ))}
            </fieldset>
            {status === 'error' && <p className="text-sm text-(--danger)" role="alert">{error}</p>}
            <button type="submit" disabled={status === 'loading'} className="btn-primary justify-center disabled:opacity-70">
                {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : null}
                {status === 'loading' ? c.form.submitting : c.form.submit}
                {status !== 'loading' && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
            </button>
            <p className="text-xs text-(--text-muted) leading-relaxed">
                {c.form.note} <Link href={c.form.privacyHref} className="underline underline-offset-2 hover:text-(--text-body)">{c.form.privacy}</Link>.
            </p>
        </form>
    )
}

export default function SeoAgentWaitlist({ locale = 'de' }) {
    const c = COPY[locale] || COPY.de
    return (
        <div className="min-h-screen bg-(--bg-base)">
            <Navbar />
            <main className="max-w-300 mx-auto px-4 sm:px-8 pt-28 md:pt-34 pb-18 md:pb-28">
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] gap-10 lg:gap-16 items-start">
                    <header className="min-w-0">
                        <span className="eyebrow">{c.eyebrow}</span>
                        <h1 className="mt-3 text-[clamp(34px,4.4vw,54px)] leading-[1.05] tracking-[-0.038em] font-bold">{c.title}</h1>
                        <p className="mt-5 text-lg leading-relaxed text-(--text-body) max-w-[58ch]">{c.lead}</p>
                        <ol className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                            {c.features.map(([h, p], i) => (
                                <li key={h} className="border-t border-(--line) pt-4">
                                    <span className="text-xs font-semibold tabular-nums text-(--accent-ink)">{String(i + 1).padStart(2, '0')}</span>
                                    <h2 className="mt-1 font-semibold">{h}</h2>
                                    <p className="mt-2 text-[15px] text-(--text-body) leading-relaxed">{p}</p>
                                </li>
                            ))}
                        </ol>
                    </header>
                    <div className="lg:sticky lg:top-28">
                        <WaitlistForm locale={locale} c={c} />
                    </div>
                </div>

                <div className="mt-20 flex flex-col gap-14 max-w-225">
                    <section>
                        <h2 className={`${H2} mb-3`}>{c.settingsTitle}</h2>
                        <p className="text-(--text-body) leading-relaxed mb-5">{c.settingsLead}</p>
                        <div className="card divide-y divide-(--line-soft)">
                            {c.settings.map(([task, options]) => (
                                <div key={task} className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-1 sm:gap-6 px-5 py-4">
                                    <span className="font-semibold">{task}</span>
                                    <span className="text-(--text-body)">{options}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className={`${H2} mb-4`}>{c.statusTitle}</h2>
                        <div className="flex flex-col gap-4 text-(--text-body) leading-relaxed max-w-[65ch]">
                            {c.status.map(p => <p key={p}>{p}</p>)}
                        </div>
                    </section>

                    <section>
                        <h2 className={`${H2} mb-4`}>{c.faqTitle}</h2>
                        <dl className="flex flex-col divide-y divide-(--line-soft) border-y border-(--line-soft)">
                            {c.faq.map(([q, a]) => (
                                <div key={q} className="py-4">
                                    <dt className="font-semibold flex items-start gap-2"><Check className="w-4 h-4 mt-1 text-(--accent-ink) shrink-0" aria-hidden="true" />{q}</dt>
                                    <dd className="mt-1.5 pl-6 text-(--text-body) leading-relaxed">{a}</dd>
                                </div>
                            ))}
                        </dl>
                        <Link href={c.trackingLink[1]} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-(--accent-ink) hover:underline underline-offset-2">
                            {c.trackingLink[0]}<ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}
