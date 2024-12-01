// Create and inject a floating popup
const floatingPopup = document.createElement('div');
floatingPopup.id = 'floating-popup';
document.body.appendChild(floatingPopup);

// Initialize the floating popup with default content
floatingPopup.textContent = "Tracking time...";

// Apply styles dynamically to ensure it's always visible
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

// Function to format time as HH:MM:SS
function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

// Add zero padding
function pad(num) {
  return num.toString().padStart(2, '0');
}

// Update the timer display in real-time
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'update_timer') {
    const timers = message.timers;
    const domain = window.location.hostname;
    const time = formatTime(timers[domain] || 0);
    floatingPopup.textContent = `Time on this site: ${time}`;
  }
});
