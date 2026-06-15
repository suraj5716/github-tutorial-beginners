import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tutorials, topicCategories } from '../data/tutorials';
import { useApp } from '../context/AppContext';
import { useSearch } from '../hooks/useSearch';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { isComplete, beginnerMode } = useApp();
  const { searchQuery } = useApp();
  const { results, highlighted } = useSearch(searchQuery);

  const resultIds = new Set(results.map(t => t.id));
  const filtered = searchQuery
    ? tutorials.filter(t => resultIds.has(t.id))
    : tutorials;

  const displayTopics = beginnerMode
    ? filtered.filter(t => ['basics', 'setup', 'commands'].includes(t.category))
    : filtered;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
          Tutorial Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          {beginnerMode ? 'Beginner-friendly topics' : 'All topics'} • {displayTopics.length} tutorials
        </p>
      </motion.div>

      {searchQuery && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            No tutorials found for "{searchQuery}"
          </p>
        </div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-3"
      >
        {displayTopics.map((tutorial) => {
          const cat = topicCategories.find(c => c.id === tutorial.category);
          const completed = isComplete(tutorial.id);
          const isHighlighted = highlighted.includes(tutorial.id);

          return (
            <motion.div
              key={tutorial.id}
              variants={item}
              layout
              onClick={() => navigate(`/workspace?topic=${tutorial.id}`)}
              className="rounded-xl border p-4 cursor-pointer transition-all duration-200"
              style={{
                background: isHighlighted
                  ? 'var(--color-primary-light)'
                  : 'var(--color-surface)',
                borderColor: isHighlighted
                  ? 'var(--color-primary)30'
                  : 'var(--color-border)',
                opacity: isHighlighted ? 1 : 0.9,
              }}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    completed ? null : null;
                  }}
                  className="shrink-0"
                >
                  {completed ? (
                    <CheckCircle size={20} style={{ color: 'var(--color-success)' }} />
                  ) : (
                    <Circle size={20} style={{ color: 'var(--color-border)' }} />
                  )}
                </button>

                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: tutorial.color }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                      {tutorial.title}
                    </span>
                    {cat && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: `${tutorial.color}15`,
                          color: tutorial.color,
                        }}
                      >
                        {cat.label}
                      </span>
                    )}
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                    {tutorial.shortDesc}
                  </div>
                </div>

                <ArrowRight
                  size={16}
                  className="shrink-0"
                  style={{ color: 'var(--color-text-secondary)' }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
