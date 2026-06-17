import React, { useState } from 'react';
import { EducationalPanel } from '../components/EducationalPanel';
import { GitCommit, RefreshCw, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NodeItem {
  id: string;
  value: string;
}

export const LinkedListVisualizer: React.FC = () => {
  const [list, setList] = useState<NodeItem[]>([
    { id: '1', value: '12' },
    { id: '2', value: '99' },
    { id: '3', value: '37' },
  ]);

  const [inputValue, setInputValue] = useState<string>('');
  const [indexValue, setIndexValue] = useState<string>('0');
  const [searchVal, setSearchVal] = useState<string>('');
  
  // Search state
  const [inspectingIdx, setInspectingIdx] = useState<number | null>(null);
  const [foundIdx, setFoundIdx] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [logs, setLogs] = useState<string[]>(['Linked List initialized with: [12 -> 99 -> 37]']);

  // Insert Operations
  const insertNode = (position: 'head' | 'tail' | 'index') => {
    if (!inputValue.trim()) return;

    if (list.length >= 8) {
      alert("Maximum capacity is 8 nodes to ensure responsive rendering.");
      return;
    }

    const newNode: NodeItem = {
      id: Math.random().toString(36).substr(2, 9),
      value: inputValue.trim(),
    };

    setInspectingIdx(null);
    setFoundIdx(null);

    let updatedList = [...list];
    let logMsg = '';

    if (position === 'head') {
      updatedList.unshift(newNode);
      logMsg = `Inserted '${newNode.value}' at Head`;
    } else if (position === 'tail') {
      updatedList.push(newNode);
      logMsg = `Inserted '${newNode.value}' at Tail`;
    } else {
      const idx = parseInt(indexValue, 10);
      if (isNaN(idx) || idx < 0 || idx > list.length) {
        alert(`Invalid Index. Must be between 0 and ${list.length}`);
        return;
      }
      updatedList.splice(idx, 0, newNode);
      logMsg = `Inserted '${newNode.value}' at Index ${idx}`;
    }

    setList(updatedList);
    setLogs((prev) => [logMsg, ...prev]);
    setInputValue('');
  };

  // Delete Operations
  const deleteNode = (position: 'head' | 'tail' | 'index') => {
    if (list.length === 0) {
      alert("List is empty! Nothing to delete.");
      return;
    }

    setInspectingIdx(null);
    setFoundIdx(null);

    let updatedList = [...list];
    let logMsg = '';

    if (position === 'head') {
      const deletedVal = list[0].value;
      updatedList.shift();
      logMsg = `Deleted head node containing '${deletedVal}'`;
    } else if (position === 'tail') {
      const deletedVal = list[list.length - 1].value;
      updatedList.pop();
      logMsg = `Deleted tail node containing '${deletedVal}'`;
    } else {
      const idx = parseInt(indexValue, 10);
      if (isNaN(idx) || idx < 0 || idx >= list.length) {
        alert(`Invalid Index. Must be between 0 and ${list.length - 1}`);
        return;
      }
      const deletedVal = list[idx].value;
      updatedList.splice(idx, 1);
      logMsg = `Deleted node at index ${idx} containing '${deletedVal}'`;
    }

    setList(updatedList);
    setLogs((prev) => [logMsg, ...prev]);
  };

  // Search Operation (Iterative simulation)
  const searchNode = async () => {
    if (!searchVal.trim()) return;
    if (list.length === 0) {
      alert("List is empty!");
      return;
    }

    setIsSearching(true);
    setInspectingIdx(null);
    setFoundIdx(null);
    setLogs((prev) => [`Searching for value '${searchVal.trim()}'...`, ...prev]);

    const targetVal = searchVal.trim();
    let found = false;

    for (let i = 0; i < list.length; i++) {
      setInspectingIdx(i);
      // Wait for a delay to simulate search stepping
      await new Promise((resolve) => setTimeout(resolve, 600));

      if (list[i].value === targetVal) {
        setFoundIdx(i);
        found = true;
        setLogs((prev) => [`Found '${targetVal}' at Index ${i}!`, ...prev]);
        break;
      }
    }

    if (!found) {
      setLogs((prev) => [`Value '${targetVal}' not found in the list`, ...prev]);
      alert(`Value '${targetVal}' not found.`);
    }

    setIsSearching(false);
    
    // Clear highlight after 2 seconds
    setTimeout(() => {
      setInspectingIdx(null);
      setFoundIdx(null);
    }, 2000);
  };

  // Reverse list in place
  const reverseList = () => {
    if (list.length <= 1) return;
    
    setInspectingIdx(null);
    setFoundIdx(null);

    const reversed = [...list].reverse();
    setList(reversed);
    setLogs((prev) => [`Reversed the Linked List in-place`, ...prev]);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <GitCommit className="w-6 h-6 text-brand-500" />
            Linked List Visualizer
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Build and manipulate a singly linked list. Nodes point sequentially towards NULL.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side: Operations */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-6 lg:col-span-1">
          {/* Insertion controls */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">Insert</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-20 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-2 py-2 outline-none focus:border-brand-500"
              />
              <input
                type="number"
                placeholder="Idx"
                value={indexValue}
                onChange={(e) => setIndexValue(e.target.value)}
                className="w-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-2 py-2 outline-none focus:border-brand-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button
                onClick={() => insertNode('head')}
                className="bg-brand-500 hover:bg-brand-600 text-white text-[10px] py-1.5 rounded-lg font-bold transition-all"
              >
                + Head
              </button>
              <button
                onClick={() => insertNode('tail')}
                className="bg-brand-500 hover:bg-brand-600 text-white text-[10px] py-1.5 rounded-lg font-bold transition-all"
              >
                + Tail
              </button>
              <button
                onClick={() => insertNode('index')}
                className="bg-brand-500 hover:bg-brand-600 text-white text-[10px] py-1.5 rounded-lg font-bold transition-all"
                title="Insert at custom index"
              >
                + Index
              </button>
            </div>
          </div>

          <hr className="border-slate-150 dark:border-slate-850" />

          {/* Delete controls */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">Delete</h3>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => deleteNode('head')}
                className="bg-rose-500 hover:bg-rose-600 text-white text-[10px] py-1.5 rounded-lg font-bold transition-all"
              >
                Head
              </button>
              <button
                onClick={() => deleteNode('tail')}
                className="bg-rose-500 hover:bg-rose-600 text-white text-[10px] py-1.5 rounded-lg font-bold transition-all"
              >
                Tail
              </button>
              <button
                onClick={() => deleteNode('index')}
                className="bg-rose-500 hover:bg-rose-600 text-white text-[10px] py-1.5 rounded-lg font-bold transition-all"
              >
                Index
              </button>
            </div>
          </div>

          <hr className="border-slate-150 dark:border-slate-850" />

          {/* Search control */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">Search Node</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Target value"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-brand-500"
              />
              <button
                onClick={searchNode}
                disabled={isSearching}
                className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white px-3 py-2 rounded-xl text-xs font-bold"
              >
                Search
              </button>
            </div>
          </div>

          <hr className="border-slate-150 dark:border-slate-850" />

          {/* Special reverse action */}
          <button
            onClick={reverseList}
            className="w-full flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 py-2 rounded-xl text-slate-700 dark:text-slate-350 font-bold text-xs transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reverse List
          </button>

          <hr className="border-slate-150 dark:border-slate-850" />

          {/* Logs */}
          <div>
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider mb-2">History</h3>
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl p-3 h-32 overflow-y-auto space-y-1.5 text-xs font-mono">
              {logs.map((log, index) => (
                <div key={index} className="text-slate-655 dark:text-slate-400">
                  &gt; {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Linked List visualization canvas */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm lg:col-span-3 flex items-center justify-start overflow-x-auto min-h-[350px] relative select-none scrollbar-none">
          
          <div className="flex items-center gap-1.5 min-w-max px-4">
            <AnimatePresence initial={false}>
              {list.map((node, idx) => {
                const isInspecting = inspectingIdx === idx;
                const isFound = foundIdx === idx;
                const isHead = idx === 0;
                const isTail = idx === list.length - 1;

                let nodeColor = 'bg-brand-50 border-brand-200 dark:bg-brand-950/20 dark:border-brand-900 text-brand-700 dark:text-brand-300';
                
                if (isFound) {
                  nodeColor = 'bg-emerald-500 border-emerald-600 text-white scale-110 shadow-lg';
                } else if (isInspecting) {
                  nodeColor = 'bg-amber-500 border-amber-600 text-white scale-110 shadow-lg';
                }

                return (
                  <React.Fragment key={node.id}>
                    {/* Node Visual Box */}
                    <motion.div
                      layout
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                      className={`relative flex flex-col items-center`}
                    >
                      {/* Position Label pointers */}
                      <div className="h-6 flex items-center justify-center">
                        {isHead && (
                          <span className="text-[9px] font-black uppercase text-brand-500 tracking-wider">
                            HEAD
                          </span>
                        )}
                        {!isHead && isTail && (
                          <span className="text-[9px] font-black uppercase text-indigo-400 tracking-wider">
                            TAIL
                          </span>
                        )}
                      </div>

                      {/* The Box */}
                      <div className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center font-bold font-mono transition-all duration-300 ${nodeColor}`}>
                        <span className="text-sm">{node.value}</span>
                        {/* Memory pointer representation */}
                        <div className="w-full border-t border-slate-200 dark:border-slate-800 text-[8px] font-bold text-slate-400 dark:text-slate-500 flex justify-center py-0.5 uppercase tracking-wide">
                          next
                        </div>
                      </div>

                      {/* Index counter */}
                      <span className="text-[10px] text-slate-400 dark:text-slate-550 font-bold font-mono mt-1">
                        [{idx}]
                      </span>
                    </motion.div>

                    {/* SVG Pointer Arrow */}
                    {!isTail && (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        className="flex items-center text-slate-350 dark:text-slate-750 px-1"
                      >
                        <ArrowRight className="w-6 h-6 animate-pulse" />
                      </motion.div>
                    )}
                  </React.Fragment>
                );
              })}
            </AnimatePresence>

            {/* Last pointer pointing to NULL */}
            {list.length > 0 ? (
              <div className="flex items-center text-slate-350 dark:text-slate-750 px-1">
                <ArrowRight className="w-6 h-6" />
                <div className="w-12 h-12 rounded-full border border-slate-300 dark:border-slate-800 flex items-center justify-center text-[10px] font-extrabold text-slate-400 dark:text-slate-550 bg-slate-50 dark:bg-slate-950">
                  NULL
                </div>
              </div>
            ) : (
              <div className="text-slate-400 dark:text-slate-600 text-xs font-semibold uppercase tracking-wider">
                List is Empty (No Head)
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Educational details */}
      <EducationalPanel algorithmId="linked-list" />
    </div>
  );
};
