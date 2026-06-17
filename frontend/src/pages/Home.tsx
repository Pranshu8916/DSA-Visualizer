import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, BarChart3, ArrowRight, BookOpen, Layers, Network, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';

interface AlgorithmCard {
  id: string;
  name: string;
  category: string;
  description: string;
  link: string;
  timeComplexity: string;
  spaceComplexity: string;
  icon: any;
  color: string;
}

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Sorting', 'Searching', 'Data Structures', 'Trees', 'Graphs'];

  const algorithms: AlgorithmCard[] = [
    {
      id: 'bubble-sort',
      name: 'Bubble Sort',
      category: 'Sorting',
      description: 'A simple comparison sorting algorithm that repeatedly swaps adjacent elements if they are out of order.',
      link: '/sorting',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      icon: BarChart3,
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'merge-sort',
      name: 'Merge Sort',
      category: 'Sorting',
      description: 'An efficient, stable, divide-and-conquer sorting algorithm that splits list in halves, sorts, and merges.',
      link: '/sorting',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      icon: BarChart3,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'quick-sort',
      name: 'Quick Sort',
      category: 'Sorting',
      description: 'Highly efficient partitioning divide-and-conquer algorithm that sorts elements around a chosen pivot.',
      link: '/sorting',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(log n)',
      icon: BarChart3,
      color: 'from-violet-500 to-purple-500'
    },
    {
      id: 'binary-search',
      name: 'Binary Search',
      category: 'Searching',
      description: 'Efficient search algorithm on sorted arrays that repeatedly divides the search interval in half.',
      link: '/searching',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      icon: Search,
      color: 'from-emerald-550 to-teal-500'
    },
    {
      id: 'stack',
      name: 'Stack Visualizer',
      category: 'Data Structures',
      description: 'A linear Last-In First-Out (LIFO) container supporting push, pop, and peek operations.',
      link: '/stack',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(n)',
      icon: Layers,
      color: 'from-rose-500 to-pink-500'
    },
    {
      id: 'queue',
      name: 'Queue Visualizer',
      category: 'Data Structures',
      description: 'A linear First-In First-Out (FIFO) conveyor track container supporting enqueue and dequeue.',
      link: '/queue',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(n)',
      icon: Layers,
      color: 'from-sky-500 to-cyan-500'
    },
    {
      id: 'linked-list',
      name: 'Linked List',
      category: 'Data Structures',
      description: 'A sequential chain of nodes pointing to next nodes, supporting custom insertions, deletions and reverse.',
      link: '/linked-list',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      icon: Network,
      color: 'from-teal-500 to-emerald-500'
    },
    {
      id: 'binary-search-tree',
      name: 'Binary Search Tree',
      category: 'Trees',
      description: 'A sorted node binary tree showing Inorder, Preorder, Postorder traversals and insertions.',
      link: '/tree',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(n)',
      icon: Network,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'graph',
      name: 'Graph Traversals',
      category: 'Graphs',
      description: 'BFS and DFS traversals on dynamically built node network graphs.',
      link: '/graph',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      icon: Workflow,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  // Filters logic
  const filteredAlgos = algorithms.filter((algo) => {
    const matchesSearch =
      algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      algo.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || algo.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner with modern look */}
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-600 to-indigo-700 dark:from-slate-900 dark:to-brand-950 rounded-3xl p-8 md:p-12 shadow-xl shadow-brand-500/10">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 bg-white/10 dark:bg-slate-800/50 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Learning Laboratory</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-fuchsia-500/20 backdrop-blur text-fuchsia-200 text-xs font-extrabold px-3 py-1 rounded-full border border-fuchsia-500/30">
              <span>Author: Panshu Bodara</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Master Data Structures & Algorithms visually.
          </h1>
          <p className="text-brand-100 dark:text-slate-300 text-sm md:text-base leading-relaxed">
            Step through code, observe execution pointer adjustments, and interact directly with trees, arrays, graphs, stacks, and lists.
          </p>
        </div>
        
        {/* Background gradient graphics */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
          <div className="w-full h-full border-4 border-dashed border-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>

      {/* Categories & Search Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-950'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search algorithms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-205 text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-brand-500 shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Algorithm Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlgos.map((algo) => (
          <motion.div
            key={algo.id}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            {/* Top row */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-extrabold uppercase bg-brand-50 dark:bg-brand-950/20 text-brand-650 dark:text-brand-405 px-2.5 py-1 rounded-md border border-brand-500/10">
                  {algo.category}
                </span>
                
                {/* Accent Icon */}
                <div className={`p-2 rounded-xl bg-gradient-to-br ${algo.color} text-white shadow-sm`}>
                  <algo.icon className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand-500 transition-colors">
                {algo.name}
              </h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm leading-relaxed min-h-[60px]">
                {algo.description}
              </p>
            </div>

            {/* Bottom Complexity row */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
              <div className="flex gap-4">
                <div>
                  <span className="block text-[8px] uppercase font-bold tracking-wider text-slate-400">Time</span>
                  <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{algo.timeComplexity}</span>
                </div>
                <div>
                  <span className="block text-[8px] uppercase font-bold tracking-wider text-slate-400">Space</span>
                  <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{algo.spaceComplexity}</span>
                </div>
              </div>

              <Link
                to={algo.link}
                className="flex items-center gap-1 text-xs font-extrabold text-brand-600 dark:text-brand-400 group-hover:gap-2 transition-all"
              >
                <span>Visualize</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        ))}

        {filteredAlgos.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-400 dark:text-slate-650">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-semibold uppercase tracking-wider">No algorithms match your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};
