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

    const time = timers[domain];
    const color = getColorBasedOnTime(time);

    chrome.tabs.sendMessage(tabId, { action: 'update_timer', time, color });
  }, 1000);
}

// Determine the color based on time spent
function getColorBasedOnTime(time) {
  if (time < 10) return '#109444'; // 0-10 mins
  if (time < 15) return '#80bc44'; // 10-20 mins
  if (time < 20) return '#ffcc0c'; // 20-30 mins
  if (time < 25) return '#f48c1c'; // 30-40 mins
  if (time < 30) return '#ef4623'; // 40-50 mins
  return '#bc2026'; // 50-60+ mins
}
