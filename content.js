const floatingPopup = document.createElement('div');
floatingPopup.id = 'floating-popup';
floatingPopup.style.position = 'fixed';
floatingPopup.style.right = '10px'; // Position at bottom-right corner initially
floatingPopup.style.bottom = '10px';
floatingPopup.style.width = '200px'; // Fixed width
floatingPopup.style.height = '20px'; // Fixed height
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
let posX = window.innerWidth - floatingPopup.offsetWidth - 10; // Initial X position (bottom-right corner)
let posY = window.innerHeight - floatingPopup.offsetHeight - 10; // Initial Y position (bottom-right corner)
let velocityX = 4; // Horizontal velocity
let velocityY = 4; // Vertical velocity
let isBouncing = false; // Flag to control when bouncing starts

// Start bouncing movement after 20 seconds
setTimeout(() => {
  isBouncing = true;
}, 5000); // 20 seconds

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
  const minutes = Math.floor(seconds);

  if (minutes < 2) return '#109444';
  if (minutes < 4) return '#80bc44';
  if (minutes < 6) return '#ffcc0c';
  if (minutes < 8) return '#f48c1c';
  if (minutes < 10) return '#ef4623';
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
