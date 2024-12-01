export function extractDomain(url) {
    try {
      return new URL(url).hostname;
    } catch {
      return null;
    }
  }
  