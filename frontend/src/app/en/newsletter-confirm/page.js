import { Suspense } from 'react'
import NewsletterActionClient from '../../components/NewsletterActionClient'

export const metadata = {
    title: 'Confirm your email',
    robots: { index: false },
}

export default function NewsletterConfirmPage() {
    return (
        <Suspense>
            <NewsletterActionClient locale="en" action="confirm" />
        </Suspense>
    )
}
