import { startTracking, switchDomain } from '../utils/timer.js';

// Listen for active tab changes
chrome.tabs.onActivated.addListener(async () => {
  const [activeTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (activeTab && activeTab.url) {
    const url = new URL(activeTab.url);
    const domain = url.hostname;
    await switchDomain(domain);
  }
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.url) {
    const url = new URL(changeInfo.url);
    const domain = url.hostname;
    await switchDomain(domain);
  }
});

// Initialize tracking when the extension is installed or Chrome starts
chrome.runtime.onStartup.addListener(() => {
  startTracking();
});

chrome.runtime.onInstalled.addListener(() => {
  startTracking();
});
