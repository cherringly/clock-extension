export async function getStorage(key) {
    const result = await chrome.storage.local.get(key);
    return result[key] || null;
  }
  
  export async function setStorage(key, value) {
    await chrome.storage.local.set({ [key]: value });
  }
  