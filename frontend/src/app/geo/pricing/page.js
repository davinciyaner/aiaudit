'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Star, Building2, LogIn, Loader2, Lock } from 'lucide-react'
import Link from 'next/link'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import { withPlanData } from '@/lib/plans'

const FAQS = [
    {
        q: 'Was kostet ein GEO-Audit?',
        a: 'Ein einmaliger GEO-Audit ist bei Scanora kostenlos (Teil des Website-Audits im Free-Plan, 1x pro Monat) bzw. ab 29 €/Monat im Pro-Plan mit KI-generiertem Fix-Report. Das laufende, wöchentliche Monitoring - die GEO-Automatisierung - ist ein separates Abo und startet ab 4,99 €/Monat für 1 Website und 10 Keywords mit Claude- und Gemini-Tracking. Der Pro-Plan (74,99 €/Monat) ergänzt ChatGPT-, Perplexity- und Google-AI-Overview-Tracking für 3 Websites und 20 Keywords, 2 Prompt-Varianten pro Keyword sowie eine Themen-Sichtbarkeits-Analyse, der Expert-Plan (199,99 €/Monat) deckt bis zu 10 Websites und 60 Keywords ab und ergänzt Historien-Trends pro Keyword. Alle Automatisierungs-Pläne bieten 14 Tage kostenlose Testphase.',
    },
    {
        q: 'Kann ich meine Sichtbarkeit bei Claude (Claude AI) tracken?',
        a: 'Ja. Schon der Einsteiger-Plan ab 4,99 €/Monat trackt wöchentlich automatisch, ob und wie oft Claude und Google Gemini deine Website bei relevanten Anfragen als Quelle nennen - inklusive Mention-Verlauf über Zeit. Für zusätzliches Tracking bei ChatGPT, Perplexity und Google AI Overview im selben Dashboard brauchst du den Pro-Plan ab 74,99 €/Monat.',
    },
    {
        q: 'Was ist der Unterschied zwischen einem einmaligen GEO Audit und GEO Automatisierung?',
        a: 'Ein einmaliger GEO Audit (Teil des kostenlosen Scanora Website-Audits) zeigt deinen GEO-Score zu einem Zeitpunkt. GEO Automatisierung prüft wöchentlich automatisch, ob ChatGPT, Claude, Gemini, Perplexity und Google AI Overview deine Website erwähnen, und zeigt den Verlauf über Zeit statt einer Einzelmessung.',
    },
    {
        q: 'Was sind Prompt-Varianten und wozu brauche ich mehrere?',
        a: 'Reale Nutzer fragen KI-Systeme auf sehr unterschiedliche Art - mal empfehlungsorientiert ("Welches Tool kennst du für X?"), mal vergleichend ("Was ist das beste Tool für X im Vergleich?"). Ab dem Pro-Plan prüft Scanora pro Keyword beide Varianten separat, damit du siehst, bei welcher Art von Anfrage du erwähnt wirst und bei welcher nicht.',
    },
    {
        q: 'Was zeigen mir die Themen-Sichtbarkeits-Analyse und Historien-Trends?',
        a: 'Die Themen-Sichtbarkeits-Analyse (ab Pro) zeigt dir, welche Domains in KI-Antworten zu deinen getrackten Keywords am häufigsten zitiert werden - über alle Kontexte hinweg (Erklärungen, Vergleiche, Tutorials), nicht nur Tool-Empfehlungen. Für konkrete Konkurrenz-Tools nutze den „Wettbewerber"-Tab, der gezielt Empfehlungs-Antworten auswertet. Historien-Trends (Expert) zeigen dir pro Keyword, wie stark das Thema insgesamt monatlich in KI-Antworten bei Google AI Overview vorkommt - ein Trend fürs Themenvolumen, kein domainspezifisches Zitations-Tracking.',
    },
    {
        q: 'Gibt es eine kostenlose Testphase für GEO Automatisierung?',
        a: 'Ja, alle GEO-Automatisierung-Pläne bieten 14 Tage kostenlos testen, danach automatische Verlängerung über PayPal, jederzeit kündbar.',
    },
]

const PLANS = withPlanData('de', 'geo', [
    {
        id: 'einsteiger',
        name: 'Einsteiger',
        price: '4,99',
        period: 'pro Monat',
        desc: 'Für Einzelpersonen und erste Schritte',
        icon: Zap,
        features: [
            '1 Website tracken',
            '10 Keywords',
            'Claude + Gemini Tracking',
            'Wöchentlicher Auto-Check',
            '2 manuelle Checks pro Monat',
            'Mention-Verlauf',
        ],
        locked: [
            'ChatGPT Tracking (ab Pro)',
            'Perplexity Tracking (ab Pro)',
            'Google AI Overview Tracking (ab Pro)',
            '2 Prompt-Varianten pro Keyword (ab Pro)',
            'Themen-Sichtbarkeits-Analyse (ab Pro)',
        ],
        cta: 'Einsteiger starten',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_GEO_EINSTEIGER',
    },
    {
        id: 'pro',
        name: 'Pro',
        price: '74,99',
        period: 'pro Monat',
        desc: 'Für Freelancer und kleine Agenturen',
        icon: Star,
        badge: 'Beliebteste',
        highlight: true,
        features: [
            '3 Websites tracken',
            '20 Keywords',
            'Claude + ChatGPT + Gemini + Perplexity + Google AI Overview Tracking',
            '2 Prompt-Varianten pro Keyword (Empfehlung + Vergleich)',
            'Wöchentlicher Auto-Check',
            '2 manuelle Checks pro Monat',
            'Themen-Sichtbarkeits-Analyse (Top 20 Domains)',
            'Mention-Verlauf',
        ],
        locked: [
            'Historien-Trends pro Keyword (Google AI Overview, ab Expert)',
        ],
        cta: 'Pro starten',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_GEO_PRO',
    },
    {
        id: 'expert',
        name: 'Expert',
        price: '199,99',
        period: 'pro Monat',
        desc: 'Für Agenturen mit vielen Kunden',
        icon: Building2,
        features: [
            '10 Websites tracken',
            '60 Keywords',
            'Claude + ChatGPT + Gemini + Perplexity + Google AI Overview Tracking',
            '2 Prompt-Varianten pro Keyword (Empfehlung + Vergleich)',
            'Wöchentlicher Auto-Check',
            '3 manuelle Checks pro Monat',
            'Themen-Sichtbarkeits-Analyse (Top 20 Domains)',
            'Historien-Trends pro Keyword (Google AI Overview)',
            'Mention-Verlauf',
            'Priorisierter Support',
        ],
        cta: 'Expert starten',
        planEnvKey: 'NEXT_PUBLIC_PAYPAL_PLAN_ID_GEO_EXPERT',
    },
])

const PLAN_IDS = {
    einsteiger: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_GEO_EINSTEIGER,
    pro:        process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_GEO_PRO,
    expert:     process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_GEO_EXPERT,
}

function PlanCard({ plan, user, currentPlan, loading, onSuccess }) {
    const router = useRouter()

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: PLANS.indexOf(plan) * 0.1 }}
            className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-300 ${
                plan.highlight
                    ? 'shadow-card bg-(--card) border-(--accent) '
                    : 'bg-(--card) border-(--line)'
            }`}
        >
            {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-(--accent) rounded-full text-xs font-semibold text-(--on-accent) whitespace-nowrap">
                    {plan.badge}
                </div>
            )}

            {currentPlan === plan.id && (
                <div className="absolute -top-3 right-6 px-3 py-1 bg-(--accent-soft-strong) border border-(--accent-border) rounded-full text-xs font-semibold text-(--accent-ink)">
                    Aktuell
                </div>
            )}

            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${plan.highlight ? 'bg-(--accent-soft-strong)' : 'bg-(--surface-08)'}`}>
                        <plan.icon className={`w-4 h-4 ${plan.highlight ? 'text-(--accent-ink)' : 'text-(--text-muted)'}`} strokeWidth={1.8} />
                    </div>
                    <span className="text-sm font-semibold text-(--text-muted) ">{plan.name}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-5xl font-bold text-(--text-white)">{plan.price}</span>
                    <span className="text-(--text-muted) text-lg">€</span>
                </div>
                <div className="text-sm text-(--text-faint) mb-3">{plan.period}</div>
                <p className="text-sm text-(--text-muted)">{plan.desc}</p>
            </div>

            <div className="space-y-3 mb-8 flex-1">
                {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-(--accent-soft-strong)' : 'bg-(--surface-08)'}`}>
                            <Check className={`w-2.5 h-2.5 ${plan.highlight ? 'text-(--accent-ink)' : 'text-(--text-muted)'}`} strokeWidth={3} />
                        </div>
                        <span className="text-(--text-body)">{f}</span>
                    </div>
                ))}
                {plan.locked?.map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm opacity-40">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-(--surface-08)">
                            <Lock className="w-2.5 h-2.5 text-(--text-faint)" strokeWidth={3} />
                        </div>
                        <span className="text-(--text-faint) line-through">{f}</span>
                    </div>
                ))}
            </div>

            <div>
                {loading ? (
                    <div className="flex items-center justify-center w-full py-3 rounded-xl border border-(--border-subtle)">
                        <Loader2 className="w-4 h-4 text-(--text-faint) animate-spin" />
                    </div>
                ) : currentPlan === plan.id ? (
                    <div className="block w-full py-3 text-center text-sm font-semibold rounded-xl border border-(--accent-border) text-(--accent-ink) bg-(--accent-soft)">
                        Aktives Abo
                    </div>
                ) : !user ? (
                    <Link
                        href="/login?redirect=/geo/pricing"
                        className={`flex items-center justify-center gap-2 w-full py-3 text-center text-sm font-semibold rounded-xl transition-all duration-200 ${
                            plan.highlight
                                ? 'bg-(--accent) hover:bg-(--accent-hover) text-(--on-accent) active:scale-[0.97] active:duration-75 '
                                : 'border border-(--border-subtle) text-(--text-body) hover:text-(--text-white) hover:border-(--border-strong) hover:bg-(--surface-06)'
                        }`}
                    >
                        <LogIn className="w-4 h-4" /> Anmelden zum Abonnieren
                    </Link>
                ) : (
                    <div className="rounded-xl overflow-hidden">
                        <PayPalButtons
                            style={{
                                layout: 'vertical',
                                color: plan.highlight ? 'gold' : 'blue',
                                shape: 'rect',
                                label: 'subscribe',
                                height: 45,
                            }}
                            createSubscription={(data, actions) =>
                                actions.subscription.create({ plan_id: PLAN_IDS[plan.id] })
                            }
                            onApprove={(data) => onSuccess(data.subscriptionID, plan.id)}
                            onError={() => toast.error('PayPal Fehler. Bitte erneut versuchen.')}
                        />
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default function GeoPricingPage() {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [currentPlan, setCurrentPlan] = useState(null)
    const [loading, setLoading] = useState(true)
    const [geoCheckContext, setGeoCheckContext] = useState(null)

    useEffect(() => {
        const stored = localStorage.getItem('user')
        if (stored) {
            setUser(JSON.parse(stored))
            fetchStatus()
        } else {
            setLoading(false)
        }
        const pending = sessionStorage.getItem('pendingGeoCheck')
        if (pending) {
            try { setGeoCheckContext(JSON.parse(pending)) } catch {}
            sessionStorage.removeItem('pendingGeoCheck')
        }
    }, [])

    const fetchStatus = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/plan`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json()
            setCurrentPlan(data.plan || null)
        } catch {
        } finally {
            setLoading(false)
        }
    }

    const handleSuccess = async (subscriptionId, plan) => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geo/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ subscriptionId, plan }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            setCurrentPlan(plan)
            toast.success(`${plan.charAt(0).toUpperCase() + plan.slice(1)}-Plan aktiviert!`)
            const dashboardHref = geoCheckContext?.domain
                ? `/geo/dashboard?addSite=1&domain=${encodeURIComponent(geoCheckContext.domain)}&keyword=${encodeURIComponent(geoCheckContext.keyword || '')}&platform=${encodeURIComponent(geoCheckContext.platform || '')}`
                : '/geo/dashboard'
            setTimeout(() => router.push(dashboardHref), 1500)
        } catch (err) {
            toast.error(err.message || 'Fehler beim Aktivieren des Abos')
        }
    }

    const plansGrid = (
        <div className="grid md:grid-cols-3 gap-6 items-start">
            {PLANS.map(plan => (
                <PlanCard
                    key={plan.id}
                    plan={plan}
                    user={user}
                    currentPlan={currentPlan}
                    loading={loading}
                    onSuccess={handleSuccess}
                />
            ))}
        </div>
    )

    return (
        <>
            <div className="min-h-screen bg-(--bg-base)">
                <Navbar />

                <div className="relative pt-28 md:pt-34 pb-18 md:pb-28 px-4 sm:px-8">

                    <div className="relative max-w-300 mx-auto">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-14 max-w-190">
                            <p className="eyebrow mb-4">GEO Automatisierung</p>
                            <h1 className="text-[clamp(34px,4.4vw,54px)] leading-[1.05] tracking-[-0.038em] font-bold text-(--text-white) mb-5">
                                Wirst du von KI empfohlen?
                            </h1>
                            <p className="text-lg text-(--text-body) max-w-[62ch] mb-6">
                                Tracke ob Claude, ChatGPT, Gemini, Perplexity und Google AI Overview deine Domain erwähnen - wöchentlich automatisch.
                            </p>
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-(--accent-border) bg-(--accent-soft) text-sm">
                                <span className="text-(--accent-ink) font-semibold">14 Tage kostenlos testen</span>
                                <span className="text-(--text-faint)">·</span>
                                <span className="text-(--text-muted)">danach automatisch verlängerbar · jederzeit kündbar</span>
                            </div>

                            {geoCheckContext?.domain && (
                                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-(--card) border border-(--line) text-sm max-w-[62ch]">
                                    <span className="text-(--text-muted)">
                                        Dein Check: <b className="text-(--text-white)">{geoCheckContext.domain}</b> wird bei <b className="text-(--text-white)">{geoCheckContext.label}</b>{' '}
                                        {geoCheckContext.mentioned ? 'zitiert' : 'noch nicht zitiert'} - Pro trackt alle 5 Plattformen automatisch.
                                    </span>
                                </div>
                            )}
                        </motion.div>

                        <h2 className="text-xl sm:text-2xl font-bold text-(--text-white) text-center mb-8">
                            GEO Automatisierung Preise im Überblick
                        </h2>

                        {user ? (
                            <PayPalScriptProvider options={{
                                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test',
                                vault: true,
                                intent: 'subscription',
                                currency: 'EUR',
                            }}>
                                {plansGrid}
                            </PayPalScriptProvider>
                        ) : plansGrid}

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                            className="text-center text-sm text-(--text-faint) mt-10">
                            14 Tage kostenlos testen · nach dem Testzeitraum automatische Abbuchung · jederzeit kündbar · Bezahlung über PayPal
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="mt-20 max-w-2xl mx-auto">
                            <h2 className="text-xl sm:text-2xl font-bold text-(--text-white) text-center mb-8">
                                Häufige Fragen zu GEO Automatisierung Preisen
                            </h2>
                            <div className="space-y-4">
                                {FAQS.map((faq, i) => (
                                    <div key={i} className="bg-(--card) border border-(--line) rounded-2xl p-5">
                                        <h3 className="font-semibold text-(--text-white) mb-2 text-sm">{faq.q}</h3>
                                        <p className="text-sm text-(--text-muted) leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    )
}