// Create and inject a floating popup
const floatingPopup = document.createElement('div');
floatingPopup.id = 'floating-popup';
document.body.appendChild(floatingPopup);

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
  // const size = getSizeByTime(seconds);
  const size = 100;


  floatingPopup.textContent = `Time on this site: ${time}`;
  floatingPopup.style.backgroundColor = color;
  floatingPopup.style.padding = size;
}

// Determine color based on time ranges
function getSizeByTime(seconds) {
  // const minutes = Math.floor(seconds / 60);
  const minutes = Math.floor(seconds);
  const size = 20;

  if (minutes < 5) return (size+=5);
  if (minutes < 10) return (size+=10);
  if (minutes < 15) return (size+=15);
  if (minutes < 20) return (size+=20);
  if (minutes < 25) return (size+=25);
  return (size+=30);
}

// Determine size based on time ranges
function getColorByTime(seconds) {
  // const minutes = Math.floor(seconds / 60);
  const minutes = Math.floor(seconds);

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

