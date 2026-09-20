'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Navbar from './Navbar'
import Footer from './Footer'

const COPY = {
    de: {
        confirm: {
            loading: 'Bestätige deine E-Mail…',
            success: 'E-Mail bestätigt!',
            successDesc: 'Danke, du bekommst ab jetzt gelegentlich Tipps von uns.',
            error: 'Link ungültig oder abgelaufen',
            errorDesc: 'Dieser Bestätigungslink funktioniert nicht mehr. Du kannst den Beispiel-Report jederzeit erneut anfordern.',
        },
        unsubscribe: {
            loading: 'Wird abgemeldet…',
            success: 'Abgemeldet',
            successDesc: 'Schade das du dich abmeldest. Du bekommst keine weiteren E-Mails von uns mehr.',
            error: 'Link ungültig oder abgelaufen',
            errorDesc: 'Dieser Abmeldelink funktioniert nicht mehr. Melde dich gern per Support, falls du weiterhin E-Mails bekommst.',
        },
        backHome: 'Zurück zur Startseite',
    },
    en: {
        confirm: {
            loading: 'Confirming your email…',
            success: 'Email confirmed!',
            successDesc: "Thanks — you'll now get occasional tips from us.",
            error: 'Link invalid or expired',
            errorDesc: "This confirmation link no longer works. You can request the example report again at any time.",
        },
        unsubscribe: {
            loading: 'Unsubscribing…',
            success: 'Unsubscribed',
            successDesc: "You won't receive any further emails from us.",
            error: 'Link invalid or expired',
            errorDesc: 'This unsubscribe link no longer works. Feel free to contact support if you keep receiving emails.',
        },
        backHome: 'Back to homepage',
    },
}

// endpoint erlaubt anderen Flows (z.B. Marketing-Consent fuer registrierte Nutzer statt
// Sample-Report-Leads) denselben Confirm/Unsubscribe-Bildschirm mit eigenem Backend-Endpoint zu
// nutzen, ohne diese Komponente zu duplizieren. Nur ein String (keine Funktion) als Prop, weil
// page.js als Server Component keine Funktionen an diese Client Component durchreichen kann.
// 'path'  → /<endpoint>/<action>/<token>   (bestehendes Sample-Report-Verhalten)
// 'query' → /<endpoint>/<action>?token=<token>  (Marketing-Consent-Endpoints)
export default function NewsletterActionClient({ locale = 'de', action = 'confirm', endpoint = 'sample-report', tokenStyle = 'path' }) {
    const localeCopy = COPY[locale] || COPY.de
    const t = localeCopy[action] || localeCopy.confirm
    const homeHref = locale === 'en' ? '/en' : '/'
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [status, setStatus] = useState('loading') // loading | success | error

    useEffect(() => {
        if (!token) { setStatus('error'); return }
        const apiUrl = tokenStyle === 'query'
            ? `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${action}?token=${token}`
            : `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${action}/${token}`
        fetch(apiUrl)
            .then(res => { if (!res.ok) throw new Error('invalid'); return res.json() })
            .then(() => setStatus('success'))
            .catch(() => setStatus('error'))
    }, [token, action, endpoint, tokenStyle])

    return (
        <div className="min-h-screen bg-[var(--bg-base)]">
            <Navbar />
            <div className="max-w-md mx-auto px-5 pt-32 pb-24 text-center">
                {status === 'loading' && (
                    <>
                        <Loader2 className="w-10 h-10 text-[var(--accent)] animate-spin mx-auto mb-6" />
                        <p className="text-[var(--text-muted)]">{t.loading}</p>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <div className="w-16 h-16 rounded-2xl bg-[var(--success-soft)] border border-[var(--success-border)] flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-7 h-7 text-[var(--success)]" />
                        </div>
                        <h1 className="text-2xl font-bold text-[var(--text-white)] mb-2">{t.success}</h1>
                        <p className="text-[var(--text-muted)] mb-8">{t.successDesc}</p>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <div className="w-16 h-16 rounded-2xl bg-[var(--danger-soft)] border border-[var(--danger-border)] flex items-center justify-center mx-auto mb-6">
                            <XCircle className="w-7 h-7 text-[var(--danger)]" />
                        </div>
                        <h1 className="text-2xl font-bold text-[var(--text-white)] mb-2">{t.error}</h1>
                        <p className="text-[var(--text-muted)] mb-8">{t.errorDesc}</p>
                    </>
                )}
                {status !== 'loading' && (
                    <Link href={homeHref}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--accent)] hover:opacity-90 text-[var(--bg-base)] text-sm font-semibold rounded-xl transition-all">
                        {localeCopy.backHome}<ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                )}
            </div>
            <Footer />
        </div>
    )
}
