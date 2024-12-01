document.addEventListener('DOMContentLoaded', () => {
  const timeList = document.getElementById('time-list');

  // Fetch the timers from storage
  chrome.storage.local.get(['timers'], (result) => {
    const timers = result.timers || {};
    renderTimers(timers);
  });

  function renderTimers(timers) {
    timeList.innerHTML = '';
    for (const [domain, time] of Object.entries(timers)) {
      const li = document.createElement('li');
      li.classList.add('time-item');

      const domainElement = document.createElement('span');
      domainElement.textContent = domain;

      const timeElement = document.createElement('span');
      timeElement.textContent = formatTime(time);

      li.appendChild(domainElement);
      li.appendChild(timeElement);
      timeList.appendChild(li);
    }
  }

  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }

  function pad(number) {
    return number.toString().padStart(2, '0');
  }
});
