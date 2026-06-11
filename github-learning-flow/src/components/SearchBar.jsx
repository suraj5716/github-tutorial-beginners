import { useApp } from '../context/AppContext';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useApp();

  return (
    <div className="relative w-full max-w-md">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: 'var(--color-text-secondary)' }}
      />
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search tutorials, commands, topics..."
        className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none transition-all duration-200"
        style={{
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)',
        }}
        onFocus={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
        onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
