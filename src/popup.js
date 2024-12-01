import { getActiveDomain, getTrackedTimes, pauseTracking, startTracking } from '../utils/timer.js';

const domainElement = document.getElementById('domain');
const timerElement = document.getElementById('timer');
const siteListElement = document.getElementById('tracked-sites');

// Update the UI with the current timer
async function updateCurrentSite() {
  const { domain, time } = await getActiveDomain();
  domainElement.textContent = `Current Site: ${domain}`;
  timerElement.textContent = formatTime(time);
}

// Format time in hh:mm:ss
function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return [hrs, mins, secs].map(val => String(val).padStart(2, '0')).join(':');
}

// Update the tracked sites list
async function updateSiteList() {
  const trackedTimes = await getTrackedTimes();
  siteListElement.innerHTML = '';
  for (const [domain, time] of Object.entries(trackedTimes)) {
    const li = document.createElement('li');
    li.textContent = `${domain}: ${formatTime(time)}`;
    siteListElement.appendChild(li);
  }
}

// Initialize the popup
async function initPopup() {
  await updateCurrentSite();
  await updateSiteList();

  // Refresh the data every second
  setInterval(() => {
    updateCurrentSite();
    updateSiteList();
  }, 1000);
}

initPopup();
