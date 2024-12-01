import { getStorage, setStorage } from './storage.js';

let activeDomain = null; // Currently active domain
let timer = null;        // Timer interval

// Get all tracked times
export async function getTrackedTimes() {
  return (await getStorage('trackedTimes')) || {};
}

// Get the active domain
export async function getActiveDomain() {
  const trackedTimes = await getTrackedTimes();
  return {
    domain: activeDomain,
    time: trackedTimes[activeDomain]?.time || 0,
  };
}

// Switch to a new domain and start tracking
export async function switchDomain(domain) {
  const trackedTimes = await getTrackedTimes();

  // Stop tracking the current domain
  if (activeDomain && timer) {
    clearInterval(timer);
    const elapsedTime = (Date.now() - trackedTimes[activeDomain]?.startTime) / 1000;
    trackedTimes[activeDomain].time += Math.floor(elapsedTime);
    delete trackedTimes[activeDomain].startTime;
  }

  // Start tracking the new domain
  activeDomain = domain;
  if (!trackedTimes[domain]) {
    trackedTimes[domain] = { time: 0 };
  }
  trackedTimes[domain].startTime = Date.now();

  // Persist changes
  await setStorage('trackedTimes', trackedTimes);

  // Start the timer
  startTracking();
}

// Start tracking the active domain
export function startTracking() {
  if (activeDomain) {
    timer = setInterval(async () => {
      const trackedTimes = await getTrackedTimes();
      const elapsedTime = (Date.now() - trackedTimes[activeDomain]?.startTime) / 1000;
      trackedTimes[activeDomain].time = Math.floor(elapsedTime);
      await setStorage('trackedTimes', trackedTimes);
    }, 1000);
  }
}

// Pause tracking
export function pauseTracking() {
  clearInterval(timer);
  timer = null;
}
