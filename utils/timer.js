import { getStorage, setStorage } from './storage.js';

let activeDomain = null;
let trackedTimes = {};
let timer = null;

// Get the active domain
export async function getActiveDomain() {
  return { domain: activeDomain, time: trackedTimes[activeDomain] || 0 };
}

// Get all tracked times
export async function getTrackedTimes() {
  return trackedTimes;
}

// Switch the active domain and start its timer
export async function switchDomain(domain) {
  if (activeDomain) {
    clearInterval(timer);
    const elapsed = Date.now() - trackedTimes[activeDomain].start;
    trackedTimes[activeDomain].time += Math.floor(elapsed / 1000);
  }

  activeDomain = domain;

  if (!trackedTimes[domain]) {
    trackedTimes[domain] = { time: 0, start: Date.now() };
  } else {
    trackedTimes[domain].start = Date.now();
  }

  startTracking();
}

// Start tracking the current domain
export function startTracking() {
  if (activeDomain) {
    timer = setInterval(() => {
      trackedTimes[activeDomain].time += 1;
    }, 1000);
  }
}

// Pause tracking
export function pauseTracking() {
  clearInterval(timer);
}
