import { Suspense } from 'react'
import NewsletterActionClient from '../components/NewsletterActionClient'

export const metadata = {
    title: 'Bestätigen',
    robots: { index: false },
}

export default function MarketingBestaetigenPage() {
    return (
        <Suspense>
            <NewsletterActionClient locale="de" action="confirm" endpoint="marketing" tokenStyle="query" />
        </Suspense>
    )
}
