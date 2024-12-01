let activeTabId = null;
let timers = {};
let intervalId = null;

// Listen for tab activation
chrome.tabs.onActivated.addListener(updateActiveTab);

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) updateActiveTab();
});

// Update the currently active tab and its domain
function updateActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs.length) return;

    const tab = tabs[0];
    const url = new URL(tab.url || ''); // Extract domain
    const domain = url.hostname;

    // Stop tracking the previous tab
    if (activeTabId !== null && activeTabId !== tab.id) {
      clearInterval(intervalId);
    }

    activeTabId = tab.id;

    // Start tracking the new tab's domain
    if (!timers[domain]) timers[domain] = 0;

    startTimer(domain, tab.id);
  });
}

// Start or continue tracking a domain
function startTimer(domain, tabId) {
  intervalId = setInterval(() => {
    timers[domain] += 1;

    // Save timers and send updates to the active tab
    chrome.storage.local.set({ timers });
    chrome.tabs.sendMessage(tabId, { action: 'update_timer', timers });
  }, 1000);
}
