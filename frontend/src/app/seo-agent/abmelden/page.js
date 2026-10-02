import { Suspense } from 'react'
import NewsletterActionClient from '../../components/NewsletterActionClient'

export const metadata = {
    title: 'Von der Warteliste abmelden',
    robots: { index: false },
}

export default function SeoAgentUnsubscribePage() {
    return (
        <Suspense>
            <NewsletterActionClient locale="de" action="unsubscribe" endpoint="waitlist" variant="waitlist" />
        </Suspense>
    )
}
