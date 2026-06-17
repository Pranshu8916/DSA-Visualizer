import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Search, 
  Layers, 
  ArrowRightLeft, 
  GitCommit, 
  Network, 
  Workflow 
} from 'lucide-react';

interface SidebarProps {
  onItemClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Sorting Algorithms', path: '/sorting', icon: BarChart3 },
    { name: 'Searching Algorithms', path: '/searching', icon: Search },
    { name: 'Stack Visualizer', path: '/stack', icon: Layers },
    { name: 'Queue Visualizer', path: '/queue', icon: ArrowRightLeft },
    { name: 'Linked List', path: '/linked-list', icon: GitCommit },
    { name: 'Binary Search Tree', path: '/tree', icon: Network },
    { name: 'Graph Visualizer', path: '/graph', icon: Workflow },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 lg:min-h-[calc(100vh-4rem)] p-4 flex flex-col gap-2 shrink-0">
      <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2 hidden lg:block">
        Visualizers
      </div>
      <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 pb-2 lg:pb-0 scrollbar-none">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={onItemClick}
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap lg:whitespace-normal shrink-0 ${
                isActive 
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
