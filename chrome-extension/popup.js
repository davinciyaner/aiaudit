const SITE_URL   = 'https://sitecheckai.dev';
const API_BASE   = 'https://api.sitecheckai.dev';
const AUTH_PAGE  = `${SITE_URL}/extension-auth`;

// ─── DOM Refs ────────────────────────────────────────────────────────────────

const viewLogin   = document.getElementById('view-login');
const viewMain    = document.getElementById('view-main');
const viewLoading = document.getElementById('view-loading');

const statusBadge    = document.getElementById('status-badge');
const userEmail      = document.getElementById('user-email');
const btnConnect     = document.getElementById('btn-connect');
const btnLogout      = document.getElementById('btn-logout');
const btnRecord      = document.getElementById('btn-record');
const btnLabel       = document.getElementById('btn-label');
const recordIcon     = document.getElementById('record-icon');
const btnClear       = document.getElementById('btn-clear');
const btnCsv         = document.getElementById('btn-csv');
const btnUpload      = document.getElementById('btn-upload');
const stepCount      = document.getElementById('step-count');
const stepsList      = document.getElementById('steps-list');
const stepsContainer = document.getElementById('steps-container');
const emptyState     = document.getElementById('empty-state');
const urlHint        = document.getElementById('url-hint');
const uploadStatus   = document.getElementById('upload-status');

// ─── View-Switcher ────────────────────────────────────────────────────────────

function showView(name) {
  viewLogin.classList.add('hidden');
  viewMain.classList.add('hidden');
  viewLoading.classList.add('hidden');
  document.getElementById(`view-${name}`).classList.remove('hidden');
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function stepsToCSV(steps) {
  const header = 'step,action,selector,selectorType,value,url,timestamp';
  const rows = steps.map(s => [
    s.step,
    s.action,
    `"${(s.selector || '').replace(/"/g, '""')}"`,
    s.selectorType || '',
    `"${(s.value || '').replace(/"/g, '""')}"`,
    `"${(s.url || '').replace(/"/g, '""')}"`,
    s.timestamp,
  ].join(','));
  return [header, ...rows].join('\n');
}

function downloadCSV(steps) {
  const blob = new Blob([stepsToCSV(steps)], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `sitecheck-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function setStatus(text, cls = '') {
  uploadStatus.textContent = text;
  uploadStatus.className   = `upload-status${cls ? ' ' + cls : ''}`;
  uploadStatus.classList.remove('hidden');
}

function renderSteps(steps) {
  stepsList.innerHTML = '';
  steps.forEach(s => {
    const li      = document.createElement('li');
    li.className  = 'step-item';
    const display = s.action === 'navigate' ? (s.value || s.url) : (s.selector || '');
    const val     = (s.action === 'input' || s.action === 'select') ? s.value : '';
    li.innerHTML  = `
      <span class="step-num">${s.step}</span>
      <span class="step-action step-action--${s.action}">${s.action}</span>
      <span class="step-sel" title="${display}">${display}</span>
      ${val ? `<span class="step-val" title="${val}">${val}</span>` : ''}
    `;
    stepsList.appendChild(li);
  });
  stepsList.scrollTop = stepsList.scrollHeight;
}

function updateMainUI(state, steps) {
  const rec = state?.recording ?? false;

  // Badge
  statusBadge.textContent = rec ? 'Aufnahme' : steps.length ? 'Fertig' : 'Bereit';
  statusBadge.className   = 'badge ' + (rec ? 'badge--active' : steps.length ? 'badge--done' : 'badge--idle');

  // Record-Button
  btnLabel.textContent = rec ? 'Stoppen' : 'Aufnahme starten';
  recordIcon.textContent = rec ? '⏹' : '⏺';
  btnRecord.classList.toggle('recording', rec);

  // Schritte
  if (steps.length > 0) {
    stepsContainer.classList.remove('hidden');
    emptyState.classList.add('hidden');
    stepCount.textContent = steps.length;
    if (state.startUrl) {
      try { urlHint.textContent = new URL(state.startUrl).hostname; } catch {}
    }
    renderSteps(steps);
  } else {
    stepsContainer.classList.add('hidden');
    emptyState.classList.remove('hidden');
  }

  // Export-Buttons
  const hasSteps = steps.length > 0 && !rec;
  btnCsv.disabled    = !hasSteps;
  btnUpload.disabled = !hasSteps;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

async function getAuth() {
  return chrome.runtime.sendMessage({ type: 'GET_AUTH' });
}

async function init() {
  showView('loading');
  const auth = await getAuth();

  if (auth?.jwt) {
    userEmail.textContent = auth.email || 'Verbunden';
    showView('main');
    await refreshMain();
  } else {
    showView('login');
  }
}

// ─── Verbinden ────────────────────────────────────────────────────────────────

btnConnect.addEventListener('click', () => {
  chrome.tabs.create({ url: AUTH_PAGE });
  window.close();
});

btnLogout.addEventListener('click', async () => {
  await chrome.runtime.sendMessage({ type: 'LOGOUT' });
  await chrome.runtime.sendMessage({ type: 'CLEAR' });
  showView('login');
});

// ─── Aufnahme ─────────────────────────────────────────────────────────────────

async function refreshMain() {
  const state = await chrome.runtime.sendMessage({ type: 'GET_STATE' });
  updateMainUI(state, state?.steps || []);
}

btnRecord.addEventListener('click', async () => {
  const state = await chrome.runtime.sendMessage({ type: 'GET_STATE' });
  uploadStatus.classList.add('hidden');

  if (state.recording) {
    await chrome.runtime.sendMessage({ type: 'STOP_RECORDING' });
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) await chrome.tabs.sendMessage(tab.id, { type: 'STOP_RECORDING' }).catch(() => {});
  } else {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.runtime.sendMessage({ type: 'START_RECORDING', startUrl: tab?.url || '' });
    if (tab?.id) await chrome.tabs.sendMessage(tab.id, { type: 'START_RECORDING' }).catch(() => {});
  }

  await refreshMain();
});

btnClear.addEventListener('click', async () => {
  await chrome.runtime.sendMessage({ type: 'CLEAR' });
  uploadStatus.classList.add('hidden');
  await refreshMain();
});

// ─── Export ───────────────────────────────────────────────────────────────────

btnCsv.addEventListener('click', async () => {
  const state = await chrome.runtime.sendMessage({ type: 'GET_STATE' });
  downloadCSV(state?.steps || []);
});

// ─── Upload zu sitecheckai.dev ────────────────────────────────────────────────

btnUpload.addEventListener('click', async () => {
  const auth  = await getAuth();
  const state = await chrome.runtime.sendMessage({ type: 'GET_STATE' });
  const steps = state?.steps || [];

  if (!steps.length) return;

  btnUpload.disabled = true;
  setStatus('Wird hochgeladen…', 'loading');

  try {
    const csv  = stepsToCSV(steps);
    const name = `Aufnahme ${new Date().toLocaleDateString('de-DE')} ${new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`;

    const res = await fetch(`${API_BASE}/api/tests/run`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${auth.jwt}`,
      },
      body: JSON.stringify({ csv, name }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }

    const result = await res.json();
    setStatus(`✓ Test gestartet — ${result.total} Schritte werden ausgeführt`, 'success');

    // Ergebnis-Seite nach 3s öffnen
    setTimeout(() => {
      chrome.tabs.create({ url: `${SITE_URL}/tests/${result.id}` });
    }, 3000);

  } catch (err) {
    setStatus(`✗ ${err.message}`, 'error');
  } finally {
    btnUpload.disabled = false;
  }
});

// ─── Polling während Aufnahme ─────────────────────────────────────────────────

setInterval(async () => {
  const state = await chrome.runtime.sendMessage({ type: 'GET_STATE' }).catch(() => null);
  if (state?.recording) updateMainUI(state, state.steps || []);
}, 800);

// ─── Start ────────────────────────────────────────────────────────────────────

init();