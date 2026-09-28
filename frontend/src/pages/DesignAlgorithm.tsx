import React, { useState } from 'react';
import { BarChart2, Cpu, GitBranch, Layers, Zap, BookOpen, CheckCircle } from 'lucide-react';

export const DesignAlgorithm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('divide-conquer');

  const paradigms = [
    {
      id: 'divide-conquer',
      title: 'Divide and Conquer',
      icon: GitBranch,
      badge: 'Divide • Conquer • Combine',
      summary: 'Breaks a problem into subproblems of the same type, solves them recursively, and combines solutions.',
      examples: ['Merge Sort', 'Quick Sort', 'Binary Search', 'Strassen Matrix Multiplication'],
      timeComplexity: 'O(n log n)',
      explanation: 'Divide the problem into smaller independent subproblems, solve each subproblem recursively, and combine subproblem results into the final answer.'
    },
    {
      id: 'greedy',
      title: 'Greedy Method',
      icon: Zap,
      badge: 'Locally Optimal Choices',
      summary: 'Makes locally optimal choices at each step in the hope of finding a global optimum.',
      examples: ["Dijkstra's Algorithm", "Kruskal's MST", "Prim's MST", "Fractional Knapsack"],
      timeComplexity: 'O(V log V + E) or O(E log V)',
      explanation: 'Always selects the immediate best option without reconsidering past decisions. Fast and memory efficient for matroid problems.'
    },
    {
      id: 'dynamic-programming',
      title: 'Dynamic Programming',
      icon: Layers,
      badge: 'Overlapping Subproblems',
      summary: 'Solves complex problems by breaking them down into overlapping subproblems and caching results (memoization/tabulation).',
      examples: ['0/1 Knapsack', 'Longest Common Subsequence (LCS)', 'Floyd-Warshall', 'Fibonacci Numbers'],
      timeComplexity: 'O(n × W) or Polynomial',
      explanation: 'Stores solutions to subproblems in a table to prevent recalculation. Essential for optimization problems with optimal substructure.'
    },
    {
      id: 'backtracking',
      title: 'Backtracking',
      icon: Cpu,
      badge: 'Systematic Search Space',
      summary: 'Explores all potential solution paths, abandoning a path ("backtracking") as soon as it determines the path cannot form a valid solution.',
      examples: ['N-Queens Problem', 'Sudoku Solver', 'Subset Sum', 'Graph Coloring'],
      timeComplexity: 'O(2ⁿ) or O(n!)',
      explanation: 'Builds candidates incrementally and abandons partial candidates as soon as they fail constraint validation.'
    }
  ];

  const complexityTable = [
    { name: 'O(1)', classification: 'Constant', example: 'Array Index Lookup, Stack Push/Pop', status: 'Optimal' },
    { name: 'O(log n)', classification: 'Logarithmic', example: 'Binary Search, BST Lookup', status: 'Excellent' },
    { name: 'O(n)', classification: 'Linear', example: 'Linear Search, Unsorted Array Scan', status: 'Good' },
    { name: 'O(n log n)', classification: 'Linearithmic', example: 'Merge Sort, Quick Sort, Heap Sort', status: 'Fair' },
    { name: 'O(n²)', classification: 'Quadratic', example: 'Bubble Sort, Insertion Sort', status: 'Poor for large n' },
    { name: 'O(2ⁿ)', classification: 'Exponential', example: 'Recursive Fibonacci, N-Queens', status: 'Worst' }
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#F8FBFF] text-[#1A2340]">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#3B78C8] bg-[#D9ECFF] px-3.5 py-1 rounded-full border border-[#9BC8FF]">
            <BookOpen className="w-4 h-4" />
            Core Algorithm Theory
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1A2340]">
            Design & Analysis of <span className="text-[#3B78C8]">Algorithms</span>
          </h1>
          <p className="text-[#1A2340]/70 text-base md:text-lg leading-relaxed font-medium">
            Understand fundamental algorithmic paradigms, time-space complexities, and problem-solving patterns.
          </p>
        </div>

        {/* Algorithm Paradigms Selector */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {paradigms.map((p) => {
            const Icon = p.icon;
            const isSelected = activeTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#3B78C8] text-white border-[#3B78C8] shadow-lg shadow-[#3B78C8]/25'
                    : 'bg-white text-[#1A2340] border-[#9BC8FF]/50 hover:border-[#3B78C8]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-[#3B78C8]'}`} />
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-[#D9ECFF] text-[#3B78C8]'}`}>
                    {p.badge}
                  </span>
                </div>
                <h3 className="font-bold text-base md:text-lg">{p.title}</h3>
              </button>
            );
          })}
        </div>

        {/* Selected Paradigm Detail Card */}
        {(() => {
          const current = paradigms.find(p => p.id === activeTab) || paradigms[0];
          return (
            <div className="bg-white border border-[#9BC8FF]/50 rounded-3xl p-8 md:p-10 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#9BC8FF]/30 pb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A2340] flex items-center gap-3">
                    <current.icon className="w-8 h-8 text-[#3B78C8]" />
                    {current.title}
                  </h2>
                  <p className="text-[#1A2340]/70 text-sm md:text-base mt-2">
                    {current.summary}
                  </p>
                </div>
                <div className="bg-[#D9ECFF]/60 border border-[#9BC8FF] p-4 rounded-2xl text-center shrink-0">
                  <span className="block text-xs uppercase font-bold text-[#3B78C8]">Typical Complexity</span>
                  <span className="text-xl font-bold font-mono text-[#1A2340]">{current.timeComplexity}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-[#1A2340] text-base">Key Concept & Strategy</h4>
                  <p className="text-sm text-[#1A2340]/80 leading-relaxed bg-[#F8FBFF] p-5 rounded-2xl border border-[#9BC8FF]/40">
                    {current.explanation}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-[#1A2340] text-base">Classic Examples & Applications</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {current.examples.map((ex, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 bg-[#F8FBFF] rounded-xl border border-[#9BC8FF]/40 text-xs font-semibold text-[#1A2340]">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Asymptotic Complexity Table */}
        <div className="bg-white border border-[#9BC8FF]/50 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart2 className="w-6 h-6 text-[#3B78C8]" />
            <h2 className="text-2xl font-bold text-[#1A2340]">Asymptotic Complexity Reference</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8FBFF] text-[#1A2340] uppercase text-xs font-bold border-b border-[#9BC8FF]/30">
                <tr>
                  <th className="px-6 py-4">Notation</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Example Algorithm</th>
                  <th className="px-6 py-4">Efficiency Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#9BC8FF]/20 font-semibold">
                {complexityTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#D9ECFF]/30 transition">
                    <td className="px-6 py-4 font-mono font-bold text-[#3B78C8]">{row.name}</td>
                    <td className="px-6 py-4 text-[#1A2340]">{row.classification}</td>
                    <td className="px-6 py-4 text-[#1A2340]/70">{row.example}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D9ECFF] text-[#3B78C8] border border-[#9BC8FF]">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
