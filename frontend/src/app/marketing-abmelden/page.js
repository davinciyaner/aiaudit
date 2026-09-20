import { Suspense } from 'react'
import NewsletterActionClient from '../components/NewsletterActionClient'

export const metadata = {
    title: 'Abmelden',
    robots: { index: false },
}

export default function MarketingAbmeldenPage() {
    return (
        <Suspense>
            <NewsletterActionClient locale="de" action="unsubscribe" endpoint="marketing" tokenStyle="query" />
        </Suspense>
    )
}
