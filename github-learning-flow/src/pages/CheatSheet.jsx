import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { commands, categories, sectionDescriptions } from '../data/commands';
import { Copy, Check, Search, BookOpen } from 'lucide-react';

export default function CheatSheet() {
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(null);

  const filtered = useMemo(() => {
    return commands.filter(c => {
      const matchCat = activeCat === 'all' || c.category === activeCat;
      const matchSearch = !search
        || c.command.toLowerCase().includes(search.toLowerCase())
        || c.desc.toLowerCase().includes(search.toLowerCase())
        || c.example.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCat, search]);

  const grouped = useMemo(() => {
    if (activeCat !== 'all') return null;
    const groups = {};
    filtered.forEach(c => {
      if (!groups[c.category]) groups[c.category] = [];
      groups[c.category].push(c);
    });
    return groups;
  }, [filtered, activeCat]);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <BookOpen size={22} style={{ color: 'var(--color-primary)' }} />
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
            Git Cheat Sheet
          </h1>
        </div>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {commands.length} essential Git commands — search, filter, and copy
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by command, description, or example..."
            className="w-full pl-8 pr-3 py-2.5 rounded-lg text-sm outline-none transition-all"
            style={{
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
            }}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
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

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            No commands found matching "<span className="font-medium">{search}</span>"
          </p>
        </div>
      )}

      {activeCat !== 'all' && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs mb-4 pb-3 border-b"
          style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}
        >
          {sectionDescriptions[activeCat]}
        </motion.p>
      )}

      {activeCat === 'all' && !search ? (
        <div className="space-y-6">
          {Object.entries(grouped || {}).map(([catId, cmds]) => {
            const cat = categories.find(c => c.id === catId);
            return (
              <div key={catId}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat?.color }} />
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{cat?.label}</span>
                  <span className="text-xs ml-auto" style={{ color: 'var(--color-text-secondary)' }}>
                    {sectionDescriptions[catId]}
                  </span>
                </div>
                <div className="grid gap-1.5">
                  {cmds.map((cmd, i) => (
                    <motion.div
                      key={cmd.command + catId}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="rounded-xl border p-3 flex items-center gap-3 hover:opacity-80 transition-all"
                      style={{
                        background: 'var(--color-surface)',
                        borderColor: 'var(--color-border)',
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <code className="text-sm font-semibold font-mono" style={{ color: 'var(--color-text)' }}>
                          {cmd.command}
                        </code>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                          {cmd.desc}
                        </div>
                        {cmd.example && (
                          <div className="text-[11px] mt-1 font-mono truncate" style={{ color: cat?.color || 'var(--color-text-secondary)' }}>
                            $ {cmd.example.replace(/\n/g, ' | ')}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(cmd.command);
                          setCopied(cmd.command + catId);
                          setTimeout(() => setCopied(null), 1500);
                        }}
                        className="p-2 rounded-lg shrink-0 transition-all"
                        style={{
                          background: copied === cmd.command + catId ? `${cat?.color}15` || 'var(--color-border)' : 'transparent',
                          color: copied === cmd.command + catId ? cat?.color || 'var(--color-success)' : 'var(--color-text-secondary)',
                        }}
                      >
                        {copied === cmd.command + catId ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-1.5">
          {filtered.map((cmd, i) => {
            const cat = categories.find(c => c.id === cmd.category);
            return (
              <motion.div
                key={cmd.command + i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.015 }}
                className="rounded-xl border p-3 flex items-center gap-3 transition-all"
                style={{
                  background: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="text-sm font-semibold font-mono" style={{ color: 'var(--color-text)' }}>
                      {cmd.command}
                    </code>
                    {cat && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                        style={{
                          background: `${cat.color}15`,
                          color: cat.color,
                        }}
                      >
                        {cat.label}
                      </span>
                    )}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                    {cmd.desc}
                  </div>
                  {cmd.example && (
                    <div className="text-[11px] mt-1 font-mono truncate leading-relaxed" style={{ color: cat?.color || 'var(--color-text-secondary)' }}>
                      $ {cmd.example.replace(/\n/g, '\n$ ')}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(cmd.command);
                    setCopied(cmd.command);
                    setTimeout(() => setCopied(null), 1500);
                  }}
                  className="p-2 rounded-lg shrink-0 transition-all"
                  style={{
                    background: copied === cmd.command ? `${cat?.color}15` || 'var(--color-border)' : 'transparent',
                    color: copied === cmd.command ? cat?.color || 'var(--color-success)' : 'var(--color-text-secondary)',
                  }}
                >
                  {copied === cmd.command ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
