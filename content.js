document.addEventListener('DOMContentLoaded', () => {
  console.log('Content script loaded'); // Debug

  // Create the floating popup
  const floatingPopup = document.createElement('div');
  floatingPopup.id = 'floating-popup';
  floatingPopup.style.display = 'none'; // Initially hidden
  document.body.appendChild(floatingPopup);

  console.log('Floating popup created and appended'); // Debug

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((message) => {
    console.log('Message received:', message); // Debug

    if (message.action === 'update_timer') {
      const { time } = message;

      // Update floating popup visibility, color, and text
      floatingPopup.style.display = 'block';
      floatingPopup.style.backgroundColor = getColorForTime(time);
      floatingPopup.textContent = `Time: ${formatTime(time)}`;
    }
  });

  // Helper functions
  function getColorForTime(seconds) {
    const mins = Math.floor(seconds / 60);
    if (mins < 10) return '#109444';
    if (mins < 20) return '#80bc44';
    if (mins < 30) return '#ffcc0c';
    if (mins < 40) return '#f48c1c';
    if (mins < 50) return '#ef4623';
    return '#bc2026';
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  }
});
