export class ActiveTab {
    constructor() {
      this.currentTab = null;
      this.currentDomain = null;
    }
  
    async update() {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs.length) {
        const activeTab = tabs[0];
        const domain = new URL(activeTab.url).hostname;
  
        this.currentTab = activeTab.id;
        this.currentDomain = domain;
      }
    }
  
    get domain() {
      return this.currentDomain;
    }
  
    get tabId() {
      return this.currentTab;
    }
  }
  
  export const activeTabInstance = new ActiveTab();
  