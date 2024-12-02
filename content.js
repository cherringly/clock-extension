document.addEventListener('DOMContentLoaded', () => {
  const floatingPopup = document.createElement('div');
  floatingPopup.id = 'floating-popup';
  document.body.appendChild(floatingPopup);

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'update_timer') {
      const { time } = message;

      // Change the color based on time
      floatingPopup.style.backgroundColor = getColorForTime(time);
      floatingPopup.textContent = `Time: ${formatTime(time)}`;
    }
  });

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
