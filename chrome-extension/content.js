// Content Script — läuft auf jeder Seite, zeichnet Interaktionen auf

// ─── Selektor-Logik ──────────────────────────────────────────────────────────

function getSelector(el) {
  // 1. data-testid
  if (el.dataset?.testid)
    return { sel: `[data-testid="${el.dataset.testid}"]`, type: 'testid' };

  // 2. aria-label
  const ariaLabel = el.getAttribute('aria-label');
  if (ariaLabel)
    return { sel: `[aria-label="${ariaLabel}"]`, type: 'aria' };

  // 3. data-cy (Cypress convention)
  if (el.dataset?.cy)
    return { sel: `[data-cy="${el.dataset.cy}"]`, type: 'cy' };

  // 4. id
  if (el.id)
    return { sel: `#${CSS.escape(el.id)}`, type: 'id' };

  // 5. name attribute (inputs, selects)
  const name = el.getAttribute('name');
  if (name)
    return { sel: `[name="${name}"]`, type: 'name' };

  // 6. role + text (buttons)
  const role = el.getAttribute('role');
  const text = el.innerText?.trim().slice(0, 40);
  if (role && text)
    return { sel: `[role="${role}"]`, type: 'role' };

  // 7. CSS-Pfad (max. 4 Ebenen)
  const css = getCSSPath(el);
  if (css) return { sel: css, type: 'css' };

  // 8. XPath-Fallback
  return { sel: getXPath(el), type: 'xpath' };
}

function getCSSPath(el) {
  const parts = [];
  let node = el;
  while (node && node.nodeType === Node.ELEMENT_NODE && node !== document.body) {
    let part = node.tagName.toLowerCase();
    const classes = Array.from(node.classList)
      .filter(c => !/^(hover|focus|active|js-|is-|has-)/.test(c))
      .slice(0, 2);
    if (classes.length) part += '.' + classes.map(CSS.escape).join('.');
    const siblings = node.parentElement
      ? Array.from(node.parentElement.children).filter(s => s.tagName === node.tagName)
      : [];
    if (siblings.length > 1) part += `:nth-of-type(${siblings.indexOf(node) + 1})`;
    parts.unshift(part);
    node = node.parentElement;
    if (parts.length >= 4) break;
  }
  return parts.join(' > ');
}

function getXPath(el) {
  const parts = [];
  let node = el;
  while (node && node.nodeType === Node.ELEMENT_NODE) {
    let idx = 1;
    let sib = node.previousSibling;
    while (sib) {
      if (sib.nodeType === Node.ELEMENT_NODE && sib.tagName === node.tagName) idx++;
      sib = sib.previousSibling;
    }
    parts.unshift(`${node.tagName.toLowerCase()}[${idx}]`);
    node = node.parentElement;
  }
  return '/' + parts.join('/');
}

// ─── State & Kommunikation ───────────────────────────────────────────────────

let recording = false;

async function syncState() {
  const state = await chrome.runtime.sendMessage({ type: 'GET_STATE' });
  recording = state?.recording ?? false;
  return state;
}

function addStep(step) {
  if (!recording) return;
  chrome.runtime.sendMessage({ type: 'ADD_STEP', step }).catch(() => {});
}

// ─── Event Handler ───────────────────────────────────────────────────────────

function handleClick(e) {
  if (!recording) return;
  const el = e.target.closest('a, button, [role="button"], input[type="submit"], input[type="checkbox"], input[type="radio"], label, select') || e.target;
  if (!el || el === document.body) return;

  const { sel, type } = getSelector(el);
  addStep({
    action: 'click',
    selector: sel,
    selectorType: type,
    value: '',
    url: location.href,
    timestamp: new Date().toISOString(),
    optional: false,
    meta: el.innerText?.trim().slice(0, 60) || el.getAttribute('placeholder') || '',
  });
}

function handleChange(e) {
  if (!recording) return;
  const el = e.target;
  if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)) return;
  if (el.type === 'submit' || el.type === 'button') return;
  if (el.type === 'password') return; // Passwörter nie aufzeichnen

  const { sel, type } = getSelector(el);
  const value = el.type === 'checkbox' ? String(el.checked) : el.value;

  addStep({
    action: el.tagName === 'SELECT' ? 'select' : 'input',
    selector: sel,
    selectorType: type,
    value,
    url: location.href,
    timestamp: new Date().toISOString(),
    optional: false,
    meta: el.placeholder || el.name || '',
  });
}

function recordNavigate() {
  if (!recording) return;
  addStep({
    action: 'navigate',
    selector: '',
    selectorType: '',
    value: location.href,
    url: location.href,
    timestamp: new Date().toISOString(),
    optional: false,
    meta: document.title,
  });
}

// SPA-Navigation (History API patchen)
const _pushState = history.pushState.bind(history);
const _replaceState = history.replaceState.bind(history);
history.pushState = function (...args) {
  _pushState(...args);
  recordNavigate();
};
history.replaceState = function (...args) {
  _replaceState(...args);
};
window.addEventListener('popstate', recordNavigate);

// ─── Listener an/abmelden ───────────────────────────────────────────────────

function startListeners() {
  document.addEventListener('click', handleClick, true);
  document.addEventListener('change', handleChange, true);
}

function stopListeners() {
  document.removeEventListener('click', handleClick, true);
  document.removeEventListener('change', handleChange, true);
}

// ─── Nachrichten vom Popup/Background ───────────────────────────────────────

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === 'START_RECORDING') {
    recording = true;
    startListeners();
    recordNavigate(); // erste Seite festhalten
    sendResponse({ ok: true });
  } else if (msg.type === 'STOP_RECORDING') {
    recording = false;
    stopListeners();
    sendResponse({ ok: true });
  } else if (msg.type === 'PING') {
    sendResponse({ ok: true });
  }
  return true;
});

// ─── Auth: sitecheckai.dev/extension-auth sendet Token via postMessage ────────

window.addEventListener('message', (e) => {
  if (e.data?.type !== 'SITECHECK_EXT_AUTH') return;
  if (!e.data.token) return;
  chrome.runtime.sendMessage({
    type: 'AUTH_TOKEN',
    token: e.data.token,
    email: e.data.email || '',
  }).catch(() => {});
});

// ─── Init: Zustand aus Storage laden (nach Seitennavigation) ─────────────────

(async () => {
  const state = await syncState();
  if (state?.recording) {
    startListeners();
    recordNavigate(); // Navigation festhalten
  }
})();