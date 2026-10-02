import { Suspense } from 'react'
import NewsletterActionClient from '../../../components/NewsletterActionClient'

export const metadata = {
    title: 'Confirm waitlist',
    robots: { index: false },
}

export default function SeoAgentConfirmPageEn() {
    return (
        <Suspense>
            <NewsletterActionClient locale="en" action="confirm" endpoint="waitlist" variant="waitlist" />
        </Suspense>
    )
}
