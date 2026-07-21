import Link from 'next/link'
import { GraduationCap, Code2, Zap, Mail } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
    title: 'Über mich – Finn Paustian, Gründer von AuditAI',
    description: 'Finn Paustian hat AuditAI gebaut, um SEO- und GEO-Analyse zu automatisieren. Informatik-Studium, dutzende Fullstack-Projekte, ein Ein-Personen-Produkt.',
    alternates: { canonical: 'https://www.sitecheckai.dev/about' },
    openGraph: {
        title: 'Über mich – Finn Paustian, Gründer von AuditAI',
        description: 'Warum ich AuditAI gebaut habe und wer dahintersteht.',
        url: 'https://www.sitecheckai.dev/about',
        type: 'profile',
        locale: 'de_DE',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: 'https://www.sitecheckai.dev/about',
    name: 'Über mich – Finn Paustian, Gründer von AuditAI',
    mainEntity: {
        '@type': 'Person',
        name: 'Finn Paustian',
        jobTitle: 'Gründer & Entwickler',
        description: 'Informatik-Absolvent und Fullstack-Entwickler. Hat AuditAI gebaut, um die zeitaufwändige manuelle SEO- und GEO-Analyse zu automatisieren.',
        email: 'mailto:finnpaustian94@gmail.com',
        url: 'https://www.sitecheckai.dev/about',
        worksFor: {
            '@type': 'Organization',
            name: 'AuditAI',
            url: 'https://www.sitecheckai.dev',
        },
    },
}

const FACTS = [
    { icon: GraduationCap, label: 'Informatik studiert', color: '#7c3aed' },
    { icon: Code2, label: 'Dutzende Fullstack-Websites gebaut', color: '#06b6d4' },
    { icon: Zap, label: 'AuditAI: Ein-Personen-Produkt', color: '#10b981' },
]

export default function AboutPage() {
    return (
        <main className="bg-[#05080f] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
                    <Link href="/" className="hover:text-slate-400 transition-colors">AuditAI</Link>
                    <span>/</span>
                    <span className="text-slate-500">Über mich</span>
                </div>

                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                        F
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Finn Paustian</h1>
                        <p className="text-slate-400 text-sm mt-1">Gründer & Entwickler, AuditAI · Lübeck, Deutschland</p>
                    </div>
                </div>

                {/* Facts row */}
                <div className="grid sm:grid-cols-3 gap-3 mb-12">
                    {FACTS.map(({ icon: Icon, label, color }) => (
                        <div key={label} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}1a` }}>
                                <Icon className="w-4 h-4" style={{ color }} />
                            </div>
                            <span className="text-sm text-slate-300">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Bio */}
                <div className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed space-y-5">
                    <h2 className="text-xl font-bold text-white mb-3">Warum AuditAI?</h2>
                    <p>
                        Ich habe AuditAI gebaut, weil SEO und GEO ein zeitaufwändiges Thema sind. Ständiges manuelles Prüfen
                        von Rankings, Meta-Daten, Core Web Vitals und KI-Sichtbarkeit kostet Zeit, die eigentlich in Produkt
                        und Content fließen sollte. Um mich auf die wichtigen Dinge konzentrieren zu können, habe ich genau
                        das automatisiert.
                    </p>
                    <p>
                        Ich habe Informatik studiert und in den letzten Jahren dutzende Fullstack-Websites programmiert.
                        AuditAI ist dabei kein Studienprojekt, sondern ein laufendes Ein-Personen-Produkt - ich baue,
                        betreibe und warte es selbst.
                    </p>

                    <h2 className="text-xl font-bold text-white mb-3 mt-10">Kontakt</h2>
                    <p>
                        Fragen, Feedback oder einfach nur Hallo sagen:{' '}
                        <a href="mailto:finnpaustian94@gmail.com" className="text-violet-400 hover:text-violet-300 inline-flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" />
                            sitecheckai@gmail.com
                        </a>
                    </p>
                </div>

                <div className="mt-14 pt-8 border-t border-white/5">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium"
                    >
                        Alle Artikel im Blog lesen →
                    </Link>
                </div>
            </article>

            <Footer />
        </main>
    )
}