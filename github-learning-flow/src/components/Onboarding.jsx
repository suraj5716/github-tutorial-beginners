import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch } from 'lucide-react';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 3) {
        setStep(s => s + 1);
      } else {
        onComplete();
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [step, onComplete]);

  const messages = [
    'Welcome to GitHub Learning Flow',
    'Learn Git visually',
    'Master version control',
    'Ready? Let\'s go!',
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{ background: 'var(--color-bg)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'var(--color-primary)' }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <GitBranch size={28} className="text-white" />
          </motion.div>

          <motion.h1
            className="text-2xl font-bold mb-2"
            style={{ color: 'var(--color-text)' }}
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {messages[Math.min(step, messages.length - 1)]}
          </motion.h1>

          <div className="flex gap-1.5 justify-center mt-6">
            {[0, 1, 2, 3].map(i => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: i <= step ? 'var(--color-primary)' : 'var(--color-border)',
                }}
                animate={{ scale: i === step ? 1.5 : 1 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
