import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import { useApp } from '../context/AppContext';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children }) {
  const { searchQuery, setSearchQuery } = useApp();
  const [mobileSidebar, setMobileSidebar] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {mobileSidebar && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setMobileSidebar(false)}
          />
          <div className="relative">
            <Sidebar />
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col min-w-0">
        <header
          className="h-16 flex items-center justify-between px-4 md:px-6 border-b shrink-0 gap-4"
          style={{
            background: 'var(--color-bg)',
            borderColor: 'var(--color-border)',
          }}
        >
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: 'var(--color-text-secondary)' }}
            onClick={() => setMobileSidebar(true)}
          >
            <Menu size={20} />
          </button>

          <div className="flex-1 flex justify-center md:justify-end">
            <SearchBar />
          </div>

          {searchQuery && (
            <div className="hidden md:block text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              {searchQuery}
            </div>
          )}
        </header>

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
