import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('learningProgress');
    return saved ? JSON.parse(saved) : {};
  });

  const [beginnerMode, setBeginnerMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('learningProgress', JSON.stringify(progress));
  }, [progress]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const markComplete = (tutorialId) => {
    setProgress(prev => ({ ...prev, [tutorialId]: true }));
  };

  const markIncomplete = (tutorialId) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[tutorialId];
      return newProgress;
    });
  };

  const isComplete = (tutorialId) => !!progress[tutorialId];

  const completedCount = Object.keys(progress).length;
  const totalTutorials = 14;

  return (
    <AppContext.Provider value={{
      darkMode, toggleDarkMode,
      progress, setProgress,
      markComplete, markIncomplete, isComplete,
      completedCount, totalTutorials,
      beginnerMode, setBeginnerMode,
      searchQuery, setSearchQuery,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
