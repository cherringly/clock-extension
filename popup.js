document.addEventListener('DOMContentLoaded', () => {
    const timeList = document.getElementById('timeList');
  
    chrome.runtime.sendMessage({ type: 'getTimers' }, (response) => {
      timeList.innerHTML = '';
  
      for (const [domain, seconds] of Object.entries(response)) {
        const listItem = document.createElement('li');
        const timeString = new Date(seconds * 1000).toISOString().substr(11, 8);
        listItem.textContent = `${domain}: ${timeString}`;
        timeList.appendChild(listItem);
      }
    });
  });
  