import { formatTime } from './utils/timer-utils.js';

// Create the floating popup
const floatingPopup = document.createElement('div');
floatingPopup.id = 'floating-popup';
floatingPopup.textContent = "Tracking time...";
document.body.appendChild(floatingPopup);

// Style the popup dynamically
Object.assign(floatingPopup.style, {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: '9999',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  color: 'white',
  padding: '10px',
  borderRadius: '8px',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
});

// Update the floating popup on timer updates
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'update_timer') {
    const domain = window.location.hostname;
    const time = message.timers[domain] || 0;
    floatingPopup.textContent = `Time on this site: ${formatTime(time)}`;
  }
});
