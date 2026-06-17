import type { Algorithm, AlgorithmSummary } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchAlgorithms = async (): Promise<AlgorithmSummary[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithms`);
    if (!response.ok) {
      throw new Error('Failed to fetch algorithms');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching algorithms:', error);
    // Fallback if server is not running
    return [
      { id: 'bubble-sort', name: 'Bubble Sort', category: 'Sorting' },
      { id: 'selection-sort', name: 'Selection Sort', category: 'Sorting' },
      { id: 'insertion-sort', name: 'Insertion Sort', category: 'Sorting' },
      { id: 'merge-sort', name: 'Merge Sort', category: 'Sorting' },
      { id: 'quick-sort', name: 'Quick Sort', category: 'Sorting' },
      { id: 'linear-search', name: 'Linear Search', category: 'Searching' },
      { id: 'binary-search', name: 'Binary Search', category: 'Searching' },
      { id: 'stack', name: 'Stack', category: 'Data Structures' },
      { id: 'queue', name: 'Queue', category: 'Data Structures' },
      { id: 'linked-list', name: 'Linked List', category: 'Data Structures' },
      { id: 'binary-search-tree', name: 'Binary Search Tree', category: 'Trees' },
      { id: 'graph', name: 'Graph Traversal', category: 'Graphs' }
    ];
  }
};

export const fetchAlgorithmDetails = async (id: string): Promise<Algorithm | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithms/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch details for ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching details for ${id}:`, error);
    // Dynamic import to avoid bundling all mock data on load, or we can just import it dynamically from a local static file.
    // As a robust fallback, we return a mock object.
    return getLocalMockData(id);
  }
};

// Local mock data store as a fallback for offline/independent frontend demo
const getLocalMockData = (id: string): Algorithm | null => {
  const mockData: Record<string, Omit<Algorithm, 'id'>> = {
    "bubble-sort": {
      name: "Bubble Sort",
      category: "Sorting",
      description: "Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This pass through the list is repeated until the list is sorted.",
      timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
      spaceComplexity: "O(1)",
      pseudocode: `procedure bubbleSort(A : list of sortable items)\n    n := length(A)\n    repeat\n        swapped := false\n        for i := 1 to n-1 inclusive do\n            if A[i-1] > A[i] then\n                swap(A[i-1], A[i])\n                swapped := true\n            end if\n        end for\n        n := n - 1\n    until not swapped\nend procedure`
    },
    "selection-sort": {
      name: "Selection Sort",
      category: "Sorting",
      description: "Selection Sort divides the input list into two parts: a sorted sublist at the left and an unsorted sublist at the right. It repeatedly finds the smallest (or largest) element in the unsorted sublist and moves it to the end of the sorted sublist.",
      timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
      spaceComplexity: "O(1)",
      pseudocode: `procedure selectionSort(A : list of sortable items)\n    n := length(A)\n    for i := 0 to n-2 do\n        minIndex := i\n        for j := i+1 to n-1 do\n            if A[j] < A[minIndex] then\n                minIndex := j\n            end if\n        end for\n        if minIndex != i then\n            swap(A[i], A[minIndex])\n        end if\n    end for\nend procedure`
    },
    "insertion-sort": {
      name: "Insertion Sort",
      category: "Sorting",
      description: "Insertion Sort builds the final sorted array one item at a time. It consumes one input element each repetition, growing a sorted output list. At each iteration, it removes an element from the input, finds its correct insertion location in the sorted list, and inserts it there.",
      timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
      spaceComplexity: "O(1)",
      pseudocode: `procedure insertionSort(A : list of sortable items)\n    for i := 1 to length(A)-1 do\n        key := A[i]\n        j := i - 1\n        while j >= 0 and A[j] > key do\n            A[j+1] := A[j]\n            j := j - 1\n        end while\n        A[j+1] := key\n    end for\nend procedure`
    },
    "merge-sort": {
      name: "Merge Sort",
      category: "Sorting",
      description: "Merge Sort is an efficient, stable, comparison-based, divide-and-conquer sorting algorithm. Most implementations produce a stable sort, meaning that the order of equal elements is the same in the input and output. It divides the unsorted list into n sublists, repeatedly merges them to produce sorted sublists, until there is only 1 sublist remaining.",
      timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
      spaceComplexity: "O(n)",
      pseudocode: `procedure mergeSort(A : list of sortable items)\n    if length(A) <= 1 then\n        return A\n    end if\n    \n    mid := length(A) / 2\n    left := mergeSort(left half of A)\n    right := mergeSort(right half of A)\n    \n    return merge(left, right)\nend procedure`
    },
    "quick-sort": {
      name: "Quick Sort",
      category: "Sorting",
      description: "Quick Sort is an efficient division-based, divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.",
      timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
      spaceComplexity: "O(log n)",
      pseudocode: `procedure quickSort(A, low, high)\n    if low < high then\n        pivotIndex := partition(A, low, high)\n        quickSort(A, low, pivotIndex - 1)\n        quickSort(A, pivotIndex + 1, high)\n    end if\nend procedure`
    },
    "linear-search": {
      name: "Linear Search",
      category: "Searching",
      description: "Linear Search (sequential search) is a simple method for finding a target value within a list. It sequentially checks each element of the list for the target value until a match is found or until all the elements have been searched.",
      timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
      spaceComplexity: "O(1)",
      pseudocode: `procedure linearSearch(A, target)\n    for i := 0 to length(A) - 1 do\n        if A[i] == target then\n            return i  // Target found\n        end if\n    end for\n    return -1  // Not found\nend procedure`
    },
    "binary-search": {
      name: "Binary Search",
      category: "Searching",
      description: "Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.",
      timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
      spaceComplexity: "O(1)",
      pseudocode: `procedure binarySearch(A, target)\n    low := 0\n    high := length(A) - 1\n    while low <= high do\n        mid := low + (high - low) / 2\n        if A[mid] == target then\n            return mid\n        else if A[mid] < target then\n            low := mid + 1\n        else\n            high := mid - 1\n        end if\n    end while\n    return -1\nend procedure`
    },
    "stack": {
      name: "Stack",
      category: "Data Structures",
      description: "A Stack is a linear data structure that follows the Last In First Out (LIFO) principle. The elements are inserted and deleted from the same end, commonly referred to as the 'top' of the stack.",
      timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
      spaceComplexity: "O(n)",
      pseudocode: `class Stack:\n    procedure push(value):\n        insert value at top\n    \n    procedure pop():\n        if empty error else remove and return top\n        \n    procedure peek():\n        return top value`
    },
    "queue": {
      name: "Queue",
      category: "Data Structures",
      description: "A Queue is a linear data structure that follows the First In First Out (FIFO) principle. Elements are inserted at one end (rear/enqueue) and deleted from the other end (front/dequeue).",
      timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
      spaceComplexity: "O(n)",
      pseudocode: `class Queue:\n    procedure enqueue(value):\n        insert at rear\n        \n    procedure dequeue():\n        remove from front\n        \n    procedure front():\n        return front value`
    },
    "linked-list": {
      name: "Linked List",
      category: "Data Structures",
      description: "A Linked List is a linear data structure where elements (nodes) are stored in a sequence, and each node points to the next node in the sequence using a reference (pointer). Unlike arrays, elements are not stored in contiguous memory locations.",
      timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
      spaceComplexity: "O(n)",
      pseudocode: `procedure insert(value, index):\n    newNode := Node(value)\n    // Link up nodes accordingly\n\nprocedure delete(index):\n    // Adjust pointers to remove\n\nprocedure reverse():\n    // Flip references in-place`
    },
    "binary-search-tree": {
      name: "Binary Search Tree",
      category: "Trees",
      description: "A Binary Search Tree (BST) is a node-based binary tree data structure where for each node, the left subtree contains only nodes with keys less than the parent node's key, and the right subtree contains only nodes with keys greater than the parent node's key.",
      timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(n)" },
      spaceComplexity: "O(n)",
      pseudocode: `procedure insert(root, key):\n    if null, create node\n    else recurse left or right\n\nprocedure inorder(root):\n    recurse left, visit, recurse right`
    },
    "graph": {
      name: "Graph Traversal",
      category: "Graphs",
      description: "A Graph is a non-linear data structure consisting of nodes (vertices) and lines that connect them (edges). Graph traversals (BFS, DFS) visit all vertices in a systematic way.",
      timeComplexity: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
      spaceComplexity: "O(V)",
      pseudocode: `procedure BFS(graph, startVertex):\n    Q.enqueue(startVertex)\n    // Mark and visit neighbors\n\nprocedure DFS(graph, startVertex):\n    S.push(startVertex)\n    // Mark and visit deep neighbors`
    }
  };

  const item = mockData[id];
  return item ? { id, ...item } : null;
};
