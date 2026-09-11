import { getRootJsonLd } from '../../lib/i18n/rootJsonLd'
import SetHtmlLang from './SetHtmlLang'

const jsonLd = getRootJsonLd('en')

export default function EnLayout({ children }) {
    return (
        <>
            <SetHtmlLang />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {children}
        </>
    )
}
