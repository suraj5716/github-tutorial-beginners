import Fuse from 'fuse.js';
import { tutorials } from '../data/tutorials';
import { commands } from '../data/commands';
import { commonErrors } from '../data/errors';

const SYNONYMS = {
  js: 'javascript',
  javascript: 'js',
  repo: 'repository',
  repository: 'repo',
  commit: 'save changes',
  push: 'upload changes',
  pull: 'download changes fetch',
  fetch: 'pull download',
  clone: 'copy download',
  init: 'initialize setup',
  merge: 'combine integrate',
  branch: 'feature branch',
  stash: 'save temporarily',
  rebase: 'reapply',
  tag: 'label version',
  config: 'configure setting',
  diff: 'compare difference',
  log: 'history',
  status: 'state check',
  rm: 'remove delete',
  mv: 'move rename',
};

function expandQuery(q) {
  const words = q.toLowerCase().split(/\s+/);
  const expanded = new Set(words);
  words.forEach(w => {
    if (SYNONYMS[w]) SYNONYMS[w].split(' ').forEach(s => expanded.add(s));
  });
  return [...expanded].join(' ');
}

function buildIndex() {
  const items = [];

  tutorials.forEach(t => {
    items.push({
      type: 'tutorial',
      id: t.id,
      title: t.title,
      description: t.shortDesc,
      explanation: t.explanation,
      command: t.command,
      tags: [t.category, ...t.nodes.map(n => n.label)],
      category: t.category,
      color: t.color,
      difficulty: t.category === 'basics' ? 'Beginner' : t.category === 'advanced' ? 'Advanced' : 'Intermediate',
      url: `/workspace?topic=${t.id}`,
      keys: `${t.title} ${t.shortDesc} ${t.explanation} ${t.command} ${t.nodes.map(n => n.label).join(' ')}`,
    });
  });

  commands.forEach(c => {
    items.push({
      type: 'command',
      id: c.command,
      title: c.command,
      description: c.desc,
      tags: [c.category, 'command'],
      category: c.category,
      color: '#10b981',
      difficulty: 'Beginner',
      url: '/cheatsheet',
      keys: `${c.command} ${c.desc} ${c.example}`,
    });
  });

  commonErrors.forEach(e => {
    items.push({
      type: 'error',
      id: e.id,
      title: e.title,
      description: e.cause,
      tags: ['error', 'troubleshooting'],
      category: 'errors',
      color: '#ef4444',
      difficulty: 'Intermediate',
      url: '/errors',
      keys: `${e.title} ${e.error} ${e.cause} ${e.solution} ${e.steps.join(' ')}`,
    });
  });

  return items;
}

const index = buildIndex();

const fuse = new Fuse(index, {
  keys: [
    { name: 'title', weight: 10 },
    { name: 'command', weight: 8 },
    { name: 'description', weight: 6 },
    { name: 'explanation', weight: 4 },
    { name: 'tags', weight: 5 },
    { name: 'keys', weight: 2 },
  ],
  threshold: 0.4,
  distance: 100,
  includeScore: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
});

let analytics = null;

function loadAnalytics() {
  if (analytics) return analytics;
  try {
    const raw = localStorage.getItem('searchAnalytics2');
    analytics = raw ? JSON.parse(raw) : { recent: [], popular: {}, failed: [] };
  } catch {
    analytics = { recent: [], popular: {}, failed: [] };
  }
  return analytics;
}

function saveAnalytics() {
  localStorage.setItem('searchAnalytics2', JSON.stringify(analytics));
}

export function searchAll(query, filters = {}) {
  const q = (query || '').trim();
  if (!q) return { results: [], suggestions: [], didYouMean: null };

  const expanded = expandQuery(q);
  const raw = fuse.search(expanded);

  let results = raw.map(r => ({ ...r.item, score: r.score }));

  if (filters.category && filters.category !== 'all') {
    results = results.filter(r => r.category === filters.category);
  }
  if (filters.difficulty && filters.difficulty !== 'all') {
    results = results.filter(r => r.difficulty === filters.difficulty);
  }
  if (filters.type && filters.type !== 'all') {
    results = results.filter(r => r.type === filters.type);
  }

  results.sort((a, b) => scoreRank(a, q) - scoreRank(b, q));

  const seen = new Set();
  const suggestions = results.slice(0, 6).map(r => {
    const label = r.type === 'command' ? r.title : r.title;
    if (seen.has(label)) return null;
    seen.add(label);
    return {
      label,
      type: r.type,
      url: r.url,
      color: r.color,
      difficulty: r.difficulty,
    };
  }).filter(Boolean);

  const didYouMean = results.length === 0 && q.length > 2
    ? findClosest(q)
    : null;

  return { results, suggestions, didYouMean, query: q };
}

function scoreRank(item, query) {
  const q = query.toLowerCase();
  const title = item.title.toLowerCase();
  const desc = (item.description || '').toLowerCase();
  const cmd = (item.command || '').toLowerCase();
  const tags = (item.tags || []).join(' ').toLowerCase();

  if (title === q) return 0;
  if (title.startsWith(q)) return 1;
  if (title.includes(q)) return 2;
  if (cmd.startsWith(q) || cmd === q) return 3;
  if (desc.includes(q)) return 4;
  if (tags.includes(q)) return 5;
  return 6;
}

function findClosest(q) {
  const candidates = index.map(i => i.title);
  let best = null, bestScore = Infinity;
  candidates.forEach(c => {
    const lc = c.toLowerCase();
    let dist = levenshtein(q, lc);
    if (lc.includes(q)) dist = Math.min(dist, 2);
    if (dist < bestScore) { bestScore = dist; best = c; }
  });
  return bestScore <= 3 ? best : null;
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

export function trackSearch(query, resultCount) {
  const data = loadAnalytics();
  const q = query.trim().toLowerCase();
  if (!q) return;
  data.recent = [q, ...data.recent.filter(r => r !== q)].slice(0, 10);
  data.popular[q] = (data.popular[q] || 0) + 1;
  if (resultCount === 0) {
    data.failed.push({ q, time: Date.now() });
    if (data.failed.length > 50) data.failed = data.failed.slice(-50);
  }
  saveAnalytics();
}

export function getRecentSearches() {
  return loadAnalytics().recent;
}

export function getPopularSearches(limit = 8) {
  const data = loadAnalytics();
  return Object.entries(data.popular)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([q]) => q);
}

export function getBeginnerSuggestions() {
  return tutorials
    .filter(t => t.category === 'basics' || t.category === 'setup')
    .slice(0, 5)
    .map(t => ({
      label: t.title,
      type: 'tutorial',
      url: `/workspace?topic=${t.id}`,
      color: t.color,
      difficulty: 'Beginner',
    }));
}

export function highlightMatch(text, query) {
  if (!query || !text) return [{ text, highlight: false }];
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(w => w.length > 1);
  let result = text;
  words.forEach(w => {
    const re = new RegExp(`(${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    result = result.replace(re, '\x00$1\x01');
  });
  if (result === text) return [{ text, highlight: false }];
  const parts = [];
  let i = 0;
  while (i < result.length) {
    const start = result.indexOf('\x00', i);
    if (start === -1) { parts.push({ text: result.slice(i), highlight: false }); break; }
    if (start > i) parts.push({ text: result.slice(i, start), highlight: false });
    const end = result.indexOf('\x01', start);
    parts.push({ text: result.slice(start + 1, end), highlight: true });
    i = end + 1;
  }
  return parts;
}
