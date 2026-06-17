import React, { useState } from 'react';
import { EducationalPanel } from '../components/EducationalPanel';
import { Network, Plus, Trash2, Search, Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface TreeNode {
  key: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

interface RenderNode {
  key: number;
  x: number;
  y: number;
  parentId: number | null;
  parentX: number | null;
  parentY: number | null;
}

export const TreeVisualizer: React.FC = () => {
  // Tree state
  const [root, setRoot] = useState<TreeNode | null>({
    key: 50,
    left: {
      key: 30,
      left: { key: 20, left: null, right: null },
      right: { key: 40, left: null, right: null }
    },
    right: {
      key: 70,
      left: { key: 60, left: null, right: null },
      right: { key: 80, left: null, right: null }
    }
  });

  const [inputVal, setInputVal] = useState<string>('');
  
  // Animation highlights
  const [activeNodeKey, setActiveNodeKey] = useState<number | null>(null);
  const [traversedKeys, setTraversedKeys] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  const [logs, setLogs] = useState<string[]>(['BST initialized with root key 50']);

  // Insert value into BST
  const insertKey = (key: number, node: TreeNode | null): TreeNode => {
    if (node === null) {
      return { key, left: null, right: null };
    }
    if (key < node.key) {
      node.left = insertKey(key, node.left);
    } else if (key > node.key) {
      node.right = insertKey(key, node.right);
    }
    return node;
  };

  const handleInsert = () => {
    const key = parseInt(inputVal, 10);
    if (isNaN(key) || key < 0 || key > 99) {
      alert("Please enter a key between 0 and 99");
      return;
    }

    if (findNode(root, key)) {
      alert("Key already exists in the BST!");
      return;
    }

    // deep copy tree
    const newRoot = root ? JSON.parse(JSON.stringify(root)) : null;
    const updatedRoot = insertKey(key, newRoot);
    setRoot(updatedRoot);
    setLogs((prev) => [`Inserted key ${key} into BST`, ...prev]);
    setInputVal('');
  };

  // Helper to find node
  const findNode = (node: TreeNode | null, key: number): boolean => {
    if (!node) return false;
    if (node.key === key) return true;
    return key < node.key ? findNode(node.left, key) : findNode(node.right, key);
  };

  // Delete node from BST
  const findMin = (node: TreeNode): TreeNode => {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  };

  const deleteKey = (key: number, node: TreeNode | null): TreeNode | null => {
    if (node === null) return null;

    if (key < node.key) {
      node.left = deleteKey(key, node.left);
    } else if (key > node.key) {
      node.right = deleteKey(key, node.right);
    } else {
      // Node with only one child or no child
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Node with two children: Get the inorder successor (smallest in the right subtree)
      const minNode = findMin(node.right);
      node.key = minNode.key;
      // Delete the inorder successor
      node.right = deleteKey(minNode.key, node.right);
    }
    return node;
  };

  const handleDelete = () => {
    const key = parseInt(inputVal, 10);
    if (isNaN(key)) {
      alert("Enter a key to delete");
      return;
    }

    if (!root || !findNode(root, key)) {
      alert("Key not found in tree!");
      return;
    }

    const newRoot = JSON.parse(JSON.stringify(root));
    const updatedRoot = deleteKey(key, newRoot);
    setRoot(updatedRoot);
    setLogs((prev) => [`Deleted key ${key} from BST`, ...prev]);
    setInputVal('');
  };

  // Search traversal path simulation
  const handleSearch = async () => {
    const key = parseInt(inputVal, 10);
    if (isNaN(key)) return;

    setIsAnimating(true);
    setTraversedKeys([]);
    setLogs((prev) => [`Searching for key ${key}...`, ...prev]);

    let current = root;
    const path: number[] = [];

    while (current !== null) {
      setActiveNodeKey(current.key);
      path.push(current.key);
      setTraversedKeys([...path]);
      
      await new Promise((resolve) => setTimeout(resolve, 600));

      if (current.key === key) {
        setLogs((prev) => [`Key ${key} found!`, ...prev]);
        break;
      }

      current = key < current.key ? current.left : current.right;
    }

    if (!current) {
      setLogs((prev) => [`Key ${key} not found in tree`, ...prev]);
    }

    setIsAnimating(false);
    setTimeout(() => setActiveNodeKey(null), 1500);
  };

  // Traversals: Inorder, Preorder, Postorder
  const getTraversalList = (type: 'inorder' | 'preorder' | 'postorder'): number[] => {
    const result: number[] = [];
    const traverse = (node: TreeNode | null) => {
      if (!node) return;
      if (type === 'preorder') result.push(node.key);
      traverse(node.left);
      if (type === 'inorder') result.push(node.key);
      traverse(node.right);
      if (type === 'postorder') result.push(node.key);
    };
    traverse(root);
    return result;
  };

  const runTraversal = async (type: 'inorder' | 'preorder' | 'postorder') => {
    if (!root) return;
    setIsAnimating(true);
    setTraversedKeys([]);
    
    const sequence = getTraversalList(type);
    setLogs((prev) => [`Running ${type.toUpperCase()} traversal...`, ...prev]);

    const activeList: number[] = [];
    for (const key of sequence) {
      setActiveNodeKey(key);
      activeList.push(key);
      setTraversedKeys([...activeList]);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    setLogs((prev) => [`Finished traversal. Visited: [${sequence.join(', ')}]`, ...prev]);
    setIsAnimating(false);
    setTimeout(() => setActiveNodeKey(null), 1500);
  };

  // Convert recursive tree nodes to display nodes with coordinate positions
  const getRenderNodes = (): { nodes: RenderNode[]; edges: RenderNode[] } => {
    const list: RenderNode[] = [];
    
    const calculatePositions = (
      node: TreeNode | null,
      depth: number,
      leftBound: number,
      rightBound: number,
      parent: RenderNode | null
    ) => {
      if (!node) return;
      
      const x = (leftBound + rightBound) / 2;
      const y = 50 + depth * 60;

      const currentRenderNode: RenderNode = {
        key: node.key,
        x,
        y,
        parentId: parent ? parent.key : null,
        parentX: parent ? parent.x : null,
        parentY: parent ? parent.y : null
      };

      list.push(currentRenderNode);

      // Recursive call for left and right subtrees
      calculatePositions(node.left, depth + 1, leftBound, x, currentRenderNode);
      calculatePositions(node.right, depth + 1, x, rightBound, currentRenderNode);
    };

    calculatePositions(root, 0, 50, 650, null);
    
    return {
      nodes: list,
      edges: list.filter((n) => n.parentId !== null),
    };
  };

  const { nodes, edges } = getRenderNodes();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Network className="w-6 h-6 text-brand-500" />
            Binary Search Tree (BST)
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Build a BST, search nodes, or run traversals (Inorder, Preorder, Postorder) with visual node traversal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side Controls */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-6 lg:col-span-1">
          {/* Operations */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">Modify Tree</h3>
            <div className="flex flex-col gap-2">
              <input
                type="number"
                placeholder="Key (0 - 99)"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-brand-500"
              />
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <button
                  onClick={handleInsert}
                  disabled={isAnimating}
                  className="bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white text-[10px] py-1.5 rounded-lg font-bold transition-all"
                >
                  <Plus className="w-3.5 h-3.5 inline mr-0.5" /> Insert
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isAnimating}
                  className="bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white text-[10px] py-1.5 rounded-lg font-bold transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5 inline mr-0.5" /> Delete
                </button>
                <button
                  onClick={handleSearch}
                  disabled={isAnimating}
                  className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-[10px] py-1.5 rounded-lg font-bold transition-all"
                >
                  <Search className="w-3.5 h-3.5 inline mr-0.5" /> Search
                </button>
              </div>
            </div>
          </div>

          <hr className="border-slate-150 dark:border-slate-850" />

          {/* Traversals */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">Traversals</h3>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => runTraversal('inorder')}
                disabled={isAnimating || !root}
                className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-350 text-xs py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Play className="w-3 h-3 text-emerald-500" />
                Inorder (Sorted)
              </button>
              <button
                onClick={() => runTraversal('preorder')}
                disabled={isAnimating || !root}
                className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-350 text-xs py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Play className="w-3 h-3 text-brand-500" />
                Preorder
              </button>
              <button
                onClick={() => runTraversal('postorder')}
                disabled={isAnimating || !root}
                className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-350 text-xs py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Play className="w-3 h-3 text-amber-500" />
                Postorder
              </button>
            </div>
          </div>

          <hr className="border-slate-150 dark:border-slate-850" />

          {/* Logs */}
          <div>
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider mb-2">History</h3>
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl p-3 h-32 overflow-y-auto space-y-1.5 text-xs font-mono">
              {logs.map((log, index) => (
                <div key={index} className="text-slate-650 dark:text-slate-400">
                  &gt; {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Rendering Canvas (SVG) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm lg:col-span-3 flex flex-col justify-between min-h-[400px] select-none overflow-x-auto">
          {/* Display Output Node Sequence */}
          <div className="flex items-center gap-2 text-xs font-bold bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-150 dark:border-slate-850">
            <span className="text-slate-400">Traversal Output:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {traversedKeys.map((key, i) => (
                <span key={i} className="px-2 py-0.5 bg-brand-500 text-white rounded font-mono">
                  {key}
                </span>
              ))}
              {traversedKeys.length === 0 && <span className="text-slate-450 italic">None</span>}
            </div>
          </div>

          {/* SVG canvas workspace */}
          <div className="flex-1 flex justify-center items-center py-6">
            <svg width="700" height="320" className="max-w-full">
              {/* Draw Edge Lines */}
              {edges.map((edge, i) => (
                <line
                  key={`edge-${i}`}
                  x1={edge.parentX!}
                  y1={edge.parentY!}
                  x2={edge.x}
                  y2={edge.y}
                  stroke="#cbd5e1"
                  strokeWidth="2.5"
                  className="dark:stroke-slate-800"
                />
              ))}

              {/* Draw Nodes */}
              {nodes.map((node) => {
                const isActive = activeNodeKey === node.key;
                const isTraversed = traversedKeys.includes(node.key);

                let fill = 'fill-white dark:fill-slate-900 stroke-slate-350 dark:stroke-slate-800';
                let textFill = 'fill-slate-700 dark:fill-slate-300';

                if (isActive) {
                  fill = 'fill-amber-500 stroke-amber-600';
                  textFill = 'fill-white';
                } else if (isTraversed) {
                  fill = 'fill-brand-500 stroke-brand-600';
                  textFill = 'fill-white';
                }

                return (
                  <g key={`node-${node.key}`} className="cursor-pointer">
                    <motion.circle
                      layout
                      cx={node.x}
                      cy={node.y}
                      r="18"
                      className={`stroke-2 transition-all duration-300 ${fill}`}
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      className={`text-xs font-bold font-mono ${textFill}`}
                    >
                      {node.key}
                    </text>
                  </g>
                );
              })}

              {nodes.length === 0 && (
                <text x="350" y="160" textAnchor="middle" className="text-slate-400 dark:text-slate-600 text-xs font-semibold uppercase tracking-wider font-sans">
                  Empty BST (Insert a root node)
                </text>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Educational info */}
      <EducationalPanel algorithmId="binary-search-tree" />
    </div>
  );
};
