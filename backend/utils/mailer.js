import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendWaitlistConfirmation(to) {
    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        subject: 'SiteCheckAI Extension – Du bist dabei! 🎉',
        text: waitlistText,
        html: waitlistHtml,
    });
}

const waitlistText = `
Hallo!

Vielen Dank, dass du dich für die SiteCheckAI Chrome Extension vorgemerkt hast.

Wir freuen uns sehr über dein Interesse! Sobald die Extension im Chrome Web Store verfügbar ist, bist du als Erstes dabei – wir schicken dir sofort eine Benachrichtigung.

Was dich erwartet:
- Klick durch deine Website aufnehmen – ganz ohne Code
- Automatisierte Playwright-Tests starten mit einem Klick
- Schritte als CSV exportieren und anpassen
- Jede Regression sofort erkennen – vor deinen Nutzern

Wir arbeiten mit Hochdruck daran und freuen uns, dich bald an Bord zu haben.

Bis bald,
Dein SiteCheckAI Team

---
Du erhältst diese E-Mail, weil du dich auf sitecheckai.dev für die Warteliste eingetragen hast.
`.trim();

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

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:12px;width:40px;height:40px;text-align:center;vertical-align:middle;">
                    <span style="color:#fff;font-size:18px;font-weight:bold;">⚡</span>
                  </td>
                  <td style="padding-left:10px;vertical-align:middle;">
                    <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.5px;">Audit<span style="color:#22d3ee;">AI</span></span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#0d1117;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:40px 40px 32px;">

              <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#ffffff;line-height:1.3;">
                Du bist auf der Liste! 🎉
              </p>
              <p style="margin:0 0 28px;font-size:15px;color:#94a3b8;line-height:1.6;">
                Vielen Dank, dass du dich für die <strong style="color:#a5b4fc;">SiteCheckAI Chrome Extension</strong> vorgemerkt hast. Wir freuen uns sehr über dein Interesse!
              </p>

              <p style="margin:0 0 24px;font-size:15px;color:#94a3b8;line-height:1.6;">
                Sobald die Extension im <strong style="color:#ffffff;">Chrome Web Store</strong> verfügbar ist, bist du als Erstes dabei – du erhältst sofort eine Benachrichtigung von uns.
              </p>

              <p style="margin:0 0 12px;font-size:13px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Was dich erwartet</p>

              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:12px;">
                <tr>
                  <td width="36" valign="top" style="padding-top:2px;">
                    <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:8px;width:28px;height:28px;text-align:center;line-height:28px;font-size:14px;">🎬</div>
                  </td>
                  <td style="padding-left:12px;vertical-align:top;">
                    <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#e2e8f0;">Klick-Aufnahme ohne Code</p>
                    <p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">Klick einfach durch deine Website – jede Interaktion wird automatisch aufgezeichnet.</p>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:12px;">
                <tr>
                  <td width="36" valign="top" style="padding-top:2px;">
                    <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:8px;width:28px;height:28px;text-align:center;line-height:28px;font-size:14px;">▶️</div>
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
                    <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:8px;width:28px;height:28px;text-align:center;line-height:28px;font-size:14px;">📄</div>
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
                    <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:8px;width:28px;height:28px;text-align:center;line-height:28px;font-size:14px;">🛡️</div>
                  </td>
                  <td style="padding-left:12px;vertical-align:top;">
                    <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#e2e8f0;">Regressions-Schutz nach jedem Deploy</p>
                    <p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">Kein manuelles Durchklicken mehr – der Test läuft automatisch nach jedem Deploy.</p>
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

          <!-- Footer -->
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
`.trim();
