import nodemailer from 'nodemailer';

const APP_URL = process.env.APP_URL || process.env.ALLOWED_ORIGIN || 'https://www.sitecheckai.dev';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendTicketStatusChanged(ticket, newStatus) {
    const statusUrl = `${APP_URL}/support/${ticket.ticketNumber}`
    const configs = {
        in_progress: {
            subject: `[${ticket.ticketNumber}] Wir kümmern uns um dein Anliegen`,
            headline: 'Wir sind dran!',
            body: 'Bitte entschuldige die Unannehmlichkeiten — wir haben dein Ticket erhalten und kümmern uns so schnell wie möglich darum. Ein Mitarbeiter hat dein Anliegen bereits übernommen und arbeitet an einer Lösung für dich.',
            statusLabel: 'Wird bearbeitet',
            statusColor: '#3b82f6',
            dotColor: '#3b82f6',
        },
        closed: {
            subject: `[${ticket.ticketNumber}] Dein Ticket wurde geschlossen`,
            headline: 'Ticket geschlossen ✓',
            body: 'Dein Support-Ticket wurde erfolgreich bearbeitet und geschlossen. Wir hoffen, wir konnten dir weiterhelfen. Bei weiteren Fragen kannst du jederzeit ein neues Ticket erstellen.',
            statusLabel: 'Geschlossen',
            statusColor: '#10b981',
            dotColor: '#10b981',
        },
    }
    const cfg = configs[newStatus]
    if (!cfg) return
    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: ticket.email,
        subject: cfg.subject,
        text: `Hallo ${ticket.name},\n\n${cfg.body}\n\nTicketnummer: ${ticket.ticketNumber}\nBetreff: ${ticket.subject}\n\nStatus verfolgen: ${statusUrl}\n\nDein AuditAI Team`,
        html: ticketStatusChangedHtml(ticket, cfg, statusUrl),
    })
}

function ticketStatusChangedHtml(ticket, cfg, statusUrl) {
    return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#05080f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05080f;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td align="center" style="padding-bottom:32px;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:12px;width:40px;height:40px;text-align:center;vertical-align:middle;">
              <span style="color:#fff;font-size:18px;font-weight:bold;">&#x26A1;</span>
            </td>
            <td style="padding-left:10px;vertical-align:middle;">
              <span style="color:#ffffff;font-size:20px;font-weight:700;">Audit<span style="color:#22d3ee;">AI</span></span>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="background:#0d1117;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:40px;">
          <p style="margin:0 0 6px;font-size:24px;font-weight:700;color:#ffffff;">${cfg.headline}</p>
          <p style="margin:0 0 28px;font-size:15px;color:#94a3b8;line-height:1.6;">Hallo ${ticket.name}, ${cfg.body}</p>
          <table cellpadding="0" cellspacing="0" width="100%" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;margin-bottom:28px;">
            <tr><td>
              <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Ticketnummer</p>
              <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#a78bfa;letter-spacing:0.05em;">${ticket.ticketNumber}</p>
              <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Betreff</p>
              <p style="margin:0 0 16px;font-size:14px;color:#e2e8f0;">${ticket.subject}</p>
              <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Status</p>
              <p style="margin:0;font-size:13px;color:${cfg.statusColor};font-weight:600;">&#x25CF; ${cfg.statusLabel}</p>
            </td></tr>
          </table>
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:12px;padding:1px;">
              <a href="${statusUrl}" style="display:block;background:#0d1117;border-radius:11px;padding:12px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                Ticket ansehen &rarr;
              </a>
            </td>
          </tr></table>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:28px 0;"/>
          <p style="margin:0;font-size:14px;color:#64748b;">Bis bald,<br/><strong style="color:#94a3b8;">Dein AuditAI Support-Team</strong></p>
        </td></tr>
        <tr><td align="center" style="padding-top:24px;">
          <p style="margin:0;font-size:11px;color:#334155;">Du erhältst diese E-Mail, weil du ein Support-Ticket auf <a href="${APP_URL}" style="color:#475569;text-decoration:none;">sitecheckai.dev</a> erstellt hast.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function sendTicketCreatedUser(ticket) {
    const statusUrl = `${APP_URL}/support/${ticket.ticketNumber}`
    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: ticket.email,
        subject: `[${ticket.ticketNumber}] Dein Support-Ticket wurde erstellt`,
        text: `Hallo ${ticket.name},\n\ndein Ticket "${ticket.subject}" wurde erfolgreich erstellt.\nTicketnummer: ${ticket.ticketNumber}\n\nStatus prüfen: ${statusUrl}\n\nWir melden uns so schnell wie möglich.\n\nDein AuditAI Team`,
        html: ticketUserHtml(ticket, statusUrl),
    })
}

export async function sendTicketCreatedAdmin(ticket) {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER
    const adminUrl = `${APP_URL}/support/admin`
    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: adminEmail,
        subject: `[${ticket.ticketNumber}] Neues Support-Ticket: ${ticket.subject}`,
        text: `Neues Ticket von ${ticket.name} (${ticket.email})\n\nBetreff: ${ticket.subject}\n\nNachricht:\n${ticket.message}\n\nAdmin-Panel: ${adminUrl}`,
        html: ticketAdminHtml(ticket, adminUrl),
    })
}

function ticketUserHtml(ticket, statusUrl) {
    return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#05080f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05080f;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td align="center" style="padding-bottom:32px;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:12px;width:40px;height:40px;text-align:center;vertical-align:middle;">
              <span style="color:#fff;font-size:18px;font-weight:bold;">&#x26A1;</span>
            </td>
            <td style="padding-left:10px;vertical-align:middle;">
              <span style="color:#ffffff;font-size:20px;font-weight:700;">Audit<span style="color:#22d3ee;">AI</span></span>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="background:#0d1117;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:40px;">
          <p style="margin:0 0 6px;font-size:24px;font-weight:700;color:#ffffff;">Ticket erstellt &#x2713;</p>
          <p style="margin:0 0 28px;font-size:15px;color:#94a3b8;line-height:1.6;">Hallo ${ticket.name}, wir haben deine Anfrage erhalten und melden uns so schnell wie möglich.</p>
          <table cellpadding="0" cellspacing="0" width="100%" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;margin-bottom:28px;">
            <tr><td>
              <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Ticketnummer</p>
              <p style="margin:0 0 16px;font-size:18px;font-weight:700;color:#a78bfa;letter-spacing:0.05em;">${ticket.ticketNumber}</p>
              <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Betreff</p>
              <p style="margin:0 0 16px;font-size:14px;color:#e2e8f0;">${ticket.subject}</p>
              <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Status</p>
              <p style="margin:0;font-size:13px;color:#f59e0b;font-weight:600;">&#x25CF; Warten auf Support</p>
            </td></tr>
          </table>
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:12px;padding:1px;">
              <a href="${statusUrl}" style="display:block;background:#0d1117;border-radius:11px;padding:12px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                Status verfolgen &rarr;
              </a>
            </td>
          </tr></table>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:28px 0;"/>
          <p style="margin:0;font-size:14px;color:#64748b;">Bis bald,<br/><strong style="color:#94a3b8;">Dein AuditAI Support-Team</strong></p>
        </td></tr>
        <tr><td align="center" style="padding-top:24px;">
          <p style="margin:0;font-size:11px;color:#334155;">Du erhältst diese E-Mail, weil du ein Support-Ticket auf <a href="${APP_URL}" style="color:#475569;text-decoration:none;">sitecheckai.dev</a> erstellt hast.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function ticketAdminHtml(ticket, adminUrl) {
    const created = new Date(ticket.createdAt).toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })
    return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#05080f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05080f;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:#0d1117;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:40px;">
          <p style="margin:0 0 6px;font-size:20px;font-weight:700;color:#ffffff;">Neues Support-Ticket</p>
          <p style="margin:0 0 28px;font-size:13px;color:#64748b;">${created}</p>
          <table cellpadding="0" cellspacing="0" width="100%" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;margin-bottom:24px;">
            <tr><td>
              <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Ticket</p>
              <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#a78bfa;">${ticket.ticketNumber}</p>
              <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Von</p>
              <p style="margin:0 0 4px;font-size:14px;color:#e2e8f0;font-weight:600;">${ticket.name}</p>
              <p style="margin:0 0 16px;font-size:13px;color:#64748b;">${ticket.email}</p>
              <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Betreff</p>
              <p style="margin:0 0 16px;font-size:14px;color:#e2e8f0;">${ticket.subject}</p>
              <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Nachricht</p>
              <p style="margin:0;font-size:14px;color:#94a3b8;line-height:1.6;white-space:pre-wrap;">${ticket.message}</p>
            </td></tr>
          </table>
          <a href="${adminUrl}" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:12px;padding:12px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
            Admin-Panel öffnen &rarr;
          </a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function sendWelcome({ name, email }) {
    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: 'Willkommen bei AuditAI!',
        html: welcomeHtml(name),
    })
}

export async function sendSubscriptionConfirmation({ name, email, plan }) {
    const planLabel = plan === 'agency' ? 'Agency' : 'Pro'
    const planPrice = plan === 'agency' ? '€99/Monat' : '€29/Monat'
    const auditLimit = plan === 'agency' ? 'unbegrenzte Audits' : '10 Audits pro Monat'
    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: `Dein AuditAI ${planLabel}-Abo ist aktiv`,
        html: subscriptionConfirmHtml(name, planLabel, planPrice, auditLimit),
    })
}

function welcomeHtml(name) {
    return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#05080f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05080f;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td align="center" style="padding-bottom:32px;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:12px;width:40px;height:40px;text-align:center;vertical-align:middle;">
              <span style="color:#fff;font-size:18px;font-weight:bold;">&#x26A1;</span>
            </td>
            <td style="padding-left:10px;vertical-align:middle;">
              <span style="color:#ffffff;font-size:20px;font-weight:700;">Audit<span style="color:#22d3ee;">AI</span></span>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="background:#0d1117;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:40px;">
          <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#ffffff;">Willkommen, ${name}!</p>
          <p style="margin:0 0 28px;font-size:15px;color:#94a3b8;line-height:1.6;">
            Schön, dass du dabei bist. Mit AuditAI kannst du deine Website auf SEO, GEO, Sicherheit und Performance analysieren &mdash; in Sekunden.
          </p>
          <table cellpadding="0" cellspacing="0" width="100%" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;margin-bottom:28px;">
            <tr><td>
              <p style="margin:0 0 12px;font-size:13px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Was dich erwartet</p>
              <p style="margin:0 0 8px;font-size:14px;color:#e2e8f0;">&#x26A1; &nbsp;SEO-Analyse &mdash; Meta-Tags, Struktur, Keywords</p>
              <p style="margin:0 0 8px;font-size:14px;color:#e2e8f0;">&#x1F680; &nbsp;Performance &mdash; Ladezeiten und Core Web Vitals</p>
              <p style="margin:0 0 8px;font-size:14px;color:#e2e8f0;">&#x1F512; &nbsp;Sicherheit &mdash; Header, Schwachstellen</p>
              <p style="margin:0;font-size:14px;color:#e2e8f0;">&#x1F916; &nbsp;GEO &mdash; KI-Sichtbarkeit deiner Website</p>
            </td></tr>
          </table>
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:12px;padding:1px;">
              <a href="${APP_URL}/dashboard" style="display:block;background:#0d1117;border-radius:11px;padding:12px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                Zum Dashboard &rarr;
              </a>
            </td>
          </tr></table>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:28px 0;"/>
          <p style="margin:0;font-size:14px;color:#64748b;">Viel Erfolg,<br/><strong style="color:#94a3b8;">Dein AuditAI Team</strong></p>
        </td></tr>
        <tr><td align="center" style="padding-top:24px;">
          <p style="margin:0;font-size:11px;color:#334155;">Du erhältst diese E-Mail, weil du dich auf <a href="${APP_URL}" style="color:#475569;text-decoration:none;">sitecheckai.dev</a> registriert hast.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function subscriptionConfirmHtml(name, planLabel, planPrice, auditLimit) {
    return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#05080f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05080f;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td align="center" style="padding-bottom:32px;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:12px;width:40px;height:40px;text-align:center;vertical-align:middle;">
              <span style="color:#fff;font-size:18px;font-weight:bold;">&#x26A1;</span>
            </td>
            <td style="padding-left:10px;vertical-align:middle;">
              <span style="color:#ffffff;font-size:20px;font-weight:700;">Audit<span style="color:#22d3ee;">AI</span></span>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="background:#0d1117;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:40px;">
          <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#ffffff;">Vielen Dank, ${name}!</p>
          <p style="margin:0 0 28px;font-size:15px;color:#94a3b8;line-height:1.6;">
            Dein <strong style="color:#a78bfa;">${planLabel}-Abo</strong> ist jetzt aktiv. Wir freuen uns sehr, dich als ${planLabel}-Mitglied begrüßen zu dürfen.
          </p>
          <table cellpadding="0" cellspacing="0" width="100%" style="background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.2);border-radius:12px;padding:20px;margin-bottom:28px;">
            <tr><td>
              <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Dein Plan</p>
              <p style="margin:0 0 16px;font-size:18px;font-weight:700;color:#a78bfa;">${planLabel} &middot; ${planPrice}</p>
              <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Inbegriffen</p>
              <p style="margin:0 0 8px;font-size:14px;color:#e2e8f0;">&#x2713; &nbsp;${auditLimit}</p>
              <p style="margin:0 0 8px;font-size:14px;color:#e2e8f0;">&#x2713; &nbsp;KI-Analyse mit detailliertem Bericht</p>
              <p style="margin:0;font-size:14px;color:#e2e8f0;">&#x2713; &nbsp;PDF-Export</p>
            </td></tr>
          </table>
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:12px;padding:1px;">
              <a href="${APP_URL}/dashboard" style="display:block;background:#0d1117;border-radius:11px;padding:12px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                Jetzt Audit starten &rarr;
              </a>
            </td>
          </tr></table>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:28px 0;"/>
          <p style="margin:0;font-size:14px;color:#64748b;">Herzlichen Glückwunsch und viel Erfolg,<br/><strong style="color:#94a3b8;">Dein AuditAI Team</strong></p>
        </td></tr>
        <tr><td align="center" style="padding-top:24px;">
          <p style="margin:0;font-size:11px;color:#334155;">Du erhältst diese E-Mail, weil du ein Abo auf <a href="${APP_URL}" style="color:#475569;text-decoration:none;">sitecheckai.dev</a> abgeschlossen hast.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function sendAdminNewUser({ name, email }) {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER
    const now = new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })
    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: adminEmail,
        subject: `Neue Registrierung: ${name}`,
        html: adminNotifyHtml('Neue Registrierung', [
            ['Name', name],
            ['E-Mail', email],
            ['Zeitpunkt', now],
        ]),
    })
}

export async function sendAdminNewAudit({ url, plan, userEmail }) {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER
    const now = new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })
    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: adminEmail,
        subject: `Neues Audit: ${url}`,
        html: adminNotifyHtml('Neues Audit durchgeführt', [
            ['URL', url],
            ['Plan', plan],
            ['Nutzer', userEmail || 'anonym'],
            ['Zeitpunkt', now],
        ]),
    })
}

export async function sendAdminNewSubscription({ name, email, plan }) {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER
    const now = new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })
    const planLabel = plan === 'agency' ? 'Agency (€99/mo)' : 'Pro (€29/mo)'
    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: adminEmail,
        subject: `Neues Abo: ${planLabel} — ${name}`,
        html: adminNotifyHtml('Neues Abonnement', [
            ['Plan', planLabel],
            ['Name', name],
            ['E-Mail', email],
            ['Zeitpunkt', now],
        ]),
    })
}

function adminNotifyHtml(title, rows) {
    const rowsHtml = rows.map(([label, value]) => `
      <tr>
        <td style="padding:8px 0;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;width:100px;">${label}</td>
        <td style="padding:8px 0;font-size:14px;color:#e2e8f0;font-weight:500;">${value}</td>
      </tr>`).join('')
    return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#05080f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05080f;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:#0d1117;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:32px 40px;">
          <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;">AuditAI &middot; Admin</p>
          <p style="margin:0 0 24px;font-size:20px;font-weight:700;color:#ffffff;">${title}</p>
          <table cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid rgba(255,255,255,0.06);">
            ${rowsHtml}
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function sendPasswordReset({ name, email, token }) {
    const resetUrl = `${APP_URL}/reset-password?token=${token}`
    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: 'Passwort zurücksetzen — AuditAI',
        text: `Hallo ${name},\n\ndu hast angefordert, dein Passwort zurückzusetzen.\n\nKlicke auf diesen Link (gültig für 1 Stunde):\n${resetUrl}\n\nFalls du das nicht angefordert hast, kannst du diese E-Mail ignorieren.\n\nDein AuditAI Team`,
        html: passwordResetHtml(name, resetUrl),
    })
}

function passwordResetHtml(name, resetUrl) {
    return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#05080f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05080f;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td align="center" style="padding-bottom:32px;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:12px;width:40px;height:40px;text-align:center;vertical-align:middle;">
              <span style="color:#fff;font-size:18px;font-weight:bold;">&#x26A1;</span>
            </td>
            <td style="padding-left:10px;vertical-align:middle;">
              <span style="color:#ffffff;font-size:20px;font-weight:700;">Audit<span style="color:#22d3ee;">AI</span></span>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="background:#0d1117;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:40px;">
          <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#ffffff;">Passwort zurücksetzen</p>
          <p style="margin:0 0 28px;font-size:15px;color:#94a3b8;line-height:1.6;">
            Hallo ${name}, du hast angefordert, dein Passwort zurückzusetzen. Klicke auf den Button unten &mdash; der Link ist <strong style="color:#ffffff;">1 Stunde gültig</strong>.
          </p>
          <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;"><tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:12px;padding:1px;">
              <a href="${resetUrl}" style="display:block;background:#0d1117;border-radius:11px;padding:14px 32px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">
                Neues Passwort setzen &rarr;
              </a>
            </td>
          </tr></table>
          <table cellpadding="0" cellspacing="0" width="100%" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:16px;margin-bottom:24px;">
            <tr><td>
              <p style="margin:0 0 6px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Falls der Button nicht funktioniert</p>
              <p style="margin:0;font-size:12px;color:#475569;word-break:break-all;">${resetUrl}</p>
            </td></tr>
          </table>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:24px 0;"/>
          <p style="margin:0;font-size:13px;color:#64748b;">Falls du kein neues Passwort angefordert hast, kannst du diese E-Mail ignorieren &mdash; dein Passwort bleibt unverändert.</p>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:24px 0;"/>
          <p style="margin:0;font-size:14px;color:#64748b;">Dein AuditAI Team</p>
        </td></tr>
        <tr><td align="center" style="padding-top:24px;">
          <p style="margin:0;font-size:11px;color:#334155;">Du erhältst diese E-Mail, weil ein Passwort-Reset für deinen Account auf <a href="${APP_URL}" style="color:#475569;text-decoration:none;">sitecheckai.dev</a> angefordert wurde.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function sendSeoRankingAlert({ email, domain, gains, losses, contentGap }) {
    const dashboardUrl = `${APP_URL}/seo/dashboard`
    const hasLosses = losses.length > 0
    const hasGains  = gains.length > 0
    const gapKeywords = contentGap?.gap?.slice(0, 5) || []

    const lossRows = losses.map(({ keyword, from, to }) => `
      <tr>
        <td style="padding:6px 0;font-size:13px;color:#e2e8f0;">${keyword}</td>
        <td style="padding:6px 0;font-size:13px;color:#94a3b8;text-align:center;">#${from}</td>
        <td style="padding:6px 0;font-size:13px;color:#f87171;text-align:center;font-weight:700;">#${to} &darr;</td>
      </tr>`).join('')

    const gainRows = gains.map(({ keyword, from, to }) => `
      <tr>
        <td style="padding:6px 0;font-size:13px;color:#e2e8f0;">${keyword}</td>
        <td style="padding:6px 0;font-size:13px;color:#94a3b8;text-align:center;">${from != null ? `#${from}` : '&mdash;'}</td>
        <td style="padding:6px 0;font-size:13px;color:#34d399;text-align:center;font-weight:700;">#${to} &uarr;</td>
      </tr>`).join('')

    const lossBlock = hasLosses ? `
      <p style="margin:0 0 6px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Verschlechtert</p>
      <table cellpadding="0" cellspacing="0" width="100%" style="background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.15);border-radius:10px;padding:12px 16px;margin-bottom:${hasGains ? '16px' : '0'};">
        <thead><tr>
          <th style="text-align:left;font-size:10px;color:#64748b;padding-bottom:6px;font-weight:600;text-transform:uppercase;">Keyword</th>
          <th style="text-align:center;font-size:10px;color:#64748b;padding-bottom:6px;font-weight:600;text-transform:uppercase;">Vorher</th>
          <th style="text-align:center;font-size:10px;color:#64748b;padding-bottom:6px;font-weight:600;text-transform:uppercase;">Jetzt</th>
        </tr></thead>
        <tbody>${lossRows}</tbody>
      </table>` : ''

    const gainBlock = hasGains ? `
      <p style="margin:0 0 6px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Verbessert</p>
      <table cellpadding="0" cellspacing="0" width="100%" style="background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.15);border-radius:10px;padding:12px 16px;">
        <thead><tr>
          <th style="text-align:left;font-size:10px;color:#64748b;padding-bottom:6px;font-weight:600;text-transform:uppercase;">Keyword</th>
          <th style="text-align:center;font-size:10px;color:#64748b;padding-bottom:6px;font-weight:600;text-transform:uppercase;">Vorher</th>
          <th style="text-align:center;font-size:10px;color:#64748b;padding-bottom:6px;font-weight:600;text-transform:uppercase;">Jetzt</th>
        </tr></thead>
        <tbody>${gainRows}</tbody>
      </table>` : ''

    const gapRows = gapKeywords.map(({ keyword, searchVolume }) => `
      <tr>
        <td style="padding:6px 0;font-size:13px;color:#e2e8f0;">${keyword}</td>
        <td style="padding:6px 0;font-size:13px;color:#94a3b8;text-align:right;">${searchVolume != null ? searchVolume.toLocaleString('de-DE') : '—'}</td>
      </tr>`).join('')

    const gapBlock = gapKeywords.length ? `
      <p style="margin:${hasLosses || hasGains ? '20px' : '0'} 0 6px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Diese Keywords rankt ${contentGap.competitorDomain}, du nicht</p>
      <table cellpadding="0" cellspacing="0" width="100%" style="background:rgba(96,165,250,0.05);border:1px solid rgba(96,165,250,0.15);border-radius:10px;padding:12px 16px;">
        <thead><tr>
          <th style="text-align:left;font-size:10px;color:#64748b;padding-bottom:6px;font-weight:600;text-transform:uppercase;">Keyword</th>
          <th style="text-align:right;font-size:10px;color:#64748b;padding-bottom:6px;font-weight:600;text-transform:uppercase;">Suchvolumen</th>
        </tr></thead>
        <tbody>${gapRows}</tbody>
      </table>` : ''

    const headline = hasLosses && hasGains
        ? `Gemischte Ranking-Signale für ${domain}`
        : hasLosses
            ? `Ranking-Verluste bei ${domain}`
            : `Neue Top-Positionen bei ${domain}`

    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: hasLosses
            ? `Achtung: Ranking-Änderungen bei ${domain}`
            : `Gute Nachrichten: Ranking-Verbesserungen bei ${domain}`,
        html: `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#05080f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05080f;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td align="center" style="padding-bottom:32px;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="background:linear-gradient(135deg,#059669,#0d9488);border-radius:12px;width:40px;height:40px;text-align:center;vertical-align:middle;">
              <span style="color:#fff;font-size:18px;font-weight:bold;">&#x26A1;</span>
            </td>
            <td style="padding-left:10px;vertical-align:middle;">
              <span style="color:#ffffff;font-size:20px;font-weight:700;">Audit<span style="color:#34d399;">AI</span></span>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="background:#0d1117;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:36px 40px;">
          <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;">SEO Ranking-Alert</p>
          <p style="margin:0 0 6px;font-size:22px;font-weight:700;color:#ffffff;">${headline}</p>
          <p style="margin:0 0 28px;font-size:14px;color:#64748b;">${domain} &middot; Wöchentlicher Check</p>
          <div style="margin-bottom:24px;">
            ${lossBlock}
            ${gainBlock}
            ${gapBlock}
          </div>
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="background:linear-gradient(135deg,#059669,#0d9488);border-radius:12px;padding:1px;">
              <a href="${dashboardUrl}" style="display:block;background:#0d1117;border-radius:11px;padding:12px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                Rankings ansehen &rarr;
              </a>
            </td>
          </tr></table>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:28px 0;"/>
          <p style="margin:0;font-size:13px;color:#64748b;">Dein AuditAI SEO-Automatisierung</p>
        </td></tr>
        <tr><td align="center" style="padding-top:24px;">
          <p style="margin:0;font-size:11px;color:#334155;">Diese E-Mail wurde automatisch von deinem wöchentlichen SEO-Check ausgelöst.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    })
}

export async function sendWaitlistConfirmation(to) {
    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        subject: 'SiteCheckAI Extension — Du bist dabei!',
        text: waitlistText,
        html: waitlistHtml,
    });
}

const waitlistText = `
Hallo!

Vielen Dank, dass du dich für die SiteCheckAI Chrome Extension vorgemerkt hast.

Wir freuen uns sehr über dein Interesse! Sobald die Extension im Chrome Web Store verfügbar ist, bist du als Erstes dabei — wir schicken dir sofort eine Benachrichtigung.

Was dich erwartet:
- Klick durch deine Website aufnehmen — ganz ohne Code
- Automatisierte Playwright-Tests starten mit einem Klick
- Schritte als CSV exportieren und anpassen
- Jede Regression sofort erkennen — vor deinen Nutzern

Wir arbeiten mit Hochdruck daran und freuen uns, dich bald an Bord zu haben.

Bis bald,
Dein SiteCheckAI Team

---
Du erhältst diese E-Mail, weil du dich auf sitecheckai.dev für die Warteliste eingetragen hast.
`.trim()

const waitlistHtml = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#05080f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05080f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:12px;width:40px;height:40px;text-align:center;vertical-align:middle;">
                    <span style="color:#fff;font-size:18px;font-weight:bold;">&#x26A1;</span>
                  </td>
                  <td style="padding-left:10px;vertical-align:middle;">
                    <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.5px;">Audit<span style="color:#22d3ee;">AI</span></span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#0d1117;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:40px 40px 32px;">

              <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#ffffff;line-height:1.3;">
                Du bist auf der Liste! &#x1F389;
              </p>
              <p style="margin:0 0 28px;font-size:15px;color:#94a3b8;line-height:1.6;">
                Vielen Dank, dass du dich für die <strong style="color:#a5b4fc;">SiteCheckAI Chrome Extension</strong> vorgemerkt hast. Wir freuen uns sehr über dein Interesse!
              </p>

              <p style="margin:0 0 24px;font-size:15px;color:#94a3b8;line-height:1.6;">
                Sobald die Extension im <strong style="color:#ffffff;">Chrome Web Store</strong> verfügbar ist, bist du als Erstes dabei &mdash; du erhältst sofort eine Benachrichtigung von uns.
              </p>

              <p style="margin:0 0 12px;font-size:13px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Was dich erwartet</p>

              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:12px;">
                <tr>
                  <td width="36" valign="top" style="padding-top:2px;">
                    <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:8px;width:28px;height:28px;text-align:center;line-height:28px;font-size:14px;">&#x1F3AC;</div>
                  </td>
                  <td style="padding-left:12px;vertical-align:top;">
                    <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#e2e8f0;">Klick-Aufnahme ohne Code</p>
                    <p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">Klick einfach durch deine Website &mdash; jede Interaktion wird automatisch aufgezeichnet.</p>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:12px;">
                <tr>
                  <td width="36" valign="top" style="padding-top:2px;">
                    <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:8px;width:28px;height:28px;text-align:center;line-height:28px;font-size:14px;">&#x25B6;</div>
                  </td>
                  <td style="padding-left:12px;vertical-align:top;">
                    <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#e2e8f0;">Automatisierte Tests mit einem Klick</p>
                    <p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">Playwright spielt deinen Flow exakt nach und zeigt dir sofort was bricht.</p>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:12px;">
                <tr>
                  <td width="36" valign="top" style="padding-top:2px;">
                    <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:8px;width:28px;height:28px;text-align:center;line-height:28px;font-size:14px;">&#x1F504;</div>
                  </td>
                  <td style="padding-left:12px;vertical-align:top;">
                    <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#e2e8f0;">CSV-Export für volle Kontrolle</p>
                    <p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">Exportiere alle Schritte als lesbare CSV-Datei und passe sie beliebig an.</p>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
                <tr>
                  <td width="36" valign="top" style="padding-top:2px;">
                    <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:8px;width:28px;height:28px;text-align:center;line-height:28px;font-size:14px;">&#x1F6E1;</div>
                  </td>
                  <td style="padding-left:12px;vertical-align:top;">
                    <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#e2e8f0;">Regressions-Schutz nach jedem Deploy</p>
                    <p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">Kein manuelles Durchklicken mehr &mdash; der Test läuft automatisch nach jedem Deploy.</p>
                  </td>
                </tr>
              </table>

              <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:0 0 28px;" />

              <p style="margin:0 0 4px;font-size:15px;color:#94a3b8;line-height:1.6;">
                Wir arbeiten mit Hochdruck daran und freuen uns, dich bald an Bord zu haben.
              </p>
              <p style="margin:0;font-size:15px;color:#94a3b8;">
                Bis bald,<br />
                <strong style="color:#ffffff;">Dein SiteCheckAI Team</strong>
              </p>

            </td>
          </tr>

          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;font-size:11px;color:#334155;line-height:1.6;">
                Du erhältst diese E-Mail, weil du dich auf
                <a href="https://sitecheckai.dev" style="color:#475569;text-decoration:none;">sitecheckai.dev</a>
                für die Warteliste eingetragen hast.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim()