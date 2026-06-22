import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp, Clock, ArrowRight, GitBranch, Terminal, AlertTriangle, BookOpen } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import {
  searchAll, trackSearch, getRecentSearches,
  getPopularSearches, getBeginnerSuggestions,
} from '../search/searchUtils';
import { useApp } from '../context/AppContext';

const typeIcons = {
  tutorial: GitBranch,
  command: Terminal,
  error: AlertTriangle,
};

const typeColors = {
  tutorial: '#3b82f6',
  command: '#10b981',
  error: '#ef4444',
};

export default function SearchBar() {
  const navigate = useNavigate();
  const { setSearchQuery } = useApp();
  const [input, setInput] = useState('');
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [didYouMean, setDidYouMean] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [showRecent, setShowRecent] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    if (!debouncedInput || debouncedInput.trim().length === 0) {
      setResults([]);
      setSuggestions([]);
      setDidYouMean(null);
      setSelectedIdx(-1);
      return;
    }
    const { results: r, suggestions: s, didYouMean: d } = searchAll(debouncedInput);
    setResults(r);
    setSuggestions(s);
    setDidYouMean(d);
    setSelectedIdx(-1);
    if (r.length > 0 || d) {
      trackSearch(debouncedInput, r.length);
    }
  }, [debouncedInput]);

  useEffect(() => {
    setSearchQuery(input);
  }, [input, setSearchQuery]);

  const recentSearches = input.length === 0 ? getRecentSearches() : [];
  const popularSearches = input.length === 0 ? getPopularSearches() : [];
  const beginnerSuggestions = input.length === 0 ? getBeginnerSuggestions() : [];

  const showDropdown = focused && (input.length > 0 || recentSearches.length > 0 || popularSearches.length > 0);

  const handleSelect = useCallback((item) => {
    setInput('');
    setFocused(false);
    setResults([]);
    setSuggestions([]);
    navigate(item.url);
  }, [navigate]);

  const handleDidYouMean = useCallback((suggestion) => {
    setInput(suggestion);
    setShowRecent(false);
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((e) => {
    const total = suggestions.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx(i => Math.min(i + 1, total - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIdx >= 0 && selectedIdx < suggestions.length) {
        handleSelect(suggestions[selectedIdx]);
      } else if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      } else if (input.trim()) {
        setInput('');
        setFocused(false);
        setResults([]);
      }
    } else if (e.key === 'Escape') {
      setFocused(false);
      inputRef.current?.blur();
    }
  }, [selectedIdx, suggestions, handleSelect, input]);

  useEffect(() => {
    if (selectedIdx >= 0) {
      const el = dropdownRef.current?.querySelector(`[data-index="${selectedIdx}"]`);
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIdx]);

  const renderIcon = (type) => {
    const Icon = typeIcons[type] || BookOpen;
    const color = typeColors[type] || '#6b7280';
    return <Icon size={14} style={{ color }} />;
  };

  const renderHighlighted = (text) => {
    if (!input) return text;
    const q = input.toLowerCase();
    const idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span style={{ background: 'var(--color-primary)30', fontWeight: 600, borderRadius: 2, padding: '0 1px' }}>
          {text.slice(idx, idx + q.length)}
        </span>
        {text.slice(idx + q.length)}
      </>
    );
  };

  return (
    <div className="relative w-full max-w-lg" ref={dropdownRef}>
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: 'var(--color-text-secondary)' }}
      />
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onFocus={() => { setFocused(true); setShowRecent(true); }}
        onBlur={() => setTimeout(() => { setFocused(false); setShowRecent(false); }, 200)}
        onKeyDown={handleKeyDown}
        placeholder="Search tutorials, commands, errors..."
        className="w-full pl-9 pr-8 py-2 rounded-lg text-sm outline-none transition-all duration-200"
        style={{
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)',
        }}
        onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
        onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
        role="combobox"
        aria-expanded={showDropdown}
        aria-haspopup="listbox"
        aria-autocomplete="list"
        aria-label="Search tutorials, commands, and errors"
      />
      {input && (
        <button
          onClick={() => { setInput(''); setResults([]); setSuggestions([]); setDidYouMean(null); }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded transition-all"
          style={{ color: 'var(--color-text-secondary)' }}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}

      {showDropdown && (
        <div
          className="absolute top-full left-0 right-0 mt-1 rounded-xl border shadow-lg overflow-hidden z-50"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          }}
          role="listbox"
          aria-label="Search suggestions"
        >
          {input.length === 0 && (
            <div className="max-h-80 overflow-y-auto py-2">
              {beginnerSuggestions.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                    <BookOpen size={11} /> Recommended for Beginners
                  </div>
                  {beginnerSuggestions.map((s, i) => (
                    <button
                      key={`beginner-${i}`}
                      data-index={i}
                      onMouseDown={() => handleSelect(s)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs transition-all"
                      style={{ color: 'var(--color-text)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-light)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.color }} />
                      <span className="flex-1 truncate">{s.label}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: `${s.color}15`, color: s.color }}>{s.difficulty}</span>
                    </button>
                  ))}
                </div>
              )}

              {recentSearches.length > 0 && (
                <div className="border-t pt-1.5 mt-1" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                    <Clock size={11} /> Recent
                  </div>
                  {recentSearches.map((s, i) => (
                    <button
                      key={`recent-${i}`}
                      onMouseDown={() => { setInput(s); inputRef.current?.focus(); }}
                      className="w-full flex items-center gap-2.5 px-3 py-1.5 text-left text-xs transition-all"
                      style={{ color: 'var(--color-text-secondary)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-light)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <Clock size={12} />
                      <span className="truncate">{s}</span>
                    </button>
                  ))}
                </div>
              )}

              {popularSearches.length > 0 && (
                <div className="border-t pt-1.5 mt-1" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                    <TrendingUp size={11} /> Popular
                  </div>
                  <div className="px-3 pb-2 flex flex-wrap gap-1">
                    {popularSearches.map((s, i) => (
                      <button
                        key={`popular-${i}`}
                        onMouseDown={() => { setInput(s); inputRef.current?.focus(); }}
                        className="text-[11px] px-2 py-1 rounded-lg transition-all"
                        style={{
                          background: 'var(--color-bg)',
                          color: 'var(--color-text-secondary)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {input.length > 0 && (
            <div>
              {suggestions.length === 0 && !didYouMean && (
                <div className="px-4 py-6 text-center">
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    No results for "<span className="font-medium">{input}</span>"
                  </div>
                  <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                    {getPopularSearches(4).map((s, i) => (
                      <button
                        key={`fallback-${i}`}
                        onMouseDown={() => { setInput(s); inputRef.current?.focus(); }}
                        className="text-[11px] px-2 py-1 rounded-lg"
                        style={{
                          background: 'var(--color-primary-light)',
                          color: 'var(--color-primary)',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {didYouMean && (
                <div className="px-3 py-2 text-xs border-b" style={{ borderColor: 'var(--color-border)' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Did you mean: </span>
                  <button
                    onMouseDown={() => handleDidYouMean(didYouMean)}
                    className="font-medium underline transition-all"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {didYouMean}
                  </button>
                </div>
              )}

              {suggestions.length > 0 && (
                <div className="max-h-72 overflow-y-auto py-1">
                  {suggestions.map((s, i) => (
                    <button
                      key={`suggest-${i}`}
                      data-index={i}
                      onMouseDown={() => handleSelect(s)}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-xs transition-all"
                      style={{
                        color: 'var(--color-text)',
                        background: selectedIdx === i ? 'var(--color-primary-light)' : 'transparent',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-light)'}
                      onMouseLeave={e => { if (selectedIdx !== i) e.currentTarget.style.background = 'transparent'; }}
                    >
                      {renderIcon(s.type)}
                      <span className="flex-1 truncate">
                        {renderHighlighted(s.label)}
                      </span>
                      {s.difficulty && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded shrink-0" style={{ background: `${s.color}15`, color: s.color }}>
                          {s.difficulty}
                        </span>
                      )}
                      <ArrowRight size={12} className="shrink-0" style={{ color: 'var(--color-text-secondary)' }} />
                    </button>
                  ))}

                  <div className="px-3 py-1.5 border-t text-[10px] text-center" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
                    {results.length} result{results.length !== 1 ? 's' : ''} — <span className="font-mono">↑↓</span> navigate <span className="font-mono">↵</span> open <span className="font-mono">esc</span> close
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
