import { useState } from 'react';
import { motion } from 'framer-motion';
import { commands } from '../data/commands';
import { useApp } from '../context/AppContext';
import { Copy, Check, Search } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Commands', color: '#6b7280' },
  { id: 'setup', label: 'Setup', color: '#6366f1' },
  { id: 'basic', label: 'Basic', color: '#3b82f6' },
  { id: 'remote', label: 'Remote', color: '#10b981' },
  { id: 'branching', label: 'Branching', color: '#f59e0b' },
  { id: 'advanced', label: 'Advanced', color: '#ef4444' },
];

export default function CheatSheet() {
  const { beginnerMode } = useApp();
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(null);

  const filtered = commands.filter(c => {
    const matchCat = activeCat === 'all' || c.category === activeCat;
    const matchSearch = !search || c.command.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
          Command Cheat Sheet
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          {commands.length} essential Git commands
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search commands..."
            className="w-full pl-8 pr-3 py-2 rounded-lg text-sm outline-none transition-all"
            style={{
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCat === cat.id ? 'text-white' : ''
            }`}
            style={{
              background: activeCat === cat.id ? cat.color : 'var(--color-surface)',
              color: activeCat === cat.id ? 'white' : 'var(--color-text-secondary)',
              border: activeCat === cat.id ? 'none' : '1px solid var(--color-border)',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-2">
        {filtered.map((cmd, i) => (
          <motion.div
            key={cmd.command}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            className="rounded-xl border p-4 flex items-center gap-4"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <code
                  className="text-sm font-semibold font-mono"
                  style={{ color: 'var(--color-text)' }}
                >
                  {cmd.command}
                </code>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                  style={{
                    background: `${categories.find(c => c.id === cmd.category)?.color}15` || 'var(--color-border)',
                    color: categories.find(c => c.id === cmd.category)?.color || 'var(--color-text-secondary)',
                  }}
                >
                  {cmd.category}
                </span>
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                {cmd.desc}
              </div>
              <div className="text-[11px] mt-1 font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                {cmd.example}
              </div>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(cmd.command);
                setCopied(cmd.command);
                setTimeout(() => setCopied(null), 1500);
              }}
              className="p-2 rounded-lg shrink-0 transition-all"
              style={{
                background: copied === cmd.command ? 'var(--color-success)20' : 'transparent',
                color: copied === cmd.command ? 'var(--color-success)' : 'var(--color-text-secondary)',
              }}
            >
              {copied === cmd.command ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            No commands found
          </p>
        </div>
      )}
    </div>
  );
}
