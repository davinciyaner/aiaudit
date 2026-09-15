const TRACK_API = `${process.env.NEXT_PUBLIC_API_URL}/leads/track`
const VERIFY_API = `${process.env.NEXT_PUBLIC_API_URL}/leads/verify`
const SITE_KEY = 'e51b9e0f211b843010bc945f490f00ef'
const REF_KEY = 'scanora_lead_ref'
const VERIFY_THROTTLE_KEY = 'scanora_lead_verify_at'
const VERIFY_THROTTLE_MS = 6 * 60 * 60 * 1000
const AI_REFERRER_HOSTS = {
    'chatgpt.com': 'chatgpt',
    'chat.openai.com': 'chatgpt',
    'perplexity.ai': 'perplexity',
    'claude.ai': 'claude',
    'gemini.google.com': 'gemini',
}

function hasConsent() {
    try {
        return localStorage.getItem('cookie_consent') === 'granted'
    } catch {
        return false
    }
}

export function initScanoraLeads() {
    if (typeof window === 'undefined' || !hasConsent()) return

    try {
        if (!localStorage.getItem(REF_KEY) && document.referrer) {
            const host = new URL(document.referrer).hostname.replace(/^www\./, '')
            const source = AI_REFERRER_HOSTS[host]
            if (source) {
                localStorage.setItem(REF_KEY, JSON.stringify({
                    source, referrerRaw: document.referrer, landingPage: location.pathname,
                }))
            }
        }
    } catch {}

    try {
        const lastVerify = Number(localStorage.getItem(VERIFY_THROTTLE_KEY) || 0)
        if (Date.now() - lastVerify > VERIFY_THROTTLE_MS) {
            fetch(VERIFY_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                keepalive: true,
                body: JSON.stringify({ siteKey: SITE_KEY }),
            }).catch(() => {})
            localStorage.setItem(VERIFY_THROTTLE_KEY, String(Date.now()))
        }
    } catch {}
}

export function trackScanoraLead(email) {
    if (typeof window === 'undefined' || !hasConsent() || !email) return

    let ref = null
    try { ref = JSON.parse(localStorage.getItem(REF_KEY)) } catch {}

    fetch(TRACK_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
            siteKey: SITE_KEY,
            email,
            aiSource: ref ? ref.source : null,
            referrerRaw: ref ? ref.referrerRaw : null,
            landingPage: ref ? ref.landingPage : location.pathname,
        }),
    }).catch(() => {})

    try { localStorage.removeItem(REF_KEY) } catch {}
}
