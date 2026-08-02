const PAYPAL_SUBSCRIPTION_ID_RE = /^I-[A-Z0-9]{12,20}$/

export function parsePaypalSubscriptionId(value) {
    const match = PAYPAL_SUBSCRIPTION_ID_RE.exec(value)
    return match ? match[0] : null
}
