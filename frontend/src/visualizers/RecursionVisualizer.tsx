import React, { useState, useRef } from 'react';
import { EducationalPanel } from '../components/EducationalPanel';
import { Play, RefreshCw, Cpu, ArrowDown, Network, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StackFrame {
  id: string;
  funcName: string;
  paramText: string;
  status: 'calling' | 'evaluating' | 'returned';
  returnValue?: number | string;
  depth: number;
}

interface RecTreeNode {
  id: string;
  label: string;
  depth: number;
  status: 'calling' | 'evaluating' | 'returned';
  returnValue?: number | string;
  parentId: string | null;
  x: number;
  y: number;
  parentX?: number;
  parentY?: number;
}

export const RecursionVisualizer: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<'fibonacci' | 'factorial' | 'subsets'>('fibonacci');
  const [inputVal, setInputVal] = useState<number>(4);
  const [speed, setSpeed] = useState<number>(700);

  const [viewMode, setViewMode] = useState<'tree' | 'stack' | 'both'>('both');
  const [callStack, setCallStack] = useState<StackFrame[]>([]);
  const [treeNodes, setTreeNodes] = useState<RecTreeNode[]>([]);
  const [activeFrameId, setActiveFrameId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>(['Recursion Visualizer ready. Choose an algorithm and press Start.']);

  const cancelRef = useRef<boolean>(false);

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // --- FIBONACCI RECURSION ---
  const runFibonacci = async (n: number) => {
    setIsAnimating(true);
    cancelRef.current = false;
    setCallStack([]);
    setTreeNodes([]);
    setLogs((prev) => [`Starting fibonacci(${n}) tree construction...`, ...prev]);

    let frameIdCounter = 0;

    const calculateX = (depth: number, isLeft: boolean | null, parentX: number): number => {
      if (depth === 0 || isLeft === null) return 340;
      const offset = Math.max(25, 140 / Math.pow(1.8, depth - 1));
      return isLeft ? parentX - offset : parentX + offset;
    };

    const fib = async (
      val: number,
      depth: number,
      parentId: string | null,
      parentX: number,
      parentY: number,
      isLeft: boolean | null
    ): Promise<number> => {
      if (cancelRef.current) return 0;

      const frameId = `fib-${val}-${frameIdCounter++}`;
      const nodeX = calculateX(depth, isLeft, parentX);
      const nodeY = 45 + depth * 55;

      const newFrame: StackFrame = {
        id: frameId,
        funcName: 'fib',
        paramText: `n = ${val}`,
        status: 'calling',
        depth
      };

      const newTreeNode: RecTreeNode = {
        id: frameId,
        label: `fib(${val})`,
        depth,
        status: 'calling',
        parentId,
        x: nodeX,
        y: nodeY,
        parentX: parentId ? parentX : undefined,
        parentY: parentId ? parentY : undefined
      };

      setCallStack((prev) => [newFrame, ...prev]);
      setTreeNodes((prev) => [...prev, newTreeNode]);
      setActiveFrameId(frameId);
      setLogs((prev) => [`-> Pushed stack & built tree node: fib(${val}) [depth ${depth}]`, ...prev]);

      await delay(speed);

      if (val <= 1) {
        setCallStack((prev) =>
          prev.map((f) => (f.id === frameId ? { ...f, status: 'returned', returnValue: val } : f))
        );
        setTreeNodes((prev) =>
          prev.map((n) => (n.id === frameId ? { ...n, status: 'returned', returnValue: val } : n))
        );
        setLogs((prev) => [`<- Base case: fib(${val}) = ${val} (Bubbling return value upward)`, ...prev]);
        await delay(speed);

        setCallStack((prev) => prev.filter((f) => f.id !== frameId));
        return val;
      }

      setCallStack((prev) =>
        prev.map((f) => (f.id === frameId ? { ...f, status: 'evaluating' } : f))
      );
      setTreeNodes((prev) =>
        prev.map((n) => (n.id === frameId ? { ...n, status: 'evaluating' } : n))
      );
      setLogs((prev) => [`Evaluating subtrees for fib(${val}): fib(${val - 1}) + fib(${val - 2})...`, ...prev]);
      await delay(speed / 2);

      const left = await fib(val - 1, depth + 1, frameId, nodeX, nodeY, true);
      if (cancelRef.current) return 0;

      const right = await fib(val - 2, depth + 1, frameId, nodeX, nodeY, false);
      if (cancelRef.current) return 0;

      const result = left + right;

      setCallStack((prev) =>
        prev.map((f) => (f.id === frameId ? { ...f, status: 'returned', returnValue: result } : f))
      );
      setTreeNodes((prev) =>
        prev.map((n) => (n.id === frameId ? { ...n, status: 'returned', returnValue: result } : n))
      );
      setLogs((prev) => [`<- Returned fib(${val}) = ${left} + ${right} = ${result}`, ...prev]);
      await delay(speed);

      setCallStack((prev) => prev.filter((f) => f.id !== frameId));
      return result;
    };

    const finalRes = await fib(n, 0, null, 340, 45, null);
    if (!cancelRef.current) {
      setLogs((prev) => [`✅ Recursion Complete! fib(${n}) = ${finalRes}`, ...prev]);
    }
    setIsAnimating(false);
    setActiveFrameId(null);
  };

  // --- FACTORIAL RECURSION ---
  const runFactorial = async (n: number) => {
    setIsAnimating(true);
    cancelRef.current = false;
    setCallStack([]);
    setTreeNodes([]);
    setLogs((prev) => [`Starting factorial(${n}) tree construction...`, ...prev]);

    let frameIdCounter = 0;

    const fact = async (
      val: number,
      depth: number,
      parentId: string | null,
      parentX: number,
      parentY: number
    ): Promise<number> => {
      if (cancelRef.current) return 0;

      const frameId = `fact-${val}-${frameIdCounter++}`;
      const nodeX = 340;
      const nodeY = 45 + depth * 55;

      const newFrame: StackFrame = {
        id: frameId,
        funcName: 'factorial',
        paramText: `n = ${val}`,
        status: 'calling',
        depth
      };

      const newTreeNode: RecTreeNode = {
        id: frameId,
        label: `fact(${val})`,
        depth,
        status: 'calling',
        parentId,
        x: nodeX,
        y: nodeY,
        parentX: parentId ? parentX : undefined,
        parentY: parentId ? parentY : undefined
      };

      setCallStack((prev) => [newFrame, ...prev]);
      setTreeNodes((prev) => [...prev, newTreeNode]);
      setActiveFrameId(frameId);
      setLogs((prev) => [`-> Pushed call: factorial(${val})`, ...prev]);

      await delay(speed);

      if (val <= 1) {
        setCallStack((prev) =>
          prev.map((f) => (f.id === frameId ? { ...f, status: 'returned', returnValue: 1 } : f))
        );
        setTreeNodes((prev) =>
          prev.map((n) => (n.id === frameId ? { ...n, status: 'returned', returnValue: 1 } : n))
        );
        setLogs((prev) => [`<- Base case: factorial(${val}) returns 1`, ...prev]);
        await delay(speed);

        setCallStack((prev) => prev.filter((f) => f.id !== frameId));
        return 1;
      }

      setCallStack((prev) =>
        prev.map((f) => (f.id === frameId ? { ...f, status: 'evaluating' } : f))
      );
      setTreeNodes((prev) =>
        prev.map((n) => (n.id === frameId ? { ...n, status: 'evaluating' } : n))
      );
      setLogs((prev) => [`Computing ${val} * factorial(${val - 1})...`, ...prev]);
      await delay(speed / 2);

      const subRes = await fact(val - 1, depth + 1, frameId, nodeX, nodeY);
      if (cancelRef.current) return 0;

      const result = val * subRes;

      setCallStack((prev) =>
        prev.map((f) => (f.id === frameId ? { ...f, status: 'returned', returnValue: result } : f))
      );
      setTreeNodes((prev) =>
        prev.map((n) => (n.id === frameId ? { ...n, status: 'returned', returnValue: result } : n))
      );
      setLogs((prev) => [`<- factorial(${val}) = ${val} * ${subRes} = ${result}`, ...prev]);
      await delay(speed);

      setCallStack((prev) => prev.filter((f) => f.id !== frameId));
      return result;
    };

    const finalRes = await fact(n, 0, null, 340, 45);
    if (!cancelRef.current) {
      setLogs((prev) => [`✅ Recursion Complete! factorial(${n}) = ${finalRes}`, ...prev]);
    }
    setIsAnimating(false);
    setActiveFrameId(null);
  };

  // --- SUBSETS RECURSION ---
  const runSubsets = async () => {
    setIsAnimating(true);
    cancelRef.current = false;
    setCallStack([]);
    setTreeNodes([]);
    setLogs((prev) => [`Starting subset decision tree for [1, 2, 3]...`, ...prev]);

    const arr = [1, 2, 3];
    const results: string[] = [];
    let nodeCounter = 0;

    const calculateX = (depth: number, isLeft: boolean | null, parentX: number): number => {
      if (depth === 0 || isLeft === null) return 340;
      const offset = 140 / Math.pow(1.8, depth - 1);
      return isLeft ? parentX - offset : parentX + offset;
    };

    const generate = async (
      index: number,
      currentSubset: number[],
      depth: number,
      parentId: string | null,
      parentX: number,
      parentY: number,
      isLeft: boolean | null
    ) => {
      if (cancelRef.current) return;

      const frameId = `sub-${index}-${nodeCounter++}`;
      const nodeX = calculateX(depth, isLeft, parentX);
      const nodeY = 45 + depth * 60;
      const subsetStr = `[${currentSubset.join(',')}]`;

      const newFrame: StackFrame = {
        id: frameId,
        funcName: 'subsets',
        paramText: `idx=${index}, ${subsetStr}`,
        status: 'calling',
        depth
      };

      const newTreeNode: RecTreeNode = {
        id: frameId,
        label: subsetStr === '[]' ? 'Ø' : subsetStr,
        depth,
        status: 'calling',
        parentId,
        x: nodeX,
        y: nodeY,
        parentX: parentId ? parentX : undefined,
        parentY: parentId ? parentY : undefined
      };

      setCallStack((prev) => [newFrame, ...prev]);
      setTreeNodes((prev) => [...prev, newTreeNode]);
      setActiveFrameId(frameId);

      if (index === arr.length) {
        results.push(subsetStr);
        setLogs((prev) => [`Leaf reached! Generated subset: ${subsetStr}`, ...prev]);
        setCallStack((prev) =>
          prev.map((f) => (f.id === frameId ? { ...f, status: 'returned', returnValue: subsetStr } : f))
        );
        setTreeNodes((prev) =>
          prev.map((n) => (n.id === frameId ? { ...n, status: 'returned', returnValue: subsetStr } : n))
        );
        await delay(speed);
        setCallStack((prev) => prev.filter((f) => f.id !== frameId));
        return;
      }

      setLogs((prev) => [`Branch 1: Exclude ${arr[index]}`, ...prev]);
      await delay(speed);
      await generate(index + 1, [...currentSubset], depth + 1, frameId, nodeX, nodeY, true);

      if (cancelRef.current) return;

      setLogs((prev) => [`Branch 2: Include ${arr[index]}`, ...prev]);
      await delay(speed);
      await generate(index + 1, [...currentSubset, arr[index]], depth + 1, frameId, nodeX, nodeY, false);

      setTreeNodes((prev) =>
        prev.map((n) => (n.id === frameId ? { ...n, status: 'returned', returnValue: 'Done' } : n))
      );
      setCallStack((prev) => prev.filter((f) => f.id !== frameId));
    };

    await generate(0, [], 0, null, 340, 45, null);

    if (!cancelRef.current) {
      setLogs((prev) => [`✅ Subsets complete! Generated: ${results.join(', ')}`, ...prev]);
    }
    setIsAnimating(false);
    setActiveFrameId(null);
  };

  const handleStart = () => {
    if (algorithm === 'fibonacci') runFibonacci(Math.min(5, Math.max(1, inputVal)));
    else if (algorithm === 'factorial') runFactorial(Math.min(6, Math.max(1, inputVal)));
    else if (algorithm === 'subsets') runSubsets();
  };

  const handleReset = () => {
    cancelRef.current = true;
    setIsAnimating(false);
    setCallStack([]);
    setTreeNodes([]);
    setActiveFrameId(null);
    setLogs(['Visualizer reset. Select algorithm parameters to begin.']);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-[#3B78C8]" />
            Recursion Tree & Call Stack Visualizer
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Observe step-by-step recursion tree expansion, branch calls, and returned values bubbling upward.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setViewMode('both')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'both' ? 'bg-[#3B78C8] text-white' : 'text-slate-600'
            }`}
          >
            Split View
          </button>
          <button
            onClick={() => setViewMode('tree')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'tree' ? 'bg-[#3B78C8] text-white' : 'text-slate-600'
            }`}
          >
            Recursion Tree
          </button>
          <button
            onClick={() => setViewMode('stack')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'stack' ? 'bg-[#3B78C8] text-white' : 'text-slate-600'
            }`}
          >
            Call Stack
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side Controls */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-6 lg:col-span-1">
          {/* Preset */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Algorithm Preset</h3>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as any)}
              disabled={isAnimating}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 outline-none"
            >
              <option value="fibonacci">Fibonacci Tree fib(n)</option>
              <option value="factorial">Factorial Call Stack n!</option>
              <option value="subsets">Subsets Decision Tree [1, 2, 3]</option>
            </select>
          </div>

          {algorithm !== 'subsets' && (
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-450">
                Input N ({algorithm === 'fibonacci' ? '1 to 5' : '1 to 6'})
              </label>
              <input
                type="number"
                min="1"
                max={algorithm === 'fibonacci' ? 5 : 6}
                value={inputVal}
                onChange={(e) => setInputVal(Number(e.target.value))}
                disabled={isAnimating}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 outline-none"
              />
            </div>
          )}

          {/* Speed Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-450">
              <span>Step Delay</span>
              <span>{speed} ms</span>
            </div>
            <input
              type="range"
              min="300"
              max="1500"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-[#3B78C8]"
            />
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleStart}
              disabled={isAnimating}
              className="bg-[#3B78C8] hover:bg-[#1A2340] disabled:opacity-50 text-white text-xs py-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all"
            >
              <Play className="w-3.5 h-3.5" /> Start
            </button>
            <button
              onClick={handleReset}
              className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs py-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          <hr className="border-slate-150" />

          {/* Trace log */}
          <div>
            <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-2">Execution Trace</h3>
            <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 h-40 overflow-y-auto space-y-1.5 text-xs font-mono">
              {logs.map((log, index) => (
                <div key={index} className="text-slate-650">
                  &gt; {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Workspaces */}
        <div className="lg:col-span-3 space-y-6">
          {/* RECURSION TREE CANVAS */}
          {(viewMode === 'tree' || viewMode === 'both') && (
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between min-h-[340px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-150">
                <h3 className="font-extrabold text-slate-800 flex items-center gap-2 text-sm">
                  <Network className="w-4 h-4 text-[#3B78C8]" />
                  Visual Recursion Tree Diagram
                </h3>
                <div className="flex gap-3 text-[11px] font-bold">
                  <span className="flex items-center gap-1 text-amber-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Active Call
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Value Returned
                  </span>
                </div>
              </div>

              {/* SVG Canvas for Tree */}
              <div className="flex-1 flex justify-center items-center py-4 overflow-x-auto">
                <svg width="680" height="280" className="max-w-full">
                  {/* Draw Edges */}
                  {treeNodes.map((node) => {
                    if (node.parentX === undefined || node.parentY === undefined) return null;
                    const isReturned = node.status === 'returned';
                    return (
                      <g key={`edge-${node.id}`}>
                        <line
                          x1={node.parentX}
                          y1={node.parentY}
                          x2={node.x}
                          y2={node.y}
                          stroke={isReturned ? '#10b981' : '#94a3b8'}
                          strokeWidth={isReturned ? '2.5' : '1.5'}
                          className="transition-all duration-300"
                        />
                      </g>
                    );
                  })}

                  {/* Draw Nodes */}
                  {treeNodes.map((node) => {
                    const isActive = activeFrameId === node.id;
                    const isReturned = node.status === 'returned';

                    let circleFill = 'fill-white stroke-slate-350';
                    let textFill = 'fill-slate-700';

                    if (isActive) {
                      circleFill = 'fill-amber-500 stroke-amber-600';
                      textFill = 'fill-white';
                    } else if (isReturned) {
                      circleFill = 'fill-emerald-500 stroke-emerald-600';
                      textFill = 'fill-white';
                    }

                    return (
                      <g key={`tree-node-${node.id}`}>
                        <motion.circle
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          cx={node.x}
                          cy={node.y}
                          r="17"
                          className={`stroke-2 transition-all duration-300 ${circleFill}`}
                        />
                        <text
                          x={node.x}
                          y={node.y + 4}
                          textAnchor="middle"
                          className={`text-[10px] font-bold font-mono ${textFill}`}
                        >
                          {node.label}
                        </text>

                        {/* Return value tag bubbling above node */}
                        {node.returnValue !== undefined && (
                          <g>
                            <rect
                              x={node.x - 18}
                              y={node.y - 32}
                              width="36"
                              height="14"
                              rx="3"
                              fill="#10b981"
                              className="opacity-95"
                            />
                            <text
                              x={node.x}
                              y={node.y - 22}
                              textAnchor="middle"
                              className="text-[9px] font-bold font-mono fill-white"
                            >
                              ={String(node.returnValue)}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}

                  {treeNodes.length === 0 && (
                    <text x="340" y="140" textAnchor="middle" className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                      Tree visualizer idle (Press Start to generate tree)
                    </text>
                  )}
                </svg>
              </div>
            </div>
          )}

          {/* CALL STACK VIEW */}
          {(viewMode === 'stack' || viewMode === 'both') && (
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between min-h-[220px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-150">
                <h3 className="font-extrabold text-slate-800 flex items-center gap-2 text-sm">
                  <Layers className="w-4 h-4 text-[#3B78C8]" />
                  Call Stack Depth ({callStack.length} active frames)
                </h3>
              </div>

              {/* Stack Cards */}
              <div className="py-4 flex flex-col items-center gap-2 min-h-[140px]">
                {callStack.length === 0 ? (
                  <div className="my-auto text-center text-slate-400 text-xs">
                    <ArrowDown className="w-5 h-5 mx-auto mb-1 animate-bounce opacity-50" />
                    Call stack empty
                  </div>
                ) : (
                  <AnimatePresence>
                    {callStack.map((frame, index) => {
                      const isTop = frame.id === activeFrameId || index === 0;
                      let bgColor = 'bg-slate-50 border-slate-200 text-slate-700';
                      if (frame.status === 'returned') {
                        bgColor = 'bg-emerald-50 border-emerald-300 text-emerald-700';
                      } else if (isTop) {
                        bgColor = 'bg-amber-50 border-amber-300 text-amber-800';
                      }

                      return (
                        <motion.div
                          key={frame.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className={`w-full max-w-md border p-2.5 rounded-xl flex items-center justify-between font-mono text-xs ${bgColor}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{frame.funcName}({frame.paramText})</span>
                            {isTop && (
                              <span className="text-[9px] px-1.5 py-0.2 bg-amber-500 text-white rounded font-sans uppercase">
                                Top
                              </span>
                            )}
                          </div>
                          {frame.returnValue !== undefined && (
                            <span className="bg-emerald-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                              Return: {String(frame.returnValue)}
                            </span>
                          )}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Educational info */}
      <EducationalPanel algorithmId="recursion" />
    </div>
  );
};
