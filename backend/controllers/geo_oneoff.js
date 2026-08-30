import GeoOneoffCheck from '../models/geo_oneoff_check.js'
import { checkPlatformMention, classifySentimentSafe, buildQuery, PLATFORM_LABELS } from '../services/geoService.js'
import { t } from '../utils/i18n/errors.js'

const PLATFORMS = ['claude', 'chatgpt', 'perplexity', 'google_aio']

const UNLIMITED_USER_IDS = new Set(
    (process.env.GEO_ONEOFF_UNLIMITED_USER_IDS || '').split(',').map(s => s.trim()).filter(Boolean)
)

function normalizeDomain(input) {
    if (!input || typeof input !== 'string') return null
    let host
    try {
        host = new URL(input.startsWith('http') ? input : `https://${input}`).hostname
    } catch {
        return null
    }
    host = host.replace(/^www\./i, '').toLowerCase()
    return /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/.test(host) ? host : null
}

function identifierFor(req) {
    if (req.userId && UNLIMITED_USER_IDS.has(req.userId)) {
        return `user:${req.userId}:${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    }
    return req.userId ? `user:${req.userId}` : `ip:${req.ip}`
}

function ownsDoc(req, doc) {
    if (req.userId) return doc.identifier === `user:${req.userId}` || doc.identifier.startsWith(`user:${req.userId}:`)
    return doc.identifier === `ip:${req.ip}`
}

export async function startCheck(req, res) {
    const lang = ['de', 'en'].includes(req.body?.language) ? req.body.language : req.language

    const domain = normalizeDomain(req.body?.domain)
    if (!domain) return res.status(400).json({ error: t('INVALID_DOMAIN', lang) })

    const keyword = (req.body?.keyword || '').trim()
    if (!keyword || keyword.length > 100) return res.status(400).json({ error: t('KEYWORD_REQUIRED', lang) })

    const platform = req.body?.platform
    if (!PLATFORMS.includes(platform)) return res.status(400).json({ error: t('INVALID_PLATFORM', lang) })

    const identifier = identifierFor(req)
    const prompt = buildQuery(keyword, lang, 'empfehlung')

    let doc
    try {
        doc = await GeoOneoffCheck.create({ identifier, domain, keyword, platform, language: lang, prompt })
    } catch (err) {
        if (err.code === 11000) return res.status(429).json({ error: t('ONEOFF_QUOTA_USED', lang), quotaExceeded: true })
        return res.status(500).json({ error: err.message })
    }

    res.status(202).json({ id: doc._id, platform, label: PLATFORM_LABELS[platform], prompt })
    runOneOffCheckInBackground(doc._id, domain, keyword, lang, platform)
}

async function runOneOffCheckInBackground(id, domain, keyword, language, platform) {
    const { mentioned, context } = await checkPlatformMention(platform, keyword, domain, language, 'empfehlung')

    if (!mentioned) {
        await GeoOneoffCheck.findByIdAndUpdate(id, { status: 'done', 'result.mentioned': false, 'result.context': null })
        return
    }

    await GeoOneoffCheck.findByIdAndUpdate(id, { status: 'sentiment', 'result.mentioned': true, 'result.context': context })
    const sentiment = await classifySentimentSafe(context, domain)
    await GeoOneoffCheck.findByIdAndUpdate(id, { status: 'done', 'result.sentiment': sentiment })
}

export async function getCheckStatus(req, res) {
    let doc
    try {
        doc = await GeoOneoffCheck.findById(req.params.id)
    } catch {
        return res.status(404).json({ error: 'not_found' })
    }
    if (!doc) return res.status(404).json({ error: 'not_found' })

    if (!ownsDoc(req, doc)) return res.status(403).json({ error: 'forbidden' })

    res.json({
        status: doc.status,
        platform: doc.platform,
        label: PLATFORM_LABELS[doc.platform],
        prompt: doc.prompt,
        ...(doc.status === 'done' ? { mentioned: doc.result.mentioned, context: doc.result.context, sentiment: doc.result.sentiment } : {}),
    })
}
