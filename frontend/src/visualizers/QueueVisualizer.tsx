import React, { useState } from 'react';
import { EducationalPanel } from '../components/EducationalPanel';
import { ArrowRightLeft, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const QueueVisualizer: React.FC = () => {
  const [queue, setQueue] = useState<string[]>(['10', '20', '30', '40']);
  const [inputValue, setInputValue] = useState<string>('');
  const [logs, setLogs] = useState<string[]>(['Queue initialized with: [10, 20, 30, 40]']);

  const handleEnqueue = () => {
    if (!inputValue.trim()) return;
    if (queue.length >= 8) {
      alert("Queue Full! Maximum capacity is 8 items.");
      return;
    }
    setQueue((prev) => [...prev, inputValue.trim()]);
    setLogs((prev) => [`Enqueued '${inputValue.trim()}' at the rear`, ...prev]);
    setInputValue('');
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setLogs((prev) => ['Queue Underflow! Cannot dequeue from empty queue', ...prev]);
      alert("Queue Underflow! The queue is empty.");
      return;
    }
    const dequeuedVal = queue[0];
    setQueue((prev) => prev.slice(1));
    setLogs((prev) => [`Dequeued '${dequeuedVal}' from the front`, ...prev]);
  };

  const handleReset = () => {
    setQueue([]);
    setLogs(['Queue cleared']);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <ArrowRightLeft className="w-6 h-6 text-brand-500" />
            Queue Visualizer (FIFO)
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Observe elements flowing in a First-In First-Out container. Enqueue happens at Rear, Dequeue at Front.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Operations controls */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-6 lg:col-span-1">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Operations</h3>

            {/* Enqueue */}
            <div className="space-y-2">
              <label className="text-xs text-slate-450 dark:text-slate-500 font-semibold block">Enqueue (Insert)</label>
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
                  onClick={handleEnqueue}
                  className="bg-brand-500 hover:bg-brand-600 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Enqueue
                </button>
              </div>
            </div>

            {/* Dequeue */}
            <div className="pt-2">
              <button
                onClick={handleDequeue}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Dequeue (Delete Front)
              </button>
            </div>

            <button
              onClick={handleReset}
              className="w-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 py-2 rounded-xl text-xs font-bold text-slate-650 dark:text-slate-400 transition-all"
            >
              Clear Queue
            </button>
          </div>

          <hr className="border-slate-150 dark:border-slate-850" />

          {/* Operation history logs */}
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

        {/* Queue Conveyor track */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm lg:col-span-2 flex flex-col justify-center min-h-[400px]">
          
          <div className="flex flex-col items-center gap-10">
            {/* Visual Queue Track */}
            <div className="w-full border-y-4 border-slate-200 dark:border-slate-800 h-24 flex items-center px-4 gap-2 relative bg-slate-50/50 dark:bg-slate-950/20 overflow-x-auto scrollbar-none rounded-sm">
              <AnimatePresence initial={false}>
                {queue.map((item, idx) => {
                  const isFront = idx === 0;
                  const isRear = idx === queue.length - 1;

                  return (
                    <motion.div
                      key={`${idx}-${item}`}
                      layout
                      initial={{ x: 200, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -200, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                      className="w-16 h-16 shrink-0 rounded-xl border border-brand-600 bg-brand-500 text-white flex flex-col items-center justify-center font-bold font-mono text-sm relative shadow-md"
                    >
                      <span>{item}</span>
                      
                      {/* Sub-label indicators */}
                      <span className="text-[9px] text-brand-200 absolute bottom-1">
                        [{idx}]
                      </span>

                      {/* Front Pointer Indicator */}
                      {isFront && (
                        <div className="absolute -top-10 flex flex-col items-center">
                          <span className="text-[10px] bg-emerald-500 text-white font-extrabold px-1.5 py-0.5 rounded shadow">
                            FRONT
                          </span>
                          <span className="text-emerald-500 font-bold leading-none text-sm">↓</span>
                        </div>
                      )}

                      {/* Rear Pointer Indicator */}
                      {isRear && (
                        <div className="absolute -bottom-10 flex flex-col items-center">
                          <span className="text-brand-500 font-bold leading-none text-sm">↑</span>
                          <span className="text-[10px] bg-amber-500 text-white font-extrabold px-1.5 py-0.5 rounded shadow">
                            REAR
                          </span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {queue.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-600 text-xs font-semibold uppercase tracking-wider">
                  Empty Queue (No elements)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Educational info */}
      <EducationalPanel algorithmId="queue" />
    </div>
  );
};
