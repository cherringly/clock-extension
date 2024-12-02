// Listen for timer updates and change the background color
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'update_timer') {
    updateFloatingPopupColor(message.color);
  }
});

// Update the floating popup's background color
function updateFloatingPopupColor(color) {
  let popup = document.getElementById('floating-popup');
  
  // Create the popup if it doesn't exist
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'floating-popup';
    popup.style.position = 'fixed';
    popup.style.bottom = '10px';
    popup.style.right = '10px';
    popup.style.width = '150px';
    popup.style.height = '40px';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.color = '#fff';
    popup.style.fontSize = '14px';
    popup.style.borderRadius = '5px';
    popup.style.zIndex = '9999';
    popup.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    document.body.appendChild(popup);
  }
  
  // Update popup color
  popup.style.backgroundColor = color;
  popup.textContent = 'Time Tracking Active';
}
