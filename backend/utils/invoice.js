import { chromium } from 'playwright'

const PLAN_NAMES = { pro: 'Pro Plan', agency: 'Agency Plan' }
const PLAN_PRICES = { pro: '29,00', agency: '99,00' }

export function generateInvoiceHTML(transaction, user, plan) {
    const date = new Date(transaction.time).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
    const amount = transaction.amount_with_breakdown?.gross_amount?.value || PLAN_PRICES[plan]
    const currency = transaction.amount_with_breakdown?.gross_amount?.currency_code || 'EUR'
    const invoiceNr = `INV-${transaction.id.slice(-8).toUpperCase()}`

    return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8"/>
<style>
@page { margin: 0; size: A4; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, 'Segoe UI', sans-serif; background: #ffffff; color: #1a1a2e; width: 210mm; min-height: 297mm; padding: 48px 56px; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 56px; }
.logo { display: flex; align-items: center; gap: 10px; }
.logo-icon { width: 40px; height: 40px; background: linear-gradient(135deg, #7c3aed, #06b6d4); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
.logo-name { font-size: 22px; font-weight: 800; color: #0f172a; }
.logo-name span { color: #7c3aed; }
.invoice-label { font-size: 28px; font-weight: 700; color: #0f172a; }
.invoice-nr { font-size: 13px; color: #64748b; margin-top: 4px; }
.divider { height: 1px; background: #e2e8f0; margin-bottom: 40px; }
.parties { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 48px; }
.party-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 10px; }
.party-name { font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 4px; }
.party-detail { font-size: 13px; color: #64748b; line-height: 1.6; }
.date-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px 20px; margin-bottom: 40px; display: flex; gap: 40px; }
.date-item-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; font-weight: 600; margin-bottom: 4px; }
.date-item-value { font-size: 14px; font-weight: 600; color: #0f172a; }
table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
thead th { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; font-weight: 700; padding: 10px 0; border-bottom: 2px solid #e2e8f0; text-align: left; }
thead th:last-child { text-align: right; }
tbody td { padding: 16px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155; vertical-align: top; }
tbody td:last-child { text-align: right; font-weight: 600; color: #0f172a; }
.total-row { display: flex; justify-content: flex-end; margin-top: 8px; }
.total-box { background: #0f172a; color: white; border-radius: 12px; padding: 16px 24px; min-width: 200px; }
.total-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; margin-bottom: 6px; }
.total-amount { font-size: 26px; font-weight: 800; }
.footer { margin-top: 64px; padding-top: 24px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
.footer-note { font-size: 11px; color: #94a3b8; line-height: 1.6; }
.paid-badge { background: #dcfce7; border: 1px solid #86efac; color: #166534; font-size: 11px; font-weight: 700; padding: 6px 14px; border-radius: 999px; }
</style>
</head>
<body>
<div class="header">
    <div class="logo">
        <div class="logo-icon">⚡</div>
        <div class="logo-name">Audit<span>AI</span></div>
    </div>
    <div style="text-align:right">
        <div class="invoice-label">Rechnung</div>
        <div class="invoice-nr">${invoiceNr}</div>
    </div>
</div>

<div class="divider"></div>

<div class="parties">
    <div>
        <div class="party-label">Von</div>
        <div class="party-name">AuditAI</div>
        <div class="party-detail">auditai.io<br/>support@auditai.io</div>
    </div>
    <div>
        <div class="party-label">An</div>
        <div class="party-name">${user.name}</div>
        <div class="party-detail">${user.email}</div>
    </div>
</div>

<div class="date-box">
    <div>
        <div class="date-item-label">Rechnungsdatum</div>
        <div class="date-item-value">${date}</div>
    </div>
    <div>
        <div class="date-item-label">Rechnungsnummer</div>
        <div class="date-item-value">${invoiceNr}</div>
    </div>
    <div>
        <div class="date-item-label">Zahlungsmethode</div>
        <div class="date-item-value">PayPal</div>
    </div>
</div>

<table>
    <thead>
        <tr>
            <th>Beschreibung</th>
            <th>Zeitraum</th>
            <th>Betrag</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <div style="font-weight:600;color:#0f172a;margin-bottom:3px">AuditAI ${PLAN_NAMES[plan] || plan}</div>
                <div style="font-size:12px;color:#94a3b8">Monatliches Abonnement</div>
            </td>
            <td style="color:#64748b">${date}</td>
            <td>${amount} ${currency}</td>
        </tr>
    </tbody>
</table>

<div class="total-row">
    <div class="total-box">
        <div class="total-label">Gesamtbetrag</div>
        <div class="total-amount">${amount} ${currency}</div>
    </div>
</div>

<div class="footer">
    <div class="footer-note">
        Vielen Dank für dein Vertrauen in AuditAI.<br/>
        Bezahlt via PayPal · Transaktion: ${transaction.id}
    </div>
    <div class="paid-badge">✓ Bezahlt</div>
</div>
</body>
</html>`
}

export async function renderToPDF(html) {
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle' })
    const pdf = await page.pdf({ format: 'A4', printBackground: true })
    await browser.close()
    return pdf
}
