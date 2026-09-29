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

type AlgorithmType = 'fibonacci' | 'factorial' | 'subsets' | 'hanoi' | 'custom';

const CODE_TEMPLATES: Record<string, string> = {
  fibonacci: `// Fibonacci Recursion: fib(n) = fib(n-1) + fib(n-2)
async function solve(n, depth = 0, parentId = null, parentX = 340, parentY = 45) {
  return await traceCall("fib", [n], depth, parentId, parentX, parentY, async (id, x, y) => {
    if (n <= 1) return n;
    const left = await solve(n - 1, depth + 1, id, x, y);
    const right = await solve(n - 2, depth + 1, id, x, y);
    return left + right;
  });
}
await solve(n);`,

  factorial: `// Factorial Recursion: fact(n) = n * fact(n-1)
async function solve(n, depth = 0, parentId = null, parentX = 340, parentY = 45) {
  return await traceCall("fact", [n], depth, parentId, parentX, parentY, async (id, x, y) => {
    if (n <= 1) return 1;
    const sub = await solve(n - 1, depth + 1, id, x, y);
    return n * sub;
  });
}
await solve(n);`,

  hanoi: `// Tower of Hanoi: hanoi(n, from, to, aux)
async function solve(n, from = 'A', to = 'C', aux = 'B', depth = 0, parentId = null, parentX = 340, parentY = 45) {
  return await traceCall("hanoi", [n, from, to], depth, parentId, parentX, parentY, async (id, x, y) => {
    if (n === 1) return 1;
    const m1 = await solve(n - 1, from, aux, to, depth + 1, id, x, y);
    const m2 = await solve(n - 1, aux, to, from, depth + 1, id, x, y);
    return m1 + 1 + m2;
  });
}
await solve(n);`,

  power: `// Power Function: power(x, n) = x * power(x, n-1)
async function solve(x, n, depth = 0, parentId = null, parentX = 340, parentY = 45) {
  return await traceCall("power", [x, n], depth, parentId, parentX, parentY, async (id, x, y) => {
    if (n === 0) return 1;
    const sub = await solve(x, n - 1, depth + 1, id, x, y);
    return x * sub;
  });
}
await solve(2, n);`,

  custom: `// Custom Recursion: Edit and run any recursive logic!
async function customRec(n, depth = 0, parentId = null, parentX = 340, parentY = 45) {
  return await traceCall("myFunc", [n], depth, parentId, parentX, parentY, async (id, x, y) => {
    if (n <= 1) return 1;
    const left = await customRec(n - 1, depth + 1, id, x, y);
    const right = await customRec(n - 2, depth + 1, id, x, y);
    return left + right;
  });
}
await customRec(n);`
};

export const RecursionVisualizer: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('fibonacci');
  const [inputVal, setInputVal] = useState<number>(4);
  const [speed, setSpeed] = useState<number>(700);
  const [customCode, setCustomCode] = useState<string>(CODE_TEMPLATES.fibonacci);

  const [viewMode, setViewMode] = useState<'tree' | 'stack' | 'both'>('both');
  const [callStack, setCallStack] = useState<StackFrame[]>([]);
  const [treeNodes, setTreeNodes] = useState<RecTreeNode[]>([]);
  const [activeFrameId, setActiveFrameId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>(['Recursion Visualizer ready. Choose an algorithm or edit code, then press Start.']);

  const cancelRef = useRef<boolean>(false);

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleAlgorithmChange = (newAlgo: AlgorithmType) => {
    setAlgorithm(newAlgo);
    if (CODE_TEMPLATES[newAlgo]) {
      setCustomCode(CODE_TEMPLATES[newAlgo]);
    }
  };

  // --- GENERIC RECURSION TRACER ENGINE ---
  const runRecursionEngine = async (userCode: string, nVal: number) => {
    setIsAnimating(true);
    cancelRef.current = false;
    setCallStack([]);
    setTreeNodes([]);
    setLogs((prev) => [`Initializing generic recursion call tracer for input = ${nVal}...`, ...prev]);

    let frameIdCounter = 0;
    const childCounts: Record<string, number> = {};

    const traceCall = async (
      fnName: string,
      args: any[],
      depth: number,
      parentId: string | null,
      parentX: number,
      parentY: number,
      evalFn: (currentFrameId: string, currentX: number, currentY: number) => Promise<any>
    ): Promise<any> => {
      if (cancelRef.current) return 0;

      const frameId = `${fnName}-${frameIdCounter++}`;

      let childIdx = 0;
      if (parentId) {
        childCounts[parentId] = childCounts[parentId] || 0;
        childIdx = childCounts[parentId]++;
      }

      const spread = Math.max(24, 150 / Math.pow(1.7, depth - 1 || 1));
      const nodeX = depth === 0 ? 340 : (childIdx === 0 ? parentX - spread : parentX + spread);
      const nodeY = 45 + depth * 55;
      const paramStr = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(', ');
      const label = `${fnName}(${paramStr})`;

      const newFrame: StackFrame = {
        id: frameId,
        funcName: fnName,
        paramText: paramStr,
        status: 'calling',
        depth,
      };

      const newTreeNode: RecTreeNode = {
        id: frameId,
        label: label.length > 14 ? label.slice(0, 12) + '..' : label,
        depth,
        status: 'calling',
        parentId,
        x: nodeX,
        y: nodeY,
        parentX: parentId ? parentX : undefined,
        parentY: parentId ? parentY : undefined,
      };

      setCallStack((prev) => [newFrame, ...prev]);
      setTreeNodes((prev) => [...prev, newTreeNode]);
      setActiveFrameId(frameId);
      setLogs((prev) => [`-> Pushed call stack & tree node: ${label} [depth ${depth}]`, ...prev]);

      await delay(speed);

      setCallStack((prev) =>
        prev.map((f) => (f.id === frameId ? { ...f, status: 'evaluating' } : f))
      );
      setTreeNodes((prev) =>
        prev.map((n) => (n.id === frameId ? { ...n, status: 'evaluating' } : n))
      );

      const result = await evalFn(frameId, nodeX, nodeY);
      if (cancelRef.current) return 0;

      setCallStack((prev) =>
        prev.map((f) => (f.id === frameId ? { ...f, status: 'returned', returnValue: result } : f))
      );
      setTreeNodes((prev) =>
        prev.map((n) => (n.id === frameId ? { ...n, status: 'returned', returnValue: result } : n))
      );
      setLogs((prev) => [`<- Returned ${label} = ${JSON.stringify(result)}`, ...prev]);
      await delay(speed);

      setCallStack((prev) => prev.filter((f) => f.id !== frameId));
      return result;
    };

    try {
      // Dynamic ES Module async function constructor
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      const runner = new AsyncFunction('traceCall', 'n', userCode);
      
      const finalResult = await runner(traceCall, nVal);
      if (!cancelRef.current) {
        setLogs((prev) => [`✅ Recursion Complete! Final Result: ${JSON.stringify(finalResult ?? 'Done')}`, ...prev]);
      }
    } catch (err: any) {
      setLogs((prev) => [`❌ Execution Error: ${err.message}`, ...prev]);
    } finally {
      setIsAnimating(false);
      setActiveFrameId(null);
    }
  };

  const handleStart = () => {
    const cappedN = Math.min(6, Math.max(1, inputVal));
    runRecursionEngine(customCode, cappedN);
  };

  const handleReset = () => {
    cancelRef.current = true;
    setIsAnimating(false);
    setCallStack([]);
    setTreeNodes([]);
    setActiveFrameId(null);
    setLogs(['Visualizer reset. Select parameters or edit custom code to begin.']);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-[#3B78C8]" />
            Universal Recursion Tree & Call Stack Visualizer
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Visualize presets or write <b>any custom recursive code</b> to dynamically render recursion tree diagrams and call stack frames.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold self-start md:self-auto">
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
        {/* Left Side Controls & Code Editor */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-5 lg:col-span-1">
          {/* Preset Selection */}
          <div className="space-y-2">
            <label className="font-bold text-slate-700 text-xs uppercase tracking-wider block">
              Algorithm / Mode
            </label>
            <select
              value={algorithm}
              onChange={(e) => handleAlgorithmChange(e.target.value as AlgorithmType)}
              disabled={isAnimating}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 outline-none font-medium"
            >
              <option value="fibonacci">Fibonacci Tree fib(n)</option>
              <option value="factorial">Factorial Call Stack n!</option>
              <option value="hanoi">Tower of Hanoi hanoi(n)</option>
              <option value="power">Power Function power(x, n)</option>
              <option value="custom">Custom Code Editor (Any Recursion)</option>
            </select>
          </div>

          {/* Input N */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-450">
              Input Parameter (n = 1 to 6)
            </label>
            <input
              type="number"
              min="1"
              max="6"
              value={inputVal}
              onChange={(e) => setInputVal(Number(e.target.value))}
              disabled={isAnimating}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 outline-none font-mono"
            />
          </div>

          {/* Code Editor Accordion */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase font-bold text-slate-450 block">
                Code Editor
              </label>
              {algorithm === 'custom' && (
                <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
                  Editable
                </span>
              )}
            </div>
            <textarea
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              disabled={isAnimating}
              rows={8}
              className="w-full bg-slate-900 text-slate-100 font-mono text-[11px] p-3 rounded-xl border border-slate-800 outline-none leading-relaxed resize-none"
              placeholder="Write your recursive function code..."
            />
          </div>

          {/* Speed Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-450">
              <span>Step Delay</span>
              <span>{speed} ms</span>
            </div>
            <input
              type="range"
              min="200"
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
              className="bg-[#3B78C8] hover:bg-[#1A2340] disabled:opacity-50 text-white text-xs py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Play className="w-3.5 h-3.5" /> Start
            </button>
            <button
              onClick={handleReset}
              className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          <hr className="border-slate-150" />

          {/* Trace log */}
          <div>
            <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-2">Execution Trace</h3>
            <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 h-36 overflow-y-auto space-y-1 text-[11px] font-mono">
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
                  Dynamic Recursion Tree Diagram
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
                <svg width="680" height="290" className="max-w-full">
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
                          r="18"
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
                              x={node.x - 20}
                              y={node.y - 34}
                              width="40"
                              height="15"
                              rx="3"
                              fill="#10b981"
                              className="opacity-95"
                            />
                            <text
                              x={node.x}
                              y={node.y - 23}
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
                      Recursion Tree Idle (Click Start to execute code)
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
