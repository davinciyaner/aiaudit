import tls from 'tls'

export function checkSSL(hostname) {
    return new Promise((resolve) => {
        const clean = hostname.replace(/^https?:\/\//, '').split('/')[0]
        const socket = tls.connect(443, clean, { servername: clean }, () => {
            try {
                const cert = socket.getPeerCertificate()
                socket.destroy()
                if (!cert || !cert.valid_to) {
                    return resolve({ valid: false, expiry: null, daysLeft: null })
                }
                const expiry = new Date(cert.valid_to)
                const daysLeft = Math.floor((expiry - Date.now()) / (1000 * 60 * 60 * 24))
                resolve({ valid: true, expiry, daysLeft })
            } catch {
                resolve({ valid: false, expiry: null, daysLeft: null })
            }
        })
        socket.on('error', () => resolve({ valid: false, expiry: null, daysLeft: null }))
        socket.setTimeout(5000, () => {
            socket.destroy()
            resolve({ valid: false, expiry: null, daysLeft: null })
        })
    })
}