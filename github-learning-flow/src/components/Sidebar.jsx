import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  BookOpen, LayoutDashboard, GitBranch, Terminal,
  AlertTriangle, HelpCircle, Moon, Sun, GraduationCap,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const links = [
  { to: '/', icon: BookOpen, label: 'Landing' },
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/workspace', icon: GitBranch, label: 'Flow Workspace' },
  { to: '/cheatsheet', icon: Terminal, label: 'Cheat Sheet' },
  { to: '/errors', icon: AlertTriangle, label: 'Common Errors' },
  { to: '/queries', icon: HelpCircle, label: 'Queries' },

];

export default function Sidebar() {
  const { darkMode, toggleDarkMode, beginnerMode, setBeginnerMode } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="h-screen sticky top-0 flex flex-col border-r transition-all duration-300"
      style={{
        width: collapsed ? 64 : 240,
        background: 'var(--color-sidebar)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div
        className="flex items-center gap-3 px-4 h-16 border-b shrink-0"
        style={{ borderColor: 'var(--color-border)' }}
      >
        {!collapsed && (
          <>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--color-primary)' }}
            >
              <GitBranch size={16} className="text-white" />
            </div>
            <span className="font-semibold text-sm whitespace-nowrap" style={{ color: 'var(--color-text)' }}>
              GitHub Learning
            </span>
          </>
        )}
        {collapsed && (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto"
            style={{ background: 'var(--color-primary)' }}
          >
            <GitBranch size={16} className="text-white" />
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                collapsed ? 'justify-center' : ''
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? 'var(--color-primary-light)' : 'transparent',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            })}
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div
        className="border-t px-3 py-3 space-y-2"
        style={{ borderColor: 'var(--color-border)' }}
      >
        {!collapsed && (
          <button
            onClick={() => setBeginnerMode(!beginnerMode)}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-all"
            style={{
              color: 'var(--color-text-secondary)',
              background: 'transparent',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-light)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <GraduationCap size={16} className="shrink-0" />
            <span className="truncate">{beginnerMode ? 'Beginner' : 'Advanced'} Mode</span>
          </button>
        )}

        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-all"
          style={{
            color: 'var(--color-text-secondary)',
            background: 'transparent',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-light)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {darkMode ? <Sun size={16} className="shrink-0" /> : <Moon size={16} className="shrink-0" />}
          {!collapsed && <span className="truncate">{darkMode ? 'Light' : 'Dark'} Mode</span>}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-all"
          style={{
            color: 'var(--color-text-secondary)',
            background: 'transparent',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-light)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span className="truncate">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
