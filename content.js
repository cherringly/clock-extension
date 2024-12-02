let lastColor = null; // Track the last color to avoid unnecessary DOM updates

// Listen for timer updates and change the popup content and color
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'update_timer') {
    const { time, color } = message;

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
    popup.style.width = '180px';
    popup.style.height = '50px';
    popup.style.display = 'flex';
    popup.style.flexDirection = 'column';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.color = '#fff';
    popup.style.fontSize = '14px';
    popup.style.borderRadius = '5px';
    popup.style.zIndex = '9999';
    popup.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    document.body.appendChild(popup);
  }
  
  // Update popup color if provided
  if (color) {
    popup.style.backgroundColor = color;
  }

  // Update popup content
  popup.textContent = `Time Spent: ${formatTime(time)}`;
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
