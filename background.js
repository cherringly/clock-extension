let activeDomain = null;
let timers = {};
let intervalId = null;

chrome.tabs.onActivated.addListener(() => updateActiveDomain());
chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    updateActiveDomain();
  }
});

function updateActiveDomain() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = new URL(tabs[0]?.url || '');
    const domain = url.hostname;

    if (activeDomain !== domain) {
      if (activeDomain) clearInterval(intervalId); // Pause the previous domain timer

      activeDomain = domain;
      if (!timers[domain]) timers[domain] = 0;

      startTimer(domain);
    }
  });
}

function startTimer(domain) {
  intervalId = setInterval(() => {
    timers[domain] += 1;
    chrome.storage.local.set({ timers });
  }, 1000); // Increment every second
}
