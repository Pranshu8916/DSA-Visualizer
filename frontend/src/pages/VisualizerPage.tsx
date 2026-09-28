import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortingVisualizer } from '../visualizers/SortingVisualizer';
import { SearchingVisualizer } from '../visualizers/SearchingVisualizer';
import { StackVisualizer } from '../visualizers/StackVisualizer';
import { QueueVisualizer } from '../visualizers/QueueVisualizer';
import { LinkedListVisualizer } from '../visualizers/LinkedListVisualizer';
import { TreeVisualizer } from '../visualizers/TreeVisualizer';
import { GraphVisualizer } from '../visualizers/GraphVisualizer';
import { RecursionVisualizer } from '../visualizers/RecursionVisualizer';
import { BarChart2, Search, Layers, Network, Workflow, Code, Cpu } from 'lucide-react';

export const VisualizerPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'sorting';
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const tabs = [
    { id: 'sorting', label: 'Sorting', icon: BarChart2 },
    { id: 'searching', label: 'Searching', icon: Search },
    { id: 'stack', label: 'Stack', icon: Layers },
    { id: 'queue', label: 'Queue', icon: Layers },
    { id: 'linkedlist', label: 'Linked List', icon: Network },
    { id: 'tree', label: 'Trees & BST', icon: Network },
    { id: 'graph', label: 'Graphs', icon: Workflow },
    { id: 'recursion', label: 'Recursion', icon: Cpu },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#F8FBFF] text-[#1A2340]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header & Visualizer Category Switcher */}
        <div className="bg-white border border-[#9BC8FF] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A2340] flex items-center gap-2.5">
              <Code className="w-7 h-7 text-[#3B78C8]" />
              Algorithm <span className="text-[#3B78C8]">Visualizer</span>
            </h1>
            <p className="text-sm text-[#1A2340]/70 mt-1 font-medium">
              Select an algorithm category to start step-by-step interactive execution.
            </p>
          </div>

          {/* Navigation Pill Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#D9ECFF]/50 p-1.5 rounded-xl border border-[#9BC8FF]/60">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#3B78C8] text-white shadow-md shadow-[#3B78C8]/25'
                      : 'text-[#1A2340] hover:text-[#3B78C8] hover:bg-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visualizer Workspace Canvas */}
        <div className="transition-all duration-300">
          {activeTab === 'sorting' && <SortingVisualizer />}
          {activeTab === 'searching' && <SearchingVisualizer />}
          {activeTab === 'stack' && <StackVisualizer />}
          {activeTab === 'queue' && <QueueVisualizer />}
          {activeTab === 'linkedlist' && <LinkedListVisualizer />}
          {activeTab === 'tree' && <TreeVisualizer />}
          {activeTab === 'graph' && <GraphVisualizer />}
          {activeTab === 'recursion' && <RecursionVisualizer />}
        </div>
      </div>
    </div>
  );
};
