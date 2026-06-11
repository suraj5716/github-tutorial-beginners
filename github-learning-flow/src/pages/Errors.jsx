import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { commonErrors } from '../data/errors';
import { ChevronDown, ChevronUp, AlertTriangle, Copy, Check } from 'lucide-react';

export default function Errors() {
  const [expanded, setExpanded] = useState(null);
  const [copied, setCopied] = useState(null);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle size={22} style={{ color: '#ef4444' }} />
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
            Common Git Errors
          </h1>
        </div>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {commonErrors.length} common errors and how to fix them
        </p>
      </motion.div>

      <div className="space-y-3">
        {commonErrors.map((error) => {
          const isOpen = expanded === error.id;

          return (
            <motion.div
              key={error.id}
              layout
              className="rounded-xl border overflow-hidden transition-all"
              style={{
                background: 'var(--color-surface)',
                borderColor: isOpen ? '#ef444440' : 'var(--color-border)',
              }}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : error.id)}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: '#ef4444' }}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                    {error.title}
                  </span>
                  <div
                    className="text-xs mt-1 font-mono truncate"
                    style={{ color: '#ef4444' }}
                  >
                    {error.error}
                  </div>
                </div>
                {isOpen ? (
                  <ChevronUp size={16} style={{ color: 'var(--color-text-secondary)' }} />
                ) : (
                  <ChevronDown size={16} style={{ color: 'var(--color-text-secondary)' }} />
                )}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t px-4 pb-4 overflow-hidden"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <div className="mt-3 space-y-3">
                      <div>
                        <div className="text-xs font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                          Cause
                        </div>
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                          {error.cause}
                        </p>
                      </div>
                      <div>
                        <div className="text-xs font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                          Solution
                        </div>
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                          {error.solution}
                        </p>
                      </div>
                      <div>
                        <div className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                          Steps to fix
                        </div>
                        <div className="space-y-1">
                          {error.steps.map((step, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span
                                className="text-[10px] font-bold w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5"
                                style={{
                                  background: '#ef444415',
                                  color: '#ef4444',
                                }}
                              >
                                {i + 1}
                              </span>
                              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                                {step}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(error.error);
                          setCopied(error.id);
                          setTimeout(() => setCopied(null), 1500);
                        }}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
                        style={{
                          background: 'var(--color-bg)',
                          color: 'var(--color-text-secondary)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        {copied === error.id ? (
                          <><Check size={12} /> Copied</>
                        ) : (
                          <><Copy size={12} /> Copy Error</>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
