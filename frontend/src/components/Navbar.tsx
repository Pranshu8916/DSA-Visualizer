import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { Sun, Moon, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-brand-600 dark:text-brand-400 tracking-tight">
              <Sparkles className="w-6 h-6 animate-pulse" />
              <span>Panshu's <span className="text-slate-800 dark:text-slate-100 font-semibold">DSALab</span></span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-250 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-750 transition-all hidden sm:block"
            >
              Docs
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
