import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp, Send, MessageSquare, Search } from 'lucide-react';

const faqs = [
  {
    q: 'What is the difference between Git and GitHub?',
    a: 'Git is a version control system that runs locally on your machine. GitHub is a cloud platform that hosts Git repositories and adds collaboration features like pull requests, issues, and actions.',
  },
  {
    q: 'What does "commit" mean?',
    a: 'A commit is a snapshot of your changes at a point in time. Think of it like saving a checkpoint in a game — you can always go back to it.',
  },
  {
    q: 'What is a "branch" and why use it?',
    a: 'A branch is an independent line of development. You create branches to work on features or fixes without affecting the main codebase. Once done, you merge the branch back.',
  },
  {
    q: 'What is a pull request?',
    a: 'A pull request (PR) is a request to merge changes from one branch into another. It lets your team review code, discuss changes, and approve before merging.',
  },
  {
    q: 'What does "git clone" do?',
    a: 'git clone downloads an entire remote repository (including all history) to your local machine, so you can start working on it immediately.',
  },
  {
    q: 'What is a merge conflict?',
    a: 'A merge conflict happens when two branches modify the same part of the same file. Git cannot automatically decide which change to keep, so you must resolve it manually.',
  },
  {
    q: 'What is .gitignore used for?',
    a: '.gitignore tells Git which files or folders to ignore (not track). Common examples: node_modules/, .env, build/, *.log.',
  },
  {
    q: 'How do I undo a commit?',
    a: 'Use "git reset --soft HEAD~1" to undo the last commit while keeping your changes, or "git reset --hard HEAD~1" to discard changes entirely.',
  },
];

export default function Queries() {
  const [expanded, setExpanded] = useState(null);
  const [question, setQuestion] = useState('');
  const [userQuestions, setUserQuestions] = useState(() => {
    const saved = localStorage.getItem('userQuestions');
    return saved ? JSON.parse(saved) : [];
  });
  const [search, setSearch] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    const newQ = { id: Date.now(), text: question.trim(), date: new Date().toLocaleDateString() };
    const updated = [newQ, ...userQuestions];
    setUserQuestions(updated);
    localStorage.setItem('userQuestions', JSON.stringify(updated));
    setQuestion('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  const filteredFaqs = search
    ? faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
    : faqs;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <HelpCircle size={22} style={{ color: 'var(--color-primary)' }} />
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Queries</h1>
        </div>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Frequently asked questions — ask your own if you don't find an answer
        </p>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-3 space-y-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-8 pr-3 py-2 rounded-lg text-sm outline-none transition-all"
              style={{
                background: 'var(--color-surface)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
            />
          </div>

          {filteredFaqs.map((faq, i) => {
            const isOpen = expanded === i;
            return (
              <motion.div
                key={i}
                layout
                className="rounded-xl border overflow-hidden transition-all"
                style={{
                  background: 'var(--color-surface)',
                  borderColor: isOpen ? 'var(--color-primary)30' : 'var(--color-border)',
                }}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-primary-light)' }}
                  >
                    <span className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>?</span>
                  </div>
                  <span className="text-sm font-medium flex-1" style={{ color: 'var(--color-text)' }}>
                    {faq.q}
                  </span>
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
                      <p className="text-xs mt-3 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                No matching questions found
              </p>
            </div>
          )}
        </div>

        <div className="md:col-span-2 space-y-4">
          <div
            className="rounded-xl border p-4"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={16} style={{ color: 'var(--color-primary)' }} />
              <h2 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Ask a Question</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="Type your question here..."
                rows={4}
                className="w-full p-3 rounded-lg text-sm outline-none resize-none transition-all"
                style={{
                  background: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
              />
              <button
                type="submit"
                disabled={!question.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium mt-2 transition-all"
                style={{
                  background: question.trim() ? 'var(--color-primary)' : 'var(--color-border)',
                  color: question.trim() ? 'white' : 'var(--color-text-secondary)',
                }}
              >
                <Send size={12} />
                {submitted ? 'Sent!' : 'Submit'}
              </button>
            </form>
          </div>

          {userQuestions.length > 0 && (
            <div
              className="rounded-xl border p-4"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                Your Questions ({userQuestions.length})
              </h2>
              <div className="space-y-2">
                {userQuestions.map(q => (
                  <div
                    key={q.id}
                    className="p-3 rounded-lg text-xs"
                    style={{
                      background: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <p style={{ color: 'var(--color-text)' }}>{q.text}</p>
                    <p className="mt-1 text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>
                      {q.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
