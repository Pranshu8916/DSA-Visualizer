import React, { useState } from 'react';
import { Search, BookOpen, Clock, ArrowRight, User } from 'lucide-react';

export const Blogs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const tags = ['All', 'Sorting', 'Graphs', 'Dynamic Programming', 'Interview Prep', 'Trees'];

  const articles = [
    {
      id: 1,
      title: 'Mastering Quick Sort & Merge Sort: A Visual Breakdown',
      category: 'Sorting',
      readTime: '6 min read',
      date: 'May 14, 2026',
      author: 'Pranshu Bodara',
      excerpt: 'Compare partition schemes and recursion stack frames in Quick Sort vs divide-and-conquer auxiliary arrays in Merge Sort.',
      link: '/visualizer?tab=sorting'
    },
    {
      id: 2,
      title: 'Graph Traversals Demystified: BFS vs DFS with Visual Traces',
      category: 'Graphs',
      readTime: '8 min read',
      date: 'June 02, 2026',
      author: 'Pranshu Bodara',
      excerpt: 'Learn when to use Breadth-First Search queue traversal versus Depth-First Search call stacks for shortest paths and cycle detection.',
      link: '/visualizer?tab=graph'
    },
    {
      id: 3,
      title: 'Dynamic Programming for Beginners: From Recursion to Memoization',
      category: 'Dynamic Programming',
      readTime: '10 min read',
      date: 'June 18, 2026',
      author: 'Pranshu Bodara',
      excerpt: 'Step-by-step guide to recognizing overlapping subproblems, defining state transitions, and converting exponential recursion into polynomial tables.',
      link: '/design-algorithm'
    },
    {
      id: 4,
      title: 'Top 10 DSA Interview Questions Asked at Tech Giants',
      category: 'Interview Prep',
      readTime: '7 min read',
      date: 'July 10, 2026',
      author: 'Pranshu Bodara',
      excerpt: 'Curated list of essential LeetCode mediums and hard algorithms with step-by-step visual explanations.',
      link: '/visualizer'
    },
    {
      id: 5,
      title: 'Binary Search Tree Traversals & Rotations Explained',
      category: 'Trees',
      readTime: '5 min read',
      date: 'August 05, 2026',
      author: 'Pranshu Bodara',
      excerpt: 'Understand Inorder, Preorder, and Postorder recursive calls and tree rebalancing visually.',
      link: '/visualizer?tab=tree'
    }
  ];

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || art.category === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#F8FBFF] text-[#1A2340]">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#3B78C8] bg-[#D9ECFF] px-3.5 py-1 rounded-full border border-[#9BC8FF]">
            <BookOpen className="w-4 h-4" />
            DSA Knowledge Base
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1A2340]">
            Blogs & <span className="text-[#3B78C8]">Tutorials</span>
          </h1>
          <p className="text-[#1A2340]/70 text-base leading-relaxed font-medium">
            In-depth guides, interview tips, and step-by-step algorithm visual breakdowns by Pranshu Bodara.
          </p>
        </div>

        {/* Search & Tags */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedTag === tag
                    ? 'bg-[#3B78C8] text-white shadow-md shadow-[#3B78C8]/25'
                    : 'bg-white text-[#1A2340] border border-[#9BC8FF]/50 hover:border-[#3B78C8]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#9BC8FF]/50 text-[#1A2340] text-xs rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-[#3B78C8] shadow-sm font-medium"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map(article => (
            <div
              key={article.id}
              className="bg-white border border-[#9BC8FF]/50 rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="font-bold uppercase tracking-wider text-[#3B78C8] bg-[#D9ECFF] px-2.5 py-1 rounded-md border border-[#9BC8FF]/50">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#1A2340] group-hover:text-[#3B78C8] transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-[#1A2340]/70 mt-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#9BC8FF]/20 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1.5 font-bold text-[#3B78C8]">
                  <User className="w-3.5 h-3.5" />
                  {article.author}
                </span>
                <span className="text-[#3B78C8] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
