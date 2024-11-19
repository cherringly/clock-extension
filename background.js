let currentDomain = null;
let timers = {}; // Stores time spent for each domain
let startTime = null;

chrome.tabs.onActivated.addListener(() => handleTabUpdate());
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') handleTabUpdate();
});

function handleTabUpdate() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0] || !tabs[0].url) return;

    const url = new URL(tabs[0].url);
    const domain = url.hostname;

    if (currentDomain && currentDomain !== domain) {
      updateTimeForDomain(currentDomain);
    }

    if (!timers[domain]) {
      timers[domain] = 0; // Initialize time for the new domain
    }

    currentDomain = domain;
    startTime = Date.now(); // Start timing for the new domain
  });
}

function updateTimeForDomain(domain) {
  if (!timers[domain] || !startTime) return;
  const timeSpent = Math.floor((Date.now() - startTime) / 1000);
  timers[domain] += timeSpent;
  startTime = null;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getTimers') {
    if (currentDomain) updateTimeForDomain(currentDomain); // Update the current domain's time
    sendResponse(timers);
  }
});
