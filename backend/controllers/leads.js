import crypto from 'crypto'
import GeoTrackedSite from '../models/geo_tracked_site.js'
import Lead from '../models/lead.js'
import { t } from '../utils/i18n/errors.js'

const AI_SOURCES = ['chatgpt', 'perplexity', 'claude', 'gemini']

function normalizeHost(value) {
    return (value || '').replace(/^www\./, '').toLowerCase()
}

// "null" ist ein legitimer Origin-Wert (file://-Seiten, sandboxed iframes, manche Redirects) — kein
// Spoofing-Versuch, wird deshalb wie "kein Origin-Header" behandelt statt an new URL() zu scheitern.
// Rueckgabe: null wenn ok, sonst ein { status, error } fuer die direkte Antwort.
function checkOriginMatchesSite(req, site) {
    const origin = req.headers.origin
    if (!origin || origin === 'null') return null
    try {
        if (normalizeHost(new URL(origin).hostname) !== normalizeHost(site.domain)) {
            return { status: 403, error: 'origin does not match registered site domain' }
        }
    } catch {
        return { status: 400, error: 'invalid origin header' }
    }
    return null
}

// POST /api/leads/track — OEFFENTLICH, aufgerufen vom Tracking-Snippet auf der Website eines
// Scanora-Kunden (fremde Domain, kein JWT). siteKey identifiziert die Site, ersetzt aber keine
// echte Authentifizierung — Schreibzugriff ist bewusst nach demselben Modell wie ein GA-Measurement-ID
// oder Segment-Write-Key gestaltet: wer den (im Client-JS zwangslaeufig oeffentlichen) Key kennt, kann
// einen Lead melden, aber niemals fremde Leads LESEN. Der Origin-Check unten ist eine zusaetzliche,
// aber keine absolute Huerde — ein Server-zu-Server-Call ohne Origin-Header laesst sich damit nicht
// verhindern, das ist bei jedem oeffentlichen Tracking-Snippet so.
export async function trackLead(req, res) {
    try {
        const { siteKey, email, aiSource, referrerRaw, landingPage } = req.body || {}
        if (!siteKey || typeof siteKey !== 'string') {
            return res.status(400).json({ error: 'siteKey required' })
        }
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return res.status(400).json({ error: 'valid email required' })
        }

        const site = await GeoTrackedSite.findOne({ siteKey }).lean()
        if (!site) return res.status(404).json({ error: 'unknown siteKey' })

        const originErr = checkOriginMatchesSite(req, site)
        if (originErr) return res.status(originErr.status).json({ error: originErr.error })

        await Lead.create({
            siteId: site._id,
            email: email.trim().toLowerCase().slice(0, 200),
            aiSource: AI_SOURCES.includes(aiSource) ? aiSource : null,
            referrerRaw: typeof referrerRaw === 'string' ? referrerRaw.slice(0, 500) : null,
            landingPage: typeof landingPage === 'string' ? landingPage.slice(0, 300) : null,
        })

        res.status(201).json({ ok: true })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// POST /api/leads/verify — OEFFENTLICH, vom Snippet bei jedem ScanoraLeads.init()-Aufruf (client-seitig
// gedrosselt, siehe LeadsSnippetBox im Frontend) aufgerufen — unabhaengig davon, ob je ein echter Lead
// reinkommt. Beantwortet "hat der Kunde das Snippet ueberhaupt eingebunden", das kann sonst wochenlang
// unklar bleiben, wenn schlicht noch niemand konvertiert hat.
export async function verifySnippet(req, res) {
    try {
        const { siteKey } = req.body || {}
        if (!siteKey || typeof siteKey !== 'string') {
            return res.status(400).json({ error: 'siteKey required' })
        }

        const site = await GeoTrackedSite.findOne({ siteKey }).lean()
        if (!site) return res.status(404).json({ error: 'unknown siteKey' })

        const originErr = checkOriginMatchesSite(req, site)
        if (originErr) return res.status(originErr.status).json({ error: originErr.error })

        await GeoTrackedSite.updateOne({ _id: site._id }, { leadsSnippetLastSeenAt: new Date() })
        res.json({ ok: true })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const SOURCE_ORDER = ['chatgpt', 'perplexity', 'claude', 'gemini']

// GET /api/geo/sites/:id/leads — authentifiziert, exakt dasselbe Ownership-Muster wie getCompetitors
// & Co. in geo_tracking.js: nur der eingeloggte Owner der Site sieht ihre Leads, niemals ein anderer
// Nutzer — unabhaengig vom (oeffentlichen) siteKey oben.
export async function getSiteLeads(req, res) {
    try {
        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        // Lazy statt Migration: Sites, die vor Einfuehrung des Leads-Features angelegt wurden,
        // bekommen ihren siteKey beim ersten Aufruf dieser Route nachtraeglich vergeben. .lean() ist
        // hier Pflicht fuer den Check — ueber ein normales (nicht-lean) Mongoose-Document greift der
        // Schema-default schon beim Lesen und site.siteKey ist nie leer, auch wenn in der DB nichts
        // gespeichert ist (der generierte Wert bliebe dann rein im Arbeitsspeicher, nie persistiert).
        if (!site.siteKey) {
            site.siteKey = crypto.randomBytes(16).toString('hex')
            await GeoTrackedSite.updateOne({ _id: site._id }, { siteKey: site.siteKey })
        }

        const trendSince = new Date(Date.now() - 8 * 7 * 24 * 60 * 60 * 1000)

        const [totalLeads, bySource, recentLeads, trendLeads] = await Promise.all([
            Lead.countDocuments({ siteId: site._id }),
            Lead.aggregate([
                { $match: { siteId: site._id, aiSource: { $ne: null } } },
                { $group: { _id: '$aiSource', count: { $sum: 1 } } },
            ]),
            Lead.find({ siteId: site._id }).sort({ createdAt: -1 }).limit(50)
                .select('email aiSource landingPage createdAt').lean(),
            // In JS statt per $dateTrunc-Aggregation gebucketed — bei den ueberschaubaren Lead-Mengen
            // pro Site voellig ausreichend und unabhaengig von der MongoDB-Version.
            Lead.find({ siteId: site._id, aiSource: { $ne: null }, createdAt: { $gte: trendSince } }, 'createdAt').lean(),
        ])

        const trend = Array.from({ length: 8 }, (_, i) => {
            const weekStart = new Date(trendSince.getTime() + i * 7 * 24 * 60 * 60 * 1000)
            const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
            return trendLeads.filter(l => l.createdAt >= weekStart && l.createdAt < weekEnd).length
        })

        // Letzte 4 Wochen vs. die 4 davor statt Vormonat/Vormonat exakt — die 8-Wochen-Trendbuckets
        // oben sind schon in Wochen gerastert, das spart eine zweite, separate Datumsberechnung.
        // Bei previousPeriod=0 waere ein Prozentwert (Division durch 0 oder "unendlich Wachstum")
        // irrefuehrend, deshalb dann null statt einer erfundenen Zahl.
        const recentPeriodCount = trend.slice(4).reduce((sum, n) => sum + n, 0)
        const previousPeriodCount = trend.slice(0, 4).reduce((sum, n) => sum + n, 0)
        const trendDeltaPercent = previousPeriodCount > 0
            ? Math.round(((recentPeriodCount - previousPeriodCount) / previousPeriodCount) * 100)
            : null

        const countBySource = Object.fromEntries(bySource.map(b => [b._id, b.count]))
        const aiAttributedCount = bySource.reduce((sum, b) => sum + b.count, 0)
        const aiAttributedPercent = totalLeads > 0 ? Math.round((aiAttributedCount / totalLeads) * 100) : 0

        const breakdown = SOURCE_ORDER
            .map(source => ({
                source,
                count: countBySource[source] || 0,
                percent: aiAttributedCount > 0 ? Math.round(((countBySource[source] || 0) / aiAttributedCount) * 100) : 0,
            }))
            .filter(b => b.count > 0)
            .sort((a, b) => b.count - a.count)

        res.json({
            siteKey: site.siteKey,
            domain: site.domain,
            snippetLastSeenAt: site.leadsSnippetLastSeenAt || null,
            totalLeads,
            aiAttributedCount,
            aiAttributedPercent,
            topSource: breakdown[0]?.source || null,
            breakdown,
            trend,
            trendDeltaPercent,
            recentPeriodCount,
            leads: recentLeads,
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// DELETE /api/geo/sites/:id/leads/:leadId — Loeschfunktion fuer Betroffenenanfragen (Art. 17 DSGVO):
// ein Lead (Website-Besucher des Kunden) meldet sich beim Site-Owner und verlangt Loeschung, der
// Site-Owner erledigt das hier selbst — der AVV sieht vor, dass Anfragen beim Auftragsverarbeiter
// an den Verantwortlichen weitergeleitet werden, nicht dass Scanora sie manuell abarbeitet.
export async function deleteLead(req, res) {
    try {
        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const result = await Lead.deleteOne({ _id: req.params.leadId, siteId: site._id })
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: req.language === 'en' ? 'Lead not found' : 'Lead nicht gefunden' })
        }

        res.json({ ok: true })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET /api/geo/sites/:id/leads/lookup?email=x — Auskunftsfunktion (Art. 15 DSGVO): findet ALLE
// Datensaetze zu einer E-Mail, nicht nur die letzten 50 wie im normalen Dashboard-Feed — eine
// Auskunftsanfrage muss vollstaendig sein, nicht auf die zuletzt eingegangenen Leads begrenzt.
export async function lookupLeadsByEmail(req, res) {
    try {
        const site = await GeoTrackedSite.findOne({ _id: req.params.id, userId: req.userId }).lean()
        if (!site) return res.status(404).json({ error: t('SITE_NOT_FOUND', req.language) })

        const email = (req.query.email || '').trim().toLowerCase()
        if (!email) return res.status(400).json({ error: req.language === 'en' ? 'email required' : 'E-Mail erforderlich' })

        const leads = await Lead.find({ siteId: site._id, email })
            .sort({ createdAt: -1 })
            .select('email aiSource referrerRaw landingPage createdAt')
            .lean()

        res.json({ leads })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
