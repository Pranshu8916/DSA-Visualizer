import React, { useState, useEffect, useRef } from 'react';
import { EducationalPanel } from '../components/EducationalPanel';
import { Play, Pause, RotateCcw, Plus, RefreshCw, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

type SortAlgorithm = 'bubble-sort' | 'selection-sort' | 'insertion-sort' | 'merge-sort' | 'quick-sort';

interface SortStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  comparisons: number;
  swaps: number;
}

export const SortingVisualizer: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<SortAlgorithm>('bubble-sort');
  const [array, setArray] = useState<number[]>([]);
  const [inputVal, setInputVal] = useState<string>('');
  
  // Visualizer playback states
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(100); // ms per step
  
  const timerRef = useRef<any>(null);

  // Generate a random array
  const generateRandomArray = (size = 20) => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 280) + 20);
    setArray(newArray);
    setSteps([]);
    setCurrentStepIdx(0);
  };

  // Set custom array
  const handleCustomArray = () => {
    const parsed = inputVal
      .split(',')
      .map((num) => parseInt(num.trim(), 10))
      .filter((num) => !isNaN(num) && num > 0 && num <= 400);

    if (parsed.length < 3 || parsed.length > 50) {
      alert("Please enter between 3 and 50 comma-separated numbers (values 10-400)");
      return;
    }
    
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    
    setArray(parsed);
    setSteps([]);
    setCurrentStepIdx(0);
    setInputVal('');
  };

  // Generate array on initial render
  useEffect(() => {
    generateRandomArray();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Recalculate sorting steps when array or algorithm changes
  useEffect(() => {
    if (array.length === 0) return;
    
    const recordedSteps: SortStep[] = [];
    // Initial step
    recordedSteps.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: [],
      comparisons: 0,
      swaps: 0,
    });

    if (algorithm === 'bubble-sort') {
      runBubbleSort([...array], recordedSteps);
    } else if (algorithm === 'selection-sort') {
      runSelectionSort([...array], recordedSteps);
    } else if (algorithm === 'insertion-sort') {
      runInsertionSort([...array], recordedSteps);
    } else if (algorithm === 'merge-sort') {
      runMergeSort([...array], recordedSteps);
    } else if (algorithm === 'quick-sort') {
      runQuickSort([...array], recordedSteps);
    }

    setSteps(recordedSteps);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [array, algorithm]);

  // Handle Play/Pause timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps, speed]);

  // --- ALGORITHM STEP GENERATORS ---

  const runBubbleSort = (arr: number[], record: SortStep[]) => {
    let comps = 0;
    let swapsCount = 0;
    const n = arr.length;
    const sortedIndices = new Set<number>();

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        comps++;
        record.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapping: [],
          sorted: Array.from(sortedIndices),
          comparisons: comps,
          swaps: swapsCount,
        });

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapsCount++;
          swapped = true;

          record.push({
            array: [...arr],
            comparing: [],
            swapping: [j, j + 1],
            sorted: Array.from(sortedIndices),
            comparisons: comps,
            swaps: swapsCount,
          });
        }
      }
      sortedIndices.add(n - i - 1);
      if (!swapped) break;
    }
    // Mark remaining elements as sorted
    for (let i = 0; i < n; i++) {
      sortedIndices.add(i);
    }
    record.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from(sortedIndices),
      comparisons: comps,
      swaps: swapsCount,
    });
  };

  const runSelectionSort = (arr: number[], record: SortStep[]) => {
    let comps = 0;
    let swapsCount = 0;
    const n = arr.length;
    const sortedIndices = new Set<number>();

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        comps++;
        record.push({
          array: [...arr],
          comparing: [j, minIdx],
          swapping: [],
          sorted: Array.from(sortedIndices),
          comparisons: comps,
          swaps: swapsCount,
        });

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        swapsCount++;

        record.push({
          array: [...arr],
          comparing: [],
          swapping: [i, minIdx],
          sorted: Array.from(sortedIndices),
          comparisons: comps,
          swaps: swapsCount,
        });
      }
      sortedIndices.add(i);
    }
    sortedIndices.add(n - 1);
    record.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from(sortedIndices),
      comparisons: comps,
      swaps: swapsCount,
    });
  };

  const runInsertionSort = (arr: number[], record: SortStep[]) => {
    let comps = 0;
    let swapsCount = 0;
    const n = arr.length;
    const sortedIndices = new Set<number>();
    sortedIndices.add(0);

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;

      comps++;
      record.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: Array.from(sortedIndices),
        comparisons: comps,
        swaps: swapsCount,
      });

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        swapsCount++;
        
        record.push({
          array: [...arr],
          comparing: [j],
          swapping: [j + 1],
          sorted: Array.from(sortedIndices),
          comparisons: comps,
          swaps: swapsCount,
        });
        
        j--;
        if (j >= 0) comps++;
      }
      arr[j + 1] = key;
      for (let k = 0; k <= i; k++) {
        sortedIndices.add(k);
      }
      record.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from(sortedIndices),
        comparisons: comps,
        swaps: swapsCount,
      });
    }
    record.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: n }, (_, k) => k),
      comparisons: comps,
      swaps: swapsCount,
    });
  };

  const runMergeSort = (arr: number[], record: SortStep[]) => {
    let comps = 0;
    let swapsCount = 0;

    const merge = (low: number, mid: number, high: number) => {
      const temp: number[] = [];
      let i = low;
      let j = mid + 1;

      while (i <= mid && j <= high) {
        comps++;
        record.push({
          array: [...arr],
          comparing: [i, j],
          swapping: [],
          sorted: [],
          comparisons: comps,
          swaps: swapsCount,
        });

        if (arr[i] <= arr[j]) {
          temp.push(arr[i++]);
        } else {
          temp.push(arr[j++]);
        }
      }

      while (i <= mid) {
        temp.push(arr[i++]);
      }
      while (j <= high) {
        temp.push(arr[j++]);
      }

      for (let k = 0; k < temp.length; k++) {
        arr[low + k] = temp[k];
        swapsCount++;
        record.push({
          array: [...arr],
          comparing: [],
          swapping: [low + k],
          sorted: [],
          comparisons: comps,
          swaps: swapsCount,
        });
      }
    };

    const mergeSortDivider = (low: number, high: number) => {
      if (low < high) {
        const mid = Math.floor((low + high) / 2);
        mergeSortDivider(low, mid);
        mergeSortDivider(mid + 1, high);
        merge(low, mid, high);
      }
    };

    mergeSortDivider(0, arr.length - 1);
    
    // Final sorted record
    record.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: arr.length }, (_, k) => k),
      comparisons: comps,
      swaps: swapsCount,
    });
  };

  const runQuickSort = (arr: number[], record: SortStep[]) => {
    let comps = 0;
    let swapsCount = 0;

    const partition = (low: number, high: number): number => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        comps++;
        record.push({
          array: [...arr],
          comparing: [j, high],
          swapping: [],
          sorted: [],
          comparisons: comps,
          swaps: swapsCount,
        });

        if (arr[j] < pivot) {
          i++;
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          swapsCount++;

          record.push({
            array: [...arr],
            comparing: [],
            swapping: [i, j],
            sorted: [],
            comparisons: comps,
            swaps: swapsCount,
          });
        }
      }

      const temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      swapsCount++;

      record.push({
        array: [...arr],
        comparing: [],
        swapping: [i + 1, high],
        sorted: [],
        comparisons: comps,
        swaps: swapsCount,
      });

      return i + 1;
    };

    const quickSortDivider = (low: number, high: number) => {
      if (low < high) {
        const pi = partition(low, high);
        quickSortDivider(low, pi - 1);
        quickSortDivider(pi + 1, high);
      }
    };

    quickSortDivider(0, arr.length - 1);

    // Final sorted record
    record.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: arr.length }, (_, k) => k),
      comparisons: comps,
      swaps: swapsCount,
    });
  };

  // Get current sorting step stats
  const currentStep = steps[currentStepIdx] || {
    array: array,
    comparing: [],
    swapping: [],
    sorted: [],
    comparisons: 0,
    swaps: 0,
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <BarChart className="w-6 h-6 text-brand-500" />
            Sorting Visualizer
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Compare performance and visual flows of various sorting algorithms.
          </p>
        </div>

        {/* Algorithm Select */}
        <div className="flex flex-wrap items-center gap-3">
          {(['bubble-sort', 'selection-sort', 'insertion-sort', 'merge-sort', 'quick-sort'] as SortAlgorithm[]).map((algo) => (
            <button
              key={algo}
              onClick={() => setAlgorithm(algo)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 ${
                algorithm === algo
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {algo.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Control & Visualization Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side: Controls & Stats */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-6 lg:col-span-1">
          <div>
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-3">Controls</h3>
            <div className="flex flex-col gap-3">
              {/* Play / Pause / Reset */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={currentStepIdx >= steps.length - 1 && isPlaying}
                  className="flex-1 flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white py-2.5 rounded-xl font-semibold text-sm transition-all"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStepIdx(0);
                  }}
                  className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-600 dark:text-slate-300 transition-all"
                  title="Reset Playback"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Speed Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                  <span>Speed</span>
                  <span>{speed}ms</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="600"
                  step="20"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>

              <hr className="border-slate-150 dark:border-slate-850" />

              {/* Reset Array */}
              <button
                onClick={() => generateRandomArray()}
                className="w-full flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-950 py-2 rounded-xl text-slate-700 dark:text-slate-300 font-semibold text-xs transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                New Random Array
              </button>
            </div>
          </div>

          {/* Custom Array Entry */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Custom Input</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="20, 150, 80, 220"
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-brand-500"
              />
              <button
                onClick={handleCustomArray}
                className="bg-brand-500 hover:bg-brand-600 text-white p-2 rounded-xl"
                title="Apply Custom Array"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <hr className="border-slate-150 dark:border-slate-850" />

          {/* Real-time Counters */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Counters</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 p-3 rounded-xl text-center">
                <span className="block text-slate-400 dark:text-slate-550 text-[10px] uppercase font-bold tracking-wider">Comparisons</span>
                <span className="text-xl font-bold font-mono text-amber-500">{currentStep.comparisons}</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 p-3 rounded-xl text-center">
                <span className="block text-slate-400 dark:text-slate-550 text-[10px] uppercase font-bold tracking-wider">Swaps</span>
                <span className="text-xl font-bold font-mono text-rose-500">{currentStep.swaps}</span>
              </div>
            </div>
            {/* Step Counter Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Timeline</span>
                <span>{currentStepIdx + 1} / {steps.length || 1}</span>
              </div>
              <input
                type="range"
                min="0"
                max={Math.max(0, steps.length - 1)}
                value={currentStepIdx}
                onChange={(e) => {
                  setIsPlaying(false);
                  setCurrentStepIdx(Number(e.target.value));
                }}
                className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Visualizing Canvas */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm lg:col-span-3 flex flex-col justify-between min-h-[350px]">
          {/* Legend */}
          <div className="flex gap-4 text-xs font-medium pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-brand-500"></span>
              <span className="text-slate-500 dark:text-slate-400">Normal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-amber-500"></span>
              <span className="text-slate-500 dark:text-slate-400">Comparing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-rose-500"></span>
              <span className="text-slate-500 dark:text-slate-400">Swapping</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-emerald-500"></span>
              <span className="text-slate-500 dark:text-slate-400">Sorted</span>
            </div>
          </div>

          {/* Bar Chart Canvas */}
          <div className="flex-1 flex items-end justify-center gap-1 md:gap-2 pt-8 pb-4 h-64 select-none">
            {currentStep.array.map((val, idx) => {
              // Decide bar color based on states
              let barColor = 'bg-brand-500/80 dark:bg-brand-600/80 hover:bg-brand-600 dark:hover:bg-brand-500';
              if (currentStep.comparing.includes(idx)) {
                barColor = 'bg-amber-500 dark:bg-amber-500';
              } else if (currentStep.swapping.includes(idx)) {
                barColor = 'bg-rose-500 dark:bg-rose-500';
              } else if (currentStep.sorted.includes(idx)) {
                barColor = 'bg-emerald-500 dark:bg-emerald-500';
              }

              return (
                <div key={idx} className="flex flex-col items-center flex-1 max-w-[32px]">
                  {/* Dynamic Height Bar */}
                  <motion.div
                    layout
                    style={{ height: `${val}px` }}
                    className={`w-full rounded-t-lg transition-colors duration-250 ${barColor}`}
                  ></motion.div>
                  {/* Bar Value (shown only if enough space / smaller array size) */}
                  {currentStep.array.length <= 22 && (
                    <span className="text-[10px] font-bold font-mono text-slate-500 mt-2">
                      {val}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Description & Educational Panel */}
      <EducationalPanel algorithmId={algorithm} />
    </div>
  );
};
