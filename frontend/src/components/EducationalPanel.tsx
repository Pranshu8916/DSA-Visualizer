import React, { useEffect, useState } from 'react';
import { fetchAlgorithmDetails } from '../services/api';
import type { Algorithm } from '../types';
import { Info, Clock, Layers, Code } from 'lucide-react';

interface EducationalPanelProps {
  algorithmId: string;
}

export const EducationalPanel: React.FC<EducationalPanelProps> = ({ algorithmId }) => {
  const [details, setDetails] = useState<Algorithm | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchAlgorithmDetails(algorithmId).then((data) => {
      if (active) {
        setDetails(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [algorithmId]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm animate-pulse">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-6"></div>
        <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
      </div>
    );
  }

  if (!details) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      {/* Explanation & Complexity */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
            <Info className="w-5 h-5 text-brand-500" />
            About {details.name}
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
            {details.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Time Complexity */}
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-150 dark:border-slate-850">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-3">
              <Clock className="w-4 h-4 text-amber-500" />
              Time Complexity
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                <span className="text-slate-500 dark:text-slate-400">Best Case</span>
                <span className="font-mono font-bold text-brand-600 dark:text-brand-400">{details.timeComplexity.best}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                <span className="text-slate-500 dark:text-slate-400">Average Case</span>
                <span className="font-mono font-bold text-brand-600 dark:text-brand-400">{details.timeComplexity.average}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-500 dark:text-slate-400">Worst Case</span>
                <span className="font-mono font-bold text-rose-500 dark:text-rose-400">{details.timeComplexity.worst}</span>
              </div>
            </div>
          </div>

          {/* Space Complexity */}
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-150 dark:border-slate-850 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-3">
                <Layers className="w-4 h-4 text-emerald-500" />
                Space Complexity
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Refers to the total extra memory space required by the algorithm relative to the input size.
              </p>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-slate-200 dark:border-slate-800 pt-2">
              <span className="text-slate-500 dark:text-slate-400">Worst Case Space</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{details.spaceComplexity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pseudocode Panel */}
      <div className="bg-slate-950 text-slate-200 rounded-xl p-5 border border-slate-800 flex flex-col">
        <h4 className="text-sm font-semibold flex items-center gap-2 text-slate-300 mb-4">
          <Code className="w-4 h-4 text-brand-400" />
          Pseudocode
        </h4>
        <pre className="flex-1 overflow-auto text-xs md:text-sm font-mono leading-relaxed max-h-[250px] lg:max-h-[300px]">
          <code>{details.pseudocode}</code>
        </pre>
      </div>
    </div>
  );
};
