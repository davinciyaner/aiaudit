import 'dotenv/config'

const BASE = 'https://api-m.sandbox.paypal.com'

async function getToken() {
    const res = await fetch(`${BASE}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    })
    const data = await res.json()
    return data.access_token
}

async function createProduct(token) {
    const res = await fetch(`${BASE}/v1/catalogs/products`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'AuditAI', type: 'SERVICE', category: 'SOFTWARE' })
    })
    const data = await res.json()
    console.log('Product ID:', data.id)
    return data.id
}

async function createPlan(token, productId, name, price) {
    const res = await fetch(`${BASE}/v1/billing/plans`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            product_id: productId,
            name,
            status: 'ACTIVE',
            billing_cycles: [{
                frequency: { interval_unit: 'MONTH', interval_count: 1 },
                tenure_type: 'REGULAR',
                sequence: 1,
                total_cycles: 0,
                pricing_scheme: { fixed_price: { value: price, currency_code: 'EUR' } }
            }],
            payment_preferences: { auto_bill_outstanding: true, payment_failure_threshold: 1 }
        })
    })
    const data = await res.json()
    console.log(`${name} Plan ID:`, data.id)
    return data.id
}

const token = await getToken()
const productId = await createProduct(token)
await createPlan(token, productId, 'AuditAI Pro', '29.00')
await createPlan(token, productId, 'AuditAI Agency', '99.00')