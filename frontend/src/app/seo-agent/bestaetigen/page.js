import { Suspense } from 'react'
import NewsletterActionClient from '../../components/NewsletterActionClient'

export const metadata = {
    title: 'Warteliste bestätigen',
    robots: { index: false },
}

export default function SeoAgentConfirmPage() {
    return (
        <Suspense>
            <NewsletterActionClient locale="de" action="confirm" endpoint="waitlist" variant="waitlist" />
        </Suspense>
    )
}
