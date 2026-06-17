import React, { useState } from 'react';
import { EducationalPanel } from '../components/EducationalPanel';
import { Layers, Plus, Trash2, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const StackVisualizer: React.FC = () => {
  const [stack, setStack] = useState<string[]>(['10', '20', '30']);
  const [inputValue, setInputValue] = useState<string>('');
  const [peekedIdx, setPeekedIdx] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>(['Stack initialized with: [10, 20, 30]']);

  const handlePush = () => {
    if (!inputValue.trim()) return;
    if (stack.length >= 8) {
      alert("Stack Overflow! Maximum capacity is 8 items.");
      return;
    }
    setPeekedIdx(null);
    setStack((prev) => [...prev, inputValue.trim()]);
    setLogs((prev) => [`Pushed '${inputValue.trim()}' onto the stack`, ...prev]);
    setInputValue('');
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setLogs((prev) => ['Stack Underflow! Cannot pop from empty stack', ...prev]);
      alert("Stack Underflow! The stack is empty.");
      return;
    }
    setPeekedIdx(null);
    const poppedVal = stack[stack.length - 1];
    setStack((prev) => prev.slice(0, -1));
    setLogs((prev) => [`Popped '${poppedVal}' off the stack`, ...prev]);
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      setLogs((prev) => ['Peek failed: Stack is empty', ...prev]);
      alert("Stack is empty! Nothing to peek.");
      return;
    }
    const topIdx = stack.length - 1;
    setPeekedIdx(topIdx);
    setLogs((prev) => [`Peeked at top element: '${stack[topIdx]}'`, ...prev]);
    
    // Clear peek highlight after 1.5 seconds
    setTimeout(() => {
      setPeekedIdx(null);
    }, 1500);
  };

  const handleReset = () => {
    setStack([]);
    setPeekedIdx(null);
    setLogs(['Stack cleared']);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Layers className="w-6 h-6 text-brand-500" />
            Stack Visualizer (LIFO)
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Analyze the Last-In First-Out container mechanics. Elements are pushed & popped from the top.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Operations */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-6 lg:col-span-1">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Operations</h3>

            {/* Push Input & Button */}
            <div className="space-y-2">
              <label className="text-xs text-slate-450 dark:text-slate-500 font-semibold block">Push Operation</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={10}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value"
                  className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-brand-500"
                />
                <button
                  onClick={handlePush}
                  className="bg-brand-500 hover:bg-brand-600 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Push
                </button>
              </div>
            </div>

            {/* Pop and Peek Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={handlePop}
                className="bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Pop (Delete)
              </button>
              <button
                onClick={handlePeek}
                className="bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                Peek (Top)
              </button>
            </div>

            <button
              onClick={handleReset}
              className="w-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 py-2 rounded-xl text-xs font-bold text-slate-650 dark:text-slate-400 transition-all"
            >
              Clear Stack
            </button>
          </div>

          <hr className="border-slate-150 dark:border-slate-850" />

          {/* Operation History / Logs */}
          <div>
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-3">Action History</h3>
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl p-3 h-40 overflow-y-auto space-y-1.5 text-xs font-mono">
              {logs.map((log, index) => (
                <div key={index} className="text-slate-600 dark:text-slate-400">
                  &gt; {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Stack Visualizer Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm lg:col-span-2 flex flex-col justify-end items-center min-h-[400px] relative">
          
          {/* Top Label */}
          {stack.length > 0 && (
            <div className="absolute top-6 flex items-center gap-1.5 bg-brand-500/10 text-brand-650 dark:text-brand-400 text-xs font-bold px-3 py-1.5 rounded-full border border-brand-500/25">
              <span>Stack Top pointer =</span>
              <span className="font-mono text-brand-600 dark:text-brand-300">[{stack.length - 1}]</span>
            </div>
          )}

          {/* Stack Bucket / Cup Drawing */}
          <div className="border-x-4 border-b-4 border-slate-300 dark:border-slate-700 w-48 h-80 rounded-b-2xl flex flex-col justify-end p-2 gap-1.5 relative overflow-hidden">
            <AnimatePresence initial={false}>
              {stack.map((item, idx) => {
                const isPeeked = peekedIdx === idx;
                const isTop = idx === stack.length - 1;

                let itemClass = 'bg-brand-500 text-white shadow-md border-brand-600';
                if (isPeeked) {
                  itemClass = 'bg-amber-500 text-white shadow-lg border-amber-600 scale-105';
                }

                return (
                  <motion.div
                    key={`${idx}-${item}`}
                    initial={{ y: -300, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -300, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    className={`h-8 rounded-xl border flex items-center justify-between px-4 font-bold font-mono text-sm relative ${itemClass}`}
                  >
                    <span>{item}</span>
                    <span className="text-[10px] text-brand-200 dark:text-brand-300">
                      {isTop ? 'TOP' : `[${idx}]`}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {stack.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-600 text-xs font-semibold uppercase tracking-wider">
                Empty Stack
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Educational info */}
      <EducationalPanel algorithmId="stack" />
    </div>
  );
};
