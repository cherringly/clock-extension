# (Floating) Website Time Tracker Chrome Extension
Website Time Tracker is a Chrome extension that helps you track the time spent on each website you visit. The extension provides real-time updates in a floating popup on the page and displays a summary in the extension popup.

## Features
* __Real-Time Tracking__: Tracks the time spent on each website in hours, minutes, and seconds.
* __Color-Coded Timer__: Displays a floating popup with colors that change based on time spent:
    * __0-10 mins__: #109444
    * __10-20 mins__: #80bc44
    * __20-30 mins__: #ffcc0c
    * __30-40 mins__: #f48c1c
    * __40-50 mins__: #ef4623
    * __50+ mins__: #bc2026
* __Summary View__: Shows the total time spent on all websites in the extension popup.
* __Persistent Storage__: Saves tracked times locally so they persist between browser sessions.


## Installation
1. Clone this repository or download the source files as a ZIP.

git clone https://github.com/your-username/website-time-tracker

cd website-time-tracker

2. Open Google Chrome and navigate to chrome://extensions/.

3. Enable __Developer mode__ (toggle switch in the top-right corner).

4. Click __Load unpacked__ and select the folder containing the extension files.

5. The extension will appear in the Chrome toolbar.

## Usage
1. __Start Tracking__:
* Open any website in a new tab.
* A floating popup will appear at the bottom right corner of the page, displaying the time spent on the website.
2. __Check Summary__:
* Click the extension icon in the Chrome toolbar.
* The popup will show a list of domains and the total time spent on each.
3. __Color-Coded Time Indicator__:
* The floating popup changes color as time passes based on preset intervals (see the Features section).

## Development Notes
### File Structure
* manifest.json: Defines the Chrome extension metadata.
* popup.html: Provides the user interface for the extension popup.
* popup.js: Handles the logic for displaying and updating timers in the popup.
* background.js: Tracks the time spent on websites and sends updates to active tabs.
* content.js: Manages the floating popup's appearance and updates its color and content.
* styles.css: Adds styling to the popup interface.
### Main Logic
* __Timer Logic__: Implemented in background.js using setInterval to increment time for the active website every second.
* __Floating Popup__: Managed in content.js, dynamically created/updated in the active tab.
* __Data Storage__: Uses chrome.storage.local to persist timers between browser sessions.

## License
This project is licensed under the MIT License.

## Contributing
If you'd like to contribute:

1. Fork the repository.
2. Create a new branch (feature/your-feature).
3. Commit your changes and push to the branch.
4. Submit a pull request.

## Future Enhancements
* Add a pause/resume button for the timer.
* Provide an export option for tracked data.
* Include weekly/monthly analytics.

Enjoy! 