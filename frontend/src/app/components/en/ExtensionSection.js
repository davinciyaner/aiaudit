'use client'
import {motion} from 'framer-motion'
import {
    Puzzle,
    Play,
    CheckCircle,
    Zap,
    RefreshCw,
    ShieldCheck,
    Download,
    FileText,
    Eye,
    AlertTriangle,
    Mail
} from 'lucide-react'
import {useState, useEffect, useRef} from 'react'

const STEPS = [
    {
        num: '01',
        icon: Puzzle,
        title: 'Install the extension',
        desc: 'Add it once from the Chrome Web Store - free, no setup. Works on any website.',
        color: '#6366f1',
    },
    {
        num: '02',
        icon: Play,
        title: 'Start recording & click through',
        desc: 'Hit "Start recording" and click through your user flow as usual: login, search, set filters, fill out a form - everything gets recorded.',
        color: '#06b6d4',
    },
    {
        num: '03',
        icon: Download,
        title: 'Download CSV or start a test',
        desc: 'After recording: export a CSV to review the steps manually, or hit "Start test" directly — Playwright replays everything automatically.',
        color: '#a78bfa',
    },
    {
        num: '04',
        icon: RefreshCw,
        title: 'Review the results',
        desc: 'Every step is marked as passed, warning, or failed. On failure you see a screenshot of the exact moment it broke.',
        color: '#10b981',
    },
]

const BENEFITS = [
    {
        icon: ShieldCheck,
        title: 'Regression protection after every deploy',
        desc: 'You deploy - the test runs. Checkout flow, login, search, filters: everything is automatically checked after every change. No more manual click-throughs.',
        color: '#ef4444',
    },
    {
        icon: Zap,
        title: 'No Playwright knowledge needed',
        desc: 'Playwright is powerful but complex. With the extension you don\'t write a single line of code. You click - we generate the test.',
        color: '#f59e0b',
    },
    {
        icon: Eye,
        title: 'Full transparency via CSV',
        desc: 'The exported CSV shows you every recorded step: action, selector, value, URL, timestamp. You see exactly what\'s being tested - and can adjust it.',
        color: '#06b6d4',
    },
    {
        icon: FileText,
        title: 'Editable & reusable',
        desc: 'The CSV is plain text. You can add steps, remove them, mark steps as optional, or adapt the same test for different environments.',
        color: '#a78bfa',
    },
    {
        icon: AlertTriangle,
        title: 'Warnings instead of hard failures',
        desc: 'Optional steps that fail are marked as a warning - the test keeps running. No hard stop on unimportant UI elements.',
        color: '#f59e0b',
    },
    {
        icon: CheckCircle,
        title: 'Screenshot on every failure',
        desc: 'If a step fails, Playwright automatically takes a screenshot. You see the exact state of the page at that moment — no more guessing.',
        color: '#10b981',
    },
]

const CSV_ROWS = [
    {step: 1, action: 'navigate', selector: '', value: 'https://your-website.com/login', optional: 'false'},
    {step: 2, action: 'input', selector: 'input[name="email"]', value: 'test@example.com', optional: 'false'},
    {step: 3, action: 'input', selector: 'input[name="password"]', value: '••••••••', optional: 'false'},
    {step: 4, action: 'click', selector: 'button[type="submit"]', value: '', optional: 'false'},
    {step: 5, action: 'click', selector: '[aria-label="Open filters"]', value: '', optional: 'true'},
    {step: 6, action: 'navigate', selector: '', value: 'https://your-website.com/dashboard', optional: 'false'},
]

function MockExtension({active}) {
    const steps = ['navigate', 'click', 'input', 'click', 'click']
    const [visibleSteps, setVisibleSteps] = useState(0)

    useEffect(() => {
        if (!active) {
            setVisibleSteps(0);
            return
        }
        let i = 0
        const interval = setInterval(() => {
            i++
            setVisibleSteps(i)
            if (i >= steps.length) clearInterval(interval)
        }, 600)
        return () => clearInterval(interval)
    }, [active])

    return (
        <div className="w-64 bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div
                        className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                        <Zap className="w-3 h-3 text-white"/>
                    </div>
                    <span className="text-xs font-bold text-white">SiteCheckAI</span>
                </div>
                <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${active ? 'bg-red-500/15 text-red-400' : 'bg-emerald-500/15 text-emerald-400'}`}>
                    {active ? '● Recording' : '● Ready'}
                </span>
            </div>
            <div className="p-3 space-y-1.5 min-h-[140px]">
                {steps.slice(0, visibleSteps).map((action, i) => (
                    <motion.div key={i} initial={{opacity: 0, x: -8}} animate={{opacity: 1, x: 0}}
                                className="flex items-center gap-2 px-2.5 py-1.5 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                        <span className="text-slate-600 text-[10px] w-3">{i + 1}</span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                            action === 'navigate' ? 'bg-violet-500/15 text-violet-400' :
                                action === 'click' ? 'bg-cyan-500/15 text-cyan-400' :
                                    'bg-blue-500/15 text-blue-400'
                        }`}>{action}</span>
                    </motion.div>
                ))}
                {visibleSteps === 0 && (
                    <div className="flex items-center justify-center h-full py-8">
                        <p className="text-slate-600 text-xs">No steps yet</p>
                    </div>
                )}
            </div>
            <div className="px-3 pb-3 flex gap-2">
                <div
                    className={`flex-1 py-2 rounded-xl text-[10px] font-semibold text-center ${active ? 'bg-red-500/15 text-red-400 border border-red-500/20' : 'bg-violet-500/15 text-violet-400 border border-violet-500/20'}`}>
                    {active ? '⏹ Stop' : '⏺ Start recording'}
                </div>
                {!active && visibleSteps > 0 && (
                    <div
                        className="py-2 px-2.5 rounded-xl text-[10px] font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                        ↓ CSV
                    </div>
                )}
            </div>
        </div>
    )
}

function MockResult() {
    const items = [
        {action: 'navigate', result: 'pass', label: 'your-website.com/login'},
        {action: 'input', result: 'pass', label: 'input[name="email"]'},
        {action: 'click', result: 'pass', label: 'button[type="submit"]'},
        {action: 'click', result: 'warn', label: '[aria-label="Filter"]'},
        {action: 'navigate', result: 'pass', label: 'your-website.com/dashboard'},
    ]

    return (
        <div className="w-64 bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                <span className="text-xs font-bold text-white">Test result</span>
                <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">Done</span>
            </div>
            <div className="px-3 py-2 grid grid-cols-3 gap-2">
                {[['4', 'Passed', 'text-emerald-400'], ['1', 'Warning', 'text-amber-400'], ['0', 'Failed', 'text-red-400']].map(([v, l, c]) => (
                    <div key={l} className="bg-white/[0.03] rounded-xl p-2 text-center border border-white/[0.05]">
                        <div className={`text-lg font-bold ${c}`}>{v}</div>
                        <div className="text-[9px] text-slate-600">{l}</div>
                    </div>
                ))}
            </div>
            <div className="px-3 pb-3 space-y-1">
                {items.map((item, i) => (
                    <div key={i} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border ${
                        item.result === 'pass' ? 'border-white/[0.05] bg-white/[0.02]' :
                            item.result === 'warn' ? 'border-amber-500/20 bg-amber-500/5' :
                                'border-red-500/20 bg-red-500/5'
                    }`}>
                        <span
                            className={`text-[10px] ${item.result === 'pass' ? 'text-emerald-400' : item.result === 'warn' ? 'text-amber-400' : 'text-red-400'}`}>
                            {item.result === 'pass' ? '✓' : item.result === 'warn' ? '⚠' : '✗'}
                        </span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                            item.action === 'navigate' ? 'bg-violet-500/15 text-violet-400' :
                                item.action === 'click' ? 'bg-cyan-500/15 text-cyan-400' :
                                    'bg-blue-500/15 text-blue-400'
                        }`}>{item.action}</span>
                        <span className="text-slate-500 text-[10px] truncate">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function WaitlistForm() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('idle') // idle | loading | success | error
    const [msg, setMsg] = useState('')

    const submit = async (e) => {
        e.preventDefault()
        if (!email) return
        setStatus('loading')
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waitlist`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, source: 'extension'}),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Error')
            setStatus('success')
            setMsg('You\'re on the list! We\'ll let you know as soon as the extension is live.')
        } catch (err) {
            setStatus('error')
            setMsg(err.message)
        }
    }

    return (
        <div className="max-w-lg mx-auto text-center">
            <h3 className="text-xl font-bold text-white mb-2">Get early access</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                The extension isn't publicly available yet. Enter your email - we'll notify you
                as soon as it goes live.
            </p>

            {status === 'success' ? (
                <motion.div initial={{opacity: 0, scale: 0.95}} animate={{opacity: 1, scale: 1}}
                            className="bg-emerald-500/8 border border-emerald-500/20 rounded-2xl px-6 py-5">
                    <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" strokeWidth={1.5}/>
                    <p className="text-emerald-400 text-sm font-medium">{msg}</p>
                </motion.div>
            ) : (
                <form onSubmit={submit} className="flex gap-2">
                    <div className="relative flex-1">
                        <Mail
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"/>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@email.com"
                            required
                            className="w-full pl-10 pr-4 py-3 bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/50 focus:outline-none rounded-xl text-sm text-white placeholder-slate-600 transition-colors"
                        />
                    </div>
                    <button type="submit" disabled={status === 'loading'}
                            className="px-5 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-all shrink-0 shadow-lg shadow-violet-500/20">
                        {status === 'loading' ? '…' : 'Sign up'}
                    </button>
                </form>
            )}

            {status === 'error' && (
                <p className="text-red-400 text-xs mt-2">{msg}</p>
            )}
            <p className="text-slate-700 text-xs mt-3">Free · No spam · Unsubscribe anytime</p>
        </div>
    )
}

export default function ExtensionSection() {
    const [recording, setRecording] = useState(false)
    const [showResult, setShowResult] = useState(false)

    useEffect(() => {
        const cycle = () => {
            setRecording(false)
            setShowResult(false)
            setTimeout(() => setRecording(true), 1000)
            setTimeout(() => {
                setRecording(false);
                setShowResult(true)
            }, 5000)
            setTimeout(cycle, 9000)
        }
        const t = setTimeout(cycle, 500)
        return () => clearTimeout(t)
    }, [])

    return (
        <section id="testautomation" className="relative py-16 sm:py-32 bg-[#05080f] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-600/5 rounded-full blur-3xl"/>
            </div>

            <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">

                {/* Header */}
                <motion.div initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                            className="text-center mb-10 sm:mb-20">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-5 tracking-tight">
                        No code.<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                            Automated tests anyway.
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Click through your user flow once - the extension records every step,
                        exports a readable CSV file, and automatically starts a Playwright test.
                        You instantly see what breaks - without a single line of code.
                    </p>
                </motion.div>

                {/* Animated Demo */}
                <motion.div initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 sm:mb-24">
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Recording</p>
                        <MockExtension active={recording}/>
                    </div>
                    <motion.div animate={{opacity: showResult ? 1 : 0.2, x: showResult ? 0 : -6}}
                                transition={{duration: 0.4}} className="text-slate-600 text-2xl hidden sm:block">→
                    </motion.div>
                    <motion.div animate={{opacity: showResult ? 1 : 0.2, scale: showResult ? 1 : 0.97}}
                                transition={{duration: 0.4}} className="flex flex-col items-center gap-3">
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Result</p>
                        <MockResult/>
                    </motion.div>
                </motion.div>

                {/* Steps */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12 sm:mb-24">
                    {STEPS.map((step, i) => (
                        <motion.div key={step.num}
                                    initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: true}} transition={{delay: i * 0.08}}
                                    className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                            <span
                                className="absolute top-4 right-5 text-4xl font-black text-white/[0.04] select-none">{step.num}</span>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                                 style={{background: step.color + '18', border: `1px solid ${step.color}30`}}>
                                <step.icon className="w-5 h-5" style={{color: step.color}} strokeWidth={1.8}/>
                            </div>
                            <h3 className="font-bold text-white text-sm mb-2 leading-tight">{step.title}</h3>
                            <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CSV Section */}
                <motion.div initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                            className="mb-12 sm:mb-24">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                                Every step as a<br/>
                                <span
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">readable CSV file</span>
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                After recording, a structured CSV file is generated automatically.
                                You see every single step: which action, on which element,
                                with which value, on which URL - and at what time.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    ['action', 'navigate, click, input, or select'],
                                    ['selector', 'CSS selector of the element (determined automatically)'],
                                    ['value', 'Entered text or navigated URL'],
                                    ['url', 'Page the action took place on'],
                                    ['optional', 'true = failure is treated as a warning, test keeps running'],
                                ].map(([col, desc]) => (
                                    <li key={col} className="flex items-start gap-3">
                                        <code
                                            className="text-[10px] font-mono bg-white/[0.06] border border-white/10 text-violet-300 px-2 py-1 rounded shrink-0 mt-0.5">{col}</code>
                                        <span className="text-slate-500 text-xs leading-relaxed">{desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CSV Mockup */}
                        <div className="bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-3.5 h-3.5 text-slate-500"/>
                                    <span className="text-xs text-slate-400 font-mono">sitecheck-1748088263.csv</span>
                                </div>
                                <div
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                                    <Download className="w-3 h-3 text-cyan-400"/>
                                    <span className="text-[10px] text-cyan-400 font-semibold">Download</span>
                                </div>
                            </div>
                            {/* Header row */}
                            <div className="px-4 py-2 border-b border-white/[0.04] grid grid-cols-4 gap-2">
                                {['step', 'action', 'selector', 'optional'].map(h => (
                                    <span key={h}
                                          className="text-[9px] font-semibold text-slate-600 uppercase tracking-wider font-mono">{h}</span>
                                ))}
                            </div>
                            {/* Data rows */}
                            <div className="divide-y divide-white/[0.03]">
                                {CSV_ROWS.map((row) => (
                                    <div key={row.step}
                                         className={`px-4 py-2 grid grid-cols-4 gap-2 items-center ${row.optional === 'true' ? 'bg-amber-500/[0.03]' : ''}`}>
                                        <span className="text-[10px] text-slate-600 font-mono">{row.step}</span>
                                        <span className={`text-[10px] font-semibold font-mono ${
                                            row.action === 'navigate' ? 'text-violet-400' :
                                                row.action === 'input' ? 'text-blue-400' :
                                                    'text-cyan-400'
                                        }`}>{row.action}</span>
                                        <span className="text-[9px] text-slate-500 font-mono truncate col-span-1">
                                            {row.action === 'navigate' ? row.value.replace('https://', '') : row.selector}
                                        </span>
                                        <span
                                            className={`text-[10px] font-mono ${row.optional === 'true' ? 'text-amber-400' : 'text-slate-700'}`}>
                                            {row.optional}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 py-3 border-t border-white/[0.04]">
                                <p className="text-[10px] text-slate-600">6 steps recorded · editable in
                                    Excel, VS Code, or right here</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Benefits */}
                <motion.div initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                            className="mb-10 sm:mb-20">
                    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-3">
                        Why this <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">matters so much</span>
                    </h3>
                    <p className="text-slate-500 text-center text-sm mb-10 max-w-xl mx-auto">
                        Manual tests are expensive, forgotten, and don't scale. Automated tests without code
                        used to be developer-only.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {BENEFITS.map((b, i) => (
                            <motion.div key={b.title}
                                        initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}}
                                        viewport={{once: true}} transition={{delay: i * 0.07}}
                                        className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                                     style={{background: b.color + '18', border: `1px solid ${b.color}30`}}>
                                    <b.icon className="w-5 h-5" style={{color: b.color}} strokeWidth={1.8}/>
                                </div>
                                <h4 className="font-semibold text-white text-sm mb-2 leading-tight">{b.title}</h4>
                                <p className="text-slate-500 text-xs leading-relaxed">{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA — Waitlist */}
                <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}>
                    <WaitlistForm/>
                </motion.div>
            </div>
        </section>
    )
}
