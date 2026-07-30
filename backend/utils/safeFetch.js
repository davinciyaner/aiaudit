import dns from 'dns'
import net from 'net'
import https from 'https'

export function isPrivateOrReservedIp(ip) {
    if (net.isIP(ip) === 4) {
        const [a, b] = ip.split('.').map(Number)
        if (a === 10) return true
        if (a === 127) return true
        if (a === 0) return true
        if (a === 169 && b === 254) return true
        if (a === 172 && b >= 16 && b <= 31) return true
        if (a === 192 && b === 168) return true
        if (a === 100 && b >= 64 && b <= 127) return true
        if (a >= 224) return true
        return false
    }
    if (net.isIP(ip) === 6) {
        const lower = ip.toLowerCase()
        if (lower === '::1' || lower === '::') return true
        if (lower.startsWith('fe8') || lower.startsWith('fe9') || lower.startsWith('fea') || lower.startsWith('feb')) return true
        if (lower.startsWith('fc') || lower.startsWith('fd')) return true
        const v4Mapped = lower.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)
        if (v4Mapped) return isPrivateOrReservedIp(v4Mapped[1])
        return false
    }
    return true
}

export async function assertPublicHttpsUrl(url) {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:') throw new Error('Nur https erlaubt')
    if (parsed.hostname.toLowerCase() === 'localhost') throw new Error('Interne Adressen sind nicht erlaubt')

    const addresses = await dns.promises.lookup(parsed.hostname, { all: true })
    if (!addresses.length) throw new Error('Domain konnte nicht aufgelöst werden')
    if (addresses.some(a => isPrivateOrReservedIp(a.address))) {
        throw new Error('Interne/private Adressen sind nicht erlaubt')
    }
    return parsed
}

function safeLookup(hostname, options, callback) {
    dns.lookup(hostname, { all: true }, (err, addresses) => {
        if (err) return callback(err)
        const unsafe = addresses.find(a => isPrivateOrReservedIp(a.address))
        if (unsafe) return callback(new Error(`Interne/private Adresse blockiert: ${unsafe.address}`))
        if (options?.all) return callback(null, addresses)
        callback(null, addresses[0].address, addresses[0].family)
    })
}

const MAX_RESPONSE_BYTES = 2 * 1024 * 1024

export function fetchSafely(url, { headers = {}, timeoutMs = 10000, maxRedirects = 3 } = {}) {
    return new Promise((resolve, reject) => {
        function makeRequest(currentUrl, redirectsLeft) {
            let parsed
            try {
                parsed = new URL(currentUrl)
            } catch {
                return reject(new Error('Ungültige URL'))
            }
            if (parsed.protocol !== 'https:') return reject(new Error('Nur https erlaubt'))
            if (parsed.hostname.toLowerCase() === 'localhost') return reject(new Error('Interne Adressen sind nicht erlaubt'))

            const req = https.get(currentUrl, { headers, lookup: safeLookup, timeout: timeoutMs }, (response) => {
                const status = response.statusCode
                if ([301, 302, 303, 307, 308].includes(status)) {
                    response.resume() // Body verwerfen, wird bei Redirect nicht gebraucht
                    if (redirectsLeft <= 0) return reject(new Error('Zu viele Weiterleitungen'))
                    const location = response.headers.location
                    if (!location) return reject(new Error('Weiterleitung ohne Ziel-URL'))
                    return makeRequest(new URL(location, currentUrl).toString(), redirectsLeft - 1)
                }

                let body = ''
                let bytes = 0
                let tooLarge = false
                response.setEncoding('utf8')
                response.on('data', (chunk) => {
                    bytes += Buffer.byteLength(chunk, 'utf8')
                    if (bytes > MAX_RESPONSE_BYTES) {
                        tooLarge = true
                        response.destroy()
                        return
                    }
                    body += chunk
                })
                response.on('end', () => {
                    if (tooLarge) return reject(new Error('Antwort zu groß (>2MB)'))
                    resolve({ ok: status >= 200 && status < 300, status, text: async () => body })
                })
                response.on('error', reject)
            })
            req.on('timeout', () => req.destroy(new Error('Zeitüberschreitung beim Abruf')))
            req.on('error', reject)
        }
        makeRequest(url, maxRedirects)
    })
}
