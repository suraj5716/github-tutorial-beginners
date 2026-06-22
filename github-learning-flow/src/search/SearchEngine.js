import { tutorials, topicCategories } from '../data/tutorials';
import { commands } from '../data/commands';
import { commonErrors } from '../data/errors';
import { expandSynonyms } from './synonyms';

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

function buildSearchIndex() {
  const index = [];

  tutorials.forEach(t => {
    const cat = topicCategories.find(c => c.id === t.category);
    const text = `${t.title} ${t.shortDesc} ${t.explanation} ${t.command} ${t.nodes.map(n => n.label + ' ' + n.desc).join(' ')}`.toLowerCase();
    index.push({
      type: 'tutorial',
      id: t.id,
      title: t.title,
      description: t.shortDesc,
      explanation: t.explanation,
      command: t.command,
      tags: [cat?.label, t.category, ...t.nodes.map(n => n.label)].filter(Boolean),
      difficulty: cat?.id === 'basics' ? 'Beginner' : cat?.id === 'advanced' ? 'Advanced' : 'Intermediate',
      technology: t.title.toLowerCase().includes('git') ? 'Git' : t.title.toLowerCase().includes('github') ? 'GitHub' : 'Git',
      category: t.category,
      color: t.color,
      icon: 'tutorial',
      text,
      url: `/workspace?topic=${t.id}`,
    });
  });

  commands.forEach(c => {
    const text = `${c.command} ${c.desc} ${c.example}`.toLowerCase();
    index.push({
      type: 'command',
      id: c.command,
      title: c.command,
      description: c.desc,
      tags: [c.category, 'command'],
      difficulty: 'Beginner',
      technology: 'Git',
      category: c.category,
      color: '#10b981',
      icon: 'command',
      text,
      url: '/cheatsheet',
    });
  });

  commonErrors.forEach(e => {
    const text = `${e.title} ${e.error} ${e.cause} ${e.solution} ${e.steps.join(' ')}`.toLowerCase();
    index.push({
      type: 'error',
      id: e.id,
      title: e.title,
      description: e.cause,
      tags: ['error', 'troubleshooting'],
      difficulty: 'Intermediate',
      technology: 'Git',
      category: 'errors',
      color: '#ef4444',
      icon: 'error',
      text,
      url: '/errors',
    });
  });

  return index;
}

const searchIndex = buildSearchIndex();

function scoreItem(item, queryWords, exactMatches) {
  let score = 0;
  const titleLower = item.title.toLowerCase();
  const descLower = item.description.toLowerCase();
  const tagLower = item.tags.join(' ').toLowerCase();

  queryWords.forEach(q => {
    if (titleLower === q) score += 100;
    else if (titleLower.startsWith(q)) score += 80;
    else if (titleLower.includes(q)) score += 60;

    if (tagLower.includes(q)) score += 40;
    if (descLower.includes(q)) score += 30;

    const distance = levenshtein(titleLower.substring(0, Math.max(titleLower.length, q.length)), q);
    if (distance <= 1 && titleLower.length > 2) score += 50;
    else if (distance <= 2 && titleLower.length > 3) score += 25;

    item.tags.forEach(tag => {
      const d = levenshtein(tag.toLowerCase(), q);
      if (d <= 1) score += 35;
    });
  });

  exactMatches.forEach(syn => {
    if (titleLower.includes(syn)) score += 45;
    if (descLower.includes(syn)) score += 20;
    if (tagLower.includes(syn)) score += 15;
  });

  if (item.difficulty === 'Beginner') score += 5;

  return score;
}

function findClosestWord(word, wordList, maxDist = 2) {
  let best = null, bestDist = Infinity;
  wordList.forEach(w => {
    const d = levenshtein(word, w);
    if (d < bestDist && d <= maxDist) {
      bestDist = d;
      best = w;
    }
  });
  return best;
}

export function search(query, filters = {}) {
  if (!query || query.trim().length === 0) {
    return {
      results: [],
      suggestions: getPopularSearches(),
      didYouMean: null,
      totalCount: 0,
    };
  }

  const q = query.trim().toLowerCase();
  const expanded = expandSynonyms(q);
  const queryWords = [...new Set([q, ...expanded])];
  const exactMatches = expanded.filter(w => w !== q);

  let scored = searchIndex
    .map(item => ({
      ...item,
      score: scoreItem(item, queryWords, exactMatches),
    }))
    .filter(item => item.score > 0);

  if (filters.difficulty && filters.difficulty !== 'all') {
    scored = scored.filter(item =>
      item.difficulty.toLowerCase() === filters.difficulty.toLowerCase()
    );
  }
  if (filters.technology && filters.technology !== 'all') {
    scored = scored.filter(item =>
      item.technology.toLowerCase() === filters.technology.toLowerCase()
    );
  }
  if (filters.type && filters.type !== 'all') {
    scored = scored.filter(item => item.type === filters.type);
  }
  if (filters.category && filters.category !== 'all') {
    scored = scored.filter(item => item.category === filters.category);
  }

  if (filters.sort === 'popular') {
    scored.sort((a, b) => b.score - a.score);
  } else if (filters.sort === 'difficulty') {
    const order = { Beginner: 1, Intermediate: 2, Advanced: 3 };
    scored.sort((a, b) => (order[a.difficulty] || 0) - (order[b.difficulty] || 0));
  } else {
    scored.sort((a, b) => b.score - a.score);
  }

  const didYouMean = scored.length === 0 && queryWords.length > 0
    ? findClosestWord(queryWords[0], searchIndex.map(i => i.title.toLowerCase()))
    : null;

  const suggestions = scored.slice(0, 5).map(r => ({
    text: r.title,
    type: r.type,
    icon: r.icon,
  }));

  if (scored.length === 0 && !didYouMean) {
    suggestions.push(...getPopularSearches().slice(0, 3).map(s => ({
      text: s,
      type: 'popular',
      icon: 'popular',
    })));
  }

  return {
    results: scored,
    suggestions,
    didYouMean,
    totalCount: scored.length,
  };
}

export function getPopularSearches() {
  return [
    'git init', 'git commit', 'git push', 'branching',
    'pull request', 'git clone', 'merge conflict', '.gitignore',
  ];
}

export function getSuggestedForEmpty() {
  return tutorials
    .filter(t => ['basics', 'setup'].includes(t.category))
    .slice(0, 4)
    .map(t => ({
      id: t.id,
      title: t.title,
      description: t.shortDesc,
      difficulty: 'Beginner',
      url: `/workspace?topic=${t.id}`,
      color: t.color,
    }));
}

export function highlightMatches(text, query) {
  if (!query || !text) return text;
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  let result = text;
  words.forEach(word => {
    if (word.length < 2) return;
    const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    result = result.replace(regex, '|||$1|||');
  });
  return result.split('|||').map((part, i) => {
    const match = words.some(w => w.length >= 2 && part.toLowerCase() === w);
    return match ? { text: part, highlight: true, key: i } : { text: part, highlight: false, key: i };
  });
}
