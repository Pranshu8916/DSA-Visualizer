const ALGORITHMS_DATA = {
  // --- SORTING ---
  "bubble-sort": {
    id: "bubble-sort",
    name: "Bubble Sort",
    category: "Sorting",
    description: "Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This pass through the list is repeated until the list is sorted.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    pseudocode: `procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n-1 inclusive do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped := true
            end if
        end for
        n := n - 1
    until not swapped
end procedure`
  },
  "selection-sort": {
    id: "selection-sort",
    name: "Selection Sort",
    category: "Sorting",
    description: "Selection Sort divides the input list into two parts: a sorted sublist at the left and an unsorted sublist at the right. It repeatedly finds the smallest (or largest) element in the unsorted sublist and moves it to the end of the sorted sublist.",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    pseudocode: `procedure selectionSort(A : list of sortable items)
    n := length(A)
    for i := 0 to n-2 do
        minIndex := i
        for j := i+1 to n-1 do
            if A[j] < A[minIndex] then
                minIndex := j
            end if
        end for
        if minIndex != i then
            swap(A[i], A[minIndex])
        end if
    end for
end procedure`
  },
  "insertion-sort": {
    id: "insertion-sort",
    name: "Insertion Sort",
    category: "Sorting",
    description: "Insertion Sort builds the final sorted array one item at a time. It consumes one input element each repetition, growing a sorted output list. At each iteration, it removes an element from the input, finds its correct insertion location in the sorted list, and inserts it there.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    pseudocode: `procedure insertionSort(A : list of sortable items)
    for i := 1 to length(A)-1 do
        key := A[i]
        j := i - 1
        while j >= 0 and A[j] > key do
            A[j+1] := A[j]
            j := j - 1
        end while
        A[j+1] := key
    end for
end procedure`
  },
  "merge-sort": {
    id: "merge-sort",
    name: "Merge Sort",
    category: "Sorting",
    description: "Merge Sort is an efficient, stable, comparison-based, divide-and-conquer sorting algorithm. Most implementations produce a stable sort, meaning that the order of equal elements is the same in the input and output. It divides the unsorted list into n sublists, repeatedly merges them to produce sorted sublists, until there is only 1 sublist remaining.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)"
    },
    spaceComplexity: "O(n)",
    pseudocode: `procedure mergeSort(A : list of sortable items)
    if length(A) <= 1 then
        return A
    end if
    
    mid := length(A) / 2
    left := mergeSort(left half of A)
    right := mergeSort(right half of A)
    
    return merge(left, right)
end procedure

procedure merge(left, right)
    result := empty list
    while left and right are not empty do
        if left[0] <= right[0] then
            append left[0] to result
            remove left[0] from left
        else
            append right[0] to result
            remove right[0] from right
        end if
    end while
    append remaining items in left/right to result
    return result
end procedure`
  },
  "quick-sort": {
    id: "quick-sort",
    name: "Quick Sort",
    category: "Sorting",
    description: "Quick Sort is an efficient division-based, divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(log n)",
    pseudocode: `procedure quickSort(A, low, high)
    if low < high then
        pivotIndex := partition(A, low, high)
        quickSort(A, low, pivotIndex - 1)
        quickSort(A, pivotIndex + 1, high)
    end if
end procedure

procedure partition(A, low, high)
    pivot := A[high]
    i := low - 1
    for j := low to high - 1 do
        if A[j] < pivot then
            i := i + 1
            swap(A[i], A[j])
        end if
    end for
    swap(A[i+1], A[high])
    return i + 1
end procedure`
  },

  // --- SEARCHING ---
  "linear-search": {
    id: "linear-search",
    name: "Linear Search",
    category: "Searching",
    description: "Linear Search (sequential search) is a simple method for finding a target value within a list. It sequentially checks each element of the list for the target value until a match is found or until all the elements have been searched.",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)"
    },
    spaceComplexity: "O(1)",
    pseudocode: `procedure linearSearch(A, target)
    for i := 0 to length(A) - 1 do
        if A[i] == target then
            return i  // Target found at index i
        end if
    end for
    return -1  // Target not found
end procedure`
  },
  "binary-search": {
    id: "binary-search",
    name: "Binary Search",
    category: "Searching",
    description: "Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)"
    },
    spaceComplexity: "O(1)",
    pseudocode: `procedure binarySearch(A, target)
    low := 0
    high := length(A) - 1
    while low <= high do
        mid := low + (high - low) / 2
        if A[mid] == target then
            return mid
        else if A[mid] < target then
            low := mid + 1
        else
            high := mid - 1
        end if
    end while
    return -1  // Target not found
end procedure`
  },

  // --- DATA STRUCTURES ---
  "stack": {
    id: "stack",
    name: "Stack",
    category: "Data Structures",
    description: "A Stack is a linear data structure that follows the Last In First Out (LIFO) principle. The elements are inserted and deleted from the same end, commonly referred to as the 'top' of the stack.",
    timeComplexity: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)"
    },
    spaceComplexity: "O(n)",
    pseudocode: `class Stack:
    procedure push(value):
        insert value at top of stack
    
    procedure pop():
        if stack is empty:
            throw underflow error
        remove and return value at top of stack
        
    procedure peek():
        if stack is empty:
            return null
        return value at top of stack`
  },
  "queue": {
    id: "queue",
    name: "Queue",
    category: "Data Structures",
    description: "A Queue is a linear data structure that follows the First In First Out (FIFO) principle. Elements are inserted at one end (rear/enqueue) and deleted from the other end (front/dequeue).",
    timeComplexity: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)"
    },
    spaceComplexity: "O(n)",
    pseudocode: `class Queue:
    procedure enqueue(value):
        insert value at rear of queue
        
    procedure dequeue():
        if queue is empty:
            throw underflow error
        remove and return value at front of queue
        
    procedure front():
        return value at front of queue
        
    procedure rear():
        return value at rear of queue`
  },
  "linked-list": {
    id: "linked-list",
    name: "Linked List",
    category: "Data Structures",
    description: "A Linked List is a linear data structure where elements (nodes) are stored in a sequence, and each node points to the next node in the sequence using a reference (pointer). Unlike arrays, elements are not stored in contiguous memory locations.",
    timeComplexity: {
      best: "O(1) (at Head)",
      average: "O(n) (general)",
      worst: "O(n)"
    },
    spaceComplexity: "O(n)",
    pseudocode: `class Node:
    data: value
    next: pointer/reference

class LinkedList:
    procedure insert(value, index):
        newNode := Node(value)
        if index == 0:
            newNode.next := head
            head := newNode
        else:
            prev := node at index - 1
            newNode.next := prev.next
            prev.next := newNode

    procedure delete(index):
        if index == 0:
            head := head.next
        else:
            prev := node at index - 1
            prev.next := prev.next.next

    procedure reverse():
        prev := null, curr := head, next := null
        while curr is not null do
            next := curr.next
            curr.next := prev
            prev := curr
            curr := next
        end while
        head := prev`
  },
  "binary-search-tree": {
    id: "binary-search-tree",
    name: "Binary Search Tree",
    category: "Trees",
    description: "A Binary Search Tree (BST) is a node-based binary tree data structure where for each node, the left subtree contains only nodes with keys less than the parent node's key, and the right subtree contains only nodes with keys greater than the parent node's key.",
    timeComplexity: {
      best: "O(log n)",
      average: "O(log n)",
      worst: "O(n)"
    },
    spaceComplexity: "O(n)",
    pseudocode: `class BSTNode:
    key: value
    left: pointer, right: pointer

class BinarySearchTree:
    procedure insert(root, key):
        if root is null:
            return BSTNode(key)
        if key < root.key:
            root.left := insert(root.left, key)
        else:
            root.right := insert(root.right, key)
        return root

    procedure inorder(root):
        if root is not null:
            inorder(root.left)
            visit(root.key)
            inorder(root.right)
            
    procedure preorder(root):
        if root is not null:
            visit(root.key)
            preorder(root.left)
            preorder(root.right)

    procedure postorder(root):
        if root is not null:
            postorder(root.left)
            postorder(root.right)
            visit(root.key)`
  },
  "graph": {
    id: "graph",
    name: "Graph Traversal",
    category: "Graphs",
    description: "A Graph is a non-linear data structure consisting of nodes (vertices) and lines that connect them (edges). Graph traversals (BFS, DFS) visit all vertices in a systematic way.",
    timeComplexity: {
      best: "O(V + E)",
      average: "O(V + E)",
      worst: "O(V + E)"
    },
    spaceComplexity: "O(V)",
    pseudocode: `procedure BFS(graph, startVertex):
    let Q be a queue
    label startVertex as discovered
    Q.enqueue(startVertex)
    while Q is not empty do
        v := Q.dequeue()
        for all edges from v to w in graph.adjacentEdges(v) do
            if w is not labeled as discovered then
                label w as discovered
                Q.enqueue(w)

procedure DFS(graph, startVertex):
    let S be a stack
    S.push(startVertex)
    while S is not empty do
        v := S.pop()
        if v is not labeled as discovered then
            label v as discovered
            for all edges from v to w in graph.adjacentEdges(v) do
                S.push(w)`
  }
};

export const getAlgorithmsList = () => {
  return Object.values(ALGORITHMS_DATA).map(({ id, name, category }) => ({ id, name, category }));
};

export const getAlgorithmDetails = (id) => {
  return ALGORITHMS_DATA[id] || null;
};
