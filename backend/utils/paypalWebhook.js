async function getPayPalToken() {
    const clientId = process.env.PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENTID
    const creds = Buffer.from(`${clientId}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')
    const res = await fetch(`${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${creds}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    })
    const data = await res.json()
    return data.access_token
}

export async function verifyPaypalWebhookSignature(headers, body) {
    const webhookId = process.env.PAYPAL_WEBHOOK_ID
    if (!webhookId) return false

    const token = await getPayPalToken()
    const res = await fetch(`${process.env.PAYPAL_BASE_URL}/v1/notifications/verify-webhook-signature`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            auth_algo: headers['paypal-auth-algo'],
            cert_url: headers['paypal-cert-url'],
            transmission_id: headers['paypal-transmission-id'],
            transmission_sig: headers['paypal-transmission-sig'],
            transmission_time: headers['paypal-transmission-time'],
            webhook_id: webhookId,
            webhook_event: body,
        }),
    })
    const data = await res.json()
    return data.verification_status === 'SUCCESS'
}
