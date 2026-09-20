import { Suspense } from 'react'
import NewsletterActionClient from '../components/NewsletterActionClient'

export const metadata = {
    title: 'E-Mail bestätigen',
    robots: { index: false },
}

export default function NewsletterBestaetigenPage() {
    return (
        <Suspense>
            <NewsletterActionClient locale="de" action="confirm" />
        </Suspense>
    )
}
