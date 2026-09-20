import { Suspense } from 'react'
import NewsletterActionClient from '../../components/NewsletterActionClient'

export const metadata = {
    title: 'Confirm',
    robots: { index: false },
}

export default function MarketingConfirmPage() {
    return (
        <Suspense>
            <NewsletterActionClient locale="en" action="confirm" endpoint="marketing" tokenStyle="query" />
        </Suspense>
    )
}
