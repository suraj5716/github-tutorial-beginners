import { useMemo } from 'react';
import { tutorials } from '../data/tutorials';

export function useSearch(query) {
  return useMemo(() => {
    if (!query || query.trim() === '') {
      return { results: [], highlighted: [] };
    }

    const q = query.toLowerCase().trim();

    const results = tutorials.filter(t => {
      return (
        t.title.toLowerCase().includes(q) ||
        t.shortDesc.toLowerCase().includes(q) ||
        t.explanation.toLowerCase().includes(q) ||
        t.command.toLowerCase().includes(q) ||
        t.nodes.some(n =>
          n.label.toLowerCase().includes(q) ||
          n.desc.toLowerCase().includes(q)
        )
      );
    });

    const highlighted = tutorials
      .filter(t => t.nodes.some(n =>
        n.label.toLowerCase().includes(q) ||
        n.desc.toLowerCase().includes(q)
      ))
      .map(t => t.id);

    return { results, highlighted };
  }, [query]);
}
