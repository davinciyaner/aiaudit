import { Suspense } from 'react'
import NewsletterActionClient from '../../../components/NewsletterActionClient'

export const metadata = {
    title: 'Leave the waitlist',
    robots: { index: false },
}

export default function SeoAgentUnsubscribePageEn() {
    return (
        <Suspense>
            <NewsletterActionClient locale="en" action="unsubscribe" endpoint="waitlist" variant="waitlist" />
        </Suspense>
    )
}
