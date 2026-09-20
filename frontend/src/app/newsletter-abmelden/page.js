import { Suspense } from 'react'
import NewsletterActionClient from '../components/NewsletterActionClient'

export const metadata = {
    title: 'Abmelden',
    robots: { index: false },
}

export default function NewsletterAbmeldenPage() {
    return (
        <Suspense>
            <NewsletterActionClient locale="de" action="unsubscribe" />
        </Suspense>
    )
}
