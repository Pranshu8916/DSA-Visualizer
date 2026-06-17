import React, { useState, useRef } from 'react';
import { EducationalPanel } from '../components/EducationalPanel';
import { Workflow, Play, RefreshCw, Info } from 'lucide-react';

interface GraphNode {
  id: number;
  label: string;
  x: number;
  y: number;
}

interface GraphEdge {
  from: number;
  to: number;
}

export const GraphVisualizer: React.FC = () => {
  // Graph structure states
  const [nodes, setNodes] = useState<GraphNode[]>([
    { id: 0, label: '0', x: 150, y: 120 },
    { id: 1, label: '1', x: 350, y: 60 },
    { id: 2, label: '2', x: 250, y: 220 },
    { id: 3, label: '3', x: 500, y: 150 },
    { id: 4, label: '4', x: 100, y: 250 }
  ]);
  const [edges, setEdges] = useState<GraphEdge[]>([
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 3 },
    { from: 2, to: 4 }
  ]);

  // Visualizer interactive helper states
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
  const [startNodeId, setStartNodeId] = useState<number>(0);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [visitedEdges, setVisitedEdges] = useState<GraphEdge[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>(['Graph workspace initialized']);

  const canvasRef = useRef<SVGSVGElement | null>(null);

  // Click on SVG canvas to add a new Node
  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isAnimating) return;
    if (nodes.length >= 10) {
      alert("Maximum node capacity is 10 for layout clarity.");
      return;
    }

    // Check if clicked directly on canvas (not inside nodes)
    const targetEl = e.target as SVGElement;
    if (targetEl.tagName !== 'svg') return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const nextId = nodes.length > 0 ? Math.max(...nodes.map(n => n.id)) + 1 : 0;
    const newNode: GraphNode = {
      id: nextId,
      label: nextId.toString(),
      x,
      y
    };

    setNodes((prev) => [...prev, newNode]);
    setLogs((prev) => [`Added Node ${newNode.label} at coordinate (${Math.round(x)}, ${Math.round(y)})`, ...prev]);
  };

  // Click on Node to create an Edge or select Start Node
  const handleNodeClick = (nodeId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering canvas click
    if (isAnimating) return;

    if (selectedNodeId === null) {
      setSelectedNodeId(nodeId);
      setLogs((prev) => [`Selected Node ${nodeId}. Click another node to form an Edge.`, ...prev]);
    } else {
      if (selectedNodeId === nodeId) {
        setSelectedNodeId(null);
        return;
      }

      // Check if edge already exists
      const edgeExists = edges.some(
        (edge) =>
          (edge.from === selectedNodeId && edge.to === nodeId) ||
          (edge.from === nodeId && edge.to === selectedNodeId)
      );

      if (edgeExists) {
        setSelectedNodeId(null);
        alert("Edge already exists between these nodes!");
        return;
      }

      const newEdge: GraphEdge = { from: selectedNodeId, to: nodeId };
      setEdges((prev) => [...prev, newEdge]);
      setLogs((prev) => [`Added Edge connecting Node ${selectedNodeId} and Node ${nodeId}`, ...prev]);
      setSelectedNodeId(null);
    }
  };

  const clearWorkspace = () => {
    if (isAnimating) return;
    setNodes([]);
    setEdges([]);
    setSelectedNodeId(null);
    setVisitedNodes([]);
    setVisitedEdges([]);
    setLogs(['Workspace cleared']);
  };

  const resetAnimationStates = () => {
    setActiveNodeId(null);
    setVisitedNodes([]);
    setVisitedEdges([]);
  };

  // --- TRAVERSAL ANIMATION ALGORITHMS ---

  const runBFS = async () => {
    if (nodes.length === 0) return;
    setIsAnimating(true);
    resetAnimationStates();
    setLogs((prev) => [`Starting Breadth First Search (BFS) from Node ${startNodeId}`, ...prev]);

    // Build Adjacency List (undirected graph)
    const adj: Record<number, number[]> = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach(e => {
      if (adj[e.from] && adj[e.to]) {
        adj[e.from].push(e.to);
        adj[e.to].push(e.from);
      }
    });

    const queue: number[] = [startNodeId];
    const visited = new Set<number>([startNodeId]);
    const path: number[] = [];
    const traversedEdges: GraphEdge[] = [];

    while (queue.length > 0) {
      const u = queue.shift()!;
      setActiveNodeId(u);
      path.push(u);
      setVisitedNodes([...path]);
      
      await new Promise(resolve => setTimeout(resolve, 800));

      const neighbors = adj[u] || [];
      for (const v of neighbors) {
        if (!visited.has(v)) {
          visited.add(v);
          queue.push(v);
          traversedEdges.push({ from: u, to: v });
          setVisitedEdges([...traversedEdges]);
        }
      }
    }

    setLogs((prev) => [`Finished BFS. Visited sequence: [${path.join(' -> ')}]`, ...prev]);
    setIsAnimating(false);
    setTimeout(() => setActiveNodeId(null), 1500);
  };

  const runDFS = async () => {
    if (nodes.length === 0) return;
    setIsAnimating(true);
    resetAnimationStates();
    setLogs((prev) => [`Starting Depth First Search (DFS) from Node ${startNodeId}`, ...prev]);

    // Build Adjacency List
    const adj: Record<number, number[]> = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach(e => {
      if (adj[e.from] && adj[e.to]) {
        adj[e.from].push(e.to);
        adj[e.to].push(e.from);
      }
    });

    const stack: number[] = [startNodeId];
    const visited = new Set<number>();
    const path: number[] = [];
    const traversedEdges: GraphEdge[] = [];

    // Track parent nodes to animate DFS edges correctly
    const parentMap: Record<number, number> = {};

    while (stack.length > 0) {
      const u = stack.pop()!;
      
      if (!visited.has(u)) {
        visited.add(u);
        setActiveNodeId(u);
        path.push(u);
        setVisitedNodes([...path]);

        if (parentMap[u] !== undefined) {
          traversedEdges.push({ from: parentMap[u], to: u });
          setVisitedEdges([...traversedEdges]);
        }

        await new Promise(resolve => setTimeout(resolve, 800));

        const neighbors = adj[u] || [];
        // Push neighbors in reverse to traverse smaller indices first
        for (let i = neighbors.length - 1; i >= 0; i--) {
          const v = neighbors[i];
          if (!visited.has(v)) {
            stack.push(v);
            parentMap[v] = u;
          }
        }
      }
    }

    setLogs((prev) => [`Finished DFS. Visited sequence: [${path.join(' -> ')}]`, ...prev]);
    setIsAnimating(false);
    setTimeout(() => setActiveNodeId(null), 1500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Workflow className="w-6 h-6 text-brand-500" />
            Graph Traversal visualizer
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Build a custom graph interactively, then animate Breadth First Search (BFS) and Depth First Search (DFS).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side Controls */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-6 lg:col-span-1">
          
          {/* Instructions Alert */}
          <div className="bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-900 rounded-xl p-3.5 text-xs text-brand-850 dark:text-brand-350 space-y-1">
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <Info className="w-3.5 h-3.5 text-brand-500" />
              How to draw Graph:
            </div>
            <p>1. Click blank space on canvas to place a Node.</p>
            <p>2. Click Node A, then click Node B to draw an Edge.</p>
          </div>

          {/* Trigger Traversal */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">Traversal Controls</h3>
            
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-450 dark:text-slate-550">Start Node ID</label>
              <select
                value={startNodeId}
                onChange={(e) => setStartNodeId(Number(e.target.value))}
                disabled={isAnimating || nodes.length === 0}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 outline-none"
              >
                {nodes.map(n => (
                  <option key={n.id} value={n.id}>Node {n.label}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={runBFS}
                disabled={isAnimating || nodes.length === 0}
                className="bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white text-xs py-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all"
              >
                <Play className="w-3.5 h-3.5" /> BFS
              </button>
              <button
                onClick={runDFS}
                disabled={isAnimating || nodes.length === 0}
                className="bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white text-xs py-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all"
              >
                <Play className="w-3.5 h-3.5" /> DFS
              </button>
            </div>
          </div>

          <hr className="border-slate-150 dark:border-slate-850" />

          {/* Clear Actions */}
          <button
            onClick={clearWorkspace}
            disabled={isAnimating}
            className="w-full flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-950 py-2 rounded-xl text-slate-700 dark:text-slate-300 font-bold text-xs transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Clear Workspace
          </button>

          <hr className="border-slate-150 dark:border-slate-850" />

          {/* History log */}
          <div>
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider mb-2">History Log</h3>
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl p-3 h-32 overflow-y-auto space-y-1.5 text-xs font-mono">
              {logs.map((log, index) => (
                <div key={index} className="text-slate-650 dark:text-slate-400">
                  &gt; {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Graph Drawing Area */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm lg:col-span-3 flex flex-col justify-between min-h-[400px] overflow-hidden relative">
          
          {/* Legend */}
          <div className="flex gap-4 text-xs font-medium p-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-brand-500"></span>
              <span className="text-slate-500 dark:text-slate-400">Visited</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-amber-500"></span>
              <span className="text-slate-500 dark:text-slate-400">Active Node</span>
            </div>
            {selectedNodeId !== null && (
              <div className="flex items-center gap-1.5 animate-pulse">
                <span className="w-3.5 h-3.5 rounded bg-indigo-500"></span>
                <span className="text-indigo-650 dark:text-indigo-400 font-bold">Connecting...</span>
              </div>
            )}
          </div>

          {/* SVG canvas */}
          <svg
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="flex-1 w-full min-h-[300px] cursor-crosshair bg-slate-50/50 dark:bg-slate-950/20"
          >
            {/* Draw edge lines */}
            {edges.map((edge, idx) => {
              const fromNode = nodes.find(n => n.id === edge.from);
              const toNode = nodes.find(n => n.id === edge.to);

              if (!fromNode || !toNode) return null;

              // Check if edge has been traversed during animation
              const isTraversed = visitedEdges.some(
                (ve) =>
                  (ve.from === edge.from && ve.to === edge.to) ||
                  (ve.from === edge.to && ve.to === edge.from)
              );

              return (
                <line
                  key={`edge-${idx}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isTraversed ? '#f59e0b' : '#94a3b8'}
                  strokeWidth={isTraversed ? '3.5' : '2'}
                  className="transition-all duration-300 dark:stroke-slate-800"
                />
              );
            })}

            {/* Draw Nodes */}
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isActive = activeNodeId === node.id;
              const isVisited = visitedNodes.includes(node.id);

              let fill = 'fill-white dark:fill-slate-900 stroke-slate-350 dark:stroke-slate-800';
              let textFill = 'fill-slate-700 dark:fill-slate-350';

              if (isActive) {
                fill = 'fill-amber-500 stroke-amber-600';
                textFill = 'fill-white';
              } else if (isVisited) {
                fill = 'fill-brand-500 stroke-brand-600';
                textFill = 'fill-white';
              } else if (isSelected) {
                fill = 'fill-indigo-500 stroke-indigo-600';
                textFill = 'fill-white';
              }

              return (
                <g
                  key={`node-${node.id}`}
                  onClick={(e) => handleNodeClick(node.id, e)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="18"
                    className={`stroke-2 transition-all duration-300 ${fill}`}
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    className={`text-xs font-bold font-mono select-none ${textFill}`}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Educational info */}
      <EducationalPanel algorithmId="graph" />
    </div>
  );
};
