import { Suspense } from 'react'
import NewsletterActionClient from '../../components/NewsletterActionClient'

export const metadata = {
    title: 'Unsubscribe',
    robots: { index: false },
}

export default function NewsletterUnsubscribePage() {
    return (
        <Suspense>
            <NewsletterActionClient locale="en" action="unsubscribe" />
        </Suspense>
    )
}
