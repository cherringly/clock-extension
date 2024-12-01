import { switchDomain, startTracking } from '../utils/timer.js';

// Handle tab changes
chrome.tabs.onActivated.addListener(async () => {
  const [activeTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (activeTab && activeTab.url) {
    const url = new URL(activeTab.url);
    const domain = url.hostname;
    await switchDomain(domain);
  }
});

// Handle tab URL updates
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.url) {
    const url = new URL(changeInfo.url);
    const domain = url.hostname;
    await switchDomain(domain);
  }
});

// Start tracking on extension startup
chrome.runtime.onStartup.addListener(() => {
  startTracking();
});

chrome.runtime.onInstalled.addListener(() => {
  startTracking();
});
