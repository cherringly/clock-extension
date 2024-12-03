// Create and inject a floating popup
const floatingPopup = document.createElement('div');
floatingPopup.id = 'floating-popup';
floatingPopup.style.position = 'fixed';
floatingPopup.style.left = `${Math.random() * (window.innerWidth - 150)}px`; // Random initial X position
floatingPopup.style.top = `${Math.random() * (window.innerHeight - 50)}px`;  // Random initial Y position
floatingPopup.style.width = '175px'; // Fixed width
floatingPopup.style.height = '30px'; // Fixed height
floatingPopup.style.padding = '10px';
floatingPopup.style.backgroundColor = '#109444';
floatingPopup.style.color = 'white';
floatingPopup.style.borderRadius = '5px';
floatingPopup.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)';
floatingPopup.style.display = 'flex'; // Center text
floatingPopup.style.alignItems = 'center';
floatingPopup.style.justifyContent = 'center';
floatingPopup.style.zIndex = '9999';
floatingPopup.textContent = 'Time Tracking Active';
document.body.appendChild(floatingPopup);

// Variables for bouncing logic
let posX = parseFloat(floatingPopup.style.left); // Initial X position
let posY = parseFloat(floatingPopup.style.top);  // Initial Y position
let velocityX = 2; // Horizontal velocity
let velocityY = 2; // Vertical velocity
let isBouncing = false; // Flag to control when bouncing starts

// Start bouncing movement after 20 seconds
setTimeout(() => {
  isBouncing = true;
}, 20000); // 20 seconds

// Interval for bouncing logic
setInterval(() => {
  if (!isBouncing) return; // Do nothing if bouncing hasn't started

  // Update position
  posX += velocityX;
  posY += velocityY;

  // Detect edges and reverse direction if needed
  const maxX = window.innerWidth - floatingPopup.offsetWidth;
  const maxY = window.innerHeight - floatingPopup.offsetHeight;

  if (posX <= 0 || posX >= maxX) velocityX = -velocityX;
  if (posY <= 0 || posY >= maxY) velocityY = -velocityY;

  // Apply new position
  floatingPopup.style.left = `${posX}px`;
  floatingPopup.style.top = `${posY}px`;
}, 20); // Update every 20ms for smooth animation

// Listen for timer updates from the background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'update_timer') {
    const timers = message.timers;
    const domain = window.location.hostname;
    const time = timers[domain] || 0;

    updateFloatingPopup(time);
  }
});

// Update the floating popup text and color
function updateFloatingPopup(seconds) {
  const time = formatTime(seconds);
  const color = getColorByTime(seconds);

  floatingPopup.textContent = `Time on this site: ${time}`;
  floatingPopup.style.backgroundColor = color;
}

// Determine color based on time ranges
function getColorByTime(seconds) {
  const minutes = Math.floor(seconds / 60);

  if (minutes < 5) return '#109444';
  if (minutes < 10) return '#80bc44';
  if (minutes < 15) return '#ffcc0c';
  if (minutes < 20) return '#f48c1c';
  if (minutes < 25) return '#ef4623';
  return '#bc2026';
}

// Format time as HH:MM:SS
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
