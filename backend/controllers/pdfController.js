import { chromium } from 'playwright';
import TestResult from '../models/test_result.js';

function buildHTML(doc) {
  const { name, summary, steps, createdAt } = doc;
  const date = new Date(createdAt).toLocaleDateString('de-DE', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
  const passRate = summary?.total ? Math.round((summary.passed / summary.total) * 100) : 0;
  const statusColor = passRate === 100 ? '#22c55e' : passRate >= 70 ? '#f59e0b' : '#ef4444';

  const stepsHTML = (steps || []).map(s => {
    const icon = s.result === 'pass' ? '✓' : '✗';
    const color = s.result === 'pass' ? '#22c55e' : '#ef4444';
    const screenshotHTML = s.screenshot
      ? `<div class="screenshot"><img src="data:image/png;base64,${s.screenshot}" alt="Screenshot" /></div>`
      : '';
    const errorHTML = s.error
      ? `<div class="step-error">${s.error}</div>`
      : '';

    return `
      <div class="step ${s.result}">
        <div class="step-header">
          <span class="step-icon" style="color:${color}">${icon}</span>
          <span class="step-num">#${s.step}</span>
          <span class="step-badge step-badge--${s.action}">${s.action}</span>
          <span class="step-sel">${s.selector || s.value || s.url || '—'}</span>
          ${s.value && s.action !== 'navigate' ? `<span class="step-val">${s.value}</span>` : ''}
          <span class="step-dur">${s.duration}ms</span>
        </div>
        ${errorHTML}
        ${screenshotHTML}
      </div>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #fff;
    color: #1e293b;
    font-size: 13px;
    padding: 40px 48px;
  }
  .header { margin-bottom: 32px; border-bottom: 2px solid #6366f1; padding-bottom: 20px; }
  .header-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .brand { font-size: 11px; font-weight: 700; color: #6366f1; letter-spacing: 0.1em; text-transform: uppercase; }
  .title { font-size: 22px; font-weight: 700; color: #0f172a; margin: 6px 0 4px; }
  .date  { font-size: 11px; color: #94a3b8; }
  .score {
    font-size: 36px; font-weight: 800; color: ${statusColor};
    line-height: 1;
  }
  .score-label { font-size: 10px; color: #94a3b8; text-align: right; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.05em; }

  .summary {
    display: flex; gap: 16px; margin-bottom: 32px;
  }
  .summary-card {
    flex: 1; background: #f8fafc; border-radius: 10px; padding: 14px 16px;
    border: 1px solid #e2e8f0;
  }
  .summary-card .val { font-size: 24px; font-weight: 700; }
  .summary-card .lbl { font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px; }
  .val--pass { color: #22c55e; }
  .val--fail { color: #ef4444; }
  .val--total { color: #6366f1; }
  .val--dur   { color: #f59e0b; }

  .steps-title { font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px; }

  .step {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin-bottom: 8px;
    overflow: hidden;
  }
  .step.fail { border-color: #fca5a5; }
  .step.pass { border-color: #bbf7d0; }

  .step-header {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 12px;
    background: #f8fafc;
  }
  .step.fail .step-header { background: #fff5f5; }
  .step.pass .step-header { background: #f0fdf4; }

  .step-icon { font-size: 13px; font-weight: 700; }
  .step-num  { font-size: 11px; color: #94a3b8; min-width: 24px; }
  .step-badge {
    font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px;
    text-transform: uppercase; letter-spacing: 0.05em; min-width: 56px; text-align: center;
  }
  .step-badge--click    { background: #dbeafe; color: #1d4ed8; }
  .step-badge--input    { background: #dcfce7; color: #15803d; }
  .step-badge--select   { background: #f3e8ff; color: #7e22ce; }
  .step-badge--navigate { background: #fef3c7; color: #92400e; }
  .step-sel  { flex: 1; font-family: monospace; font-size: 10px; color: #475569; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .step-val  { font-size: 10px; color: #64748b; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; background: #f1f5f9; padding: 1px 6px; border-radius: 4px; }
  .step-dur  { font-size: 10px; color: #94a3b8; min-width: 50px; text-align: right; }

  .step-error {
    padding: 6px 12px;
    background: #fff5f5;
    border-top: 1px solid #fca5a5;
    font-family: monospace;
    font-size: 10px;
    color: #b91c1c;
  }

  .screenshot {
    border-top: 1px solid #e2e8f0;
    padding: 10px 12px;
    background: #f8fafc;
  }
  .screenshot img {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #e2e8f0;
  }

  .footer {
    margin-top: 32px;
    padding-top: 16px;
    border-top: 1px solid #e2e8f0;
    font-size: 10px;
    color: #94a3b8;
    display: flex;
    justify-content: space-between;
  }
</style>
</head>
<body>

<div class="header">
  <div class="header-top">
    <div>
      <div class="brand">SiteCheckAI — Test Report</div>
      <div class="title">${name}</div>
      <div class="date">${date}</div>
    </div>
    <div>
      <div class="score">${passRate}%</div>
      <div class="score-label">Pass Rate</div>
    </div>
  </div>
</div>

<div class="summary">
  <div class="summary-card">
    <div class="val val--total">${summary?.total ?? 0}</div>
    <div class="lbl">Gesamt</div>
  </div>
  <div class="summary-card">
    <div class="val val--pass">${summary?.passed ?? 0}</div>
    <div class="lbl">Bestanden</div>
  </div>
  <div class="summary-card">
    <div class="val val--fail">${summary?.failed ?? 0}</div>
    <div class="lbl">Fehlgeschlagen</div>
  </div>
  <div class="summary-card">
    <div class="val val--dur">${summary?.duration ? (summary.duration / 1000).toFixed(1) + 's' : '—'}</div>
    <div class="lbl">Laufzeit</div>
  </div>
</div>

<div class="steps-title">Schritte</div>
${stepsHTML}

<div class="footer">
  <span>Generiert von SiteCheckAI · sitecheckai.dev</span>
  <span>${new Date().toLocaleDateString('de-DE')}</span>
</div>

</body>
</html>`;
}

export async function generatePDF(req, res) {
  const doc = await TestResult.findOne({ _id: req.params.id, userId: req.userId });
  if (!doc) return res.status(404).json({ error: 'Nicht gefunden' });
  if (doc.status === 'running') return res.status(409).json({ error: 'Test läuft noch' });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.setContent(buildHTML(doc), { waitUntil: 'networkidle' });
    const pdf = await page.pdf({
      format: 'A4',
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      printBackground: true,
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="sitecheck-report-${doc._id}.pdf"`);
    res.send(pdf);
  } finally {
    await browser.close();
  }
}