if (!document.getElementById('timeTrackerPopup')) {
    const iframe = document.createElement('iframe');
    iframe.src = chrome.runtime.getURL('floating.html');
    iframe.id = 'timeTrackerPopup';
    iframe.style = `
      position: fixed;
      top: 10px;
      right: 10px;
      width: 300px;
      height: auto;
      z-index: 10000;
      border: none;
    `;
    document.body.appendChild(iframe);
  }
  