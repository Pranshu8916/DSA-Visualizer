import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  onItemClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const menuItems = [
    { name: 'Home', path: '/', emoji: '🏠' },
    { name: 'Sorting', path: '/sorting', emoji: '📊' },
    { name: 'Searching', path: '/searching', emoji: '🔍' },
    { name: 'Stack', path: '/stack', emoji: '📚' },
    { name: 'Queue', path: '/queue', emoji: '🚶‍♂️' },
    { name: 'Linked List', path: '/linked-list', emoji: '🔗' },
    { name: 'BST', path: '/tree', emoji: '🌳' },
    { name: 'Graph', path: '/graph', emoji: '🕸️' },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white/60 backdrop-blur-sm border-r border-stone-200/40 lg:min-h-[calc(100vh-4rem)] p-4 flex flex-col gap-2 shrink-0">
      <div className="text-xs font-semibold text-stone-400 uppercase tracking-widest px-3 mb-3 hidden lg:flex items-center gap-1.5">
        <span>✨</span> Explore
      </div>
      <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 pb-2 lg:pb-0 scrollbar-none">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={onItemClick}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 whitespace-nowrap lg:whitespace-normal shrink-0 ${
                isActive 
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25 scale-[1.02]' 
                  : 'text-stone-600 hover:bg-brand-50 hover:text-brand-700 hover:scale-[1.01]'
              }`
            }
          >
            <span className="text-lg">{item.emoji}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
