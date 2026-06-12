export async function checkUptime(domain) {
    const url = domain.startsWith('http') ? domain : `https://${domain}`
    const start = Date.now()
    try {
        const res = await fetch(url, {
            method: 'HEAD',
            signal: AbortSignal.timeout(10000),
            redirect: 'follow',
        })
        const responseTime = Date.now() - start
        const status = res.ok ? 'up' : (res.status >= 500 ? 'down' : 'degraded')
        return { status, responseTime, httpCode: res.status, error: null }
    } catch (err) {
        return { status: 'down', responseTime: Date.now() - start, httpCode: null, error: err.message }
    }
}