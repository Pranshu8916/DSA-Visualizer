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

  // Dijkstra's Shortest Path Algorithm
  const runDijkstra = async () => {
    if (nodes.length === 0) return;
    setIsAnimating(true);
    resetAnimationStates();
    setLogs((prev) => [`Starting Dijkstra's Shortest Path algorithm from Node ${startNodeId}...`, ...prev]);

    const dist: Record<number, number> = {};
    const visited = new Set<number>();
    const path: number[] = [];
    const traversedEdges: GraphEdge[] = [];

    nodes.forEach(n => dist[n.id] = Infinity);
    dist[startNodeId] = 0;

    const adj: Record<number, number[]> = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach(e => {
      if (adj[e.from] && adj[e.to]) {
        adj[e.from].push(e.to);
        adj[e.to].push(e.from);
      }
    });

    for (let count = 0; count < nodes.length; count++) {
      let minDist = Infinity;
      let u = -1;

      for (const n of nodes) {
        if (!visited.has(n.id) && dist[n.id] < minDist) {
          minDist = dist[n.id];
          u = n.id;
        }
      }

      if (u === -1) break;

      visited.add(u);
      setActiveNodeId(u);
      path.push(u);
      setVisitedNodes([...path]);
      await new Promise(resolve => setTimeout(resolve, 800));

      const neighbors = adj[u] || [];
      for (const v of neighbors) {
        if (!visited.has(v)) {
          if (dist[u] + 1 < dist[v]) {
            dist[v] = dist[u] + 1;
            traversedEdges.push({ from: u, to: v });
            setVisitedEdges([...traversedEdges]);
          }
        }
      }
    }

    const distStr = nodes.map(n => `Node ${n.id}: ${dist[n.id] === Infinity ? '∞' : dist[n.id]}`).join(', ');
    setLogs((prev) => [`Dijkstra completed. Distances: ${distStr}`, ...prev]);
    setIsAnimating(false);
    setTimeout(() => setActiveNodeId(null), 1500);
  };

  // Cycle Detection Algorithm (DFS based)
  const runCycleDetection = async () => {
    if (nodes.length === 0) return;
    setIsAnimating(true);
    resetAnimationStates();
    setLogs((prev) => [`Checking graph for cycles...`, ...prev]);

    const adj: Record<number, number[]> = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach(e => {
      if (adj[e.from] && adj[e.to]) {
        adj[e.from].push(e.to);
        adj[e.to].push(e.from);
      }
    });

    const visited = new Set<number>();
    let hasCycle = false;

    const dfsCycle = async (u: number, parent: number): Promise<boolean> => {
      visited.add(u);
      setActiveNodeId(u);
      setVisitedNodes(prev => [...prev, u]);
      await new Promise(resolve => setTimeout(resolve, 700));

      for (const v of adj[u] || []) {
        if (!visited.has(v)) {
          if (await dfsCycle(v, u)) return true;
        } else if (v !== parent) {
          setLogs((prev) => [`⚠️ Cycle detected between Node ${u} and Node ${v}!`, ...prev]);
          return true;
        }
      }
      return false;
    };

    for (const n of nodes) {
      if (!visited.has(n.id)) {
        if (await dfsCycle(n.id, -1)) {
          hasCycle = true;
          break;
        }
      }
    }

    if (!hasCycle) {
      setLogs((prev) => [`✅ Graph is acyclic (no cycles found).`, ...prev]);
    }

    setIsAnimating(false);
    setTimeout(() => setActiveNodeId(null), 1500);
  };

  // Helper to calculate weight between two nodes
  const getWeight = (e: GraphEdge): number => {
    const fromN = nodes.find((n) => n.id === e.from);
    const toN = nodes.find((n) => n.id === e.to);
    if (!fromN || !toN) return 1;
    return Math.max(1, Math.round(Math.hypot(toN.x - fromN.x, toN.y - fromN.y) / 25));
  };

  // Topological Sort (Kahn's algorithm using in-degrees)
  const runTopologicalSort = async () => {
    if (nodes.length === 0) return;
    setIsAnimating(true);
    resetAnimationStates();
    setLogs((prev) => [`Starting Topological Sort (DAG ordering)...`, ...prev]);

    const inDegree: Record<number, number> = {};
    const adj: Record<number, number[]> = {};
    nodes.forEach((n) => {
      inDegree[n.id] = 0;
      adj[n.id] = [];
    });

    edges.forEach((e) => {
      if (adj[e.from] && adj[e.to] !== undefined) {
        adj[e.from].push(e.to);
        inDegree[e.to] = (inDegree[e.to] || 0) + 1;
      }
    });

    const queue: number[] = nodes.filter((n) => inDegree[n.id] === 0).map((n) => n.id);
    const topoOrder: number[] = [];
    const traversedEdges: GraphEdge[] = [];

    while (queue.length > 0) {
      const u = queue.shift()!;
      setActiveNodeId(u);
      topoOrder.push(u);
      setVisitedNodes([...topoOrder]);

      setLogs((prev) => [`Processed Node ${u} (in-degree 0)`, ...prev]);
      await new Promise((r) => setTimeout(r, 750));

      for (const v of adj[u] || []) {
        inDegree[v]--;
        traversedEdges.push({ from: u, to: v });
        setVisitedEdges([...traversedEdges]);
        if (inDegree[v] === 0) {
          queue.push(v);
        }
      }
    }

    if (topoOrder.length === nodes.length) {
      setLogs((prev) => [`Topological Sort complete! Ordering: [${topoOrder.join(' -> ')}]`, ...prev]);
    } else {
      setLogs((prev) => [`⚠️ Graph contains a cycle! Topological sort incomplete. Visited: [${topoOrder.join(' -> ')}]`, ...prev]);
    }

    setIsAnimating(false);
    setTimeout(() => setActiveNodeId(null), 1500);
  };

  // Kruskal's Algorithm (Minimum Spanning Tree - Greedy Edge Selection)
  const runKruskal = async () => {
    if (nodes.length === 0) return;
    setIsAnimating(true);
    resetAnimationStates();
    setLogs((prev) => [`Starting Kruskal's MST algorithm...`, ...prev]);

    // DSU Data Structure
    const parent: Record<number, number> = {};
    nodes.forEach((n) => (parent[n.id] = n.id));

    const find = (i: number): number => {
      if (parent[i] === i) return i;
      return (parent[i] = find(parent[i]));
    };

    const union = (i: number, j: number): boolean => {
      const rootI = find(i);
      const rootJ = find(j);
      if (rootI !== rootJ) {
        parent[rootI] = rootJ;
        return true;
      }
      return false;
    };

    // Sort edges by weight
    const sortedEdges = [...edges].sort((a, b) => getWeight(a) - getWeight(b));
    const mstEdges: GraphEdge[] = [];
    const mstNodes = new Set<number>();
    let totalWeight = 0;

    for (const edge of sortedEdges) {
      const w = getWeight(edge);
      setLogs((prev) => [`Evaluating edge (${edge.from} - ${edge.to}) with weight ${w}...`, ...prev]);
      setActiveNodeId(edge.from);
      await new Promise((r) => setTimeout(r, 650));

      if (union(edge.from, edge.to)) {
        mstEdges.push(edge);
        mstNodes.add(edge.from);
        mstNodes.add(edge.to);
        totalWeight += w;
        setVisitedEdges([...mstEdges]);
        setVisitedNodes(Array.from(mstNodes));
        setLogs((prev) => [`✅ Added edge (${edge.from} - ${edge.to}) to MST. Current weight: ${totalWeight}`, ...prev]);
      } else {
        setLogs((prev) => [`Skipped edge (${edge.from} - ${edge.to}) (Forms a cycle)`, ...prev]);
      }
      await new Promise((r) => setTimeout(r, 650));
    }

    setLogs((prev) => [`Kruskal's MST complete! Total MST Weight: ${totalWeight}`, ...prev]);
    setIsAnimating(false);
    setTimeout(() => setActiveNodeId(null), 1500);
  };

  // Prim's Algorithm (Minimum Spanning Tree - Greedy Node Expansion)
  const runPrim = async () => {
    if (nodes.length === 0) return;
    setIsAnimating(true);
    resetAnimationStates();
    setLogs((prev) => [`Starting Prim's MST algorithm from Node ${startNodeId}...`, ...prev]);

    const visited = new Set<number>([startNodeId]);
    const mstEdges: GraphEdge[] = [];
    let totalWeight = 0;

    setVisitedNodes([startNodeId]);
    setActiveNodeId(startNodeId);
    await new Promise((r) => setTimeout(r, 700));

    while (visited.size < nodes.length) {
      let minEdge: GraphEdge | null = null;
      let minW = Infinity;

      for (const e of edges) {
        const uIn = visited.has(e.from);
        const vIn = visited.has(e.to);

        if ((uIn && !vIn) || (!uIn && vIn)) {
          const w = getWeight(e);
          if (w < minW) {
            minW = w;
            minEdge = e;
          }
        }
      }

      if (!minEdge) {
        setLogs((prev) => [`Graph is disconnected! Prim's MST formed partial tree.`, ...prev]);
        break;
      }

      const nextNode = visited.has(minEdge.from) ? minEdge.to : minEdge.from;
      visited.add(nextNode);
      mstEdges.push(minEdge);
      totalWeight += minW;

      setActiveNodeId(nextNode);
      setVisitedNodes(Array.from(visited));
      setVisitedEdges([...mstEdges]);
      setLogs((prev) => [`✅ Added node ${nextNode} via edge (${minEdge!.from} - ${minEdge!.to}), weight ${minW}. Total: ${totalWeight}`, ...prev]);

      await new Promise((r) => setTimeout(r, 750));
    }

    setLogs((prev) => [`Prim's MST complete! Total MST Weight: ${totalWeight}`, ...prev]);
    setIsAnimating(false);
    setTimeout(() => setActiveNodeId(null), 1500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Workflow className="w-6 h-6 text-brand-500" />
            Graph Traversal visualizer
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Build a custom graph interactively, then animate Breadth First Search (BFS) and Depth First Search (DFS).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side Controls */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-6 lg:col-span-1">
          
          {/* Instructions Alert */}
          <div className="bg-brand-50 border border-brand-100 rounded-xl p-3.5 text-xs text-brand-850 space-y-1">
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <Info className="w-3.5 h-3.5 text-brand-500" />
              How to draw Graph:
            </div>
            <p>1. Click blank space on canvas to place a Node.</p>
            <p>2. Click Node A, then click Node B to draw an Edge.</p>
          </div>

          {/* Trigger Traversal */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Traversal Controls</h3>
            
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-450">Start Node ID</label>
              <select
                value={startNodeId}
                onChange={(e) => setStartNodeId(Number(e.target.value))}
                disabled={isAnimating || nodes.length === 0}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 outline-none"
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
                className="bg-[#3B78C8] hover:bg-[#1A2340] disabled:opacity-50 text-white text-xs py-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all"
              >
                <Play className="w-3.5 h-3.5" /> BFS
              </button>
              <button
                onClick={runDFS}
                disabled={isAnimating || nodes.length === 0}
                className="bg-[#3B78C8] hover:bg-[#1A2340] disabled:opacity-50 text-white text-xs py-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all"
              >
                <Play className="w-3.5 h-3.5" /> DFS
              </button>
              <button
                onClick={runDijkstra}
                disabled={isAnimating || nodes.length === 0}
                className="bg-[#3B78C8] hover:bg-[#1A2340] disabled:opacity-50 text-white text-xs py-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all col-span-2"
              >
                <Play className="w-3.5 h-3.5" /> Dijkstra Shortest Path
              </button>
              <button
                onClick={runTopologicalSort}
                disabled={isAnimating || nodes.length === 0}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs py-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all col-span-2"
              >
                <Play className="w-3.5 h-3.5" /> Topological Sort
              </button>
              <button
                onClick={runKruskal}
                disabled={isAnimating || nodes.length === 0}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs py-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all"
              >
                <Play className="w-3.5 h-3.5" /> Kruskal MST
              </button>
              <button
                onClick={runPrim}
                disabled={isAnimating || nodes.length === 0}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs py-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all"
              >
                <Play className="w-3.5 h-3.5" /> Prim MST
              </button>
              <button
                onClick={runCycleDetection}
                disabled={isAnimating || nodes.length === 0}
                className="bg-[#3B78C8]/90 hover:bg-[#1A2340] disabled:opacity-50 text-white text-xs py-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all col-span-2"
              >
                🔍 Detect Cycle
              </button>
            </div>
          </div>

          <hr className="border-slate-150" />

          {/* Clear Actions */}
          <button
            onClick={clearWorkspace}
            disabled={isAnimating}
            className="w-full flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-2 rounded-xl text-slate-700 font-bold text-xs transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Clear Workspace
          </button>

          <hr className="border-slate-150" />

          {/* History log */}
          <div>
            <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-2">History Log</h3>
            <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 h-32 overflow-y-auto space-y-1.5 text-xs font-mono">
              {logs.map((log, index) => (
                <div key={index} className="text-slate-650">
                  &gt; {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Graph Drawing Area */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm lg:col-span-3 flex flex-col justify-between min-h-[400px] overflow-hidden relative">
          
          {/* Legend */}
          <div className="flex gap-4 text-xs font-medium p-4 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-brand-500"></span>
              <span className="text-slate-500">Visited</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-amber-500"></span>
              <span className="text-slate-500">Active Node</span>
            </div>
            {selectedNodeId !== null && (
              <div className="flex items-center gap-1.5 animate-pulse">
                <span className="w-3.5 h-3.5 rounded bg-indigo-500"></span>
                <span className="text-indigo-650 font-bold">Connecting...</span>
              </div>
            )}
          </div>

          {/* SVG canvas */}
          <svg
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="flex-1 w-full min-h-[300px] cursor-crosshair bg-slate-50/50"
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
                <g key={`edge-${idx}`}>
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={isTraversed ? '#f59e0b' : '#94a3b8'}
                    strokeWidth={isTraversed ? '3.5' : '2'}
                    className="transition-all duration-300"
                  />
                  {/* Weight label pill */}
                  <rect
                    x={(fromNode.x + toNode.x) / 2 - 10}
                    y={(fromNode.y + toNode.y) / 2 - 8}
                    width="20"
                    height="16"
                    rx="4"
                    fill={isTraversed ? '#f59e0b' : '#3B78C8'}
                    className="opacity-90"
                  />
                  <text
                    x={(fromNode.x + toNode.x) / 2}
                    y={(fromNode.y + toNode.y) / 2 + 4}
                    textAnchor="middle"
                    className="text-[10px] font-bold font-mono fill-white select-none"
                  >
                    {getWeight(edge)}
                  </text>
                </g>
              );
            })}

            {/* Draw Nodes */}
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isActive = activeNodeId === node.id;
              const isVisited = visitedNodes.includes(node.id);

              let fill = 'fill-white stroke-slate-350';
              let textFill = 'fill-slate-700';

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
