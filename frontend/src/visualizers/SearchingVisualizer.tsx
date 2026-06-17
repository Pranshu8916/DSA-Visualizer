import React, { useState, useEffect, useRef } from 'react';
import { EducationalPanel } from '../components/EducationalPanel';
import { Play, Pause, RotateCcw, Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

type SearchAlgorithm = 'linear-search' | 'binary-search';

interface SearchStep {
  index: number;
  low?: number;
  mid?: number;
  high?: number;
  state: 'scanning' | 'match' | 'discarded' | 'inactive';
  discardedIndices?: number[];
  foundIndex: number;
}

export const SearchingVisualizer: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<SearchAlgorithm>('linear-search');
  const [array, setArray] = useState<number[]>([15, 23, 37, 42, 58, 65, 71, 89, 94, 102, 115, 128, 142, 150]);
  const [inputVal, setInputVal] = useState<string>('');
  const [target, setTarget] = useState<number>(71);
  const [targetInput, setTargetInput] = useState<string>('71');

  // Playback control
  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(300); // ms per step

  const timerRef = useRef<any>(null);

  // Generate a random array (sorted)
  const generateRandomArray = (size = 14) => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 140) + 10);
    newArray.sort((a, b) => a - b);
    setArray(newArray);
    setSteps([]);
    setCurrentStepIdx(0);
    // Select a random element from array as target
    const randomTarget = newArray[Math.floor(Math.random() * newArray.length)];
    setTarget(randomTarget);
    setTargetInput(randomTarget.toString());
  };

  // Set custom array
  const handleCustomArray = () => {
    const parsed = inputVal
      .split(',')
      .map((num) => parseInt(num.trim(), 10))
      .filter((num) => !isNaN(num) && num > 0);

    if (parsed.length < 3 || parsed.length > 25) {
      alert("Please enter between 3 and 25 comma-separated positive numbers");
      return;
    }

    // Sort if Binary Search, else keep as is (but let's sort anyway for a good search layout, or sort conditionally)
    if (algorithm === 'binary-search') {
      parsed.sort((a, b) => a - b);
    }

    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);

    setArray(parsed);
    setSteps([]);
    setCurrentStepIdx(0);
    setInputVal('');
  };

  // Apply custom target
  const handleTargetSubmit = () => {
    const num = parseInt(targetInput, 10);
    if (isNaN(num)) {
      alert("Please enter a valid target number");
      return;
    }
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTarget(num);
    setCurrentStepIdx(0);
  };

  // Recalculate steps when array, target, or algorithm changes
  useEffect(() => {
    if (array.length === 0) return;

    const recordedSteps: SearchStep[] = [];
    
    if (algorithm === 'linear-search') {
      runLinearSearch(array, target, recordedSteps);
    } else {
      // Binary search requires sorted array
      const sortedArray = [...array].sort((a, b) => a - b);
      if (JSON.stringify(sortedArray) !== JSON.stringify(array)) {
        setArray(sortedArray);
        return; // Will trigger dependency reload
      }
      runBinarySearch(array, target, recordedSteps);
    }

    setSteps(recordedSteps);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [array, target, algorithm]);

  // Handle Play/Pause
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

  // --- SEARCH STEP RECORDERS ---

  const runLinearSearch = (arr: number[], searchVal: number, record: SearchStep[]) => {
    let found = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === searchVal) {
        found = i;
        record.push({
          index: i,
          state: 'match',
          foundIndex: found,
        });
        break;
      } else {
        record.push({
          index: i,
          state: 'scanning',
          foundIndex: -1,
        });
      }
    }
    if (found === -1) {
      // No match found
      record.push({
        index: -1,
        state: 'inactive',
        foundIndex: -2, // -2 indicates finished with no match
      });
    }
  };

  const runBinarySearch = (arr: number[], searchVal: number, record: SearchStep[]) => {
    let low = 0;
    let high = arr.length - 1;
    let found = -1;
    const discarded: number[] = [];

    while (low <= high) {
      const mid = Math.floor(low + (high - low) / 2);
      
      record.push({
        index: mid,
        low,
        mid,
        high,
        state: 'scanning',
        discardedIndices: [...discarded],
        foundIndex: -1,
      });

      if (arr[mid] === searchVal) {
        found = mid;
        record.push({
          index: mid,
          low,
          mid,
          high,
          state: 'match',
          discardedIndices: [...discarded],
          foundIndex: found,
        });
        break;
      } else if (arr[mid] < searchVal) {
        // Discard left half
        for (let i = low; i <= mid; i++) {
          discarded.push(i);
        }
        record.push({
          index: mid,
          low,
          mid,
          high,
          state: 'discarded',
          discardedIndices: [...discarded],
          foundIndex: -1,
        });
        low = mid + 1;
      } else {
        // Discard right half
        for (let i = mid; i <= high; i++) {
          discarded.push(i);
        }
        record.push({
          index: mid,
          low,
          mid,
          high,
          state: 'discarded',
          discardedIndices: [...discarded],
          foundIndex: -1,
        });
        high = mid - 1;
      }
    }

    if (found === -1) {
      record.push({
        index: -1,
        state: 'inactive',
        discardedIndices: [...discarded],
        foundIndex: -2,
      });
    }
  };

  const currentStep = steps[currentStepIdx] || {
    index: -1,
    state: 'inactive',
    discardedIndices: [],
    foundIndex: -1,
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Search className="w-6 h-6 text-brand-500" />
            Searching Visualizer
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Observe the step-by-step element evaluation process for Linear and Binary searches.
          </p>
        </div>

        {/* Algorithm Selection */}
        <div className="flex flex-wrap items-center gap-3">
          {(['linear-search', 'binary-search'] as SearchAlgorithm[]).map((algo) => (
            <button
              key={algo}
              onClick={() => {
                setAlgorithm(algo);
                if (algo === 'binary-search') {
                  const sorted = [...array].sort((a, b) => a - b);
                  setArray(sorted);
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 ${
                algorithm === algo
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {algo === 'linear-search' ? 'Linear Search' : 'Binary Search (Sorted Array)'}
            </button>
          ))}
        </div>
      </div>

      {/* Control & Visualization Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Control Panel */}
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
                  min="50"
                  max="1000"
                  step="50"
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
                New Random Array
              </button>
            </div>
          </div>

          {/* Set Search Target */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Target Element</h3>
            <div className="flex gap-2">
              <input
                type="number"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-brand-500"
              />
              <button
                onClick={handleTargetSubmit}
                className="bg-brand-500 hover:bg-brand-600 text-white px-3 py-2 rounded-xl text-xs font-bold transition-all"
              >
                Set
              </button>
            </div>
          </div>

          {/* Custom Array Entry */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm font-semibold">Custom Input</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="10, 25, 45, 60, 95"
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-brand-500"
              />
              <button
                onClick={handleCustomArray}
                className="bg-brand-500 hover:bg-brand-600 text-white p-2 rounded-xl"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <hr className="border-slate-150 dark:border-slate-850" />

          {/* Result Text */}
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-150 dark:border-slate-850 text-center text-sm font-semibold">
            {currentStep.foundIndex === -2 && (
              <span className="text-rose-500">Target element {target} not found!</span>
            )}
            {currentStep.foundIndex >= 0 && (
              <span className="text-emerald-500">Target {target} found at index {currentStep.foundIndex}!</span>
            )}
            {currentStep.foundIndex === -1 && (
              <span className="text-slate-500">Searching... Step {currentStepIdx + 1}</span>
            )}
          </div>
        </div>

        {/* Right Visualization Grid */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm lg:col-span-3 flex flex-col justify-between min-h-[350px]">
          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-xs font-medium pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-brand-500"></span>
              <span className="text-slate-500 dark:text-slate-400">Normal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-amber-500"></span>
              <span className="text-slate-500 dark:text-slate-400">Inspecting / Mid</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-emerald-500"></span>
              <span className="text-slate-500 dark:text-slate-400">Match Found</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-slate-350 dark:bg-slate-700 opacity-40"></span>
              <span className="text-slate-500 dark:text-slate-400">Discarded Range</span>
            </div>
          </div>

          {/* Array Boxes Render */}
          <div className="flex-1 flex flex-wrap items-center justify-center gap-3 pt-6 pb-6">
            {array.map((val, idx) => {
              const isDiscarded = currentStep.discardedIndices?.includes(idx);
              const isMatch = currentStep.foundIndex === idx || (currentStep.state === 'match' && currentStep.index === idx);
              const isScanning = currentStep.index === idx;

              let boxColor = 'bg-brand-50 border-brand-200 dark:bg-brand-950/20 dark:border-brand-900 text-brand-700 dark:text-brand-300';
              
              if (isDiscarded) {
                boxColor = 'bg-slate-100 border-slate-200 dark:bg-slate-950 dark:border-slate-850 text-slate-300 dark:text-slate-750 opacity-40 line-through';
              } else if (isMatch) {
                boxColor = 'bg-emerald-500 border-emerald-600 text-white scale-110 shadow-lg shadow-emerald-500/20';
              } else if (isScanning) {
                boxColor = 'bg-amber-500 border-amber-600 text-white scale-110 shadow-lg shadow-amber-500/20';
              }

              // Pointer label indicators (Low, Mid, High) for Binary Search
              const showLow = algorithm === 'binary-search' && currentStep.low === idx;
              const showMid = algorithm === 'binary-search' && currentStep.mid === idx;
              const showHigh = algorithm === 'binary-search' && currentStep.high === idx;

              return (
                <div key={idx} className="flex flex-col items-center select-none relative pb-10">
                  {/* The Box */}
                  <motion.div
                    layout
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl border-2 flex items-center justify-center font-bold font-mono text-sm md:text-base transition-all duration-300 ${boxColor}`}
                  >
                    {val}
                  </motion.div>
                  {/* Index label */}
                  <span className="text-[10px] text-slate-400 dark:text-slate-550 font-bold font-mono mt-1">
                    [{idx}]
                  </span>

                  {/* Binary Search Pointers Overlay */}
                  <div className="absolute bottom-0 flex flex-col gap-0.5 items-center">
                    {showLow && (
                      <span className="bg-blue-500 text-white text-[8px] font-extrabold px-1 py-0.5 rounded leading-none">
                        L
                      </span>
                    )}
                    {showMid && (
                      <span className="bg-amber-500 text-white text-[8px] font-extrabold px-1 py-0.5 rounded leading-none">
                        M
                      </span>
                    )}
                    {showHigh && (
                      <span className="bg-indigo-500 text-white text-[8px] font-extrabold px-1 py-0.5 rounded leading-none">
                        H
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Educational panel details */}
      <EducationalPanel algorithmId={algorithm} />
    </div>
  );
};
