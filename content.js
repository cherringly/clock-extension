let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

// Format the time as hh:mm:ss
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Start the timer
function startTimer() {
  startTime = Date.now() - elapsedTime * 1000; // Adjust start time based on elapsed time
  timerInterval = setInterval(() => {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    // Save the elapsed time for the current domain
    chrome.storage.local.set({ [window.location.hostname]: elapsedTime }, () => {
      console.log(`Saved elapsed time for ${window.location.hostname}: ${formatTime(elapsedTime)}`);
    });
  }, 1000); // Update every second
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  // Save the elapsed time when the timer is stopped
  chrome.storage.local.set({ [window.location.hostname]: elapsedTime }, () => {
    console.log(`Stopped timer and saved elapsed time for ${window.location.hostname}: ${formatTime(elapsedTime)}`);
  });
}

// Load the saved elapsed time from chrome.storage
function loadSavedTime() {
  chrome.storage.local.get([window.location.hostname], (result) => {
    console.log(`Loaded saved time for ${window.location.hostname}: ${result[window.location.hostname]}`);
    if (result[window.location.hostname]) {
      elapsedTime = result[window.location.hostname];
      console.log(`Elapsed time for ${window.location.hostname}: ${formatTime(elapsedTime)}`);
      // If the timer wasn't running before, start it
      if (!timerInterval) {
        startTimer();
      }
    } else {
      console.log('No saved time for this domain.');
      // Start the timer if there is no saved time
      startTimer();
    }
  });
}

// Initialize the timer
function initializeTimer() {
  loadSavedTime();
}

// Run the timer when the page loads
initializeTimer();
