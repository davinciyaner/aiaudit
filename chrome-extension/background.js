// Service Worker — verwaltet globalen Aufnahme-Zustand

const DEFAULT_STATE = { recording: false, steps: [], startUrl: '' };

async function getState() {
  return new Promise(resolve => {
    chrome.storage.session.get('recorderState', data => {
      resolve(data.recorderState ?? { ...DEFAULT_STATE });
    });
  });
}

async function setState(patch) {
  const current = await getState();
  const next = { ...current, ...patch };
  return new Promise(resolve => {
    chrome.storage.session.set({ recorderState: next }, resolve);
  });
}

async function updateBadge(count) {
  const text = count > 0 ? String(count) : '';
  await chrome.action.setBadgeText({ text });
  await chrome.action.setBadgeBackgroundColor({ color: count > 0 ? '#6366f1' : '#888' });
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  (async () => {
    switch (msg.type) {
      case 'START_RECORDING': {
        await setState({ recording: true, steps: [], startUrl: msg.startUrl });
        await updateBadge(0);
        sendResponse({ ok: true });
        break;
      }
      case 'STOP_RECORDING': {
        const state = await getState();
        await setState({ recording: false });
        await updateBadge(0);
        sendResponse({ steps: state.steps });
        break;
      }
      case 'ADD_STEP': {
        const state = await getState();
        if (!state.recording) { sendResponse({ ok: false }); return; }
        const steps = [...state.steps, { ...msg.step, step: state.steps.length + 1 }];
        await setState({ steps });
        await updateBadge(steps.length);
        sendResponse({ ok: true });
        break;
      }
      case 'GET_STATE': {
        const state = await getState();
        sendResponse(state);
        break;
      }
      case 'AUTH_TOKEN': {
        await chrome.storage.local.set({ jwt: msg.token, email: msg.email });
        // Auth-Tab nach kurzer Verzögerung schließen (Seite zeigt kurz "Verbunden")
        setTimeout(async () => {
          const tabs = await chrome.tabs.query({});
          for (const tab of tabs) {
            if (tab.url?.includes('/extension-auth')) {
              chrome.tabs.remove(tab.id);
            }
          }
        }, 1500);
        sendResponse({ ok: true });
        break;
      }
      case 'GET_AUTH': {
        const data = await new Promise(resolve =>
          chrome.storage.local.get(['jwt', 'email'], resolve)
        );
        sendResponse({ jwt: data.jwt || null, email: data.email || null });
        break;
      }
      case 'LOGOUT': {
        await chrome.storage.local.remove(['jwt', 'email']);
        sendResponse({ ok: true });
        break;
      }
      case 'CLEAR': {
        await setState({ ...DEFAULT_STATE });
        await updateBadge(0);
        sendResponse({ ok: true });
        break;
      }
    }
  })();
  return true; // async response
});