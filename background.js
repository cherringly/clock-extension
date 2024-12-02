let activeTabId = null;
let activeDomain = null;
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
    const url = new URL(tab.url || '');
    const domain = url.hostname;

    // If the domain hasn't changed, no need to restart the timer
    if (activeDomain === domain) return;

    // Stop the previous timer
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }

    activeTabId = tab.id;
    activeDomain = domain;

    // Start tracking the new domain
    if (!timers[domain]) timers[domain] = 0;

    startTimer(domain);
  });
}

// Start or continue tracking a domain
function startTimer(domain) {
  intervalId = setInterval(() => {
    timers[domain] += 1;

    // Save timers and send updates to the active tab
    chrome.storage.local.set({ timers });
    if (activeTabId !== null) {
      chrome.tabs.sendMessage(activeTabId, { action: 'update_timer', timers });
    }
  }, 1000); // Increment every second
}
