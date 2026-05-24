import { chromium } from 'playwright';
import TestResult from '../models/test_result.js';

// ─── CSV Parser ──────────────────────────────────────────────────────────────

function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) throw new Error('CSV hat keine Schritte');

  const header = lines[0].split(',').map(h => h.trim());
  const requiredCols = ['action', 'selector', 'value', 'url'];
  for (const col of requiredCols) {
    if (!header.includes(col)) throw new Error(`CSV fehlt Spalte: ${col}`);
  }

  return lines.slice(1).map((line, i) => {
    const values = parseCSVLine(line);
    const row = {};
    header.forEach((h, idx) => { row[h] = values[idx]?.trim() ?? ''; });
    row.step = parseInt(row.step) || i + 1;
    return row;
  }).filter(r => r.action);
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

// ─── Playwright Executor ─────────────────────────────────────────────────────

async function executeStep(page, step) {
  const start = Date.now();
  const result = { ...step, result: 'pass', error: null, screenshot: null, duration: 0 };

  try {
    switch (step.action) {
      case 'navigate': {
        const target = step.value || step.url;
        if (!target) throw new Error('Kein URL für navigate');
        await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 15000 });
        break;
      }
      case 'click': {
        if (!step.selector) throw new Error('Kein Selektor für click');
        const locator = resolveLocator(page, step);
        await locator.waitFor({ state: 'visible', timeout: 8000 });
        await locator.click({ timeout: 8000 });
        break;
      }
      case 'input': {
        if (!step.selector) throw new Error('Kein Selektor für input');
        const locator = resolveLocator(page, step);
        await locator.waitFor({ state: 'visible', timeout: 8000 });
        await locator.fill(step.value ?? '', { timeout: 8000 });
        break;
      }
      case 'select': {
        if (!step.selector) throw new Error('Kein Selektor für select');
        const locator = resolveLocator(page, step);
        await locator.selectOption(step.value ?? '', { timeout: 8000 });
        break;
      }
      default:
        throw new Error(`Unbekannte Action: ${step.action}`);
    }
  } catch (err) {
    result.result = 'fail';
    result.error = err.message;
    // Screenshot bei Fehler
    try {
      const buf = await page.screenshot({ type: 'png', timeout: 5000 });
      result.screenshot = buf.toString('base64');
    } catch {}
  }

  result.duration = Date.now() - start;
  return result;
}

function resolveLocator(page, step) {
  const sel = step.selector;
  if (step.selectorType === 'xpath') return page.locator(`xpath=${sel}`);
  return page.locator(sel);
}

// ─── Haupt-Runner ─────────────────────────────────────────────────────────────

export async function runTest(req, res) {
  const { csv, name } = req.body;
  if (!csv) return res.status(400).json({ error: 'CSV fehlt' });

  let steps;
  try {
    steps = parseCSV(csv);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  // Ergebnis-Dokument anlegen
  const doc = await TestResult.create({
    userId: req.userId,
    name: name || `Test ${new Date().toLocaleDateString('de-DE')}`,
    csv,
    status: 'running',
    steps: [],
  });

  res.json({ id: doc._id, message: 'Test gestartet', total: steps.length });

  // Playwright asynchron im Hintergrund ausführen
  (async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    });
    const page = await context.newPage();
    const startTime = Date.now();
    const results = [];

    for (const step of steps) {
      const r = await executeStep(page, step);
      results.push(r);
      // Frühzeitig abbrechen bei kritischen navigate-Fehlern
      if (r.result === 'fail' && step.action === 'navigate') break;
    }

    await browser.close();

    const passed  = results.filter(r => r.result === 'pass').length;
    const failed  = results.filter(r => r.result === 'fail').length;

    await TestResult.findByIdAndUpdate(doc._id, {
      status: 'done',
      steps: results,
      summary: {
        total: results.length,
        passed,
        failed,
        duration: Date.now() - startTime,
      },
    });
  })().catch(async err => {
    console.error('Test-Runner Fehler:', err.message);
    await TestResult.findByIdAndUpdate(doc._id, { status: 'error' });
  });
}

// ─── Ergebnis abrufen ────────────────────────────────────────────────────────

export async function getResult(req, res) {
  const doc = await TestResult.findOne({ _id: req.params.id, userId: req.userId });
  if (!doc) return res.status(404).json({ error: 'Nicht gefunden' });
  res.json(doc);
}

// ─── Liste aller Tests ────────────────────────────────────────────────────────

export async function listResults(req, res) {
  const docs = await TestResult.find({ userId: req.userId })
    .select('name status summary createdAt')
    .sort({ createdAt: -1 })
    .limit(50);
  res.json(docs);
}