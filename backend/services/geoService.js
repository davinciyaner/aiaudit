import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const openai    = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const MAX_SITES    = 5
const MAX_KEYWORDS = 30

export { MAX_SITES, MAX_KEYWORDS }

export const PLATFORM_LABELS = {
    claude:  'Claude',
    chatgpt: 'ChatGPT',
}

// Cost per check in USD (approx 200 input + 400 output tokens)
export const PLATFORM_COSTS = {
    claude:  0.0066,  // Sonnet 4.6: $3/M in, $15/M out
    chatgpt: 0.0045,  // GPT-4o: $2.50/M in, $10/M out
}

function buildQuery(keyword, language) {
    return language === 'de'
        ? `Ich suche nach Empfehlungen für: "${keyword}". Welche Websites, Tools oder Dienste kennst du dazu und würdest du empfehlen? Nenne konkrete Domains oder Namen.`
        : `I'm looking for recommendations for: "${keyword}". Which websites, tools or services do you know and would recommend? Please name specific domains or names.`
}

function extractMention(response, domain) {
    const normalizedDomain = domain.replace(/^www\./, '').toLowerCase()
    const mentioned = response.toLowerCase().includes(normalizedDomain)
    let context = null
    if (mentioned) {
        const sentences = response.split(/(?<=[.!?])\s+/)
        const hit = sentences.find(s => s.toLowerCase().includes(normalizedDomain))
        context = hit?.trim() || null
    }
    return { mentioned, context }
}

async function checkWithClaude(keyword, domain, language) {
    const msg = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 400,
        messages: [{ role: 'user', content: buildQuery(keyword, language) }],
    })
    return extractMention(msg.content[0].text, domain)
}

async function checkWithChatGPT(keyword, domain, language) {
    const res = await openai.chat.completions.create({
        model: 'gpt-4o',
        max_tokens: 400,
        messages: [{ role: 'user', content: buildQuery(keyword, language) }],
    })
    return extractMention(res.choices[0].message.content, domain)
}

const PLATFORM_FNS = {
    claude:  checkWithClaude,
    chatgpt: checkWithChatGPT,
}

export async function checkSiteMentions(site) {
    const platforms = site.platforms?.length ? site.platforms : ['claude']
    const results = []

    for (const keyword of site.keywords) {
        for (const platform of platforms) {
            const fn = PLATFORM_FNS[platform]
            if (!fn) continue
            try {
                const result = await fn(keyword, site.domain, site.language)
                results.push({ keyword, platform, ...result })
            } catch (err) {
                console.error(`[geoService] ${platform} Fehler bei "${keyword}":`, err.message)
                results.push({ keyword, platform, mentioned: false, context: null })
            }
            await new Promise(r => setTimeout(r, 300))
        }
    }
    return results
}