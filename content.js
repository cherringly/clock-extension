let lastColor = null; // Track the last color to avoid unnecessary DOM updates
let currentSize = 50; // Starting size of the floating popup
const sizeIncrement = 10; // Size increase every 5 seconds
const maxSize = 150; // Maximum size limit

// Listen for timer updates and change the popup content, color, and size
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'update_timer') {
    const time = message.time || 0; // Default to 0 if time is undefined
    const color = message.color || lastColor; // Default to the last known color

    if (color && color !== lastColor) {
      updateFloatingPopup(time, color);
      lastColor = color;
    } else {
      updateFloatingPopup(time);
    }
  }
});

// Update or create the floating popup
function updateFloatingPopup(time, color = null) {
  let popup = document.getElementById('floating-popup');
  
  // Create the popup if it doesn't exist
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'floating-popup';
    popup.style.position = 'fixed';
    popup.style.bottom = '10px';
    popup.style.right = '10px';
    popup.style.display = 'flex';
    popup.style.flexDirection = 'column';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.color = '#fff';
    popup.style.fontSize = '14px';
    popup.style.borderRadius = '5px';
    popup.style.zIndex = '9999';
    popup.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    popup.style.transition = 'all 0.3s ease'; // Smooth transitions for size changes
    document.body.appendChild(popup);

    // Start size animation
    setInterval(() => {
      if (currentSize < maxSize) {
        currentSize += sizeIncrement;
        popup.style.width = `${currentSize}px`;
        popup.style.height = `${currentSize}px`;
      }
    }, 5000); // Increase size every 5 seconds
  }
  
  // Update popup color if provided
  if (color) {
    popup.style.backgroundColor = color;
  }

  // Update popup content
  popup.textContent = `Time Tracking Active\n${formatTime(time)}`;
}

// Format time into HH:MM:SS
function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

// Pad numbers to two digits
function pad(number) {
  return number.toString().padStart(2, '0');
}
