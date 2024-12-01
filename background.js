import { activeTabInstance } from './utils/active-tab.js';

const timers = {};
let intervalId;

chrome.tabs.onActivated.addListener(() => activeTabInstance.update());
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    activeTabInstance.update();
  }
});

// Start tracking
chrome.runtime.onInstalled.addListener(() => {
  activeTabInstance.update();
  intervalId = setInterval(trackTime, 1000);
});

async function trackTime() {
  await activeTabInstance.update();
  const domain = activeTabInstance.domain;

  if (!domain) return;

  if (!timers[domain]) timers[domain] = 0;
  timers[domain]++;

  chrome.storage.local.set({ timers });
  chrome.tabs.sendMessage(activeTabInstance.tabId, { action: 'update_timer', timers });
}
