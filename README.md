#Website Time Tracker Chrome Extension
Website Time Tracker is a Chrome extension that helps you track the time spent on each website you visit. The extension provides real-time updates in a floating popup on the page and displays a summary in the extension popup.

Features
Real-Time Tracking: Tracks the time spent on each website in hours, minutes, and seconds.
Color-Coded Timer: Displays a floating popup with colors that change based on time spent:
0-10 mins:
#109444
10-20 mins:
#80bc44
20-30 mins:
#ffcc0c
30-40 mins:
#f48c1c
40-50 mins:
#ef4623
50+ mins:
#bc2026
Summary View: Shows the total time spent on all websites in the extension popup.
Persistent Storage: Saves tracked times locally so they persist between browser sessions.
Installation
Clone this repository or download the source files as a ZIP.

bash
Copy code
git clone https://github.com/your-username/website-time-tracker
cd website-time-tracker
Open Google Chrome and navigate to chrome://extensions/.

Enable Developer mode (toggle switch in the top-right corner).

Click Load unpacked and select the folder containing the extension files.

The extension will appear in the Chrome toolbar.

Usage
Start Tracking:

Open any website in a new tab.
A floating popup will appear at the bottom right corner of the page, displaying the time spent on the website.
Check Summary:

Click the extension icon in the Chrome toolbar.
The popup will show a list of domains and the total time spent on each.
Color-Coded Time Indicator:

The floating popup changes color as time passes based on preset intervals (see the Features section).
Development Notes
File Structure
manifest.json: Defines the Chrome extension metadata.
popup.html: Provides the user interface for the extension popup.
popup.js: Handles the logic for displaying and updating timers in the popup.
background.js: Tracks the time spent on websites and sends updates to active tabs.
content.js: Manages the floating popup's appearance and updates its color and content.
styles.css: Adds styling to the popup interface.
Main Logic
Timer Logic: Implemented in background.js using setInterval to increment time for the active website every second.
Floating Popup: Managed in content.js, dynamically created/updated in the active tab.
Data Storage: Uses chrome.storage.local to persist timers between browser sessions.
License
This project is licensed under the MIT License.

Contributing
If you'd like to contribute:

Fork the repository.
Create a new branch (feature/your-feature).
Commit your changes and push to the branch.
Submit a pull request.
Future Enhancements
Add a pause/resume button for the timer.
Provide an export option for tracked data.
Include weekly/monthly analytics.
Enjoy tracking your time efficiently! 😊