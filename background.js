let currentDomain = null;
let timers = {}; // Stores time spent for each domain
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await handleTabUpdate();
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    await handleTabUpdate();
  }
});

async function handleTabUpdate() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tabs[0] || !tabs[0].url) return;

  const url = new URL(tabs[0].url);
  const domain = url.hostname;

  if (currentDomain && currentDomain !== domain) {
    updateTimeForDomain(currentDomain); // Pause the current domain's timer
  }

  if (!timers[domain]) {
    timers[domain] = 0; // Initialize timer for the new domain
  }

  currentDomain = domain;
  startTime = Date.now(); // Start timing the new domain
}

function updateTimeForDomain(domain) {
  if (!timers[domain] || !startTime) return;
  const timeSpent = Math.floor((Date.now() - startTime) / 1000);
  timers[domain] += timeSpent;
  startTime = null;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getTimers') {
    updateTimeForDomain(currentDomain);
    sendResponse(timers);
  }
});
