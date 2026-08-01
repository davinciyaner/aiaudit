import Link from 'next/link'
import { GraduationCap, Code2, Zap, Mail } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
    title: { absolute: 'About – Finn Paustian | AuditAI' },
    description: 'Finn Paustian built AuditAI to automate SEO and GEO analysis. Trained software developer, dozens of fullstack projects, a one-person product.',
    alternates: {
        canonical: 'https://www.sitecheckai.dev/en/about',
        languages: {
            'de-DE': 'https://www.sitecheckai.dev/about',
            'en-US': 'https://www.sitecheckai.dev/en/about',
        },
    },
    openGraph: {
        title: 'About – Finn Paustian | AuditAI',
        description: 'Why I built AuditAI and who\'s behind it.',
        url: 'https://www.sitecheckai.dev/en/about',
        type: 'profile',
        locale: 'en_US',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: 'https://www.sitecheckai.dev/en/about',
    name: 'About – Finn Paustian',
    mainEntity: {
        '@type': 'Person',
        name: 'Finn Paustian',
        jobTitle: 'Founder & Developer',
        description: 'Software developer apprentice and fullstack engineer. Built AuditAI to automate time-consuming manual SEO and GEO analysis.',
        email: 'mailto:sitecheckai@gmail.com',
        url: 'https://www.sitecheckai.dev/en/about',
        worksFor: {
            '@type': 'Organization',
            name: 'AuditAI',
            url: 'https://www.sitecheckai.dev',
        },
    },
}

const FACTS = [
    { icon: GraduationCap, label: 'Trained software developer (application development)', color: '#7c3aed' },
    { icon: Code2, label: 'Built dozens of fullstack websites', color: '#06b6d4' },
    { icon: Zap, label: 'AuditAI: a one-person product', color: '#10b981' },
]

export default function AboutPageEn() {
    return (
        <main className="bg-[#05080f] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar locale="en" />

            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
                    <Link href="/en" className="hover:text-slate-400 transition-colors">AuditAI</Link>
                    <span>/</span>
                    <span className="text-slate-500">About</span>
                </div>

                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                        F
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Finn Paustian</h1>
                        <p className="text-slate-400 text-sm mt-1">Founder & Developer, AuditAI · Lübeck, Germany</p>
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
                    <h2 className="text-xl font-bold text-white mb-3">Why AuditAI?</h2>
                    <p>
                        I built AuditAI because SEO and GEO are time-consuming. Constantly manually checking
                        rankings, meta data, Core Web Vitals, and AI visibility eats time that should really go into
                        product and content. To focus on what matters, I automated exactly that.
                    </p>
                    <p>
                        I'm training as a software developer specializing in application development and have built
                        dozens of fullstack websites over the past few years. AuditAI is a side project of mine - I build,
                        run, and maintain it myself.
                    </p>

                    <h2 className="text-xl font-bold text-white mb-3 mt-10">Contact</h2>
                    <p>
                        Questions, feedback, or just want to say hi:{' '}
                        <a href="mailto:sitecheckai@gmail.com" className="text-violet-400 hover:text-violet-300 inline-flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" />
                            sitecheckai@gmail.com
                        </a>
                    </p>
                </div>

                <div className="mt-14 pt-8 border-t border-white/5">
                    <Link
                        href="/en/blog"
                        className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium"
                    >
                        Read all blog articles →
                    </Link>
                </div>
            </article>

            <Footer locale="en" />
        </main>
    )
}
