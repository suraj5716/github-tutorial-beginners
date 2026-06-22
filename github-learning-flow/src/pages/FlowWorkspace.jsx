import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tutorials, topicCategories } from '../data/tutorials';
import { useApp } from '../context/AppContext';
import FlowDiagram from '../components/FlowDiagram';
import { Copy, Check, ChevronDown, ChevronUp, BookOpen, ArrowLeft, Terminal } from 'lucide-react';

export default function FlowWorkspace() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const topicId = searchParams.get('topic');
  const { beginnerMode } = useApp();

  const [expandedTutorials, setExpandedTutorials] = useState({});
  const [copied, setCopied] = useState({});

  const activeTutorial = topicId ? tutorials.find(t => t.id === topicId) : null;

  const filteredTutorials = beginnerMode
    ? tutorials.filter(t => ['basics', 'setup', 'commands'].includes(t.category))
    : tutorials;

  const toggleExpand = (id) => {
    setExpandedTutorials(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (activeTutorial) {
      setExpandedTutorials(prev => ({ ...prev, [activeTutorial.id]: true }));
    }
  }, [activeTutorial?.id]);

  if (activeTutorial) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => navigate('/workspace')}
            className="flex items-center gap-1.5 text-xs mb-4 transition-all"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <ArrowLeft size={14} />
            Back to all topics
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: activeTutorial.color }}
            />
            <div>
              <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                {activeTutorial.title}
              </h1>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                {activeTutorial.shortDesc}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <FlowDiagram tutorialId={activeTutorial.id} />
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div
                className="rounded-xl border p-4"
                style={{
                  background: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                  <BookOpen size={14} />
                  Explanation
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {activeTutorial.explanation}
                </p>
              </div>

              {activeTutorial.command && (
                <div
                  className="rounded-xl border p-4"
                  style={{
                    background: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                      <Terminal size={14} />
                      Command
                    </h3>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(activeTutorial.command);
                        setCopied(prev => ({ ...prev, [activeTutorial.id]: true }));
                        setTimeout(() => setCopied(prev => ({ ...prev, [activeTutorial.id]: false })), 1500);
                      }}
                      className="p-1.5 rounded-lg transition-all"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {copied[activeTutorial.id] ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <pre
                    className="text-xs p-3 rounded-lg overflow-x-auto font-mono leading-relaxed"
                    style={{
                      background: 'var(--color-bg)',
                      color: activeTutorial.color,
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {activeTutorial.command}
                  </pre>
                </div>
              )}

              <div
                className="rounded-xl border p-4"
                style={{
                  background: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                  Steps ({activeTutorial.nodes.length})
                </h3>
                <div className="space-y-2">
                  {activeTutorial.nodes.map((node, i) => (
                    <div key={node.id} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                        style={{
                          background: `${activeTutorial.color}15`,
                          color: activeTutorial.color,
                        }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
                          {node.label}
                        </div>
                        <div className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                          {node.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
          Flow Workspace
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          Select a topic to explore its interactive workflow
        </p>
      </motion.div>

      <div className="grid gap-3">
        {filteredTutorials.map((tutorial) => {
          const cat = topicCategories.find(c => c.id === tutorial.category);
          const expanded = expandedTutorials[tutorial.id];

          return (
            <motion.div
              key={tutorial.id}
              layout
              className="rounded-xl border overflow-hidden transition-all"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <button
                onClick={() => toggleExpand(tutorial.id)}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: tutorial.color }}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                    {tutorial.title}
                  </span>
                  {cat && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium ml-2"
                      style={{
                        background: `${tutorial.color}15`,
                        color: tutorial.color,
                      }}
                    >
                      {cat.label}
                    </span>
                  )}
                </div>
                {expanded ? (
                  <ChevronUp size={16} style={{ color: 'var(--color-text-secondary)' }} />
                ) : (
                  <ChevronDown size={16} style={{ color: 'var(--color-text-secondary)' }} />
                )}
              </button>

              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t px-4 pb-4"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <p className="text-xs mt-3 mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    {tutorial.shortDesc}
                  </p>
                  <FlowDiagram tutorialId={tutorial.id} />
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/workspace?topic=${tutorial.id}`);
                      }}
                      className="text-xs px-4 py-2 rounded-lg transition-all"
                      style={{
                        background: 'var(--color-primary)',
                        color: 'white',
                      }}
                    >
                      Open Full View
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
