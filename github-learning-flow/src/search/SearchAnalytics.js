const STORAGE_KEY = 'searchAnalytics';

function load() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { popular: {}, failed: [], clicks: [], recent: [] };
  } catch { return { popular: {}, failed: [], clicks: [], recent: [] }; }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const SearchAnalytics = {
  trackSearch(query, resultCount) {
    const data = load();
    const q = query.toLowerCase().trim();
    data.popular[q] = (data.popular[q] || 0) + 1;
    if (resultCount === 0) {
      data.failed.push({ query: q, timestamp: Date.now() });
      if (data.failed.length > 50) data.failed = data.failed.slice(-50);
    }
    data.recent = data.recent.filter(r => r !== q);
    data.recent.unshift(q);
    if (data.recent.length > 20) data.recent = data.recent.slice(0, 20);
    save(data);
  },

  trackClick(resultId, query) {
    const data = load();
    data.clicks.push({ id: resultId, query, timestamp: Date.now() });
    if (data.clicks.length > 200) data.clicks = data.clicks.slice(-200);
    save(data);
  },

  getPopular(limit = 10) {
    const data = load();
    return Object.entries(data.popular)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([query]) => query);
  },

  getRecent(limit = 5) {
    return load().recent.slice(0, limit);
  },

  getFailedSearches() {
    return load().failed;
  },

  getRecommendations() {
    const data = load();
    const recent = data.recent.slice(0, 3);
    const top = this.getPopular(3);
    const combined = [...new Set([...recent, ...top])];
    return combined;
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
