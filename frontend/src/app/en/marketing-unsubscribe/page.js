import { Suspense } from 'react'
import NewsletterActionClient from '../../components/NewsletterActionClient'

export const metadata = {
    title: 'Unsubscribe',
    robots: { index: false },
}

export default function MarketingUnsubscribePage() {
    return (
        <Suspense>
            <NewsletterActionClient locale="en" action="unsubscribe" endpoint="marketing" tokenStyle="query" />
        </Suspense>
    )
}
