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
      <div className="bg-white border border-[#9BC8FF]/40 rounded-2xl p-6 shadow-sm animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-3/4 mb-6"></div>
        <div className="h-20 bg-slate-200 rounded w-full"></div>
      </div>
    );
  }

  if (!details) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white border border-[#9BC8FF]/50 rounded-2xl p-6 shadow-sm">
      {/* Explanation & Complexity */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 text-[#1A2340]">
            <Info className="w-5 h-5 text-[#3B78C8]" />
            About {details.name}
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed text-sm md:text-base">
            {details.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Time Complexity */}
          <div className="bg-[#F8FBFF] p-4 rounded-xl border border-[#9BC8FF]/40">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-[#1A2340] mb-3">
              <Clock className="w-4 h-4 text-amber-500" />
              Time Complexity
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span className="text-slate-500">Best Case</span>
                <span className="font-mono font-bold text-[#3B78C8]">{details.timeComplexity.best}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span className="text-slate-500">Average Case</span>
                <span className="font-mono font-bold text-[#3B78C8]">{details.timeComplexity.average}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-500">Worst Case</span>
                <span className="font-mono font-bold text-rose-500">{details.timeComplexity.worst}</span>
              </div>
            </div>
          </div>

          {/* Space Complexity */}
          <div className="bg-[#F8FBFF] p-4 rounded-xl border border-[#9BC8FF]/40 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold flex items-center gap-2 text-[#1A2340] mb-3">
                <Layers className="w-4 h-4 text-emerald-500" />
                Space Complexity
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Refers to the total extra memory space required by the algorithm relative to the input size.
              </p>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-slate-200 pt-2">
              <span className="text-slate-500">Worst Case Space</span>
              <span className="font-mono font-bold text-emerald-600">{details.spaceComplexity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pseudocode Panel */}
      <div className="bg-[#1A2340] text-slate-100 rounded-xl p-5 border border-[#3B78C8]/40 flex flex-col">
        <h4 className="text-sm font-semibold flex items-center gap-2 text-slate-200 mb-4">
          <Code className="w-4 h-4 text-[#9BC8FF]" />
          Pseudocode
        </h4>
        <pre className="flex-1 bg-[#141A2E] p-4 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed border border-[#3B78C8]/30">
          {details.pseudocode}
        </pre>
      </div>
    </div>
  );
};
